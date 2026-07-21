import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioProjects } from "@/lib/data";

export default async function Portfolio() {
  const projects = await getPortfolioProjects();

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-paper-dim border-y border-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
              Our Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
              A portfolio built across every asset type.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors shrink-0"
          >
            View all projects →
          </Link>
        </div>

        <PortfolioGrid projects={projects} limit={6} />
      </div>
    </section>
  );
}
