import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/content/services";
import { getProjectBySlug } from "@/content/projects";
import {
  Container,
  Section,
  FinalCTA,
  FAQAccordion,
  Arrow,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { ServiceHero } from "@/components/service-hero";
import { ScrollStory } from "@/components/scroll-story";
import { DesignJourney } from "@/components/design-journey";
import { ProductVisual, SystemArchitecture } from "@/components/product-visual";
import { serviceVisuals } from "@/content/presentation";
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  return pageMetadata(
    service.title,
    service.description,
    `/services/${service.slug}`,
  );
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  const project = getProjectBySlug(service.relatedProject);
  return (
    <>
      <ServiceHero
        slug={service.slug as keyof typeof serviceVisuals}
        index={service.index}
        title={service.title}
        headline={service.headline}
        summary={service.summary}
        cta={service.cta}
      />
      <Section>
        <Container className="editorial-grid">
          <h2>
            A problem worth
            <br />
            solving well.
          </h2>
          <div className="stack">
            <p className="lead">{service.problem}</p>
            <p className="muted">{service.audience}</p>
          </div>
        </Container>
      </Section>
      {service.slug === "ai-automation" && (
        <Section className="automation-story-section">
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">A SYSTEM, NOT A SPECTACLE</p>
                <h2>
                  Follow the information.
                  <br />
                  See what changes.
                </h2>
              </div>
              <p>
                A possible automation architecture.
                <br />A person stays in control.
              </p>
            </div>
            <ScrollStory />
          </Container>
        </Section>
      )}
      {service.slug === "custom-software" && (
        <Section className="software-architecture-section">
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">INSIDE A WORKING EXAMPLE</p>
                <h2>
                  Build the workflow.
                  <br />
                  Make the boundaries clear.
                </h2>
              </div>
              <p>
                Our browser-local operations demo
                <br />
                makes the core interactions inspectable.
              </p>
            </div>
            <SystemArchitecture variant="operations" />
          </Container>
        </Section>
      )}
      {service.slug === "ui-ux-design" && (
        <Section className="design-journey-section">
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">FROM THE TASK TO THE INTERFACE</p>
                <h2>
                  Every screen
                  <br />
                  starts with a question.
                </h2>
              </div>
              <p>
                Explore artifacts based on
                <br />
                our working Intake lab demonstration.
              </p>
            </div>
            <DesignJourney />
          </Container>
        </Section>
      )}
      {service.slug === "web-mobile-development" && (
        <Section className="responsive-experience-section">
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">ONE EXPERIENCE / DIFFERENT SCREENS</p>
                <h2>
                  Built for use.
                  <br />
                  Wherever it happens.
                </h2>
              </div>
              <p>
                Real desktop and mobile views
                <br />
                of our working operations demonstration.
              </p>
            </div>
            <ProductVisual kind="responsive" />
          </Container>
        </Section>
      )}
      <Section className="service-capabilities">
        <Container className="editorial-grid">
          <div>
            <p className="eyebrow">WHAT WE CAN BUILD</p>
            <h2>
              Designed around
              <br />
              the actual task.
            </h2>
          </div>
          <ul className="rule-list">
            {service.capabilities.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="problem-section">
        <Container>
          <h2>What this can look like.</h2>
          <div className="two-col scenario-grid">
            {service.scenarios.map((item) => (
              <article key={item.title} className="stack">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="editorial-grid">
          <h2>
            From problem
            <br />
            to implementation.
          </h2>
          <ol className="process-list">
            {service.process.map((step, i) => (
              <li key={step}>
                <span className="number">0{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      {project && (
        <Section className="related-project">
          <Container className="editorial-grid">
            <p className="eyebrow">EXPLORE A WORKING DEMONSTRATION</p>
            <div className="stack">
              <h2 data-reveal="type">{project.title}</h2>
              <p className="lead">{project.summary}</p>
              <p className="muted">
                Internal demonstration. Its scope and limitations are explained
                on the project page.
              </p>
              <Link className="text-link" href={`/work/${project.slug}`}>
                Explore the project <Arrow />
              </Link>
            </div>
          </Container>
        </Section>
      )}
      <Section>
        <Container className="editorial-grid">
          <h2>
            Questions
            <br />
            before you start.
          </h2>
          <FAQAccordion items={service.faq} />
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
