import { Container } from "@/components/layout/container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="hero-stage relative overflow-hidden border-b border-line">
      <div className="hero-grid" aria-hidden="true" />
      <Container className="relative py-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10 lg:py-24">
        <div className="lg:col-span-7">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="text-h1 cluster text-balance text-ink">{title}</h1>
        </div>
        <p className="text-body cluster text-muted lg:col-span-5 lg:mt-0 lg:pb-1">{description}</p>
      </Container>
    </header>
  );
}
