"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/#services",
    children: [
      { label: "Soft Services", href: "/services/soft-services" },
      { label: "Hard Services", href: "/services/hard-services" },
    ],
  },
  {
    label: "Insights & Research",
    href: "/blog",
    children: [{ label: "Blogs", href: "/blog" }],
  },
  { label: "Projects", href: "/portfolio" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pages with a dark hero directly under the header need light header text
  // before the user scrolls past it. Everything else starts light. Opening
  // the mobile menu always forces the light/opaque header state too, so the
  // menu panel never has to fight a transparent bar behind it.
  const onDarkHero = pathname === "/enquiry" && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-paper/95 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-line)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => {
            setMenuOpen(false);
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              onDarkHero
                ? "/images/brand/sasfm-mark-light.png"
                : "/images/brand/sasfm-mark.png"
            }
            alt="SASFM — Sun and Sand Facility Management"
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 font-mono-label text-[13px] uppercase transition-colors py-2 ${
                  onDarkHero
                    ? "text-paper/80 hover:text-paper"
                    : "text-steel hover:text-ink"
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                )}
              </a>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full min-w-[200px] bg-paper border border-line shadow-[0_16px_32px_-16px_rgba(16,25,46,0.3)] py-2"
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-ink hover:bg-paper-dim hover:text-amber-dark transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <a
            href="/enquiry"
            className={`font-mono-label text-[13px] uppercase px-5 py-2.5 transition-colors ${
              onDarkHero
                ? "bg-paper text-ink hover:bg-amber"
                : "bg-ink text-paper hover:bg-amber hover:text-ink"
            }`}
          >
            Enquiry Now
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 transition-transform ${
              onDarkHero && !menuOpen ? "bg-paper" : "bg-ink"
            } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-opacity ${
              onDarkHero && !menuOpen ? "bg-paper" : "bg-ink"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-transform ${
              onDarkHero && !menuOpen ? "bg-paper" : "bg-ink"
            } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="md:hidden mx-4 mt-3 flex flex-col gap-1 bg-paper border border-line shadow-[0_16px_40px_-16px_rgba(16,25,46,0.35)] px-5 pt-2 pb-4 max-h-[75vh] overflow-y-auto"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((item) => (
            <div key={item.label} className="border-b border-line/60">
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  onClick={() => !item.children && setMenuOpen(false)}
                  className="flex-1 font-mono-label text-sm uppercase py-3 text-steel"
                >
                  {item.label}
                </a>
                {item.children && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileGroup((g) =>
                        g === item.label ? null : item.label
                      )
                    }
                    aria-label={`Toggle ${item.label} submenu`}
                    className="p-3 text-ink"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openMobileGroup === item.label ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                )}
              </div>
              {item.children && openMobileGroup === item.label && (
                <div className="pb-3 pl-4 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 text-sm text-slate hover:text-ink transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="/enquiry"
            onClick={() => setMenuOpen(false)}
            className="font-mono-label text-sm uppercase px-5 py-3 text-center mt-4 bg-ink text-paper"
          >
            Enquiry Now
          </a>
        </nav>
      )}
    </header>
  );
}
