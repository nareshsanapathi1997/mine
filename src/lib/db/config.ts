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

/** True when a host and user are set. Password may be empty for local setups. */
export function isDatabaseConfigured() {
  return read("MYSQL_HOST") !== "" && read("MYSQL_USER") !== "";
}

export function poolConfig(database = databaseName()) {
  return {
    host: read("MYSQL_HOST"),
    port: positiveInt(read("MYSQL_PORT"), 3306),
    user: read("MYSQL_USER"),
    password: read("MYSQL_PASSWORD"),
    database,
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: positiveInt(read("MYSQL_MAX_CONNECTIONS"), 20),
    idleTimeout: positiveInt(read("MYSQL_IDLE_TIMEOUT"), 300_000),
    enableKeepAlive: true,
  };
}
