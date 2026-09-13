// Shadowing mode: listen to the model sentence, then imitate it. Scores both
// word accuracy and pace (how close the learner's duration is to the model).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Volume2, Repeat, ChevronLeft, ChevronRight, Gauge, Rabbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
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

  const sentences = useMemo(
    () => config.themes.flatMap((theme) => theme.sentences).slice(0, 200),
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

  const sentence = sentences[index];

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

  if (!sentence) return null;
  const errorText = micErrorMessage(rec.error, t);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Repeat className="w-4 h-4 text-primary" />
              {t("Chế độ Shadowing", "Shadowing mode")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{index + 1}/{sentences.length}</Badge>
              {done > 0 && <Badge variant="outline">{t("Trung bình", "Avg")} {avg}%</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t(
              "Nghe câu mẫu, sau đó nói lại thật giống - cả từ ngữ và nhịp nói.",
              "Listen to the model, then say it back - matching both the words and the pace."
            )}
          </p>

          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="text-lg sm:text-xl font-semibold leading-relaxed">
              {results
                ? results.map((r, i) => (
                    <span
                      key={`${r.word}-${i}`}
                      className={
                        r.status === "correct"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : r.status === "close"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-rose-600 dark:text-rose-400 underline decoration-wavy"
                      }
                    >
                      {r.word}{" "}
                    </span>
                  ))
                : sentence.text}
            </div>
            {sentence.ipa && <div className="mt-2 text-sm text-muted-foreground font-mono">{sentence.ipa}</div>}
            <div className="mt-1 text-sm text-muted-foreground">{sentence.translation}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" disabled={playing} onClick={() => play(1)} className="gap-1">
              <Volume2 className="w-4 h-4" />
              {t("Nghe mẫu", "Listen")}
            </Button>
            <Button variant="outline" size="sm" disabled={playing} onClick={() => play(0.7)} className="gap-1">
              <Rabbit className="w-4 h-4" />
              {t("Chậm 0.7x", "Slow 0.7x")}
            </Button>
            {rec.isRecording ? (
              <Button size="sm" variant="destructive" onClick={rec.stop} className="gap-1">
                <Square className="w-4 h-4" />
                {t("Dừng", "Stop")} {rec.seconds}s
              </Button>
            ) : (
              <Button size="sm" onClick={rec.start} className="gap-1">
                <Mic className="w-4 h-4" />
                {t("Nói lại", "Shadow it")}
              </Button>
            )}
          </div>

          {errorText && (
            <div role="alert" aria-live="assertive" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {errorText}
            </div>
          )}
          {rec.isRecording && rec.transcript && (
            <div className="text-sm text-muted-foreground italic">{rec.transcript}</div>
          )}

          {accuracy !== null && pace && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border p-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{t("Độ chính xác", "Accuracy")}</span>
                  <span>{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="mt-2" />
              </div>
              <div className="rounded-xl border p-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-1"><Gauge className="w-4 h-4" />{t("Nhịp nói", "Pace")}</span>
                  <span>{pace.score}%</span>
                </div>
                <Progress value={pace.score} className="mt-2" />
                <div className="mt-2 text-xs text-muted-foreground">
                  {t(`Bạn: ${pace.learnerWpm} - Mẫu: ${pace.modelWpm}`, `You: ${pace.learnerWpm} - Model: ${pace.modelWpm}`)}
                  <br />
                  {t(pace.tipVi, pace.tipEn)}
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("Trước", "Previous")}
            </Button>
            <Button
              size="sm"
              disabled={index >= sentences.length - 1}
              onClick={() => setIndex((i) => Math.min(sentences.length - 1, i + 1))}
              className="gap-1"
            >
              {t("Câu tiếp", "Next")}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShadowingMode;
