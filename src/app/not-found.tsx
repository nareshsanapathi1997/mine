import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/ai-automation", label: "AI & Automation" },
  { href: "/case-studies", label: "Examples" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="section h-section">
      <Container className="max-w-xl">
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          404
        </p>
        <h1 className="text-h1 cluster text-ink">Sorry, we could not find that page.</h1>
        <p className="text-body cluster text-muted">
          The link may be old or mistyped. Try one of the pages below, or tell us what you were looking for.
        </p>
        <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
          <Button asChild arrow>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Talk to us</Link>
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
