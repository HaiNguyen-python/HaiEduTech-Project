import type { InterviewDifficulty, InterviewQuestion, InterviewRole } from "@/data/interviewQuestions";

export const INTERVIEW_REVIEWED_STORAGE_KEY = "haiedu_interview_reviewed_v2";
export const LEGACY_INTERVIEW_REVIEWED_STORAGE_KEY = "haiedu_interview_reviewed";

export type InterviewFilters = {
  role: InterviewRole;
  category: string;
  difficulty: InterviewDifficulty | "all";
  search: string;
  unreviewedOnly: boolean;
};

export const filterInterviewQuestions = (
  questions: InterviewQuestion[],
  filters: InterviewFilters,
  reviewed: Set<string>,
) => {
  const query = filters.search.trim().toLocaleLowerCase();

  return questions.filter((item) => {
    if (item.role !== filters.role) return false;
    if (filters.category !== "all" && item.category !== filters.category) return false;
    if (filters.difficulty !== "all" && item.difficulty !== filters.difficulty) return false;
    if (filters.unreviewedOnly && reviewed.has(item.id)) return false;
    if (!query) return true;

    return [item.question, item.answer, item.tldr, ...(item.tags ?? [])]
      .filter((value): value is string => typeof value === "string")
      .some((value) => value.toLocaleLowerCase().includes(query));
  });
};

export const groupInterviewQuestions = (questions: InterviewQuestion[], categories: string[]) =>
  categories
    .map((category) => ({ category, questions: questions.filter((item) => item.category === category) }))
    .filter((group) => group.questions.length > 0);

export const parseReviewedQuestionIds = (raw: string | null, validIds: Set<string>) => {
  if (!raw) return new Set<string>();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(parsed.filter((id): id is string => typeof id === "string" && validIds.has(id)));
  } catch {
    return new Set<string>();
  }
};

export type NumberedTextPart = {
  number?: number;
  text: string;
};

/** Splits inline "(1) ... (2) ..." prose into readable rows without changing its wording. */
export const splitNumberedText = (text: string): NumberedTextPart[] => {
  const marker = /\s*\((\d+)\)\s*/g;
  const matches = [...text.matchAll(marker)];
  if (matches.length < 2) return [{ text }];

  const parts: NumberedTextPart[] = [];
  const introduction = text.slice(0, matches[0].index).trim();
  if (introduction) parts.push({ text: introduction });

  matches.forEach((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    const content = text.slice(start, end).trim().replace(/^[,;]\s*/, "");
    if (content) parts.push({ number: Number(match[1]), text: content });
  });
  return parts;
};

const IMPORTANT_INTERVIEW_TERMS = [
  "retrieval-augmented generation", "large language model", "chain-of-thought",
  "reinforcement learning", "machine learning", "deep learning", "system prompt",
  "prompt injection", "self-consistency", "structured outputs", "schema validation",
  "context window", "fine-tuning", "prompt engineering", "function calling",
  "vector database", "semantic search", "cosine similarity", "cross-validation",
  "gradient descent", "learning rate", "batch normalization", "mixed precision",
  "precision", "recall", "F1 score", "ROC-AUC", "data leakage", "feature scaling",
  "regularization", "overfitting", "underfitting", "primary key", "foreign key",
  "referential integrity", "window function", "query plan", "partition pruning",
  "data pipeline", "data warehouse", "data lake", "data lineage", "data freshness",
  "idempotency", "event time", "watermark", "exactly-once", "at-least-once",
  "change data capture", "slowly changing dimension", "star schema", "CAP theorem",
  "ACID", "BASE", "RAG", "LLM", "ETL", "ELT", "CDC", "SCD", "OLTP", "OLAP",
  "Parquet", "Kafka", "Spark", "Airflow", "Docker", "Kubernetes", "SQL",
  "GROUP BY", "DISTINCT", "temperature", "top-p", "top-k", "embedding",
  "tokenization", "token", "epoch", "batch", "iteration", "latency", "throughput",
] as const;

const escapedImportantTerms = [...IMPORTANT_INTERVIEW_TERMS]
  .sort((a, b) => b.length - a.length)
  .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const importantTermPattern = new RegExp(`\\b(${escapedImportantTerms.join("|")})\\b`, "gi");

export type EmphasizedTextPart = { text: string; important: boolean };

/** Returns safe text fragments for React rendering; no HTML injection is used. */
export const emphasizeInterviewTerms = (text: string): EmphasizedTextPart[] => {
  const parts: EmphasizedTextPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(importantTermPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push({ text: text.slice(cursor, index), important: false });
    parts.push({ text: match[0], important: true });
    cursor = index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), important: false });
  return parts.length ? parts : [{ text, important: false }];
};
