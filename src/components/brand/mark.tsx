import { cn } from "@/lib/cn";

type MarkProps = {
  className?: string;
  title?: string;
};

export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" rx="8" fill="#0B1220" />
      <path
        d="M10 7.5v17"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M10 16.2 L22.5 8.2"
        stroke="#2563EB"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M10 16.2 L22.5 24.2"
        stroke="#7C3AED"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="16.2" r="2.15" fill="#FFFFFF" />
      <circle cx="22.5" cy="8.2" r="2" fill="#2563EB" />
      <circle cx="22.5" cy="24.2" r="2" fill="#7C3AED" />
    </svg>
  );
}
