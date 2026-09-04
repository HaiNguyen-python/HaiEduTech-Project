/**
 * Audit for the IELTS Speaking "Structure & Vocabulary Practice" drills.
 * Checks every part/topic can build a fair round: no answer leaking into the
 * prompt, unique deduplicated options, and enough source material.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { getTopicsByPart, getQuestionsByPartAndTopic } from "../src/data/speakingPracticeData";
import { getMergedVocabulary } from "../src/data/speakingVocabularyBank";
import { getMergedStructures } from "../src/data/speakingStructuresIdeas";
import {
  buildSentenceCorpus, buildVocabRound, buildStructureRound,
} from "../src/lib/speaking/structureVocabDrills";

const issues: string[] = [];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ").trim();

let vocabDrills = 0;
let structureDrills = 0;

for (const part of [1, 2, 3] as const) {
  for (const topic of getTopicsByPart(part)) {
    const questions = getQuestionsByPartAndTopic(part, topic);
    const vocabMap = new Map<string, { phrase: string; vietnamese: string }>();
    const structureSet = new Set<string>();
    for (const q of questions) {
      for (const v of getMergedVocabulary(part, q.topic, q.useful_language.vocabulary_bank || [])) {
        if (v.vietnamese && !vocabMap.has(v.phrase.toLowerCase())) vocabMap.set(v.phrase.toLowerCase(), v);
      }
      for (const s of getMergedStructures(part, q.topic, q.useful_language.model_structures || [])) structureSet.add(s);
    }
    const items = [...vocabMap.values()];
    const structures = [...structureSet];
    const corpus = buildSentenceCorpus(questions.map((q) => q.model_answer));

    if (items.length < 4) issues.push(`Part ${part} / ${topic}: only ${items.length} vocabulary items`);
    if (structures.length < 4) issues.push(`Part ${part} / ${topic}: only ${structures.length} structures`);

    for (const seed of [1, 2, 3]) {
      for (const drill of buildVocabRound({ part, topic, items, corpus, seed })) {
        vocabDrills++;
        if (drill.options) {
          if (!drill.options.some((o) => norm(o) === norm(drill.answer)))
            issues.push(`${drill.id} (${topic}): answer missing from options`);
          if (new Set(drill.options.map(norm)).size !== drill.options.length)
            issues.push(`${drill.id} (${topic}): duplicate options`);
          if (drill.options.length < 3) issues.push(`${drill.id} (${topic}): fewer than 3 options`);
        }
        const prompt = norm(`${drill.prompt} ${drill.sentence || ""}`);
        if (drill.kind !== "sayIt" && drill.kind !== "meaningVi2En" && drill.kind !== "orderWords"
          && drill.kind !== "meaningEn2Vi" && prompt && prompt.includes(norm(drill.answer)))
          issues.push(`${drill.id} (${topic}): answer leaks into the prompt`);
        if (drill.kind === "gapFill" && !(drill.sentence || "").includes("______"))
          issues.push(`${drill.id} (${topic}): gap fill has no blank`);
        if (drill.kind === "orderWords" && (drill.tokens || []).length < 2)
          issues.push(`${drill.id} (${topic}): word order needs 2+ tokens`);
        if (/—/.test(drill.explanation)) issues.push(`${drill.id}: em dash found`);
      }
      for (const drill of buildStructureRound({ part, topic, structures, seed })) {
        structureDrills++;
        if (drill.options) {
          if (!drill.options.some((o) => norm(o) === norm(drill.answer)))
            issues.push(`${drill.id} (${topic}): answer missing from options`);
          if (new Set(drill.options.map(norm)).size !== drill.options.length)
            issues.push(`${drill.id} (${topic}): duplicate options`);
        }
        if (drill.kind === "completeFrame" && !drill.head)
          issues.push(`${drill.id} (${topic}): frame has no visible head`);
        if (drill.kind === "completeFrame" && norm(drill.head || "").includes(norm(drill.answer)))
          issues.push(`${drill.id} (${topic}): answer leaks into the frame head`);
        if (drill.kind === "rebuild" && (drill.tokens || []).length < 2)
          issues.push(`${drill.id} (${topic}): rebuild needs 2+ chunks`);
        if (drill.kind === "applyIt" && !(drill.requiredWords || []).length)
          issues.push(`${drill.id} (${topic}): applyIt has no required words`);
      }
    }
  }
}

console.log(`Vocabulary drills generated: ${vocabDrills}`);
console.log(`Structure drills generated: ${structureDrills}`);

if (issues.length) {
  console.log(`\n${issues.length} issues:`);
  issues.slice(0, 60).forEach((i) => console.log(" -", i));
  process.exit(1);
}
console.log("\n0 issues");
