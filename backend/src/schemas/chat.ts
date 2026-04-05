import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Field 'message' is required and must be a non-empty string.")
    .max(4000, "Field 'message' is too long (max 4000 characters)."),
  chatId: z.string().uuid().optional(),
  context: z.record(z.string(), z.unknown()).optional(),
});

export type ChatRequestBody = z.infer<typeof chatRequestSchema>;