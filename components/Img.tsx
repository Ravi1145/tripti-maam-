import { srcSet } from "@/lib/img";

/** Responsive photo (uses the -800 copy on small screens). */
export default function Img({ src, alt, sizes = "100vw", className = "", position = "center", priority = false }: { src: string; alt: string; sizes?: string; className?: string; position?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} srcSet={srcSet(src)} sizes={srcSet(src) ? sizes : undefined} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" style={{ objectPosition: position }} className={`h-full w-full object-cover ${className}`} />
  );
}
