import { chromium, expect } from "@playwright/test";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const sharp = require("sharp"); // Installed by the pinned Next.js dependency.
const baseURL = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
if (!["localhost", "127.0.0.1", "[::1]"].includes(new URL(baseURL).hostname)) {
  throw new Error("Capture only the local internal demonstrations.");
}
mkdirSync("public/media", { recursive: true });
mkdirSync("work", { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1520, height: 1100 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await page.goto(new URL("/work", baseURL).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const intake = page.locator(".demo-lead");
  await intake.getByRole("button", { name: "Structure the inquiry" }).click();
  await expect(intake.getByLabel("name", { exact: true })).toHaveValue(
    "Alex Sample",
  );
  const media = [];
  async function capture(name, selector) {
    const buffer = await page.locator(selector).screenshot();
    const info = await sharp(buffer)
      .webp({ quality: 90 })
      .toFile(`public/media/${name}.webp`);
    media.push({
      name,
      width: info.width,
      height: info.height,
      bytes: info.size,
    });
  }
  await capture("intake-desktop", ".demo-lead");
  await capture("operations-desktop", ".demo-operations");
  await page.setViewportSize({ width: 390, height: 844 });
  await capture("operations-mobile", ".demo-operations");
  writeFileSync("work/product-media.json", JSON.stringify(media, null, 2));
  console.log(JSON.stringify(media));
} finally {
  await browser.close();
}
