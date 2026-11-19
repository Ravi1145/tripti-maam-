/**
 * Responsive image helpers. Photos in /public/photos are exported at 1600px plus an "-800" copy,
 * so wide slots get the large file and cards/phones get the small one. Other paths (e.g. CMS
 * uploads) are used as-is.
 */
export function srcSet(src?: string): string | undefined {
  if (!src || !/^\/photos\/[^/]+\.webp$/.test(src) || src.endsWith("-800.webp") || src.includes("tripta")) return undefined;
  return `${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1600w`;
}
