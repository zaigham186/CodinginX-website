import { Container, Section, PageIntro, ButtonLink } from "@/components/ui";
import { getOpenRoles } from "@/content/careers";
import { siteConfig } from "@/config/siteConfig";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Careers",
  "Explore current opportunities at CodinginX and contact the team with a relevant introduction.",
  "/careers",
);
export default function CareersPage() {
  const roles = getOpenRoles();
  return (
    <>
      <PageIntro
        eyebrow="CAREERS"
        title="Good work starts with people who care."
        description="An interest in useful software, thoughtful design, and clear communication is a good place to begin."
      />
      <Section>
        <Container>
          {roles.map((role) => (
            <article className="service-feature editorial-grid" key={role.slug}>
              <div>
                <p className="eyebrow">{role.discipline}</p>
                <h2>{role.title}</h2>
                <div className="meta-row">
                  <span>{role.location}</span>
                  <span>{role.employmentType}</span>
                </div>
              </div>
              <div className="stack">
                <p className="lead">{role.description}</p>
                <h3>Responsibilities</h3>
                <ul className="rule-list">
                  {role.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h3>What the role needs</h3>
                <ul className="rule-list">
                  {role.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <ButtonLink
                  href={`mailto:${siteConfig.emails.careers}?subject=${encodeURIComponent(role.title)}`}
                >
                  Apply by email
                </ButtonLink>
              </div>
            </article>
          ))}
          <div className="empty-state">
            <h2>
              {roles.length
                ? "Current opportunities"
                : "No open roles are listed right now."}
            </h2>
            <p>
              We publish opportunities here when a role is open. If you would
              like to introduce yourself, share your area of interest and a link
              to relevant work.
            </p>
            <div className="button-row">
              <ButtonLink
                href={`mailto:${siteConfig.emails.careers}`}
                variant="secondary"
              >
                Contact careers
              </ButtonLink>
            </div>
            <p className="careers-note">
              An introduction is not an application to an advertised role or a
              promise of future employment.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
