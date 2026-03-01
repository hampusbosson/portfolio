export type ChatContext = {
  page?: string;
  [key: string]: unknown;
};

export type ChatRequestBody = {
  message: string;
  context?: ChatContext;
};

