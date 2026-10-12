import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { openAssistant } from "./helpers";

test("guided assistant works offline, remains accessible on mobile, and hands off to contact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.route("**/api/chat", (route) => route.abort("failed"));
  await page.goto("/");
  const dialog = await openAssistant(page);
  await dialog.getByRole("button", { name: "Plan an MVP" }).click();
  await expect(dialog.getByRole("status")).toContainText("one audience");
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
  const box = await dialog.boundingBox();
  expect(box && box.x >= 0 && box.x + box.width <= 321).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ask CodinginX" }),
  ).toBeFocused();
  await openAssistant(page);
  await dialog.getByRole("button", { name: "Start an inquiry" }).click();
  await dialog.getByRole("link", { name: "Start a Project" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(dialog).not.toBeVisible();
});

test("typed assistant question accepts only safe links and renders text rather than markup", async ({
  page,
}) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      json: {
        ok: true,
        mode: "guided",
        message: "<script>untrusted response is text</script>",
        links: [
          { label: "Start a Project", href: "/contact" },
          { label: "Unsafe script", href: "javascript:alert(1)" },
          { label: "Unsafe external", href: "//attacker.test" },
          { label: "Unsafe backslash", href: "/\\attacker.test" },
          { label: "External URL", href: "https://attacker.test" },
        ],
      },
    }),
  );
  await page.goto("/");
  const dialog = await openAssistant(page);
  await dialog.getByLabel("Or ask a question").fill("What should I build?");
  await dialog.getByRole("button", { name: "Send question" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "<script>untrusted response is text</script>",
  );
  await expect(dialog.getByRole("status").locator("script")).toHaveCount(0);
  await expect(dialog.getByRole("status").getByRole("link")).toHaveCount(1);
  await expect(dialog.getByLabel("Or ask a question")).toHaveValue("");
});

for (const status of [429, 503]) {
  test(`assistant ${status} failure keeps guided help and contact available`, async ({
    page,
  }) => {
    await page.route("**/api/chat", (route) =>
      route.fulfill({ status, json: { ok: false, message: "Unavailable" } }),
    );
    await page.goto("/contact");
    const dialog = await openAssistant(page);
    await dialog.getByLabel("Or ask a question").fill("Can I build an MVP?");
    await dialog.getByRole("button", { name: "Send question" }).click();
    await expect(dialog.getByRole("alert")).toContainText(
      "guided topics below still work",
    );
    await expect(
      dialog.getByRole("link", { name: "Contact CodinginX" }),
    ).toBeVisible();
    await dialog.getByRole("button", { name: "Explore automation" }).click();
    await expect(dialog.getByRole("status")).toContainText("Useful automation");
    await expect(dialog.getByRole("alert")).not.toBeVisible();
  });
}

test("assistant timeout, loading, and close restore a usable interface", async ({
  page,
}) => {
  await page.clock.install();
  await page.route("**/api/chat", () => undefined);
  await page.goto("/");
  const dialog = await openAssistant(page);
  await dialog.getByLabel("Or ask a question").fill("What can you help with?");
  await dialog.getByRole("button", { name: "Send question" }).click();
  await expect(
    dialog.getByRole("button", { name: "Getting an answer" }),
  ).toBeDisabled();
  await expect(dialog.getByLabel("Or ask a question")).toBeDisabled();
  await page.clock.fastForward(15_100);
  await expect(dialog.getByRole("alert")).toContainText("took too long");
  await expect(dialog.getByLabel("Or ask a question")).toBeEnabled();
  await dialog.getByRole("button", { name: "Close assistant" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ask CodinginX" }),
  ).toBeFocused();
});
