import { Container, Section, PageIntro, FinalCTA } from "@/components/ui";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Process",
  "How CodinginX moves from discovery and product design through development, testing, launch, and ongoing improvement.",
  "/process",
);
export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="HOW WE WORK"
        title="Clear steps. Useful progress."
        description="A shared understanding of the problem gives the work direction. A visible process helps everyone make better decisions as the product takes shape."
      />
      <Section>
        <Container>
          {processSteps.map((s) => (
            <article className="process-detail editorial-grid" key={s.number}>
              <div>
                <p className="eyebrow">{s.number} / THE PROCESS</p>
                <h2>{s.title}</h2>
              </div>
              <div className="stack">
                <p className="lead">{s.description}</p>
                <ul className="rule-list">
                  {s.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="process-outcome">
                  <strong>The outcome</strong>
                  <br />
                  {s.outcome}
                </p>
              </div>
            </article>
          ))}
        </Container>
      </Section>
      <Section className="problem-section">
        <Container className="editorial-grid">
          <h2>
            A plan that stays
            <br />
            connected to reality.
          </h2>
          <p className="lead">
            Projects change as people learn. We discuss the effect of a change
            on scope, priorities, and the next milestone. Payment, ownership,
            confidentiality, and ongoing support are agreed directly for each
            engagement.
          </p>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
