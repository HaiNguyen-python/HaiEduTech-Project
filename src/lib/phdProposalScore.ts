/**
 * @file phdProposalScore.ts
 * @description Client-side regex Health Score (0-100) for PhD research proposals.
 *   Five rubrics: word count, research question, methodology, citations, opening diversity.
 */

export interface ProposalScoreCheck {
  key: string;
  labelVi: string;
  labelEn: string;
  weight: number;
  pass: boolean;
  detailVi?: string;
  detailEn?: string;
}

export interface ProposalScore {
  total: number;
  wordCount: number;
  checks: ProposalScoreCheck[];
}

const RQ_RE = /(research\s+question|câu\s+hỏi\s+nghiên\s+cứu|\brq\d?\b)/i;
const METHOD_RE = /(methodolog|phương\s+pháp|experimental\s+design|thiết\s+kế\s+thí\s+nghiệm)/i;
const CITATION_RE = /\([A-ZÀ-Ỹ][\p{L}\-']+(?:\s+(?:&|and|et\s+al\.?)\s+[\p{L}\-']+)?,?\s*(?:19|20)\d{2}[a-z]?\)/gu;

/** Count repeated first words across paragraphs (heuristic for "I" or "The" overuse). */
const repeatedOpeningCount = (text: string): { word: string; count: number } => {
  const paras = text.split(/\n{2,}/).map((p) => p.trim()).filter((p) => p.length > 20);
  const firsts: Record<string, number> = {};
  for (const p of paras) {
    const w = (p.match(/^[\p{L}']+/u)?.[0] || "").toLowerCase();
    if (!w) continue;
    firsts[w] = (firsts[w] || 0) + 1;
  }
  let max = { word: "", count: 0 };
  for (const [w, c] of Object.entries(firsts)) {
    if (c > max.count) max = { word: w, count: c };
  }
  return max;
};

export const scoreProposal = (text: string): ProposalScore => {
  const clean = (text || "").trim();
  const wordCount = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
  const citations = Array.from(clean.matchAll(CITATION_RE));
  const opening = repeatedOpeningCount(clean);

  const checks: ProposalScoreCheck[] = [
    {
      key: "length",
      labelVi: "Độ dài ≥ 1500 từ",
      labelEn: "Length ≥ 1500 words",
      weight: 25,
      pass: wordCount >= 1500,
      detailVi: `${wordCount} từ`,
      detailEn: `${wordCount} words`,
    },
    {
      key: "rq",
      labelVi: "Có 'research question / câu hỏi nghiên cứu'",
      labelEn: "Mentions a research question",
      weight: 15,
      pass: RQ_RE.test(clean),
    },
    {
      key: "method",
      labelVi: "Có phần 'methodology / phương pháp'",
      labelEn: "Includes methodology section",
      weight: 15,
      pass: METHOD_RE.test(clean),
    },
    {
      key: "citations",
      labelVi: "≥ 3 citation kiểu (Tác giả, 2023)",
      labelEn: "≥ 3 (Author, YYYY) citations",
      weight: 25,
      pass: citations.length >= 3,
      detailVi: `${citations.length} citation`,
      detailEn: `${citations.length} citations`,
    },
    {
      key: "opening",
      labelVi: "Không lặp cùng từ mở đầu > 3 lần",
      labelEn: "No repeated opening word > 3 times",
      weight: 20,
      pass: opening.count <= 3,
      detailVi: opening.count > 3 ? `lặp '${opening.word}' ${opening.count} lần` : undefined,
      detailEn: opening.count > 3 ? `repeats '${opening.word}' ${opening.count}x` : undefined,
    },
  ];

  const total = checks.reduce((acc, c) => acc + (c.pass ? c.weight : 0), 0);
  return { total, wordCount, checks };
};

/**
 * Build a minimal HTML document compatible with Microsoft Word
 * via `application/msword` mime trick (saves as .doc/.docx-openable).
 */
export const buildProposalDocxBlob = (title: string, markdown: string): Blob => {
  // Convert lightweight Markdown headings + paragraphs to HTML.
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const htmlBody = markdown
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("# ")) return `<h1>${escapeHtml(trimmed.slice(2))}</h1>`;
      if (trimmed.startsWith("## ")) return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("### ")) return `<h3>${escapeHtml(trimmed.slice(4))}</h3>`;
      return `<p>${escapeHtml(trimmed).replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  @page { size: A4; margin: 2.5cm; }
  body { font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #111; }
  h1 { font-size: 20pt; margin: 0 0 12pt 0; }
  h2 { font-size: 14pt; margin: 18pt 0 8pt 0; color: #4c1d95; }
  h3 { font-size: 12pt; margin: 14pt 0 6pt 0; }
  p { margin: 0 0 8pt 0; text-align: justify; }
</style>
</head>
<body>${htmlBody}</body>
</html>`;
  return new Blob(["\uFEFF" + html], { type: "application/msword" });
};
