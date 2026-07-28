/**
 * @file SwedishListeningLab.tsx
 * @description /swedish/listening — YKI Ruotsi Hörförståelse practice.
 *              Plays sv-SE TTS scripts (dialogues / monologues / news) and
 *              tests comprehension via multiple choice questions.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import {
  Headphones, Play, Pause, RotateCcw, Eye, EyeOff, CheckCircle2,
  XCircle, Sparkles, Gauge,
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
import { playSwedishTtsScript, stopSwedishTts } from "@/lib/swedishTts";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import {
  SWEDISH_LISTENING_EXERCISES,
  type SwedishListeningExercise,
} from "@/data/swedishListeningExercises";
import { getSwedishListeningQuestion } from "@/data/swedishListeningQuestionsSv";
import type { SwedishLevel } from "@/data/swedishWritingPrompts";

const LEVELS: SwedishLevel[] = ["A1", "A2", "B1"];

const SwedishListeningLab = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<SwedishLevel>("A1");
  const [activeId, setActiveId] = useState(SWEDISH_LISTENING_EXERCISES[0].id);
  const [rate, setRate] = useState(0.9);
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const exercises = useMemo(
    () => SWEDISH_LISTENING_EXERCISES.filter((e) => e.level === level),
    [level],
  );
  const active: SwedishListeningExercise =
    exercises.find((e) => e.id === activeId) || exercises[0];

  useEffect(() => () => { stopSwedishTts(); }, []);

  const resetState = () => {
    stopSwedishTts();
    setPlaying(false);
    setShowTranscript(false);
    setAnswers({});
    setSubmitted(false);
  };

  const onPickLevel = (lvl: SwedishLevel) => {
    setLevel(lvl);
    const first = SWEDISH_LISTENING_EXERCISES.find((e) => e.level === lvl);
    if (first) {
      setActiveId(first.id);
      setRate(first.recommendedRate);
    }
    resetState();
  };

  const onPickExercise = (id: string) => {
    setActiveId(id);
    const ex = SWEDISH_LISTENING_EXERCISES.find((e) => e.id === id);
    if (ex) setRate(ex.recommendedRate);
    resetState();
  };

  const handlePlay = async () => {
    if (playing) {
      stopSwedishTts();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    try {
      await playSwedishTtsScript(active.scriptSv, { playbackRate: rate, multiVoice: true });
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

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Swedish Listening Lab — Hörförståelse YKI Ruotsi A1–B1 | HaiEduTech"
        description="Luyện nghe tiếng Thụy Điển theo chuẩn YKI Ruotsi A1, A2, B1: hội thoại quán cà phê, thông báo ga tàu, bản tin SVT, ngữ điệu sv-SE chuẩn."
        path="/swedish/listening"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <SwedishHeroBanner pickKey="SwedishListeningLab" compact />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <Headphones className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 text-primary">
                {t("YKI Ruotsi · Hörförståelse", "YKI Ruotsi · Hörförståelse")}
              </Badge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              🎧 {t("Swedish Listening Lab", "Swedish Listening Lab")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t(
                "Nghe hội thoại, thông báo và bản tin thực tế bằng sv-SE. Trả lời câu hỏi rồi mở phụ đề + bản dịch để soát lại.",
                "Listen to real-world sv-SE dialogues, announcements and news. Answer the MCQs, then reveal transcript + translation to review.",
              )}
            </p>
          </header>

          {/* Level tabs + exercise list */}
          <Tabs value={level} onValueChange={(v) => onPickLevel(v as SwedishLevel)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              {LEVELS.map((lvl) => (
                <TabsTrigger key={lvl} value={lvl}>{lvl}</TabsTrigger>
              ))}
            </TabsList>
            {LEVELS.map((lvl) => (
              <TabsContent key={lvl} value={lvl} className="mt-4 grid sm:grid-cols-2 gap-2">
                {exercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => onPickExercise(ex.id)}
                    className={`text-left rounded-lg border p-3 transition ${
                      ex.id === activeId
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-sm text-foreground">{ex.titleVi}</div>
                      <Badge variant="outline" className="text-[10px] uppercase">{ex.type}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{ex.titleEn}</div>
                  </button>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Player */}
          <Card className="mb-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="text-base sm:text-lg">{active.titleVi}</span>
                <Badge>{active.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground italic">📍 {active.contextVi}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handlePlay} size="lg" className="gap-2">
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {playing ? t("Tạm dừng", "Pause") : t("Phát audio sv-SE", "Play sv-SE audio")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { stopSwedishTts(); handlePlay(); }}
                  className="gap-2"
                  disabled={playing}
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("Phát lại", "Replay")}
                </Button>
                <div className="flex items-center gap-2 ml-auto text-xs">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                  {[0.75, 0.9, 1.0].map((r) => (
                    <Button
                      key={r}
                      variant={rate === r ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRate(r)}
                      className="h-7 px-2"
                    >
                      {r}x
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTranscript((s) => !s)}
                  className="gap-2"
                >
                  {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showTranscript
                    ? t("Ẩn phụ đề", "Hide transcript")
                    : t("Hiện phụ đề + bản dịch", "Show transcript + translation")}
                </Button>
                {showTranscript && (
                  <div className="mt-3 space-y-3">
                    <div className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                      <span className="text-xs font-semibold text-primary">🇸🇪 SV</span>
                      <p className="mt-1 text-foreground">{active.scriptSv}</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                      <span className="text-xs font-semibold text-emerald-600">🇻🇳 VI</span>
                      <p className="mt-1 text-foreground/90">{active.scriptVi}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">
                        🔑 {t("Từ khoá", "Key vocab")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {active.keyVocab.map((v, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md border bg-card px-2 py-1 text-xs"
                          >
                            <span className="font-semibold text-primary">{v.sv}</span>
                            <span className="text-muted-foreground">— {v.vi}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t("Câu hỏi nghe hiểu", "Comprehension questions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {active.questions.map((q, qi) => {
                const userAns = answers[q.id];
                const isCorrect = submitted && userAns === q.correctIndex;
                const isWrong = submitted && typeof userAns === "number" && userAns !== q.correctIndex;
                const questionSv = getSwedishListeningQuestion(q.questionVi);
                return (
                  <div key={q.id} className="space-y-2">
                    <div className="font-semibold text-sm text-foreground">
                      {qi + 1}. {questionSv || q.questionVi}
                      {questionSv && (
                        <span className="ml-2 text-xs text-muted-foreground italic">({q.questionVi})</span>
                      )}
                    </div>
                    <div className="grid gap-2">
                      {q.options.map((opt, oi) => {
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
                            <span className="ml-2 text-xs text-muted-foreground">— {opt.vi}</span>
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
                    {isWrong && null}
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
                    // Log Swedish listening attempt for analytics.
                    void logStudentActivity({
                      activityType: "swedish_listening",
                      activityId: active.id,
                      score: correct,
                      maxScore: active.questions.length,
                      domain: "english",
                      metadata: { level: active.level },
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
                    {t("Làm lại bài này", "Retry this exercise")}
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

export default SwedishListeningLab;
