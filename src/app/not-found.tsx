import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getCms } from "@/lib/cms";

export default async function NotFound() {
  const { notFound } = await getCms();
  return (
    <section className="section h-section">
      <Container className="max-w-xl">
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          {notFound.eyebrow}
        </p>
        <h1 className="text-h1 cluster text-ink">{notFound.title}</h1>
        <p className="text-body cluster text-muted">{notFound.description}</p>
        <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
          <Button asChild arrow>
            <Link href="/">{notFound.homeLabel}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">{notFound.contactLabel}</Link>
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {notFound.links.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="chip chip-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
