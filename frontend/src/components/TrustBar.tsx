const CLIENTS = [
  "Northgate Health",
  "Harborview Group",
  "Riverside Capital",
  "Suncrest Living",
  "Meadowbrook Communities",
  "Tech Park Holdings",
  "Willow & Co.",
  "Coastal Institute",
];

export default function TrustBar() {
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <section className="border-b border-line bg-paper-dim overflow-hidden py-8">
      <p className="text-center font-mono-label text-[11px] uppercase text-slate/70 mb-6">
        Trusted by portfolios across every sector
      </p>
      <div className="relative">
        <div className="flex w-max animate-marquee gap-16">
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-xl text-ink/30 whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper-dim to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper-dim to-transparent" />
      </div>
    </section>
  );
}
