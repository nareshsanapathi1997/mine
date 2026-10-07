import { Container } from "@/components/layout/container";

const items = [
  {
    question: "What does Kyntriq Solutions build?",
    answer:
      "Connected software, AI agents and business automation around the way an organization already operates. A website, an app, or an agent should finish a step that a person currently copies between tools.",
  },
  {
    question: "Does the AI make decisions on its own?",
    answer:
      "Only for an action that has already been named. A status lookup can be answered. A fee waiver, a seat, or a price exception stays with a person.",
  },
  {
    question: "Can you connect our existing CRM or software?",
    answer:
      "Yes. A first version usually writes back to the CRM, database, or inbox your team already trusts.",
  },
  {
    question: "Do you replace the tools we already use?",
    answer:
      "Not by default. We connect the website, WhatsApp, or an agent to the current system of record. Replacing that system is a later decision.",
  },
  {
    question: "How does a project start?",
    answer:
      "With the operation that is blocking the team. We specify that workflow, build it, connect it, and stay for the next improvement.",
  },
  {
    question: "Can you build custom business software?",
    answer:
      "Yes. CRMs, portals, dashboards and internal systems are shaped around the workflow, not around a generic module list.",
  },
  {
    question: "Can you automate WhatsApp conversations?",
    answer:
      "Yes. A WhatsApp thread can capture a request, answer from your records, and notify the person who owns the next step.",
  },
  {
    question: "How do you handle security and access?",
    answer:
      "Access, deployment, backups and monitoring are part of the build. A test environment does not write into live student, guest, or customer data.",
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
      <Container className="max-w-3xl">
        <h2 id="faq-heading" className="text-h2 text-ink">
          Questions
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer text-base font-semibold text-ink">{item.question}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
