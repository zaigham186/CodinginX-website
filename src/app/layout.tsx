import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@/styles/globals.css";
import { siteConfig } from "@/config/siteConfig";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SiteAssistant } from "@/components/assistant";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CodinginX | Software Engineering & AI Solutions",
    template: "%s | CodinginX",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots:
    process.env.NEXT_PUBLIC_SITE_LAUNCHED === "true"
      ? { index: true, follow: true }
      : { index: false, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {siteConfig.chatbot.enabled && <SiteAssistant />}
        <Analytics />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            email: siteConfig.emails.general,
            sameAs: [siteConfig.socials.instagram],
          }}
        />
      </body>
    </html>
  );
}
