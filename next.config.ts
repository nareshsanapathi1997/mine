import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Static CSP. A nonce-based policy would force every page to render per
 * request and lose ISR, so inline scripts (theme boot, JSON-LD, GA bootstrap)
 * are allowed by 'unsafe-inline' while everything else is locked down: no
 * plugins, no framing, no foreign forms, no base-tag hijack, and scripts only
 * from this origin and Google Tag Manager.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com${isDev ? " ws: wss:" : ""}`,
  "media-src 'self' blob:",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

/**
 * Public files keep their names when replaced, so they get a week of fresh
 * cache plus a month of stale-while-revalidate, not `immutable`. Rename a file
 * (e.g. add -v2) if a change must show up for every visitor at once.
 */
const assetCache = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" };

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Type errors fail the build. If a host's install differs and blocks a
  // deploy, set SKIP_TYPECHECK=1 for that one build and fix the cause after.
  typescript: { ignoreBuildErrors: process.env.SKIP_TYPECHECK === "1" },
  // Hostinger reports dozens of CPUs, so Next was spawning ~55 workers and
  // SIGSEGV'd during static generation. Keep the build on one worker.
  experimental: {
    cpus: 1,
    workerThreads: false,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 50,
  },
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
  // Next 16 only allows listed qualities. 85 is used for content photos so the
  // optimiser's re-encode stays sharp; 75 is the default for everything else.
  // Optimised images are cached for 30 days so the server re-encodes rarely.
  images: { qualities: [75, 85, 90], minimumCacheTTL: 2592000 },
  // Lets `npm run dev` work at localhost, 127.0.0.1, and a Cloudflare quick tunnel.
  allowedDevOrigins: ["127.0.0.1", "*.trycloudflare.com"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/newImages/:path*", headers: [assetCache] },
      { source: "/varasena-brand-pack/:path*", headers: [assetCache] },
      // Later entries win for the same header. Uploaded files get a locked-down,
      // sandboxed policy instead of the site CSP (set here because config
      // headers override ones a route handler sets).
      { source: "/uploads/:path*", headers: [{ key: "Content-Security-Policy", value: "default-src 'none'; style-src 'unsafe-inline'; sandbox" }] },
    ];
  },
  // Old solution URLs. Sector pages now live under /industries.
  async redirects() {
    return [
      { source: "/solutions/automation", destination: "/solutions/business-automation", permanent: true },
      { source: "/solutions/education", destination: "/industries/education", permanent: true },
      { source: "/solutions/hospitality", destination: "/industries/hospitality", permanent: true },
      { source: "/solutions/manufacturing", destination: "/industries/manufacturing", permanent: true },
    ];
  },
};

export default nextConfig;
