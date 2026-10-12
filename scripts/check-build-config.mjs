import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { getLaunchReport, loadProductionEnv } from "./check-launch.mjs";

export function checkBuildConfig(directory = process.cwd()) {
  // File-based flags must pass the same gates as hosting environment flags.
  loadProductionEnv(directory);
  if (
    process.env.CHAT_AI_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_CHAT_AI_ENABLED !== "true"
  ) {
    console.error(
      "AI activation requires the matching visitor disclosure flag NEXT_PUBLIC_CHAT_AI_ENABLED=true.",
    );
    return 1;
  }
  if (process.env.NEXT_PUBLIC_SITE_LAUNCHED === "true") {
    const report = getLaunchReport(directory);
    console.log(JSON.stringify(report, null, 2));
    if (report.status !== "launch-inputs-reviewed") {
      console.error(
        "Indexable release blocked: launch gates remain unresolved.",
      );
      return 1;
    }
  }
  return 0;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  process.exitCode = checkBuildConfig();
}
