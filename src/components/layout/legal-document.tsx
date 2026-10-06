import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import type { LegalSection } from "@/content/legal";

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
          <p className="rounded-xl border border-line bg-canvas px-4 py-3 text-small leading-relaxed text-ink">
            Template policy for this website. Have it reviewed for your business before launch.
          </p>
          <div className="cluster-lg space-y-6">
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
