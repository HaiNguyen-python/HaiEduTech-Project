// Mirrored webcam self-view for speaking practice. The camera starts automatically
// when recording begins (unless the student opted out) and analyses framing,
// steadiness and facial animation locally to estimate confidence + naturalness.
// Preview only - the audio recording and AI grading pipeline are untouched.
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Eye, Smile, Move, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scoreBodyLanguage, scoreLabel, type BodyLanguageScores } from "@/lib/speakingBodyLanguage";

const OPT_OUT_KEY = "speaking-camera-off";

interface Props {
  isRecording?: boolean;
  className?: string;
}

interface Accum {
  last: Uint8ClampedArray | null;
  steadyHits: number;
  total: number;
  movementSum: number;
  movementCount: number;
  brightnessSum: number;
  mouthValues: number[];
}

const emptyAccum = (): Accum => ({
  last: null,
  steadyHits: 0,
  total: 0,
  movementSum: 0,
  movementCount: 0,
  brightnessSum: 0,
  mouthValues: [],
});

const SpeakingCameraPanel = ({ isRecording = false, className }: Props) => {
  const { t, language } = useLanguage();
  const [camOn, setCamOn] = useState(false);
  const [optedOut, setOptedOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState({ eyeContact: 0, expression: 0, movement: 0 });
  const [summary, setSummary] = useState<BodyLanguageScores | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const accumRef = useRef<Accum>(emptyAccum());
  const wasRecordingRef = useRef(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      return true;
    } catch {
      setError(
        t(
          "Không mở được camera. Hãy cho phép truy cập camera (nếu đang xem trong khung preview, hãy mở ở tab mới). Phần ghi âm vẫn hoạt động bình thường.",
          "Camera unavailable. Allow camera access (if you are inside the preview frame, open the page in a new tab). Audio recording still works normally.",
        ),
      );
      return false;
    }
  }, [t]);

  // Restore the explicit opt-out preference once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(OPT_OUT_KEY) === "1") setOptedOut(true);
  }, []);

  // Auto turn the camera on when recording starts; build the summary when it stops.
  useEffect(() => {
    if (isRecording && !wasRecordingRef.current) {
      accumRef.current = emptyAccum();
      setSummary(null);
      setLive({ eyeContact: 0, expression: 0, movement: 0 });
      if (!optedOut && !camOn) setCamOn(true);
    }
    if (!isRecording && wasRecordingRef.current) {
      const a = accumRef.current;
      if (a.total > 3) {
        const mean = a.mouthValues.reduce((s, v) => s + v, 0) / (a.mouthValues.length || 1);
        const variance =
          Math.sqrt(a.mouthValues.reduce((s, v) => s + (v - mean) ** 2, 0) / (a.mouthValues.length || 1)) * 6;
        setSummary(
          scoreBodyLanguage({
            total: a.total,
            steadyHits: a.steadyHits,
            movementAvg: a.movementCount ? a.movementSum / a.movementCount : 0,
            framingBrightness: a.brightnessSum / a.total,
            expressionVariance: variance,
          }),
        );
      }
    }
    wasRecordingRef.current = isRecording;
  }, [isRecording, optedOut, camOn]);

  useEffect(() => {
    let cancelled = false;
    if (camOn) {
      startCamera().then((ok) => {
        if (cancelled || ok) return;
        setCamOn(false);
      });
    } else {
      stopCamera();
    }
    return () => {
      cancelled = true;
    };
  }, [camOn, startCamera, stopCamera]);

  useEffect(
    () => () => {
      stopCamera();
    },
    [stopCamera],
  );

  // Sampling loop: framing, steadiness (eye contact proxy) and mouth animation.
  useEffect(() => {
    if (!camOn || !isRecording) return;
    const id = window.setInterval(() => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 48;
      const c = canvas.getContext("2d", { willReadFrequently: true });
      if (!c) return;
      c.drawImage(video, 0, 0, 64, 48);
      const centre = c.getImageData(20, 10, 24, 20).data;
      const mouth = c.getImageData(24, 26, 16, 10).data;

      const a = accumRef.current;
      a.total += 1;

      let brightness = 0;
      for (let i = 0; i < centre.length; i += 4) brightness += (centre[i] + centre[i + 1] + centre[i + 2]) / 3;
      a.brightnessSum += brightness / (centre.length / 4);

      let mouthAvg = 0;
      for (let i = 0; i < mouth.length; i += 4) mouthAvg += (mouth[i] + mouth[i + 1] + mouth[i + 2]) / 3;
      a.mouthValues.push(mouthAvg / (mouth.length / 4));

      const prev = a.last;
      if (prev && prev.length === centre.length) {
        let diff = 0;
        for (let i = 0; i < centre.length; i += 8) diff += Math.abs(centre[i] - prev[i]);
        const avg = diff / (centre.length / 8);
        a.movementSum += avg;
        a.movementCount += 1;
        if (avg < 16) a.steadyHits += 1;
      }
      a.last = new Uint8ClampedArray(centre);

      const mMean = a.mouthValues.reduce((s, v) => s + v, 0) / a.mouthValues.length;
      const mVar =
        Math.sqrt(a.mouthValues.reduce((s, v) => s + (v - mMean) ** 2, 0) / a.mouthValues.length) * 6;
      const partial = scoreBodyLanguage({
        total: a.total,
        steadyHits: a.steadyHits,
        movementAvg: a.movementCount ? a.movementSum / a.movementCount : 0,
        framingBrightness: a.brightnessSum / a.total,
        expressionVariance: mVar,
      });
      setLive({ eyeContact: partial.eyeContact, expression: partial.expression, movement: partial.movement });
    }, 500);
    return () => window.clearInterval(id);
  }, [camOn, isRecording]);

  const toggle = () => {
    setCamOn((on) => {
      const next = !on;
      setOptedOut(!next);
      try {
        localStorage.setItem(OPT_OUT_KEY, next ? "0" : "1");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const loc = (pair: { vi: string; en: string }) => (language === "vi" ? pair.vi : pair.en);

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button variant={camOn ? "secondary" : "outline"} size="sm" onClick={toggle} className="gap-2">
          {camOn ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          {camOn ? t("Tắt camera", "Turn camera off") : t("Bật camera", "Turn camera on")}
        </Button>
        {!camOn && (
          <span className="text-[11px] text-muted-foreground">
            {t("Camera tự bật khi ghi âm", "Camera starts automatically when recording")}
          </span>
        )}
      </div>

      {camOn && (
        <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-900 aspect-video">
          <video ref={videoRef} muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-white/25" />
          </div>
          {isRecording && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-destructive/90 px-2 py-1 text-[11px] font-semibold text-destructive-foreground">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" /> REC
            </div>
          )}
          {isRecording && (
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-around gap-2 bg-black/55 px-2 py-1.5 text-[11px] text-white">
              <span className="inline-flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {live.eyeContact}%
              </span>
              <span className="inline-flex items-center gap-1">
                <Smile className="w-3.5 h-3.5" /> {live.expression}%
              </span>
              <span className="inline-flex items-center gap-1">
                <Move className="w-3.5 h-3.5" /> {live.movement}%
              </span>
            </div>
          )}
        </div>
      )}

      {summary && !isRecording && (
        <div className="mt-3 rounded-xl border bg-muted/40 p-3 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">
              {t("Ngôn ngữ cơ thể & sự tự tin", "Body language & confidence")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="rounded-lg bg-background p-2">
              <div className="text-[11px] text-muted-foreground">{t("Tự tin", "Confidence")}</div>
              <div className="text-xl font-bold text-primary">{summary.confidence}</div>
              <div className="text-[11px] text-muted-foreground">{loc(scoreLabel(summary.confidence))}</div>
            </div>
            <div className="rounded-lg bg-background p-2">
              <div className="text-[11px] text-muted-foreground">{t("Tự nhiên", "Naturalness")}</div>
              <div className="text-xl font-bold text-emerald-600">{summary.naturalness}</div>
              <div className="text-[11px] text-muted-foreground">{loc(scoreLabel(summary.naturalness))}</div>
            </div>
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {summary.tips.map((tip, i) => (
              <li key={i}>• {loc(tip)}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-destructive text-center">{error}</p>}
    </div>
  );
};

export default SpeakingCameraPanel;
