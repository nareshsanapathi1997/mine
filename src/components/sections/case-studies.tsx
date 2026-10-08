import Link from "next/link";
import { Container } from "@/components/layout/container";
import { WorkflowDiagram } from "@/components/ui/workflow";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

function PatternLink({ study, detailed }: { study: CaseStudy; detailed: boolean }) {
  return (
    <Link href={detailed ? "/contact" : `/case-studies#${study.slug}`} className="text-link mt-5">
      {detailed ? "Talk to an Expert" : "View pattern"}
      <span className="text-link-arrow" aria-hidden="true">→</span>
      <span className="sr-only"> {study.title}</span>
    </Link>
  );
}

function Detail({ study, detailed }: { study: CaseStudy; detailed: boolean }) {
  if (!detailed) return null;
  return (
    <>
      <p className="mt-3 text-sm leading-relaxed text-muted">{study.existingWorkflow}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{study.solution}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
        {study.technology.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export function CaseStudies({
  heading = "Real business problems. Systems built around them.",
  intro = "These are solution patterns for real operating problems. They are not verified client engagements, and they do not include invented results.",
  detailed = false,
}: {
  heading?: string;
  intro?: string;
  detailed?: boolean;
}) {
  return (
    <section id="case-studies" className="section scroll-mt-28 bg-canvas" aria-labelledby="cases-heading">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Solution patterns</p>
        <h2 id="cases-heading" className="text-h2 mt-4 max-w-[16ch] uppercase text-ink">
          {heading}
        </h2>
        <p className="text-body mt-5 max-w-[54ch] text-muted">{intro}</p>
        <div className="mt-16 space-y-24">
          {caseStudies.map((study, index) => {
            if (index === 1) {
              return (
                <article key={study.slug} id={study.slug} className="scroll-mt-28 grid items-center gap-10 border-y border-line py-12 lg:grid-cols-2">
                  <WorkflowDiagram steps={study.architecture} label={`${study.title} architecture`} />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">{study.industry} · Solution pattern</p>
                    <h3 className="mt-3 text-4xl font-medium tracking-tight text-ink">{study.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{study.problem}</p>
                    <Detail study={study} detailed={detailed} />
                    <PatternLink study={study} detailed={detailed} />
                  </div>
                </article>
              );
            }
            if (index === 2) {
              return (
                <article key={study.slug} id={study.slug} className="scroll-mt-28 grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">{study.industry} · Solution pattern</p>
                    <h3 className="mt-3 text-4xl font-medium tracking-tight text-ink">{study.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted">{study.problem}</p>
                    <Detail study={study} detailed={detailed} />
                    <PatternLink study={study} detailed={detailed} />
                  </div>
                  <ol className="m-0 list-none border-l border-line p-0 lg:col-span-7 lg:col-start-6" aria-label={`${study.title} architecture`}>
                    {study.architecture.map((step, stepIndex) => (
                      <li key={step} className="relative py-3 pl-8 text-xl text-ink">
                        <span className="absolute top-5 -left-1 size-2 rounded-full bg-accent" aria-hidden="true" />
                        <span className="mr-3 font-mono text-xs text-accent-ink">{String(stepIndex + 1).padStart(2, "0")}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </article>
              );
            }
            return (
              <article key={study.slug} id={study.slug} className="scroll-mt-28">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">{study.industry} · Solution pattern</p>
                <h3 className="mt-3 max-w-[16ch] text-5xl font-medium tracking-tight text-ink">{study.title}</h3>
                <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-muted">{study.problem}</p>
                <div className="mt-8">
                  <WorkflowDiagram steps={study.architecture} label={`${study.title} architecture`} />
                </div>
                <Detail study={study} detailed={detailed} />
                <PatternLink study={study} detailed={detailed} />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
