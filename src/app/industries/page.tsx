import Link from "next/link";
import { DetailCard } from "@/components/detail/detail-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { getCms } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { industriesHub } = await getCms();
  return createMetadata({
    title: industriesHub.metaTitle,
    description: industriesHub.metaDescription,
    path: "/industries",
  });
}

export default async function IndustriesPage() {
  const { industriesHub, details } = await getCms();
  const all = details.filter((page) => page.kind === "industry");
  const main = all.filter((page) => !page.parent);
  return (
    <>
      <PageHeader
        eyebrow={industriesHub.header.eyebrow}
        title={industriesHub.header.title}
        description={industriesHub.header.description}
        photo={industriesHub.header.photo}
      />
      <section className="section h-section" aria-label="Industries">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger suppressHydrationWarning>
            {main.map((page) => {
              const children = all.filter((item) => item.parent?.slug === page.slug);
              return (
                <DetailCard key={page.slug} page={page} photo>
                  {children.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${page.name} pages`}>
                      {children.map((child) => (
                        <li key={child.slug}>
                          <Link href={`/industries/${child.slug}` as "/"} className="chip chip-link">{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </DetailCard>
              );
            })}
          </ul>
        </Container>
      </section>
      <CtaBand title={industriesHub.cta.title} description={industriesHub.cta.description} primaryLabel={industriesHub.cta.primaryLabel} showWhatsapp />
    </>
  );
}
