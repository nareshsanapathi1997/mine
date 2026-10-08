import { Container } from "@/components/layout/container";
import { processSteps } from "@/content/home";

export function Process() {
  return (
    <section className="section bg-surface" aria-labelledby="process-heading">
      <Container>
        <h2 id="process-heading" className="text-h2 text-ink">
          Discover. Specify. Build. Connect. Stay.
        </h2>
        <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((item) => (
            <li key={item.number} className="rounded-xl border border-line px-3 py-3">
              <span className="font-mono text-[11px] text-accent-ink">{item.number}</span>
              <span className="mt-1 block text-sm font-medium text-ink">{item.title}</span>
              <span className="mt-2 block text-sm leading-snug text-muted">{item.description}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
