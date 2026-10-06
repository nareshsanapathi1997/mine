import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  as = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Title = as;
  const split = align !== "center";

  return (
    <div
      className={cn(
        split ? "lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10" : "mx-auto max-w-[68ch] text-center",
      )}
    >
      <div className={split ? "lg:col-span-6" : undefined}>
        {eyebrow ? (
          <p className={cn("eyebrow", tone === "dark" ? "text-accent-glow" : "text-accent-ink")}>
            <span className="eyebrow-mark" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <Title
          id={id}
          className={cn("text-h2 text-balance", eyebrow && "cluster", tone === "dark" ? "text-white" : "text-ink")}
        >
          {title}
        </Title>
      </div>
      {description ? (
        <p
          className={cn(
            "text-body cluster",
            split && "lg:col-span-6 lg:mt-0 lg:max-w-none lg:pb-1",
            tone === "dark" ? "text-mist" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
