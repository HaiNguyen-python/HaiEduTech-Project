/**
 * @file SwedishSpeakingLab.tsx
 * @description /swedish/speaking — YKI Ruotsi Tala practice studio.
 *              Pick a Tala monologue prompt, record with the browser's Web
 *              Speech API (sv-SE), then submit the transcript for AI grading
 *              via the grade-swedish-yki edge function.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import {
  Mic, MicOff, Sparkles, Loader2, CheckCircle2, AlertCircle, Volume2, Square,
  Eye, EyeOff, BookOpen,
} from "lucide-react";
import { SWEDISH_SPEAKING_MODEL_ANSWERS } from "@/data/swedishSpeakingModelAnswers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";
import {
  SWEDISH_SPEAKING_PROMPTS,
  type SwedishSpeakingPrompt,
} from "@/data/swedishSpeakingPrompts";
import type { SwedishLevel } from "@/data/swedishWritingPrompts";

interface GradeResult {
  overall: number;
  ykiLevel: string;
  criteria: { label: string; score: number; feedback: string }[];
  errors: { original: string; correction: string; note: string }[];
  highlights: string[];
  nextSteps: string[];
}

const LEVELS: SwedishLevel[] = ["A1", "A2", "B1"];

// Minimal type shim for the Web Speech API used in Chrome/Edge/Safari.
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

const getSpeechCtor = (): (new () => SpeechRecognitionLike) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

const SwedishSpeakingLab = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<SwedishLevel>("A1");
  const [activeId, setActiveId] = useState(SWEDISH_SPEAKING_PROMPTS[0].id);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showModel, setShowModel] = useState(false);

  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const startTsRef = useRef<number>(0);
  const tickRef = useRef<number | null>(null);
  const manualStopRef = useRef(false);
  // Text already finalized in previous recognition sessions (before auto-restart).
  const committedRef = useRef("");
  // Text finalized in the CURRENT session — flushed into committedRef on onend.
  const sessionFinalRef = useRef("");


  const prompts = useMemo(
    () => SWEDISH_SPEAKING_PROMPTS.filter((p) => p.level === level),
    [level],
  );
  const active: SwedishSpeakingPrompt =
    prompts.find((p) => p.id === activeId) || prompts[0];

  // Cleanup on unmount
  useEffect(
    () => () => {
      recRef.current?.abort();
      if (tickRef.current) window.clearInterval(tickRef.current);
      stopSwedishTts();
    },
    [],
  );

  const onPickLevel = (lvl: SwedishLevel) => {
    setLevel(lvl);
    const first = SWEDISH_SPEAKING_PROMPTS.find((p) => p.level === lvl);
    if (first) setActiveId(first.id);
    setTranscript("");
    setElapsed(0);
    setResult(null);
  };

  const startRecording = () => {
    const Ctor = getSpeechCtor();
    if (!Ctor) {
      toast({
        title: t("Trình duyệt không hỗ trợ", "Browser not supported"),
        description: t(
          "Hãy dùng Chrome/Edge mới nhất để ghi âm tiếng Thụy Điển.",
          "Use latest Chrome/Edge for Swedish recording.",
        ),
        variant: "destructive",
      });
      return;
    }
    setTranscript("");
    setElapsed(0);
    setResult(null);

    const rec = new Ctor();
    rec.lang = "sv-SE";
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = "";
    rec.onresult = (ev) => {
      let interim = "";
      const results = ev.results as ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }>;
      for (let i = 0; i < results.length; i += 1) {
        const r = results[i] as ArrayLike<{ transcript: string }> & { isFinal?: boolean };
        const text = r[0].transcript;
        if (r.isFinal) finalText += text + " ";
        else interim += text;
      }
      setTranscript((finalText + interim).trim());
    };
    rec.onerror = () => { /* swallow errors so we can restart */ };
    rec.onend = () => {
      // Auto-restart unless user manually stopped, for continuous recognition.
      if (!manualStopRef.current) {
        try { rec.start(); } catch { /* noop */ }
      } else {
        setRecording(false);
      }
    };

    recRef.current = rec;
    manualStopRef.current = false;
    try {
      rec.start();
      setRecording(true);
      startTsRef.current = Date.now();
      tickRef.current = window.setInterval(() => {
        setElapsed(Math.round((Date.now() - startTsRef.current) / 1000));
      }, 500);
    } catch (e) {
      toast({
        title: t("Không khởi động được mic", "Mic failed to start"),
        description: String(e),
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    manualStopRef.current = true;
    recRef.current?.stop();
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    setRecording(false);
  };

  const playPrompt = () => playSwedishTts(active.promptSv, { playbackRate: 0.95 });

  const onGrade = async () => {
    if (!transcript.trim() || transcript.trim().split(/\s+/).length < 5) {
      toast({
        title: t("Bản ghi quá ngắn", "Transcript too short"),
        description: t("Hãy nói thêm rồi mới chấm.", "Please speak more before grading."),
        variant: "destructive",
      });
      return;
    }
    setGrading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-swedish-yki", {
        body: {
          mode: "speaking",
          level: active.level,
          prompt: active.promptSv,
          text: transcript,
          durationSec: elapsed,
        },
      });
      if (error) throw error;
      setResult(data as GradeResult);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: t("Lỗi", "Error"), description: msg, variant: "destructive" });
    } finally {
      setGrading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Swedish Speaking Lab — Tala YKI Ruotsi A1–B1 | HaiEduTech"
        description="Luyện nói tiếng Thụy Điển theo chuẩn YKI Ruotsi A1, A2, B1. Ghi âm sv-SE, nhận diện giọng nói liên tục và AI chấm phát âm + ngữ pháp."
        path="/swedish/speaking"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <SwedishHeroBanner pickKey="SwedishSpeakingLab" compact />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <Mic className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 text-primary">
                {t("YKI Ruotsi · Tala", "YKI Ruotsi · Tala")}
              </Badge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              🎙️ {t("Swedish Speaking Lab", "Swedish Speaking Lab")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t(
                "Chọn đề Tala, nghe phát âm chuẩn sv-SE, ghi âm bằng micro và AI chấm theo tiêu chí YKI.",
                "Pick a Tala prompt, hear the sv-SE model, record into your mic and let the AI grade YKI-style.",
              )}
            </p>
          </header>

          <Tabs value={level} onValueChange={(v) => onPickLevel(v as SwedishLevel)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              {LEVELS.map((lvl) => (
                <TabsTrigger key={lvl} value={lvl}>{lvl}</TabsTrigger>
              ))}
            </TabsList>
            {LEVELS.map((lvl) => (
              <TabsContent key={lvl} value={lvl} className="mt-4 space-y-2">
                {prompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveId(p.id); setResult(null); setTranscript(""); setElapsed(0); }}
                    className={`w-full text-left rounded-lg border p-3 transition ${
                      p.id === activeId
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-semibold text-sm text-foreground">{p.titleVi}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.titleEn}</div>
                  </button>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Prompt card */}
          <Card className="mb-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="text-base sm:text-lg">{active.titleVi}</span>
                <Badge>{active.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-foreground">🇸🇪 {active.promptSv}</div>
                  <Button size="sm" variant="outline" onClick={playPrompt} className="gap-1 shrink-0">
                    <Volume2 className="w-4 h-4" />
                    {t("Nghe", "Listen")}
                  </Button>
                </div>
                <div className="text-muted-foreground mt-1">🇻🇳 {active.promptVi}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="secondary">
                  {t("Thời lượng", "Duration")}: {active.minSec}–{active.maxSec}s
                </Badge>
                <Badge variant="secondary">💡 {active.tipVi}</Badge>
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">
                  {t("Khung trả lời gợi ý", "Answer skeleton")}
                </div>
                <ul className="space-y-1">
                  {active.skeletonSv.map((s, i) => (
                    <li key={i} className="text-sm italic text-foreground/90">• {s}</li>
                  ))}
                </ul>
              </div>

              {SWEDISH_SPEAKING_MODEL_ANSWERS[active.id] && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      <BookOpen className="w-4 h-4" />
                      {t("Bài mẫu Band 4–5", "Model answer (Band 4–5)")}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowModel((s) => !s)}
                      className="gap-1 h-7"
                    >
                      {showModel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showModel ? t("Ẩn", "Hide") : t("Hiện bài mẫu", "Show")}
                    </Button>
                  </div>
                  {showModel && (
                    <div className="space-y-2 text-sm leading-relaxed">
                      <p className="text-foreground whitespace-pre-wrap">
                        🇸🇪 {SWEDISH_SPEAKING_MODEL_ANSWERS[active.id].sv}
                      </p>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        🇻🇳 {SWEDISH_SPEAKING_MODEL_ANSWERS[active.id].vi}
                      </p>
                      <div className="flex items-start gap-2 text-xs rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 p-2">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{SWEDISH_SPEAKING_MODEL_ANSWERS[active.id].bandNote}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          playSwedishTts(SWEDISH_SPEAKING_MODEL_ANSWERS[active.id].sv, { playbackRate: 0.95 })
                        }
                        className="gap-1"
                      >
                        <Volume2 className="w-4 h-4" />
                        {t("Nghe bài mẫu", "Listen to model")}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recorder */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">
                  {t("Phòng ghi âm sv-SE", "sv-SE recording booth")}
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  ⏱ {elapsed}s · {transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0} {t("từ", "words")}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {!recording ? (
                  <Button onClick={startRecording} size="lg" className="gap-2">
                    <Mic className="w-4 h-4" />
                    {t("Bắt đầu ghi âm", "Start recording")}
                  </Button>
                ) : (
                  <Button onClick={stopRecording} size="lg" variant="destructive" className="gap-2">
                    <Square className="w-4 h-4" />
                    {t("Dừng ghi", "Stop")}
                  </Button>
                )}
                <Button
                  onClick={() => { setTranscript(""); setResult(null); setElapsed(0); }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <MicOff className="w-4 h-4" />
                  {t("Xoá bản ghi", "Clear")}
                </Button>
              </div>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={t(
                  "Bản chép lời sẽ tự xuất hiện ở đây khi bạn nói. Có thể sửa tay trước khi chấm.",
                  "Live transcript appears here as you speak. You can hand-edit before grading.",
                )}
                className="min-h-[160px] text-sm leading-relaxed"
              />
              <Button onClick={onGrade} disabled={grading} className="w-full gap-2" size="lg">
                {grading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("AI đang chấm…", "AI grading…")}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t("Chấm bài nói bằng AI", "Grade speech with AI")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-emerald-500/40 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{t("Kết quả YKI Tala", "YKI Tala Result")}</span>
                    <Badge className="ml-auto text-base bg-emerald-600">
                      {result.overall?.toFixed(1)} / 5
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.criteria?.map((c) => (
                      <div key={c.label} className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{c.label}</span>
                          <Badge variant="outline">{c.score?.toFixed(1)}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{c.feedback}</p>
                      </div>
                    ))}
                  </div>

                  {result.errors?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        {t("Lỗi cụ thể", "Specific errors")}
                      </h3>
                      <ul className="space-y-2">
                        {result.errors.map((er, i) => (
                          <li key={i} className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3 text-sm">
                            <div className="text-rose-700 dark:text-rose-300 line-through">{er.original}</div>
                            <div className="text-emerald-700 dark:text-emerald-300 font-semibold">→ {er.correction}</div>
                            <div className="text-xs text-muted-foreground mt-1">{er.note}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.highlights?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">✨ {t("Điểm hay", "Highlights")}</h3>
                      <ul className="list-disc list-inside text-sm text-foreground/90 space-y-1">
                        {result.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </div>
                  )}

                  {result.nextSteps?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">🎯 {t("Bước tiếp theo", "Next steps")}</h3>
                      <ul className="list-disc list-inside text-sm text-foreground/90 space-y-1">
                        {result.nextSteps.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishSpeakingLab;
