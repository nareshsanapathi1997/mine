import { Container } from "@/components/layout/container";
import { stats as defaultStats, type Stat } from "@/content/stats";
import { CountUp } from "./count-up";

/** Renders nothing until figures are added in src/content/stats.ts. */
export function StatsStrip({ stats = defaultStats }: { stats?: Stat[] }) {
  if (!stats.length) return null;
  return (
    <section className="section-tight h-section border-b border-line" aria-label="Key figures">
      <Container>
        <dl className="grid grid-cols-2 gap-6 lg:grid-flow-col lg:auto-cols-fr">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse text-center lg:text-left">
              {stat.note ? <dd className="mt-0.5 text-xs text-muted">{stat.note}</dd> : null}
              <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="text-h2 font-semibold tracking-tight text-ink tabular-nums">
                <CountUp value={stat.value} decimals={stat.decimals ?? 0} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
