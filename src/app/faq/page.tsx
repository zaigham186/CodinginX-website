import {
  Container,
  Section,
  PageIntro,
  FinalCTA,
  FAQAccordion,
} from "@/components/ui";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Frequently Asked Questions",
  "Answers about CodinginX services, MVPs, AI integration, existing products, scope, and starting a project.",
  "/faq",
);
export default function FAQPage() {
  return (
    <>
      <PageIntro
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="A little clarity before we start."
        description="Here are answers to some common questions. Project-specific commitments and contractual terms need a direct conversation."
      />
      <Section>
        <Container className="content-narrow">
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
