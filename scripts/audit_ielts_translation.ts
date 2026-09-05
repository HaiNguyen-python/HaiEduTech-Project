/**
 * Audit for the IELTS Translation Practice bank.
 * Run: bunx tsx scripts/audit_ielts_translation.ts
 */
import { ALL_TRANSLATION_ITEMS, TRANSLATION_CATEGORIES, type TranslationItem } from "../src/data/ieltsTranslationBank";
import { buildChecks, hintIsGrounded, checkableHints } from "../src/lib/ieltsTranslationCheck";

const issues: string[] = [];
const add = (id: string, msg: string) => issues.push(`${id}: ${msg}`);

const BANDS = new Set(["6.0", "6.5-7.0", "7.5+"]);
const seen = new Set<string>();
const counts: Record<string, number> = {};

const sentenceCount = (s: string) => s.split(/(?<=[.!?])\s+/).filter((x) => x.trim().length > 2).length;

for (const it of ALL_TRANSLATION_ITEMS as TranslationItem[]) {
  if (seen.has(it.id)) add(it.id, "duplicate id");
  seen.add(it.id);
  const key = `${it.task}-${it.category}`;
  counts[key] = (counts[key] || 0) + 1;

  if (!BANDS.has(it.band)) add(it.id, `invalid band "${it.band}"`);
  const cats = TRANSLATION_CATEGORIES[it.task].map((c) => c.value);
  if (!cats.includes(it.category)) add(it.id, `category "${it.category}" not in Task ${it.task} list`);

  for (const [field, val] of Object.entries({ vi: it.vi, en: it.en, noteVi: it.noteVi, noteEn: it.noteEn })) {
    if (!val || !val.trim()) add(it.id, `empty ${field}`);
  }
  if (!/[.!?]$/.test(it.vi.trim())) add(it.id, "vi does not end with punctuation");
  if (!/[.!?]$/.test(it.en.trim())) add(it.id, "en does not end with punctuation");
  if (!/^[A-Z"']/.test(it.en.trim())) add(it.id, "en does not start with a capital letter");
  if (/—/.test(`${it.vi}${it.en}${it.noteVi}${it.noteEn}`)) add(it.id, "em-dash found (use hyphen)");
  if (sentenceCount(it.vi) !== sentenceCount(it.en)) {
    add(it.id, `sentence count mismatch vi=${sentenceCount(it.vi)} en=${sentenceCount(it.en)}`);
  }

  if (!it.keywords.length) add(it.id, "no keywords");
  if (!checkableHints(it.keywords, it.en).length) add(it.id, "no hint that the model sentence itself uses");
  for (const k of it.keywords) {
    if (!hintIsGrounded(k, it.en, it.alts)) {
      add(it.id, `hint "${k}" appears in neither the model nor the alternatives`);
    }
  }
  if (new Set(it.keywords.map((k) => k.toLowerCase())).size !== it.keywords.length) {
    add(it.id, "duplicate keywords");
  }
  buildChecks(it.keywords); // regex compilation smoke test

  if (!it.alts.length) add(it.id, "no alternative version");
  for (const a of it.alts) {
    if (a.trim().toLowerCase() === it.en.trim().toLowerCase()) add(it.id, "alternative equals the model");
    if (!/[.!?]$/.test(a.trim())) add(it.id, `alternative missing final punctuation: "${a}"`);
    if (!/^[A-Z"']/.test(a.trim())) add(it.id, `alternative not capitalised: "${a}"`);
  }
}

for (const task of [1, 2] as const) {
  for (const c of TRANSLATION_CATEGORIES[task]) {
    if (c.value === "all") continue;
    const n = counts[`${task}-${c.value}`] || 0;
    if (n < 8) issues.push(`coverage: Task ${task} / ${c.value} has only ${n} sentences (min 8)`);
  }
}

console.log(`Total sentences: ${ALL_TRANSLATION_ITEMS.length}`);
console.log("Per category:", counts);
if (issues.length) {
  console.log(`\n${issues.length} issue(s):`);
  issues.forEach((i) => console.log(" -", i));
  process.exit(1);
}
console.log("\nAudit passed: 0 issues.");

// ---------------- Paragraph translation bank ----------------
import {
  ALL_PARAGRAPH_ITEMS,
  PARAGRAPH_CATEGORIES,
  countWords,
  type ParagraphTranslationItem,
} from "../src/data/ieltsParagraphTranslationBank";

const pIssues: string[] = [];
const padd = (id: string, msg: string) => pIssues.push(`${id}: ${msg}`);
const pSeen = new Set<string>();
const pCounts: Record<string, number> = {};
const norm = (s: string) => s.toLowerCase().replace(/[\u2018\u2019']/g, "'").replace(/\s+/g, " ");

for (const it of ALL_PARAGRAPH_ITEMS as ParagraphTranslationItem[]) {
  if (pSeen.has(it.id)) padd(it.id, "duplicate id");
  pSeen.add(it.id);
  pCounts[`${it.task}-${it.category}`] = (pCounts[`${it.task}-${it.category}`] || 0) + 1;

  if (!BANDS.has(it.band)) padd(it.id, `invalid band "${it.band}"`);
  const cats = PARAGRAPH_CATEGORIES[it.task].map((c) => c.value);
  if (!cats.includes(it.category)) padd(it.id, `category "${it.category}" not in Task ${it.task} list`);

  for (const [field, val] of Object.entries({ vi: it.vi, en: it.en, noteVi: it.noteVi, noteEn: it.noteEn })) {
    if (!val || !String(val).trim()) padd(it.id, `empty ${field}`);
  }
  if (/—/.test(`${it.vi}${it.en}${it.noteVi}${it.noteEn}`)) padd(it.id, "em-dash found (use hyphen)");
  if (!/[.!?]$/.test(it.vi.trim())) padd(it.id, "vi does not end with punctuation");
  if (!/[.!?]$/.test(it.en.trim())) padd(it.id, "en does not end with punctuation");
  if (!/^[A-Z"']/.test(it.en.trim())) padd(it.id, "en does not start with a capital letter");

  const viS = sentenceCount(it.vi);
  const enS = sentenceCount(it.en);
  if (viS < 3) padd(it.id, `paragraph too short: ${viS} Vietnamese sentence(s), min 3`);
  if (viS > 5) padd(it.id, `paragraph too long: ${viS} Vietnamese sentences, max 5`);
  if (viS !== enS) padd(it.id, `sentence count mismatch vi=${viS} en=${enS}`);

  const w = countWords(it.en);
  if (it.minWords >= it.maxWords) padd(it.id, "minWords must be smaller than maxWords");
  if (w < it.minWords || w > it.maxWords) {
    padd(it.id, `model paragraph has ${w} words, outside range ${it.minWords}-${it.maxWords}`);
  }

  if (!it.structures.length) padd(it.id, "no target structures");
  if (new Set(it.structures.map((s) => s.toLowerCase())).size !== it.structures.length) {
    padd(it.id, "duplicate structures");
  }
  for (const s of it.structures) {
    if (!norm(it.en).includes(norm(s))) padd(it.id, `structure "${s}" is not used in the model paragraph`);
  }
}

for (const task of [1, 2] as const) {
  for (const c of PARAGRAPH_CATEGORIES[task]) {
    if (c.value === "all") continue;
    const n = pCounts[`${task}-${c.value}`] || 0;
    if (n < 7) pIssues.push(`coverage: paragraphs Task ${task} / ${c.value} has only ${n} (min 7)`);
  }
}

console.log(`\nTotal paragraphs: ${ALL_PARAGRAPH_ITEMS.length}`);
console.log("Per category:", pCounts);
if (pIssues.length) {
  console.log(`\n${pIssues.length} paragraph issue(s):`);
  pIssues.forEach((i) => console.log(" -", i));
  process.exit(1);
}
console.log("Paragraph audit passed: 0 issues.");
