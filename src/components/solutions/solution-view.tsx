import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/ui/workflow";
import type { SolutionPage } from "@/content/solution-details";
import { deliverySteps, sharedIntegrations, solutionStories } from "@/content/stories";

export function SolutionView({
  page,
  crumbs,
  jsonLd,
  related,
}: {
  page: SolutionPage;
  crumbs: Crumb[];
  jsonLd: unknown;
  related: { href: string; title: string; description: string }[];
}) {
  const story = solutionStories[page.slug];
  const headline = story?.headline ?? page.title;
  const support = story?.support ?? page.lede;
  const workflow = story?.workflow ?? ["Request", page.title, "Business data", "Action"];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <header className="border-b border-line bg-canvas">
        <Container className="section-tight grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              {story?.eyebrow ?? "Solutions"}
            </p>
            <h1 className="text-h1 cluster text-balance text-ink">{headline}</h1>
            <p className="text-body measure cluster text-muted">{support}</p>
            <div className="cluster-lg flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" arrow className="w-full sm:w-auto">
                <Link href={`/contact?need=${encodeURIComponent(page.title)}`}>Talk to an Expert</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <section className="section bg-surface" aria-labelledby="problem-heading">
        <Container className="grid-12">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="problem-heading" className="text-h2 text-ink">
              The problem
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="text-body text-muted">{story?.problem ?? page.sections[0]?.body[0]}</p>
            {page.sections.map((section) => (
              <div key={section.heading} className="mt-6">
                <h3 className="text-h3 text-ink">{section.heading}</h3>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-body mt-2 text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="section scroll-mt-28 bg-canvas" aria-labelledby="works-heading">
        <Container>
          <h2 id="works-heading" className="text-h2 text-ink">
            How it works
          </h2>
          <div className="mt-6">
            <WorkflowDiagram steps={workflow} />
          </div>
        </Container>
      </section>

      <section className="section bg-surface" aria-labelledby="features-heading">
        <Container>
          <h2 id="features-heading" className="text-h2 text-ink">
            What this includes
          </h2>
          <ul className="grid-12 stack">
            {(story?.features ?? page.includes.map((item) => ({ title: item, body: "" }))).map((feature) => (
              <li key={feature.title} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <article className="card h-full">
                  <h3 className="text-h3 text-ink">{feature.title}</h3>
                  {feature.body ? <p className="text-small mt-2 text-muted">{feature.body}</p> : null}
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {story ? (
        <section className="section bg-canvas" aria-labelledby="usecases-heading">
          <Container>
            <h2 id="usecases-heading" className="text-h2 text-ink">
              Use cases
            </h2>
            <ul className="grid-12 stack">
              {story.useCases.map((item) => (
                <li key={item.title} className="col-span-12 md:col-span-4">
                  <article className="h-full border-t border-navy pt-4">
                    <h3 className="text-h3 text-ink">{item.title}</h3>
                    <p className="text-small mt-2 text-muted">{item.body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="section bg-surface" aria-labelledby="integrations-heading">
        <Container>
          <h2 id="integrations-heading" className="text-h2 text-ink">
            Integrations
          </h2>
          <p className="text-body mt-3 max-w-[62ch] text-muted">
            The useful connection is the one your team already trusts. These are the systems we typically join.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {sharedIntegrations.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-canvas" aria-labelledby="delivery-heading">
        <Container>
          <h2 id="delivery-heading" className="text-h2 text-ink">
            How a project runs
          </h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {deliverySteps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-line bg-surface p-4">
                <p className="font-mono text-xs font-semibold text-accent-ink">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="section bg-surface" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="text-h2 text-ink">
              Related solutions
            </h2>
            <ul className="grid-12 stack">
              {related.map((item) => (
                <li key={item.href} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <Link href={item.href} className="card block h-full">
                    <span className="text-h3 text-ink">{item.title}</span>
                    <p className="text-small mt-2 text-muted">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand title="Have a workflow you want to automate?" />
    </>
  );
}
