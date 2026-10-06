import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { automationFlows } from "@/content/home";

export function AutomationSection() {
  return (
    <section id="automation" className="section scroll-mt-28 bg-canvas" aria-labelledby="automation-heading">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
          <SectionHeading
            id="automation-heading"
            eyebrow="Business automation"
            title="Automate the work your team repeats every day."
            description="Three patterns we design often. The steps stay visible, so the team knows what the workflow is doing."
          />
          <Button asChild size="lg" arrow className="shrink-0">
            <Link href="/contact?need=Business+automation">Automate My Business</Link>
          </Button>
        </div>
        <div className="grid-12 stack" data-reveal-stagger>
          {automationFlows.map((flow) => (
            <article key={flow.id} data-reveal-child className="card card-accent col-span-12 lg:col-span-4">
              <h3 className="text-h3 text-ink">{flow.title}</h3>
              <ol className="auto-list relative mt-5 space-y-4">
                <span className="auto-rail" aria-hidden="true" />
                {flow.steps.map((step, index) => (
                  <li key={step} className="relative flex items-start gap-3 pl-1">
                    <span className="step-index mt-0.5 size-[22px] shrink-0 rounded-full bg-surface text-center text-[11px] leading-[20px] font-medium text-ink">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
