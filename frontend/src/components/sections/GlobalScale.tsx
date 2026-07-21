"use client";

import { motion } from "framer-motion";
import { scaleStats } from "@/data/content";
import CountUp from "@/components/CountUp";
import StatImage from "@/components/StatImage";
import {
  WorkforceIllustration,
  GlobeIllustration,
  SavingsIllustration,
  SustainabilityIllustration,
  SpendIllustration,
} from "@/components/StatIllustrations";

const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
  workforce: WorkforceIllustration,
  reach: GlobeIllustration,
  savings: SavingsIllustration,
  sustainability: SustainabilityIllustration,
  spend: SpendIllustration,
};

export default function GlobalScale() {
  return (
    <section className="py-24 md:py-28 bg-paper-dim border-t border-line">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-serif-display text-4xl md:text-5xl text-ink mb-12">
          Delivery on a Global Scale
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          {scaleStats.map((stat, i) => {
            const Illustration = ILLUSTRATIONS[stat.id] ?? WorkforceIllustration;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col transition-shadow duration-300 hover:shadow-[0_16px_32px_-20px_rgba(16,25,46,0.3)]"
              >
                <div className="bg-teal/15 group-hover:bg-teal/25 transition-colors duration-300 px-5 py-6 flex-1 flex items-center min-h-[104px]">
                  <p className="text-base font-medium text-ink leading-snug">
                    {stat.headline}
                  </p>
                </div>
                <div className="bg-paper px-5 py-8 flex flex-col items-start gap-5">
                  <motion.div whileHover={{ scale: 1.06 }}>
                    <StatImage
                      src={stat.image}
                      alt={stat.label}
                      className="h-20"
                      fallback={<Illustration />}
                    />
                  </motion.div>
                  <div>
                    <p className="text-5xl md:text-6xl font-display font-semibold text-ink">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="text-sm text-slate mt-2 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
