import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import type { LegalSection } from "@/content/legal";
import { getCms } from "@/lib/cms";

export async function LegalDocument({
  eyebrow,
  title,
  description,
  sections,
  effectiveDate,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
  effectiveDate?: string;
}) {
  const { site, legal } = await getCms();
  const date = effectiveDate ?? legal.effectiveDate;

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <article className="section bg-surface">
        <Container className="max-w-3xl">
          <p className="rounded-xl border border-line bg-canvas px-4 py-3 text-small leading-relaxed text-muted">
            Effective {date}. Operated by {site.name}, {site.location}. For questions:{" "}
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
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
