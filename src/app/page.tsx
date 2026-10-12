import Link from "next/link";
import {
  Container,
  Section,
  ButtonLink,
  Arrow,
  FAQAccordion,
  FinalCTA,
} from "@/components/ui";
import { HeroSignal } from "@/components/hero-signal";
import { ServicesExplorer } from "@/components/services-explorer";
import { ProductVisual } from "@/components/product-visual";
import { LeadIntakeDemo } from "@/components/demos";
import { services } from "@/content/services";
import { serviceVisuals } from "@/content/presentation";
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
      <section className="studio-hero">
        <Container>
          <div className="hero-topline">
            <p className="eyebrow">SOFTWARE ENGINEERING + AI</p>
            <span>BUSINESS THINKING. PRODUCT CRAFT.</span>
          </div>
          <div className="studio-hero-grid">
            <div className="studio-hero-copy">
              <h1>
                <span className="hero-title-line">Software for</span>
                <span className="hero-title-line hero-title-accent">
                  your next move.
                </span>
              </h1>
              <p>
                Custom software. Practical AI. Web and mobile products. We
                connect business understanding with engineering and product
                design.
              </p>
              <div className="button-row">
                <ButtonLink href="/contact">Start a Project</ButtonLink>
                <ButtonLink href="/work" variant="text">
                  Explore Our Work
                </ButtonLink>
              </div>
              <div className="hero-scope">
                <span>BUILT AROUND YOUR BUSINESS</span>
                <span>BASED IN THE USA</span>
              </div>
            </div>
            <HeroSignal />
          </div>
          <div className="hero-capability-rail">
            <span>
              <i>01</i> Build.
            </span>
            <span>
              <i>02</i> Automate.
            </span>
            <span>
              <i>03</i> Scale.
            </span>
            <Link href="#inside-the-work">
              Explore what we build <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </Container>
      </section>

      <Section className="studio-introduction">
        <Container>
          <div className="section-index">
            <span>01 / A PRACTICAL KIND OF AMBITION</span>
            <span>THE PROBLEM COMES FIRST</span>
          </div>
          <div className="studio-statement">
            <h2 data-reveal="type">
              A useful idea.
              <br />A considered product.
              <br />
              <span>A better way to work.</span>
            </h2>
            <div className="studio-statement-copy">
              <p className="lead">
                The best technology starts with understanding what needs to
                change.
              </p>
              <p>
                We help founders shape products, teams connect their systems,
                and businesses turn complicated workflows into software people
                can actually use.
              </p>
              <Link className="text-link" href="/about">
                Meet CodinginX <Arrow />
              </Link>
            </div>
          </div>
          <div className="business-directions">
            <Link href="/services/custom-software">
              <span className="number">01 / BUILD</span>
              <h3>Make the idea tangible.</h3>
              <p>
                You know the problem. Now you need a clear scope, a considered
                interface, and working software that people can use.
              </p>
              <Arrow />
            </Link>
            <Link href="/services/ai-automation">
              <span className="number">02 / AUTOMATE</span>
              <h3>Connect the repetitive work.</h3>
              <p>
                Information moves between inboxes and spreadsheets. Turn the
                repeated steps into a workflow with clear rules and useful
                handoffs.
              </p>
              <Arrow />
            </Link>
            <Link href="/contact?service=Existing%20Product%20Improvement">
              <span className="number">03 / SCALE</span>
              <h3>Move an existing product forward.</h3>
              <p>
                The product is already in motion. Improve the experience,
                connect new systems, and address the constraints holding it
                back.
              </p>
              <Arrow />
            </Link>
          </div>
        </Container>
      </Section>

      <Section className="studio-services">
        <Container>
          <div className="section-index">
            <span>02 / WHAT WE DO</span>
            <Link href="/services">
              ALL SERVICES <Arrow />
            </Link>
          </div>
          <div className="section-heading">
            <h2 data-reveal="type">
              One partner.
              <br />
              Four ways forward.
            </h2>
            <p>
              From the interface people touch
              <br />
              to the systems that make it work.
            </p>
          </div>
          <ServicesExplorer
            items={services.map((service) => ({
              index: service.index,
              title: service.title,
              slug: service.slug,
              summary: service.summary,
              kind: serviceVisuals[service.slug as keyof typeof serviceVisuals]
                .kind,
            }))}
          />
        </Container>
      </Section>

      <Section className="studio-work" id="inside-the-work">
        <Container>
          <div className="section-index">
            <span>03 / INSIDE THE WORK</span>
            <span>WORKING INTERNAL DEMONSTRATIONS</span>
          </div>
          <div className="work-intro">
            <h2 data-reveal="type">
              Less talk.
              <br />
              <span>More to explore.</span>
            </h2>
            <div>
              <p className="lead">
                Real interfaces. Inspectable workflows. Clear boundaries.
              </p>
              <p>
                Try what we have built and understand the thinking behind it.
              </p>
              <ButtonLink href="/work" variant="text">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>
          <article className="home-project home-project-intake">
            <div className="home-project-caption">
              <div>
                <p className="eyebrow">01 / INTAKE LAB</p>
                <h3>
                  From inquiry
                  <br />
                  to structured lead.
                </h3>
                <Link className="text-link" href="/work/lead-intake">
                  Explore the project <Arrow />
                </Link>
              </div>
              <p>
                A free-form message becomes an editable record. This real
                demonstration uses deterministic rules, runs in your browser,
                and makes human review part of the handoff.
              </p>
            </div>
            <div className="home-demo-canvas" data-reveal="media">
              <div className="canvas-coordinates">
                <span>INPUT → STRUCTURE → REVIEW → EXPORT</span>
                <span>TRY THE WORKFLOW BELOW</span>
              </div>
              <LeadIntakeDemo compact />
              <div className="canvas-footer">
                <span>INTERNAL DEMONSTRATION</span>
                <span>NO LIVE AI, CRM OR EMAIL CONNECTION</span>
              </div>
            </div>
          </article>
          <article className="home-project home-project-operations">
            <ProductVisual kind="operations" />
            <div className="operations-home-caption">
              <p className="eyebrow">02 / OPERATIONS DESK</p>
              <h3>
                A clearer view
                <br />
                of the work ahead.
              </h3>
              <p>
                Intake, scheduling, and status in one working sample board.
                Changes stay in the same browser.
              </p>
              <Link className="text-link" href="/work/service-operations">
                Explore service operations <Arrow />
              </Link>
            </div>
          </article>
        </Container>
      </Section>

      <Section className="studio-approach">
        <Container>
          <div className="section-index">
            <span>04 / HOW WE WORK</span>
            <span>DECISIONS MADE TOGETHER</span>
          </div>
          <div className="approach-heading">
            <h2 data-reveal="type">
              A clear path.
              <br />A shared direction.
            </h2>
            <div>
              <p>
                Understand the problem. Make deliberate choices. Build in useful
                increments and keep the important decisions visible.
              </p>
              <Link className="text-link" href="/process">
                Explore our process <Arrow />
              </Link>
            </div>
          </div>
          <ol className="approach-rail">
            {processSteps.map((step) => (
              <li key={step.number} data-reveal="line">
                <span className="approach-node">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="engineering-scope">
            <p>BUILT WITH INTENTION</p>
            <ul>
              <li>Product architecture</li>
              <li>APIs & integrations</li>
              <li>Responsive interfaces</li>
              <li>Testing & quality</li>
              <li>Practical AI</li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="studio-people">
        <Container>
          <div className="section-index">
            <span>05 / THE PEOPLE BEHIND IT</span>
            <span>THOUGHTFUL PEOPLE. PRACTICAL TECHNOLOGY.</span>
          </div>
          <div className="people-composition">
            <div>
              <h2 data-reveal="type">
                Built by people.
                <br />
                Built around people.
              </h2>
              <p className="lead">
                CodinginX was founded by{" "}
                {publishedFounders.map((founder) => founder.name).join(" and ")}{" "}
                to build practical technology around meaningful business
                problems.
              </p>
              <Link href="/about" className="text-link">
                Meet the co-founders <Arrow />
              </Link>
            </div>
            <div className="people-signatures">
              {publishedFounders.map((founder, index) => (
                <div key={founder.id}>
                  <span className="signature-number">0{index + 1}</span>
                  <p>{founder.name}</p>
                  <span>CO-FOUNDER</span>
                </div>
              ))}
              <p>
                Understand before building.
                <br />
                Be clear about what matters.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="studio-faq">
        <Container className="editorial-grid">
          <div>
            <p className="eyebrow">A FEW GOOD QUESTIONS</p>
            <h2 data-reveal="type">
              Before
              <br />
              we begin.
            </h2>
            <Link className="text-link" href="/faq">
              All questions <Arrow />
            </Link>
          </div>
          <FAQAccordion items={homepageFaqs} />
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
