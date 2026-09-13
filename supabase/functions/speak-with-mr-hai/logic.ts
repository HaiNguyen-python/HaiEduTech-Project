export type ChatRole = "user" | "assistant";
export type SafeMessage = { role: ChatRole; content: string };

export const normalizeText = (value: unknown, max = 1200): string =>
  typeof value === "string" ? value.normalize("NFC").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max) : "";

export const sanitizeMessages = (value: unknown): SafeMessage[] => {
  if (!Array.isArray(value)) return [];
  const safe: SafeMessage[] = [];
  for (const item of value.slice(-16)) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    if (role !== "user" && role !== "assistant") continue;
    const content = normalizeText((item as { content?: unknown }).content);
    if (!content) continue;
    const previous = safe[safe.length - 1];
    if (previous?.role === role) previous.content = `${previous.content}\n${content}`.slice(0, 1200);
    else safe.push({ role, content });
  }
  return safe;
};

export const buildTask = (mode: "turn" | "summary", messages: SafeMessage[]): string => {
  const history = messages
    .map((message) => `${message.role === "user" ? "Learner" : "Mr. Hai"}: ${message.content}`)
    .join("\n");
  if (mode === "summary") {
    return `Summarize this completed practice session. Put a short supportive closing in reply, leave correction empty, then provide 1-3 strengths, 1-3 corrections, and 1-3 upgraded model sentences.\n\nConversation:\n${history || "No completed turns."}`;
  }
  if (messages.length === 0) return "Open the roleplay with one warm sentence and one short question.";
  return `Continue this conversation naturally. Respond to the learner's latest turn, gently correct only the most important error, and end with exactly one short question.\n\nConversation:\n${history}`;
};