import { Container } from "@/components/layout/container";

const items = [
  {
    question: "What does Kyntriq build?",
    answer:
      "Connected software, AI agents and business automation around the way an organization already operates. A website, an app, or an agent should finish a step that a person currently copies between tools.",
  },
  {
    question: "Can you connect our existing CRM?",
    answer:
      "Yes. A first version usually writes back to the CRM, database, or inbox your team already trusts.",
  },
  {
    question: "Does the AI make decisions on its own?",
    answer:
      "Only for an action that has already been named. A status lookup can be answered. A fee waiver, a seat, or a price exception stays with a person.",
  },
  {
    question: "Can you automate WhatsApp?",
    answer:
      "Yes. A WhatsApp thread can capture a request, answer from your records, and notify the person who owns the next step.",
  },
  {
    question: "Can you build custom business software?",
    answer:
      "Yes. CRMs, portals, dashboards and internal systems are shaped around the workflow, not around a generic module list.",
  },
  {
    question: "How does a project start?",
    answer:
      "With the operation that is blocking the team. We specify that workflow, build it, connect it, and stay for the next improvement.",
  },
  {
    question: "Do you replace existing tools?",
    answer:
      "Not by default. We connect the website, WhatsApp, or an agent to the current system of record. Replacing that system is a later decision.",
  },
  {
    question: "Are the solution patterns real client projects?",
    answer:
      "No. They are example system patterns for real operating problems. They are not named clients and they do not include measured results.",
  },
];

export function Faq() {
  return (
    <section className="section bg-canvas" aria-labelledby="faq-heading">
      <Container className="grid gap-10 lg:grid-cols-12">
        <h2 id="faq-heading" className="text-h2 uppercase text-ink lg:col-span-4">
          Questions
        </h2>
        <div className="border-t border-line lg:col-span-8">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="font-mono text-accent-ink transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-5 text-base leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
