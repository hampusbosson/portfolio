import { z } from "zod";

export const PortfolioAnswerSchema = z.object({
  decision: z.enum(["answer", "refuse"]),
  answer: z.string().min(1),
  citedSourceIds: z.array(z.string()),
  refusalReason: z.string().nullable()
});

export type PortfolioAnswer = z.infer<typeof PortfolioAnswerSchema>;