import { zodTextFormat } from "openai/helpers/zod";
import { openai } from "./client.js";
import { PORTFOLIO_SYSTEM_PROMPT } from "./prompts.js";
import { PortfolioAnswerSchema } from "./schemas.js";
import type { KnowledgeChunk } from "../knowledge/core/types.js";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

function formatContext(chunks: KnowledgeChunk[]): string {
  return chunks
    .map(
      (chunk) => `[${chunk.id}]
Title: ${chunk.title}
Type: ${chunk.type}
Source: ${chunk.sourceRef}
Content: ${chunk.text}`,
    )
    .join("\n\n");
}

export async function generatePortfolioAnswer(params: {
  question: string;
  chunks: KnowledgeChunk[];
  history?: HistoryMessage[];
}) {
  const context = formatContext(params.chunks);

  const input: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [
    {
      role: "system",
      content: PORTFOLIO_SYSTEM_PROMPT,
    },
    ...(params.history ?? []),
    {
      role: "user",
      content: `QUESTION:
${params.question}

PORTFOLIO_CONTEXT:
${context}`,
    },
  ];

  const response = await openai.responses.parse({
    model: "gpt-5.4",
    store: false,
    input,
    text: {
      format: zodTextFormat(PortfolioAnswerSchema, "portfolio_answer"),
    },
  });

  return response.output_parsed;
}
