"use client";

import { useState } from "react";

export default function SafeImage({
  src,
  alt,
  className = "",
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return <>{fallback}</>;

  return (
    // Plain <img> on purpose: these are seed/placeholder paths that may not
    // exist yet (and later may point at a backend-provided URL), so we need
    // a runtime onError fallback rather than build-time validation.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
