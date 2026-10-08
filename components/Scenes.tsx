"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Art plates: abstract, print-style compositions in the brand palette (bottle green + brass).
 * They stand in for photographs until real photos are uploaded in the admin (Site photos).
 * The component name and slot names are unchanged, so every page that used the old scenes keeps working.
 */
export type SceneName = "play" | "classroom" | "reading" | "outdoor" | "workshop" | "stage";

const G = { deep: "#0A1F1B", green: "#12332C", mid: "#1F5A4E", sage: "#4E8A7A", mist: "#9DB8A9", brass: "#B8975A", brassL: "#D9C08A", stone: "#ECE4D4", ivory: "#F6F1E7" };

function Plate({ children, label, bg }: { children: ReactNode; label: string; bg?: ReactNode }) {
  return (
    <svg viewBox="0 0 800 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="plate-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" /></filter>
        <radialGradient id="plate-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor={G.brassL} /><stop offset="1" stopColor={G.brass} /></radialGradient>
        <linearGradient id="plate-dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={G.deep} /><stop offset=".55" stopColor={G.mid} /><stop offset=".78" stopColor="#8A8A5A" /><stop offset="1" stopColor={G.brass} /></linearGradient>
        <linearGradient id="plate-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={G.stone} /><stop offset="1" stopColor={G.ivory} /></linearGradient>
        <linearGradient id="plate-arch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={G.brassL} /><stop offset="1" stopColor={G.brass} /></linearGradient>
        <radialGradient id="plate-vig" cx="50%" cy="50%" r="75%"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".5" /></radialGradient>
        <radialGradient id="plate-orb" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor={G.mid} /><stop offset="1" stopColor={G.deep} /></radialGradient>
      </defs>
      {bg}
      {children}
      <rect width="800" height="800" filter="url(#plate-grain)" opacity=".08" />
    </svg>
  );
}

function Spin({ children, dur = 80, rev = false, cx = 400, cy = 400 }: { children: ReactNode; dur?: number; rev?: boolean; cx?: number; cy?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return <motion.g animate={{ rotate: rev ? -360 : 360 }} transition={{ duration: dur, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${cx}px ${cy}px` }}>{children}</motion.g>;
}
function Breathe({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return <motion.g animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.g>;
}

const stroke = (o = 0.4, w = 1) => ({ fill: "none", stroke: G.brass, strokeOpacity: o, strokeWidth: w });

function Dawn() {
  return (
    <Plate label="Abstract artwork: a brass sun rising over dark green hills" bg={<rect width="800" height="800" fill="url(#plate-dawn)" />}>
      {[0.5, 0.35, 0.22, 0.12].map((o, i) => <circle key={i} cx={400} cy={560} r={170 + i * 70} {...stroke(o)} />)}
      <Breathe><circle cx={400} cy={560} r={140} fill="url(#plate-sun)" /></Breathe>
      {Array.from({ length: 26 }).map((_, i) => <circle key={i} cx={(i * 197) % 780 + 10} cy={(i * 131) % 380 + 20} r={i % 5 === 0 ? 2.2 : 1.2} fill={G.brassL} opacity={0.5} />)}
      <path d="M0 640 Q150 560 320 620 T640 600 T800 630 V800 H0Z" fill={G.green} />
      <path d="M0 700 Q200 640 400 690 T800 680 V800 H0Z" fill={G.deep} />
      <path d="M0 640 Q150 560 320 620 T640 600 T800 630" {...stroke(0.6)} />
    </Plate>
  );
}
function Arches() {
  const fills = [G.mid, G.green, G.sage, G.deep, G.mid];
  return (
    <Plate label="Abstract artwork: nested arches in green and brass" bg={<rect width="800" height="800" fill={G.green} />}>
      {[0, 1, 2, 3, 4].map((i) => {
        const w = 640 - i * 112; const x = 400 - w / 2; const top = 130 + i * 78;
        return <path key={i} d={`M${x} 800 V${top + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V800 Z`} fill={fills[i]} stroke={G.brass} strokeOpacity={0.55} strokeWidth={1} />;
      })}
      <Breathe><circle cx={400} cy={430} r={46} fill="url(#plate-sun)" /></Breathe>
      <path d="M400 800 V500" {...stroke(0.4)} />
      {[0, 1, 2].map((i) => <circle key={i} cx={400} cy={430} r={70 + i * 26} {...stroke(0.35 - i * 0.1)} />)}
    </Plate>
  );
}
function Weave() {
  const pts: [number, number][] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) pts.push([100 + c * 150, 100 + r * 150]);
  return (
    <Plate label="Abstract artwork: interlocking brass circles on deep green" bg={<rect width="800" height="800" fill={G.deep} />}>
      <Spin dur={240} cx={400} cy={400}>
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={150} {...stroke(0.28)} />)}
      </Spin>
      {pts.filter((_, i) => i % 3 === 0).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={G.brassL} opacity={0.8} />)}
      <circle cx={400} cy={400} r={330} fill="url(#plate-vig)" />
      <circle cx={400} cy={400} r={72} fill="url(#plate-sun)" opacity={0.95} />
    </Plate>
  );
}
function Horizon() {
  return (
    <Plate label="Abstract artwork: layered green hills beneath a soft brass sun" bg={<rect width="800" height="800" fill="url(#plate-sky)" />}>
      <Breathe><circle cx={520} cy={300} r={96} fill="url(#plate-sun)" opacity={0.9} /></Breathe>
      <circle cx={520} cy={300} r={150} {...stroke(0.35)} />
      <circle cx={520} cy={300} r={210} {...stroke(0.2)} />
      <path d="M0 520 Q140 400 300 470 T560 430 T800 480 V800 H0Z" fill={G.mist} />
      <path d="M0 590 Q180 470 360 550 T800 520 V800 H0Z" fill={G.sage} />
      <path d="M0 660 Q200 570 420 640 T800 610 V800 H0Z" fill={G.mid} />
      <path d="M0 730 Q220 670 440 720 T800 700 V800 H0Z" fill={G.green} />
      <path d="M0 590 Q180 470 360 550 T800 520" {...stroke(0.7)} />
    </Plate>
  );
}
function Grid() {
  const dots = [];
  for (let r = 0; r < 20; r++) for (let c = 0; c < 20; c++) dots.push([20 + c * 40, 20 + r * 40]);
  return (
    <Plate label="Abstract artwork: a brass arch over a field of fine dots" bg={<rect width="800" height="800" fill={G.mid} />}>
      <rect width="800" height="800" fill={G.green} opacity={0.5} />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.6} fill={G.brassL} opacity={0.35} />)}
      <path d="M200 700 V400 a200 200 0 0 1 400 0 V700 Z" fill="url(#plate-arch)" />
      <path d="M262 700 V400 a138 138 0 0 1 276 0 V700 Z" fill={G.green} />
      <path d="M324 700 V400 a76 76 0 0 1 152 0 V700 Z" fill={G.deep} />
      <circle cx={640} cy={160} r={44} {...stroke(0.7, 1.4)} />
      <circle cx={640} cy={160} r={14} fill={G.brassL} />
      <rect x={140} y={700} width={520} height={2} fill={G.brass} />
    </Plate>
  );
}
function Orbit() {
  return (
    <Plate label="Abstract artwork: concentric brass orbits with small glowing planets" bg={<rect width="800" height="800" fill="url(#plate-orb)" />}>
      {[110, 190, 270, 350].map((r, i) => <circle key={r} cx={400} cy={400} r={r} {...stroke(0.4 - i * 0.07)} />)}
      <Spin dur={60} cx={400} cy={400}><circle cx={400} cy={290} r={10} fill={G.brassL} /></Spin>
      <Spin dur={95} cx={400} cy={400} rev><circle cx={400} cy={130} r={7} fill={G.mist} /><circle cx={400} cy={130} r={14} {...stroke(0.5)} /></Spin>
      <Spin dur={140} cx={400} cy={400}><circle cx={751} cy={400} r={9} fill={G.brass} /></Spin>
      <Breathe><circle cx={400} cy={400} r={52} fill="url(#plate-sun)" /></Breathe>
      <circle cx={400} cy={400} r={84} {...stroke(0.45)} />
    </Plate>
  );
}

const MAP: Record<SceneName, () => JSX.Element> = { play: Dawn, classroom: Arches, reading: Weave, outdoor: Horizon, workshop: Grid, stage: Orbit };

export default function Scene({ name, className = "" }: { name: SceneName; className?: string }) {
  const S = MAP[name];
  return <div className={`h-full w-full ${className}`}><S /></div>;
}
