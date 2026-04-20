// Language Lesson Viewer — renders theory, vocabulary, exercises, and quiz inline
import { useState, useEffect, useMemo } from "react";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { boldAndSanitize } from "@/lib/utils";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LessonFeedback from "@/components/LessonFeedback";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Loader2, BookOpen, GraduationCap, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { allLanguageModules } from "@/data/languageCurriculum";
import type { LanguageModule, LanguageLesson, InteractiveExercise } from "@/data/languageCurriculum";
import { FillInBlankExercise, SentenceReorderExercise, DictationExercise, QuizExercise } from "@/components/exercises";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Difficulty badge colors
const difficultyConfig = {
  beginner: { label: "Beginner", labelVi: "Cơ bản", cls: "bg-green-500/10 text-green-700 border-green-500/20" },
  intermediate: { label: "Intermediate", labelVi: "Trung cấp", cls: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
  advanced: { label: "Advanced", labelVi: "Nâng cao", cls: "bg-red-500/10 text-red-700 border-red-500/20" },
};

const LanguageLessonView = () => {
  const { moduleId, lessonId } = useParams();
  const { t } = useLanguage();

  const mod = useMemo(() => allLanguageModules.find(m => m.id === moduleId), [moduleId]);
  const [selectedLesson, setSelectedLesson] = useState<LanguageLesson | null>(null);
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    if (!mod) return;
    if (lessonId) {
      const l = mod.lessons.find(l => l.id === lessonId);
      setSelectedLesson(l || mod.lessons[0]);
    } else {
      setSelectedLesson(mod.lessons[0]);
    }
    setQuizScore(null);
  }, [mod, lessonId]);

  if (!mod) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">{t("Đang tải...", "Loading...")}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!selectedLesson) return null;

  const lesson = selectedLesson;
  const diff = difficultyConfig[lesson.difficulty];
  const parentPath = mod.language === "chinese" ? "/chinese" : "/english";
  const parentLabel = mod.language === "chinese" ? t("Tiếng Trung", "Chinese") : t("Tiếng Anh", "English");

  // Exercise renderer
  const renderExercise = (exercise: InteractiveExercise, idx: number) => {
    switch (exercise.type) {
      case "fill-in-blank":
        return (
          <FillInBlankExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            sentences={exercise.sentences}
          />
        );
      case "sentence-reorder":
        return (
          <SentenceReorderExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            items={exercise.items}
          />
        );
      case "dictation":
        return (
          <DictationExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            sentences={exercise.sentences}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link to={parentPath} className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                {parentLabel}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{mod.icon} {t(mod.title, mod.titleEn)}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-medium">{t(lesson.title, lesson.titleEn)}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar - lesson list */}
              <div className="lg:w-72 shrink-0">
                <div className="glass-card rounded-xl p-4 sticky top-28">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      {t("Danh sách bài học", "Lessons")}
                    </h3>
                    <span className="text-xs text-muted-foreground">{mod.lessons.length} {t("bài", "lessons")}</span>
                  </div>
                  <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                    {mod.lessons.map((l, i) => {
                      const d = difficultyConfig[l.difficulty];
                      const isActive = selectedLesson.id === l.id;
                      return (
                        <button
                          key={l.id}
                          onClick={() => { setSelectedLesson(l); setQuizScore(null); }}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all group",
                            isActive
                              ? "bg-primary/10 text-primary font-medium border border-primary/20"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0",
                              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                              {i + 1}
                            </span>
                            <span className="truncate">{t(l.title, l.titleEn)}</span>
                          </div>
                          <div className="flex items-center gap-2 ml-7 mt-1">
                            <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", d.cls)}>
                              {t(d.labelVi, d.label)}
                            </span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, si) => (
                                <Star key={si} className={cn("w-2.5 h-2.5", si < l.level ? "text-yellow-500 fill-yellow-500" : "text-muted")} />
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Lesson header */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={cn("text-xs px-2 py-1 rounded-full border font-medium", diff.cls)}>
                        {t(diff.labelVi, diff.label)}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < lesson.level ? "text-yellow-500 fill-yellow-500" : "text-muted")} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Level {lesson.level}</span>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-foreground">
                      {mod.icon} {t(lesson.title, lesson.titleEn)}
                    </h1>
                  </div>

                  {/* Theory */}
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      {t("Lý thuyết", "Theory")}
                    </h2>
                    <div className="prose prose-base max-w-none text-secondary-foreground leading-[1.85] text-[17px] space-y-3 [&_p]:my-3 [&_strong]:text-primary [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:space-y-2 [&_li]:my-1 [&_code]:bg-primary/10 [&_code]:text-primary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_svg]:my-4 [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:h-auto [&_figure]:my-5 [&_figure]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-2 [&_figcaption]:italic [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_th]:bg-primary/10 [&_th]:text-primary [&_th]:p-2 [&_th]:border [&_th]:border-border [&_td]:p-2 [&_td]:border [&_td]:border-border">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {(() => {
                          const raw = t(lesson.theory, lesson.theoryEn) || "";
                          // Split inline "**Label:**" segments onto their own bullet lines for readability
                          // when the paragraph contains 2+ bold-labeled categories run together.
                          return raw
                            .split(/\n{2,}/)
                            .map((para) => {
                              const matches = para.match(/\*\*[^*]+:\*\*/g);
                              if (matches && matches.length >= 2) {
                                // Split before each "**Label:**" and convert to bullet list
                                const parts = para
                                  .split(/(?=\*\*[^*]+:\*\*)/)
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                // First part may be intro text without a bold label
                                const intro = parts[0].startsWith("**") ? "" : parts.shift() + "\n\n";
                                return intro + parts.map((p) => `- ${p}`).join("\n");
                              }
                              return para;
                            })
                            .join("\n\n");
                        })()}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Pro Tips */}
                  {lesson.proTips && lesson.proTips.length > 0 && (
                    <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
                      <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        💡 {t("Pro Tips", "Pro Tips")}
                      </h2>
                      <ul className="space-y-2">
                        {(lesson.proTipsEn ? lesson.proTipsEn : lesson.proTips)?.map((tip: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                            <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Vocabulary */}
                  {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="font-semibold text-foreground mb-4">📚 {t("Từ vựng", "Vocabulary")}</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {lesson.vocabulary.map((v, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-secondary rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-baseline gap-3 mb-1">
                              <span className={cn(
                                "font-bold text-foreground",
                                mod.language === "chinese" ? "text-2xl" : "text-lg"
                              )}>
                                {v.word}
                              </span>
                              {v.pinyin && <span className="text-primary text-sm font-medium">{v.pinyin}</span>}
                              {v.ipa && <span className="text-primary text-xs font-mono">{v.ipa}</span>}
                              {v.partOfSpeech && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground italic">{v.partOfSpeech}</span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{v.meaning}</p>
                            <p className="text-xs text-secondary-foreground" dangerouslySetInnerHTML={boldAndSanitize(v.example)} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Exercises */}
                  {lesson.exercises.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                        🎯 {t("Bài tập tương tác", "Interactive Exercises")}
                      </h2>
                      {lesson.exercises.map((ex, i) => (
                        <div key={i} className="glass-card rounded-xl p-6">
                          {renderExercise(ex, i)}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quiz */}
                  {lesson.quiz.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <QuizExercise
                        questions={lesson.quiz}
                        onComplete={(score, total) => {
                          setQuizScore({ score, total });
                          logStudentActivity({
                            activityType: "language_lesson_quiz",
                            activityId: lesson.id,
                            score,
                            maxScore: total,
                            domain: mod.language === "chinese" ? "chinese" : "english",
                          });
                        }}
                      />
                    </div>
                  )}

                  {/* Score summary */}
                  {quizScore && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "glass-card rounded-xl p-6 border-t-4 text-center",
                        quizScore.score === quizScore.total ? "border-green-500" :
                          quizScore.score >= quizScore.total / 2 ? "border-yellow-500" : "border-destructive"
                      )}
                    >
                      <div className="text-4xl mb-2">
                        {quizScore.score === quizScore.total ? "🎉" :
                          quizScore.score >= quizScore.total / 2 ? "👍" : "💪"}
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        {t("Kết quả", "Result")}: {quizScore.score}/{quizScore.total}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {quizScore.score === quizScore.total
                          ? t("Xuất sắc! Bạn đã hoàn thành tuyệt vời!", "Excellent! You've done perfectly!")
                          : quizScore.score >= quizScore.total / 2
                            ? t("Khá tốt! Hãy ôn lại những phần chưa chắc.", "Good job! Review the parts you're unsure about.")
                            : t("Cố gắng thêm! Hãy đọc lại lý thuyết và thử lại.", "Keep trying! Re-read the theory and try again.")}
                      </p>
                    </motion.div>
                  )}

                  {/* Lesson Feedback */}
                  {selectedLesson && (
                    <LessonFeedback
                      lessonId={selectedLesson.id}
                      moduleId={mod.id}
                      lessonType={mod.category?.includes("chinese") || mod.id.includes("chinese") || mod.id.includes("hsk") ? "chinese" : "english"}
                      subject={mod.category || "english"}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LanguageLessonView;
