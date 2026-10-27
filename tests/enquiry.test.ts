import "./setup";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateEnquiry } from "@/lib/enquiry";

const valid = {
  name: "Ravi Kumar",
  company: "Sunrise School",
  email: "ravi@sunrise.example",
  phone: "+91 98765 43210",
  need: "Admissions automation",
  message: "We get about 200 admission enquiries a month on WhatsApp.",
};

describe("validateEnquiry", () => {
  it("accepts a complete enquiry and trims fields", () => {
    const result = validateEnquiry({ ...valid, name: "  Ravi Kumar  " });
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.data.name, "Ravi Kumar");
  });

  it("flags each invalid field", () => {
    const result = validateEnquiry({ ...valid, email: "nope", phone: "12", message: "short", industry: "Casino" });
    assert.equal(result.ok, false);
    if (!result.ok) assert.deepEqual(Object.keys(result.errors).sort(), ["email", "industry", "message", "phone"]);
  });

  it("handles non-object input", () => {
    assert.equal(validateEnquiry(null).ok, false);
    assert.equal(validateEnquiry("x").ok, false);
  });
});
