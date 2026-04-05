import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { chatRequestSchema } from "../schemas/chat.js";

export function validateChatRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = chatRequestSchema.parse(req.body);

    req.body = parsed;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        ok: false,
        error: error.issues[0]?.message ?? "Invalid request body.",
        details: error.issues,
      });
    }

    return res.status(400).json({
      ok: false,
      error: "Invalid request body.",
    });
  }
}