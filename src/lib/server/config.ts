import "server-only";
import { siteConfig } from "@/config/siteConfig";

const positiveInteger = (
  value: string | undefined,
  fallback: number,
  ceiling: number,
) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, ceiling)
    : fallback;
};

export function serverConfig() {
  return {
    production: process.env.NODE_ENV === "production",
    origin: siteConfig.url,
    previewOrigin: process.env.SITE_PREVIEW_ORIGIN?.trim() || "",
    redisUrl: process.env.UPSTASH_REDIS_REST_URL?.trim() || "",
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || "",
    rateSecret: process.env.RATE_LIMIT_SECRET || "",
    emailKey: process.env.RESEND_API_KEY || "",
    emailFrom: process.env.EMAIL_FROM?.trim() || "",
    emailTo: siteConfig.emails.general,
    contactDailyCap: positiveInteger(process.env.CONTACT_DAILY_CAP, 100, 1000),
    aiKey: process.env.OPENAI_API_KEY || "",
    aiEnabled:
      process.env.CHAT_AI_ENABLED === "true" &&
      process.env.NEXT_PUBLIC_CHAT_AI_ENABLED === "true",
    aiModel: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
    aiDailyCap: positiveInteger(process.env.CHAT_AI_DAILY_CAP, 100, 1000),
    proxyHeader: process.env.TRUSTED_PROXY_IP_HEADER?.toLowerCase() || "",
  };
}

export function emailConfigured() {
  const config = serverConfig();
  return (
    !!config.emailKey &&
    /^[^\r\n<>]+@[^\r\n<>]+\.[^\r\n<>]+$/.test(config.emailFrom)
  );
}
