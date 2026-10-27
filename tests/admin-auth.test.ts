import "./setup";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/admin/password";
import { passwordVersion, readSessionToken, sessionSecret, signSession } from "@/lib/admin/session";

const env = process.env as Record<string, string | undefined>;

describe("passwordProblem", () => {
  it("rejects short, default, common and username-based passwords", () => {
    assert.ok(passwordProblem("short"));
    assert.ok(passwordProblem("change-me"));
    assert.ok(passwordProblem("my-change-me-pass"));
    assert.ok(passwordProblem("password123"));
    assert.ok(passwordProblem("naresh-secure-99", "naresh"));
    assert.ok(passwordProblem("aaaaaaaaaaaaaa"));
    assert.ok(passwordProblem("x".repeat(129)));
  });

  it("accepts a long, varied password", () => {
    assert.equal(passwordProblem("Monsoon-Harbour-42-Vizag", "admin"), null);
  });
});

describe("password hashing", () => {
  it("verifies the right password only", async () => {
    const hash = await hashPassword("Monsoon-Harbour-42");
    assert.equal(await verifyPassword("Monsoon-Harbour-42", hash), true);
    assert.equal(await verifyPassword("monsoon-harbour-42", hash), false);
    assert.equal(await verifyPassword("x", "not-a-hash"), false);
  });
});

describe("session tokens", () => {
  afterEach(() => {
    delete env.ADMIN_SECRET;
    env.NODE_ENV = "test";
  });

  it("round-trips a signed token", () => {
    const token = signSession("admin", "salt:hash");
    const data = readSessionToken(token);
    assert.equal(data?.u, "admin");
    assert.equal(data?.v, passwordVersion("salt:hash"));
  });

  it("rejects forged, malformed and expired tokens", () => {
    const token = signSession("admin", "salt:hash");
    const [payload, sig] = token.split(".");
    const forged = Buffer.from(JSON.stringify({ u: "root", v: "x", exp: Date.now() + 1e9 })).toString("base64url");
    assert.equal(readSessionToken(`${forged}.${sig}`), null);
    assert.equal(readSessionToken(`${payload}.${sig}.x`), null);
    assert.equal(readSessionToken(signSession("admin", "salt:hash", Date.now() - 8 * 24 * 3600 * 1000)), null);
  });

  it("changes the version when the password hash changes", () => {
    assert.notEqual(passwordVersion("a:1"), passwordVersion("a:2"));
  });

  it("refuses to sign in production without a strong ADMIN_SECRET", () => {
    env.NODE_ENV = "production";
    assert.equal(sessionSecret(), null);
    env.ADMIN_SECRET = "change-me-to-a-long-random-string-0000";
    assert.equal(sessionSecret(), null);
    assert.throws(() => signSession("admin", "salt:hash"));
    env.ADMIN_SECRET = "f".repeat(16) + "0123456789abcdef0123";
    assert.equal(sessionSecret(), env.ADMIN_SECRET);
  });

  it("does not accept tokens signed with another secret", () => {
    env.ADMIN_SECRET = "a".repeat(20) + "1234567890abcdef";
    const token = signSession("admin", "salt:hash");
    env.ADMIN_SECRET = "b".repeat(20) + "1234567890abcdef";
    assert.equal(readSessionToken(token), null);
  });
});
