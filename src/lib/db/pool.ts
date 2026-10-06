import { Pool } from "pg";
import { isDatabaseConfigured, poolConfig } from "@/lib/db/config";

const globalForPg = globalThis as unknown as { pgPool?: Pool };

/** One pool per process. Cached on globalThis so dev hot reload does not open another. */
export function getPool() {
  if (!isDatabaseConfigured()) return null;
  if (!globalForPg.pgPool) {
    const pool = new Pool(poolConfig());
    pool.on("error", (error) => {
      console.error("[db] Idle client error.", error instanceof Error ? error.message : "Unknown database error");
    });
    globalForPg.pgPool = pool;
  }
  return globalForPg.pgPool;
}

export async function checkDatabase(): Promise<"up" | "down" | "unconfigured"> {
  const pool = getPool();
  if (!pool) return "unconfigured";
  try {
    await pool.query("select 1");
    return "up";
  } catch (error) {
    console.error("[db] Health check failed.", error instanceof Error ? error.message : "Unknown database error");
    return "down";
  }
}
