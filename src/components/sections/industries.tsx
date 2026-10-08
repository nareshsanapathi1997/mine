"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { WorkflowDiagram } from "@/components/ui/workflow";
import { industries } from "@/content/industries";
import { industryStories } from "@/content/stories";
import { cn } from "@/lib/cn";

export function Industries() {
  const [active, setActive] = useState(industries[0]?.slug ?? "education");
  const baseId = useId();
  const industry = industries.find((item) => item.slug === active) ?? industries[0];
  const story = industryStories[industry.slug];

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = industries.findIndex((item) => item.slug === active);
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? industries.length - 1
          : event.key === "ArrowDown"
            ? (index + 1) % industries.length
            : (index - 1 + industries.length) % industries.length;
    const slug = industries[next]?.slug;
    if (!slug) return;
    setActive(slug);
    document.getElementById(`${baseId}-${slug}`)?.focus();
  }

  if (!story) return null;

  return (
    <section className="section bg-surface" aria-labelledby="industries-heading">
      <Container>
        <h2 id="industries-heading" className="text-h2 max-w-[16ch] uppercase text-ink">
          The same technology, shaped around the work.
        </h2>
        <p className="text-body mt-5 max-w-[48ch] text-muted">
          Select an industry to see the problem, the system, and a workflow we would actually build.
        </p>
        <div className="stack">
          <div className="border-t border-line lg:hidden">
            {industries.map((item) => {
              const selected = item.slug === industry.slug;
              const itemStory = industryStories[item.slug];
              return (
                <div key={item.slug} className="border-b border-line">
                  <button
                    type="button"
                    className="flex min-h-14 w-full items-center justify-between text-left text-lg text-ink"
                    aria-expanded={selected}
                    onClick={() => setActive(item.slug)}
                  >
                    {item.title}
                    <span className={`font-mono text-accent-ink ${selected ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      {selected && itemStory ? (
                        <div className="pb-6">
                          <p className="text-sm text-muted">{itemStory.problems[0]?.body}</p>
                          <p className="mt-3 text-sm font-medium text-ink">{itemStory.solutions[0]?.title}</p>
                          <div className="mt-4">
                            <WorkflowDiagram steps={itemStory.workflow} />
                          </div>
                          <Link href={`/industries/${item.slug}`} className="text-link mt-4">
                            Explore {item.title} <span className="text-link-arrow" aria-hidden="true">→</span>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="hidden lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
          <div
            role="tablist"
            aria-label="Industries"
            aria-orientation="vertical"
            className="col-span-12 hidden gap-2 lg:col-span-4 lg:flex lg:flex-col"
            onKeyDown={onKeyDown}
          >
            {industries.map((item) => {
              const selected = item.slug === industry.slug;
              return (
                <button
                  key={item.slug}
                  id={`${baseId}-${item.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 border-b border-line px-1 py-3 text-left",
                    selected ? "text-ink" : "text-muted",
                  )}
                  onClick={() => setActive(item.slug)}
                >
                  <Icon name={item.icon} className="size-4 shrink-0 text-accent" />
                  <span>
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className="hidden text-xs text-muted lg:block">{item.audience}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div
            key={industry.slug}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${industry.slug}`}
            className="industry-panel col-span-12 border-t border-line pt-8 lg:col-span-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{industry.audience}</p>
            <h3 className="text-h3 mt-2 text-ink">{story.hero}</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-ink">Problems</h4>
                <ul className="mt-2 space-y-2">
                  {story.problems.map((item) => (
                    <li key={item.title} className="text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-ink">{item.title}. </span>
                      {item.body}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Solutions</h4>
                <ul className="mt-2 space-y-2">
                  {story.solutions.map((item) => (
                    <li key={item.title} className="text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-ink">{item.title}. </span>
                      {item.body}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h4 className="mt-6 text-sm font-semibold text-ink">AI and automation</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{story.ai}</p>
            <h4 className="mt-6 text-sm font-semibold text-ink">Example workflow</h4>
            <div className="mt-3">
              <WorkflowDiagram steps={story.workflow} />
            </div>
            <Link href={`/industries/${industry.slug}`} className="text-link mt-4">
              Explore {industry.title} <span className="text-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
