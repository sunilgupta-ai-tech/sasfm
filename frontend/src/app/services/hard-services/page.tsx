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

// Drop your image into public/images/ (e.g. "hard-services-hero.jpg") and set
// the path here, or paste a full https:// URL. See public/images/README.txt.
const IMAGE_SRC = "/images/services/hard-services-hero.jpg";

export const metadata: Metadata = {
  title: "Hard Services",
  description:
    "SASFM's hard services — electrical, HVAC, plumbing, fire & life safety, vertical transport and structural maintenance.",
  alternates: { canonical: "/services/hard-services" },
};

export default async function HardServicesPage() {
  const hardServices = await getServices("hard");

  return (
    <>
      <Header />
      <main>
        <ServicePageHero
          eyebrow="Service Type"
          title="Hard Services"
          ctaLabel="Enquiry Now"
          ctaHref="/enquiry"
          imageSrc={IMAGE_SRC}
          imageAlt="Hard services — technicians maintaining electrical and HVAC systems"
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
              The technical systems that keep a building running.{" "}
            </span>
            <span className="text-steel">
              Self-performed, planned and compliance-driven, every time.
            </span>
          </p>
        </div>

        <div id="services" className="mx-auto max-w-7xl px-6 pt-16 pb-24">
          <ServiceAccordionGrid items={hardServices} />

          <div className="mt-16 border-t border-line pt-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate">Need soft services too?</p>
            <Link
              href="/services/soft-services"
              className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors"
            >
              View Soft Services →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
