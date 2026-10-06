import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets `npm run dev` work at localhost, 127.0.0.1, and a Cloudflare quick tunnel.
  allowedDevOrigins: ["127.0.0.1", "*.trycloudflare.com"],
};

export default nextConfig;
