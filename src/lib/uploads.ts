import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type UploadFolder = "brand" | "content";
export type ImageType = { ext: "png" | "jpg" | "webp" | "ico"; mime: string };

export const UPLOAD_FOLDERS: readonly UploadFolder[] = ["brand", "content"];
const FILENAME = /^[a-z0-9-]{1,80}\.(png|jpg|webp|ico)$/;
/**
 * The previous upload route kept the camelCase slot name (logoLight-123.png)
 * and allowed SVG. Those files stay readable from public/uploads only. SVG is
 * served under the sandbox CSP set for /uploads in next.config.ts, so a
 * script inside one cannot run even when the file is opened directly.
 */
const LEGACY_FILENAME = /^[A-Za-z0-9-]{1,80}\.(png|jpg|jpeg|webp|ico|svg)$/;

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

/**
 * Identifies an image by its magic bytes, ignoring the browser-supplied MIME
 * type. SVG is deliberately unsupported: it can carry script and would run on
 * this origin.
 */
export function sniffImage(bytes: Uint8Array): ImageType | null {
  const at = (offset: number, ...values: number[]) => values.every((value, i) => bytes[offset + i] === value);
  if (bytes.length >= 8 && at(0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return { ext: "png", mime: MIME.png };
  if (bytes.length >= 3 && at(0, 0xff, 0xd8, 0xff)) return { ext: "jpg", mime: MIME.jpg };
  if (bytes.length >= 12 && at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) {
    return { ext: "webp", mime: MIME.webp };
  }
  if (bytes.length >= 6 && at(0, 0x00, 0x00, 0x01, 0x00) && bytes[4] + bytes[5] > 0) return { ext: "ico", mime: MIME.ico };
  return null;
}

/**
 * Where uploads are written. Set UPLOAD_DIR to a folder outside the app so
 * redeploys keep the files. Defaults to <project>/storage/uploads.
 */
export function uploadRoot() {
  const configured = process.env.UPLOAD_DIR?.trim();
  return path.resolve(configured || path.join(process.cwd(), "storage", "uploads"));
}

/** Older uploads were written under public/uploads; they are still served from there. */
function legacyRoot() {
  return path.join(process.cwd(), "public", "uploads");
}

export async function saveUpload(folder: UploadFolder, name: string, bytes: Uint8Array, type: ImageType) {
  const safeName = name.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40) || "file";
  const filename = `${safeName}-${Date.now()}-${randomBytes(4).toString("hex")}.${type.ext}`;
  const dir = path.join(uploadRoot(), folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes, { flag: "wx" });
  return `/uploads/${folder}/${filename}`;
}

/** Reads an uploaded file by URL segments. Only `<folder>/<plain filename>` is accepted, so no path traversal. */
export async function readUpload(segments: string[]) {
  if (segments.length !== 2) return null;
  const [folder, filename] = segments;
  if (!UPLOAD_FOLDERS.includes(folder as UploadFolder)) return null;
  const current = FILENAME.test(filename);
  if (!current && !LEGACY_FILENAME.test(filename)) return null;
  const ext = filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();

  for (const root of current ? [uploadRoot(), legacyRoot()] : [legacyRoot()]) {
    try {
      const bytes = await readFile(path.join(root, folder, filename));
      return { bytes, mime: MIME[ext] };
    } catch {
      /* try the next root */
    }
  }
  return null;
}
