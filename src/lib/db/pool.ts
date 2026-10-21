import mysql from "mysql2/promise";
import { isDatabaseConfigured, poolConfig } from "@/lib/db/config";

const globalForMysql = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
  mysqlPoolKey?: string;
};

function poolKey() {
  const config = poolConfig();
  return `${config.host}|${config.port}|${config.user}|${config.database}`;
}

function resetPool() {
  const existing = globalForMysql.mysqlPool;
  globalForMysql.mysqlPool = undefined;
  globalForMysql.mysqlPoolKey = undefined;
  if (existing) {
    existing.end().catch(() => undefined);
  }
}

/** One pool per process. Rebuilt when MYSQL_* env values change (dev env reload). */
export function getPool() {
  if (!isDatabaseConfigured()) {
    resetPool();
    return null;
  }
  const key = poolKey();
  if (!globalForMysql.mysqlPool || globalForMysql.mysqlPoolKey !== key) {
    resetPool();
    const pool = mysql.createPool(poolConfig());
    globalForMysql.mysqlPool = pool;
    globalForMysql.mysqlPoolKey = key;
  }
  return globalForMysql.mysqlPool;
}

export async function checkDatabase(): Promise<"up" | "down" | "unconfigured"> {
  const pool = getPool();
  if (!pool) return "unconfigured";
  try {
    await pool.query("select 1");
    return "up";
  } catch (error) {
    console.error("[db] Health check failed.", error instanceof Error ? error.message : "Unknown database error");
    resetPool();
    return "down";
  }
}
