/**
 * @file cambridgeQuestionClarity.ts
 * @description Clarity pass over the Cambridge Test Prep mock papers.
 *              Two problems are fixed here:
 *                1. Fragment stems ("Contrast linker:", "When?", "Transport to
 *                   Sapa?") that are not real questions, so a child cannot tell
 *                   what is being asked. They become full, clear questions.
 *                2. Illogical items where the stem and the options belong to
 *                   different question types (a "What time" stem answered by a
 *                   person) or where an option is a non-answer such as
 *                   "we don't know". These are rewritten as complete items.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

interface Fix {
  question?: string;
  options?: string[];
  /** Text of the correct option after the rewrite. */
  correct?: string;
  explanation?: string;
  explanationVi?: string;
}

/** Fragment stems rewritten as complete questions (keyed by original stem). */
const STEM_FIXES: Record<string, string> = {
  "Soft bear toy:": "Which toy is a soft bear?",
  "How many balls?": "How many balls does the child have?",
  "What's flying away?": "What is flying away in the strong wind?",
  "Is it raining?": "Is it raining today?",
  "How many colors?": "How many colours are there in the rainbow?",
  "How many cars?": "How many cars are there in the train set?",
  "Where is mum?": "Where is mum in the house?",
  "A subject we count with:": "Which school subject do we use to count numbers?",
  "Frequency adverb position:": "Which sentence puts the frequency adverb in the correct place?",
  "Favourite subject?": "What is the speaker's favourite school subject?",
  "When is Art?": "When is the Art class?",
  "How many lessons?": "How many lessons does the school have every day?",
  "Capital of Vietnam:": "What is the capital city of Vietnam?",
  "Comparative of 'big':": "What is the comparative form of the adjective 'big'?",
  "Many trees together =": "What do we call many trees growing together?",
  "Recycle means…": "What does the word 'recycle' mean?",
  "What is longer?": "What is longer than the lake near the speaker's house?",
  "Which country?": "Which country did the speaker visit last summer?",
  "Highest mountain?": "What is the highest mountain in Vietnam?",
  "Transport to Sapa?": "How did they travel from Hanoi to Sapa?",
  "'Staff only' means…": "What does the sign 'Staff only' mean?",
  "'Would you like to come?' is…": "What kind of sentence is 'Would you like to come?'",
  "Synonym of 'job':": "Which word means the same as 'job'?",
  "Free time activity:": "Which one of these is a free time activity?",
  "Who will help?": "Who offered to help the speaker with the report?",
  "Reference 'this' usually points…": "In a text, the reference word 'this' usually points which way?",
  "Contrast linker:": "Which linking word is used to show contrast?",
  "Story background tense:": "Which tense describes background action in a story?",
  "Story shock word:": "Which word introduces a sudden event in a story?",
  "Future plan:": "Which sentence expresses a future plan?",
  "'In ten years' time' refers to…": "What time does the phrase 'in ten years' time' refer to?",
  "Synonym of 'goal':": "Which word means the same as 'goal'?",
  "Cohesion means…": "What does 'cohesion' mean in writing?",
  "When?": "By when will most students use tablets in class?",
  "Where is grandma?": "Where is grandma now?",
  "Who is Tom?": "Who is Tom in the girl's family?",
  "A place that sells bread:": "Which place sells bread?",
  "Choose the vegetable:": "Which one of these foods is a vegetable?",
  "Choose the healthy habit:": "Which one of these is a healthy habit?",
  "A ticket for going and coming back:": "What do we call a ticket for going somewhere and coming back?",
  "Count: 🍎🍎🍎🍎": "Count the apples: 🍎🍎🍎🍎 How many apples are there?",
  "A place with many trees:": "Which place has many trees?",
  "A machine that prints paper copies:": "Which machine prints paper copies?",
  "A place to stay that is cheaper than a hotel:":
    "Which kind of place to stay is usually cheaper than a hotel?",
  "Closest meaning: 'The deadline was extended.'":
    "What is the closest meaning of 'The deadline was extended'?",
  "Which is furniture?": "Which one of these things is a piece of furniture?",
  "Where is Dad?": "Where is Dad now?",
  "What hurts?": "What hurts the child today?",
  "Which is clothing?": "Which one of these things is a piece of clothing?",
  "What is 'overtourism'?": "What does the word 'overtourism' mean?",
};

/** Generic rewrite for "Closest meaning to 'x':" style stems. */
const closestMeaning = (stem: string): string | null => {
  const m = stem.match(/^Closest meaning to (.+?):?$/i);
  return m ? `What is the closest meaning of ${m[1]}?` : null;
};

/** Full item rewrites for questions whose options did not match the stem. */
const ITEM_FIXES: Record<string, Fix> = {
  "What time do you eat breakfast?": {
    question: "What time does the girl get up in the morning?",
    options: ["at six o'clock", "at seven o'clock", "at eight o'clock", "at nine o'clock"],
    correct: "at seven o'clock",
    explanation: "The girl says 'I get up at seven o'clock', so seven o'clock is the correct time.",
    explanationVi: "Bạn ấy nói 'I get up at seven o'clock', nên đáp án là bảy giờ.",
  },
  "What time does breakfast happen?": {
    question: "When does the girl eat breakfast?",
    explanation:
      "She eats breakfast first and then goes to school, so breakfast happens before school.",
    explanationVi: "Bạn ấy ăn sáng rồi mới đi học, nên bữa sáng diễn ra trước khi đi học.",
  },
  "Where do they play football?": {
    question: "What do they do after the football game?",
    options: ["drink water and eat an apple", "go to school", "watch television", "ride a bike"],
    correct: "drink water and eat an apple",
    explanation:
      "The text says 'After the game we drink water and eat an apple', so that is what they do next.",
    explanationVi: "Bài đọc nói sau khi chơi họ uống nước và ăn một quả táo.",
  },
  "Is the bedroom big or small?": {
    options: ["big", "very big", "small", "new"],
    correct: "small",
    explanation: "The text says 'My bedroom is small but I like it', so the bedroom is small.",
    explanationVi: "Bài đọc nói phòng ngủ nhỏ nhưng bạn ấy vẫn thích nó.",
  },
  "Does the child go to school?": {
    options: ["yes", "sometimes", "no", "only in the afternoon"],
    correct: "no",
    explanation: "The child says 'I stay in bed and I don't go to school', so the answer is no.",
    explanationVi: "Bạn ấy nói mình nằm trên giường và không đi học, nên đáp án là không.",
  },
  "How does the child feel at the playground?": {
    options: ["bored", "sad", "happy, it is lots of fun", "tired"],
    correct: "happy, it is lots of fun",
    explanation:
      "The text ends with 'It is a lot of fun every day', so the child feels happy at the playground.",
    explanationVi: "Bài đọc nói ngày nào cũng rất vui, nên bạn ấy cảm thấy vui vẻ.",
  },
};

const applyFix = (q: CambridgeMockQuestion, fix: Fix): CambridgeMockQuestion => {
  const next: CambridgeMockQuestion = { ...q };
  if (fix.question) next.question = fix.question;
  if (fix.options) {
    next.options = fix.options;
    const target = fix.correct ?? q.options[q.correctAnswer];
    const index = fix.options.findIndex((o) => o === target);
    next.correctAnswer = index >= 0 ? index : 0;
  } else if (fix.correct) {
    const index = q.options.findIndex((o) => o === fix.correct);
    if (index >= 0) next.correctAnswer = index;
  }
  if (fix.explanation) next.explanation = fix.explanation;
  if (fix.explanationVi) next.explanationVi = fix.explanationVi;
  return next;
};

export const clarifyCambridgeMockExam = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map((raw) => {
    let q = raw;
    const stem = q.question.trim();

    const item = ITEM_FIXES[stem];
    if (item) q = applyFix(q, item);

    const rewritten = STEM_FIXES[q.question.trim()] ?? closestMeaning(q.question.trim());
    if (rewritten) q = { ...q, question: rewritten };

    return q;
  }),
});
