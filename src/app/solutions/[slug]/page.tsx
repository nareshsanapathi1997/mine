import { notFound, permanentRedirect } from "next/navigation";
import { SolutionView } from "@/components/solutions/solution-view";
import {
  getSolution,
  listSolutionSlugs,
  relatedSolutionLinks,
  solutionAliases,
} from "@/content/solution-details";
import { createMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return listSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSolution(solutionAliases[slug] ?? slug);
  if (!page) return {};
  const canonical = solutionAliases[slug] ?? slug;
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/solutions/${canonical}`,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const alias = solutionAliases[slug];
  if (alias) permanentRedirect(`/solutions/${alias}`);

  const page = getSolution(slug);
  if (!page) notFound();

  return (
    <SolutionView
      page={page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: page.title, href: `/solutions/${page.slug}` },
      ]}
      related={relatedSolutionLinks(page.related)}
      jsonLd={serviceJsonLd({
        name: page.title,
        description: page.description,
        path: `/solutions/${page.slug}`,
      })}
    />
  );
}
