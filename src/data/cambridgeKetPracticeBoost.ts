/**
 * @file cambridgeKetPracticeBoost.ts
 * @description Extra KET-level practice + quiz items merged into each KET lecture
 *              at load time. Boosts the amount of exam-style drilling students
 *              can do inside every KET lesson without touching original files.
 * @copyright 2026 HaiEduTech, ILC.
 */
import type { CambridgePracticeItem, CambridgeQuizQuestion } from "./cambridgeLecturesData";
import { ketUniversalExtraPractice, ketUniversalExtraQuiz } from "./cambridgeKetPracticeBoost2";

interface KetBoost {
  practice: CambridgePracticeItem[];
  quiz: CambridgeQuizQuestion[];
}

// Generic KET-A2 practice/quiz reused for lectures without a targeted pack.
const genericKetBoost: KetBoost = {
  practice: [
    {
      instruction: "Choose the best word to complete the sentence.",
      instructionVi: "Chọn từ đúng nhất để hoàn thành câu.",
      question: "I ___ to London last summer with my family.",
      options: ["go", "went", "gone", "going"],
      answer: 1,
      explanation: "'Last summer' signals past simple, so we need 'went'.",
      explanationVi: "'Last summer' là quá khứ, nên dùng 'went' (quá khứ đơn).",
    },
    {
      instruction: "Choose the correct reply.",
      instructionVi: "Chọn câu trả lời đúng.",
      question: "'Would you like some tea?' - '___'",
      options: ["Yes, I would.", "Yes, please.", "Yes, I like.", "Yes, I do."],
      answer: 1,
      explanation: "Polite offers with 'Would you like…?' are answered with 'Yes, please' or 'No, thanks'.",
      explanationVi: "Lời mời 'Would you like…?' đáp lại tự nhiên là 'Yes, please' / 'No, thanks'.",
    },
    {
      instruction: "Pick the correct preposition.",
      instructionVi: "Chọn giới từ đúng.",
      question: "The meeting is ___ Monday morning.",
      options: ["in", "at", "on", "for"],
      answer: 2,
      explanation: "Use 'on' with specific days and dates.",
      explanationVi: "Dùng 'on' với ngày cụ thể (on Monday, on 5 May).",
    },
    {
      instruction: "Choose the best word.",
      instructionVi: "Chọn từ đúng nhất.",
      question: "My brother is ___ than me - he's 1.85 m tall.",
      options: ["tall", "taller", "tallest", "more tall"],
      answer: 1,
      explanation: "Comparative of a one-syllable adjective: tall → taller.",
      explanationVi: "So sánh hơn của tính từ 1 âm tiết: tall → taller.",
    },
  ],
  quiz: [
    {
      question: "Which sentence is correct for KET A2 level?",
      options: [
        "I am agree with you.",
        "I agree with you.",
        "I am agreeing with you.",
        "I agrees with you.",
      ],
      answer: 1,
      explanation: "'Agree' is a stative verb - use present simple, not 'am agree' or continuous.",
    },
    {
      question: "Choose the best short answer: 'Have you finished your homework?'",
      options: ["Yes, I finished.", "Yes, I have.", "Yes, I do.", "Yes, I am."],
      answer: 1,
      explanation: "Present perfect questions take short answers with 'have/haven't'.",
    },
    {
      question: "Which word best fits? 'It's raining, so take ___ umbrella.'",
      options: ["a", "an", "the", "-"],
      answer: 1,
      explanation: "'Umbrella' starts with a vowel sound, so use 'an'.",
    },
  ],
};

// Targeted boosts keyed by lecture ID (falls back to genericKetBoost for others).
const boosts: Record<string, KetBoost> = {
  "cam-ket-email-writing": {
    practice: [
      {
        instruction: "Read the friend's email and choose the best reply line.",
        instructionVi: "Đọc email và chọn câu trả lời phù hợp nhất.",
        question: "Prompt: 'What did you do at the weekend?' Best 1-sentence reply is:",
        options: [
          "Weekend.",
          "I stayed at home and watched a film with my sister.",
          "Because I was tired.",
          "I will tell you later.",
        ],
        answer: 1,
        explanation: "A KET email reply must be a full sentence that directly answers the prompt.",
        explanationVi: "Câu trả lời trong email KET phải là câu hoàn chỉnh, trả lời trực tiếp gợi ý.",
      },
      {
        instruction: "Choose the best opening for a KET email to a friend.",
        instructionVi: "Chọn cách mở đầu email KET gửi bạn.",
        question: "___",
        options: [
          "Dear Sir or Madam,",
          "Hi Anna,",
          "To whom it may concern,",
          "Respected friend,",
        ],
        answer: 1,
        explanation: "KET Part 9 is informal; start with 'Hi + first name,'.",
        explanationVi: "KET Phần 9 mang tính thân mật; bắt đầu bằng 'Hi + tên,'.",
      },
      {
        instruction: "Choose the best closing.",
        instructionVi: "Chọn cách kết thúc phù hợp.",
        question: "___",
        options: ["Yours faithfully,", "See you soon, Nam", "Regards, Mr. Nam", "The End."],
        answer: 1,
        explanation: "Informal endings suit KET emails: 'See you soon', 'Love', 'Bye', + first name.",
        explanationVi: "Kết thúc thân mật hợp với KET: 'See you soon', 'Love', 'Bye' + tên.",
      },
      {
        instruction: "Word count check.",
        instructionVi: "Kiểm tra số từ.",
        question: "How many words should your KET email have?",
        options: ["10-20", "25-35", "50-70", "100+"],
        answer: 1,
        explanation: "The task requires 25-35 words - too few or too many loses marks.",
        explanationVi: "Đề yêu cầu 25-35 từ; ít hoặc nhiều hơn đều bị trừ điểm.",
      },
    ],
    quiz: [
      {
        question: "Which sentence best answers 'Where will you go?'",
        options: ["Because it's fun.", "I will go to the beach.", "Beach!", "I go."],
        answer: 1,
        explanation: "Direct future answer with 'will' matches the prompt.",
      },
      {
        question: "What must every KET email include?",
        options: ["A joke", "A greeting, 3 answers, a closing", "A poem", "A drawing"],
        answer: 1,
        explanation: "Greeting + 3 sentence answers + closing = full-mark structure.",
      },
      {
        question: "Which is INFORMAL enough for KET?",
        options: [
          "I am writing to inform you...",
          "Thanks for your email!",
          "I hereby request...",
          "Kindly be advised...",
        ],
        answer: 1,
        explanation: "'Thanks for your email!' is friendly and KET-appropriate.",
      },
    ],
  },
  "cam-ket-speaking-part2": {
    practice: [
      {
        instruction: "Choose the best follow-up question.",
        instructionVi: "Chọn câu hỏi tiếp theo hợp nhất.",
        question: "A: 'I like playing football.' B: '___'",
        options: [
          "How old are you?",
          "How often do you play?",
          "Are you a doctor?",
          "What time is it?",
        ],
        answer: 1,
        explanation: "Keep the topic alive by asking a related detail question.",
        explanationVi: "Giữ chủ đề bằng câu hỏi chi tiết liên quan.",
      },
      {
        instruction: "Choose the natural reply.",
        instructionVi: "Chọn câu đáp tự nhiên.",
        question: "'What kind of music do you like?' - '___'",
        options: [
          "Yes, I do.",
          "I like pop music, especially K-pop.",
          "Music is a thing.",
          "I don't have music.",
        ],
        answer: 1,
        explanation: "Give a specific answer + one detail.",
        explanationVi: "Trả lời cụ thể + 1 chi tiết.",
      },
      {
        instruction: "Pick the best conversation extender.",
        instructionVi: "Chọn cách kéo dài hội thoại.",
        question: "After answering, you should say:",
        options: [
          "That's all.",
          "And you? / How about you?",
          "Goodbye.",
          "I'm done.",
        ],
        answer: 1,
        explanation: "Bouncing the question back keeps the interaction going - a KET scoring criterion.",
        explanationVi: "Chuyển câu hỏi lại cho đối phương giúp giữ mạch hội thoại - tiêu chí KET.",
      },
      {
        instruction: "Fluency filler choice.",
        instructionVi: "Chọn từ đệm giữ nhịp.",
        question: "When you need a moment to think, say:",
        options: ["Umm... shut up.", "Well, let me think...", "Nothing.", "I don't know English."],
        answer: 1,
        explanation: "'Well, let me think...' buys time without breaking fluency.",
        explanationVi: "'Well, let me think...' giúp có thời gian nghĩ mà vẫn trôi chảy.",
      },
    ],
    quiz: [
      {
        question: "In KET Speaking Part 2, you talk with:",
        options: ["The examiner only", "Another candidate", "A group of 5", "Alone into a mic"],
        answer: 1,
        explanation: "Part 2 is a paired discussion with the other candidate.",
      },
      {
        question: "The best question form to ask a partner is:",
        options: ["You like?", "Do you like...?", "Like you?", "Yes like?"],
        answer: 1,
        explanation: "Auxiliary + subject + verb: 'Do you like…?' - clear KET grammar.",
      },
      {
        question: "Which is a good extension answer?",
        options: [
          "Yes.",
          "Yes, and I also enjoy swimming on Sundays.",
          "Maybe.",
          "I don't understand.",
        ],
        answer: 1,
        explanation: "Adding a reason or extra detail scores higher on 'Discourse Management'.",
      },
    ],
  },
  "cam-ket-reading-p4": {
    practice: [
      {
        instruction: "Choose the best gap-fill word.",
        instructionVi: "Chọn từ điền vào chỗ trống phù hợp nhất.",
        question: "The zoo is ___ for children under five.",
        options: ["free", "empty", "cheap", "open"],
        answer: 0,
        explanation: "'Free' = no cost - a common KET Reading Part 4 collocation.",
        explanationVi: "'Free' = miễn phí - collocation quen thuộc trong KET.",
      },
      {
        instruction: "Fill the gap.",
        instructionVi: "Điền vào chỗ trống.",
        question: "You can ___ a bike near the park entrance.",
        options: ["hire", "buy", "cook", "read"],
        answer: 0,
        explanation: "'Hire a bike' = rent a bike - a fixed KET collocation.",
        explanationVi: "'Hire a bike' = thuê xe đạp - collocation KET hay gặp.",
      },
      {
        instruction: "Pick the right verb.",
        instructionVi: "Chọn động từ đúng.",
        question: "Remember to ___ your ticket before you enter.",
        options: ["throw", "show", "eat", "sleep"],
        answer: 1,
        explanation: "'Show your ticket' is the natural context-fit.",
        explanationVi: "'Show your ticket' hợp ngữ cảnh nhất.",
      },
      {
        instruction: "Choose the collocation.",
        instructionVi: "Chọn kết hợp từ đúng.",
        question: "We stayed at a small hotel by the ___ .",
        options: ["sky", "sea", "cook", "menu"],
        answer: 1,
        explanation: "'By the sea' is a common KET travel collocation.",
        explanationVi: "'By the sea' là collocation du lịch phổ biến ở KET.",
      },
    ],
    quiz: [
      {
        question: "Reading Part 4 tests mostly:",
        options: ["Grammar tenses", "Vocabulary in context", "Handwriting", "Numbers"],
        answer: 1,
        explanation: "Part 4 gap-fill focuses on choosing the right word by meaning.",
      },
      {
        question: "Best strategy for a hard gap:",
        options: [
          "Guess randomly.",
          "Read the whole sentence, try each word, keep the one that sounds natural.",
          "Skip forever.",
          "Pick the longest word.",
        ],
        answer: 1,
        explanation: "Context + elimination is the reliable KET method.",
      },
      {
        question: "'Delicious' most likely describes:",
        options: ["a road", "food", "the weather", "a shoe"],
        answer: 1,
        explanation: "'Delicious' = ngon; used with food/drink.",
      },
    ],
  },
  "cam-ket-listening-gap": genericKetBoost,
  "cam-ket-listening-multi-match": genericKetBoost,
  "cam-ket-listening-attitude": genericKetBoost,
  "cam-ket-listening-note": genericKetBoost,
  "cam-ket-signs-notices": genericKetBoost,
  "cam-ket-photo-description": genericKetBoost,
  "cam-ket-linking-words": genericKetBoost,
  "cam-ket-vocab-phrases": genericKetBoost,
  "cam-ket-informal-letter": genericKetBoost,
  "cam-ket-present-perfect": genericKetBoost,
  "cam-ket-short-message": genericKetBoost,
  "cam-ket-writing-story": genericKetBoost,
  "cam-ket-conversation-skills": genericKetBoost,
  "cam-ket-grammar-review": genericKetBoost,
  "cam-ket-reading-signs": genericKetBoost,
  "cam-ket-environment": genericKetBoost,
  "cam-ket-friendship-messages": genericKetBoost,
  "cam-ket-travel-plans": genericKetBoost,
  "cam-ket-shopping-roleplay": genericKetBoost,
  "cam-ket-story-linkers": genericKetBoost,
  "cam-grammar-ket-will-vs-going": genericKetBoost,
  "cam-grammar-ket-articles": genericKetBoost,
  "cam-grammar-ket-countable": genericKetBoost,
  "cam-grammar-ket-should": genericKetBoost,
  "cam-grammar-ket-quantifiers": genericKetBoost,
  "cam-grammar-ket-gerund-infinitive": genericKetBoost,
  "cam-grammar-ket-phrasal-verbs": genericKetBoost,
  "cam-grammar-ket-comparative-adv": genericKetBoost,
  "cam-grammar-ket-time-clauses": genericKetBoost,
  "cam-grammar-ket-both-either-neither": genericKetBoost,
  "cam-grammar-ket-so-am-i": genericKetBoost,
};

/**
 * Merge boost items into any KET lecture. Returns a NEW lecture object so the
 * original source arrays are not mutated. Non-KET lectures pass through as-is.
 */
export function applyKetBoost<T extends { id: string; level: string; practiceSet?: CambridgePracticeItem[]; quiz?: CambridgeQuizQuestion[] }>(l: T): T {
  if (l.level !== "ket") return l;
  const boost = boosts[l.id] ?? genericKetBoost;
  return {
    ...l,
    practiceSet: [...(l.practiceSet ?? []), ...boost.practice, ...ketUniversalExtraPractice],
    quiz: [...(l.quiz ?? []), ...boost.quiz, ...ketUniversalExtraQuiz],
  };
}
