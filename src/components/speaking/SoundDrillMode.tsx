// Minimal-pair sound drill: the learner says the highlighted word and the
// recogniser decides which of the two words was heard.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Volume2, CheckCircle, XCircle, Waves, RotateCcw } from "lucide-react";
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

interface Props {
  language: SpeakingLang;
  onPerfectScore?: () => void;
}

interface DrillItem {
  pair: MinimalPair;
  target: "a" | "b";
}

const DRILL_SIZE = 10;

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

  const [items, setItems] = useState<DrillItem[]>(() => buildDrill(pairs));
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | "unclear" | null>(null);
  const [heardWord, setHeardWord] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [weakSounds, setWeakSounds] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
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
        return;
      }
      if (match === item.target) {
        setVerdict("correct");
        setCorrectCount((c) => c + 1);
      } else {
        setVerdict("wrong");
        setWeakSounds((prev) => (prev.includes(item.pair.sound) ? prev : [...prev, item.pair.sound]));
        addWeakWords(language, [{ word: targetWord, ipa: item.target === "a" ? item.pair.aIpa : item.pair.bIpa }], "drill");
      }
    },
    [item, language, targetWord]
  );

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: 12, onFinal: handleFinal });

  useEffect(() => {
    setItems(buildDrill(speakingMinimalPairs[language] ?? []));
    setIndex(0);
    setVerdict(null);
    setHeardWord("");
    setCorrectCount(0);
    setWeakSounds([]);
    setFinished(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => () => stopSpeakingTts(language), [language]);

  const playWord = async (word: string) => {
    if (audioBusyRef.current) return;
    audioBusyRef.current = true;
    setAudioBusy(true);
    stopSpeakingTts(language);
    try { await playSpeakingTts(language, word, 0.85); }
    finally { audioBusyRef.current = false; setAudioBusy(false); }
  };

  const next = () => {
    setVerdict(null);
    setHeardWord("");
    rec.reset();
    if (index >= items.length - 1) {
      setFinished(true);
      if (correctCount >= Math.ceil(items.length * 0.8)) onPerfectScore?.();
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
    setWeakSounds([]);
    setFinished(false);
    rec.reset();
  };

  if (!pairs.length) {
    return (
      <Card>
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
          <div className="text-3xl font-bold">{score}%</div>
          <Progress value={score} />
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
          <Button onClick={restart} className="gap-1">
            <RotateCcw className="w-4 h-4" />
            {t("Luyện lại", "Practise again")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const errorText = micErrorMessage(rec.error, t);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Waves className="w-4 h-4 text-primary" />
            {t("Luyện cặp âm dễ lẫn", "Minimal-pair sound drill")}
          </CardTitle>
          <Badge variant="secondary">{index + 1}/{items.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t("Hãy đọc to từ được tô sáng. Hệ thống sẽ đoán bạn vừa nói từ nào.", "Say the highlighted word out loud. The system decides which word it heard.")}
        </p>

        <Badge variant="outline">{item.pair.sound}</Badge>

        <div className="grid grid-cols-2 gap-3">
          {[item.pair.a, item.pair.b].map((word, i) => {
            const isTarget = (i === 0 ? "a" : "b") === item.target;
            const ipa = i === 0 ? item.pair.aIpa : item.pair.bIpa;
            return (
              <div
                key={word}
                className={`rounded-xl border p-4 text-center transition-colors ${
                  isTarget ? "border-primary bg-primary/10 shadow-sm" : "opacity-60"
                }`}
              >
                <div className="text-xl font-bold break-words">{word}</div>
                {ipa && <div className="text-xs text-muted-foreground font-mono mt-1">{ipa}</div>}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 gap-1"
                  disabled={audioBusy}
                  onClick={() => void playWord(word)}
                >
                  <Volume2 className="w-4 h-4" />
                  {t("Nghe", "Listen")}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-sm text-muted-foreground">{t(item.pair.tipVi, item.pair.tipEn)}</div>

        <div className="flex flex-wrap gap-2">
          {rec.isRecording ? (
            <Button size="sm" variant="destructive" onClick={rec.stop} className="gap-1">
              <Square className="w-4 h-4" />
              {t("Dừng", "Stop")} {rec.seconds}s
            </Button>
          ) : (
            <Button size="sm" onClick={rec.start} disabled={verdict !== null} className="gap-1">
              <Mic className="w-4 h-4" />
              {t(`Nói "${targetWord}"`, `Say "${targetWord}"`)}
            </Button>
          )}
          {verdict !== null && (
            <Button size="sm" variant="outline" onClick={next}>
              {index >= items.length - 1 ? t("Xem kết quả", "See result") : t("Từ tiếp", "Next")}
            </Button>
          )}
        </div>

        {errorText && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {errorText}
          </div>
        )}

        {verdict && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-3 text-sm ${
              verdict === "correct"
                ? "border-emerald-500/40 bg-emerald-500/10"
                : verdict === "wrong"
                ? "border-rose-500/40 bg-rose-500/10"
                : "border-amber-500/40 bg-amber-500/10"
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              {verdict === "correct" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {verdict === "correct"
                ? t("Chính xác! Nghe rõ là", "Correct! Heard as")
                : verdict === "wrong"
                ? t(`Nghe giống "${otherWord}" hơn`, `That sounded more like "${otherWord}"`)
                : t("Chưa nghe rõ, hãy thử lại", "Not clear enough, try again")}
              {verdict === "correct" ? ` "${targetWord}"` : ""}
            </div>
            {heardWord && <div className="mt-1 text-muted-foreground italic">"{heardWord}"</div>}
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
