import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { comparisonRows } from "@/content/stories";

export function WhyUs() {
  return (
    <section className="section bg-surface" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why Kyntriq"
          title="A business system, not a pile of deliverables."
          description="We start from how the organization already operates, then connect the software and automation around that workflow."
        />
        <div className="stack overflow-hidden rounded-xl border border-line" data-reveal>
          <div className="grid grid-cols-2 bg-navy text-white">
            <p className="px-4 py-3 text-sm font-semibold sm:px-6">Typical agency</p>
            <p className="border-l border-white/15 px-4 py-3 text-sm font-semibold sm:px-6">Kyntriq Solutions</p>
          </div>
          <ul>
            {comparisonRows.map(([typical, kyntriq]) => (
              <li key={typical} className="grid grid-cols-2 border-t border-line">
                <p className="px-4 py-4 text-sm text-muted sm:px-6 sm:text-base">{typical}</p>
                <p className="border-l border-line bg-canvas px-4 py-4 text-sm font-semibold text-ink sm:px-6 sm:text-base">
                  {kyntriq}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
