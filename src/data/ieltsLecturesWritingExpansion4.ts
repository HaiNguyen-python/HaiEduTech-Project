/**
 * @file ieltsLecturesWritingExpansion4.ts
 * @description Additional IELTS Writing lectures (Task 1 & Task 2) to expand the
 * Writing pillar with deeper, more specialised topics. Uses the same compact
 * `mk` shape as ieltsLecturesExpansion2 to keep boilerplate minimal while still
 * rendering meaningful content via the existing IeltsLectureView template.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

const mk = (
  id: string,
  icon: string,
  title: string,
  titleVi: string,
  duration: string,
  level: IeltsLecture["level"],
  description: string,
  descriptionVi: string,
  golden: string,
  goldenVi: string,
  cheatSheet: string[],
): IeltsLecture => ({
  id,
  title,
  titleVi,
  pillar: "skill-based",
  skill: "writing",
  icon,
  duration,
  level,
  description,
  descriptionVi,
  strategySteps: [
    {
      step: 1,
      title: "Analyse the prompt carefully",
      titleVi: "Phân tích đề bài thật kỹ",
      description: "Underline keywords, identify the question type and decide on the structure before writing a single word.",
      descriptionVi: "Gạch chân từ khoá, xác định dạng đề và chọn cấu trúc trước khi viết một chữ.",
    },
    {
      step: 2,
      title: "Plan a 4-paragraph skeleton (5 minutes)",
      titleVi: "Lập dàn ý 4 đoạn (5 phút)",
      description: "Outline the introduction, two body paragraphs and conclusion. Decide your thesis or overview FIRST.",
      descriptionVi: "Phác thảo mở bài, hai đoạn thân và kết bài. Quyết định thesis hoặc overview TRƯỚC.",
    },
    {
      step: 3,
      title: "Write with academic register",
      titleVi: "Viết với văn phong học thuật",
      description: "Use complex sentences, precise vocabulary and avoid contractions or informal phrases.",
      descriptionVi: "Dùng câu phức, từ vựng chính xác và tránh viết tắt hay cụm thân mật.",
    },
    {
      step: 4,
      title: "Proofread in the last 3 minutes",
      titleVi: "Soát lại trong 3 phút cuối",
      description: "Check articles, subject-verb agreement, plurals and spelling — these are the cheapest marks to win.",
      descriptionVi: "Kiểm tra mạo từ, sự hòa hợp chủ-vị, số nhiều và chính tả — đây là những điểm dễ ghi nhất.",
    },
  ],
  practicalExamples: [
    {
      context: "Typical Band 7+ sentence pattern",
      contextVi: "Mẫu câu Band 7+ điển hình",
      example: "Apply the framework above to a representative prompt to see the difference between a Band 6.0 and Band 7.5 response.",
      explanation: "Notice how structure, register and precision combine to lift the band score.",
    },
  ],
  mistakesToAvoid: [
    {
      mistake: "Writing without planning",
      mistakeVi: "Viết mà không lập dàn ý",
      why: "Unplanned essays usually drift off-topic and lose Task Response marks.",
      whyVi: "Bài không có dàn ý thường lạc đề và mất điểm Task Response.",
    },
    {
      mistake: "Memorised phrases used inappropriately",
      mistakeVi: "Dùng cụm từ học thuộc không phù hợp",
      why: "Examiners detect template language and penalise Lexical Resource.",
      whyVi: "Giám khảo nhận ra ngôn ngữ học thuộc và trừ điểm Lexical Resource.",
    },
  ],
  goldenSecret: golden,
  goldenSecretVi: goldenVi,
  vocabHighlights: [],
  quiz: [
    {
      question: "Which step matters most for hitting Band 7.0+?",
      options: ["Skipping planning to write more", "Following a clear 4-paragraph structure", "Using as many idioms as possible", "Writing 350+ words regardless of relevance"],
      answer: 1,
      explanation: "Clear structure directly boosts Coherence & Cohesion AND Task Response.",
    },
    {
      question: "What is the safest way to upgrade vocabulary?",
      options: ["Memorise rare words", "Use precise collocations in context", "Translate from Vietnamese idioms", "Use thesaurus synonyms randomly"],
      answer: 1,
      explanation: "Precise collocations score higher than rare but misused words.",
    },
  ],
  cheatSheetPoints: cheatSheet,
});

// ============ WRITING TASK 1 ============
const task1: IeltsLecture[] = [
  mk(
    "writing-task1-line-graph-deep-dive",
    "📈",
    "Task 1: Line Graphs Deep Dive",
    "Task 1: Phân tích Line Graph chuyên sâu",
    "22 min",
    "intermediate",
    "Master line graphs across single-line, multi-line and projection (future) variants with the 1-2-3-3 paragraph plan.",
    "Chinh phục Line Graph dạng đơn, đa đường và dự đoán tương lai với khung 1-2-3-3.",
    "Always group line trends by SHAPE (climbing together vs. moving in opposite directions) — never describe each line in isolation.",
    "Luôn nhóm các đường theo HÌNH DẠNG (cùng tăng vs. ngược chiều) — đừng mô tả từng đường riêng lẻ.",
    [
      "Intro: paraphrase + units + time period in ONE sentence",
      "Overview: 2 biggest trends, NO numbers",
      "Body 1: group lines with similar trajectory",
      "Body 2: contrasting lines + key data points",
      "Use 'fluctuated', 'levelled off', 'peaked at' — not 'went up/down'",
    ],
  ),
  mk(
    "writing-task1-multiple-charts",
    "🧮",
    "Task 1: Multiple Charts (2 visuals)",
    "Task 1: Bài có 2 biểu đồ kết hợp",
    "24 min",
    "advanced",
    "Handle Task 1 prompts that combine two charts (bar + pie, line + table…) — the most feared variant on test day.",
    "Xử lý dạng đề Task 1 có 2 biểu đồ kết hợp (cột + tròn, đường + bảng…) — dạng đáng sợ nhất phòng thi.",
    "Devote ONE body paragraph to each chart, then write an overview that LINKS both charts with 'while', 'in contrast' or 'similarly'.",
    "Dành MỖI đoạn thân cho MỖI biểu đồ, rồi viết overview LIÊN KẾT cả hai bằng 'while', 'in contrast' hay 'similarly'.",
    [
      "1 body per chart — never mix them in the same paragraph",
      "Overview MUST mention both charts together",
      "Use 'whereas', 'while', 'compared to' to bridge the two visuals",
      "Don't compare apples-to-oranges (units must match)",
      "Word count 170-190 is the sweet spot",
    ],
  ),
  mk(
    "writing-task1-mixed-trends-language",
    "📝",
    "Task 1: Trend Language Toolkit",
    "Task 1: Bộ công cụ ngôn ngữ Trend",
    "18 min",
    "foundation",
    "A complete bank of verbs, adverbs and noun phrases for every direction of change — your forever cheat-sheet.",
    "Kho động từ, trạng từ và cụm danh từ cho mọi hướng thay đổi — cheat-sheet dùng mãi mãi.",
    "Vary the WORD CLASS: 'sales rose sharply' (verb) → 'a sharp rise in sales' (noun) — alternating both signals Band 7.0+ flexibility.",
    "Đổi LOẠI TỪ: 'sales rose sharply' (động từ) → 'a sharp rise in sales' (danh từ) — luân phiên báo hiệu Band 7.0+.",
    [
      "Up sharply: soared, surged, rocketed, climbed steeply",
      "Up gently: rose gradually, edged up, inched up",
      "Down sharply: plummeted, plunged, slumped, dived",
      "Down gently: dipped, declined modestly, slid slightly",
      "Stable: levelled off, plateaued, remained constant, held steady",
    ],
  ),
  // NOTE: GT letter lecture removed — Writing curriculum focuses on Academic Task 1 only.
];

// ============ WRITING TASK 2 ============
const task2: IeltsLecture[] = [
  mk(
    "writing-task2-introduction-mastery",
    "🚪",
    "Task 2: The Perfect Introduction",
    "Task 2: Mở bài hoàn hảo",
    "16 min",
    "foundation",
    "A 3-sentence introduction formula that works for ALL Task 2 question types — paraphrase, scope and thesis.",
    "Công thức mở bài 3 câu hiệu quả cho MỌI dạng Task 2 — paraphrase, phạm vi và thesis.",
    "Spend exactly 4 minutes on the intro — a strong opening primes the examiner to score the rest more generously.",
    "Dành đúng 4 phút cho mở bài — mở hay khiến giám khảo chấm phần còn lại rộng tay hơn.",
    [
      "Sentence 1: paraphrase the prompt (no copying)",
      "Sentence 2: introduce the scope / context",
      "Sentence 3: thesis = your direct answer to the question",
      "40-55 words is ideal",
      "Avoid 'In today's modern world…' — examiners hate clichés",
    ],
  ),
  mk(
    "writing-task2-conclusion-mastery",
    "🏁",
    "Task 2: Powerful Conclusions",
    "Task 2: Kết bài đầy sức nặng",
    "14 min",
    "foundation",
    "End your essay strongly with a 2-sentence conclusion that summarises and adds insight — never repeats verbatim.",
    "Kết bài mạnh mẽ với 2 câu tóm tắt và bổ sung góc nhìn — đừng lặp lại nguyên văn.",
    "A 'future-looking' final sentence ('this trend is likely to intensify…') signals Band 7.5+ cohesion.",
    "Câu cuối hướng tới tương lai ('this trend is likely to intensify…') báo hiệu Band 7.5+.",
    [
      "Sentence 1: 'In conclusion' + paraphrased thesis",
      "Sentence 2: future prediction / recommendation",
      "30-45 words, no new ideas",
      "Never end with a question — kills authority",
      "Use 'On balance' for Discussion essays instead of 'In conclusion'",
    ],
  ),
  mk(
    "writing-task2-grammar-range",
    "🧬",
    "Task 2: Grammar Range for Band 7+",
    "Task 2: Đa dạng ngữ pháp lên Band 7+",
    "20 min",
    "advanced",
    "The 5 grammar structures that examiners count when awarding Band 7.0 in Grammatical Range & Accuracy.",
    "5 cấu trúc ngữ pháp mà giám khảo đếm khi cho điểm Band 7.0 GRA.",
    "You need 4 of these 5 structures used ACCURATELY: complex sentences, conditionals, passive, relative clauses, modals of speculation.",
    "Cần 4 trong 5 cấu trúc dùng CHÍNH XÁC: câu phức, điều kiện, bị động, mệnh đề quan hệ, modal phỏng đoán.",
    [
      "1 conditional per essay (mixed if possible)",
      "1 passive in the right context (avoid forcing it)",
      "2-3 relative clauses ('which', 'whose', 'where')",
      "1 modal of speculation ('may well', 'could potentially')",
      "1 inversion ONLY in the introduction (optional)",
    ],
  ),
  mk(
    "writing-task2-cohesive-devices",
    "🔗",
    "Task 2: Cohesive Devices Done Right",
    "Task 2: Dùng từ nối thật chuẩn",
    "16 min",
    "intermediate",
    "Replace 'Firstly, Secondly, Finally' with sophisticated cohesion that scores higher in Coherence & Cohesion.",
    "Thay 'Firstly, Secondly, Finally' bằng từ nối tinh tế hơn để nâng điểm C&C.",
    "Use cohesion at the SENTENCE START sparingly (max 4 per essay) — overuse drops you from 7 to 6.",
    "Dùng từ nối ở ĐẦU CÂU tiết chế (tối đa 4 lần/bài) — lạm dụng rớt từ 7 xuống 6.",
    [
      "Adding: 'Furthermore', 'Moreover', 'In addition to this'",
      "Contrast: 'Conversely', 'On the other hand', 'Nevertheless'",
      "Cause: 'Consequently', 'As a result', 'Owing to'",
      "Example: 'To illustrate', 'A case in point is', 'For instance'",
      "Pronoun reference ('this', 'these', 'such') > linking words",
    ],
  ),
];

export const writingExpansion4: IeltsLecture[] = [...task1, ...task2];
