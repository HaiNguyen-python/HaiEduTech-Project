/**
 * Audit for Chinese Writing Practice content bank.
 * Run: bunx tsx scripts/audit_chinese_writing.ts
 */
import { ZH_ESSAYS, ZH_VOCAB, ZH_GRAMMAR, ZH_CONNECTORS, ZH_TRANSLATION, ZH_PARAPHRASE, ZH_TYPING, ZH_LEVELS, ZH_TOPICS } from "../src/data/chineseWritingBank";

const issues: string[] = [];
const add = (bank: string, id: string, msg: string) => issues.push(`[${bank}] ${id}: ${msg}`);

const checkCommon = (bank: string, item: any) => {
  if (!item.id) add(bank, "unknown", "missing id");
  if (!ZH_LEVELS.includes(item.level)) add(bank, item.id, `invalid level "${item.level}"`);
  if (item.topic && !ZH_TOPICS.find(t => t.key === item.topic)) add(bank, item.id, `invalid topic "${item.topic}"`);
};

// 1. Essays
ZH_ESSAYS.forEach(e => {
  checkCommon("essay", e);
  if (!e.zh || !e.vi) add("essay", e.id, "missing zh or vi prompt");
  if (e.min >= e.max) add("essay", e.id, "min word count must be less than max");
  if (!e.hints || e.hints.length === 0) add("essay", e.id, "missing hints");
});

// 2. Vocab
ZH_VOCAB.forEach(v => {
  checkCommon("vocab", v);
  if (!v.word || !v.pinyin || !v.vi || !v.en || !v.ex) add("vocab", v.id, "missing fields");
});

// 3. Grammar & Connectors
[...ZH_GRAMMAR, ...ZH_CONNECTORS].forEach(g => {
  const bank = ZH_GRAMMAR.includes(g) ? "grammar" : "connector";
  if (!g.id || !g.pattern || !g.vi || !g.ex || !g.exPinyin || !g.exVi) add(bank, g.id || "unknown", "missing fields");
});

// 4. Sentences (Translation & Paraphrase)
[...ZH_TRANSLATION, ...ZH_PARAPHRASE].forEach(s => {
  const bank = ZH_TRANSLATION.includes(s) ? "translation" : "paraphrase";
  checkCommon(bank, s);
  if (!s.zh || !s.pinyin || !s.vi) add(bank, s.id, "missing zh, pinyin or vi");
  if (bank === "paraphrase" && !s.up) add(bank, s.id, "paraphrase item missing 'up' (advanced version)");
});

// Stats
console.log("Chinese Writing Bank Audit Report:");
console.log("Essays:", ZH_ESSAYS.length);
console.log("Vocab:", ZH_VOCAB.length);
console.log("Grammar:", ZH_GRAMMAR.length);
console.log("Connectors:", ZH_CONNECTORS.length);
console.log("Translation:", ZH_TRANSLATION.length);
console.log("Paraphrase:", ZH_PARAPHRASE.length);
console.log("Typing (Derived):", ZH_TYPING.length);

if (issues.length) {
  console.log(`\n${issues.length} issue(s) found:`);
  issues.forEach(i => console.log(" -", i));
  process.exit(1);
} else {
  console.log("\nAudit passed: 0 issues.");
}
