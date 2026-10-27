function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

const BLOCKED_KEYS = new Set(["__proto__", "constructor", "prototype"]);

/**
 * Deep-merges stored CMS JSON over the code defaults. Objects merge key by key,
 * arrays and scalars replace, null/undefined keep the default. Prototype keys
 * from stored JSON are ignored.
 */
export function mergeContent<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(base)) return (Array.isArray(overlay) ? overlay : base) as T;
  if (isObject(base) && isObject(overlay)) {
    const next = { ...base } as Record<string, unknown>;
    for (const [key, value] of Object.entries(overlay)) {
      if (BLOCKED_KEYS.has(key)) continue;
      next[key] = mergeContent((base as Record<string, unknown>)[key], value);
    }
    return next as T;
  }
  return overlay as T;
}
