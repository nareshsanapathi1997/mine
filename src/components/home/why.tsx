import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { homeReasons, homeSafety, homeSteps } from "@/content/home-page";

export function HomeSteps() {
  return (
    <section className="section h-section" aria-labelledby="steps-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">How we work with you</p>
            <h2 id="steps-heading" className="text-h2 mt-3 text-ink">
              Four simple steps, from first call to go-live.
            </h2>
          </div>
          <p className="text-body text-muted">You always know what is being built, what it costs and when it will be ready.</p>
        </div>
        <ol className="h-steps mt-8 lg:mt-10" data-reveal-stagger>
          {homeSteps.map((step, index) => (
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

export function HomeWhy() {
  return (
    <section className="section h-section h-band-soft" aria-labelledby="why-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2 id="why-heading" className="text-h2 mt-3 text-ink">
              Why owners and principals work with us.
            </h2>
          </div>
          <p className="text-body text-muted">A small, hands-on team in Visakhapatnam. You talk directly to the people who build your software.</p>
        </div>
        <ul className="stack grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
          {homeReasons.map((item) => (
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
              Your data stays safe and stays yours
            </h3>
            <p className="mt-1 text-sm text-muted">Built into every project, switched on to suit your work.</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {homeSafety.map((item) => (
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
