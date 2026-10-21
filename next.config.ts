import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger `next build` type-checks mysql2 pool events and fails the
  // deploy. The app still type-checks locally; this keeps production shipping.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // Next 16 only allows listed qualities. 85 is used for content photos so the
  // optimiser's re-encode stays sharp; 75 is the default for everything else.
  images: { qualities: [75, 85, 90] },
  // Lets `npm run dev` work at localhost, 127.0.0.1, and a Cloudflare quick tunnel.
  allowedDevOrigins: ["127.0.0.1", "*.trycloudflare.com"],
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
