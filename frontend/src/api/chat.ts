import { apiClient } from "./client";
import type {
  ApiChatThread,
  GetChatsResponse,
  PostChatRequest,
  PostChatResponse,
  RelevantChunksResponse,
} from "../types/chat";

export function getRelevantChunks(query: string) {
  return apiClient.get<RelevantChunksResponse>("/chunks", {
    query: { q: query },
  });
}

export function postChatMessage(payload: PostChatRequest) {
  return apiClient.post<PostChatResponse>("/chat", payload);
}

export function getChats() {
  return apiClient.get<GetChatsResponse>("/chats");
}

export function getChatMessages(chatId: string) {
  return apiClient.get<ApiChatThread>(`/chats/${chatId}`);
}
