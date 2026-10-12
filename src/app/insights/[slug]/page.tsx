import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Container, FinalCTA, PageIntro, Section } from "@/components/ui";
import { siteConfig } from "@/config/siteConfig";
import {
  getInsightBySlug,
  getInsightReadingMinutes,
  getPublishedInsights,
} from "@/content/insights";
import { pageMetadata } from "@/lib/metadata";

type InsightPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedInsights().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const metadata = pageMetadata(
    insight.title,
    insight.description,
    `/insights/${insight.slug}`,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      authors: [siteConfig.url],
      section: insight.category,
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const articleUrl = `${siteConfig.url}/insights/${insight.slug}`;
  const relatedArticles = getPublishedInsights().filter(
    (article) => article.slug !== insight.slug,
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.description,
          articleSection: insight.category,
          inLanguage: "en",
          url: articleUrl,
          mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
          author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <article>
        <PageIntro
          eyebrow={insight.category}
          title={insight.title}
          description={insight.description}
        >
          <div className="meta-row">
            <span>By {siteConfig.name}</span>
            <span>{getInsightReadingMinutes(insight)} min read</span>
          </div>
        </PageIntro>
        <Section>
          <Container>
            <div className="editorial-grid">
              <aside className="stack">
                <Link className="text-link" href="/insights">
                  All insights
                </Link>
                <nav aria-label="In this article">
                  <h2 className="eyebrow">In this article</h2>
                  <ul className="rule-list">
                    {insight.sections.map((section) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`}>{section.heading}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
              <div className="prose">
                {insight.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {insight.sections.map((section) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <h2 id={section.id}>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.points && (
                      <ul>
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
                <section aria-labelledby="put-it-into-practice">
                  <h2 id="put-it-into-practice">Put it into practice</h2>
                  <p>{insight.takeaway}</p>
                  <Link
                    className="text-link"
                    href={insight.relatedService.href}
                  >
                    {insight.relatedService.title}
                  </Link>
                </section>
              </div>
            </div>
          </Container>
        </Section>
      </article>
      {relatedArticles.length > 0 && (
        <Section>
          <Container>
            <h2>Continue reading</h2>
            <div className="article-list">
              {relatedArticles.map((article) => (
                <article className="editorial-grid" key={article.slug}>
                  <p className="eyebrow">{article.category}</p>
                  <div className="stack">
                    <h3>
                      <Link
                        className="text-link"
                        href={`/insights/${article.slug}`}
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p>{article.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}
      <FinalCTA />
    </>
  );
}
