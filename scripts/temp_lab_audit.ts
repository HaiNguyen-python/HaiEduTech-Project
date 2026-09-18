import { professionalCommunicationLessons, academicCommunicationLessons } from "../src/data/conversationalCurriculum";

const labLessons = [
  ...professionalCommunicationLessons,
  ...academicCommunicationLessons
];

console.log("--- Lab Semantic Audit Report ---");

// 1. Duplicate Vocab in Lab
const allVocab = new Map<string, string[]>();
labLessons.forEach(l => {
  l.vocabulary.forEach(v => {
    const term = v.term.toLowerCase().trim();
    if (!allVocab.has(term)) allVocab.set(term, []);
    allVocab.get(term)!.push(l.id);
  });
});

allVocab.forEach((ids, term) => {
  if (ids.length > 1) {
    console.log(`[DUPLICATE_VOCAB_LAB] "${term}" in: ${ids.join(", ")}`);
  }
});

// 2. Generic Vocabulary Meanings
labLessons.forEach(l => {
  l.vocabulary.forEach(v => {
    if (v.meaning.length < 5 || v.meaningEn.length < 5) {
      console.log(`[GENERIC_MEANING] ${l.id} - ${v.term}: "${v.meaning}" / "${v.meaningEn}"`);
    }
  });
});

// 3. Grounding check for Lab listening questions
// (The existing audit already does some of this, but I'll check for "answer not in transcript")

// 4. Register consistency in Professional Lab
professionalCommunicationLessons.forEach(l => {
    if (l.title.toLowerCase().includes("professional") || l.title.toLowerCase().includes("business")) {
        // check for informal speech in sample dialogues that might be TOO informal
        l.keySituations.forEach(s => {
            s.sampleDialogue.forEach(d => {
                if (d.line.toLowerCase().includes("wanna") || d.line.toLowerCase().includes("gonna")) {
                     console.log(`[REGISTER_PRO_LAB] ${l.id} situation "${s.title}": Informal contraction "${d.line}"`);
                }
            });
        });
    }
});

