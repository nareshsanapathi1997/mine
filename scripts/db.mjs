import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseEnv(text) {
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function loadEnv() {
  const merged = {};
  for (const name of [".env", ".env.local"]) {
    const file = path.join(root, name);
    if (!existsSync(file)) continue;
    Object.assign(merged, parseEnv(readFileSync(file, "utf8")));
  }
  for (const [key, value] of Object.entries(merged)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function read(name) {
  return process.env[name]?.trim() ?? "";
}

function positiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return parsed;
}

function databaseName() {
  return read("PG_DATABASE") || "kyntriq";
}

function assertIdentifier(name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    throw new Error("PG_DATABASE must be a simple identifier (letters, numbers, underscore).");
  }
}

function quoteIdent(name) {
  return `"${name.replaceAll('"', '""')}"`;
}

function connection(database) {
  return {
    host: read("PG_HOST"),
    port: positiveInt(read("PG_PORT"), 5432),
    user: read("PG_USER"),
    password: read("PG_PASSWORD"),
    database,
    max: 1,
  };
}

async function createDatabase() {
  const name = databaseName();
  assertIdentifier(name);
  const pool = new Pool(connection("postgres"));
  try {
    const existing = await pool.query("select 1 from pg_database where datname = $1", [name]);
    if (existing.rowCount && existing.rowCount > 0) {
      console.log(`Database ${name} already exists.`);
      return;
    }
    await pool.query(`create database ${quoteIdent(name)}`);
    console.log(`Created database ${name}.`);
  } finally {
    await pool.end();
  }
}

async function migrate() {
  const name = databaseName();
  assertIdentifier(name);
  const pool = new Pool(connection(name));
  try {
    await pool.query(`
      create table if not exists schema_migrations (
        id text primary key,
        applied_at timestamptz not null default now()
      )
    `);
    const applied = await pool.query("select id from schema_migrations");
    const done = new Set(applied.rows.map((row) => row.id));
    const dir = path.join(root, "db", "migrations");
    const files = readdirSync(dir)
      .filter((file) => file.endsWith(".sql"))
      .sort((a, b) => a.localeCompare(b, "en"));

    for (const file of files) {
      if (done.has(file)) {
        console.log(`Already applied ${file}.`);
        continue;
      }
      const sql = readFileSync(path.join(dir, file), "utf8");
      const client = await pool.connect();
      try {
        await client.query("begin");
        await client.query(sql);
        await client.query("insert into schema_migrations (id) values ($1)", [file]);
        await client.query("commit");
        console.log(`Applied ${file}.`);
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
    }
  } finally {
    await pool.end();
  }
}

loadEnv();

const command = process.argv[2];
try {
  if (command === "create") {
    await createDatabase();
  } else if (command === "migrate") {
    await migrate();
  } else if (command === "setup") {
    await createDatabase();
    await migrate();
  } else {
    console.error("Usage: node scripts/db.mjs <create|migrate|setup>");
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Database command failed.");
  process.exitCode = 1;
}
