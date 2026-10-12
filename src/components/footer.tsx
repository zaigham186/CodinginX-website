import { Arrow } from "@/components/ui";
import Link from "next/link";
import { siteConfig, navigation } from "@/config/siteConfig";
import { Container } from "./ui";
import { Logo } from "./logo";
export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label="CodinginX home">
              <Logo />
            </Link>
            <p>
              Thoughtful engineering.
              <br />
              Useful digital products.
            </p>
            <a href={`mailto:${siteConfig.emails.general}`}>
              {siteConfig.emails.general}
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <p className="eyebrow">EXPLORE</p>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Company links">
            <p className="eyebrow">CONNECT</p>
            <Link href="/contact">Start a Project</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/faq">FAQ</Link>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <span className="sr-only">(opens in a new tab)</span>
              <Arrow />
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Based in the USA.</p>
          <nav aria-label="Legal links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
