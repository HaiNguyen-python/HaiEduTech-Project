/**
 * @file swedishExampleNormalizer.ts
 * @description Normalizes auto-generated Swedish vocabulary examples into
 *              learner-safe, natural bilingual explanation sentences.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord } from "./swedishVocabBank";

const GENERIC_EXAMPLE_PATTERNS = [
  /^Jag gillar /,
  /^Jag vill /,
  /^Det är /,
  /^Hon arbetar /,
  /^Jag har \S+ vänner\./,
];

const AWKWARD_EXAMPLE_EN = [
  /\bI want to (can|must|want|need)\b/i,
  /\bI like (face|arm|shoulder|leg|finger|foot|throat|hand|head|hair|knee|stomach|mouth|nose|back|tooth|eye|ear)\b/i,
  /\bI like (a )?(ticket|bus|train|map|station|road|question|answer|page|end|beginning)\b/i,
  /\bShe works (everyone|everything|also|to the right|to the left|straight ahead)\b/i,
  /\bIt is (old|new|clean|dirty|fast|slow|early|late)\b/i,
];

const quote = (value: string) => value.replace(/["“”]/g, "'").trim();

function labelFor(pos: string) {
  const p = pos.toLowerCase();
  if (p.startsWith("v")) return { sv: "Verbet", vi: "Động từ", en: "The verb" };
  if (p.startsWith("adj")) return { sv: "Adjektivet", vi: "Tính từ", en: "The adjective" };
  if (p.startsWith("adv")) return { sv: "Adverbet", vi: "Trạng từ", en: "The adverb" };
  if (p.startsWith("phr")) return { sv: "Uttrycket", vi: "Cụm từ", en: "The phrase" };
  if (p.startsWith("conj")) return { sv: "Bindeordet", vi: "Liên từ", en: "The conjunction" };
  if (p.startsWith("prep")) return { sv: "Prepositionen", vi: "Giới từ", en: "The preposition" };
  if (p.startsWith("pron")) return { sv: "Pronomenet", vi: "Đại từ", en: "The pronoun" };
  if (p.startsWith("num")) return { sv: "Talet", vi: "Số", en: "The number" };
  return { sv: "Ordet", vi: "Từ", en: "The word" };
}

function needsNormalization(word: SwedishWord): boolean {
  const example = word.example.trim();
  const exampleEn = word.exampleEn.trim();

  return (
    GENERIC_EXAMPLE_PATTERNS.some((pattern) => pattern.test(example)) ||
    AWKWARD_EXAMPLE_EN.some((pattern) => pattern.test(exampleEn)) ||
    /Tôi muốn (có thể|phải|muốn|cần)\.?$/i.test(word.exampleVi.trim()) ||
    /Cô ấy làm việc (tất cả|cũng|sang phải|sang trái|đi thẳng)\.?$/i.test(word.exampleVi.trim()) ||
    /Nó (cũ|mới|sạch|bẩn|nhanh|chậm|sớm|muộn)\.?$/i.test(word.exampleVi.trim())
  );
}

export function normalizeSwedishWordExamples(word: SwedishWord): SwedishWord {
  if (!needsNormalization(word)) return word;

  const headword = quote(word.sv);
  const vi = quote(word.vi);
  const en = quote(word.en).replace(/^to\s+/i, "");
  const label = labelFor(word.pos);

  return {
    ...word,
    example: `${label.sv} "${headword}" betyder "${en}" på engelska.`,
    exampleVi: `${label.vi} "${headword}" có nghĩa là "${vi}".`,
    exampleEn: `${label.en} "${headword}" means "${en}".`,
  };
}