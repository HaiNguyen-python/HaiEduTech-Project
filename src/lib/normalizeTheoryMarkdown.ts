/**
 * Repairs high-confidence Markdown structure issues in Programming theory.
 * Prose and inline code are preserved; fenced code receives conservative
 * language-aware indentation repair.
 */
import { normalizeFencedCodeIndentation } from "@/lib/normalizeCodeIndentation";

export const normalizeTheoryMarkdownStructure = (markdown: string): string => {
  if (!markdown) return markdown;

  let inFence = false;
  const output: string[] = [];
  const lines = markdown.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      output.push(line);
      continue;
    }
    if (inFence) {
      output.push(line);
      continue;
    }

    const group = /^-\s+\*\*([^*\n]+)\*\*\s*:?\s*$/.exec(line);
    const nextLine = lines[index + 1] ?? "";
    // A single leading space does not form a nested Markdown list. This is the
    // malformed shape emitted by older Deep Dives; 2-4 spaces are valid nesting.
    if (group && /^ - \S/.test(nextLine)) {
      if (output.length > 0 && output[output.length - 1]?.trim()) output.push("");
      output.push(`### ${group[1].trim()}`);
      output.push("");

      while (index + 1 < lines.length && /^ - \S/.test(lines[index + 1] ?? "")) {
        index += 1;
        output.push((lines[index] ?? "").replace(/^ (?=-\s)/, ""));
      }
      continue;
    }

    output.push(line);
  }

  return normalizeFencedCodeIndentation(
    separateListsFromParagraphs(expandInlineBullets(output.join("\n"))).replace(/\n{3,}/g, "\n\n"),
  );
};

/**
 * Some theory blocks (mostly the callouts) pack several bullets onto one line:
 * "💡 **Tips:** - Commit small and often ... - Keep PRs small ...". Markdown
 * renders that as one run-on sentence, so each " - Item" is promoted to a real
 * list item. Only lines with at least two such separators are touched, and the
 * separator must introduce a new item (capital letter, bold or inline code) so
 * that ordinary dashes inside a sentence are left alone.
 */
const INLINE_BULLET = / - (?=[A-Z`*(\d])/g;

const expandInlineBullets = (markdown: string): string => {
  let inFence = false;
  const out: string[] = [];

  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    const prefixMatch = /^(\s*(?:>\s*)*)(?:([-*+])\s+)?/.exec(line);
    const prefix = prefixMatch?.[1] ?? "";
    const marker = prefixMatch?.[2];
    const body = line.slice(prefixMatch?.[0].length ?? 0);
    const separators = body.match(INLINE_BULLET);
    if (inFence || !body.trim() || !separators || separators.length < 2) {
      out.push(line);
      continue;
    }

    const parts = body.split(INLINE_BULLET).map((part) => part.trim()).filter(Boolean);
    const [lead, ...items] = parts;
    const quote = prefix.includes(">") ? "> " : "";
    const indent = quote ? "" : prefix;
    // A bare label such as "**Tips:**" stays as the intro line for the bullets.
    out.push(`${quote}${indent}${marker ? `${marker} ` : ""}${lead}`);
    out.push(quote.trim() || "");
    items.forEach((item) => out.push(`${quote}${indent}- ${item}`));
    out.push(quote.trim() || "");
  }

  return out.join("\n");
};

/**
 * Markdown needs a blank line between a paragraph and the list that follows it,
 * otherwise the bullets are swallowed into the paragraph (lazy continuation)
 * and render as one long run-on sentence. This is the shape used across the
 * Programming theory, including inside blockquote callouts ("> 💡 **Tips:**"
 * followed by "> - ...").
 */
const LIST_ITEM = /^(\s*(?:>\s*)*)(?:[-*+]|\d+[.)])\s+\S/;
const HEADING_OR_FENCE = /^(\s*(?:>\s*)*)(?:#{1,6}\s|```|\||\s*$)/;

const separateListsFromParagraphs = (markdown: string): string => {
  let inFence = false;
  const out: string[] = [];

  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const item = LIST_ITEM.exec(line);
    const prev = out[out.length - 1];
    if (item && prev !== undefined && prev.trim()) {
      const prevIsList = LIST_ITEM.test(prev);
      const prevIsStructural = HEADING_OR_FENCE.test(prev);
      if (!prevIsList && !prevIsStructural) {
        // Keep the blockquote marker so the bullets stay inside the callout.
        const quotePrefix = (item[1].match(/>/g) || []).map(() => ">").join(" ");
        out.push(quotePrefix ? quotePrefix : "");
      }
    }
    out.push(line);
  }

  return out.join("\n");
};
