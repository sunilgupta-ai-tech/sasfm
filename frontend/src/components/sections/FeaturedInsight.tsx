import Link from "next/link";
import SafeImage from "@/components/SafeImage";

// Drop an image into public/images/insights/featured-report.jpg and set the
// path here, or paste a full https:// URL. Falls back to a designed
// placeholder if left empty or if the file is missing.
const IMAGE_SRC = "/images/insights/featured-report.jpg";

export default function FeaturedInsight() {
  return (
    <section className="grid md:grid-cols-[1fr_1.1fr] min-h-[480px] md:min-h-[560px]">
      {/* Left: dark neutral panel — intentionally not the brand navy, so this
          reads as editorial content rather than another marketing CTA. */}
      <div className="bg-[#454C52] text-paper flex flex-col justify-center px-8 sm:px-12 md:px-14 py-16">
        <h2 className="font-serif-display text-4xl sm:text-5xl leading-[1.08] max-w-lg">
          What the Data Reveals About FM Outsourcing
        </h2>
        <p className="mt-6 text-paper/75 max-w-md leading-relaxed">
          Our first-of-its-kind contracting study shows what&apos;s working
          in facilities outsourcing today — and what isn&apos;t.
        </p>
        <Link
          href="/blog"
          className="mt-9 inline-flex w-fit bg-paper text-ink font-semibold text-sm px-7 py-4 hover:bg-amber transition-colors"
        >
          Explore the Insights
        </Link>
      </div>

      {/* Right: image */}
      <div className="relative bg-ink overflow-hidden min-h-[280px]">
        <SafeImage
          src={IMAGE_SRC}
          alt="Facilities management technician performing building maintenance"
          fallback={
            <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)] flex items-center justify-center">
              <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
                <pattern
                  id="featured-insight-pattern"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(35)"
                >
                  <line x1="0" y1="0" x2="0" y2="24" stroke="var(--color-paper)" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#featured-insight-pattern)" />
              </svg>
              <span className="font-mono-label text-xs uppercase text-paper/40 relative">
                Add your image — see public/images/insights/README.txt
              </span>
            </div>
          }
        />
      </div>
    </section>
  );
}
