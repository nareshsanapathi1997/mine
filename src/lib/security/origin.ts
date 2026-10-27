const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function hostOf(value: string | null) {
  if (!value) return "";
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return "";
  }
}

/** Hosts this request may legitimately come from: Host, X-Forwarded-Host and NEXT_PUBLIC_SITE_URL. */
function allowedHosts(headers: Headers) {
  const hosts = new Set<string>();
  const host = headers.get("host")?.trim().toLowerCase();
  if (host) hosts.add(host);
  for (const forwarded of headers.get("x-forwarded-host")?.split(",") ?? []) {
    const value = forwarded.trim().toLowerCase();
    if (value) hosts.add(value);
  }
  const site = hostOf(process.env.NEXT_PUBLIC_SITE_URL ?? null);
  if (site) hosts.add(site);
  return hosts;
}

/**
 * CSRF guard for state-changing requests. Browsers always send Origin on
 * cross-site POST/PUT/DELETE, and Sec-Fetch-Site where supported. A request is
 * rejected when either header names a different site. Requests with neither
 * header (curl, server-to-server) carry no browser cookies and are allowed.
 */
export function isSameOriginRequest(method: string, headers: Headers) {
  if (SAFE_METHODS.has(method.toUpperCase())) return true;

  const fetchSite = headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;

  const origin = headers.get("origin");
  if (!origin) return true;
  if (origin === "null") return false;
  const originHost = hostOf(origin);
  return originHost !== "" && allowedHosts(headers).has(originHost);
}
