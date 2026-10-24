import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail/detail-template";
import { getCms, getDetailPage, listDetailPages } from "@/lib/cms";
import { detailSearch } from "@/content/seo";
import { createMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listDetailPages("industry")).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDetailPage("industry", slug);
  if (!page) return {};
  const search = detailSearch[page.slug];
  return createMetadata({
    title: search?.title ?? page.heading,
    description: search?.description ?? page.intro,
    path: `/industries/${page.slug}`,
    keywords: [
      `${page.name} software Visakhapatnam`,
      `${page.name} automation India`,
      `${page.name} digital solutions Vizag`,
    ],
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDetailPage("industry", slug);
  if (!page) notFound();
  const { site, details } = await getCms();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
  ];
  if (page.parent) crumbs.push({ label: page.parent.name, href: `/industries/${page.parent.slug}` });
  crumbs.push({ label: page.name, href: `/industries/${page.slug}` });

  const children = details.filter((item) => item.kind === "industry" && item.parent?.slug === page.slug);
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
      jsonLd={serviceJsonLd(site, { name: page.name, description: page.intro, path: `/industries/${page.slug}` })}
    />
  );
}
