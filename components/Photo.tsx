"use client";
import Scene, { type SceneName } from "./Scenes";
import images from "@/data/images.json";

type Slots = Record<string, string>;

/**
 * One image slot. Shows the real photo uploaded in the admin (Site photos) when set,
 * otherwise the matching illustrated scene.
 */
export default function Photo({ slot, scene, alt, className = "" }: { slot?: string; scene: SceneName; alt?: string; className?: string }) {
  const src = slot ? (images as Slots)[slot] : "";
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt || ""} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return <Scene name={scene} className={className} />;
}
