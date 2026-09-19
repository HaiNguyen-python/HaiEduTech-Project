// Language Lesson Viewer - renders theory, vocabulary, exercises, and quiz inline
import { useState, useEffect, useMemo } from "react";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { boldAndSanitize } from "@/lib/utils";
import { getGrammarModuleVisual } from "@/lib/grammarModuleVisuals";
import { resolveGrammarModuleId } from "@/data/languageCurriculum/grammarModuleMerge";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { satTeachingSequence, findSatSequenceIndex, satSequenceUrl } from "@/lib/satTeachingSequence";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrammarLessonCompanion from "@/components/grammar/GrammarLessonCompanion";
import GrammarExtraPractice from "@/components/grammar/GrammarExtraPractice";
import GrammarLessonOverview from "@/components/grammar/GrammarLessonOverview";
import LessonFeedback from "@/components/LessonFeedback";
import TheorySections from "@/components/TheorySections";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Loader2, BookOpen, GraduationCap, Sparkles, Star, PlayCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { allLanguageModules } from "@/data/languageCurriculum";
import type { LanguageModule, LanguageLesson, InteractiveExercise } from "@/data/languageCurriculum";
import {
  FillInBlankExercise,
  SentenceReorderExercise,
  DictationExercise,
  QuizExercise,
  ErrorCorrectionExercise,
  TransformationExercise,
  MultipleChoiceExercise,
  MatchingExercise,
} from "@/components/exercises";
import { cn } from "@/lib/utils";
import { getEnhancedGrammarTheory } from "@/lib/grammarTheoryEnhancer";
import SatStarToggle from "@/components/sat/SatStarToggle";
import SatMathToolkit from "@/components/sat/SatMathToolkit";
import { useSatStar } from "@/hooks/useSatStars";
import ListeningPracticeSetCard from "@/components/ielts/ListeningPracticeSetCard";
import { getListeningPracticeForLesson } from "@/data/ieltsListeningLessonMap";

const SatLessonStarDot = ({ lessonKey }: { lessonKey: string }) => {
  const { marked } = useSatStar(lessonKey);
  if (!marked) return null;
  return <Star className="w-3 h-3 ml-auto fill-amber-400 text-amber-500 shrink-0" />;
};

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// Difficulty badge colors
const difficultyConfig = {
  beginner: { label: "Beginner", labelVi: "Cơ bản", cls: "bg-green-500/10 text-green-700 border-green-500/20" },
  intermediate: { label: "Intermediate", labelVi: "Trung cấp", cls: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
  advanced: { label: "Advanced", labelVi: "Nâng cao", cls: "bg-red-500/10 text-red-700 border-red-500/20" },
};

const HTML_BLOCK_RE = /<(figure|svg|table|ul|ol|pre|div)/i;
const LIST_MARKER_RE = /(^|\n)\s*(?:[-*+]\s+|\d+[.)]\s+|\(\d+\)\s+)/;

const normalizeTheoryMarkdown = (markdown: string, category: LanguageModule["category"]) => {
  let raw = markdown.replace(
    /<figure[\s\S]*?<\/figure>/g,
    (block) => block.replace(/^[ \t]+/gm, "")
  );

  raw = raw.replace(
    /(^|\n)(\*\*[^*\n]+:\*\*)[ \t]*\n(?=[ \t]*(?:[-*+]\s+|\d+[.)]\s+|\(\d+\)\s+))/g,
    "$1$2\n\n"
  );

  if (category === "sat" || category === "ielts") {
    raw = raw
      .split(/\n{2,}/)
      .map((para) => {
        if (HTML_BLOCK_RE.test(para) || LIST_MARKER_RE.test(para)) return para;
        const splitChar = para.includes("•") ? "•" : (/\s·\s/.test(para) ? "·" : null);
        if (!splitChar) return para;
        const parts = para.split(new RegExp(`\\s*\\${splitChar}\\s*`)).map((s) => s.trim()).filter(Boolean);
        if (parts.length < 2) return para;
        let intro = "";
        let items = parts;
        const colonIdx = parts[0].lastIndexOf(":");
        if (colonIdx > 0 && colonIdx < parts[0].length - 1) {
          intro = parts[0].slice(0, colonIdx + 1).trim() + "\n\n";
          items = [parts[0].slice(colonIdx + 1).trim(), ...parts.slice(1)];
        } else if (colonIdx === parts[0].length - 1) {
          intro = parts[0] + "\n\n";
          items = parts.slice(1);
        }
        return intro + items.map((p) => `- ${p.replace(/[.,;]+$/, "")}`).join("\n");
      })
      .join("\n\n");
  }

  return raw
    .split(/\n{2,}/)
    .map((para) => {
      if (HTML_BLOCK_RE.test(para) || LIST_MARKER_RE.test(para)) return para;
      const matches = para.match(/\*\*[^*]+:\*\*/g);
      if (matches && matches.length >= 2) {
        const parts = para
          .split(/(?=\*\*[^*]+:\*\*)/)
          .map((s) => s.trim())
          .filter(Boolean);
        const intro = parts[0].startsWith("**") ? "" : parts.shift() + "\n\n";
        return intro + parts.map((p) => `- ${p}`).join("\n");
      }
      return para;
    })
    .join("\n\n");
};

const LanguageLessonView = () => {
  const { moduleId, lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isTeachSeq = searchParams.get("seq") === "sat";
  const { t } = useLanguage();

  const rawMod = useMemo(() => {
    const direct = allLanguageModules.find(m => m.id === moduleId);
    if (direct) return direct;
    const merged = resolveGrammarModuleId(moduleId);
    return merged !== moduleId ? allLanguageModules.find(m => m.id === merged) : undefined;
  }, [moduleId]);
  const mod = useMemo(() => {
    if (!rawMod) return undefined;
    // For English grammar modules, sort lessons by difficulty (beginner → advanced)
    // then by level so the sidebar acts as a clear learning roadmap.
    if (rawMod.category !== "grammar" || rawMod.language !== "english") return rawMod;
    const order = { beginner: 1, intermediate: 2, advanced: 3 } as const;
    return {
      ...rawMod,
      lessons: [...rawMod.lessons].sort((a, b) => {
        const d = order[a.difficulty] - order[b.difficulty];
        return d !== 0 ? d : (a.level ?? 0) - (b.level ?? 0);
      }),
    };
  }, [rawMod]);
  const [selectedLesson, setSelectedLesson] = useState<LanguageLesson | null>(null);
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
  const isEnglishGrammarLesson = mod.category === "grammar" && mod.language === "english";
  const parentPath = isEnglishGrammarLesson ? "/english/grammar" : mod.language === "chinese" ? "/chinese" : "/english";
  const parentLabel = isEnglishGrammarLesson ? "Grammar" : mod.language === "chinese" ? t("Tiếng Trung", "Chinese") : t("Tiếng Anh", "English");
  const isSatLesson = mod.category === "sat";
  const tr = (vi: string, en: string) => (isEnglishGrammarLesson ? en : t(vi, en));
  const lessonTheory = isEnglishGrammarLesson
    ? getEnhancedGrammarTheory(lesson, mod).replace(/^\s*#\s+[^\n]+\n+/, "")
    : (t(lesson.theory, lesson.theoryEn) || "");
  const grammarDifficultyKeys = ["beginner", "intermediate", "advanced"] as const;
  const lessonSequence = new Map(mod.lessons.map((item, index) => [item.id, index + 1]));
  const groupedLessonSections = grammarDifficultyKeys
    .map((levelKey) => ({
      levelKey,
      lessons: mod.lessons.filter((item) => item.difficulty === levelKey),
    }))
    .filter((section) => section.lessons.length > 0);

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
            wordBank={exercise.wordBank}
            forceEnglish={isEnglishGrammarLesson}
          />
        );
      case "sentence-reorder":
        return (
          <SentenceReorderExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            items={exercise.items}
            forceEnglish={isEnglishGrammarLesson}
          />
        );
      case "dictation":
        return (
          <DictationExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            sentences={exercise.sentences}
            forceEnglish={isEnglishGrammarLesson}
          />
        );
      case "error-correction":
        return (
          <ErrorCorrectionExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            items={exercise.items}
            forceEnglish={isEnglishGrammarLesson}
          />
        );
      case "transformation":
        return (
          <TransformationExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            items={exercise.items}
            forceEnglish={isEnglishGrammarLesson}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            questions={exercise.questions}
            forceEnglish={isEnglishGrammarLesson}
          />
        );
      case "matching":
        return (
          <MatchingExercise
            key={idx}
            instruction={exercise.instruction}
            instructionEn={exercise.instructionEn}
            pairs={exercise.pairs}
            forceEnglish={isEnglishGrammarLesson}
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
                {isEnglishGrammarLesson ? "English" : parentLabel}
              </Link>
              <ChevronRight className="w-3 h-3" />
              {isSatLesson ? (
                <Link to="/sat-curriculum" className="text-foreground font-medium hover:text-primary transition-colors">
                  {mod.icon} {t(mod.title, mod.titleEn)}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{mod.icon} {isEnglishGrammarLesson ? mod.titleEn : t(mod.title, mod.titleEn)}</span>
              )}
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-medium">{isEnglishGrammarLesson ? lesson.titleEn : t(lesson.title, lesson.titleEn)}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar - lesson list */}
              <div className="lg:w-72 shrink-0">
                <div className="glass-card rounded-xl p-4 sticky top-28">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      {tr("Danh sách bài học", "Lessons")}
                    </h3>
                    <span className="text-xs text-muted-foreground">{mod.lessons.length} {tr("bài", "lessons")}</span>
                  </div>
                  {isEnglishGrammarLesson && (
                    <div className="mb-3 rounded-lg border border-border bg-secondary/40 p-3 text-[11px] text-muted-foreground">
                      <p className="mb-2 flex items-center gap-1.5 font-medium text-foreground">
                        <Sparkles className="w-3 h-3 text-primary" />
                        {tr("Lộ trình học", "Learning order")}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {grammarDifficultyKeys.map((levelKey) => (
                          <span key={levelKey} className={cn("rounded border px-2 py-0.5", difficultyConfig[levelKey].cls)}>
                            {difficultyConfig[levelKey].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
                    {(isEnglishGrammarLesson ? groupedLessonSections : [{ levelKey: lesson.difficulty, lessons: mod.lessons }]).map((section) => (
                      <div key={section.levelKey} className="space-y-1">
                        {isEnglishGrammarLesson && (
                          <div className="px-2 text-[10px] font-bold uppercase text-muted-foreground">
                            {difficultyConfig[section.levelKey].label}
                          </div>
                        )}
                        {section.lessons.map((l) => {
                          const d = difficultyConfig[l.difficulty];
                          const isActive = selectedLesson.id === l.id;
                          const sequence = lessonSequence.get(l.id) ?? 1;
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
                                  {sequence}
                                </span>
                                <span className="truncate">{isEnglishGrammarLesson ? l.titleEn : t(l.title, l.titleEn)}</span>
                                {isEnglishGrammarLesson && sequence === 1 && (
                                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30 shrink-0">
                                    START
                                  </span>
                                )}
                                {isSatLesson && <SatLessonStarDot lessonKey={`sat:lesson:${mod.id}:${l.id}`} />}
                              </div>
                              <div className="flex items-center gap-2 ml-7 mt-1">
                                <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", d.cls)}>
                                  {isEnglishGrammarLesson ? d.label : t(d.labelVi, d.label)}
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
                    ))}
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
                  <div className="glass-card rounded-xl overflow-hidden">
                    {isEnglishGrammarLesson && (() => {
                      const visual = getGrammarModuleVisual(mod.id, mod.title, mod.titleEn);
                      return (
                        <div className="relative h-32 sm:h-40 overflow-hidden bg-muted">
                          <img
                            src={visual.src}
                            alt={visual.altEn}
                            loading="lazy"
                            width={1152}
                            height={576}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                        </div>
                      );
                    })()}
                    <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={cn("text-xs px-2 py-1 rounded-full border font-medium", diff.cls)}>
                        {isEnglishGrammarLesson ? diff.label : t(diff.labelVi, diff.label)}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < lesson.level ? "text-yellow-500 fill-yellow-500" : "text-muted")} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Level {lesson.level}</span>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <h1 className="text-2xl font-display font-bold text-foreground">
                        {mod.icon} {isEnglishGrammarLesson ? lesson.titleEn : t(lesson.title, lesson.titleEn)}
                      </h1>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        {isEnglishGrammarLesson && (
                          <Button asChild variant="outline" size="sm" className="gap-2">
                            <Link to="/english/grammar">
                              <ArrowLeft className="w-4 h-4" />
                              Back to Grammar
                            </Link>
                          </Button>
                        )}
                        {isSatLesson && (
                          <SatStarToggle storageKey={`sat:lesson:${mod.id}:${lesson.id}`} size="lg" />
                        )}
                      </div>
                     </div>
                    </div>
                   </div>

                  {/* Sequential Teaching Mode (SAT series) - prev/next across modules */}
                  {isTeachSeq && isSatLesson && (() => {
                    const seqIdx = findSatSequenceIndex(mod.id, lesson.id);
                    if (seqIdx < 0) return null;
                    const total = satTeachingSequence.length;
                    const prev = seqIdx > 0 ? satTeachingSequence[seqIdx - 1] : null;
                    const next = seqIdx < total - 1 ? satTeachingSequence[seqIdx + 1] : null;
                    const pct = ((seqIdx + 1) / total) * 100;
                    return (
                      <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/5 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <PlayCircle className="w-4 h-4 text-primary" />
                            {t(
                              `Chế độ giảng dạy SAT · Bài ${seqIdx + 1} / ${total}`,
                              `SAT Teaching Mode · Lesson ${seqIdx + 1} of ${total}`,
                            )}
                          </div>
                          <Link
                            to="/sat-curriculum"
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            {t("Thoát chuỗi", "Exit series")}
                          </Link>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mb-3">
                          <div className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex flex-wrap items-stretch justify-between gap-2">
                          <button
                            disabled={!prev}
                            onClick={() => prev && navigate(satSequenceUrl(seqIdx - 1))}
                            className="flex-1 min-w-[150px] inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/60 text-left disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            <ArrowLeft className="w-4 h-4 text-primary shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("Bài trước", "Previous")}</div>
                              <div className="text-xs font-medium text-foreground truncate">
                                {prev ? `${prev.moduleIcon} ${t(prev.lessonTitle, prev.lessonTitleEn)}` : t("Đây là bài đầu", "First lesson")}
                              </div>
                            </div>
                          </button>
                          <button
                            disabled={!next}
                            onClick={() => next && navigate(satSequenceUrl(seqIdx + 1))}
                            className="flex-1 min-w-[150px] inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 text-left disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary hover:bg-primary/15 transition-all"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] uppercase tracking-wide text-primary">{t("Bài tiếp theo", "Next lesson")}</div>
                              <div className="text-xs font-semibold text-foreground truncate">
                                {next ? `${next.moduleIcon} ${t(next.lessonTitle, next.lessonTitleEn)}` : t("Hoàn thành chuỗi 🎉", "Series complete 🎉")}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}



                  {/* IELTS Listening Practice CTA */}
                  {mod.id === "ielts-listening" && (
                    <Link to="/ielts-listening-practice" className="block group">
                      <div className="rounded-xl border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-2xl">
                            🎧
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {t("Luyện Nghe theo dạng câu hỏi", "Listening Practice by Question Type")}
                              </h3>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                {t("Mới", "New")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {t(
                                "6 bài luyện nghe có audio + transcript + chấm điểm: Form Completion, Multiple Choice, Map Labelling, Matching, Sentence Completion, Note Completion.",
                                "6 listening drills with audio + transcript + auto scoring: Form Completion, MCQ, Map Labelling, Matching, Sentence & Note Completion."
                              )}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                        </div>
                      </div>
                    </Link>
                  )}

                  {!isEnglishGrammarLesson && <GrammarLessonOverview lesson={lesson} module={mod} />}

                  {/* Theory - hidden for English Grammar lessons (practice-only view) */}
                  {!isEnglishGrammarLesson && (
                  <div className="glass-card rounded-lg border border-border p-4 font-manrope sm:p-6 lg:p-7">
                    <h2 className="mb-5 flex items-center gap-2.5 font-sora text-2xl font-bold leading-tight text-foreground sm:text-[26px]">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10" aria-hidden="true">
                        <GraduationCap className="size-5 text-primary" />
                      </span>
                      {tr("Lý thuyết", "Theory")}
                    </h2>
                    {isEnglishGrammarLesson ? (
                      <TheorySections
                        markdown={lessonTheory}
                        storageKey={`grammar-theory:${mod.id}:${lesson.id}`}
                        defaultCodeLanguage="text"
                      />
                    ) : (
                      <div className="prose max-w-none font-manrope text-base leading-7 text-secondary-foreground sm:text-[17px] sm:leading-8 [&_h1]:font-sora [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:mt-7 [&_h2]:font-sora [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-sora [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-foreground sm:[&_h3]:text-xl [&_h4]:font-sora [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-foreground [&_p]:my-3 [&_p]:leading-7 sm:[&_p]:leading-8 [&_strong]:font-bold [&_strong]:text-primary [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 [&_ol>li]:pl-1.5 [&_ol>li::marker]:font-bold [&_ol>li::marker]:text-primary [&_li]:my-0.5 [&_li]:pl-1 [&_code]:rounded-sm [&_code]:bg-primary/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-primary [&_svg]:mx-auto [&_svg]:my-5 [&_svg]:h-auto [&_svg]:max-w-full [&_figure]:my-6 [&_figure]:text-center [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-muted-foreground [&_table]:my-5 [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-primary/10 [&_th]:p-3 [&_th]:font-sora [&_th]:text-primary [&_td]:border [&_td]:border-border [&_td]:p-3">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                          {normalizeTheoryMarkdown(lessonTheory, mod.category)}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  )}

                  {!isEnglishGrammarLesson && <GrammarLessonCompanion lesson={lesson} module={mod} />}

                  {/* Pro Tips */}
                  {!isEnglishGrammarLesson && lesson.proTips && lesson.proTips.length > 0 && (
                    <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
                      <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        💡 {tr("Pro Tips", "Pro Tips")}
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
                  {!isEnglishGrammarLesson && lesson.vocabulary && lesson.vocabulary.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="font-semibold text-foreground mb-4">📚 {tr("Từ vựng", "Vocabulary")}</h2>
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
                            {v.example && (() => {
                              const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                              // Stem helper: strip common English/inflection suffixes so "implies/implied/implication" all match "imply"
                              const stem = (w: string) => {
                                let s = w.toLowerCase();
                                s = s.replace(/(ations?|ication|ization|ically|ing|ied|ies|ment|ness|tion|sion|able|ible|ous|ive|ant|ent|ly|ed|es|s|y|e)$/i, "");
                                return s.length >= 3 ? s : w.toLowerCase();
                              };
                              // Build candidate tokens: each word/phrase in v.word + a slash/comma split
                              const tokens = (v.word || "")
                                .split(/[,/;|]|\s+\/\s+/)
                                .map((t) => t.trim())
                                .filter((t) => t.length > 1);
                              const stems = Array.from(new Set(tokens.flatMap((t) =>
                                t.split(/\s+/).filter((w) => w.length > 1).map(stem).filter((s) => s.length >= 3)
                              )));
                              let highlighted = v.example;
                              // Bold whole multi-word phrases first
                              tokens.filter((t) => /\s/.test(t)).forEach((phrase) => {
                                const re = new RegExp(`\\b(${escape(phrase)})\\b`, "gi");
                                highlighted = highlighted.replace(re, "<<B>>$1<</B>>");
                              });
                              // Then bold any word starting with a known stem
                              if (stems.length) {
                                const re = new RegExp(`\\b(?!<<B>>)(${stems.map(escape).join("|")})[A-Za-zÀ-ỹ]*\\b`, "gi");
                                highlighted = highlighted.replace(re, "<<B>>$&<</B>>");
                              }
                              highlighted = highlighted.replace(/<<B>>/g, "**").replace(/<<\/B>>/g, "**");
                              return (
                                <p className="text-xs text-secondary-foreground">
                                  <span className="font-semibold text-primary mr-1">E.g.</span>
                                  <span dangerouslySetInnerHTML={boldAndSanitize(highlighted)} />
                                </p>
                              );
                            })()}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* IELTS Listening: per-lesson audio practice with script */}
                  {mod.id === "ielts-listening" && (() => {
                    const set = getListeningPracticeForLesson(lesson.id);
                    if (!set) return null;
                    return (
                      <div className="space-y-3">
                        <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                          🎧 {t("Bài tập nghe (audio + script)", "Listening Exercise (audio + script)")}
                        </h2>
                        <ListeningPracticeSetCard set={set} />
                      </div>
                    );
                  })()}

                  {/* Interactive Exercises */}
                  {lesson.exercises.length > 0 && (
                    <div className={cn("space-y-6", isEnglishGrammarLesson && "font-manrope")}>
                      <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                        🎯 {tr("Bài tập tương tác", "Interactive Exercises")}
                      </h2>
                      {lesson.exercises.map((ex, i) => (
                        <div key={i} className="glass-card rounded-xl p-6">
                          {isSatLesson && (
                            <div className="flex justify-end mb-3">
                              <SatStarToggle
                                storageKey={`sat:exercise:${mod.id}:${lesson.id}:${i}`}
                                size="sm"
                                label={{ vi: `Bài tập ${i + 1}`, en: `Exercise ${i + 1}` }}
                              />
                            </div>
                          )}
                          {renderExercise(ex, i)}
                        </div>
                      ))}
                      {isSatLesson && lesson.quiz.length > 0 && (
                        <div className="flex justify-end">
                          <SatStarToggle
                            storageKey={`sat:quiz:${mod.id}:${lesson.id}`}
                            size="sm"
                            label={{ vi: "Quiz đã hoàn thành", en: "Quiz completed" }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <GrammarExtraPractice lesson={lesson} module={mod} />

                  {/* Quiz */}
                  {lesson.quiz.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <QuizExercise
                        questions={lesson.quiz}
                        forceEnglish={isEnglishGrammarLesson}
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
                        {tr("Kết quả", "Result")}: {quizScore.score}/{quizScore.total}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {quizScore.score === quizScore.total
                          ? tr("Xuất sắc! Bạn đã hoàn thành tuyệt vời!", "Excellent! You've done perfectly!")
                          : quizScore.score >= quizScore.total / 2
                            ? tr("Khá tốt! Hãy ôn lại những phần chưa chắc.", "Good job! Review the parts you're unsure about.")
                            : tr("Cố gắng thêm! Hãy làm lại các bài tập sai.", "Keep trying! Redo the exercises you missed.")}
                      </p>
                    </motion.div>
                  )}

                  {isEnglishGrammarLesson && (
                    <div className="flex justify-center">
                      <Button asChild variant="outline" className="gap-2">
                        <Link to="/english/grammar">
                          <ArrowLeft className="w-4 h-4" />
                          Back to Grammar lessons
                        </Link>
                      </Button>
                    </div>
                  )}

                  {/* Lesson Feedback widget rendered globally in App.tsx — do not double-mount here */}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSatLesson && <SatMathToolkit />}
      <Footer />
    </div>
  );
};

export default LanguageLessonView;
