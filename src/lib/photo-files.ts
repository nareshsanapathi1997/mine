import { existsSync } from "node:fs";
import path from "node:path";
import { currentPhotoSrc } from "@/lib/photos";

/**
 * False when a photo points at a file in /public that does not exist. Lets a
 * page hide a frame (for example the team photo, until a real one is added)
 * instead of showing a broken image. Remote and /uploads URLs count as present.
 */
export function hasLocalPhoto(src: string | undefined | null) {
  if (!src) return false;
  const local = currentPhotoSrc(src).split("?")[0];
  if (!local.startsWith("/newImages/")) return true;
  return existsSync(path.join(process.cwd(), "public", local));
}
