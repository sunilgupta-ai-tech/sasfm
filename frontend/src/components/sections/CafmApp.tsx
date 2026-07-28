"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Modal from "@/components/Modal";

const APP_SCREENSHOT_SRC = "/images/home/in-house-cafm-system.png";
const DEMO_VIDEO_ID = "S45ysoNVbMg";

const features = [
  "Online Request",
  "Owner & Tenant Management",
  "Maintenance Schedules",
  "Documents Management",
  "Notification Alerts",
];

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-[280px] aspect-[9/16] rounded-[2.5rem] border-8 border-ink bg-ink shadow-[0_30px_60px_-25px_rgba(16,25,46,0.4)] overflow-hidden"
    >
      {APP_SCREENSHOT_SRC ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={APP_SCREENSHOT_SRC}
          alt="Lazim resident app"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-paper flex items-center justify-center px-6 text-center">
          <span className="font-mono-label text-xs uppercase text-slate/60">
            Add your Lazim app screenshot
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function CafmApp() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-[0.8fr_1fr] gap-16 items-center">
        <PhoneMockup />

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-4xl md:text-5xl leading-tight"
          >
            <span className="text-ink">In-House CAFM System</span>
            <br />
            <span className="text-amber-dark">to manage properties</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 space-y-4 text-slate leading-relaxed"
          >
            <p>
              Total facility management app under{" "}
              <span className="text-teal font-semibold">Lazim Mobile App</span>.
            </p>
            <p>
              It&apos;s designed with a vision to enable the much needed
              integration between all property stakeholders including
              owners, tenants, owners association, property management,
              facility management and utility service providers. This
              seamless integration between multiple stakeholders enriches
              the end-user experience — owners and tenants alike enjoy a
              hassle-free experience of residing in Dubai.
            </p>
          </motion.div>

          <motion.ol
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-7 space-y-2"
          >
            {features.map((feature, i) => (
              <li
                key={feature}
                className="flex items-baseline gap-2 font-semibold text-amber-dark"
              >
                <span className="font-mono-label text-sm">{i + 1}.</span>
                {feature}
              </li>
            ))}
          </motion.ol>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex items-center gap-6"
          >
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-label="Watch: See how it works"
              className="relative shrink-0 h-20 w-28 rounded-lg bg-ink flex items-center justify-center cursor-pointer group"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 group-hover:bg-paper transition-colors">
                <Play className="h-4 w-4 text-ink ml-0.5" fill="currentColor" />
              </span>
            </button>
            <div>
              <p className="font-semibold text-lg text-amber-dark">
                See how it works
              </p>
              <p className="mt-1 text-sm text-slate leading-relaxed">
                Request all services from our in-house{" "}
                <span className="text-teal font-semibold">Lazim App</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        maxWidthClassName="max-w-3xl"
      >
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1`}
            title="Lazim App — See how it works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </Modal>
    </section>
  );
}
