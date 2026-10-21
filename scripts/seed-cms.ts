import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { cmsDefaults } from "../src/lib/cms/defaults";
import type { CmsBundle } from "../src/lib/cms/types";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseEnv(text: string) {
  const values: Record<string, string> = {};
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
  const merged: Record<string, string> = {};
  for (const name of [".env", ".env.local"]) {
    const file = path.join(root, name);
    if (!existsSync(file)) continue;
    Object.assign(merged, parseEnv(readFileSync(file, "utf8")));
  }
  for (const [key, value] of Object.entries(merged)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function read(name: string) {
  return process.env[name]?.trim() ?? "";
}

loadEnv();

const bundle = cmsDefaults();
const keys = Object.keys(bundle) as (keyof CmsBundle)[];

async function main() {
  const pool = mysql.createPool({
    host: read("MYSQL_HOST"),
    port: Number(read("MYSQL_PORT") || 3306),
    user: read("MYSQL_USER"),
    password: read("MYSQL_PASSWORD"),
    database: read("MYSQL_DATABASE") || "varasena",
    charset: "utf8mb4",
  });

  try {
    await pool.query(`
      create table if not exists cms_content (
        content_key varchar(120) not null primary key,
        payload longtext not null,
        updated_at timestamp not null default current_timestamp on update current_timestamp
      ) default character set utf8mb4 collate utf8mb4_unicode_ci
    `);

    for (const key of keys) {
      const payload = JSON.stringify(bundle[key]);
      await pool.query(
        `insert into cms_content (content_key, payload) values (?, ?)
         on duplicate key update payload = values(payload)`,
        [key, payload],
      );
      console.log(`Saved cms_content.${key}`);
    }
    console.log(`CMS seeded (${keys.length} documents).`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "CMS seed failed.");
  process.exitCode = 1;
});
