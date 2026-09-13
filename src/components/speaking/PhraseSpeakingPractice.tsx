import { useCallback, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mic, RotateCcw, Square, Volume2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { supabase } from "@/integrations/supabase/client";
import {
  normalizePhraseSpeakingGrade,
  loadPhraseSpeakingResult,
  phraseAppearsInTranscript,
  phrasePracticeId,
  savePhraseSpeakingResult,
  structureAppearsInTranscript,
  structurePracticeId,
  type PhraseSpeakingGrade,
  type PhraseSpeakingProgress,
} from "@/lib/ieltsSpeakingPhrasePractice";
import { micErrorMessage } from "@/lib/speakingModeShared";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";

interface Props {
  mode?: "vocabulary" | "structure";
  part: 1 | 2 | 3;
  topic: string;
  phrase: string;
  meaning: string;
  example: string;
  onClose: () => void;
}

const statusCode = (error: unknown) => {
  if (!error || typeof error !== "object") return 0;
  const context = (error as { context?: { status?: unknown } }).context;
  return Number(context?.status) || 0;
};

const PhraseSpeakingPractice = ({ mode = "vocabulary", part, topic, phrase, meaning, example, onClose }: Props) => {
  const { t } = useLanguage();
  const [grade, setGrade] = useState<PhraseSpeakingGrade | null>(null);
  const isStructure = mode === "structure";
  const practiceId = isStructure ? structurePracticeId(part, topic, phrase) : phrasePracticeId(part, topic, phrase);
  const [progress, setProgress] = useState<PhraseSpeakingProgress | null>(() => loadPhraseSpeakingResult(practiceId));
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const gradeRef = useRef<(transcript: string, elapsedMs: number) => void>(() => {});

  const gradeSentence = useCallback(async (transcript: string, elapsedMs: number) => {
    const spoken = transcript.normalize("NFC").trim().slice(0, 800);
    if (spoken.split(/\s+/).filter(Boolean).length < 3) {
      setError(t("Câu quá ngắn. Hãy nói ít nhất ba từ và dùng cụm từ mục tiêu.", "That sentence is too short. Say at least three words and use the target phrase."));
      return;
    }
    const targetAppears = isStructure
      ? structureAppearsInTranscript(phrase, spoken)
      : phraseAppearsInTranscript(phrase, spoken);
    if (!targetAppears) {
      setError(isStructure
        ? t("Câu của bạn chưa thể hiện đủ phần cố định của cấu trúc. Hãy áp dụng mẫu câu rồi nói lại.", "Your sentence does not clearly use the fixed part of this structure. Apply the frame and try again.")
        : t("Câu của bạn chưa có cụm từ mục tiêu hoặc một biến thể đủ rõ. Hãy bổ sung cụm từ rồi nói lại.", "Your sentence does not clearly include the target phrase or a valid variation. Add it and try again."));
      return;
    }
    setGrading(true);
    setError(null);
    setGrade(null);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke("grade-speaking-sentence", {
        body: { mode, part, topic, phrase, meaning, example, transcript: spoken },
      });
      if (invokeError) throw invokeError;
      const normalized = normalizePhraseSpeakingGrade(data);
      if (!normalized) throw new Error("invalid_grade");
      setGrade(normalized);
      setProgress(savePhraseSpeakingResult(practiceId, normalized.overall));
      void logStudentActivity({
        activityType: isStructure ? "ielts_speaking_structure" : "ielts_speaking_phrase",
        activityId: practiceId,
        score: normalized.overall,
        maxScore: 100,
        timeSpentSeconds: Math.max(1, Math.round(elapsedMs / 1000)),
        domain: "english",
        metadata: { part, topic, phrase, mode, targetUsedCorrectly: normalized.phraseUsedCorrectly },
      });
    } catch (caught) {
      const status = statusCode(caught);
      setError(status === 400
        ? t("Câu gửi đi chưa hợp lệ. Hãy kiểm tra lại bản ghi rồi thử lại.", "The submitted sentence is not valid. Check the transcript and try again.")
        : status === 401
          ? t("Tính năng chấm AI chưa được cấu hình.", "AI grading is not configured.")
          : status === 402
        ? t("Tính năng chấm AI đang tạm dừng vì tài khoản cần bổ sung tín dụng.", "AI grading is paused because the workspace needs more credits.")
        : status === 403
          ? t("Tính năng chấm AI đang bị quản trị viên tạm khóa.", "AI grading is currently blocked by an administrator.")
          : status === 429
            ? t("AI đang bận. Hãy chờ một chút rồi thử lại.", "The AI examiner is busy. Please wait a moment and try again.")
            : status >= 500
              ? t("Dịch vụ chấm đang tạm gián đoạn. Bản ghi vẫn được giữ để bạn chấm lại.", "The grading service is temporarily unavailable. Your transcript is kept for retrying.")
              : t("Chưa chấm được câu này. Bản ghi vẫn được giữ để bạn thử lại.", "This sentence could not be graded. Your transcript is kept so you can try again."));
    } finally {
      setGrading(false);
    }
  }, [example, isStructure, meaning, mode, part, phrase, practiceId, t, topic]);
  gradeRef.current = gradeSentence;

  const recognizer = useSpeechRecognizer({
    speechLang: "en-US",
    maxSeconds: 30,
    onFinal: (transcript, elapsedMs) => void gradeRef.current(transcript, elapsedMs),
  });
  const micError = micErrorMessage(recognizer.error, t);

  const reset = () => {
    recognizer.reset();
    setGrade(null);
    setError(null);
    stopEnglishTts();
  };

  return (
    <div className="mt-3 space-y-3 border-t border-primary/20 pt-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-primary">{isStructure
          ? t("Đặt một câu mới có dùng cấu trúc này", "Make a new sentence using this structure")
          : t("Đặt một câu mới có dùng cụm từ này", "Make a new sentence using this phrase")}</p>
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={t("Đóng phần luyện nói", "Close speaking practice")}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border bg-muted/40 p-3">
        <p className="text-xs font-medium text-muted-foreground">{t("Bản ghi của bạn", "Your transcript")}</p>
        <p className="mt-1 min-h-6 text-sm text-foreground whitespace-pre-wrap">
          {recognizer.transcript || t("Bấm micro và nói một câu hoàn chỉnh.", "Press the microphone and say one complete sentence.")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {!recognizer.isRecording ? (
          <Button onClick={() => { reset(); stopEnglishTts(); void recognizer.start(); }} disabled={grading}>
            <Mic className="h-4 w-4" /> {grade ? t("Nói lại", "Try again") : t("Bắt đầu nói", "Start speaking")}
          </Button>
        ) : (
          <Button variant="destructive" onClick={recognizer.stop}>
            <Square className="h-4 w-4" /> {t("Dừng và chấm", "Stop and grade")} ({recognizer.seconds}s)
          </Button>
        )}
        <Button variant="outline" onClick={() => void playEnglishTts(example)} disabled={recognizer.isRecording || grading}>
          <Volume2 className="h-4 w-4" /> {t("Nghe câu mẫu", "Hear example")}
        </Button>
        {error && recognizer.transcript && (
          <Button variant="secondary" onClick={() => void gradeSentence(recognizer.transcript, Math.max(1000, recognizer.seconds * 1000))} disabled={grading || recognizer.isRecording}>
            <RotateCcw className="h-4 w-4" /> {t("Chấm lại bản ghi", "Retry grading")}
          </Button>
        )}
        {grade && (
          <Button variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> {t("Làm lại", "Reset")}
          </Button>
        )}
      </div>

      {grading && <div className="flex items-center gap-2 text-sm text-primary"><Loader2 className="h-4 w-4 animate-spin" />{isStructure
        ? t("AI đang chấm cách dùng cấu trúc, ngữ pháp và độ tự nhiên...", "AI is checking structure use, grammar, and naturalness...")
        : t("AI đang chấm cách dùng cụm từ, ngữ pháp và độ tự nhiên...", "AI is checking phrase use, grammar, and naturalness...")}</div>}
      {(micError || error) && <p role="alert" className="flex items-start gap-2 text-sm text-destructive"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{micError || error}</p>}

      {grade && (
        <div className="space-y-3 rounded-md border border-primary/25 bg-background p-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={grade.overall >= 80 ? "default" : grade.overall >= 60 ? "secondary" : "destructive"}>{grade.overall}/100</Badge>
            <span className="inline-flex items-center gap-1 text-sm font-medium">
              {grade.phraseUsedCorrectly ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-amber-600" />}
              {grade.phraseUsedCorrectly
                ? isStructure ? t("Dùng cấu trúc đúng", "Structure used correctly") : t("Dùng cụm từ đúng", "Phrase used correctly")
                : isStructure ? t("Cần chỉnh cách dùng cấu trúc", "Structure usage needs work") : t("Cần chỉnh cách dùng cụm từ", "Phrase usage needs work")}
            </span>
            {progress && <span className="text-xs text-muted-foreground">{t("Tốt nhất", "Best")}: {progress.bestScore}% · {progress.attempts} {t("lượt", "attempts")}</span>}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {grade.criteria.map((criterion) => (
              <div key={criterion.label} className="rounded-md border p-2.5">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold"><span>{criterion.label}</span><span>{criterion.score}%</span></div>
                <Progress value={criterion.score} className="my-2 h-1.5" />
                <p className="text-xs leading-relaxed text-muted-foreground">{criterion.feedback}</p>
              </div>
            ))}
          </div>
          {grade.feedback && <p className="text-sm leading-relaxed">{grade.feedback}</p>}
          {grade.correction && <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-2.5 text-sm"><strong>{t("Sửa câu", "Correction")}:</strong> {grade.correction}</div>}
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="leading-relaxed"><strong>{t("Câu nâng cấp", "Upgraded sentence")}:</strong> {grade.upgradedSentence}</p>
              <Button variant="ghost" size="icon-sm" onClick={() => void playEnglishTts(grade.upgradedSentence)} aria-label={t("Nghe câu nâng cấp", "Hear upgraded sentence")}><Volume2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhraseSpeakingPractice;
