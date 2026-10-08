"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { industries } from "@/content/industries";
import { primaryNav } from "@/content/navigation";
import { servicesInGroup, solutionGroups } from "@/content/services";
import { cn } from "@/lib/cn";

type MenuId = "solutions" | "industries";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const mobileOpen = openPath === pathname;
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const solutionsId = useId();
  const industriesId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        setOpenPath(null);
        setMobileSection(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function closeAll() {
    setMenu(null);
    setOpenPath(null);
    setMobileSection(null);
  }

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 border-b",
        scrolled || menu || mobileOpen
          ? "is-scrolled border-line bg-canvas/80 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
      onMouseLeave={() => setMenu(null)}
    >
      <Container className="nav-shell flex items-center justify-between gap-4">
        <Link href="/" aria-label="Kyntriq Solutions home" className="inline-flex min-h-11 items-center rounded-md" onClick={closeAll}>
          <span className="sm:hidden">
            <Logo compact priority />
          </span>
          <span className="hidden sm:inline-flex">
            <Logo priority />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <MenuButton
            id={solutionsId}
            label="Solutions"
            open={menu === "solutions"}
            current={isCurrent(pathname, "/solutions")}
            onOpen={() => setMenu("solutions")}
            onToggle={() => setMenu((current) => (current === "solutions" ? null : "solutions"))}
          />
          <MenuButton
            id={industriesId}
            label="Industries"
            open={menu === "industries"}
            current={isCurrent(pathname, "/industries")}
            onOpen={() => setMenu("industries")}
            onToggle={() => setMenu((current) => (current === "industries" ? null : "industries"))}
          />
          {primaryNav.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="nav-link px-2"
                onClick={() => setMenu(null)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden lg:block">
            <Button asChild arrow>
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            onClick={() => setOpenPath(mobileOpen ? null : pathname)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {menu ? (
      <div className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-[0_24px_40px_-32px_rgba(15,23,42,0.45)] lg:block">
        {menu === "solutions" ? (
          <div id={solutionsId} className="py-8" onMouseEnter={() => setMenu("solutions")}>
            <Container className="grid grid-cols-12 gap-8">
              {solutionGroups.map((group) => (
                <div key={group.id} className="col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{group.title}</p>
                  <ul className="mt-3 space-y-1">
                    {servicesInGroup(group.slugs).map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/solutions/${service.slug}`}
                          className="block rounded-lg px-2 py-2 hover:bg-canvas"
                          onClick={() => setMenu(null)}
                        >
                          <span className="block text-sm font-semibold text-ink">{service.title}</span>
                          <span className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted">{service.details}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-3 rounded-xl bg-canvas p-5">
                <p className="text-sm font-semibold text-ink">Not sure what you need?</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">Tell us about your workflow.</p>
                <Button asChild arrow className="mt-4 w-full">
                  <Link href="/contact" onClick={() => setMenu(null)}>
                    Talk to an Expert
                  </Link>
                </Button>
              </div>
            </Container>
          </div>
        ) : null}
        {menu === "industries" ? (
          <div id={industriesId} className="py-8" onMouseEnter={() => setMenu("industries")}>
            <Container>
              <ul className="grid grid-cols-3 gap-2">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="block rounded-lg px-3 py-3 hover:bg-canvas"
                      onClick={() => setMenu(null)}
                    >
                      <span className="block text-sm font-semibold text-ink">{industry.title}</span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{industry.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/industries" className="text-link mt-4" onClick={() => setMenu(null)}>
                All industries <span className="text-link-arrow" aria-hidden="true">→</span>
              </Link>
            </Container>
          </div>
        ) : null}
      </div>
      ) : null}

      <div
        id={menuId}
        className={cn(
          "mobile-panel bg-canvas/95 backdrop-blur-xl lg:hidden",
          mobileOpen ? "is-open fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-line" : "hidden",
        )}
      >
        <div className={cn(!mobileOpen && "pointer-events-none")} {...(mobileOpen ? {} : { inert: true })}>
          <Container className="flex max-h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto py-3">
            <nav aria-label="Mobile" className="flex flex-col">
              <MobileGroup
                label="Solutions"
                open={mobileSection === "solutions"}
                onToggle={() => setMobileSection((current) => (current === "solutions" ? null : "solutions"))}
              >
                {solutionGroups.map((group) => (
                  <div key={group.id} className="px-2 py-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{group.title}</p>
                    <ul className="mt-1">
                      {servicesInGroup(group.slugs).map((service) => (
                        <li key={service.slug}>
                          <Link href={`/solutions/${service.slug}`} className="nav-link w-full px-1" onClick={closeAll}>
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </MobileGroup>
              <MobileGroup
                label="Industries"
                open={mobileSection === "industries"}
                onToggle={() => setMobileSection((current) => (current === "industries" ? null : "industries"))}
              >
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="nav-link w-full px-3"
                    onClick={closeAll}
                  >
                    {industry.title}
                  </Link>
                ))}
              </MobileGroup>
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="nav-link w-full rounded-lg px-2"
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="nav-link w-full rounded-lg px-2" onClick={closeAll}>
                Contact
              </Link>
            </nav>
            <Button asChild arrow className="mt-2 w-full">
              <Link href="/contact" onClick={closeAll}>
                Talk to an Expert
              </Link>
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}

function MenuButton({
  id,
  label,
  open,
  current,
  onOpen,
  onToggle,
}: {
  id: string;
  label: string;
  open: boolean;
  current: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const openedByHover = useRef(false);
  return (
    <button
      type="button"
      className={cn("nav-link gap-1 px-2", (open || current) && "text-ink")}
      aria-expanded={open}
      aria-controls={id}
      onMouseEnter={() => {
        openedByHover.current = true;
        onOpen();
      }}
      onFocus={onOpen}
      onClick={() => {
        if (openedByHover.current) {
          openedByHover.current = false;
          return;
        }
        onToggle();
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        onOpen();
        requestAnimationFrame(() => {
          document.getElementById(id)?.querySelector("a")?.focus();
        });
      }}
    >
      {label}
      <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
    </button>
  );
}

function MobileGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line">
      <button type="button" className="nav-link w-full justify-between px-2" aria-expanded={open} onClick={onToggle}>
        {label}
        <ChevronDown className={cn("size-4", open && "rotate-180")} aria-hidden />
      </button>
      {open ? <div className="pb-2">{children}</div> : null}
    </div>
  );
}
