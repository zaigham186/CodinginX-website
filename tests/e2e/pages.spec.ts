import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "./helpers";

for (const route of routes) {
  test(`page integrity, accessibility, and links: ${route}`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/CodinginX/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S.{30,}/,
    );
    expect(
      new URL(
        (await page.locator('link[rel="canonical"]').getAttribute("href")) ||
          "",
      ).href,
    ).toBe(new URL(route, "https://codinginx.com").href);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      /^https:\/\/codinginx\.com/,
    );
    await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute(
      "href",
      /favicon|icon/,
    );
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("footer")).toContainText(
      String(new Date().getFullYear()),
    );
    await expect(page.locator('footer a[href="/privacy"]')).toBeVisible();
    await expect(page.locator('footer a[href="/terms"]')).toBeVisible();
    await expect(
      page.locator('footer a[href="mailto:info@codinginx.com"]'),
    ).toBeVisible();
    expect(await page.locator("body").innerText()).not.toMatch(
      /Lorem ipsum|\[Insert text\]|\[Your Name\]|Made with AI|Built with AI/,
    );
    const links = await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href") || ""),
      );
    expect(links).not.toContain("#");
    expect(links).not.toContain("");
    const internal = [
      ...new Set(
        links
          .filter((href) => href.startsWith("/") && !href.startsWith("//"))
          .map((href) => href.split("#")[0]),
      ),
    ];
    for (const href of internal) {
      const linkResponse = await request.get(href);
      expect(
        linkResponse.status(),
        `Broken internal link ${href} from ${route}`,
      ).toBeLessThan(400);
    }
    for (const href of links.filter(
      (value) => value.startsWith("#") && value.length > 1,
    )) {
      expect(
        await page.locator(`[id="${href.slice(1)}"]`).count(),
        `Missing anchor ${href}`,
      ).toBeGreaterThan(0);
    }
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      accessibility.violations,
      JSON.stringify(accessibility.violations, null, 2),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 375, 768, 1280, 1440, 1920]) {
  test(`all published pages fit viewport ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1080 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
        overflowing: [...document.querySelectorAll("main *")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1)
            );
          })
          .slice(0, 8)
          .map((element) => `${element.tagName}.${element.className}`),
      }));
      expect(
        dimensions.document,
        `${route} at ${width}: ${dimensions.overflowing.join(", ")}`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(dimensions.body, `${route} body at ${width}`).toBeLessThanOrEqual(
        dimensions.viewport + 1,
      );
      await expect(page.locator("main h1")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Ask CodinginX" }),
      ).toBeVisible();
    }
  });
}

test("sitemap, robots, favicon, and unpublished routes remain correct", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of routes.filter(
    (path) => !["/privacy", "/terms"].includes(path),
  ))
    expect(xml).toContain(`https://codinginx.com${route === "/" ? "" : route}`);
  expect(xml).not.toContain("saas-mvp");
  expect(xml).not.toMatch(/localhost|127\.0\.0\.1|\.vercel\.app/);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const icon = await request.get("/favicon.ico");
  expect(icon.status()).toBe(200);
  expect((await icon.body()).byteLength).toBeGreaterThan(100);
  for (const route of [
    "/missing-page",
    "/work/saas-mvp",
    "/work/unknown-project",
    "/services/unknown-service",
    "/insights/unknown-article",
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "This path ends here." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to home" }),
    ).toBeVisible();
  }
});

test("desktop navigation, contextual links, and logo lead to the intended pages", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  for (const [label, path] of [
    ["Services", "/services"],
    ["Work", "/work"],
    ["Process", "/process"],
    ["About", "/about"],
    ["Insights", "/insights"],
  ]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(
      nav.getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
  await page
    .locator(".site-header")
    .getByRole("link", { name: "Start a Project" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  await page
    .locator(".site-header")
    .getByRole("link", { name: "CodinginX home", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
});

test("mobile navigation supports keyboard, focus return, route changes, and primary action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: /Services/ }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(dialog).not.toBeVisible();
  await trigger.click();
  await dialog.getByRole("link", { name: "Start a Project" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(dialog).not.toBeVisible();
});

test("skip link, keyboard FAQ, and reduced-motion preference work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/faq");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const firstQuestion = page.locator(".faq-list summary").first();
  await firstQuestion.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".faq-answer").first()).toBeVisible();
  await expect(firstQuestion).toBeFocused();
  const motion = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: getComputedStyle(document.querySelector(".button")!)
      .transitionDuration,
    focusStyle: getComputedStyle(document.activeElement!).outlineStyle,
  }));
  expect(motion.scrollBehavior).toBe("auto");
  expect(parseFloat(motion.transitionDuration)).toBeLessThanOrEqual(0.001);
  expect(motion.focusStyle).not.toBe("none");
});

test("production responses apply security policy and optional tracking stays off", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["content-security-policy"]).toContain("object-src 'none'");
  expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toContain("max-age=31536000");
  expect(headers["x-powered-by"]).toBeUndefined();
  const trackingRequests: string[] = [];
  page.on("request", (req) => {
    if (/plausible|google-analytics|googletagmanager/.test(req.url()))
      trackingRequests.push(req.url());
  });
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(
    page.getByRole("button", { name: "Ask CodinginX" }),
  ).toBeVisible();
  expect(trackingRequests).toEqual([]);
  expect(await page.context().cookies()).toEqual([]);
});
