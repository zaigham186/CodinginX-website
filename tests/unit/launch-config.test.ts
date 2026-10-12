import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import nextEnv from "@next/env";

type LaunchReport = {
  status: string;
  checks: { name: string; passed: boolean }[];
};
const buildModule = new URL(
  "../../scripts/check-build-config.mjs",
  import.meta.url,
).href;
const launchModule = new URL("../../scripts/check-launch.mjs", import.meta.url)
  .href;
const { checkBuildConfig } = (await import(buildModule)) as {
  checkBuildConfig: (directory: string) => number;
};
const { getLaunchReport, loadProductionEnv } = (await import(launchModule)) as {
  getLaunchReport: (directory: string) => LaunchReport;
  loadProductionEnv: (directory: string) => void;
};

const fixtures: string[] = [];
const controlledKeys = [
  "NODE_ENV",
  "__NEXT_PROCESSED_ENV",
  "NEXT_PUBLIC_SITE_LAUNCHED",
  "CHAT_AI_ENABLED",
  "NEXT_PUBLIC_CHAT_AI_ENABLED",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "RATE_LIMIT_SECRET",
];
const originalValues = Object.fromEntries(
  controlledKeys.map((key) => [key, process.env[key]]),
);

function fixture(files: Record<string, string> = {}) {
  const directory = mkdtempSync(join(tmpdir(), "codinginx-launch-env-"));
  fixtures.push(directory);
  mkdirSync(join(directory, "docs"), { recursive: true });
  mkdirSync(join(directory, "src/content"), { recursive: true });
  writeFileSync(
    join(directory, "docs/launch-evidence.json"),
    JSON.stringify({ gates: {} }),
  );
  writeFileSync(
    join(directory, "src/content/legal.ts"),
    "Reviewed fixture text",
  );
  for (const [filename, content] of Object.entries(files)) {
    writeFileSync(join(directory, filename), content);
  }
  return directory;
}

beforeEach(() => {
  // Initialize Next's environment snapshot using an empty temporary directory;
  // never read or change the repository's actual environment files.
  nextEnv.loadEnvConfig(fixture(), false, console, true);
  nextEnv.updateInitialEnv({
    ...Object.fromEntries(controlledKeys.map((key) => [key, undefined])),
    NODE_ENV: "production",
  });
  nextEnv.resetEnv();
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  nextEnv.updateInitialEnv(originalValues);
  nextEnv.resetEnv();
  vi.restoreAllMocks();
  for (const directory of fixtures.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("file-based production configuration cannot bypass launch gates", () => {
  it("blocks an indexable flag from .env.local when launch evidence is incomplete", () => {
    expect(
      checkBuildConfig(
        fixture({ ".env.local": "NEXT_PUBLIC_SITE_LAUNCHED=true\n" }),
      ),
    ).toBe(1);
    expect(console.error).toHaveBeenCalledWith(
      "Indexable release blocked: launch gates remain unresolved.",
    );
  });

  it("requires AI disclosure for activation from .env.local", () => {
    expect(
      checkBuildConfig(fixture({ ".env.local": "CHAT_AI_ENABLED=true\n" })),
    ).toBe(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("NEXT_PUBLIC_CHAT_AI_ENABLED=true"),
    );
  });

  it("gives .env.production.local precedence over .env.local", () => {
    expect(
      checkBuildConfig(
        fixture({
          ".env.production.local": "CHAT_AI_ENABLED=true\n",
          ".env.local": "CHAT_AI_ENABLED=false\n",
        }),
      ),
    ).toBe(1);
  });

  it("gives .env.local precedence over .env.production", () => {
    expect(
      checkBuildConfig(
        fixture({
          ".env.local": "CHAT_AI_ENABLED=false\n",
          ".env.production": "CHAT_AI_ENABLED=true\n",
        }),
      ),
    ).toBe(0);
  });

  it("preserves explicit process environment priority", () => {
    nextEnv.updateInitialEnv({ CHAT_AI_ENABLED: "false" });
    nextEnv.resetEnv();
    expect(
      checkBuildConfig(fixture({ ".env.local": "CHAT_AI_ENABLED=true\n" })),
    ).toBe(0);
  });

  it("loads credentials for the standalone checker without putting values in its report", () => {
    const marker = "synthetic-test-value-never-a-real-credential";
    const directory = fixture({
      ".env.local": [
        `RESEND_API_KEY=${marker}`,
        "EMAIL_FROM=test@example.test",
        "UPSTASH_REDIS_REST_URL=https://fixture.upstash.io",
        `UPSTASH_REDIS_REST_TOKEN=${marker}`,
        `RATE_LIMIT_SECRET=${marker}`,
      ].join("\n"),
    });
    loadProductionEnv(directory);
    const report = getLaunchReport(directory);
    const checks = report.checks.filter(
      (check) =>
        check.name.endsWith("_configured") ||
        check.name === "rate_secret_length",
    );
    expect(checks).toHaveLength(6);
    expect(checks.every((check) => check.passed)).toBe(true);
    expect(JSON.stringify(report)).not.toContain(marker);
    expect(report.status).toBe("not-yet-launch-ready");
    expect(
      report.checks.find((check) => check.name === "domain_https_and_redirects")
        ?.passed,
    ).toBe(false);
  });
});
