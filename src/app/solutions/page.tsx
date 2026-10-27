import { DetailCard } from "@/components/detail/detail-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { solutionsHub } = await getCms();
  return createMetadata({
    title: solutionsHub.metaTitle,
    description: solutionsHub.metaDescription,
    path: "/solutions",
  });
}

export default async function SolutionsPage() {
  const { solutionsHub, solutionGroups, details } = await getCms();
  return (
    <>
      <PageHeader
        eyebrow={solutionsHub.header.eyebrow}
        title={solutionsHub.header.title}
        description={solutionsHub.header.description}
        photo={solutionsHub.header.photo}
      />
      {solutionGroups.map((group, index) => (
        <section key={group.id} className={index % 2 ? "section h-section h-band-soft" : "section h-section"} aria-labelledby={`g-${group.id}`}>
          <Container>
            <div className="home-head">
              <div>
                <p className="eyebrow">Group {index + 1}</p>
                <h2 id={`g-${group.id}`} className="text-h2 mt-3 text-ink">{group.title}</h2>
              </div>
              <p className="text-body text-muted">{group.description}</p>
            </div>
            <ul className="stack grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger suppressHydrationWarning>
              {group.slugs.map((slug) => {
                const page = details.find((item) => item.kind === "solution" && item.slug === slug);
                return page ? <DetailCard key={slug} page={page} photo /> : null;
              })}
            </ul>
          </Container>
        </section>
      ))}
      <CtaBand title={solutionsHub.cta.title} description={solutionsHub.cta.description} primaryLabel={solutionsHub.cta.primaryLabel} showWhatsapp />
    </>
  );
}
