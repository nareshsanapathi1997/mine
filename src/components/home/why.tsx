import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import type { HomeContent } from "@/lib/cms/types";

export function HomeSteps({ content }: { content: HomeContent["steps"] }) {
  return (
    <section className="section h-section" aria-labelledby="steps-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="steps-heading" className="text-h2 mt-3 text-ink">
              {content.title}
            </h2>
          </div>
          <p className="text-body text-muted">{content.intro}</p>
        </div>
        <ol className="h-steps mt-8 lg:mt-10" data-reveal-stagger>
          {content.items.map((step, index) => (
            <li key={step.title} className="h-step" data-reveal-child>
              <span className="h-step-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function HomeWhy({ content }: { content: HomeContent["why"] }) {
  return (
    <section className="section h-section h-band-soft" aria-labelledby="why-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="why-heading" className="text-h2 mt-3 text-ink">
              {content.title}
            </h2>
          </div>
          <p className="text-body text-muted">{content.intro}</p>
        </div>
        <ul className="stack grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
          {content.items.map((item) => (
            <li key={item.title} className="card h-reason" data-reveal-child>
              <span className="icon-chip">
                <UiIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="h-safety mt-4" aria-labelledby="safety-heading">
          <div>
            <h3 id="safety-heading" className="text-base font-semibold text-ink">
              {content.safetyTitle}
            </h3>
            <p className="mt-1 text-sm text-muted">{content.safetyIntro}</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {content.safety.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm text-ink">
                <span className="icon-chip icon-chip-sm">
                  <UiIcon name={item.icon} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
