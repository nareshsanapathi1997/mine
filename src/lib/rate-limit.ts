import { createHash } from "node:crypto";
import { getPool } from "@/lib/db/pool";

export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfter: number };
export type RateLimitOptions = { scope?: string; max?: number; windowMs?: number };

const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MAX = 8;
const MEMORY_LIMIT = 10_000;

type Bucket = { count: number; resetAt: number };

const globalForLimits = globalThis as unknown as {
  rateLimitBuckets?: Map<string, Bucket>;
  rateLimitTableReady?: Promise<void>;
};

const buckets = (globalForLimits.rateLimitBuckets ??= new Map<string, Bucket>());

/** Bucket keys are hashed so raw IPs and usernames never reach the database. */
function bucketKey(scope: string, key: string) {
  return createHash("sha256").update(`${scope}\u0000${key}`).digest("hex");
}

function pruneMemory(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Still full after expiry: drop the oldest entries (Map keeps insertion order).
  while (buckets.size >= MEMORY_LIMIT) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
}

function hitMemory(id: string, max: number, windowMs: number, now: number): RateLimitResult {
  const current = buckets.get(id);
  if (!current || current.resetAt <= now) {
    if (buckets.size >= MEMORY_LIMIT) pruneMemory(now);
    buckets.set(id, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (current.count >= max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { ok: true, remaining: max - current.count };
}

function ensureTable() {
  const pool = getPool();
  if (!pool) return Promise.resolve();
  globalForLimits.rateLimitTableReady ??= pool
    .query(
      `create table if not exists rate_limits (
        bucket char(64) not null primary key,
        hits int unsigned not null,
        reset_at bigint unsigned not null,
        key rate_limits_reset_at (reset_at)
      ) default character set utf8mb4 collate utf8mb4_unicode_ci`,
    )
    .then(() => undefined)
    .catch((error) => {
      globalForLimits.rateLimitTableReady = undefined;
      throw error;
    });
  return globalForLimits.rateLimitTableReady;
}

async function hitDatabase(id: string, max: number, windowMs: number, now: number): Promise<RateLimitResult | null> {
  const pool = getPool();
  if (!pool) return null;
  await ensureTable();
  const resetAt = now + windowMs;
  // One atomic upsert: an expired bucket restarts at 1, a live one increments.
  await pool.query(
    `insert into rate_limits (bucket, hits, reset_at) values (?, 1, ?)
     on duplicate key update
       hits = if(reset_at <= ?, 1, hits + 1),
       reset_at = if(reset_at <= ?, ?, reset_at)`,
    [id, resetAt, now, now, resetAt],
  );
  const [rows] = await pool.query("select hits, reset_at from rate_limits where bucket = ?", [id]);
  const row = Array.isArray(rows) ? (rows[0] as { hits: number; reset_at: number | string } | undefined) : undefined;
  if (!row) return null;

  if (Math.random() < 0.01) {
    pool.query("delete from rate_limits where reset_at <= ?", [now]).catch(() => undefined);
  }

  const hits = Number(row.hits);
  if (hits > max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((Number(row.reset_at) - now) / 1000)) };
  }
  return { ok: true, remaining: max - hits };
}

/**
 * Counts one hit against `scope:key`. Uses MySQL when it is configured so limits
 * survive restarts and are shared across instances, and falls back to process
 * memory when the database is missing or down.
 */
export async function rateLimit(key: string, options: RateLimitOptions = {}): Promise<RateLimitResult> {
  const { scope = "contact", max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW_MS } = options;
  const id = bucketKey(scope, key);
  const now = Date.now();
  try {
    const result = await hitDatabase(id, max, windowMs, now);
    if (result) return result;
  } catch (error) {
    console.error("[rate-limit] Database store failed, using memory.", error instanceof Error ? error.message : "");
  }
  return hitMemory(id, max, windowMs, now);
}

/** Clears a bucket, e.g. the per-username login counter after a successful sign-in. */
export async function resetRateLimit(key: string, scope: string) {
  const id = bucketKey(scope, key);
  buckets.delete(id);
  const pool = getPool();
  if (!pool) return;
  try {
    await ensureTable();
    await pool.query("delete from rate_limits where bucket = ?", [id]);
  } catch {
    /* the bucket will expire on its own */
  }
}
