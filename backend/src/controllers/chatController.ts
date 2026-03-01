import type { Request, Response } from "express";
import { generateChatReply } from "../utils/generateChatReply.js";
import type { ChatRequestBody } from "../types/chat.js";

export async function postChat(
  req: Request<unknown, unknown, ChatRequestBody>,
  res: Response,
) {
  const { message, context } = req.body;

  // Placeholder response generator until AI provider integration is added.
  const reply = await generateChatReply({ message, context });

  res.status(200).json({
    ok: true,
    data: {
      reply,
    },
  });
}

