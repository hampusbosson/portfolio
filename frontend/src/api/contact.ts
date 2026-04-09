import { apiClient } from "./client";
import type {
  SubmitContactRequest,
  SubmitContactResponse,
} from "../types/contact";

export function submitContactForm(payload: SubmitContactRequest) {
  return apiClient.post<SubmitContactResponse>("/contact", payload);
}
