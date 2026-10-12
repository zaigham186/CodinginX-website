import { founders } from "@/content/team";
export const siteConfig = {
  name: "CodinginX",
  company: "CodinginX",
  legalName: null,
  tagline: "Engineering ideas into intelligent digital products.",
  description:
    "CodinginX is a USA-based software engineering and AI solutions partner. We build custom software, automate business workflows, and design useful digital products.",
  domain: "codinginx.com",
  url: "https://codinginx.com",
  location: "USA",
  emails: {
    general: "info@codinginx.com",
    careers: "careers@codinginx.com",
    social: "social@codinginx.com",
    founder: "suleman@codinginx.com",
  },
  phone: null,
  whatsapp: null,
  logo: { type: "wordmark", mark: "/brand/mark.svg" },
  socials: { instagram: "https://www.instagram.com/codinginx_official/" },
  founders,
  cta: { label: "Start a Project", href: "/contact" },
  analytics: { enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" },
  chatbot: { enabled: true },
} as const;

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;
