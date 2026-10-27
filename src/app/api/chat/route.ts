import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat/knowledge";
import { getCms } from "@/lib/cms";
import { clientIp, rateLimit } from "@/lib/spam";

export const dynamic = "force-dynamic";

const MAX_TURNS = 12;
const MAX_MESSAGE_CHARS = 1000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function json(body: unknown, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}

function readMessages(body: unknown): ChatMessage[] | null {
  const list = body && typeof body === "object" ? (body as { messages?: unknown }).messages : null;
  if (!Array.isArray(list) || list.length === 0) return null;
  const messages: ChatMessage[] = [];
  for (const item of list.slice(-MAX_TURNS)) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (text) messages.push({ role, content: text });
  }
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function modelList() {
  const primary = process.env.OPENROUTER_MODEL?.trim() || "google/gemma-2-9b-it:free";
  const fallbacks = (process.env.OPENROUTER_FALLBACK_MODELS ?? "")
    .split(/[,]/)
    .map((model) => model.trim())
    .filter(Boolean);
  return [...new Set([primary, ...fallbacks])];
}

/** Some free models (Gemma) reject a system role, so fold the instructions into the first user turn. */
function payloadMessages(model: string, system: string, messages: ChatMessage[]) {
  if (!/gemma/i.test(model)) return [{ role: "system", content: system }, ...messages];
  const [first, ...rest] = messages;
  return [{ role: "user", content: `${system}\n\nVisitor: ${first.content}` }, ...rest];
}

async function complete(system: string, messages: ChatMessage[], siteUrl: string, siteName: string) {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) return { ok: false as const, reason: "missing-key" };

  const base = (process.env.OPENROUTER_BASE_URL?.trim() || "https://openrouter.ai/api/v1").replace(/\/+$/, "");
  const timeoutMs = Math.max(5, Number(process.env.OPENROUTER_TIMEOUT) || 30) * 1000;

  for (const model of modelList()) {
    try {
      const response = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": siteUrl,
          "X-Title": siteName,
        },
        body: JSON.stringify({
          model,
          messages: payloadMessages(model, system, messages),
          temperature: 0.3,
          max_tokens: 400,
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) {
        console.error(`[chat] ${model} returned ${response.status}.`);
        continue;
      }
      const data = (await response.json()) as { choices?: { message?: { content?: unknown } }[] };
      const reply = data.choices?.[0]?.message?.content;
      if (typeof reply === "string" && reply.trim()) {
        return { ok: true as const, reply: reply.trim().slice(0, 2000), model };
      }
      console.error(`[chat] ${model} returned an empty reply.`);
    } catch (error) {
      console.error(`[chat] ${model} failed.`, error instanceof Error ? error.message : "Unknown error");
    }
  }
  return { ok: false as const, reason: "unavailable" };
}

export async function POST(request: Request) {
  // Same-origin (CSRF) checks for every /api route run in src/proxy.ts.
  const limit = await rateLimit(clientIp(request), { scope: "chat", max: 30 });
  if (!limit.ok) {
    return json(
      { ok: false, message: "Too many messages. Please wait a few minutes, or WhatsApp us." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 20_000) return json({ ok: false, message: "Message is too long." }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Send the chat as JSON." }, 400);
  }

  const messages = readMessages(body);
  if (!messages) return json({ ok: false, message: "Type a question to start." }, 400);

  const cms = await getCms();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://varasena.com";
  const result = await complete(buildSystemPrompt(cms), messages, siteUrl, cms.site.name);

  if (!result.ok) {
    if (result.reason === "missing-key") console.error("[chat] OPENROUTER_API_KEY is not set.");
    return json(
      {
        ok: false,
        message: `The assistant is busy right now. Please WhatsApp or call ${cms.site.phoneDisplay}, or tap "Leave your number".`,
      },
      503,
    );
  }

  return json({ ok: true, reply: result.reply });
}
