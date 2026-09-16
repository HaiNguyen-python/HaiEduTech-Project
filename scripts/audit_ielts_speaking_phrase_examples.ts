import { speakingPracticeData } from "../src/data/speakingPracticeData";
import { getMergedVocabulary } from "../src/data/speakingVocabularyBank";
import { getSupplementVocabulary } from "../src/data/speakingDrillsSupplement";
import { expandToCollocation } from "../src/data/speakingVocabularyBank";
import { getPhraseExample } from "../src/lib/ieltsSpeakingPhrasePractice";
import { phraseAppearsInTranscript } from "../src/lib/ieltsSpeakingPhrasePractice";

const errors: string[] = [];
let rendered = 0;
const examples = new Map<string, string[]>();

for (const part of [1, 2, 3] as const) {
  const questions = speakingPracticeData[`part${part}`];
  const topics = [...new Set(questions.map((question) => question.topic))];
  for (const topic of topics) {
    const topicQuestions = questions.filter((question) => question.topic === topic);
    const phrases = new Map<string, { phrase: string; vietnamese: string }>();
    for (const question of topicQuestions) {
      for (const item of getMergedVocabulary(part, question.topic, question.useful_language.vocabulary_bank || [])) {
        phrases.set(item.phrase.toLowerCase(), item);
      }
    }
    for (const rawItem of getSupplementVocabulary(part)) {
      const item = expandToCollocation(rawItem);
      phrases.set(item.phrase.toLowerCase(), item);
    }
    for (const item of phrases.values()) {
      rendered += 1;
      const example = getPhraseExample(item.phrase, topic, part);
      const lexicalWords = item.phrase.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) ?? [];
      if (lexicalWords.length < 2) errors.push(`Single-word vocabulary: Part ${part} / ${topic} / ${item.phrase}`);
      if (!example || example.length < 25 || !/[.!?]$/.test(example)) errors.push(`Invalid example: Part ${part} / ${topic} / ${item.phrase}`);
      if (/\.{2,}|\bone's\b/i.test(example)) errors.push(`Unresolved placeholder: ${item.phrase} -> ${example}`);
      if (!phraseAppearsInTranscript(item.phrase, example)) errors.push(`Phrase not represented in example: ${item.phrase} -> ${example}`);
      if (/\btry to be over the moon\b|\btry to take me by surprise\b|\bis an important part of my experience with\b/i.test(example)) errors.push(`Unnatural template: ${item.phrase} -> ${example}`);
      if (/whenever? it is appropriate|people often discuss|has had a positive influence on my daily life/i.test(example)) errors.push(`Generic template: ${item.phrase} -> ${example}`);
      const list = examples.get(example.toLowerCase()) ?? [];
      list.push(`${part}|${topic}|${item.phrase}`);
      examples.set(example.toLowerCase(), list);
    }
  }
}

const duplicateGroups = [...examples.values()].filter((items) => items.length > 1);
console.log(`Audited ${rendered} rendered phrase cards across all IELTS Speaking topics.`);
console.log(`Unique examples: ${examples.size}; repeated template groups: ${duplicateGroups.length}.`);
if (errors.length) {
  console.error(errors.slice(0, 30).join("\n"));
  process.exit(1);
}
if (duplicateGroups.length > 60) {
  console.error(`Too many repeated example groups: ${duplicateGroups.length}`);
  process.exit(1);
}
console.log("All phrase cards have complete English examples with resolved placeholders.");
