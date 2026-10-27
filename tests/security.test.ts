import "./setup";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isSameOriginRequest } from "@/lib/security/origin";
import { isHttpUrl, isSafeAssetSrc, isSafeHref } from "@/lib/security/urls";
import { readUpload, sniffImage } from "@/lib/uploads";
import { mergeContent } from "@/lib/cms/merge";

const h = (init: Record<string, string>) => new Headers(init);
const bytes = (text: string) => new TextEncoder().encode(text);

describe("isSameOriginRequest", () => {
  it("allows safe methods and same-origin writes", () => {
    assert.equal(isSameOriginRequest("GET", h({ origin: "https://evil.test", host: "varasena.com" })), true);
    assert.equal(isSameOriginRequest("POST", h({ origin: "https://varasena.com", host: "varasena.com" })), true);
    assert.equal(isSameOriginRequest("POST", h({ host: "varasena.com" })), true);
  });

  it("accepts the public host behind a proxy", () => {
    const headers = h({ origin: "https://varasena.com", host: "127.0.0.1:3000", "x-forwarded-host": "varasena.com" });
    assert.equal(isSameOriginRequest("PUT", headers), true);
  });

  it("blocks cross-site writes", () => {
    assert.equal(isSameOriginRequest("POST", h({ origin: "https://evil.test", host: "varasena.com" })), false);
    assert.equal(isSameOriginRequest("POST", h({ origin: "null", host: "varasena.com" })), false);
    assert.equal(isSameOriginRequest("DELETE", h({ "sec-fetch-site": "cross-site", host: "varasena.com" })), false);
  });
});

describe("url checks", () => {
  it("allows normal links and blocks script URLs", () => {
    assert.equal(isSafeHref("https://wa.me/919999999999"), true);
    assert.equal(isSafeHref("tel:+919999999999"), true);
    assert.equal(isSafeHref("/contact"), true);
    assert.equal(isSafeHref("javascript:alert(1)"), false);
    assert.equal(isSafeHref("JaVaScRiPt:alert(1)"), false);
    assert.equal(isSafeHref("data:text/html,x"), false);
    assert.equal(isSafeHref("//evil.test"), false);
    assert.equal(isHttpUrl("ftp://x"), false);
    assert.equal(isSafeAssetSrc("/uploads/brand/logo.png"), true);
    assert.equal(isSafeAssetSrc("/../etc/passwd"), false);
    assert.equal(isSafeAssetSrc("http://insecure.test/a.png"), false);
  });
});

describe("uploads", () => {
  it("identifies images by content, not by name", () => {
    assert.equal(sniffImage(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0]))?.ext, "png");
    assert.equal(sniffImage(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))?.ext, "jpg");
    assert.equal(sniffImage(new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]))?.ext, "webp");
    assert.equal(sniffImage(bytes("<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>")), null);
    assert.equal(sniffImage(bytes("<html>")), null);
  });

  it("refuses path traversal, unknown folders and SVG", async () => {
    assert.equal(await readUpload(["..", "package.json"]), null);
    assert.equal(await readUpload(["brand", "..%2F.env"]), null);
    assert.equal(await readUpload(["secrets", "a.png"]), null);
    assert.equal(await readUpload(["brand", "logo.svg"]), null);
    assert.equal(await readUpload(["brand", "a", "b.png"]), null);
  });
});

describe("mergeContent", () => {
  it("merges objects, replaces arrays and keeps defaults for null", () => {
    const base = { a: { b: 1, c: 2 }, list: [1, 2], keep: "x" };
    const merged = mergeContent(base, { a: { c: 3 }, list: [9], keep: null });
    assert.deepEqual(merged, { a: { b: 1, c: 3 }, list: [9], keep: "x" });
  });

  it("ignores prototype-pollution keys", () => {
    const merged = mergeContent({ a: 1 }, JSON.parse('{"__proto__": {"polluted": true}}')) as Record<string, unknown>;
    assert.equal(merged.polluted, undefined);
    assert.equal(({} as Record<string, unknown>).polluted, undefined);
  });
});
