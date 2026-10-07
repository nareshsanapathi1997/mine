"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { processSteps } from "@/content/home";
import { cn } from "@/lib/cn";

export function Process() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const step = processSteps[active] ?? processSteps[0];

  return (
    <section className="section bg-canvas" aria-labelledby="process-heading">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How we work"
          title="Discover, specify, build, connect, stay."
          description="One workflow first. The next channel or product sits on the same foundation."
        />
        <div className="stack" role="tablist" aria-label="Process" data-reveal>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((item, index) => {
              const selected = index === active;
              return (
                <li key={item.number}>
                  <button
                    id={`${baseId}-${item.number}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    className={cn(
                      "min-h-20 w-full rounded-lg border px-4 py-3 text-left",
                      selected ? "border-navy bg-surface" : "border-line bg-surface/60",
                    )}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <span className="font-mono text-xs font-semibold text-accent">{item.number}</span>
                    <span className="mt-1 block text-base font-semibold text-ink">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <p id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-${step.number}`} className="text-body mt-6 max-w-[68ch] text-ink">
          {step.description}
        </p>
      </Container>
    </section>
  );
}
