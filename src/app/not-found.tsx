import { PageIntro, ButtonLink, Section, Container } from "@/components/ui";
export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 / PAGE NOT FOUND"
        title="This path ends here."
        description="The page may have moved, or the address may be incomplete. Let’s get you back to somewhere useful."
      />
      <Section className="not-found-actions">
        <Container>
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="text">
            Start a Project
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
