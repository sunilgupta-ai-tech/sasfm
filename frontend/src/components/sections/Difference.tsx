"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

type ModelId = "typical" | "sasfm";

const typicalSteps = [
  "MEP subcontractors",
  "Cleaning subcontractors",
  "Civil subcontractors",
];

const features = [
  {
    title: "Accountable",
    description:
      "The company managing your building is the one fixing it. No blame passed to a third party.",
  },
  {
    title: "Faster",
    description:
      "Emergency callouts don't wait on a subcontractor's schedule. Our teams are in-house.",
  },
  {
    title: "Lower cost",
    description:
      "No subcontractor margin stacked into your annual maintenance contract.",
  },
  {
    title: "Consistent",
    description:
      "Every technician is trained, vetted, and managed directly by SASFM.",
  },
];

export default function Difference() {
  const [selected, setSelected] = useState<ModelId>("sasfm");

  return (
    <section className="py-24 md:py-32 bg-paper-dim">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-6 bg-amber" />
          <p className="font-mono-label text-xs uppercase text-amber-dark">
            The Difference
          </p>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight max-w-2xl">
          One License. One Team. No Subcontractors.
        </h2>
        <p className="mt-5 text-lg text-slate max-w-2xl leading-relaxed">
          Most FM companies in Dubai secure a contract and then subcontract
          the actual work. Our trade license covers all maintenance
          activities, with our own technicians managing your building.
        </p>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {/* Typical FM model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelected("typical")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelected("typical");
            }}
            className={`relative cursor-pointer p-8 transition-shadow ${
              selected === "typical"
                ? "border-2 border-ink bg-paper shadow-[0_25px_50px_-20px_rgba(217,155,66,0.45)]"
                : "border border-line bg-paper"
            }`}
          >
            <p
              className={`font-mono-label text-xs uppercase ${
                selected === "typical" ? "text-amber-dark" : "text-slate"
              }`}
            >
              Typical Facility Management Model
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="bg-ink text-paper font-semibold text-sm px-6 py-3 rounded-md">
                Your building
              </div>
              <ArrowDown className="h-4 w-4 text-steel" strokeWidth={1.5} />
              <div
                className={`text-ink font-semibold text-sm px-6 py-3 rounded-md ${
                  selected === "typical"
                    ? "bg-amber"
                    : "border border-ink/60 bg-paper"
                }`}
              >
                Facility Management company
              </div>
              <ArrowDown className="h-4 w-4 text-steel" strokeWidth={1.5} />
              <div className="flex flex-wrap justify-center gap-3">
                {typicalSteps.map((step) => (
                  <span
                    key={step}
                    className="border border-dashed border-line text-ink text-sm px-4 py-2.5 rounded-md"
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-dashed border-line pt-6">
              <p
                className={`leading-relaxed ${
                  selected === "typical"
                    ? "text-ink font-semibold"
                    : "text-slate"
                }`}
              >
                Three companies, stacked margins, and finger-pointing when
                something fails.
              </p>
            </div>
          </motion.div>

          {/* SASFM model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => setSelected("sasfm")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelected("sasfm");
            }}
            className={`relative cursor-pointer p-8 transition-shadow ${
              selected === "sasfm"
                ? "border-2 border-ink bg-paper shadow-[0_25px_50px_-20px_rgba(217,155,66,0.45)]"
                : "border border-line bg-paper"
            }`}
          >
            <p
              className={`font-mono-label text-xs uppercase ${
                selected === "sasfm" ? "text-amber-dark" : "text-slate"
              }`}
            >
              The SASFM Model
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="bg-ink text-paper font-semibold text-sm px-6 py-3 rounded-md">
                Your building
              </div>
              <ArrowDown className="h-4 w-4 text-steel" strokeWidth={1.5} />
              <div
                className={`text-ink font-semibold text-sm px-6 py-3 rounded-md ${
                  selected === "sasfm"
                    ? "bg-amber"
                    : "border border-ink/60 bg-paper"
                }`}
              >
                SASFM — contractor + Facility Management
              </div>
            </div>

            <div className="mt-10 border-t border-dashed border-line pt-6">
              <p
                className={`leading-relaxed ${
                  selected === "sasfm" ? "text-ink font-semibold" : "text-slate"
                }`}
              >
                One contract. One team. One company answerable for everything
                — from AC breakdowns to civil repairs.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-t-2 border-ink pt-5"
            >
              <h3 className="font-semibold text-lg text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
