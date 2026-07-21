import { z } from "zod";

export const createTeamMemberSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  region: z.string().min(1),
  imageUrl: z.string(), // may be empty until a photo is uploaded
  sortOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
