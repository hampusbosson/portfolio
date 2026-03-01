import type { ChatContext } from "../types/chat.js";

type GenerateChatReplyInput = {
  message: string;
  context?: ChatContext;
};

export async function generateChatReply({
  message,
  context,
}: GenerateChatReplyInput) {
  const ctxTag = context?.page ? ` (page: ${context.page})` : "";
  const cleaned = message.trim();

  // Simple deterministic fallback so frontend integration can be developed now.
  return `Received: "${cleaned}"${ctxTag}. Backend chat route is wired and ready for AI provider integration.`;
}

