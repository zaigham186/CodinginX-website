import { expect, test } from "@playwright/test";
import { fillInquiry, isLoopback } from "./helpers";

test("contact validation exposes accessible errors and respects contextual selection", async ({
  page,
}) => {
  await page.goto("/contact?service=AI%20%26%20Automation&project=lead");
  await expect(
    page.getByLabel("What do you need built?", { exact: true }),
  ).toHaveValue("AI & Automation");
  await expect(
    page.getByLabel("Tell us about the project", { exact: true }),
  ).toHaveValue(/lead intake/);
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Work email", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.locator("#privacy")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toBeFocused();
});

test("an unconfigured local contact service shows its real 503 and retains details", async ({
  page,
  baseURL,
}) => {
  test.skip(
    process.env.TEST_INTEGRATIONS_UNCONFIGURED !== "true" ||
      !isLoopback(baseURL || ""),
    "Only run with an explicitly unconfigured local server; this must never send real email.",
  );
  await page.route("**/api/contact", async (route) => {
    const response = await route.fetch({
      headers: {
        ...route.request().headers(),
        origin: "https://codinginx.com",
        "sec-fetch-site": "same-origin",
      },
    });
    await route.fulfill({ response });
  });
  await page.goto("/contact");
  await fillInquiry(page);
  const responsePromise = page.waitForResponse("**/api/contact");
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  expect((await responsePromise).status()).toBe(503);
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "temporarily unavailable",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "QA Visitor",
  );
  await expect(
    page.getByRole("button", { name: "Send Project Inquiry" }),
  ).toBeEnabled();
});

test("contact loading, duplicate click protection, delivery acceptance, and reset", async ({
  page,
}) => {
  let requestCount = 0;
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    requestCount++;
    await pending;
    await route.fulfill({
      json: { ok: true, acknowledgement: "sent", requestId: "qa-accepted" },
    });
  });
  await page.goto("/contact");
  await fillInquiry(page);
  await page
    .getByRole("button", { name: "Send Project Inquiry" })
    .evaluate((button) => {
      (button as HTMLButtonElement).click();
      (button as HTMLButtonElement).click();
    });
  await expect(
    page.getByRole("button", { name: "Sending your inquiry" }),
  ).toBeDisabled();
  await expect(page.getByLabel("Your name", { exact: true })).toBeDisabled();
  expect(requestCount).toBe(1);
  release();
  await expect(page.getByRole("status")).toContainText("accepted for delivery");
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.getByRole("status")).toContainText("qa-accepted");
  await expect(
    page.getByRole("button", { name: "Send Project Inquiry" }),
  ).not.toBeVisible();
  await page.getByRole("button", { name: "Start another inquiry" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Send Project Inquiry" }),
  ).toBeEnabled();
});

test("server field errors, provider failure, rate limit, and safe retries keep the same submission ID", async ({
  page,
}) => {
  const submissions: Record<string, unknown>[] = [];
  const replies = [
    {
      status: 400,
      body: {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: { email: "Check this work email address." },
        requestId: "qa-invalid",
      },
    },
    {
      status: 503,
      body: {
        ok: false,
        message: "Delivery could not be confirmed. Retry safely.",
        requestId: "qa-provider",
      },
    },
    {
      status: 429,
      body: {
        ok: false,
        message: "Please try later or email the team.",
        requestId: "qa-limited",
      },
    },
    {
      status: 200,
      body: { ok: true, acknowledgement: "pending", requestId: "qa-recovered" },
    },
  ];
  await page.route("**/api/contact", async (route) => {
    submissions.push(route.request().postDataJSON());
    const reply = replies[submissions.length - 1];
    await route.fulfill({ status: reply.status, json: reply.body });
  });
  await page.goto("/contact");
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.locator("#email-error")).toHaveText(
    "Check this work email address.",
  );
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "qa-invalid",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "QA Visitor",
  );
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Delivery could not be confirmed.",
  );
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Please try later",
  );
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "could not confirm the acknowledgement email",
  );
  expect(submissions).toHaveLength(4);
  expect(new Set(submissions.map((body) => body.submissionId)).size).toBe(1);
});

test("contact timeout preserves data and recovers without a duplicate identity", async ({
  page,
}) => {
  await page.clock.install();
  const ids: unknown[] = [];
  await page.route("**/api/contact", (route) => {
    ids.push(route.request().postDataJSON().submissionId);
    if (ids.length > 1)
      void route.fulfill({
        json: { ok: true, acknowledgement: "sent", requestId: "qa-retry" },
      });
  });
  await page.goto("/contact");
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(
    page.getByRole("button", { name: "Sending your inquiry" }),
  ).toBeDisabled();
  await page.clock.fastForward(45_100);
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "timed out",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "QA Visitor",
  );
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.getByRole("status")).toContainText("accepted for delivery");
  expect(ids).toHaveLength(2);
  expect(ids[0]).toBe(ids[1]);
});

test("network errors and untrusted server text stay safe and recoverable", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) => route.abort("failed"));
  await page.goto("/contact");
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "could not reach the inquiry service",
  );
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      json: {
        ok: false,
        message: "<img src=x onerror=alert(1)>",
        requestId: "qa-untrusted",
      },
    }),
  );
  await page.getByRole("button", { name: "Send Project Inquiry" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "<img src=x onerror=alert(1)>",
  );
  await expect(
    page.locator("main").getByRole("alert").locator("img"),
  ).toHaveCount(0);
});
