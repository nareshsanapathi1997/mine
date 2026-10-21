function read(name: string) {
  return process.env[name]?.trim() ?? "";
}

function positiveInt(value: string, fallback: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return parsed;
}

/** Database name from MYSQL_DATABASE, or `varasena` when that variable is empty. */
export function databaseName() {
  return read("MYSQL_DATABASE") || "varasena";
}

/**
 * Hostinger Node.js apps must use 127.0.0.1 (not localhost / not the database name).
 * A value with no dot is treated as a database name pasted into MYSQL_HOST by mistake.
 */
export function mysqlHost() {
  const host = read("MYSQL_HOST");
  if (!host) return "";
  if (host === "localhost") return "127.0.0.1";
  if (host === "127.0.0.1" || host.includes(".")) return host;
  console.error(
    `[db] MYSQL_HOST "${host}" is not a hostname. Using 127.0.0.1. Set MYSQL_HOST=127.0.0.1 on Hostinger Node.js, and put "${host}" in MYSQL_DATABASE.`,
  );
  return "127.0.0.1";
}

/** True when a host and user are set. Password may be empty for local setups. */
export function isDatabaseConfigured() {
  return mysqlHost() !== "" && read("MYSQL_USER") !== "";
}

export function poolConfig(database = databaseName()) {
  return {
    host: mysqlHost(),
    port: positiveInt(read("MYSQL_PORT"), 3306),
    user: read("MYSQL_USER"),
    password: read("MYSQL_PASSWORD"),
    database,
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: positiveInt(read("MYSQL_MAX_CONNECTIONS"), 20),
    idleTimeout: positiveInt(read("MYSQL_IDLE_TIMEOUT"), 300_000),
    connectTimeout: 8000,
    enableKeepAlive: true,
  };
}
