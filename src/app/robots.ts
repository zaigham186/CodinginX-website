import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.NEXT_PUBLIC_SITE_LAUNCHED === "true" ? "/" : undefined,
      disallow:
        process.env.NEXT_PUBLIC_SITE_LAUNCHED === "true" ? ["/api/"] : "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
