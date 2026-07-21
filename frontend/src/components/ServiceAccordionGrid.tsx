"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  details: string;
};

export default function ServiceAccordionGrid({
  items,
}: {
  items: ServiceItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-3 gap-x-10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-t border-line pt-8 pb-8">
            <h3 className="font-serif-display text-2xl text-ink leading-snug">
              {item.title}
            </h3>
            <p className="mt-4 text-slate leading-relaxed">
              {item.description}
            </p>

            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="mt-5 inline-flex items-center gap-3 font-semibold text-sm text-ink hover:text-amber-dark transition-colors"
            >
              <span
                className={`h-px bg-amber transition-all duration-300 ${
                  isOpen ? "w-4" : "w-8"
                }`}
              />
              {isOpen ? "Show Less" : "Explore Service"}
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
                  <p className="mt-4 text-sm text-slate leading-relaxed border-l-2 border-amber/40 pl-4">
                    {item.details}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
