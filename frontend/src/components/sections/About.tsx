"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VisionMissionValues from "@/components/VisionMissionValues";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="py-24 md:py-32 bg-paper-dim border-y border-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
              One Accountable Partner Since 2006.
            </h2>
          </div>
          <div className="text-slate leading-relaxed text-lg">
            <p>
              Sun and Sand Facility Management Services (SASFM) is a
              Dubai-based group of companies delivering cleaning, MEP, civil,
              and total facilities management — hard and soft services under
              one accountable team.
            </p>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-5">
                    At SASFM, we are driven by a commitment to deliver
                    exceptional experiences to our clients that exceed their
                    expectations. We strive to go above and beyond by
                    leveraging technology and embracing sustainability,
                    ensuring that we provide the right solutions tailored to
                    our clients&apos; needs.
                  </p>
                  <p className="mt-5">
                    With a focus on long-term sustainability, we adopt a
                    comprehensive approach to facility management. Our team
                    actively identifies areas for cost reduction and
                    implements new processes and upgrades that balance
                    upfront costs with efficiency gains, all while
                    maintaining the safety and well-being of your employees.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-5 inline-flex items-center gap-3 font-semibold text-sm text-ink hover:text-amber-dark transition-colors"
            >
              <span
                className={`h-px bg-amber transition-all duration-300 ${
                  open ? "w-4" : "w-8"
                }`}
              />
              {open ? "Show Less" : "Explore About"}
            </button>

            <a
              href="/about"
              className="block mt-5 font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors w-fit"
            >
              Meet our board & team →
            </a>
          </div>
        </div>

        <VisionMissionValues />
      </div>
    </section>
  );
}
