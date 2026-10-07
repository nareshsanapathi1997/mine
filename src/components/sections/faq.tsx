import { Container } from "@/components/layout/container";

const items = [
  {
    question: "What does Kyntriq Solutions build?",
    answer:
      "Connected websites, business software, and AI or automation that read and write the same records. The starting point is the workflow your team already runs.",
  },
  {
    question: "Does the AI decide on its own?",
    answer:
      "Only for an action that has already been named. A status lookup can be answered. A fee waiver, a seat, or a price exception stays with a person, and the handoff includes what was already said.",
  },
  {
    question: "Do you replace the tools we already use?",
    answer:
      "Not by default. A first version usually connects the website, WhatsApp, or an agent to the system your team already trusts. A replacement is a later decision.",
  },
  {
    question: "How does a project start?",
    answer:
      "With the operation that is blocking the team. We specify that workflow, build it, connect it to your records, and stay for the next improvement.",
  },
  {
    question: "Are the case studies client results?",
    answer:
      "No. Pages marked Solution in Practice are example system patterns. They are not named clients and they do not include measured results.",
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
              <summary className="cursor-pointer text-base font-semibold text-ink">
                {item.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
