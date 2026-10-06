"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/content/navigation";
import { cn } from "@/lib/cn";

function isCurrent(pathname: string, href: string) {
  if (href.startsWith("/#") || href === "/") {
    return href === "/" && pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-md",
        scrolled && "is-compact",
      )}
    >
      <Container className="nav-shell flex items-center justify-between gap-4">
        <Link href="/" aria-label="Home" className="inline-flex min-h-11 items-center rounded-md">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 min-[1440px]:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden min-[1440px]:block">
            <Button asChild arrow>
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink min-[1440px]:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        className={cn(
          "mobile-panel grid border-line bg-surface transition-[grid-template-rows] duration-300 ease-out min-[1440px]:hidden",
          open ? "is-open grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn("overflow-hidden", !open && "pointer-events-none")} {...(open ? {} : { inert: true })}>
          <Container className="flex flex-col gap-1 py-4">
            <nav aria-label="Mobile" aria-hidden={open ? undefined : true} className="flex flex-col">
              {primaryNav.map((item) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "nav-link w-full rounded-lg px-2",
                      current && "bg-canvas",
                    )}
                    onClick={() => setOpenPath(null)}
                    tabIndex={open ? undefined : -1}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Button asChild arrow className="mt-2 w-full">
              <Link href="/contact" onClick={() => setOpenPath(null)} tabIndex={open ? undefined : -1}>
                Talk to an Expert
              </Link>
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
