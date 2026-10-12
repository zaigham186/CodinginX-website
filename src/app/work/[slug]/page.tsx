import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublishedProjects, getProjectBySlug } from "@/content/projects";
import {
  Container,
  Section,
  ButtonLink,
  FinalCTA,
  Arrow,
} from "@/components/ui";
import { LeadIntakeDemo, OperationsDemo } from "@/components/demos";
import { ProjectGallery } from "@/components/project-gallery";
import { SystemArchitecture } from "@/components/product-visual";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return getPublishedProjects().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProjectBySlug((await params).slug);
  if (!p) notFound();
  return pageMetadata(p.title, p.summary, "/work/" + p.slug);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProjectBySlug((await params).slug);
  if (!p) notFound();
  const intake = p.demo === "lead-intake";
  return (
    <>
      <section
        className={"case-hero case-hero-" + (intake ? "intake" : "operations")}
      >
        <Container>
          <div className="section-index">
            <span>
              {p.typeLabel} / {p.category}
            </span>
            <Link href="/work">
              ALL WORK <Arrow />
            </Link>
          </div>
          <h1 data-reveal="type">{p.title}</h1>
          <div className="case-hero-summary">
            <p>{p.summary}</p>
            <div>
              {p.demo && (
                <ButtonLink href="#try-workflow">Try the workflow</ButtonLink>
              )}
              <span>{p.technologies.join(" / ")}</span>
            </div>
          </div>
          {(p.liveUrl || p.repositoryUrl) && (
            <div className="button-row">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live project
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {p.repositoryUrl && (
                <a
                  href={p.repositoryUrl}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source code
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
          {p.demo && (
            <ProjectGallery project={intake ? "intake" : "operations"} />
          )}
        </Container>
      </section>
      <Section className="case-context">
        <Container>
          <div className="section-index">
            <span>01 / THE CONTEXT</span>
            <span>THE TASK BEFORE THE TECHNOLOGY</span>
          </div>
          <div className="case-context-grid">
            <h2>
              Make the work
              <br />
              easier to understand.
            </h2>
            <div className="stack">
              <p className="lead">{p.overview}</p>
              <div className="case-problem">
                <h3>The problem</h3>
                <p>{p.problem}</p>
              </div>
              <div className="case-solution">
                <h3>The approach</h3>
                <p>{p.solution}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {p.workflow.length > 0 && (
        <Section className="case-workflow">
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / THE WORKFLOW</p>
                <h2>
                  Every step.
                  <br />A clear purpose.
                </h2>
              </div>
              <p>
                The interface follows the task.
                <br />
                The system follows the boundary.
              </p>
            </div>
            {p.demo && (
              <SystemArchitecture variant={intake ? "intake" : "operations"} />
            )}
            <ol className="case-workflow-steps">
              {p.workflow.map((step, index) => (
                <li key={step.title}>
                  <span className="number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}
      {p.demo && (
        <Section
          className={
            "case-live-section case-live-" + (intake ? "intake" : "operations")
          }
          id="try-workflow"
        >
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / THE WORKING PRODUCT</p>
                <h2>Try the workflow.</h2>
              </div>
              <p>
                Use the sample. Change the input.
                <br />
                Inspect what actually happens.
              </p>
            </div>
            <div className="live-demo-canvas">
              {intake ? <LeadIntakeDemo /> : <OperationsDemo />}
            </div>
            <p className="case-demo-caption">
              A working internal demonstration with fictional sample data. Its
              browser-local behavior and boundaries are explained below.
            </p>
          </Container>
        </Section>
      )}
      {p.screenshots.length > 0 && (
        <Section>
          <Container className="stack">
            <h2>A closer look.</h2>
            {p.screenshots.map((shot) => (
              <figure key={shot.src}>
                <Image
                  {...shot}
                  sizes="(max-width: 767px) 100vw, 1320px"
                  className="project-screenshot"
                />
                <figcaption>{shot.alt}</figcaption>
              </figure>
            ))}
          </Container>
        </Section>
      )}
      <Section className="case-scope">
        <Container className="case-scope-grid">
          <div>
            <p className="eyebrow">WHAT YOU CAN INSPECT</p>
            <h2>
              The details
              <br />
              that make it useful.
            </h2>
            <ul className="rule-list">
              {p.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <h3>Intended benefit</h3>
            <p>{p.intendedBenefit}</p>
            {p.verifiedResults.length > 0 && (
              <>
                <h3>Verified results</h3>
                <ul className="rule-list">
                  {p.verifiedResults.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {p.limitations.length > 0 && (
            <aside className="case-boundaries">
              <p className="eyebrow">EXPLICIT BOUNDARIES</p>
              <h2>
                {p.type === "internal-demonstration"
                  ? "Where the demo ends."
                  : "Scope and limitations."}
              </h2>
              <ul>
                {p.limitations.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            </aside>
          )}
        </Container>
      </Section>
      <Section className="case-next">
        <Container className="editorial-grid">
          <h2>
            Have a similar
            <br />
            workflow in mind?
          </h2>
          <div className="stack">
            <p className="lead">
              Let’s talk about the people, systems, and constraints behind your
              version.
            </p>
            <ButtonLink
              href={
                p.demo
                  ? "/contact?project=" + (intake ? "lead" : "operations")
                  : "/contact"
              }
            >
              Start a Project
            </ButtonLink>
            <p>
              <Link
                className="text-link"
                href={"/services/" + p.relatedService}
              >
                Explore the related service <Arrow />
              </Link>
            </p>
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
