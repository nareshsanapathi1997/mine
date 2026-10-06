export const INDUSTRIES = [
  "Education",
  "Hospitality",
  "Manufacturing",
  "Healthcare",
  "Corporate / SME",
  "Other",
] as const;

export const BUDGETS = [
  "Under ₹1 Lakh",
  "₹1–5 Lakhs",
  "₹5–10 Lakhs",
  "₹10–25 Lakhs",
  "₹25 Lakhs+",
] as const;

export const ENQUIRY_FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "industry",
  "need",
  "budget",
  "message",
] as const;

export type EnquiryField = (typeof ENQUIRY_FIELDS)[number];

export type Enquiry = Record<EnquiryField, string>;

export type FieldErrors = Partial<Record<EnquiryField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]{1,79}$/u;
const companyPattern = /^[\p{L}\p{M}0-9][\p{L}\p{M}0-9\s.&,'’()-]{1,119}$/u;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function emptyEnquiry(need = ""): Enquiry {
  return {
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    need: need.trim().slice(0, 160),
    budget: "",
    message: "",
  };
}

export function validateEnquiry(input: unknown):
  | { ok: true; data: Enquiry }
  | { ok: false; errors: FieldErrors } {
  const source =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const data: Enquiry = {
    name: text(source.name),
    company: text(source.company),
    email: text(source.email),
    phone: text(source.phone),
    industry: text(source.industry),
    need: text(source.need),
    budget: text(source.budget),
    message: text(source.message),
  };

  const errors: FieldErrors = {};

  if (!namePattern.test(data.name)) {
    errors.name = "Enter your name using letters, spaces or hyphens.";
  }

  if (!companyPattern.test(data.company)) {
    errors.company = "Enter your company or institution name.";
  }

  if (!emailPattern.test(data.email) || data.email.length > 120) {
    errors.email = "Enter a valid email address.";
  }

  const digits = data.phone.replace(/\D/g, "");
  if (!/^[0-9+\-\s()]{7,20}$/.test(data.phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = "Enter a phone number with at least 7 digits.";
  }

  if (!INDUSTRIES.includes(data.industry as (typeof INDUSTRIES)[number])) {
    errors.industry = "Select an industry.";
  }

  if (data.need.length < 3 || data.need.length > 160) {
    errors.need = "Tell us what you need help with, in a short phrase.";
  }

  if (!BUDGETS.includes(data.budget as (typeof BUDGETS)[number])) {
    errors.budget = "Select a budget range.";
  }

  if (data.message.length < 20 || data.message.length > 2000) {
    errors.message = "Add a short description of the problem (at least 20 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}
