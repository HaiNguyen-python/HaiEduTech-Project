/**
 * @file HskkSpeakingRoom.tsx
 * @description Phòng luyện HSKK Speaking — 3 cấp × 3 phần đúng format thi thật.
 * Web Speech API ghi giọng zh-CN → Edge function chấm AI → lưu Supabase.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  HSKK_PROMPTS, HSKK_LEVEL_META, HSKK_PART_META,
  type HskkLevel, type HskkPart, type HskkPrompt
} from "@/data/hskkPrompts";
import { Mic, MicOff, Volume2, Loader2, ChevronLeft, ChevronRight, Sparkles, BookOpen, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

// ----- Web Speech API typings (mini) -----
type SpeechRecognitionLike = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void; stop: () => void;
};

function getRecognition(): SpeechRecognitionLike | null {
  const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  return new Ctor();
}

function speakZh(text: string, rate = 0.9) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

interface GradeResult {
  scores: Record<string, number>;
  matched_words?: string[];
  missed_words?: string[];
  strengths?: string[];
  improvements?: string[];
  sample_answer_hanzi?: string;
  sample_answer_pinyin?: string;
  sample_answer_vi?: string;
  feedback_vi?: string;
  feedback_en?: string;
}

const HskkSpeakingRoom = () => {
  const { t, lang } = useLanguage();
  const { toast } = useToast();

  const [level, setLevel] = useState<HskkLevel>("beginner");
  const [part, setPart] = useState<HskkPart>(1);
  const [idx, setIdx] = useState(0);

  const promptsHere = useMemo(
    () => HSKK_PROMPTS.filter(p => p.level === level && p.part === part),
    [level, part]
  );
  const current: HskkPrompt | undefined = promptsHere[idx];

  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [recording, setRecording] = useState(false);
  const [prepRemaining, setPrepRemaining] = useState(0);
  const [answerRemaining, setAnswerRemaining] = useState(0);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const prepTimerRef = useRef<number | null>(null);
  const ansTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Reset when changing prompt/level/part
  useEffect(() => {
    setTranscript(""); setInterim(""); setResult(null);
    setPrepRemaining(current?.prepSeconds ?? 0);
    setAnswerRemaining(current?.answerSeconds ?? 0);
    stopAll();
    return stopAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, part, idx]);

  function stopAll() {
    try { recRef.current?.stop(); } catch { /* noop */ }
    recRef.current = null;
    if (prepTimerRef.current) window.clearInterval(prepTimerRef.current);
    if (ansTimerRef.current) window.clearInterval(ansTimerRef.current);
    prepTimerRef.current = null; ansTimerRef.current = null;
    setRecording(false);
  }

  function startRecording() {
    if (!current) return;
    const rec = getRecognition();
    if (!rec) {
      toast({ title: t("Trình duyệt không hỗ trợ ghi âm", "Browser doesn't support speech recognition"), variant: "destructive" });
      return;
    }
    rec.lang = "zh-CN";
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = "";
    rec.onresult = (e: any) => {
      let int = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else int += r[0].transcript;
      }
      setTranscript(finalText);
      setInterim(int);
    };
    rec.onerror = (err: any) => {
      // no-op (network/aborted thường gặp)
      if (err?.error && err.error !== "aborted" && err.error !== "no-speech") {
        toast({ title: t("Lỗi ghi âm", "Recording error"), description: String(err.error), variant: "destructive" });
      }
    };
    rec.onend = () => { setRecording(false); };
    recRef.current = rec;
    startTimeRef.current = Date.now();
    rec.start();
    setRecording(true);
    setTranscript(""); setInterim("");

    // Bộ đếm thời gian trả lời
    setAnswerRemaining(current.answerSeconds);
    ansTimerRef.current = window.setInterval(() => {
      setAnswerRemaining(prev => {
        if (prev <= 1) {
          window.clearInterval(ansTimerRef.current!);
          ansTimerRef.current = null;
          try { rec.stop(); } catch { /* noop */ }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stopRecording() {
    try { recRef.current?.stop(); } catch { /* noop */ }
    if (ansTimerRef.current) {
      window.clearInterval(ansTimerRef.current);
      ansTimerRef.current = null;
    }
    setRecording(false);
  }

  function startPrep() {
    if (!current || current.prepSeconds <= 0) { startRecording(); return; }
    setPrepRemaining(current.prepSeconds);
    prepTimerRef.current = window.setInterval(() => {
      setPrepRemaining(prev => {
        if (prev <= 1) {
          window.clearInterval(prepTimerRef.current!);
          prepTimerRef.current = null;
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function gradeWithAI() {
    if (!current || !transcript.trim()) {
      toast({ title: t("Chưa có nội dung để chấm", "Nothing to grade yet"), variant: "destructive" });
      return;
    }
    setGrading(true);
    try {
      const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      const { data, error } = await supabase.functions.invoke("hskk-grade", {
        body: {
          level, part,
          prompt_hanzi: current.hanzi,
          prompt_pinyin: current.pinyin,
          transcript: transcript.trim(),
          duration_seconds: duration,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult(data as GradeResult);

      // Lưu vào Supabase (nếu có user)
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from("hskk_attempts").insert({
          user_id: userData.user.id,
          level, part,
          prompt_id: current.id,
          prompt_text: current.hanzi,
          transcript: transcript.trim(),
          scores: (data as any).scores ?? {},
          feedback: data as any,
          duration_seconds: duration,
        });
      }
    } catch (e: any) {
      toast({ title: t("Chấm điểm thất bại", "Grading failed"), description: String(e?.message ?? e), variant: "destructive" });
    } finally {
      setGrading(false);
    }
  }

  const meta = HSKK_LEVEL_META[level];
  const partMeta = HSKK_PART_META[part];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HSKK Speaking Room · Luyện thi nói HSK | HaiEduTech"
        description="Phòng luyện HSKK Sơ cấp, Trung cấp, Cao cấp đúng format đề thật. Ghi âm, AI chấm phát âm, lưu loát, ngữ pháp và nội dung."
        path="/chinese/hsk/hskk"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge variant="secondary" className="mb-3"><Mic className="w-3.5 h-3.5 mr-1.5 inline" />HSKK Speaking</Badge>
          <h1 className={`text-3xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}>
            {t("Phòng luyện HSKK Speaking", "HSKK Speaking Room")}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Ghi âm tiếng Trung, AI giám khảo chấm phát âm – thanh điệu – lưu loát – ngữ pháp – nội dung theo chuẩn HSKK.",
              "Record Chinese, an AI examiner grades pronunciation, tones, fluency, grammar and content per HSKK rubric."
            )}
          </p>
        </motion.div>

        {/* Cấp độ */}
        <Tabs value={level} onValueChange={(v) => { setLevel(v as HskkLevel); setIdx(0); }} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto h-auto">
            {(Object.keys(HSKK_LEVEL_META) as HskkLevel[]).map(L => {
              const m = HSKK_LEVEL_META[L];
              return (
                <TabsTrigger key={L} value={L} className="flex-col py-3 gap-1">
                  <span className="font-bold">{lang === "vi" ? m.labelVi : m.labelEn}</span>
                  <span className="text-[11px] text-muted-foreground">{m.hskRange} · ~{m.totalMinutes} min</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Phần thi */}
        <Tabs value={String(part)} onValueChange={(v) => { setPart(Number(v) as HskkPart); setIdx(0); }} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            {[1, 2, 3].map(p => (
              <TabsTrigger key={p} value={String(p)}>
                {t(`Phần ${p}`, `Part ${p}`)}
              </TabsTrigger>
            ))}
          </TabsList>
          {[1, 2, 3].map(p => (
            <TabsContent key={p} value={String(p)}>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">
                {lang === "vi" ? HSKK_PART_META[p as HskkPart].descVi : HSKK_PART_META[p as HskkPart].descEn}
              </p>
            </TabsContent>
          ))}
        </Tabs>

        {!current ? (
          <Card className="p-6 text-center text-muted-foreground">{t("Chưa có đề cho mục này.", "No prompts here yet.")}</Card>
        ) : (
          <>
            {/* Prompt card */}
            <Card className="p-6 md:p-8 mb-4 border-2">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <Badge className={`bg-gradient-to-r ${meta.color} text-white border-0`}>
                  {idx + 1} / {promptsHere.length} · {partMeta.labelVi}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => speakZh(current.hanzi, 0.9)}>
                    <Volume2 className="w-4 h-4 mr-1" />{t("Phát chuẩn", "Play")}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => speakZh(current.hanzi, 0.6)}>
                    0.6× <Volume2 className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              <div className="text-2xl md:text-4xl font-bold leading-relaxed mb-3" style={{ fontFamily: "'PingFang SC','Noto Sans SC',sans-serif" }}>
                {current.hanzi}
              </div>
              <div className="text-sm md:text-base text-blue-600 dark:text-blue-400 mb-1">{current.pinyin}</div>
              <div className="text-sm md:text-base text-muted-foreground">{current.vi}</div>
              {current.hint && (
                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm flex gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{current.hint}</span>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2 rounded-lg bg-secondary/50 text-center">
                  <div className="text-muted-foreground">{t("Chuẩn bị", "Prep")}</div>
                  <div className="text-lg font-bold">{prepRemaining || current.prepSeconds}s</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary/50 text-center">
                  <div className="text-muted-foreground">{t("Trả lời", "Answer")}</div>
                  <div className="text-lg font-bold">{answerRemaining || current.answerSeconds}s</div>
                </div>
              </div>
            </Card>

            {/* Controls + transcript */}
            <Card className="p-6 mb-4">
              <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                {!recording ? (
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${meta.color} text-white border-0`}
                    onClick={current.prepSeconds > 0 ? startPrep : startRecording}
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    {current.prepSeconds > 0
                      ? t(`Bắt đầu (${current.prepSeconds}s chuẩn bị)`, `Start (${current.prepSeconds}s prep)`)
                      : t("Bắt đầu ghi âm", "Start recording")}
                  </Button>
                ) : (
                  <Button size="lg" variant="destructive" onClick={stopRecording}>
                    <MicOff className="w-5 h-5 mr-2" />{t("Dừng", "Stop")}
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={gradeWithAI}
                  disabled={!transcript.trim() || recording || grading}
                >
                  {grading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                  {t("Chấm điểm AI", "Grade with AI")}
                </Button>
              </div>

              {(recording || prepRemaining > 0) && (
                <Progress
                  value={prepRemaining > 0
                    ? ((current.prepSeconds - prepRemaining) / current.prepSeconds) * 100
                    : ((current.answerSeconds - answerRemaining) / current.answerSeconds) * 100}
                  className="mb-3"
                />
              )}

              <div className="rounded-lg bg-muted/40 p-4 min-h-[80px]">
                <div className="text-xs text-muted-foreground mb-1">{t("Transcript ghi âm:", "Recording transcript:")}</div>
                <div className="text-lg leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'PingFang SC','Noto Sans SC',sans-serif" }}>
                  {transcript || <span className="text-muted-foreground italic">{t("(chưa có)", "(empty)")}</span>}
                  {interim && <span className="text-muted-foreground"> {interim}</span>}
                </div>
              </div>
            </Card>

            {/* Result */}
            {result && (
              <Card className="p-6 mb-6 border-2 border-emerald-500/40">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  {t("Kết quả chấm AI", "AI Grading Result")}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                  {Object.entries(result.scores ?? {}).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10 text-center">
                      <div className="text-xs uppercase text-muted-foreground">{k}</div>
                      <div className="text-2xl font-bold">{Math.round(Number(v))}</div>
                    </div>
                  ))}
                </div>

                {result.feedback_vi && (
                  <div className="p-4 rounded-lg bg-foreground/5 mb-3">
                    <div className="text-sm font-semibold mb-1">{t("Nhận xét", "Feedback")}</div>
                    <div className="text-sm whitespace-pre-wrap">{lang === "vi" ? result.feedback_vi : (result.feedback_en ?? result.feedback_vi)}</div>
                  </div>
                )}

                {(result.strengths?.length ?? 0) > 0 && (
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <div className="text-sm font-bold text-emerald-600 mb-1">✓ {t("Điểm mạnh", "Strengths")}</div>
                      <ul className="text-sm space-y-1">{result.strengths!.map((s, i) => <li key={i}>• {s}</li>)}</ul>
                    </div>
                    {(result.improvements?.length ?? 0) > 0 && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        <div className="text-sm font-bold text-amber-600 mb-1">↗ {t("Cần cải thiện", "Improvements")}</div>
                        <ul className="text-sm space-y-1">{result.improvements!.map((s, i) => <li key={i}>• {s}</li>)}</ul>
                      </div>
                    )}
                  </div>
                )}

                {(result.matched_words?.length || result.missed_words?.length) ? (
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    {result.matched_words && (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <div className="text-sm font-bold text-emerald-600 mb-1">{t("Đọc đúng", "Matched")}</div>
                        <div className="text-base" style={{ fontFamily: "'PingFang SC',sans-serif" }}>{result.matched_words.join(" ")}</div>
                      </div>
                    )}
                    {result.missed_words && (
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
                        <div className="text-sm font-bold text-rose-600 mb-1">{t("Bỏ sót / sai", "Missed")}</div>
                        <div className="text-base" style={{ fontFamily: "'PingFang SC',sans-serif" }}>{result.missed_words.join(" ")}</div>
                      </div>
                    )}
                  </div>
                ) : null}

                {result.sample_answer_hanzi && (
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="text-sm font-bold text-blue-600 mb-1 flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />{t("Câu trả lời mẫu", "Sample answer")}
                    </div>
                    <div className="text-lg" style={{ fontFamily: "'PingFang SC',sans-serif" }}>{result.sample_answer_hanzi}</div>
                    {result.sample_answer_pinyin && <div className="text-sm text-blue-600 dark:text-blue-400">{result.sample_answer_pinyin}</div>}
                    {result.sample_answer_vi && <div className="text-sm text-muted-foreground">{result.sample_answer_vi}</div>}
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => speakZh(result.sample_answer_hanzi!, 0.85)}>
                      <Volume2 className="w-4 h-4 mr-1" />{t("Nghe mẫu", "Listen")}
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3">
              <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(i => Math.max(0, i - 1))}>
                <ChevronLeft className="w-4 h-4 mr-1" />{t("Trước", "Prev")}
              </Button>
              <div className="text-sm text-muted-foreground">{idx + 1} / {promptsHere.length}</div>
              <Button variant="outline" disabled={idx >= promptsHere.length - 1} onClick={() => setIdx(i => Math.min(promptsHere.length - 1, i + 1))}>
                {t("Tiếp", "Next")}<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HskkSpeakingRoom;
