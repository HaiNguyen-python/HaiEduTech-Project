/**
 * Audit for all IELTS Writing Practice content banks.
 * Run: bunx tsx scripts/audit_ielts_writing_banks.ts
 */
import { IELTS_GRAMMAR, GRAMMAR_CATEGORIES, grammarItemTask } from "../src/data/ieltsGrammarBank";
import { IELTS_GRAMMAR_TASK1, TASK1_GRAMMAR_CATEGORIES } from "../src/data/ieltsGrammarBankTask1";
import { IELTS_PHRASES, TASK1_CATEGORIES, TASK2_CATEGORIES } from "../src/data/ieltsPhraseBank";
import { LINKERS, LINKER_CATEGORIES } from "../src/data/ieltsCohesionBank";
import { IELTS_IDEA_TOPICS as IELTS_IDEAS } from "../src/data/ieltsIdeaBank";
import { ALL_TRANSLATION_ITEMS } from "../src/data/ieltsTranslationBank";
import { essayIllustrations } from "../src/data/ieltsEssayIllustrations";
import { sampleEssays } from "../src/data/ieltsSampleEssays";
import { findKeyPhraseRanges } from "../src/lib/highlightKeywords";

const issues: string[] = [];
const warnings: string[] = [];
const add = (bank: string, id: string, msg: string) => issues.push(`[${bank}] ${id}: ${msg}`);

const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;
const stripBold = (s: string) => s.replace(/\*\*/g, "");
const dedupe = <T>(rows: T[], key: (r: T) => string, bank: string, label: string) => {
  const seen = new Map<string, string>();
  for (const r of rows) {
    const k = key(r).trim().toLowerCase();
    if (seen.has(k)) add(bank, k.slice(0, 48), `duplicate ${label}`);
    else seen.set(k, k);
  }
};

// ---------- Grammar (Task 2 bank + Task 1 bank) ----------
const grammarCats = new Set(GRAMMAR_CATEGORIES.map((c) => c.value));
const task1Cats = new Set(TASK1_GRAMMAR_CATEGORIES.map((c) => c.value));
const allGrammar = [...IELTS_GRAMMAR, ...IELTS_GRAMMAR_TASK1];
const grammarIds = new Set<string>();
for (const g of allGrammar) {
  const bank = "grammar";
  if (grammarIds.has(g.id)) add(bank, g.id, "duplicate id");
  grammarIds.add(g.id);
  const isT1 = IELTS_GRAMMAR_TASK1.includes(g);
  const cats = isT1 ? task1Cats : grammarCats;
  if (!cats.has(g.category)) add(bank, g.id, `category "${g.category}" not in its category list`);
  if (isT1 && g.task !== 1) add(bank, g.id, "Task 1 bank item must be tagged task: 1");
  const tag = grammarItemTask(g);
  if (![1, 2, "both"].includes(tag as never)) add(bank, g.id, `invalid task tag "${tag}"`);
  for (const [f, v] of Object.entries({ structure: g.structure, meaning: g.meaning, example: g.example })) {
    if (!v || !v.trim()) add(bank, g.id, `empty ${f}`);
  }
  const ex = stripBold(g.example);
  if (!/[.!?]$/.test(ex.trim())) add(bank, g.id, "example missing final punctuation");
  if (!/^[A-Z"']/.test(ex.trim())) add(bank, g.id, "example not capitalised");
  if (VI.test(ex)) add(bank, g.id, "Vietnamese leak in the English example");
  if ((g.example.match(/\*\*/g)?.length || 0) % 2 !== 0) add(bank, g.id, "unbalanced ** bold markers");
  if (!/\*\*/.test(g.example)) add(bank, g.id, "example does not highlight the target structure with **");
  if (/—/.test(`${g.structure}${g.meaning}${g.example}${g.hint || ""}`)) add(bank, g.id, "em-dash found (use hyphen)");
  if (ex.split(/\s+/).length < 6) add(bank, g.id, "example too short (min 6 words)");
}
dedupe(allGrammar, (g) => g.structure, "grammar", "structure");

// Every Task 1 category (except "all") needs enough items to practise.
for (const c of TASK1_GRAMMAR_CATEGORIES) {
  if (c.value === "all") continue;
  const n = IELTS_GRAMMAR_TASK1.filter((g) => g.category === c.value).length;
  if (n < 6) issues.push(`[grammar] coverage: Task 1 / ${c.value} has only ${n} items (min 6)`);
}
const task1Pool = IELTS_GRAMMAR_TASK1.length + IELTS_GRAMMAR.filter((g) => grammarItemTask(g) === "both").length;
if (task1Pool < 40) issues.push(`[grammar] Task 1 pool has only ${task1Pool} structures (min 40)`);

// ---------- Phrases ----------
const t1Cats = new Set(TASK1_CATEGORIES.map((c) => c.value as string));
const t2Cats = new Set(TASK2_CATEGORIES.map((c) => c.value as string));
const phraseIds = new Set<string>();
for (const p of IELTS_PHRASES) {
  const bank = "phrase";
  if (phraseIds.has(p.id)) add(bank, p.id, "duplicate id");
  phraseIds.add(p.id);
  const cats = p.taskType === 1 ? t1Cats : t2Cats;
  if (!cats.has(p.category as string)) add(bank, p.id, `category "${p.category}" not valid for Task ${p.taskType}`);
  if (![1, 2].includes(p.taskType)) add(bank, p.id, "invalid taskType");
  if (!["B1", "B2", "C1"].includes(p.level)) add(bank, p.id, `invalid level "${p.level}"`);
  for (const [f, v] of Object.entries({ phrase: p.phrase, meaning: p.meaning, meaningEn: p.meaningEn, example: p.example })) {
    if (!v || !v.trim()) add(bank, p.id, `empty ${f}`);
  }
  if (VI.test(stripBold(p.example))) add(bank, p.id, "Vietnamese leak in the English example");
  if (VI.test(p.meaningEn)) add(bank, p.id, "Vietnamese leak in meaningEn");
  if (!/[.!?]$/.test(stripBold(p.example).trim())) add(bank, p.id, "example missing final punctuation");
  if (/—/.test(`${p.phrase}${p.meaning}${p.meaningEn}${p.example}`)) add(bank, p.id, "em-dash found (use hyphen)");
  if (!findKeyPhraseRanges(stripBold(p.example), [p.phrase], { flexible: true }).length) {
    add(bank, p.id, "example does not contain a highlightable form of the phrase");
  }
}
dedupe(IELTS_PHRASES, (p) => `${p.taskType}|${p.phrase}`, "phrase", "phrase within the same task");

// ---------- Cohesion linkers ----------
const linkerCats = new Set(LINKER_CATEGORIES.map((c) => c.value as string));
const linkerIds = new Set<string>();
for (const l of LINKERS) {
  const bank = "cohesion";
  if (linkerIds.has(l.id)) add(bank, l.id, "duplicate id");
  linkerIds.add(l.id);
  if (!linkerCats.has(l.category)) add(bank, l.id, `category "${l.category}" not in LINKER_CATEGORIES`);
  if (![1, 2, "both"].includes(l.task as never)) add(bank, l.id, `invalid task "${l.task}"`);
  if (!["B2", "C1"].includes(l.level)) add(bank, l.id, `invalid level "${l.level}"`);
  for (const [f, v] of Object.entries({ linker: l.linker, meaning: l.meaning, example: l.example })) {
    if (!v || !v.trim()) add(bank, l.id, `empty ${f}`);
  }
  if (VI.test(stripBold(l.example))) add(bank, l.id, "Vietnamese leak in the English example");
  if (!/[.!?]$/.test(stripBold(l.example).trim())) add(bank, l.id, "example missing final punctuation");
  if (/—/.test(`${l.linker}${l.meaning}${l.example}${l.warning || ""}`)) add(bank, l.id, "em-dash found (use hyphen)");
}
dedupe(LINKERS, (l) => l.linker, "cohesion", "linker");

// ---------- Idea bank (Task 2 only by design) ----------
const ideaIds = new Set<string>();
for (const topic of IELTS_IDEAS) {
  const bank = "idea";
  if (ideaIds.has(topic.id)) add(bank, topic.id, "duplicate id");
  ideaIds.add(topic.id);
  if (!topic.sides?.length) add(bank, topic.id, "no perspectives");
  if (topic.sides.length < 2) add(bank, topic.id, `only ${topic.sides.length} perspective(s) (min 2)`);
  for (const side of topic.sides) {
    if (!side.label?.trim() || !side.labelVi?.trim()) add(bank, topic.id, "perspective missing label");
    if (side.ideas.length < 2) add(bank, topic.id, `perspective "${side.label}" has only ${side.ideas.length} idea(s)`);
    for (const idea of side.ideas) {
      for (const [f, v] of Object.entries({ point: idea.point, reason: idea.reason, example: idea.example })) {
        if (!v || !v.trim()) add(bank, topic.id, `idea missing ${f}`);
        if (VI.test(v || "")) add(bank, topic.id, `Vietnamese leak in idea ${f}`);
      }
    }
    dedupe(side.ideas, (i) => i.point, "idea", `idea point in ${topic.id}`);
  }
  if (/—/.test(JSON.stringify(topic))) add(bank, topic.id, "em-dash found (use hyphen)");
}

// ---------- Translation bank (already has its own deep audit) ----------
const transIds = new Set<string>();
for (const it of ALL_TRANSLATION_ITEMS) {
  if (transIds.has(it.id)) add("translation", it.id, "duplicate id");
  transIds.add(it.id);
}

// ---------- Sample essays (Band 7.0+ and Band 8.0+) ----------
const essayIds = new Set<string>();
for (const essay of sampleEssays) {
  const bank = "sample-essay";
  if (essayIds.has(essay.id)) add(bank, essay.id, "duplicate id");
  essayIds.add(essay.id);
  const band = essay.band ?? "8.0+";
  if (!["7.0+", "8.0+"].includes(band)) add(bank, essay.id, `invalid band "${band}"`);
  if (!essay.reviewExercise.items.length) add(bank, essay.id, "review exercise has no items");
  for (const [index, item] of essay.reviewExercise.items.entries()) {
    const blanks = item.sentence.match(/___/g)?.length ?? 0;
    if (blanks !== 1) add(bank, essay.id, `review item ${index + 1} must contain exactly one blank`);
    if (!item.answer.trim()) add(bank, essay.id, `review item ${index + 1} has an empty answer`);
    if (!item.explanation?.trim()) warnings.push(`[${bank}] ${essay.id}: review item ${index + 1} uses the interface's contextual fallback explanation`);
  }
  if (/—/.test(`${essay.topic}${essay.prompt}${essay.essayBody}${JSON.stringify(essay.reviewExercise)}`)) {
    add(bank, essay.id, "em-dash found (use hyphen)");
  }
}

// ---------- Task 2 illustrations ----------
const seenImages = new Map<string, string>();
for (const essay of sampleEssays.filter((e) => e.taskType === 2)) {
  const illo = essayIllustrations[essay.id];
  if (!illo) { add("essay-illustration", essay.id, "missing Task 2 illustration"); continue; }
  if (!illo.url?.trim()) add("essay-illustration", essay.id, "empty illustration url");
  if (!illo.alt?.trim()) add("essay-illustration", essay.id, "empty alt text");
  if (!illo.caption?.trim()) add("essay-illustration", essay.id, "empty caption");
  const prev = seenImages.get(illo.url);
  if (prev) add("essay-illustration", essay.id, `illustration reused from ${prev}`);
  seenImages.set(illo.url, essay.id);
}
console.log("Task 2 illustrations:", seenImages.size);

console.log("Grammar Task 2 items:", IELTS_GRAMMAR.length);
console.log("Grammar Task 1 items:", IELTS_GRAMMAR_TASK1.length, "| Task 1 practice pool:", task1Pool);
console.log("Phrases:", IELTS_PHRASES.length, "| Linkers:", LINKERS.length, "| Idea topics:", IELTS_IDEAS.length, "| Translation:", ALL_TRANSLATION_ITEMS.length);
console.log("Sample essays:", sampleEssays.length, "| Band 7.0+:", sampleEssays.filter((essay) => essay.band === "7.0+").length, "| Band 8.0+:", sampleEssays.filter((essay) => (essay.band ?? "8.0+") === "8.0+").length);
console.log("Sample essay content warnings:", warnings.length);
if (issues.length) {
  console.log(`\n${issues.length} issue(s):`);
  issues.forEach((i) => console.log(" -", i));
  process.exit(1);
}
console.log("\nAudit passed: 0 issues.");
