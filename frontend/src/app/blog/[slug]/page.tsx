import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonical = post.canonicalPath || `/blog/${post.slug}`;
  const ogImage = post.ogImageUrl || post.image;

  return {
    title,
    description,
    alternates: { canonical },
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SASFM",
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <article className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-ink transition-colors">
              Insights
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink truncate">{post.title}</span>
          </nav>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono-label text-[11px] uppercase bg-paper-dim border border-line px-3 py-1 text-ink">
              {post.tag}
            </span>
            <span className="text-sm text-slate">{formatDate(post.date)}</span>
            <span className="text-slate/40" aria-hidden>·</span>
            <span className="text-sm text-slate">{post.readTime}</span>
          </div>

          <h1 className="font-serif-display text-4xl md:text-5xl text-ink leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-slate leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-10 relative aspect-[16/9] bg-paper-dim border border-line overflow-hidden">
            <SafeImage
              src={post.image}
              alt={post.title}
              fallback={
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)] flex items-center justify-center">
                  <span className="font-mono-label text-xs text-paper/40 uppercase">
                    Article imagery
                  </span>
                </div>
              }
            />
          </div>

          <div className="mt-12 space-y-6">
            {post.body.map((paragraph, i) => (
              <div
                key={i}
                className="text-slate leading-relaxed text-[17px] [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-ink [&_em]:italic [&_u]:underline [&_s]:line-through"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate">Have a facilities challenge like this?</p>
            <Link
              href="/enquiry"
              className="bg-amber text-ink font-semibold text-sm px-7 py-3.5 hover:bg-ink hover:text-paper transition-colors"
            >
              Enquiry Now
            </Link>
          </div>
        </article>

        {/* Related insights */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 mt-24 pt-16 border-t border-line">
            <h2 className="font-serif-display text-3xl text-ink mb-10">
              Related Insights
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden border border-line">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="transition-transform duration-500 group-hover:scale-105"
                      fallback={
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)]" />
                      }
                    />
                  </div>
                  <p className="mt-4 text-sm text-slate">{item.tag}</p>
                  <h3 className="mt-1 font-semibold text-ink group-hover:text-teal transition-colors leading-snug">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
