import { Container } from "@/components/layout/container";
import { comparisonRows } from "@/content/stories";

export function WhyUs() {
  return (
    <section className="section bg-canvas" aria-labelledby="why-heading">
      <Container>
        <h2 id="why-heading" className="text-h2 max-w-[14ch] uppercase text-ink">
          Not just a website. A business system.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:border-r md:border-line md:pr-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Traditional agency</p>
            <ul className="mt-6 space-y-4">
              {comparisonRows.map(([typical]) => (
                <li key={typical} className="text-2xl font-medium text-muted">
                  {typical}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:pl-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Kyntriq</p>
            <ul className="mt-6 space-y-4">
              {comparisonRows.map(([, kyntriq]) => (
                <li key={kyntriq} className="text-2xl font-medium text-ink">
                  {kyntriq}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
