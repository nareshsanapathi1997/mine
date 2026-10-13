import Image from "next/image";
import Link from "next/link";
import { EyebrowMark, UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SystemVisual } from "@/components/visuals/system-visual";
import { siteConfig } from "@/content/site";

const chips: { label: string; icon: UiIconName }[] = [
  { label: "AI Agents", icon: "bot" },
  { label: "Automation", icon: "workflow" },
  { label: "Business Software", icon: "blocks" },
  { label: "Web & Mobile", icon: "smartphone" },
  { label: "Cloud", icon: "cloud" },
];

export function Hero() {
  return (
    <section className="hero-stage relative -mt-[3.75rem] overflow-hidden border-b border-line sm:-mt-[4rem]">
      <div className="hero-grid" aria-hidden="true" />
      <Container className="relative grid items-center gap-10 px-5 pt-[calc(3.75rem+2.75rem)] pb-16 sm:pt-[calc(4rem+3.25rem)] sm:pb-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="eyebrow">
            <EyebrowMark />
            {siteConfig.positioning}
          </p>
          <h1 className="text-display mt-4 text-ink">
            Build smarter.
            <br />
            Automate faster.
            <br />
            Operate better.
          </h1>
          <p className="text-body mt-5 max-w-[38ch] text-muted">
            We build custom software, AI agents and business automation systems that connect your people, processes and data.
          </p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/#solutions">
                <UiIcon name="compass" className="size-4" />
                Explore Solutions
              </Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm text-muted" aria-label={chips.map((item) => item.label).join(", ")}>
            {chips.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2">
                <UiIcon name={item.icon} className="size-3.5 text-accent-ink" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual min-w-0 lg:col-span-7">
          <figure className="photo-frame photo-hero">
            <Image
              src="/images/hero-connected-systems.webp"
              alt="A quiet operations studio at night, with teal light across a row of screens"
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </figure>
          <div className="hero-visual-board">
            <SystemVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
