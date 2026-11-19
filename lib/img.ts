/**
 * Responsive image helpers. Photos in /public/photos are exported at 1600px plus an "-800" copy,
 * so wide slots get the large file and cards/phones get the small one. Other paths (e.g. CMS
 * uploads) are used as-is.
 */
export function srcSet(src?: string): string | undefined {
  if (!src || !/^\/photos\/[^/]+\.webp$/.test(src) || src.endsWith("-800.webp") || src.includes("tripta")) return undefined;
  return `${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1600w`;
}

/** Stock photo (Unsplash licence) for each age guide, in order birth to eight. */
const AGE_SLUGS = ["birth-to-12-months", "1-to-2", "2-to-3", "3-to-4", "4-to-5", "5-to-6", "6-to-7", "7-to-8"];
export const agePhoto = (slug?: string) => { const i = AGE_SLUGS.indexOf(slug ?? ""); return i < 0 ? undefined : `/photos/kid-age-${i}.webp`; };
