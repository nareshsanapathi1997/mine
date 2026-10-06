import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
