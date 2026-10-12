import { Arrow } from "@/components/ui";
import Link from "next/link";
import { Container, FinalCTA, PageIntro, Section } from "@/components/ui";
import {
  getInsightReadingMinutes,
  getPublishedInsights,
} from "@/content/insights";
import { pageMetadata } from "@/lib/metadata";
import { InsightVisual } from "@/components/insight-visual";

export const metadata = pageMetadata(
  "Insights",
  "Practical perspectives from CodinginX on planning digital products, choosing software, and using AI and automation responsibly.",
  "/insights",
);

export default function InsightsPage() {
  const articles = getPublishedInsights();

  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title="Decisions worth thinking through."
        description="Practical notes on building software, choosing what to automate, and making technology work for a business."
      />
      <Section>
        <Container>
          {articles.length > 0 ? (
            <div className="article-list">
              {articles.map((article, index) => (
                <article className="insight-feature" key={article.slug}>
                  <InsightVisual slug={article.slug} />
                  <div className="insight-feature-copy">
                    <div className="meta-row">
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{article.category}</span>
                      <span>{getInsightReadingMinutes(article)} min read</span>
                    </div>
                    <div className="stack">
                      <h2>
                        <Link href={`/insights/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>
                      <p className="lead">{article.description}</p>
                      <Link
                        className="text-link"
                        href={`/insights/${article.slug}`}
                        aria-label={`Read article: ${article.title}`}
                      >
                        Read article <Arrow />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="content-narrow stack">
              <h2>New perspectives are on the way.</h2>
              <p>
                In the meantime, explore how we approach product planning,
                engineering, and delivery.
              </p>
              <Link className="text-link" href="/process">
                Explore our process
              </Link>
            </div>
          )}
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
