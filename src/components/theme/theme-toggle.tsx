"use client";

import { Moon, Sun } from "lucide-react";
import { applyTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-surface-muted"
      aria-label="Switch color theme"
    >
      <Sun className="hidden size-[1.15rem] dark:block" aria-hidden />
      <Moon className="size-[1.15rem] dark:hidden" aria-hidden />
    </button>
  );
}
