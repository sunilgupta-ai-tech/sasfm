import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountUp from "@/components/CountUp";
import AnimatedImage from "@/components/AnimatedImage";
import { values } from "@/data/content";

// Drop hero/governance images into public/images/ and set these, or use a
// full https:// URL. See public/images/README.txt. Left empty by default —
// a designed placeholder is shown instead of a broken image.
const HERO_IMAGE_SRC = "/images/about/hero.png";
const GOVERNANCE_IMAGE_SRC = "/images/about/governance.png";
const INTRO_IMAGE_SRC = "/images/about/intro.png";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SASFM is a global integrated facilities management partner — learn about our people, our governance, and our commitments.",
  alternates: { canonical: "/about" },
};

const aboutStats = [
  { value: "120+", label: "Sites Under Management" },
  { value: "UAE", label: "Countries" },
  { value: "50+", label: "People" },
  { value: "60+", label: "Enterprise Clients" },
];

const learnMoreCards = [
  {
    title: "Corporate Responsibility",
    description:
      "We lead by example, guided by the needs of the communities we build in and the world we operate across.",
    href: "#responsibility",
  },
  {
    title: "Board of Directors",
    description:
      "Governance built on accountability — meet the people guiding our long-term strategy.",
    href: "/about/board-of-directors",
  },
  {
    title: "Our Expert Team",
    description:
      "Regional and technical leaders running delivery on the ground, every day, everywhere we operate.",
    href: "/about/our-expert-team",
  },
];

const commitments = [
  {
    title: "Supplier Code of Conduct",
    description:
      "Setting clear standards so every partner we work with shares our commitment to safety and integrity.",
  },
  {
    title: "Health & Safety Standard",
    description:
      "A single safety framework applied consistently across every site, in every market we serve.",
  },
  {
    title: "Sustainability Commitment",
    description:
      "Measurable decarbonization targets built into how we plan, maintain and report on every portfolio.",
  },
];

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)] flex items-center justify-center">
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
        <pattern
          id={`about-pattern-${label.replace(/\s+/g, "-")}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line x1="0" y1="0" x2="0" y2="24" stroke="var(--color-paper)" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#about-pattern-${label.replace(/\s+/g, "-")})`} />
      </svg>
      <span className="font-mono-label text-xs uppercase text-paper/40 relative">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.05]">
            About Us
          </h1>
          <p className="mt-6 text-lg text-slate max-w-2xl leading-relaxed">
            Operating across every corner of a client&apos;s portfolio,
            SASFM sees more so you can do more.
          </p>
        </section>

        <div className="relative w-full aspect-[21/9] mt-12 bg-ink overflow-hidden">
          {HERO_IMAGE_SRC ? (
            <Image
              src={HERO_IMAGE_SRC}
              alt="SASFM team on site"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <PlaceholderImage label="Add your image — see public/images/README.txt" />
          )}
        </div>

        {/* Intro + stats */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 text-lg text-slate leading-relaxed">
              <p>
                Sun and Sand Facility Management Services (SASFM) is a
                prominent group of companies based in Dubai. We specialize in
                offering comprehensive cleaning, MEP (Mechanical, Electrical,
                Plumbing), civil, and maintenance services, encompassing both
                hard and soft services. As part of our expansion, we have
                ventured into the realm of total facilities management, aiming
                to be a leader in the regional FM industry.
              </p>
              <p>
                At SASFM, we are driven by a commitment to deliver exceptional
                experiences to our clients that exceed their expectations. We
                strive to go above and beyond by leveraging technology and
                embracing sustainability, ensuring that we provide the right
                solutions tailored to our clients&apos; needs.
              </p>
              <p>
                With a focus on long-term sustainability, we adopt a
                comprehensive approach to facility management. Our team
                actively identifies areas for cost reduction and implements new
                processes and upgrades that balance upfront costs with
                efficiency gains, all while maintaining the safety and
                well-being of your employees.
              </p>
            </div>

            <AnimatedImage
              src={INTRO_IMAGE_SRC}
              alt="SASFM facilities management services — cleaning, MEP, civil, and maintenance"
              placeholderLabel="Add your image — see public/images/README.txt"
              className="aspect-[5/4]"
              fit="contain"
            />
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-line pt-10">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-display font-semibold text-ink">
                  <CountUp value={stat.value} />
                </p>
                <p className="font-mono-label text-[11px] uppercase text-slate mt-1.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-2xl text-lg text-slate leading-relaxed">
            With deep operational data and a shared technology platform, our
            multi-dimensional view of a portfolio helps clients make better
            decisions, faster.
          </p>
        </section>

        {/* Learn more cards */}
        <section className="mx-auto max-w-7xl px-6 py-20 border-t border-line">
          <h2 className="font-serif-display text-3xl md:text-4xl text-ink mb-12">
            Learn More
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {learnMoreCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group border border-line p-8 hover:bg-ink transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-ink group-hover:text-paper transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-slate group-hover:text-paper/70 leading-relaxed transition-colors duration-300">
                  {card.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-3 font-semibold text-sm text-teal group-hover:text-amber transition-colors duration-300">
                  <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
                  Learn More
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-7xl px-6 py-20 border-t border-line">
          <h2 className="font-serif-display text-3xl md:text-4xl text-ink mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title}>
                <div className="h-1 w-8 bg-amber mb-4" />
                <h3 className="font-semibold text-ink text-base">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Governance block */}
        <section className="border-t border-line">
          <div className="grid md:grid-cols-2 min-h-[420px]">
            <div className="relative bg-ink overflow-hidden order-2 md:order-1">
              {GOVERNANCE_IMAGE_SRC ? (
                <Image
                  src={GOVERNANCE_IMAGE_SRC}
                  alt="SASFM governance and leadership"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              ) : (
                <PlaceholderImage label="Add your image — see public/images/README.txt" />
              )}
            </div>
            <div className="flex flex-col justify-center px-8 sm:px-12 py-16 order-1 md:order-2">
              <h2 className="font-serif-display text-3xl md:text-4xl text-ink">
                Governance & Oversight
              </h2>
              <p className="mt-5 text-slate leading-relaxed max-w-md">
                SASFM is led with a clear point of view on service and
                accountability — set from the top and carried through every
                site we manage.
              </p>
              <Link
                href="/about/board-of-directors"
                className="mt-7 inline-flex items-center gap-3 font-semibold text-ink hover:text-teal transition-colors w-fit"
              >
                <span className="h-px w-8 bg-current transition-all duration-300" />
                Meet the Board
              </Link>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section id="responsibility" className="mx-auto max-w-7xl px-6 py-20 border-t border-line">
          <h2 className="font-serif-display text-3xl md:text-4xl text-ink mb-12">
            Our Commitments
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {commitments.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-ink text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
