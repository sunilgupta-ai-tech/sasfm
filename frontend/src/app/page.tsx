import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Hero from "@/components/sections/Hero";
import GlobalScale from "@/components/sections/GlobalScale";
import Activities from "@/components/sections/Activities";
import SoftServices from "@/components/sections/SoftServices";
import HardServices from "@/components/sections/HardServices";
import FeaturedInsight from "@/components/sections/FeaturedInsight";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import BlogPreview from "@/components/sections/BlogPreview";
import CtaBanner from "@/components/sections/CtaBanner";
import Enquiry from "@/components/sections/Enquiry";

// Fetches backend data (portfolio, blog, services) — must render per-request,
// not be statically prerendered at Docker build time, when the backend
// container isn't reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <FeaturedInsight />
        <Activities />
        <SoftServices />
        <HardServices />
        <Portfolio />
        <BlogPreview />
        <GlobalScale />
        <CtaBanner />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
