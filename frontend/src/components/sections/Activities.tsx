"use client";

import { motion } from "framer-motion";
import {
  Snowflake,
  Droplets,
  Building2,
  Gauge,
  FireExtinguisher,
  AirVent,
  Blinds,
  Camera,
  Waves,
  Lightbulb,
  SprayCan,
  ShieldCheck,
  Wrench,
  Fan,
  Signpost,
  Bot,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const activities: { icon: LucideIcon; label: string }[] = [
  { icon: Snowflake, label: "Chiller Operations" },
  { icon: Droplets, label: "TSE/RO/Gray Water Plan" },
  { icon: Building2, label: "Building Maintenance & Lifting Equipment" },
  { icon: Gauge, label: "BMS System" },
  { icon: FireExtinguisher, label: "Fire Portable Water" },
  { icon: AirVent, label: "HVAC Operations" },
  { icon: Blinds, label: "Rolling Shutter" },
  { icon: Camera, label: "Security Access & CCTV" },
  { icon: Waves, label: "Water Tank Cleaning" },
  { icon: Lightbulb, label: "Neon LED Signage" },
  { icon: SprayCan, label: "Cleaning Services" },
  { icon: ShieldCheck, label: "Security Services" },
  { icon: Wrench, label: "Plumbing Services" },
  { icon: Fan, label: "Cooling Tower" },
  { icon: Signpost, label: "Infrastructure" },
  { icon: Bot, label: "Automation System" },
  { icon: Sparkles, label: "Facade Cleaning" },
];

function ActivityCard({
  icon: Icon,
  label,
  delay,
}: {
  icon: LucideIcon;
  label: string;
  delay: number;
}) {
  return (
    <div className="group flex w-56 shrink-0 flex-col items-center gap-4 border border-line bg-paper px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-[0_20px_40px_-24px_rgba(16,25,46,0.35)]">
      <motion.span
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal/10 transition-colors duration-300 group-hover:bg-amber/15"
      >
        <Icon className="h-7 w-7 text-teal transition-colors duration-300 group-hover:text-amber-dark" strokeWidth={1.5} />
      </motion.span>
      <p className="text-sm font-semibold text-ink leading-snug">{label}</p>
    </div>
  );
}

export default function Activities() {
  return (
    <section id="offerings" className="py-24 md:py-32 bg-paper-dim overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-14">
        <p className="font-mono-label text-xs uppercase text-amber-dark mb-4">
          Activities
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
          Carrying out every discipline, under one roof.
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex w-max gap-5 py-2 animate-marquee">
          {[...activities, ...activities].map((item, i) => (
            <ActivityCard
              key={`${item.label}-${i}`}
              icon={item.icon}
              label={item.label}
              delay={(i % activities.length) * 0.15}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper-dim to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper-dim to-transparent" />
      </div>
    </section>
  );
}
