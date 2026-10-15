"use client";

import Image from "next/image";
import Link from "next/link";
import { IndustryArt } from "@/components/art/industry-art";
import { useState } from "react";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { homeIndustries } from "@/content/home-page";
import { cn } from "@/lib/cn";

export function HomeIndustries() {
  const [active, setActive] = useState(homeIndustries[0].slug);
  const current = homeIndustries.find((item) => item.slug === active) ?? homeIndustries[0];

  return (
    <section className="section h-section" aria-labelledby="industries-heading">
      <Container>
        <div className="home-head">
          <div>
            <p className="eyebrow">Who we work with</p>
            <h2 id="industries-heading" className="text-h2 mt-3 text-ink">
              Built for the way your kind of business runs.
            </h2>
          </div>
          <p className="text-body text-muted">Pick your field to see the jobs we usually take off your team&apos;s hands.</p>
        </div>

        <div className="stack grid gap-4 lg:grid-cols-12">
          <div className="h-ind-tabs lg:col-span-4" role="tablist" aria-label="Industries" aria-orientation="vertical">
            {homeIndustries.map((item) => {
              const selected = item.slug === active;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  id={`ind-tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls="ind-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(item.slug)}
                  onKeyDown={(event) => {
                    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
                    event.preventDefault();
                    const i = homeIndustries.findIndex((x) => x.slug === active);
                    const d = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
                    const next = homeIndustries[(i + d + homeIndustries.length) % homeIndustries.length];
                    setActive(next.slug);
                    document.getElementById(`ind-tab-${next.slug}`)?.focus();
                  }}
                  className={cn("h-ind-tab", selected && "is-active")}
                >
                  <span className="icon-chip icon-chip-sm">
                    <UiIcon name={item.icon} />
                  </span>
                  <span className="text-sm font-semibold">{item.label}</span>
                  <UiIcon name="arrow" className="ml-auto size-4 opacity-60" />
                </button>
              );
            })}
          </div>

          <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${current.slug}`} className="h-ind-panel lg:col-span-8">
            <div key={current.slug} className="h-ind-swap grid h-full gap-0 sm:grid-cols-2">
                <figure className="relative min-h-56 overflow-hidden">
                  <Image src={current.photo.src} alt={current.photo.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  <span className="ia-badge ia-badge-sm"><IndustryArt slug={current.slug} /></span>
                </figure>
                <div className="flex flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{current.heading}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {current.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2.5 text-sm text-ink">
                        <UiIcon name="check" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/industries/${current.slug}`} className="text-link mt-auto pt-6">
                    See more for {current.label.toLowerCase()}
                    <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
