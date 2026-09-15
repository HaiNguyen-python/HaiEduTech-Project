// Dictation exercise component with audio placeholder and text input
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, RotateCcw, Headphones, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { logStudentActivity } from "@/hooks/useActivityLogger";

interface DictationSentence {
  text: string;
  audioPlaceholder?: string;
  hint?: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  sentences: DictationSentence[];
  forceEnglish?: boolean;
}

const DictationExercise = ({ instruction, instructionEn, sentences, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [playedAudio, setPlayedAudio] = useState<Record<number, boolean>>({});
  const startedAtRef = useRef<number>(Date.now());

  const handleChange = (idx: number, value: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [idx]: value }));
  };

  const handlePlayAudio = (idx: number, slow = false) => {
    setPlayedAudio(prev => ({ ...prev, [idx]: true }));
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentences[idx].text);
      utterance.lang = 'vi-VN';
      utterance.rate = slow ? 0.35 : 0.55;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctCount = sentences.reduce((acc, _, i) => acc + (isCorrect(i) ? 1 : 0), 0);
    const elapsed = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
    logStudentActivity({
      activityType: "vietnamese_dictation",
      score: correctCount,
      maxScore: sentences.length,
      timeSpentSeconds: elapsed,
      metadata: {
        total: sentences.length,
        correct: correctCount,
        percent: Math.round((correctCount / Math.max(sentences.length, 1)) * 100),
        instruction: forceEnglish ? instructionEn : instruction,
      },
    });
  };
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setPlayedAudio({});
    startedAtRef.current = Date.now();
  };

  const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,!?;:'"]/g, "").replace(/\s+/g, " ");

  const isCorrect = (idx: number) => {
    return normalize(answers[idx] || "") === normalize(sentences[idx].text);
  };

  const score = sentences.reduce((acc, _, i) => acc + (isCorrect(i) ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-1 min-w-0 items-start gap-2 rounded-lg border border-border bg-muted/40 p-4 text-base font-semibold leading-7 text-foreground">
          <Headphones className="w-4 h-4 text-primary" />
          <span className="min-w-0">{forceEnglish ? instructionEn : t(instruction, instructionEn)}</span>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-sm font-bold",
              score === sentences.length ? "text-green-500" : score >= sentences.length / 2 ? "text-yellow-500" : "text-destructive"
            )}>
              {score}/{sentences.length} {forceEnglish ? "correct" : t("đúng", "correct")}
            </span>
            <button onClick={handleReset} className="text-sm text-primary hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {forceEnglish ? "Retry" : t("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {sentences.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="glass-card rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-secondary-foreground">{idx + 1}.</span>
              <button
                onClick={() => handlePlayAudio(idx)}
                className={cn(
                  "flex min-h-11 items-center gap-2 px-3 py-2 rounded-lg text-base font-medium transition-all",
                  playedAudio[idx]
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-primary text-primary-foreground hover:brightness-110"
                )}
              >
                <Volume2 className="w-4 h-4" />
                {forceEnglish ? (playedAudio[idx] ? "Play again" : "Listen") : (playedAudio[idx] ? t("Nghe lại", "Play again") : t("Nghe", "Listen"))}
              </button>
              <button
                onClick={() => handlePlayAudio(idx, true)}
                className="flex min-h-11 items-center gap-2 px-3 py-2 rounded-lg text-base font-medium bg-muted text-secondary-foreground hover:bg-muted/80 transition-all border border-border"
              >
                🐢 {forceEnglish ? "Slow" : t("Nghe chậm", "Slow")}
              </button>
              {s.hint && (
                <span className="text-sm leading-6 text-secondary-foreground italic">💡 {s.hint}</span>
              )}
            </div>

            <textarea
              value={answers[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
              disabled={submitted}
              placeholder={forceEnglish ? "Listen and type what you hear..." : t("Nghe và viết lại câu bạn nghe được...", "Listen and type what you hear...")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border text-base leading-6 transition-all outline-none resize-none min-h-[64px]",
                submitted
                  ? isCorrect(idx)
                    ? "border-green-500 bg-green-500/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
              )}
              rows={2}
            />

            {submitted && (
              <div className="flex items-start gap-2">
                {isCorrect(idx) ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                )}
                <div className="text-sm leading-6">
                  {!isCorrect(idx) && (
                    <p className="text-muted-foreground">
                      ✅ {forceEnglish ? "Answer" : t("Đáp án", "Answer")}: <span className="font-semibold text-primary">{s.text}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {!submitted && Object.keys(answers).length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="min-h-11 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition-all"
        >
          {forceEnglish ? "Check Answers" : t("Kiểm tra", "Check Answers")}
        </motion.button>
      )}
    </div>
  );
};

export default DictationExercise;
