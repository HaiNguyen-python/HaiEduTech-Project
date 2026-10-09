export const RESEARCH_TOPICS = ["AI Tutors & LLM", "Adaptive Learning", "Learning Analytics", "Cognitive Load & Attention", "Memory & Spaced Repetition", "Metacognition & Self-regulation", "EEG & Multimodal Learning", "Gamification & Motivation", "Equity & Access", "Assessment & Grading", "General"];

export function safeResearchUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}

export function researchCsv(rows: string[][]): string {
  return "\uFEFF" + rows.map(row => row.map(cell => {
    const safe = /^[=+@\-\t\r]/.test(cell) ? `'${cell}` : cell;
    return `"${safe.replace(/"/g, '""')}"`;
  }).join(",")).join("\r\n");
}

export function downloadResearch(content: string, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}

export async function researchError(error: unknown): Promise<string> {
  const context = error && typeof error === "object" && "context" in error ? error.context : undefined;
  if (context instanceof Response) {
    try {
      const body = await context.clone().json();
      return body.message || body.error || body.details || `Research service error (${context.status})`;
    } catch { return `Research service error (${context.status})`; }
  }
  return error instanceof Error ? error.message : "Research request failed";
}