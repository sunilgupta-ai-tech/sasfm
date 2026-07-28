import Image from "next/image";

type Tab = { label: string; href: string };

export default function ServicePageHero({
  eyebrow,
  title,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  tabs,
}: {
  eyebrow?: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc?: string;
  imageAlt: string;
  tabs: Tab[];
}) {
  return (
    <div className="bg-paper-dim">
      <div className="mx-auto max-w-7xl px-6 pt-32 md:pt-40 pb-10">
        {eyebrow && (
          <p className="font-mono-label text-xs uppercase text-teal mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.05]">
          {title}
        </h1>
        <a
          href={ctaHref}
          className="inline-block mt-8 bg-ink text-paper font-semibold text-sm px-7 py-3.5 hover:bg-amber hover:text-ink transition-colors"
        >
          {ctaLabel}
        </a>
      </div>

      <div className="relative w-full aspect-[21/9] bg-ink overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_70%)] flex items-center justify-center">
            <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
              <pattern
                id={`hero-pattern-${title.replace(/\s+/g, "-")}`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(35)"
              >
                <line x1="0" y1="0" x2="0" y2="24" stroke="var(--color-paper)" strokeWidth="1" />
              </pattern>
              <rect
                width="100%"
                height="100%"
                fill={`url(#hero-pattern-${title.replace(/\s+/g, "-")})`}
              />
            </svg>
            <span className="font-mono-label text-xs uppercase text-paper/40 relative">
              Add your image — see public/images/README.txt
            </span>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <nav
          className="flex flex-wrap gap-x-10 gap-y-2 py-6"
          aria-label="Section navigation"
        >
          {tabs.map((tab, i) => (
            <a
              key={tab.label}
              href={tab.href}
              className={`text-[15px] font-semibold transition-colors ${
                i === 0
                  ? "text-teal"
                  : "text-ink/80 hover:text-teal"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
