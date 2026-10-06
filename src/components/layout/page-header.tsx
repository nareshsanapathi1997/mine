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
    <header className="band-dark relative overflow-hidden border-b border-white/10 text-white">
      <div className="band-grid" aria-hidden="true" />
      <Container className="section-tight relative z-[1] lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <div className="lg:col-span-7">
          <p className="eyebrow text-accent-glow">
            <span className="eyebrow-mark" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="text-h1 cluster text-balance text-white">{title}</h1>
        </div>
        <p className="text-body cluster text-mist lg:col-span-5 lg:mt-0 lg:pb-1">{description}</p>
      </Container>
    </header>
  );
}