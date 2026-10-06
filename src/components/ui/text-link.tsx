import Link from "next/link";
import { cn } from "@/lib/cn";

export function TextLink({
  className,
  children,
  arrow = true,
  ...props
}: React.ComponentProps<typeof Link> & { arrow?: boolean }) {
  return (
    <Link className={cn("text-link", className)} {...props}>
      <span>{children}</span>
      {arrow ? (
        <span className="text-link-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </Link>
  );
}
