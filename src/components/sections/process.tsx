import { UiIcon, type UiIconName } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { processSteps } from "@/content/home";

const stepIcons: Record<string, UiIconName> = {
  "01": "search",
  "02": "clipboard",
  "03": "blocks",
  "04": "link",
  "05": "handshake",
};

export function Process() {
  return (
    <section className="section" aria-labelledby="process-heading">
      <Container>
        <h2 id="process-heading" className="text-h2 text-ink">
          Discover. Specify. Build. Connect. Stay.
        </h2>
        <ol className="mt-8 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((item) => (
            <li key={item.number} className="soft-card flex h-full flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="icon-chip">
                  <UiIcon name={stepIcons[item.number] ?? "layers"} />
                </span>
                <span className="step-num">{item.number}</span>
              </div>
              <span className="mt-4 block text-base font-semibold text-ink">{item.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{item.description}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
