"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { systemNodes } from "@/content/stories";
import { cn } from "@/lib/cn";

const positions: Record<string, string> = {
  website: "left-[6%] top-[8%]",
  mobile: "left-1/2 top-[6%] -translate-x-1/2",
  whatsapp: "right-[6%] top-[8%]",
  agent: "left-[18%] top-[34%]",
  data: "right-[6%] top-[34%]",
  crm: "left-1/2 top-[54%] -translate-x-1/2",
  automation: "left-1/2 top-[72%] -translate-x-1/2",
  action: "left-1/2 bottom-[4%] -translate-x-1/2",
};

export function ConnectedSystems() {
  const [active, setActive] = useState<(typeof systemNodes)[number]["id"]>("agent");
  const current = systemNodes.find((node) => node.id === active) ?? systemNodes[2];

  return (
    <section className="section bg-surface" aria-labelledby="connected-heading">
      <Container className="grid-12 items-center">
        <div className="col-span-12 lg:col-span-5">
          <SectionHeading
            id="connected-heading"
            eyebrow="Connected systems"
            title="One connected system. Not a collection of tools."
            description="Website, mobile, WhatsApp, AI and automation should read and write the same business records. We connect the tools you already use. We do not replace them by default."
          />
          <p className="mt-6 min-h-16 text-body text-ink" aria-live="polite">
            <span className="font-semibold">{current.label}. </span>
            <span className="text-muted">{current.detail}</span>
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="relative hidden h-[34rem] rounded-xl border border-line bg-canvas lg:block">
            <svg className="absolute inset-0 h-full w-full text-slate-300" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <Connections />
            </svg>
            {systemNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={cn(
                  "absolute z-[1] min-h-11 rounded-lg border bg-surface px-3 py-2 text-sm font-semibold text-ink shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
                  positions[node.id],
                  active === node.id ? "border-navy" : "border-line",
                )}
                aria-pressed={active === node.id}
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onClick={() => setActive(node.id)}
              >
                {node.label}
              </button>
            ))}
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
            {systemNodes.map((node) => (
              <li key={node.id}>
                <button
                  type="button"
                  className={cn(
                    "min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm font-semibold",
                    active === node.id ? "border-navy bg-surface text-ink" : "border-line bg-canvas text-ink",
                  )}
                  aria-pressed={active === node.id}
                  onClick={() => setActive(node.id)}
                >
                  {node.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Connections() {
  const lines = [
    [18, 14, 28, 38],
    [50, 12, 32, 38],
    [82, 14, 36, 40],
    [40, 40, 78, 40],
    [32, 46, 50, 58],
    [50, 64, 50, 76],
    [50, 80, 50, 90],
  ];
  return (
    <>
      {lines.map((line) => (
        <line
          key={line.join("-")}
          x1={line[0]}
          y1={line[1]}
          x2={line[2]}
          y2={line[3]}
          className="flow-line"
          stroke="currentColor"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}
