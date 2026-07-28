"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { leadershipTeam } from "@/data/content";

export default function ManagingDirectorMessage() {
  const md = leadershipTeam.find((m) => m.id === "managing-director");
  if (!md) return null;

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="h-px w-6 bg-amber" />
          <p className="font-mono-label text-xs uppercase text-amber">
            Leadership
          </p>
          <span className="h-px w-6 bg-amber" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display font-bold uppercase text-2xl sm:text-3xl md:text-4xl leading-tight text-paper"
        >
          Managing Director Message
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-7 flex justify-center"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber/10 border border-amber/30 text-amber">
            <Quote className="h-5 w-5" strokeWidth={1.75} fill="currentColor" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 font-serif-display text-lg sm:text-xl md:text-2xl leading-relaxed text-paper/90"
        >
          &ldquo;{md.bio}&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 font-mono-label text-xs uppercase text-paper/50"
        >
          — {md.title}
        </motion.p>
      </div>
    </section>
  );
}
