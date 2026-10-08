"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

const problems = [
  {
    number: "01",
    title: "Leads get lost",
    body: "Website enquiries, WhatsApp messages and calls are handled separately.",
    solve: "Those channels write into one record, and the follow-up starts from that record.",
  },
  {
    number: "02",
    title: "Teams repeat the same work",
    body: "People copy data between spreadsheets, CRM systems and messages.",
    solve: "The repeated copy is replaced by a workflow that updates the system the team already trusts.",
  },
  {
    number: "03",
    title: "Business data is scattered",
    body: "Important information lives across different tools.",
    solve: "Website, WhatsApp, mobile and the dashboard read the same customer, student or order.",
  },
  {
    number: "04",
    title: "AI doesn't have context",
    body: "A chatbot can answer questions, but it cannot act on your real business records.",
    solve: "An agent may read the record and take only the actions you have already named.",
  },
];

export function Problems() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section bg-surface" aria-labelledby="problem-heading">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">The problem</p>
        <h2 id="problem-heading" className="text-h2 mt-4 max-w-[16ch] uppercase text-ink">
          Your business shouldn&apos;t run on manual follow-ups.
        </h2>
        <div className="mt-14 border-t border-line">
          {problems.map((item) => {
            const expanded = open === item.number;
            return (
              <article key={item.number} className={cn("problem-row border-b border-line", expanded && "is-open")}>
                <button
                  type="button"
                  className="grid w-full gap-3 py-7 text-left md:grid-cols-12 md:items-baseline md:gap-6"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : item.number)}
                >
                  <span className="font-mono text-sm text-accent-ink md:col-span-2">{item.number}</span>
                  <span className="text-2xl font-medium tracking-tight text-ink md:col-span-4">{item.title}</span>
                  <span className="text-base leading-relaxed text-muted md:col-span-6">{item.body}</span>
                </button>
                <div className="problem-answer">
                  <div className="overflow-hidden">
                    <p className="pb-7 text-sm text-ink md:pl-[calc(16.666%+1.5rem)]">
                      <span className="font-semibold uppercase tracking-[0.14em] text-accent-ink">How Kyntriq solves it. </span>
                      {item.solve}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
