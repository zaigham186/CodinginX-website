import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import {
  clientIdentity,
  enforceOrigin,
  errorResponse,
  privateIdentifier,
  providerJson,
  readJson,
  safeLog,
} from "@/lib/server/http";
import { configureLocal, post } from "./helpers";

beforeEach(configureLocal);
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("API security boundary", () => {
  it("requires exact approved origin and JSON", () => {
    expect(() => enforceOrigin(post("/api/contact", {}))).not.toThrow();
    for (const Origin of [
      "https://codinginx.com.evil.test",
      "null",
      "https://www.codinginx.com",
      "https://evil.test",
    ])
      expect(() =>
        enforceOrigin(post("/api/contact", {}, { Origin })),
      ).toThrow();
    expect(() =>
      enforceOrigin(
        post("/api/contact", {}, { "sec-fetch-site": "cross-site" }),
      ),
    ).toThrow();
    expect(() =>
      enforceOrigin(post("/api/contact", {}, { "Content-Type": "text/plain" })),
    ).toThrow();
    const request = post("/api/contact", {});
    request.headers.delete("origin");
    expect(() => enforceOrigin(request)).toThrow();
  });
  it("allows localhost only outside production and explicit HTTPS preview origins", () => {
    expect(() =>
      enforceOrigin(
        post("/api/contact", {}, { Origin: "http://localhost:3000" }),
      ),
    ).not.toThrow();
    vi.stubEnv("NODE_ENV", "production");
    expect(() =>
      enforceOrigin(
        post("/api/contact", {}, { Origin: "http://localhost:3000" }),
      ),
    ).toThrow();
    vi.stubEnv("SITE_PREVIEW_ORIGIN", "https://approved.example.test");
    expect(() =>
      enforceOrigin(
        post("/api/contact", {}, { Origin: "https://approved.example.test" }),
      ),
    ).not.toThrow();
    vi.stubEnv("SITE_PREVIEW_ORIGIN", "https://approved.example.test/path");
    expect(() =>
      enforceOrigin(
        post("/api/contact", {}, { Origin: "https://approved.example.test" }),
      ),
    ).toThrow();
  });
  it("bounds actual stream bytes independently of Content-Length", async () => {
    await expect(
      readJson(post("/api/contact", { message: "a".repeat(1000) }), 32),
    ).rejects.toMatchObject({ status: 413 });
    await expect(
      readJson(post("/api/contact", {}, { "content-length": "100000" }), 32),
    ).rejects.toMatchObject({ status: 413 });
    await expect(
      readJson(
        new Request("https://codinginx.com", {
          method: "POST",
          body: "{malformed",
        }),
        200,
      ),
    ).rejects.toMatchObject({ status: 400 });
    expect(await readJson(post("/api/contact", { x: true }), 200)).toEqual({
      x: true,
    });
  });
  it("does not trust arbitrary forwarding headers and hashes configured identities", () => {
    expect(
      clientIdentity(
        post("/api/contact", {}, { "x-forwarded-for": "192.0.2.1" }),
      ),
    ).toBe(
      clientIdentity(
        post("/api/contact", {}, { "x-forwarded-for": "192.0.2.2" }),
      ),
    );
    vi.stubEnv("TRUSTED_PROXY_IP_HEADER", "x-real-ip");
    expect(
      clientIdentity(post("/api/contact", {}, { "x-real-ip": "192.0.2.1" })),
    ).not.toBe(
      clientIdentity(post("/api/contact", {}, { "x-real-ip": "192.0.2.2" })),
    );
    expect(privateIdentifier("visitor@example.test")).not.toContain("visitor");
    vi.stubEnv("NODE_ENV", "production");
    expect(() => privateIdentifier("visitor")).toThrow();
  });
  it("returns safe errors and logs no provider error or lead data", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const response = errorResponse(
      new Error("secret-key visitor@example.test"),
      "/api/contact",
      "request-id",
    );
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("secret-key");
    expect(response.headers.get("cache-control")).toBe("no-store");
    safeLog("/api/chat", "classify", "request-id", "provider_unavailable");
    expect(JSON.stringify(warn.mock.calls)).not.toContain(
      "visitor@example.test",
    );
    expect(JSON.stringify(warn.mock.calls)).not.toContain("secret-key");
  });
  it("aborts slow providers with no retry", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) =>
          init.signal?.addEventListener("abort", () =>
            reject(new Error("aborted")),
          ),
        ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const promise = providerJson("https://api.resend.com/emails", {}, 50);
    const assertion = expect(promise).rejects.toThrow("aborted");
    await vi.advanceTimersByTimeAsync(51);
    await assertion;
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      redirect: "error",
      cache: "no-store",
    });
  });
  it("bounds provider response streams before parsing them", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("x".repeat(32_769))),
    );
    await expect(
      providerJson("https://api.resend.com/emails", {}),
    ).rejects.toThrow("response_too_large");
  });
});
