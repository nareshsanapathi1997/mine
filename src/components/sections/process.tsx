"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { processSteps } from "@/content/home";

export function Process() {
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.style.setProperty("--progress", "1");
      return;
    }

    const update = () => {
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const distance = start - window.innerHeight * 0.28 + rect.height * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      node.style.setProperty("--progress", progress.toFixed(3));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="process" className="section scroll-mt-28 bg-surface" aria-labelledby="process-heading">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="How an engagement runs"
            title="A fixed sequence, from the operation to the release."
            description="We do not start from a feature list. We start from who receives the request, which record the team trusts, and which step is still done by hand."
          />
        </div>
        <ol
          ref={track}
          className="process-track stack grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-6 lg:[&>li]:col-span-2 lg:[&>li:nth-child(4)]:col-start-2 min-[1600px]:grid-cols-5 min-[1600px]:[&>li]:col-span-1 min-[1600px]:[&>li:nth-child(4)]:col-start-auto"
          data-reveal-stagger
        >
          {processSteps.map((step) => (
            <li key={step.number} data-reveal-child>
              <span className="process-dot" aria-hidden="true" />
              <div className="card card-muted card-accent">
                <p className="font-mono text-sm font-medium text-accent-ink">{step.number}</p>
                <h3 className="text-h3 mt-3 text-ink">{step.title}</h3>
                <p className="text-small mt-2 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
