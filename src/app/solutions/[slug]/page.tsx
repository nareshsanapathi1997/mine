import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail/detail-template";
import { getCms, getDetailPage, listDetailPages } from "@/lib/cms";
import { detailSearch } from "@/content/seo";
import { createMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listDetailPages("solution")).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDetailPage("solution", slug);
  if (!page) return {};
  const search = detailSearch[page.slug];
  return createMetadata({
    title: search?.title ?? page.heading,
    description: search?.description ?? page.intro,
    path: `/solutions/${page.slug}`,
    keywords: [
      `${page.name} Visakhapatnam`,
      `${page.name} Vizag`,
      `${page.name} India`,
      `${page.name} Andhra Pradesh`,
    ],
  });
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDetailPage("solution", slug);
  if (!page) notFound();
  const { site } = await getCms();

  return (
    <DetailTemplate
      page={page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: page.name, href: `/solutions/${page.slug}` },
      ]}
      jsonLd={serviceJsonLd(site, { name: page.name, description: page.intro, path: `/solutions/${page.slug}` })}
    />
  );
}
