import { Container } from "@/components/layout/container";

const technologies = [
  "React",
  "Next.js",
  "Python",
  "Laravel",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "OpenAI",
  "WhatsApp",
  "REST APIs",
  "AWS",
  "Docker",
];

export function TechStrip() {
  return (
    <section className="border-b border-line bg-surface" aria-labelledby="tech-strip-heading">
      <Container className="section-tight">
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          Technology & integrations
        </p>
        <h2 id="tech-strip-heading" className="text-h3 mt-3 text-ink">
          Connect the tools your business already uses.
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies we work with">
          {technologies.map((item) => (
            <li key={item} className="chip inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded border border-line text-[10px] font-semibold text-accent-ink"
              >
                {item.slice(0, 1)}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
