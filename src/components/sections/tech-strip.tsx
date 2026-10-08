import { Atom, Box, Cloud, Code, Database, Hexagon, Layers, MessageCircle, Server, Sparkles, Workflow } from "lucide-react";

const technologies = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Hexagon },
  { name: "Python", icon: Code },
  { name: "Laravel", icon: Layers },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "OpenAI", icon: Sparkles },
  { name: "WhatsApp", icon: MessageCircle },
  { name: "REST APIs", icon: Workflow },
  { name: "AWS", icon: Cloud },
  { name: "Docker", icon: Box },
];

export function TechStrip() {
  return (
    <section className="border-b border-line bg-canvas" aria-labelledby="stack-heading">
      <div className="section-tight mx-auto w-full max-w-[80rem] px-5">
        <p id="stack-heading" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Built to connect with your stack
        </p>
        <p className="mt-3 max-w-[46ch] text-base text-ink">
          We work with the technologies, APIs and platforms your business already uses.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          {technologies.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="inline-flex items-center gap-2 text-sm text-muted">
                <Icon className="size-4 text-accent-ink" strokeWidth={1.5} aria-hidden="true" />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
