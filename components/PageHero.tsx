import type { ReactNode } from "react";
import Img from "./Img";

export { default as ReviewBanner } from "./ReviewBanner";

export function Orbs({ tint = "violet" }: { tint?: string }) {
  const a = tint === "coral" ? "bg-coral-tint" : tint === "mint" ? "bg-mint-tint" : tint === "sun" ? "bg-sun-tint" : tint === "sky" ? "bg-sky-tint" : "bg-violet-tint";
  return (
    <>
      <div aria-hidden className={`orb orb-1 -left-24 top-10 h-72 w-72 ${a} opacity-80`} />
      <div aria-hidden className="orb orb-2 -right-20 top-40 h-80 w-80 bg-saffron-tint opacity-90" />
      <div aria-hidden className="orb orb-1 bottom-0 left-1/3 h-52 w-52 bg-sun-tint opacity-70" />
    </>
  );
}

/** Light page header: a heading with an optional highlighted phrase, and an optional photo card. */
export default function PageHero({ eyebrow, title, highlight, sub, image, imageAlt = "", tint = "violet", children }: {
  eyebrow: string; title: string; highlight?: string; sub?: string; image?: string; imageAlt?: string; tint?: string; children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
      <Orbs tint={tint} />
      <div className={`relative mx-auto grid max-w-6xl items-center gap-12 px-6 ${image ? "lg:grid-cols-12" : ""}`}>
        <div className={image ? "lg:col-span-7" : "max-w-3xl"}>
          <p className="eyebrow rise">{eyebrow}</p>
          <h1 className="rise mt-4 text-[2.5rem] md:text-6xl" style={{ ["--d" as string]: "0.08s" }}>
            {title}{highlight && <> <span className="hl">{highlight}</span></>}
          </h1>
          {sub && <p className="rise mt-6 max-w-2xl text-lg text-ink-soft md:text-xl" style={{ ["--d" as string]: "0.18s" }}>{sub}</p>}
          {children && <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "0.28s" }}>{children}</div>}
        </div>
        {image && (
          <div className="rise lg:col-span-5" style={{ ["--d" as string]: "0.2s" }}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-saffron-tint" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift"><Img src={image} alt={imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" priority /></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
