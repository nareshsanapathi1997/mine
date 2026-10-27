import "./setup";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { checkSubmitTiming, clientIp, rateLimit, resetRateLimit } from "@/lib/spam";

function req(headers: Record<string, string>) {
  return new Request("http://localhost/api/contact", { method: "POST", headers });
}

describe("clientIp", () => {
  afterEach(() => {
    delete process.env.TRUSTED_PROXY_HOPS;
    delete process.env.CLIENT_IP_HEADER;
  });

  it("ignores a spoofed leftmost X-Forwarded-For entry", () => {
    assert.equal(clientIp(req({ "x-forwarded-for": "6.6.6.6, 203.0.113.9" })), "203.0.113.9");
  });

  it("counts hops from the right", () => {
    process.env.TRUSTED_PROXY_HOPS = "2";
    assert.equal(clientIp(req({ "x-forwarded-for": "6.6.6.6, 203.0.113.9, 10.0.0.2" })), "203.0.113.9");
  });

  it("uses CLIENT_IP_HEADER when configured", () => {
    process.env.CLIENT_IP_HEADER = "cf-connecting-ip";
    assert.equal(clientIp(req({ "cf-connecting-ip": "198.51.100.4", "x-forwarded-for": "1.1.1.1" })), "198.51.100.4");
  });

  it("rejects values that are not IPs", () => {
    assert.equal(clientIp(req({ "x-forwarded-for": "<script>" })), "unknown");
  });

  it("ignores forwarding headers when TRUSTED_PROXY_HOPS=0", () => {
    process.env.TRUSTED_PROXY_HOPS = "0";
    assert.equal(clientIp(req({ "x-forwarded-for": "203.0.113.9", "x-real-ip": "203.0.113.9" })), "unknown");
  });
});

describe("rateLimit (memory store)", () => {
  it("allows up to max hits then blocks with retryAfter", async () => {
    const key = `ip-${Math.random()}`;
    for (let i = 0; i < 3; i += 1) assert.equal((await rateLimit(key, { scope: "t", max: 3 })).ok, true);
    const blocked = await rateLimit(key, { scope: "t", max: 3 });
    assert.equal(blocked.ok, false);
    if (!blocked.ok) assert.ok(blocked.retryAfter > 0);
  });

  it("keeps scopes separate and can be reset", async () => {
    const key = `ip-${Math.random()}`;
    await rateLimit(key, { scope: "a", max: 1 });
    assert.equal((await rateLimit(key, { scope: "a", max: 1 })).ok, false);
    assert.equal((await rateLimit(key, { scope: "b", max: 1 })).ok, true);
    await resetRateLimit(key, "a");
    assert.equal((await rateLimit(key, { scope: "a", max: 1 })).ok, true);
  });

  it("starts a new window after expiry", async () => {
    const key = `ip-${Math.random()}`;
    await rateLimit(key, { scope: "w", max: 1, windowMs: 20 });
    await new Promise((resolve) => setTimeout(resolve, 40));
    assert.equal((await rateLimit(key, { scope: "w", max: 1, windowMs: 20 })).ok, true);
  });
});

describe("checkSubmitTiming", () => {
  it("rejects missing, too fast, future and stale timestamps", () => {
    assert.equal(checkSubmitTiming(undefined).ok, false);
    assert.equal(checkSubmitTiming(Date.now()).ok, false);
    assert.equal(checkSubmitTiming(Date.now() - 13 * 60 * 60 * 1000).ok, false);
    assert.equal(checkSubmitTiming(Date.now() + 60_000).ok, false);
  });

  it("accepts a normal fill time", () => {
    assert.equal(checkSubmitTiming(Date.now() - 10_000).ok, true);
  });
});
