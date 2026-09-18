import { businessTopicsPart1 } from "../src/data/businessEnglishLessons";
import { businessTopicsPart2 } from "../src/data/businessEnglishLessons2";
import { academicTopicsPart1 } from "../src/data/academicEnglishLessons";
import { academicTopicsPart2 } from "../src/data/academicEnglishLessons2";
import { professionalCommunicationLessons, academicCommunicationLessons } from "../src/data/conversationalCurriculum";

const coreLessons = [
  ...businessTopicsPart1.flatMap(t => t.lessons),
  ...businessTopicsPart2.flatMap(t => t.lessons),
  ...academicTopicsPart1.flatMap(t => t.lessons),
  ...academicTopicsPart2.flatMap(t => t.lessons)
];

const labLessons = [
  ...professionalCommunicationLessons,
  ...academicCommunicationLessons
];

console.log("--- Semantic Audit Report ---");

// 1. Generic Explanations & Grounding
coreLessons.forEach(l => {
  l.questions.forEach((q, i) => {
    if (q.explanation.length < 25 || q.explanationVi.length < 20) {
      console.log(`[GENERIC_EXP] ${l.id} Q${i+1}: "${q.explanation}"`);
    }
  });
});

// 2. Duplicate Vocab in Core
const allVocab = new Map<string, string[]>();
coreLessons.forEach(l => {
  l.vocab.forEach(v => {
    const term = v.term.toLowerCase().trim();
    if (!allVocab.has(term)) allVocab.set(term, []);
    allVocab.get(term)!.push(l.id);
  });
});

allVocab.forEach((ids, term) => {
  if (ids.length > 1) {
    console.log(`[DUPLICATE_VOCAB] "${term}" in: ${ids.join(", ")}`);
  }
});

// 3. Register Check (Academic)
const informalWords = ["get", "stuff", "lots of", "a lot of", "really", "very", "nice", "good", "bad"];
academicCore: for (const l of [...academicTopicsPart1.flatMap(t => t.lessons), ...academicTopicsPart2.flatMap(t => t.lessons)]) {
  for (const word of informalWords) {
    if (l.teaching.toLowerCase().includes(" " + word + " ")) {
      if (!l.teaching.toLowerCase().includes("avoid") && !l.teaching.toLowerCase().includes("instead of") && !l.teaching.toLowerCase().includes("replace")) {
         console.log(`[REGISTER_ACADEMIC] ${l.id}: Informal word "${word}"`);
      }
    }
  }
}

// 4. Duplicate Questions
const allQuestions = new Map<string, string[]>();
coreLessons.forEach(l => {
  l.questions.forEach(q => {
    const text = q.question.toLowerCase().trim();
    if (!allQuestions.has(text)) allQuestions.set(text, []);
    allQuestions.get(text)!.push(l.id);
  });
});
allQuestions.forEach((ids, text) => {
  if (ids.length > 1) {
    console.log(`[DUPLICATE_QUESTION] "${text}" in: ${ids.join(", ")}`);
  }
});

// 5. Visual mapping (Emoji check)
[...businessTopicsPart1, ...businessTopicsPart2, ...academicTopicsPart1, ...academicTopicsPart2].forEach(t => {
    if (!t.emoji) console.log(`[MISSING_EMOJI] Topic ${t.id}`);
});

