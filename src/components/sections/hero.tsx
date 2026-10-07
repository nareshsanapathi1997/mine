import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const architecture = [
  "Customer",
  "Website / WhatsApp",
  "AI Agent",
  "Business Logic",
  "CRM / Database",
  "Automation",
  "Action",
];

const trustLine = ["AI Agents", "Automation", "Business Software", "Web & Mobile", "Cloud"];

export function Hero() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container className="section grid-12 items-center">
        <div className="col-span-12 lg:col-span-7">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            AI · Software · Automation · Business Systems
          </p>
          <h1 className="text-display cluster text-balance text-ink">
            Build smarter. Automate faster. Operate better.
          </h1>
          <p className="text-body measure cluster text-muted">
            We build custom software, AI agents and business automation systems that connect your people, processes and data.
          </p>
          <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/#solutions">See What We Build</Link>
            </Button>
          </div>
          <ul className="cluster-lg flex flex-wrap gap-2" aria-label={trustLine.join(", ")}>
            {trustLine.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">System</p>
            <ol className="mt-4" aria-label="Example architecture">
              {architecture.map((step, index) => (
                <li key={step}>
                  <div className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-3 py-2.5">
                    <span className="font-mono text-xs font-semibold text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold text-ink">{step}</span>
                  </div>
                  {index < architecture.length - 1 ? (
                    <span className="relative mx-auto my-1 block h-4 w-px overflow-hidden bg-line" aria-hidden="true">
                      <span className="flow-rail-fill absolute inset-x-0 top-0 h-2 bg-accent" />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
