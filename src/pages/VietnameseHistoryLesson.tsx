// Vietnamese History Lesson detail page with illustrated story cards, key dates, and quiz
import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { historyMonths } from "@/data/vietnameseCurriculumData";
import { historyStorySegments } from "@/data/vietnamese/historyStorySegments";

const VietnameseHistoryLesson = () => {
  const { lessonId } = useParams();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Find lesson across all months
  const { lesson, month, nextLesson } = useMemo(() => {
    for (const m of historyMonths) {
      const idx = m.lessons.findIndex((l) => l.id === lessonId);
      if (idx !== -1) {
        const next = m.lessons[idx + 1] || null;
        return { lesson: m.lessons[idx], month: m, nextLesson: next };
      }
    }
    return { lesson: null, month: null, nextLesson: null };
  }, [lessonId]);

  // Get story segments for this lesson (if available)
  const segments = lessonId ? historyStorySegments[lessonId] : undefined;

  if (!lesson || !month) {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/learn-vietnamese" className="hover:text-foreground">{t("Tiếng Việt", "Vietnamese")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{t(month.title, month.titleEn)}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{t(lesson.title, lesson.titleEn)}</span>
          </div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className={`bg-gradient-to-r ${month.color} text-white mb-3`}>
              {month.icon} {t(month.title, month.titleEn)}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              {t(lesson.title, lesson.titleEn)}
            </h1>
          </motion.div>

          {/* Story Section */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {t("Câu chuyện", "Story")}
            </h2>

            {segments ? (
              /* Illustrated Story Cards */
              <div className="space-y-8">
                {segments.map((seg, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
                    >
                      {/* Segment Title */}
                      <div className="px-5 pt-5 pb-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {t(seg.title, seg.titleEn)}
                        </h3>
                      </div>

                      {/* Content: side-by-side on desktop, stacked on mobile */}
                      <div className={`flex flex-col ${seg.imageUrl ? (isEven ? 'md:flex-row' : 'md:flex-row-reverse') : ''}`}>
                        {/* Image */}
                        {seg.imageUrl && (
                          <div className="md:w-[40%] shrink-0 p-4">
                            <img
                              src={seg.imageUrl}
                              alt={t(seg.title, seg.titleEn)}
                              loading="lazy"
                              width={768}
                              height={512}
                              className="w-full h-48 md:h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}

                        {/* Text */}
                        <div className={`${seg.imageUrl ? 'md:w-[60%]' : 'w-full'} p-5 pt-2 flex items-center`}>
                          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-loose text-[1.2rem]" style={{ lineHeight: '1.9' }}>
                            <ReactMarkdown
                              components={{
                                strong: ({ children }) => (
                                  <strong className="text-primary font-bold">{children}</strong>
                                ),
                                em: ({ children }) => (
                                  <em className="text-muted-foreground not-italic text-sm bg-muted px-1.5 py-0.5 rounded">{children}</em>
                                ),
                              }}
                            >
                              {t(seg.text, seg.textEn)}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Fallback: single text block for lessons without segments */
              <div className="bg-card border border-border rounded-xl p-6 text-[1.2rem] text-foreground" style={{ lineHeight: '1.9' }}>
                {t(lesson.story, lesson.storyEn)}
              </div>
            )}
          </section>

          <Separator className="my-10" />

          {/* Key Dates */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t("Mốc thời gian quan trọng", "Key Dates")}
            </h2>
            <div className="space-y-3">
              {lesson.keyDates.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-card border border-border rounded-lg p-4"
                >
                  <span className="text-sm font-bold text-primary whitespace-nowrap min-w-[80px]">
                    {d.year}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{t(d.title, d.titleEn)}</p>
                    <p className="text-sm text-muted-foreground">{t(d.description, d.descriptionEn)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <Separator className="my-10" />

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">
              📝 {t("Kiểm tra kiến thức", "Knowledge Check")}
            </h2>
            <div className="space-y-6">
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
                              ? "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-700"
                              : isWrong
                              ? "bg-red-50 border-red-300 dark:bg-red-950/30 dark:border-red-700"
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
              <div className="mt-4 text-center">
                <p className="text-lg font-bold text-foreground">
                  {t("Điểm", "Score")}: {score}/{lesson.quiz.length}
                </p>
              </div>
            )}
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link to="/learn-vietnamese">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t("Quay lại", "Back")}
              </Button>
            </Link>
            {nextLesson && (
              <Link to={`/learn-vietnamese/history/${nextLesson.id}`}>
                <Button className="gap-2">
                  {t("Bài tiếp theo", "Next Lesson")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseHistoryLesson;
