import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamMemberCard from "@/components/TeamMemberCard";
import { getTeamMembers } from "@/lib/data";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Expert Team",
  description:
    "Meet the regional and technical leaders running day-to-day facilities management delivery at SASFM.",
  alternates: { canonical: "/about/our-expert-team" },
};

export default async function ExpertTeamPage() {
  const expertTeam = await getTeamMembers();

  return (
    <>
      <Header />
      <main className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-ink leading-tight max-w-2xl">
            Our Expert Team
          </h1>
          <p className="mt-5 text-slate max-w-xl leading-relaxed text-lg">
            Specialists across every region and discipline, running delivery
            on the ground every day.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {expertTeam.map((member, i) => (
              <TeamMemberCard key={member.id} member={member} index={i} />
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate">Want to meet the board too?</p>
            <Link
              href="/about/board-of-directors"
              className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
            >
              View Board of Directors →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
