/**
 * @file ThptEssentialReview.tsx
 * @description Essential Grammar & Vocabulary review for Vietnamese THPT National Exam.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { thptGrammarTopics, thptVocabThemes } from "@/data/thptEssentialReview";
import {
  thptGrammarTopicsExpansion,
  thptVocabThemesExpansion,
  thptExerciseSets,
  type ThptExercise,
} from "@/data/thptEssentialReviewExpansion";
import {
  thptVocabThemesExpansion2,
  thptExerciseSetsExpansion2,
} from "@/data/thptEssentialReviewExpansion2";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Sparkles, AlertTriangle, Volume2, CheckCircle2, XCircle, RotateCcw, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "en-US";
  utt.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
};

const allGrammarTopics = [...thptGrammarTopics, ...thptGrammarTopicsExpansion];
const allVocabThemes = [...thptVocabThemes, ...thptVocabThemesExpansion, ...thptVocabThemesExpansion2];
const allExerciseSets = [...thptExerciseSets, ...thptExerciseSetsExpansion2];

interface ExerciseRunnerProps {
  setId: string;
  exercises: ThptExercise[];
}

const ExerciseRunner = ({ setId, exercises }: ExerciseRunnerProps) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = exercises.reduce(
    (acc, ex, i) => acc + (answers[i] === ex.answer ? 1 : 0),
    0
  );

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {exercises.map((ex, i) => {
        const userAns = answers[i];
        const showResult = submitted;
        return (
          <div
            key={`${setId}-${i}`}
            className="rounded-lg border border-border bg-secondary/30 p-4"
          >
            <div className="font-medium text-sm md:text-base mb-3">
              <span className="text-primary font-bold mr-2">{i + 1}.</span>
              {ex.q}
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {ex.options.map((opt, oi) => {
                const isCorrect = oi === ex.answer;
                const isPicked = userAns === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [i]: oi }))}
                    className={cn(
                      "text-left text-sm px-3 py-2 rounded-lg border transition",
                      !showResult && isPicked && "border-primary bg-primary/10",
                      !showResult && !isPicked && "border-border hover:border-primary/50 hover:bg-primary/5",
                      showResult && isCorrect && "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                      showResult && isPicked && !isCorrect && "border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-300",
                      showResult && !isPicked && !isCorrect && "border-border opacity-70"
                    )}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                    {showResult && isCorrect && <CheckCircle2 className="inline w-4 h-4 ml-2" />}
                    {showResult && isPicked && !isCorrect && <XCircle className="inline w-4 h-4 ml-2" />}
                  </button>
                );
              })}
            </div>
            {showResult && (
              <p className="mt-3 text-xs italic text-muted-foreground">
                💡 {ex.explanation}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-sm text-muted-foreground">
          {submitted ? (
            <span>
              {t("Kết quả: ", "Score: ")}
              <span className="font-bold text-primary">
                {correctCount}/{exercises.length}
              </span>
            </span>
          ) : (
            <span>
              {Object.keys(answers).length}/{exercises.length} {t("đã chọn", "answered")}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {submitted ? (
            <Button onClick={reset} variant="outline" size="sm" className="gap-1">
              <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Retry")}
            </Button>
          ) : (
            <Button
              onClick={() => setSubmitted(true)}
              size="sm"
              disabled={Object.keys(answers).length === 0}
              className="bg-gradient-to-r from-primary to-emerald-500 text-white"
            >
              {t("Nộp bài", "Submit")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ThptEssentialReview = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"grammar" | "vocabulary" | "exercises">("grammar");

  const totalExercises = allExerciseSets.reduce((s, set) => s + set.exercises.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Ôn tập Ngữ pháp & Từ vựng THPT Quốc gia | HaiEduTech"
        description="Hệ thống chuyên đề ngữ pháp trọng tâm, chủ đề từ vựng và hơn 80 bài tập (đặc biệt mảng Collocations) chuẩn bị cho kỳ thi THPT Quốc gia môn tiếng Anh."
        path="/national-exam/essential-review"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" size="sm" onClick={() => navigate("/national-exam")} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại Phòng luyện thi", "Back to Practice Room")}
        </Button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="w-4 h-4 mr-2 inline" /> {t("Ôn tập trọng tâm", "Essential Review")}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            Essential Grammar & Vocabulary
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              `${allGrammarTopics.length} chuyên đề ngữ pháp, ${allVocabThemes.length} chủ đề từ vựng và ${totalExercises}+ bài tập - bám sát cấu trúc đề thi THPT Quốc gia, đặc biệt mạnh mảng Collocations.`,
              `${allGrammarTopics.length} grammar topics, ${allVocabThemes.length} vocabulary themes and ${totalExercises}+ practice items — aligned with the THPT National Exam, with a strong Collocations focus.`
            )}
          </p>
        </motion.div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-3xl mx-auto">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allGrammarTopics.length}</div>
            <div className="text-xs text-muted-foreground">{t("Chuyên đề", "Grammar topics")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allVocabThemes.length}</div>
            <div className="text-xs text-muted-foreground">{t("Chủ đề từ vựng", "Vocab themes")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {allVocabThemes.reduce((s, v) => s + v.words.length, 0)}+
            </div>
            <div className="text-xs text-muted-foreground">{t("Từ cao tần", "Key words")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalExercises}+</div>
            <div className="text-xs text-muted-foreground">{t("Bài tập", "Practice items")}</div>
          </Card>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-6">
            <TabsTrigger value="grammar">📘 {t("Ngữ pháp", "Grammar")}</TabsTrigger>
            <TabsTrigger value="vocabulary">📚 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
            <TabsTrigger value="exercises">🏋️ {t("Bài tập", "Exercises")}</TabsTrigger>
          </TabsList>

          {/* Grammar */}
          <TabsContent value="grammar" className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {allGrammarTopics.map((g, i) => (
                <AccordionItem
                  key={g.id}
                  value={g.id}
                  className="rounded-xl border-2 border-border bg-card px-4 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{g.icon}</span>
                      <div>
                        <div className="font-bold text-base md:text-lg">
                          {String(i + 1).padStart(2, "0")}. {lang === "vi" ? g.titleVi : g.titleEn}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground font-normal mt-0.5">
                          {lang === "vi" ? g.summaryVi : g.summaryEn}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 space-y-4">
                    {/* Rules */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> {t("Quy tắc cốt lõi", "Core Rules")}
                      </h4>
                      <ul className="space-y-1.5 text-sm">
                        {g.rules.map((r, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-primary font-bold">▸</span>
                            <span>{lang === "vi" ? r.vi : r.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-emerald-600 mb-2">
                        {t("Ví dụ", "Examples")}
                      </h4>
                      <div className="space-y-2">
                        {g.examples.map((ex, k) => (
                          <div key={k} className="flex items-start gap-2 text-sm">
                            <button
                              type="button"
                              onClick={() => speak(ex.en)}
                              className="shrink-0 p-1 rounded hover:bg-emerald-500/20 transition"
                              aria-label="Listen"
                            >
                              <Volume2 className="w-4 h-4 text-emerald-600" />
                            </button>
                            <div>
                              <div className="font-medium">{ex.en}</div>
                              <div className="text-xs text-muted-foreground italic">→ {ex.vi}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trap */}
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-amber-600 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> {t("Bẫy thường gặp", "Common Trap")}
                      </h4>
                      <p className="text-sm leading-relaxed">{lang === "vi" ? g.trapVi : g.trapEn}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Vocabulary */}
          <TabsContent value="vocabulary" className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {allVocabThemes.map((v) => (
                <AccordionItem
                  key={v.id}
                  value={v.id}
                  className="rounded-xl border-2 border-border bg-card px-4 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{v.icon}</span>
                      <div>
                        <div className="font-bold text-base md:text-lg">
                          {lang === "vi" ? v.titleVi : v.titleEn}
                        </div>
                        <div className="text-xs text-muted-foreground font-normal mt-0.5">
                          {v.words.length} {t("từ vựng", "words")}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {v.words.map((w) => (
                        <div
                          key={w.en}
                          className="rounded-lg border border-border bg-secondary/30 p-3 hover:border-primary/40 hover:bg-primary/5 transition"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="font-bold text-base">{w.en}</div>
                            <button
                              type="button"
                              onClick={() => speak(w.en)}
                              className="shrink-0 p-1 rounded hover:bg-primary/15 transition"
                              aria-label="Listen"
                            >
                              <Volume2 className="w-4 h-4 text-primary" />
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary mr-1">{w.pos}</span>
                            {w.vi}
                          </div>
                          <div className="text-sm italic text-foreground/80">"{w.example}"</div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Exercises */}
          <TabsContent value="exercises" className="space-y-4">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 mb-2 text-sm">
              <strong className="text-primary">
                <Dumbbell className="w-4 h-4 inline mr-1" /> {t("Mẹo của thầy Hải:", "Mr. Hai's tip:")}
              </strong>{" "}
              {t(
                "Hãy ưu tiên 3 bộ Collocations đầu - đây là dạng câu hỏi xuất hiện DÀY ĐẶC trong cloze test và viết lại câu của đề THPT.",
                "Prioritise the first 3 Collocation sets — these patterns appear MASSIVELY in the cloze and rewriting parts of the THPT exam."
              )}
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {allExerciseSets.map((set, i) => (
                <AccordionItem
                  key={set.id}
                  value={set.id}
                  className="rounded-xl border-2 border-border bg-card px-4 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{set.icon}</span>
                      <div>
                        <div className="font-bold text-base md:text-lg">
                          {String(i + 1).padStart(2, "0")}. {lang === "vi" ? set.titleVi : set.titleEn}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground font-normal mt-0.5">
                          {set.exercises.length} {t("câu", "items")} · {lang === "vi" ? set.focusVi : set.focusEn}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <ExerciseRunner setId={set.id} exercises={set.exercises} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ThptEssentialReview;
