"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { LeadershipMember } from "@/data/content";

export default function LeadershipAccordion({
  members,
}: {
  members: LeadershipMember[];
}) {
  const [openId, setOpenId] = useState<string | null>(members[0]?.id ?? null);

  return (
    <div className="border-t border-line">
      {members.map((member) => {
        const isOpen = openId === member.id;
        return (
          <div key={member.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : member.id)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-6 py-8 text-left group"
            >
              <div>
                <h2 className="font-serif-display text-3xl md:text-4xl text-ink">
                  {member.name}
                </h2>
                <p className="mt-2 text-slate">{member.title}</p>
              </div>
              <span className="shrink-0 mt-2 text-ink group-hover:text-amber-dark transition-colors">
                {isOpen ? (
                  <ChevronUp className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 grid md:grid-cols-[320px_1fr] gap-8 md:gap-12">
                    <div className="relative aspect-[4/5] w-full max-w-xs bg-paper-dim border border-line overflow-hidden">
                      <SafeImage
                        src={member.image}
                        alt={member.name}
                        fallback={
                          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--color-paper-dim)_0%,var(--color-line)_100%)]">
                            <span className="font-serif-display text-3xl text-steel">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        }
                      />
                    </div>
                    <div className="space-y-5">
                      {member.bio.split("\n\n").map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-slate leading-relaxed text-[17px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
