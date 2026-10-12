import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/siteConfig";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
}
export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`page-intro ${className}`}>
      <Container>
        <div className="intro-heading-meta">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <span className="intro-registration" aria-hidden="true">
            <i />
            <i />
          </span>
        </div>
        <h1 data-reveal="type">{title}</h1>
        {description && <p className="lead">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
export function FAQAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta studio-final-cta">
      <Container>
        <svg
          className="cta-brand-mark"
          aria-hidden="true"
          viewBox="0 0 200 200"
        >
          <path
            d="M30 20h35l105 160h-35L30 20Zm105 0h35L65 180H30L135 20Z"
            fill="currentColor"
          />
        </svg>
        <p className="eyebrow">LET’S BUILD SOMETHING USEFUL</p>
        <div className="final-cta-inner">
          <h2 data-reveal="type">
            Let’s build
            <br />
            <span>the next chapter.</span>
          </h2>
          <div>
            <p>
              Tell us what you’re working on.
              <br />
              We’ll start with the problem you need to solve.
            </p>
            <ButtonLink href={siteConfig.cta.href}>
              {siteConfig.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
