import { prisma } from "../../db/prisma";
import { ApiError } from "../../middlewares/error.middleware";
import type { CreatePortfolioInput, UpdatePortfolioInput } from "./portfolio.schema";

// Public: only published projects, newest first
export async function listPublished(category?: string) {
  return prisma.portfolioProject.findMany({
    where: {
      published: true,
      ...(category && category !== "All" ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedBySlug(slug: string) {
  const project = await prisma.portfolioProject.findFirst({
    where: { slug, published: true },
  });
  if (!project) throw new ApiError(404, "Project not found");
  return project;
}

// Admin: everything, including unpublished/drafts
export async function listAllForAdmin() {
  return prisma.portfolioProject.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getByIdForAdmin(id: string) {
  const project = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!project) throw new ApiError(404, "Project not found");
  return project;
}

export async function create(input: CreatePortfolioInput) {
  const existing = await prisma.portfolioProject.findUnique({
    where: { slug: input.slug },
  });
  if (existing) throw new ApiError(409, "A project with this slug already exists");

  return prisma.portfolioProject.create({ data: input });
}

export async function update(id: string, input: UpdatePortfolioInput) {
  await getByIdForAdmin(id);

  if (input.slug) {
    const existing = await prisma.portfolioProject.findUnique({
      where: { slug: input.slug },
    });
    if (existing && existing.id !== id) {
      throw new ApiError(409, "A project with this slug already exists");
    }
  }

  return prisma.portfolioProject.update({ where: { id }, data: input });
}

export async function remove(id: string) {
  await getByIdForAdmin(id);
  await prisma.portfolioProject.delete({ where: { id } });
}
