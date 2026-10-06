import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SystemMap } from "@/components/sections/system-map";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

const trustLine = ["Web", "Mobile", "AI", "Automation", "Cloud"];

export function Hero() {
  return (
    <section className="band-dark relative overflow-hidden text-white">
      <div className="band-grid" aria-hidden="true" />
      <Container className="section-tight grid-12 relative z-[1] items-center">
        <div className="col-span-12 xl:col-span-7">
          <p className="eyebrow text-accent-glow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Software · AI · Automation
          </p>
          <h1 className="text-display cluster text-balance">
            <span className="hero-line">Business systems</span>
            <span className="hero-line">built around</span>
            <span className="hero-line">
              <span className="text-accent-glow">how you operate.</span>
            </span>
          </h1>
          <p className="text-body measure cluster text-mist">{siteConfig.description}</p>
          <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
            <Button asChild size="lg" variant="inverse" arrow className="w-full sm:w-auto">
              <Link href="/#solutions">Explore Solutions</Link>
            </Button>
          </div>
          <ul className="cluster-lg flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4" aria-label={trustLine.join(", ")}>
            {trustLine.map((item) => (
              <li key={item} className="text-sm font-semibold tracking-[-0.01em] text-mist">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 xl:col-span-5">
          <SystemMap />
        </div>
      </Container>
    </section>
  );
}
