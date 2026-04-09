import type { Request, Response } from "express";
import { saveContactSubmission } from "../lib/contact/contactService.js";
import type { SubmitContactResponse } from "../types/contact.js";

export async function postContact(req: Request, res: Response) {
  try {
    const ownerId = res.locals.ownerId as string;
    const { name, email, message } = req.body;

    const submission = await saveContactSubmission({
      ownerId,
      name,
      email,
      message,
    });

    const response: SubmitContactResponse = {
      ok: true,
      submissionId: submission.id,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
