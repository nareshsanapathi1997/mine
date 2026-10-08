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
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">The problem</p>
            <h2 id="problem-heading" className="text-h2 mt-2 text-ink">
              Your business shouldn&apos;t run on manual follow-ups.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted lg:col-span-5">
            Leads get lost. Teams repeat the same work. Business data is scattered. AI doesn&apos;t have context.
          </p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {problems.map((item) => {
            const expanded = open === item.number;
            return (
              <article key={item.number} className={cn("problem-row rounded-2xl border border-line bg-canvas/40", expanded && "is-open")}>
                <button
                  type="button"
                  className="w-full px-4 py-4 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : item.number)}
                >
                  <span className="font-mono text-xs text-accent-ink">{item.number}</span>
                  <span className="mt-2 block text-xl font-medium tracking-tight text-ink">{item.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{item.body}</span>
                </button>
                <div className="problem-answer">
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-ink">
                      <span className="font-semibold text-accent-ink">How Kyntriq solves it. </span>
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
