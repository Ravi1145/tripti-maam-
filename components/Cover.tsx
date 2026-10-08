"use client";
import { ART, type ArtName } from "./Art";

const order: ArtName[] = ["kite", "blocks", "pages", "steps", "tree", "stage"];

/** Cover image, or an illustrated placeholder when no image has been uploaded yet. */
export default function Cover({ src, alt, seed = 0, className = "" }: { src?: string; alt: string; seed?: number; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  const Art = ART[order[seed % order.length]];
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-900 to-teal-950 p-6 ${className}`}>
      <Art className="h-full max-h-64 w-full" />
    </div>
  );
}
