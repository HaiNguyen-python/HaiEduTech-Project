/**
 * Cambridge reading-passage formatter.
 * Exam texts are stored as one long string. Cambridge papers print them as
 * short paragraphs, so we rebuild that layout: existing line breaks are kept,
 * and any solid block is split into paragraphs of a few sentences.
 */

const SENTENCES_PER_PARAGRAPH = 3;
const MAX_PARAGRAPH_CHARS = 420;

const splitSentences = (text: string): string[] =>
  text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?…])\s+(?=["'“(A-Z0-9])/g)
    .map((s) => s.trim())
    .filter(Boolean);

/** Returns the passage as an array of paragraphs ready for rendering. */
export const formatCambridgePassage = (raw: string | undefined | null): string[] => {
  const text = (raw ?? "").trim();
  if (!text) return [];

  // Respect an author's own paragraphing when it exists.
  const authored = text
    .split(/\n{1,}/g)
    .map((p) => p.trim())
    .filter(Boolean);
  if (authored.length > 1) return authored.flatMap((p) => chunkBlock(p));

  return chunkBlock(text);
};

const chunkBlock = (block: string): string[] => {
  const sentences = splitSentences(block);
  if (sentences.length <= SENTENCES_PER_PARAGRAPH) return [sentences.join(" ") || block];

  const paragraphs: string[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) paragraphs.push(buf.join(" "));
    buf = [];
  };
  for (const sentence of sentences) {
    const projected = [...buf, sentence].join(" ");
    if (buf.length >= SENTENCES_PER_PARAGRAPH || projected.length > MAX_PARAGRAPH_CHARS) flush();
    buf.push(sentence);
  }
  flush();
  return paragraphs;
};
