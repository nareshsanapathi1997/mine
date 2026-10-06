import { Mark } from "@/components/brand/mark";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

export function Logo({ variant = "default" }: { variant?: "default" | "inverse" }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Mark className="size-9" />
      <span
        className={cn(
          "font-display text-[1.45rem] font-semibold leading-none tracking-[-0.045em] sm:text-[1.6rem]",
          variant === "inverse" ? "text-white" : "text-ink",
        )}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
