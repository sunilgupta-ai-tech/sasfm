"use client";

import { motion } from "framer-motion";
import { Eye, Target, Sparkles } from "lucide-react";

const pillars = [
  {
    title: "Vision",
    icon: Eye,
    description:
      "Our aims to redefine excellence and innovation within the facility management sector. As a reliable and esteemed partner, we offer cost-effective, sustainable facility management solutions that foster continuous improvement and add substantial value to our clients' businesses.",
  },
  {
    title: "Mission",
    icon: Target,
    description:
      "We strive to lead in providing top-tier facility management solutions across Dubai. By integrating advanced technology and sustainable practices, we aim to exceed our clients' expectations, focusing on the growth and well-being of our employees.",
  },
  {
    title: "Values",
    icon: Sparkles,
    tags: ["Excellence", "Reliability", "Innovation", "Stewardship", "Integrity"],
    footer: "These are the pillars of SASFM",
  },
];

export default function VisionMissionValues() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {pillars.map((pillar, i) => (
        <motion.div
          key={pillar.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-paper p-8 shadow-[0_16px_32px_-24px_rgba(16,25,46,0.25)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-20px_rgba(217,155,66,0.35)]"
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber via-amber-dark to-teal scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/10 border border-amber/30 text-amber-dark transition-colors duration-300 group-hover:bg-amber group-hover:text-ink">
            <pillar.icon className="h-6 w-6" strokeWidth={1.75} />
          </span>

          <h3 className="mt-6 font-display font-bold text-2xl text-ink">
            {pillar.title}
          </h3>
          {pillar.description && (
            <p className="mt-4 text-slate leading-relaxed">
              {pillar.description}
            </p>
          )}
          {pillar.tags && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {pillar.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono-label text-xs uppercase text-ink border border-dashed border-amber/40 bg-amber/5 rounded-full px-3 py-1.5"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {pillar.footer && (
            <p className="mt-5 text-sm text-slate/70 italic">{pillar.footer}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
