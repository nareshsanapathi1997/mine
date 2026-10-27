"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import { PHOTO_VERSION, currentPhotoSrc } from "@/lib/photos";

/*
 * Photos in /newImages/optimized are pre-encoded once by `npm run photos`
 * (scripts/photos.mjs) in four widths (640, 960, 1280, 1600). This loader
 * points next/image's srcset at those files directly, so a photo is encoded
 * only once instead of being re-compressed by the image optimiser (which was
 * softening them). Anything else falls back to the normal optimiser.
 */
const STEPS = [640, 960, 1280];

function photoLoader({ src, width, quality }: ImageLoaderProps) {
  src = currentPhotoSrc(src);
  if (src.startsWith("/newImages/optimized/") && src.endsWith(".webp")) {
    const step = STEPS.find((w) => w >= width);
    const file = step ? src.replace(/\.webp$/, `-${step}.webp`) : src;
    return `${file}?w=${width}&v=${PHOTO_VERSION}`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

export function Photo(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image loader={photoLoader} {...props} />;
}
