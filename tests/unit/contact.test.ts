import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { handleContact } from "@/lib/server/contact";
import { clearLocalStateForTests } from "@/lib/server/state";
import { configureLocal, emailReady, post, validInquiry } from "./helpers";

beforeEach(() => {
  configureLocal();
  clearLocalStateForTests();
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("contact delivery lifecycle", () => {
  it("returns unavailable without credentials and never pretends to submit", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await handleContact(post("/api/contact", validInquiry()));
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("delivers an internal text-only inquiry before acknowledgement, then deduplicates retries", async () => {
    emailReady();
    const fetchMock = vi
      .fn()
      .mockImplementation(async () =>
        Response.json({ id: "provider-email-id" }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const data = validInquiry({
      details:
        '<script>alert("xss")</script> should only ever appear as plain email text.',
    });
    const response = await handleContact(post("/api/contact", data));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      acknowledgement: "sent",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const internal = JSON.parse(fetchMock.mock.calls[0][1].body);
    const acknowledgement = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(internal.to).toEqual(["info@codinginx.com"]);
    expect(internal.reply_to).toBe(data.email);
    expect(internal.html).toBeUndefined();
    expect(internal.text).toContain("<script>");
    expect(acknowledgement.to).toEqual([data.email]);
    expect(acknowledgement.text).not.toContain("<script>");
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.resend.com/emails");
    expect(fetchMock.mock.calls[0][1].headers["Idempotency-Key"]).toBe(
      `inquiry-${data.submissionId}`,
    );
    const retry = await handleContact(post("/api/contact", data));
    expect(retry.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(
      (
        await handleContact(
          post("/api/contact", { ...data, company: "Changed company" }),
        )
      ).status,
    ).toBe(409);
  });
  it("rejects malformed input, honeypots, cross-site requests, invalid content types and oversized payloads before provider calls", async () => {
    emailReady();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(
      (
        await handleContact(
          post("/api/contact", validInquiry({ email: "invalid" })),
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await handleContact(
          post("/api/contact", validInquiry({ websiteTrap: "bot-entry" })),
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await handleContact(
          post("/api/contact", validInquiry(), {
            Origin: "https://attacker.test",
          }),
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await handleContact(
          post("/api/contact", validInquiry(), {
            "Content-Type": "text/plain",
          }),
        )
      ).status,
    ).toBe(415);
    expect(
      (
        await handleContact(
          post("/api/contact", validInquiry({ details: "x".repeat(20_000) })),
        )
      ).status,
    ).toBe(413);
    expect(
      (
        await handleContact(
          new Request("https://codinginx.com/api/contact", {
            method: "POST",
            headers: {
              Origin: "https://codinginx.com",
              "Content-Type": "application/json",
            },
            body: "{broken",
          }),
        )
      ).status,
    ).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("does not acknowledge a failed provider and reuses the provider key when retrying", async () => {
    emailReady();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({ error: "private-provider-error" }, { status: 500 }),
      )
      .mockImplementation(async () => Response.json({ id: "email-id" }));
    vi.stubGlobal("fetch", fetchMock);
    const data = validInquiry();
    const response = await handleContact(post("/api/contact", data));
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("private-provider-error");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const retry = await handleContact(post("/api/contact", data));
    expect(retry.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[0][1].headers["Idempotency-Key"]).toBe(
      fetchMock.mock.calls[1][1].headers["Idempotency-Key"],
    );
  });
  it("reports accepted internal delivery and a pending acknowledgement without resending the lead", async () => {
    emailReady();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ id: "internal-id" }))
      .mockResolvedValueOnce(
        Response.json({ error: "ack-failure" }, { status: 500 }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const data = validInquiry();
    const response = await handleContact(post("/api/contact", data));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      acknowledgement: "pending",
    });
    const retry = await handleContact(post("/api/contact", data));
    expect(retry.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it("prevents parallel submissions from causing duplicate email delivery", async () => {
    emailReady();
    const fetchMock = vi.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
      return Response.json({ id: "provider-id" });
    });
    vi.stubGlobal("fetch", fetchMock);
    const data = validInquiry();
    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        handleContact(post("/api/contact", data)),
      ),
    );
    expect(results.filter((response) => response.status === 200)).toHaveLength(
      1,
    );
    expect(results.filter((response) => response.status === 409)).toHaveLength(
      19,
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it("enforces global and recipient email caps before spending on delivery", async () => {
    emailReady();
    vi.stubEnv("CONTACT_DAILY_CAP", "2");
    const fetchMock = vi
      .fn()
      .mockImplementation(async () => Response.json({ id: "email-id" }));
    vi.stubGlobal("fetch", fetchMock);
    expect(
      (await handleContact(post("/api/contact", validInquiry()))).status,
    ).toBe(200);
    expect(
      (await handleContact(post("/api/contact", validInquiry()))).status,
    ).toBe(200);
    const limited = await handleContact(post("/api/contact", validInquiry()));
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBe("900");
    expect(fetchMock).toHaveBeenCalledTimes(4);
    clearLocalStateForTests();
    vi.stubEnv("CONTACT_DAILY_CAP", "100");
    for (let i = 0; i < 3; i++)
      expect(
        (await handleContact(post("/api/contact", validInquiry()))).status,
      ).toBe(200);
    expect(
      (await handleContact(post("/api/contact", validInquiry()))).status,
    ).toBe(429);
  });
  it("fails closed with configured email but missing production limiter", async () => {
    emailReady();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RATE_LIMIT_SECRET", "test-secret-for-hmac-with-32-characters");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(
      (await handleContact(post("/api/contact", validInquiry()))).status,
    ).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("returns a retryable error after provider timeout without sending acknowledgement", async () => {
    vi.useFakeTimers();
    emailReady();
    const fetchMock = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) =>
          init.signal?.addEventListener("abort", () =>
            reject(new Error("aborted")),
          ),
        ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const responsePromise = handleContact(post("/api/contact", validInquiry()));
    await vi.advanceTimersByTimeAsync(8001);
    const response = await responsePromise;
    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
