import { z } from "zod";

export const createEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
