import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import nextEnv from "@next/env";

export function loadProductionEnv(directory = process.cwd()) {
  process.env.NODE_ENV ||= "production";
  // Use Next's own file precedence before evaluating flags or credentials.
  nextEnv.loadEnvConfig(directory, false, console, true);
}

export function getLaunchReport(directory = process.cwd()) {
  const evidence = JSON.parse(
    readFileSync(resolve(directory, "docs/launch-evidence.json"), "utf8"),
  );
  const requiredGates = [
    "legal_review_and_final_pages",
    "resend_domain_and_real_delivery",
    "distributed_limits_and_idempotency",
    "hosting_and_source_delivery",
    "domain_https_and_redirects",
    "monitoring_and_alert_delivery",
    "mailbox_privacy_and_recovery",
    "production_walkthrough",
  ];
  const checks = requiredGates.map((name) => {
    const value = evidence.gates?.[name];
    return {
      name,
      passed:
        value?.verified === true &&
        typeof value.evidence === "string" &&
        value.evidence.length > 20,
      detail: value?.evidence || "Required external evidence is missing.",
    };
  });
  for (const name of [
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RATE_LIMIT_SECRET",
  ]) {
    checks.push({
      name: `${name}_configured`,
      passed: Boolean(process.env[name]?.trim()),
      detail:
        "Presence only. No secret values are printed; external operation must be verified separately.",
    });
  }
  checks.push({
    name: "rate_secret_length",
    passed: (process.env.RATE_LIMIT_SECRET?.length || 0) >= 32,
    detail: "Requires at least 32 characters from a secure random source.",
  });
  for (const asset of [
    "src/app/favicon.ico",
    "src/app/icon.svg",
    "src/app/apple-icon.png",
  ]) {
    checks.push({
      name: asset,
      passed: existsSync(resolve(directory, asset)),
      detail:
        "Local file present; production identity remains a separate gate.",
    });
  }
  const legalFile = resolve(directory, "src/content/legal.ts");
  checks.push({
    name: "legal_copy_finalized",
    passed:
      existsSync(legalFile) &&
      !/review draft/i.test(readFileSync(legalFile, "utf8")),
    detail:
      "Draft legal content must be replaced with reviewed accurate final text.",
  });
  return {
    status: checks.every((check) => check.passed)
      ? "launch-inputs-reviewed"
      : "not-yet-launch-ready",
    checks,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  loadProductionEnv();
  const report = getLaunchReport();
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.status === "launch-inputs-reviewed" ? 0 : 2;
}
