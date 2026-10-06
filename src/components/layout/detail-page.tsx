import Link from "next/link";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/icons";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { IconName } from "@/content/types";

export type DetailSection = {
  heading: string;
  body: string[];
};

export type DetailLink = {
  href: string;
  title: string;
  description: string;
};

export function DetailPage({
  crumbs,
  eyebrow,
  title,
  lede,
  icon,
  sections,
  includes,
  explore,
  related,
  jsonLd,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lede: string;
  icon: IconName;
  sections: DetailSection[];
  includes: string[];
  explore?: DetailLink[];
  related: DetailLink[];
  jsonLd: unknown;
}) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <header className="band-dark relative overflow-hidden border-b border-white/10 text-white">
        <div className="band-grid" aria-hidden="true" />
        <Container className="section-tight relative z-[1] lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent-glow">
              <span className="eyebrow-mark" aria-hidden="true" />
              {eyebrow}
            </p>
            <div className="cluster flex items-start gap-4">
              <span className="icon-tile icon-tile-on-dark">
                <Icon name={icon} className="size-5" />
              </span>
              <h1 className="text-h1 text-balance text-white">{title}</h1>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-body cluster text-mist lg:mt-0">{lede}</p>
            <Button asChild size="lg" arrow className="cluster w-full sm:w-auto">
              <Link href={`/contact?need=${encodeURIComponent(title)}`}>Talk to an Expert</Link>
            </Button>
          </div>
        </Container>
      </header>

      <section className="section bg-canvas">
        <Container className="grid-12 items-start">
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {sections.map((section) => (
              <section key={section.heading} className="prose-block" data-reveal>
                <h2 className="text-h3 text-ink">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-body text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="card card-accent col-span-12 lg:sticky lg:top-28 lg:col-span-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">What this covers</h2>
            <ul className="mt-4 space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {explore && explore.length > 0 ? (
        <section className="section bg-surface" aria-labelledby="explore-heading">
          <Container>
            <h2 id="explore-heading" className="text-h2 text-ink">
              Explore further
            </h2>
            <ul className="grid-12 stack" data-reveal-stagger>
              {explore.map((item) => (
                <li
                  key={item.href}
                  data-reveal-child
                  className={explore.length === 3 ? "col-span-12 lg:col-span-4" : "col-span-12 md:col-span-6"}
                >
                  <Link href={item.href} className="card card-muted card-accent block">
                    <span className="text-h3 text-ink">{item.title}</span>
                    <p className="text-small mt-2 text-muted">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="section bg-canvas" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="text-h2 text-ink">
              Related solutions
            </h2>
            <ul className="grid-12 stack" data-reveal-stagger>
              {related.map((item) => (
                <li
                  key={item.href}
                  data-reveal-child
                  className={related.length === 4 ? "col-span-12 sm:col-span-6 xl:col-span-3" : "col-span-12 lg:col-span-4"}
                >
                  <Link href={item.href} className="card card-accent block">
                    <span className="text-h3 text-ink">{item.title}</span>
                    <p className="text-small mt-2 text-muted">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
