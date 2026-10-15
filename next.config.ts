import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
