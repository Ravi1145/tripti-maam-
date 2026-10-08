import Link from "next/link";
import { P } from "@/lib";

const items: [string, string][] = [
  ["About", "/about/"],
  ["Services", "/services/"],
  ["PlayXploration", "/playxploration/"],
  ["Foundation Years First", "/foundation-years-first/"],
  ["Blog", "/blog/"],
  ["Gallery", "/gallery/"],
  ["Newsletter", "/writing/"],
  ["Speaking", "/speaking/"],
  ["FAQ", "/faq/"],
  ["Contact", "/contact/"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-950 text-ivory/80">
      <div className="rule-gold" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl text-gold-light">{P.person.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{P.person.headline}. Helping schools build the years that shape everything that follows.</p>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Explore</p>
          <ul className="grid grid-cols-2 gap-2">
            {items.map(([l, h]) => (
              <li key={h}><Link href={h} className="transition hover:text-gold-light">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Connect</p>
          <a href={P.person.linkedin} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-light">LinkedIn ↗</a>
          <p className="mt-2">{P.person.location}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-ivory/50">© {new Date().getFullYear()} Tripta Tarunesh. All rights reserved.</div>
    </footer>
  );
}
