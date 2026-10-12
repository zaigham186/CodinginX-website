import { Container, ButtonLink } from "./ui";
import { ProductVisual } from "./product-visual";
import { serviceVisuals } from "@/content/presentation";

export function ServiceHero({
  slug,
  index,
  title,
  headline,
  summary,
  cta,
}: {
  slug: keyof typeof serviceVisuals;
  index: string;
  title: string;
  headline: string;
  summary: string;
  cta: string;
}) {
  const visual = serviceVisuals[slug];
  return (
    <section className={"service-detail-hero service-detail-" + slug}>
      <Container>
        <div className="section-index">
          <span>
            {index} / {title}
          </span>
          <span>CODINGINX / OUR SERVICES</span>
        </div>
        <div className="service-detail-hero-grid">
          <div>
            <h1 data-reveal="type">{headline}</h1>
            <p className="lead">{summary}</p>
            <ButtonLink href="/contact">{cta}</ButtonLink>
          </div>
          <div>
            <ProductVisual kind={visual.kind} eager />
            <p className="service-media-caption">{visual.caption}</p>
          </div>
        </div>
        <div className="service-hero-foundation">
          <span>THE BUSINESS</span>
          <i aria-hidden="true" />
          <span>THE EXPERIENCE</span>
          <i aria-hidden="true" />
          <span>THE ENGINEERING</span>
        </div>
      </Container>
    </section>
  );
}
