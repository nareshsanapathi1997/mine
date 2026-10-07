export const INDUSTRIES = [
  "Education",
  "Hospitality",
  "Manufacturing",
  "Healthcare",
  "Corporate / SME",
  "Professional Services",
  "Other",
] as const;

export const BUDGETS = [
  "₹50K – ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹5L",
  "₹5L+",
  "Not sure",
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

  if (data.company && !companyPattern.test(data.company)) {
    errors.company = "Enter your company or institution name.";
  }

  if (!emailPattern.test(data.email) || data.email.length > 120) {
    errors.email = "Enter a valid work email address.";
  }

  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "");
    if (!/^[0-9+\-\s()]{7,20}$/.test(data.phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = "Enter a phone number with at least 7 digits.";
    }
  }

  if (data.industry && !INDUSTRIES.includes(data.industry as (typeof INDUSTRIES)[number])) {
    errors.industry = "Select an industry.";
  }

  if (data.need.length < 3 && data.message.length >= 3) {
    data.need = data.message.slice(0, 160);
  }

  if (data.need.length < 3 || data.need.length > 160) {
    errors.need = "Tell us what you are trying to improve.";
  }

  if (data.budget && !BUDGETS.includes(data.budget as (typeof BUDGETS)[number])) {
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
