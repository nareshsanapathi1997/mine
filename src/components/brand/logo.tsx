import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteBrand } from "@/content/site";

/** Light lockup reads larger at the same height, so it stays smaller than dark. */
const frameLight = "h-9 w-auto max-h-full object-contain sm:h-10";
const frameDark = "h-12 w-auto max-h-full object-contain sm:h-14";

const fallbackBrand: SiteBrand = {
  logoLight: "/varasena-brand-pack/varasena-logo-light.png",
  logoDark: "/varasena-brand-pack/varasena-logo-dark.png",
  icon: "/varasena-brand-pack/varasena-v-mark.png",
  mark: "/varasena-brand-pack/varasena-v-mark.png",
  favicon: "/icon.png",
};

export function Logo({
  name,
  brand,
  variant = "default",
  preload = false,
  compact = false,
}: {
  name: string;
  brand?: Partial<SiteBrand>;
  variant?: "default" | "inverse" | "ink";
  /** Preload only when this is the one visible logo, e.g. the admin login. Hidden variants stay lazy. */
  preload?: boolean;
  compact?: boolean;
}) {
  const assets = { ...fallbackBrand, ...brand };
  const alt = name;
  if (compact) {
    return (
      <Image
        src={assets.icon}
        alt={alt}
        width={240}
        height={240}
        preload={preload}
        className="size-11"
      />
    );
  }

  if (variant === "ink") {
    return (
      <Image
        src={assets.logoLight}
        alt={alt}
        width={1400}
        height={332}
        sizes="280px"
        preload={preload}
        className={frameLight}
      />
    );
  }

  if (variant === "inverse") {
    return (
      <Image
        src={assets.logoDark}
        alt={alt}
        width={856}
        height={272}
        sizes="280px"
        preload={preload}
        className={frameDark}
      />
    );
  }

  return (
    <>
      <Image
        src={assets.logoLight}
        alt={alt}
        width={1400}
        height={332}
        sizes="220px"
        preload={preload}
        className={cn(frameLight, "dark:hidden")}
      />
      <Image
        src={assets.logoDark}
        alt=""
        width={856}
        height={272}
        sizes="280px"
        aria-hidden
        preload={preload}
        className={cn(frameDark, "hidden dark:block")}
      />
    </>
  );
}
