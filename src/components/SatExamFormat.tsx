/**
 * @file SatExamFormat.tsx
 * @description Detailed Digital SAT exam format + 30-week curriculum for teachers and learners.
 * Renders the format, the adaptive mechanism, a 30-week week-by-week plan with
 * teacher/learner tasks + assessment + linked lesson chips, and common pitfalls.
 * @author HaiEduTech
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  BookOpen,
  Calculator,
  Target,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Layers,
  Flag,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { allEnglishModules } from "@/data/languageCurriculum";

// ─────────────────────────────────────────────────────────────────────
// Lesson chip - looks up a lesson by id across SAT modules and renders
// a clickable badge with the human-readable title.
// ─────────────────────────────────────────────────────────────────────
type LessonRef = { lessonId: string; moduleId: string; title: string; titleEn: string };

const SatExamFormat = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  // Build lookup of every SAT lesson once.
  const satLessonIndex = useMemo<Record<string, LessonRef>>(() => {
    const map: Record<string, LessonRef> = {};
    for (const mod of allEnglishModules) {
      if (mod.category !== "sat") continue;
      for (const lesson of mod.lessons) {
        map[lesson.id] = {
          lessonId: lesson.id,
          moduleId: mod.id,
          title: lesson.title,
          titleEn: lesson.titleEn,
        };
      }
    }
    return map;
  }, []);

  // ─────────────────────────────────────────────────────────────────────
  // 1. Test format - Digital SAT (adaptive, 2 sections)
  // ─────────────────────────────────────────────────────────────────────
  const SECTIONS = [
    {
      icon: BookOpen,
      gradient: "from-emerald-500 to-teal-600",
      name: t("Reading & Writing", "Reading & Writing"),
      modules: t("2 module · 27 câu/module", "2 modules · 27 questions/module"),
      time: t("64 phút (32 phút/module)", "64 minutes (32 min/module)"),
      score: t("200–800 điểm", "200–800 points"),
      perQ: t("≈ 71 giây/câu", "≈ 71 sec/question"),
      content: [
        t("Craft & Structure (≈28%): Words in Context, Text Structure & Purpose, Cross-Text Connections.",
          "Craft & Structure (~28%): Words in Context, Text Structure & Purpose, Cross-Text Connections."),
        t("Information & Ideas (≈26%): Central Ideas, Command of Evidence (text + quantitative), Inferences.",
          "Information & Ideas (~26%): Central Ideas, Command of Evidence (text + quantitative), Inferences."),
        t("Standard English Conventions (≈26%): Boundaries (dấu câu), Form/Structure/Sense (ngữ pháp).",
          "Standard English Conventions (~26%): Boundaries (punctuation), Form/Structure/Sense (grammar)."),
        t("Expression of Ideas (≈20%): Rhetorical Synthesis & Transitions.",
          "Expression of Ideas (~20%): Rhetorical Synthesis & Transitions."),
      ],
    },
    {
      icon: Calculator,
      gradient: "from-sky-500 to-indigo-600",
      name: t("Math", "Math"),
      modules: t("2 module · 22 câu/module", "2 modules · 22 questions/module"),
      time: t("70 phút (35 phút/module)", "70 minutes (35 min/module)"),
      score: t("200–800 điểm", "200–800 points"),
      perQ: t("≈ 95 giây/câu", "≈ 95 sec/question"),
      content: [
        t("Algebra (≈35%): phương trình & bất phương trình tuyến tính, hệ phương trình.",
          "Algebra (~35%): linear equations & inequalities, systems."),
        t("Advanced Math (≈35%): hàm bậc 2, hàm mũ, đa thức, biểu thức tương đương.",
          "Advanced Math (~35%): quadratics, exponentials, polynomials, equivalent expressions."),
        t("Problem-Solving & Data Analysis (≈15%): tỉ lệ, %, xác suất, biểu đồ.",
          "Problem-Solving & Data Analysis (~15%): ratios, %, probability, charts."),
        t("Geometry & Trigonometry (≈15%): tam giác, đường tròn, tỉ số lượng giác cơ bản.",
          "Geometry & Trigonometry (~15%): triangles, circles, basic trig ratios."),
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────────────────
  // 2. Adaptive flow + scoring
  // ─────────────────────────────────────────────────────────────────────
  const ADAPTIVE = [
    t("Module 1 dùng câu hỏi độ khó trung bình cho mọi thí sinh.",
      "Module 1 uses medium-difficulty questions for every test-taker."),
    t("Hiệu suất Module 1 quyết định Module 2: 'Easier' (cận điểm thấp/trung) hay 'Harder' (cận 700–800).",
      "Module 1 performance routes you to Module 2: 'Easier' (low–mid range) or 'Harder' (700–800 ceiling)."),
    t("Chỉ thí sinh vào module 'Harder' mới có thể đạt mức 750+. Vì vậy Module 1 cần làm chậm – chắc.",
      "Only test-takers routed to the 'Harder' module can reach 750+. So Module 1 must be slow & careful."),
    t("Tổng điểm: 400–1600. Quy đổi thang điểm dựa trên cả số câu đúng và độ khó module 2.",
      "Total: 400–1600. Scaled by both correct count and Module 2 difficulty."),
  ];

  // ─────────────────────────────────────────────────────────────────────
  // 3. 30-week curriculum (4 phases)
  // Each week: phase, topic, teacher tasks, learner tasks, assessment, lessons.
  // ─────────────────────────────────────────────────────────────────────
  type Week = {
    week: string;
    phase: "foundation" | "skills" | "strategy" | "mastery";
    topic: string;
    teacher: string;
    learner: string;
    assessment: string;
    lessons: string[];
  };

  const PHASE_META: Record<Week["phase"], { label: string; gradient: string; tone: string }> = {
    foundation: {
      label: t("Giai đoạn 1 · Nền móng", "Phase 1 · Foundation"),
      gradient: "from-emerald-500 to-teal-600",
      tone: "border-emerald-500/40 bg-emerald-500/5",
    },
    skills: {
      label: t("Giai đoạn 2 · Kỹ năng", "Phase 2 · Skills"),
      gradient: "from-sky-500 to-indigo-600",
      tone: "border-sky-500/40 bg-sky-500/5",
    },
    strategy: {
      label: t("Giai đoạn 3 · Chiến thuật", "Phase 3 · Strategy"),
      gradient: "from-amber-500 to-orange-600",
      tone: "border-amber-500/40 bg-amber-500/5",
    },
    mastery: {
      label: t("Giai đoạn 4 · Bứt phá", "Phase 4 · Mastery"),
      gradient: "from-violet-500 to-fuchsia-600",
      tone: "border-violet-500/40 bg-violet-500/5",
    },
  };

  const WEEKS: Week[] = [
    // ─── Phase 1 · Foundation (Weeks 1–8) ───────────────────────────────
    {
      week: t("Tuần 1", "Week 1"),
      phase: "foundation",
      topic: t("Diagnostic + làm quen Bluebook", "Diagnostic + Bluebook orientation"),
      teacher: t(
        "Cho làm đề chẩn đoán Bluebook đầy đủ (2h14'). Phân loại 3 nhóm (<450 / 450–650 / >650) cho cả R&W và Math. Tạo Google Sheet error log dùng chung lớp.",
        "Run a full Bluebook diagnostic (2h14'). Bucket students into <450 / 450–650 / >650 for both R&W and Math. Set up a class-wide Google Sheet error log."
      ),
      learner: t(
        "Hoàn thành 1 module R&W + 1 module Math. Đăng nhập Bluebook, học cách dùng Annotate, Mark for Review, Reference Sheet, Desmos.",
        "Complete 1 R&W + 1 Math module. Log into Bluebook; learn Annotate, Mark for Review, Reference Sheet, Desmos."
      ),
      assessment: t("Diagnostic baseline score", "Diagnostic baseline score"),
      lessons: [
        "sat-meet-the-test",
        "sat-test-mindset-101",
        "sat-question-types-tour",
        "sat-bluebook-four-tools",
      ],
    },
    {
      week: t("Tuần 2", "Week 2"),
      phase: "foundation",
      topic: t("Reading: Words in Context (đợt 1)", "Reading: Words in Context (set 1)"),
      teacher: t(
        "Dạy chiến lược predict-then-pick: che 4 đáp án, dự đoán từ trước. Yêu cầu học sinh gạch 1 'context clue' mỗi câu.",
        "Teach predict-then-pick: cover the 4 choices and predict the word. Require one underlined context clue per item."
      ),
      learner: t(
        "Học 80 từ vựng SAT cao tần Set 1. Drill 30 câu Words in Context và viết clue cho từng câu.",
        "Master 80 high-frequency SAT words (Set 1). Drill 30 Words-in-Context items and log a clue per question."
      ),
      assessment: t("Quiz 30 câu Words in Context · mục tiêu ≥ 80%", "30-Q Words-in-Context quiz · target ≥ 80%"),
      lessons: [
        "sat-vocab-warmup-30",
        "sat-reading-mini-1",
        "sat-reading-mini-3",
        "sat-vocab-set1",
        "sat-rw-words-context",
        "sat-predict-then-pick",
      ],
    },
    {
      week: t("Tuần 3", "Week 3"),
      phase: "foundation",
      topic: t("Reading: Inference + Command of Evidence", "Reading: Inference + Command of Evidence"),
      teacher: t(
        "Hướng dẫn 'evidence pairing': mỗi inference phải dẫn được 1 dòng cụ thể. Phân biệt 'inferred' vs 'stated'.",
        "Teach 'evidence pairing': every inference must cite a specific line. Distinguish 'inferred' vs 'stated'."
      ),
      learner: t(
        "Drill 25 câu Inference + 25 câu Command of Evidence. Bắt buộc viết line reference cho mỗi câu.",
        "Drill 25 Inference + 25 Command-of-Evidence items. Always write a line reference."
      ),
      assessment: t("Mini-test 50 câu · phân tích sai theo 3 bucket", "50-Q mini-test · classify misses by 3 buckets"),
      lessons: ["sat-reading-mini-2", "sat-inference-questions", "sat-rw-evidence-reading", "sat-rw-command-evidence"],
    },
    {
      week: t("Tuần 4", "Week 4"),
      phase: "foundation",
      topic: t("Conventions: Boundaries (dấu câu)", "Conventions: Boundaries (punctuation)"),
      teacher: t(
        "Dạy 4 dấu chính: , ; : -. So sánh cặp câu đúng/sai. Quy tắc 'comma không nối được 2 mệnh đề độc lập' (comma splice).",
        "Teach the 4 key marks: , ; : -. Use right-vs-wrong sentence pairs. Drill the 'comma splice' rule."
      ),
      learner: t(
        "Drill 60 câu dấu câu. Tự tạo 10 ví dụ cho mỗi dấu. Mục tiêu ≥ 90% trên drill cuối tuần.",
        "Drill 60 punctuation items. Write 10 personal examples per mark. Target ≥ 90% on the end-of-week drill."
      ),
      assessment: t("Drill 60 câu dấu câu · ≥ 90%", "60-Q punctuation drill · ≥ 90%"),
      lessons: ["sat-rw-conventions", "sat-punct-four-marks"],
    },
    {
      week: t("Tuần 5", "Week 5"),
      phase: "foundation",
      topic: t("Conventions: Form/Structure/Sense + Modifiers", "Conventions: Form/Structure/Sense + Modifiers"),
      teacher: t(
        "Dạy SVA, đại từ, dangling modifier. Kỹ thuật 'arrow from modifier to noun' trên bảng.",
        "Teach subject-verb agreement, pronouns, dangling modifiers. Use modifier-to-noun arrows on the board."
      ),
      learner: t(
        "Drill 50 câu modifier + 50 câu pronoun. Khoanh chủ ngữ + động từ trước khi chọn đáp án.",
        "Drill 50 modifier + 50 pronoun items. Always circle subject + verb before choosing."
      ),
      assessment: t("Quiz 40 câu Conventions · ≥ 85%", "40-Q Conventions quiz · ≥ 85%"),
      lessons: ["sva-traps", "modifier-placement", "pronoun-clarity"],
    },
    {
      week: t("Tuần 6", "Week 6"),
      phase: "foundation",
      topic: t("Math: Algebra & Linear Systems", "Math: Algebra & Linear Systems"),
      teacher: t(
        "Ôn slope-intercept, hệ 2 ẩn, từ khoá 'no solution / infinitely many'. Demo Desmos cho graphing.",
        "Review slope-intercept, 2-variable systems, 'no solution / infinitely many' triggers. Demo Desmos graphing."
      ),
      learner: t(
        "Drill 60 câu Algebra (level 3-4). Bắt buộc dùng Desmos cho ≥ 20 câu để hình thành phản xạ.",
        "Drill 60 Algebra items (level 3-4). Use Desmos on ≥ 20 to build the reflex."
      ),
      assessment: t("Quiz 30 câu Algebra · ≥ 80%", "30-Q Algebra quiz · ≥ 80%"),
      lessons: ["sat-math-numbers-refresh", "sat-math-linear-1step", "sat-math-desmos-tour", "sat-algebra-core", "sat-linear-systems-graph"],
    },
    {
      week: t("Tuần 7", "Week 7"),
      phase: "foundation",
      topic: t("Math: Quadratics, Functions & Word Problems", "Math: Quadratics, Functions & Word Problems"),
      teacher: t(
        "Dạy 3 dạng quadratic (standard / vertex / factored) và khi nào dùng dạng nào. Phân tích 'translation problems' (đề chữ → phương trình).",
        "Teach 3 quadratic forms (standard / vertex / factored) and when to use each. Decode word-to-equation translations."
      ),
      learner: t(
        "Drill 40 câu Quadratics + 30 câu Word Problems. Viết 'Let x = …' trước mỗi bài.",
        "Drill 40 Quadratics + 30 Word Problems. Write 'Let x = …' before every problem."
      ),
      assessment: t("Quiz 30 câu Quadratics + Word Problems · ≥ 75%", "30-Q Quadratics + Word Problems quiz · ≥ 75%"),
      lessons: ["sat-quadratics", "sat-quadratic-graph", "sat-math-word-problems", "sat-translating-words"],
    },
    {
      week: t("Tuần 8", "Week 8"),
      phase: "foundation",
      topic: t("Mock #1 + Hệ thống Error Log", "Mock #1 + Error-Log System"),
      teacher: t(
        "Coi mock đầy đủ trên Bluebook. Hướng dẫn phân loại lỗi 3 nhóm: Don't-Know / Knew-Missed / Careless. Ưu tiên fix nhóm 2 và 3.",
        "Proctor a full Bluebook mock. Teach the 3 error buckets: Don't-Know / Knew-Missed / Careless. Prioritize buckets 2 and 3."
      ),
      learner: t(
        "Mock đầy đủ. Phân loại 100% câu sai vào error log với 'WHY wrong' và 'CORRECT reasoning'. Đặt lịch re-do sau 7 ngày.",
        "Take a full mock. Classify 100% of misses in the log with 'WHY wrong' and 'CORRECT reasoning'. Schedule re-dos in 7 days."
      ),
      assessment: t("Mock #1 - đặt baseline cho phase 2", "Mock #1 - baseline for Phase 2"),
      lessons: ["sat-error-log-three-buckets"],
    },

    // ─── Phase 2 · Skills (Weeks 9–16) ─────────────────────────────────
    {
      week: t("Tuần 9", "Week 9"),
      phase: "skills",
      topic: t("Vocabulary đợt 2 + Academic Verbs", "Vocabulary Set 2 + Academic Verbs"),
      teacher: t(
        "Giới thiệu 80 từ vựng Set 2 + 30 academic verbs cao tần. Dạy collocation thay vì học từ rời rạc.",
        "Introduce 80 Set-2 words + 30 high-frequency academic verbs. Teach collocations, not isolated words."
      ),
      learner: t(
        "Học 80 từ + 30 verbs. Viết 1 câu/từ sử dụng collocation đúng. Drill 40 câu Words in Context.",
        "Learn 80 words + 30 verbs. Write one collocation-correct sentence per item. Drill 40 Words-in-Context."
      ),
      assessment: t("Vocab quiz 110 từ · ≥ 85%", "110-word vocab quiz · ≥ 85%"),
      lessons: ["sat-vocab-set2", "sat-academic-verbs"],
    },
    {
      week: t("Tuần 10", "Week 10"),
      phase: "skills",
      topic: t("Reading: Text Structure & Purpose", "Reading: Text Structure & Purpose"),
      teacher: t(
        "Dạy 6 cấu trúc passage cơ bản: definition, compare, cause-effect, problem-solution, chronological, argumentative. Bắt học sinh đặt nhãn 5 giây sau khi đọc.",
        "Teach 6 core passage structures: definition, compare, cause-effect, problem-solution, chronological, argumentative. Have students label within 5 seconds of reading."
      ),
      learner: t(
        "Drill 40 câu Text Structure. Mỗi câu phải ghi tên cấu trúc trước khi chọn đáp án.",
        "Drill 40 Text-Structure items. Always name the structure before picking an answer."
      ),
      assessment: t("Quiz 30 câu Text Structure · ≥ 80%", "30-Q Text Structure quiz · ≥ 80%"),
      lessons: ["sat-adv-reading-science", "sat-adv-reading-social", "sat-adv-reading-literary"],
    },
    {
      week: t("Tuần 11", "Week 11"),
      phase: "skills",
      topic: t("Cross-Text Connections", "Cross-Text Connections"),
      teacher: t(
        "Dạy quy trình 4 bước cho Cross-Text. Tập trung phân biệt 'agree / disagree / qualify / extend'. Phân tích bẫy 'on topic but wrong stance'.",
        "Teach the 4-step Cross-Text process. Focus on 'agree / disagree / qualify / extend'. Analyze 'on topic but wrong stance' traps."
      ),
      learner: t(
        "Drill 20 câu Cross-Text (đây là dạng khó nhất). Viết 1 câu tóm tắt mỗi text trước khi xem câu hỏi.",
        "Drill 20 Cross-Text items (the hardest type). Summarize each text in one sentence before reading the question."
      ),
      assessment: t("Mini-test Cross-Text 20 câu · ≥ 70%", "20-Q Cross-Text mini-test · ≥ 70%"),
      lessons: ["sat-cross-text-strategy", "sat-adv-reading-dual-passage"],
    },
    {
      week: t("Tuần 12", "Week 12"),
      phase: "skills",
      topic: t("Rhetorical Synthesis + Transitions", "Rhetorical Synthesis + Transitions"),
      teacher: t(
        "Dạy 'goal-first reading': đọc CÂU HỎI trước, gạch goal (vd: 'emphasize the difference'), rồi mới quét bullet notes.",
        "Teach 'goal-first reading': read the QUESTION first, underline the goal (e.g. 'emphasize the difference'), then scan the bullets."
      ),
      learner: t(
        "Drill 30 câu Rhetorical Synthesis + 30 câu Transitions. Phân loại transition: contrast / cause / addition / sequence.",
        "Drill 30 Rhetorical Synthesis + 30 Transitions items. Classify transitions: contrast / cause / addition / sequence."
      ),
      assessment: t("Quiz 40 câu Synthesis + Transitions · ≥ 80%", "40-Q Synthesis + Transitions quiz · ≥ 80%"),
      lessons: ["sat-synthesis-strategy", "sat-transitions-mastery", "sat-wl-rhetorical-synthesis"],
    },
    {
      week: t("Tuần 13", "Week 13"),
      phase: "skills",
      topic: t("Math: Statistics & Data Analysis", "Math: Statistics & Data Analysis"),
      teacher: t(
        "Ôn mean / median / mode / range, scatter plot, line of best fit, two-way table, %, ratio. Demo Desmos regression.",
        "Review mean / median / mode / range, scatter plots, lines of best fit, two-way tables, %, ratio. Demo Desmos regression."
      ),
      learner: t(
        "Drill 50 câu Stats/Data. Viết 1 câu giải thích cho mỗi câu chọn - không khoanh đại.",
        "Drill 50 Stats/Data items. Write one explanation per pick - no blind guessing."
      ),
      assessment: t("Quiz 30 câu Statistics · ≥ 80%", "30-Q Statistics quiz · ≥ 80%"),
      lessons: ["sat-stats-center-spread", "sat-stats-normal-scatter", "sat-data-statistics-terms"],
    },
    {
      week: t("Tuần 14", "Week 14"),
      phase: "skills",
      topic: t("Math: Geometry & Trigonometry", "Math: Geometry & Trigonometry"),
      teacher: t(
        "Tam giác đặc biệt 30-60-90 và 45-45-90, đường tròn, similarity, SOH-CAH-TOA. Dán reference sheet lên tường lớp.",
        "Special triangles 30-60-90 and 45-45-90, circles, similarity, SOH-CAH-TOA. Pin the reference sheet on the wall."
      ),
      learner: t(
        "Drill 40 câu Geometry/Trig. Học thuộc 5 công thức KHÔNG có trên reference sheet.",
        "Drill 40 Geometry/Trig items. Memorize the 5 formulas the reference sheet does NOT include."
      ),
      assessment: t("Quiz 30 câu Geometry/Trig · ≥ 75%", "30-Q Geometry/Trig quiz · ≥ 75%"),
      lessons: ["sat-geom-triangles-circles", "sat-geom-similarity-trig", "sat-geometry-terms"],
    },
    {
      week: t("Tuần 15", "Week 15"),
      phase: "skills",
      topic: t("Vocabulary đợt 3 + Word Roots", "Vocabulary Set 3 + Word Roots"),
      teacher: t(
        "Dạy 25 root/prefix/suffix Latin–Greek phổ biến (bene-, mal-, -phobia, -graph…). Suy đoán nghĩa từ root khi gặp từ lạ.",
        "Teach 25 common Latin–Greek roots/prefixes/suffixes (bene-, mal-, -phobia, -graph…). Decode unknown words from roots."
      ),
      learner: t(
        "Học 25 root + 60 từ Set 3. Drill 30 câu Words in Context dùng kỹ thuật suy root.",
        "Learn 25 roots + 60 Set-3 words. Drill 30 Words-in-Context using root deduction."
      ),
      assessment: t("Vocab quiz 85 mục · ≥ 85%", "85-item vocab quiz · ≥ 85%"),
      lessons: ["sat-vocab-roots", "sat-vocab-set3", "sat-descriptive-adjectives", "sat-abstract-nouns"],
    },
    {
      week: t("Tuần 16", "Week 16"),
      phase: "skills",
      topic: t("Mock #2 + tái phân loại error log", "Mock #2 + error-log re-classification"),
      teacher: t(
        "Coi mock #2. So sánh tỉ lệ 3 nhóm lỗi với mock #1: nhóm Careless phải giảm ≥ 50%.",
        "Proctor mock #2. Compare 3-bucket ratios vs mock #1: Careless misses must drop ≥ 50%."
      ),
      learner: t(
        "Mock #2. Cập nhật error log. Vẽ biểu đồ phân bố 3 nhóm lỗi để theo dõi tiến bộ.",
        "Mock #2. Update the error log. Chart the 3-bucket distribution to track progress."
      ),
      assessment: t("Mock #2 - mục tiêu +50–80 điểm so với mock #1", "Mock #2 - target +50–80 points vs mock #1"),
      lessons: ["sat-mock-debrief-framework", "sat-error-log-three-buckets"],
    },

    // ─── Phase 3 · Strategy (Weeks 17–24) ──────────────────────────────
    {
      week: t("Tuần 17", "Week 17"),
      phase: "strategy",
      topic: t("Pacing R&W Module (32 phút)", "Pacing R&W Module (32 minutes)"),
      teacher: t(
        "Dạy chiến thuật 3 đợt × 9 câu × 10 phút. Đặt checkpoint Q9-Q18-Q27. Quy tắc 90 giây + Mark for Review.",
        "Teach the 3-wave × 9-question × 10-minute strategy. Checkpoints at Q9-Q18-Q27. The 90-second rule + Mark for Review."
      ),
      learner: t(
        "Tập 4 module R&W tính giờ. Sau mỗi module, ghi: thời gian đến checkpoint + số câu đã Mark.",
        "Drill 4 timed R&W modules. After each, log: time to checkpoint + number of Marked items."
      ),
      assessment: t("4 module timed · pacing đúng ≥ 3/4", "4 timed modules · correct pacing on ≥ 3/4"),
      lessons: ["sat-pacing-rw-module"],
    },
    {
      week: t("Tuần 18", "Week 18"),
      phase: "strategy",
      topic: t("Pacing Math Module (35 phút)", "Pacing Math Module (35 minutes)"),
      teacher: t(
        "Dạy chiến thuật 2 đợt 11 câu (15 + 17 phút) + 3 phút buffer. Mẹo gõ phân số trực tiếp; cảnh báo lỗi rounding.",
        "Teach the 2-wave 11-question split (15 + 17 minutes) + 3-minute buffer. Type fractions directly; warn against rounding errors."
      ),
      learner: t(
        "Tập 4 module Math tính giờ. Bắt buộc dock Desmos ngay từ Q1. Tự đo thời gian buffer.",
        "Drill 4 timed Math modules. Dock Desmos at Q1. Self-measure your buffer time."
      ),
      assessment: t("4 module Math timed · còn ≥ 2 phút buffer trong ≥ 3 module", "4 timed Math modules · ≥ 2-min buffer remaining in ≥ 3 modules"),
      lessons: ["sat-pacing-math-module"],
    },
    {
      week: t("Tuần 19", "Week 19"),
      phase: "strategy",
      topic: t("Trap-Answer Patterns (R&W)", "Trap-Answer Patterns (R&W)"),
      teacher: t(
        "Phân tích 6 dạng bẫy: word-trap (lặp nguyên văn), opposite-direction, half-right, extreme language ('always','never'), out-of-scope, true-but-irrelevant.",
        "Analyze 6 trap families: word-trap (verbatim repeat), opposite-direction, half-right, extreme language ('always','never'), out-of-scope, true-but-irrelevant."
      ),
      learner: t(
        "Dán nhãn loại bẫy cho 30 câu sai gần nhất. Tạo 'flashcard bẫy' cá nhân.",
        "Tag 30 most recent misses with their trap type. Build a personal 'trap-flashcard' deck."
      ),
      assessment: t("Quiz 30 câu R&W khó · ≥ 75%", "30-Q hard R&W quiz · ≥ 75%"),
      lessons: ["sat-rw-conventions", "sat-function-questions"],
    },
    {
      week: t("Tuần 20", "Week 20"),
      phase: "strategy",
      topic: t("Math: Translation & Rate/Mixture", "Math: Translation & Rate/Mixture"),
      teacher: t(
        "Dạy template viết 'Let x = …', tách rate problems thành 'Distance = Rate × Time' và mixture thành 'Total Amount × Concentration'.",
        "Teach the 'Let x = …' template; decompose rate problems with 'Distance = Rate × Time' and mixture with 'Total Amount × Concentration'."
      ),
      learner: t(
        "Drill 40 câu word problems. Bắt buộc viết phương trình ra giấy nháp trước khi nhập đáp án.",
        "Drill 40 word problems. Always write the equation on scratch paper before entering the answer."
      ),
      assessment: t("Quiz 30 câu word problems · ≥ 75%", "30-Q word-problem quiz · ≥ 75%"),
      lessons: ["sat-translating-words", "sat-rate-mixture-problems"],
    },
    {
      week: t("Tuần 21", "Week 21"),
      phase: "strategy",
      topic: t("Mock #3 (Bluebook full) + phân tích sâu", "Mock #3 (Bluebook full) + deep analysis"),
      teacher: t(
        "Mock #3 đúng giờ thực tế. Bài tập về nhà: viết 1 trang reflection - top 3 weakness, kế hoạch 7 ngày.",
        "Mock #3 with real timing. Homework: write a 1-page reflection - top 3 weaknesses + 7-day plan."
      ),
      learner: t(
        "Mock #3. Reflection 1 trang. Tăng tần suất re-do error log lên 2 lần/tuần.",
        "Mock #3. 1-page reflection. Increase error-log re-dos to 2× per week."
      ),
      assessment: t("Mock #3 - mục tiêu vào module 'Harder' của ≥ 1 section", "Mock #3 - target reaching the 'Harder' module in ≥ 1 section"),
      lessons: ["sat-mock-debrief-framework", "sat-pacing-rw-module", "sat-pacing-math-module"],
    },
    {
      week: t("Tuần 22", "Week 22"),
      phase: "strategy",
      topic: t("Targeted Weakness Drilling (cá nhân hoá)", "Targeted Weakness Drilling (personalized)"),
      teacher: t(
        "Cá nhân hoá: mỗi học sinh nhận playlist 3 bài học + 60 câu drill theo top 3 weakness từ mock #3.",
        "Personalize: each student gets a 3-lesson playlist + 60 drill questions targeting top 3 weaknesses from mock #3."
      ),
      learner: t(
        "Hoàn thành playlist được giao. Báo cáo accuracy mỗi 20 câu cho giáo viên.",
        "Finish the assigned playlist. Report accuracy every 20 questions to the teacher."
      ),
      assessment: t("Accuracy weakness areas tăng ≥ 15% so với mock #3", "Weakness-area accuracy up ≥ 15% vs mock #3"),
      lessons: ["sat-targeted-weakness-drill", "sat-error-log-method"],
    },
    {
      week: t("Tuần 23", "Week 23"),
      phase: "strategy",
      topic: t("Vocabulary tổng ôn + Tone/Transition", "Vocabulary review + Tone/Transition"),
      teacher: t(
        "Tổng ôn 220 từ Set 1+2+3. Phân nhóm tone: positive / negative / neutral / nuanced. Drill transitions theo bộ 4.",
        "Review all 220 Set-1+2+3 words. Group by tone: positive / negative / neutral / nuanced. Drill transitions in groups of 4."
      ),
      learner: t(
        "Vượt qua flashcard 220 từ trong 3 phiên. Drill 40 câu transition + 30 câu tone.",
        "Clear 220-word flashcards in 3 sessions. Drill 40 transition + 30 tone items."
      ),
      assessment: t("Flashcard 220 từ · ≥ 95% trong 2 phút", "220-word flashcards · ≥ 95% within 2 minutes"),
      lessons: ["sat-transition-tone", "sat-transitions"],
    },
    {
      week: t("Tuần 24", "Week 24"),
      phase: "strategy",
      topic: t("Mock #4 + đánh giá 'ready or not'", "Mock #4 + 'ready or not' check"),
      teacher: t(
        "Mock #4. Quyết định: nếu điểm < target -100 → ở lại Phase 3; nếu trong khoảng target -100 → vào Phase 4 (Mastery).",
        "Mock #4. Decide: if score < target -100 → stay in Phase 3; if within target -100 → enter Phase 4 (Mastery)."
      ),
      learner: t(
        "Mock #4. Cập nhật error log. Đặt mục tiêu cụ thể cho 6 tuần Mastery.",
        "Mock #4. Update the error log. Set a specific target for the 6-week Mastery phase."
      ),
      assessment: t("Mock #4 - gate vào Phase 4", "Mock #4 - gate to Phase 4"),
      lessons: ["sat-mock-debrief-framework", "sat-targeted-weakness-drill"],
    },

    // ─── Phase 4 · Mastery (Weeks 25–30) ───────────────────────────────
    {
      week: t("Tuần 25", "Week 25"),
      phase: "mastery",
      topic: t("Hard-only drilling (R&W)", "Hard-only drilling (R&W)"),
      teacher: t(
        "Filter Bluebook chỉ câu Hard. Tập trung Cross-Text + Inference + Rhetorical Synthesis level 5.",
        "Filter Bluebook to Hard-only items. Focus on Cross-Text + Inference + Rhetorical Synthesis level 5."
      ),
      learner: t(
        "Drill 80 câu Hard R&W. Mục tiêu accuracy ≥ 70%. Re-do 100% câu sai trong 48h.",
        "Drill 80 Hard R&W items. Target accuracy ≥ 70%. Re-do 100% of misses within 48 h."
      ),
      assessment: t("Hard R&W set 80 câu · ≥ 70%", "80-Q Hard R&W set · ≥ 70%"),
      lessons: ["sat-cross-text-strategy", "sat-inference-questions", "sat-synthesis-strategy"],
    },
    {
      week: t("Tuần 26", "Week 26"),
      phase: "mastery",
      topic: t("Hard-only drilling (Math)", "Hard-only drilling (Math)"),
      teacher: t(
        "Filter Math Hard: tập trung Quadratics nâng cao, Functions deep-dive, Trig + Geometry hỗn hợp.",
        "Filter Math Hard: focus on advanced Quadratics, Functions deep-dive, mixed Trig + Geometry."
      ),
      learner: t(
        "Drill 60 câu Hard Math. Bắt buộc dùng Desmos cho ≥ 30 câu - tốc độ phải đạt ≤ 110 giây/câu.",
        "Drill 60 Hard Math items. Use Desmos on ≥ 30 - speed must hit ≤ 110 sec/item."
      ),
      assessment: t("Hard Math set 60 câu · ≥ 70% và pacing ≤ 110s/câu", "60-Q Hard Math set · ≥ 70% and pacing ≤ 110s/item"),
      lessons: ["sat-math-functions-deepdive", "sat-stats-data-deepdive", "sat-geometry-deepdive"],
    },
    {
      week: t("Tuần 27", "Week 27"),
      phase: "mastery",
      topic: t("Mock #5 - full Bluebook", "Mock #5 - full Bluebook"),
      teacher: t(
        "Mock #5 đúng môi trường thi (laptop, sạc đầy, tai nghe nếu cần). So sánh tỉ lệ 3 nhóm lỗi qua 5 mock.",
        "Mock #5 in real test conditions (laptop, fully charged, headphones if needed). Compare 3-bucket ratios across 5 mocks."
      ),
      learner: t(
        "Mock #5. Phân tích trend điểm qua 5 mock. Xác định 3 'leaks' cuối còn sót.",
        "Mock #5. Analyze the score trend across 5 mocks. Identify the last 3 remaining 'leaks'."
      ),
      assessment: t("Mock #5 - trong khoảng target ± 30 điểm", "Mock #5 - within ± 30 points of target"),
      lessons: ["sat-mock-debrief-framework", "sat-hard-rw-mixed", "sat-hard-math-mixed"],
    },
    {
      week: t("Tuần 28", "Week 28"),
      phase: "mastery",
      topic: t("Last-mile fix + tâm lý phòng thi", "Last-mile fix + test psychology"),
      teacher: t(
        "Workshop tâm lý: cách hít thở 4-7-8, xử lý 'mind blank', kế hoạch backup khi gặp module quá khó.",
        "Psychology workshop: 4-7-8 breathing, handling a 'mind blank', backup plan when the module feels too hard."
      ),
      learner: t(
        "Drill 3 'leak' areas đến khi accuracy đạt ≥ 80%. Viết kịch bản 'Plan B' cho ngày thi.",
        "Drill the 3 'leak' areas until accuracy ≥ 80%. Write a 'Plan B' script for test day."
      ),
      assessment: t("Leak-area accuracy ≥ 80%", "Leak-area accuracy ≥ 80%"),
      lessons: ["sat-test-psychology", "sat-targeted-weakness-drill"],
    },
    {
      week: t("Tuần 29", "Week 29"),
      phase: "mastery",
      topic: t("Mock #6 + Mock #7 (back-to-back tuần)", "Mock #6 + Mock #7 (back-to-back week)"),
      teacher: t(
        "Tuần 'simulation peak': 2 mock cách nhau 3 ngày để mô phỏng stamina ngày thi.",
        "'Simulation peak' week: 2 mocks 3 days apart to simulate test-day stamina."
      ),
      learner: t(
        "Mock #6 (T2) + Mock #7 (T6). Không re-study giữa 2 mock - chỉ ngủ và nhẹ nhàng review.",
        "Mock #6 (Mon) + Mock #7 (Fri). No re-study between mocks - only sleep and light review."
      ),
      assessment: t("Cả 2 mock đều ≥ target -20", "Both mocks ≥ target -20"),
      lessons: ["sat-simulation-peak", "sat-test-psychology"],
    },
    {
      week: t("Tuần 30", "Week 30"),
      phase: "mastery",
      topic: t("Test-week tapering + ngày thi", "Test-week tapering + test day"),
      teacher: t(
        "Tapering: T2-T3 chỉ ôn flashcard + công thức; T4-T5 nghỉ; T6 rà soát Bluebook + giấy tờ. Nhắc lịch ngủ 8h.",
        "Tapering: Mon–Tue flashcards + formulas only; Wed–Thu rest; Fri verify Bluebook + ID. Enforce 8-hour sleep."
      ),
      learner: t(
        "Tuân thủ taper. Sạc laptop, mang ID, đi vệ sinh trước khi vào phòng thi. Sau thi: ghi reflection trong 24h.",
        "Follow the taper. Charge laptop, bring ID, restroom before entering. After the test: write a 24-hour reflection."
      ),
      assessment: t("Test day - đạt target ± 10 điểm", "Test day - hit target ± 10 points"),
      lessons: ["sat-taper-and-test-day", "sat-test-psychology"],
    },
  ];

  // ─────────────────────────────────────────────────────────────────────
  // 4. Common pitfalls (for teacher discussion)
  // ─────────────────────────────────────────────────────────────────────
  const PITFALLS = [
    t("Đọc lướt câu hỏi → bỏ qua từ khoá như NOT / EXCEPT / LEAST.",
      "Skimming the prompt and missing words like NOT / EXCEPT / LEAST."),
    t("Chọn đáp án 'có chữ trong đoạn văn' mà không kiểm tra logic toàn câu.",
      "Picking the answer that 'contains words from the passage' without checking full-sentence logic."),
    t("Trong Math: bỏ qua đơn vị (feet vs inches, hours vs minutes).",
      "In Math: ignoring units (feet vs inches, hours vs minutes)."),
    t("Trong Synthesis: chọn đáp án 'đúng nhưng không đáp ứng goal'.",
      "In Synthesis: choosing an option that is 'true but doesn't meet the stated goal'."),
    t("Quản lý thời gian: dành quá 2 phút cho 1 câu Math thay vì Mark-for-Review.",
      "Time mismanagement: spending 2+ minutes on a single Math item instead of Mark-for-Review."),
    t("Bỏ qua bước viết 'Let x = …' khiến word problem dài thành lan man.",
      "Skipping the 'Let x = …' step turns long word problems into a tangle."),
    t("Không phân loại 3 nhóm lỗi → cứ ‘luyện chăm’ mà điểm không bứt phá.",
      "Skipping the 3-bucket error classification → 'practising hard' without breakthroughs."),
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* ── 1. Test format ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          {t("Format bài thi Digital SAT", "Digital SAT Test Format")}
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          {t(
            "Tổng thời gian: 2 giờ 14 phút (134 phút) · 98 câu hỏi · Thi trên Bluebook (laptop/iPad). Thang điểm 400–1600.",
            "Total time: 2h 14m (134 min) · 98 questions · Taken on Bluebook (laptop/iPad). Scale: 400–1600."
          )}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="rounded-xl border border-border bg-background/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base">{s.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-muted/40 rounded px-2 py-1.5"><span className="text-muted-foreground">⏱ </span>{s.time}</div>
                  <div className="bg-muted/40 rounded px-2 py-1.5"><span className="text-muted-foreground">🎯 </span>{s.score}</div>
                  <div className="bg-muted/40 rounded px-2 py-1.5"><span className="text-muted-foreground">📦 </span>{s.modules}</div>
                  <div className="bg-muted/40 rounded px-2 py-1.5"><span className="text-muted-foreground">⚡ </span>{s.perQ}</div>
                </div>
                <ul className="space-y-1.5">
                  {s.content.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-foreground/85">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── 2. Adaptive flow ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t("Cơ chế Adaptive (rất quan trọng)", "Adaptive Mechanism (critical)")}
        </h2>
        <ul className="space-y-2">
          {ADAPTIVE.map((a, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-foreground/90 leading-relaxed">{a}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ── 3. 30-week curriculum ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          {t("Giáo án chi tiết 30 tuần (Giáo viên + Học sinh)", "30-Week Curriculum (Teacher + Learner)")}
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          {t(
            "Lộ trình 30 tuần chia thành 4 giai đoạn: Nền móng (T1–8), Kỹ năng (T9–16), Chiến thuật (T17–24), Bứt phá (T25–30). Mỗi tuần có nhiệm vụ giáo viên, nhiệm vụ học sinh, đánh giá cuối tuần và bài học liên kết.",
            "30-week pathway in 4 phases: Foundation (W1–8), Skills (W9–16), Strategy (W17–24), Mastery (W25–30). Every week includes teacher tasks, learner tasks, an end-of-week assessment, and linked lessons."
          )}
        </p>

        {/* Phase legend */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(Object.keys(PHASE_META) as Week["phase"][]).map((p) => (
            <span
              key={p}
              className={`text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${PHASE_META[p].gradient} text-white font-semibold shadow-sm`}
            >
              {PHASE_META[p].label}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {WEEKS.map((w, i) => {
            const meta = PHASE_META[w.phase];
            return (
              <div key={i} className={`rounded-xl border p-4 ${meta.tone}`}>
                {/* Header row */}
                <div className="flex items-start gap-3 mb-3 flex-wrap">
                  <span className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${meta.gradient} text-white font-bold shrink-0`}>
                    {w.week}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide bg-background/70 text-muted-foreground border border-border px-2 py-0.5 rounded font-semibold shrink-0">
                    {meta.label}
                  </span>
                  <h3 className="font-bold text-sm md:text-base text-foreground basis-full">{w.topic}</h3>
                </div>

                {/* Teacher / Learner */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                        {t("Giáo viên", "Teacher")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{w.teacher}</p>
                  </div>
                  <div className="rounded-lg bg-sky-500/10 border border-sky-500/30 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Target className="w-4 h-4 text-sky-600" />
                      <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wide">
                        {t("Học sinh", "Learner")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{w.learner}</p>
                  </div>
                </div>

                {/* Assessment */}
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5">
                  <Flag className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wide font-bold text-amber-700 dark:text-amber-400 mr-2">
                      {t("Đánh giá cuối tuần", "End-of-week assessment")}
                    </span>
                    <span className="text-sm text-foreground/90">{w.assessment}</span>
                  </div>
                </div>

                {/* Linked lesson chips */}
                {w.lessons.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/60">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">
                      {t("Bài học liên kết", "Linked lessons")}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {w.lessons.map((lid) => {
                        const ref = satLessonIndex[lid];
                        if (!ref) {
                          // Lesson not found in registry - render disabled chip (no broken nav)
                          return (
                            <span
                              key={lid}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border"
                              title={lid}
                            >
                              {lid}
                            </span>
                          );
                        }
                        const label = lang === "vi" ? ref.title : ref.titleEn;
                        return (
                          <button
                            key={lid}
                            onClick={() => navigate(`/english/learn/${ref.moduleId}/${ref.lessonId}`)}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span className="max-w-[260px] truncate">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── 4. Common pitfalls ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-6 md:p-8 border-amber-500/30"
      >
        <h2 className="text-xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          {t("Các lỗi phổ biến cần tránh", "Common Pitfalls to Avoid")}
        </h2>
        <ul className="space-y-2">
          {PITFALLS.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-amber-500 font-bold shrink-0">⚠</span>
              <span className="text-foreground/90 leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default SatExamFormat;
