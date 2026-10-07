import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { WorkflowDiagram } from "@/components/ui/workflow";
import { caseStudies } from "@/content/case-studies";

export function CaseStudies({
  heading = "Solution in practice",
  intro = "These are system patterns for real operating problems. They are not verified client engagements, and they do not include invented results.",
  detailed = false,
}: {
  heading?: string;
  intro?: string;
  detailed?: boolean;
}) {
  return (
    <section id="case-studies" className="section scroll-mt-28 bg-canvas" aria-labelledby="cases-heading">
      <Container>
        <SectionHeading
          id="cases-heading"
          eyebrow="Solution patterns"
          title={heading}
          description={intro}
        />
        <ul className="stack grid gap-[var(--gutter)]">
          {caseStudies.map((study) => (
            <li key={study.slug} id={study.slug} className="scroll-mt-28">
              <article className="card">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
                  {study.industry} · Solution pattern
                </p>
                <h3 className="text-h3 mt-2 text-ink">{study.title}</h3>
                <dl className="mt-5 grid gap-4 text-sm leading-relaxed md:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-ink">Problem</dt>
                    <dd className="mt-1 text-muted">{study.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Existing workflow</dt>
                    <dd className="mt-1 text-muted">{study.existingWorkflow}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="font-semibold text-ink">Kyntriq solution</dt>
                    <dd className="mt-1 text-muted">{study.solution}</dd>
                  </div>
                </dl>
                {detailed ? (
                  <>
                    <h4 className="mt-5 text-sm font-semibold text-ink">Architecture</h4>
                    <div className="mt-3">
                      <WorkflowDiagram steps={study.architecture} label={`${study.title} architecture`} />
                    </div>
                    <h4 className="mt-5 text-sm font-semibold text-ink">Technology</h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {study.technology.map((item) => (
                        <li key={item} className="chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="mt-4">
                    <WorkflowDiagram steps={study.architecture} label={`${study.title} architecture`} />
                  </div>
                )}
                <Link href={detailed ? "/contact" : `/case-studies#${study.slug}`} className="text-link mt-4">
                  {detailed ? "Talk to an Expert" : "View pattern"}
                  <span className="text-link-arrow" aria-hidden="true">→</span>
                  <span className="sr-only"> {study.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
