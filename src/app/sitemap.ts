import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { services } from "@/content/services";
import { getPublishedProjects } from "@/content/projects";
import { getPublishedInsights } from "@/content/insights";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/work",
    "/about",
    "/process",
    "/insights",
    "/careers",
    "/contact",
    "/faq",
    ...services.map((s) => `/services/${s.slug}`),
    ...getPublishedProjects().map((p) => `/work/${p.slug}`),
    ...getPublishedInsights().map((a) => `/insights/${a.slug}`),
  ].map((path) => ({ url: `${siteConfig.url}${path}` }));
}
