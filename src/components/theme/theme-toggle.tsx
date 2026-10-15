"use client";

import { useId } from "react";
import { applyTheme, type Theme } from "@/lib/theme";

/**
 * Sun-to-moon morph. The shape follows html[data-theme] through CSS, so it
 * is correct before hydration and animates only when the theme changes.
 */
export function ThemeToggle() {
  const maskId = `tt-${useId().replace(/:/g, "")}`;
  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    applyTheme(next);
    event.currentTarget.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-surface-muted"
      aria-label="Switch colour theme (light or dark)"
      title="Switch light or dark theme"
    >
      <svg viewBox="0 0 24 24" className="tt-svg size-[1.2rem]" aria-hidden="true" focusable="false">
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <circle className="tt-bite" cx="24" cy="2" r="7" fill="#000" />
        </mask>
        <circle className="tt-core" cx="12" cy="12" r="5" fill="currentColor" mask={`url(#${maskId})`} />
        <g className="tt-rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
