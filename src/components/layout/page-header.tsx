import { Photo } from "@/components/ui/photo";
import { EyebrowMark } from "@/components/icons";
import { Container } from "@/components/layout/container";
import type { SectionPhoto } from "@/content/section-photos";
import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrow,
  title,
  description,
  photo,
  points,
  children,
  art,
}: {
  /** Optional small illustration shown over the photo corner. */
  art?: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  /** Optional photo shown beside the heading on large screens. */
  photo?: SectionPhoto;
  /** Optional short facts shown as chips under the description. */
  points?: string[];
  /** Optional actions, such as buttons. */
  children?: React.ReactNode;
}) {
  return (
    <header className="hero-stage page-hero relative overflow-hidden border-b border-line">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-glow" aria-hidden="true" />
      <Container
        className={cn(
          "relative grid gap-5 py-7 sm:gap-6 sm:py-9 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:py-11",
        )}
      >
        <div className={cn("page-hero-copy", photo ? "lg:col-span-7" : "lg:col-span-8")}>
          <p className="eyebrow">
            <EyebrowMark />
            {eyebrow}
          </p>
          <h1 className="text-h1 cluster text-balance text-ink">{title}</h1>
          <p className="text-body cluster max-w-[60ch] text-muted">{description}</p>
          {points?.length ? (
            <ul className="cluster-lg flex flex-wrap gap-2" aria-label="Highlights">
              {points.map((point) => (
                <li key={point} className="chip">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {children ? <div className="cluster-lg flex flex-col gap-2.5 sm:flex-row">{children}</div> : null}
        </div>
        {photo ? (
          <div className={cn("page-hero-media relative lg:col-span-5", photo.width && "has-banner")}>
          <figure
            className={cn("photo-frame page-hero-photo relative", !photo.width && "aspect-[16/9] lg:aspect-[4/3]")}
            style={photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
          >
            <Photo src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 100vw, 46vw" priority className="object-cover" />
          </figure>
          {art}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
