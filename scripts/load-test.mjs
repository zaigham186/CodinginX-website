import { mkdir, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { randomUUID } from "node:crypto";

const target = new URL(process.env.TEST_BASE_URL || "http://127.0.0.1:3000");
if (
  !["localhost", "127.0.0.1", "[::1]"].includes(target.hostname) ||
  !["http:", "https:"].includes(target.protocol) ||
  target.username ||
  target.password ||
  target.pathname !== "/" ||
  target.search ||
  target.hash
) {
  throw new Error(
    "Concurrency checks are restricted to an exact loopback origin. Remote targets are never permitted.",
  );
}
if (process.env.TEST_INTEGRATIONS_UNCONFIGURED !== "true") {
  throw new Error(
    "Start a local production server WITHOUT Resend/OpenAI credentials, then set TEST_INTEGRATIONS_UNCONFIGURED=true to confirm that no real provider requests can be made.",
  );
}
if (process.env.RESEND_API_KEY || process.env.OPENAI_API_KEY) {
  throw new Error(
    "Remove real provider credentials from this test environment before running the concurrency check.",
  );
}

const concurrency = 100;
const headers = {
  Origin: "https://codinginx.com",
  "Content-Type": "application/json",
  "Sec-Fetch-Site": "same-origin",
};
const validInquiry = () => ({
  name: "Load Test",
  email: "load-test@example.test",
  company: "Local Test Company",
  website: "",
  service: "Custom Software",
  stage: "Idea / discovery",
  budget: "Not sure yet",
  timeline: "Flexible",
  details:
    "This is a local concurrency validation request with external integrations explicitly disabled.",
  privacy: true,
  websiteTrap: "",
  submissionId: randomUUID(),
});
const scenarios = [
  ...["/", "/services", "/work", "/contact"].map((path) => ({
    name: path,
    path,
    statuses: [200],
  })),
  {
    name: "contact-invalid",
    path: "/api/contact",
    statuses: [400],
    body: () => ({ email: "invalid" }),
  },
  {
    name: "contact-unconfigured",
    path: "/api/contact",
    statuses: [503],
    body: validInquiry,
  },
  {
    name: "chat-guided",
    path: "/api/chat",
    statuses: [200, 429],
    body: () => ({ message: "What software services do you offer?" }),
  },
];
const health = await fetch(new URL("/api/health", target), {
  redirect: "error",
  signal: AbortSignal.timeout(10_000),
});
if (!health.ok)
  throw new Error(
    "Local server is not healthy; start the production server before testing.",
  );
const results = [];
for (const scenario of scenarios) {
  const batchStart = performance.now();
  const responses = await Promise.all(
    Array.from({ length: concurrency }, async () => {
      const start = performance.now();
      try {
        const response = await fetch(new URL(scenario.path, target), {
          method: scenario.body ? "POST" : "GET",
          headers: scenario.body ? headers : undefined,
          body: scenario.body ? JSON.stringify(scenario.body()) : undefined,
          redirect: "error",
          signal: AbortSignal.timeout(20_000),
        });
        await response.arrayBuffer();
        return {
          status: response.status,
          ms: performance.now() - start,
          valid: scenario.statuses.includes(response.status),
        };
      } catch (error) {
        return {
          status: "network-error",
          ms: performance.now() - start,
          valid: false,
          category: error instanceof Error ? error.name : "unknown",
        };
      }
    }),
  );
  const durations = responses.map((result) => result.ms).sort((a, b) => a - b);
  const statuses = responses.reduce(
    (counts, result) => ({
      ...counts,
      [result.status]: (counts[result.status] || 0) + 1,
    }),
    {},
  );
  const result = {
    scenario: scenario.name,
    concurrency,
    requests: responses.length,
    expectedStatuses: scenario.statuses,
    statuses,
    failures: responses.filter((response) => !response.valid).length,
    latencyMs: {
      p50: Math.round(durations[49]),
      p95: Math.round(durations[94]),
      max: Math.round(durations[99]),
    },
    batchMs: Math.round(performance.now() - batchStart),
  };
  results.push(result);
  console.log(JSON.stringify(result));
}
const after = await fetch(new URL("/api/health", target), {
  redirect: "error",
  signal: AbortSignal.timeout(10_000),
});
const report = {
  testedAt: new Date().toISOString(),
  target: target.origin,
  scope:
    "Local production build only. No email or AI provider credentials. Does not prove deployed capacity or third-party integration performance.",
  concurrency,
  totalRequests: results.reduce((sum, result) => sum + result.requests, 0),
  results,
  healthyAfter: after.ok,
  passed: after.ok && results.every((result) => result.failures === 0),
};
await mkdir("work", { recursive: true });
await writeFile(
  "work/load-test-results.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    passed: report.passed,
    totalRequests: report.totalRequests,
    healthyAfter: report.healthyAfter,
    report: "work/load-test-results.json",
  }),
);
if (!report.passed) process.exitCode = 1;
