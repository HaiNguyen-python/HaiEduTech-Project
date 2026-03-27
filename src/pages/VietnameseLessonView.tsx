// Vietnamese Language Lesson detail view with theory, vocabulary, and quiz
import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vietnameseLanguageModules } from "@/data/vietnameseCurriculumData";

const VietnameseLessonView = () => {
  const { moduleId, lessonId } = useParams();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const mod = useMemo(
    () => vietnameseLanguageModules.find((m) => m.id === moduleId),
    [moduleId]
  );

  const lesson = useMemo(() => {
    if (!mod) return null;
    if (lessonId) return mod.lessons.find((l) => l.id === lessonId) || mod.lessons[0];
    return mod.lessons[0];
  }, [mod, lessonId]);

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy bài học.", "Lesson not found.")}</p>
          <Link to="/learn-vietnamese" className="text-primary underline mt-4 inline-block">
            {t("Quay lại", "Go back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const score = submitted
    ? lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    : 0;

  const levelColors = {
    beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/learn-vietnamese" className="hover:text-foreground">{t("Tiếng Việt", "Vietnamese")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{t(mod.title, mod.titleEn)}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{t(lesson.title, lesson.titleEn)}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar: lesson list */}
            <aside className="lg:w-64 shrink-0">
              <h3 className="text-sm font-bold text-foreground mb-3">{t(mod.title, mod.titleEn)}</h3>
              <div className="space-y-1">
                {mod.lessons.map((l) => (
                  <Link
                    key={l.id}
                    to={`/learn-vietnamese/module/${mod.id}/${l.id}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      l.id === lesson.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {t(l.title, l.titleEn)}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={levelColors[lesson.level]}>{lesson.level}</Badge>
                  <h1 className="text-2xl font-bold text-foreground">
                    {t(lesson.title, lesson.titleEn)}
                  </h1>
                </div>

                {/* Theory */}
                <section className="prose prose-sm dark:prose-invert max-w-none mb-8">
                  <ReactMarkdown>{t(lesson.theory, lesson.theoryEn)}</ReactMarkdown>
                </section>

                {/* Pro Tips */}
                {lesson.proTips && lesson.proTips.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-foreground mb-3">💡 Pro Tips</h2>
                    <ul className="space-y-2">
                      {(t("vi", "en") === "vi" ? lesson.proTips : lesson.proTipsEn || lesson.proTips).map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Vocabulary */}
                {lesson.vocabulary.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-foreground mb-3">📖 {t("Từ vựng", "Vocabulary")}</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {lesson.vocabulary.map((v, i) => (
                        <div key={i} className="bg-card border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-foreground">{v.word}</span>
                            {v.partOfSpeech && (
                              <Badge variant="outline" className="text-xs">{v.partOfSpeech}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-primary mb-1">{t(v.meaning, v.meaningEn)}</p>
                          <p className="text-xs text-muted-foreground italic">{t(v.example, v.exampleEn)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Quiz */}
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-foreground mb-4">📝 Quiz</h2>
                  <div className="space-y-5">
                    {lesson.quiz.map((q, qi) => (
                      <div key={qi} className="bg-card border border-border rounded-xl p-5">
                        <p className="font-semibold text-foreground mb-3">
                          {qi + 1}. {t(q.question, q.questionEn)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            const selected = answers[qi] === oi;
                            const isCorrect = submitted && oi === q.answer;
                            const isWrong = submitted && selected && oi !== q.answer;
                            return (
                              <button
                                key={oi}
                                onClick={() => !submitted && setAnswers((p) => ({ ...p, [qi]: oi }))}
                                className={`text-left p-3 rounded-lg border transition-colors text-sm ${
                                  isCorrect
                                    ? "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30"
                                    : isWrong
                                    ? "bg-red-50 border-red-300 dark:bg-red-950/30"
                                    : selected
                                    ? "bg-primary/10 border-primary"
                                    : "bg-muted/50 border-border hover:bg-muted"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {submitted && (
                          <p className="text-xs text-muted-foreground mt-2">
                            💡 {t(q.explanation, q.explanationEn)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {!submitted ? (
                    <Button
                      onClick={() => setSubmitted(true)}
                      disabled={Object.keys(answers).length < lesson.quiz.length}
                      className="mt-4 w-full"
                    >
                      {t("Nộp bài", "Submit")}
                    </Button>
                  ) : (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold">
                        {t("Điểm", "Score")}: {score}/{lesson.quiz.length}
                      </p>
                      <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                        {t("Làm lại", "Retry")}
                      </Button>
                    </div>
                  )}
                </section>

                {/* Back */}
                <Link to="/learn-vietnamese">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("Quay lại", "Back")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseLessonView;
