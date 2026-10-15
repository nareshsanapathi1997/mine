import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { homeServices, homeTools } from "@/content/home-page";

export function HomeServices() {
  return (
    <section id="what-we-build" className="section h-section h-band-soft scroll-mt-24" aria-labelledby="build-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">What we build</p>
            <h2 id="build-heading" className="text-h2 mt-3 text-ink">
              Five things we build, alone or together.
            </h2>
          </div>
          <p className="text-body text-muted">
            Start with one. Each piece shares the same information, so you never type the same detail twice.
          </p>
        </div>
        <ul className="stack h-bento" data-reveal-stagger>
          {homeServices.map((service, index) => (
            <li key={service.title} className={index === 0 ? "card h-service h-service-lead" : "card h-service"} data-reveal-child>
              <span className="icon-chip">
                <UiIcon name={service.icon} />
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.body}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink">
                {service.examples.map((example) => (
                  <li key={example} className="flex items-start gap-2">
                    <UiIcon name="check" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />
                    {example}
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="text-link mt-auto pt-5">
                Learn more <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
                <span className="sr-only"> about {service.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-tools mt-6">
          <p className="text-sm font-semibold text-ink">Works with the tools you already use</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tools we can connect with">
            {homeTools.map((tool) => (
              <li key={tool} className="chip">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
