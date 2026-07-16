/**
 * @file cambridgeKetPracticeBoost2.ts
 * @description Second-wave universal KET practice/quiz pack. Applied to EVERY
 *              KET lecture on top of the first boost so students get even more
 *              exam-style drilling (grammar, vocab, functional English, exam
 *              tactics). English comments only.
 * @copyright 2026 HaiEduTech, ILC.
 */
import type { CambridgePracticeItem, CambridgeQuizQuestion } from "./cambridgeLecturesData";

export const ketUniversalExtraPractice: CambridgePracticeItem[] = [
  {
    instruction: "Choose the correct verb form.",
    instructionVi: "Chọn dạng động từ đúng.",
    question: "While I ___ dinner, the phone rang.",
    options: ["cook", "cooked", "was cooking", "have cooked"],
    answer: 2,
    explanation: "Past continuous + past simple: a longer action interrupted by a shorter one.",
    explanationVi: "Quá khứ tiếp diễn + quá khứ đơn: hành động dài bị hành động ngắn ngắt.",
  },
  {
    instruction: "Pick the best word.",
    instructionVi: "Chọn từ đúng nhất.",
    question: "You mustn't touch the oven - it's very ___.",
    options: ["cold", "hot", "empty", "new"],
    answer: 1,
    explanation: "Warning + 'mustn't touch' fits 'hot'. KET tests warning-signs vocabulary.",
    explanationVi: "Cảnh báo + 'mustn't touch' phù hợp với 'hot' (nóng).",
  },
  {
    instruction: "Choose the correct question.",
    instructionVi: "Chọn câu hỏi đúng.",
    question: "___ does the film start? At 7 pm.",
    options: ["What", "How", "When", "Who"],
    answer: 2,
    explanation: "Answer refers to time (7 pm), so use 'When'.",
    explanationVi: "Câu trả lời chỉ thời gian nên dùng 'When'.",
  },
  {
    instruction: "Choose the best reply in a shop.",
    instructionVi: "Chọn câu đáp phù hợp trong cửa hàng.",
    question: "Shop assistant: 'Can I help you?' Customer: '___'",
    options: [
      "No, thanks. I'm just looking.",
      "Yes, I am from Vietnam.",
      "The weather is nice.",
      "I'm 15 years old.",
    ],
    answer: 0,
    explanation: "Standard KET functional reply in a shopping situation.",
    explanationVi: "Câu đáp chức năng chuẩn KET khi mua sắm.",
  },
  {
    instruction: "Pick the correct word form.",
    instructionVi: "Chọn dạng từ đúng.",
    question: "She sings very ___.",
    options: ["beautiful", "beauty", "beautifully", "beautify"],
    answer: 2,
    explanation: "An adverb is needed to modify the verb 'sings'.",
    explanationVi: "Cần trạng từ để bổ nghĩa cho động từ 'sings'.",
  },
  {
    instruction: "Which sentence is correct?",
    instructionVi: "Câu nào đúng ngữ pháp?",
    question: "Choose the accurate KET sentence.",
    options: [
      "There is a lot of people here.",
      "There are many people here.",
      "There have many people here.",
      "There is many people here.",
    ],
    answer: 1,
    explanation: "'People' is plural, so use 'are' + 'many'.",
    explanationVi: "'People' là số nhiều nên dùng 'are' + 'many'.",
  },
  {
    instruction: "Choose the natural phrase.",
    instructionVi: "Chọn cụm từ tự nhiên nhất.",
    question: "I'm sorry, I ___ your name. Could you repeat it?",
    options: ["didn't catch", "didn't fish", "didn't hit", "didn't run"],
    answer: 0,
    explanation: "'Didn't catch your name' = didn't hear/understand it - a KET Speaking staple.",
    explanationVi: "'Didn't catch your name' = không nghe rõ tên - hay dùng ở KET Speaking.",
  },
  {
    instruction: "Pick the correct linker.",
    instructionVi: "Chọn từ nối đúng.",
    question: "I stayed at home ___ it was raining heavily.",
    options: ["but", "so", "because", "although"],
    answer: 2,
    explanation: "'Because' gives the reason.",
    explanationVi: "'Because' cho lý do.",
  },
];

export const ketUniversalExtraQuiz: CambridgeQuizQuestion[] = [
  {
    question: "Which sentence uses the present perfect correctly?",
    options: [
      "I have seen that film yesterday.",
      "I have seen that film before.",
      "I have saw that film.",
      "I has seen that film.",
    ],
    answer: 1,
    explanation: "Present perfect + 'before/ever/never' (no specific past time like 'yesterday').",
  },
  {
    question: "Choose the correct plural.",
    options: ["childs", "childrens", "children", "child's"],
    answer: 2,
    explanation: "The irregular plural of 'child' is 'children'.",
  },
  {
    question: "Best response: 'Thank you very much!'",
    options: ["No, please.", "You're welcome.", "Yes, of course I do.", "Sorry about that."],
    answer: 1,
    explanation: "'You're welcome' is the standard reply to 'Thank you'.",
  },
  {
    question: "Which word is a synonym of 'begin'?",
    options: ["end", "stop", "start", "close"],
    answer: 2,
    explanation: "'Start' = 'begin'.",
  },
  {
    question: "Best KET exam tactic when you don't know an answer:",
    options: [
      "Leave it blank.",
      "Cross out impossible options, then choose the best guess.",
      "Choose 'A' every time.",
      "Copy your neighbour.",
    ],
    answer: 1,
    explanation: "Elimination raises the odds; never leave answers blank in KET.",
  },
];
