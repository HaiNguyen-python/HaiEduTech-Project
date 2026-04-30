/**
 * @file SatExamFormat.tsx
 * @description Detailed Digital SAT exam format + 10-week curriculum for teachers and learners.
 * Replaces the generic Highlights / Curriculum / Audience / Testimonials panels for the SAT course.
 * @author HaiEduTech
 */
import { motion } from "framer-motion";
import {
  ClipboardList,
  Clock,
  BookOpen,
  Calculator,
  Target,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SatExamFormat = () => {
  const { t } = useLanguage();

  // ─────────────────────────────────────────────────────────────────────
  // 1. Test format — Digital SAT (adaptive, 2 sections)
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
  // 3. 10-week curriculum (detailed for teachers + learners)
  // ─────────────────────────────────────────────────────────────────────
  const WEEKS = [
    {
      week: t("Tuần 1", "Week 1"),
      topic: t("Diagnostic + Reading & Writing nền tảng", "Diagnostic + R&W foundations"),
      teacher: t(
        "Cho làm đề chẩn đoán Bluebook đầy đủ. Phân loại 3 nhóm: <450 / 450–650 / >650 cho R&W. Xây error-log mẫu trên Google Sheet.",
        "Run a full Bluebook diagnostic. Bucket students into <450 / 450–650 / >650 for R&W. Set up a shared Google Sheet error log."
      ),
      learner: t(
        "Hoàn thành 1 module R&W full + 1 module Math full. Đăng nhập Bluebook, làm quen giao diện, công cụ Annotation và Mark for Review.",
        "Complete 1 full R&W module + 1 Math module. Log into Bluebook; practice the Annotate and Mark-for-Review tools."
      ),
      lessons: ["sat-rw-evidence-reading", "sat-rw-words-context"],
    },
    {
      week: t("Tuần 2", "Week 2"),
      topic: t("Words in Context + Inference", "Words in Context + Inference"),
      teacher: t(
        "Dạy chiến lược predict-then-pick: che 4 đáp án, đoán từ trước khi đọc lựa chọn. Yêu cầu HS gạch 1 'context clue' cho mỗi câu.",
        "Teach predict-then-pick: cover the 4 choices and predict the word first. Require students to underline one context clue per item."
      ),
      learner: t(
        "Học 80 từ vựng SAT cao tần Set 1. Làm 30 câu Words in Context + 20 câu Inference, viết clue cho từng câu.",
        "Master 80 high-frequency SAT words (Set 1). Drill 30 Words-in-Context + 20 Inference items; log a clue per question."
      ),
      lessons: ["sat-vocab-set1", "sat-inference-questions"],
    },
    {
      week: t("Tuần 3", "Week 3"),
      topic: t("Standard English Conventions: Boundaries", "Standard English Conventions: Boundaries"),
      teacher: t(
        "Dạy 4 dấu chính: , ; : —. Bài tập so sánh cặp câu đúng-sai. Nhấn mạnh quy tắc 'comma không nối được 2 mệnh đề độc lập' (comma splice).",
        "Teach the 4 key punctuation marks: , ; : —. Use right-vs-wrong sentence pairs. Drill the 'comma splice' rule."
      ),
      learner: t(
        "Hoàn thành 60 câu drill dấu câu. Tự tạo 10 ví dụ cá nhân cho mỗi dấu. Đặt mục tiêu: 90% chính xác trên drill cuối tuần.",
        "Drill 60 punctuation items. Write 10 personal examples for each mark. Target 90% on the end-of-week drill."
      ),
      lessons: ["sat-rw-conventions"],
    },
    {
      week: t("Tuần 4", "Week 4"),
      topic: t("Conventions: Form/Structure/Sense + Modifiers", "Conventions: Form/Structure/Sense + Modifiers"),
      teacher: t(
        "Dạy SVA, đại từ, modifier 'dangling'. Dùng kỹ thuật 'find the noun the modifier describes' với mũi tên trên bảng.",
        "Teach subject-verb agreement, pronouns, dangling modifiers. Use arrows from modifier to noun on the board."
      ),
      learner: t(
        "Drill 50 câu modifier + 50 câu pronoun. Bắt buộc khoanh tròn chủ ngữ và động từ trước khi chọn đáp án.",
        "Drill 50 modifier + 50 pronoun items. Always circle subject + verb before choosing."
      ),
      lessons: ["sva-traps", "modifier-placement", "pronoun-clarity"],
    },
    {
      week: t("Tuần 5", "Week 5"),
      topic: t("Math: Algebra & Linear Systems", "Math: Algebra & Linear Systems"),
      teacher: t(
        "Ôn slope-intercept, hệ 2 ẩn, từ khoá 'no solution / infinitely many'. Hướng dẫn dùng Desmos (built-in trong Bluebook) cho graphing.",
        "Review slope-intercept, 2-variable systems, 'no solution / infinitely many' triggers. Demo Bluebook's built-in Desmos for graphing."
      ),
      learner: t(
        "Hoàn thành 60 câu Algebra (level 3-4). Bắt buộc dùng Desmos cho ít nhất 20 câu để hình thành phản xạ đồ thị.",
        "Complete 60 Algebra items (level 3-4). Use Desmos on at least 20 to build graphing reflex."
      ),
      lessons: ["sat-algebra-core", "sat-linear-systems-graph"],
    },
    {
      week: t("Tuần 6", "Week 6"),
      topic: t("Math: Quadratics, Functions & Word Problems", "Math: Quadratics, Functions & Word Problems"),
      teacher: t(
        "Dạy 3 dạng của hàm bậc 2 (standard / vertex / factored) và khi nào nên dùng dạng nào. Phân tích 'translation problems' (đề chữ → phương trình).",
        "Teach 3 quadratic forms (standard / vertex / factored) and when to use each. Decode word-to-equation translations."
      ),
      learner: t(
        "Drill 40 câu Quadratics + 30 câu Word Problems. Viết 'Let x = …' trước mỗi bài; không bỏ qua bước này.",
        "Drill 40 Quadratics + 30 Word Problems. Write 'Let x = …' before every problem — no shortcuts."
      ),
      lessons: ["sat-quadratics", "sat-quadratic-graph", "sat-math-word-problems"],
    },
    {
      week: t("Tuần 7", "Week 7"),
      topic: t("Rhetorical Synthesis + Transitions", "Rhetorical Synthesis + Transitions"),
      teacher: t(
        "Dạy 'goal-first reading': đọc CÂU HỎI trước, gạch goal (e.g. 'emphasize the difference'), rồi mới quét bullet notes.",
        "Teach 'goal-first reading': read the QUESTION first, underline the goal (e.g. 'emphasize the difference'), then scan the bullets."
      ),
      learner: t(
        "Hoàn thành 30 câu Rhetorical Synthesis + 30 câu Transitions. Phân loại transition theo nhóm: contrast / cause / addition / sequence.",
        "Complete 30 Rhetorical Synthesis + 30 Transitions items. Classify transitions: contrast / cause / addition / sequence."
      ),
      lessons: ["sat-synthesis-strategy", "sat-transitions-mastery"],
    },
    {
      week: t("Tuần 8", "Week 8"),
      topic: t("Statistics, Geometry & Trigonometry", "Statistics, Geometry & Trigonometry"),
      teacher: t(
        "Ôn mean/median/mode, scatter plot, đường tròn, tam giác đặc biệt 30-60-90 & 45-45-90, SOH-CAH-TOA. Cho HS dán reference sheet.",
        "Review mean/median/mode, scatter plots, circles, 30-60-90 & 45-45-90 triangles, SOH-CAH-TOA. Print Bluebook reference sheet."
      ),
      learner: t(
        "Drill 50 câu Stats/Data + 40 câu Geometry/Trig. Học thuộc 5 công thức mà reference sheet KHÔNG có.",
        "Drill 50 Stats/Data + 40 Geometry/Trig items. Memorise the 5 formulas the reference sheet does NOT include."
      ),
      lessons: ["sat-stats-center-spread", "sat-geom-triangles-circles", "sat-geom-similarity-trig"],
    },
    {
      week: t("Tuần 9", "Week 9"),
      topic: t("Mock Test #1 + Error Log Deep-Dive", "Mock Test #1 + Error Log Deep-Dive"),
      teacher: t(
        "Coi thi mô phỏng đúng 2h14' trên Bluebook. Sau thi, hướng dẫn phân loại lỗi: (1) không biết, (2) biết nhưng sai, (3) careless. Ưu tiên fix nhóm 2 và 3.",
        "Proctor a 2h14' Bluebook simulation. Afterward, classify errors: (1) didn't know, (2) knew but missed, (3) careless. Prioritize fixing groups 2 and 3."
      ),
      learner: t(
        "Làm mock test full-length, ghi lại điểm. Viết lại mọi câu sai vào error log với cột 'WHY wrong' và 'CORRECT reasoning'.",
        "Take a full-length mock and record the score. Re-do every miss in the error log with 'WHY wrong' and 'CORRECT reasoning' columns."
      ),
      lessons: [],
    },
    {
      week: t("Tuần 10", "Week 10"),
      topic: t("Mock Test #2 + Test-Day Strategy", "Mock Test #2 + Test-Day Strategy"),
      teacher: t(
        "Mock cuối + briefing test-day: ngủ 8 tiếng, mang giấy tờ, sạc laptop, kiểm tra Bluebook 2 ngày trước. Cho HS đặt mục tiêu điểm hợp lý.",
        "Final mock + test-day briefing: 8h sleep, ID, charged laptop, Bluebook check 2 days prior. Help students set realistic score targets."
      ),
      learner: t(
        "Mock cuối + viết kế hoạch 'first 5 minutes': cách phân bổ thời gian, khi nào skip, khi nào đoán có chiến lược.",
        "Final mock + write a 'first 5 minutes' plan: time pacing, when to skip, when to strategically guess."
      ),
      lessons: [],
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

      {/* ── 3. 10-week curriculum ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          {t("Giáo án chi tiết 10 tuần (Giáo viên + Học sinh)", "10-Week Curriculum (Teacher + Learner)")}
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          {t(
            "Mỗi tuần liệt kê việc giáo viên cần làm trên lớp và việc học sinh cần hoàn thành ở nhà. Phù hợp cho lớp 1-1 hoặc nhóm nhỏ.",
            "Each week lists what the teacher does in class and what the learner completes at home. Suitable for 1-1 or small groups."
          )}
        </p>
        <div className="space-y-3">
          {WEEKS.map((w, i) => (
            <div key={i} className="rounded-xl border border-border bg-background/40 p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  {w.week}
                </span>
                <h3 className="font-bold text-sm md:text-base text-foreground">{w.topic}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                      {t("Giáo viên", "Teacher")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{w.teacher}</p>
                </div>
                <div className="rounded-lg bg-sky-500/5 border border-sky-500/20 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wide">
                      {t("Học sinh", "Learner")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{w.learner}</p>
                </div>
              </div>
              {w.lessons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/60">
                  <span className="text-xs text-muted-foreground">
                    {t("Bài học liên kết: ", "Linked lessons: ")}
                    <span className="font-mono text-foreground/70">{w.lessons.join(", ")}</span>
                  </span>
                </div>
              )}
            </div>
          ))}
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
          {t("5 lỗi phổ biến cần tránh", "5 Common Pitfalls to Avoid")}
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
