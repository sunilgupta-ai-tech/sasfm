import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import { Clock, ShieldCheck, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Enquiry Now",
  description:
    "Get in touch with SASFM's facilities management specialists — share your portfolio details and hear back within one business day.",
  alternates: { canonical: "/enquiry" },
};

const trustPoints = [
  {
    icon: Clock,
    title: "One business day",
    description: "A specialist reviews and responds to every enquiry personally.",
  },
  {
    icon: ShieldCheck,
    title: "No obligation",
    description: "We scope your portfolio before we ever talk pricing.",
  },
  {
    icon: Globe2,
    title: "Global coverage",
    description: "Support across UAE countries, one point of contact.",
  },
];

export default function EnquiryPage() {
  return (
    <>
      <Header />
      <main>
        {/* Dark intro panel */}
        <section className="relative bg-ink text-paper overflow-hidden">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber z-10" aria-hidden />
          <div className="absolute inset-0 opacity-[0.06]">
            <svg width="100%" height="100%">
              <pattern id="enquiry-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--color-paper)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#enquiry-grid)" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-20 md:pb-24">
            <p className="text-sm font-semibold tracking-wide text-paper/80 mb-6">
              Enquiry Now
            </p>
            <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-2xl">
              Let&apos;s build a better-run portfolio.
            </h1>
            <p className="mt-6 text-lg text-paper/75 max-w-xl leading-relaxed">
              Share a few details about your sites and one of our facilities
              management specialists will get back to you within one
              business day — no obligation, no scripted sales call.
            </p>
          </div>
        </section>

        {/* Trust points strip */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="py-8 px-2 sm:px-8 first:pl-0">
                  <Icon className="h-6 w-6 text-teal" strokeWidth={1.5} />
                  <h3 className="mt-4 font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1.5 text-sm text-slate leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-[1fr_1.3fr] gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-tight">
                Tell us about your portfolio.
              </h2>
              <p className="mt-4 text-slate leading-relaxed max-w-sm">
                Whether it&apos;s a single site or a global portfolio, we
                start every relationship the same way — by listening first.
              </p>

              <ul className="mt-10 space-y-4">
                {[
                  "A dedicated specialist reviews every enquiry personally",
                  "We'll scope your needs before we ever discuss pricing",
                  "One business day response, in every region we serve",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate">
                    <span className="mt-1.5 h-1.5 w-1.5 bg-amber shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
