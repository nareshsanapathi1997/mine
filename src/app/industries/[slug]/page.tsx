import { notFound } from "next/navigation";
import { IndustryView } from "@/components/industries/industry-view";
import { getIndustryPage, listIndustrySlugs } from "@/content/industry-details";
import { relatedSolutionLinks } from "@/content/solution-details";
import { createMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return listIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/industries/${page.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
  ];
  if (page.parent) {
    crumbs.push({ label: page.parent.label, href: page.parent.href });
  }
  crumbs.push({ label: page.title, href: `/industries/${page.slug}` });

  return (
    <IndustryView
      page={page}
      crumbs={crumbs}
      related={relatedSolutionLinks(page.relatedServices)}
      jsonLd={serviceJsonLd({
        name: page.title,
        description: page.description,
        path: `/industries/${page.slug}`,
      })}
    />
  );
}
