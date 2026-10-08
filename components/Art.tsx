"use client";

/** Fine line icons used across cards. */
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

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICONS[name] || ICONS.blocks} />
    </svg>
  );
}

/** Hairline-framed icon. The `i` prop is kept for compatibility with earlier versions. */
export function IconBadge({ name }: { name: string; i?: number }) {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold-dark transition duration-500 group-hover:bg-teal-900 group-hover:text-gold-light">
      <Icon name={name} />
    </span>
  );
}
