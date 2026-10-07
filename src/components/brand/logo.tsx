import Image from "next/image";
import { cn } from "@/lib/cn";

const frame = "h-12 w-auto sm:h-16";

export function Logo({
  variant = "default",
  priority = false,
}: {
  variant?: "default" | "inverse";
  priority?: boolean;
}) {
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
