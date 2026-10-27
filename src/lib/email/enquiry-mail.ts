import type { SiteConfig } from "@/content/site";
import type { Enquiry } from "@/lib/enquiry";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dash(value: string) {
  return value.trim() ? value.trim() : "—";
}

function origin(site: SiteConfig) {
  return site.url.replace(/\/$/, "");
}

function logoUrl(site: SiteConfig) {
  return `${origin(site)}${site.brand.logoDark}`;
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

function rows(enquiry: Enquiry) {
  return [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Industry", enquiry.industry],
    ["Need", enquiry.need],
    ["Budget", enquiry.budget],
  ] as const;
}

export function enquiryText(enquiry: Enquiry, site: SiteConfig) {
  const lines = rows(enquiry).map(([label, value]) => `${label}: ${dash(value)}`);
  return [
    `New enquiry for ${site.name}`,
    "",
    ...lines,
    "",
    "Message",
    enquiry.message,
    "",
    `Reply to ${enquiry.email}`,
  ].join("\n");
}

export function enquiryAckText(enquiry: Enquiry, site: SiteConfig) {
  return [
    `Hello ${enquiry.name},`,
    "",
    `We received your enquiry at ${site.name}. We will read it and reply to ${enquiry.email}.`,
    "",
    site.phoneDisplay ? `Phone: ${site.phoneDisplay}` : "",
    `Email: ${site.email}`,
    site.location ? site.location : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function shell(site: SiteConfig, inner: string) {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(site.name)}</title>
</head>
<body style="margin:0;padding:0;background:#050d22;color:#f4f8ff;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050d22;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#0d1a33;border:1px solid rgba(196,214,255,0.12);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 20px;background:#071b45;border-bottom:1px solid rgba(0,212,232,0.28);">
              <img src="${esc(logoUrl(site))}" alt="${esc(site.name)}" width="180" style="display:block;max-width:180px;height:auto;border:0;" />
            </td>
          </tr>
          ${inner}
          <tr>
            <td style="padding:18px 32px 28px;color:#9ba9c3;font-size:12px;line-height:1.5;">
              ${esc(site.name)}${site.location ? ` · ${esc(site.location)}` : ""}<br />
              ${esc(site.email)}${site.phoneDisplay ? ` · ${esc(site.phoneDisplay)}` : ""}<br />
              © ${year} ${esc(site.name)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string, href?: string) {
  const display = esc(dash(value));
  const body = href && value.trim()
    ? `<a href="${esc(href)}" style="color:#7af0ff;text-decoration:none;">${display}</a>`
    : display;
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(196,214,255,0.08);width:120px;color:#a9b6ce;font-size:13px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid rgba(196,214,255,0.08);color:#f4f8ff;font-size:14px;font-weight:600;vertical-align:top;">${body}</td>
  </tr>`;
}

function button(href: string, label: string, fill: boolean) {
  const bg = fill ? "#0B6BFF" : "transparent";
  const color = fill ? "#ffffff" : "#7af0ff";
  const border = fill ? "#0B6BFF" : "rgba(122,240,255,0.45)";
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border-radius:10px;border:1px solid ${border};background:${bg};color:${color};font-size:13px;font-weight:700;text-decoration:none;">${esc(label)}</a>`;
}

export function enquiryHtml(enquiry: Enquiry, site: SiteConfig) {
  const mail = `mailto:${encodeURIComponent(enquiry.email)}?subject=${encodeURIComponent(`Re: your enquiry to ${site.name}`)}`;
  const digits = phoneDigits(enquiry.phone);
  const tel = enquiry.phone ? `tel:${enquiry.phone.replace(/\s/g, "")}` : "";
  const wa = digits ? `https://wa.me/${digits.startsWith("91") ? digits : `91${digits}`}` : site.whatsappHref;

  const inner = `<tr>
    <td style="padding:28px 32px 8px;">
      <p style="margin:0 0 8px;color:#7af0ff;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">New enquiry</p>
      <h1 style="margin:0 0 8px;color:#f4f8ff;font-size:24px;line-height:1.25;font-weight:700;">${esc(enquiry.name)}</h1>
      <p style="margin:0;color:#a9b6ce;font-size:14px;line-height:1.5;">${esc(enquiry.need || "New website enquiry")}${enquiry.company ? ` · ${esc(enquiry.company)}` : ""}</p>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 32px 8px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        ${fieldRow("Name", enquiry.name)}
        ${fieldRow("Company", enquiry.company)}
        ${fieldRow("Email", enquiry.email, `mailto:${encodeURIComponent(enquiry.email)}`)}
        ${fieldRow("Phone", enquiry.phone, tel || undefined)}
        ${fieldRow("Industry", enquiry.industry)}
        ${fieldRow("Need", enquiry.need)}
        ${fieldRow("Budget", enquiry.budget)}
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 32px 8px;">
      <p style="margin:0 0 8px;color:#a9b6ce;font-size:13px;">Message</p>
      <div style="padding:16px 18px;border-radius:12px;background:#13223f;border:1px solid rgba(196,214,255,0.08);color:#f4f8ff;font-size:14px;line-height:1.65;white-space:pre-wrap;">${esc(enquiry.message)}</div>
    </td>
  </tr>
  <tr>
    <td style="padding:22px 32px 8px;">
      ${button(mail, "Reply by email", true)}
      ${enquiry.phone ? button(wa, "WhatsApp", false) : ""}
    </td>
  </tr>`;

  return shell(site, inner);
}

export function enquiryAckHtml(enquiry: Enquiry, site: SiteConfig) {
  const inner = `<tr>
    <td style="padding:28px 32px 8px;">
      <p style="margin:0 0 8px;color:#7af0ff;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Enquiry received</p>
      <h1 style="margin:0 0 10px;color:#f4f8ff;font-size:24px;line-height:1.25;font-weight:700;">Thank you, ${esc(enquiry.name)}.</h1>
      <p style="margin:0;color:#a9b6ce;font-size:14px;line-height:1.6;">We have your message. Someone from ${esc(site.name)} will reply to <a href="mailto:${esc(encodeURIComponent(enquiry.email))}" style="color:#7af0ff;text-decoration:none;">${esc(enquiry.email)}</a>.</p>
    </td>
  </tr>
  <tr>
    <td style="padding:22px 32px 8px;">
      ${button(`${origin(site)}/contact`, "Visit the website", true)}
      ${site.whatsappHref ? button(site.whatsappHref, "WhatsApp us", false) : ""}
    </td>
  </tr>`;

  return shell(site, inner);
}
