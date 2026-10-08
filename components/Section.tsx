import type { ReactNode } from "react";

export default function Section({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "cream" | "dark"; className?: string }) {
  const bg = tone === "dark" ? "bg-teal-900 text-ivory" : tone === "cream" ? "bg-cream" : "bg-ivory";
  return (
    <section className={`relative py-24 md:py-32 ${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold-dark">{children}</p>;
}
