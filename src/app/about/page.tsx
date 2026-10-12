import Image from "next/image";
import {
  Container,
  Section,
  PageIntro,
  FinalCTA,
  ButtonLink,
} from "@/components/ui";
import { publishedFounders } from "@/content/team";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About CodinginX",
  `Meet CodinginX, a USA-based software engineering and AI company founded by ${publishedFounders.map((founder) => founder.name).join(" and ")}.`,
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT CODINGINX"
        title="Thoughtful people. Practical technology."
        description="We are a USA-based software engineering, AI, and digital product company. Our focus is useful technology that solves meaningful business problems."
        className="about-intro"
      />
      <Section>
        <Container className="editorial-grid">
          <h2>
            Built around
            <br />a simple belief.
          </h2>
          <div className="stack">
            <p className="lead">
              Software should make something work better for the people using
              it.
            </p>
            <p>
              CodinginX was founded by two co-founders who want to connect
              business understanding with careful technical execution. We are
              early in our company’s story, and we want the work to make the
              case for us.
            </p>
            <p>
              That means explaining our choices, building things people can
              inspect, and being direct about what we know and what still needs
              to be learned.
            </p>
          </div>
        </Container>
      </Section>
      <Section className="founders-section">
        <Container>
          <div className="section-heading">
            <h2>The co-founders.</h2>
            <p>Two people. A shared direction.</p>
          </div>
          <div className="founder-grid">
            {publishedFounders.map((f, index) => (
              <article className="founder" key={f.id}>
                <span className="founder-index">
                  0{index + 1} / THE CO-FOUNDERS
                </span>
                {!f.image && (
                  <div className="founder-monogram" aria-hidden="true">
                    {f.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                )}
                {f.image && (
                  <Image
                    {...f.image}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="founder-photo"
                  />
                )}
                <span className="eyebrow">{f.role}</span>
                <h3 data-reveal="type">{f.name}</h3>
                {f.biography.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {f.responsibilities.length > 0 && (
                  <ul>
                    {f.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
                {f.links?.map((l) => (
                  <a
                    key={l.url}
                    className="text-link"
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="problem-section">
        <Container className="editorial-grid">
          <h2>
            What guides
            <br />
            the work.
          </h2>
          <ul className="rule-list">
            {[
              [
                "Understand the business",
                "Start with the people, the workflow, and the constraints. Choose the technology after the problem is understood.",
              ],
              [
                "Make deliberate choices",
                "Build what is useful now, with clear boundaries and a foundation that can be maintained.",
              ],
              [
                "Keep communication clear",
                "Make progress, assumptions, and tradeoffs visible. Ask the question when the answer changes the work.",
              ],
              [
                "Keep improving",
                "Learn from use, review the result, and make the next change with a clearer view of what matters.",
              ],
            ].map(([title, body]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container className="editorial-grid">
          <h2>
            Get to know us
            <br />
            through the work.
          </h2>
          <div className="stack">
            <p className="lead">
              Explore our internal demonstrations and how we approach a project,
              then tell us what you’re thinking about.
            </p>
            <ButtonLink href="/work" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
