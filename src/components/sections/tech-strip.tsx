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
        <div className="grid items-end gap-3 lg:grid-cols-12">
          <p id="stack-heading" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:col-span-5">
            Built to connect with your stack
          </p>
          <p className="text-base text-ink lg:col-span-7">
            We work with the technologies, APIs and platforms your business already uses.
          </p>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {technologies.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-ink">
                <Icon className="size-3.5 text-accent-ink" strokeWidth={1.5} aria-hidden="true" />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
