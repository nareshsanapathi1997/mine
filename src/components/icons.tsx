import type { ReactNode } from "react";
import type { IconName } from "@/content/types";

/*
 * VARASENA icon family.
 * 24px grid, 1.6 stroke, round caps and joins, 2px safe padding.
 * Duotone: `t` shapes are a soft brand tint (blue), `d` marks are a cyan
 * accent dot; strokes use currentColor so the icon follows text colour in
 * both themes. Colours come from CSS variables (.ki-* in globals.css).
 */
type Glyph = { t?: ReactNode; l: ReactNode; d?: ReactNode };

const glyphs = {
  arrow: { l: <path d="M5 12h13M13 6.5 18.5 12 13 17.5" /> },
  "arrow-up": { l: <path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" /> },
  "chevron-down": { l: <path d="m7 10 5 5 5-5" /> },
  menu: { l: <path d="M4.5 7h15M4.5 12h15M4.5 17h9" /> },
  close: { l: <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" /> },
  check: { l: <path d="m5.5 12.5 4 4 9-9.5" /> },
  plus: { l: <path d="M12 5.5v13M5.5 12h13" /> },
  minus: { l: <path d="M5.5 12h13" /> },
  status: { t: <circle cx="12" cy="12" r="8.5" />, l: <><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.3 2.4 2.4 4.6-5" /></> },
  globe: {
    t: <circle cx="12" cy="12" r="8.5" />,
    l: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.4 3.4 5.2 3.4 8.5s-1 6.1-3.4 8.5c-2.4-2.4-3.4-5.2-3.4-8.5s1-6.1 3.4-8.5Z" /></>,
  },
  smartphone: {
    t: <rect x="6.5" y="3" width="11" height="18" rx="2.5" />,
    l: <><rect x="6.5" y="3" width="11" height="18" rx="2.5" /><path d="M10.5 6h3" /></>,
    d: <circle cx="12" cy="17.6" r="1" />,
  },
  blocks: {
    t: <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.8" />,
    l: <><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.8" /><rect x="3.5" y="13" width="7.5" height="7.5" rx="1.8" /><rect x="13" y="13" width="7.5" height="7.5" rx="1.8" /><rect x="13" y="3.5" width="7.5" height="7.5" rx="1.8" /></>,
  },
  bot: {
    t: <rect x="4.5" y="8" width="15" height="11" rx="3.5" />,
    l: <><rect x="4.5" y="8" width="15" height="11" rx="3.5" /><path d="M12 8V4.5M2.5 13v2M21.5 13v2M9.5 16h5" /></>,
    d: <><circle cx="9.3" cy="12.5" r="1.1" /><circle cx="14.7" cy="12.5" r="1.1" /><circle cx="12" cy="4" r="1.1" /></>,
  },
  audio: { t: <rect x="9.5" y="4" width="5" height="16" rx="2.5" />, l: <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" /> },
  message: {
    t: <path d="M20 11.5a8 8 0 0 1-11.8 7L4 19.8l1.3-4A8 8 0 1 1 20 11.5Z" />,
    l: <path d="M20 11.5a8 8 0 0 1-11.8 7L4 19.8l1.3-4A8 8 0 1 1 20 11.5Z" />,
    d: <><circle cx="8.5" cy="11.5" r="1" /><circle cx="12" cy="11.5" r="1" /><circle cx="15.5" cy="11.5" r="1" /></>,
  },
  workflow: {
    t: <rect x="14" y="14" width="6.5" height="6.5" rx="1.6" />,
    l: <><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.6" /><rect x="14" y="14" width="6.5" height="6.5" rx="1.6" /><path d="M6.75 10v3.25a2 2 0 0 0 2 2H14M17.25 14V10a2 2 0 0 0-2-2H10" /></>,
  },
  cloud: { t: <path d="M7.5 18.5h9.5a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-.8A4.4 4.4 0 0 0 7.5 18.5Z" />, l: <path d="M7.5 18.5h9.5a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-.8A4.4 4.4 0 0 0 7.5 18.5Z" /> },
  graduation: {
    t: <path d="m12 4.5 9.5 4.5-9.5 4.5L2.5 9Z" />,
    l: <><path d="m12 4.5 9.5 4.5-9.5 4.5L2.5 9Z" /><path d="M6.5 11v4.5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3V11M21.5 9v5" /></>,
  },
  hotel: {
    t: <path d="M4 20.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.5Z" />,
    l: <><path d="M4 20.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.5M2.5 20.5h19M10 20.5v-3.5h4v3.5M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" /></>,
  },
  factory: {
    t: <path d="M3.5 20.5V10l5 3V10l5 3V10l5 3V5.5h2v15Z" />,
    l: <><path d="M3.5 20.5V10l5 3V10l5 3V10l5 3V5.5h2v15ZM2.5 20.5h19" /></>,
    d: <><circle cx="8" cy="17" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="16" cy="17" r="1" /></>,
  },
  building: {
    t: <rect x="5" y="3.5" width="9" height="17" rx="1.5" />,
    l: <><rect x="5" y="3.5" width="9" height="17" rx="1.5" /><path d="M14 9.5h3.5a1.5 1.5 0 0 1 1.5 1.5v9.5M3 20.5h18M8.5 7.5h2M8.5 11h2M8.5 14.5h2" /></>,
  },
  heart: {
    t: <path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10Z" />,
    l: <><path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10Z" /><path d="M7 12.5h2.5l1.3-2.3 2 4.3 1.2-2h3" /></>,
  },
  briefcase: {
    t: <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />,
    l: <><rect x="3.5" y="7.5" width="17" height="12" rx="2.5" /><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" /></>,
    d: <circle cx="12" cy="12.5" r="1.2" />,
  },
  compass: { t: <path d="m15.5 8.5-2 5-5 2 2-5Z" />, l: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></> },
  cpu: {
    t: <rect x="9" y="9" width="6" height="6" rx="1" />,
    l: <><rect x="5.5" y="5.5" width="13" height="13" rx="2.5" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9.5 2.5v3M14.5 2.5v3M9.5 18.5v3M14.5 18.5v3M2.5 9.5h3M2.5 14.5h3M18.5 9.5h3M18.5 14.5h3" /></>,
  },
  layers: {
    t: <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8Z" />,
    l: <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />,
  },
  shield: {
    t: <path d="M12 3.5 19 6v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6Z" />,
    l: <><path d="M12 3.5 19 6v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6Z" /><path d="m9 12 2.2 2.2L15.2 10" /></>,
  },
  handshake: {
    t: <path d="m3 11 4-4 5 2 5-2 4 4-7.5 7.5a1.6 1.6 0 0 1-2.2 0Z" />,
    l: <path d="m3 11 4-4 5 2 5-2 4 4-7.5 7.5a1.6 1.6 0 0 1-2.2 0ZM12 9l-3 3a1.5 1.5 0 0 0 2.1 2.1L13 12.3l2.5 2.5M9.5 15.5l1.5 1.5" />,
  },
  link: { l: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /> },
  database: {
    t: <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />,
    l: <><ellipse cx="12" cy="6" rx="7.5" ry="2.8" /><path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></>,
  },
  clipboard: {
    t: <rect x="5" y="5" width="14" height="16" rx="2.5" />,
    l: <><rect x="5" y="5" width="14" height="16" rx="2.5" /><rect x="9" y="3" width="6" height="3.5" rx="1.2" /><path d="M9 11h6M9 14.5h6M9 18h3.5" /></>,
  },
  mail: { t: <rect x="3" y="5.5" width="18" height="13" rx="2.5" />, l: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></> },
  phone: {
    t: <path d="M6 3.5h3l1.6 4.2-2 1.3a10.5 10.5 0 0 0 6.4 6.4l1.3-2 4.2 1.6v3A2 2 0 0 1 18.4 20 15 15 0 0 1 4 5.6 2 2 0 0 1 6 3.5Z" />,
    l: <path d="M6 3.5h3l1.6 4.2-2 1.3a10.5 10.5 0 0 0 6.4 6.4l1.3-2 4.2 1.6v3A2 2 0 0 1 18.4 20 15 15 0 0 1 4 5.6 2 2 0 0 1 6 3.5Z" />,
  },
  pin: { t: <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11Z" />, l: <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11Z" />, d: <circle cx="12" cy="10" r="2.2" /> },
  search: { t: <circle cx="10.5" cy="10.5" r="6.5" />, l: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></> },
  user: { t: <circle cx="12" cy="8" r="4" />, l: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></> },
  users: {
    t: <circle cx="9" cy="8" r="3.5" />,
    l: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.3a6.5 6.5 0 0 1 3.5 5.7" /></>,
  },
  zap: { t: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z" />, l: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z" /> },
} satisfies Record<string, Glyph>;

export type GlyphName = keyof typeof glyphs;

/** Any icon in the family by name. Decorative by default; pass `title` when it carries meaning. */
export function Glyph({ name, className = "size-4 shrink-0", title, strokeWidth = 1.6 }: { name: GlyphName; className?: string; title?: string; strokeWidth?: number }) {
  const g: Glyph = glyphs[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ki ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {g.t ? <g className="ki-t" stroke="none">{g.t}</g> : null}
      {g.l}
      {g.d ? <g className="ki-d" stroke="none">{g.d}</g> : null}
    </svg>
  );
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <Glyph name={name} className={className} />;
}

export type UiIconName = Exclude<GlyphName, "arrow-up" | "chevron-down" | "menu" | "close">;

export function UiIcon({ name, className = "size-4 shrink-0" }: { name: UiIconName; className?: string }) {
  return <Glyph name={name} className={className} />;
}

export function EyebrowMark() {
  return (
    <span className="icon-chip icon-chip-sm" aria-hidden="true">
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M4.5 3v10" />
        <path d="M4.5 8 12 4.2" />
        <path d="M4.5 8 12 11.8" />
      </svg>
    </span>
  );
}

const glyphProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function SocialGlyph({ label, className = "size-3.5 shrink-0" }: { label: string; className?: string }) {
  if (label === "LinkedIn") {
    return (
      <svg {...glyphProps} className={`ki ${className}`}>
        <rect className="ki-t" stroke="none" x="4" y="4" width="16" height="16" rx="3" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 10.5V17M8 7.5h.01M12 17v-4a2 2 0 1 1 4 0v4" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg {...glyphProps} className={`ki ${className}`}>
        <rect className="ki-t" stroke="none" x="4" y="4" width="16" height="16" rx="4.5" />
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle className="ki-d" cx="17" cy="7" r="1" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...glyphProps} className={`ki ${className}`}>
      <path d="M5 5.5 10.4 12 5.2 18.5M19 5.5 13.5 12l5.3 6.5" />
    </svg>
  );
}
