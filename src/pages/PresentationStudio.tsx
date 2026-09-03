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
  Maximize2, Minimize2, Type, ListChecks, Smile, History, Download,

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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  PRESENTATION_SCENARIOS, SCENARIO_GROUPS, analyzeSession, countFillers, countWords, findSignposts,
  isStressWord, paceLabel, tokenizeTranscript, buildCustomScenario, evaluateStructure,
  type StudioMode, type StudioReport,
} from "@/lib/presentationStudio";
import { scoreBodyLanguage, scoreLabel, type BodyLanguageScores } from "@/lib/speakingBodyLanguage";


const CUSTOM_STORAGE_KEY = "presentation-custom-script";
const HISTORY_STORAGE_KEY = "presentation-session-history";

const PROMPT_SIZES = {
  s: "text-base sm:text-lg",
  m: "text-lg sm:text-xl",
  l: "text-2xl sm:text-3xl",
  xl: "text-3xl sm:text-4xl",
} as const;

const PROMPT_WIDTHS = {
  narrow: "max-w-[42ch]",
  medium: "max-w-[52ch]",
  wide: "max-w-[68ch]",
} as const;

const PROMPT_WIDTH_STORAGE_KEY = "presentation-prompt-width";
const PROMPT_SIZE_STORAGE_KEY = "presentation-prompt-size";
const PROMPT_FOCUS_RATIO = 0.62; // reading zone from the top (lower third so text rises from bottom)



interface SessionHistoryItem {
  at: number;
  scenario: string;
  overall: number;
  wpm: number;
  durationSec: number;
  fillers: number;
  eyeContact: number;
  confidence: number;
}


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
  const [scrollSpeed, setScrollSpeed] = useState(14); // px per second (gentle default, bottom-up)

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
  const [countdown, setCountdown] = useState(0);      // 3-2-1 lead-in
  const [promptRunning, setPromptRunning] = useState(false);
  const [body, setBody] = useState<BodyLanguageScores | null>(null);
  const [promptSize, setPromptSize] = useState<"s" | "m" | "l" | "xl">(() => {
    if (typeof window === "undefined") return "m";
    const v = window.localStorage.getItem(PROMPT_SIZE_STORAGE_KEY);
    return v === "s" || v === "m" || v === "l" || v === "xl" ? v : "m";
  });
  const [promptWidth, setPromptWidth] = useState<"narrow" | "medium" | "wide">(() => {
    if (typeof window === "undefined") return "narrow";
    const v = window.localStorage.getItem(PROMPT_WIDTH_STORAGE_KEY);
    return v === "narrow" || v === "medium" || v === "wide" ? v : "narrow";
  });

  useEffect(() => {
    try { window.localStorage.setItem(PROMPT_SIZE_STORAGE_KEY, promptSize); } catch { /* ignore */ }
  }, [promptSize]);
  useEffect(() => {
    try { window.localStorage.setItem(PROMPT_WIDTH_STORAGE_KEY, promptWidth); } catch { /* ignore */ }
  }, [promptWidth]);

  const [focusMode, setFocusMode] = useState(false);
  const [history, setHistory] = useState<SessionHistoryItem[]>([]);


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
  const bodyRef = useRef({ moveSum: 0, moveCount: 0, brightSum: 0, brightCount: 0, mouth: [] as number[] });

  const promptRef = useRef<HTMLDivElement>(null);
  const promptInnerRef = useRef<HTMLDivElement>(null);
  const promptOffsetRef = useRef(0);
  const promptMetricsRef = useRef({ containerHeight: 0, contentHeight: 0 });
  const scrollRafRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(scrollSpeed);
  const runningRef = useRef(false);
  const countdownRef = useRef<number | null>(null);


  useEffect(() => { scrollSpeedRef.current = scrollSpeed; }, [scrollSpeed]);

  // ---- local session history --------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const pushHistory = useCallback((item: SessionHistoryItem) => {
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, 10);
      try { localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);



  const liveWords = countWords(`${transcript} ${interim}`);
  const liveWpm = elapsed > 2 ? Math.round(liveWords / (elapsed / 60)) : 0;
  const fillers = useMemo(() => countFillers(`${transcript} ${interim}`), [transcript, interim]);
  const liveSignposts = useMemo(() => findSignposts(transcript), [transcript]);
  const structure = useMemo(() => evaluateStructure(`${transcript} ${interim}`), [transcript, interim]);
  const targetSec = targetMinutes * 60;
  const timeRatio = Math.min(1.35, elapsed / Math.max(30, targetSec));
  const pace = paceLabel(liveWpm);

  const customDraftWords = useMemo(() => countWords(customDraft), [customDraft]);
  const customDraftMinutes = Math.max(0.1, Math.round((customDraftWords / Math.max(80, targetWpm)) * 10) / 10);

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

  // ---- body-language sampling (eye contact, framing, movement, expression)
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
      let avg = 0;
      if (prev && prev.length === centre.length) {
        let diff = 0;
        for (let i = 0; i < centre.length; i += 8) diff += Math.abs(centre[i] - prev[i]);
        avg = diff / (centre.length / 8);
        if (avg < 16) eyeSampleRef.current.hits += 1; // steady framing = looking at lens
        bodyRef.current.moveSum += avg;
        bodyRef.current.moveCount += 1;
      }
      eyeSampleRef.current.last = new Uint8ClampedArray(centre);

      // Brightness of the face box + brightness of the mouth strip (expression).
      let bright = 0;
      for (let i = 0; i < centre.length; i += 4) bright += (centre[i] + centre[i + 1] + centre[i + 2]) / 3;
      bright /= centre.length / 4;
      bodyRef.current.brightSum += bright;
      bodyRef.current.brightCount += 1;

      const mouth = c.getImageData(24, 26, 16, 10).data;
      let mBright = 0;
      for (let i = 0; i < mouth.length; i += 4) mBright += (mouth[i] + mouth[i + 1] + mouth[i + 2]) / 3;
      mBright /= mouth.length / 4;
      bodyRef.current.mouth.push(mBright);
      if (bodyRef.current.mouth.length > 120) bodyRef.current.mouth.shift();

      const { hits, total } = eyeSampleRef.current;
      const eye = total > 1 ? Math.round((hits / (total - 1)) * 100) : 0;
      setEyeContact(eye);

      const m = bodyRef.current.mouth;
      const mean = m.reduce((a, b) => a + b, 0) / Math.max(1, m.length);
      const variance = Math.sqrt(m.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, m.length));
      setBody(
        scoreBodyLanguage({
          total,
          steadyHits: hits,
          movementAvg: bodyRef.current.moveSum / Math.max(1, bodyRef.current.moveCount),
          framingBrightness: bodyRef.current.brightSum / Math.max(1, bodyRef.current.brightCount),
          expressionVariance: variance * 4,
        }),
      );
    }, 700);
    return () => window.clearInterval(id);
  }, [recording, paused, camOn]);


  // ---- teleprompter measurement -----------------------------------------
  const measurePrompt = useCallback(() => {
    const el = promptRef.current;
    const inner = promptInnerRef.current;
    if (!el || !inner) return;
    promptMetricsRef.current = {
      containerHeight: el.clientHeight,
      contentHeight: inner.scrollHeight,
    };
  }, []);

  useEffect(() => {
    measurePrompt();
    const onResize = () => {
      measurePrompt();
      // keep text in the reading zone after resize
      const { containerHeight } = promptMetricsRef.current;
      const focusTop = containerHeight * PROMPT_FOCUS_RATIO;
      const inner = promptInnerRef.current;
      if (inner) inner.style.transform = `translateY(${focusTop - promptOffsetRef.current}px)`;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measurePrompt, scenario, promptSize, promptWidth, focusMode]);

  // ---- teleprompter auto-scroll (bottom-up) -----------------------------
  useEffect(() => {
    if (!(promptRunning && !paused && mode === "scripted")) {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
      return;
    }
    measurePrompt();
    const startedAt = performance.now();
    let last = startedAt;
    const GRACE_MS = 2500;   // hold the first line in the reading zone
    const RAMP_MS = 2000;    // then ease in to full speed
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const since = now - startedAt;
      const ramp = since <= GRACE_MS
        ? 0
        : Math.min(1, (since - GRACE_MS) / RAMP_MS);
      promptOffsetRef.current += scrollSpeedRef.current * ramp * dt;

      const { containerHeight, contentHeight } = promptMetricsRef.current;
      const focusTop = containerHeight * PROMPT_FOCUS_RATIO;
      const inner = promptInnerRef.current;
      if (inner) {
        const translateY = focusTop - promptOffsetRef.current;
        inner.style.transform = `translateY(${translateY}px)`;
        // stop when the last line has passed the reading zone
        if (translateY <= focusTop - contentHeight) {
          setPromptRunning(false);
          return;
        }
      }
      scrollRafRef.current = requestAnimationFrame(step);
    };
    scrollRafRef.current = requestAnimationFrame(step);
    return () => { if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current); };
  }, [promptRunning, paused, mode, measurePrompt]);


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
    bodyRef.current = { moveSum: 0, moveCount: 0, brightSum: 0, brightCount: 0, mouth: [] };
    setBody(null);
    setEyeContact(0);

    promptOffsetRef.current = 0;
    measurePrompt();
    const { containerHeight } = promptMetricsRef.current;
    const focusTop = containerHeight * PROMPT_FOCUS_RATIO;
    if (promptInnerRef.current) promptInnerRef.current.style.transform = `translateY(${focusTop}px)`;
    runningRef.current = true;

    setPromptRunning(false);
    setRecording(true); setPaused(false);
    startRecognition();
    // 3-2-1 lead-in before the teleprompter starts moving.
    if (mode === "scripted") {
      setCountdown(3);
      let n = 3;
      const id = window.setInterval(() => {
        n -= 1;
        setCountdown(n);
        if (n <= 0) {
          window.clearInterval(id);
          setPromptRunning(true);
        }
      }, 1000);
      countdownRef.current = id;
    }
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
    if (countdownRef.current) { window.clearInterval(countdownRef.current); countdownRef.current = null; }
    setCountdown(0);
    setPromptRunning(false);
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
    pushHistory({
      at: Date.now(),
      scenario: scenario.label,
      overall: local.overall,
      wpm: local.wpm,
      durationSec: local.durationSec,
      fillers: local.fillers.total,
      eyeContact,
      confidence: body?.confidence ?? 0,
    });
    // The AI coach needs at least 12 words; below that we keep the local report only.
    if (countWords(fullText) < 12) {
      setAi(null);
      setAiLoading(false);
      toast({
        title: t("Báo cáo cơ bản", "Basic report"),
        description: t(
          "Bài nói quá ngắn để AI phân tích sâu (cần ít nhất 12 từ). Hãy nói dài hơn để nhận nhận xét từ AI.",
          "Too short for AI coaching (needs at least 12 words). Speak longer for AI feedback.",
        ),
      });
      return;
    }
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
          bodyLanguage: body
            ? {
                confidence: body.confidence,
                naturalness: body.naturalness,
                framing: body.framing,
                movement: body.movement,
                expression: body.expression,
              }
            : null,
          structureDone: structure.filter((s) => s.done).map((s) => s.label),
          structureMissing: structure.filter((s) => !s.done).map((s) => s.label),
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

        {/* ---------------- Full-width teleprompter row ---------------- */}
        <div
          className={
            focusMode
              ? "fixed inset-0 z-50 bg-slate-950 p-4 sm:p-8 overflow-hidden flex flex-col"
              : "glass-card rounded-2xl p-4 border border-border/60 mb-4"
          }
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className={`text-sm font-semibold flex items-center gap-2 ${focusMode ? "text-slate-100" : ""}`}>
              <ScrollText className="w-4 h-4 text-primary" />
              {mode === "scripted" ? t("Teleprompter", "Teleprompter") : t("Đề bài ứng khẩu", "Impromptu prompt")}
            </h2>
            <div className="flex flex-wrap items-center gap-1">
              {mode === "scripted" && (
                <>
                  <div className="flex items-center gap-0.5 mr-1">
                    <Type className={`w-3.5 h-3.5 mr-1 ${focusMode ? "text-slate-300" : "text-muted-foreground"}`} />
                    {(["s", "m", "l", "xl"] as const).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={promptSize === s ? "default" : "ghost"}
                        className="h-7 px-2 text-[11px] uppercase"
                        onClick={() => setPromptSize(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-0.5 mr-1">
                    {([
                      { id: "narrow" as const, label: t("Hẹp", "Narrow") },
                      { id: "medium" as const, label: t("Vừa", "Medium") },
                      { id: "wide" as const, label: t("Rộng", "Wide") },
                    ]).map((w) => (
                      <Button
                        key={w.id}
                        size="sm"
                        variant={promptWidth === w.id ? "default" : "ghost"}
                        className="h-7 px-2 text-[11px]"
                        onClick={() => setPromptWidth(w.id)}
                      >
                        {w.label}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="ghost" size="sm" className={`gap-1 text-xs ${focusMode ? "text-slate-200 hover:text-slate-50" : ""}`}
                    onClick={() => setPromptRunning((r) => !r)}
                  >
                    {promptRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {promptRunning ? t("Dừng chữ chạy", "Pause scroll") : t("Chạy chữ", "Scroll")}
                  </Button>
                  <Button
                    variant="ghost" size="sm" className={`gap-1 text-xs ${focusMode ? "text-slate-200 hover:text-slate-50" : ""}`}
                    onClick={() => {
                      promptOffsetRef.current = 0;
                      measurePrompt();
                      const focusTop = promptMetricsRef.current.containerHeight * PROMPT_FOCUS_RATIO;
                      if (promptInnerRef.current) promptInnerRef.current.style.transform = `translateY(${focusTop}px)`;
                    }}
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> {t("Về đầu", "Rewind")}
                  </Button>

                </>
              )}
              <Button
                variant="ghost" size="sm" className={`gap-1 text-xs ${focusMode ? "text-slate-200 hover:text-slate-50" : ""}`}
                onClick={() => setFocusMode((f) => !f)}
              >
                {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                {focusMode ? t("Thoát toàn màn hình", "Exit focus") : t("Toàn màn hình", "Focus mode")}
              </Button>
            </div>
          </div>

          {mode === "scripted" ? (
            <div className={`relative ${focusMode ? "flex-1 min-h-0" : ""}`}>
              {countdown > 0 && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-950/80 backdrop-blur-sm">
                  <span className="text-6xl font-bold text-primary-foreground">{countdown}</span>
                  <span className="text-sm text-slate-200">{t("Hít sâu... chuẩn bị nói", "Breathe... get ready to speak")}</span>
                </div>
              )}
              <div
                ref={promptRef}
                className={`overflow-hidden rounded-xl bg-slate-900/95 px-4 sm:px-6 text-slate-100 leading-[1.9] tracking-wide ${PROMPT_SIZES[promptSize]} ${focusMode ? "h-full" : "h-[300px] sm:h-[340px]"}`}
              >
                <div
                  ref={promptInnerRef}
                  className="will-change-transform"
                  style={{ transform: `translateY(${(focusMode ? 1 : 0) * 0}px)` }} // placeholder overridden by JS
                >
                  <p
                    className={`whitespace-pre-wrap text-left mx-auto pt-[62%] pb-[38%] [&>span]:leading-[1.9] ${
                      focusMode
                        ? promptWidth === "narrow" ? "max-w-[46ch]" : promptWidth === "medium" ? "max-w-[58ch]" : "max-w-[74ch]"
                        : PROMPT_WIDTHS[promptWidth]
                    }`}
                  >
                    {promptWords.map((w, i) =>
                      /^\s+$/.test(w) ? w : (
                        <span key={i} className={isStressWord(w) ? "text-accent font-semibold" : "text-slate-200"}>{w}</span>
                      ),
                    )}
                  </p>
                </div>
              </div>
              {/* reading focus band + edge fades */}
              <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-slate-950/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute inset-x-0 top-[62%] -translate-y-1/2 h-16 bg-primary/5 border-y border-primary/20" />
                <div className="absolute left-0 top-[62%] w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-primary/60" />
                <div className="absolute right-0 top-[62%] w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-primary/60" />
              </div>


              {focusMode && (
                <div className="absolute bottom-3 right-3 w-40 sm:w-56 rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-900">
                  <video
                    autoPlay muted playsInline
                    className="w-full aspect-video object-cover scale-x-[-1]"
                    ref={(el) => { if (el && streamRef.current) el.srcObject = streamRef.current; }}
                  />
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] text-slate-200">
                    <span>{fmtTime(elapsed)}</span>
                    <span>{liveWpm} WPM</span>
                    <span>{eyeContact}% {t("mắt", "eye")}</span>
                  </div>
                </div>
              )}
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
                  {SCENARIO_GROUPS.map((g) => (
                    <SelectGroup key={g.id}>
                      <SelectLabel>{t(g.labelVi, g.label)}</SelectLabel>
                      {g.ids
                        .map((id) => PRESENTATION_SCENARIOS.find((s) => s.id === id))
                        .filter((s): s is typeof PRESENTATION_SCENARIOS[number] => Boolean(s))
                        .map((s) => (
                          <SelectItem key={s.id} value={s.id}>{t(s.labelVi, s.label)}</SelectItem>
                        ))}
                    </SelectGroup>
                  ))}

                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{scenario.prompt}</p>
              <Badge variant="secondary" className="mt-3">{scenario.audience}</Badge>
              {customActive && (
                <Badge className="mt-3 ml-2">{t("Đang dùng kịch bản của bạn", "Using your own script")}</Badge>
              )}
            </div>

            {/* Custom / external script */}
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <ScrollText className="w-4 h-4 text-primary" />
                {t("Kịch bản của riêng bạn", "Your own script")}
              </h2>
              <Textarea
                value={customDraft}
                onChange={(e) => { setCustomDraft(e.target.value); persistCustom(e.target.value, customAudience, customActive); }}
                disabled={recording}
                rows={6}
                placeholder={t("Dán bài thuyết trình của bạn vào đây...", "Paste your presentation script here...")}
                className="text-sm"
              />
              <p className="text-[11px] text-muted-foreground mt-2">
                {customDraftWords} {t("từ", "words")} · ≈ {customDraftMinutes} {t("phút ở", "min at")} {targetWpm} WPM
              </p>
              <Input
                value={customAudience}
                onChange={(e) => { setCustomAudience(e.target.value); persistCustom(customDraft, e.target.value, customActive); }}
                disabled={recording}
                placeholder={t("Khán giả / ngữ cảnh (không bắt buộc)", "Audience / context (optional)")}
                className="mt-2 text-sm"
              />
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm" className="flex-1"
                  disabled={recording || customDraft.trim().length < 20}
                  onClick={() => {
                    setCustomScript(customDraft);
                    setCustomActive(true);
                    persistCustom(customDraft, customAudience, true);
                    promptOffsetRef.current = 0;
                    if (promptRef.current) promptRef.current.scrollTop = 0;
                    toast({ title: t("Đã nạp kịch bản của bạn", "Your script is loaded") });
                  }}
                >
                  {t("Dùng kịch bản này", "Use this script")}
                </Button>
                {customActive && (
                  <Button
                    size="sm" variant="outline" disabled={recording}
                    onClick={() => { setCustomActive(false); persistCustom(customDraft, customAudience, false); }}
                  >
                    {t("Bỏ", "Clear")}
                  </Button>
                )}
              </div>
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
                  <Slider value={[scrollSpeed]} min={6} max={90} step={1} onValueChange={(v) => setScrollSpeed(v[0])} />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {t("Khuyến nghị 18-30 px/s · có 3 giây đếm ngược và 2 giây giữ dòng đầu", "Recommended 18-30 px/s · includes a 3s countdown and a 2s hold on the first lines")}
                  </p>
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
            {/* Body language */}
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Smile className="w-4 h-4 text-primary" /> {t("Ngôn ngữ cơ thể", "Body language")}
              </h2>
              {body ? (
                <div className="space-y-3">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-primary">{body.confidence}</span>
                    <span className="text-xs text-muted-foreground mb-1">
                      /100 · {t(scoreLabel(body.confidence).vi, scoreLabel(body.confidence).en)}
                    </span>
                  </div>
                  {([
                    ["Tự nhiên", "Naturalness", body.naturalness],
                    ["Khung hình & ánh sáng", "Framing & light", body.framing],
                    ["Chuyển động", "Movement", body.movement],
                    ["Biểu cảm", "Expression", body.expression],
                  ] as const).map(([vi, en, val]) => (
                    <div key={en}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{t(vi, en)}</span>
                        <span className="font-semibold">{val}</span>
                      </div>
                      <Progress value={val} className="h-1.5" />
                    </div>
                  ))}
                  <ul className="space-y-1 pt-1">
                    {body.tips.map((tip, i) => (
                      <li key={i} className="text-[11px] text-muted-foreground leading-relaxed">• {t(tip.vi, tip.en)}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {t(
                    "Bật camera và bắt đầu ghi để hệ thống phân tích ánh mắt, biểu cảm và sự tự tin ngay trên máy bạn.",
                    "Turn on the camera and start recording - gaze, expression and confidence are analysed locally on your device.",
                  )}
                </p>
              )}
            </div>

            {/* Structure checklist */}
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <ListChecks className="w-4 h-4 text-primary" /> {t("Cấu trúc bài nói", "Structure checklist")}
              </h2>
              <ul className="space-y-2">
                {structure.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-xs">
                    <span className={`w-4 h-4 rounded-full grid place-items-center text-[10px] font-bold ${s.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {s.done ? "✓" : ""}
                    </span>
                    <span className={s.done ? "font-medium" : "text-muted-foreground"}>{t(s.labelVi, s.label)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                  <span>{t("Thời lượng mục tiêu", "Target length")}</span>
                  <span className={elapsed > targetSec ? "text-accent font-semibold" : ""}>
                    {fmtTime(elapsed)} / {fmtTime(targetSec)}
                  </span>
                </div>
                <Progress value={timeRatio * 100} className="h-1.5" />
              </div>
            </div>

            {/* Session history */}
            <div className="glass-card rounded-2xl p-4 border border-border/60">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" /> {t("Lịch sử buổi tập", "Session history")}
                </h2>
                {history.length > 0 && (
                  <Button
                    variant="ghost" size="sm" className="h-7 px-2 gap-1 text-[11px]"
                    onClick={() => {
                      const rows = [
                        "date,scenario,overall,wpm,duration_sec,fillers,eye_contact,confidence",
                        ...history.map((h) =>
                          [new Date(h.at).toISOString(), `"${h.scenario}"`, h.overall, h.wpm, h.durationSec, h.fillers, h.eyeContact, h.confidence].join(","),
                        ),
                      ].join("\n");
                      const url = URL.createObjectURL(new Blob([rows], { type: "text/csv;charset=utf-8" }));
                      const a = document.createElement("a");
                      a.href = url; a.download = "presentation-history.csv"; a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </Button>
                )}
              </div>
              {history.length ? (
                <ul className="space-y-2">
                  {history.slice(0, 5).map((h) => (
                    <li key={h.at} className="flex items-center justify-between gap-2 text-xs">
                      <span className="truncate text-muted-foreground">{h.scenario}</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Badge variant="secondary" className="text-[10px]">{h.overall}</Badge>
                        <span className="text-[10px] text-muted-foreground">{h.wpm} WPM · {fmtTime(h.durationSec)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {t("Chưa có buổi tập nào được lưu.", "No saved sessions yet.")}
                </p>
              )}
            </div>


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
