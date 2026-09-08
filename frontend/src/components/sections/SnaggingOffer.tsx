"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const checklist = [
  "MEP defects — AC, electrical and plumbing faults, graded by severity",
  "Civil & building fabric — cracks, waterproofing, facades, finishes",
  "Fire & life safety observations for compliance",
  "Lifts, pools, gyms and common-area condition",
  "Photographed report with recommended rectification — yours to keep",
];

export default function SnaggingOffer() {
  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <pattern
            id="snagging-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0 L0 0 0 48"
              fill="none"
              stroke="var(--color-paper)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#snagging-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-6 bg-amber" />
            <p className="font-mono-label text-xs uppercase text-amber-dark">
              Complimentary Service Offer
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl leading-tight max-w-lg"
          >
            Free Building Snagging Inspection by Certified Experts
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-paper/75 max-w-md leading-relaxed"
          >
            Before managing your building, or while you are evaluating
            providers, our certified snagging team inspects your property and
            delivers a documented defects report completely free of charge.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 max-w-md"
          >
            <li className="flex items-start gap-3 text-paper/75 leading-relaxed">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                aria-hidden="true"
              />
              <span>
                Our certified snagging team inspects your property and
                provides a free snagging report Dubai, detailing any defects
                found during the inspection.
              </span>
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("get-started")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex bg-amber text-ink font-semibold text-sm px-7 py-4 hover:bg-amber-dark hover:text-paper transition-colors"
            >
              Request Your Free Snagging Report
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl bg-paper border border-ink/15 shadow-[10px_10px_0_0_var(--color-line),0_30px_60px_-25px_rgba(16,25,46,0.35)] p-7 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono-label text-[11px] uppercase text-slate/70">
                Snagging Report
              </p>
              <p className="mt-1 font-serif-display text-xl text-ink">
                Certified Inspection
              </p>
            </div>
            <span className="shrink-0 border-2 border-amber text-amber-dark font-mono-label text-xs uppercase px-3 py-1.5 rounded-md">
              Free
            </span>
          </div>

          <div className="mt-5 border-t border-dashed border-line" />

          <ul className="mt-1">
            {checklist.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-start gap-3 py-4 ${
                  i !== checklist.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-teal/50 bg-teal/10">
                  <Check className="h-3.5 w-3.5 text-teal" strokeWidth={2.5} />
                </span>
                <p className="min-w-0 text-[15px] text-ink leading-snug">{item}</p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-3 pt-4 border-t border-line font-mono-label text-[11px] uppercase text-slate/60">
            <span>SASFM · Dubai</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
