import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import SafeImage from "@/components/SafeImage";
import { getBlogPosts } from "@/lib/data";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

// Drop a banner image into public/images/blog/banner.jpg and set the path
// here, or paste a full https:// URL. See public/images/blog/README.txt.
const IMAGE_SRC = "/images/blog/banner.png";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on facilities management, workplace experience and smart building operations from the SASFM team.",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value; // already-formatted static fallback
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PlaceholderThumb({ slug }: { slug: string }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)]">
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
        <pattern
          id={`blog-pattern-${slug}`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line x1="0" y1="0" x2="0" y2="20" stroke="var(--color-paper)" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#blog-pattern-${slug})`} />
      </svg>
    </div>
  );
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Header />
      <main>
        <ServicePageHero
          eyebrow="Insights & Research"
          title="Latest Insights"
          ctaLabel="Enquiry Now"
          ctaHref="/enquiry"
          imageSrc={IMAGE_SRC}
          imageAlt="SASFM insights and research on facilities management"
          tabs={[
            { label: "Overview", href: "#overview" },
            { label: "Articles", href: "#articles" },
            { label: "Projects", href: "/portfolio" },
            { label: "Enquiry Now", href: "/enquiry" },
          ]}
        />

        <div id="overview" className="mx-auto max-w-7xl px-6 pt-16">
          <p className="text-slate max-w-2xl leading-relaxed text-lg">
            Notes from the field on running better buildings — operations,
            workplace experience, and smart building technology.
          </p>
        </div>

        <div id="articles" className="mx-auto max-w-7xl px-6 pt-10 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="border-t border-line pt-6">
                  <p className="text-sm text-slate">
                    Article <span className="mx-1.5">|</span> {post.tag}
                  </p>
                  <h2 className="mt-4 font-serif-display text-2xl text-ink leading-snug group-hover:text-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate">{formatDate(post.date)}</p>
                </div>

                <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-line">
                  <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      fallback={<PlaceholderThumb slug={post.slug} />}
                    />
                  </div>

                  <div className="absolute inset-0 bg-paper-dim border-l-4 border-teal p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-lg text-ink leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-3 font-semibold text-ink">
                      <span className="h-px w-8 bg-teal transition-all duration-300 group-hover:w-12" />
                      Learn More
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
