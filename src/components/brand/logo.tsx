import Image from "next/image";
import { cn } from "@/lib/cn";

const frame = "h-12 w-auto sm:h-16 [.is-compact_&]:sm:h-12";

export function Logo({
  variant = "default",
  priority = false,
  compact = false,
}: {
  variant?: "default" | "inverse";
  priority?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Image
        src="/kyntriq-mark.png"
        alt="Kyntriq Solutions"
        width={180}
        height={180}
        priority={priority}
        className="size-10"
      />
    );
  }

  if (variant === "inverse") {
    return (
      <Image
        src="/kyntriq-solutions-logo-dark.png"
        alt="Kyntriq Solutions"
        width={877}
        height={289}
        priority={priority}
        className={frame}
      />
    );
  }

  return (
    <>
      <Image
        src="/kyntriq-solutions-logo.jpg"
        alt="Kyntriq Solutions"
        width={877}
        height={289}
        priority={priority}
        className={cn(frame, "dark:hidden")}
      />
      <Image
        src="/kyntriq-solutions-logo-dark.png"
        alt=""
        width={877}
        height={289}
        aria-hidden
        className={cn(frame, "hidden dark:block")}
      />
    </>
  );
}
