import { z } from "zod";

export const serviceTypeSchema = z.enum(["SOFT", "HARD"]);

export const createServiceSchema = z.object({
  type: serviceTypeSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  details: z.string().min(1),
  sortOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
