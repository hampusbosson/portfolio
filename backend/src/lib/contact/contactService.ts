import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type {
  ContactSubmissionInput,
  StoredContactSubmission,
} from "../../types/contact.js";

const CONTACT_STORAGE_DIR = path.resolve(process.cwd(), "storage");
const CONTACT_STORAGE_FILE = path.join(
  CONTACT_STORAGE_DIR,
  "contact-submissions.ndjson",
);

export async function saveContactSubmission(
  input: ContactSubmissionInput,
): Promise<StoredContactSubmission> {
  const submission: StoredContactSubmission = {
    id: randomUUID(),
    ownerId: input.ownerId,
    name: input.name,
    email: input.email,
    message: input.message,
    createdAt: new Date().toISOString(),
  };

  await mkdir(CONTACT_STORAGE_DIR, { recursive: true });
  await appendFile(
    CONTACT_STORAGE_FILE,
    `${JSON.stringify(submission)}\n`,
    "utf8",
  );

  return submission;
}
