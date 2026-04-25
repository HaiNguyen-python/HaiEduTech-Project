import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  CheckCircle,
  XCircle,
  ArrowRight,
  Send,
  Languages,
  Globe,
  Code2,
  Timer,
  Trophy,
  Star,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import {
  englishQuestions,
  chineseQuestions,
  programmingQuestions,
  getEnglishProfile,
  getChineseProfile,
  getProgrammingProfile,
  type AssessmentQuestion,
  type SkillProfile,
} from "@/data/assessmentData";

type Subject = "english" | "chinese" | "programming";
type Phase = "intro" | "select" | "quiz" | "result" | "leadgen";

// Subject card metadata
const SUBJECTS = [
  {
    key: "english" as Subject,
    icon: Languages,
    titleEn: "English Mastery",
    titleVi: "Tiếng Anh",
    descEn: "Assess your grammar, vocabulary, and reading skills.",
    descVi: "Đánh giá ngữ pháp, từ vựng và kỹ năng đọc hiểu.",
    gradient: "from-blue-500/20 to-blue-600/10",
    border: "hover:border-blue-400/50",
    iconColor: "text-blue-500",
  },
  {
    key: "chinese" as Subject,
    icon: Globe,
    titleEn: "Chinese Proficiency",
    titleVi: "Tiếng Trung",
    descEn: "Check your HSK level, Pinyin, and Hanzi recognition.",
    descVi: "Kiểm tra trình độ HSK, Pinyin và nhận biết Hán tự.",
    gradient: "from-red-500/20 to-red-600/10",
    border: "hover:border-red-400/50",
    iconColor: "text-red-500",
  },
  {
    key: "programming" as Subject,
    icon: Code2,
    titleEn: "Programming Logic",
    titleVi: "Lập Trình",
    descEn: "Test your syntax, logic, and problem-solving (Python/SQL).",
    descVi: "Kiểm tra cú pháp, logic và giải quyết vấn đề (Python/SQL).",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    border: "hover:border-emerald-400/50",
    iconColor: "text-emerald-500",
  },
];

/**
 * Adaptive difficulty: if first 3 correct, replace questions at index 3 & 4
 * with hard-difficulty questions NOT already in the first 3 positions.
 * Uses a Set of IDs to guarantee no duplicates.
 */
function getAdaptiveQuestions(
  bank: AssessmentQuestion[],
  answers: number[]
): AssessmentQuestion[] {
  if (answers.length < 3) return bank;

  const firstThreeCorrect = answers
    .slice(0, 3)
    .every((a, i) => a === bank[i].correct);

  if (!firstThreeCorrect) return bank;

  // IDs already used in the first 3 positions
  const usedIds = new Set(bank.slice(0, 3).map((q) => q.id));
  // Also include IDs at positions 3 and 4 so we skip them when finding replacements
  const currentIds = new Set(bank.map((q) => q.id));

  // Find hard questions not already in the bank selection
  const hardCandidates = bank
    .filter((q) => q.difficulty === "hard" && !usedIds.has(q.id));

  if (hardCandidates.length < 2) return bank;

  const result = [...bank];
  // Track what we're replacing to avoid putting the same question twice
  const replacementIds = new Set<string>();

  let replacementIdx = 0;
  for (let pos = 3; pos <= 4 && replacementIdx < hardCandidates.length; pos++) {
    const candidate = hardCandidates[replacementIdx];
    // Only replace if the candidate isn't already at this position
    if (result[pos].id !== candidate.id) {
      result[pos] = candidate;
    }
    replacementIdx++;
  }

  // Final deduplication pass: ensure all 10 questions have unique IDs
  const seen = new Set<string>();
  const deduplicated: AssessmentQuestion[] = [];
  for (const q of result) {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      deduplicated.push(q);
    }
  }

  return deduplicated;
}

interface AssessmentToolProps {
  /** Pre-select a subject and skip the selection screen */
  preSelectedSubject?: Subject;
  /** Hide the CTA section and only render the button + modal */
  inline?: boolean;
}

const AssessmentTool = ({ preSelectedSubject, inline }: AssessmentToolProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [subject, setSubject] = useState<Subject | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [profile, setProfile] = useState<SkillProfile | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  // Store the finalized question list used during the quiz for review
  const [finalQuestions, setFinalQuestions] = useState<AssessmentQuestion[]>([]);

  // Get question bank based on selected subject
  const getQuestionBank = useCallback((): AssessmentQuestion[] => {
    switch (subject) {
      case "english":
        return [...englishQuestions];
      case "chinese":
        return [...chineseQuestions];
      case "programming":
        return [...programmingQuestions];
      default:
        return [];
    }
  }, [subject]);

  // Timer countdown during quiz
  useEffect(() => {
    if (phase !== "quiz" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft]);

  const reset = () => {
    setPhase("intro");
    setSubject(null);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setEmail("");
    setTimeLeft(300);
    setProfile(null);
    setFinalQuestions([]);
  };

  const handleOpen = () => {
    reset();
    setOpen(true);
    // If a subject is pre-selected, go straight to quiz
    if (preSelectedSubject) {
      setSubject(preSelectedSubject);
      setPhase("quiz");
      setTimeLeft(300);
      setStartTime(Date.now());
    }
  };

  const selectSubject = (s: Subject) => {
    setSubject(s);
    setPhase("quiz");
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(300);
    setStartTime(Date.now());
  };

  const finishQuiz = useCallback(() => {
    if (!subject) return;

    const getProfile =
      subject === "english"
        ? getEnglishProfile
        : subject === "chinese"
        ? getChineseProfile
        : getProgrammingProfile;

    setProfile(getProfile(score));

    // Save the final questions for review
    const bank = getQuestionBank();
    setFinalQuestions(getAdaptiveQuestions(bank, answers));

    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const domain =
      subject === "english"
        ? "english"
        : subject === "chinese"
        ? "chinese"
        : "programming";

    logStudentActivity({
      activityType: `${subject}_assessment`,
      score,
      maxScore: 10,
      timeSpentSeconds: elapsed,
      domain,
      metadata: { answers, subject, isBaseline: true },
    });

    setPhase("result");
  }, [subject, score, startTime, answers, getQuestionBank]);

  const handleAnswer = (selected: number) => {
    const bank = getAdaptiveQuestions(getQuestionBank(), answers);
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (selected === bank[currentQ].correct) {
      setScore((s) => s + 1);
    }

    if (currentQ + 1 < bank.length) {
      setCurrentQ((q) => q + 1);
    } else {
      const finalScore =
        selected === bank[currentQ].correct ? score + 1 : score;
      setScore(finalScore);
      setTimeout(() => finishQuiz(), 50);
    }
  };

  const handleLeadSubmit = () => {
    if (!email.trim()) {
      toast.error(t("Vui lòng nhập email", "Please enter your email"));
      return;
    }
    toast.success(
      t("Đã gửi! Thầy Hải sẽ liên hệ sớm.", "Submitted! Teacher Hai will contact you soon.")
    );
    setPhase("leadgen");
  };

  const questions = getAdaptiveQuestions(getQuestionBank(), answers);
  const totalQ = questions.length;
  const progress = totalQ > 0 ? ((currentQ + 1) / totalQ) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const renderStars = (level: number) => (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= level
              ? "fill-primary text-primary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );

  // Inline button for embedding in course pages
  const renderButton = () => (
    <Button
      onClick={handleOpen}
      size="lg"
      className="gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:brightness-110"
    >
      <Zap className="h-5 w-5" />
      {t("Bắt Đầu Đánh Giá", "Start Assessment")}
    </Button>
  );

  return (
    <>
      {/* CTA Section - hidden when inline */}
      {!inline && (
        <section className="relative py-20 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container relative mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 shadow-lg shadow-primary/20">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
                {t("Đánh Giá Năng Lực ", "Free Skill ")}
                <span className="text-gradient">
                  {t("Miễn Phí", "Assessment")}
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                {t(
                  "Chọn môn học và làm bài kiểm tra 5 phút để biết trình độ hiện tại - nhận lộ trình cá nhân hóa từ hệ thống RL",
                  "Choose your subject and take a 5-minute test to discover your level - get a personalized roadmap from our RL Engine"
                )}
              </p>
              {renderButton()}
            </motion.div>
          </div>
        </section>
      )}

      {/* Inline mode: just a styled card with button */}
      {inline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 shadow-lg shadow-primary/20">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-foreground">
            {t("Kiểm Tra Năng Lực", "Skill Assessment")}
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
            {t(
              "Làm bài test 5 phút để biết trình độ hiện tại và nhận gợi ý khóa học phù hợp.",
              "Take a 5-minute test to discover your level and get course recommendations."
            )}
          </p>
          {renderButton()}
        </motion.div>
      )}

      {/* Assessment Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {phase === "intro" &&
                t("Đánh giá năng lực", "Skill Assessment")}
              {phase === "select" &&
                t("Chọn môn đánh giá", "Choose Your Subject")}
              {phase === "quiz" &&
                subject &&
                t(
                  `Đánh giá: ${SUBJECTS.find((s) => s.key === subject)?.titleVi}`,
                  `Assessment: ${SUBJECTS.find((s) => s.key === subject)?.titleEn}`
                )}
              {phase === "result" &&
                t("Hồ sơ năng lực của bạn", "Your Skill Profile")}
              {phase === "leadgen" && t("Cảm ơn bạn!", "Thank You!")}
            </DialogTitle>
          </DialogHeader>

          {/* Timer + Progress (during quiz) */}
          {phase === "quiz" && (
            <div className="flex items-center gap-3 mb-2">
              <Progress value={progress} className="flex-1 h-2" />
              <div
                className={`flex items-center gap-1 text-sm font-mono font-semibold ${
                  timeLeft < 60 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                <Timer className="h-4 w-4" />
                {formatTime(timeLeft)}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* INTRO */}
            {phase === "intro" && !preSelectedSubject && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 py-2"
              >
                <p className="text-sm leading-7 text-muted-foreground">
                  {t(
                    "Chọn 1 trong 3 môn: Tiếng Anh, Tiếng Trung hoặc Lập trình. Mỗi bài gồm 10 câu trong 5 phút. Kết quả sẽ được phân tích bởi hệ thống RL để tạo lộ trình cá nhân.",
                    "Choose from 3 subjects: English, Chinese, or Programming. Each test has 10 questions in 5 minutes. Results are analyzed by our RL system for a personalized roadmap."
                  )}
                </p>
                <Button
                  onClick={() => setPhase("select")}
                  className="w-full gap-2"
                >
                  {t("Chọn Môn Học", "Choose Subject")}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* SUBJECT SELECTION */}
            {phase === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 py-2 sm:grid-cols-3"
              >
                {SUBJECTS.map((s) => (
                  <motion.button
                    key={s.key}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectSubject(s.key)}
                    className={`flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all ${s.border} hover:shadow-lg`}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient}`}
                    >
                      <s.icon className={`h-7 w-7 ${s.iconColor}`} />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {t(s.titleVi, s.titleEn)}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {t(s.descVi, s.descEn)}
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* QUIZ QUESTIONS */}
            {phase === "quiz" && questions.length > 0 && (
              <motion.div
                key={`quiz-${currentQ}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {t("Câu", "Question")} {currentQ + 1} / {totalQ}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      questions[currentQ].difficulty === "easy"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : questions[currentQ].difficulty === "medium"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {questions[currentQ].difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="font-medium text-foreground leading-relaxed">
                  {t(
                    questions[currentQ].questionVi,
                    questions[currentQ].questionEn
                  )}
                </p>
                <div className="grid gap-2">
                  {questions[currentQ].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      <span className="mr-2 font-semibold text-muted-foreground">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULTS */}
            {phase === "result" && profile && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 py-2"
              >
                {/* Score card */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
                  <Trophy className="mx-auto mb-3 h-10 w-10 text-primary" />
                  <div className="mb-2">
                    {renderStars(profile.level)}
                  </div>
                  <div className="font-display text-2xl font-bold text-primary">
                    {t(profile.labelVi, profile.labelEn)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("Điểm", "Score")}: {score}/{finalQuestions.length || totalQ} •{" "}
                    {t("Thời gian", "Time")}:{" "}
                    {formatTime(300 - timeLeft)}
                  </p>
                </div>

                {/* Profile description */}
                <p className="text-center text-sm leading-relaxed text-foreground">
                  {t(profile.descriptionVi, profile.descriptionEn)}
                </p>

                {/* Detailed Answer Review */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h4 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                    📋 {t("Chi tiết đáp án", "Detailed Answers")}
                  </h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {finalQuestions.map((q, idx) => {
                      const userAnswer = answers[idx];
                      const isCorrect = userAnswer === q.correct;
                      return (
                        <div
                          key={q.id}
                          className={`rounded-lg p-3 text-sm border ${
                            isCorrect
                              ? "border-emerald-500/30 bg-emerald-500/5"
                              : "border-red-500/30 bg-red-500/5"
                          }`}
                        >
                          <div className="flex items-start gap-2 mb-1">
                            {isCorrect ? (
                              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            )}
                            <span className="font-medium text-foreground">
                              {t("Câu", "Q")} {idx + 1}: {t(q.questionVi, q.questionEn)}
                            </span>
                          </div>
                          <div className="ml-6 space-y-0.5">
                            {userAnswer !== undefined && !isCorrect && (
                              <p className="text-red-600 text-xs">
                                {t("Bạn chọn", "Your answer")}: <span className="font-medium">{q.options[userAnswer]}</span>
                              </p>
                            )}
                            <p className="text-emerald-600 text-xs">
                              {t("Đáp án đúng", "Correct answer")}: <span className="font-medium">{q.options[q.correct]}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Course recommendation */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                    {t("Gợi ý khóa học", "Recommended Course")}
                  </p>
                  <p className="text-sm font-medium text-foreground mb-3">
                    {t(
                      profile.recommendedCourseVi,
                      profile.recommendedCourseEn
                    )}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => {
                      setOpen(false);
                      navigate(profile.recommendedPath);
                    }}
                    className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    {t("Bắt đầu học ngay", "Start Learning Now")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Consultation CTA */}
                <div className="space-y-3 border-t border-border pt-4">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    {t(
                      "Chia sẻ kết quả với thầy Hải để tư vấn 1-1:",
                      "Share results with Teacher Hai for 1-on-1 consultation:"
                    )}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder={t("Email hoặc SĐT", "Email or Phone")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleLeadSubmit}
                      className="gap-1.5 shrink-0"
                    >
                      <Send className="h-4 w-4" />
                      {t("Gửi", "Send")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* THANK YOU */}
            {phase === "leadgen" && (
              <motion.div
                key="thanks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 text-center"
              >
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
                <p className="text-sm text-muted-foreground mb-1">
                  {t(
                    "Thầy Hải sẽ liên hệ bạn trong 24 giờ với lộ trình chi tiết.",
                    "Teacher Hai will contact you within 24 hours with a detailed roadmap."
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(
                    `Hồ sơ: ${profile?.labelVi} • Điểm: ${score}/${finalQuestions.length || totalQ}`,
                    `Profile: ${profile?.labelEn} • Score: ${score}/${finalQuestions.length || totalQ}`
                  )}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="mt-4"
                >
                  {t("Đóng", "Close")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssessmentTool;
