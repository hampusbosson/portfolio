import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const userIdHeaderSchema = z.string().uuid("Header 'x-user-id' must be a valid UUID.");

export function requireUserIdHeader(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const rawUserId = req.header("x-user-id");
  const parsed = userIdHeaderSchema.safeParse(rawUserId);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Missing required header 'x-user-id'.",
    });
  }

  res.locals.ownerId = parsed.data;
  return next();
}
