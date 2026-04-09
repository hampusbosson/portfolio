import { prisma } from "../prisma.js";
import type {
  ContactSubmissionInput,
  StoredContactSubmission,
} from "../../types/contact.js";

export async function saveContactSubmission(
  input: ContactSubmissionInput,
): Promise<StoredContactSubmission> {
  const submission = await prisma.contactSubmission.create({
    data: {
      ownerId: input.ownerId,
      name: input.name,
      email: input.email,
      message: input.message,
    },
  });

  return {
    id: submission.id,
    ownerId: submission.ownerId,
    name: submission.name,
    email: submission.email,
    message: submission.message,
    createdAt: submission.createdAt.toISOString(),
  };
}
