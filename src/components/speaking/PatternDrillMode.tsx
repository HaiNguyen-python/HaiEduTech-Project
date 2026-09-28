// Pattern Drilling: learners master one sentence frame at a time by swapping
// the slot word. Step 1 "Listen & repeat" shows the full sentence; step 2
// "Reflex" shows only the Vietnamese cue so the learner must produce it.
import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Eye, EyeOff, Mic, RotateCcw, Square, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { DRILL_LEVELS, fillSentence, getPatterns, type DrillLevel } from "@/data/patternDrills";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { addWeakWords } from "@/lib/speakingWeakWords";
import { safeStorage } from "@/lib/safeStorage";
import {
  compareSentence, micErrorMessage, playSpeakingTts, stopSpeakingTts,
  type SimpleWordResult, type SpeakingLang,
} from "@/lib/speakingModeShared";

interface Props {
  language: SpeakingLang;
  onPerfectScore?: () => void;
}

const PASS = 80;
type Step = "repeat" | "reflex";

const PatternDrillMode = ({ language, onPerfectScore }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];
  const all = useMemo(() => getPatterns(language), [language]);
  const storeKey = `pattern-drill-done-${language}`;

  const [level, setLevel] = useState<DrillLevel>("starter");
  const patterns = useMemo(() => all.filter((p) => p.level === level), [all, level]);
  const [pIdx, setPIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [step, setStep] = useState<Step>("repeat");
  const [results, setResults] = useState<SimpleWordResult[] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [mastered, setMastered] = useState<string[]>(() => {
    return safeStorage.get<string[]>(storeKey, []) || [];
  });

  const pattern = patterns[pIdx];
  const fill = pattern?.fills[fIdx];
  const target = pattern && fill ? fillSentence(pattern.frame, fill.w) : "";
  const targetPy = pattern?.framePy && fill?.py ? fillSentence(pattern.framePy, fill.py) : "";
  const cueVi = pattern && fill ? fillSentence(pattern.frameVi, fill.vi) : "";

  const handleFinal = useCallback((heard: string) => {
    if (!target) return;
    const cmp = compareSentence(target, heard, language);
    setResults(cmp.results);
    setAccuracy(cmp.accuracy);
    const missed = cmp.results.filter((r) => r.status === "wrong").map((r) => ({ word: r.word }));
    if (missed.length) addWeakWords(language, missed, "sentence");
    if (cmp.accuracy >= 95) onPerfectScore?.();
  }, [language, onPerfectScore, target]);

  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: 20, onFinal: handleFinal });

  const clearAttempt = () => { setResults(null); setAccuracy(null); setShowHint(false); rec.reset(); };

  useEffect(() => { setPIdx(0); setFIdx(0); setStep("repeat"); }, [level, language]);
  useEffect(() => { stopSpeakingTts(language); clearAttempt(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [pIdx, fIdx, step, level]);

  if (!pattern || !fill) return null;

  const total = pattern.fills.length * 2;
  const doneCount = (step === "reflex" ? pattern.fills.length : 0) + fIdx;
  const passed = accuracy !== null && accuracy >= PASS;
  const hideTarget = step === "reflex" && !showHint && accuracy === null;

  const next = () => {
    if (fIdx < pattern.fills.length - 1) return setFIdx(fIdx + 1);
    if (step === "repeat") { setStep("reflex"); setFIdx(0); return; }
    if (!mastered.includes(pattern.id)) {
      const upd = [...mastered, pattern.id];
      setMastered(upd);
      safeStorage.set(storeKey, upd);
    }
    if (pIdx < patterns.length - 1) { setPIdx(pIdx + 1); setFIdx(0); setStep("repeat"); }
  };
  const isLast = step === "reflex" && fIdx === pattern.fills.length - 1;
  const micMsg = micErrorMessage(rec.error, t);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <h2 className="text-lg font-bold">{t("Luyện phản xạ khung câu", "Pattern Drilling")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("Nắm một khung câu, thay từ vào chỗ trống và nói to cho đến khi bật ra tự nhiên. Rất hợp cho người mất gốc.",
                "Master one sentence frame, swap the slot word and say it aloud until it comes out automatically. Ideal for beginners.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {DRILL_LEVELS.map((l) => (
              <Button key={l.key} size="sm" variant={level === l.key ? "default" : "outline"} onClick={() => setLevel(l.key)}>
                {t(l.vi, l.en)}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {t(DRILL_LEVELS.find((l) => l.key === level)!.descVi, DRILL_LEVELS.find((l) => l.key === level)!.descEn)}
          </p>
          <div className="flex flex-wrap gap-2">
            {patterns.map((p, i) => (
              <Button key={p.id} size="sm" variant={i === pIdx ? "secondary" : "ghost"} className="gap-1 border"
                onClick={() => { setPIdx(i); setFIdx(0); setStep("repeat"); }}>
                {mastered.includes(p.id) && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                {p.frame}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/40">
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("Khung câu", "Frame")}</p>
              <p className="text-xl font-bold">{pattern.frame}</p>
              {pattern.framePy && <p className="text-sm text-muted-foreground">{pattern.framePy}</p>}
              <p className="text-sm text-muted-foreground">{pattern.frameVi}</p>
            </div>
            <Badge variant={step === "repeat" ? "secondary" : "default"} className="gap-1">
              {step === "repeat" ? <Volume2 className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
              {step === "repeat" ? t("Bước 1: Nghe & nhắc lại", "Step 1: Listen & repeat") : t("Bước 2: Phản xạ", "Step 2: Reflex")}
            </Badge>
          </div>
          <p className="text-sm bg-muted/50 rounded-md p-2">💡 {t(pattern.tipVi, pattern.tipEn)}</p>
          <Progress value={(doneCount / total) * 100} />

          <div className="rounded-xl border bg-card p-5 text-center space-y-2">
            {step === "reflex" && (
              <p className="text-sm text-muted-foreground">{t("Nói câu này bằng", "Say this in")} {language === "chinese" ? t("tiếng Trung", "Chinese") : t("tiếng Anh", "English")}:</p>
            )}
            {step === "reflex" && <p className="text-lg font-semibold">{cueVi}</p>}
            {hideTarget ? (
              <Button size="sm" variant="ghost" className="gap-1" onClick={() => setShowHint(true)}>
                <Eye className="w-4 h-4" /> {t("Xem gợi ý", "Show hint")}
              </Button>
            ) : (
              <>
                <p className="text-2xl font-bold">
                  {results ? results.map((r, i) => (
                    <span key={i} className={r.status === "correct" ? "text-primary" : r.status === "close" ? "text-accent-foreground underline decoration-dotted" : "text-destructive"}>
                      {r.word}{language === "chinese" ? "" : " "}
                    </span>
                  )) : target}
                </p>
                {targetPy && <p className="text-muted-foreground">{targetPy}</p>}
                {step === "repeat" && <p className="text-sm text-muted-foreground">{cueVi}</p>}
                {step === "reflex" && showHint && accuracy === null && (
                  <Button size="sm" variant="ghost" className="gap-1" onClick={() => setShowHint(false)}>
                    <EyeOff className="w-4 h-4" /> {t("Ẩn", "Hide")}
                  </Button>
                )}
              </>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" className="gap-1" onClick={() => playSpeakingTts(language, target, 0.75)}>
              <Volume2 className="w-4 h-4" /> {t("Nghe chậm", "Slow")}
            </Button>
            <Button variant="outline" className="gap-1" onClick={() => playSpeakingTts(language, target, 1)}>
              <Volume2 className="w-4 h-4" /> {t("Nghe", "Listen")}
            </Button>
            {rec.isRecording ? (
              <Button variant="destructive" className="gap-1" onClick={rec.stop}><Square className="w-4 h-4" /> {t("Dừng", "Stop")}</Button>
            ) : (
              <Button className="gap-1" disabled={!rec.supported} onClick={() => { clearAttempt(); rec.start(); }}>
                <Mic className="w-4 h-4" /> {t("Nói", "Speak")}
              </Button>
            )}
          </div>
          {rec.isRecording && rec.transcript && <p className="text-center text-sm text-muted-foreground">{rec.transcript}</p>}
          {micMsg && <p className="text-center text-sm text-destructive">{micMsg}</p>}
          {!rec.supported && <p className="text-center text-sm text-muted-foreground">{t("Trình duyệt chưa hỗ trợ nhận diện giọng nói, hãy dùng Chrome.", "Speech recognition is not supported here, please use Chrome.")}</p>}

          {accuracy !== null && (
            <div className="text-center space-y-1">
              <p className={`text-lg font-bold ${passed ? "text-primary" : "text-destructive"}`}>{accuracy}%</p>
              <p className="text-sm text-muted-foreground">
                {passed ? t("Tốt lắm! Sang câu tiếp theo.", "Great! Move to the next one.") : t(`Cần đạt ${PASS}%. Nghe lại và thử lần nữa nhé.`, `Aim for ${PASS}%. Listen again and retry.`)}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-1" disabled={fIdx === 0} onClick={() => setFIdx(fIdx - 1)}>
              <ChevronLeft className="w-4 h-4" /> {t("Trước", "Back")}
            </Button>
            <span className="text-xs text-muted-foreground">{fIdx + 1}/{pattern.fills.length}</span>
            <div className="flex gap-2">
              {accuracy !== null && !passed && (
                <Button variant="outline" size="sm" className="gap-1" onClick={clearAttempt}><RotateCcw className="w-4 h-4" /> {t("Thử lại", "Retry")}</Button>
              )}
              <Button size="sm" variant={passed ? "default" : "ghost"} className="gap-1" onClick={next}
                disabled={isLast && pIdx === patterns.length - 1 && mastered.includes(pattern.id)}>
                {isLast ? t("Hoàn thành khung", "Finish frame") : t("Tiếp", "Next")} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternDrillMode;
