/**
 * @file cambridgeExamples.ts
 * @description Builds detailed worked examples for every Cambridge lecture from
 * the lecture's own data (rules, vocabulary, practice set). Each example shows a
 * model sentence, extra sentences in context, a short examiner-style dialogue and
 * a "your turn" prompt, so lectures are never theory-only.
 */
import type { CambridgeLecture, CambridgeSkill, CambridgeLevel } from "@/data/cambridgeLecturesData";

export interface WorkedExampleLine {
  speaker: string;
  text: string;
}

export interface WorkedExample {
  icon: string;
  focus: string;
  focusVi: string;
  model: string;
  extras: string[];
  dialogue: WorkedExampleLine[];
  yourTurn: string;
  yourTurnVi: string;
}

export interface ExamWalkthrough {
  instruction: string;
  instructionVi: string;
  question: string;
  options: string[];
  answer: number;
  steps: { label: string; labelVi: string; detail: string; detailVi: string }[];
}

/** Deterministic small hash so the same lecture always gets the same variant. */
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
  return h;
};

const SKILL_DIALOGUES: Record<CambridgeSkill, ((w: string, topic: string) => WorkedExampleLine[])[]> = {
  listening: [
    (w, topic) => [
      { speaker: "Audio", text: `Woman: Let's talk about ${topic} at four o'clock.` },
      { speaker: "Audio", text: `Man: Four is difficult - can we say half past four?` },
      { speaker: "Answer", text: `4:30 - the LAST time you hear is the agreed one (keyword: "${w}").` },
    ],
    (w, topic) => [
      { speaker: "Audio", text: `Boy: Is the "${w}" in the bag?` },
      { speaker: "Audio", text: `Girl: No, it was, but now it's on the table.` },
      { speaker: "Answer", text: `on the table - "but now" cancels the first place.` },
    ],
  ],
  "reading-writing": [
    (w, topic) => [
      { speaker: "Text", text: `In today's lesson about ${topic}, remember one key word: "${w}". You must use it correctly in your answer.` },
      { speaker: "Question", text: `What must you do with the key word?` },
      { speaker: "Answer", text: `Use it correctly - the text says "must use", so it is a requirement.` },
    ],
    (w, topic) => [
      { speaker: "Text", text: `I like ${topic} because the word "${w}" is easy to remember.` },
      { speaker: "Question", text: `Why does the writer like it?` },
      { speaker: "Answer", text: `Because "${w}" is easy to remember - look for the word "because".` },
    ],
  ],
  speaking: [
    (w, topic) => [
      { speaker: "Examiner", text: `Tell me about ${topic}.` },
      { speaker: "Student", text: `When I talk about ${topic}, I always think of "${w}". I use that word every day because it is very useful.` },
      { speaker: "Tip", text: `Answer + reason = a full mark answer. Never stop after three words.` },
    ],
    (w, topic) => [
      { speaker: "Examiner", text: `Do you like ${topic}? Why?` },
      { speaker: "Student", text: `Yes, I do. I like "${w}" the most, because it makes me feel happy.` },
      { speaker: "Tip", text: `Yes/No + detail + feeling. Three parts, one breath.` },
    ],
  ],
  vocabulary: [
    (w, topic) => [
      { speaker: "Word", text: `${w}` },
      { speaker: "In a sentence", text: `My favourite word about ${topic} is "${w}", and I use it when I talk about my day.` },
      { speaker: "Tip", text: `Learn the word inside a sentence, never alone.` },
    ],
    (w, topic) => [
      { speaker: "Word", text: `${w}` },
      { speaker: "Mini quiz", text: `Which is correct: "a ${w}" or "an ${w}"? Say the answer out loud.` },
      { speaker: "Tip", text: `Use "an" before a vowel sound (a, e, i, o, u).` },
    ],
  ],
  grammar: [
    (w, topic) => [
      { speaker: "Pattern", text: `subject + verb + object (example word: "${w}")` },
      { speaker: "Correct", text: `She has got a new "${w}" in her notebook.` },
      { speaker: "Wrong", text: `She have got a new "${w}". → "she" always takes "has".` },
    ],
    (w, topic) => [
      { speaker: "Pattern", text: `question word + auxiliary + subject + verb` },
      { speaker: "Correct", text: `Where did you learn the word "${w}"?` },
      { speaker: "Wrong", text: `Where you learned the word "${w}"? → keep "did" and the base verb.` },
    ],
  ],
};

const YOUR_TURN: Record<CambridgeLevel, { en: string; vi: string }[]> = {
  starters: [
    { en: "Say the sentence out loud 3 times, then change one word.", vi: "Đọc to câu này 3 lần, rồi thay đổi một từ." },
    { en: "Draw the sentence in your notebook and label it in English.", vi: "Vẽ lại câu này vào vở và ghi nhãn bằng tiếng Anh." },
  ],
  movers: [
    { en: "Write your own sentence with the same pattern, then read it aloud.", vi: "Viết câu của riêng em theo cùng mẫu, rồi đọc to lên." },
    { en: "Make the sentence negative, then make it a question.", vi: "Chuyển câu này sang phủ định, rồi sang câu hỏi." },
  ],
  flyers: [
    { en: "Extend the sentence with 'because' to add a reason.", vi: "Mở rộng câu bằng 'because' để thêm lý do." },
    { en: "Retell the example in the past tense.", vi: "Kể lại ví dụ này bằng thì quá khứ." },
  ],
  ket: [
    { en: "Write two sentences of your own using this structure, 8-12 words each.", vi: "Viết hai câu của riêng em theo cấu trúc này, mỗi câu 8-12 từ." },
    { en: "Paraphrase the model sentence without changing the meaning.", vi: "Diễn đạt lại câu mẫu mà không làm thay đổi nghĩa." },
  ],
  pet: [
    { en: "Upgrade the model sentence with a linking word (however, although, therefore).", vi: "Nâng cấp câu mẫu bằng một từ nối (however, although, therefore)." },
    { en: "Say a 30-second answer that includes this structure twice.", vi: "Nói một câu trả lời 30 giây có dùng cấu trúc này hai lần." },
  ],
};

/** Turn a short rule example into 2 richer context sentences. */
function buildExtras(lecture: CambridgeLecture, ruleIndex: number): string[] {
  const vocab = lecture.vocabulary ?? [];
  const out: string[] = [];
  for (let i = 0; i < vocab.length && out.length < 2; i++) {
    const v = vocab[(ruleIndex * 2 + i) % vocab.length];
    if (v?.example && !out.includes(v.example)) out.push(`${v.example}  (${v.word} = ${v.meaning})`);
  }
  return out;
}

export function buildWorkedExamples(lecture: CambridgeLecture): WorkedExample[] {
  const rules = (lecture.illustratedRules ?? []).slice(0, 4);
  const vocab = lecture.vocabulary ?? [];
  // Clean topic label: drop emoji, keep only the first idea before & / : / -
  const topic = lecture.title
    .replace(/^[^A-Za-z]+/, "")
    .split(/\s*[&:\-–]\s*/)[0]
    .trim()
    .toLowerCase() || "this topic";
  const dialogues = SKILL_DIALOGUES[lecture.skill] ?? SKILL_DIALOGUES.vocabulary;
  const turns = YOUR_TURN[lecture.level];

  return rules.map((rule, i) => {
    const word = vocab[i % Math.max(1, vocab.length)]?.word ?? "word";
    const dialogue = dialogues[(hash(lecture.id) + i) % dialogues.length](word, topic);
    const turn = turns[(hash(lecture.id) + i) % turns.length];
    return {
      icon: rule.icon,
      focus: rule.rule,
      focusVi: rule.ruleVi,
      model: rule.example,
      extras: buildExtras(lecture, i),
      dialogue,
      yourTurn: turn.en,
      yourTurnVi: turn.vi,
    };
  });
}

/** Step-by-step walkthrough of one real practice question from the lecture. */
export function buildWalkthrough(lecture: CambridgeLecture): ExamWalkthrough | null {
  const item = (lecture.practiceSet ?? [])[0];
  if (!item) return null;
  const correct = item.options[item.answer];
  const wrong = item.options.find((_, i) => i !== item.answer) ?? "";
  return {
    instruction: item.instruction,
    instructionVi: item.instructionVi,
    question: item.question,
    options: item.options,
    answer: item.answer,
    steps: [
      {
        label: "1. Read the instruction",
        labelVi: "1. Đọc kỹ yêu cầu",
        detail: item.instruction,
        detailVi: item.instructionVi,
      },
      {
        label: "2. Underline the key words",
        labelVi: "2. Gạch chân từ khóa",
        detail: `Key words in the question: "${item.question.split(" ").slice(0, 6).join(" ")}..." - these decide the answer.`,
        detailVi: `Từ khóa trong câu hỏi: "${item.question.split(" ").slice(0, 6).join(" ")}..." - chính chúng quyết định đáp án.`,
      },
      {
        label: "3. Eliminate a trap",
        labelVi: "3. Loại đáp án bẫy",
        detail: `"${wrong}" looks possible but does not match the key words, so cross it out.`,
        detailVi: `"${wrong}" nghe có vẻ đúng nhưng không khớp từ khóa, hãy gạch bỏ nó.`,
      },
      {
        label: "4. Confirm the answer",
        labelVi: "4. Xác nhận đáp án",
        detail: `${String.fromCharCode(65 + item.answer)}. ${correct} - ${item.explanation}`,
        detailVi: `${String.fromCharCode(65 + item.answer)}. ${correct} - ${item.explanationVi}`,
      },
    ],
  };
}
