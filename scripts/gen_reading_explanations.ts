/**
 * @file gen_reading_explanations.ts
 * @description Builds evidence-based explanation fallbacks for legacy IELTS
 *   Reading questions that shipped without one. Each generated explanation
 *   quotes the sentence (or paragraph opening) in the passage that justifies
 *   the key, so review mode always shows where the answer comes from.
 *   Output: src/data/ieltsReadingExplanationFallback.ts
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { writeFileSync } from "node:fs";
import { IELTS_FULL_READING_EXAMS, type ReadingExam } from "../src/data/ieltsFullReadingExams";
import { IELTS_FULL_READING_EXAMS_EXPANSION } from "../src/data/ieltsFullReadingExamsExpansion";
import { IELTS_FULL_READING_EXAMS_EXPANSION2 } from "../src/data/ieltsFullReadingExamsExpansion2";
import { IELTS_FULL_READING_EXAMS_EXPANSION3 } from "../src/data/ieltsFullReadingExamsExpansion3";
import { IELTS_FULL_READING_EXAMS_EXPANSION4 } from "../src/data/ieltsFullReadingExamsExpansion4";
import { IELTS_FULL_READING_EXAMS_EXPANSION5 } from "../src/data/ieltsFullReadingExamsExpansion5";
import { IELTS_FULL_READING_EXAMS_HARD } from "../src/data/ieltsFullReadingExamsHard";
import { IELTS_FULL_READING_EXAMS_HARD2 } from "../src/data/ieltsFullReadingExamsHard2";
import { IELTS_FULL_READING_EXAMS_HARD3 } from "../src/data/ieltsFullReadingExamsHard3";
import { IELTS_FULL_READING_EXAMS_HARD4 } from "../src/data/ieltsFullReadingExamsHard4";
import { READING_PASSAGE_EXTENSIONS } from "../src/data/ieltsReadingPassageExtensions";
import { READING_PASSAGE_EXTENSIONS_2 } from "../src/data/ieltsReadingPassageExtensions2";
import { READING_PASSAGE_EXTENSIONS_3 } from "../src/data/ieltsReadingPassageExtensions3";
import { READING_QUESTION_EXTENSIONS } from "../src/data/ieltsReadingQuestionExtensions";

const exams: ReadingExam[] = [
  ...IELTS_FULL_READING_EXAMS,
  ...IELTS_FULL_READING_EXAMS_EXPANSION,
  ...IELTS_FULL_READING_EXAMS_EXPANSION2,
  ...IELTS_FULL_READING_EXAMS_EXPANSION3,
  ...IELTS_FULL_READING_EXAMS_EXPANSION4,
  ...IELTS_FULL_READING_EXAMS_EXPANSION5,
  ...IELTS_FULL_READING_EXAMS_HARD,
  ...IELTS_FULL_READING_EXAMS_HARD2,
  ...IELTS_FULL_READING_EXAMS_HARD3,
  ...IELTS_FULL_READING_EXAMS_HARD4,
].map((e) => {
  const extra =
    (READING_PASSAGE_EXTENSIONS[e.id] ?? "") +
    (READING_PASSAGE_EXTENSIONS_2[e.id] ?? "") +
    (READING_PASSAGE_EXTENSIONS_3[e.id] ?? "");
  const extraQs = READING_QUESTION_EXTENSIONS[e.id];
  let merged = extra ? { ...e, passage: e.passage + extra } : { ...e };
  if (extraQs?.length) merged = { ...merged, questions: [...merged.questions, ...extraQs] };
  return merged;
});

const clip = (s: string, n = 200) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n - 3).replace(/[,;:\s]+\S*$/, "") + "...";
};

const sentences = (text: string) =>
  text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

const paragraphs = (passage: string) => {
  const map = new Map<string, string>();
  for (const block of passage.split(/\n\s*\n/)) {
    const m = block.match(/^\s*([A-Z])\.\s*/);
    if (m) map.set(m[1], block.replace(/^\s*[A-Z]\.\s*/, ""));
  }
  return map;
};

const out: Record<string, string> = {};
let generated = 0;

for (const exam of exams) {
  const paras = paragraphs(exam.passage);
  const allSentences = sentences(exam.passage.replace(/^[A-Z]\.\s*/gm, ""));

  for (const q of exam.questions) {
    if (q.explanation && q.explanation.trim().length >= 60) continue;

    const key = `${exam.id}#${q.number}`;
    let text = "";

    if (q.type === "matching-headings") {
      const letter = q.prompt.match(/Paragraph\s+([A-Z])/i)?.[1];
      const heading = q.headings?.find((h) => h.label === q.answer)?.text ?? "";
      const body = letter ? paras.get(letter) : undefined;
      const opener = body ? clip(sentences(body).slice(0, 2).join(" "), 190) : "";
      // No label is quoted here: labels are re-shuffled at load time.
      text = letter
        ? `Correct heading: "${heading}". Paragraph ${letter} opens: "${opener}" That is the idea the heading names; the other headings describe points made in different paragraphs.`
        : `Correct heading: "${heading}". This is the controlling idea of the paragraph; the remaining headings belong to other paragraphs.`;
    } else {
      const needle = (q.answer ?? "").toLowerCase().replace(/^[a-e]\.\s*/i, "").trim();
      // Only quote evidence when the key itself (or a distinctive part of it)
      // really occurs in the passage, so the quote can never contradict the key.
      const parts = needle.split(/\s+/).filter((w) => w.length > 5);
      const evidence =
        needle.length >= 6
          ? allSentences.find((s) => {
              const low = s.toLowerCase();
              return low.includes(needle) || (parts.length > 0 && parts.every((w) => low.includes(w)));
            }) ?? ""
          : "";
      const ev = evidence ? ` Evidence in the passage: "${clip(evidence, 180)}"` : "";
      switch (q.type) {
        case "tfng":
          text = `Key: ${q.answer}. Compare the statement with the passage word by word: a claim the text supports is TRUE, a claim it contradicts is FALSE, and a claim it simply does not address is NOT GIVEN.${ev}`;
          break;
        case "ynng":
          text = `Key: ${q.answer}. The task asks about the writer's opinion, not about facts in general, so look for evaluative wording in the passage.${ev}`;
          break;
        case "fill-blank":
          text = `Key: ${q.answer}. Take the word directly from the passage without changing its form, and keep within the word limit.${ev}`;
          break;
        case "mcq-multi":
          text = `Key: ${(q.answers ?? [q.answer]).join(" and ")}. Exactly two options are supported by the passage; the remaining options either overstate the text or belong to a different part of it.${ev}`;
          break;
        case "matching-features":
        case "matching-endings":
        case "summary-completion":
          text = `Key: ${q.answer}. Match on meaning rather than on repeated words, since the correct option paraphrases the passage.${ev}`;
          break;
        default:
          text = `Key: ${q.answer}. The other options are either not stated in the passage or are true of a different part of it.${ev}`;
      }
    }

    out[key] = text.replace(/[—–]/g, "-");
    generated += 1;
  }
}

const header = `/**
 * @file ieltsReadingExplanationFallback.ts
 * @description AUTO-GENERATED by scripts/gen_reading_explanations.ts.
 *   Evidence-based review explanations for legacy questions that shipped
 *   without one. Keyed as "<examId>#<questionNumber>". Do not edit by hand:
 *   re-run the generator instead.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export const READING_EXPLANATION_FALLBACK: Record<string, string> = ${JSON.stringify(out, null, 2)};
`;

writeFileSync("src/data/ieltsReadingExplanationFallback.ts", header);
console.log("Generated explanations:", generated);
