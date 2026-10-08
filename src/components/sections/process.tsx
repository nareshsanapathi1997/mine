"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/container";
import { processSteps } from "@/content/home";
import { cn } from "@/lib/cn";

export function Process() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const step = processSteps[active] ?? processSteps[0];

  return (
    <section className="section bg-surface" aria-labelledby="process-heading">
      <Container>
        <h2 id="process-heading" className="text-h2 max-w-[14ch] uppercase text-ink">
          Discover. Specify. Build. Connect. Stay.
        </h2>
        <ol className="mt-14 grid gap-6 md:grid-cols-5" role="tablist" aria-label="Process">
          {processSteps.map((item, index) => {
            const selected = index === active;
            return (
              <li key={item.number} role="presentation" className="relative">
                {index < processSteps.length - 1 ? (
                  <span className="absolute top-3 left-8 hidden h-px w-[calc(100%-1rem)] bg-line md:block" aria-hidden="true" />
                ) : null}
                <button
                  id={`${baseId}-${item.number}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  className="relative min-h-11 text-left"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className={cn("mb-3 block size-2.5 rounded-full", selected ? "bg-accent" : "bg-line-strong")} aria-hidden="true" />
                  <span className="block text-sm font-medium uppercase tracking-[0.12em] text-ink">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <p id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-${step.number}`} className="mt-10 max-w-[36ch] text-2xl leading-snug text-ink">
          {step.description}
        </p>
      </Container>
    </section>
  );
}
