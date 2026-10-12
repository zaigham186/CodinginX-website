import Link from "next/link";
import {
  Container,
  Section,
  FinalCTA,
  Arrow,
  ButtonLink,
} from "@/components/ui";
import { ProductVisual } from "@/components/product-visual";
import { services } from "@/content/services";
import { serviceVisuals } from "@/content/presentation";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Services",
  "Custom software, practical AI and automation, web and mobile development, and product design from CodinginX.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <Container>
          <div className="section-index">
            <span>OUR SERVICES</span>
            <span>SOFTWARE + AI + DIGITAL PRODUCTS</span>
          </div>
          <h1 data-reveal="type">
            The right technology.
            <br />
            <span>The useful next step.</span>
          </h1>
          <div className="services-hero-bottom">
            <p>
              Start with the problem. Define what useful looks like. Build the
              software, interfaces, and connections that make it possible.
            </p>
            <nav aria-label="Service index">
              {services.map((service) => (
                <Link key={service.slug} href={"#" + service.slug}>
                  <span>{service.index}</span>
                  {service.title}
                  <Arrow />
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </section>
      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          className={
            "service-chapter service-chapter-" +
            (index % 2 ? "reverse" : "forward")
          }
        >
          <Container>
            <div className="service-chapter-top">
              <span className="service-chapter-number">{service.index}</span>
              <p className="eyebrow">{service.title}</p>
              <span className="service-chapter-coordinate">
                BUILT AROUND THE ACTUAL TASK
              </span>
            </div>
            <div className="service-chapter-grid">
              <div className="service-chapter-copy">
                <h2 data-reveal="type">{service.headline}</h2>
                <p className="lead">{service.summary}</p>
                <ul className="service-capability-index">
                  {service.capabilities.map((capability) => (
                    <li key={capability.title}>{capability.title}</li>
                  ))}
                </ul>
                <Link className="text-link" href={"/services/" + service.slug}>
                  Explore {service.title}
                  <Arrow />
                </Link>
              </div>
              <div>
                <ProductVisual
                  kind={
                    serviceVisuals[service.slug as keyof typeof serviceVisuals]
                      .kind
                  }
                />
                <p className="service-media-caption">
                  {
                    serviceVisuals[service.slug as keyof typeof serviceVisuals]
                      .caption
                  }
                </p>
              </div>
            </div>
          </Container>
        </Section>
      ))}
      <Section className="service-fit-section">
        <Container className="editorial-grid">
          <h2>
            Start with
            <br />
            the question.
          </h2>
          <div className="stack">
            <p className="lead">
              You do not need to arrive with a technology choice. Tell us what
              people need to do, what is slowing them down, and what you want to
              change.
            </p>
            <ButtonLink href="/contact">Start a Project</ButtonLink>
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
