import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Field 'name' is required.")
    .max(120, "Field 'name' is too long (max 120 characters)."),
  email: z
    .string()
    .trim()
    .email("Field 'email' must be a valid email address.")
    .max(320, "Field 'email' is too long (max 320 characters)."),
  message: z
    .string()
    .trim()
    .min(1, "Field 'message' is required.")
    .max(4000, "Field 'message' is too long (max 4000 characters)."),
});

export type ContactRequestBody = z.infer<typeof contactRequestSchema>;
