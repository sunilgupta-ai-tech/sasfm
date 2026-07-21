"use client";

import { motion, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Play, Pause, ChevronRight } from "lucide-react";

// Drop your hosted video URL here — e.g. "/videos/hero.mp4" (place the file in
// /public/videos/) or a full https:// URL to an externally hosted video.
// Leave empty to show the designed placeholder graphic instead.
const HERO_VIDEO_SRC = "/videos/hero-section.mp4";

const HEADLINE_LINES = ["Integrated", "Facilities", "Management"];

const quickLinks = [
  { id: "operations", title: "Reliable Operations & Maintenance" },
  { id: "technology", title: "Smart Building Technology" },
  { id: "workplace", title: "Workplace & Experience" },
  { id: "sector", title: "Sector-Specialized Delivery" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function toggle() {
    const video = videoRef.current;
    if (!video) {
      setPlaying((p) => !p);
      return;
    }
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying((p) => !p);
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {HERO_VIDEO_SRC ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)]">
          <svg className="absolute inset-0 h-full w-full opacity-[0.18]">
            <pattern
              id="hero-diag"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <line x1="0" y1="0" x2="0" y2="22" stroke="var(--color-paper)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-diag)" />
          </svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-44 sm:w-56 aspect-[9/18] rounded-[1.4rem] border-2 border-paper/25 bg-ink/60 backdrop-blur-sm p-2">
              <div className="h-full w-full rounded-[1rem] bg-paper/95 p-3 flex flex-col gap-2">
                <div className="h-2 w-1/2 bg-teal/40 rounded-full" />
                <div className="h-6 rounded-md bg-teal/25 mt-1" />
                <div className="h-2 w-2/3 bg-ink/15 rounded-full mt-2" />
                <div className="h-2 w-1/2 bg-ink/15 rounded-full" />
                <div className="h-2 w-3/4 bg-ink/15 rounded-full" />
                <div className="mt-auto h-7 rounded-md bg-amber/80" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute bottom-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/50 text-paper hover:border-amber hover:text-amber transition-colors"
      >
        {playing ? (
          <Pause className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <Play className="h-4 w-4" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative bg-ink text-paper overflow-hidden">
      {/* left accent strip */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber z-20" aria-hidden />

      <div className="grid md:grid-cols-[minmax(0,42%)_1fr] min-h-[560px] md:min-h-[680px]">
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 md:px-14 py-20 md:py-0">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-wide text-paper/80 mb-6"
          >
            Manage Properties &amp; Portfolios
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-serif-display text-5xl sm:text-6xl md:text-[3.6rem] leading-[1.05] text-paper"
          >
            {HEADLINE_LINES.map((text, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span variants={line} className="block">
                  {text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 text-lg text-paper/75 max-w-md leading-relaxed"
          >
            We help the world&apos;s most influential organizations achieve
            maximum uptime, reduced risk and decarbonization across
            industries and asset types.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10"
          >
            <Link
              href="/enquiry"
              className="group relative inline-flex overflow-hidden bg-paper text-ink font-semibold text-sm px-7 py-4"
            >
              <span className="absolute inset-0 bg-amber translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">Get in Touch</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative min-h-[320px]">
          <HeroVideo />
        </div>
      </div>

      <div className="relative z-10 border-t border-paper/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-paper/10">
        {quickLinks.map((link) => (
          <Link
            key={link.id}
            href="/#offerings"
            className="group flex items-center justify-between gap-3 px-5 sm:px-7 py-5 text-sm font-semibold text-paper hover:text-amber transition-colors"
          >
            <span className="leading-snug">{link.title}</span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-paper/50 group-hover:text-amber group-hover:translate-x-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
