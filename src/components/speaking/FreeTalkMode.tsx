// Free Talk mode: open answer on a level-appropriate topic. A local heuristic
// report shows immediately, then the AI report replaces it when it arrives.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square, MessageCircle, Sparkles, Loader2, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { fillerPatterns, speakingFreeTalkTopics, type FreeTalkTopic } from "@/data/speakingFreeTalkTopics";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { micErrorMessage, playSpeakingTts, stopSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  language: SpeakingLang;
  onPerfectScore?: () => void;
}

interface LocalReport {
  words: number;
  durationSec: number;
  wpm: number;
  fillers: string[];
  uniqueRatio: number;
  score: number;
}

interface AiReport {
  score: number;
  fluency: string;
  vocabulary: string;
  grammarFixes: string[];
  strengths: string[];
  modelAnswer: string;
  followUps: string[];
}

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const DURATIONS = [30, 60, 90];

const buildLocalReport = (transcript: string, language: SpeakingLang, durationMs: number): LocalReport => {
  const words = (transcript.match(/\S+/g) ?? []).length || transcript.length;
  const durationSec = Math.max(1, Math.round(durationMs / 1000));
  const wpm = Math.round(words / (durationSec / 60));
  const lower = transcript.toLowerCase();
  const fillers = (fillerPatterns[language] ?? []).filter((f) => lower.includes(f));
  const unique = new Set((transcript.toLowerCase().match(/\S+/g) ?? [])).size;
  const uniqueRatio = words ? Math.round((unique / words) * 100) : 0;
  const paceScore = wpm >= 90 && wpm <= 160 ? 100 : wpm < 90 ? Math.max(30, wpm) : Math.max(40, 200 - wpm);
  const score = Math.max(
    0,
    Math.min(100, Math.round(paceScore * 0.4 + uniqueRatio * 0.4 + Math.max(0, 100 - fillers.length * 12) * 0.2))
  );
  return { words, durationSec, wpm, fillers, uniqueRatio, score };
};

const FreeTalkMode = ({ language, onPerfectScore }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];
  const topics = speakingFreeTalkTopics[language] ?? [];

  const [level, setLevel] = useState<(typeof LEVELS)[number]>("B1");
  const [limit, setLimit] = useState(60);
  const [topic, setTopic] = useState<FreeTalkTopic | null>(null);
  const [local, setLocal] = useState<LocalReport | null>(null);
  const [ai, setAi] = useState<AiReport | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const audioBusyRef = useRef(false);
  const [audioBusy, setAudioBusy] = useState(false);

  const pool = useMemo(() => {
    const filtered = topics.filter((x) => x.level === level);
    return filtered.length ? filtered : topics;
  }, [topics, level]);

  useEffect(() => {
    setTopic(pool[Math.floor(Math.random() * pool.length)] ?? null);
    setLocal(null);
    setAi(null);
    setAiError(null);
    setAnswer("");
  }, [pool]);

  useEffect(() => () => stopSpeakingTts(language), [language]);

  const playModelAnswer = async (text: string) => {
    if (audioBusyRef.current) return;
    audioBusyRef.current = true;
    setAudioBusy(true);
    stopSpeakingTts(language);
    try { await playSpeakingTts(language, text, 0.95); }
    finally { audioBusyRef.current = false; setAudioBusy(false); }
  };

  const requestAi = useCallback(
    async (transcript: string, report: LocalReport, activeTopic: FreeTalkTopic) => {
      setAiLoading(true);
      setAiError(null);
      try {
        const { data, error } = await supabase.functions.invoke("analyze-free-talk", {
          body: {
            transcript,
            languageName: config.lang,
            topic: activeTopic.prompt,
            level: activeTopic.level,
            wpm: report.wpm,
            durationSec: report.durationSec,
            fillers: report.fillers,
          },
        });
        if (error) throw error;
        if ((data as any)?.error) throw new Error(String((data as any).error));
        setAi(data as AiReport);
        if (((data as AiReport).score ?? 0) >= 80) onPerfectScore?.();
      } catch {
        setAiError(
          t(
            "Chưa lấy được nhận xét AI. Bạn vẫn có báo cáo nhanh phía trên.",
            "The AI feedback is unavailable right now. The quick report above still applies."
          )
        );
      } finally {
        setAiLoading(false);
      }
    },
    [config.lang, onPerfectScore, t]
  );

  const handleFinal = useCallback(
    (transcript: string, elapsedMs: number) => {
      if (!topic) return;
      setAnswer(transcript);
      const report = buildLocalReport(transcript, language, elapsedMs);
      setLocal(report);
      if (report.score >= 85) onPerfectScore?.();
      const enoughWords = report.words >= 8 || transcript.length >= 20;
      if (enoughWords) void requestAi(transcript, report, topic);
    },
    [language, onPerfectScore, requestAi, topic]
  );

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: limit, onFinal: handleFinal });

  const nextTopic = () => {
    setTopic(pool[Math.floor(Math.random() * pool.length)] ?? null);
    setLocal(null);
    setAi(null);
    setAiError(null);
    setAnswer("");
    rec.reset();
  };

  if (!topic) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          {t("Chưa có chủ đề cho ngôn ngữ này.", "No topics for this language yet.")}
        </CardContent>
      </Card>
    );
  }

  const errorText = micErrorMessage(rec.error, t);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            {t("Nói tự do (Free Talk)", "Free Talk")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((lv) => (
              <Button
                key={lv}
                size="sm"
                variant={level === lv ? "default" : "outline"}
                onClick={() => setLevel(lv)}
              >
                {lv}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <Button key={d} size="sm" variant={limit === d ? "secondary" : "ghost"} onClick={() => setLimit(d)}>
                {d}s
              </Button>
            ))}
          </div>

          <div className="rounded-xl border bg-muted/30 p-4">
            <Badge variant="outline" className="mb-2">{topic.level}</Badge>
            <div className="text-lg font-semibold leading-relaxed">{topic.prompt}</div>
            <div className="text-sm text-muted-foreground mt-1">{topic.promptVi}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {topic.ideas.map((idea) => (
                <Badge key={idea} variant="secondary" className="font-normal">{idea}</Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {rec.isRecording ? (
              <Button size="sm" variant="destructive" onClick={rec.stop} className="gap-1">
                <Square className="w-4 h-4" />
                {t("Dừng", "Stop")} {rec.seconds}s / {limit}s
              </Button>
            ) : (
              <Button size="sm" onClick={rec.start} className="gap-1">
                <Mic className="w-4 h-4" />
                {t("Bắt đầu nói", "Start speaking")}
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={nextTopic} className="gap-1">
              <RotateCcw className="w-4 h-4" />
              {t("Chủ đề khác", "Another topic")}
            </Button>
          </div>

          {rec.isRecording && <Progress value={(rec.seconds / limit) * 100} />}
          {errorText && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {errorText}
            </div>
          )}
          {(rec.transcript || answer) && (
            <div className="rounded-xl border p-3 text-sm whitespace-pre-wrap">{rec.transcript || answer}</div>
          )}
        </CardContent>
      </Card>

      {local && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t("Báo cáo nhanh", "Quick report")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-lg border p-2">
                  <div className="text-xl font-bold">{local.score}</div>
                  <div className="text-xs text-muted-foreground">{t("Điểm", "Score")}</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-xl font-bold">{local.wpm}</div>
                  <div className="text-xs text-muted-foreground">{t("Từ/phút", "WPM")}</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-xl font-bold">{local.words}</div>
                  <div className="text-xs text-muted-foreground">{t("Số từ", "Words")}</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-xl font-bold">{local.uniqueRatio}%</div>
                  <div className="text-xs text-muted-foreground">{t("Từ khác nhau", "Unique words")}</div>
                </div>
              </div>
              {local.fillers.length > 0 && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t("Từ đệm nghe được: ", "Fillers heard: ")}</span>
                  {local.fillers.map((f) => (
                    <Badge key={f} variant="destructive" className="mr-1 font-normal">{f}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {aiLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          {t("AI đang phân tích câu trả lời...", "AI is analysing your answer...")}
        </div>
      )}
      {aiError && <div className="text-sm text-muted-foreground">{aiError}</div>}

      {ai && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t("Nhận xét AI", "AI feedback")}
                <Badge variant="secondary">{ai.score}/100</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {ai.fluency && (
                <div>
                  <div className="font-medium">{t("Độ lưu loát", "Fluency")}</div>
                  <p className="text-muted-foreground">{ai.fluency}</p>
                </div>
              )}
              {ai.vocabulary && (
                <div>
                  <div className="font-medium">{t("Từ vựng", "Vocabulary")}</div>
                  <p className="text-muted-foreground">{ai.vocabulary}</p>
                </div>
              )}
              {ai.strengths.length > 0 && (
                <div>
                  <div className="font-medium">{t("Điểm mạnh", "Strengths")}</div>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {ai.strengths.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}
              {ai.grammarFixes.length > 0 && (
                <div>
                  <div className="font-medium">{t("Sửa ngữ pháp", "Grammar fixes")}</div>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {ai.grammarFixes.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}
              {ai.modelAnswer && (
                <div className="rounded-xl border bg-muted/30 p-3">
                  <div className="font-medium flex items-center justify-between gap-2">
                    {t("Câu trả lời mẫu", "Model answer")}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                      disabled={audioBusy}
                      onClick={() => void playModelAnswer(ai.modelAnswer)}
                    >
                      <Volume2 className="w-4 h-4" />
                      {t("Nghe", "Listen")}
                    </Button>
                  </div>
                  <p className="whitespace-pre-wrap">{ai.modelAnswer}</p>
                </div>
              )}
              {ai.followUps.length > 0 && (
                <div>
                  <div className="font-medium">{t("Câu hỏi tiếp theo - hãy trả lời tiếp", "Follow-up questions - answer these next")}</div>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {ai.followUps.map((q) => <li key={q}>{q}</li>)}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default FreeTalkMode;
