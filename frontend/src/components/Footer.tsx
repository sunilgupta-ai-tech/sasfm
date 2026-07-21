import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Enquiry Now", href: "/enquiry" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Operations & Maintenance", href: "/#offerings" },
      { label: "Workplace Experience", href: "/#offerings" },
      { label: "Smart Building Technology", href: "/#offerings" },
      { label: "Sector Solutions", href: "/#offerings" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/sasfm-mark-light.png"
            alt="SASFM — Sun and Sand Facility Management"
            className="h-7 w-auto"
          />
          <p className="mt-4 text-sm text-paper/70 max-w-xs leading-relaxed">
            Integrated facilities management for enterprise portfolios —
            reliable operations, workplace experience and smart building
            technology, delivered as one accountable service.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono-label text-xs uppercase text-paper/50 mb-4">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/85 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-label text-xs text-paper/50">
            © {new Date().getFullYear()} SASFM. All rights reserved.
          </p>
          <Link
            href="/enquiry"
            className="font-mono-label text-xs uppercase text-amber hover:text-paper transition-colors"
          >
            Start a conversation →
          </Link>
        </div>
      </div>
    </footer>
  );
}
