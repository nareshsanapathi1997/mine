/**
 * Builds the site's banner photos from originals.
 *
 *   npm run photos                 every photo that has an original
 *   npm run photos -- <name> ...   only these, e.g. varasena-founders
 *
 * Originals live in photos/source/<name>.(jpg|jpeg|png|webp) and are not
 * committed. Each is cropped to 16:9 and written to public/newImages/optimized
 * as <name>.webp (1600 wide) plus -640, -960 and -1280 variants, the sizes the
 * <Photo> loader asks for. photos/credits.json records where every photo came
 * from; an optional "position" there steers the crop (centre, top, bottom,
 * left, right, attention) and "quality" (default 85) trims very detailed
 * photos. After replacing photos, bump PHOTO_VERSION in src/lib/photos.ts so
 * returning visitors skip their cached copies.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "photos", "source");
const outDir = path.join(root, "public", "newImages", "optimized");
const credits = JSON.parse(readFileSync(path.join(root, "photos", "credits.json"), "utf8"));

const WIDTHS = [640, 960, 1280];
const FULL = 1600;
const QUALITY = 85;

function findSource(name) {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const file = path.join(sourceDir, `${name}.${ext}`);
    if (existsSync(file)) return file;
  }
  return null;
}

async function build(entry) {
  const file = findSource(entry.name);
  if (!file) return { name: entry.name, skipped: "no original in photos/source" };

  const { width, height } = await sharp(file).metadata();
  if (!width || !height) throw new Error(`${entry.name}: unreadable image`);
  const cropWidth = Math.min(width, Math.round((height * 16) / 9));
  const cropHeight = Math.round((cropWidth * 9) / 16);
  const position = entry.position ?? "centre";
  const full = Math.min(FULL, cropWidth);

  const base = sharp(file).rotate().resize(cropWidth, cropHeight, { fit: "cover", position });
  const cropped = await base.toBuffer();
  const write = (w, suffix) =>
    sharp(cropped)
      .resize(w, Math.round((w * 9) / 16))
      .webp({ quality: entry.quality ?? QUALITY, smartSubsample: true })
      .toFile(path.join(outDir, `${entry.name}${suffix}.webp`));

  const results = [await write(full, "")];
  for (const w of WIDTHS) results.push(await write(Math.min(w, full), `-${w}`));
  return { name: entry.name, kb: results.map((r) => Math.round(r.size / 1024)) };
}

const only = process.argv.slice(2);
const entries = only.length ? credits.filter((entry) => only.includes(entry.name)) : credits;
for (const name of only) {
  if (!credits.some((entry) => entry.name === name)) console.warn(`No credits.json entry for "${name}". Add one first.`);
}

for (const entry of entries) {
  const result = await build(entry);
  console.log(result.skipped ? `- ${result.name}: ${result.skipped}` : `✓ ${result.name}  ${result.kb.join(" / ")} KB`);
}
