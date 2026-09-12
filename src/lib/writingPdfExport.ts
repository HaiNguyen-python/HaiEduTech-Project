/**
 * Shared printable export for every IELTS Writing Practice activity.
 * Builds a clean A4 print document (black on white) and opens the browser print
 * dialog so learners can save it as PDF. HTML printing is used instead of jsPDF
 * because jsPDF's built-in fonts break Vietnamese diacritics.
 */
import { toast } from "sonner";

export interface PdfMeta {
  label: string;
  value: string;
}

export type PdfSection =
  | { heading: string; kind: "text"; text: string }
  | { heading: string; kind: "list"; items: string[] }
  | { heading: string; kind: "table"; columns: string[]; rows: string[][] }
  | {
      heading: string;
      kind: "criteria";
      items: {
        label: string;
        score?: number | string;
        strengths?: string[];
        weaknesses?: string[];
        suggestions?: string[];
      }[];
    };

export interface WritingPdfDoc {
  /** Document title, e.g. "IELTS Writing Task 2 - Graded Essay" */
  title: string;
  /** Optional smaller line under the title (activity name, topic...) */
  subtitle?: string;
  meta?: PdfMeta[];
  sections: PdfSection[];
  /** File name suggestion shown as the document title in the print header */
  fileName?: string;
}

export const escapeHtml = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escape, then turn **bold** markers into <strong>. */
const rich = (s: unknown): string =>
  escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

const paragraphs = (s: unknown): string =>
  rich(s)
    .split(/\n{2,}/)
    .filter(p => p.trim().length > 0)
    .map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

const subList = (title: string, items?: string[]): string => {
  if (!items || items.length === 0) return "";
  return `<p class="sub">${escapeHtml(title)}</p><ul>${items
    .map(i => `<li>${rich(i)}</li>`)
    .join("")}</ul>`;
};

function renderSection(sec: PdfSection): string {
  const head = `<h2>${escapeHtml(sec.heading)}</h2>`;
  if (sec.kind === "text") {
    if (!sec.text || !String(sec.text).trim()) return "";
    return head + `<div class="body">${paragraphs(sec.text)}</div>`;
  }
  if (sec.kind === "list") {
    const items = (sec.items || []).filter(i => i && String(i).trim());
    if (!items.length) return "";
    return head + `<ul>${items.map(i => `<li>${rich(i)}</li>`).join("")}</ul>`;
  }
  if (sec.kind === "table") {
    if (!sec.rows || sec.rows.length === 0) return "";
    return (
      head +
      `<table><thead><tr>${sec.columns
        .map(c => `<th>${escapeHtml(c)}</th>`)
        .join("")}</tr></thead><tbody>${sec.rows
        .map(r => `<tr>${r.map(c => `<td>${rich(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`
    );
  }
  // criteria
  if (!sec.items || sec.items.length === 0) return "";
  return (
    head +
    sec.items
      .map(
        c =>
          `<div class="crit"><p class="crit-head"><strong>${escapeHtml(c.label)}</strong>${
            c.score !== undefined && c.score !== null
              ? `<span class="band">${escapeHtml(c.score)}</span>`
              : ""
          }</p>${subList("Strengths", c.strengths)}${subList(
            "Needs work",
            c.weaknesses,
          )}${subList("Suggestions", c.suggestions)}</div>`,
      )
      .join("")
  );
}

/** Build the print HTML and open the browser print dialog. */
export function openWritingPdf(doc: WritingPdfDoc) {
  const stamp = new Date().toLocaleString();
  const metaRow = (doc.meta || [])
    .filter(m => m && m.value !== undefined && String(m.value).trim() !== "")
    .map(
      m =>
        `<span class="chip"><em>${escapeHtml(m.label)}:</em> ${escapeHtml(m.value)}</span>`,
    )
    .join("");

  const body = doc.sections.map(renderSection).join("");

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${escapeHtml(doc.fileName || doc.title)}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, "Times New Roman", serif; color: #111827; background: #fff;
         max-width: 760px; margin: 24px auto; padding: 0 18px; line-height: 1.7; font-size: 13.5px; }
  header { border-bottom: 3px solid #3B82F6; padding-bottom: 10px; margin-bottom: 18px; }
  .brand { font-family: Arial, Helvetica, sans-serif; font-size: 12px; letter-spacing: .08em;
           text-transform: uppercase; color: #10B981; font-weight: 700; }
  h1 { font-size: 20px; margin: 6px 0 4px; color: #1e3a8a; }
  .subtitle { font-size: 13px; color: #374151; margin: 0; }
  .stamp { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #6b7280; margin-top: 6px; }
  .meta { margin: 0 0 16px; }
  .chip { display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 11.5px;
          background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px;
          padding: 3px 9px; margin: 0 6px 6px 0; color: #1f2937; }
  .chip em { color: #6b7280; font-style: normal; }
  h2 { font-size: 14.5px; color: #10B981; margin: 20px 0 8px; padding-bottom: 4px;
       border-bottom: 1px solid #e5e7eb; page-break-after: avoid; }
  p { margin: 0 0 10px; }
  .body p { white-space: pre-wrap; }
  ul { margin: 0 0 10px; padding-left: 20px; }
  li { margin-bottom: 5px; }
  .crit { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px;
          page-break-inside: avoid; }
  .crit-head { margin: 0 0 6px; display: flex; justify-content: space-between; gap: 10px; }
  .band { font-family: Arial, Helvetica, sans-serif; font-weight: 700; color: #1d4ed8; }
  .sub { font-family: Arial, Helvetica, sans-serif; font-size: 11.5px; color: #6b7280;
         text-transform: uppercase; letter-spacing: .05em; margin: 8px 0 3px; }
  table { width: 100%; border-collapse: collapse; margin: 0 0 12px; font-size: 12.5px;
          page-break-inside: avoid; }
  th, td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 11.5px; }
  footer { margin-top: 28px; padding-top: 10px; border-top: 1px solid #e5e7eb;
           font-family: Arial, Helvetica, sans-serif; font-size: 10.5px; color: #9ca3af;
           text-align: center; }
  @media print { body { margin: 0; max-width: none; padding: 0; } }
</style></head><body>
<header>
  <div class="brand">HaiEduTech</div>
  <h1>${escapeHtml(doc.title)}</h1>
  ${doc.subtitle ? `<p class="subtitle">${escapeHtml(doc.subtitle)}</p>` : ""}
  <div class="stamp">${escapeHtml(stamp)}</div>
</header>
${metaRow ? `<div class="meta">${metaRow}</div>` : ""}
${body}
<footer>HaiEduTech - Hoc thong minh, Dan dau ky nguyen so - haiedutech.com</footer>
</body></html>`;

  let w: Window | null = null;
  try {
    w = window.open("", "_blank");
  } catch {
    w = null;
  }
  if (!w) {
    toast.error("Please allow pop-ups for this site to download the PDF.");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => {
    try {
      w?.print();
    } catch {
      /* user can still print manually */
    }
  }, 350);
}

export interface GradedEssayPdfInput {
  taskType: 1 | 2;
  prompt: string;
  essay: string;
  wordCount: number;
  chartDescription?: string;
  activityLabel: string;
  result: {
    overall: number;
    criteria: { label: string; score: number; strengths?: string[]; weaknesses?: string[]; suggestions?: string[] }[];
    errors?: { error: string; correction: string; category: string }[];
    upgraded?: string;
    advice?: string;
  };
}

/** Build the printable document for a fully graded essay (Essay Writing / Smart Grading). */
export function buildGradedEssayPdf(input: GradedEssayPdfInput): WritingPdfDoc {
  const { result } = input;
  const sections: PdfSection[] = [
    { heading: "Prompt", kind: "text", text: input.prompt },
  ];
  if (input.chartDescription && input.chartDescription.trim()) {
    sections.push({ heading: "Chart / data description", kind: "text", text: input.chartDescription });
  }
  sections.push(
    { heading: `Your essay (${input.wordCount} words)`, kind: "text", text: input.essay },
    {
      heading: "Criteria breakdown",
      kind: "criteria",
      items: (result.criteria || []).map(c => ({
        label: c.label,
        score: c.score,
        strengths: c.strengths,
        weaknesses: c.weaknesses,
        suggestions: c.suggestions,
      })),
    },
  );
  if (result.errors && result.errors.length) {
    sections.push({
      heading: "Errors and corrections",
      kind: "table",
      columns: ["Issue", "Correction", "Type"],
      rows: result.errors.map(e => [e.error, e.correction, e.category]),
    });
  }
  if (result.upgraded && result.upgraded.trim()) {
    sections.push({ heading: "Upgraded Band 8.0+ version", kind: "text", text: result.upgraded });
  }
  if (result.advice && result.advice.trim()) {
    sections.push({ heading: "Advice for next time", kind: "text", text: result.advice });
  }
  return {
    title: `IELTS Writing Task ${input.taskType} - Graded Feedback`,
    subtitle: input.activityLabel,
    meta: [
      { label: "Task", value: `Task ${input.taskType}` },
      { label: "Overall band", value: String(result.overall) },
      { label: "Words", value: String(input.wordCount) },
    ],
    sections,
    fileName: `ielts-writing-task${input.taskType}-feedback`,
  };
}
