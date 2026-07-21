import { prisma } from "../../db/prisma";
import { ApiError } from "../../middlewares/error.middleware";
import type { CreateBlogInput, UpdateBlogInput } from "./blog.schema";

export async function listPublished() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
}

export async function getPublishedBySlug(slug: string) {
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
  if (!post) throw new ApiError(404, "Post not found");
  return post;
}

export async function listAllForAdmin() {
  return prisma.blogPost.findMany({ orderBy: { date: "desc" } });
}

export async function getByIdForAdmin(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) throw new ApiError(404, "Post not found");
  return post;
}

export async function create(input: CreateBlogInput) {
  const existing = await prisma.blogPost.findUnique({ where: { slug: input.slug } });
  if (existing) throw new ApiError(409, "A post with this slug already exists");

  return prisma.blogPost.create({ data: input });
}

export async function update(id: string, input: UpdateBlogInput) {
  await getByIdForAdmin(id);

  if (input.slug) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: input.slug } });
    if (existing && existing.id !== id) {
      throw new ApiError(409, "A post with this slug already exists");
    }
  }

  return prisma.blogPost.update({ where: { id }, data: input });
}

export async function remove(id: string) {
  await getByIdForAdmin(id);
  await prisma.blogPost.delete({ where: { id } });
}
