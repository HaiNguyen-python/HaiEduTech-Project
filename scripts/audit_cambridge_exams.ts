/**
 * @file audit_cambridge_exams.ts
 * @description Content audit for the Cambridge Test Prep mock papers.
 *              Checks counts per level, answer-key spread, duplicate questions,
 *              duplicate/blank options, index bounds, missing bilingual
 *              explanations, forbidden dashes and reading-group integrity.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { cambridgeMockExams } from "../src/data/cambridgeMockExamData";
import { isAnswerSupported, isNegativeQuestion, listeningScriptTurns, normaliseText } from "../src/data/cambridgeListeningSupport";


const issues: string[] = [];
const byLevel: Record<string, number[]> = {};
const keyCount = [0, 0, 0, 0];
const standalone: string[] = [];

/** Short item-level recordings: instruction plus the authored evidence. */
const LISTENING_MIN_WORDS: Record<string, number> = {
  starters: 6, movers: 8, flyers: 8, ket: 8, pet: 8,
};

for (const exam of cambridgeMockExams) {
  (byLevel[exam.level] ??= []).push(exam.questions.length);

  if (exam.totalQuestions !== exam.questions.length)
    issues.push(`${exam.id}: totalQuestions ${exam.totalQuestions} != ${exam.questions.length}`);

  const seen = new Map<string, number>();
  let readingWithoutPassage = 0;

  exam.questions.forEach((q, i) => {
    const at = `${exam.id} q${q.id ?? i + 1}`;
    if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)
      issues.push(`${at}: correctAnswer out of range`);
    else if (q.options.length === 4) keyCount[q.correctAnswer] += 1;

    if (q.options.length < 2) issues.push(`${at}: fewer than 2 options`);
    if (q.options.some((o) => !o || !o.trim())) issues.push(`${at}: blank option`);
    const opts = q.options.map((o) => o.trim().toLowerCase());
    if (new Set(opts).size !== opts.length) issues.push(`${at}: duplicate options`);

    const key = q.question.trim().toLowerCase();
    if (seen.has(key)) issues.push(`${at}: duplicate question (also q${seen.get(key)})`);
    else seen.set(key, q.id ?? i + 1);

    if (!q.explanation || q.explanation.trim().length < 30) issues.push(`${at}: thin explanation`);
    if (!q.explanationVi || q.explanationVi.trim().length < 15) issues.push(`${at}: missing explanationVi`);

    const text = [q.question, q.explanation, q.explanationVi, q.passage, ...q.options].join(" ");
    if (/[—–]/.test(text)) issues.push(`${at}: contains em/en dash`);

    if (q.section === "Reading & Writing" && !q.passage) readingWithoutPassage += 1;
    if (q.section === "Listening" && !q.passage) issues.push(`${at}: listening without script`);
    if (q.section === "Listening" && q.passage) {
      const spoken = q.passage.replace(/^\s*Listen:\s*/i, "").trim();
      const wc = spoken.split(/\s+/).filter(Boolean).length;
      const min = LISTENING_MIN_WORDS[exam.level] ?? 60;
      if (wc < min) issues.push(`${at}: listening script too short (${wc} words, min ${min})`);
      const turns = listeningScriptTurns(q.passage);
      if (turns.length < 2) issues.push(`${at}: listening script has no instruction/content separation`);
      if (turns.some(turn => /^(Narrator|Teacher|Student|Woman|Man|Girl|Boy|Presenter|Guest|Expert|Interviewer):/i.test(turn.text))) {
        issues.push(`${at}: a speaker label would be read aloud`);
      }

      // The key must be audible in the recording, in a form a listener can hear.
      const key = q.options[q.correctAnswer] ?? "";
      if (!isNegativeQuestion(q.question) && !isAnswerSupported(spoken, key)) {
        issues.push(`${at}: key "${key}" is not stated in the script`);
      }

      if (/Some people think|old leaflet|do not write that|website still|plan was dropped/i.test(spoken)) {
        issues.push(`${at}: contains generated distractor padding`);
      }
    }

  });


  // Standalone vocabulary/grammar items (official Reading & Writing Parts 1-3)
  // legitimately have no passage; report as information only.
  if (readingWithoutPassage > 0) standalone.push(`${exam.id}:${readingWithoutPassage}`);
}

console.log("Total exams:", cambridgeMockExams.length);
for (const [lv, counts] of Object.entries(byLevel)) {
  const uniq = [...new Set(counts)];
  console.log(`  ${lv}: ${counts.length} papers, question counts ${uniq.join("/")}`);
  if (uniq.length > 1) issues.push(`${lv}: unequal question counts ${uniq.join("/")}`);
}
const total = keyCount.reduce((a, b) => a + b, 0);
console.log(
  "Answer key spread:",
  keyCount.map((c, i) => `${"ABCD"[i]}=${((c / total) * 100).toFixed(1)}%`).join(" ")
);
console.log("Standalone R&W items per paper:", standalone.join(" "));
console.log("Issues:", issues.length);
issues.slice(0, 80).forEach((i) => console.log(" -", i));
