import { vi } from "vitest";

export function configureLocal() {
  vi.stubEnv("NODE_ENV", "test");
  for (const key of [
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RATE_LIMIT_SECRET",
    "SITE_PREVIEW_ORIGIN",
    "TRUSTED_PROXY_IP_HEADER",
    "VERCEL",
    "CHAT_AI_ENABLED",
    "NEXT_PUBLIC_CHAT_AI_ENABLED",
    "OPENAI_API_KEY",
    "CONTACT_DAILY_CAP",
    "CHAT_AI_DAILY_CAP",
  ])
    vi.stubEnv(key, "");
}

export function validInquiry(overrides: Record<string, unknown> = {}) {
  return {
    name: "Test Visitor",
    email: "visitor@example.test",
    company: "Test Company",
    website: "https://example.test",
    service: "Custom Software",
    stage: "Idea / discovery",
    budget: "Not sure yet",
    timeline: "Flexible",
    details: "We need a customer portal for a repeatable internal workflow.",
    privacy: true,
    websiteTrap: "",
    submissionId: crypto.randomUUID(),
    ...overrides,
  };
}

export function post(
  path: string,
  body: unknown,
  headers: Record<string, string> = {},
) {
  return new Request(`https://codinginx.com${path}`, {
    method: "POST",
    headers: {
      Origin: "https://codinginx.com",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

export function emailReady() {
  vi.stubEnv("RESEND_API_KEY", "test-key-not-a-real-credential");
  vi.stubEnv("EMAIL_FROM", "inquiries@example.test");
}
