import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("intake demo extracts, allows corrections, exports real JSON, and resets locally", async ({
  page,
}) => {
  const outbound: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") outbound.push(request.url());
  });
  await page.goto("/work/lead-intake");
  const demo = page.locator(".demo-lead");
  await demo
    .getByLabel("The incoming message", { exact: false })
    .fill(
      "Name: Taylor Sample\nEmail: taylor@example.test\nCompany: Sample Services\nWe need online booking and scheduling for an equipment inspection workflow.",
    );
  await demo.getByRole("button", { name: "Structure the inquiry" }).click();
  await expect(demo.getByLabel("name", { exact: true })).toHaveValue(
    "Taylor Sample",
  );
  await expect(demo.getByLabel("email", { exact: true })).toHaveValue(
    "taylor@example.test",
  );
  await expect(demo.getByLabel("service", { exact: true })).toHaveValue(
    "Booking & scheduling",
  );
  await demo
    .getByLabel("company", { exact: true })
    .fill("Corrected Sample Services");
  const downloadPromise = page.waitForEvent("download");
  await demo.getByRole("button", { name: "Download JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("codinginx-sample-lead.json");
  const filename = await download.path();
  expect(filename).not.toBeNull();
  const record = JSON.parse(await readFile(filename!, "utf8"));
  expect(record).toMatchObject({
    kind: "CodinginX internal demo",
    name: "Taylor Sample",
    company: "Corrected Sample Services",
    service: "Booking & scheduling",
  });
  await expect(demo.getByRole("status")).toContainText(
    "Nothing was sent to a server",
  );
  await demo.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(demo.getByLabel("name", { exact: true })).not.toBeVisible();
  await expect(demo.getByRole("status")).toHaveText("Sample restored.");
  expect(outbound).toEqual([]);
});

test("intake demo validates short input and leaves untrusted text inert", async ({
  page,
}) => {
  await page.goto("/work/lead-intake");
  const demo = page.locator(".demo-lead");
  await demo
    .getByLabel("The incoming message", { exact: false })
    .fill("too short");
  await demo.getByRole("button", { name: "Structure the inquiry" }).click();
  await expect(demo.getByRole("status")).toContainText(
    "at least 20 characters",
  );
  await demo
    .getByLabel("The incoming message", { exact: false })
    .fill(
      "Name: <script>window.injected=true</script>\nCompany: Example\nPlease automate a service workflow with human review.",
    );
  await demo.getByRole("button", { name: "Structure the inquiry" }).click();
  await expect(demo.getByLabel("name", { exact: true })).toHaveValue(
    "<script>window.injected=true</script>",
  );
  expect(await page.evaluate(() => "injected" in window)).toBe(false);
});

test("operations demo creates, schedules, changes status, persists, removes, and clears records", async ({
  page,
}) => {
  await page.goto("/work/service-operations");
  const demo = page.locator(".demo-operations");
  await demo.getByLabel("New sample request").fill("QA inspection request");
  await demo
    .locator(".demo-booking-form")
    .getByLabel("Schedule")
    .fill("2027-03-15");
  await demo.getByRole("button", { name: "Add request" }).click();
  const job = demo
    .locator(".demo-job")
    .filter({ hasText: "QA inspection request" });
  await expect(job).toBeVisible();
  await expect(job.getByLabel("Schedule")).toHaveValue("2027-03-15");
  await expect(job.getByLabel("Status")).toHaveValue("Scheduled");
  await job.getByLabel("Status").selectOption("In progress");
  await job.getByLabel("Schedule").fill("2027-03-16");
  await page.reload();
  await expect(job.getByLabel("Status")).toHaveValue("In progress");
  await expect(job.getByLabel("Schedule")).toHaveValue("2027-03-16");
  await job.getByLabel("Status").selectOption("Complete");
  await job
    .getByRole("button", { name: "Remove QA inspection request" })
    .click();
  await expect(job).not.toBeVisible();
  await demo.getByRole("button", { name: "Clear local data" }).click();
  await expect(demo.locator(".demo-job")).toHaveCount(0);
  await expect(demo).toContainText("No sample requests");
  expect(
    await page.evaluate(() =>
      localStorage.getItem("codinginx.operations-demo.v1"),
    ),
  ).toBeNull();
  await demo.getByRole("button", { name: "Restore sample" }).click();
  await expect(demo.locator(".demo-job")).toHaveCount(2);
});

test("operations demo rejects corrupted storage and still works when storage is blocked", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("codinginx.operations-demo.v1", "{broken");
  });
  await page.goto("/work/service-operations");
  const demo = page.locator(".demo-operations");
  await expect(demo.locator(".demo-job")).toHaveCount(2);
  await expect(demo.getByRole("status")).toContainText(
    "storage is unavailable",
  );
  await page.evaluate(() => {
    Object.defineProperty(Storage.prototype, "setItem", {
      configurable: true,
      value: () => {
        throw new Error("storage blocked");
      },
    });
  });
  await demo.getByLabel("New sample request").fill("QA temporary request");
  await demo.getByRole("button", { name: "Add request" }).click();
  await expect(
    demo.locator(".demo-job").filter({ hasText: "QA temporary request" }),
  ).toBeVisible();
  await expect(demo.getByRole("status")).toContainText("could not be saved");
});
