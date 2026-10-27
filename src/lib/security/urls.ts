const LINK_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/** A link a visitor can click: http(s), mailto, tel, or a same-site path. Blocks javascript:, data: and the like. */
export function isSafeHref(value: string) {
  if (!value) return false;
  if (value.startsWith("/")) return !value.startsWith("//") && !value.includes("\\");
  try {
    return LINK_PROTOCOLS.has(new URL(value).protocol);
  } catch {
    return false;
  }
}

/** An absolute http(s) URL, e.g. the public site origin. */
export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** An image source: a same-site path or an https URL. */
export function isSafeAssetSrc(value: string) {
  if (value.startsWith("/")) return !value.startsWith("//") && !value.includes("\\") && !value.includes("..");
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
