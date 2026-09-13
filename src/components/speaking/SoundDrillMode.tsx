// Minimal-pair sound drill: the learner says the highlighted word and the
// recogniser decides which of the two words was heard.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic, Square, Volume2, CheckCircle, XCircle, Waves, RotateCcw, Ear, Lightbulb, ArrowRight, Wind, Languages, Timer, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { speakingMinimalPairs, type MinimalPair } from "@/data/speakingMinimalPairs";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { addWeakWords } from "@/lib/speakingWeakWords";
import { matchCandidate, micErrorMessage, playSpeakingTts, stopSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import { classifySoundTip, shouldRecordWeakSound, splitWordDifference, type SoundCoachCategory } from "@/lib/soundDrillCoach";

interface Props {
  language: SpeakingLang;
  onPerfectScore?: () => void;
}

interface DrillItem {
  pair: MinimalPair;
  target: "a" | "b";
}

const DRILL_SIZE = 10;
const delay = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const COACH_ICONS: Record<SoundCoachCategory, typeof Lightbulb> = {
  mouth: Languages,
  tongue: Languages,
  air: Wind,
  length: Timer,
  tone: AudioLines,
  ending: AudioLines,
  general: Lightbulb,
};

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildDrill = (pairs: MinimalPair[]): DrillItem[] =>
  shuffle(pairs)
    .slice(0, DRILL_SIZE)
    .map((pair) => ({ pair, target: Math.random() > 0.5 ? "b" : "a" }));

const SoundDrillMode = ({ language, onPerfectScore }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];
  const pairs = speakingMinimalPairs[language] ?? [];
  const reduceMotion = useReducedMotion();

  const [items, setItems] = useState<DrillItem[]>(() => buildDrill(pairs));
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | "unclear" | null>(null);
  const [heardWord, setHeardWord] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weakSounds, setWeakSounds] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [bestAttemptCorrect, setBestAttemptCorrect] = useState(false);
  const [listened, setListened] = useState(false);
  const audioBusyRef = useRef(false);
  const [audioBusy, setAudioBusy] = useState(false);

  const item = items[index];
  const targetWord = item ? (item.target === "a" ? item.pair.a : item.pair.b) : "";
  const otherWord = item ? (item.target === "a" ? item.pair.b : item.pair.a) : "";

  const handleFinal = useCallback(
    (heard: string) => {
      if (!item) return;
      setHeardWord(heard);
      const match = matchCandidate(heard, item.pair.a, item.pair.b, language);
      if (match === "none") {
        setVerdict("unclear");
        setAttempted(true);
        return;
      }
      if (match === item.target) {
        setVerdict("correct");
        setBestAttemptCorrect(true);
      } else {
        setVerdict("wrong");
      }
      setAttempted(true);
    },
    [item, language]
  );

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: 12, onFinal: handleFinal });

  useEffect(() => {
    setItems(buildDrill(speakingMinimalPairs[language] ?? []));
    setIndex(0);
    setVerdict(null);
    setHeardWord("");
    setCorrectCount(0);
    setStreak(0);
    setWeakSounds([]);
    setFinished(false);
    setAttempted(false);
    setBestAttemptCorrect(false);
    setListened(false);
  }, [language]);

  useEffect(() => () => stopSpeakingTts(language), [language]);

  const playWord = async (word: string) => {
    if (audioBusyRef.current) return;
    audioBusyRef.current = true;
    setAudioBusy(true);
    try {
      setListened(true);
      await playSpeakingTts(language, word, 0.85);
    }
    finally { audioBusyRef.current = false; setAudioBusy(false); }
  };

  const playPair = async () => {
    if (!item || audioBusyRef.current) return;
    audioBusyRef.current = true;
    setAudioBusy(true);
    setListened(true);
    try {
      await playSpeakingTts(language, item.pair.a, 0.8);
      await delay(420);
      await playSpeakingTts(language, item.pair.b, 0.8);
    } finally {
      audioBusyRef.current = false;
      setAudioBusy(false);
    }
  };

  const retry = () => {
    setVerdict(null);
    setHeardWord("");
    setAttempted(false);
    rec.reset();
  };

  const next = () => {
    const mastered = bestAttemptCorrect || verdict === "correct";
    const nextCorrectCount = correctCount + (mastered ? 1 : 0);
    if (mastered) {
      setCorrectCount(nextCorrectCount);
      setStreak((value) => value + 1);
    } else {
      setStreak(0);
      if (item && shouldRecordWeakSound(mastered)) {
        setWeakSounds((prev) => (prev.includes(item.pair.sound) ? prev : [...prev, item.pair.sound]));
        addWeakWords(language, [{ word: targetWord, ipa: item.target === "a" ? item.pair.aIpa : item.pair.bIpa }], "drill");
      }
    }
    setVerdict(null);
    setHeardWord("");
    setAttempted(false);
    setBestAttemptCorrect(false);
    setListened(false);
    rec.reset();
    if (index >= items.length - 1) {
      setFinished(true);
      if (nextCorrectCount >= Math.ceil(items.length * 0.8)) onPerfectScore?.();
    } else {
      setIndex((i) => i + 1);
    }
  };

  const restart = () => {
    setItems(buildDrill(pairs));
    setIndex(0);
    setVerdict(null);
    setHeardWord("");
    setCorrectCount(0);
    setStreak(0);
    setWeakSounds([]);
    setFinished(false);
    setAttempted(false);
    setBestAttemptCorrect(false);
    setListened(false);
    rec.reset();
  };

  const practiseWeakSounds = () => {
    const weakPairs = pairs.filter((pair) => weakSounds.includes(pair.sound));
    setItems(buildDrill(weakPairs.length ? weakPairs : pairs));
    setIndex(0);
    setVerdict(null);
    setHeardWord("");
    setCorrectCount(0);
    setStreak(0);
    setWeakSounds([]);
    setFinished(false);
    setAttempted(false);
    setBestAttemptCorrect(false);
    setListened(false);
    rec.reset();
  };

  if (!pairs.length) {
    return (
      <Card className="speaking-studio overflow-hidden border-primary/20 bg-card/90 shadow-xl backdrop-blur-xl">
        <CardContent className="py-8 text-center text-muted-foreground">
          {t("Chưa có bài luyện âm cho ngôn ngữ này.", "No sound drill is available for this language yet.")}
        </CardContent>
      </Card>
    );
  }

  if (finished) {
    const score = Math.round((correctCount / items.length) * 100);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("Kết quả luyện âm", "Sound drill result")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-primary/10 p-4"><div className="text-3xl font-bold text-primary">{score}%</div><div className="text-sm text-muted-foreground">{t("Điểm tổng", "Total score")}</div></div>
            <div className="rounded-md bg-secondary p-4"><div className="text-3xl font-bold">{correctCount}</div><div className="text-sm text-muted-foreground">{t("Cặp âm đã làm chủ", "Pairs mastered")}</div></div>
            <div className="rounded-md bg-accent/15 p-4"><div className="text-3xl font-bold">{weakSounds.length}</div><div className="text-sm text-muted-foreground">{t("Âm cần ôn", "Sounds to review")}</div></div>
          </div>
          <Progress value={score} className="h-2" />
          <div className="text-sm text-muted-foreground">
            {t(`Đúng ${correctCount}/${items.length} lần.`, `${correctCount}/${items.length} correct.`)}
          </div>
          {weakSounds.length > 0 && (
            <div className="rounded-xl border p-3">
              <div className="text-sm font-medium mb-2">{t("Âm cần luyện thêm", "Sounds to keep practising")}</div>
              <div className="flex flex-wrap gap-2">
                {weakSounds.map((s) => (
                  <Badge key={s} variant="destructive">{s}</Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {weakSounds.length > 0 && <Button onClick={practiseWeakSounds} className="gap-1"><RotateCcw className="h-4 w-4" />{t("Luyện lại âm yếu", "Practise weak sounds")}</Button>}
            <Button onClick={restart} variant="outline" className="gap-1"><RotateCcw className="h-4 w-4" />{t("Luyện bộ mới", "New drill")}</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const errorText = micErrorMessage(rec.error, t);
  const coachCategory = classifySoundTip(item.pair.sound, item.pair.tipVi, item.pair.tipEn);
  const CoachIcon = COACH_ICONS[coachCategory];
  const currentStep = attempted || rec.isRecording ? 3 : listened ? 2 : 1;
  const waveformBars = [4, 7, 5, 10, 6, 12, 8, 5, 9, 6, 11, 7, 4, 8, 5, 9, 6, 10];

  const renderWord = (word: string, other: string, isTarget: boolean) => {
    const difference = splitWordDifference(word, other);
    if (!difference) return word;
    return <>{difference.prefix}<span className={isTarget ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground underline decoration-2 underline-offset-4"}>{difference.focus}</span>{difference.suffix}</>;
  };

  return (
    <Card className="speaking-studio overflow-hidden border-primary/20 bg-card/90 shadow-xl backdrop-blur-xl">
      <CardHeader className="border-b border-border/70 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><Waves className="h-5 w-5" /></span>
            {t("Phòng luyện âm", "Sound Lab")}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{index + 1}/{items.length}</Badge>
            <Badge variant="outline">{t("Đúng", "Mastered")} {correctCount}</Badge>
            {streak > 1 && <Badge className="bg-accent/15 text-foreground hover:bg-accent/15">{streak} {t("liên tiếp", "streak")}</Badge>}
          </div>
        </div>
        <Progress value={((index + 1) / items.length) * 100} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-5 p-4 sm:p-6">
        <div className="grid gap-2 sm:grid-cols-3" aria-label={t("Ba bước luyện âm", "Three sound practice steps")}>
          {[
            [Ear, t("1. Nghe và so sánh", "1. Listen & compare")],
            [Lightbulb, t("2. Nhìn khẩu hình", "2. Check mouth position")],
            [Mic, t("3. Nói từ mục tiêu", "3. Say the target")],
          ].map(([Icon, label], stepIndex) => {
            const StepIcon = Icon as typeof Ear;
            const active = currentStep === stepIndex + 1;
            const complete = currentStep > stepIndex + 1;
            return <div key={label as string} className={`flex min-h-12 items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${active ? "border-primary bg-primary/10 text-primary" : complete ? "border-primary/30 bg-primary/5" : "bg-muted/40 text-muted-foreground"}`}>
              {complete ? <CheckCircle className="h-4 w-4 text-primary" /> : <StepIcon className="h-4 w-4" />}{label as string}
            </div>;
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <section className="space-y-4" aria-label={t("So sánh cặp âm", "Compare the sound pair")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-sm">{item.pair.sound}</Badge>
              <Button variant="outline" size="sm" disabled={audioBusy || rec.isRecording} onClick={() => void playPair()} className="gap-2 border-primary/30">
                <Ear className="h-4 w-4" />{t("Nghe cả cặp", "Compare both")}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
          {[item.pair.a, item.pair.b].map((word, i) => {
            const isTarget = (i === 0 ? "a" : "b") === item.target;
            const ipa = i === 0 ? item.pair.aIpa : item.pair.bIpa;
            return (
              <div
                key={word}
                className={`rounded-md border p-4 text-center transition-colors sm:p-5 ${
                  isTarget ? "border-primary bg-primary/10 shadow-sm" : "bg-background/70"
                }`}
              >
                {isTarget && <Badge className="mb-2 bg-primary text-primary-foreground">{t("Từ mục tiêu", "Target")}</Badge>}
                <div className="break-words text-xl font-bold sm:text-2xl">{renderWord(word, i === 0 ? item.pair.b : item.pair.a, isTarget)}</div>
                {ipa && <div className="mt-1 break-words font-mono text-sm text-muted-foreground">{ipa}</div>}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-1"
                  disabled={audioBusy || rec.isRecording}
                  onClick={() => void playWord(word)}
                >
                  <Volume2 className="w-4 h-4" />
                  {t("Nghe", "Listen")}
                </Button>
              </div>
            );
          })}
            </div>
          </section>

          <aside className="flex flex-col gap-4 rounded-md border border-accent/40 bg-accent/10 p-4">
            <div className="flex items-center gap-2 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground"><CoachIcon className="h-5 w-5" /></span>{t("Huấn luyện khẩu hình", "Pronunciation coach")}</div>
            <p className="leading-relaxed text-foreground">{t(item.pair.tipVi, item.pair.tipEn)}</p>
            <div className="mt-auto rounded-md bg-background/80 p-4 text-center">
              <p className="text-xs font-semibold uppercase text-primary">{t("Hãy nói", "Your target")}</p>
              <p className="mt-1 break-words text-3xl font-bold">{targetWord}</p>
              <p className="mt-1 font-mono text-sm text-muted-foreground">{item.target === "a" ? item.pair.aIpa : item.pair.bIpa}</p>
            </div>
          </aside>
        </div>

        <div className="rounded-md border border-border/70 bg-background/70 p-4">
          <div className={`speaking-waveform ${rec.isRecording ? "is-recording" : audioBusy ? "is-playing" : ""}`} aria-hidden="true">
            {waveformBars.map((height, barIndex) => <motion.span key={`${height}-${barIndex}`} className="speaking-waveform-bar" style={{ height: `${height * 2.5}px` }} animate={(rec.isRecording || audioBusy) && !reduceMotion ? { scaleY: [0.5, 1, 0.65] } : { scaleY: 0.55 }} transition={{ duration: 0.65, repeat: (rec.isRecording || audioBusy) && !reduceMotion ? Infinity : 0, delay: barIndex * 0.04 }} />)}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {rec.isRecording ? (
            <Button variant="destructive" onClick={rec.stop} className="h-11 gap-2 motion-safe:animate-pulse">
              <Square className="w-4 h-4" />
              {t("Dừng", "Stop")} {rec.seconds}s
            </Button>
          ) : (
            <Button onClick={rec.start} disabled={attempted || audioBusy} className="h-11 gap-2 shadow-md">
              <Mic className="w-4 h-4" />
              {t(`Nói "${targetWord}"`, `Say "${targetWord}"`)}
            </Button>
          )}
          {verdict && verdict !== "correct" && <Button variant="outline" onClick={retry} className="h-11 gap-2"><RotateCcw className="h-4 w-4" />{t("Thử lại", "Try again")}</Button>}
          {verdict !== null && <Button onClick={next} className="h-11 gap-2">{index >= items.length - 1 ? t("Xem kết quả", "See result") : t("Từ tiếp", "Next")}<ArrowRight className="h-4 w-4" /></Button>}
          </div>
        </div>

        {errorText && (
          <div role="alert" aria-live="assertive" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {errorText}
          </div>
        )}

        {verdict && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-md border p-4 text-sm ${
              verdict === "correct"
                ? "speaking-feedback-success"
                : verdict === "wrong"
                ? "speaking-feedback-error"
                : "speaking-feedback-warning"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {verdict === "correct" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {verdict === "correct"
                ? t("Chính xác! Nghe rõ là", "Correct! Heard as")
                : verdict === "wrong"
                ? t(`Nghe giống "${otherWord}" hơn`, `That sounded more like "${otherWord}"`)
                : t("Chưa nghe rõ, hãy thử lại", "Not clear enough, try again")}
              {verdict === "correct" ? ` "${targetWord}"` : ""}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-md bg-background/70 p-2"><span className="text-xs text-muted-foreground">{t("Từ mục tiêu", "Target")}</span><div className="font-semibold">{targetWord}</div></div>
              <div className="rounded-md bg-background/70 p-2"><span className="text-xs text-muted-foreground">{t("Hệ thống nghe được", "Heard as")}</span><div className="font-semibold italic">{heardWord || t("Chưa xác định", "Not identified")}</div></div>
            </div>
            {verdict !== "correct" && (
              <div className="mt-1 text-muted-foreground">{t(item.pair.tipVi, item.pair.tipEn)}</div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SoundDrillMode;
