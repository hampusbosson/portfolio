const DEFAULT_API_BASE_URL = "http://localhost:8080/api";
const USER_ID_STORAGE_KEY = "portfolio_user_id";

type QueryValue = string | number | boolean | null | undefined;

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
  query?: Record<string, QueryValue>;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return (envUrl?.trim() || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

export function getOrCreateUserId(): string {
  const existing = window.localStorage.getItem(USER_ID_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const userId = crypto.randomUUID();
  window.localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  return userId;
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(`${getApiBaseUrl()}${path}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, headers, query, ...init } = options;
  const requestHeaders = new Headers(headers);

  requestHeaders.set("x-user-id", getOrCreateUserId());

  if (body !== undefined) {
    requestHeaders.set("content-type", "application/json");
  }

  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const apiClient = {
  get<T>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return apiRequest<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return apiRequest<T>(path, { ...options, method: "POST", body });
  },
};
