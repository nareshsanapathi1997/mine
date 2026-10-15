import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail/detail-template";
import { getDetail, listDetails } from "@/content/details";
import { createMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return listDetails("solution").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDetail("solution", slug);
  if (!page) return {};
  return createMetadata({ title: page.name, description: page.intro, path: `/solutions/${page.slug}` });
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getDetail("solution", slug);
  if (!page) notFound();

  return (
    <DetailTemplate
      page={page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: page.name, href: `/solutions/${page.slug}` },
      ]}
      jsonLd={serviceJsonLd({ name: page.name, description: page.intro, path: `/solutions/${page.slug}` })}
    />
  );
}
