"use client";
import Scene, { type SceneName } from "./Scenes";

const order: SceneName[] = ["reading", "play", "classroom", "outdoor", "workshop", "stage"];

/** Cover image, or an illustrated scene when no image has been uploaded yet. */
export default function Cover({ src, alt, seed = 0, className = "" }: { src?: string; alt: string; seed?: number; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return <Scene name={order[seed % order.length]} className={className} />;
}
