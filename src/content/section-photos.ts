export type SectionPhoto = {
  src: string;
  alt: string;
  /** Natural size. When set, the image is shown at its own aspect ratio (no crop). */
  width?: number;
  height?: number;
};
