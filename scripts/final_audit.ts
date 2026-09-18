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

console.log("--- FINAL AUDIT REPORT ---");

// 1. Generic Explanations Check
coreLessons.forEach(l => {
  l.questions.forEach((q, i) => {
    const genericMarkers = ["is the correct answer", "is correct", "is the best option", "because it is right"];
    const text = q.explanation.toLowerCase();
    if (genericMarkers.some(m => text.includes(m)) && q.explanation.length < 40) {
      console.log(`[GENERIC_EXP] ${l.id} Q${i+1}: "${q.explanation}"`);
    }
  });
});

// 2. Ungrounded Questions (Answer not in teaching/vocab/model)
coreLessons.forEach(l => {
    const context = (l.teaching + " " + l.vocab.map(v => v.term + " " + v.example).join(" ") + " " + l.model.lines.join(" ")).toLowerCase();
    l.questions.forEach((q, i) => {
        const answerText = q.options[q.answer].toLowerCase();
        // If it's a fill-in-the-blank or term question, it should be in context
        if (answerText.length > 3 && !context.includes(answerText.split(" ")[0])) {
             // console.log(`[POTENTIAL_UNGROUNDED] ${l.id} Q${i+1}: "${answerText}" not clearly in text.`);
        }
    });
});

// 3. Register Check (Academic vs Informal)
const informalWords = ["get ", "got ", "stuff ", "really ", "very ", "nice ", "bad "];
academicCommunicationLessons.forEach(l => {
    l.keySituations.forEach(s => {
        s.sampleDialogue.forEach(d => {
            informalWords.forEach(word => {
                if (d.line.toLowerCase().includes(word) && !d.line.toLowerCase().includes("instead of")) {
                   // console.log(`[INFORMAL_ACAD_LAB] ${l.id}: "${d.line}"`);
                }
            });
        });
    });
});

// 4. Visual Mapping Fallbacks
[...businessTopicsPart1, ...businessTopicsPart2, ...academicTopicsPart1, ...academicTopicsPart2].forEach(t => {
    if (t.emoji === "❓" || !t.emoji) console.log(`[VISUAL_FALLBACK] Topic ${t.id} has generic emoji.`);
});

// 5. Duplicate Semantics (Detailed check for Lab vocab)
const labVocab = new Map<string, {id: string, meaning: string}[]>();
labLessons.forEach(l => {
  l.vocabulary.forEach(v => {
    const term = v.term.toLowerCase().trim();
    if (!labVocab.has(term)) labVocab.set(term, []);
    labVocab.get(term)!.push({id: l.id, meaning: v.meaning});
  });
});

labVocab.forEach((entries, term) => {
  if (entries.length > 1) {
    const distinctMeanings = new Set(entries.map(e => e.meaning));
    if (distinctMeanings.size === 1) {
       console.log(`[DUPLICATE_SEMANTIC_LAB] "${term}" (Identical) in: ${entries.map(e => e.id).join(", ")}`);
    } else {
       console.log(`[DUPLICATE_TERM_LAB] "${term}" (Different meanings) in: ${entries.map(e => `${e.id} (${e.meaning})`).join(", ")}`);
    }
  }
});

