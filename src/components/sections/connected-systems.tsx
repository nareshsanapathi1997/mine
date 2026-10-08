"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

const nodes = [
  { id: "website", label: "Website", group: "in", path: ["Website", "API", "Business Data", "Action"] },
  { id: "mobile", label: "Mobile", group: "in", path: ["Mobile", "API", "Business Data", "Action"] },
  { id: "whatsapp", label: "WhatsApp", group: "in", path: ["WhatsApp", "AI Agent", "CRM", "Business Logic", "Action"] },
  { id: "human", label: "Human", group: "in", path: ["Human", "Business Data", "Approval", "Action"] },
  { id: "agent", label: "AI Agent", group: "out", path: ["AI Agent", "Business Data", "Business Logic", "Action"] },
  { id: "crm", label: "CRM", group: "out", path: ["CRM", "Business Data", "Automation", "Action"] },
  { id: "automation", label: "Automation", group: "out", path: ["Automation", "Business Data", "Action"] },
  { id: "api", label: "API", group: "out", path: ["API", "Business Data", "Automation", "Action"] },
] as const;

export function ConnectedSystems() {
  const [active, setActive] = useState<(typeof nodes)[number]["id"]>("whatsapp");
  const current = nodes.find((node) => node.id === active) ?? nodes[2];
  const incoming = nodes.filter((node) => node.group === "in");
  const outgoing = nodes.filter((node) => node.group === "out");

  function Channel({ node }: { node: (typeof nodes)[number] }) {
    const selected = active === node.id;
    return (
      <button
        type="button"
        className={cn(
          "min-h-11 min-w-0 rounded-xl border px-3 text-sm font-medium",
          selected ? "border-accent bg-accent-soft text-ink" : "border-line bg-canvas/70 text-muted",
        )}
        aria-pressed={selected}
        onMouseEnter={() => setActive(node.id)}
        onFocus={() => setActive(node.id)}
        onClick={() => setActive(node.id)}
      >
        {node.label}
      </button>
    );
  }

  return (
    <section className="section bg-canvas" aria-labelledby="connected-heading">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Connected systems</p>
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <h2 id="connected-heading" className="text-h2 max-w-[18ch] text-ink lg:col-span-7">
            One business system. Every channel connected.
          </h2>
          <p className="text-body text-muted lg:col-span-5">
            Your website, WhatsApp, mobile apps, AI agents and internal software should work from the same business records.
          </p>
        </div>

        <div className="system-board mt-5">
          <div className="system-board-bar">Channels into one record</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {incoming.map((node) => (
              <Channel key={node.id} node={node} />
            ))}
          </div>
          <div className="system-link" aria-hidden="true" />
          <div className="mx-auto w-fit rounded-full border border-accent/50 bg-accent-soft px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_28px_-12px_rgba(45,212,191,0.7)]">
            Business Data
          </div>
          <div className="system-link" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {outgoing.map((node) => (
              <Channel key={node.id} node={node} />
            ))}
          </div>
          <p className="mt-4 text-sm text-ink" aria-live="polite">
            {current.path.join("  →  ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
