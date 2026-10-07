import { Container } from "@/components/layout/container";

const problems = [
  {
    number: "01",
    title: "Losing leads?",
    body: "AI agents capture, qualify and follow up with prospects automatically.",
  },
  {
    number: "02",
    title: "Too many repetitive tasks?",
    body: "Automate repetitive business processes across the systems you already use.",
  },
  {
    number: "03",
    title: "Data scattered everywhere?",
    body: "Connect the CRM, website, WhatsApp, databases and internal tools.",
  },
  {
    number: "04",
    title: "Need custom software?",
    body: "Build the system around the actual workflow, not around a generic template.",
  },
];

export function Problems() {
  return (
    <section className="section bg-canvas" aria-labelledby="problems-heading">
      <Container>
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          The problem
        </p>
        <h2 id="problems-heading" className="text-h2 mt-3 max-w-[22ch] text-balance text-ink">
          Your business shouldn&apos;t run on spreadsheets and manual follow-ups.
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {problems.map((item) => (
            <li key={item.number} className="card">
              <p className="font-mono text-xs font-semibold text-accent-ink">{item.number}</p>
              <h3 className="text-h3 mt-2 text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
