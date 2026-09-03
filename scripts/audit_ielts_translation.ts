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
