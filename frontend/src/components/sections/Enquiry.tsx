"use client";

import { motion } from "framer-motion";
import EnquiryForm from "@/components/EnquiryForm";

export default function Enquiry() {
  return (
    <section id="enquiry" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
            Enquiry Now
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
            Tell us about your portfolio.
          </h2>
          <p className="mt-5 text-slate leading-relaxed max-w-md">
            Share a few details and one of our facilities management
            specialists will get back to you within one business day.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "A dedicated specialist reviews every enquiry personally",
              "No obligation — we'll scope before we quote",
              "Response within one business day, worldwide",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate">
                <span className="mt-1.5 h-1.5 w-1.5 bg-amber shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <EnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}
