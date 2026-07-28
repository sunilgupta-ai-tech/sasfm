"use client";

import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/97143206789";
const QUOTE_EMAIL = "info@sasfm.co";

export default function GetStartedCta() {
  return (
    <section id="get-started" className="bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-6 bg-amber" />
          <p className="font-mono-label text-xs uppercase text-amber">
            Get Started
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display font-bold text-4xl md:text-5xl leading-tight text-paper"
        >
          Tell us about your building — we&apos;ll schedule your certified
          inspection.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-lg text-paper/70"
        >
          Start with a free snag. Stay for the FM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber text-ink font-semibold text-sm px-7 py-4 rounded-md hover:bg-amber-dark transition-colors"
          >
            WhatsApp Us
          </a>
          <a
            href={`mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(
              "Quote Request"
            )}`}
            className="border border-paper text-paper font-semibold text-sm px-7 py-4 rounded-md hover:bg-paper hover:text-ink transition-colors"
          >
            Email a Quote Request
          </a>
        </motion.div>
      </div>
    </section>
  );
}
