import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      inverse: "btn-dark",
      dark: "btn-dark",
      ai: "btn-ai",
      quiet: "btn-quiet",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

function Arrow() {
  return <ArrowRight className="btn-arrow" strokeWidth={1.5} aria-hidden="true" />;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  arrow = false,
  loading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    arrow?: boolean;
    loading?: boolean;
  }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const isDisabled = Boolean(disabled || loading);

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<{ children?: React.ReactNode }>;
    return (
      <Slot className={classes} aria-disabled={isDisabled || undefined} {...props}>
        {cloneElement(child, undefined, <>
          {child.props.children}
          {arrow ? <Arrow /> : null}
        </>)}
      </Slot>
    );
  }

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
