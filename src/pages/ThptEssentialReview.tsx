/**
 * @file ThptEssentialReview.tsx
 * @description Essential Grammar & Vocabulary review for Vietnamese THPT National Exam.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { memo, useEffect, useMemo, useState } from "react";
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
import { thptVocabPracticeByTheme } from "@/data/thptVocabPractice";
import { thptGrammarStudyGuides } from "@/data/thptEssentialStudyGuides";
import { getVocabEmoji } from "@/data/thptVocabEmojis";
import { thptCollocationsExtraSets } from "@/data/thptCollocationsExtra";
import { thptCollocationsExtraSets2 } from "@/data/thptCollocationsExtra2";
import {
  thptWordFormationExtraSets,
  thptMixedFinalExtraSets,
} from "@/data/thptWordFormationMixedExtra";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Sparkles, AlertTriangle, Volume2, CheckCircle2, XCircle, RotateCcw, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { safeStorage } from "@/lib/safeStorage";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { balanceExerciseOptions } from "@/lib/balanceExerciseOptions";
import chibiVocabCheer from "@/assets/chibi-vocab-cheer.png";

const STORAGE_KEY = "thpt-essential-review-progress-v2";

interface SavedAttempt {
  answers: Record<number, number>;
  submitted: boolean;
  score?: number;
  updatedAt: number;
}

type SavedAttempts = Record<string, SavedAttempt>;

const AudioButton = ({ text, label }: { text: string; label: string }) => {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const play = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={play}
      disabled={!supported}
      className={cn("h-8 w-8 shrink-0", speaking && "bg-primary/10 text-primary")}
      aria-label={supported ? label : `${label} - audio unavailable`}
      title={supported ? label : "Audio unavailable"}
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  );
};

const HighlightedExample = memo(({ headword, example }: { headword: string; example: string }) => {
  const parts = useMemo(() => {
    const tokens = new Set<string>();
    headword.split("/").map((item) => item.trim()).filter(Boolean).forEach((phrase) => {
      tokens.add(phrase);
      phrase.split(/\s+/).filter((token) => token.length > 2 && !/^(the|and|for|with|sth|ving)$/i.test(token)).forEach((token) => tokens.add(token));
    });
    const escaped = Array.from(tokens).sort((a, b) => b.length - a.length).map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!escaped.length) return [{ text: example, highlighted: false }];
    const pattern = `(\\b(?:${escaped.join("|")})(?:s|es|ed|ing|ies|'s)?\\b)`;
    const split = new RegExp(pattern, "gi");
    const exact = new RegExp(`^${pattern}$`, "i");
    return example.split(split).filter(Boolean).map((text) => ({ text, highlighted: exact.test(text) }));
  }, [headword, example]);

  return <>{parts.map((part, index) => part.highlighted ? <strong key={index}>{part.text}</strong> : <span key={index}>{part.text}</span>)}</>;
});
HighlightedExample.displayName = "HighlightedExample";

const allGrammarTopics = [...thptGrammarTopics, ...thptGrammarTopicsExpansion];



// Merge per-theme extra words from thptVocabPractice into each VocabTheme by id.
// Deduplicate themes by id (keeps first occurrence; subsequent duplicates are skipped).
const _seenThemes = new Set<string>();
const mergedVocabThemes = [
  ...thptVocabThemes,
  ...thptVocabThemesExpansion,
  ...thptVocabThemesExpansion2,
]
  .filter((t) => {
    if (_seenThemes.has(t.id)) return false;
    _seenThemes.add(t.id);
    return true;
  })
  .map((theme) => {
    const extra = thptVocabPracticeByTheme[theme.id];
    const words = extra ? [...theme.words, ...extra.extraWords] : theme.words;
    const uniqueWords = Array.from(new Map(words.map((word) => [word.en.trim().toLowerCase(), word])).values());
    return { ...theme, words: uniqueWords };
  });
const allVocabThemes = mergedVocabThemes;

// Deduplicate exercise sets by id and assign a clear category for grouping.
const _seenSets = new Set<string>();
const _rawExerciseSets = [
  ...thptExerciseSets,
  ...thptExerciseSetsExpansion2,
  ...thptCollocationsExtraSets,
  ...thptCollocationsExtraSets2,
  ...thptWordFormationExtraSets,
  ...thptMixedFinalExtraSets,
].filter((s) => {
  if (_seenSets.has(s.id)) return false;
  _seenSets.add(s.id);
  return true;
});

type ExerciseCategoryKey =
  | "collocations-core"
  | "phrasal-idioms"
  | "grammar-practice"
  | "vocabulary-themes"
  | "word-formation"
  | "mixed-review";

const EXERCISE_CATEGORIES: Record<
  ExerciseCategoryKey,
  { icon: string; titleVi: string; titleEn: string; descVi: string; descEn: string }
> = {
  "collocations-core": {
    icon: "🔗",
    titleVi: "1. Collocations cốt lõi",
    titleEn: "1. Core Collocations",
    descVi: "MAKE / DO / TAKE / HAVE / GET, Adj+N, Adv+Adj, Verb+Prep - dạng phổ biến nhất trong cloze test.",
    descEn: "MAKE / DO / TAKE / HAVE / GET, Adj+N, Adv+Adj, Verb+Prep - most common cloze patterns.",
  },
  "phrasal-idioms": {
    icon: "💡",
    titleVi: "2. Phrasal Verbs & Idioms",
    titleEn: "2. Phrasal Verbs & Idioms",
    descVi: "Cụm động từ và thành ngữ thường gặp trong Reading & rewriting THPT.",
    descEn: "Phrasal verbs and idioms commonly tested in THPT Reading & rewriting.",
  },
  "grammar-practice": {
    icon: "📐",
    titleVi: "3. Bài tập Ngữ pháp trọng tâm",
    titleEn: "3. Core Grammar Practice",
    descVi: "12 thì, điều kiện, đảo ngữ, bị động, tường thuật, mệnh đề, modal, so sánh, liên từ…",
    descEn: "12 tenses, conditionals, inversion, passive, reported, clauses, modals, comparison, connectors…",
  },
  "vocabulary-themes": {
    icon: "📚",
    titleVi: "4. Từ vựng theo chủ đề",
    titleEn: "4. Vocabulary by Theme",
    descVi: "Giáo dục, môi trường, công nghệ, sức khỏe, việc làm, xã hội - bám sát đề THPT.",
    descEn: "Education, environment, technology, health, work, society - aligned with THPT topics.",
  },
  "word-formation": {
    icon: "🧱",
    titleVi: "5. Word Formation",
    titleEn: "5. Word Formation",
    descVi: "Suffix / prefix biến đổi từ loại - dạng câu rất hay xuất hiện ở phần cuối đề.",
    descEn: "Suffix / prefix word-class changes - frequently tested near the end of the exam.",
  },
  "mixed-review": {
    icon: "🏆",
    titleVi: "6. Tổng ôn hỗn hợp",
    titleEn: "6. Mixed Final Review",
    descVi: "Bài tổng ôn pha trộn nhiều dạng - mô phỏng đề thật.",
    descEn: "Mixed sweep simulating the real exam.",
  },
};

const categorizeSet = (id: string): ExerciseCategoryKey => {
  if (id.startsWith("ex-collocations-phrasal") || id === "ex-collocations-idioms-fixed") return "phrasal-idioms";
  if (id === "ex-collocations-mixed-review" || id === "ex-collocations-mixed-final" || id.startsWith("ex-mixed-final-review")) return "mixed-review";
  if (id === "ex-word-formation" || id.startsWith("ex-word-formation-")) return "word-formation";
  if (id.startsWith("ex-vocab-")) return "vocabulary-themes";
  if (id.startsWith("ex-collocations-")) return "collocations-core";
  // Grammar bucket: ex-tenses, ex-conditional-inversion, ex-passive-reported,
  // ex-relative-modal-comparison, ex-connectors-cleft-subj, ex-word-form-sva-tags
  return "grammar-practice";
};

const allExerciseSets = _rawExerciseSets;

// Build grouped structure preserving in-category order.
const groupedExerciseSets = (Object.keys(EXERCISE_CATEGORIES) as ExerciseCategoryKey[]).map((key) => ({
  key,
  meta: EXERCISE_CATEGORIES[key],
  sets: allExerciseSets.filter((s) => categorizeSet(s.id) === key),
}));

// Total quick-quiz items attached to vocab themes
const totalVocabQuiz = Object.values(thptVocabPracticeByTheme).reduce(
  (s, p) => s + p.quiz.length,
  0
);

interface ExerciseRunnerProps {
  setId: string;
  exercises: ThptExercise[];
}

const ExerciseRunner = ({ setId, exercises }: ExerciseRunnerProps) => {
  const { t } = useLanguage();
  const balancedExercises = useMemo(() => balanceExerciseOptions(exercises), [exercises]);
  const saved = safeStorage.get<SavedAttempts>(STORAGE_KEY, {})?.[setId];
  const [answers, setAnswers] = useState<Record<number, number>>(saved?.answers ?? {});
  const [submitted, setSubmitted] = useState(saved?.submitted ?? false);
  const [submitMessage, setSubmitMessage] = useState("");

  const correctCount = balancedExercises.reduce(
    (acc, ex, i) => acc + (answers[i] === ex.answer ? 1 : 0),
    0
  );

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setSubmitMessage("");
  };

  useEffect(() => {
    const attempts = safeStorage.get<SavedAttempts>(STORAGE_KEY, {}) ?? {};
    safeStorage.set(STORAGE_KEY, {
      ...attempts,
      [setId]: { answers, submitted, score: submitted ? correctCount : undefined, updatedAt: Date.now() },
    });
  }, [answers, correctCount, setId, submitted]);

  const submit = () => {
    const remaining = balancedExercises.length - Object.keys(answers).length;
    if (remaining > 0) {
      setSubmitMessage(t(`Bạn còn ${remaining} câu chưa trả lời.`, `${remaining} questions remain unanswered.`));
      return;
    }
    setSubmitted(true);
    setSubmitMessage(t(`Kết quả ${correctCount}/${balancedExercises.length}.`, `Score: ${correctCount}/${balancedExercises.length}.`));
    void logStudentActivity({
      activityType: "thpt_essential_review",
      activityId: setId,
      score: correctCount,
      maxScore: balancedExercises.length,
      metadata: { section: setId.startsWith("vocab-quiz-") ? "vocabulary" : "exercises" },
    });
  };

  return (
    <div className="space-y-4">
      {balancedExercises.map((ex, i) => {
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
                  <Button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [i]: oi }))}
                    variant="outline"
                    className={cn(
                      "h-auto min-h-11 w-full justify-start whitespace-normal text-left text-sm px-3 py-2 rounded-md transition",
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
                  </Button>
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
                {correctCount}/{balancedExercises.length}
              </span>
            </span>
          ) : (
            <span>
              {Object.keys(answers).length}/{balancedExercises.length} {t("đã chọn", "answered")}
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
              onClick={submit}
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              {t("Nộp bài", "Submit")}
            </Button>
          )}
        </div>
        <p className="min-h-6 text-sm font-medium text-muted-foreground" aria-live="polite">{submitMessage}</p>
      </div>
    </div>
  );
};

const ThptEssentialReview = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"grammar" | "vocabulary" | "exercises">(() => {
    const savedTab = safeStorage.get<string>("thpt-essential-tab", "grammar");
    return savedTab === "vocabulary" || savedTab === "exercises" ? savedTab : "grammar";
  });

  const totalExercises = allExerciseSets.reduce((s, set) => s + set.exercises.length, 0);

  return (
    <div className="purpose-course min-h-screen bg-background">
      <SEO
        title="Ôn tập Ngữ pháp & Từ vựng THPT Quốc gia | HaiEduTech"
        description="Ôn 18 chuyên đề ngữ pháp, 16 chủ đề từ vựng và 460 câu luyện tập tiếng Anh THPT có giải thích rõ ràng."
        path="/national-exam/essential-review"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" size="sm" onClick={() => navigate("/national-exam")} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại Phòng luyện thi", "Back to Practice Room")}
        </Button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border-b border-border pb-8 text-center mb-8">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="w-4 h-4 mr-2 inline" /> {t("Ôn tập trọng tâm", "Essential Review")}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-foreground">
            Essential Grammar & Vocabulary
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              `${allGrammarTopics.length} chuyên đề ngữ pháp, ${allVocabThemes.length} chủ đề từ vựng, ${totalExercises} câu luyện tổng hợp và ${totalVocabQuiz} câu luyện theo chủ đề.`,
              `${allGrammarTopics.length} grammar topics, ${allVocabThemes.length} vocabulary themes, ${totalExercises} general practice questions, and ${totalVocabQuiz} theme quizzes.`
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
            <div className="text-2xl font-bold text-primary">{totalExercises}</div>
            <div className="text-xs text-muted-foreground">{t("Câu tổng hợp", "General questions")}</div>
          </Card>
        </div>

        <Tabs value={tab} onValueChange={(v) => { const next = v as typeof tab; setTab(next); safeStorage.set("thpt-essential-tab", next); window.scrollTo({ top: 260, behavior: "smooth" }); }}>
          <div className="sticky top-[60px] z-20 -mx-4 mb-6 border-y border-border bg-background/95 px-4 py-3 backdrop-blur md:top-[92px]">
          <TabsList className="grid h-auto grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="grammar" className="min-w-0 whitespace-normal px-2 py-2 text-sm md:text-base">📘 <span>{t("Ngữ pháp", "Grammar")}</span><Badge variant="secondary" className="hidden sm:inline-flex">{allGrammarTopics.length}</Badge></TabsTrigger>
            <TabsTrigger value="vocabulary" className="min-w-0 whitespace-normal px-2 py-2 text-sm md:text-base">📚 <span>{t("Từ vựng", "Vocabulary")}</span><Badge variant="secondary" className="hidden sm:inline-flex">{allVocabThemes.length}</Badge></TabsTrigger>
            <TabsTrigger value="exercises" className="min-w-0 whitespace-normal px-2 py-2 text-sm md:text-base">🏋️ <span>{t("Bài tập", "Exercises")}</span><Badge variant="secondary" className="hidden sm:inline-flex">{totalExercises}</Badge></TabsTrigger>
          </TabsList>
          </div>

          {/* Grammar */}
          <TabsContent value="grammar" className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {allGrammarTopics.map((g, i) => (
                <AccordionItem
                  key={g.id}
                  value={g.id}
                  className="rounded-md border border-border bg-card px-4 shadow-sm data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{g.icon}</span>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">
                          {String(i + 1).padStart(2, "0")}. {lang === "vi" ? g.titleVi : g.titleEn}
                        </h3>
                        <div className="text-xs md:text-sm text-muted-foreground font-normal mt-0.5">
                          {lang === "vi" ? g.summaryVi : g.summaryEn}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
                    {thptGrammarStudyGuides[g.id] && (
                      <section className="rounded-md border border-primary/25 bg-primary/5 p-4 lg:col-span-2">
                        <h4 className="mb-2 font-bold text-primary">{t("Mục tiêu bài học", "Learning objective")}</h4>
                        <p className="leading-relaxed">{lang === "vi" ? thptGrammarStudyGuides[g.id].goalVi : thptGrammarStudyGuides[g.id].goalEn}</p>
                      </section>
                    )}
                    {/* In-depth explanation */}
                    {(g.detailVi || g.detailEn) && (
                      <section className="rounded-md border border-border bg-card p-4">
                        <h4 className="font-bold text-sm uppercase text-primary mb-2">
                          {t("Giải thích chi tiết", "In-depth Explanation")}
                        </h4>
                        <p className="text-sm md:text-[15px] leading-relaxed text-foreground/90">
                          {lang === "vi" ? g.detailVi : g.detailEn}
                        </p>
                      </section>
                    )}

                    {/* Formulas */}
                    {g.formulas && g.formulas.length > 0 && (
                      <section className="rounded-md border border-border bg-secondary/40 p-4">
                        <h4 className="font-bold text-sm uppercase text-primary mb-3">
                          📐 {t("Công thức cần nhớ", "Key Formulas")}
                        </h4>
                        <ul className="space-y-2">
                          {g.formulas.map((f, j) => (
                            <li
                              key={j}
                              className="font-mono text-[13px] md:text-sm bg-background/70 border border-border rounded-md px-3 py-2 leading-relaxed break-words"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Rules */}
                    <section className="rounded-md border border-primary/20 bg-primary/5 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> {t("Quy tắc cốt lõi", "Core Rules")}
                      </h4>
                      <div className="grid gap-2">
                        {g.rules.map((r, j) => {
                          const text = lang === "vi" ? r.vi : r.en;
                          const colonIdx = text.indexOf(":");
                          const hasLabel = colonIdx > 0 && colonIdx < 40;
                          const label = hasLabel ? text.slice(0, colonIdx).trim() : null;
                          const body = hasLabel ? text.slice(colonIdx + 1).trim() : text;
                          return (
                            <div
                              key={j}
                              className="flex gap-3 bg-background/60 border border-primary/15 rounded-md px-3 py-2 text-sm leading-relaxed"
                            >
                              <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold">
                                {j + 1}
                              </span>
                              <div className="flex-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                {label && (
                                  <span className="inline-block px-2 py-0.5 rounded bg-primary/15 text-primary text-xs font-bold uppercase tracking-wide">
                                    {label}
                                  </span>
                                )}
                                <span className="flex-1 min-w-[200px]">{body}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {thptGrammarStudyGuides[g.id] && (
                      <section className="rounded-md border border-border bg-secondary/40 p-4">
                        <h4 className="mb-3 font-bold text-primary">{t("Cách nhận diện trong đề", "How to identify it in the exam")}</h4>
                        <ol className="space-y-2 text-sm leading-relaxed">
                          {(lang === "vi" ? thptGrammarStudyGuides[g.id].recognitionVi : thptGrammarStudyGuides[g.id].recognitionEn).map((step, index) => (
                            <li key={step} className="flex gap-3"><span className="font-bold text-primary">{index + 1}.</span><span>{step}</span></li>
                          ))}
                        </ol>
                      </section>
                    )}

                    {/* Examples */}
                    <section className="rounded-md border border-primary/20 bg-primary/5 p-4">
                      <h4 className="font-bold text-sm uppercase text-primary mb-2">
                        {t("Ví dụ có phân tích", "Analysed examples")}
                      </h4>
                      <div className="space-y-2">
                        {g.examples.map((ex, k) => (
                          <div key={k} className="flex items-start gap-2 text-sm">
                            <AudioButton text={ex.en} label={t(`Nghe câu: ${ex.en}`, `Listen to: ${ex.en}`)} />
                            <div>
                              <div className="font-medium">{ex.en}</div>
                              <div className="text-xs text-muted-foreground italic">→ {ex.vi}</div>
                              <div className="mt-1 text-xs text-muted-foreground">{t("Câu này áp dụng trực tiếp công thức và quy tắc vừa học ở cột bên trái.", "This sentence directly applies the formula and rule shown in the study column.")}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {thptGrammarStudyGuides[g.id] && (
                      <section className="rounded-md border border-border bg-card p-4">
                        <h4 className="mb-2 font-bold text-primary">{t("So sánh dễ nhầm", "Important distinction")}</h4>
                        <p className="text-sm leading-relaxed">{lang === "vi" ? thptGrammarStudyGuides[g.id].contrastVi : thptGrammarStudyGuides[g.id].contrastEn}</p>
                      </section>
                    )}

                    {/* Common Mistakes ✗ vs ✓ */}
                    {g.mistakes && g.mistakes.length > 0 && (
                      <section className="rounded-md border border-destructive/25 bg-destructive/5 p-4">
                        <h4 className="font-bold text-sm uppercase text-destructive mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4" /> {t("Lỗi sai thường gặp", "Common Mistakes")}
                          <span className="text-xs font-normal text-muted-foreground normal-case">
                            ({t("✗ Sai vs ✓ Đúng", "✗ Wrong vs ✓ Right")})
                          </span>
                        </h4>
                        <div className="space-y-2.5">
                          {g.mistakes.map((mk, j) => (
                            <div key={j} className="rounded-md border border-border bg-background/60 overflow-hidden text-sm">
                              <div className="flex gap-2 px-3 py-2 bg-red-500/10 border-b border-red-500/20">
                                <span className="shrink-0 font-bold text-red-600 dark:text-red-400">✗</span>
                                <span className="line-through text-red-700 dark:text-red-300">{mk.wrongEn}</span>
                              </div>
                              <div className="flex gap-2 px-3 py-2 bg-emerald-500/10 border-b border-emerald-500/20">
                                <span className="shrink-0 font-bold text-emerald-600 dark:text-emerald-400">✓</span>
                                <span className="font-medium text-emerald-700 dark:text-emerald-300">{mk.rightEn}</span>
                              </div>
                              {(mk.noteVi || mk.noteEn) && (
                                <div className="px-3 py-1.5 text-xs italic text-muted-foreground">
                                  💡 {lang === "vi" ? (mk.noteVi || mk.noteEn) : (mk.noteEn || mk.noteVi)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Trap */}
                    <section className="rounded-md border border-accent/35 bg-accent/10 p-4">
                      <h4 className="font-bold text-sm uppercase text-foreground mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> {t("Bẫy thường gặp", "Common Trap")}
                      </h4>
                      <p className="text-sm leading-relaxed">{lang === "vi" ? g.trapVi : g.trapEn}</p>
                    </section>

                    {/* Mr Hai's exam tip */}
                    {(g.tipVi || g.tipEn) && (
                      <section className="rounded-md border border-accent/35 bg-accent/10 p-4">
                        <h4 className="font-bold text-sm uppercase text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> {t("Mẹo phòng thi của thầy Hải", "Mr. Hai's Exam Tip")}
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {lang === "vi" ? g.tipVi : g.tipEn}
                        </p>
                      </section>
                    )}
                    {thptGrammarStudyGuides[g.id] && (
                      <section className="rounded-md border border-primary/30 bg-primary/10 p-4 lg:col-span-2">
                        <h4 className="mb-2 font-bold text-primary">{t("Tự kiểm tra nhanh", "Quick self-check")}</h4>
                        <p className="leading-relaxed">{lang === "vi" ? thptGrammarStudyGuides[g.id].checkVi : thptGrammarStudyGuides[g.id].checkEn}</p>
                      </section>
                    )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Vocabulary */}
          <TabsContent value="vocabulary" className="space-y-4">
            {/* Chibi cheer banner */}
            <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-amber-400/10 p-4 md:p-5 flex items-center gap-4 mb-2">
              <img
                src={chibiVocabCheer}
                alt={t("Chibi học sinh cổ vũ", "Chibi student cheering")}
                width={96}
                height={96}
                loading="lazy"
                className="w-20 h-20 md:w-24 md:h-24 shrink-0 drop-shadow-md"
              />
              <div>
                <div className="font-bold text-base md:text-lg bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  {t("Bạn nhỏ ơi, cố lên nhé!", "You can do it, learner!")}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  {t(
                    "Mỗi ngày học chắc 5 từ + làm bài tập ngay sau đó, kỳ thi THPT sẽ trong tầm tay! ✨",
                    "Master 5 words a day and do the practice right after - THPT success is within reach! ✨"
                  )}
                </p>
              </div>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {allVocabThemes.map((v) => (
                <AccordionItem
                  key={v.id}
                  value={v.id}
                  className="rounded-md border border-border bg-card px-4 shadow-sm data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{v.icon}</span>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">
                          {lang === "vi" ? v.titleVi : v.titleEn}
                        </h3>
                        <div className="text-xs text-muted-foreground font-normal mt-0.5">
                          {v.words.length} {t("từ vựng", "words")}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {v.words.map((w) => (
                        <div
                          key={w.en}
                          className="relative rounded-lg border border-border bg-secondary/30 p-3 pl-12 hover:border-primary/40 hover:bg-primary/5 transition"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-2 top-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-emerald-500/15 text-xl shadow-sm"
                          >
                            {getVocabEmoji(v.id, w.en)}
                          </span>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="font-bold text-base">{w.en}</div>
                            <AudioButton text={w.en} label={t(`Nghe từ ${w.en}`, `Listen to ${w.en}`)} />
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary mr-1">{w.pos}</span>
                            {w.vi}
                          </div>
                          <div className="text-sm text-foreground/80">
                            <span className="not-italic font-semibold text-primary mr-1">E.g.</span>
                            <HighlightedExample headword={w.en} example={w.example} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Inline practice quiz tied to this theme's vocabulary */}
                    {thptVocabPracticeByTheme[v.id] && (
                      <div className="rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-primary/5 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Dumbbell className="w-5 h-5 text-emerald-600" />
                          <h4 className="font-bold text-sm md:text-base uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                            {t("Bài tập theo bộ từ vựng", "Practice with these words")}
                          </h4>
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {thptVocabPracticeByTheme[v.id].quiz.length} {t("câu", "items")}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3">
                          {t(
                            "Áp dụng ngay các từ vừa học bằng câu hỏi trắc nghiệm theo phong cách đề THPT.",
                            "Apply the words you just learnt with THPT-style multiple-choice questions."
                          )}
                        </p>
                        <ExerciseRunner
                          setId={`vocab-quiz-${v.id}`}
                          exercises={thptVocabPracticeByTheme[v.id].quiz}
                        />
                      </div>
                    )}
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
                "Prioritise the first 3 Collocation sets - these patterns appear MASSIVELY in the cloze and rewriting parts of the THPT exam."
              )}
            </div>
            <div className="space-y-8">
              {groupedExerciseSets.map((group) => {
                if (group.sets.length === 0) return null;
                const totalQs = group.sets.reduce((s, set) => s + set.exercises.length, 0);
                return (
                  <section key={group.key} className="space-y-3">
                    <div className="rounded-xl border-2 border-primary/25 bg-gradient-to-r from-primary/10 via-emerald-500/5 to-transparent p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{group.meta.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                            {lang === "vi" ? group.meta.titleVi : group.meta.titleEn}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                            {lang === "vi" ? group.meta.descVi : group.meta.descEn}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {group.sets.length} {t("bộ", "sets")} · {totalQs} {t("câu", "Qs")}
                        </Badge>
                      </div>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      {group.sets.map((set, i) => (
                        <AccordionItem
                          key={set.id}
                          value={set.id}
                          className="rounded-md border border-border bg-card px-4 shadow-sm data-[state=open]:border-primary/50"
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-3 text-left">
                              <span className="text-3xl">{set.icon}</span>
                              <div>
                        <h3 className="font-bold text-base md:text-lg">
                                  {String(i + 1).padStart(2, "0")}. {lang === "vi" ? set.titleVi : set.titleEn}
                        </h3>
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
                  </section>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ThptEssentialReview;
