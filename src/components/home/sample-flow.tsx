"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { sampleFlows as homeFlows, type SampleFlow } from "@/content/home-page";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const STEP_MS = 2600;

export function HomeSampleFlow({
  flows = homeFlows,
  eyebrow = "How it works",
  title = "See one job, step by step.",
  intro = "A sample of what happens after a message arrives. Pick an example. These are illustrations, not client results.",
  moreHref = "/case-studies",
}: {
  flows?: SampleFlow[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  moreHref?: string | null;
} = {}) {
  const sampleFlows = flows;
  const [flowId, setFlowId] = useState(sampleFlows[0].id);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();
  const flow = sampleFlows.find((item) => item.id === flowId) ?? sampleFlows[0];
  const autoplay = !reduce && !paused;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % flow.steps.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, step, flow.steps.length]);

  return (
    <section className="section band-dark h-section h-flow" aria-labelledby="flow-heading">
      <Container className="relative z-[1]">
        <div className="home-head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="flow-heading" className="text-h2 mt-3 text-ink">
              {title}
            </h2>
          </div>
          <p className="text-body text-muted">
            {intro}
          </p>
        </div>

        {sampleFlows.length > 1 ? (
        <div className="stack flex flex-wrap gap-2" role="group" aria-label="Choose an example">
          {sampleFlows.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === flowId}
              onClick={() => {
                setFlowId(item.id);
                setStep(0);
              }}
              className={cn("chip chip-link", item.id === flowId && "chip-selected")}
            >
              {item.label}
            </button>
          ))}
        </div>
        ) : null}

        <div
          className="mt-5 grid gap-4 lg:grid-cols-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ol className="h-flow-steps lg:col-span-7" aria-label={flow.title}>
            {flow.steps.map((item, index) => {
              const state = index < step ? "done" : index === step ? "active" : "next";
              return (
                <li key={item.title} className={cn("h-flow-step", `is-${state}`)}>
                  <button type="button" className="h-flow-step-btn" onClick={() => setStep(index)} aria-current={state === "active" ? "step" : undefined}>
                    <span className="h-flow-dot" aria-hidden="true">
                      {state === "done" ? <UiIcon name="check" className="size-3.5" /> : index + 1}
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-sm font-semibold text-ink">{item.title}</span>
                      <span className="h-flow-body block text-sm leading-relaxed text-muted">{item.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="product-window h-flow-card lg:col-span-5" aria-live="polite">
            <div className="product-window-bar">
              <span className="live-pip" aria-hidden="true" />
              {flow.label}
              <span className="sample-tag ml-auto">Sample</span>
            </div>
            <div className="product-window-body">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Step {step + 1} of {flow.steps.length}
              </p>
              <p key={`${flow.id}-${step}`} className="h-flow-now mt-2 text-lg font-semibold text-ink">
                {flow.steps[step].title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{flow.steps[step].body}</p>
              <div className="h-flow-bar mt-5" aria-hidden="true">
                <span style={{ width: `${((step + 1) / flow.steps.length) * 100}%` }} />
              </div>
              {moreHref ? (
                <Link href={moreHref as "/case-studies"} className="text-link mt-5">
                  More sample scenarios <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
