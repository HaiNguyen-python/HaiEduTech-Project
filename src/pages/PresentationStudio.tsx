/**
 * Presentation & Public Speaking Studio
 * 3-column practice workspace: scenario setup, live webcam + teleprompter stage,
 * real-time AI telemetry, and a post-session coaching report.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Square, Pause, Play, Sparkles, Timer, Gauge, Eye, MessageSquareWarning,
  Presentation, Target, ScrollText, RefreshCcw, Loader2, ChevronRight, Camera, CameraOff,
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  PRESENTATION_SCENARIOS, analyzeSession, countFillers, countWords, findSignposts,
  isStressWord, paceLabel, tokenizeTranscript, type StudioMode, type StudioReport,
} from "@/lib/presentationStudio";

interface AiCoach {
  strengths: string[];
  fixes: string[];
  qaQuestions: string[];
  modelUpgrade: string;
  summary: string;
}

const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const PresentationStudio = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // ---- setup state -------------------------------------------------------
  const [scenarioId, setScenarioId] = useState(PRESENTATION_SCENARIOS[0].id);
  const [mode, setMode] = useState<StudioMode>("scripted");
  const [targetWpm, setTargetWpm] = useState(140);
  const [targetMinutes, setTargetMinutes] = useState(2);
  const [scrollSpeed, setScrollSpeed] = useState(22); // px per second (gentle default)

  // ---- custom (external) script -----------------------------------------
  const [customDraft, setCustomDraft] = useState("");
  const [customAudience, setCustomAudience] = useState("");
  const [customActive, setCustomActive] = useState(false);
  const [customScript, setCustomScript] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { script?: string; audience?: string; active?: boolean };
      if (saved.script) {
        setCustomDraft(saved.script);
        if (saved.active) { setCustomScript(saved.script); setCustomActive(true); }
      }
      if (saved.audience) setCustomAudience(saved.audience);
    } catch { /* ignore */ }
  }, []);

  const persistCustom = useCallback((script: string, audience: string, active: boolean) => {
    try {
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify({ script, audience, active }));
    } catch { /* ignore */ }
  }, []);

  const scenario = useMemo(
    () => (customActive && customScript.trim()
      ? buildCustomScenario(customScript, customAudience)
      : PRESENTATION_SCENARIOS.find((s) => s.id === scenarioId) ?? PRESENTATION_SCENARIOS[0]),
    [customActive, customScript, customAudience, scenarioId],
  );

  // ---- live session state ------------------------------------------------
  const [camOn, setCamOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [eyeContact, setEyeContact] = useState(0);
  const [wpmSeries, setWpmSeries] = useState<{ t: number; wpm: number }[]>([]);
  const [report, setReport] = useState<StudioReport | null>(null);
  const [ai, setAi] = useState<AiCoach | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  // ---- refs --------------------------------------------------------------
  const videoRef = useRef<HTMLVideoElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef("");
  const manualStopRef = useRef(false);
  const eyeSampleRef = useRef({ hits: 0, total: 0, last: null as Uint8ClampedArray | null });
  const promptRef = useRef<HTMLDivElement>(null);
  const promptOffsetRef = useRef(0);
  const scrollRafRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(scrollSpeed);
  const runningRef = useRef(false);

  useEffect(() => { scrollSpeedRef.current = scrollSpeed; }, [scrollSpeed]);

  const liveWords = countWords(`${transcript} ${interim}`);
  const liveWpm = elapsed > 2 ? Math.round(liveWords / (elapsed / 60)) : 0;
  const fillers = useMemo(() => countFillers(`${transcript} ${interim}`), [transcript, interim]);
  const liveSignposts = useMemo(() => findSignposts(transcript), [transcript]);
  const pace = paceLabel(liveWpm);

  // ---- camera ------------------------------------------------------------
  const stopMedia = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    setCamOn(false);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      // Waveform visualiser
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const draw = () => {
        rafRef.current = requestAnimationFrame(draw);
        const canvas = waveRef.current;
        if (!canvas) return;
        const c = canvas.getContext("2d");
        if (!c) return;
        analyser.getByteTimeDomainData(buf);
        const w = canvas.width, h = canvas.height;
        c.clearRect(0, 0, w, h);
        c.lineWidth = 2;
        c.strokeStyle = "hsl(var(--primary))";
        c.beginPath();
        for (let i = 0; i < buf.length; i++) {
          const x = (i / buf.length) * w;
          const y = (buf[i] / 128) * (h / 2);
          i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
        }
        c.stroke();
      };
      draw();
      setCamOn(true);
    } catch {
      toast({
        title: t("Không mở được camera", "Camera unavailable"),
        description: t("Hãy cho phép truy cập camera và micro để luyện nói.", "Allow camera and microphone access to practise."),
        variant: "destructive",
      });
    }
  }, [t, toast]);

  useEffect(() => () => { stopMedia(); }, [stopMedia]);

  // ---- eye-contact sampling (centre-frame steadiness heuristic) ----------
  useEffect(() => {
    if (!recording || paused || !camOn) return;
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
        if (avg < 16) eyeSampleRef.current.hits += 1; // steady framing = looking at lens
      }
      eyeSampleRef.current.last = new Uint8ClampedArray(centre);
      const { hits, total } = eyeSampleRef.current;
      setEyeContact(total > 1 ? Math.round((hits / (total - 1)) * 100) : 0);
    }, 700);
    return () => window.clearInterval(id);
  }, [recording, paused, camOn]);

  // ---- teleprompter auto-scroll -----------------------------------------
  useEffect(() => {
    if (!(recording && !paused && mode === "scripted")) {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
      return;
    }
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      promptOffsetRef.current += scrollSpeedRef.current * dt;
      const el = promptRef.current;
      if (el) {
        const max = Math.max(0, el.scrollHeight - el.clientHeight);
        el.scrollTop = Math.min(max, promptOffsetRef.current);
      }
      scrollRafRef.current = requestAnimationFrame(step);
    };
    scrollRafRef.current = requestAnimationFrame(step);
    return () => { if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current); };
  }, [recording, paused, mode]);

  // ---- speech recognition ------------------------------------------------
  const startRecognition = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast({
        title: t("Trình duyệt chưa hỗ trợ", "Browser not supported"),
        description: t("Hãy dùng Chrome hoặc Edge để có bản ghi lời nói trực tiếp.", "Use Chrome or Edge for live transcription."),
      });
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let finalText = "";
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += `${chunk} `;
        else interimText += chunk;
      }
      if (finalText) {
        baseTextRef.current = `${baseTextRef.current}${finalText}`;
        setTranscript(baseTextRef.current.trim());
      }
      setInterim(interimText);
    };
    rec.onerror = (e: any) => {
      if (e.error === "no-speech" || e.error === "aborted") return;
    };
    rec.onend = () => {
      if (!manualStopRef.current && runningRef.current) {
        try { rec.start(); } catch { /* already restarting */ }
      }
    };
    recognitionRef.current = rec;
    manualStopRef.current = false;
    try { rec.start(); } catch { /* ignore */ }
  }, [t, toast]);

  const stopRecognition = useCallback(() => {
    manualStopRef.current = true;
    try { recognitionRef.current?.stop(); } catch { /* ignore */ }
    recognitionRef.current = null;
  }, []);

  // ---- timer + WPM series -----------------------------------------------
  useEffect(() => {
    if (!recording || paused) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = window.setInterval(() => {
      setElapsed((s) => {
        const next = s + 1;
        if (next % 5 === 0) {
          const words = countWords(baseTextRef.current);
          setWpmSeries((prev) => [...prev, { t: next, wpm: Math.round(words / (next / 60)) }]);
        }
        return next;
      });
    }, 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [recording, paused]);

  const handleStart = async () => {
    if (!camOn) await startCamera();
    baseTextRef.current = "";
    setTranscript(""); setInterim(""); setElapsed(0); setWpmSeries([]); setReport(null); setAi(null);
    eyeSampleRef.current = { hits: 0, total: 0, last: null };
    setEyeContact(0);
    promptOffsetRef.current = 0;
    if (promptRef.current) promptRef.current.scrollTop = 0;
    runningRef.current = true;
    setRecording(true); setPaused(false);
    startRecognition();
  };

  const handlePause = () => {
    setPaused((p) => {
      const next = !p;
      if (next) { runningRef.current = false; stopRecognition(); }
      else { runningRef.current = true; startRecognition(); }
      return next;
    });
  };

  const handleFinish = async () => {
    runningRef.current = false;
    stopRecognition();
    setRecording(false); setPaused(false);
    const fullText = `${baseTextRef.current} ${interim}`.trim();
    setInterim("");
    setTranscript(fullText);
    if (countWords(fullText) < 5) {
      toast({
        title: t("Chưa đủ dữ liệu", "Not enough speech"),
        description: t("Hãy nói ít nhất một vài câu rồi bấm Finish & Analyze.", "Speak a few sentences before analysing."),
        variant: "destructive",
      });
      return;
    }
    const local = analyzeSession({
      transcript: fullText,
      durationSec: elapsed,
      eyeContact,
      targetWpm,
      targetDurationSec: targetMinutes * 60,
      scenario,
      mode,
    });
    setReport(local);
    setReportOpen(true);
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-presentation", {
        body: {
          transcript: fullText,
          scenario: scenario.label,
          audience: scenario.audience,
          mode,
          wpm: local.wpm,
          durationSec: local.durationSec,
          fillerTotal: local.fillers.total,
          eyeContact,
          signposts: local.signposts,
        },
      });
      if (error || !data || (data as any).error) throw new Error("ai");
      setAi(data as AiCoach);
    } catch {
      setAi(null);
    } finally {
      setAiLoading(false);
    }
  };

  const strengths = ai?.strengths?.length ? ai.strengths : report?.strengths ?? [];
  const fixes = ai?.fixes?.length ? ai.fixes : report?.fixes ?? [];
  const qaQuestions = ai?.qaQuestions?.length ? ai.qaQuestions : report?.qaQuestions ?? [];

  // ---- Q&A follow-up recorder -------------------------------------------
  const [qaActive, setQaActive] = useState<number | null>(null);
  const [qaSeconds, setQaSeconds] = useState(30);
  const [qaAnswer, setQaAnswer] = useState("");
  const qaRecRef = useRef<any>(null);

  const stopQa = useCallback(() => {
    try { qaRecRef.current?.stop(); } catch { /* ignore */ }
    qaRecRef.current = null;
    setQaActive(null);
  }, []);

  const startQa = (index: number) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    setQaAnswer(""); setQaSeconds(30); setQaActive(index);
    const rec = new SR();
    rec.lang = "en-US"; rec.continuous = true; rec.interimResults = true;
    let text = "";
    rec.onresult = (e: any) => {
      let interimQa = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) text += `${e.results[i][0].transcript} `;
        else interimQa += e.results[i][0].transcript;
      }
      setQaAnswer(`${text}${interimQa}`.trim());
    };
    qaRecRef.current = rec;
    try { rec.start(); } catch { /* ignore */ }
  };

  useEffect(() => {
    if (qaActive === null) return;
    const id = window.setInterval(() => {
      setQaSeconds((s) => {
        if (s <= 1) { stopQa(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [qaActive, stopQa]);

  useEffect(() => () => stopQa(), [stopQa]);

  const promptWords = useMemo(() => scenario.script.split(/(\s+)/), [scenario]);
  const tokens = useMemo(() => (report ? tokenizeTranscript(transcript) : []), [report, transcript]);

  // ---- render ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 py-6 max-w-[1500px]">
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Presentation className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Presentation &amp; Public Speaking Studio
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  "Luyện thuyết trình với teleprompter, đo nhịp nói, từ đệm, giao tiếp bằng mắt và báo cáo AI chi tiết.",
                  "Practise with a teleprompter, live pacing, filler and eye-contact telemetry, plus a detailed AI report.",
                )}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* ---------------- Column 1: setup ---------------- */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                {t("Kịch bản thuyết trình", "Presentation scenarios")}
              </h2>
              <Select value={scenarioId} onValueChange={setScenarioId} disabled={recording}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRESENTATION_SCENARIOS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{t(s.labelVi, s.label)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{scenario.prompt}</p>
              <Badge variant="secondary" className="mt-3">{scenario.audience}</Badge>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold mb-3">{t("Chế độ luyện", "Target mode")}</h2>
              <div className="grid grid-cols-1 gap-2">
                {([
                  { id: "scripted" as const, title: t("Có kịch bản", "Scripted Mode"), desc: t("Kèm teleprompter cuộn tự động", "Auto-scrolling teleprompter") },
                  { id: "impromptu" as const, title: t("Ứng khẩu / Q&A", "Impromptu / Q&A Defence"), desc: t("Không kịch bản, phản xạ tức thì", "No script, unscripted reaction") },
                ]).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => !recording && setMode(m.id)}
                    className={`text-left rounded-xl px-3 py-2.5 border transition-all ${
                      mode === m.id
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <div className="text-sm font-medium text-foreground">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border/60 space-y-5">
              <h2 className="text-sm font-semibold">{t("Mục tiêu", "Goal metrics")}</h2>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">{t("Nhịp nói mục tiêu", "Target pace")}</span>
                  <span className="font-semibold text-primary">{targetWpm} WPM</span>
                </div>
                <Slider value={[targetWpm]} min={100} max={180} step={5} onValueChange={(v) => setTargetWpm(v[0])} />
                <p className="text-[11px] text-muted-foreground mt-1">{t("Khuyến nghị 130-150 WPM", "Recommended 130-150 WPM")}</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">{t("Thời lượng mục tiêu", "Target duration")}</span>
                  <span className="font-semibold text-primary">{targetMinutes} min</span>
                </div>
                <Slider value={[targetMinutes]} min={1} max={5} step={1} onValueChange={(v) => setTargetMinutes(v[0])} />
              </div>
              {mode === "scripted" && (
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">{t("Tốc độ teleprompter", "Teleprompter speed")}</span>
                    <span className="font-semibold text-primary">{scrollSpeed} px/s</span>
                  </div>
                  <Slider value={[scrollSpeed]} min={10} max={90} step={2} onValueChange={(v) => setScrollSpeed(v[0])} />
                </div>
              )}
            </div>
          </aside>

          {/* ---------------- Column 2: stage ---------------- */}
          <section className="lg:col-span-2 space-y-4">
            <div className="glass-card rounded-2xl p-3 border border-border/60">
              <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video">
                <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
                {!camOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-300">
                    <CameraOff className="w-10 h-10 opacity-70" />
                    <p className="text-sm">{t("Bật camera để bắt đầu", "Turn on the camera to begin")}</p>
                    <Button size="sm" variant="secondary" onClick={startCamera} className="gap-2">
                      <Camera className="w-4 h-4" /> {t("Bật camera", "Enable camera")}
                    </Button>
                  </div>
                )}
                {/* Eye contact crosshair */}
                {camOn && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className={`w-28 h-28 rounded-full border-2 ${eyeContact >= 60 ? "border-primary" : "border-accent"} opacity-70`} />
                    <div className={`absolute w-1.5 h-1.5 rounded-full ${eyeContact >= 60 ? "bg-primary" : "bg-accent"}`} />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {recording && !paused && (
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-red-100 bg-red-600/80 px-2 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> REC
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-white/90 bg-black/40 px-2 py-1 rounded-full">
                        {fmtTime(elapsed)} · {liveWpm} WPM
                      </span>
                    </div>
                  </div>
                )}
                <canvas ref={waveRef} width={640} height={64} className="absolute bottom-0 left-0 w-full h-12 bg-black/35" />
              </div>

              {/* Control bar */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {!recording ? (
                  <Button onClick={handleStart} size="lg" className="rounded-full gap-2 flex-1 min-w-[160px]">
                    <Mic className="w-4 h-4" /> {t("Bắt đầu ghi", "Start Recording")}
                  </Button>
                ) : (
                  <>
                    <Button onClick={handlePause} size="lg" variant="secondary" className="rounded-full gap-2">
                      {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      {paused ? t("Tiếp tục", "Resume") : t("Tạm dừng", "Pause")}
                    </Button>
                    <Button onClick={handleFinish} size="lg" className="rounded-full gap-2 flex-1 min-w-[180px] bg-accent text-accent-foreground hover:bg-accent/90">
                      <Square className="w-4 h-4" /> {t("Kết thúc & Phân tích", "Finish & Analyze")}
                    </Button>
                  </>
                )}
                {camOn && !recording && (
                  <Button variant="ghost" size="sm" onClick={stopMedia} className="gap-2">
                    <CameraOff className="w-4 h-4" /> {t("Tắt camera", "Stop camera")}
                  </Button>
                )}
                {report && (
                  <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => setReportOpen(true)}>
                    <Sparkles className="w-4 h-4" /> {t("Xem báo cáo", "View report")}
                  </Button>
                )}
              </div>
            </div>

            {/* Teleprompter / prompt card */}
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-primary" />
                  {mode === "scripted" ? t("Teleprompter", "Teleprompter") : t("Đề bài ứng khẩu", "Impromptu prompt")}
                </h2>
                {mode === "scripted" && (
                  <Button
                    variant="ghost" size="sm" className="gap-1 text-xs"
                    onClick={() => { promptOffsetRef.current = 0; if (promptRef.current) promptRef.current.scrollTop = 0; }}
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> {t("Về đầu", "Rewind")}
                  </Button>
                )}
              </div>
              {mode === "scripted" ? (
                <div
                  ref={promptRef}
                  className="h-56 overflow-y-auto rounded-xl bg-slate-900/95 p-5 text-slate-100 leading-relaxed text-lg sm:text-xl"
                >
                  <p className="whitespace-pre-wrap">
                    {promptWords.map((w, i) =>
                      /^\s+$/.test(w) ? w : (
                        <span key={i} className={isStressWord(w) ? "text-accent font-semibold" : "text-slate-200"}>{w}</span>
                      ),
                    )}
                  </p>
                  <div className="h-24" />
                </div>
              ) : (
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-5">
                  <p className="text-base text-foreground whitespace-pre-wrap">{scenario.prompt}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {t("Trả lời theo 3 bước: quan điểm - lý do - ví dụ.", "Answer in three moves: position, reason, example.")}
                  </p>
                </div>
              )}
            </div>

            {/* Live transcript */}
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold mb-2">{t("Bản ghi trực tiếp", "Live transcript")}</h2>
              <div className="min-h-[70px] text-sm text-foreground whitespace-pre-wrap">
                {transcript || <span className="text-muted-foreground">{t("Nội dung bạn nói sẽ hiện tại đây.", "Your words will appear here as you speak.")}</span>}
                {interim && <span className="text-muted-foreground italic"> {interim}</span>}
              </div>
            </div>
          </section>

          {/* ---------------- Column 3: telemetry ---------------- */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Gauge className="w-4 h-4 text-primary" /> {t("Nhịp nói", "Pacing meter")}
              </h2>
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-bold ${pace.tone === "good" ? "text-primary" : pace.tone === "fast" ? "text-accent" : "text-destructive"}`}>
                  {liveWpm}
                </span>
                <span className="text-xs text-muted-foreground mb-1">WPM</span>
              </div>
              <div className="relative h-2.5 rounded-full mt-3 overflow-hidden bg-muted">
                <div className="absolute inset-y-0 left-0 w-[35%] bg-destructive/50" />
                <div className="absolute inset-y-0 left-[35%] w-[35%] bg-primary/60" />
                <div className="absolute inset-y-0 left-[70%] right-0 bg-accent/60" />
                <div
                  className="absolute top-[-3px] w-1 h-4 bg-foreground rounded"
                  style={{ left: `${Math.min(98, Math.max(1, (liveWpm / 200) * 100))}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{pace.text} · {t("mục tiêu", "target")} {targetWpm} WPM</p>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <MessageSquareWarning className="w-4 h-4 text-destructive" /> {t("Từ đệm", "Filler words")}
              </h2>
              <div className="text-3xl font-bold text-destructive">{fillers.total}</div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {fillers.hits.length === 0 ? (
                  <span className="text-xs text-muted-foreground">{t("Chưa có từ đệm nào - tuyệt vời!", "No fillers yet - excellent.")}</span>
                ) : fillers.hits.map((h) => (
                  <Badge key={h.label} variant="destructive" className="text-[11px]">{h.label} ×{h.count}</Badge>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-primary" /> {t("Giao tiếp bằng mắt", "Eye-contact score")}
              </h2>
              <div className="text-3xl font-bold text-primary">{eyeContact}%</div>
              <Progress value={eyeContact} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {t("Giữ khuôn mặt trong vòng tròn và nhìn thẳng ống kính.", "Keep your face inside the ring and look at the lens.")}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-primary" /> {t("Phiên luyện", "Session")}
              </h2>
              <div className="text-3xl font-bold text-foreground">{fmtTime(elapsed)}</div>
              <Progress value={Math.min(100, (elapsed / (targetMinutes * 60)) * 100)} className="mt-3 h-2" />
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="rounded-lg bg-muted/60 p-2">
                  <div className="text-muted-foreground">{t("Số từ", "Words")}</div>
                  <div className="font-semibold text-foreground">{liveWords}</div>
                </div>
                <div className="rounded-lg bg-muted/60 p-2">
                  <div className="text-muted-foreground">{t("Từ dẫn dắt", "Signposts")}</div>
                  <div className="font-semibold text-foreground">{liveSignposts.length}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ---------------- Report modal ---------------- */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              {t("Báo cáo sau buổi luyện", "Post-session report")}
            </DialogTitle>
          </DialogHeader>

          {report && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 p-4 flex flex-col items-center justify-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{t("Điểm tổng", "Overall speech score")}</div>
                  <div className="text-6xl font-bold text-primary my-2">{report.overall}</div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
                    <Badge variant="secondary">{report.wpm} WPM</Badge>
                    <Badge variant="secondary">{fmtTime(report.durationSec)}</Badge>
                    <Badge variant="secondary">{report.words} {t("từ", "words")}</Badge>
                    <Badge variant="secondary">{report.eyeContact}% {t("mắt", "eye")}</Badge>
                  </div>
                  {ai?.summary && <p className="text-sm text-muted-foreground mt-4 text-center">{ai.summary}</p>}
                </div>
                <div className="rounded-2xl border border-border/60 p-2">
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={report.axes} outerRadius="72%">
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {wpmSeries.length > 1 && (
                <div className="rounded-2xl border border-border/60 p-4">
                  <h3 className="text-sm font-semibold mb-2">{t("Nhịp nói theo thời gian", "Pace over time")}</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={wpmSeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="t" tickFormatter={(v) => `${v}s`} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis domain={[0, 200]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <ReferenceArea y1={120} y2={150} fill="hsl(var(--primary))" fillOpacity={0.12} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Line type="monotone" dataKey="wpm" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="rounded-2xl border border-border/60 p-4">
                <h3 className="text-sm font-semibold mb-2">{t("Bản ghi có tô màu", "Colour-coded transcript")}</h3>
                <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground mb-3">
                  <span className="text-destructive font-semibold">{t("Đỏ: từ đệm", "Red: filler words")}</span>
                  <span className="text-primary font-semibold">{t("Xanh: từ dẫn dắt", "Green: signposting")}</span>
                  <span className="text-purple-500 font-semibold">{t("Tím: từ vựng Band 8.0+", "Purple: Band 8.0+ vocabulary")}</span>
                </div>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {tokens.map((tok, i) => {
                    if (tok.kind === "plain") return <span key={i}>{tok.text}</span>;
                    const cls =
                      tok.kind === "filler" ? "bg-destructive/15 text-destructive rounded px-0.5"
                      : tok.kind === "signpost" ? "bg-primary/15 text-primary rounded px-0.5 font-medium"
                      : "bg-purple-500/15 text-purple-600 dark:text-purple-300 rounded px-0.5 font-medium";
                    return (
                      <button
                        key={i}
                        className={`${cls} hover:underline`}
                        onClick={() => {
                          const u = new SpeechSynthesisUtterance(tok.text.trim());
                          u.lang = "en-US"; u.rate = 0.85;
                          window.speechSynthesis.cancel();
                          window.speechSynthesis.speak(u);
                        }}
                        title={t("Nghe lại & luyện trọng âm", "Listen and review stress")}
                      >
                        {tok.text}
                      </button>
                    );
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <h3 className="text-sm font-semibold text-primary mb-2">
                    {t("3 điểm bạn làm tốt", "Top 3 things you did great")}
                    {aiLoading && <Loader2 className="w-3.5 h-3.5 inline ml-2 animate-spin" />}
                  </h3>
                  <ul className="space-y-2">
                    {strengths.map((s, i) => (
                      <li key={i} className="text-sm flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />{s}</li>
                    ))}
                    {strengths.length === 0 && <li className="text-sm text-muted-foreground">{t("Chưa đủ dữ liệu.", "Not enough data yet.")}</li>}
                  </ul>
                </div>
                <div className="rounded-2xl border border-accent/40 bg-accent/5 p-4">
                  <h3 className="text-sm font-semibold text-accent mb-2">{t("2 điểm cần sửa ngay", "Top 2 high-impact fixes")}</h3>
                  <ul className="space-y-2">
                    {fixes.map((s, i) => (
                      <li key={i} className="text-sm flex gap-2"><ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />{s}</li>
                    ))}
                    {fixes.length === 0 && <li className="text-sm text-muted-foreground">{t("Không có lỗi lớn nào.", "No major issues found.")}</li>}
                  </ul>
                  {ai?.modelUpgrade && (
                    <p className="text-xs mt-3 p-2 rounded-lg bg-background/70 border border-border/60">
                      <span className="font-semibold">{t("Nâng cấp câu:", "Upgraded line:")}</span> {ai.modelUpgrade}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 p-4">
                <h3 className="text-sm font-semibold mb-3">{t("Thử thách hỏi đáp từ khán giả", "AI Q&A follow-up challenge")}</h3>
                <div className="space-y-3">
                  {qaQuestions.map((q, i) => (
                    <div key={i} className="rounded-xl bg-muted/50 p-3">
                      <p className="text-sm font-medium text-foreground">{i + 1}. {q}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {qaActive === i ? (
                          <Button size="sm" variant="destructive" className="rounded-full gap-2" onClick={stopQa}>
                            <Square className="w-3.5 h-3.5" /> {t("Dừng", "Stop")} · {qaSeconds}s
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary" className="rounded-full gap-2" onClick={() => startQa(i)}>
                            <Mic className="w-3.5 h-3.5" /> {t("Ghi âm 30 giây", "Record 30s answer")}
                          </Button>
                        )}
                      </div>
                      {qaActive === i && qaAnswer && (
                        <AnimatePresence>
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mt-2 italic">
                            {qaAnswer}
                          </motion.p>
                        </AnimatePresence>
                      )}
                      {qaActive !== i && qaAnswer && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {countWords(qaAnswer) > 0 && `${countWords(qaAnswer)} ${t("từ", "words")} · ${countFillers(qaAnswer).total} ${t("từ đệm", "fillers")}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PresentationStudio;
