import { expect, it, vi } from "vitest";
import { GET } from "@/app/api/health/route";

it("reports liveness without revealing integration configuration or caching", async () => {
  vi.stubEnv("RESEND_API_KEY", "test-private-value");
  try {
    const response = GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.json()).toEqual({ status: "ok" });
  } finally {
    vi.unstubAllEnvs();
  }
});
