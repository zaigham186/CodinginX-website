import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("service explorer supports keyboard selection and accurate service handoffs", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist", {
    name: "Explore CodinginX services",
  });
  const software = tabs.getByRole("tab", { name: /Custom Software/ });
  await software.focus();
  await page.keyboard.press("ArrowDown");
  const automation = tabs.getByRole("tab", { name: /AI & Automation/ });
  await expect(automation).toBeFocused();
  await expect(automation).toHaveAttribute("aria-selected", "true");
  await expect(
    page
      .getByRole("tabpanel")
      .getByRole("link", { name: "Explore the service" }),
  ).toHaveAttribute("href", "/services/ai-automation");
  await page.keyboard.press("End");
  await expect(tabs.getByRole("tab", { name: /UI\/UX/ })).toBeFocused();
  await expect(
    page.getByRole("tabpanel").locator(".interface-study"),
  ).toBeVisible();
  await page
    .getByRole("tabpanel")
    .getByRole("link", { name: "Explore the service" })
    .click();
  await expect(page).toHaveURL(/\/services\/ui-ux-design$/);
});

test("sample hero workflow can be inspected, replayed and paused", async ({
  page,
}) => {
  await page.goto("/");
  const signal = page.locator(".hero-signal");
  await signal.getByRole("button", { name: /Review/ }).click();
  await expect(signal.locator(".signal-record")).toHaveAttribute(
    "data-stage",
    "2",
  );
  await expect(signal.locator(".signal-record-top")).toContainText(
    "Ready for review",
  );
  await expect(signal).not.toHaveClass(/is-running/);
  await signal.getByRole("button", { name: "Replay sample workflow" }).click();
  await expect(signal).toHaveClass(/is-running/);
  await signal.getByRole("button", { name: "Pause sample workflow" }).click();
  await expect(signal).not.toHaveClass(/is-running/);
  await signal.getByRole("button", { name: "Replay sample workflow" }).click();
  await expect(signal.locator(".signal-record-top")).toContainText(
    "Ready to export",
    { timeout: 7000 },
  );
  await expect(signal).toContainText("RULE-BASED / NO LIVE AI OR CRM");
  await signal.getByRole("link", { name: "Try the real demo" }).click();
  await expect(page).toHaveURL(/\/work\/lead-intake$/);
});

test("automation story changes artifacts through natural scrolling and stage controls", async ({
  page,
}) => {
  const externalCalls: string[] = [];
  page.on("request", (request) => {
    if (/api\.openai|api\.resend|upstash\.io/.test(request.url()))
      externalCalls.push(request.url());
  });
  await page.goto("/services/ai-automation");
  const story = page.locator(".scroll-story-automation");
  await story
    .locator(".story-chapter")
    .nth(4)
    .evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
  await expect(story.locator(".artifact-integrations")).toBeVisible();
  await story.getByRole("button", { name: /Notify/ }).click();
  await expect(story.locator(".artifact-handoff")).toBeVisible();
  await expect(story).toContainText("NO LIVE INTEGRATIONS");
  await expect(story).toContainText("approved configuration");
  expect(externalCalls).toEqual([]);
});

test("project gallery and design artifacts lead to the actual working demonstration", async ({
  page,
}) => {
  await page.goto("/work/lead-intake");
  const gallery = page.locator(".project-gallery");
  await gallery.getByRole("button", { name: "Interaction detail" }).click();
  await expect(gallery).toHaveAttribute("data-detail", "true");
  await expect(gallery).toContainText("DESIGNED AROUND THE NEXT ACTION");
  await page.emulateMedia({ reducedMotion: "reduce" });
  // An explicitly chosen detail view remains useful, with an instant change.
  const view = gallery.locator(".gallery-browser");
  await expect
    .poll(() =>
      view.evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m11,
      ),
    )
    .toBeGreaterThan(1.1);
  expect(
    await view.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    ),
  ).toBe("0s");
  const image = gallery.locator("img").first();
  await expect
    .poll(() =>
      image.evaluate(
        (element: HTMLImageElement) =>
          element.complete && element.naturalWidth > 0,
      ),
    )
    .toBeTruthy();
  await page.getByRole("link", { name: "Try the workflow" }).click();
  await expect(page.locator(".demo-lead")).toBeInViewport();
  await page.goto("/services/ui-ux-design");
  const journey = page.locator(".design-journey");
  await journey.getByRole("button", { name: /Wireframe/ }).click();
  await expect(journey.locator(".interface-study")).toBeVisible();
  await journey.getByRole("button", { name: /Working interface/ }).click();
  await journey
    .getByRole("link", { name: "Try the working interface" })
    .click();
  await expect(page).toHaveURL(/\/work\/lead-intake$/);
});

test("mobile reduced motion keeps all storytelling controls and content usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const signal = page.locator(".hero-signal");
  await signal.scrollIntoViewIfNeeded();
  await expect(signal).not.toHaveClass(/is-running/);
  await signal.getByRole("button", { name: "Replay sample workflow" }).click();
  await expect(signal.locator(".signal-record")).toHaveAttribute(
    "data-stage",
    "3",
  );
  await expect(signal).not.toHaveClass(/is-running/);
  await page.goto("/services/ai-automation");
  const story = page.locator(".scroll-story-automation");
  await story.getByRole("button", { name: /Connect/ }).click();
  await expect(story.locator(".artifact-integrations")).toBeInViewport();
  for (const button of await story.locator(".story-nav button").all()) {
    const box = await button.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
});

test("operations summary reflects the actual sample records and status changes", async ({
  page,
}) => {
  await page.goto("/work");
  const demo = page.locator(".demo-operations");
  const newState = demo
    .locator(".operations-summary > div")
    .filter({ has: page.locator("span", { hasText: /^New$/ }) });
  const completeState = demo
    .locator(".operations-summary > div")
    .filter({ has: page.locator("span", { hasText: /^Complete$/ }) });
  await expect(newState.locator("strong")).toHaveText("1");
  await demo
    .locator(".demo-job")
    .first()
    .getByLabel("Status", { exact: true })
    .selectOption("Complete");
  await expect(newState.locator("strong")).toHaveText("0");
  await expect(completeState.locator("strong")).toHaveText("1");
  await page.reload();
  await expect(completeState.locator("strong")).toHaveText("1");
});

test("server-rendered content stays readable and navigable without motion JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(baseURL || "http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software for",
  );
  await page
    .locator(".studio-hero")
    .getByRole("link", { name: "Explore Our Work" })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(
    page.getByRole("heading", { name: "From inquiry to structured lead." }),
  ).toBeVisible();
  await context.close();
});
