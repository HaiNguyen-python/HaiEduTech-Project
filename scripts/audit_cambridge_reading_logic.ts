/**
 * @file audit_cambridge_reading_logic.ts
 * @description Logic audit for the Reading & Writing items of the Cambridge mock
 *              papers. Flags items a child cannot answer by reasoning from the
 *              item itself: retrieval questions whose key is not in the text,
 *              retrieval questions where more than one option is stated in the
 *              text, and passage-less items that ask for the reader's personal
 *              habits or for outside world knowledge.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { cambridgeMockExams } from "../src/data/cambridgeMockExamData";

const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9'\s]/g, " ").replace(/\s+/g, " ").trim();
const stem = (w: string) => w.replace(/(ing|ied|ed|es|s)$/, "");
const STOP = new Set(["the", "a", "an", "and", "or", "of", "to", "in", "on", "at", "is", "are", "am", "it", "he", "she", "they", "his", "her", "their", "my", "very"]);

/** Is every content word of `option` present in `text`? */
const statedIn = (text: string, option: string): boolean => {
  const t = new Set(norm(text).split(" ").map(stem));
  const words = norm(option).split(" ").filter((w) => w && !STOP.has(w)).map(stem);
  if (words.length === 0) return false;
  return words.every((w) => t.has(w));
};

const RETRIEVAL = /^(what|where|who|when|how many|how much|how old|which)\b/i;
const LANGUAGE_ITEM = /___|\bcorrect\b|\bspelling\b|\bopposite\b|\bmeans\b|\bmeaning\b|\bword\b|\bsentence\b|\bplural\b|\bpast\b|\bcomparative\b|\bpreposition\b|\barticle\b|\bchoose\b|\bgrammar\b|\bform\b/i;
const PERSONAL = /\b(you|your)\b/i;
const WORLD = /\b(most|usually|normally|favourite|favorite|biggest|best|tallest|fastest|capital|typically)\b/i;

const notSupported: string[] = [];
const ambiguous: string[] = [];
const personal: string[] = [];
const world: string[] = [];

for (const exam of cambridgeMockExams) {
  for (const q of exam.questions) {
    if (q.section !== "Reading & Writing") continue;
    const at = `${exam.id} q${q.id}`;
    const key = q.options[q.correctAnswer] ?? "";

    if (q.passage) {
      if (RETRIEVAL.test(q.question.trim()) && !LANGUAGE_ITEM.test(q.question)) {
        if (!statedIn(q.passage, key)) notSupported.push(`${at} :: ${q.question} => "${key}"`);
        else {
          const hits = q.options.filter((o) => statedIn(q.passage!, o));
          if (hits.length > 1) ambiguous.push(`${at} :: ${q.question} => stated: ${hits.join(" | ")}`);
        }
      }
      continue;
    }

    if (LANGUAGE_ITEM.test(q.question)) continue;
    if (PERSONAL.test(q.question)) personal.push(`${at} :: ${q.question} => "${key}"`);
    else if (WORLD.test(q.question)) world.push(`${at} :: ${q.question} => "${key}"`);
  }
}

const report = (name: string, list: string[]) => {
  console.log(`\n== ${name}: ${list.length}`);
  list.slice(0, 40).forEach((l) => console.log(" -", l));
};
report("key not stated in the reading text", notSupported);
report("more than one option stated in the text", ambiguous);
report("passage-less personal-habit items", personal);
report("passage-less world-knowledge items", world);
console.log("\nTotal flagged:", notSupported.length + ambiguous.length + personal.length + world.length);
