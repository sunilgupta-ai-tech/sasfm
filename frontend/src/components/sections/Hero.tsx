"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Modal from "@/components/Modal";
import SnaggingRequestForm from "@/components/SnaggingRequestForm";

const HEADLINE_LINES = [
  { text: "The FM Company That", accent: false },
  { text: "Does the Work In‑House", accent: true },
];

const HERO_VIDEO_SRC = "/videos/hero-section.mp4";

const trustStrip = [
  "Since 2006",
  "One License, All Activities",
  "In-House Teams Only",
  "Free Certified Snagging",
  "24/7 Response",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function HeroVideoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative"
    >
      {/* Soft ambient glow, breathing behind the card */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 rounded-[2rem] bg-amber/20 blur-2xl -z-10"
      />

      <div className="relative rounded-2xl overflow-hidden bg-ink border border-ink/15 shadow-[10px_10px_0_0_var(--color-line),0_30px_60px_-25px_rgba(16,25,46,0.35)] aspect-[4/3]">
        <video
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [snaggingOpen, setSnaggingOpen] = useState(false);

  return (
    <section id="home" className="relative bg-paper-dim overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          aria-hidden
          animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-amber/15 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-0 bottom-0 h-[24rem] w-[24rem] rounded-full bg-teal/15 blur-3xl"
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
          <pattern
            id="hero-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-[1.35fr_1fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-6 bg-amber" />
            <p className="font-mono-label text-xs uppercase text-amber-dark">
              Facility Management Company Dubai · Since 2006
            </p>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display font-bold text-5xl sm:text-6xl md:text-[3.5rem] leading-[1.05] text-ink"
          >
            {HEADLINE_LINES.map(({ text, accent }, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  variants={line}
                  className={`block ${accent ? "text-amber-dark relative" : ""}`}
                >
                  {text}
                  {accent && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                      className="absolute left-0 -bottom-1 h-2 w-full bg-amber/25 origin-left -z-10"
                    />
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 text-lg text-slate max-w-lg leading-relaxed"
          >
            SASFM is a licensed contractor and facility management company in
            one. Our in-house MEP, civil, and cleaning teams maintain your
            building, with no subcontractors, no markups, and one
            accountable partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => setSnaggingOpen(true)}
              className="bg-amber text-ink font-semibold text-sm px-7 py-4 hover:bg-amber-dark hover:text-paper transition-colors"
            >
              Book a Free Building Snagging
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("get-started")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-ink text-ink font-semibold text-sm px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
            >
              Get an FM Quote
            </button>
          </motion.div>
        </div>

        <HeroVideoCard />
      </div>

      <div className="relative z-10 bg-ink border-t border-paper/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-paper/10">
        {trustStrip.map((label) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 px-5 sm:px-6 py-5 text-xs font-mono-label uppercase text-paper/85"
          >
            <span className="h-1.5 w-1.5 shrink-0 bg-amber" aria-hidden />
            {label}
          </div>
        ))}
      </div>

      <Modal open={snaggingOpen} onClose={() => setSnaggingOpen(false)}>
        <SnaggingRequestForm />
      </Modal>
    </section>
  );
}
