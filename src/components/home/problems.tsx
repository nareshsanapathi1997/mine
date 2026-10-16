import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { homeProblems } from "@/content/home-page";

export function HomeProblems() {
  return (
    <section className="section h-section" aria-labelledby="problems-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">Problems we fix</p>
            <h2 id="problems-heading" className="text-h2 mt-3 text-ink">
              Everyday problems we fix for Indian businesses.
            </h2>
          </div>
          <p className="text-body text-muted">
            Most of these are small jobs done by hand, many times a day. Software can do them on time, every time.
          </p>
        </div>
        <ul className="stack grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-reveal-stagger>
          {homeProblems.map((item) => (
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
                  What changes
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
