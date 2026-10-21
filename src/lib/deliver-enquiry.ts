import nodemailer from "nodemailer";
import { getSite } from "@/lib/cms";
import { enquiryAckHtml, enquiryAckText, enquiryHtml, enquiryText } from "@/lib/email/enquiry-mail";
import type { Enquiry } from "@/lib/enquiry";

const SMTP_KEYS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
] as const;

function env(name: (typeof SMTP_KEYS)[number] | "CONTACT_WEBHOOK_URL", fallback = "") {
  const value = process.env[name]?.trim() ?? "";
  if (value) return value;
  if (name === "CONTACT_WEBHOOK_URL") return "";
  return fallback;
}

function subjectSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 180);
}

export type DeliveryResult =
  | { ok: true; delivered: true }
  | { ok: true; delivered: false; message: string; missing?: string[] }
  | { ok: false; status: number; message: string };

export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const site = await getSite();
  const missing = SMTP_KEYS.filter((key) => {
    const fallback = key === "SMTP_PORT" ? "587" : key === "CONTACT_TO_EMAIL" || key === "CONTACT_FROM_EMAIL" ? site.email : "";
    return env(key, fallback) === "";
  });
  const smtpReady = missing.length === 0;
  const webhook = env("CONTACT_WEBHOOK_URL");
  const webhookReady = webhook !== "";

  if (!smtpReady && missing.length < SMTP_KEYS.length) {
    console.warn("[contact] SMTP is only partly configured, so email was skipped.", { missing });
  }

  if (!smtpReady && !webhookReady) {
    console.warn("[contact] No delivery channel is configured. Enquiry was logged and not sent.", {
      missingSmtp: missing,
      webhook: "CONTACT_WEBHOOK_URL is empty",
      enquiry,
      receivedAt: new Date().toISOString(),
    });

    const development = process.env.NODE_ENV !== "production";
    return {
      ok: true,
      delivered: false,
      message: development
        ? "Enquiry accepted in development. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL, or CONTACT_WEBHOOK_URL, to deliver it."
        : `We received your enquiry, but email delivery is not set up on this server yet. Please write to ${site.email}.`,
      ...(development ? { missing: [...missing, "CONTACT_WEBHOOK_URL"] } : {}),
    };
  }

  const delivered: string[] = [];
  const failed: string[] = [];

  if (smtpReady) {
    try {
      const port = Number(env("SMTP_PORT", "587"));
      if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("SMTP_PORT is not a valid port number.");
      }

      const transporter = nodemailer.createTransport({
        host: env("SMTP_HOST"),
        port,
        secure: port === 465,
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      });

      const from = process.env.MAIL_FROM?.trim() || env("CONTACT_FROM_EMAIL", site.email);
      const inbox = env("CONTACT_TO_EMAIL", site.email);
      const who = enquiry.company ? `${enquiry.name} (${enquiry.company})` : enquiry.name;

      await transporter.sendMail({
        from,
        to: inbox,
        replyTo: enquiry.email,
        subject: subjectSafe(`New enquiry from ${who}`),
        text: enquiryText(enquiry, site),
        html: enquiryHtml(enquiry, site),
      });

      try {
        await transporter.sendMail({
          from,
          to: enquiry.email,
          replyTo: inbox,
          subject: subjectSafe(`We received your enquiry · ${site.name}`),
          text: enquiryAckText(enquiry, site),
          html: enquiryAckHtml(enquiry, site),
        });
      } catch (error) {
        console.error(
          "[contact] Confirmation email failed.",
          error instanceof Error ? error.message : "Unknown SMTP error",
        );
      }
      delivered.push("email");
    } catch (error) {
      console.error(
        "[contact] SMTP delivery failed.",
        error instanceof Error ? error.message : "Unknown SMTP error",
      );
      failed.push("email");
    }
  }

  if (webhookReady) {
    try {
      let url: URL;
      try {
        url = new URL(webhook);
      } catch {
        throw new Error("CONTACT_WEBHOOK_URL is not a valid URL.");
      }
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        throw new Error("CONTACT_WEBHOOK_URL must use http or https.");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          source: site.name,
          receivedAt: new Date().toISOString(),
          enquiry,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}.`);
      }
      delivered.push("webhook");
    } catch (error) {
      console.error(
        "[contact] Webhook delivery failed.",
        error instanceof Error ? error.message : "Unknown webhook error",
      );
      failed.push("webhook");
    }
  }

  if (delivered.length > 0) {
    if (failed.length > 0) {
      console.warn("[contact] Enquiry delivered on one channel only.", { delivered, failed });
    } else {
      console.info("[contact] Enquiry delivered.", { delivered });
    }
    return { ok: true, delivered: true };
  }

  return {
    ok: false,
    status: 502,
    message: `We could not deliver your enquiry just now. Please try again, or email ${site.email}.`,
  };
}
