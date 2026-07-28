import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedImage from "@/components/AnimatedImage";
import VisionMissionValues from "@/components/VisionMissionValues";
import ExpertTeamPreview from "@/components/ExpertTeamPreview";
import ManagingDirectorMessage from "@/components/ManagingDirectorMessage";
import { getTeamMembers } from "@/lib/data";

// Fetches backend data (team members) — must render per-request, not be
// statically prerendered at Docker build time, when the backend container
// isn't reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

// Drop hero/governance images into public/images/ and set these, or use a
// full https:// URL. See public/images/README.txt. Left empty by default —
// a designed placeholder is shown instead of a broken image.
const HERO_IMAGE_SRC = "/images/about/hero.png";
const INTRO_IMAGE_SRC = "/images/about/intro.png";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SASFM is a global integrated facilities management partner — learn about our people, our governance, and our commitments.",
  alternates: { canonical: "/about" },
};

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

export default async function AboutPage() {
  const expertTeam = await getTeamMembers();

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

          <p className="mt-16 max-w-2xl text-lg text-slate leading-relaxed">
            With deep operational data and a shared technology platform, our
            multi-dimensional view of a portfolio helps clients make better
            decisions, faster.
          </p>
        </section>

        {/* Vision, Mission & Values */}
        <section className="mx-auto max-w-7xl px-6 py-20 border-t border-line">
          <VisionMissionValues />
        </section>

        <ManagingDirectorMessage />

        {/* Expert Team */}
        <section className="mx-auto max-w-7xl px-6 py-20 border-t border-line">
          <ExpertTeamPreview members={expertTeam.slice(0, 4)} />
        </section>
      </main>
      <Footer />
    </>
  );
}
