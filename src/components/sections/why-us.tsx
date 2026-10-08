import { Container } from "@/components/layout/container";
import { whyPoints } from "@/content/home";
import { comparisonRows } from "@/content/stories";

export function WhyUs() {
  return (
    <section className="section bg-canvas" aria-labelledby="why-heading">
      <Container>
        <h2 id="why-heading" className="text-h2 text-ink">
          Not just a website. A business system.
        </h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point) => (
            <li key={point.title} className="rounded-xl border border-line px-4 py-3">
              <p className="text-sm font-semibold text-ink">{point.title}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{point.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-2 border-b border-line">
            <p className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:px-6">Traditional agency</p>
            <p className="border-l border-accent/40 bg-accent-soft px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-ink sm:px-6">Kyntriq</p>
          </div>
          {comparisonRows.map(([typical, kyntriq]) => (
            <div key={typical} className="grid grid-cols-2 border-b border-line last:border-b-0">
              <p className="px-4 py-4 text-base text-muted sm:px-6 sm:text-lg">{typical}</p>
              <p className="border-l border-accent/30 bg-accent-soft/40 px-4 py-4 text-base font-medium text-ink sm:px-6 sm:text-lg">{kyntriq}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
