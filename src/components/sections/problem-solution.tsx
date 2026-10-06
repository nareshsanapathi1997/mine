import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { connectedFlow, disconnectedSystems } from "@/content/home";
import { siteConfig } from "@/content/site";

export function ProblemSolution() {
  return (
    <section className="section scroll-mt-28 bg-canvas" aria-labelledby="problem-heading">
      <Container className="grid-12 items-center">
        <div className="col-span-12 lg:col-span-6" data-reveal>
          <SectionHeading
            id="problem-heading"
            eyebrow="The problem"
            title="Your business shouldn’t depend on disconnected systems."
            description="Many organizations still run the website, leads, WhatsApp, customer support, employees, payments, reports and operations as separate tools. People become the integration."
          />
          <ul className="cluster-lg grid grid-cols-2 gap-2 sm:max-w-md" data-reveal-stagger>
            {disconnectedSystems.map((item) => (
              <li key={item} data-reveal-child className="rounded-lg border border-line bg-surface px-3 py-2.5 text-small font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-body measure cluster text-muted">
            {siteConfig.name} connects those parts into one intelligent digital ecosystem,
            so a request can move from the customer into your systems and back again.
          </p>
          <Button asChild size="lg" arrow className="cluster-lg">
            <Link href="/contact?need=Connect+our+systems">Let’s Connect Your Business</Link>
          </Button>
        </div>

        <ol className="panel col-span-12 p-5 text-white sm:p-7 lg:col-span-6" aria-label="How the systems connect" data-reveal>
          {connectedFlow.map((step, index) => (
            <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
              {index < connectedFlow.length - 1 ? (
                <span className="flow-rail flow-rail-fill flow-rail-side" aria-hidden />
              ) : null}
              <span className="relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-base font-semibold text-white">{step}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
