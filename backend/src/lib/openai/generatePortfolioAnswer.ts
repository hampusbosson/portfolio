import { zodTextFormat } from "openai/helpers/zod";
import { openai } from "./client.js";
import { PORTFOLIO_SYSTEM_PROMPT } from "./prompts.js";
import { PortfolioAnswerSchema } from "./schemas.js";
import type { KnowledgeChunk } from "../../lib/knowledge/types.js";

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
}) {
  const context = formatContext(params.chunks);

  const response = await openai.responses.parse({
    model: "gpt-5.4",
    store: false,
    input: [
      {
        role: "system",
        content: PORTFOLIO_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `QUESTION:
${params.question}

CONTEXT:
${context}`,
      },
    ],
    text: {
      format: zodTextFormat(PortfolioAnswerSchema, "portfolio_answer"),
    },
  });

  return response.output_parsed;
}
