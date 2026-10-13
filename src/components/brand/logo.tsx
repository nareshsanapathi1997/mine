import Image from "next/image";

const frame = "h-10 w-auto sm:h-12";

export function Logo({
  variant = "default",
  priority = false,
  compact = false,
}: {
  variant?: "default" | "inverse" | "ink";
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

  if (variant === "ink") {
    return (
      <Image
        src="/kyntriq-solutions-logo.png"
        alt="Kyntriq Solutions"
        width={877}
        height={289}
        priority={priority}
        className={frame}
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
    // Both themes use a navy header, so the light-text lockup is used in each.
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
