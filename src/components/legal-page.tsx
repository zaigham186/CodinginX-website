import { Container, PageIntro, Section } from "./ui";
export function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { title: string; paragraphs: string[] }[];
}) {
  return (
    <>
      <PageIntro
        eyebrow="REVIEW DRAFT / NOT FINAL LEGAL TERMS"
        title={title}
        description="Prepared to reflect the website’s current implementation. Business decisions, provider configuration, and final legal review are pending."
      />
      <Section>
        <Container className="content-narrow">
          <div className="prose">
            {sections.map((s, i) => (
              <section key={s.title}>
                <h2>
                  {String(i + 1).padStart(2, "0")}. {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
