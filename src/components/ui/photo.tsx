"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/*
 * Photos in /newImages/optimized are pre-encoded once from the client's
 * originals at WebP q90 in four widths (640, 960, 1280, full). This loader
 * points next/image's srcset at those files directly, so a photo is encoded
 * only once instead of being re-compressed by the image optimiser (which was
 * softening them). Anything else falls back to the normal optimiser.
 */
const STEPS = [640, 960, 1280];

function photoLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("/newImages/optimized/") && src.endsWith(".webp")) {
    const step = STEPS.find((w) => w >= width);
    const file = step ? src.replace(/\.webp$/, `-${step}.webp`) : src;
    return `${file}?w=${width}`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

export function Photo(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image loader={photoLoader} {...props} />;
}
