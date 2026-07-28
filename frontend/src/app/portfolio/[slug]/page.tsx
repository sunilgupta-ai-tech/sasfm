import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getPortfolioProjectBySlug, getPortfolioProjects } from "@/lib/data";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in fallback data.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) return {};

  const title = project.metaTitle || project.name;
  const description = project.metaDescription || project.summary;
  const canonical = project.canonicalPath || `/portfolio/${project.slug}`;
  const ogImage = project.ogImageUrl || project.image;

  return {
    title,
    description,
    alternates: { canonical },
    robots: project.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SASFM",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getPortfolioProjects();
  const related = allProjects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => {
      const aMatch = a.category === project.category ? 1 : 0;
      const bMatch = b.category === project.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "/portfolio" },
      { "@type": "ListItem", position: 3, name: project.name, item: `/portfolio/${project.slug}` },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/portfolio" className="hover:text-ink transition-colors">
              Projects
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink truncate">{project.name}</span>
          </nav>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono-label text-[11px] uppercase bg-paper-dim border border-line px-3 py-1 text-ink">
              {project.category}
            </span>
            <span className="text-sm text-slate">{project.location}</span>
          </div>

          <h1 className="font-serif-display text-4xl md:text-5xl text-ink leading-[1.1]">
            {project.name}
          </h1>
          <p className="mt-6 text-lg text-slate leading-relaxed">
            {project.summary}
          </p>

          <div className="mt-10 relative aspect-[16/9] bg-paper-dim border border-line overflow-hidden">
            <SafeImage
              src={project.image}
              alt={project.name}
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono-label text-xs text-slate/50 uppercase">
                    Project imagery
                  </span>
                </div>
              }
            />
          </div>

          <div className="mt-10">
            <h2 className="font-mono-label text-xs uppercase text-slate mb-4">
              Scope of Services
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.scope.map((item) => (
                <li
                  key={item}
                  className="border border-line px-4 py-2 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 border-t border-line pt-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate">Have a similar portfolio to manage?</p>
            <Link
              href="/enquiry"
              className="bg-amber text-ink font-semibold text-sm px-7 py-3.5 hover:bg-ink hover:text-paper transition-colors"
            >
              Enquiry Now
            </Link>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 mt-24 pt-16 border-t border-line">
            <h2 className="font-serif-display text-3xl text-ink mb-10">
              Related Projects
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-line">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className="transition-transform duration-500 group-hover:scale-105"
                      fallback={
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-ink)_70%)]" />
                      }
                    />
                  </div>
                  <p className="mt-4 text-sm text-slate">{item.category}</p>
                  <h3 className="mt-1 font-semibold text-ink group-hover:text-teal transition-colors leading-snug">
                    {item.name}
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
