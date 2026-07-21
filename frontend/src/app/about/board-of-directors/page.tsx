import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadershipAccordion from "@/components/LeadershipAccordion";
import { leadershipTeam } from "@/data/content";

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "Meet the leadership guiding SASFM's direction, governance and approach to service.",
  alternates: { canonical: "/about/board-of-directors" },
};

export default function BoardOfDirectorsPage() {
  return (
    <>
      <Header />
      <main className="pt-36 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-ink leading-tight max-w-2xl">
            Board of Directors
          </h1>
          <p className="mt-5 text-slate max-w-xl leading-relaxed text-lg">
            Leadership and direction guiding SASFM&apos;s approach to
            service, accountability and long-term strategy.
          </p>

          <div className="mt-14">
            <LeadershipAccordion members={leadershipTeam} />
          </div>

          <div className="mt-16 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate">Want to meet the operating team too?</p>
            <Link
              href="/about/our-expert-team"
              className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
            >
              View Our Expert Team →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
