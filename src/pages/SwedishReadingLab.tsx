/**
 * @file SwedishReadingLab.tsx
 * @description /swedish/reading — YKI Ruotsi Läsförståelse practice.
 *              Displays sv-SE passages (emails, ads, blog, news, story) with
 *              VI translation toggle, key vocab, and MCQ / T-F / vocab-in-context
 *              questions with automatic scoring.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import {
  BookOpen, Eye, EyeOff, CheckCircle2, XCircle, Sparkles, RotateCcw,
  Clock, Volume2, Check,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { playSwedishTtsScript, stopSwedishSequence } from "@/lib/swedishTts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import {
  SWEDISH_READING_PASSAGES,
  type SwedishReadingPassage,
} from "@/data/swedishReadingPassages";
import SwedishReadingNotes from "@/components/swedish/SwedishReadingNotes";
import { getSwedishReadingQuestion } from "@/data/swedishReadingQuestionsSv";
import type { SwedishLevel } from "@/data/swedishWritingPrompts";

const LEVELS: SwedishLevel[] = ["A1", "A2", "B1"];

const TYPE_EMOJI: Record<string, string> = {
  email: "✉️",
  article: "📰",
  ad: "🏷️",
  notice: "📌",
  story: "📖",
  news: "📡",
  blog: "✍️",
};

const SwedishReadingLab = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<SwedishLevel>("A1");
  const [activeId, setActiveId] = useState(SWEDISH_READING_PASSAGES[0].id);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const passages = useMemo(
    () => SWEDISH_READING_PASSAGES.filter((p) => p.level === level),
    [level],
  );
  const active: SwedishReadingPassage =
    passages.find((p) => p.id === activeId) || passages[0];

  useEffect(() => () => { stopSwedishSequence(); }, []);

  const resetState = () => {
    stopSwedishSequence();
    setPlaying(false);
    setShowTranslation(false);
    setAnswers({});
    setSubmitted(false);
  };

  const onPickLevel = (lvl: SwedishLevel) => {
    setLevel(lvl);
    const first = SWEDISH_READING_PASSAGES.find((e) => e.level === lvl);
    if (first) setActiveId(first.id);
    resetState();
  };

  const onPickPassage = (id: string) => {
    setActiveId(id);
    resetState();
  };

  const handleListen = async () => {
    if (playing) {
      stopSwedishSequence();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    try {
      // Play the whole passage: chunked sequential playback so nothing is cut off.
      await playSwedishTtsScript(active.textSv, { playbackRate: 0.95, multiVoice: false });
    } catch (e) {
      toast({
        title: t("Lỗi phát âm", "Playback error"),
        description: String(e),
        variant: "destructive",
      });
    } finally {
      setPlaying(false);
    }
  };

  const score = useMemo(() => {
    if (!submitted) return 0;
    return active.questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
      0,
    );
  }, [submitted, answers, active]);

  const allAnswered = active.questions.every((q) => typeof answers[q.id] === "number");
  const wordCount = active.textSv.trim().split(/\s+/).length;

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Swedish Reading Lab — Läsförståelse YKI Ruotsi A1–B1 | HaiEduTech"
        description="Luyện đọc hiểu tiếng Thụy Điển theo chuẩn YKI Ruotsi A1, A2, B1: email, quảng cáo, blog, bản tin SVT/DN, truyện ngắn. Có MCQ, T/F và câu hỏi từ vựng."
        path="/swedish/reading"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <SwedishHeroBanner pickKey="SwedishReadingLab" compact />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 text-primary">
                {t("YKI Ruotsi · Läsförståelse", "YKI Ruotsi · Läsförståelse")}
              </Badge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              📚 {t("Swedish Reading Lab", "Swedish Reading Lab")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t(
                "Đọc 8+ văn bản sv-SE thực tế: email, rao Blocket, thông báo chung cư, blog, bài báo SVT/DN, truyện ngắn. Trắc nghiệm chấm tự động, bản dịch và từ vựng để soát lại.",
                "8+ realistic sv-SE texts: emails, Blocket ads, building notices, blog, SVT/DN articles, short stories. Auto-scored MCQs with translation + vocab review.",
              )}
            </p>
          </header>

          {/* Level + passage picker (compact dropdown) */}
          <Tabs value={level} onValueChange={(v) => onPickLevel(v as SwedishLevel)} className="mb-4">
            <TabsList className="grid w-full grid-cols-3">
              {LEVELS.map((lvl) => (
                <TabsTrigger key={lvl} value={lvl}>{lvl}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mb-6">
            <div className="text-xs font-semibold text-muted-foreground mb-1.5">
              {t(`Chọn bài đọc (${passages.length} bài)`, `Choose a text (${passages.length})`)}
            </div>
            <Select value={active.id} onValueChange={onPickPassage}>
              <SelectTrigger className="w-full h-auto py-2.5 text-left">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="start" sideOffset={6} avoidCollisions={false} className="max-h-[55vh] w-[var(--radix-select-trigger-width)]">
                {passages.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="text-sm">
                    <span className="mr-1.5">{TYPE_EMOJI[p.type]}</span>
                    {p.titleSv}
                    <span className="ml-2 text-[10px] uppercase text-muted-foreground">{p.type}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Passage card */}
          <Card className="mb-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg">
                    {TYPE_EMOJI[active.type]} {active.titleSv}
                  </span>
                  <span className="text-xs text-muted-foreground italic mt-0.5">
                    {t(active.titleVi, active.titleEn)}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    ≈ {active.estimatedMinutes} {t("phút", "min")}
                  </Badge>
                  <Badge>{active.level}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground italic">📍 {active.contextVi}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handleListen} size="sm" variant="outline" className="gap-2">
                  <Volume2 className="w-4 h-4" />
                  {playing
                    ? t("Dừng nghe", "Stop listening")
                    : t("Nghe đoạn này (sv-SE)", "Listen (sv-SE)")}
                </Button>
                <Button
                  size="sm"
                  variant={showTranslation ? "default" : "outline"}
                  onClick={() => setShowTranslation((s) => !s)}
                  className="gap-2"
                >
                  {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showTranslation
                    ? t("Ẩn bản dịch", "Hide translation")
                    : t("Hiện bản dịch tiếng Việt", "Show Vietnamese translation")}
                </Button>
                <span className="text-xs text-muted-foreground ml-auto">
                  {wordCount} {t("từ", "words")}
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 border p-4 text-[15px] leading-relaxed">
                  <div className="text-xs font-semibold text-primary mb-2">🇸🇪 SVENSKA</div>
                  <p className="text-foreground whitespace-pre-wrap">{active.textSv}</p>
                </div>
                {showTranslation && (
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4 text-[15px] leading-relaxed">
                    <div className="text-xs font-semibold text-emerald-600 mb-2">🇻🇳 TIẾNG VIỆT</div>
                    <p className="text-foreground/90 whitespace-pre-wrap">{active.textVi}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Grammar + hard vocab notes for this passage */}
          <SwedishReadingNotes textSv={active.textSv} keyVocab={active.keyVocab} />

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t("Câu hỏi đọc hiểu", "Comprehension questions")}
                <Badge variant="outline" className="ml-auto text-[10px]">
                  {active.questions.length} {t("câu", "questions")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {active.questions.map((q, qi) => {
                const userAns = answers[q.id];
                const isCorrect = submitted && userAns === q.correctIndex;
                const kindLabel =
                  q.kind === "mcq"
                    ? t("Trắc nghiệm", "MCQ")
                    : q.kind === "truefalse"
                    ? t("Đúng/Sai", "Sant/Falskt")
                    : q.kind === "vocab"
                    ? t("Từ vựng", "Ordförråd")
                    : q.kind === "gapfill"
                    ? t("Điền từ", "Lucktext")
                    : q.kind === "heading"
                    ? t("Chọn tiêu đề", "Rubrikval")
                    : t("Câu trả lời ngắn", "Kort svar");
                const questionSv = q.questionSv || getSwedishReadingQuestion(q.questionVi);
                return (
                  <div key={q.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                        {kindLabel}
                      </Badge>
                      <div className="font-semibold text-sm text-foreground">
                        {qi + 1}. {questionSv || q.questionVi}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      {(q.options || []).map((opt, oi) => {
                        const picked = userAns === oi;
                        const correctOpt = submitted && oi === q.correctIndex;
                        let cls = "border-border hover:border-primary/40";
                        if (submitted && correctOpt) cls = "border-emerald-500 bg-emerald-500/10";
                        else if (submitted && picked && !correctOpt) cls = "border-rose-500 bg-rose-500/10";
                        else if (!submitted && picked) cls = "border-primary bg-primary/5";
                        return (
                          <button
                            key={oi}
                            disabled={submitted}
                            onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                            className={`text-left rounded-lg border p-3 text-sm transition ${cls}`}
                          >
                            <span className="font-semibold mr-2 text-primary">
                              {String.fromCharCode(65 + oi)}.
                            </span>
                            <span className="text-foreground">{opt.sv}</span>
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div
                        className={`flex items-start gap-2 text-xs rounded-md p-2 ${
                          isCorrect
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{q.explanationVi}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {!submitted ? (
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!allAnswered}
                  onClick={() => {
                    setSubmitted(true);
                    const correct = active.questions.reduce(
                      (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
                      0,
                    );
                    // Log Swedish reading attempt for Dashboard/Admin analytics.
                    void logStudentActivity({
                      activityType: "swedish_reading",
                      activityId: active.id,
                      score: correct,
                      maxScore: active.questions.length,
                      domain: "english",
                      metadata: { level: active.level, type: (active as any).type ?? null },
                    });
                  }}
                >
                  {allAnswered
                    ? t("Nộp bài & xem đáp án", "Submit & see answers")
                    : t("Hãy trả lời tất cả câu hỏi", "Answer all questions first")}
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4 text-center"
                >
                  <div className="text-sm text-muted-foreground">{t("Điểm của bạn", "Your score")}</div>
                  <div className="text-3xl font-bold text-emerald-600">
                    {score} / {active.questions.length}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 gap-2"
                    onClick={resetState}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t("Làm lại bài này", "Retry this passage")}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishReadingLab;
