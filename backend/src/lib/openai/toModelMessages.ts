import type { Message } from "@prisma/client";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

function isHistoryMessage(
  message: Message
): message is Message & { role: "user" | "assistant" } {
  return message.role === "user" || message.role === "assistant";
}

export function toModelHistory(messages: Message[]): HistoryMessage[] {
  return messages
    .filter(isHistoryMessage)
    .map((m) => ({
      role: m.role,
      content: m.content,
    }));
}
