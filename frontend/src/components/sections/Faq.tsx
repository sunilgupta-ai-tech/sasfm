"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What makes SASFM different from other FM companies in Dubai?",
    answer:
      "Most FM companies subcontract the actual maintenance work. SASFM holds one trade license covering every activity — MEP, civil, and cleaning — so the technicians in your building are our own employees, not third parties.",
  },
  {
    question: "Is the building snagging really free?",
    answer:
      "Yes. Whether you're comparing FM providers or already considering us, our certified team inspects your property and hands you a documented, photographed defects report at no cost and with no obligation to sign a contract.",
  },
  {
    question: "What is building snagging?",
    answer:
      "A snagging inspection identifies defects and maintenance issues across a property — MEP systems, civil and structural fabric, fire and life safety, and common areas — so issues are documented and prioritized before they become costly problems.",
  },
  {
    question: "Do you offer annual maintenance contracts?",
    answer:
      "Yes, we offer annual and multi-year maintenance contracts covering both hard and soft services, tailored to your building's specific systems and usage.",
  },
  {
    question: "What areas and property types do you cover?",
    answer:
      "We manage commercial towers, residential buildings, townhouse communities, schools, and healthcare facilities across Dubai.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-paper-dim border-t border-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-6 bg-amber" />
          <p className="font-mono-label text-xs uppercase text-amber-dark">
            FAQ
          </p>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
          Straight answers.
        </h2>

        <div className="mt-14">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-b border-line py-8 first:pt-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left"
                >
                  <span className="font-semibold text-ink text-xl leading-snug">
                    {faq.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-amber-dark transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-6 max-w-3xl text-lg text-slate leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
