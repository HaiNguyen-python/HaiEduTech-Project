import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Headphones, BookOpen, PenSquare, Mic, Clock, FileText, Target, Sparkles,
  GraduationCap, Award, TrendingUp, Calendar, Globe, AlertTriangle, Lightbulb,
  CheckCircle2, XCircle, RefreshCw, Trophy, Brain, Volume2, ScrollText,
  Layers, ListChecks, BarChart3, Compass, BookMarked, Timer, Flame
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ========================================================================
   IELTS Exam Breakdown — Deep lecture + Interactive quiz
   ======================================================================== */

const overviewFacts = [
  {
    icon: Calendar,
    labelVi: "Tổng thời gian",
    labelEn: "Total duration",
    valueVi: "2 giờ 45 phút",
    valueEn: "2h 45 min",
  },
  {
    icon: FileText,
    labelVi: "Số câu hỏi",
    labelEn: "Total questions",
    valueVi: "80 câu (L+R) + 2 essays + speaking",
    valueEn: "80 (L+R) + 2 essays + speaking",
  },
  {
    icon: Target,
    labelVi: "Thang điểm",
    labelEn: "Band scale",
    valueVi: "1.0 → 9.0 (0.5 increments)",
    valueEn: "1.0 → 9.0 (0.5 increments)",
  },
  {
    icon: Globe,
    labelVi: "Hai loại bài thi",
    labelEn: "Two test formats",
    valueVi: "Academic / General Training",
    valueEn: "Academic / General Training",
  },
];

const skills = [
  {
    icon: Headphones,
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    titleVi: "Listening — Nghe hiểu",
    titleEn: "Listening — Comprehension",
    durationVi: "30 phút bài + 10 phút chép đáp án",
    durationEn: "30 min test + 10 min transfer",
    questionsVi: "40 câu · 4 sections · audio chỉ phát 1 lần",
    questionsEn: "40 questions · 4 sections · audio plays once",
    sectionsVi: [
      { title: "Section 1", desc: "Hội thoại đời sống 2 người (đặt phòng, đăng ký lớp, hỏi đường) — dễ nhất, chủ yếu fill-in form" },
      { title: "Section 2", desc: "Độc thoại đời sống (giới thiệu địa điểm/sự kiện) — bắt đầu có map labelling" },
      { title: "Section 3", desc: "Hội thoại học thuật 2–4 người (sinh viên + giáo viên thảo luận bài tập)" },
      { title: "Section 4", desc: "Bài giảng học thuật (lecture đại học) — khó nhất, không ngắt giữa chừng" },
    ],
    sectionsEn: [
      { title: "Section 1", desc: "Two-person everyday conversation (booking, sign-up, directions) — easiest, mostly form-filling" },
      { title: "Section 2", desc: "Everyday monologue (introducing places/events) — map labelling appears" },
      { title: "Section 3", desc: "Academic conversation 2–4 people (students + teacher discussing assignments)" },
      { title: "Section 4", desc: "Academic lecture — hardest, no pause in the middle" },
    ],
    questionTypesVi: "MCQ · Fill-in-blank · Map/plan labelling · Form completion · Matching · Short answer",
    questionTypesEn: "MCQ · Fill-in-blank · Map/plan labelling · Form completion · Matching · Short answer",
    scoringVi: "Mỗi câu = 1 điểm. 30/40 ≈ Band 7.0 · 35/40 ≈ Band 8.0",
    scoringEn: "Each question = 1 mark. 30/40 ≈ Band 7.0 · 35/40 ≈ Band 8.0",
    tipsVi: [
      "Đọc trước câu hỏi trong 30 giây đầu mỗi section để dự đoán keywords",
      "Cẩn trọng với 'distractor' — đáp án đầu tiên thường là bẫy, hãy nghe đến hết",
      "Viết tắt khi nghe Section 4 vì không có thời gian dừng",
      "Kiểm tra plural/singular và spelling khi chép sang answer sheet",
    ],
    tipsEn: [
      "Read questions in the first 30 sec of each section to predict keywords",
      "Beware of 'distractors' — the first answer is often a trap, listen to the end",
      "Use abbreviations during Section 4 since there are no pauses",
      "Check plural/singular and spelling when transferring to the answer sheet",
    ],
    trapVi: "Bẫy phổ biến: số đếm (fifteen vs fifty), chính tả tên riêng, từ paraphrase 'expensive' → 'pricey'",
    trapEn: "Common traps: numbers (fifteen vs fifty), proper-noun spelling, paraphrases like 'expensive' → 'pricey'",
  },
  {
    icon: BookOpen,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    titleVi: "Reading — Đọc hiểu",
    titleEn: "Reading — Comprehension",
    durationVi: "60 phút (KHÔNG có thời gian transfer riêng)",
    durationEn: "60 min (NO separate transfer time)",
    questionsVi: "40 câu · 3 passages (~2,750 từ) · ~13–14 câu/passage",
    questionsEn: "40 questions · 3 passages (~2,750 words) · ~13–14 questions/passage",
    sectionsVi: [
      { title: "Passage 1", desc: "Chủ đề phổ thông (lịch sử, đời sống) — dễ, ~700 từ. Phân bổ ~17 phút" },
      { title: "Passage 2", desc: "Chủ đề bán học thuật (môi trường, công nghệ) — trung bình, ~900 từ. Phân bổ ~20 phút" },
      { title: "Passage 3", desc: "Chủ đề học thuật chuyên sâu (khoa học, xã hội học) — khó, ~1100 từ. Phân bổ ~23 phút" },
    ],
    sectionsEn: [
      { title: "Passage 1", desc: "General topic (history, lifestyle) — easy, ~700 words. ~17 min" },
      { title: "Passage 2", desc: "Semi-academic (environment, tech) — medium, ~900 words. ~20 min" },
      { title: "Passage 3", desc: "Deep academic (science, social) — hard, ~1100 words. ~23 min" },
    ],
    questionTypesVi: "True/False/Not Given · Yes/No/Not Given · Matching headings · Sentence/Summary completion · MCQ · Matching features",
    questionTypesEn: "True/False/Not Given · Yes/No/Not Given · Matching headings · Sentence/Summary completion · MCQ · Matching features",
    scoringVi: "Academic: 30/40 ≈ Band 7.0 · 35/40 ≈ Band 8.0. General Training cần điểm cao hơn để ra cùng band",
    scoringEn: "Academic: 30/40 ≈ Band 7.0 · 35/40 ≈ Band 8.0. General Training needs higher raw score for the same band",
    tipsVi: [
      "Skim passage 2 phút để nắm chủ đề + topic sentence của từng đoạn",
      "Làm Matching Headings TRƯỚC vì câu hỏi yêu cầu hiểu toàn đoạn",
      "Phân biệt 'False' (mâu thuẫn) vs 'Not Given' (không có thông tin) — không suy diễn",
      "Quản lý thời gian: nếu 1 câu vượt 1.5 phút, đánh dấu và quay lại sau",
    ],
    tipsEn: [
      "Skim each passage in 2 min to grasp the topic + each paragraph's topic sentence",
      "Tackle Matching Headings FIRST since they require understanding the whole paragraph",
      "Distinguish 'False' (contradicts) vs 'Not Given' (no info) — don't infer",
      "Time management: if a question takes >1.5 min, mark it and return later",
    ],
    trapVi: "Bẫy phổ biến: đáp án dùng synonym chứ không phải từ y hệt; 'extreme' words như 'always/never' thường sai trong T/F/NG",
    trapEn: "Common traps: synonyms instead of identical wording; extreme words like 'always/never' often signal False in T/F/NG",
  },
  {
    icon: PenSquare,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    titleVi: "Writing — Viết luận",
    titleEn: "Writing — Essay",
    durationVi: "60 phút tổng (Task 1: 20 phút · Task 2: 40 phút)",
    durationEn: "60 min total (Task 1: 20 min · Task 2: 40 min)",
    questionsVi: "2 bài · Task 1 ≥150 từ · Task 2 ≥250 từ · Task 2 chiếm 2/3 điểm",
    questionsEn: "2 tasks · Task 1 ≥150 words · Task 2 ≥250 words · Task 2 worth 2/3 of the score",
    sectionsVi: [
      { title: "Task 1 — Academic", desc: "Mô tả biểu đồ (line/bar/pie), bảng, quy trình (process), bản đồ (map), hoặc combo" },
      { title: "Task 1 — General", desc: "Viết thư (formal/semi-formal/informal): khiếu nại, xin nghỉ, mời, nhờ vả..." },
      { title: "Task 2", desc: "Bài luận 4 dạng: Opinion (Agree/Disagree), Discussion (Both views + opinion), Problem-Solution, Two-part question" },
    ],
    sectionsEn: [
      { title: "Task 1 — Academic", desc: "Describe charts (line/bar/pie), tables, processes, maps, or combos" },
      { title: "Task 1 — General", desc: "Letter writing (formal/semi-formal/informal): complaints, leave requests, invitations..." },
      { title: "Task 2", desc: "4 essay types: Opinion (Agree/Disagree), Discussion (Both views + opinion), Problem-Solution, Two-part question" },
    ],
    questionTypesVi: "Tiêu chí chấm: Task Achievement/Response · Coherence & Cohesion · Lexical Resource · Grammatical Range & Accuracy",
    questionTypesEn: "Criteria: Task Achievement/Response · Coherence & Cohesion · Lexical Resource · Grammatical Range & Accuracy",
    scoringVi: "Mỗi tiêu chí 25%. Viết dưới 150/250 từ bị trừ điểm Task Achievement nặng",
    scoringEn: "Each criterion = 25%. Writing under 150/250 words heavily penalises Task Achievement",
    tipsVi: [
      "Task 1: dành 3 phút phân tích biểu đồ, viết overview rõ ràng (xu hướng chung)",
      "Task 1 Academic: tuân thủ rule 1-2-3-3 (1 intro · 2 overview · 3 body 1 · 3 body 2)",
      "Task 2: dành 5 phút brainstorm + outline trước khi viết — không bao giờ viết thẳng",
      "Dùng linking devices đa dạng (Furthermore, In contrast, By the same token...) thay vì lặp 'And/But'",
      "Để dành 3–5 phút cuối kiểm tra ngữ pháp và đếm từ",
    ],
    tipsEn: [
      "Task 1: spend 3 min analysing the chart, write a clear overview (overall trend)",
      "Task 1 Academic: follow the 1-2-3-3 rule (1 intro · 2 overview · 3 body 1 · 3 body 2)",
      "Task 2: spend 5 min brainstorming + outlining before writing — never dive straight in",
      "Use varied linkers (Furthermore, In contrast, By the same token...) instead of repeating 'And/But'",
      "Save 3–5 min at the end to check grammar and word count",
    ],
    trapVi: "Bẫy phổ biến: viết quá nhiều dữ liệu trong Task 1 mà thiếu so sánh; Task 2 lạc đề khi đề hỏi 2 phần chỉ trả lời 1",
    trapEn: "Common traps: cramming data in Task 1 without comparison; Task 2 going off-topic by answering only one part of a two-part question",
  },
  {
    icon: Mic,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    titleVi: "Speaking — Phỏng vấn 1-1",
    titleEn: "Speaking — 1-on-1 Interview",
    durationVi: "11–14 phút với giám khảo (mặt-đối-mặt hoặc video)",
    durationEn: "11–14 min with examiner (face-to-face or video)",
    questionsVi: "3 phần · Bài thi được ghi âm · Có thể thi cùng/khác ngày với 3 kỹ năng còn lại",
    questionsEn: "3 parts · Recorded · Can be on the same or different day from the other 3 skills",
    sectionsVi: [
      { title: "Part 1 (4–5 phút)", desc: "Introduction & interview: 3 chủ đề quen thuộc (work/study, hometown, hobbies, family). Trả lời 30–45 giây/câu" },
      { title: "Part 2 (3–4 phút)", desc: "Long turn / Cue card: nhận đề bài + 1 phút chuẩn bị + nói 1.5–2 phút liên tục về chủ đề" },
      { title: "Part 3 (4–5 phút)", desc: "Two-way discussion: thảo luận sâu các vấn đề liên quan Part 2 — phân tích, so sánh, dự đoán, đánh giá" },
    ],
    sectionsEn: [
      { title: "Part 1 (4–5 min)", desc: "Intro & interview: 3 familiar topics (work/study, hometown, hobbies, family). Reply 30–45 sec/question" },
      { title: "Part 2 (3–4 min)", desc: "Long turn / Cue card: receive a card + 1 min prep + speak 1.5–2 min on the topic" },
      { title: "Part 3 (4–5 min)", desc: "Two-way discussion: deep discussion linked to Part 2 — analyse, compare, predict, evaluate" },
    ],
    questionTypesVi: "4 tiêu chí chấm (mỗi cái 25%): Fluency & Coherence · Lexical Resource · Grammatical Range & Accuracy · Pronunciation",
    questionTypesEn: "4 criteria (25% each): Fluency & Coherence · Lexical Resource · Grammatical Range & Accuracy · Pronunciation",
    scoringVi: "Lưu ý: ngừng quá lâu hoặc tự sửa lỗi liên tục bị trừ Fluency. Lặp từ vựng nhiều bị trừ Lexical Resource",
    scoringEn: "Note: long pauses or constant self-correction lower Fluency. Repeating vocabulary lowers Lexical Resource",
    tipsVi: [
      "Part 1: trả lời 2–3 câu (không quá ngắn, không quá dài), thêm lý do/ví dụ",
      "Part 2: dùng 1 phút chuẩn bị để vẽ mind-map theo 4 bullet trên cue card",
      "Part 3: dùng 'discourse markers' (Well, that's a tricky one... / I'd say...) để câu giờ tự nhiên",
      "Phát âm: tập trung vào sentence stress + intonation hơn là âm chuẩn 100%",
      "Không bao giờ học thuộc lòng — giám khảo sẽ phát hiện và trừ điểm",
    ],
    tipsEn: [
      "Part 1: answer 2–3 sentences (not too short, not too long), add reasons/examples",
      "Part 2: use the 1 min prep to draw a mind-map following the 4 cue-card bullets",
      "Part 3: use discourse markers ('Well, that's a tricky one...' / 'I'd say...') to buy time naturally",
      "Pronunciation: focus on sentence stress + intonation rather than 100% perfect sounds",
      "Never memorise scripts — examiners detect this and deduct marks",
    ],
    trapVi: "Bẫy phổ biến: dùng từ vựng quá 'sách vở' không tự nhiên; im lặng >5 giây; trả lời Part 1 chỉ với 'Yes/No'",
    trapEn: "Common traps: using overly bookish vocab; staying silent >5 sec; answering Part 1 with just 'Yes/No'",
  },
];

const roadmap = [
  {
    bandVi: "Band 4.0 — 5.0",
    bandEn: "Band 4.0 — 5.0",
    levelVi: "Cơ bản · Foundation",
    levelEn: "Foundation Level",
    durationVi: "8–12 tuần",
    durationEn: "8–12 weeks",
    color: "from-rose-500/20 to-rose-500/5",
    icon: GraduationCap,
    focusVi: [
      "Ngữ pháp nền tảng: 12 thì, câu điều kiện, mệnh đề quan hệ",
      "Từ vựng A2–B1: 1,500 từ thông dụng theo 20 chủ đề",
      "Phát âm cơ bản: 44 âm IPA, trọng âm từ & câu",
      "Listening Section 1–2 · Reading Passage 1 · Writing câu đơn",
    ],
    focusEn: [
      "Foundation grammar: 12 tenses, conditionals, relative clauses",
      "A2–B1 vocab: 1,500 high-frequency words across 20 topics",
      "Basic pronunciation: 44 IPA sounds, word & sentence stress",
      "Listening S1–2 · Reading P1 · Writing simple sentences",
    ],
  },
  {
    bandVi: "Band 5.5 — 6.0",
    bandEn: "Band 5.5 — 6.0",
    levelVi: "Trung cấp · Pre-Intermediate",
    levelEn: "Pre-Intermediate",
    durationVi: "10–14 tuần",
    durationEn: "10–14 weeks",
    color: "from-amber-500/20 to-amber-500/5",
    icon: Target,
    focusVi: [
      "Cấu trúc nâng cao: bị động, đảo ngữ, câu nhấn mạnh",
      "Từ vựng B1–B2: 2,500 từ học thuật + collocations",
      "Listening Section 3–4 · Reading T/F/NG · Matching headings",
      "Writing Task 1 cơ bản (line/bar) · Task 2 opinion 4 đoạn",
      "Speaking Part 1 trả lời tự nhiên 30–45 giây/câu",
    ],
    focusEn: [
      "Advanced structures: passive, inversion, cleft sentences",
      "B1–B2 vocab: 2,500 academic words + collocations",
      "Listening S3–4 · Reading T/F/NG · Matching headings",
      "Writing T1 basics (line/bar) · T2 opinion 4-paragraph",
      "Speaking P1: 30–45s natural responses per question",
    ],
  },
  {
    bandVi: "Band 6.5 — 7.0",
    bandEn: "Band 6.5 — 7.0",
    levelVi: "Khá giỏi · Upper-Intermediate",
    levelEn: "Upper-Intermediate",
    durationVi: "12–16 tuần",
    durationEn: "12–16 weeks",
    color: "from-emerald-500/20 to-emerald-500/5",
    icon: TrendingUp,
    focusVi: [
      "Paraphrase 3 cấp độ · Synonym banks theo chủ đề",
      "Listening: Map labelling, multi-speakers, distractor traps",
      "Reading: Yes/No/NG, summary completion, scanning tốc độ",
      "Writing T1: 1-2-3-3 rule (overview→trends→data→comparison)",
      "Writing T2: thesis sắc bén · 2 body paragraphs PEEL",
      "Speaking Part 2 cue card · Part 3 phân tích nguyên nhân–hệ quả",
    ],
    focusEn: [
      "3-level paraphrasing · topic-based synonym banks",
      "Listening: Map labelling, multi-speakers, distractor traps",
      "Reading: Yes/No/NG, summary completion, fast scanning",
      "Writing T1: 1-2-3-3 rule (overview→trends→data→comparison)",
      "Writing T2: sharp thesis · 2 body paragraphs (PEEL)",
      "Speaking P2 cue card · P3 cause-effect analysis",
    ],
  },
  {
    bandVi: "Band 7.5 — 8.0+",
    bandEn: "Band 7.5 — 8.0+",
    levelVi: "Nâng cao · Advanced",
    levelEn: "Advanced",
    durationVi: "10–14 tuần luyện chuyên sâu",
    durationEn: "10–14 weeks intensive",
    color: "from-violet-500/20 to-violet-500/5",
    icon: Award,
    focusVi: [
      "Lexical sophistication: idioms, less-common collocations",
      "Grammar phức tạp: subjunctive, mixed conditionals, ellipsis",
      "Reading 3 passages trong 55 phút (đạt 35+/40 câu)",
      "Writing T2: Band 8.0 templates · linking devices tinh tế",
      "Speaking: discourse markers, hedging, near-native intonation",
      "Mock test mô phỏng phòng thi · phân tích lỗi 1-on-1",
    ],
    focusEn: [
      "Lexical sophistication: idioms, less-common collocations",
      "Complex grammar: subjunctive, mixed conditionals, ellipsis",
      "Reading: 3 passages in 55 min (35+/40 correct)",
      "Writing T2: Band 8.0 templates · subtle linking devices",
      "Speaking: discourse markers, hedging, near-native intonation",
      "Real-time mock tests · 1-on-1 error analysis",
    ],
  },
];

/* ========================= QUIZ DATA ========================= */
interface QuizQuestion {
  questionVi: string;
  questionEn: string;
  options: { vi: string; en: string }[];
  correct: number;
  explanationVi: string;
  explanationEn: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    questionVi: "Bài thi IELTS Listening kéo dài bao lâu (chưa tính thời gian transfer đáp án)?",
    questionEn: "How long does the IELTS Listening test last (excluding transfer time)?",
    options: [
      { vi: "20 phút", en: "20 minutes" },
      { vi: "30 phút", en: "30 minutes" },
      { vi: "40 phút", en: "40 minutes" },
      { vi: "60 phút", en: "60 minutes" },
    ],
    correct: 1,
    explanationVi: "Listening: 30 phút thi + 10 phút chép sang answer sheet = 40 phút tổng.",
    explanationEn: "Listening: 30 min test + 10 min transfer = 40 min total.",
  },
  {
    questionVi: "Section nào trong Listening được coi là khó nhất?",
    questionEn: "Which Listening section is considered the hardest?",
    options: [
      { vi: "Section 1 (hội thoại đời sống)", en: "Section 1 (everyday conversation)" },
      { vi: "Section 2 (độc thoại đời sống)", en: "Section 2 (everyday monologue)" },
      { vi: "Section 3 (hội thoại học thuật)", en: "Section 3 (academic conversation)" },
      { vi: "Section 4 (bài giảng học thuật)", en: "Section 4 (academic lecture)" },
    ],
    correct: 3,
    explanationVi: "Section 4 là bài giảng học thuật dài, không có pause giữa chừng — đòi hỏi kỹ năng nghe ý chính và viết tắt.",
    explanationEn: "Section 4 is a long academic lecture with no mid-pause — requires gist listening and abbreviation skills.",
  },
  {
    questionVi: "Reading bao gồm bao nhiêu passages và tổng số câu hỏi?",
    questionEn: "How many passages and questions are in Reading?",
    options: [
      { vi: "2 passages · 30 câu", en: "2 passages · 30 questions" },
      { vi: "3 passages · 40 câu", en: "3 passages · 40 questions" },
      { vi: "4 passages · 40 câu", en: "4 passages · 40 questions" },
      { vi: "3 passages · 50 câu", en: "3 passages · 50 questions" },
    ],
    correct: 1,
    explanationVi: "Reading có 3 passages (~2,750 từ tổng), 40 câu hỏi, làm trong 60 phút (KHÔNG có thời gian transfer).",
    explanationEn: "Reading has 3 passages (~2,750 words total), 40 questions, in 60 min (NO transfer time).",
  },
  {
    questionVi: "Khi không có thông tin trong bài để xác nhận hoặc bác bỏ một câu, đáp án Reading nên chọn là gì?",
    questionEn: "When there's no info in the passage to confirm or deny a statement, the Reading answer should be:",
    options: [
      { vi: "True / Yes", en: "True / Yes" },
      { vi: "False / No", en: "False / No" },
      { vi: "Not Given", en: "Not Given" },
      { vi: "Bỏ trống", en: "Leave blank" },
    ],
    correct: 2,
    explanationVi: "'Not Given' = không có thông tin trong bài. 'False' = bài có thông tin và mâu thuẫn. Đừng suy diễn!",
    explanationEn: "'Not Given' = no info in the passage. 'False' = info is in the passage and contradicts. Don't infer!",
  },
  {
    questionVi: "Writing Task 1 (Academic) yêu cầu viết tối thiểu bao nhiêu từ?",
    questionEn: "What's the minimum word count for Writing Task 1 (Academic)?",
    options: [
      { vi: "100 từ", en: "100 words" },
      { vi: "150 từ", en: "150 words" },
      { vi: "200 từ", en: "200 words" },
      { vi: "250 từ", en: "250 words" },
    ],
    correct: 1,
    explanationVi: "Task 1 ≥150 từ trong 20 phút · Task 2 ≥250 từ trong 40 phút. Viết dưới ngưỡng bị trừ điểm Task Achievement.",
    explanationEn: "Task 1 ≥150 words in 20 min · Task 2 ≥250 words in 40 min. Going below penalises Task Achievement.",
  },
  {
    questionVi: "Trong 4 tiêu chí chấm Writing, tiêu chí nào KHÔNG tồn tại?",
    questionEn: "Which of these is NOT a Writing scoring criterion?",
    options: [
      { vi: "Task Achievement / Response", en: "Task Achievement / Response" },
      { vi: "Coherence & Cohesion", en: "Coherence & Cohesion" },
      { vi: "Lexical Resource", en: "Lexical Resource" },
      { vi: "Pronunciation", en: "Pronunciation" },
    ],
    correct: 3,
    explanationVi: "Pronunciation chỉ chấm cho Speaking. 4 tiêu chí Writing: Task · Coherence · Lexical · Grammar.",
    explanationEn: "Pronunciation is only for Speaking. The 4 Writing criteria are: Task · Coherence · Lexical · Grammar.",
  },
  {
    questionVi: "Speaking Part 2 cho bao nhiêu thời gian chuẩn bị và bao lâu để nói?",
    questionEn: "Speaking Part 2: how much prep time and speaking time?",
    options: [
      { vi: "30 giây chuẩn bị · 1 phút nói", en: "30 sec prep · 1 min speaking" },
      { vi: "1 phút chuẩn bị · 1.5–2 phút nói", en: "1 min prep · 1.5–2 min speaking" },
      { vi: "2 phút chuẩn bị · 3 phút nói", en: "2 min prep · 3 min speaking" },
      { vi: "Không có chuẩn bị · 2 phút nói", en: "No prep · 2 min speaking" },
    ],
    correct: 1,
    explanationVi: "Part 2 (Long turn): nhận cue card → 1 phút chuẩn bị (có giấy bút) → nói 1.5–2 phút liên tục.",
    explanationEn: "Part 2 (Long turn): receive cue card → 1 min prep (with paper & pen) → speak 1.5–2 min continuously.",
  },
  {
    questionVi: "Thang điểm IELTS dao động trong khoảng nào?",
    questionEn: "What is the IELTS band scale range?",
    options: [
      { vi: "0 – 100 điểm", en: "0 – 100 points" },
      { vi: "1.0 – 9.0 (bước 0.5)", en: "1.0 – 9.0 (0.5 increments)" },
      { vi: "A1 – C2 (CEFR)", en: "A1 – C2 (CEFR)" },
      { vi: "200 – 800 điểm", en: "200 – 800 points" },
    ],
    correct: 1,
    explanationVi: "IELTS dùng band 1.0–9.0 với bước 0.5. Điểm Overall = trung bình 4 kỹ năng, làm tròn về .0 hoặc .5 gần nhất.",
    explanationEn: "IELTS uses bands 1.0–9.0 in 0.5 steps. Overall = average of 4 skills, rounded to the nearest .0 or .5.",
  },
];

/* ========================= COMPONENT ========================= */

const IeltsExamBreakdown = () => {
  const { t } = useLanguage();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setShowQuizResults(true);
    setTimeout(() => {
      document.getElementById("quiz-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const correctCount = Object.entries(quizAnswers).filter(
    ([qIdx, optIdx]) => quizQuestions[Number(qIdx)].correct === optIdx
  ).length;
  const totalAnswered = Object.keys(quizAnswers).length;
  const allAnswered = totalAnswered === quizQuestions.length;

  return (
    <div className="space-y-8 mb-8">

      {/* ========== Lecture Header ========== */}
      <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10 shrink-0">
            <ScrollText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {t("Bài giảng số 0", "Lecture 0")}
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {t("Cấu trúc bài thi IELTS — Tổng quan toàn diện", "IELTS Test Structure — Complete Overview")}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {t(
                "Trước khi bắt đầu luyện 4 kỹ năng, hãy nắm vững cấu trúc bài thi để có chiến lược ôn luyện đúng đắn ngay từ đầu.",
                "Before practising the 4 skills, master the test structure to plan your strategy from day one."
              )}
            </p>
          </div>
        </div>

        {/* Quick facts grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {overviewFacts.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background/50 p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{t(f.labelVi, f.labelEn)}</span>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug">{t(f.valueVi, f.valueEn)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Test order */}
        <div className="mt-5 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
            {t("Thứ tự thi trong ngày", "Order on test day")}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30">1. Listening (30')</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">2. Reading (60')</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">3. Writing (60')</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">4. Speaking (11–14')</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            {t(
              "Speaking thường thi vào buổi chiều cùng ngày, hoặc trước/sau 7 ngày tùy lịch trung tâm.",
              "Speaking is usually held the same afternoon, or up to 7 days before/after, depending on the centre."
            )}
          </p>
        </div>
      </div>

      {/* ========== 4 Skills Deep Dive ========== */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              {t("Phân tích sâu 4 kỹ năng", "Deep Dive: 4 Skills")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t(
                "Mỗi kỹ năng kèm cấu trúc, dạng câu hỏi, scoring, mẹo làm bài và bẫy phổ biến.",
                "Each skill includes structure, question types, scoring, tips and common traps."
              )}
            </p>
          </div>
        </div>

        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-2xl border ${skill.borderColor} ${skill.bgColor} overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${skill.color} opacity-10 rounded-full blur-3xl`} />

              <div className="relative p-5 md:p-7">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white shadow-lg shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                      {t(skill.titleVi, skill.titleEn)}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/70 text-foreground/80 border border-border">
                        <Clock className="w-3 h-3" /> {t(skill.durationVi, skill.durationEn)}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/70 text-foreground/80 border border-border">
                        <FileText className="w-3 h-3" /> {t(skill.questionsVi, skill.questionsEn)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sections */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" /> {t("Cấu trúc chi tiết", "Detailed structure")}
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(t("vi", "en") === "vi" ? skill.sectionsVi : skill.sectionsEn).map((s, idx) => (
                      <div key={idx} className="rounded-lg bg-background/60 p-3 border border-border/50">
                        <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question types + scoring */}
                <div className="grid md:grid-cols-2 gap-3 mb-5">
                  <div className="rounded-lg bg-background/60 p-3 border border-border/50">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" /> {t("Dạng câu hỏi / Tiêu chí", "Question types / Criteria")}
                    </p>
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {t(skill.questionTypesVi, skill.questionTypesEn)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-3 border border-border/50">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> {t("Quy đổi điểm", "Scoring")}
                    </p>
                    <p className="text-sm text-foreground/85 leading-relaxed">{t(skill.scoringVi, skill.scoringEn)}</p>
                  </div>
                </div>

                {/* Tips */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 mb-3">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> {t("Mẹo làm bài (Mr. Hai)", "Mr. Hai's tips")}
                  </p>
                  <ul className="space-y-1.5">
                    {(t("vi", "en") === "vi" ? skill.tipsVi : skill.tipsEn).map((tip, idx) => (
                      <li key={idx} className="text-sm text-foreground/85 flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common trap */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> {t("Bẫy thường gặp", "Common trap")}
                  </p>
                  <p className="text-sm text-foreground/85 leading-relaxed">{t(skill.trapVi, skill.trapEn)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========== Roadmap by Band ========== */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            {t("Giáo trình từ Cơ bản đến Nâng cao", "Curriculum: Foundation → Advanced")}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {t(
            "Lộ trình 4 cấp độ theo Band mục tiêu — học viên được xếp lớp dựa trên bài kiểm tra đầu vào (diagnostic test).",
            "4 levels by target band — students are placed based on a diagnostic test."
          )}
        </p>

        <div className="space-y-4">
          {roadmap.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-xl border border-border bg-gradient-to-r ${stage.color} p-5 md:p-6`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex md:flex-col items-center md:items-start gap-3 md:min-w-[180px]">
                    <div className="p-3 rounded-xl bg-background/80 backdrop-blur-sm shadow-sm">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-display font-bold text-foreground">
                        {t(stage.bandVi, stage.bandEn)}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {t(stage.levelVi, stage.levelEn)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {t(stage.durationVi, stage.durationEn)}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                      {(t(stage.focusVi.join("|"), stage.focusEn.join("|")).split("|")).map((focus, idx) => (
                        <li key={idx} className="text-sm text-foreground/85 flex gap-2">
                          <span className="text-primary mt-1.5 shrink-0">▸</span>
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-sm text-foreground/85">
            <span className="font-semibold text-primary">
              {t("💡 Cam kết đầu ra: ", "💡 Output guarantee: ")}
            </span>
            {t(
              "Mỗi cấp độ kết thúc bằng một bài thi mô phỏng đầy đủ (Full Mock Test) chấm theo tiêu chí IELTS chính thức. Nếu chưa đạt mục tiêu, học viên được học lại miễn phí cho đến khi đạt.",
              "Each level ends with a Full Mock Test graded by official IELTS criteria. If you don't reach your target, you can repeat the level free of charge."
            )}
          </p>
        </div>
      </div>

      {/* ========== INTERACTIVE QUIZ ========== */}
      <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-br from-violet-500/5 via-background to-primary/5 border-2 border-primary/20">
        <div className="flex items-start gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-primary text-white shadow-lg shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {t("Kiểm tra kiến thức", "Knowledge check")}
            </p>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              {t("Quiz: Bạn nhớ cấu trúc bài thi đến đâu?", "Quiz: How well do you remember the test structure?")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t(
                `${quizQuestions.length} câu hỏi · Trả lời tất cả rồi nhấn "Nộp bài" để xem điểm + giải thích chi tiết.`,
                `${quizQuestions.length} questions · Answer all then submit to see your score + detailed explanations.`
              )}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>{t("Tiến độ", "Progress")}</span>
            <span className="font-semibold">
              {totalAnswered}/{quizQuestions.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(totalAnswered / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {quizQuestions.map((q, qIdx) => {
            const userAnswer = quizAnswers[qIdx];
            const isCorrect = userAnswer === q.correct;
            return (
              <div key={qIdx} className="rounded-xl border border-border bg-background/60 p-5">
                <div className="flex items-start gap-3 mb-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                    {qIdx + 1}
                  </span>
                  <p className="text-base font-semibold text-foreground leading-relaxed">
                    {t(q.questionVi, q.questionEn)}
                  </p>
                </div>

                <div className="grid gap-2 ml-10">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectOpt = q.correct === optIdx;
                    let optClass = "border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5";
                    if (showQuizResults) {
                      if (isCorrectOpt) optClass = "border-emerald-500/60 bg-emerald-500/10";
                      else if (isSelected && !isCorrectOpt) optClass = "border-rose-500/60 bg-rose-500/10";
                      else optClass = "border-border bg-background/30 opacity-60";
                    } else if (isSelected) {
                      optClass = "border-primary bg-primary/10";
                    }
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(qIdx, optIdx)}
                        disabled={showQuizResults}
                        className={`flex items-start gap-3 p-3 rounded-lg border-2 text-left text-sm transition-all ${optClass} ${!showQuizResults && "cursor-pointer"}`}
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 text-foreground/90 pt-0.5">{t(opt.vi, opt.en)}</span>
                        {showQuizResults && isCorrectOpt && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {showQuizResults && isSelected && !isCorrectOpt && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submit */}
                <AnimatePresence>
                  {showQuizResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 ml-10 p-3 rounded-lg border ${isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"}`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        {isCorrect ? (
                          <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> <span className="text-emerald-700 dark:text-emerald-400">{t("Chính xác!", "Correct!")}</span></>
                        ) : (
                          <><Lightbulb className="w-3.5 h-3.5 text-amber-600" /> <span className="text-amber-700 dark:text-amber-400">{t("Giải thích", "Explanation")}</span></>
                        )}
                      </p>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {t(q.explanationVi, q.explanationEn)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Submit / Reset */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!showQuizResults ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-primary text-white font-semibold shadow-lg hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trophy className="w-4 h-4" />
              {t("Nộp bài", "Submit answers")}
              {!allAnswered && (
                <span className="text-xs opacity-80">({quizQuestions.length - totalAnswered} {t("còn lại", "left")})</span>
              )}
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 bg-primary/5 text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              {t("Làm lại quiz", "Retake quiz")}
            </button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showQuizResults && (
            <motion.div
              id="quiz-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-5 rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-violet-500/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-primary text-white shadow-lg">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {t("Kết quả của bạn", "Your result")}
                  </p>
                  <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {correctCount}/{quizQuestions.length}
                    <span className="text-base font-normal text-muted-foreground ml-2">
                      ({Math.round((correctCount / quizQuestions.length) * 100)}%)
                    </span>
                  </p>
                  <p className="text-sm text-foreground/80 mt-1">
                    {correctCount === quizQuestions.length
                      ? t("🏆 Tuyệt vời! Bạn đã nắm chắc cấu trúc bài thi IELTS.", "🏆 Excellent! You've mastered the IELTS test structure.")
                      : correctCount >= quizQuestions.length * 0.75
                      ? t("👏 Rất tốt! Hãy đọc lại các câu sai để hoàn thiện kiến thức.", "👏 Well done! Review the missed questions to fully solidify your knowledge.")
                      : correctCount >= quizQuestions.length * 0.5
                      ? t("💪 Khá ổn! Cuộn lên đọc lại bài giảng và làm lại quiz nhé.", "💪 Decent! Scroll up to re-read the lecture and retake the quiz.")
                      : t("📚 Hãy đọc kỹ lại bài giảng phía trên và làm lại quiz để củng cố kiến thức.", "📚 Re-read the lecture above carefully and retake the quiz to reinforce your knowledge.")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IeltsExamBreakdown;
