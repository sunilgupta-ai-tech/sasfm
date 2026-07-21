"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedImage({
  src,
  alt,
  placeholderLabel,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative w-full bg-ink overflow-hidden ${className}`}
    >
      {/* Persistent gentle float, independent of the one-time entrance above,
          so the animation stays visibly alive rather than finishing in 0.6s. */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={fit === "contain" ? "object-contain" : "object-cover"}
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)] flex items-center justify-center">
            <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
              <pattern
                id="intro-image-pattern"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(35)"
              >
                <line x1="0" y1="0" x2="0" y2="24" stroke="var(--color-paper)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#intro-image-pattern)" />
            </svg>
            <span className="font-mono-label text-xs uppercase text-paper/40 relative px-6 text-center">
              {placeholderLabel}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
