"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
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
        <SectionHeading
          id="industries-heading"
          eyebrow="Industries"
          title="The same idea, shaped around the work."
          description="Select an industry to see the problems, the systems, and a workflow we would actually build."
        />
        <div className="stack grid-12 items-start">
          <div
            role="tablist"
            aria-label="Industries"
            aria-orientation="vertical"
            className="col-span-12 flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible"
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
                    "flex min-h-11 shrink-0 items-center gap-3 rounded-lg border px-3 py-2 text-left lg:w-full",
                    selected ? "border-navy bg-canvas text-ink" : "border-line bg-surface text-ink",
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
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${industry.slug}`}
            className="card col-span-12 lg:col-span-8"
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
      </Container>
    </section>
  );
}
