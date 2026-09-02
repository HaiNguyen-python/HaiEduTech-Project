/**
 * @file ToneRecorder.tsx
 * @description Thu âm tại chỗ, vẽ đường cao độ thật của học sinh và so với đường thanh mẫu.
 * Không upload, không lưu trữ: mọi phân tích chạy trong trình duyệt.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export type ToneShape = 1 | 2 | 3 | 4 | 0;

interface Props {
  /** Chữ Hán mục tiêu (để đối chiếu với nhận dạng giọng nói) */
  hanzi: string;
  /** Thanh điệu mục tiêu của âm tiết đầu */
  tone: ToneShape;
  className?: string;
}

const TARGET_PATH: Record<ToneShape, string> = {
  1: "M 6 22 L 174 22",
  2: "M 6 78 L 174 16",
  3: "M 6 34 Q 90 100 174 24",
  4: "M 6 12 L 174 86",
  0: "M 6 50 L 174 56",
};

/** Ước lượng cao độ bằng autocorrelation - đủ chính xác cho luyện thanh. */
function detectPitch(buf: Float32Array, sampleRate: number): number | null {
  const size = buf.length;
  let rms = 0;
  for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / size);
  if (rms < 0.01) return null; // quá nhỏ, coi như im lặng

  let bestOffset = -1;
  let bestCorr = 0;
  const minOffset = Math.floor(sampleRate / 400); // 400 Hz
  const maxOffset = Math.floor(sampleRate / 70);  // 70 Hz

  for (let offset = minOffset; offset < maxOffset; offset++) {
    let corr = 0;
    for (let i = 0; i < size - offset; i++) corr += buf[i] * buf[i + offset];
    corr /= size - offset;
    if (corr > bestCorr) {
      bestCorr = corr;
      bestOffset = offset;
    }
  }
  if (bestOffset < 0 || bestCorr < 0.008) return null;
  return sampleRate / bestOffset;
}

/** Phân loại đường cao độ thu được thành thanh 1-4. */
function classify(track: number[]): { tone: ToneShape; confidence: number } | null {
  if (track.length < 6) return null;
  const semis = track.map((f) => 12 * Math.log2(f / track[0]));
  const n = semis.length;
  const third = Math.max(2, Math.floor(n / 3));
  const head = semis.slice(0, third).reduce((a, b) => a + b, 0) / third;
  const tail = semis.slice(n - third).reduce((a, b) => a + b, 0) / third;
  const min = Math.min(...semis);
  const max = Math.max(...semis);
  const dipIndex = semis.indexOf(min);
  const delta = tail - head;
  const range = max - min;

  // Thanh 3: xuống rồi lên, điểm thấp nhất ở giữa
  if (dipIndex > n * 0.2 && dipIndex < n * 0.8 && min < head - 1.2 && tail > min + 1.2) {
    return { tone: 3, confidence: Math.min(1, range / 6) };
  }
  if (delta > 1.8) return { tone: 2, confidence: Math.min(1, delta / 5) };
  if (delta < -1.8) return { tone: 4, confidence: Math.min(1, -delta / 5) };
  return { tone: 1, confidence: Math.max(0.3, 1 - range / 5) };
}

const ToneRecorder = ({ hanzi, tone, className }: Props) => {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [track, setTrack] = useState<number[]>([]);
  const [result, setResult] = useState<{ tone: ToneShape; confidence: number } | null>(null);
  const [heard, setHeard] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const recogRef = useRef<any>(null);
  const trackRef = useRef<number[]>([]);
  const stopTimerRef = useRef<number | null>(null);

  const teardown = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    stopTimerRef.current = null;
    try { recogRef.current?.stop(); } catch { /* ignore */ }
    recogRef.current = null;
    try { ctxRef.current?.close(); } catch { /* ignore */ }
    ctxRef.current = null;
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    setRecording(false);
  }, []);

  useEffect(() => () => teardown(), [teardown]);

  // Đổi câu hỏi thì xoá kết quả cũ
  useEffect(() => {
    setTrack([]);
    setResult(null);
    setHeard(null);
  }, [hanzi]);

  const stop = useCallback(() => {
    const collected = trackRef.current;
    teardown();
    setTrack(collected);
    setResult(classify(collected));
  }, [teardown]);

  const start = async () => {
    setError(null);
    setResult(null);
    setHeard(null);
    trackRef.current = [];
    setTrack([]);

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setError(t("Trình duyệt không cho phép dùng micro ở đây. Hãy mở trang trong tab mới.", "The browser cannot access the mic here. Open the page in a new tab."));
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx: AudioContext = new AudioCtx();
      ctxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);
      const buf = new Float32Array(analyser.fftSize);
      setRecording(true);

      const loop = () => {
        analyser.getFloatTimeDomainData(buf);
        const f = detectPitch(buf, ctx.sampleRate);
        if (f) {
          trackRef.current = [...trackRef.current, f].slice(-120);
          setTrack(trackRef.current);
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      // Nhận dạng nội dung để đối chiếu chữ
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SR) {
        try {
          const recog = new SR();
          recog.lang = "zh-CN";
          recog.interimResults = false;
          recog.maxAlternatives = 1;
          recog.onresult = (e: any) => {
            const text = e.results?.[0]?.[0]?.transcript ?? "";
            if (text) setHeard(text);
          };
          recog.onerror = () => { /* bỏ qua, phần cao độ vẫn hoạt động */ };
          recogRef.current = recog;
          recog.start();
        } catch { /* ignore */ }
      }

      stopTimerRef.current = window.setTimeout(() => stop(), 4000);
    } catch (e: any) {
      teardown();
      setError(
        e?.name === "NotAllowedError"
          ? t("Bạn cần cho phép quyền micro để luyện nói.", "Please allow microphone access to practise speaking.")
          : t("Không mở được micro. Kiểm tra thiết bị rồi thử lại.", "Could not open the microphone. Check your device and try again."),
      );
    }
  };

  // Vẽ đường cao độ thật thành polyline
  const userPath = (() => {
    if (track.length < 4) return null;
    const semis = track.map((f) => 12 * Math.log2(f / track[0]));
    const min = Math.min(...semis);
    const max = Math.max(...semis);
    const span = Math.max(4, max - min);
    return semis
      .map((s, i) => {
        const x = 6 + (i / (semis.length - 1)) * 168;
        const y = 88 - ((s - min) / span) * 76;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  })();

  const match = result !== null && result.tone === tone;
  const heardOk = heard ? heard.includes(hanzi.charAt(0)) : null;

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            🎤 {t("Nói thử và so đường thanh", "Say it and compare your pitch")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("Âm thanh chỉ xử lý trong máy bạn, không tải lên đâu cả.", "Audio is processed on your device only - nothing is uploaded.")}
          </p>
        </div>
        {recording ? (
          <Button size="sm" variant="destructive" onClick={stop}>
            <Square className="w-4 h-4 mr-1" /> {t("Dừng", "Stop")}
          </Button>
        ) : (
          <Button size="sm" onClick={start}>
            <Mic className="w-4 h-4 mr-1" /> {t("Thu âm", "Record")}
          </Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-rose-600 flex items-start gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <svg width="180" height="100" viewBox="0 0 180 100" className="rounded-xl bg-secondary/40 border border-border">
          <path d={TARGET_PATH[tone]} stroke="currentColor" className="text-muted-foreground" strokeWidth="3" strokeDasharray="5 5" fill="none" strokeLinecap="round" />
          {userPath && (
            <path
              d={userPath}
              stroke="currentColor"
              className={match ? "text-emerald-500" : "text-primary"}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>

        <div className="text-sm space-y-1.5 min-w-[180px]">
          <p className="text-muted-foreground">
            {t("Đường nét đứt là thanh mẫu, đường liền là bạn.", "The dashed line is the target, the solid line is you.")}
          </p>
          {recording && <p className="text-primary font-semibold animate-pulse">{t("Đang nghe...", "Listening...")}</p>}
          {result && (
            <p className={cn("font-semibold", match ? "text-emerald-600" : "text-amber-600")}>
              {match
                ? t("Đúng thanh rồi!", "Right tone!")
                : t(`Nghe giống thanh ${result.tone}, mục tiêu là thanh ${tone}.`, `That sounded like tone ${result.tone}; the target is tone ${tone}.`)}
            </p>
          )}
          {heard && (
            <p className={cn(heardOk ? "text-emerald-600" : "text-muted-foreground")}>
              {t("Máy nghe được", "Recognised")}: <span className="font-semibold">{heard}</span>
            </p>
          )}
          {result && !match && (
            <p className="text-xs text-muted-foreground">
              {tone === 3
                ? t("Thanh 3 phải xuống thật thấp rồi mới hất lên.", "Tone 3 must dip low before it rises.")
                : tone === 2
                  ? t("Thanh 2 đi lên liên tục, đừng dừng giữa đường.", "Tone 2 rises all the way - do not stop halfway.")
                  : tone === 4
                    ? t("Thanh 4 đổ xuống nhanh và dứt khoát.", "Tone 4 falls fast and firmly.")
                    : t("Thanh 1 giữ cao độ đều, không lên xuống.", "Tone 1 stays level - no rise or fall.")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToneRecorder;
