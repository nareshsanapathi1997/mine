import type { ReactNode } from "react";

/*
 * Small animated line drawings, one per industry. Pure inline SVG + CSS
 * (classes .ia-* in globals.css). Decorative only, so aria-hidden.
 * Animations run only when prefers-reduced-motion is "no-preference".
 * Strokes use currentColor; .ia-t is the brand tint and .ia-a the cyan accent.
 */
const art: Record<string, ReactNode> = {
  // Books stack with a ringing bell
  education: (
    <>
      <rect className="ia-t" x="14" y="62" width="52" height="12" rx="2" />
      <rect x="14" y="62" width="52" height="12" rx="2" />
      <rect x="18" y="50" width="44" height="12" rx="2" />
      <path d="M24 56h20M22 68h26" />
      <g className="ia-swing" style={{ transformOrigin: "60px 18px" }}>
        <path className="ia-t" d="M50 40a10 10 0 0 1 20 0v4H50Z" />
        <path d="M60 18v4M50 44v-4a10 10 0 0 1 20 0v4Z" />
        <circle className="ia-a" cx="60" cy="47" r="2.5" stroke="none" />
      </g>
      <path className="ia-ping" d="M74 30a10 10 0 0 1 0 12M46 30a10 10 0 0 0 0 12" />
    </>
  ),
  // Graduation cap with swinging tassel
  colleges: (
    <>
      <path className="ia-t" d="M40 20 72 34 40 48 8 34Z" />
      <path d="M40 20 72 34 40 48 8 34Z" />
      <path d="M20 40v14c0 5 9 9 20 9s20-4 20-9V40" />
      <g className="ia-swing" style={{ transformOrigin: "66px 37px" }}>
        <path d="M66 37v20" />
        <circle className="ia-a" cx="66" cy="60" r="3" stroke="none" />
      </g>
    </>
  ),
  // Board with a chart being drawn
  coaching: (
    <>
      <rect className="ia-t" x="10" y="14" width="60" height="40" rx="3" />
      <rect x="10" y="14" width="60" height="40" rx="3" />
      <path d="M28 54 22 70M52 54l6 16M40 54v8" />
      <path className="ia-draw" pathLength="1" d="M18 44l12-10 10 6 12-14 10 6" />
      <circle className="ia-a ia-pop" cx="62" cy="32" r="3" stroke="none" />
    </>
  ),
  // Reception bell with ding
  hospitality: (
    <>
      <path className="ia-t" d="M16 58a24 24 0 0 1 48 0Z" />
      <path d="M16 58a24 24 0 0 1 48 0ZM10 64h60M40 34v-6M35 28h10" />
      <g className="ia-press" style={{ transformOrigin: "40px 28px" }}>
        <circle className="ia-a" cx="40" cy="25" r="3" stroke="none" />
      </g>
      <path className="ia-ping" d="M22 24a14 14 0 0 1 6-8M58 24a14 14 0 0 0-6-8" />
    </>
  ),
  // Hotel key on a tag, swinging
  hotels: (
    <>
      <path d="M40 8v8" />
      <g className="ia-swing" style={{ transformOrigin: "40px 12px" }}>
        <circle cx="40" cy="22" r="7" />
        <path d="M40 29v30M40 44h8M40 52h6" />
        <rect className="ia-t" x="28" y="56" width="24" height="16" rx="4" />
        <rect x="28" y="56" width="24" height="16" rx="4" />
        <path d="M35 64h10" />
        <circle className="ia-a" cx="40" cy="22" r="2.5" stroke="none" />
      </g>
    </>
  ),
  // Gear turning over a moving conveyor
  manufacturing: (
    <>
      <g className="ia-spin" style={{ transformOrigin: "40px 28px" }}>
        <circle className="ia-t" cx="40" cy="28" r="13" />
        <path d="M40 10v6M40 40v6M22 28h6M52 28h6M27.3 15.3l4.2 4.2M48.5 36.5l4.2 4.2M27.3 40.7l4.2-4.2M48.5 19.5l4.2-4.2" />
        <circle cx="40" cy="28" r="12" />
        <circle className="ia-a" cx="40" cy="28" r="4" stroke="none" />
      </g>
      <rect x="8" y="60" width="64" height="10" rx="5" />
      <g className="ia-belt">
        <rect className="ia-t" x="10" y="50" width="10" height="10" rx="1.5" />
        <rect x="10" y="50" width="10" height="10" rx="1.5" />
        <rect className="ia-t" x="34" y="50" width="10" height="10" rx="1.5" />
        <rect x="34" y="50" width="10" height="10" rx="1.5" />
        <rect className="ia-t" x="58" y="50" width="10" height="10" rx="1.5" />
        <rect x="58" y="50" width="10" height="10" rx="1.5" />
      </g>
    </>
  ),
  // Heart with a heartbeat line and stethoscope
  healthcare: (
    <>
      <path className="ia-t ia-beat" style={{ transformOrigin: "40px 34px" }} d="M40 56S16 42 16 26a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 16-24 30-24 30Z" />
      <path d="M40 56S16 42 16 26a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 16-24 30-24 30Z" />
      <path className="ia-draw" pathLength="1" d="M8 70h20l4-8 6 14 5-10 3 4h26" />
      <circle className="ia-a" cx="40" cy="34" r="3" stroke="none" />
    </>
  ),
  // Briefcase with a document being written
  "professional-services": (
    <>
      <rect className="ia-t" x="8" y="32" width="40" height="30" rx="4" />
      <rect x="8" y="32" width="40" height="30" rx="4" />
      <path d="M20 32v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5M8 45h40" />
      <g className="ia-bob">
        <rect x="46" y="12" width="26" height="34" rx="3" />
        <path className="ia-draw" pathLength="1" d="M52 22h14M52 29h14M52 36h9" />
      </g>
      <circle className="ia-a" cx="28" cy="45" r="2.5" stroke="none" />
    </>
  ),
  // Small shop with a growing bar chart
  "corporate-smes": (
    <>
      <path className="ia-t" d="M8 30h40v36H8Z" />
      <path d="M8 66V30M48 30v36M4 66h72M6 30l4-12h36l4 12ZM20 66V50h12v16" />
      <path d="M6 30a5.5 5.5 0 0 0 11 0 5.5 5.5 0 0 0 11 0 5.5 5.5 0 0 0 11 0 5.5 5.5 0 0 0 11 0" />
      <g>
        <rect className="ia-grow ia-g1" x="56" y="50" width="5" height="16" rx="1.5" />
        <rect className="ia-grow ia-g2" x="64" y="42" width="5" height="24" rx="1.5" />
        <rect className="ia-grow ia-g3 ia-a" x="72" y="32" width="5" height="34" rx="1.5" stroke="none" />
      </g>
    </>
  ),
};
art.schools = art.education;

export function hasIndustryArt(slug: string) {
  return slug in art;
}

export function IndustryArt({ slug, className = "" }: { slug: string; className?: string }) {
  const body = art[slug];
  if (!body) return null;
  return (
    <svg
      viewBox="0 0 80 80"
      className={`ia ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {body}
    </svg>
  );
}
