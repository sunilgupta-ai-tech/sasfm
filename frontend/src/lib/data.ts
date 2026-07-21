import {
  portfolioProjects as staticProjects,
  blogPosts as staticPosts,
  softServices as staticSoftServices,
  hardServices as staticHardServices,
  expertTeam as staticTeamMembers,
} from "@/data/content";

// Server-side (this file only runs on the server — in route handlers, server
// components, generateMetadata, etc.) talks to the backend over the Docker
// internal network when INTERNAL_API_URL is set (e.g. "http://backend:4000").
// Falls back to the public URL for local dev without Docker, where both the
// browser and the Next.js server can reach the same localhost address.
const API_URL =
  process.env.INTERNAL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

export type ApiPortfolioProject = {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  scope: string[];
  summary: string;
  imageUrl: string;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  canonicalPath: string | null;
  noIndex: boolean;
  focusKeyword: string | null;
};

export type ApiBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  imageUrl: string;
  body: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  canonicalPath: string | null;
  noIndex: boolean;
  focusKeyword: string | null;
};

// The PUBLIC backend URL, reachable from the browser — used to resolve
// relative "/uploads/..." paths returned by the API into full URLs. This is
// deliberately NEXT_PUBLIC_API_URL (not INTERNAL_API_URL): the internal
// Docker hostname is only reachable from inside the Docker network, not
// from someone's browser.
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function resolveImageUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http")) return url;
  return `${PUBLIC_API_URL}${url}`;
}

// Normalizes the API shape (imageUrl) to match what the frontend components
// currently expect (image) — keeps SafeImage/PortfolioGrid/etc unchanged.
function normalizeProject(p: ApiPortfolioProject) {
  return { ...p, image: resolveImageUrl(p.imageUrl) };
}
function normalizePost(p: ApiBlogPost) {
  return { ...p, image: resolveImageUrl(p.imageUrl) };
}

// The static content.ts data predates the SEO fields, so pad it out with
// nulls/defaults to match the shape the rest of the app expects — keeps
// the return type identical whether data came from the API or the fallback.
const SEO_DEFAULTS = {
  metaTitle: null,
  metaDescription: null,
  ogImageUrl: null,
  canonicalPath: null,
  noIndex: false,
  focusKeyword: null,
} as const;

function withStaticDefaults<T extends { image: string }>(item: T) {
  return { ...item, ...SEO_DEFAULTS, imageUrl: item.image };
}

const staticProjectsNormalized = staticProjects.map(withStaticDefaults);
const staticPostsNormalized = staticPosts.map(withStaticDefaults);

// revalidate: 60 -> pages using this data rebuild at most once a minute,
// so admin edits show up quickly without needing a full redeploy.
const FETCH_OPTS = { next: { revalidate: 60 } };

export async function getPortfolioProjects() {
  try {
    const res = await fetch(`${API_URL}/api/portfolio`, FETCH_OPTS);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data: { projects: ApiPortfolioProject[] } = await res.json();
    return data.projects.map(normalizeProject);
  } catch (err) {
    console.warn("Falling back to static portfolio data:", err);
    return staticProjectsNormalized;
  }
}

export async function getPortfolioProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/portfolio/${slug}`, FETCH_OPTS);
    if (!res.ok) return null;
    const data: { project: ApiPortfolioProject } = await res.json();
    return normalizeProject(data.project);
  } catch (err) {
    console.warn("Falling back to static portfolio data:", err);
    return staticProjectsNormalized.find((p) => p.slug === slug) ?? null;
  }
}

export async function getBlogPosts() {
  try {
    const res = await fetch(`${API_URL}/api/blog`, FETCH_OPTS);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data: { posts: ApiBlogPost[] } = await res.json();
    return data.posts.map(normalizePost);
  } catch (err) {
    console.warn("Falling back to static blog data:", err);
    return staticPostsNormalized;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blog/${slug}`, FETCH_OPTS);
    if (!res.ok) return null;
    const data: { post: ApiBlogPost } = await res.json();
    return normalizePost(data.post);
  } catch (err) {
    console.warn("Falling back to static blog data:", err);
    return staticPostsNormalized.find((p) => p.slug === slug) ?? null;
  }
}

export type ApiService = {
  id: string;
  title: string;
  description: string;
  details: string;
};

export async function getServices(type: "soft" | "hard") {
  const staticFallback =
    type === "soft" ? staticSoftServices : staticHardServices;

  try {
    const res = await fetch(`${API_URL}/api/services?type=${type}`, FETCH_OPTS);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data: { services: ApiService[] } = await res.json();
    if (data.services.length === 0) return staticFallback;
    return data.services;
  } catch (err) {
    console.warn(`Falling back to static ${type} services data:`, err);
    return staticFallback;
  }
}

export type ApiTeamMember = {
  id: string;
  name: string;
  title: string;
  region: string;
  imageUrl: string;
};

function normalizeTeamMember(m: ApiTeamMember) {
  return { ...m, image: resolveImageUrl(m.imageUrl) };
}

export async function getTeamMembers() {
  try {
    const res = await fetch(`${API_URL}/api/team`, FETCH_OPTS);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data: { members: ApiTeamMember[] } = await res.json();
    if (data.members.length === 0) return staticTeamMembers;
    return data.members.map(normalizeTeamMember);
  } catch (err) {
    console.warn("Falling back to static team data:", err);
    return staticTeamMembers;
  }
}
