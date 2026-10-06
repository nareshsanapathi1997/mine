function read(name: string) {
  return process.env[name]?.trim() ?? "";
}

function positiveInt(value: string, fallback: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return parsed;
}

/** Database name from PG_DATABASE, or `kyntriq` when that variable is empty. */
export function databaseName() {
  return read("PG_DATABASE") || "kyntriq";
}

/** True when a host and user are set. Password may be empty for local trust auth. */
export function isDatabaseConfigured() {
  return read("PG_HOST") !== "" && read("PG_USER") !== "";
}

export function poolConfig(database = databaseName()) {
  return {
    host: read("PG_HOST"),
    port: positiveInt(read("PG_PORT"), 5432),
    user: read("PG_USER"),
    password: read("PG_PASSWORD"),
    database,
    max: positiveInt(read("PG_MAX_CONNECTIONS"), 20),
    idleTimeoutMillis: positiveInt(read("PG_IDLE_TIMEOUT"), 300_000),
  };
}
