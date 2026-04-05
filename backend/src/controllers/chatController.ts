import type { Request, Response } from "express";
import { classifyScope } from "../lib/guardrails/classifyScope.js";
import { retrieveRelevantChunksWithScores } from "../lib/knowledge/retrieve.js";
import { generatePortfolioAnswer } from "../lib/openai/generatePortfolioAnswer.js";
import {
  createChat,
  getChatById,
  getRecentMessages,
  saveAssistantMessage,
  saveUserMessage,
} from "../lib/chat/chatService.js";
import { toModelHistory } from "../lib/openai/toModelMessages.js";
import { prisma } from "../lib/prisma.js";

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
    const { message, chatId } = req.body;
    const ownerId = res.locals.ownerId as string;

    const scope = classifyScope(message);

    let chat = chatId ? await getChatById(chatId, ownerId) : null;

    if (!chat) {
      chat = await createChat(ownerId);
    }

    await saveUserMessage(chat.id, message);

    if (scope.decision === "refuse") {
      const refusal = {
        decision: "refuse" as const,
        answer:
          "I can only answer questions about Hampus Bosson, his projects, skills, and experience.",
        refusalReason: "Question is obviously outside the assistant's scope.",
        citedSourceIds: [],
      };

      await saveAssistantMessage({
        chatId: chat.id,
        content: refusal.answer,
        model: "guardrail",
        refusalReason: refusal.refusalReason,
        sourceIds: [],
      });

      return res.json({
        chatId: chat.id,
        ...refusal,
      });
    }

    const historyMessages = await getRecentMessages(chat.id, 6);
    const history = toModelHistory(historyMessages);

    const retrieved = retrieveRelevantChunksWithScores(message, 6);
    const chunks = retrieved.map((item) => item.chunk);

    const result = await generatePortfolioAnswer({
      question: message,
      chunks,
      history,
    });

    if (result?.decision === "refuse" && !result.answer.trim()) {
      result.answer =
        "I can only answer questions about Hampus Bosson, his projects, skills, and experience.";
    }

    await saveAssistantMessage({
      chatId: chat.id,
      content: result?.answer,
      model: "gpt-5.4",
      refusalReason: result?.refusalReason,
      sourceIds: result?.citedSourceIds,
    });

    return res.json({
      chatId: chat.id,
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

export async function getChats(_req: Request, res: Response) {
  try {
    const ownerId = res.locals.ownerId as string;

    const chats = await prisma.chat.findMany({
      where: { ownerId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        lastMessageAt: true,
      },
    });

    return res.json({ chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getChatMessages(req: Request, res: Response) {
  try {
    const ownerId = res.locals.ownerId as string;
    const { chatId } = req.params;

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        ownerId,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    return res.json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
