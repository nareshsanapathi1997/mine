import Link from "next/link";
import { DetailCard } from "@/components/detail/detail-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { newImages } from "@/content/new-images";
import { listDetails } from "@/content/details";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  description: "Software and automation for schools, colleges, coaching centres, hotels, factories, clinics and small businesses in India.",
  path: "/industries",
});

export default function IndustriesPage() {
  const all = listDetails("industry");
  const main = all.filter((page) => !page.parent);
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Built for the way your sector works."
        description="A school, a hotel and a factory have very different days. Choose yours to see the problems we fix and a sample of how it works."
        photo={newImages.industries}
      />
      <section className="section h-section" aria-label="Industries">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
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
      <CtaBand title="Do not see your industry?" description="The same problems show up everywhere: missed enquiries, manual reminders, scattered data. Tell us about yours." primaryLabel="Talk to us" showWhatsapp />
    </>
  );
}
