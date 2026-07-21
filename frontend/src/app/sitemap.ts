import type { MetadataRoute } from "next";
import { getPortfolioProjects, getBlogPosts } from "@/lib/data";

const siteUrl = "https://www.sasfm.co";

// Fetches backend data — must render per-request, not be statically
// prerendered at Docker build time, when the backend container isn't
// reachable and this would otherwise bake in wrong slugs.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/about/board-of-directors",
    "/about/our-expert-team",
    "/services/soft-services",
    "/services/hard-services",
    "/portfolio",
    "/blog",
    "/enquiry",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const [portfolioProjects, blogPosts] = await Promise.all([
    getPortfolioProjects(),
    getBlogPosts(),
  ]);

  const portfolioRoutes = portfolioProjects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
