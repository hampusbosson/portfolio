export interface ContactSubmissionInput {
  ownerId: string;
  name: string;
  email: string;
  message: string;
}

export interface StoredContactSubmission extends ContactSubmissionInput {
  id: string;
  createdAt: string;
}

export interface SubmitContactResponse {
  ok: true;
  submissionId: string;
}
