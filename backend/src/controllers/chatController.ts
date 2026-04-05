import type { Request, Response } from "express";
import { classifyScope } from "../lib/guardrails/classifyScope.js";
import { retrieveRelevantChunksWithScores } from "../lib/knowledge/retrieve.js";
import { generatePortfolioAnswer } from "../lib/openai/generatePortfolioAnswer.js";
import { ChatRequestBody } from "../schemas/chat.js";

export function getRelevantChunks(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const scope = classifyScope(query);

  if (scope.decision === "refuse") {
    return res.json({
      ...scope,
      answer:
        "I can only answer questions about Hampus Bosson, his projects, skills, and experience.",
    });
  }

  // If allowed, the relevant chunks will be retrieved in the frontend and sent with the question when calling the /chat endpoint.
  const results = retrieveRelevantChunksWithScores(query, 5);

  return res.json({
    ...scope,
    results,
  });
}

export async function postChat(req: Request, res: Response) {
  try {
    const { message } = req.body as ChatRequestBody;
    const question = message;

    const scope = classifyScope(question);

    if (scope.decision === "refuse") {
      return res.json({
        decision: "refuse",
        answer:
          "I can only answer questions about Hampus Bosson, his projects, skills, and experience.",
        refusalReason: "Question is obviously outside the assistant's scope.",
        citedSourceIds: [],
      });
    }

    const retrieved = retrieveRelevantChunksWithScores(question, 6);
    const chunks = retrieved.map((item) => item.chunk);

    const result = await generatePortfolioAnswer({
      question,
      chunks,
    });

    if (result?.decision === "refuse" && !result.answer.trim()) {
      result.answer =
        "I can only answer questions about Hampus Bosson, his projects, skills, and experience.";
    }

    return res.json({
      ...result,
      debug: {
        retrieved,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
