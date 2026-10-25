import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

export function ReelSection({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="section h-section reel-sec" aria-labelledby={id}>
      <Container>
        <div className="reel-sec-grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={id} className="text-h2 mt-3 text-ink">
              {title}
            </h2>
            <p className="text-body mt-4 text-muted">{intro}</p>
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
