/**
 * Audit for the IELTS Speaking Practice question bank.
 * Checks topic coverage, duplicates and required fields.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { speakingPracticeData } from "../src/data/speakingPracticeData";

const issues: string[] = [];
const seenIds = new Set<string>();
const seenQ = new Set<string>();

for (const part of [1, 2, 3] as const) {
  const qs = speakingPracticeData[`part${part}`];
  const byTopic: Record<string, number> = {};
  for (const q of qs) {
    byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
    if (seenIds.has(q.id)) issues.push(`duplicate id: ${q.id}`);
    seenIds.add(q.id);
    const key = q.question.toLowerCase().replace(/\s+/g, " ").trim();
    if (seenQ.has(key)) issues.push(`duplicate question: ${q.question}`);
    seenQ.add(key);
    const minWords = part === 1 ? 18 : part === 2 ? 45 : 30;
    if (!q.model_answer || q.model_answer.split(/\s+/).length < minWords)
      issues.push(`${q.id}: model answer too short`);
    const vb = q.useful_language.vocabulary_bank || [];
    // Every question's model answer should demonstrate at least one target phrase.
    const ansLower = q.model_answer.toLowerCase();
    const stem = (w: string) => w.replace(/(ing|ies|ed|es|s)$/, "");
    const usesVocab = vb.some((v) => {
      const core = v.phrase.toLowerCase().replace(/^(to|a|an|the)\s+/, "");
      if (ansLower.includes(core.split(/[^a-z']+/).slice(0, 2).join(" "))) return true;
      const words = core
        .split(/[^a-z']+/)
        .filter((w) => w.length > 3 && !["your", "something", "someone"].includes(w));
      return words.some((w) => ansLower.includes(stem(w)));
    });
    if (vb.length && !usesVocab) issues.push(`${q.id}: model answer uses none of the target vocabulary`);
    if ((q.model_answer.match(/\*\*/g) || []).length % 2 !== 0)
      issues.push(`${q.id}: unbalanced ** markers in model answer`);
    for (const v of vb) {
      if (!v.vietnamese || !v.vietnamese.trim()) issues.push(`${q.id}: vocab "${v.phrase}" missing Vietnamese gloss`);
    }
    const phraseKeys = vb.map((v) => v.phrase.toLowerCase().trim());
    if (new Set(phraseKeys).size !== phraseKeys.length) issues.push(`${q.id}: duplicate vocabulary phrase`);
    if ((q.useful_language.vocabulary_bank || []).length < 3)
      issues.push(`${q.id}: fewer than 3 vocabulary items`);
    if ((q.useful_language.model_structures || []).length < 2)
      issues.push(`${q.id}: fewer than 2 structures`);
    if ((q.useful_language.brainstorming_ideas || []).length < 2)
      issues.push(`${q.id}: fewer than 2 ideas`);
    if (/—/.test(q.model_answer) || /—/.test(q.question))
      issues.push(`${q.id}: em dash found`);
    if (part !== 2 && !/\?$/.test(q.question.trim()))
      issues.push(`${q.id}: Part ${part} question must end with "?"`);
    if (part === 2 && (q.prompts || []).length && (q.prompts || []).length < 3)
      issues.push(`${q.id}: cue card needs at least 3 prompts`);
  }
  const min = part === 2 ? 1 : 5;
  for (const [topicName, count] of Object.entries(byTopic)) {
    if (count < min) issues.push(`Part ${part} topic "${topicName}" has only ${count} question(s)`);
  }
  console.log(`Part ${part}: ${qs.length} questions across ${Object.keys(byTopic).length} topics`);
}

if (issues.length) {
  console.log(`\n${issues.length} issues:`);
  issues.slice(0, 60).forEach((i) => console.log(" -", i));
  process.exit(1);
}
console.log("\n0 issues");
