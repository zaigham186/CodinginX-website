import { Arrow } from "@/components/ui";
import Link from "next/link";
import { Container, PageIntro, Section } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { siteConfig } from "@/config/siteConfig";
import { pageMetadata } from "@/lib/metadata";
import { serviceOptions } from "@/lib/validation";

export const metadata = pageMetadata(
  "Start a Project",
  "Tell CodinginX what you want to build, automate or improve. Start a conversation about custom software, practical AI, websites and digital products.",
  "/contact",
);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const service =
    typeof query.service === "string" &&
    serviceOptions.includes(query.service as (typeof serviceOptions)[number])
      ? (query.service as (typeof serviceOptions)[number])
      : undefined;
  const project =
    query.project === "lead" || query.project === "operations"
      ? query.project
      : undefined;
  return (
    <>
      <PageIntro
        eyebrow="START A PROJECT"
        title="What are you working on?"
        description="An idea to build. A workflow to simplify. A product ready for its next chapter. Tell us where you are and what needs to happen."
      />
      <Section className="contact-section">
        <Container className="contact-layout">
          <aside className="contact-aside">
            <h2>A useful first conversation.</h2>
            <p>
              Share the problem, the people it affects and any constraints you
              already know. You do not need a finished specification.
            </p>
            <div className="contact-next">
              <h3>What happens next</h3>
              <ol>
                <li>We review the project details you share.</li>
                <li>We clarify the goals, constraints and open questions.</li>
                <li>We discuss an appropriate scope and next steps.</li>
              </ol>
            </div>
            <p>Prefer to write directly?</p>
            <a
              className="contact-email"
              href={`mailto:${siteConfig.emails.general}`}
            >
              {siteConfig.emails.general}
            </a>
            <p className="field-hint">
              Please do not send passwords, API keys or confidential customer
              records.
            </p>
            <Link className="text-link" href="/process">
              See how we work <Arrow />
            </Link>
          </aside>
          <InquiryForm initialService={service} initialProject={project} />
        </Container>
      </Section>
    </>
  );
}
