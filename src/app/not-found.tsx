import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/ai-automation", label: "AI & Automation" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="section bg-canvas">
      <Container className="max-w-xl">
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          404
        </p>
        <h1 className="text-h1 cluster text-ink">This page is not on the site.</h1>
        <p className="text-body cluster text-muted">
          The link may be out of date. You can go back to the work, or tell us what you were looking for.
        </p>
        <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
          <Button asChild arrow>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Talk to an Expert</Link>
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {links.map((item) => (
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
