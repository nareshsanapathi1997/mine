import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const nodes = [
  "Customer",
  "Website / WhatsApp",
  "AI Agent",
  "CRM / Business Data",
  "Business Logic",
  "Automation",
  "Action",
];

const signals = [
  "Lead enters",
  "AI identifies customer",
  "CRM record retrieved",
  "Business rule evaluated",
  "Action triggered",
];

const chips = ["AI Agents", "Automation", "Business Software", "Web & Mobile", "Cloud"];

export function Hero() {
  return (
    <section className="hero-stage relative -mt-[4.5rem] overflow-hidden border-b border-line sm:-mt-[4.75rem]">
      <div className="hero-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[
          ["12%", "30%", "0s"],
          ["22%", "70%", "2s"],
          ["68%", "18%", "1s"],
          ["78%", "62%", "3.5s"],
          ["48%", "40%", "5s"],
          ["88%", "28%", "4s"],
        ].map(([left, top, delay]) => (
          <span key={left} className="hero-particle" style={{ left, top, animationDelay: delay }} />
        ))}
      </div>
      <Container className="relative grid items-center gap-14 px-5 pt-[calc(4.5rem+4rem)] pb-16 sm:pt-[calc(4.75rem+5.5rem)] sm:pb-24 lg:grid-cols-12 lg:pb-32">
        <div className="lg:col-span-6">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            AI · Software · Automation · Business Systems
          </p>
          <h1 className="text-display cluster uppercase text-ink">
            Build smarter.
            <br />
            Automate faster.
            <br />
            Operate better.
          </h1>
          <p className="text-body cluster max-w-[40ch] text-muted">
            We build custom software, AI agents and business automation systems that connect your people, processes and data.
          </p>
          <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/#solutions">Explore Solutions</Link>
            </Button>
          </div>
          <ul className="cluster-lg flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted" aria-label={chips.join(", ")}>
            {chips.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-center">
            <div className="signal-rail">
              <span className="signal-dot" aria-hidden="true" />
              <ol className="m-0 list-none p-0" aria-label="Example architecture">
              {nodes.map((step, index) => (
                <li key={step} className="relative py-2 pl-10">
                  <span className="absolute left-0 top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-accent bg-canvas" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-[0.14em] text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-0.5 block text-base font-medium text-ink">{step}</span>
                </li>
              ))}
            </ol>
            </div>
            <ul className="m-0 hidden list-none space-y-3 border-l border-line p-0 pl-4 text-sm text-muted lg:block" aria-label="Signal">
              {signals.map((line) => (
                <li key={line} className="demo-line">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
