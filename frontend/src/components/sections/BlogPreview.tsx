import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { getBlogPosts } from "@/lib/data";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPreview() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.slice(0, 3);

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <h2 className="font-serif-display text-4xl md:text-5xl text-ink">
            Latest Insights
          </h2>
          <Link
            href="/blog"
            className="font-mono-label text-sm uppercase text-steel border-b border-steel/40 pb-1 hover:text-ink hover:border-ink transition-colors shrink-0"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="border-t border-line pt-6">
                <p className="text-sm text-slate">
                  Article <span className="mx-1.5">|</span> {post.tag}
                </p>
                <h3 className="mt-4 font-serif-display text-2xl text-ink leading-snug group-hover:text-teal transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-slate">{formatDate(post.date)}</p>
              </div>

              <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-line">
                {/* default state: real image, falls back to placeholder */}
                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fallback={
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_75%)]">
                        <svg className="absolute inset-0 h-full w-full opacity-[0.15]">
                          <pattern
                            id={`insight-pattern-${post.slug}`}
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(35)"
                          >
                            <line x1="0" y1="0" x2="0" y2="20" stroke="var(--color-paper)" strokeWidth="1" />
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#insight-pattern-${post.slug})`} />
                        </svg>
                      </div>
                    }
                  />
                </div>

                {/* hover state: excerpt + learn more */}
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
    </section>
  );
}
