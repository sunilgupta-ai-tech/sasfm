import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogSeoSchema = z.object({
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
  ogImageUrl: z.string().url().optional().nullable(),
  canonicalPath: z.string().optional().nullable(),
  noIndex: z.boolean().optional(),
  focusKeyword: z.string().optional().nullable(),
});

export const createBlogSchema = z
  .object({
    slug: z.string().regex(slugPattern, "Slug must be lowercase, hyphen-separated"),
    title: z.string().min(1),
    excerpt: z.string(),
    tag: z.string().min(1),
    readTime: z.string().min(1),
    date: z.coerce.date(),
    imageUrl: z.string().min(1),
    body: z.array(z.string()).min(1),
    published: z.boolean().optional(),
  })
  .merge(blogSeoSchema);

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
