// Weak-word review: every word missed in any Speaking Coach mode comes back
// here until the learner says it cleanly three times.
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Volume2, CheckCircle, XCircle, Brain, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import {
  CLEAN_STREAK,
  dueWeakWords,
  loadWeakWords,
  reviewWeakWord,
  type WeakWord,
} from "@/lib/speakingWeakWords";
import {
  compareSentence,
  micErrorMessage,
  playSpeakingTts,
  stopSpeakingTts,
  type SpeakingLang,
} from "@/lib/speakingModeShared";

interface Props {
  language: SpeakingLang;
  onChange?: () => void;
}

const WeakWordReview = ({ language, onChange }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];

  const [queue, setQueue] = useState<WeakWord[]>(() => dueWeakWords(loadWeakWords(language)));
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | null>(null);
  const [heard, setHeard] = useState("");
  const [cleared, setCleared] = useState(0);
  const audioBusyRef = useRef(false);
  const [audioBusy, setAudioBusy] = useState(false);

  const card = queue[index];

  const handleFinal = useCallback(
    (transcript: string) => {
      if (!card) return;
      setHeard(transcript);
      const { accuracy } = compareSentence(card.word, transcript, language);
      const ok = accuracy >= 75;
      setVerdict(ok ? "correct" : "wrong");
      reviewWeakWord(language, card.word, ok);
      if (ok && card.clean + 1 >= CLEAN_STREAK) setCleared((c) => c + 1);
      onChange?.();
    },
    [card, language, onChange]
  );

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: 12, onFinal: handleFinal });

  useEffect(() => {
    setQueue(dueWeakWords(loadWeakWords(language)));
    setIndex(0);
    setVerdict(null);
    setHeard("");
    setCleared(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => () => stopSpeakingTts(language), [language]);

  const playWord = async () => {
    if (!card || audioBusyRef.current) return;
    audioBusyRef.current = true;
    setAudioBusy(true);
    stopSpeakingTts(language);
    try { await playSpeakingTts(language, card.word, 0.8); }
    finally { audioBusyRef.current = false; setAudioBusy(false); }
  };

  const next = () => {
    setVerdict(null);
    setHeard("");
    rec.reset();
    setIndex((i) => i + 1);
  };

  if (!queue.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center space-y-2">
          <PartyPopper className="w-8 h-8 mx-auto text-primary" />
          <div className="font-medium">{t("Không còn từ nào cần ôn!", "No words to review!")}</div>
          <p className="text-sm text-muted-foreground">
            {t(
              "Hãy luyện ở các chế độ khác - những từ bạn đọc sai sẽ tự động xuất hiện ở đây.",
              "Practise in the other modes - words you miss show up here automatically."
            )}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (index >= queue.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("Xong phiên ôn tập", "Review session complete")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>{t(`Đã ôn ${queue.length} từ.`, `Reviewed ${queue.length} words.`)}</div>
          {cleared > 0 && (
            <div className="text-emerald-600 dark:text-emerald-400">
              {t(`${cleared} từ đã thành thạo và rời khỏi danh sách.`, `${cleared} words mastered and removed from the list.`)}
            </div>
          )}
          <Button
            size="sm"
            onClick={() => {
              setQueue(dueWeakWords(loadWeakWords(language)));
              setIndex(0);
            }}
          >
            {t("Ôn tiếp", "Review again")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const errorText = micErrorMessage(rec.error, t);
  const progress = Math.round((card.clean / CLEAN_STREAK) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            {t("Ôn từ yếu", "Weak-word review")}
          </CardTitle>
          <Badge variant="secondary">{index + 1}/{queue.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border bg-muted/30 p-4 text-center">
          <div className="text-2xl font-bold">{card.word}</div>
          {card.ipa && <div className="text-sm font-mono text-muted-foreground mt-1">{card.ipa}</div>}
          <div className="mt-2 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" disabled={audioBusy} onClick={() => void playWord()}>
              <Volume2 className="w-4 h-4" />
              {t("Nghe mẫu", "Listen")}
            </Button>
          </div>
          <div className="mt-3">
            <Progress value={progress} />
            <div className="text-xs text-muted-foreground mt-1">
              {t(`Đọc đúng ${card.clean}/${CLEAN_STREAK} lần liên tiếp`, `${card.clean}/${CLEAN_STREAK} clean attempts`)}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {rec.isRecording ? (
            <Button size="sm" variant="destructive" onClick={rec.stop} className="gap-1">
              <Square className="w-4 h-4" />
              {t("Dừng", "Stop")} {rec.seconds}s
            </Button>
          ) : (
            <Button size="sm" onClick={rec.start} disabled={verdict !== null} className="gap-1">
              <Mic className="w-4 h-4" />
              {t("Đọc lại từ này", "Say it again")}
            </Button>
          )}
          {verdict !== null && (
            <Button size="sm" variant="outline" onClick={next}>
              {t("Từ tiếp", "Next word")}
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
              verdict === "correct" ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              {verdict === "correct" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {verdict === "correct" ? t("Tốt lắm!", "Well done!") : t("Chưa khớp, thử lại nhé.", "Not quite, try again.")}
            </div>
            {heard && <div className="mt-1 text-muted-foreground italic">"{heard}"</div>}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeakWordReview;
