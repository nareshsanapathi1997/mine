import Link from "next/link";
import { Container } from "@/components/layout/container";
import { servicesInGroup, solutionGroups } from "@/content/services";

const visuals: Record<string, string[]> = {
  ai: ["Customer request", "AI", "Business data", "Decision", "Action"],
  software: ["Website", "Mobile", "Dashboard", "CRM"],
  infrastructure: ["Code", "CI/CD", "Cloud", "Monitoring", "Production"],
};

function Links({ slugs }: { slugs: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-1">
      {servicesInGroup(slugs).map((service) => (
        <li key={service.slug}>
          <Link href={`/solutions/${service.slug}`} className="group inline-flex min-h-11 items-center gap-3 text-lg text-ink">
            <span className="text-accent-ink transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
            {service.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Services() {
  const [ai, software, infrastructure] = solutionGroups;

  return (
    <section id="solutions" className="scroll-mt-28 border-y border-line bg-surface" aria-labelledby="services-heading">
      <Container className="section">
        <h2 id="services-heading" className="text-h2 max-w-[16ch] uppercase text-ink">
          What we build
        </h2>
      </Container>

      {ai ? (
        <Container className="grid items-center gap-12 border-t border-line py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="font-mono text-sm text-accent-ink">01</p>
            <h3 className="mt-3 text-4xl font-medium tracking-tight text-ink">{ai.title}</h3>
            <p className="mt-3 max-w-[42ch] text-base text-muted">{ai.description}</p>
            <Links slugs={ai.slugs} />
          </div>
          <ol className="m-0 flex list-none flex-col gap-0 p-0 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-7" aria-label="AI workflow">
            {visuals.ai.map((step, index) => (
              <li key={step} className="flex items-center gap-3 py-2 sm:py-0">
                <span className="rounded-full border border-line px-3 py-2 text-sm font-medium text-ink">{step}</span>
                {index < visuals.ai.length - 1 ? (
                  <span className="text-accent-ink" aria-hidden="true">
                    <span className="sm:hidden">↓</span>
                    <span className="hidden sm:inline">→</span>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      ) : null}

      {software ? (
        <div className="bg-canvas">
          <Container className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-6">
              {visuals.software.map((step) => (
                <div key={step} className="bg-canvas px-5 py-10 text-lg font-medium text-ink">
                  {step}
                </div>
              ))}
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-mono text-sm text-accent-ink">02</p>
              <h3 className="mt-3 text-4xl font-medium tracking-tight text-ink">{software.title}</h3>
              <p className="mt-3 max-w-[42ch] text-base text-muted">{software.description}</p>
              <Links slugs={software.slugs} />
            </div>
          </Container>
        </div>
      ) : null}

      {infrastructure ? (
        <Container className="grid items-start gap-12 border-t border-line py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="font-mono text-sm text-accent-ink">03</p>
            <h3 className="mt-3 text-4xl font-medium tracking-tight text-ink">{infrastructure.title}</h3>
            <p className="mt-3 max-w-[42ch] text-base text-muted">{infrastructure.description}</p>
            <Links slugs={infrastructure.slugs} />
          </div>
          <ol className="signal-rail m-0 list-none p-0 lg:col-span-6 lg:col-start-7" aria-label="Release path">
            <span className="signal-dot" aria-hidden="true" />
            {visuals.infrastructure.map((step, index) => (
              <li key={step} className="relative py-4 pl-10 text-xl text-ink">
                <span className="absolute top-6 left-0 size-2.5 rounded-full border border-accent bg-surface" aria-hidden="true" />
                <span className="mr-3 font-mono text-xs text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </Container>
      ) : null}
    </section>
  );
}
