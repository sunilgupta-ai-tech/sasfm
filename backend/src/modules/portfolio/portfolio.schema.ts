import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const portfolioSeoSchema = z.object({
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
  ogImageUrl: z.string().url().optional().nullable(),
  canonicalPath: z.string().optional().nullable(),
  noIndex: z.boolean().optional(),
  focusKeyword: z.string().optional().nullable(),
});

export const createPortfolioSchema = z
  .object({
    slug: z.string().regex(slugPattern, "Slug must be lowercase, hyphen-separated"),
    name: z.string().min(1),
    category: z.enum([
      "Commercial",
      "Educational",
      "Healthcare",
      "Residential",
      "Town House",
    ]),
    location: z.string().min(1),
    scope: z.array(z.string()).min(1),
    summary: z.string().min(1),
    imageUrl: z.string().min(1),
    published: z.boolean().optional(),
  })
  .merge(portfolioSeoSchema);

export const updatePortfolioSchema = createPortfolioSchema.partial();

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
