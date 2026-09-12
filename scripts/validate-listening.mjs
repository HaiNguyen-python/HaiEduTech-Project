/**
 * Validates the actual IELTS Listening bank after the runtime difficulty upgrade.
 * Checks full-test structure, transcript length, answer coverage and key balance.
 * @copyright 2026 HaiEduTech
 */
import fs from "fs";
import os from "os";
import path from "path";
import ts from "typescript";

const DATA_DIR = path.resolve("src/data");
const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "listening-validate-"));
const FILE_RE = /^ielts(ListeningPractice(Expansion\d*)?|ListeningAllSets|FullListeningTests|ListeningDifficultyUpgrade|ListeningTranscripts)\.ts$/;

const compileFile = file => {
  const srcPath = path.join(DATA_DIR, file);
  const outPath = path.join(TMP_DIR, file.replace(/\.ts$/, ".mjs"));
  const source = fs.readFileSync(srcPath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
    },
  }).outputText.replace(/from "(\.\/[^"]+)"/g, 'from "$1.mjs"');
  fs.writeFileSync(outPath, output);
};

fs.readdirSync(DATA_DIR).filter(file => FILE_RE.test(file)).forEach(compileFile);

const { ALL_LISTENING_SETS } = await import(path.join(TMP_DIR, "ieltsListeningAllSets.mjs"));
const { IELTS_FULL_LISTENING_TESTS } = await import(path.join(TMP_DIR, "ieltsFullListeningTests.mjs"));

const targets = {
  1: { min: 450, max: 900 },
  2: { min: 650, max: 1100 },
  3: { min: 750, max: 1200 },
  4: { min: 750, max: 1200 },
};

const wordCount = text => (String(text).match(/[A-Za-zÀ-ỹ0-9']+/g) ?? []).length;
const answerWordCount = text => String(text).trim().split(/\s+/).filter(Boolean).length;
const normalise = text => String(text).toLowerCase().replace(/[.,!?;:"'()\[\]-]/g, " ").replace(/\s+/g, " ").trim();
const includesLoose = (transcript, answer) => {
  const plain = normalise(transcript);
  const cleaned = normalise(answer);
  if (!cleaned) return false;
  if (plain.includes(cleaned)) return true;
  const digitWords = {
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
  };
  const spokenDigits = String(answer).replace(/\d/g, d => ` ${digitWords[d]} `).replace(/\s+/g, " ").trim();
  if (spokenDigits && plain.includes(normalise(spokenDigits))) return true;

  // Recordings say things naturally: "a car park" is spoken as "car park",
  // "1:30 pm" as "one thirty", "£5" as "five pounds".
  const tens = { 0: "", 1: "ten", 2: "twenty", 3: "thirty", 4: "forty", 5: "fifty" };
  const teens = ["ten", "eleven", "twelve"];
  const noArticle = cleaned.replace(/^(a|an|the)\s+/, "");
  if (noArticle && plain.includes(noArticle)) return true;

  const time = String(answer).match(/^(\d{1,2}):(\d{2})/);
  if (time) {
    const hour = Number(time[1]);
    const minute = Number(time[2]);
    const hourWord = hour <= 12 && hour >= 10 ? teens[hour - 10] : digitWords[hour % 12 === 0 ? 12 : hour % 12] ?? "";
    const minuteWord = minute === 0 ? "o clock" : minute === 30 ? "thirty" : minute === 15 ? "fifteen"
      : minute % 10 === 0 ? tens[minute / 10] : `${tens[Math.floor(minute / 10)]} ${digitWords[minute % 10]}`;
    const spoken = normalise(`${hour === 12 ? "twelve" : hourWord || digitWords[hour] || hour} ${minuteWord}`);
    if (spoken && plain.includes(spoken)) return true;
    if (minute === 30 && plain.includes(normalise(`half past ${hourWord || digitWords[hour] || hour}`))) return true;
  }

  const money = String(answer).match(/^[£$€](\d+)$/);
  if (money) {
    const value = Number(money[1]);
    const word = value < 10 ? digitWords[value]
      : value >= 10 && value <= 12 ? teens[value - 10]
      : value % 10 === 0 && value <= 50 ? tens[value / 10]
      : String(value);
    if (plain.includes(normalise(`${word} pounds`))) return true;
    if (plain.includes(normalise(`${word} euros`)) || plain.includes(normalise(`${word} dollars`))) return true;
  }
  return false;
};

// Phrases that would tell the student which detail is the key.
const LEAK_PATTERNS = [
  /the (final|correct) answer/i,
  /the correct information to enter now/i,
  /Topic focus:/i,
  /for examination purposes/i,
  /that is the one you should remember/i,
  /listen (especially )?for contrast words/i,
  /rather than the earlier possibility/i,
  /those are old arrangements/i,
  /the detail that applies to today's visitors is/i,
  /record that as the final/i,
];

const issues = [];
const byId = new Map();
const sectionCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
const mcqKeys = { 0: 0, 1: 0, 2: 0, 3: 0 };
const matchingKeys = {};
const openingsBySection = { 1: new Map(), 2: new Map(), 3: new Map(), 4: new Map() };
let fillCount = 0;


for (const set of ALL_LISTENING_SETS) {
  if (byId.has(set.id)) issues.push(`${set.id}: duplicate set id`);
  byId.set(set.id, set);
  sectionCounts[set.section] = (sectionCounts[set.section] ?? 0) + 1;

  if (set.questions.length !== 10) issues.push(`${set.id}: expected 10 questions, got ${set.questions.length}`);

  const wc = wordCount(set.transcript);
  const target = targets[set.section];
  if (wc < target.min) issues.push(`${set.id}: transcript too short for Section ${set.section}: ${wc} words`);
  if (wc > target.max) issues.push(`${set.id}: transcript too long for Section ${set.section}: ${wc} words`);
  if (!/however|instead|although|rather than|not the|changed|final|first|second|definition|evidence|because|therefore|in that case/i.test(set.transcript)) {
    issues.push(`${set.id}: lacks IELTS-style signposting or contrast language`);
  }
  LEAK_PATTERNS.forEach(pattern => {
    if (pattern.test(set.transcript)) issues.push(`${set.id}: transcript leaks the key (${pattern})`);
  });

  const lines = set.transcript.split("\n").map(line => line.trim()).filter(Boolean);
  const seenLines = new Map();
  lines.forEach(line => seenLines.set(line, (seenLines.get(line) ?? 0) + 1));
  const repeated = [...seenLines.entries()].filter(([line, count]) => count > 1 && wordCount(line) > 8);
  if (repeated.length) issues.push(`${set.id}: repeats ${repeated.length} long line(s) verbatim`);
  // Section 4 is a single lecturer, so it naturally has fewer, longer turns.
  const minLines = set.section === 4 ? 6 : 12;
  if (lines.length < minLines) issues.push(`${set.id}: transcript has only ${lines.length} spoken lines`);
  const opening = lines[0].replace(/^[A-Za-z ]+:\s*/, "").slice(0, 40);
  openingsBySection[set.section].set(opening, (openingsBySection[set.section].get(opening) ?? 0) + 1);
  if (set.questions.some(question => question.type === "fill-in") && !/NO MORE THAN/i.test(set.context)) {
    issues.push(`${set.id}: fill-in set missing a word-limit instruction`);
  }


  const validMatchingLetters = new Set((set.matchingOptions ?? []).map(option => option.letter));
  set.questions.forEach((question, index) => {
    if (question.type === "fill-in") {
      fillCount += 1;
      const answerWords = answerWordCount(question.answer);
      if (!question.maxWords) issues.push(`${set.id} Q${index + 1}: fill-in missing maxWords`);
      if (question.maxWords && answerWords > question.maxWords) issues.push(`${set.id} Q${index + 1}: answer exceeds maxWords`);
      if (!includesLoose(set.transcript, question.answer)) issues.push(`${set.id} Q${index + 1}: fill answer "${question.answer}" not supported in transcript`);
    }
    if (question.type === "mcq") {
      if (question.answer < 0 || question.answer >= question.options.length) issues.push(`${set.id} Q${index + 1}: MCQ answer index out of range`);
      const unique = new Set(question.options.map(option => normalise(option)));
      if (unique.size !== question.options.length) issues.push(`${set.id} Q${index + 1}: duplicate MCQ options`);
      mcqKeys[question.answer] = (mcqKeys[question.answer] ?? 0) + 1;
      const correct = question.options[question.answer];
      if (!includesLoose(set.transcript, correct)) issues.push(`${set.id} Q${index + 1}: MCQ correct option "${correct}" not supported in transcript`);
    }
    if (question.type === "matching") {
      if (!validMatchingLetters.has(question.answer)) issues.push(`${set.id} Q${index + 1}: matching answer ${question.answer} not in matchingOptions`);
      matchingKeys[question.answer] = (matchingKeys[question.answer] ?? 0) + 1;
    }
  });
}

for (const section of [1, 2, 3, 4]) {
  if (sectionCounts[section] !== 30) issues.push(`Section ${section}: expected 30 sets, got ${sectionCounts[section]}`);
}

const usedSetIds = new Set();
for (const test of IELTS_FULL_LISTENING_TESTS) {
  if (test.setIds.length !== 4) issues.push(`${test.id}: expected 4 sections`);
  const sets = test.setIds.map(id => byId.get(id));
  if (sets.some(set => !set)) issues.push(`${test.id}: missing set id`);
  const total = sets.filter(Boolean).reduce((sum, set) => sum + set.questions.length, 0);
  if (total !== 40) issues.push(`${test.id}: expected 40 questions, got ${total}`);
  sets.forEach((set, index) => {
    if (set && set.section !== index + 1) issues.push(`${test.id}: position ${index + 1} uses Section ${set.section}`);
  });
  test.setIds.forEach(id => {
    if (usedSetIds.has(id)) issues.push(`${test.id}: reused set id ${id}`);
    usedSetIds.add(id);
  });
}

if (IELTS_FULL_LISTENING_TESTS.length !== 30) issues.push(`expected 30 full tests, got ${IELTS_FULL_LISTENING_TESTS.length}`);

const mcqValues = Object.values(mcqKeys);
const mcqTotal = mcqValues.reduce((sum, value) => sum + value, 0);
const expectedMcqShare = mcqTotal / mcqValues.length;
if (Math.max(...mcqValues) - Math.min(...mcqValues) > Math.ceil(expectedMcqShare * 0.35)) {
  issues.push(`MCQ key distribution too uneven: ${JSON.stringify(mcqKeys)}`);
}

const wordSummary = [1, 2, 3, 4].map(section => {
  const counts = ALL_LISTENING_SETS.filter(set => set.section === section).map(set => wordCount(set.transcript));
  counts.sort((a, b) => a - b);
  return `S${section} min=${counts[0]} median=${counts[Math.floor(counts.length / 2)]} max=${counts[counts.length - 1]}`;
});

console.log("sets:", ALL_LISTENING_SETS.length, "full tests:", IELTS_FULL_LISTENING_TESTS.length);
console.log("section counts:", sectionCounts);
console.log("word counts:", wordSummary.join(" | "));
console.log("fill-in questions:", fillCount, "mcq key distribution:", mcqKeys, "matching distribution:", matchingKeys);
if (issues.length) {
  console.error("issues:", issues.slice(0, 80));
  process.exit(1);
}
console.log("no issues");
