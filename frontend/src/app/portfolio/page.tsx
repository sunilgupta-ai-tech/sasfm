import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioProjects } from "@/lib/data";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

// Drop a banner image into public/images/portfolio/banner.jpg and set the
// path here, or paste a full https:// URL. See public/images/portfolio/README.txt.
const IMAGE_SRC = "/images/portfolio/banner.png";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore SASFM's facilities management portfolio across commercial, educational, healthcare, residential and town house properties.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <>
      <Header />
      <main>
        <ServicePageHero
          title="Our Projects"
          ctaLabel="Enquiry Now"
          ctaHref="/enquiry"
          imageSrc={IMAGE_SRC}
          imageAlt="SASFM managed properties across commercial, healthcare and residential sectors"
          tabs={[
            { label: "Overview", href: "#overview" },
            { label: "All Projects", href: "#projects" },
          ]}
        />

        <div id="overview" className="mx-auto max-w-7xl px-6 pt-16">
          <h2 className="text-ink font-semibold max-w-2xl leading-relaxed text-lg">
            From commercial towers to residential communities, each project
            runs on the same accountable, data-driven service model.
          </h2>
        </div>

        <div id="projects" className="mx-auto max-w-7xl px-6 pt-10 pb-24">
          <PortfolioGrid projects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
}
