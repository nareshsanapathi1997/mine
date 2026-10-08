import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SystemVisual } from "@/components/visuals/system-visual";
import { siteConfig } from "@/content/site";

const chips = ["AI Agents", "Automation", "Business Software", "Web & Mobile", "Cloud"];

export function Hero() {
  return (
    <section className="hero-stage relative -mt-[3.75rem] overflow-hidden border-b border-line sm:-mt-[4rem]">
      <div className="hero-grid" aria-hidden="true" />
      <Container className="relative grid items-center gap-4 px-5 pt-[calc(3.75rem+1rem)] pb-6 sm:pt-[calc(4rem+1.15rem)] sm:pb-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            {siteConfig.positioning}
          </p>
          <h1 className="text-display mt-2 text-ink">
            Build smarter.
            <br />
            Automate faster.
            <br />
            Operate better.
          </h1>
          <p className="text-body mt-3 max-w-[40ch] text-muted">
            We build custom software, AI agents and business automation systems that connect your people, processes and data.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/#solutions">Explore Solutions</Link>
            </Button>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted" aria-label={chips.join(", ")}>
            {chips.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <SystemVisual />
        </div>
      </Container>
    </section>
  );
}
