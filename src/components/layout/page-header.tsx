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
    <header className="border-b border-line bg-canvas">
      <Container className="section-tight lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10">
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
