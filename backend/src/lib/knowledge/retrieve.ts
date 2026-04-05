import { getKnowledgeChunks } from "./index.js";
import type { KnowledgeChunk } from "./types.js";

export type ScoredChunk = {
  chunk: KnowledgeChunk;
  score: number;
};

const STOPWORDS = new Set([
  // English
  "the", "a", "an", "and", "or", "but", "to", "of", "in", "on", "for", "with",
  "about", "is", "are", "was", "were", "what", "which", "who", "where", "when",
  "why", "how", "tell", "me", "do", "did", "you", "your", "have", "has", "had",

  // Swedish
  "och", "att", "det", "som", "på", "i", "av", "för", "med", "är", "var", "vad",
  "vem", "hur", "när", "varför", "mig", "du", "din", "ditt", "har", "hade", "om"
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFKC");
}

function tokenize(text: string): string[] {
  return normalize(text)
    .replace(/[^\p{L}\p{N}\s.-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length >= 2)
    .filter((word) => !STOPWORDS.has(word));
}

function scoreChunk(chunk: KnowledgeChunk, query: string): number {
  const queryText = normalize(query);
  const queryTokens = tokenize(queryText);

  const title = normalize(chunk.title);
  const text = normalize(chunk.text);
  const tags = chunk.tags.map(normalize);

  let score = 0;

  if (queryText.length >= 3 && title.includes(queryText)) score += 12;
  if (queryText.length >= 3 && text.includes(queryText)) score += 8;

  for (const token of queryTokens) {
    if (title === token) score += 10;
    if (tags.includes(token)) score += 8;

    if (title.includes(token)) score += 5;
    if (tags.some((tag: string | string[]) => tag.includes(token))) score += 4;
    if (text.includes(token)) score += 2;
  }

  // very small nudges
  if (chunk.type === "project") score += 2;
  if (chunk.type === "experience") score += 1;
  if (chunk.type === "skill") score += 1;
  if (chunk.type === "faq") score -= 1;
  if (chunk.type === "policy") score -= 5;

  return score;
}

export function retrieveRelevantChunksWithScores(
  query: string,
  limit = 6
): ScoredChunk[] {
  const chunks = getKnowledgeChunks();

  return chunks
    .map((chunk: any) => ({
      chunk,
      score: scoreChunk(chunk, query)
    }))
    .filter((item: { score: number; }) => item.score > 0)
    .sort((a: { score: number; }, b: { score: number; }) => b.score - a.score)
    .slice(0, limit);
}

export function retrieveRelevantChunks(
  query: string,
  limit = 6
): KnowledgeChunk[] {
  return retrieveRelevantChunksWithScores(query, limit).map((item) => item.chunk);
}