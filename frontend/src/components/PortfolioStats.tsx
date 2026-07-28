"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "20",
    accent: "+",
    description: "Years operating in Dubai as part of SASD Group",
  },
  {
    value: "1",
    accent: "×",
    description:
      "License covering every activity — MEP, civil, cleaning, specialist works",
  },
  {
    value: "24",
    accent: "/7",
    description: "Emergency response from in-house technicians",
  },
];

export default function PortfolioStats() {
  return (
    <div className="mb-14 grid sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="border border-line bg-paper p-5 shadow-[0_16px_32px_-24px_rgba(16,25,46,0.25)]"
        >
          <p className="font-display font-bold text-3xl text-ink">
            {stat.value}
            <span className="text-amber-dark">{stat.accent}</span>
          </p>
          <p className="mt-2 text-sm text-slate leading-relaxed">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
