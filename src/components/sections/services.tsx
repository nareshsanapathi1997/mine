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
    <ul className="mt-4 space-y-0">
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
      {ai ? (
        <Container className="section grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="services-heading" className="text-h2 text-ink">
              What we build
            </h2>
            <p className="mt-4 font-mono text-sm text-accent-ink">01</p>
            <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink">{ai.title}</h3>
            <p className="mt-3 max-w-[42ch] text-base text-muted">{ai.description}</p>
            <Links slugs={ai.slugs} />
          </div>
          <div className="product-window min-w-0 lg:col-span-7" aria-label="AI workflow">
            <div className="product-window-bar">
              <span className="live-pip" aria-hidden="true" />
              AI agent
            </div>
            <div className="product-window-body space-y-3">
              <p className="chat-user">Customer request</p>
              <p className="chat-agent">AI checks business data, then a decision.</p>
              <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
                {visuals.ai.map((step) => (
                  <li key={step} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      ) : null}

      {software ? (
        <div className="bg-canvas">
          <Container className="grid items-center gap-6 py-8 lg:grid-cols-12">
            <div className="grid min-w-0 grid-cols-2 gap-3 lg:col-span-6">
              {visuals.software.map((step) => (
                <div key={step} className="product-window">
                  <div className="product-window-bar">
                    <span className="live-pip" aria-hidden="true" />
                    {step}
                  </div>
                  <div className="product-window-body">
                    {step === "CRM" ? (
                      <ul className="m-0 list-none space-y-2 p-0 text-xs text-ink">
                        {["Application #10482", "Room 214", "Order #8821"].map((row) => (
                          <li key={row} className="flex items-center gap-2">
                            <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {row}
                          </li>
                        ))}
                      </ul>
                    ) : step === "Dashboard" ? (
                      <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
                        {[40, 70, 55, 88, 62].map((height) => (
                          <span key={height} className="w-full rounded-sm bg-accent/80" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                    ) : step === "Mobile" ? (
                      <div className="mx-auto flex h-20 w-12 flex-col justify-end gap-1.5 rounded-xl border-2 border-muted bg-surface p-1.5" aria-hidden="true">
                        <span className="h-1.5 w-full rounded-full bg-muted" />
                        <span className="h-1.5 w-2/3 rounded-full bg-accent" />
                      </div>
                    ) : (
                      <div aria-hidden="true">
                        <div className="h-2 w-2/3 rounded-full bg-muted" />
                        <div className="mt-2 h-2 w-1/2 rounded-full bg-muted/70" />
                        <div className="mt-4 h-7 w-24 rounded-full bg-accent" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-6">
              <p className="font-mono text-sm text-accent-ink">02</p>
              <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink">{software.title}</h3>
              <p className="mt-3 max-w-[42ch] text-base text-muted">{software.description}</p>
              <Links slugs={software.slugs} />
            </div>
          </Container>
        </div>
      ) : null}

      {infrastructure ? (
        <Container className="grid items-start gap-6 border-t border-line py-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-sm text-accent-ink">03</p>
            <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink">{infrastructure.title}</h3>
            <p className="mt-3 max-w-[42ch] text-base text-muted">{infrastructure.description}</p>
            <Links slugs={infrastructure.slugs} />
          </div>
          <div className="product-window min-w-0 lg:col-span-7">
            <div className="product-window-bar">
              <span className="live-pip" aria-hidden="true" />
              Release path
            </div>
            <ol className="m-0 list-none p-0" aria-label="Release path">
              {visuals.infrastructure.map((step, index) => (
                <li key={step} className="flex items-center gap-3 border-t border-line px-4 py-3 text-base text-ink">
                  <span className="font-mono text-xs text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      ) : null}
    </section>
  );
}
