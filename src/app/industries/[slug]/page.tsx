import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail/detail-template";
import { getDetail, listDetails } from "@/content/details";
import { createMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return listDetails("industry").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDetail("industry", slug);
  if (!page) return {};
  return createMetadata({ title: page.name, description: page.intro, path: `/industries/${page.slug}` });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDetail("industry", slug);
  if (!page) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
  ];
  if (page.parent) crumbs.push({ label: page.parent.name, href: `/industries/${page.parent.slug}` });
  crumbs.push({ label: page.name, href: `/industries/${page.slug}` });

  const children = listDetails("industry").filter((item) => item.parent?.slug === page.slug);
  const extraLinks = children.length
    ? {
        title: `More on ${page.name.toLowerCase()}`,
        links: children.map((item) => ({ href: `/industries/${item.slug}`, title: item.name, description: item.intro })),
      }
    : undefined;

  return (
    <DetailTemplate
      page={page}
      crumbs={crumbs}
      extraLinks={extraLinks}
      jsonLd={serviceJsonLd({ name: page.name, description: page.intro, path: `/industries/${page.slug}` })}
    />
  );
}
