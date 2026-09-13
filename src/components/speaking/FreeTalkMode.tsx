import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BarChart3, CheckCircle, Clock3, Headphones, Lightbulb, Loader2, MessageCircle, Mic, RotateCcw, Sparkles, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SpeakingThemeIllustration from "@/components/speaking/SpeakingThemeIllustration";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { fillerPatterns, speakingFreeTalkTopics, type FreeTalkTopic } from "@/data/speakingFreeTalkTopics";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { buildFreeTalkQuickReport, loadFreeTalkHistory, saveFreeTalkSession, splitGrammarFix, updateLatestFreeTalkAiScore, type FreeTalkQuickReport, type FreeTalkSession } from "@/lib/freeTalkPractice";
import { normalizeFreeTalkReport, type SafeFreeTalkReport } from "@/lib/freeTalkReport";
import { micErrorMessage, playSpeakingTts, stopSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import { supabase } from "@/integrations/supabase/client";

interface Props { language: SpeakingLang; onPerfectScore?: () => void; }
const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const DURATIONS = [30, 60, 90];
const PREP_SECONDS = 5;
const WAVEFORM = [3, 6, 4, 8, 5, 10, 7, 4, 9, 6, 11, 5, 8, 4, 7, 3, 6, 9, 5, 7, 4, 8];

const FreeTalkMode = ({ language, onPerfectScore }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];
  const reduceMotion = useReducedMotion();
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("B1");
  const [limit, setLimit] = useState(60);
  const [topic, setTopic] = useState<FreeTalkTopic | null>(null);
  const [local, setLocal] = useState<FreeTalkQuickReport | null>(null);
  const [ai, setAi] = useState<SafeFreeTalkReport | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [prep, setPrep] = useState<number | null>(null);
  const [history, setHistory] = useState<FreeTalkSession[]>(() => loadFreeTalkHistory(language));
  const audioBusyRef = useRef(false);
  const [audioBusy, setAudioBusy] = useState(false);

  const pool = useMemo(() => {
    const topics = speakingFreeTalkTopics[language] ?? [];
    const filtered = topics.filter((item) => item.level === level);
    return filtered.length ? filtered : topics;
  }, [language, level]);

  useEffect(() => {
    setTopic(pool[Math.floor(Math.random() * pool.length)] ?? null);
    setLocal(null); setAi(null); setAiError(null); setAnswer(""); setPrep(null);
  }, [pool]);
  useEffect(() => { setHistory(loadFreeTalkHistory(language)); }, [language]);
  useEffect(() => () => stopSpeakingTts(language), [language]);

  const playText = async (text: string, rate = 0.95) => {
    if (audioBusyRef.current) return;
    audioBusyRef.current = true; setAudioBusy(true);
    try { await playSpeakingTts(language, text, rate); }
    finally { audioBusyRef.current = false; setAudioBusy(false); }
  };

  const requestAi = useCallback(async (transcript: string, report: FreeTalkQuickReport, activeTopic: FreeTalkTopic) => {
    setAiLoading(true); setAiError(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-free-talk", { body: { transcript, languageName: config.lang, topic: activeTopic.prompt, level: activeTopic.level, wpm: report.wpm, durationSec: report.durationSec, fillers: report.fillers } });
      if (error) throw error;
      if (data && typeof data === "object" && "error" in data) throw new Error(String((data as { error: unknown }).error));
      const next = normalizeFreeTalkReport(data);
      if (!next) throw new Error("Invalid AI feedback response");
      setAi(next); setHistory(updateLatestFreeTalkAiScore(language, next.score));
      if (next.score >= 80) onPerfectScore?.();
    } catch {
      setAiError(t("Chưa lấy được nhận xét AI. Báo cáo nhanh vẫn được giữ lại.", "AI feedback is unavailable. Your quick report is still saved."));
    } finally { setAiLoading(false); }
  }, [config.lang, language, onPerfectScore, t]);

  const handleFinal = useCallback((transcript: string, elapsedMs: number) => {
    if (!topic) return;
    setAnswer(transcript);
    const report = buildFreeTalkQuickReport(transcript, language, elapsedMs, fillerPatterns);
    setLocal(report);
    setHistory(saveFreeTalkSession(language, { date: new Date().toISOString(), level: topic.level, durationSec: report.durationSec, words: report.words, wpm: report.wpm, fillers: report.fillers.length, score: report.score }));
    if (report.score >= 85) onPerfectScore?.();
    if (report.words >= 8 || transcript.length >= 20) void requestAi(transcript, report, topic);
  }, [language, onPerfectScore, requestAi, topic]);

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: limit, onFinal: handleFinal });
  const beginPreparation = () => {
    if (prep !== null || rec.isRecording) return;
    setPrep(PREP_SECONDS);
    let remaining = PREP_SECONDS;
    const timer = window.setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) { window.clearInterval(timer); setPrep(null); rec.start(); }
      else setPrep(remaining);
    }, 1000);
  };
  const resetAnswer = () => { setLocal(null); setAi(null); setAiError(null); setAnswer(""); setPrep(null); rec.reset(); };
  const nextTopic = () => { setTopic(pool[Math.floor(Math.random() * pool.length)] ?? null); resetAnswer(); };
  const handleFollowUp = (prompt: string, position: number) => {
    if (!topic) return;
    setTopic({ ...topic, id: `${topic.id}-follow-${position}`, prompt, promptVi: prompt, ideas: [] }); resetAnswer();
  };

  if (!topic) return <Card><CardContent className="py-8 text-center text-muted-foreground">{t("Chưa có chủ đề cho ngôn ngữ này.", "No topics for this language yet.")}</CardContent></Card>;
  const errorText = micErrorMessage(rec.error, t);
  const currentStep = local ? 4 : rec.isRecording ? 3 : 2;
  const illustrationTheme = { id: topic.id, name: topic.prompt, nameVi: topic.promptVi, icon: "💬" };
  const averageScore = history.length ? Math.round(history.reduce((sum, item) => sum + (item.aiScore ?? item.score), 0) / history.length) : 0;

  return <div className="speaking-studio space-y-4">
    <Card className="speaking-studio-shell overflow-hidden border-primary/20 bg-card/90 shadow-xl backdrop-blur-xl">
      <CardHeader className="border-b border-border/70 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><CardTitle className="flex items-center gap-2 text-lg sm:text-xl"><span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><MessageCircle className="h-5 w-5" /></span>{t("Phòng nói tự do", "Free Talk studio")}</CardTitle><p className="mt-2 text-sm text-muted-foreground">{t("Chuẩn bị ý, nói tự nhiên và áp dụng phản hồi ngay.", "Plan your ideas, speak naturally, then apply the feedback.")}</p></div>
          {history.length > 0 && <Badge className="bg-accent/15 text-foreground hover:bg-accent/15"><BarChart3 className="mr-1 h-3.5 w-3.5" />{t("Điểm gần đây", "Recent average")} {averageScore}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-4 sm:p-6">
        <div className="grid gap-2 sm:grid-cols-4" aria-label={t("Bốn bước nói tự do", "Four Free Talk steps")}>{[
          t("1. Chọn", "1. Choose"), t("2. Chuẩn bị", "2. Plan"), t("3. Nói", "3. Speak"), t("4. Áp dụng", "4. Apply")
        ].map((label, i) => <div key={label} className={`flex min-h-11 items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${currentStep === i + 1 ? "border-primary bg-primary/10 text-primary" : currentStep > i + 1 ? "border-primary/30 bg-primary/5" : "bg-muted/40 text-muted-foreground"}`}>{currentStep > i + 1 ? <CheckCircle className="h-4 w-4 text-primary" /> : <span>{i + 1}</span>}{label.replace(/^\d+\.\s*/, "")}</div>)}</div>

        <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.75fr)_minmax(0,1.35fr)]">
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-md border border-primary/20 bg-primary/5"><SpeakingThemeIllustration theme={illustrationTheme} variant="practice" /><div className="p-3"><Badge variant="outline">{topic.level}</Badge></div></div>
            <div className="rounded-md border border-border/70 bg-background/70 p-4"><p className="mb-2 text-sm font-semibold">{t("Thiết lập phiên", "Session setup")}</p><div className="flex flex-wrap gap-2">{LEVELS.map((value) => <Button key={value} size="sm" variant={level === value ? "default" : "outline"} onClick={() => setLevel(value)}>{value}</Button>)}</div><div className="mt-3 flex flex-wrap gap-2">{DURATIONS.map((seconds) => <Button key={seconds} size="sm" variant={limit === seconds ? "secondary" : "ghost"} onClick={() => setLimit(seconds)}><Clock3 className="mr-1 h-3.5 w-3.5" />{seconds}s</Button>)}</div></div>
          </aside>

          <section className="flex min-w-0 flex-col gap-4">
            <div className="rounded-md border border-primary/20 bg-background/80 p-4 sm:p-5"><p className="text-lg font-semibold leading-relaxed sm:text-xl">{topic.prompt}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.promptVi}</p>{topic.ideas.length > 0 && <div className="mt-4"><p className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><Lightbulb className="h-4 w-4 text-accent" />{t("Khung ý gợi ý", "Idea starters")}</p><div className="flex flex-wrap gap-2">{topic.ideas.map((idea) => <Badge key={idea} variant="secondary" className="font-normal">{idea}</Badge>)}</div></div>}</div>
            <div className="rounded-md border border-border/70 bg-background/70 p-4" aria-live="polite">
              <div className={`speaking-waveform ${rec.isRecording ? "is-recording" : audioBusy ? "is-playing" : ""}`} aria-hidden="true">{WAVEFORM.map((height, i) => <motion.span key={`${height}-${i}`} className="speaking-waveform-bar" style={{ height: `${height * 2.6}px` }} animate={(rec.isRecording || audioBusy) && !reduceMotion ? { scaleY: [0.5, 1, 0.65] } : { scaleY: 0.55 }} transition={{ duration: 0.65, repeat: (rec.isRecording || audioBusy) && !reduceMotion ? Infinity : 0, delay: i * 0.035 }} />)}</div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">{rec.isRecording ? <Button variant="destructive" onClick={rec.stop} className="h-11 gap-2"><Square className="h-4 w-4" />{t("Dừng", "Stop")} {rec.seconds}s / {limit}s</Button> : <Button onClick={beginPreparation} disabled={prep !== null || aiLoading} className="h-11 gap-2"><Mic className="h-4 w-4" />{prep !== null ? t(`Bắt đầu sau ${prep}...`, `Starting in ${prep}...`) : local ? t("Nói lại", "Try again") : t("Chuẩn bị và nói", "Prepare and speak")}</Button>}<Button variant="outline" onClick={nextTopic} disabled={rec.isRecording} className="h-11 gap-2"><RotateCcw className="h-4 w-4" />{t("Chủ đề khác", "Another topic")}</Button></div>
              {rec.isRecording && <Progress value={(rec.seconds / limit) * 100} className="mt-3 h-2" />}
              {(rec.transcript || answer) && <div className="mt-3 rounded-md bg-secondary/70 p-3 text-sm leading-relaxed whitespace-pre-wrap">{rec.transcript || answer}</div>}
            </div>
          </section>
        </div>
        {errorText && <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{errorText}</div>}
      </CardContent>
    </Card>

    {local && <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Card className="border-primary/20"><CardHeader className="pb-3"><CardTitle className="text-base">{t("Báo cáo nhanh trên thiết bị", "On-device quick report")}</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">{[[local.score, t("Điểm nhanh", "Quick score")], [local.wpm, t("Từ/phút", "WPM")], [local.words, t("Số từ", "Words")], [`${local.uniqueRatio}%`, t("Từ khác nhau", "Unique words")]].map(([value,label]) => <div key={label} className="rounded-md border bg-background/70 p-3"><div className="text-xl font-bold text-primary">{value}</div><div className="text-xs text-muted-foreground">{label}</div></div>)}</div>{local.fillers.length > 0 && <div className="mt-3 text-sm"><span className="text-muted-foreground">{t("Từ đệm: ", "Fillers: ")}</span>{local.fillers.map((filler) => <Badge key={filler} variant="destructive" className="mr-1 font-normal">{filler}</Badge>)}</div>}</CardContent></Card></motion.div>}

    {(aiLoading || aiError) && <div className="rounded-md border border-border/70 bg-card p-4 text-sm">{aiLoading ? <span className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{t("AI đang phân tích câu trả lời...", "AI is analysing your answer...")}</span> : <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-muted-foreground">{aiError}</span>{local && <Button size="sm" variant="outline" onClick={() => void requestAi(answer, local, topic)}>{t("Phân tích lại", "Try analysis again")}</Button>}</div>}</div>}

    {ai && <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Card className="overflow-hidden border-primary/20"><CardHeader className="border-b border-border/70 pb-3"><CardTitle className="flex items-center gap-2 text-base"><Sparkles className="h-4 w-4 text-primary" />{t("Phản hồi chuyên sâu", "Coaching feedback")}<Badge variant="secondary">{ai.score}/100</Badge></CardTitle></CardHeader><CardContent className="space-y-5 p-4 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-md border p-4"><p className="font-semibold">{t("Độ lưu loát", "Fluency")}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ai.fluency || t("Chưa có nhận xét.", "No note available.")}</p></div><div className="rounded-md border p-4"><p className="font-semibold">{t("Vốn từ", "Vocabulary")}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ai.vocabulary || t("Chưa có nhận xét.", "No note available.")}</p></div></div>
      {ai.strengths.length > 0 && <div className="speaking-feedback-success rounded-md border p-4"><p className="mb-2 font-semibold">{t("Điểm mạnh", "Strengths")}</p><ul className="space-y-1 text-sm">{ai.strengths.map((item) => <li key={item} className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />{item}</li>)}</ul></div>}
      {ai.grammarFixes.length > 0 && <div><p className="mb-2 font-semibold">{t("Sửa và áp dụng", "Fix and apply")}</p><div className="grid gap-2">{ai.grammarFixes.map((fix) => { const parts = splitGrammarFix(fix); return <div key={fix} className="rounded-md border p-3 text-sm">{parts ? <><p className="text-muted-foreground line-through">{parts.original}</p><div className="mt-1 flex items-start justify-between gap-2"><p className="font-semibold text-primary">{parts.improved}</p><Button size="icon" variant="ghost" aria-label={t("Nghe câu sửa", "Listen to correction")} disabled={audioBusy} onClick={() => void playText(parts.improved)}><Volume2 className="h-4 w-4" /></Button></div></> : fix}</div>; })}</div></div>}
      {ai.modelAnswer && <div className="rounded-md border border-primary/20 bg-primary/5 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{t("Câu trả lời nâng cấp", "Upgraded answer")}</p><div className="flex gap-2"><Button size="sm" variant="outline" disabled={audioBusy} onClick={() => void playText(ai.modelAnswer)}><Headphones className="mr-1 h-4 w-4" />{t("Nghe", "Listen")}</Button><Button size="sm" onClick={() => void playText(ai.modelAnswer, 0.75)} disabled={audioBusy}><Mic className="mr-1 h-4 w-4" />{t("Luyện theo", "Practise")}</Button></div></div><p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{ai.modelAnswer}</p></div>}
      {ai.followUps.length > 0 && <div><p className="mb-2 font-semibold">{t("Nói tiếp để tiến bộ", "Keep the conversation going")}</p><div className="grid gap-2">{ai.followUps.map((question, i) => <Button key={question} variant="outline" className="h-auto justify-between gap-3 py-3 text-left whitespace-normal" onClick={() => handleFollowUp(question, i)}><span>{question}</span><ArrowRight className="h-4 w-4 shrink-0" /></Button>)}</div></div>}
    </CardContent></Card></motion.div>}

    {history.length > 0 && <Card><CardHeader className="pb-3"><CardTitle className="text-base">{t("Tiến bộ gần đây", "Recent progress")}</CardTitle></CardHeader><CardContent><div className="grid gap-2 sm:grid-cols-3">{history.slice(0, 3).map((entry, i) => <div key={`${entry.date}-${i}`} className="rounded-md border p-3"><div className="flex items-center justify-between"><Badge variant="outline">{entry.level}</Badge><span className="font-bold text-primary">{entry.aiScore ?? entry.score}</span></div><p className="mt-2 text-xs text-muted-foreground">{entry.wpm} WPM · {entry.words} {t("từ", "words")} · {entry.fillers} {t("từ đệm", "fillers")}</p></div>)}</div></CardContent></Card>}
  </div>;
};

export default FreeTalkMode;
