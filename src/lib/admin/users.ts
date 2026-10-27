import { getPool } from "@/lib/db/pool";
import { hashPassword, passwordProblem, timingDummyHash, verifyPassword } from "@/lib/admin/password";

export type AdminRow = { id: number; username: string; password_hash: string };

export async function findAdmin(username: string) {
  const pool = getPool();
  if (!pool) return null;
  const [rows] = await pool.query("select id, username, password_hash from admin_users where username = ? limit 1", [
    username,
  ]);
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return rows[0] as AdminRow;
}

export async function countAdmins() {
  const pool = getPool();
  if (!pool) return 0;
  try {
    const [rows] = await pool.query("select count(*) as n from admin_users");
    const row = Array.isArray(rows) ? (rows[0] as { n: number }) : null;
    return Number(row?.n ?? 0);
  } catch {
    await ensureAdminTable();
    const [rows] = await pool.query("select count(*) as n from admin_users");
    const row = Array.isArray(rows) ? (rows[0] as { n: number }) : null;
    return Number(row?.n ?? 0);
  }
}

async function ensureAdminTable() {
  const pool = getPool();
  if (!pool) return;
  await pool.query(`
    create table if not exists admin_users (
      id int unsigned not null auto_increment primary key,
      username varchar(80) not null unique,
      password_hash varchar(255) not null,
      created_at timestamp not null default current_timestamp
    ) default character set utf8mb4 collate utf8mb4_unicode_ci
  `);
}

export async function createAdmin(username: string, password: string) {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  const passwordHash = await hashPassword(password);
  await pool.query("insert into admin_users (username, password_hash) values (?, ?)", [username, passwordHash]);
}

/**
 * Creates the first admin from ADMIN_USER / ADMIN_PASSWORD when the table is empty.
 * In production a weak or default password is refused, so a forgotten
 * `change-me` can never become a live login.
 */
export async function ensureBootstrapAdmin() {
  if ((await countAdmins()) > 0) return;
  const username = process.env.ADMIN_USER?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!username || !password) return;
  const problem = passwordProblem(password, username);
  if (problem) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[admin] ADMIN_PASSWORD rejected: ${problem} Set a strong value and sign in again.`);
      return;
    }
    console.warn(`[admin] ADMIN_PASSWORD is weak (${problem}). This is allowed in development only.`);
  }
  await createAdmin(username, password);
}

/** Returns the admin row on success. Unknown usernames still cost one scrypt run. */
export async function authenticateAdmin(username: string, password: string) {
  await ensureBootstrapAdmin();
  const user = await findAdmin(username.trim());
  if (!user) {
    await verifyPassword(password, await timingDummyHash());
    return null;
  }
  const ok = await verifyPassword(password, user.password_hash);
  return ok ? user : null;
}

export async function updateAdminPassword(username: string, nextPassword: string) {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  const passwordHash = await hashPassword(nextPassword);
  await pool.query("update admin_users set password_hash = ? where username = ?", [passwordHash, username]);
  return passwordHash;
}

/**
 * One key per account however the name is typed. admin_users uses a case- and
 * accent-insensitive collation, so "ádmin" and "ＡＤＭＩＮ" reach the same row
 * and must share its counters.
 */
export function throttleKey(username: string) {
  return username.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
}
