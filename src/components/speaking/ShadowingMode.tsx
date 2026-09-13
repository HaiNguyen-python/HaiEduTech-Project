// Shadowing mode: listen to the model sentence, then imitate it. Scores both
// word accuracy and pace (how close the learner's duration is to the model).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic, Square, Volume2, Repeat, ChevronLeft, ChevronRight, Gauge, Rabbit, Headphones, Radio, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import SpeakingThemeIllustration from "@/components/speaking/SpeakingThemeIllustration";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { scorePace, type PaceResult } from "@/lib/speakingShadowScore";
import { addWeakWords } from "@/lib/speakingWeakWords";
import {
  compareSentence,
  micErrorMessage,
  playSpeakingTts,
  stopSpeakingTts,
  type SimpleWordResult,
  type SpeakingLang,
} from "@/lib/speakingModeShared";

interface Props {
  language: SpeakingLang;
  onPerfectScore?: () => void;
}

const ShadowingMode = ({ language, onPerfectScore }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];
  const reduceMotion = useReducedMotion();

  const practiceItems = useMemo(
    () => config.themes.flatMap((theme) => theme.sentences.map((sentence) => ({ sentence, theme }))).slice(0, 200),
    [config]
  );

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<SimpleWordResult[] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [pace, setPace] = useState<PaceResult | null>(null);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(0);
  const [avg, setAvg] = useState(0);
  const playTokenRef = useRef(0);

  const practiceItem = practiceItems[index];
  const sentence = practiceItem?.sentence;
  const theme = practiceItem?.theme;

  const handleFinal = useCallback(
    (heard: string, elapsedMs: number) => {
      if (!sentence) return;
      const cmp = compareSentence(sentence.text, heard, language);
      setResults(cmp.results);
      setAccuracy(cmp.accuracy);
      const paceResult = scorePace(sentence.text, language, elapsedMs);
      setPace(paceResult);
      setDone((d) => d + 1);
      setAvg((prev) => Math.round((prev * done + cmp.accuracy) / (done + 1)));
      const missed = cmp.results.filter((r) => r.status === "wrong").map((r) => ({ word: r.word }));
      if (missed.length) addWeakWords(language, missed, "shadow");
      if (cmp.accuracy >= 90 && paceResult.verdict === "good") onPerfectScore?.();
    },
    [done, language, onPerfectScore, sentence]
  );

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: 30, onFinal: handleFinal });

  useEffect(() => {
    playTokenRef.current += 1;
    stopSpeakingTts(language);
    setPlaying(false);
    setResults(null);
    setAccuracy(null);
    setPace(null);
    rec.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, language]);

  useEffect(() => () => {
    playTokenRef.current += 1;
    stopSpeakingTts(language);
  }, [language]);

  const play = async (rate: number) => {
    if (!sentence || playing) return;
    const token = ++playTokenRef.current;
    setPlaying(true);
    await playSpeakingTts(language, sentence.text, rate);
    if (token === playTokenRef.current) setPlaying(false);
  };

  if (!sentence || !theme) return null;
  const errorText = micErrorMessage(rec.error, t);
  const progress = ((index + 1) / practiceItems.length) * 100;
  const phraseChunks = sentence.text.match(/[^,;:.!?]+[,;:.!?]?/g)?.map((chunk) => chunk.trim()).filter(Boolean) ?? [sentence.text];
  const waveformActive = playing || rec.isRecording;
  const waveformBars = [3, 6, 4, 8, 5, 10, 7, 4, 9, 6, 11, 5, 8, 4, 7, 3, 6, 9, 5, 7, 4, 8, 3, 6];
  const feedback = accuracy === null
    ? t("Nghe kỹ nhịp câu, rồi nói lại khi bạn sẵn sàng.", "Listen for the rhythm, then speak when you are ready.")
    : accuracy >= 90 && pace?.verdict === "good"
      ? t("Rất tốt! Phát âm và nhịp nói của bạn đang khớp với câu mẫu.", "Excellent! Your pronunciation and pace match the model well.")
      : accuracy >= 70
        ? t("Tiến bộ tốt. Hãy thử lại một lần để câu nói liền mạch hơn.", "Good progress. Try once more for a smoother delivery.")
        : t("Hãy nghe lại bản chậm và tập theo từng cụm câu.", "Listen to the slow model and practise one phrase at a time.");

  return (
    <div className="speaking-studio">
      <Card className="speaking-studio-shell overflow-hidden border-primary/20 bg-card/90 shadow-xl backdrop-blur-xl">
        <CardHeader className="border-b border-border/70 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Repeat className="h-5 w-5" />
                </span>
                {t("Phòng luyện Shadowing", "Shadowing studio")}
              </CardTitle>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {t("Nghe câu mẫu, bắt nhịp và nói lại thật tự nhiên.", "Listen, catch the rhythm, and speak it back naturally.")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2" aria-label={t("Trạng thái luyện tập", "Practice status")}>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{index + 1}/{practiceItems.length}</Badge>
              {done > 0 && <Badge className="bg-accent/15 text-foreground hover:bg-accent/15">{t("Trung bình", "Average")} {avg}%</Badge>}
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2 bg-secondary" aria-label={t("Tiến độ Shadowing", "Shadowing progress")} />
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.35fr)]">
            <aside className="space-y-4">
              <div className="overflow-hidden rounded-md border border-primary/20 bg-primary/5">
                <SpeakingThemeIllustration theme={theme} variant="practice" />
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-primary">{t("Chủ đề", "Theme")}</p>
                    <p className="truncate font-semibold">{t(theme.nameVi, theme.name)}</p>
                  </div>
                  <span className="text-2xl" aria-hidden="true">{theme.icon}</span>
                </div>
              </div>

              <div className="rounded-md border border-border/70 bg-background/70 p-4" aria-live="polite">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  {rec.isRecording ? <Radio className="h-4 w-4 text-destructive" /> : <Headphones className="h-4 w-4 text-primary" />}
                  {rec.isRecording
                    ? t(`Đang thu âm - ${rec.seconds}s`, `Recording - ${rec.seconds}s`)
                    : playing
                      ? t("Đang phát câu mẫu", "Playing model sentence")
                      : t("Sẵn sàng luyện tập", "Ready to practise")}
                </div>
                <div className={`speaking-waveform ${rec.isRecording ? "is-recording" : playing ? "is-playing" : ""}`} aria-hidden="true">
                  {waveformBars.map((height, barIndex) => (
                    <motion.span
                      key={`${height}-${barIndex}`}
                      className="speaking-waveform-bar"
                      style={{ height: `${height * 3}px` }}
                      animate={waveformActive && !reduceMotion ? { scaleY: [0.5, 1, 0.65] } : { scaleY: 0.55 }}
                      transition={{ duration: 0.65, repeat: waveformActive && !reduceMotion ? Infinity : 0, delay: barIndex * 0.035 }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feedback}</p>
              </div>
            </aside>

            <section className="flex min-w-0 flex-col gap-4" aria-label={t("Câu luyện tập", "Practice sentence")}>
              <div className="rounded-md border border-primary/20 bg-background/80 p-4 sm:p-6">
                <div className="text-xl font-semibold leading-relaxed sm:text-2xl">
                  {results
                    ? results.map((r, resultIndex) => (
                        <span
                          key={`${r.word}-${resultIndex}`}
                          className={r.status === "correct" ? "speaking-word-correct" : r.status === "close" ? "speaking-word-close" : "speaking-word-wrong"}
                        >
                          {r.word}{" "}
                        </span>
                      ))
                    : phraseChunks.map((chunk, chunkIndex) => (
                        <span key={`${chunk}-${chunkIndex}`} className="mr-2 inline rounded bg-primary/5 px-1 py-0.5">{chunk}</span>
                      ))}
                </div>
                {sentence.ipa && <div className="mt-3 break-words font-mono text-sm text-primary">{sentence.ipa}</div>}
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{sentence.translation}</div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <Button variant="outline" disabled={playing || rec.isRecording} onClick={() => play(1)} className="h-11 gap-2 border-primary/30">
                  <Volume2 className="h-4 w-4" />
                  {t("Nghe mẫu", "Listen")}
                </Button>
                <Button variant="outline" disabled={playing || rec.isRecording} onClick={() => play(0.7)} className="h-11 gap-2 border-primary/30">
                  <Rabbit className="h-4 w-4" />
                  {t("Chậm 0.7x", "Slow 0.7x")}
                </Button>
                {rec.isRecording ? (
                  <Button variant="destructive" onClick={rec.stop} className="h-11 gap-2 motion-safe:animate-pulse">
                    <Square className="h-4 w-4" />
                    {t("Dừng", "Stop")} {rec.seconds}s
                  </Button>
                ) : (
                  <Button disabled={playing} onClick={rec.start} className="h-11 gap-2 shadow-md">
                    <Mic className="h-4 w-4" />
                    {accuracy === null ? t("Nói lại", "Shadow it") : t("Thử lại", "Try again")}
                  </Button>
                )}
              </div>

              {errorText && (
                <div role="alert" aria-live="assertive" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {errorText}
                </div>
              )}
              {rec.isRecording && rec.transcript && (
                <div className="rounded-md bg-secondary/70 p-3 text-sm italic text-muted-foreground" aria-live="polite">“{rec.transcript}”</div>
              )}

              {accuracy !== null && pace && (
                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 sm:grid-cols-2" aria-live="polite">
                  <div className="rounded-md border border-border/70 bg-background/70 p-4">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>{t("Độ chính xác", "Accuracy")}</span>
                      <span className="text-primary">{accuracy}%</span>
                    </div>
                    <Progress value={accuracy} className="mt-3 h-2" />
                  </div>
                  <div className="rounded-md border border-border/70 bg-background/70 p-4">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="flex items-center gap-1.5"><Gauge className="h-4 w-4 text-primary" />{t("Nhịp nói", "Pace")}</span>
                      <span className="text-primary">{pace.score}%</span>
                    </div>
                    <Progress value={pace.score} className="mt-3 h-2" />
                    <div className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {t(`Bạn: ${pace.learnerWpm} - Mẫu: ${pace.modelWpm}`, `You: ${pace.learnerWpm} - Model: ${pace.modelWpm}`)}<br />
                      {t(pace.tipVi, pace.tipEn)}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                <Button variant="ghost" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  {t("Trước", "Previous")}
                </Button>
                {accuracy !== null && (
                  <Button variant="ghost" onClick={() => { setResults(null); setAccuracy(null); setPace(null); rec.reset(); }} className="hidden gap-1 sm:flex">
                    <RotateCcw className="h-4 w-4" />
                    {t("Làm lại", "Reset")}
                  </Button>
                )}
                <Button disabled={index >= practiceItems.length - 1} onClick={() => setIndex((i) => Math.min(practiceItems.length - 1, i + 1))} className="gap-1">
                  {t("Câu tiếp", "Next")}
                  <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShadowingMode;
