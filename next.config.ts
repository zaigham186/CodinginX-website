import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" ? " https://plausible.io" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" ? " https://plausible.io" : ""}`,
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(!isDev ? ["upgrade-insecure-requests"] : []),
].join("; ");
const nextConfig: NextConfig = {
  // Browser QA uses this loopback host; this only affects development resources.
  allowedDevOrigins: ["127.0.0.1"],
  // TS6 compiler API avoids a detached CLI subprocess in restricted build runners.
  experimental: { useTypeScriptCli: false },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          ...(!isDev
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.codinginx.com" }],
        destination: "https://codinginx.com/:path*",
        permanent: true,
      },
      ...[
        "custom-software",
        "ai-automation",
        "web-mobile-development",
        "ui-ux-design",
      ].map((slug) => ({
        source: `/${slug}`,
        destination: `/services/${slug}`,
        permanent: true,
      })),
    ];
  },
};
export default nextConfig;
