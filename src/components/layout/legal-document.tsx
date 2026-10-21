import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { legalEffectiveDate, type LegalSection } from "@/content/legal";
import { siteConfig } from "@/content/site";

export function LegalDocument({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <article className="section bg-surface">
        <Container className="max-w-3xl">
          <p className="rounded-xl border border-line bg-canvas px-4 py-3 text-small leading-relaxed text-muted">
            Effective {legalEffectiveDate}. Operated by {siteConfig.name}, {siteConfig.location}. For questions:{" "}
            <a className="text-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
          <div className="cluster-lg mt-6 space-y-6">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h3 text-ink">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-body mt-3 text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}
