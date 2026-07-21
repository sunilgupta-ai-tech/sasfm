"use client";

import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold max-w-lg leading-snug"
        >
          Ready to see what one accountable team can do for your portfolio?
        </motion.h2>
        <a
          href="/enquiry"
          className="shrink-0 bg-amber text-ink font-mono-label text-sm uppercase px-7 py-4 hover:bg-paper transition-colors"
        >
          Enquiry Now
        </a>
      </div>
    </section>
  );
}
