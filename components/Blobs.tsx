export default function Blobs({ dark = true }: { dark?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute -left-24 top-10 h-96 w-96 rounded-full blur-3xl animate-float ${dark ? "bg-gold/25" : "bg-gold/20"}`} />
      <div className={`absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl animate-float [animation-delay:-3s] ${dark ? "bg-teal-500/30" : "bg-teal-100"}`} />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold-light/20 blur-3xl animate-float [animation-delay:-6s]" />
      <svg className="absolute right-10 top-24 h-40 w-40 animate-float opacity-30 [animation-delay:-2s]" viewBox="0 0 100 100" fill="none" stroke="#C9A24B" strokeWidth=".6">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="15" />
      </svg>
    </div>
  );
}
