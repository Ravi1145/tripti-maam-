const ICONS: Record<string, string> = {
  heart: "M12 21s-7-4.6-9.2-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.2 6c-2.2 4.4-9.2 9-9.2 9z",
  blocks: "M3 21h8v-8H3zM13 21h8v-8h-8zM8 11h8V3H8z",
  chat: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 5a3 3 0 0 1 0 6M18 14c2.5.6 4 2.5 4 5",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICONS[name] || ICONS.star} />
    </svg>
  );
}

const TINT: Record<string, string> = {
  violet: "bg-violet-tint text-violet-deep", coral: "bg-coral-tint text-coral-deep", sky: "bg-sky-tint text-sky-deep",
  sun: "bg-sun-tint text-sun-deep", mint: "bg-mint-tint text-mint-deep", saffron: "bg-saffron-tint text-saffron-deep",
};

/** Round, colour-coded icon tile. */
export function IconTile({ name, tint = "saffron", size = "h-14 w-14" }: { name: string; tint?: string; size?: string }) {
  return <span className={`inline-flex ${size} shrink-0 items-center justify-center rounded-2xl ${TINT[tint] || TINT.saffron}`}><Icon name={name} /></span>;
}
