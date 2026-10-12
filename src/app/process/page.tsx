import { Container, Section, FinalCTA } from "@/components/ui";
import { ScrollStory } from "@/components/scroll-story";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Process",
  "How CodinginX moves from discovery and product design through development, testing, launch, and ongoing improvement.",
  "/process",
);
export default function ProcessPage() {
  return (
    <>
      <section className="process-hero">
        <Container>
          <div className="section-index">
            <span>HOW WE WORK</span>
            <span>FROM THE FIRST QUESTION TO THE NEXT RELEASE</span>
          </div>
          <h1 data-reveal="type">
            Good work
            <br />
            has <span>good foundations.</span>
          </h1>
          <div className="process-hero-foot">
            <p>
              A shared understanding of the problem gives the work direction. A
              visible process keeps decisions connected as the product takes
              shape.
            </p>
            <div className="process-lifecycle" aria-label="Project lifecycle">
              {[
                "Discover",
                "Plan",
                "Design",
                "Build",
                "Test",
                "Launch",
                "Grow",
              ].map((stage) => (
                <span key={stage}>{stage}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <Section className="process-story-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE PROCESS / IN PRACTICE</p>
              <h2>
                From a clear question
                <br />
                to something you can use.
              </h2>
            </div>
            <p>
              Follow the thinking.
              <br />
              Inspect the kinds of artifacts it creates.
            </p>
          </div>
          <ScrollStory variant="process" />
        </Container>
      </Section>
      <Section className="process-principle">
        <Container>
          <p className="eyebrow">A PLAN CONNECTED TO REALITY</p>
          <h2 data-reveal="type">
            Learn as you go.
            <br />
            <span>Keep the direction clear.</span>
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
