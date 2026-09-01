// Optional mirrored webcam self-view for speaking practice (preview only - audio
// recording and grading are untouched). Ported eye-contact heuristic from
// PresentationStudio.
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "speaking-camera-on";

interface Props {
  isRecording?: boolean;
  className?: string;
}

const SpeakingCameraPanel = ({ isRecording = false, className }: Props) => {
  const { t } = useLanguage();
  const [camOn, setCamOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eyeContact, setEyeContact] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const eyeSampleRef = useRef<{ last: Uint8ClampedArray | null; hits: number; total: number }>({ last: null, hits: 0, total: 0 });

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    eyeSampleRef.current = { last: null, hits: 0, total: 0 };
    setEyeContact(0);
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
      setError(t("Không mở được camera. Hãy cho phép truy cập camera (nếu đang xem trong khung preview, hãy mở ở tab mới).", "Camera unavailable. Allow camera access (if you are inside the preview frame, open the page in a new tab)."));
      return false;
    }
  }, [t]);

  // Restore saved preference once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") setCamOn(true);
  }, []);

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
    return () => { cancelled = true; };
  }, [camOn, startCamera, stopCamera]);

  useEffect(() => () => { stopCamera(); }, [stopCamera]);

  // Eye-contact sampling: steady centre framing = looking at the lens.
  useEffect(() => {
    if (!camOn || !isRecording) return;
    const id = window.setInterval(() => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;
      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 48;
      const c = canvas.getContext("2d", { willReadFrequently: true });
      if (!c) return;
      c.drawImage(video, 0, 0, 64, 48);
      const centre = c.getImageData(20, 12, 24, 20).data;
      const prev = eyeSampleRef.current.last;
      eyeSampleRef.current.total += 1;
      if (prev && prev.length === centre.length) {
        let diff = 0;
        for (let i = 0; i < centre.length; i += 8) diff += Math.abs(centre[i] - prev[i]);
        const avg = diff / (centre.length / 8);
        if (avg < 16) eyeSampleRef.current.hits += 1;
      }
      eyeSampleRef.current.last = new Uint8ClampedArray(centre);
      const { hits, total } = eyeSampleRef.current;
      setEyeContact(total > 1 ? Math.round((hits / (total - 1)) * 100) : 0);
    }, 700);
    return () => window.clearInterval(id);
  }, [camOn, isRecording]);

  const toggle = () => {
    setCamOn((on) => {
      const next = !on;
      try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button variant={camOn ? "secondary" : "outline"} size="sm" onClick={toggle} className="gap-2">
          {camOn ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          {camOn ? t("Tắt camera", "Turn camera off") : t("Bật camera", "Turn camera on")}
        </Button>
        {camOn && isRecording && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3.5 h-3.5" /> {t("Giao tiếp mắt", "Eye contact")}: <strong className="text-foreground">{eyeContact}%</strong>
          </span>
        )}
      </div>

      {camOn && (
        <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-900 aspect-video">
          <video ref={videoRef} muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
          {/* Centre crosshair guide */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-white/25" />
          </div>
          {isRecording && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-destructive/90 px-2 py-1 text-[11px] font-semibold text-destructive-foreground">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" /> REC
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-2 text-xs text-destructive text-center">{error}</p>}
    </div>
  );
};

export default SpeakingCameraPanel;
