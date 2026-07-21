"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = match ? parseFloat(numericStr.replace(/,/g, "")) : 0;
  const decimals = numericStr.includes(".")
    ? numericStr.split(".")[1].length
    : 0;
  const hasCommas = numericStr.includes(",");

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 22, stiffness: 60 });

  useEffect(() => {
    if (isInView && match) motionValue.set(target);
  }, [isInView, motionValue, target, match]);

  useEffect(() => {
    if (!match) return;
    const unsubscribe = spring.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = decimals ? latest.toFixed(decimals) : Math.round(latest);
      const formatted = hasCommas
        ? Number(rounded).toLocaleString("en-US")
        : String(rounded);
      ref.current.textContent = `${prefix}${formatted}${suffix}`;
    });
    return unsubscribe;
  }, [spring, prefix, suffix, decimals, hasCommas, match]);

  return (
    <span ref={ref} className={className}>
      {match ? `${prefix}0${suffix}` : value}
    </span>
  );
}
