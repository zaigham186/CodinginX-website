import Link from "next/link";
import {
  Container,
  Section,
  PageIntro,
  FinalCTA,
  Arrow,
} from "@/components/ui";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Services",
  "Custom software, practical AI and automation, web and mobile development, and product design from CodinginX.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR SERVICES"
        title="The right technology for the work ahead."
        description="Start with the problem. Define what useful looks like. Build the software, interfaces, and connections that make it possible."
      />
      <Section>
        <Container>
          {services.map((service) => (
            <article
              className="service-feature editorial-grid"
              key={service.slug}
            >
              <div>
                <p className="eyebrow">
                  {service.index} / {service.title}
                </p>
                <h2>{service.headline}</h2>
              </div>
              <div className="stack">
                <p className="lead">{service.summary}</p>
                <ul className="capability-tags">
                  {service.capabilities.map((cap) => (
                    <li key={cap.title}>{cap.title}</li>
                  ))}
                </ul>
                <Link href={`/services/${service.slug}`} className="text-link">
                  Explore {service.title} <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </Section>
      <Section className="problem-section">
        <Container className="editorial-grid">
          <h2>
            Not sure where
            <br />
            your project fits?
          </h2>
          <div className="stack">
            <p className="lead">
              You do not need to arrive with a technology choice. Tell us what
              people need to do, what is slowing them down, and what you want to
              change.
            </p>
            <Link href="/contact" className="text-link">
              Start a Project <Arrow />
            </Link>
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
