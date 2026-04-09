import nodemailer from "nodemailer";
import type { StoredContactSubmission } from "../../types/contact.js";

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  inbox: string;
};

type MailTransporter = ReturnType<typeof nodemailer.createTransport>;

let cachedTransporter: MailTransporter | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable '${name}'.`);
  }

  return value;
}

function getMailConfig(): MailConfig {
  const port = Number(process.env.MAIL_PORT ?? "587");

  if (!Number.isFinite(port)) {
    throw new Error("Environment variable 'MAIL_PORT' must be a valid number.");
  }

  return {
    host: getRequiredEnv("MAIL_HOST"),
    port,
    secure: (process.env.MAIL_SECURE ?? "false").trim() === "true",
    user: getRequiredEnv("MAIL_USER"),
    pass: getRequiredEnv("MAIL_PASS"),
    from: getRequiredEnv("MAIL_FROM"),
    inbox: getRequiredEnv("CONTACT_INBOX"),
  };
}

function getTransporter(): MailTransporter {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const config = getMailConfig();

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return cachedTransporter;
}

export async function sendContactSubmissionEmail(
  submission: StoredContactSubmission,
) {
  const transporter = getTransporter();
  const config = getMailConfig();

  await transporter.sendMail({
    from: config.from,
    to: config.inbox,
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
}
