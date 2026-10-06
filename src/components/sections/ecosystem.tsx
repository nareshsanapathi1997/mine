"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ecosystemChannels, ecosystemSystems } from "@/content/home";
import { cn } from "@/lib/cn";

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden>
      <span className="flow-rail" />
    </div>
  );
}

function Band({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "ai" }) {
  return (
    <div
      className={cn(
        "rounded-md border px-4 py-3 text-center text-sm font-medium",
        tone === "ai" ? "border-line border-l-2 border-l-ai bg-surface text-ink" : "border-line bg-canvas text-ink",
      )}
    >
      {children}
    </div>
  );
}

export function Ecosystem() {
  const [channelId, setChannelId] = useState<(typeof ecosystemChannels)[number]["id"]>(
    ecosystemChannels[0].id,
  );
  const channel = ecosystemChannels.find((item) => item.id === channelId) ?? ecosystemChannels[0];

  return (
    <section id="platform" className="section scroll-mt-28 bg-canvas" aria-labelledby="platform-heading">
      <Container>
        <SectionHeading
          id="platform-heading"
          eyebrow="Connected business"
          title="One intelligent layer across the whole operation."
          description="Customers reach you on the web, a phone, WhatsApp or a call. AI and automation carry that request into the systems your team uses, and back again."
          align="center"
        />

        <div className="card card-accent mx-auto mt-[clamp(2.25rem,1.5rem+1.8vw,3.5rem)] max-w-3xl p-5 sm:p-8" data-reveal>
          <Band>Business</Band>
          <Connector />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Customer channels">
            {ecosystemChannels.map((item) => {
              const selected = item.id === channel.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setChannelId(item.id)}
                  className={cn(
                    "min-h-11 rounded-md border px-3 py-3 text-sm font-medium transition-colors",
                    selected ? "border-accent bg-accent text-white" : "border-line bg-surface text-ink hover:border-line-strong",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <Connector />
          <Band tone="ai">AI Layer</Band>
          <Connector />
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {ecosystemSystems.map((system) => (
              <li
                key={system}
                className="rounded-md border border-line bg-canvas px-3 py-3 text-center text-sm font-medium text-ink"
              >
                {system}
              </li>
            ))}
          </ul>
          <Connector />
          <Band>Automation</Band>
          <Connector />
          <Band>Business Team</Band>
          <p className="mt-6 text-center text-sm leading-relaxed text-muted sm:text-base" aria-live="polite">
            {channel.detail}
          </p>
        </div>
      </Container>
    </section>
  );
}
