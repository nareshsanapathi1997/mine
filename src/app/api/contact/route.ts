import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { insertEnquiry } from "@/lib/db";
import { deliverEnquiry } from "@/lib/deliver-enquiry";
import { validateEnquiry } from "@/lib/enquiry";
import { checkSubmitTiming, clientIp, rateLimit } from "@/lib/spam";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

function json(body: unknown, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { ...noStore, ...extraHeaders } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return json({ ok: false, message: "Invalid origin." }, 403);
      }
    } catch {
      return json({ ok: false, message: "Invalid origin." }, 403);
    }
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, message: "Could not read the enquiry." }, 400);
  }

  if (raw.length > 20_000) {
    return json({ ok: false, message: "Enquiry is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Send the enquiry as JSON." }, 400);
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  if (typeof record.fax === "string" && record.fax.trim() !== "") {
    return json({ ok: true, delivered: true });
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return json(
      { ok: false, message: "Too many enquiries from this network. Please wait a few minutes and try again." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const result = validateEnquiry(record);
  if (!result.ok) {
    return json(
      { ok: false, errors: result.errors, message: "Check the highlighted fields." },
      400,
    );
  }

  const timing = checkSubmitTiming(record.formStartedAt);
  if (!timing.ok) {
    return json({ ok: false, message: timing.message }, 400);
  }

  let stored = false;
  try {
    stored = await insertEnquiry({
      enquiry: result.data,
      sourcePage: sourcePage(request),
      userAgent: request.headers.get("user-agent") ?? "",
      ip: clientIp(request),
    });
  } catch (error) {
    console.error(
      "[contact] Could not store the enquiry.",
      error instanceof Error ? error.message : "Unknown database error",
    );
  }

  const delivery = await deliverEnquiry(result.data);
  if (!delivery.ok) {
    if (stored) {
      return json({
        ok: true,
        delivered: false,
        message: `We received your enquiry. If you do not hear back, please email ${siteConfig.email}.`,
      });
    }
    return json({ ok: false, message: delivery.message }, delivery.status);
  }

  if (!delivery.delivered) {
    return json({
      ok: true,
      delivered: false,
      message: delivery.message,
      ...(delivery.missing ? { missing: delivery.missing } : {}),
    });
  }

  return json({ ok: true, delivered: true });
}

function sourcePage(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return "";
  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`.slice(0, 500);
  } catch {
    return referer.slice(0, 500);
  }
}
