const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const MIN_SUBMIT_MS = 3000;
const MAX_AGE_MS = 12 * 60 * 60 * 1000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** First forwarded hop, then x-real-ip, otherwise a shared "unknown" bucket. In-memory and per process. */
export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  return "unknown";
}

export function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const current = buckets.get(ip);

  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  return { ok: true };
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
