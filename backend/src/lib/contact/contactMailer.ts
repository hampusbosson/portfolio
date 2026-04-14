import { Resend } from "resend";
import type { StoredContactSubmission } from "../../types/contact.js";

type ResendMailConfig = {
  apiKey: string;
  from: string;
  inbox: string;
};

let cachedClient: Resend | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable '${name}'.`);
  }

  return value;
}

function getMailConfig(): ResendMailConfig {
  return {
    apiKey: getRequiredEnv("RESEND_API_KEY"),
    from: getRequiredEnv("MAIL_FROM"),
    inbox: getRequiredEnv("CONTACT_INBOX"),
  };
}

function getClient(): Resend {
  if (cachedClient) {
    return cachedClient;
  }

  const config = getMailConfig();
  cachedClient = new Resend(config.apiKey);
  return cachedClient;
}

export async function sendContactSubmissionEmail(
  submission: StoredContactSubmission,
) {
  const resend = getClient();
  const config = getMailConfig();

  const { error } = await resend.emails.send({
    from: config.from,
    to: [config.inbox],
    replyTo: submission.email,
    subject: `Portfolio contact from ${submission.name}`,
    text: [
      "New portfolio contact submission",
      "",
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `User ID: ${submission.ownerId}`,
      `Submitted: ${submission.createdAt}`,
      "",
      "Message:",
      submission.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Failed to send contact email via Resend: ${error.message}`);
  }
}
