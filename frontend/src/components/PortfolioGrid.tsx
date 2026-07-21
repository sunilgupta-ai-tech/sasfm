"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { portfolioCategories, type PortfolioCategory } from "@/data/content";

type Project = {
  slug: string;
  name: string;
  category: string;
  location: string;
  image: string;
};

type Filter = "All" | PortfolioCategory;

export default function PortfolioGrid({
  projects,
  limit,
}: {
  projects: Project[];
  limit?: number;
}) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = projects.filter(
    (project) => filter === "All" || project.category === filter
  );
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {(["All", ...portfolioCategories] as Filter[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`font-mono-label text-[11px] uppercase px-4 py-2 border transition-colors ${
              filter === cat
                ? "bg-ink text-paper border-ink"
                : "bg-transparent text-slate border-line hover:border-ink hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block border border-line bg-paper hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(16,25,46,0.35)] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-ink border-b border-line overflow-hidden">
                  <SafeImage
                    src={project.image}
                    alt={project.name}
                    className="transition-transform duration-500 group-hover:scale-105"
                    fallback={
                      <motion.div
                        className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_70%)]"
                        initial={{ scale: 1.1 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center font-mono-label text-[11px] text-paper/50 uppercase">
                          {project.category}
                        </span>
                      </motion.div>
                    }
                  />
                </div>
                <div className="p-6">
                  <span className="font-mono-label text-[10px] uppercase text-amber-dark">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-ink group-hover:text-amber-dark transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate">{project.location}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="text-sm text-slate mt-8">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
