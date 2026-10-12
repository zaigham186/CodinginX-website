import { expect, type Page } from "@playwright/test";

export const routes = [
  "/",
  "/services",
  "/services/custom-software",
  "/services/ai-automation",
  "/services/web-mobile-development",
  "/services/ui-ux-design",
  "/work",
  "/work/lead-intake",
  "/work/service-operations",
  "/about",
  "/process",
  "/insights",
  "/insights/plan-an-mvp-before-writing-code",
  "/insights/what-business-tasks-to-automate-first",
  "/insights/custom-software-vs-off-the-shelf-tools",
  "/careers",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
] as const;

export async function fillInquiry(page: Page) {
  await page.getByLabel("Your name", { exact: true }).fill("QA Visitor");
  await page
    .getByLabel("Work email", { exact: true })
    .fill("qa-visitor@example.test");
  await page
    .getByLabel("Company or startup", { exact: true })
    .fill("QA Sample Company");
  await page
    .getByLabel("What do you need built?", { exact: true })
    .selectOption("Custom Software");
  await page
    .getByLabel("Project stage", { exact: true })
    .selectOption("Idea / discovery");
  await page
    .getByLabel("Approximate budget", { exact: true })
    .selectOption("Not sure yet");
  await page
    .getByLabel("Desired timeline", { exact: true })
    .selectOption("Flexible");
  await page
    .getByLabel("Tell us about the project", { exact: true })
    .fill(
      "This local automated test describes a sample workflow and does not request real project work.",
    );
  await page.locator("#privacy").check();
}

export async function openAssistant(page: Page) {
  await page.getByRole("button", { name: "Ask CodinginX" }).click();
  const dialog = page.getByRole("dialog", { name: "CodinginX assistant" });
  await expect(dialog).toBeVisible();
  return dialog;
}

export function isLoopback(value: string) {
  return ["127.0.0.1", "localhost", "[::1]"].includes(new URL(value).hostname);
}
