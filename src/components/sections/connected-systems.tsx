"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

const nodes = [
  { id: "website", label: "Website", x: 16, y: 22, path: ["Website", "API", "Business Data", "Action"] },
  { id: "mobile", label: "Mobile", x: 50, y: 12, path: ["Mobile", "API", "Business Data", "Action"] },
  { id: "whatsapp", label: "WhatsApp", x: 84, y: 22, path: ["WhatsApp", "AI Agent", "CRM", "Business Logic", "Action"] },
  { id: "agent", label: "AI Agent", x: 14, y: 52, path: ["AI Agent", "Business Data", "Business Logic", "Action"] },
  { id: "human", label: "Human", x: 86, y: 52, path: ["Human", "Business Data", "Approval", "Action"] },
  { id: "crm", label: "CRM", x: 24, y: 80, path: ["CRM", "Business Data", "Automation", "Action"] },
  { id: "automation", label: "Automation", x: 76, y: 80, path: ["Automation", "Business Data", "Action"] },
  { id: "api", label: "API", x: 50, y: 88, path: ["API", "Business Data", "Automation", "Action"] },
] as const;

export function ConnectedSystems() {
  const [active, setActive] = useState<(typeof nodes)[number]["id"]>("whatsapp");
  const current = nodes.find((node) => node.id === active) ?? nodes[2];

  return (
    <section className="section bg-canvas" aria-labelledby="connected-heading">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">Connected systems</p>
        <div className="mt-4 grid items-end gap-8 lg:grid-cols-12">
          <h2 id="connected-heading" className="text-h2 max-w-[14ch] uppercase text-ink lg:col-span-7">
            One business system. Every channel connected.
          </h2>
          <p className="text-body text-muted lg:col-span-5">
            Your website, WhatsApp, mobile apps, AI agents and internal software should work from the same business records.
          </p>
        </div>

        <div className="relative mt-14 hidden h-[34rem] lg:block">
          <svg className="absolute inset-0 h-full w-full text-slate-500" viewBox="0 0 100 100" aria-hidden="true">
            {nodes.map((node) => (
              <line
                key={node.id}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="currentColor"
                strokeWidth={active === node.id ? 0.55 : 0.2}
                className={active === node.id ? "flow-pulse text-accent" : undefined}
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 bg-surface px-5 py-4 text-center shadow-[0_0_40px_-12px_rgba(56,189,248,0.7)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-ink">Center</p>
            <p className="text-sm font-semibold text-ink">Business Data</p>
          </div>
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={cn(
                "absolute z-[1] min-h-11 -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 text-sm font-medium",
                active === node.id ? "border-accent bg-surface text-ink" : "border-line bg-canvas/80 text-muted",
              )}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-pressed={active === node.id}
              onMouseEnter={() => setActive(node.id)}
              onFocus={() => setActive(node.id)}
              onClick={() => setActive(node.id)}
            >
              {node.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
          {nodes.map((node) => (
            <li key={node.id}>
              <button
                type="button"
                className={cn(
                  "min-h-11 w-full rounded-full border px-3 text-sm font-medium",
                  active === node.id ? "border-accent text-ink" : "border-line text-muted",
                )}
                aria-pressed={active === node.id}
                onClick={() => setActive(node.id)}
              >
                {node.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-ink" aria-live="polite">
          {current.path.join("  →  ")}
        </p>
      </Container>
    </section>
  );
}
