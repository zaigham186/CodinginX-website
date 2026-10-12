import Link from "next/link";
import {
  Container,
  Section,
  FinalCTA,
  Arrow,
  ButtonLink,
} from "@/components/ui";
import { LeadIntakeDemo, OperationsDemo } from "@/components/demos";
import { ProjectGallery } from "@/components/project-gallery";
import { SystemArchitecture } from "@/components/product-visual";
import { getPublishedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
export const metadata = pageMetadata(
  "Our Work",
  "Explore working CodinginX internal demonstrations of lead intake and service operations, with clear scope and technical explanations.",
  "/work",
);

export default function WorkPage() {
  const projects = getPublishedProjects();
  return (
    <>
      <section className="portfolio-hero">
        <Container>
          <div className="section-index">
            <span>OUR WORK</span>
            <span>INTERNAL DEMONSTRATIONS / OPEN TO EXPLORATION</span>
          </div>
          <h1 data-reveal="type">
            The thinking.
            <br />
            <span>The working thing.</span>
          </h1>
          <div className="portfolio-hero-foot">
            <p>
              Inspect the interface. Follow the workflow. Try the interaction.
              These are real internal demonstrations, clearly separated from
              client work.
            </p>
            <div>
              {projects.map((project, index) => (
                <Link key={project.slug} href={"#" + project.slug}>
                  <span>0{index + 1}</span>
                  {project.demo === "lead-intake"
                    ? "Intake lab"
                    : project.demo === "service-operations"
                      ? "Operations desk"
                      : project.title}
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
      {projects.map((project, index) => (
        <Section
          className={
            "portfolio-project portfolio-project-" +
            (project.demo === "lead-intake" ? "intake" : "operations")
          }
          id={project.slug}
          key={project.slug}
        >
          <Container>
            <div className="portfolio-project-heading">
              <div className="portfolio-project-index" aria-hidden="true">
                0{index + 1}
              </div>
              <div>
                <p className="eyebrow">
                  {project.typeLabel} / {project.category}
                </p>
                <h2 data-reveal="type">{project.title}</h2>
                <p>{project.summary}</p>
              </div>
              <Link
                className="button button-text"
                href={"/work/" + project.slug}
              >
                Read the project <Arrow />
              </Link>
            </div>
            {project.demo ? (
              <ProjectGallery
                project={
                  project.demo === "lead-intake" ? "intake" : "operations"
                }
              />
            ) : project.screenshots[0] ? (
              <Image
                {...project.screenshots[0]}
                sizes="(max-width: 767px) 100vw, 1440px"
                className="project-screenshot"
              />
            ) : null}
            <div className="portfolio-story">
              <div>
                <span className="eyebrow">THE PROBLEM</span>
                <p>{project.problem}</p>
              </div>
              <div>
                <span className="eyebrow">THE APPROACH</span>
                <p>{project.solution}</p>
              </div>
              <div>
                <span className="eyebrow">BUILT WITH</span>
                <ul>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </div>
            {project.demo && (
              <SystemArchitecture
                variant={
                  project.demo === "lead-intake" ? "intake" : "operations"
                }
              />
            )}
            {project.demo && (
              <>
                <div className="live-demo-heading">
                  <div>
                    <span className="eyebrow">TRY IT YOURSELF</span>
                    <h3>
                      {project.demo === "lead-intake"
                        ? "Make the handoff tangible."
                        : "Put the next step in view."}
                    </h3>
                  </div>
                  <span>WORKING BROWSER-LOCAL DEMO</span>
                </div>
                <div className="live-demo-canvas">
                  {project.demo === "lead-intake" ? (
                    <LeadIntakeDemo />
                  ) : (
                    <OperationsDemo />
                  )}
                </div>
              </>
            )}
            <div className="portfolio-demo-foot">
              <p>{project.intendedBenefit}</p>
              <ButtonLink href={"/work/" + project.slug} variant="text">
                Scope and technical details
              </ButtonLink>
            </div>
          </Container>
        </Section>
      ))}
      <Section className="portfolio-endnote">
        <Container className="editorial-grid">
          <h2>
            Evidence you
            <br />
            can inspect.
          </h2>
          <p className="lead">
            These demonstrations show specific interactions and technical
            choices. They do not represent paid client engagements or measured
            customer results. Client work will be published only with permission
            and verified context.
          </p>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
