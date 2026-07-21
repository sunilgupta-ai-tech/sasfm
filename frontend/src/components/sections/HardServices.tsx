import Link from "next/link";
import ServiceAccordionGrid from "@/components/ServiceAccordionGrid";
import { getServices } from "@/lib/data";

export default async function HardServices() {
  const hardServices = await getServices("hard");

  return (
    <section id="hard-services" className="py-24 md:py-32 border-b border-line">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono-label text-xs uppercase text-amber-dark mb-6">
          Hard Services
        </p>
        <p className="font-serif-display text-3xl md:text-4xl leading-snug max-w-3xl mb-16">
          <span className="text-ink">
            The technical systems that keep a building running.{" "}
          </span>
          <span className="text-steel">
            Self-performed, planned and compliance-driven, every time.
          </span>
        </p>

        <ServiceAccordionGrid items={hardServices} />

        <div className="mt-4">
          <Link
            href="/services/hard-services"
            className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
          >
            View all hard services →
          </Link>
        </div>
      </div>
    </section>
  );
}
