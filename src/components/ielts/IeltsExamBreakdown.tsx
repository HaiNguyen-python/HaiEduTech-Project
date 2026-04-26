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

interface SkillSection {
  title: string;
  desc: string;
  meta?: string; // e.g., "10 questions · 5 min"
}
interface BandRow { band: string; raw: string; }
interface SkillData {
  icon: typeof Headphones;
  color: string;
  bgColor: string;
  borderColor: string;
  titleVi: string;
  titleEn: string;
  durationVi: string;
  durationEn: string;
  questionsVi: string;
  questionsEn: string;
  formatVi: string;
  formatEn: string;
  sectionsVi: SkillSection[];
  sectionsEn: SkillSection[];
  questionTypesList: { vi: string; en: string }[];
  scoringTable: BandRow[];
  scoringNoteVi: string;
  scoringNoteEn: string;
  timeStrategyVi: { phase: string; time: string }[];
  timeStrategyEn: { phase: string; time: string }[];
  tipsVi: string[];
  tipsEn: string[];
  trapsVi: string[];
  trapsEn: string[];
  vocabFocusVi: string;
  vocabFocusEn: string;
}

const skills: SkillData[] = [
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
    formatVi: "Đề chung cho cả Academic và General Training. Đa accent: British, American, Australian, New Zealand, Canadian.",
    formatEn: "Same paper for Academic and General Training. Multi-accent: British, American, Australian, New Zealand, Canadian.",
    sectionsVi: [
      { title: "Section 1 (10 câu)", desc: "Hội thoại đời sống 2 người (đặt phòng khách sạn, đăng ký lớp học, hỏi đường, thuê nhà). Thường là form-filling: tên, ngày, giá, số điện thoại.", meta: "Dễ · ~5 phút · Form completion" },
      { title: "Section 2 (10 câu)", desc: "Độc thoại đời sống — hướng dẫn viên giới thiệu địa điểm/sự kiện/dịch vụ công cộng. Bắt đầu xuất hiện map labelling và multiple choice.", meta: "Dễ–TB · ~5 phút · Map + MCQ" },
      { title: "Section 3 (10 câu)", desc: "Hội thoại học thuật 2–4 người (sinh viên + tutor thảo luận project, dissertation, group assignment). Thay đổi người nói nhanh.", meta: "Khó · ~7–8 phút · Matching + MCQ" },
      { title: "Section 4 (10 câu)", desc: "Bài giảng học thuật đại học (lecture monolog) về khoa học, lịch sử, môi trường. KHÔNG có pause giữa chừng — phải nghe liền 5 phút.", meta: "Khó nhất · ~7–8 phút · Note completion" },
    ],
    sectionsEn: [
      { title: "Section 1 (10 Qs)", desc: "Two-person everyday conversation (hotel booking, course sign-up, directions, renting). Mostly form-filling: names, dates, prices, phone numbers.", meta: "Easy · ~5 min · Form completion" },
      { title: "Section 2 (10 Qs)", desc: "Everyday monologue — a guide introducing places/events/public services. Map labelling and MCQs start appearing.", meta: "Easy–Med · ~5 min · Map + MCQ" },
      { title: "Section 3 (10 Qs)", desc: "Academic conversation 2–4 people (students + tutor discussing project, dissertation, group assignment). Fast speaker switches.", meta: "Hard · ~7–8 min · Matching + MCQ" },
      { title: "Section 4 (10 Qs)", desc: "University academic lecture (monologue) on science, history, environment. NO mid-pause — listen continuously for 5 min.", meta: "Hardest · ~7–8 min · Note completion" },
    ],
    questionTypesList: [
      { vi: "Form / Note / Table / Flow-chart / Summary completion", en: "Form / Note / Table / Flow-chart / Summary completion" },
      { vi: "Multiple choice (MCQ) — chọn 1 hoặc nhiều đáp án", en: "Multiple choice (MCQ) — single or multiple answers" },
      { vi: "Matching — ghép thông tin/ý kiến với người nói", en: "Matching — match info/opinions to speakers" },
      { vi: "Plan / Map / Diagram labelling — gắn nhãn vị trí", en: "Plan / Map / Diagram labelling — label positions" },
      { vi: "Sentence completion (≤3 từ hoặc số)", en: "Sentence completion (≤3 words or a number)" },
      { vi: "Short-answer questions", en: "Short-answer questions" },
    ],
    scoringTable: [
      { band: "9.0", raw: "39–40" },
      { band: "8.5", raw: "37–38" },
      { band: "8.0", raw: "35–36" },
      { band: "7.5", raw: "32–34" },
      { band: "7.0", raw: "30–31" },
      { band: "6.5", raw: "26–29" },
      { band: "6.0", raw: "23–25" },
      { band: "5.5", raw: "18–22" },
    ],
    scoringNoteVi: "Mỗi câu = 1 điểm thô. Không bị trừ điểm sai → luôn đoán nếu không chắc. Spelling và plural sai = mất điểm.",
    scoringNoteEn: "Each question = 1 raw mark. No penalty for wrong → always guess. Misspelling and missing plurals = lose points.",
    timeStrategyVi: [
      { phase: "Trước mỗi section", time: "30s đọc lướt câu hỏi & gạch chân keywords" },
      { phase: "Trong khi nghe", time: "Viết tắt thẳng lên đề (write-on-question paper)" },
      { phase: "Cuối mỗi section", time: "30s kiểm tra lại — không quay lại sau" },
      { phase: "10 phút transfer", time: "Chép sang answer sheet, kiểm tra spelling 2 lần" },
    ],
    timeStrategyEn: [
      { phase: "Before each section", time: "30s skim questions & underline keywords" },
      { phase: "While listening", time: "Use abbreviations directly on the question paper" },
      { phase: "End of each section", time: "30s to double-check — never return later" },
      { phase: "10 min transfer", time: "Copy to answer sheet, spell-check twice" },
    ],
    tipsVi: [
      "Đọc trước câu hỏi trong 30 giây đầu mỗi section để dự đoán keywords và word-form (danh từ/động từ/số)",
      "Cẩn trọng với 'distractor' — đáp án đầu tiên thường là bẫy, người nói sẽ đính chính sau",
      "Viết tắt khi nghe Section 4 vì không có thời gian dừng (vd: gov't, w/, b/c)",
      "Kiểm tra plural/singular và spelling khi chép sang answer sheet — sai 1 chữ = mất 1 điểm",
      "Tận dụng hướng dẫn 'Write NO MORE THAN TWO WORDS' — viết quá là sai dù nội dung đúng",
      "Luyện shadowing podcast BBC 6 Minute English mỗi ngày 10 phút để quen accent",
    ],
    tipsEn: [
      "Read questions in the first 30 sec of each section to predict keywords and word-form (noun/verb/number)",
      "Beware of 'distractors' — the first answer is often a trap; the speaker self-corrects later",
      "Use abbreviations during Section 4 since there are no pauses (e.g. gov't, w/, b/c)",
      "Check plural/singular and spelling when transferring — one letter wrong = 1 mark lost",
      "Respect 'Write NO MORE THAN TWO WORDS' — exceeding the limit = wrong even if content is right",
      "Shadow BBC 6 Minute English for 10 min/day to get used to accents",
    ],
    trapsVi: [
      "Số đếm: 'fifteen' (15) vs 'fifty' (50) — chú ý trọng âm",
      "Chính tả tên riêng: người nói luôn đánh vần (vd: 'My name is Smith — S-M-I-T-H')",
      "Paraphrase: 'expensive' → 'pricey/costly'; 'a lot of' → 'numerous/plenty of'",
      "Đáp án bị thay đổi giữa chừng: 'Actually, on second thought, let's say Tuesday' → đáp án là Tuesday",
    ],
    trapsEn: [
      "Numbers: 'fifteen' (15) vs 'fifty' (50) — listen for stress",
      "Proper-noun spelling: speakers always spell out (e.g. 'My name is Smith — S-M-I-T-H')",
      "Paraphrasing: 'expensive' → 'pricey/costly'; 'a lot of' → 'numerous/plenty of'",
      "Mid-sentence correction: 'Actually, on second thought, let's say Tuesday' → answer is Tuesday",
    ],
    vocabFocusVi: "Số đếm/thứ tự, ngày tháng, địa danh, tiền tệ, giờ giấc, từ vựng học thuật theo chủ đề (Education, Environment, Health, Technology).",
    vocabFocusEn: "Numbers/ordinals, dates, place names, currencies, time, academic topic vocabulary (Education, Environment, Health, Technology).",
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
    formatVi: "Academic: 3 bài học thuật từ tạp chí khoa học/báo. General Training: 5 bài thực tế (quảng cáo, hướng dẫn, bài báo).",
    formatEn: "Academic: 3 academic texts from journals/papers. General Training: 5 practical texts (ads, instructions, articles).",
    sectionsVi: [
      { title: "Passage 1 (~13 câu)", desc: "Chủ đề phổ thông: lịch sử, đời sống, văn hóa. Câu hỏi 'thẳng thắn' — thông tin nằm sát thứ tự đoạn.", meta: "Dễ · ~700 từ · 17 phút" },
      { title: "Passage 2 (~13 câu)", desc: "Bán học thuật: môi trường, công nghệ, tâm lý. Bắt đầu có matching headings và summary completion.", meta: "Trung bình · ~900 từ · 20 phút" },
      { title: "Passage 3 (~14 câu)", desc: "Học thuật chuyên sâu: khoa học, xã hội học, kinh tế. Cấu trúc câu phức, từ vựng C1, lập luận đan xen.", meta: "Khó · ~1,100 từ · 23 phút" },
    ],
    sectionsEn: [
      { title: "Passage 1 (~13 Qs)", desc: "General topic: history, lifestyle, culture. 'Straightforward' questions — info follows paragraph order.", meta: "Easy · ~700 words · 17 min" },
      { title: "Passage 2 (~13 Qs)", desc: "Semi-academic: environment, tech, psychology. Matching headings + summary completion appear.", meta: "Medium · ~900 words · 20 min" },
      { title: "Passage 3 (~14 Qs)", desc: "Deep academic: science, sociology, economics. Complex syntax, C1 vocab, interwoven arguments.", meta: "Hard · ~1,100 words · 23 min" },
    ],
    questionTypesList: [
      { vi: "True / False / Not Given (về sự thật)", en: "True / False / Not Given (factual)" },
      { vi: "Yes / No / Not Given (về quan điểm tác giả)", en: "Yes / No / Not Given (writer's view)" },
      { vi: "Matching headings — ghép tiêu đề với đoạn", en: "Matching headings to paragraphs" },
      { vi: "Matching information / features / sentence endings", en: "Matching information / features / sentence endings" },
      { vi: "Sentence / Summary / Note / Table / Diagram completion", en: "Sentence / Summary / Note / Table / Diagram completion" },
      { vi: "Multiple choice (1 hoặc 2 đáp án đúng)", en: "Multiple choice (1 or 2 correct answers)" },
      { vi: "Short-answer questions (≤3 từ)", en: "Short-answer questions (≤3 words)" },
    ],
    scoringTable: [
      { band: "9.0", raw: "39–40" },
      { band: "8.5", raw: "37–38" },
      { band: "8.0", raw: "35–36" },
      { band: "7.5", raw: "33–34" },
      { band: "7.0", raw: "30–32" },
      { band: "6.5", raw: "27–29" },
      { band: "6.0", raw: "23–26" },
      { band: "5.5", raw: "19–22" },
    ],
    scoringNoteVi: "General Training cần điểm thô CAO HƠN để đạt cùng band (vd: Band 7.0 cần 34/40 thay vì 30/40 ở Academic).",
    scoringNoteEn: "General Training needs HIGHER raw scores for the same band (e.g. Band 7.0 = 34/40 instead of 30/40 in Academic).",
    timeStrategyVi: [
      { phase: "Passage 1", time: "17 phút (skim 2' + làm 13' + check 2')" },
      { phase: "Passage 2", time: "20 phút (skim 2' + làm 16' + check 2')" },
      { phase: "Passage 3", time: "23 phút (skim 3' + làm 18' + check 2')" },
      { phase: "Quy tắc 1.5 phút", time: "Không câu nào quá 1.5' — đánh dấu, làm câu khác, quay lại sau" },
    ],
    timeStrategyEn: [
      { phase: "Passage 1", time: "17 min (skim 2' + answer 13' + check 2')" },
      { phase: "Passage 2", time: "20 min (skim 2' + answer 16' + check 2')" },
      { phase: "Passage 3", time: "23 min (skim 3' + answer 18' + check 2')" },
      { phase: "1.5-min rule", time: "No question >1.5' — mark, skip, return later" },
    ],
    tipsVi: [
      "Skim passage 2 phút đầu để nắm topic + topic sentence của từng đoạn (thường là câu 1)",
      "Làm Matching Headings TRƯỚC vì đòi hỏi hiểu toàn đoạn — tránh phải đọc lại sau",
      "Phân biệt rõ 'False' (mâu thuẫn trực tiếp) vs 'Not Given' (không có thông tin) — KHÔNG suy diễn",
      "Quản lý thời gian nghiêm ngặt: 1 câu vượt 1.5 phút → đánh dấu và quay lại sau",
      "Tận dụng cấu trúc bài: tiêu đề, in nghiêng, in đậm, số liệu — khoanh ngay khi skim",
      "Với MCQ: đọc câu hỏi trước, gạch chân từ khóa, tìm trong bài → loại trừ 2 sai rõ rệt",
    ],
    tipsEn: [
      "Skim each passage in the first 2 min to grasp the topic + each paragraph's topic sentence (usually sentence 1)",
      "Tackle Matching Headings FIRST since they need whole-paragraph understanding — avoid re-reading later",
      "Distinguish 'False' (direct contradiction) vs 'Not Given' (no info) — DO NOT infer",
      "Strict time control: a question >1.5 min → mark and return later",
      "Use text structure: headings, italics, bold, numbers — circle while skimming",
      "For MCQ: read the question first, underline keywords, locate in the passage → eliminate 2 clearly wrong",
    ],
    trapsVi: [
      "Synonym replacement: 'reduce' trong câu hỏi → 'curtail/lower/diminish' trong bài",
      "Extreme words: 'always/never/all/none' trong T/F/NG thường = False",
      "Đáp án thứ tự ngược: T/F/NG đi theo thứ tự bài, nhưng MCQ và Matching thì KHÔNG",
      "Bài có data: tác giả nêu fact rồi phản bác → đừng vội chọn đáp án ở câu fact",
    ],
    trapsEn: [
      "Synonym replacement: 'reduce' in the question → 'curtail/lower/diminish' in the text",
      "Extreme words: 'always/never/all/none' in T/F/NG often = False",
      "Out-of-order answers: T/F/NG follow text order, but MCQ and Matching do NOT",
      "Texts with data: the author states a fact then refutes it → don't rush to pick the fact-sentence answer",
    ],
    vocabFocusVi: "Synonym banks theo chủ đề học thuật, từ nối logic (however, nevertheless, consequently), academic verbs (claim, argue, suggest, demonstrate).",
    vocabFocusEn: "Topic-based synonym banks, logical connectors (however, nevertheless, consequently), academic verbs (claim, argue, suggest, demonstrate).",
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
    formatVi: "Academic Task 1: mô tả biểu đồ/bản đồ/quy trình. General Task 1: viết thư. Task 2 chung: bài luận 250+ từ.",
    formatEn: "Academic Task 1: describe charts/maps/processes. General Task 1: letter writing. Task 2 (both): 250+ word essay.",
    sectionsVi: [
      { title: "Task 1 — Academic (20')", desc: "Mô tả 1 hoặc nhiều biểu đồ: line chart, bar chart, pie chart, table, process diagram, map (so sánh hiện tại–quá khứ), hoặc combo 2 loại.", meta: "≥150 từ · 1/3 điểm" },
      { title: "Task 1 — General (20')", desc: "Viết thư (3 dạng: formal — gửi cơ quan/sếp; semi-formal — gửi đối tác mới; informal — gửi bạn). Đề cho 3 bullet phải trả lời đủ.", meta: "≥150 từ · 1/3 điểm" },
      { title: "Task 2 (40')", desc: "Bài luận 4 dạng: Opinion (Agree/Disagree), Discussion (Both views + opinion), Problem-Solution (Causes & Solutions), Two-part question. Cấu trúc 4 đoạn chuẩn: Intro → Body 1 → Body 2 → Conclusion.", meta: "≥250 từ · 2/3 điểm" },
    ],
    sectionsEn: [
      { title: "Task 1 — Academic (20')", desc: "Describe one or more visuals: line chart, bar chart, pie chart, table, process diagram, map (now vs past), or a combo of two.", meta: "≥150 words · 1/3 of score" },
      { title: "Task 1 — General (20')", desc: "Letter writing (3 styles: formal — to authorities/manager; semi-formal — to a new contact; informal — to a friend). The 3 bullets MUST all be addressed.", meta: "≥150 words · 1/3 of score" },
      { title: "Task 2 (40')", desc: "Essay in 4 formats: Opinion (Agree/Disagree), Discussion (Both views + opinion), Problem-Solution (Causes & Solutions), Two-part question. Standard 4-paragraph structure: Intro → Body 1 → Body 2 → Conclusion.", meta: "≥250 words · 2/3 of score" },
    ],
    questionTypesList: [
      { vi: "Task Achievement (Task 1) / Task Response (Task 2) — 25%", en: "Task Achievement (T1) / Task Response (T2) — 25%" },
      { vi: "Coherence & Cohesion — liên kết câu, đoạn, từ nối — 25%", en: "Coherence & Cohesion — sentence/paragraph/connector flow — 25%" },
      { vi: "Lexical Resource — đa dạng từ vựng, collocations, paraphrasing — 25%", en: "Lexical Resource — vocabulary range, collocations, paraphrasing — 25%" },
      { vi: "Grammatical Range & Accuracy — đa dạng cấu trúc + chính xác — 25%", en: "Grammatical Range & Accuracy — variety of structures + accuracy — 25%" },
    ],
    scoringTable: [
      { band: "9.0", raw: "Hoàn hảo / Fully accomplished" },
      { band: "8.0", raw: "Hiếm lỗi · Idiomatic · Cấu trúc phức / Rare errors · Idiomatic" },
      { band: "7.0", raw: "Tốt với một số lỗi nhỏ / Good with minor errors" },
      { band: "6.5", raw: "Khá rõ ràng nhưng thiếu sự đa dạng / Clear but limited range" },
      { band: "6.0", raw: "Đáp ứng task cơ bản · Có lỗi không gây hiểu lầm / Basic task done · Errors don't impede" },
      { band: "5.5", raw: "Lập luận đơn giản · Lỗi xuất hiện thường xuyên / Simple ideas · Frequent errors" },
    ],
    scoringNoteVi: "Điểm Writing = trung bình 4 tiêu chí. Viết DƯỚI từ tối thiểu (150/250) bị trừ điểm Task Achievement nặng. Viết quá dài KHÔNG được điểm thưởng.",
    scoringNoteEn: "Writing band = average of the 4 criteria. Going BELOW the word minimum (150/250) heavily penalises Task Achievement. Writing too long earns no bonus.",
    timeStrategyVi: [
      { phase: "Task 1 — Phân tích", time: "3' đọc đề + chọn 2–3 trends nổi bật" },
      { phase: "Task 1 — Viết", time: "15' (Intro 2' + Overview 3' + Body 1+2 mỗi cái 5')" },
      { phase: "Task 1 — Check", time: "2' đếm từ + sửa ngữ pháp" },
      { phase: "Task 2 — Brainstorm", time: "5' outline 4 đoạn + chọn 2 ideas chính" },
      { phase: "Task 2 — Viết", time: "30' (Intro 3' + Body 1 10' + Body 2 10' + Conclusion 4' + spare 3')" },
      { phase: "Task 2 — Check", time: "5' đếm từ + sửa lỗi tense/article/spelling" },
    ],
    timeStrategyEn: [
      { phase: "Task 1 — Analyse", time: "3' read prompt + pick 2–3 standout trends" },
      { phase: "Task 1 — Write", time: "15' (Intro 2' + Overview 3' + Body 1+2 5' each)" },
      { phase: "Task 1 — Check", time: "2' word count + grammar fix" },
      { phase: "Task 2 — Brainstorm", time: "5' outline 4 paragraphs + select 2 main ideas" },
      { phase: "Task 2 — Write", time: "30' (Intro 3' + Body 1 10' + Body 2 10' + Conclusion 4' + spare 3')" },
      { phase: "Task 2 — Check", time: "5' word count + fix tense/article/spelling" },
    ],
    tipsVi: [
      "Task 1: dành 3 phút phân tích biểu đồ, viết overview rõ ràng — đây là phần BUỘC PHẢI có",
      "Task 1 Academic: tuân thủ rule 1-2-3-3 (1 intro · 2 câu overview · 3 câu body 1 · 3 câu body 2)",
      "Task 1 General: dùng đúng register — formal (Dear Sir/Madam, I am writing to...) vs informal (Hi John, How's it going?)",
      "Task 2: dành 5 phút brainstorm + outline trước khi viết — KHÔNG BAO GIỜ viết thẳng",
      "Dùng linking devices đa dạng: Furthermore, In contrast, By the same token, Granted that, Notwithstanding",
      "Mỗi body paragraph: 1 topic sentence + 2 supporting + 1 example + 1 concluding sentence (cấu trúc PEEL)",
      "Để dành 3–5 phút cuối kiểm tra ngữ pháp (article a/an/the, tense, S-V agreement) và đếm từ",
      "Câu phức (complex) ít nhất 30% bài: dùng although, while, whereas, despite + danh từ",
    ],
    tipsEn: [
      "Task 1: spend 3 min analysing the chart, write a clear overview — this is MANDATORY",
      "Task 1 Academic: follow the 1-2-3-3 rule (1 intro · 2-sentence overview · 3-sentence body 1 · 3-sentence body 2)",
      "Task 1 General: use the right register — formal (Dear Sir/Madam, I am writing to...) vs informal (Hi John, How's it going?)",
      "Task 2: spend 5 min brainstorming + outlining before writing — NEVER dive straight in",
      "Use varied linkers: Furthermore, In contrast, By the same token, Granted that, Notwithstanding",
      "Each body paragraph: 1 topic sentence + 2 supporting + 1 example + 1 concluding sentence (PEEL)",
      "Save 3–5 min at the end to check grammar (a/an/the, tense, S-V agreement) and word count",
      "At least 30% complex sentences: use although, while, whereas, despite + noun",
    ],
    trapsVi: [
      "Task 1: viết quá nhiều dữ liệu mà THIẾU SO SÁNH — examiner cần thấy 'compared to / higher than / nearly double'",
      "Task 1: dùng sai thì — biểu đồ trong quá khứ phải dùng past simple, dự đoán dùng will/be expected to",
      "Task 2: lạc đề khi đề hỏi 2 phần (Two-part question) chỉ trả lời 1 → tự động trừ Task Response",
      "Task 2: opinion thiếu rõ ràng — phải nêu lập trường ngay từ Intro, không 'undermine' giữa bài",
      "Học thuộc câu mẫu nguyên văn → examiner phát hiện và trừ điểm Lexical Resource",
    ],
    trapsEn: [
      "Task 1: cramming data WITHOUT COMPARISON — examiners need to see 'compared to / higher than / nearly double'",
      "Task 1: wrong tense — past charts need past simple; predictions need will/be expected to",
      "Task 2: going off-topic on Two-part questions by answering only one → auto-penalty in Task Response",
      "Task 2: unclear opinion — state your stance from the Intro, don't undermine it mid-essay",
      "Memorising templates verbatim → examiners spot it and dock Lexical Resource",
    ],
    vocabFocusVi: "Trend verbs (surge, plummet, plateau), comparative structures, hedging language (it could be argued, arguably), academic nouns + collocations.",
    vocabFocusEn: "Trend verbs (surge, plummet, plateau), comparative structures, hedging language (it could be argued, arguably), academic nouns + collocations.",
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
    formatVi: "Đề chung Academic và GT. Examiner người bản xứ. Có thể thi computer-delivered hoặc paper-based.",
    formatEn: "Same questions for Academic and GT. Native examiner. Available as computer-delivered or paper-based.",
    sectionsVi: [
      { title: "Part 1 (4–5 phút)", desc: "Introduction & interview: examiner check ID + hỏi 3 chủ đề quen thuộc (work/study, hometown, hobbies, family, food, travel...). 3–4 câu mỗi chủ đề.", meta: "Trả lời 30–45s/câu · Tự nhiên" },
      { title: "Part 2 — Long turn (3–4 phút)", desc: "Cue card: nhận đề bài + giấy bút + 1 phút chuẩn bị + nói 1.5–2 phút liên tục. Sau đó examiner hỏi 1–2 câu follow-up.", meta: "Cue card 4 bullet · Speak 2 min" },
      { title: "Part 3 — Two-way discussion (4–5 phút)", desc: "Thảo luận sâu các vấn đề liên quan Part 2 — phân tích, so sánh hiện tại–quá khứ, dự đoán tương lai, đánh giá xã hội. Yêu cầu trả lời lập luận chặt chẽ.", meta: "Phân tích · Speculate · Evaluate" },
    ],
    sectionsEn: [
      { title: "Part 1 (4–5 min)", desc: "Intro & interview: examiner checks ID + asks 3 familiar topics (work/study, hometown, hobbies, family, food, travel...). 3–4 questions per topic.", meta: "Reply 30–45s · Natural" },
      { title: "Part 2 — Long turn (3–4 min)", desc: "Cue card: receive prompt + paper + 1 min prep + speak 1.5–2 min continuously. Then examiner asks 1–2 follow-ups.", meta: "Cue card 4 bullets · Speak 2 min" },
      { title: "Part 3 — Two-way discussion (4–5 min)", desc: "Deep discussion linked to Part 2 — analyse, compare past–present, predict future, evaluate society. Demands well-reasoned answers.", meta: "Analyse · Speculate · Evaluate" },
    ],
    questionTypesList: [
      { vi: "Fluency & Coherence — trôi chảy, không pause dài, ý mạch lạc — 25%", en: "Fluency & Coherence — smooth flow, no long pauses, coherent ideas — 25%" },
      { vi: "Lexical Resource — đa dạng từ, idioms, paraphrasing — 25%", en: "Lexical Resource — vocabulary range, idioms, paraphrasing — 25%" },
      { vi: "Grammatical Range & Accuracy — câu phức + chính xác — 25%", en: "Grammatical Range & Accuracy — complex sentences + accuracy — 25%" },
      { vi: "Pronunciation — âm chuẩn, sentence stress, intonation, connected speech — 25%", en: "Pronunciation — clear sounds, sentence stress, intonation, connected speech — 25%" },
    ],
    scoringTable: [
      { band: "9.0", raw: "Native-like · Fully natural" },
      { band: "8.0", raw: "Trôi chảy, lỗi hiếm · Idioms tự nhiên / Fluent, rare errors · Natural idioms" },
      { band: "7.0", raw: "Nói dài không khó khăn · Vài hesitations / Speaks at length easily · Some hesitation" },
      { band: "6.5", raw: "Sẵn sàng nói · Đôi chỗ ngập ngừng tìm từ / Willing to speak · Occasional word-search" },
      { band: "6.0", raw: "Truyền đạt rõ · Pause khi tìm từ/grammar / Conveys meaning · Pauses for word/grammar" },
      { band: "5.5", raw: "Tiếp tục nói được nhưng nhiều lặp/tự sửa / Keeps going but with repetition/self-correction" },
    ],
    scoringNoteVi: "Điểm Speaking = trung bình 4 tiêu chí. Im lặng >5 giây = trừ Fluency. Tự sửa lỗi liên tục = trừ Fluency. Lặp từ vựng = trừ Lexical.",
    scoringNoteEn: "Speaking band = average of 4 criteria. Silence >5 sec = lower Fluency. Constant self-correction = lower Fluency. Repetition = lower Lexical.",
    timeStrategyVi: [
      { phase: "Part 1 — mỗi câu", time: "30–45 giây · 2–3 câu trả lời + lý do/ví dụ" },
      { phase: "Part 2 — chuẩn bị", time: "60s vẽ mind-map theo 4 bullet trên cue card" },
      { phase: "Part 2 — nói", time: "90–120 giây liên tục · Theo cấu trúc 4 bullet + kết luận" },
      { phase: "Part 3 — mỗi câu", time: "45–60 giây · Lập luận: claim + reason + example" },
    ],
    timeStrategyEn: [
      { phase: "Part 1 — per question", time: "30–45 sec · 2–3 sentences + reason/example" },
      { phase: "Part 2 — prep", time: "60s mind-map following the 4 cue-card bullets" },
      { phase: "Part 2 — speak", time: "90–120 sec continuously · Cover 4 bullets + closing" },
      { phase: "Part 3 — per question", time: "45–60 sec · Argue: claim + reason + example" },
    ],
    tipsVi: [
      "Part 1: trả lời 2–3 câu (không quá ngắn 'Yes', không quá dài như Part 3), thêm lý do/ví dụ ngắn",
      "Part 2: dùng 1 phút chuẩn bị để vẽ mind-map theo 4 bullet trên cue card — KHÔNG viết thành câu",
      "Part 2: bắt đầu bằng 'I'd like to talk about...' và kết bằng 'Overall, this is something I really...'",
      "Part 3: dùng 'discourse markers' (Well, that's a tricky one... / I'd say... / It really depends on...) để câu giờ tự nhiên",
      "Phát âm: tập trung vào sentence stress + intonation hơn là âm chuẩn 100% — examiner ưu tiên dễ hiểu",
      "Dùng idioms/collocations tự nhiên (in the long run, by and large, hit the books) — không lạm dụng quá 3 lần/bài",
      "Không bao giờ học thuộc lòng câu trả lời — giám khảo SẼ phát hiện và trừ điểm nặng",
      "Sửa lỗi nhỏ với 'I mean...' thay vì 'sorry sorry' — tự nhiên và không trừ điểm",
    ],
    tipsEn: [
      "Part 1: answer 2–3 sentences (not just 'Yes', not as long as Part 3), add a brief reason/example",
      "Part 2: use the 1 min prep to mind-map the 4 cue-card bullets — DON'T write full sentences",
      "Part 2: open with 'I'd like to talk about...' and close with 'Overall, this is something I really...'",
      "Part 3: use discourse markers ('Well, that's a tricky one...' / 'I'd say...' / 'It really depends on...') to buy time naturally",
      "Pronunciation: focus on sentence stress + intonation rather than 100% perfect sounds — examiners prioritise clarity",
      "Use natural idioms/collocations (in the long run, by and large, hit the books) — max 3 per test",
      "NEVER memorise scripted answers — examiners WILL detect this and dock heavily",
      "Self-correct small slips with 'I mean...' instead of 'sorry sorry' — natural and unpenalised",
    ],
    trapsVi: [
      "Dùng từ vựng quá 'sách vở' không tự nhiên ('I am exceedingly fond of...' thay vì 'I really love')",
      "Im lặng >5 giây trong Part 2 hoặc Part 3 — examiner đánh giá Fluency thấp ngay lập tức",
      "Trả lời Part 1 chỉ với 'Yes/No' hoặc 1 câu cụt → mất cơ hội thể hiện ngôn ngữ",
      "Nói lan man trong Part 2 mà không bám 4 bullet → trừ Coherence",
      "Dùng grammar đơn giản suốt bài (chỉ present simple) → trừ Grammatical Range",
    ],
    trapsEn: [
      "Using overly 'bookish' vocab ('I am exceedingly fond of...' instead of 'I really love')",
      "Going silent >5 sec in Part 2 or Part 3 — examiners immediately mark down Fluency",
      "Answering Part 1 with just 'Yes/No' or one short sentence → wasting language showcase",
      "Rambling in Part 2 without covering the 4 bullets → lower Coherence",
      "Using only simple grammar throughout (just present simple) → lower Grammatical Range",
    ],
    vocabFocusVi: "Topic-based vocab (work, education, environment, technology), idioms, phrasal verbs, hedging (I suppose, it seems to me), opinion phrases.",
    vocabFocusEn: "Topic-based vocab (work, education, environment, technology), idioms, phrasal verbs, hedging (I suppose, it seems to me), opinion phrases.",
  },
];

interface RoadmapSkillGoal {
  vi: string;
  en: string;
}
interface RoadmapStage {
  bandVi: string;
  bandEn: string;
  levelVi: string;
  levelEn: string;
  durationVi: string;
  durationEn: string;
  color: string;
  accentColor: string;
  icon: typeof GraduationCap;
  prerequisiteVi: string;
  prerequisiteEn: string;
  vocabSizeVi: string;
  vocabSizeEn: string;
  grammarVi: string;
  grammarEn: string;
  listening: RoadmapSkillGoal;
  reading: RoadmapSkillGoal;
  writing: RoadmapSkillGoal;
  speaking: RoadmapSkillGoal;
  weeklyHoursVi: string;
  weeklyHoursEn: string;
  materialsVi: string[];
  materialsEn: string[];
  outcomeVi: string;
  outcomeEn: string;
}

const roadmap: RoadmapStage[] = [
  {
    bandVi: "Band 4.0 — 5.0",
    bandEn: "Band 4.0 — 5.0",
    levelVi: "Cơ bản · Foundation",
    levelEn: "Foundation Level",
    durationVi: "8–12 tuần (~2 tháng)",
    durationEn: "8–12 weeks (~2 months)",
    color: "from-rose-500/20 to-rose-500/5",
    accentColor: "rose",
    icon: GraduationCap,
    prerequisiteVi: "Đầu vào: A1–A2 (KET) hoặc chưa từng học IELTS · Biết bảng chữ cái + cấu trúc câu cơ bản",
    prerequisiteEn: "Entry: A1–A2 (KET) or no prior IELTS · Knows alphabet + basic sentence structure",
    vocabSizeVi: "1,500 từ vựng A2–B1 theo 20 chủ đề (Family, Food, Travel, Work, Education...)",
    vocabSizeEn: "1,500 A2–B1 words across 20 topics (Family, Food, Travel, Work, Education...)",
    grammarVi: "12 thì cơ bản · Câu điều kiện loại 0/1/2 · Mệnh đề quan hệ who/which/that · So sánh hơn/nhất · Modal verbs",
    grammarEn: "12 basic tenses · Conditionals 0/1/2 · Relative clauses who/which/that · Comparatives/superlatives · Modal verbs",
    listening: {
      vi: "Nghe Section 1–2 · Nhận diện số, ngày, tên · Mục tiêu 18–22/40 câu",
      en: "Listen to Section 1–2 · Recognise numbers, dates, names · Target 18–22/40 questions",
    },
    reading: {
      vi: "Đọc Passage 1 (~700 từ) · Skim & scan · True/False/NG đơn giản · Mục tiêu 18–22/40",
      en: "Read Passage 1 (~700 words) · Skim & scan · Simple True/False/NG · Target 18–22/40",
    },
    writing: {
      vi: "Viết câu đơn 10–15 từ · Đoạn văn 50 từ · Tập viết Task 1 mô tả 1 biểu đồ đơn giản",
      en: "Write simple sentences 10–15 words · 50-word paragraphs · Practise Task 1 with one simple chart",
    },
    speaking: {
      vi: "Trả lời Part 1 với 1–2 câu · Tự giới thiệu · Hỏi-đáp về sở thích, gia đình, quê hương",
      en: "Answer Part 1 with 1–2 sentences · Self-introduction · Q&A about hobbies, family, hometown",
    },
    weeklyHoursVi: "8–10 giờ/tuần (5 buổi · 90 phút/buổi + tự học)",
    weeklyHoursEn: "8–10 hrs/week (5 sessions · 90 min/session + self-study)",
    materialsVi: [
      "Cambridge English File Pre-Intermediate",
      "Mindset for IELTS Foundation",
      "Oxford Word Skills Basic",
      "BBC Learning English (6 Minute English level 1)",
    ],
    materialsEn: [
      "Cambridge English File Pre-Intermediate",
      "Mindset for IELTS Foundation",
      "Oxford Word Skills Basic",
      "BBC Learning English (6 Minute English level 1)",
    ],
    outcomeVi: "🎯 Kết thúc: Đạt Band 4.5–5.0 trong mock test · Hiểu được hội thoại đời sống đơn giản · Viết được email/đoạn ngắn",
    outcomeEn: "🎯 Outcome: Reach Band 4.5–5.0 on mock test · Understand simple everyday conversations · Write short emails/paragraphs",
  },
  {
    bandVi: "Band 5.5 — 6.0",
    bandEn: "Band 5.5 — 6.0",
    levelVi: "Trung cấp · Pre-Intermediate",
    levelEn: "Pre-Intermediate",
    durationVi: "10–14 tuần (~3 tháng)",
    durationEn: "10–14 weeks (~3 months)",
    color: "from-amber-500/20 to-amber-500/5",
    accentColor: "amber",
    icon: Target,
    prerequisiteVi: "Đầu vào: Band 4.5–5.0 hoặc B1 (PET) · Đã quen 4 dạng bài thi · Có vốn 1,500 từ",
    prerequisiteEn: "Entry: Band 4.5–5.0 or B1 (PET) · Familiar with 4 test sections · 1,500-word base",
    vocabSizeVi: "Tích lũy đến 2,500 từ B1–B2 · Bắt đầu academic vocabulary (AWL Sublist 1–4) · Collocations theo chủ đề",
    vocabSizeEn: "Build to 2,500 B1–B2 words · Start academic vocabulary (AWL Sublist 1–4) · Topic-based collocations",
    grammarVi: "Bị động (passive) · Câu phức · Đảo ngữ cơ bản · Câu nhấn mạnh (cleft) · Reported speech · Linking words logic",
    grammarEn: "Passive voice · Complex sentences · Basic inversion · Cleft sentences · Reported speech · Logical linkers",
    listening: {
      vi: "Nghe Section 3–4 · Multi-speaker · Map labelling cơ bản · Mục tiêu 23–28/40 câu",
      en: "Listen to Section 3–4 · Multi-speaker · Basic map labelling · Target 23–28/40 questions",
    },
    reading: {
      vi: "Hoàn thành 2 passages trong 35' · Matching headings · Sentence completion · Mục tiêu 23–27/40",
      en: "Complete 2 passages in 35' · Matching headings · Sentence completion · Target 23–27/40",
    },
    writing: {
      vi: "Task 1: mô tả line/bar/pie chart 150+ từ · Task 2: Opinion essay 4 đoạn 250+ từ · Tập linking devices",
      en: "Task 1: describe line/bar/pie chart 150+ words · Task 2: Opinion essay 4 paragraphs 250+ words · Practise linking devices",
    },
    speaking: {
      vi: "Part 1: trả lời tự nhiên 30–45s/câu · Part 2: bắt đầu cue card · Part 3: trả lời 2–3 câu lập luận",
      en: "Part 1: natural 30–45s answers · Part 2: start cue cards · Part 3: 2–3 reasoned sentences",
    },
    weeklyHoursVi: "10–12 giờ/tuần (5 buổi · 100 phút/buổi + 30 phút self-study/ngày)",
    weeklyHoursEn: "10–12 hrs/week (5 sessions · 100 min/session + 30 min daily self-study)",
    materialsVi: [
      "Cambridge IELTS Practice Tests Books 11–13",
      "Vocabulary for IELTS (Pauline Cullen)",
      "Grammar for IELTS (Diana Hopkins)",
      "BBC Learning English (English At Work + Drama)",
    ],
    materialsEn: [
      "Cambridge IELTS Practice Tests Books 11–13",
      "Vocabulary for IELTS (Pauline Cullen)",
      "Grammar for IELTS (Diana Hopkins)",
      "BBC Learning English (English At Work + Drama)",
    ],
    outcomeVi: "🎯 Kết thúc: Đạt Band 5.5–6.0 trong mock test · Viết được Task 1 + Task 2 cơ bản · Nói được 1.5 phút trong Part 2",
    outcomeEn: "🎯 Outcome: Reach Band 5.5–6.0 on mock test · Write basic Task 1 + Task 2 · Speak 1.5 min in Part 2",
  },
  {
    bandVi: "Band 6.5 — 7.0",
    bandEn: "Band 6.5 — 7.0",
    levelVi: "Khá giỏi · Upper-Intermediate",
    levelEn: "Upper-Intermediate",
    durationVi: "12–16 tuần (~4 tháng)",
    durationEn: "12–16 weeks (~4 months)",
    color: "from-emerald-500/20 to-emerald-500/5",
    accentColor: "emerald",
    icon: TrendingUp,
    prerequisiteVi: "Đầu vào: Band 6.0 hoặc B2 (FCE) · Đã làm được Task 1 + Task 2 đủ từ · Hiểu được Listening Section 4",
    prerequisiteEn: "Entry: Band 6.0 or B2 (FCE) · Can write Task 1 + Task 2 to word count · Understands Listening Section 4",
    vocabSizeVi: "Tích lũy 4,000 từ B2–C1 · AWL Sublist 5–10 · Synonym banks 3 cấp độ · Idioms theo chủ đề Speaking",
    vocabSizeEn: "Build to 4,000 B2–C1 words · AWL Sublist 5–10 · 3-level synonym banks · Speaking-topic idioms",
    grammarVi: "Mixed conditionals · Subjunctive · Inversion nâng cao · Participle clauses · Phrasal verbs nâng cao · Hedging",
    grammarEn: "Mixed conditionals · Subjunctive · Advanced inversion · Participle clauses · Advanced phrasal verbs · Hedging",
    listening: {
      vi: "Hoàn thành 4 sections trong 30' · Distractor detection · Map + diagram labelling · Mục tiêu 30–32/40",
      en: "Complete 4 sections in 30' · Distractor detection · Map + diagram labelling · Target 30–32/40",
    },
    reading: {
      vi: "Hoàn thành 3 passages trong 60' · Yes/No/NG · Summary completion · Scanning tốc độ · Mục tiêu 30–32/40",
      en: "Complete 3 passages in 60' · Yes/No/NG · Summary completion · Fast scanning · Target 30–32/40",
    },
    writing: {
      vi: "Task 1: rule 1-2-3-3 (overview rõ ràng + so sánh data sắc bén) · Task 2: thesis sắc bén + PEEL paragraphs + linking nâng cao",
      en: "Task 1: 1-2-3-3 rule (clear overview + sharp data comparison) · Task 2: sharp thesis + PEEL paragraphs + advanced linking",
    },
    speaking: {
      vi: "Part 2: nói liên tục 1.5–2 phút theo 4 bullet · Part 3: phân tích nguyên nhân–hệ quả · Idioms tự nhiên",
      en: "Part 2: speak continuously 1.5–2 min covering 4 bullets · Part 3: cause-effect analysis · Natural idioms",
    },
    weeklyHoursVi: "12–15 giờ/tuần (5 buổi · 120 phút/buổi + 1 giờ self-study/ngày + 1 mock test/tuần)",
    weeklyHoursEn: "12–15 hrs/week (5 sessions · 120 min/session + 1 hr daily self-study + 1 mock test/week)",
    materialsVi: [
      "Cambridge IELTS Practice Tests Books 14–17",
      "IELTS Trainer 2 (Cambridge)",
      "Improve Your IELTS Writing Skills (Macmillan)",
      "TED-Ed + The Economist (Reading)",
      "IELTS Speaking Mr. Hai's curated cue cards (200+)",
    ],
    materialsEn: [
      "Cambridge IELTS Practice Tests Books 14–17",
      "IELTS Trainer 2 (Cambridge)",
      "Improve Your IELTS Writing Skills (Macmillan)",
      "TED-Ed + The Economist (Reading)",
      "IELTS Speaking Mr. Hai's curated cue cards (200+)",
    ],
    outcomeVi: "🎯 Kết thúc: Đạt Band 6.5–7.0 trong mock test · Đủ điều kiện apply đại học/visa hầu hết các nước",
    outcomeEn: "🎯 Outcome: Reach Band 6.5–7.0 on mock test · Eligible for most university/visa applications worldwide",
  },
  {
    bandVi: "Band 7.5 — 8.0+",
    bandEn: "Band 7.5 — 8.0+",
    levelVi: "Nâng cao · Advanced",
    levelEn: "Advanced",
    durationVi: "10–14 tuần luyện chuyên sâu",
    durationEn: "10–14 weeks intensive",
    color: "from-violet-500/20 to-violet-500/5",
    accentColor: "violet",
    icon: Award,
    prerequisiteVi: "Đầu vào: Band 7.0 ổn định · Đã thi thật ít nhất 1 lần · Cần điểm cao cho học bổng / Master's / PhD / di trú",
    prerequisiteEn: "Entry: Stable Band 7.0 · Has taken real test at least once · Needs high score for scholarship / Master's / PhD / migration",
    vocabSizeVi: "5,000+ từ C1–C2 · Less-common collocations · Idioms tinh tế · Academic hedging language · Discourse markers",
    vocabSizeEn: "5,000+ C1–C2 words · Less-common collocations · Subtle idioms · Academic hedging language · Discourse markers",
    grammarVi: "Đảo ngữ phức (Hardly had... when...) · Ellipsis · Cleft sentences nâng cao · Subjunctive · Conditional inversion · Nominalisation",
    grammarEn: "Complex inversion (Hardly had... when...) · Ellipsis · Advanced cleft sentences · Subjunctive · Conditional inversion · Nominalisation",
    listening: {
      vi: "Hoàn thành 4 sections với 35–37/40 câu · Predict đáp án trước khi nghe · Note-taking shorthand cá nhân hóa",
      en: "Complete 4 sections with 35–37/40 correct · Predict answers before listening · Personalised shorthand note-taking",
    },
    reading: {
      vi: "Hoàn thành 3 passages trong 55' (dư 5' check) · Đạt 35+/40 · Xử lý passages C1 với 1,200+ từ",
      en: "Complete 3 passages in 55' (5' spare for check) · Achieve 35+/40 · Handle C1 passages 1,200+ words",
    },
    writing: {
      vi: "Task 1: phân tích chính xác trends + comparison + projection · Task 2: thesis sắc bén · Cấu trúc lập luận đa chiều · Linking tinh tế",
      en: "Task 1: precise trends + comparison + projection · Task 2: sharp thesis · Multi-angle argumentation · Subtle linking",
    },
    speaking: {
      vi: "Part 2 + Part 3: discourse markers tự nhiên · Hedging · Near-native intonation · Idioms tinh tế · Phân tích sâu sắc",
      en: "Part 2 + Part 3: natural discourse markers · Hedging · Near-native intonation · Subtle idioms · Deep analysis",
    },
    weeklyHoursVi: "15–20 giờ/tuần (5 buổi · 150 phút + 2 mock tests/tuần + 1-on-1 feedback writing/speaking)",
    weeklyHoursEn: "15–20 hrs/week (5 sessions · 150 min + 2 mock tests/week + 1-on-1 writing/speaking feedback)",
    materialsVi: [
      "Cambridge IELTS Practice Tests Books 18+",
      "Mindset for IELTS Level 3 (Advanced)",
      "Official IELTS Practice Materials (British Council)",
      "The Guardian + The Atlantic (Reading)",
      "BBC Hard Talk + Intelligence Squared (Listening)",
      "Mr. Hai's Band 8.0 Writing & Speaking templates",
    ],
    materialsEn: [
      "Cambridge IELTS Practice Tests Books 18+",
      "Mindset for IELTS Level 3 (Advanced)",
      "Official IELTS Practice Materials (British Council)",
      "The Guardian + The Atlantic (Reading)",
      "BBC Hard Talk + Intelligence Squared (Listening)",
      "Mr. Hai's Band 8.0 Writing & Speaking templates",
    ],
    outcomeVi: "🎯 Kết thúc: Đạt Band 7.5–8.0+ trong mock test · Đủ điều kiện học bổng Chevening, Erasmus, Fulbright · Migration skill assessment top tier",
    outcomeEn: "🎯 Outcome: Reach Band 7.5–8.0+ on mock test · Eligible for Chevening, Erasmus, Fulbright scholarships · Top-tier migration skill assessment",
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
                    <p className="text-xs text-muted-foreground italic mt-2 leading-relaxed">
                      {t(skill.formatVi, skill.formatEn)}
                    </p>
                  </div>
                </div>

                {/* Sections */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> {t("Cấu trúc chi tiết theo phần", "Detailed structure by section")}
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(t("vi", "en") === "vi" ? skill.sectionsVi : skill.sectionsEn).map((s, idx) => (
                      <div key={idx} className="rounded-lg bg-background/60 p-3 border border-border/50">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-foreground">{s.title}</p>
                          {s.meta && (
                            <span className="shrink-0 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {s.meta}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question types list */}
                <div className="mb-5 rounded-lg bg-background/60 p-4 border border-border/50">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ListChecks className="w-3.5 h-3.5" /> {t("Dạng câu hỏi & Tiêu chí chấm", "Question types & Scoring criteria")}
                  </p>
                  <ul className="grid md:grid-cols-2 gap-x-4 gap-y-1.5">
                    {skill.questionTypesList.map((q, idx) => (
                      <li key={idx} className="text-sm text-foreground/85 flex gap-2">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        <span>{t(q.vi, q.en)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scoring table + Time strategy */}
                <div className="grid md:grid-cols-2 gap-3 mb-5">
                  <div className="rounded-lg bg-background/60 p-4 border border-border/50">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" /> {t("Bảng quy đổi điểm", "Band conversion table")}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border/50 text-foreground/70">
                            <th className="text-left py-1.5 font-semibold">{t("Band", "Band")}</th>
                            <th className="text-left py-1.5 font-semibold">{t("Điểm thô / Mô tả", "Raw / Description")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {skill.scoringTable.map((row, idx) => (
                            <tr key={idx} className="border-b border-border/30 last:border-0">
                              <td className="py-1.5 font-bold text-primary">{row.band}</td>
                              <td className="py-1.5 text-foreground/85">{row.raw}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-2 leading-relaxed">
                      {t(skill.scoringNoteVi, skill.scoringNoteEn)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-background/60 p-4 border border-border/50">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5" /> {t("Chiến lược phân bổ thời gian", "Time allocation strategy")}
                    </p>
                    <ul className="space-y-2">
                      {(t("vi", "en") === "vi" ? skill.timeStrategyVi : skill.timeStrategyEn).map((s, idx) => (
                        <li key={idx} className="text-xs flex items-start gap-2">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center mt-0.5">{idx + 1}</span>
                          <div>
                            <span className="font-semibold text-foreground">{s.phase}: </span>
                            <span className="text-muted-foreground">{s.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Vocab focus */}
                <div className="mb-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5" /> {t("Từ vựng & Ngữ pháp trọng tâm", "Vocabulary & Grammar focus")}
                  </p>
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {t(skill.vocabFocusVi, skill.vocabFocusEn)}
                  </p>
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

                {/* Common traps (now plural) */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> {t("Các bẫy thường gặp", "Common traps")}
                  </p>
                  <ul className="space-y-1.5">
                    {(t("vi", "en") === "vi" ? skill.trapsVi : skill.trapsEn).map((trap, idx) => (
                      <li key={idx} className="text-sm text-foreground/85 flex gap-2">
                        <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
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
