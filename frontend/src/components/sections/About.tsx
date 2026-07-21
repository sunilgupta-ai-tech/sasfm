"use client";

import { motion } from "framer-motion";
import { values } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-paper-dim border-y border-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
              Built for portfolios that can&apos;t afford downtime.
            </h2>
          </div>
          <p className="text-slate leading-relaxed text-lg">
            Sun and Sand Facility Management Services (SASFM) is a
            Dubai-based group of companies delivering cleaning, MEP, civil,
            and total facilities management — hard and soft services under
            one accountable team. Driven by technology and sustainability,
            we&apos;re committed to leading the regional FM industry with
            solutions tailored to every client&apos;s needs.
            <br />
            <a
              href="/about"
              className="inline-block mt-4 font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
            >
              Meet our board & team →
            </a>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="h-1 w-8 bg-amber mb-4" />
              <h3 className="font-semibold text-ink text-base">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
