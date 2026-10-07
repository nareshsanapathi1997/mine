import { createHash } from "node:crypto";
import type { Enquiry } from "@/lib/enquiry";
import { getPool } from "@/lib/db/pool";

export type EnquiryRecord = {
  enquiry: Enquiry;
  sourcePage: string;
  userAgent: string;
  ip: string;
};

function ipHash(ip: string) {
  return createHash("sha256").update(ip.slice(0, 64)).digest("hex");
}

/** Insert one enquiry. Returns false when Postgres is not configured. Throws on a query failure. */
export async function insertEnquiry(record: EnquiryRecord) {
  const pool = getPool();
  if (!pool) {
    console.warn("[db] Postgres is not configured. Enquiry was not stored.");
    return false;
  }

  await pool.query(
    `insert into enquiries (
      name, company, email, phone, industry, need, budget_range, message, source_page, user_agent, ip_hash
    ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      record.enquiry.name,
      record.enquiry.company || null,
      record.enquiry.email,
      record.enquiry.phone || null,
      record.enquiry.industry || null,
      record.enquiry.need,
      record.enquiry.budget || null,
      record.enquiry.message,
      record.sourcePage.slice(0, 500),
      record.userAgent.slice(0, 500),
      ipHash(record.ip || "unknown"),
    ],
  );
  return true;
}
