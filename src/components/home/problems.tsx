import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import type { HomeContent } from "@/lib/cms/types";

export function HomeProblems({ content, fixLabel }: { content: HomeContent["problems"]; fixLabel: string }) {
  return (
    <section className="section h-section" aria-labelledby="problems-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="problems-heading" className="text-h2 mt-3 text-ink">
              {content.title}
            </h2>
          </div>
          <p className="text-body text-muted">{content.intro}</p>
        </div>
        <ul className="stack grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-reveal-stagger>
          {content.items.map((item) => (
            <li key={item.who} className="card h-problem" data-reveal-child>
              <div className="flex items-center gap-2.5">
                <span className="icon-chip icon-chip-sm">
                  <UiIcon name={item.icon} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink">{item.who}</span>
              </div>
              <p className="mt-4 text-base font-semibold leading-snug text-ink">{item.problem}</p>
              <p className="h-fix mt-4 text-sm leading-relaxed text-muted">
                <span className="h-fix-label">
                  <UiIcon name="arrow" className="size-3.5" />
                  {fixLabel}
                </span>
                {item.fix}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
