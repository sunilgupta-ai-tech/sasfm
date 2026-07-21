import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceAccordionGrid from "@/components/ServiceAccordionGrid";
import { getServices } from "@/lib/data";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

// Drop your image into public/images/ (e.g. "soft-services-hero.jpg") and set
// the path here, or paste a full https:// URL. See public/images/README.txt.
const IMAGE_SRC = "/images/services/soft-services-hero.jpg";

export const metadata: Metadata = {
  title: "Soft Services",
  description:
    "SASFM's soft services — cleaning, pest control, landscaping, security, concierge and lifeguard staffing for enterprise portfolios.",
  alternates: { canonical: "/services/soft-services" },
};

export default async function SoftServicesPage() {
  const softServices = await getServices("soft");

  return (
    <>
      <Header />
      <main>
        <ServicePageHero
          eyebrow="Service Type"
          title="Soft Services"
          ctaLabel="Enquiry Now"
          ctaHref="/enquiry"
          imageSrc={IMAGE_SRC}
          imageAlt="Soft services — cleaning, concierge and landscaping teams at work"
          tabs={[
            { label: "Overview", href: "#overview" },
            { label: "Services", href: "#services" },
            { label: "Related Projects", href: "/portfolio" },
            { label: "Insights & Research", href: "/blog" },
          ]}
        />

        <div id="overview" className="mx-auto max-w-7xl px-6 pt-16">
          <p className="font-serif-display text-3xl md:text-4xl leading-snug max-w-3xl">
            <span className="text-ink">
              The services that shape how a building feels to use.{" "}
            </span>
            <span className="text-steel">
              Run daily, not just planned for, they&apos;re what occupants
              notice most.
            </span>
          </p>
        </div>

        <div id="services" className="mx-auto max-w-7xl px-6 pt-16 pb-24">
          <ServiceAccordionGrid items={softServices} />

          <div className="mt-16 border-t border-line pt-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate">Need hard services too?</p>
            <Link
              href="/services/hard-services"
              className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
            >
              View Hard Services →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
