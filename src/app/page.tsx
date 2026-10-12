import Link from "next/link";
import {
  Container,
  Section,
  ButtonLink,
  Arrow,
  FAQAccordion,
  FinalCTA,
} from "@/components/ui";
import { LeadIntakeDemo } from "@/components/demos";
import { services } from "@/content/services";
import { homepageFaqs } from "@/content/faqs";
import { processSteps } from "@/content/process";
import { publishedFounders } from "@/content/team";
import { pageMetadata } from "@/lib/metadata";

const baseMetadata = pageMetadata(
  "Software Engineering & AI Solutions",
  "CodinginX helps founders and businesses build custom software, automate workflows, and create useful web and mobile products.",
  "/",
);
export const metadata = {
  ...baseMetadata,
  title: { absolute: "CodinginX | Software Engineering & AI Solutions" },
};
export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div>
              <p className="eyebrow">SOFTWARE ENGINEERING + AI</p>
              <h1>
                From the first idea.
                <br />
                To software
                <br />
                <span className="quiet">that works.</span>
              </h1>
              <p className="hero-copy">
                We help founders and businesses build useful digital products,
                automate the repetitive work, and make their next move with
                confidence.
              </p>
              <div className="button-row">
                <ButtonLink href="/contact">Start a Project</ButtonLink>
                <ButtonLink href="/work" variant="text">
                  Explore Our Work
                </ButtonLink>
              </div>
            </div>
            <div className="hero-diagram" aria-label="Example inquiry workflow">
              <div className="diagram-caption">
                <span>THE WORK BEHIND THE SOFTWARE</span>
                <span>01 / 03</span>
              </div>
              <div className="workflow-step">
                <span className="workflow-node">01</span>
                <div>
                  <p className="workflow-title">A customer reaches out.</p>
                  <p>
                    An inquiry arrives through your website, email, or existing
                    tools.
                  </p>
                </div>
              </div>
              <div className="workflow-step">
                <span className="workflow-node">02</span>
                <div>
                  <p className="workflow-title">
                    The information finds its place.
                  </p>
                  <p>
                    A deliberate workflow structures the request and makes the
                    next step clear.
                  </p>
                </div>
              </div>
              <div className="workflow-step">
                <span className="workflow-node">03</span>
                <div>
                  <p className="workflow-title">
                    Your team can move it forward.
                  </p>
                  <p>Useful context. A clear handoff. A person in control.</p>
                </div>
              </div>
              <p className="diagram-note">
                EXAMPLE WORKFLOW / BUILT AROUND YOUR BUSINESS
              </p>
            </div>
          </div>
          <div className="hero-foot">
            <div className="hero-modes">
              <span>
                <small>01</small> Build
              </span>
              <span>
                <small>02</small> Automate
              </span>
              <span>
                <small>03</small> Scale
              </span>
            </div>
            <p>A software engineering partner. Based in the USA.</p>
          </div>
        </Container>
      </section>
      <Section className="intro-section">
        <Container>
          <div className="intro-statement">
            <p className="eyebrow">A PRACTICAL KIND OF AMBITION</p>
            <h2>
              Your business has a next step.
              <br />
              Let’s build what gets you there.
            </h2>
          </div>
          <div className="editorial-grid services-layout">
            <div className="section-aside">
              <p className="eyebrow">01 / WHAT WE DO</p>
              <h2>
                Engineering,
                <br />
                with the bigger
                <br />
                picture in mind.
              </h2>
              <p>
                From the first user journey to the systems running behind it, we
                connect the product to the problem it needs to solve.
              </p>
              <Link href="/services" className="text-link">
                Explore our services <Arrow />
              </Link>
            </div>
            <div>
              {services.map((service) => (
                <Link
                  href={`/services/${service.slug}`}
                  className="service-row"
                  key={service.slug}
                >
                  <span className="number">{service.index}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </div>
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section className="work-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / INSIDE THE WORK</p>
              <h2>
                See the thinking.
                <br />
                Try the workflow.
              </h2>
            </div>
            <ButtonLink href="/work" variant="text">
              Explore Our Work
            </ButtonLink>
          </div>
          <article className="project-showcase">
            <div className="project-frame">
              <div className="browser-frame-bar">
                <span className="browser-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>CODINGINX / INTAKE LAB</span>
                <span>WORKING DEMONSTRATION</span>
              </div>
              <LeadIntakeDemo compact />
            </div>
            <div className="project-caption">
              <div>
                <p className="eyebrow">INTERNAL DEMONSTRATION / AUTOMATION</p>
                <h3>From inquiry to structured lead.</h3>
                <Link href="/work/lead-intake" className="text-link">
                  Explore the project <Arrow />
                </Link>
              </div>
              <p>
                A free-form inquiry becomes a reviewable record. Try the
                rule-based extraction, edit the result, and download the data.
                Runs in your browser, with no live AI or CRM connection.
              </p>
            </div>
          </article>
          <div className="work-followup">
            <p>Explore a different side of the workflow.</p>
            <Link href="/work/service-operations" className="text-link">
              Service operations: intake, scheduling, and status <Arrow />
            </Link>
          </div>
        </Container>
      </Section>
      <Section className="problem-section">
        <Container>
          <p className="eyebrow">03 / WHERE WE CAN HELP</p>
          <h2>
            A useful next step,
            <br />
            wherever you’re starting.
          </h2>
          <div className="problem-grid">
            <article>
              <span className="number">01 / BUILD</span>
              <h3>Make the idea tangible.</h3>
              <p>
                You know the problem. Now you need a clear scope, a considered
                interface, and working software that people can use.
              </p>
              <Link href="/services/custom-software" className="text-link">
                Build a product <Arrow />
              </Link>
            </article>
            <article>
              <span className="number">02 / AUTOMATE</span>
              <h3>Connect the repetitive work.</h3>
              <p>
                Information moves between inboxes and spreadsheets. Turn the
                repeated steps into a workflow with clear rules and useful
                handoffs.
              </p>
              <Link href="/services/ai-automation" className="text-link">
                Explore automation <Arrow />
              </Link>
            </article>
            <article>
              <span className="number">03 / SCALE</span>
              <h3>Move an existing product forward.</h3>
              <p>
                The product is already in motion. Improve the experience,
                connect new systems, and address the constraints holding it
                back.
              </p>
              <Link
                href="/contact?service=Existing%20Product%20Improvement"
                className="text-link"
              >
                Discuss your next step <Arrow />
              </Link>
            </article>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="editorial-grid">
          <div className="section-aside">
            <p className="eyebrow">04 / HOW WE WORK</p>
            <h2>
              A clear process.
              <br />
              Shared decisions.
            </h2>
            <p>
              Understand the problem, build in useful increments, and make the
              important decisions visible along the way.
            </p>
            <Link href="/process" className="text-link">
              Our process <Arrow />
            </Link>
          </div>
          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span className="number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <section className="capability-section">
        <Container className="capability-line">
          <p className="eyebrow">
            BUILT WITH
            <br />
            INTENTION
          </p>
          <ul>
            <li>Product architecture</li>
            <li>APIs & integrations</li>
            <li>Responsive interfaces</li>
            <li>Testing & quality</li>
            <li>Practical AI</li>
          </ul>
        </Container>
      </section>
      <Section>
        <Container className="about-home">
          <div>
            <p className="eyebrow">05 / THE PEOPLE BEHIND IT</p>
            <h2>
              A growing company.
              <br />A considered approach.
            </h2>
            <p className="lead">
              CodinginX was founded by{" "}
              {publishedFounders.map((founder) => founder.name).join(" and ")}{" "}
              to build practical technology around meaningful business problems.
            </p>
            <Link href="/about" className="text-link">
              Meet CodinginX <Arrow />
            </Link>
          </div>
          <div>
            <div className="about-principle">
              <h3>Understand before building.</h3>
              <p>
                A sound technical decision starts with the people, the workflow,
                and the constraints behind the brief.
              </p>
            </div>
            <div className="about-principle">
              <h3>Be clear about what matters.</h3>
              <p>
                Useful progress, honest tradeoffs, and a maintainable foundation
                give the work a direction beyond launch.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="faq-section">
        <Container className="editorial-grid">
          <div>
            <p className="eyebrow">A FEW GOOD QUESTIONS</p>
            <h2>Before we begin.</h2>
          </div>
          <FAQAccordion items={homepageFaqs} />
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
