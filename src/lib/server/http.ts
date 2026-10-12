import { siteConfig } from "@/config/siteConfig";
import "server-only";
import { createHash, createHmac, randomUUID } from "node:crypto";
import { serverConfig } from "./config";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public category = "request_rejected",
    public retryAfter?: number,
  ) {
    super(message);
  }
}

export function json(body: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

export function requestId() {
  return randomUUID();
}

export function safeLog(
  route: string,
  operation: string,
  id: string,
  category: string,
) {
  console.warn(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      route,
      operation,
      requestId: id,
      category,
    }),
  );
}

export function errorResponse(error: unknown, route: string, id: string) {
  const known = error instanceof HttpError;
  const status = known ? error.status : 503;
  if (status >= 500)
    safeLog(
      route,
      "request_failed",
      id,
      known ? error.category : "unexpected_failure",
    );
  return json(
    {
      ok: false,
      message: known
        ? error.message
        : `This service is temporarily unavailable. Please try again or email ${siteConfig.emails.general}.`,
      requestId: id,
    },
    status,
    known && error.retryAfter
      ? { "Retry-After": String(error.retryAfter) }
      : undefined,
  );
}

export function enforceOrigin(request: Request) {
  const config = serverConfig();
  const origin = request.headers.get("origin");
  let allowed = origin === config.origin;
  if (config.previewOrigin) {
    try {
      const preview = new URL(config.previewOrigin);
      allowed ||=
        preview.protocol === "https:" &&
        preview.origin === config.previewOrigin &&
        origin === config.previewOrigin;
    } catch {
      /* An invalid configuration never broadens access. */
    }
  }
  if (!config.production && origin) {
    try {
      const url = new URL(origin);
      allowed ||=
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) &&
        ["http:", "https:"].includes(url.protocol) &&
        url.origin === origin;
    } catch {
      /* Reject malformed origins. */
    }
  }
  if (!allowed || request.headers.get("sec-fetch-site") === "cross-site")
    throw new HttpError(
      403,
      "Please submit this request from the CodinginX website.",
    );
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  )
    throw new HttpError(415, "Send a JSON request.");
}

export async function readJson(request: Request, maxBytes: number) {
  const declaredLength = request.headers.get("content-length");
  if (
    declaredLength &&
    (!/^\d+$/.test(declaredLength) || Number(declaredLength) > maxBytes)
  )
    throw new HttpError(
      413,
      "Your message is too large. Please shorten it and try again.",
    );
  if (!request.body) throw new HttpError(400, "Please provide a request body.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  const timeout = setTimeout(() => {
    void reader.cancel();
  }, 5000);
  const started = Date.now();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (Date.now() - started >= 5000)
        throw new HttpError(
          408,
          "The request took too long. Please try again.",
        );
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new HttpError(
          413,
          "Your message is too large. Please shorten it and try again.",
        );
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    ) as unknown;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(
      400,
      "The request could not be read. Please try again.",
    );
  } finally {
    clearTimeout(timeout);
    reader.releaseLock();
  }
}

export function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function privateIdentifier(value: string) {
  const config = serverConfig();
  if (config.production && config.rateSecret.length < 32)
    throw new HttpError(
      503,
      `This service is temporarily unavailable. Please email ${siteConfig.emails.general}.`,
      "rate_secret_unconfigured",
    );
  return createHmac("sha256", config.rateSecret || "local-development-only")
    .update(value)
    .digest("hex");
}

export function clientIdentity(request: Request) {
  const config = serverConfig();
  // Trust only a header explicitly overwritten by the deployment's reverse proxy.
  const header =
    process.env.VERCEL === "1" ? "x-vercel-forwarded-for" : config.proxyHeader;
  const allowed = [
    "x-vercel-forwarded-for",
    "x-real-ip",
    "x-forwarded-for",
  ].includes(header);
  const ip = allowed
    ? request.headers.get(header)?.split(",")[0]?.trim().slice(0, 100)
    : undefined;
  return privateIdentifier(ip || "shared-unidentified-client");
}

export async function providerJson(
  url: string,
  init: RequestInit,
  timeoutMs = 8000,
): Promise<{ response: Response; body: unknown }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: "error",
      cache: "no-store",
    });
    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 32_768) {
            await reader.cancel();
            throw new Error("response_too_large");
          }
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    let body: unknown = null;
    try {
      body = JSON.parse(text);
    } catch {
      /* Provider HTML/errors are never forwarded. */
    }
    return { response, body };
  } finally {
    clearTimeout(timer);
  }
}
