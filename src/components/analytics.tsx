"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export type AnalyticsEvent =
  | "pageview"
  | "start_project"
  | "form_started"
  | "form_submitted"
  | "service_visited"
  | "demo_viewed"
  | "chatbot_opened";
type EventProperties = {
  source?:
    | "navigation"
    | "hero"
    | "footer"
    | "assistant"
    | "service"
    | "project"
    | "contact";
  demo?: "lead" | "operations";
  service?:
    | "custom-software"
    | "ai-automation"
    | "web-mobile-development"
    | "ui-ux-design";
};
type Consent = "accepted" | "declined" | null;
const consentKey = "codinginx.analytics-consent.v1";
let allowed = false;
const sources = new Set([
  "navigation",
  "hero",
  "footer",
  "assistant",
  "service",
  "project",
  "contact",
]);
const services = new Set([
  "custom-software",
  "ai-automation",
  "web-mobile-development",
  "ui-ux-design",
]);
const events = new Set<AnalyticsEvent>([
  "pageview",
  "start_project",
  "form_started",
  "form_submitted",
  "service_visited",
  "demo_viewed",
  "chatbot_opened",
]);

function privacySignal() {
  return (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

/** Only fixed event names and allowlisted non-personal attributes cross this boundary. */
export function trackEvent(
  name: AnalyticsEvent,
  properties: EventProperties = {},
) {
  if (
    typeof window === "undefined" ||
    !siteConfig.analytics.enabled ||
    !allowed ||
    privacySignal() ||
    !events.has(name)
  )
    return;
  const props: Record<string, string> = {};
  if (properties.source && sources.has(properties.source))
    props.source = properties.source;
  if (properties.demo === "lead" || properties.demo === "operations")
    props.demo = properties.demo;
  if (properties.service && services.has(properties.service))
    props.service = properties.service;
  // Queries, hashes, referral URLs, form fields and chat text are never included.
  const pathname = window.location.pathname;
  const publishedPaths = new Set([
    "/",
    "/services",
    "/services/custom-software",
    "/services/ai-automation",
    "/services/web-mobile-development",
    "/services/ui-ux-design",
    "/work",
    "/work/lead-intake",
    "/work/service-operations",
    "/insights",
    "/insights/plan-an-mvp-before-writing-code",
    "/insights/custom-software-vs-off-the-shelf-tools",
    "/insights/what-business-tasks-to-automate-first",
    "/about",
    "/process",
    "/contact",
    "/careers",
    "/privacy",
    "/terms",
    "/faq",
  ]);
  const knownPath = publishedPaths.has(pathname) ? pathname : "/404";
  void fetch("https://plausible.io/api/event", {
    method: "POST",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    keepalive: true,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      name,
      url: `https://${siteConfig.domain}${knownPath}`,
      domain: siteConfig.domain,
      props,
    }),
  }).catch(() => {
    /* Optional analytics must never interrupt the website. */
  });
}

export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!siteConfig.analytics.enabled) return;
    let saved: Consent = null;
    try {
      const value = localStorage.getItem(consentKey);
      if (value === "accepted" || value === "declined") saved = value;
    } catch {
      /* Consent can remain limited to this page when storage is unavailable. */
    }
    if (privacySignal()) saved = "declined";
    allowed = saved === "accepted";
    // Read browser-only preferences after hydration; the server cannot access localStorage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(saved);
    setReady(true);
    return () => {
      allowed = false;
    };
  }, []);

  useEffect(() => {
    if (!ready || consent !== "accepted") return;
    trackEvent("pageview");
    const slug = pathname.split("/")[2];
    if (pathname.startsWith("/services/") && services.has(slug))
      trackEvent("service_visited", {
        service: slug as EventProperties["service"],
      });
  }, [consent, pathname, ready]);

  useEffect(() => {
    function capture(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!target) return;
      const destination = new URL(target.href, window.location.origin);
      if (
        destination.origin === window.location.origin &&
        destination.pathname === "/contact"
      )
        trackEvent("start_project");
    }
    if (siteConfig.analytics.enabled)
      document.addEventListener("click", capture);
    return () => document.removeEventListener("click", capture);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    allowed = value === "accepted" && !privacySignal();
    const effective = allowed ? "accepted" : "declined";
    setConsent(effective);
    setSettingsOpen(false);
    try {
      localStorage.setItem(consentKey, effective);
    } catch {
      /* The current choice still applies in memory. */
    }
  }

  if (!siteConfig.analytics.enabled || !ready) return null;
  if (consent && !settingsOpen)
    return (
      <button
        type="button"
        className="analytics-settings"
        onClick={() => setSettingsOpen(true)}
      >
        Privacy preferences
      </button>
    );
  return (
    <aside
      className="analytics-consent"
      aria-label="Optional analytics preferences"
    >
      <div>
        <strong>Help us understand what is useful.</strong>
        <p>
          With your permission, Plausible measures page visits and interactions.
          Form details and assistant messages are excluded.{" "}
          <Link href="/privacy">Privacy Policy</Link>
        </p>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => choose("declined")}
        >
          Decline analytics
        </button>
        <button
          type="button"
          className="button"
          onClick={() => choose("accepted")}
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
