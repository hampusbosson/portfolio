import type { Request, Response, NextFunction } from "express";
import type { ChatRequestBody } from "../types/chat.js";

export function validateChatRequest(
  req: Request<unknown, unknown, ChatRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const { message, context } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      ok: false,
      error: "Field 'message' is required and must be a non-empty string.",
    });
  }

  if (message.length > 4000) {
    return res.status(400).json({
      ok: false,
      error: "Field 'message' is too long (max 4000 characters).",
    });
  }

  if (context !== undefined && typeof context !== "object") {
    return res.status(400).json({
      ok: false,
      error: "Field 'context' must be an object when provided.",
    });
  }

  return next();
}

