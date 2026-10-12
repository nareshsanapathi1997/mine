import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";

const problems: {
  number: string;
  title: string;
  body: string;
  solve: string;
  icon: UiIconName;
}[] = [
  {
    number: "01",
    icon: "search",
    title: "Leads get lost",
    body: "Website enquiries, WhatsApp messages and calls are handled separately.",
    solve: "Those channels write into one record, and the follow-up starts from that record.",
  },
  {
    number: "02",
    icon: "workflow",
    title: "Teams repeat the same work",
    body: "People copy data between spreadsheets, CRM systems and messages.",
    solve: "The repeated copy is replaced by a workflow that updates the system the team already trusts.",
  },
  {
    number: "03",
    icon: "database",
    title: "Business data is scattered",
    body: "Important information lives across different tools.",
    solve: "Website, WhatsApp, mobile and the dashboard read the same customer, student or order.",
  },
  {
    number: "04",
    icon: "bot",
    title: "AI doesn't have context",
    body: "A chatbot can answer questions, but it cannot act on your real business records.",
    solve: "An agent may read the record and take only the actions you have already named.",
  },
];

export function Problems() {
  return (
    <section className="section" aria-labelledby="problem-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">The problem</p>
            <h2 id="problem-heading" className="text-h2 mt-3 text-ink">
              Your business shouldn&apos;t run on manual follow-ups.
            </h2>
          </div>
          <p className="text-body text-muted">
            Leads get lost. Teams repeat the same work. Business data is scattered. AI doesn&apos;t have context.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {problems.map((item) => (
            <article key={item.number} className="soft-card flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="icon-chip icon-chip-sm">
                  <UiIcon name={item.icon} />
                </span>
                <span className="step-num">{item.number}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              <p className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-ink">
                <span className="font-semibold text-accent-ink">How Kyntriq solves it. </span>
                {item.solve}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
