import "./setup";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";
import { builtInPhotoAlt, currentAltFor } from "@/content/new-images";
import { alternatePhone } from "@/content/site";
import { throttleKey } from "@/lib/admin/users";
import { validateEnquiry } from "@/lib/enquiry";
import { readUpload } from "@/lib/uploads";

describe("throttleKey", () => {
  it("maps case, accent and full-width variants of a username to one key", () => {
    for (const variant of ["admin", "ADMIN", "ádmin", "àdmïn", "ＡＤＭＩＮ"]) assert.equal(throttleKey(variant), "admin");
  });
});

describe("currentAltFor", () => {
  const src = "/newImages/optimized/customer-support-desk.webp";
  const fresh = builtInPhotoAlt(src)!;

  it("replaces empty and old default descriptions of built-in photos", () => {
    assert.equal(currentAltFor(src, ""), fresh);
    assert.equal(currentAltFor(src, "A support executive wearing a headset, smiling while working on a laptop"), fresh);
  });

  it("keeps a description an admin wrote", () => {
    assert.equal(currentAltFor(src, "Our support desk in Vizag"), "Our support desk in Vizag");
  });

  it("leaves other images alone", () => {
    assert.equal(currentAltFor("/uploads/content/photo-1.png", ""), "");
  });
});

describe("alternatePhone", () => {
  const base = { phoneDisplay: "+91 73375 03431", altPhoneHref: "" };

  it("hides the alternate when it is the main number in any format", () => {
    for (const alt of ["+91 73375 03431", "073375 03431", "7337503431", "+91-73375-03431"]) {
      assert.equal(alternatePhone({ ...base, altPhoneDisplay: alt }), null, alt);
    }
  });

  it("shows a different number with a tel: link", () => {
    assert.deepEqual(alternatePhone({ ...base, altPhoneDisplay: "+91 88863 62977" }), {
      display: "+91 88863 62977",
      href: "tel:+918886362977",
    });
    assert.equal(alternatePhone({ ...base, altPhoneDisplay: "" }), null);
  });
});

describe("enquiry email validation", () => {
  const valid = {
    name: "Ravi Kumar",
    email: "ravi@sunrise.example",
    need: "Admissions automation",
    message: "We get about 200 admission enquiries a month on WhatsApp.",
  };

  it("rejects addresses that could add mailto parameters or headers", () => {
    for (const email of ["a@b.co?bcc=x@evil.test", "a@b.co&cc=x", "\"a\"@b.co", "a@b.co>", "a@b"]) {
      assert.equal(validateEnquiry({ ...valid, email }).ok, false, email);
    }
  });

  it("accepts ordinary work addresses", () => {
    for (const email of ["ravi@sunrise.example", "ravi.kumar+admissions@school.co.in"]) {
      assert.equal(validateEnquiry({ ...valid, email }).ok, true, email);
    }
  });
});

describe("readUpload roots", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "uploads-"));
  const previous = process.env.UPLOAD_DIR;
  process.env.UPLOAD_DIR = dir;
  mkdirSync(path.join(dir, "brand"));
  writeFileSync(path.join(dir, "brand", "logolight-1-abcd.png"), "png");
  writeFileSync(path.join(dir, "brand", "logoLight-1.png"), "png");

  after(() => {
    rmSync(dir, { recursive: true, force: true });
    if (previous === undefined) delete process.env.UPLOAD_DIR;
    else process.env.UPLOAD_DIR = previous;
  });

  it("serves new lowercase uploads from UPLOAD_DIR", async () => {
    const file = await readUpload(["brand", "logolight-1-abcd.png"]);
    assert.equal(file?.mime, "image/png");
  });

  it("reads legacy camelCase names only from public/uploads, never from UPLOAD_DIR", async () => {
    assert.equal(await readUpload(["brand", "logoLight-1.png"]), null);
  });
});
