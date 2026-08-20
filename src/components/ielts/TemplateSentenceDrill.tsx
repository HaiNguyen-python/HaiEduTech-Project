/**
 * @file TemplateSentenceDrill.tsx
 * @description One framework step of the IELTS Speaking Template Lab, turned
 *   into a speaking drill: complete model sentences (with the target structure
 *   highlighted), listen buttons (normal / slow) and a record button that scores
 *   how closely the student reproduced the sentence.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef, useState } from "react";
import { Volume2, Turtle, Mic, Square, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { renderHighlighted } from "@/lib/highlightStructure";
import {
  compareDrillWords,
  drillAccuracy,
  isSpeechRecognitionSupported,
  type DrillWordResult,
} from "@/lib/speakingDrillScore";

interface Props {
  sentence: string;
  /** Label shown on the badge, e.g. "Model 1". */
  label: string;
  onScore?: (score: number) => void;
  /** Chunks of the sentence to bold (the grammar pattern being trained). */
  highlight?: string[];
}


const TemplateSentenceDrill = ({ sentence, label, onScore, highlight }: Props) => {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState<"none" | "normal" | "slow">("none");
  const [recording, setRecording] = useState(false);
  const [results, setResults] = useState<DrillWordResult[] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [heard, setHeard] = useState("");
  /** Live (interim) transcript so students can see the mic is picking them up. */
  const [live, setLive] = useState("");

  const recognitionRef = useRef<any>(null);
  const manualStopRef = useRef(false);
  const transcriptRef = useRef("");

  useEffect(() => {
    setResults(null);
    setAccuracy(null);
    setHeard("");
  }, [sentence]);

  useEffect(() => () => {
    try { recognitionRef.current?.abort(); } catch { /* noop */ }
    stopEnglishTts();
  }, []);

  const speak = async (slow: boolean) => {
    stopEnglishTts();
    setPlaying(slow ? "slow" : "normal");
    try {
      await playEnglishTts(sentence, {
        playbackRate: slow ? 0.7 : 1,
        speechRate: slow ? 0.65 : 0.95,
        accent: "en-GB",
      });
    } catch {
      toast.error(t("Không phát được audio", "Could not play the audio"));
    } finally {
      setPlaying("none");
    }
  };

  const grade = (spoken: string) => {
    const cleaned = spoken.trim();
    if (!cleaned) {
      toast.error(t("Không nghe được gì - hãy thử lại", "Nothing was picked up - please try again"));
      return;
    }
    const res = compareDrillWords(sentence, cleaned);
    const acc = drillAccuracy(res);
    setResults(res);
    setAccuracy(acc);
    setHeard(cleaned);
    onScore?.(acc);
  };

  const stopRecording = () => {
    manualStopRef.current = true;
    try { recognitionRef.current?.stop(); } catch { /* noop */ }
    setRecording(false);
  };

  const startRecording = () => {
    if (recording) {
      stopRecording();
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      toast.error(
        t("Trình duyệt chưa hỗ trợ thu âm", "Recording is not supported in this browser"),
        { description: t("Hãy dùng Chrome hoặc Edge.", "Please use Chrome or Edge.") },
      );
      return;
    }
    stopEnglishTts();
    setResults(null);
    setAccuracy(null);
    setHeard("");
    setLive("");


    try { recognitionRef.current?.abort(); } catch { /* noop */ }
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new Ctor();
    recognition.lang = "en-GB";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    transcriptRef.current = "";
    manualStopRef.current = false;

    recognition.onstart = () => setRecording(true);
    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) text += `${event.results[i][0].transcript} `;
      transcriptRef.current = text.trim();
      setLive(transcriptRef.current);
    };
    recognition.onerror = (event: any) => {
      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        setRecording(false);
        toast.error(t("Hãy cho phép dùng micro", "Please allow microphone access"));
        return;
      }
      // "no-speech" / "aborted" happen often on Chrome; onend handles the retry.
    };
    recognition.onend = () => {
      // Chrome ends the session after a short silence. Keep listening until the
      // student presses Stop, otherwise a correct reading can be lost entirely.
      if (!manualStopRef.current) {
        try {
          recognition.start();
          return;
        } catch { /* fall through to grading */ }
      }
      setRecording(false);
      grade(transcriptRef.current);
      recognitionRef.current = null;
    };


    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setRecording(false);
      toast.error(t("Không bật được micro", "Could not start the microphone"));
    }
  };

  const accColor =
    accuracy === null ? "" : accuracy >= 80 ? "text-emerald-600" : accuracy >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <div className="rounded-lg border bg-background/70 p-3 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="text-[11px]">{label}</Badge>
        {accuracy !== null && (
          <span className={`text-xs font-bold ${accColor}`}>
            {accuracy}% {accuracy >= 80 ? "✓" : ""}
          </span>
        )}
      </div>

      <p className="text-sm md:text-base leading-relaxed text-foreground">
        {renderHighlighted(sentence, highlight)}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant="outline" className="gap-1.5 h-8" onClick={() => speak(false)} disabled={playing !== "none"}>
          <Volume2 className="w-3.5 h-3.5" />
          {t("Nghe", "Listen")}
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5 h-8" onClick={() => speak(true)} disabled={playing !== "none"}>
          <Turtle className="w-3.5 h-3.5" />
          {t("Chậm", "Slow")}
        </Button>
        <Button
          size="sm"
          variant={recording ? "destructive" : "default"}
          className="gap-1.5 h-8"
          onClick={startRecording}
        >
          {recording ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          {recording ? t("Dừng & chấm", "Stop & score") : t("Thu âm", "Record")}
        </Button>
        {accuracy !== null && (
          <Button size="sm" variant="ghost" className="gap-1.5 h-8" onClick={startRecording}>
            <RotateCcw className="w-3.5 h-3.5" />
            {t("Thu lại", "Try again")}
          </Button>
        )}
      </div>

      {recording && (
        <p className="text-xs text-red-600 animate-pulse">
          🎙 {t("Đang nghe... hãy đọc cả câu rồi bấm Dừng.", "Listening... say the whole sentence, then press Stop.")}
        </p>
      )}

      {results && (
        <div className="space-y-1.5 rounded-md border bg-muted/40 p-2.5">
          <p className="text-xs font-semibold text-muted-foreground">
            {t("Bạn vừa đọc", "What you said")}:
          </p>
          <p className="text-sm leading-relaxed">
            {results.map((r, i) => (
              <span
                key={i}
                className={
                  r.status === "correct"
                    ? "text-emerald-600 font-medium"
                    : r.status === "close"
                      ? "text-amber-600"
                      : "text-red-600 line-through"
                }
              >
                {r.expected}{" "}
              </span>
            ))}
          </p>
          {heard && (
            <p className="text-[11px] text-muted-foreground italic">
              {t("Máy nghe được", "Recognised")}: “{heard}”
            </p>
          )}
          {accuracy !== null && accuracy >= 80 && (
            <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("Tốt! Bước này đã thuộc.", "Great - this step is solid.")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateSentenceDrill;
