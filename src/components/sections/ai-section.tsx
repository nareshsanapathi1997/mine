"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { aiExamples, aiSteps } from "@/content/home";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function AISection() {
  const [exampleId, setExampleId] = useState(aiExamples[0].id);
  const reduced = usePrefersReducedMotion();
  const example = aiExamples.find((item) => item.id === exampleId) ?? aiExamples[0];

  function onExampleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const index = aiExamples.findIndex((item) => item.id === exampleId);
    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = aiExamples[(index + delta + aiExamples.length) % aiExamples.length];
    setExampleId(next.id);
    document.getElementById(`ai-example-${next.id}`)?.focus();
  }

  return (
    <section id="ai" className="band-ai section scroll-mt-28 text-white" aria-labelledby="ai-heading">
      <Container className="relative z-[1] grid-12 items-start">
        <div className="col-span-12 lg:col-span-5" data-reveal>
          <SectionHeading
            id="ai-heading"
            eyebrow="AI & Automation"
            tone="dark"
            title="Turn your business into an AI-powered business."
            description="AI should do more than answer questions. It should take action."
          />
          <div
            className="cluster-lg overflow-hidden rounded-lg border border-white/15"
            role="radiogroup"
            aria-label="Example requests"
            onKeyDown={onExampleKeyDown}
          >
            {aiExamples.map((item) => {
              const selected = item.id === example.id;
              return (
                <button
                  key={item.id}
                  id={`ai-example-${item.id}`}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setExampleId(item.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center border-b border-white/10 px-4 text-left text-sm last:border-b-0",
                    selected ? "bg-white font-medium text-navy" : "text-mist hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.prompt}
                </button>
              );
            })}
          </div>
          <Button asChild size="lg" variant="ai" arrow className="cluster-lg">
            <Link href="/contact?need=AI+agent">Build an AI Agent</Link>
          </Button>
        </div>

        <div className="col-span-12 lg:col-span-7" data-reveal>
          <Workflow key={example.id} prompt={example.prompt} result={example.result} reduced={reduced} />
        </div>
      </Container>
    </section>
  );
}

function Workflow({
  prompt,
  result,
  reduced,
}: {
  prompt: string;
  result: string;
  reduced: boolean;
}) {
  const lastStep = aiSteps.length - 1;
  const [visibleStep, setVisibleStep] = useState(0);
  const shown = reduced ? lastStep : visibleStep;

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setVisibleStep((current) => (current >= lastStep ? current : current + 1));
    }, 650);
    return () => window.clearInterval(timer);
  }, [reduced, lastStep]);

  return (
    <div className="panel relative p-5 sm:p-7 lg:sticky lg:top-28" aria-live="polite">
      <p className="eyebrow text-mist">
        <span className="eyebrow-mark" aria-hidden="true" />
        What happens next
      </p>
      <ol className="relative mt-5 space-y-3">
        <span
          className="absolute top-1 bottom-1 left-[13px] w-px origin-top bg-white/15"
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 origin-top bg-gradient-to-b from-white to-ai"
            style={{ transform: `scaleY(${lastStep === 0 ? 1 : shown / lastStep})` }}
          />
        </span>
        {aiSteps.map((step, index) => {
          const reached = index <= shown;
          return (
            <li key={step} className="relative flex gap-3">
              <span
                className={cn(
                  "relative z-10 mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  reached ? "bg-white text-navy" : "border border-white/15 bg-[#121a2b] text-mist",
                  index === lastStep && reached && "bg-ai text-white",
                )}
              >
                {index + 1}
              </span>
              <div>
                <p className={cn("text-sm font-semibold sm:text-base", reached ? "text-white" : "text-mist")}>
                  {step}
                </p>
                {index === 0 && reached ? <p className="mt-1 text-sm text-mist">“{prompt}”</p> : null}
                {index === lastStep && reached ? (
                  <p className="mt-2 border-l-2 border-l-ai px-3 py-1 text-sm leading-relaxed text-white">
                    {result}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
