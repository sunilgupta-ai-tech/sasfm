import Link from "next/link";
import ServiceAccordionGrid from "@/components/ServiceAccordionGrid";
import { getServices } from "@/lib/data";

export default async function SoftServices() {
  const softServices = await getServices("soft");

  return (
    <section id="soft-services" className="py-24 md:py-32 border-y border-line">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono-label text-xs uppercase text-amber-dark mb-6">
          Soft Services
        </p>
        <p className="font-serif-display text-3xl md:text-4xl leading-snug max-w-3xl mb-16">
          <span className="text-ink">
            The services that shape how a building feels to use.{" "}
          </span>
          <span className="text-steel">
            Run daily, not just planned for, they&apos;re what occupants
            notice most.
          </span>
        </p>

        <ServiceAccordionGrid items={softServices} />

        <div className="mt-4">
          <Link
            href="/services/soft-services"
            className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
          >
            View all soft services →
          </Link>
        </div>
      </div>
    </section>
  );
}
