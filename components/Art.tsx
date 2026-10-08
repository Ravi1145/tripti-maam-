"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const C = { teal: "#1F6F6B", tealL: "#3F9A93", sage: "#A9CBB7", gold: "#C9A24B", goldL: "#E6CF91", coral: "#E8896B", ivory: "#FBF7EF", deep: "#0F3D3E" };

/** Gently bobbing wrapper; static under reduced motion. */
function Float({ children, d = 0, amp = 10, dur = 6 }: { children: ReactNode; d?: number; amp?: number; dur?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g animate={{ y: [0, -amp, 0] }} transition={{ duration: dur, delay: d, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.g>
  );
}

/** Drops in from above when first seen. */
function Drop({ children, i = 0 }: { children: ReactNode; i?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g initial={{ y: -80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 90, damping: 11, delay: 0.2 + i * 0.18 }}>
      {children}
    </motion.g>
  );
}

function Draw({ d, stroke, w = 3, delay = 0, dash }: { d: string; stroke: string; w?: number; delay?: number; dash?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
      initial={reduce ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, delay, ease: "easeInOut" }}
    />
  );
}

function Frame({ children, label, vb = "0 0 480 520", className = "" }: { children: ReactNode; label: string; vb?: string; className?: string }) {
  return (
    <svg viewBox={vb} className={className} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

/** Stacked play-blocks: the signature hero graphic. */
export function BlocksArt({ className = "" }: { className?: string }) {
  return (
    <Frame label="Illustration of colourful stacked play blocks" className={className}>
      <ellipse cx="240" cy="486" rx="200" ry="14" fill="#000" opacity=".18" />
      <motion.circle cx="240" cy="250" r="215" fill="none" stroke={C.gold} strokeOpacity=".35" strokeDasharray="3 9" animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "240px 250px" }} />
      <Drop i={0}><Float d={0} amp={6}><path d="M60 480 V385 a75 75 0 0 1 150 0 V480 Z" fill={C.teal} /><path d="M60 480 V385 a75 75 0 0 1 150 0" fill="none" stroke={C.goldL} strokeOpacity=".5" strokeWidth="2" /></Float></Drop>
      <Drop i={1}><Float d={0.6} amp={8}><rect x="222" y="396" width="116" height="84" rx="14" fill={C.gold} /><rect x="238" y="412" width="84" height="52" rx="8" fill="none" stroke={C.ivory} strokeOpacity=".5" strokeWidth="2" /></Float></Drop>
      <Drop i={2}><Float d={1.2} amp={7}><path d="M350 480 a52 52 0 0 1 104 0 Z" fill={C.coral} /></Float></Drop>
      <Drop i={3}><Float d={0.3} amp={9}><circle cx="135" cy="288" r="46" fill={C.goldL} /><circle cx="135" cy="288" r="22" fill="none" stroke={C.teal} strokeWidth="3" /></Float></Drop>
      <Drop i={4}><Float d={0.9} amp={10}><path d="M222 396 L338 396 L280 308 Z" fill={C.sage} /><circle cx="280" cy="368" r="9" fill={C.deep} opacity=".5" /></Float></Drop>
      <Drop i={5}><Float d={1.5} amp={12}><rect x="380" y="330" width="56" height="56" rx="10" fill={C.tealL} transform="rotate(14 408 358)" /></Float></Drop>
      <Float d={0.4} amp={14} dur={5}><path d="M330 150 l8 22 22 8 -22 8 -8 22 -8 -22 -22 -8 22 -8z" fill={C.goldL} /></Float>
      <Float d={1} amp={10} dur={7}><path d="M95 150 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5z" fill={C.gold} opacity=".8" /></Float>
      <Float d={2} amp={8}><circle cx="410" cy="240" r="7" fill={C.coral} /></Float>
      <Float d={1.7} amp={9}><circle cx="55" cy="230" r="5" fill={C.sage} /></Float>
    </Frame>
  );
}

/** A tree: roots are the Foundation Years, branches everything that follows. */
export function TreeArt({ className = "" }: { className?: string }) {
  const leaves: [number, number, number, string][] = [[200, 120, 34, C.tealL], [140, 160, 28, C.sage], [265, 150, 30, C.teal], [100, 215, 24, C.goldL], [310, 205, 26, C.sage], [200, 190, 36, C.teal], [170, 70, 22, C.gold], [245, 85, 24, C.sage], [330, 150, 18, C.coral]];
  const reduce = useReducedMotion();
  return (
    <Frame label="Illustration of a tree with deep roots growing upward" vb="0 0 400 520" className={className}>
      <line x1="30" y1="330" x2="370" y2="330" stroke={C.gold} strokeOpacity=".5" strokeWidth="2" />
      <Draw d="M200 330 C198 280 204 240 200 190 M200 250 C170 230 150 210 140 170 M200 230 C235 215 260 190 268 150" stroke={C.goldL} w={7} />
      {leaves.map(([x, y, r, f], i) => (
        <motion.circle key={i} cx={x} cy={y} r={r} fill={f} initial={reduce ? false : { scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.95 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.12, type: "spring", stiffness: 120 }} style={{ transformOrigin: `${x}px ${y}px` }} />
      ))}
      <Draw d="M200 330 C190 370 160 395 120 420 M200 330 C205 380 200 420 205 460 M200 330 C215 365 250 390 290 410 M170 385 C150 400 140 420 130 450 M240 380 C260 400 265 425 275 455" stroke={C.gold} w={3.5} delay={0.4} dash="2 8" />
      <text x="200" y="500" textAnchor="middle" fill={C.gold} fontSize="13" letterSpacing="6" opacity=".9">FOUNDATION YEARS</text>
    </Frame>
  );
}

export function KiteArt({ className = "" }: { className?: string }) {
  return (
    <Frame label="Illustration of a kite flying, a symbol of free play" className={className}>
      <Float amp={14} dur={7}>
        <path d="M240 60 L330 190 L240 320 L150 190 Z" fill={C.teal} />
        <path d="M240 60 L330 190 L240 190 Z" fill={C.gold} />
        <path d="M240 190 L150 190 L240 320 Z" fill={C.coral} />
        <path d="M240 60 V320 M150 190 H330" stroke={C.ivory} strokeOpacity=".6" strokeWidth="2" />
        <motion.path d="M240 320 C210 360 280 390 240 430 C210 465 270 490 235 520" stroke={C.goldL} strokeWidth="2.5" fill="none" strokeDasharray="1 7" strokeLinecap="round" animate={{ pathLength: [0.85, 1, 0.85] }} transition={{ duration: 4, repeat: Infinity }} />
        {[[225, 372, C.coral], [250, 410, C.gold], [232, 450, C.sage]].map(([x, y, f], i) => (<path key={i} d={`M${x} ${y} l-14 -8 v16 z M${x} ${y} l14 -8 v16 z`} fill={f as string} />))}
      </Float>
      <Float d={1} amp={8}><circle cx="70" cy="110" r="38" fill={C.goldL} opacity=".9" /></Float>
      <Float d={2} amp={9}><path d="M380 80 q18 -22 36 0 q18 -22 36 0 M20 300 q14 -16 28 0 q14 -16 28 0" stroke={C.sage} strokeWidth="3" fill="none" strokeLinecap="round" /></Float>
    </Frame>
  );
}

export function StepsArt({ className = "" }: { className?: string }) {
  return (
    <Frame label="Illustration of rising steps with a child at the top" className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Drop key={i} i={i}>
          <rect x={40 + i * 76} y={400 - i * 62} width="72" height={80 + i * 62} rx="10" fill={[C.teal, C.tealL, C.sage, C.gold, C.coral][i]} />
          <text x={76 + i * 76} y={436 - i * 62} textAnchor="middle" fill={C.ivory} fontSize="26" fontFamily="serif">{i + 1}</text>
        </Drop>
      ))}
      <Float amp={10}><circle cx="420" cy="62" r="18" fill={C.goldL} /><path d="M420 82 v36 M420 96 l-18 14 M420 96 l18 14 M420 118 l-14 28 M420 118 l14 28" stroke={C.goldL} strokeWidth="5" strokeLinecap="round" fill="none" /></Float>
      <Float d={1} amp={12}><path d="M120 120 l8 22 22 8 -22 8 -8 22 -8 -22 -22 -8 22 -8z" fill={C.gold} /></Float>
    </Frame>
  );
}

export function PagesArt({ className = "" }: { className?: string }) {
  return (
    <Frame label="Illustration of newsletter pages and a quill" className={className}>
      <Float amp={8}>
        <rect x="120" y="120" width="230" height="300" rx="14" fill={C.sage} transform="rotate(-8 235 270)" />
        <rect x="140" y="100" width="230" height="300" rx="14" fill={C.ivory} />
        <rect x="170" y="140" width="120" height="14" rx="7" fill={C.teal} />
        {[190, 216, 242, 268, 294].map((y, i) => (<rect key={y} x="170" y={y} width={i === 4 ? 90 : 170} height="8" rx="4" fill={C.deep} opacity=".18" />))}
        <circle cx="330" cy="350" r="22" fill={C.gold} /><path d="M320 350 l8 8 14 -16" stroke={C.ivory} strokeWidth="4" fill="none" strokeLinecap="round" />
      </Float>
      <Float d={1} amp={12}><path d="M400 90 C360 130 330 200 322 270 C360 240 400 170 400 90 Z" fill={C.coral} /><path d="M400 90 L322 270" stroke={C.deep} strokeOpacity=".4" strokeWidth="2" /></Float>
      <Float d={2} amp={9}><circle cx="70" cy="380" r="30" fill={C.goldL} opacity=".9" /></Float>
    </Frame>
  );
}

export function StageArt({ className = "" }: { className?: string }) {
  return (
    <Frame label="Illustration of a speaker on stage under a spotlight" className={className}>
      <defs>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.goldL} stopOpacity=".75" /><stop offset="1" stopColor={C.goldL} stopOpacity=".02" /></linearGradient>
      </defs>
      <motion.path d="M240 30 L110 440 H370 Z" fill="url(#beam)" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity }} />
      <circle cx="240" cy="30" r="20" fill={C.gold} />
      <ellipse cx="240" cy="450" rx="150" ry="22" fill={C.teal} />
      <rect x="205" y="360" width="70" height="90" rx="8" fill={C.deep} />
      <rect x="205" y="360" width="70" height="90" rx="8" fill="none" stroke={C.gold} strokeWidth="2" />
      <Float amp={6}><circle cx="240" cy="270" r="26" fill={C.coral} /><path d="M205 360 q0 -70 35 -70 q35 0 35 70" fill={C.sage} /></Float>
      {[0, 1, 2, 3, 4, 5].map((i) => (<circle key={i} cx={80 + i * 64} cy={500} r="26" fill={C.deep} opacity=".5" />))}
    </Frame>
  );
}

export function PlaneArt({ className = "" }: { className?: string }) {
  return (
    <Frame label="Illustration of a paper plane carrying a message" className={className}>
      <Draw d="M40 440 C120 380 100 300 200 280 C280 262 300 200 360 170" stroke={C.gold} w={3} dash="2 10" />
      <Float amp={12} dur={5}>
        <path d="M440 110 L120 230 L220 262 Z" fill={C.ivory} /><path d="M440 110 L220 262 L240 360 Z" fill={C.sage} /><path d="M220 262 L240 360 L290 292 Z" fill={C.teal} />
      </Float>
      <Float d={1} amp={10}><rect x="60" y="120" width="110" height="76" rx="12" fill={C.coral} /><path d="M60 128 L115 168 L170 128" stroke={C.ivory} strokeWidth="3" fill="none" strokeLinejoin="round" /></Float>
      <Float d={2} amp={9}><circle cx="400" cy="400" r="34" fill={C.goldL} opacity=".9" /></Float>
    </Frame>
  );
}

/** Line icons used across cards. */
const ICONS: Record<string, string> = {
  heart: "M12 21s-7-4.6-9.2-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.2 6c-2.2 4.4-9.2 9-9.2 9z",
  blocks: "M3 21h8v-8H3zM13 21h8v-8h-8zM8 11h8V3H8z",
  chat: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 5a3 3 0 0 1 0 6M18 14c2.5.6 4 2.5 4 5",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  chart: "M4 20V4M4 20h16M8 16v-5M13 16V8M18 16v-3",
  hands: "M12 21c-5-3.5-8-6.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3.5-3 6.5-8 10z",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
};

export function Icon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICONS[name] || ICONS.blocks} />
    </svg>
  );
}

export function IconBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-900 to-teal-700 text-gold-light shadow-lg shadow-teal-900/20 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
      <Icon name={name} />
    </span>
  );
}

/** Scalloped gold divider between sections. */
export function Wave({ flip = false, from = "#FBF7EF", to = "#F3ECDD" }: { flip?: boolean; from?: string; to?: string }) {
  return (
    <div aria-hidden style={{ background: from, lineHeight: 0 }} className={flip ? "rotate-180" : ""}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-14 w-full md:h-20">
        <path d="M0 40 C240 100 480 -20 720 40 C960 100 1200 -20 1440 40 V80 H0Z" fill={to} />
        <path d="M0 40 C240 100 480 -20 720 40 C960 100 1200 -20 1440 40" fill="none" stroke={C.gold} strokeOpacity=".6" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export const ART = { blocks: BlocksArt, tree: TreeArt, kite: KiteArt, steps: StepsArt, pages: PagesArt, stage: StageArt, plane: PlaneArt };
export type ArtName = keyof typeof ART;
