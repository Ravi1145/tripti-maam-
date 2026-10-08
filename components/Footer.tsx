import Link from "next/link";
import { P } from "@/lib";

const items: [string, string][] = [
  ["About", "/about/"], ["Services", "/services/"], ["PlayXploration", "/playxploration/"], ["Foundation Years First", "/foundation-years-first/"],
  ["Blog", "/blog/"], ["Gallery", "/gallery/"], ["Newsletter", "/writing/"], ["Speaking", "/speaking/"], ["FAQ", "/faq/"], ["Contact", "/contact/"],
];

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-teal-950 text-ivory/80">
      <div className="rule-gold" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-4xl font-light leading-tight text-ivory">The years that shape <span className="italic text-gold-light">everything that follows.</span></p>
          <Link href="/contact/" className="btn-gold mt-10">Work with Tripta</Link>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <p className="label mb-5">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6">
            {items.map(([l, h]) => <li key={h}><Link href={h} className="inline-flex min-h-[44px] items-center text-sm transition hover:text-gold-light">{l}</Link></li>)}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="label mb-5">Connect</p>
          <a href={P.person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-sm transition hover:text-gold-light">LinkedIn ↗</a>
          <p className="mt-2 text-sm">{P.person.location}</p>
        </div>
      </div>
      <p aria-hidden className="select-none whitespace-nowrap pt-16 text-center font-serif text-[13vw] font-light italic leading-[0.9] text-ivory/[0.06]">Tripta Tarunesh</p>
      <div className="border-t border-gold/20 py-6 text-center text-xs tracking-wider text-ivory/60">© {new Date().getFullYear()} Tripta Tarunesh. All rights reserved.</div>
    </footer>
  );
}
