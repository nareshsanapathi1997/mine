"use client";

import { useState } from "react";
import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

const nodes: {
  id: string;
  label: string;
  group: "in" | "out";
  icon: UiIconName;
  path: string[];
}[] = [
  { id: "website", label: "Website", group: "in", icon: "globe", path: ["Website", "API", "Business Data", "Action"] },
  { id: "mobile", label: "Mobile", group: "in", icon: "smartphone", path: ["Mobile", "API", "Business Data", "Action"] },
  { id: "whatsapp", label: "WhatsApp", group: "in", icon: "message", path: ["WhatsApp", "AI Agent", "CRM", "Business Logic", "Action"] },
  { id: "human", label: "Human", group: "in", icon: "user", path: ["Human", "Business Data", "Approval", "Action"] },
  { id: "agent", label: "AI Agent", group: "out", icon: "bot", path: ["AI Agent", "Business Data", "Business Logic", "Action"] },
  { id: "crm", label: "CRM", group: "out", icon: "blocks", path: ["CRM", "Business Data", "Automation", "Action"] },
  { id: "automation", label: "Automation", group: "out", icon: "workflow", path: ["Automation", "Business Data", "Action"] },
  { id: "api", label: "API", group: "out", icon: "link", path: ["API", "Business Data", "Automation", "Action"] },
];

export function ConnectedSystems() {
  const [active, setActive] = useState<(typeof nodes)[number]["id"]>("whatsapp");
  const current = nodes.find((node) => node.id === active) ?? nodes[2] ?? nodes[0];
  const incoming = nodes.filter((node) => node.group === "in");
  const outgoing = nodes.filter((node) => node.group === "out");

  function Channel({ node }: { node: (typeof nodes)[number] }) {
    const selected = active === node.id;
    return (
      <button
        type="button"
        className={cn(
          "inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium",
          selected ? "border-accent bg-accent-soft text-ink" : "border-line bg-canvas text-muted",
        )}
        aria-pressed={selected}
        onMouseEnter={() => setActive(node.id)}
        onFocus={() => setActive(node.id)}
        onClick={() => setActive(node.id)}
      >
        <UiIcon name={node.icon} className="size-3.5 text-accent-ink" />
        {node.label}
      </button>
    );
  }

  return (
    <section className="section" aria-labelledby="connected-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">Connected systems</p>
            <h2 id="connected-heading" className="text-h2 mt-3 text-ink">
              One business system. Every channel connected.
            </h2>
          </div>
          <p className="text-body text-muted">
            Your website, WhatsApp, mobile apps, AI agents and internal software should work from the same business records.
          </p>
        </div>

        <div className="system-board mt-8">
          <div className="system-board-bar">Channels into one record</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {incoming.map((node) => (
              <Channel key={node.id} node={node} />
            ))}
          </div>
          <div className="flex flex-col items-center py-1">
            <div className="system-link" aria-hidden="true" />
            <div className="rounded-full border border-line-strong bg-canvas px-5 py-2 text-sm font-semibold tracking-tight text-ink">
              Business Data
            </div>
            <div className="system-link" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {outgoing.map((node) => (
              <Channel key={node.id} node={node} />
            ))}
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-3 text-sm text-ink" aria-live="polite">
            {current
              ? current.path.map((step, index) => (
                  <span key={`${current.id}-${step}`} className="inline-flex items-center gap-2">
                    {index > 0 ? <UiIcon name="arrow" className="size-3.5 text-accent-ink" /> : null}
                    {step}
                  </span>
                ))
              : null}
          </p>
        </div>
      </Container>
    </section>
  );
}
