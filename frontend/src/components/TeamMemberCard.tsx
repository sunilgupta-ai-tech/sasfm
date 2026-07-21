"use client";

import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import type { TeamMember } from "@/data/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="group border border-line bg-paper p-7 text-center transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(16,25,46,0.35)]"
    >
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-paper-dim border border-line">
        <SafeImage
          src={member.image}
          alt={member.name}
          className="transition-transform duration-500 group-hover:scale-105"
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--color-paper-dim)_0%,var(--color-line)_100%)]">
              <span className="font-serif-display text-2xl text-steel">
                {initials(member.name)}
              </span>
            </div>
          }
        />
      </div>
      <span className="mt-5 mx-auto block h-[3px] w-8 bg-amber scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100" />

      <h3 className="mt-4 font-semibold text-ink">{member.name}</h3>
      <p className="text-sm text-slate mt-1">{member.title}</p>
      <p className="font-mono-label text-[11px] uppercase text-slate/60 mt-3">
        {member.region}
      </p>
    </motion.div>
  );
}
