/**
 * @file cambridgeGrammarOptimizer.ts
 * @description Grammar-focused optimizer for Cambridge lectures (Starters -> PET).
 *              Grammar lessons were diluted by the generic level packs (a "used to"
 *              lesson ended up drilling much/many, linkers and vocabulary). This
 *              module keeps every grammar drill ON TOPIC and tops the lesson up with
 *              deterministic, self-consistent drills generated from the lesson's own
 *              illustrated rules and watch-outs:
 *                - "Spot the correct sentence" (rule example vs. corrupted versions)
 *                - "Fix the mistake" (mistake -> matching tip)
 *                - "Match the rule" quiz items
 *              Non-mutating and deterministic (no randomness), English comments only.
 * @copyright 2026 HaiEduTech, ILC.
 */
import type {
  CambridgeLecture,
  CambridgePracticeItem,
  CambridgeQuizQuestion,
} from "./cambridgeLecturesData";

const MIN_PRACTICE = 12;
const MIN_QUIZ = 12;

const hash = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

const norm = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

/** Rotate options so correct answers spread across A-D instead of clustering. */
const balance = <T extends { question: string; options: string[]; answer: number }>(
  item: T,
  seed: string
): T => {
  const n = item.options.length;
  if (n < 2 || item.answer < 0 || item.answer >= n) return item;
  const target = hash(seed + item.question) % n;
  if (target === item.answer) return item;
  const options = [...item.options];
  [options[item.answer], options[target]] = [options[target], options[item.answer]];
  return { ...item, options, answer: target };
};

/* ------------------------------------------------------------------ */
/* Topic relevance                                                     */
/* ------------------------------------------------------------------ */

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "your", "you",
  "master", "conquer", "learn", "use", "using", "how", "what", "when", "why", "part",
  "lesson", "grammar", "english", "cambridge", "starters", "movers", "flyers", "ket",
  "pet", "exam", "test", "practice", "sentence", "sentences", "words", "word", "form",
  "forms", "rule", "rules", "correct", "best", "answer", "choose", "pick",
]);

/** Keywords that define what this grammar lesson is actually about. */
const topicKeywords = (lecture: CambridgeLecture): string[] => {
  const fromId = lecture.id.replace(/^cam-grammar-[a-z]+-/, "").split("-");
  const fromTitle = norm(lecture.title).split(/[^a-z']+/);
  const fromObjective = norm(lecture.learningObjective || "").split(/[^a-z']+/);
  return Array.from(
    new Set(
      [...fromId, ...fromTitle, ...fromObjective]
        .map((w) => w.trim())
        .filter((w) => w.length > 2 && !STOP.has(w))
    )
  );
};

/** An item is on topic when it mentions a topic keyword or a rule keyword. */
const isOnTopic = (text: string, keywords: string[]) => {
  const t = norm(text);
  return keywords.some((k) => t.includes(k));
};

/* ------------------------------------------------------------------ */
/* Drill generators (deterministic, derived from the lesson itself)     */
/* ------------------------------------------------------------------ */

const splitTail = (sentence: string) => {
  const m = sentence.match(/^(.*?)([.!?]*)$/s);
  return { body: (m?.[1] ?? sentence).trim(), tail: m?.[2] ?? "" };
};

/** Wrong word order: swap the first two words. */
const corruptOrder = (sentence: string) => {
  const { body, tail } = splitTail(sentence);
  const words = body.split(" ");
  if (words.length < 3) return "";
  const swapped = [words[1], words[0].toLowerCase(), ...words.slice(2)];
  swapped[0] = swapped[0].charAt(0).toUpperCase() + swapped[0].slice(1);
  const out = swapped.join(" ") + tail;
  return norm(out) === norm(sentence) ? "" : out;
};

/** Agreement / ending error: drop a final -s from the first word that has one. */
const corruptEnding = (sentence: string) => {
  const { body, tail } = splitTail(sentence);
  const words = body.split(" ");
  const idx = words.findIndex((w) => /[a-z]{3,}s$/.test(w) && !/ss$/.test(w));
  if (idx === -1) return "";
  const copy = [...words];
  copy[idx] = copy[idx].replace(/s$/, "");
  const out = copy.join(" ") + tail;
  return norm(out) === norm(sentence) ? "" : out;
};

/** Missing structure word: delete the second word of the sentence. */
const corruptMissing = (sentence: string) => {
  const { body, tail } = splitTail(sentence);
  const words = body.split(" ");
  if (words.length < 4) return "";
  const out = [words[0], ...words.slice(2)].join(" ") + tail;
  return norm(out) === norm(sentence) ? "" : out;
};

const buildRuleDrills = (lecture: CambridgeLecture): CambridgePracticeItem[] =>
  (lecture.illustratedRules ?? [])
    .map((rule) => {
      const example = (rule.example || "").trim();
      if (example.length < 12) return null;
      const wrong = [corruptOrder(example), corruptEnding(example), corruptMissing(example)]
        .filter(Boolean)
        .filter((w, i, arr) => arr.indexOf(w) === i && norm(w) !== norm(example))
        .slice(0, 3);
      if (wrong.length < 3) return null;
      return {
        instruction: "Spot the correct sentence.",
        instructionVi: "Chọn câu đúng.",
        question: `${rule.icon} Rule: ${rule.rule} Which sentence follows it?`,
        options: [example, ...wrong],
        answer: 0,
        explanation: `"${example}" keeps the pattern. The others break word order, an ending or a missing word.`,
        explanationVi: `"${example}" đúng mẫu. Các câu khác sai trật tự từ, sai đuôi hoặc thiếu từ.`,
      } as CambridgePracticeItem;
    })
    .filter(Boolean) as CambridgePracticeItem[];

const buildMistakeDrills = (lecture: CambridgeLecture): CambridgePracticeItem[] => {
  const list = (lecture.watchOut ?? []).filter((w) => w.mistake && w.tip);
  if (list.length < 4) return [];
  return list.map((w, i) => {
    const others = list.filter((_, j) => j !== i).map((o) => o.tip);
    return {
      instruction: "Fix the mistake: choose the rule that repairs it.",
      instructionVi: "Sửa lỗi: chọn quy tắc giúp sửa câu này.",
      question: `Mistake: ${w.mistake}`,
      options: [w.tip, others[0], others[1], others[2]].filter(Boolean),
      answer: 0,
      explanation: w.tip,
      explanationVi: w.tipVi,
    } as CambridgePracticeItem;
  });
};

const buildRuleQuiz = (lecture: CambridgeLecture): CambridgeQuizQuestion[] => {
  const rules = (lecture.illustratedRules ?? []).filter((r) => (r.example || "").length > 10);
  if (rules.length < 4) return [];
  return rules.map((rule, i) => {
    const others = rules.filter((_, j) => j !== i).map((r) => r.example);
    return {
      question: `Which example shows this rule: "${rule.rule}"`,
      options: [rule.example, others[0], others[1], others[2]].filter(Boolean),
      answer: 0,
      explanation: `${rule.rule} -> "${rule.example}"`,
    } as CambridgeQuizQuestion;
  });
};

/* ------------------------------------------------------------------ */
/* Optimizer                                                           */
/* ------------------------------------------------------------------ */

const dedupe = <T extends { question: string }>(items: T[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = norm(item.question);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/**
 * Keep grammar lectures focused: on-topic drills first, generated rule/mistake
 * drills next, and generic material only as a last resort to reach the minimum.
 */
export function optimizeCambridgeGrammarLecture(lecture: CambridgeLecture): CambridgeLecture {
  if (lecture.skill !== "grammar") return lecture;

  const keywords = topicKeywords(lecture);
  const ruleText = (lecture.illustratedRules ?? []).map((r) => `${r.rule} ${r.example}`).join(" ");

  const relevant = (text: string) => isOnTopic(text, keywords) || isOnTopic(ruleText, [norm(text)]);

  const practiceAll = dedupe(lecture.practiceSet ?? []);
  const onTopicPractice = practiceAll.filter((p) =>
    relevant(`${p.instruction} ${p.question} ${p.explanation}`)
  );
  const offTopicPractice = practiceAll.filter((p) => !onTopicPractice.includes(p));

  const quizAll = dedupe(lecture.quiz ?? []);
  const onTopicQuiz = quizAll.filter((q) => relevant(`${q.question} ${q.explanation}`));
  const offTopicQuiz = quizAll.filter((q) => !onTopicQuiz.includes(q));

  let practiceSet = dedupe([
    ...onTopicPractice,
    ...buildRuleDrills(lecture),
    ...buildMistakeDrills(lecture),
  ]);
  if (practiceSet.length < MIN_PRACTICE) {
    practiceSet = dedupe([...practiceSet, ...offTopicPractice]).slice(0, Math.max(MIN_PRACTICE, practiceSet.length));
  }

  let quiz = dedupe([...onTopicQuiz, ...buildRuleQuiz(lecture)]);
  if (quiz.length < MIN_QUIZ) {
    quiz = dedupe([...quiz, ...offTopicQuiz]).slice(0, Math.max(MIN_QUIZ, quiz.length));
  }

  return {
    ...lecture,
    practiceSet: practiceSet.map((p, i) => balance(p, `${lecture.id}-gp-${i}`)),
    quiz: quiz.map((q, i) => balance(q, `${lecture.id}-gq-${i}`)),
  };
}
