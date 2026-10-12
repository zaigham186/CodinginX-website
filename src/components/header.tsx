"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navigation, siteConfig } from "@/config/siteConfig";
import { Logo } from "./logo";
import { Arrow } from "./ui";

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);
  const close = () => {
    dialog.current?.close();
    trigger.current?.focus();
  };
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo-link" aria-label="CodinginX home">
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className="button button-primary header-cta"
          href={siteConfig.cta.href}
        >
          {siteConfig.cta.label}
          <Arrow />
        </Link>
        <button
          className="menu-toggle"
          ref={trigger}
          onClick={() => dialog.current?.showModal()}
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          aria-label="Open navigation"
        >
          <span>Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <dialog
          ref={dialog}
          id="mobile-navigation"
          className="mobile-dialog"
          aria-label="Navigation menu"
          onClose={() => trigger.current?.focus()}
        >
          <div className="mobile-dialog-content">
            <div className="mobile-menu-top">
              <Link href="/" aria-label="CodinginX home" onClick={close}>
                <Logo />
              </Link>
              <button
                className="menu-toggle"
                onClick={close}
                aria-label="Close navigation"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={active(item.href) ? "page" : undefined}
                >
                  <span className="number">0{index + 1}</span>
                  {item.label}
                  <Arrow />
                </Link>
              ))}
            </nav>
            <Link
              className="button button-primary"
              href={siteConfig.cta.href}
              onClick={close}
            >
              {siteConfig.cta.label}
              <Arrow />
            </Link>
            <a
              className="mobile-email"
              href={`mailto:${siteConfig.emails.general}`}
            >
              {siteConfig.emails.general}
            </a>
          </div>
        </dialog>
      </div>
    </header>
  );
}
