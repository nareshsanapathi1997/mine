import type { CmsBundle } from "@/lib/cms";

const MAX_PROMPT_CHARS = 12_000;

function clip(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

/** Instructions plus site facts. The assistant may only answer from these facts. */
export function buildSystemPrompt(cms: CmsBundle) {
  const { site, services, details, aiAutomation, insights } = cms;

  const solutions = details
    .filter((page) => page.kind === "solution")
    .map((page) => `- ${page.name} (/solutions/${page.slug}): ${clip(page.intro, 220)}`);
  const industries = details
    .filter((page) => page.kind === "industry")
    .map((page) => `- ${page.name} (/industries/${page.slug}): ${clip(page.intro, 180)}`);
  const serviceLines = services.map((item) => `- ${item.title}: ${clip(item.description, 200)}`);
  const faqs = [...aiAutomation.faqs, ...insights.faqs, ...details.flatMap((page) => page.faqs.slice(0, 1))]
    .slice(0, 16)
    .map((item) => `Q: ${clip(item.q, 140)}\nA: ${clip(item.a, 260)}`);

  const prompt = `You are the website assistant for ${site.name}, a software company in Visakhapatnam (Vizag), Andhra Pradesh, India.
${site.name} builds websites, mobile apps, business software, WhatsApp automation, AI assistants, phone assistants, automation, and hosting and support for schools, colleges, hotels, factories, clinics and small businesses.

Rules:
- Answer only from the facts below. If the answer is not there, say you are not sure and offer to connect the visitor with the team.
- Never invent prices, timelines, discounts, client names or results. For cost questions, say it depends on the work, the first call is free, and the team sends a written plan with the cost.
- Keep replies short: two to four sentences, plain text, no markdown, no tables.
- When a page helps, mention its path, for example /solutions/web-development or /contact.
- Reply in the visitor's language (English, Telugu or Hindi).
- When the visitor wants to start, a quote or a call, ask them to tap "Leave your number" in this chat, or WhatsApp ${site.phoneDisplay}.
- Do not give medical, legal or financial advice. Stay polite and on topic.

Contact: phone and WhatsApp ${site.phoneDisplay}${site.altPhoneDisplay ? `, alternate phone ${site.altPhoneDisplay}` : ""}, email ${site.email}, support ${site.supportEmail}. Contact page: /contact.

Services:
${serviceLines.join("\n")}

Solutions:
${solutions.join("\n")}

Industries:
${industries.join("\n")}

Common questions:
${faqs.join("\n")}`;

  return prompt.slice(0, MAX_PROMPT_CHARS);
}
