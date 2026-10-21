import Image from "next/image";
import { cn } from "@/lib/cn";

type MarkProps = {
  className?: string;
  title?: string;
};

/** Premium ribbon V cropped from the official logo lockup. */
export function Mark({ className, title }: MarkProps) {
  return (
    <Image
      src="/varasena-brand-pack/varasena-v-mark.png"
      alt={title ?? ""}
      width={512}
      height={512}
      className={cn("size-8 shrink-0 object-contain", className)}
      aria-hidden={title ? undefined : true}
    />
  );
}
