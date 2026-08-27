/**
 * Cambridge reading-passage formatter.
 * Exam texts are stored as one long string. Cambridge papers print them as
 * short paragraphs, so we rebuild that layout: existing line breaks are kept,
 * headings / lead-ins / greetings / sign-offs get their own line, and any solid
 * block is split into paragraphs of two or three sentences.
 */

const SENTENCES_PER_PARAGRAPH = 3;
const MAX_PARAGRAPH_CHARS = 320;

/** Instructions or labels that introduce the text and belong on their own line. */
const LEAD_IN =
  /^(read (the|this)[^.]*\.|look at[^.]*\.|(text|email|e-mail|note|notice|message|letter|advert(isement)?|leaflet|article|story|poster|sign|invitation|diary|blog|review|timetable|menu|text message conversation)[^.]{0,60}\.)\s*/i;

/** Greetings and sign-offs always start a new paragraph in real papers. */
const GREETING = /^(hi|hello|hey|dear)\b[^.!?]{0,30}[,!:]/i;
const SIGN_OFF =
  /^(see you( soon| later)?|love|thanks( so much)?|thank you|best wishes|all the best|yours( sincerely| faithfully)?|regards|bye)\b[^.!?]{0,40}[,.!]?$/i;
/** Dialogue turn or labelled line: "Anna: ...", "Ground floor: ...". */
const LABELLED_LINE = /^[A-Z][A-Za-z' ]{1,24}:\s/;

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
  if (authored.length > 1) return authored.flatMap((p) => splitBlock(p));

  return splitBlock(text);
};

/** Pull a lead-in instruction off the front, then chunk the rest. */
const splitBlock = (block: string): string[] => {
  const out: string[] = [];
  let body = block.trim();

  const lead = body.match(LEAD_IN);
  if (lead && body.length - lead[0].length > 40) {
    out.push(lead[0].trim());
    body = body.slice(lead[0].length).trim();
  }

  // Short labelled lines (notice items, dialogue turns) stay as they are.
  if (LABELLED_LINE.test(body) && body.length <= MAX_PARAGRAPH_CHARS) {
    out.push(body);
    return out;
  }

  return [...out, ...chunkBlock(body)];
};

const chunkBlock = (block: string): string[] => {
  const sentences = splitSentences(block);
  if (!sentences.length) return block ? [block] : [];

  const paragraphs: string[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) paragraphs.push(buf.join(" "));
    buf = [];
  };
  for (const sentence of sentences) {
    const breakBefore = GREETING.test(sentence) || SIGN_OFF.test(sentence) || LABELLED_LINE.test(sentence);
    const projected = [...buf, sentence].join(" ");
    if (
      buf.length &&
      (breakBefore || buf.length >= SENTENCES_PER_PARAGRAPH || projected.length > MAX_PARAGRAPH_CHARS)
    )
      flush();
    buf.push(sentence);
    if (breakBefore && (GREETING.test(sentence) || SIGN_OFF.test(sentence))) flush();
  }
  flush();
  return paragraphs;
};
