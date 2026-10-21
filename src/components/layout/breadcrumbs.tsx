import Link from "next/link";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getSite } from "@/lib/cms";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type Crumb = {
  label: string;
  href: string;
};

export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const site = await getSite();
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-surface">
      <JsonLd
        data={breadcrumbJsonLd(
          site,
          items.map((item) => ({ name: item.label, path: item.href })),
        )}
      />
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-mist">
                    /
                  </span>
                ) : null}
                {last ? (
                  <span className="inline-flex min-h-11 items-center font-medium text-ink" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="breadcrumb-link link-underline">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
