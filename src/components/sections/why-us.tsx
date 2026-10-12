import { Icon, UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { whyPoints } from "@/content/home";
import { comparisonRows } from "@/content/stories";

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <Container>
        <h2 id="why-heading" className="text-h2 text-ink">
          Not just a website. A business system.
        </h2>
        <ul className="mt-8 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point) => (
            <li key={point.title} className="soft-card flex h-full flex-col">
              <span className="icon-chip">
                <Icon name={point.icon} />
              </span>
              <p className="mt-4 text-base font-semibold text-ink">{point.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-2 border-b border-line">
            <p className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:px-5">Traditional agency</p>
            <p className="border-l border-line bg-accent-soft/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink sm:px-5">Kyntriq</p>
          </div>
          {comparisonRows.map(([typical, kyntriq]) => (
            <div key={typical} className="grid grid-cols-2 border-b border-line last:border-b-0">
              <p className="flex items-start gap-2.5 px-4 py-3.5 text-sm leading-snug text-muted sm:px-5">
                <UiIcon name="minus" className="mt-0.5 size-3.5 shrink-0 text-muted" />
                {typical}
              </p>
              <p className="flex items-start gap-2.5 border-l border-line bg-accent-soft/35 px-4 py-3.5 text-sm font-medium leading-snug text-ink sm:px-5">
                <UiIcon name="check" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />
                {kyntriq}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
