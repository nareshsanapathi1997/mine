import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Icon } from "@/components/icons";
import { trustItems } from "@/content/home";

export function TrustStrip() {
  return (
    <section className="bg-surface" aria-labelledby="trust-heading">
      <Container className="section-tight">
        <SectionHeading
          id="trust-heading"
          eyebrow="Capabilities"
          title="Technology that works around your business."
          description="Web, mobile, AI, automation, cloud, and the integrations that connect them."
        />
        <ul className="grid-12 stack">
          {trustItems.map((item) => (
            <li key={item.label} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="flex h-full items-center gap-3 rounded-[0.5rem] border border-line bg-canvas px-3 py-3">
                <Icon name={item.icon} className="size-4 shrink-0 text-accent-ink" />
                <span className="text-sm font-semibold tracking-[-0.01em] text-ink">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}