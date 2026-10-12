"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon, UiIcon } from "@/components/icons";
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
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !backward && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? industries.length - 1
          : forward
            ? (index + 1) % industries.length
            : (index - 1 + industries.length) % industries.length;
    const slug = industries[next]?.slug;
    if (!slug) return;
    setActive(slug);
    document.getElementById(`${baseId}-${slug}`)?.focus();
  }

  if (!story) return null;

  return (
    <section className="section" aria-labelledby="industries-heading">
      <Container>
        <div className="home-head">
          <h2 id="industries-heading" className="text-h2 text-ink">
            The same technology, shaped around the work.
          </h2>
          <p className="text-body text-muted">
            Select an industry to see the problem, the system, and a workflow we would actually build.
          </p>
        </div>
        <div className="mt-8">
          <div
            role="tablist"
            aria-label="Industries"
            className="grid grid-cols-2 items-stretch gap-3 lg:grid-cols-3"
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
                  className={cn("industry-card", selected ? "is-selected text-ink" : "text-muted")}
                  onClick={() => setActive(item.slug)}
                >
                  <span className="icon-chip icon-chip-sm">
                    <Icon name={item.icon} />
                  </span>
                  <span className="block text-sm font-semibold text-ink">{item.title}</span>
                  <span className="line-clamp-2 text-xs leading-snug text-muted">{item.audience}</span>
                </button>
              );
            })}
          </div>
          <div
            key={industry.slug}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${industry.slug}`}
            className="industry-panel system-board mt-4"
          >
            <div className="px-1 py-1 sm:px-2 sm:py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{industry.audience}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{story.hero}</h3>
            <div className="mt-5 grid gap-6 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-ink">Problems</h4>
                <ul className="mt-2 space-y-2">
                  {story.problems.map((item) => (
                    <li key={item.title} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <UiIcon name="minus" className="mt-1 size-3.5 text-accent-ink" />
                      <span>
                        <span className="font-semibold text-ink">{item.title}. </span>
                        {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Solutions</h4>
                <ul className="mt-2 space-y-2">
                  {story.solutions.map((item) => (
                    <li key={item.title} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <UiIcon name="check" className="mt-1 size-3.5 text-accent-ink" />
                      <span>
                        <span className="font-semibold text-ink">{item.title}. </span>
                        {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h4 className="mt-5 text-sm font-semibold text-ink">AI and automation</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{story.ai}</p>
            <h4 className="mt-5 text-sm font-semibold text-ink">Example workflow</h4>
            <div className="mt-3">
              <WorkflowDiagram steps={story.workflow} />
            </div>
            <Link href={`/industries/${industry.slug}`} className="text-link mt-5">
              Explore {industry.title} <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
            </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
