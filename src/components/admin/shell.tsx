"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { useSite } from "@/components/cms/site-provider";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/brand", label: "Brand & social" },
  { href: "/admin/content", label: "Page content" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/account", label: "Account" },
];

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { site } = useSite();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-full">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-surface p-4 sm:block">
        <Link href="/admin" className="block px-1">
          <Logo name={site.name} brand={site.brand} variant="inverse" />
        </Link>
        <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-glow">Admin</p>
        <nav className="mt-4 flex flex-col gap-1" aria-label="Admin">
          {links.map((item) => {
            const current = item.href === "/admin" ? pathname === "/admin" : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("rounded-lg px-3 py-2 text-sm", current ? "bg-canvas font-semibold text-ink" : "text-muted hover:bg-canvas hover:text-ink")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button type="button" className="footer-link mt-8 text-sm" onClick={logout}>
          Sign out
        </button>
        <p className="mt-6 text-xs text-mist">Signed in as {username}</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:hidden">
          <p className="text-sm font-semibold">Admin</p>
          <button type="button" className="text-sm text-accent-ink" onClick={logout}>
            Sign out
          </button>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-line px-4 py-2 sm:hidden" aria-label="Admin">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 overflow-auto p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
