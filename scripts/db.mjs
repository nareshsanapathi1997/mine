import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

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
  return read("MYSQL_DATABASE") || "varasena";
}

function assertIdentifier(name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    throw new Error("MYSQL_DATABASE must be a simple identifier (letters, numbers, underscore).");
  }
}

function quoteIdent(name) {
  return `\`${name.replaceAll("`", "``")}\``;
}

function connection(database) {
  return {
    host: read("MYSQL_HOST"),
    port: positiveInt(read("MYSQL_PORT"), 3306),
    user: read("MYSQL_USER"),
    password: read("MYSQL_PASSWORD"),
    charset: "utf8mb4",
    ...(database ? { database } : {}),
    connectionLimit: 1,
    multipleStatements: true,
  };
}

async function createDatabase() {
  const name = databaseName();
  assertIdentifier(name);
  const pool = mysql.createPool(connection());
  try {
    const [existing] = await pool.query(
      "select schema_name from information_schema.schemata where schema_name = ?",
      [name],
    );
    if (Array.isArray(existing) && existing.length > 0) {
      console.log(`Database ${name} already exists.`);
      return;
    }
    await pool.query(`create database ${quoteIdent(name)} default character set utf8mb4 collate utf8mb4_unicode_ci`);
    console.log(`Created database ${name}.`);
  } finally {
    await pool.end();
  }
}

async function applySqlFiles(kind, dirName) {
  const name = databaseName();
  assertIdentifier(name);
  const pool = mysql.createPool(connection(name));
  try {
    await pool.query(`
      create table if not exists schema_migrations (
        id varchar(255) primary key,
        applied_at timestamp not null default current_timestamp
      )
    `);
    const [applied] = await pool.query("select id from schema_migrations");
    const done = new Set(
      Array.isArray(applied) ? applied.map((row) => row.id) : [],
    );
    const dir = path.join(root, "db", dirName);
    const files = readdirSync(dir)
      .filter((file) => file.endsWith(".sql"))
      .sort((a, b) => a.localeCompare(b, "en"));

    for (const file of files) {
      const id = `${kind}:${file}`;
      if (done.has(id) || done.has(file)) {
        console.log(`Already applied ${file}.`);
        continue;
      }
      const sql = readFileSync(path.join(dir, file), "utf8");
      const client = await pool.getConnection();
      try {
        await client.beginTransaction();
        await client.query(sql);
        await client.query("insert into schema_migrations (id) values (?)", [id]);
        await client.commit();
        console.log(`Applied ${file}.`);
      } catch (error) {
        await client.rollback();
        throw error;
      } finally {
        client.release();
      }
    }
  } finally {
    await pool.end();
  }
}

async function migrate() {
  await applySqlFiles("migration", "migrations");
}

async function seed() {
  await applySqlFiles("seed", "seeds");
}

loadEnv();

const command = process.argv[2];
try {
  if (command === "create") {
    await createDatabase();
  } else if (command === "migrate") {
    await migrate();
  } else if (command === "seed") {
    await seed();
  } else if (command === "setup") {
    await createDatabase();
    await migrate();
    await seed();
  } else {
    console.error("Usage: node scripts/db.mjs <create|migrate|seed|setup>");
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Database command failed.");
  process.exitCode = 1;
}
