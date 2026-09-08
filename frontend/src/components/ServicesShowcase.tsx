"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  details: string;
};

function ServiceCard({
  item,
  isOpen,
  onToggle,
}: {
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper p-8 transition-colors hover:border-2 hover:border-ink">
      <h3 className="font-semibold text-lg text-ink leading-snug">
        {item.title}
      </h3>
      <p className="mt-3 text-sm text-slate leading-relaxed">
        {item.description}
      </p>

      <button
        type="button"
        onClick={onToggle}
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
            <div
              className="mt-4 text-sm text-slate leading-relaxed border-l-2 border-amber/40 pl-4 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-ink [&_em]:italic [&_u]:underline [&_s]:line-through [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mt-1"
              dangerouslySetInnerHTML={{ __html: item.details }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesShowcase({
  hardServices,
  softServices,
}: {
  hardServices: ServiceItem[];
  softServices: ServiceItem[];
}) {
  const [tab, setTab] = useState<"hard" | "soft">("hard");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = (tab === "hard" ? hardServices : softServices).slice(0, 6);

  function selectTab(next: "hard" | "soft") {
    setTab(next);
    setOpenId(null);
  }

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-6 bg-amber" />
          <p className="font-mono-label text-xs uppercase text-amber-dark">
            Services
          </p>
        </div>
        <h2 className="font-serif-display text-4xl md:text-5xl text-ink leading-tight max-w-2xl">
          Integrated Facility Management Services
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => selectTab("hard")}
              className={`font-mono-label text-xs uppercase px-6 py-3 rounded-full border transition-colors ${
                tab === "hard"
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink border-line hover:border-ink"
              }`}
            >
              Hard Services
            </button>
            <button
              type="button"
              onClick={() => selectTab("soft")}
              className={`font-mono-label text-xs uppercase px-6 py-3 rounded-full border transition-colors ${
                tab === "soft"
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink border-line hover:border-ink"
              }`}
            >
              Soft Services
            </button>
          </div>

          <Link
            href={tab === "hard" ? "/services/hard-services" : "/services/soft-services"}
            className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors shrink-0"
          >
            View all Services →
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
