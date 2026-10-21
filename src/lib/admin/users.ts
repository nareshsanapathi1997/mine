import { getPool } from "@/lib/db/pool";
import { hashPassword, verifyPassword } from "@/lib/admin/password";

type AdminRow = { id: number; username: string; password_hash: string };

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

export async function ensureBootstrapAdmin() {
  if ((await countAdmins()) > 0) return;
  const username = process.env.ADMIN_USER?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!username || !password) return;
  await createAdmin(username, password);
}

export async function authenticateAdmin(username: string, password: string) {
  await ensureBootstrapAdmin();
  const user = await findAdmin(username.trim());
  if (!user) return null;
  const ok = await verifyPassword(password, user.password_hash);
  return ok ? user.username : null;
}

export async function updateAdminPassword(username: string, nextPassword: string) {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  const passwordHash = await hashPassword(nextPassword);
  await pool.query("update admin_users set password_hash = ? where username = ?", [passwordHash, username]);
}
