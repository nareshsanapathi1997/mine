"use client";

import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import { useRef, useState } from "react";
import { IndustryArt } from "@/components/art/industry-art";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { homeIndustries } from "@/content/home-page";
import { cn } from "@/lib/cn";

const KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"];

export function HomeIndustries() {
  const [active, setActive] = useState(0);
  // Only mount images the visitor has actually opened, so the section costs one image up front.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = homeIndustries[active];

  function select(index: number, focus = false) {
    setActive(index);
    setSeen((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
    if (focus) {
      const tab = tabs.current[index];
      tab?.focus();
      tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

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

        <div className="iw stack">
          <div className="iw-tabs" role="tablist" aria-label="Industries">
            {homeIndustries.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.slug}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`iw-tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls="iw-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => {
                    if (!KEYS.includes(event.key)) return;
                    event.preventDefault();
                    const n = homeIndustries.length;
                    const next =
                      event.key === "Home" ? 0
                      : event.key === "End" ? n - 1
                      : event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % n
                      : (index - 1 + n) % n;
                    select(next, true);
                  }}
                  className={cn("iw-tab", selected && "is-active")}
                >
                  <span className="iw-tab-art" aria-hidden="true">
                    <IndustryArt slug={item.slug} className="size-8" />
                  </span>
                  <span className="iw-tab-label">{item.label}</span>
                  <UiIcon name="arrow" className="iw-tab-arrow size-4" />
                </button>
              );
            })}
          </div>

          <div id="iw-panel" role="tabpanel" aria-labelledby={`iw-tab-${current.slug}`} className="iw-panel" tabIndex={0}>
            <figure className="iw-media">
              {homeIndustries.map((item, index) =>
                seen.has(index) ? (
                  <Photo
                    key={item.slug}
                    src={item.photo.src}
                    alt={index === active ? item.photo.alt : ""}
                    aria-hidden={index === active ? undefined : true}
                    fill
                   
                    sizes="(max-width: 1024px) 100vw, 820px"
                    className={cn("iw-img object-cover", index === active && "is-active")}
                  />
                ) : null,
              )}
              <figcaption className="iw-caption">
                <span className="iw-caption-art" aria-hidden="true">
                  <IndustryArt slug={current.slug} className="size-7" />
                </span>
                {current.label}
              </figcaption>
            </figure>

            <div key={current.slug} className="iw-body">
              <h3 className="text-h3 text-ink">{current.heading}</h3>
              <p className="mt-2 text-body text-muted">{current.summary}</p>
              <ul className="iw-jobs">
                {current.examples.map((example) => (
                  <li key={example}>
                    <span className="iw-check" aria-hidden="true">
                      <UiIcon name="check" className="size-3.5" />
                    </span>
                    {example}
                  </li>
                ))}
              </ul>
              <Link href={`/industries/${current.slug}`} className="text-link mt-6">
                See {current.label.toLowerCase()}
                <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
