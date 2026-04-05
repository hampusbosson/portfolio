import { prisma } from "../prisma.js";
import { MessageRole } from "@prisma/client";

export async function createChat(ownerId: string) {
  return prisma.chat.create({
    data: {
      ownerId,
      lastMessageAt: new Date(),
    },
  });
}

export async function getChatById(chatId: string, ownerId: string) {
  return prisma.chat.findFirst({
    where: { id: chatId, ownerId },
  });
}

export async function getRecentMessages(chatId: string, limit = 6) {
  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return messages.reverse();
}

export async function saveUserMessage(chatId: string, content: string) {
  return prisma.$transaction([
    prisma.message.create({
      data: {
        chatId,
        role: MessageRole.user,
        content,
      },
    }),
    prisma.chat.update({
      where: { id: chatId },
      data: { lastMessageAt: new Date() },
    }),
  ]);
}

export async function saveAssistantMessage(params: {
  chatId: string;
  content?: string;
  model?: string;
  refusalReason?: string | null;
  sourceIds?: string[];
}) {
  return prisma.$transaction([
    prisma.message.create({
      data: {
        chatId: params.chatId,
        role: MessageRole.assistant,
        content: params.content ?? "",
        model: params.model,
        refusalReason: params.refusalReason ?? null,
        sourceIds: params.sourceIds ?? [],
      },
    }),
    prisma.chat.update({
      where: { id: params.chatId },
      data: { lastMessageAt: new Date() },
    }),
  ]);
}

