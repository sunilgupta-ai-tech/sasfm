import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Difference from "@/components/sections/Difference";
import SnaggingOffer from "@/components/sections/SnaggingOffer";
import Services from "@/components/sections/Services";
import Faq from "@/components/sections/Faq";
import GetStartedCta from "@/components/sections/GetStartedCta";
import About from "@/components/sections/About";
import CafmApp from "@/components/sections/CafmApp";
import Portfolio from "@/components/sections/Portfolio";
import BlogPreview from "@/components/sections/BlogPreview";

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
        <Difference />
        <SnaggingOffer />
        <Services />
        <Portfolio />
        <GetStartedCta />
        <About />
        <CafmApp />
        <BlogPreview />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
