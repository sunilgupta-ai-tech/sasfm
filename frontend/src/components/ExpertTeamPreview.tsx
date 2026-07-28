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

export default function ExpertTeamPreview({
  members,
}: {
  members: TeamMember[];
}) {
  return (
    <div className="text-center">
      <span className="inline-block font-mono-label text-xs uppercase text-teal bg-teal/10 rounded-full px-4 py-2">
        Our Expert Team
      </span>
      <h2 className="mt-6 font-display font-bold text-3xl md:text-4xl text-ink leading-tight">
        Driving Excellence in Facility Management
      </h2>
      <p className="mt-5 max-w-3xl mx-auto text-slate leading-relaxed">
        We take immense pride in the diverse group of professional engineers
        who form the backbone of our organization in Dubai. With their
        expertise, experience, and commitment to excellence, our team
        ensures the seamless operation and maintenance of your facilities,
        allowing you to focus on your core business.
      </p>

      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-12">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group"
          >
            <div className="relative mx-auto h-36 w-36 rounded-full p-[3px] bg-gradient-to-br from-amber via-amber-dark to-teal shadow-[0_16px_32px_-20px_rgba(16,25,46,0.35)] transition-transform duration-300 group-hover:scale-105">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-paper border-2 border-paper">
                <SafeImage
                  src={member.image}
                  alt={member.name}
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber/15 to-teal/15">
                      <span className="font-serif-display text-2xl text-ink/70">
                        {initials(member.name)}
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
            <h3 className="mt-5 font-semibold text-ink">{member.name}</h3>
            <p className="mt-1 text-sm text-slate">{member.title}</p>
            <span className="mt-2 mx-auto block h-0.5 w-8 bg-amber scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
