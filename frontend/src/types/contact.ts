export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface SubmitContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface SubmitContactResponse {
  ok: true;
  submissionId: string;
}
