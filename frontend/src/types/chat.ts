export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export type ApiChatRole = "system" | "user" | "assistant";

export interface ApiChatStoredMessage {
  id: string;
  chatId: string;
  role: ApiChatRole;
  content: string;
  model: string | null;
  tokenCount: number | null;
  refusalReason: string | null;
  sourceIds: string[];
  createdAt: string;
}

export interface ApiChatSummary {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
}

export interface ApiChatThread {
  id: string;
  ownerId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
  messages: ApiChatStoredMessage[];
}

export interface ApiRetrievedChunk {
  chunk: {
    id: string;
    type: "profile" | "project" | "experience" | "skill" | "faq" | "policy";
    title: string;
    text: string;
    tags: string[];
    sourceRef: string;
  };
  score: number;
}

export type RelevantChunksResponse =
  | {
      decision: "allow";
      results: ApiRetrievedChunk[];
    }
  | {
      decision: "refuse";
      reason: "obviously_out_of_scope";
      answer: string;
      results: ApiRetrievedChunk[];
    };

export interface PostChatRequest {
  message: string;
  chatId?: string;
}

export interface PostChatResponse {
  chatId: string;
  decision: "answer" | "refuse";
  answer: string;
  refusalReason: string | null;
  citedSourceIds: string[];
  debug?: {
    retrieved: ApiRetrievedChunk[];
  };
}

export interface GetChatsResponse {
  chats: ApiChatSummary[];
}
