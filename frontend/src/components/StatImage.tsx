"use client";

import { useState } from "react";

export default function StatImage({
  src,
  alt,
  fallback,
  className = "h-16",
}: {
  src: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return <>{fallback}</>;

  return (
    // Plain <img> on purpose: these live in /public/images/delivery-scale and
    // may or may not exist yet, so we need a runtime onError fallback.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`w-auto object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
