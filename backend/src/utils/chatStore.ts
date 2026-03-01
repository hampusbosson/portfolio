import { MessageRole, type Message } from "@prisma/client";
import { prisma } from "./prisma.js";

type CreateChatInput = {
  ownerId: string;
  title?: string;
};

type AppendMessageInput = {
  chatId: string;
  role: MessageRole;
  content: string;
  model?: string;
  tokenCount?: number;
};

export async function createChat({ ownerId, title }: CreateChatInput) {
  return prisma.chat.create({
    data: {
      ownerId,
      title,
    },
  });
}

export async function getChatForOwner(chatId: string, ownerId: string) {
  return prisma.chat.findFirst({
    where: {
      id: chatId,
      ownerId,
    },
  });
}

export async function appendMessage({
  chatId,
  role,
  content,
  model,
  tokenCount,
}: AppendMessageInput) {
  const message = await prisma.message.create({
    data: {
      chatId,
      role,
      content,
      model,
      tokenCount,
    },
  });

  await prisma.chat.update({
    where: { id: chatId },
    data: { lastMessageAt: message.createdAt },
  });

  return message;
}

export async function getRecentMessages(chatId: string, limit = 20): Promise<Message[]> {
  return prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

