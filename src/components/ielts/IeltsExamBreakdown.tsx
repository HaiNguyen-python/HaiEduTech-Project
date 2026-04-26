import { motion } from "framer-motion";
import { Headphones, BookOpen, PenSquare, Mic, Clock, FileText, Target, Sparkles, GraduationCap, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const skills = [
  {
    icon: Headphones,
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    titleVi: "Listening — Nghe hiểu",
    titleEn: "Listening — Comprehension",
    durationVi: "30 phút + 10 phút chép đáp án",
    durationEn: "30 min + 10 min transfer",
    questionsVi: "40 câu hỏi · 4 sections",
    questionsEn: "40 questions · 4 sections",
    partsVi: [
      "Section 1: Hội thoại đời sống (đặt phòng, đăng ký, hỏi đường)",
      "Section 2: Độc thoại (giới thiệu địa điểm, sự kiện, dịch vụ)",
      "Section 3: Hội thoại học thuật (sinh viên thảo luận bài tập)",
      "Section 4: Bài giảng học thuật (lecture của giáo sư)",
    ],
    partsEn: [
      "Section 1: Everyday conversation (booking, sign-up, directions)",
      "Section 2: Monologue (introducing places, events, services)",
      "Section 3: Academic conversation (students discussing assignments)",
      "Section 4: Academic lecture (professor monologue)",
    ],
    questionTypesVi: "MCQ · Fill-in-blank · Map labelling · Form completion · Matching",
    questionTypesEn: "MCQ · Fill-in-blank · Map labelling · Form completion · Matching",
  },
  {
    icon: BookOpen,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    titleVi: "Reading — Đọc hiểu",
    titleEn: "Reading — Comprehension",
    durationVi: "60 phút (không có thời gian transfer)",
    durationEn: "60 minutes (no transfer time)",
    questionsVi: "40 câu hỏi · 3 passages (~2,750 từ)",
    questionsEn: "40 questions · 3 passages (~2,750 words)",
    partsVi: [
      "Passage 1: Chủ đề phổ thông (lịch sử, đời sống) — dễ",
      "Passage 2: Chủ đề bán học thuật (môi trường, công nghệ) — trung bình",
      "Passage 3: Chủ đề học thuật chuyên sâu (khoa học, xã hội) — khó",
    ],
    partsEn: [
      "Passage 1: General topic (history, lifestyle) — easy",
      "Passage 2: Semi-academic (environment, tech) — medium",
      "Passage 3: Deep academic (science, social) — hard",
    ],
    questionTypesVi: "T/F/NG · Matching headings · Sentence completion · MCQ · Summary completion",
    questionTypesEn: "T/F/NG · Matching headings · Sentence completion · MCQ · Summary completion",
  },
  {
    icon: PenSquare,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    titleVi: "Writing — Viết luận",
    titleEn: "Writing — Essay",
    durationVi: "60 phút (T1: 20 phút · T2: 40 phút)",
    durationEn: "60 minutes (T1: 20 min · T2: 40 min)",
    questionsVi: "2 bài viết · Tối thiểu 150 + 250 từ",
    questionsEn: "2 essays · Min 150 + 250 words",
    partsVi: [
      "Task 1: Mô tả biểu đồ/bảng/quy trình/bản đồ (150 từ)",
      "Task 2: Bài luận quan điểm/tranh luận/giải pháp (250 từ)",
      "Tiêu chí chấm: Task Achievement · Coherence & Cohesion · Lexical Resource · Grammar",
    ],
    partsEn: [
      "Task 1: Describe chart/table/process/map (150 words)",
      "Task 2: Opinion/argument/solution essay (250 words)",
      "Criteria: Task Achievement · Coherence & Cohesion · Lexical Resource · Grammar",
    ],
    questionTypesVi: "Line/Bar/Pie chart · Process · Map comparison · Opinion/Discuss/Problem-Solution essays",
    questionTypesEn: "Line/Bar/Pie chart · Process · Map comparison · Opinion/Discuss/Problem-Solution essays",
  },
  {
    icon: Mic,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    titleVi: "Speaking — Phỏng vấn 1-1",
    titleEn: "Speaking — 1-on-1 Interview",
    durationVi: "11–14 phút với giám khảo",
    durationEn: "11–14 minutes with examiner",
    questionsVi: "3 phần · Phỏng vấn trực tiếp / video",
    questionsEn: "3 parts · Face-to-face / video interview",
    partsVi: [
      "Part 1 (4–5 phút): Câu hỏi cá nhân (work, study, hobbies, hometown)",
      "Part 2 (3–4 phút): Cue card — nói 1.5–2 phút về 1 chủ đề + 1 phút chuẩn bị",
      "Part 3 (4–5 phút): Thảo luận sâu — phân tích, so sánh, dự đoán",
    ],
    partsEn: [
      "Part 1 (4–5 min): Personal questions (work, study, hobbies, hometown)",
      "Part 2 (3–4 min): Cue card — speak 1.5–2 min on a topic + 1 min prep",
      "Part 3 (4–5 min): Deep discussion — analyse, compare, predict",
    ],
    questionTypesVi: "Tiêu chí: Fluency & Coherence · Lexical Resource · Grammar · Pronunciation",
    questionTypesEn: "Criteria: Fluency & Coherence · Lexical Resource · Grammar · Pronunciation",
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
    badge: "rose",
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
    badge: "amber",
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
    badge: "emerald",
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
    badge: "violet",
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

const IeltsExamBreakdown = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 mb-8">
      {/* Section: 4 Skills Breakdown */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            {t("Cấu trúc bài thi IELTS — 4 kỹ năng", "IELTS Test Structure — 4 Skills")}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {t(
            "Tổng thời gian: ~2 giờ 45 phút · Listening + Reading + Writing thi liên tục, Speaking thi riêng cùng/khác ngày.",
            "Total: ~2h 45min · Listening + Reading + Writing back-to-back; Speaking on the same or different day."
          )}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-xl border ${skill.borderColor} ${skill.bgColor} p-5 overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${skill.color} opacity-10 rounded-full blur-2xl`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${skill.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {t(skill.titleVi, skill.titleEn)}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {t(skill.durationVi, skill.durationEn)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {t(skill.questionsVi, skill.questionsEn)}
                    </span>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {(t(skill.partsVi.join("|"), skill.partsEn.join("|")).split("|")).map((p, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground italic">
                      {t(skill.questionTypesVi, skill.questionTypesEn)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section: Roadmap by Band */}
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
    </div>
  );
};

export default IeltsExamBreakdown;
