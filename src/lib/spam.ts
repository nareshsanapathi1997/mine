import { isIP } from "node:net";

export { rateLimit, resetRateLimit } from "@/lib/rate-limit";

const MIN_SUBMIT_MS = 3000;
const MAX_AGE_MS = 12 * 60 * 60 * 1000;

function trustedHops() {
  const value = Number(process.env.TRUSTED_PROXY_HOPS ?? "1");
  return Number.isInteger(value) && value >= 0 ? value : 1;
}

function validIp(value: string | undefined | null) {
  const ip = value?.trim().replace(/^\[|\]$/g, "") ?? "";
  return isIP(ip) ? ip : "";
}

/**
 * Client IP for rate limiting. The leftmost X-Forwarded-For entry is set by the
 * client and can be spoofed, so this reads from the right: with
 * TRUSTED_PROXY_HOPS=1 (default) it takes the address the last proxy saw.
 * CLIENT_IP_HEADER names a single-IP header set by a trusted edge
 * (e.g. cf-connecting-ip behind Cloudflare). Falls back to a shared "unknown" bucket.
 */
export function clientIp(request: Request) {
  const header = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  if (header) {
    const ip = validIp(request.headers.get(header));
    if (ip) return ip;
  }

  const hops = trustedHops();
  const forwarded = request.headers.get("x-forwarded-for");
  if (hops > 0 && forwarded) {
    const chain = forwarded.split(",").map((part) => part.trim()).filter(Boolean);
    const ip = validIp(chain[Math.max(0, chain.length - hops)]);
    if (ip) return ip;
  }

  if (hops > 0) {
    const real = validIp(request.headers.get("x-real-ip"));
    if (real) return real;
  }
  return "unknown";
}

export function checkSubmitTiming(value: unknown): { ok: true } | { ok: false; message: string } {
  const started = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(started)) {
    return {
      ok: false,
      message: "The form could not be verified. Refresh the page and try again.",
    };
  }

  const elapsed = Date.now() - started;
  if (elapsed < MIN_SUBMIT_MS) {
    return {
      ok: false,
      message: "Please take a moment to review the form, then send it again.",
    };
  }
  if (elapsed > MAX_AGE_MS || elapsed < 0) {
    return {
      ok: false,
      message: "This form has been open too long. Refresh the page and send it again.",
    };
  }
  return { ok: true };
}
