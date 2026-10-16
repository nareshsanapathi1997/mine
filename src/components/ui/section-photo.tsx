import { Photo } from "@/components/ui/photo";
import type { SectionPhoto } from "@/content/section-photos";
import { cn } from "@/lib/cn";

export function SectionPhotoFrame({
  photo,
  className,
  sizes = "(max-width: 1024px) 100vw, 42vw",
}: {
  photo: SectionPhoto;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={cn("photo-frame photo-hero min-w-0", className)}>
      <Photo src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </figure>
  );
}
