import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import {
  clearLocalStateForTests,
  consumeLimits,
  reserveDelivery,
  updateDelivery,
} from "@/lib/server/state";
import { configureLocal } from "./helpers";

beforeEach(() => {
  configureLocal();
  clearLocalStateForTests();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("distributed limits and idempotency", () => {
  it("reserves only one concurrent owner and rejects changed content", async () => {
    const limits = [{ key: "visitor", maximum: 5, seconds: 900 }];
    const results = await Promise.all(
      Array.from({ length: 100 }, (_, index) =>
        reserveDelivery("same-id", "fingerprint", `owner-${index}`, limits),
      ),
    );
    expect(
      results.filter((result) => result.status === "reserved"),
    ).toHaveLength(1);
    expect(results.filter((result) => result.status === "busy")).toHaveLength(
      99,
    );
    expect(
      await reserveDelivery("same-id", "changed", "other-owner", limits),
    ).toEqual({ status: "conflict" });
    await updateDelivery("same-id", "owner-0", "delivered", "sent");
    expect(
      await reserveDelivery("same-id", "fingerprint", "other-owner", limits),
    ).toEqual({ status: "delivered", acknowledgement: "sent" });
  });
  it("enforces atomic caps without spending a different bucket on rejected requests", async () => {
    expect(
      await consumeLimits([{ key: "global", maximum: 1, seconds: 30 }]),
    ).toBe(true);
    expect(
      await consumeLimits([
        { key: "fresh", maximum: 1, seconds: 30 },
        { key: "global", maximum: 1, seconds: 30 },
      ]),
    ).toBe(false);
    expect(
      await consumeLimits([{ key: "fresh", maximum: 1, seconds: 30 }]),
    ).toBe(true);
    const results = await Promise.all(
      Array.from({ length: 100 }, () =>
        consumeLimits([{ key: "concurrent", maximum: 10, seconds: 30 }]),
      ),
    );
    expect(results.filter(Boolean)).toHaveLength(10);
  });
  it("expires rate windows and permits retry after a crashed lease without discarding the fingerprint", async () => {
    vi.useFakeTimers();
    const limits = [{ key: "visitor", maximum: 2, seconds: 10 }];
    await reserveDelivery("id", "fingerprint", "owner", limits);
    await vi.advanceTimersByTimeAsync(60_001);
    expect(
      await reserveDelivery("id", "different", "next-owner", limits),
    ).toEqual({ status: "conflict" });
    expect(
      await reserveDelivery("id", "fingerprint", "next-owner", limits),
    ).toEqual({ status: "reserved" });
    await updateDelivery("id", "owner", "delivered", "sent");
    expect(
      await reserveDelivery("id", "fingerprint", "third-owner", limits),
    ).toEqual({ status: "busy" });
  });
  it("fails closed in production without distributed storage or with invalid provider configuration", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(
      consumeLimits([{ key: "global", maximum: 1, seconds: 10 }]),
    ).rejects.toMatchObject({ status: 503 });
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "http://127.0.0.1:6379");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-value");
    await expect(
      consumeLimits([{ key: "global", maximum: 1, seconds: 10 }]),
    ).rejects.toMatchObject({ status: 503 });
  });
  it("uses one atomic Redis EVAL and fails closed on upstream failure", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://configured-test.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-value");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(Response.json({ result: ["reserved"] }));
    vi.stubGlobal("fetch", fetchMock);
    expect(
      await reserveDelivery("id", "hash", "owner", [
        { key: "cap", maximum: 1, seconds: 10 },
      ]),
    ).toEqual({ status: "reserved" });
    const command = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(command[0]).toBe("EVAL");
    expect(command[2]).toBe(2);
    expect(command[3]).toBe("codinginx:v1:delivery:id");
    expect(command[4]).toBe("codinginx:v1:cap");
    fetchMock.mockResolvedValue(
      Response.json({ error: "provider detail" }, { status: 500 }),
    );
    await expect(
      consumeLimits([{ key: "cap", maximum: 1, seconds: 10 }]),
    ).rejects.toMatchObject({
      status: 503,
      category: "distributed_state_unavailable",
    });
  });
});
