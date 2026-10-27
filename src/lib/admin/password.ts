import { promisify } from "node:util";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const scryptAsync = promisify(scrypt);

export const PASSWORD_MIN = 12;
/** Caps scrypt input so a huge password cannot be used to burn CPU. */
export const PASSWORD_MAX = 128;

const COMMON = new Set([
  "change-me",
  "changeme",
  "password",
  "password1",
  "password123",
  "admin",
  "admin123",
  "administrator",
  "qwerty123",
  "letmein",
  "welcome",
  "welcome123",
  "123456789012",
  "varasena",
  "varasena123",
]);

/** Returns a reason the password is too weak, or null when it is acceptable. */
export function passwordProblem(password: string, username = ""): string | null {
  if (password.length < PASSWORD_MIN) return `Use at least ${PASSWORD_MIN} characters.`;
  if (password.length > PASSWORD_MAX) return `Use at most ${PASSWORD_MAX} characters.`;
  const lower = password.toLowerCase();
  if (COMMON.has(lower) || lower.includes("change-me")) return "That password is too common. Pick another.";
  if (username && lower.includes(username.toLowerCase())) return "Do not include your username in the password.";
  if (new Set(password).size < 5) return "Use a less repetitive password.";
  return null;
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  if (password.length > PASSWORD_MAX) return false;
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = (await scryptAsync(password, salt, 64)) as Buffer;
  const prev = Buffer.from(hash, "hex");
  if (prev.length !== next.length) return false;
  return timingSafeEqual(prev, next);
}

/** A valid-format hash of a random password, used to keep timing equal for unknown usernames. */
let dummyHash: Promise<string> | undefined;
export function timingDummyHash() {
  dummyHash ??= hashPassword(randomBytes(16).toString("hex"));
  return dummyHash;
}
