// Cambridge Speaking Practice - record, transcribe and star-grade answers
// for the real Cambridge speaking formats (Starters -> PET).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, Square, RotateCcw, Star, Volume2, Sparkles, Loader2, ArrowLeft, Lightbulb, MessageSquare, Image as ImageIcon, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { playEnglishTts } from "@/lib/englishTts";
import {
  CAMBRIDGE_SPEAK_LEVELS,
  tasksByLevel,
  type CambridgeSpeakLevel,
} from "@/data/cambridgeSpeakingTasks";
import { imageForSpeakingTask, pictureHint } from "@/data/cambridgeSpeakingImages";
import { wordBankForTask } from "@/data/cambridgeSpeakingWordBank";


interface Criterion { label: string; stars: number; feedback: string }
interface SpeakResult {
  stars: number;
  criteria: Criterion[];
  tips: string[];
  modelAnswer?: string;
  fastScore?: boolean;
}

// Minimal Web Speech API typing
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: { [k: number]: { [k: number]: { transcript: string }; isFinal: boolean }; length: number } }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}




const StarRow = ({ value, size = 22 }: { value: number; size?: number }) => (

  <span className="inline-flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        style={{ width: size, height: size }}
        className={i <= value ? "fill-amber-400 text-amber-400" : "text-slate-300"}
      />
    ))}
  </span>
);

const CambridgeSpeakingPractice = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<CambridgeSpeakLevel>("starters");
  const [taskIndex, setTaskIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecording, setHasRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeakResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Preview iframes without an allow="microphone" policy reject getUserMedia.
  const [blockedInFrame, setBlockedInFrame] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [micLevel, setMicLevel] = useState(0);


  const MAX_SECONDS = 180;

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const meterRafRef = useRef<number | null>(null);
  const heardSoundRef = useRef(false);
  const sessionBaseRef = useRef("");
  // Guards a second tap while getUserMedia is still resolving.
  const startingRef = useRef(false);
  const unmountedRef = useRef(false);


  const stopRecordingRef = useRef<(() => void) | null>(null);



  const tasks = useMemo(() => tasksByLevel(level), [level]);
  // Group tasks by topic so each chip = one topic with several questions inside.
  const topicGroups = useMemo(() => {
    const map = new Map<string, { label: string; indices: number[] }>();
    tasks.forEach((tk, i) => {
      const key = tk.topic.trim().toLowerCase();
      const g = map.get(key);
      if (g) g.indices.push(i);
      else map.set(key, { label: tk.topic.trim(), indices: [i] });
    });
    return Array.from(map.values());
  }, [tasks]);
  const task = tasks[taskIndex] || tasks[0];
  const currentGroup = useMemo(
    () => topicGroups.find((g) => g.indices.includes(taskIndex)) || topicGroups[0],
    [topicGroups, taskIndex]
  );
  const posInGroup = currentGroup ? currentGroup.indices.indexOf(taskIndex) : 0;

  // Topic sections grouped by exam part keep the picker tidy instead of one long chip wall.
  const sections = useMemo(() => {
    const map = new Map<string, { part: string; groups: typeof topicGroups }>();
    topicGroups.forEach((g) => {
      const part = (tasks[g.indices[0]]?.part || "Practice").split(" - ")[0];
      const s = map.get(part);
      if (s) s.groups.push(g);
      else map.set(part, { part, groups: [g] });
    });
    return Array.from(map.values()).sort((a, b) => a.part.localeCompare(b.part));
  }, [topicGroups, tasks]);


  const levelMeta = CAMBRIDGE_SPEAK_LEVELS.find((l) => l.key === level)!;
  const taskImage = task ? imageForSpeakingTask(task) : undefined;
  // Word bank is built from this card's own question plus the topic, so two
  // questions inside one topic never show the same list.
  const wordBank = useMemo(
    () => (task ? wordBankForTask(task.topic, task.level, `${task.prompt} ${(task.examiner ?? []).join(" ")}`) : []),
    [task]
  );
  /** Single words vs ready-made sentence frames, shown in two separate rows. */
  const usefulSplit = useMemo(() => {
    const list = task?.usefulLanguage ?? [];
    const isFrame = (s: string) => s.trim().split(/\s+/).length >= 3 || /\.\.\.$/.test(s.trim());
    return { frames: list.filter(isFrame), words: list.filter((s) => !isFrame(s)) };
  }, [task]);

  /**
   * Cards that list their word set inside the prompt ("apple, banana, carrot,
   * orange") show tappable word cards instead of a picture - odd-one-out cards
   * and any object card whose items are written out in the question.
   */
  const oddOneOutWords = useMemo(() => {
    if (!task) return [] as string[];
    if (!/odd one out/i.test(task.part) && taskImage) return [] as string[];
    const list = task.prompt.match(/:\s*([^.:?]+?)\s*[.?]/);
    if (!list) return [] as string[];
    const words = list[1].split(/,| and /).map((w) => w.trim()).filter(Boolean);
    return words.length >= 3 && words.every((w) => w.split(/\s+/).length <= 3) ? words : [];
  }, [task, taskImage]);



  useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl); }, [audioUrl]);

  const reset = useCallback(() => {
    // Hard teardown first: switching level/topic/task while the mic is live
    // used to leave the recorder, timer and mic indicator running.
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    if (meterRafRef.current) { cancelAnimationFrame(meterRafRef.current); meterRafRef.current = null; }
    audioCtxRef.current?.close().catch(() => undefined);
    audioCtxRef.current = null;
    setMicLevel(0);
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    if (recorderRef.current) {
      recorderRef.current.onstop = null;
      recorderRef.current.ondataavailable = null;
      if (recorderRef.current.state !== "inactive") { try { recorderRef.current.stop(); } catch { /* ignore */ } }
      recorderRef.current = null;
    }
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    setIsRecording(false);
    setTimer(0);
    setResult(null);
    setError(null);
    setLiveTranscript("");
    setInterim("");
    setHasRecording(false);
    setShowSample(false);
    setAudioUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    chunksRef.current = [];
    sessionBaseRef.current = "";
    heardSoundRef.current = false;
  }, []);


  const initRecognition = useCallback((): ISpeechRecognition | null => {
    const SR = (window as unknown as { SpeechRecognition?: new () => ISpeechRecognition; webkitSpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-GB";
    rec.onresult = (e) => {
      let live = "";
      let temp = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) live += e.results[i][0].transcript + " ";
        else temp += e.results[i][0].transcript;
      }
      // Merge with text captured before the recogniser restarted mid-answer.
      const merged = `${sessionBaseRef.current} ${live}`.trim();
      setLiveTranscript(merged);
      setInterim(temp);
    };
    rec.onerror = (e) => {
      // "no-speech" and "aborted" are normal during pauses - never surface them.
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setError(t("Hãy cho phép dùng micro nhé!", "Please allow microphone access!"));
      } else if (e.error === "audio-capture") {
        setError(t("Máy không nhận được micro. Hãy kiểm tra micro nhé!", "No microphone input detected. Please check your microphone."));
      }
    };
    rec.onend = () => {
      // The engine stops itself after a pause; keep what we have and restart.
      if (recorderRef.current?.state === "recording") {
        setLiveTranscript((prev) => { sessionBaseRef.current = prev; return prev; });
        setTimeout(() => {
          if (recorderRef.current?.state === "recording") {
            try { rec.start(); } catch { /* already running */ }
          }
        }, 150);
      }
    };
    return rec;
  }, [t]);


  // Pick a container the browser can actually record (Safari cannot do webm).
  const pickMimeType = (): string | undefined => {
    const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
    const MR = window.MediaRecorder as typeof MediaRecorder & { isTypeSupported?: (t: string) => boolean };
    if (!MR?.isTypeSupported) return undefined;
    return candidates.find((c) => MR.isTypeSupported!(c));
  };

  // Live input meter so a student can see the mic is really picking sound up.
  const startMeter = (stream: MediaStream) => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteTimeDomainData(buf);
        let peak = 0;
        for (let i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i] - 128));
        const lvl = Math.min(1, peak / 60);
        setMicLevel(lvl);
        if (lvl > 0.12) heardSoundRef.current = true;
        meterRafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch { /* meter is optional */ }
  };

  const stopMeter = () => {
    if (meterRafRef.current) cancelAnimationFrame(meterRafRef.current);
    meterRafRef.current = null;
    audioCtxRef.current?.close().catch(() => undefined);
    audioCtxRef.current = null;
    setMicLevel(0);
  };

  const startRecording = async () => {
    // Ignore double taps: one tap while permission is pending used to open a
    // second stream and orphan the first one (mic stayed on after Stop).
    if (startingRef.current || isRecording) return;
    if (!window.isSecureContext) {
      setError(t("Trang phải chạy qua HTTPS mới dùng được micro.", "The page must run over HTTPS to use the microphone."));
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof window.MediaRecorder === "undefined") {
      setError(t("Trình duyệt này không thu âm được. Hãy dùng Chrome hoặc Edge nhé!", "This browser cannot record audio. Please use Chrome or Edge."));
      return;
    }
    startingRef.current = true;
    reset();
    setBlockedInFrame(false);
    heardSoundRef.current = false;
    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (unmountedRef.current) { stream.getTracks().forEach((tr) => tr.stop()); return; }
      streamRef.current = stream;
      const mimeType = pickMimeType();
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      } catch {
        recorder = new MediaRecorder(stream); // browser rejected the container - use its default
      }
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeType || "audio/webm" });
        setAudioUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return blob.size > 0 ? URL.createObjectURL(blob) : null; });
        setHasRecording(blob.size > 1200);
        streamRef.current?.getTracks().forEach((tr) => tr.stop());
        streamRef.current = null;
        chunksRef.current = [];
      };
      recorder.onerror = () => {
        setError(t("Thu âm bị lỗi giữa bài. Hãy thử lại nhé!", "Recording failed midway. Please try again."));
        stopRecordingRef.current?.();
      };
      // Mic unplugged or taken by another app: end the session instead of looping.
      stream.getAudioTracks().forEach((tr) => { tr.onended = () => stopRecordingRef.current?.(); });
      // Timeslice keeps chunks flushing so a long answer is never lost.
      recorder.start(1000);
      startMeter(stream);
      setIsRecording(true);
      const rec = initRecognition();
      if (rec) {
        recognitionRef.current = rec;
        try { rec.start(); } catch { /* ignore */ }
      } else {
        setError(t(
          "Trình duyệt này không nhận dạng giọng nói. Em vẫn thu âm được, hãy dùng Chrome hoặc Edge để được chấm điểm.",
          "This browser cannot recognise speech. You can still record - use Chrome or Edge to get a score."
        ));
      }
      timerRef.current = window.setInterval(() => {
        setTimer((s) => {
          const next = s + 1;
          if (next >= MAX_SECONDS) stopRecordingRef.current?.();
          return next;
        });
      }, 1000);
    } catch (e) {
      const name = (e as { name?: string })?.name;
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
      setIsRecording(false);
      const embedded = window.self !== window.top;
      if ((name === "NotAllowedError" || name === "SecurityError") && embedded) {
        setBlockedInFrame(true);
        setError(t(
          "Khung xem trước không cho phép dùng micro. Hãy mở trang ở tab mới rồi thu âm nhé!",
          "This preview frame blocks the microphone. Open the page in a new tab to record."
        ));
        return;
      }
      setError(name === "NotAllowedError" || name === "SecurityError"
        ? t("Em chưa cho phép dùng micro. Hãy bấm vào ổ khoá trên thanh địa chỉ và cho phép micro.", "Microphone permission was blocked. Allow the microphone in your browser settings and try again.")
        : name === "NotFoundError" || name === "OverconstrainedError"
          ? t("Máy không tìm thấy micro nào. Hãy cắm tai nghe có micro rồi thử lại.", "No microphone was found. Plug in a headset and try again.")
          : name === "NotReadableError"
            ? t("Micro đang bị ứng dụng khác dùng. Hãy đóng ứng dụng đó rồi thử lại.", "The microphone is being used by another app. Close it and try again.")
            : t("Không mở được micro. Hãy thử lại.", "Could not open the microphone. Please try again."));
    } finally {
      startingRef.current = false;
    }
  };


  const stopRecording = useCallback(() => {
    if (recorderRef.current?.state === "recording") {
      try { recorderRef.current.requestData?.(); } catch { /* optional */ }
      recorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    stopMeter();
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    // Keep any words that never got finalised by the recogniser.
    setInterim((tempText) => {
      if (tempText.trim()) setLiveTranscript((prev) => (prev ? `${prev} ${tempText}`.trim() : tempText.trim()));
      return "";
    });
    if (!heardSoundRef.current) {
      setError(t(
        "Máy gần như không nghe thấy tiếng. Hãy nói to hơn và đưa micro gần miệng hơn nhé!",
        "We could hardly hear any sound. Speak louder and move closer to the microphone!"
      ));
    }
  }, [t]);

  // Lets the countdown auto-stop call the latest stopRecording.
  stopRecordingRef.current = stopRecording;

  // Always release the mic, timer and meter when leaving the page.
  useEffect(() => () => {
    unmountedRef.current = true;
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (meterRafRef.current) cancelAnimationFrame(meterRafRef.current);
    audioCtxRef.current?.close().catch(() => undefined);
    if (recognitionRef.current) { recognitionRef.current.onend = null; try { recognitionRef.current.stop(); } catch { /* ignore */ } }
    if (recorderRef.current && recorderRef.current.state !== "inactive") { recorderRef.current.onstop = null; try { recorderRef.current.stop(); } catch { /* ignore */ } }
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
  }, []);


  const speakPrompt = async () => {
    // Playing the prompt aloud while the mic is live feeds the TTS back into the transcript.
    if (isRecording) return;
    try { await playEnglishTts(task.prompt, { accent: "en-GB", playbackRate: level === "starters" || level === "movers" ? 0.8 : 0.95 }); }
    catch { /* ignore playback issues */ }
  };


  const handleGrade = async () => {
    const transcript = liveTranscript.trim();
    if (!transcript) {
      setError(t("Chưa nghe được câu trả lời. Hãy thu âm và nói to, rõ nhé!", "No answer was heard. Record again and speak loudly and clearly!"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("grade-cambridge-speaking", {
        body: { level, part: task.part, question: task.prompt, transcript, duration: timer },
      });
      if (fnError) throw fnError;
      const payload = data as SpeakResult & { error?: string };
      if (payload?.error === "rate_limited") {
        setError(t("Hệ thống đang bận, hãy thử lại sau một chút.", "The service is busy - please try again shortly."));
        return;
      }
      if (payload?.error === "credits_exhausted") {
        setError(t("Hết hạn mức AI, vui lòng liên hệ giáo viên.", "AI quota is used up - please contact your teacher."));
        return;
      }
      setResult(payload);
      logStudentActivity({
        activityType: "cambridge_speaking",
        activityId: task.id,
        score: payload.stars * 2,
        maxScore: 10,
        timeSpentSeconds: timer,
        domain: "english",
        metadata: { level, part: task.part, topic: task.topic, words: transcript.split(/\s+/).length },
      });
    } catch (e) {
      console.error("cambridge speaking grade failed", e);
      setError(t("Chấm điểm thất bại, hãy thử lại.", "Grading failed - please try again."));
    } finally {
      setLoading(false);
    }
  };

  const fullTranscript = liveTranscript + (interim ? " " + interim : "");
  const mmss = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #FFF8E7 0%, #FFE5EC 25%, #E0F4FF 55%, #E8FFE0 100%)" }}>
      <FloatingKidsDecor />
      <Navbar />
      <main className="pt-20 pb-12 relative z-10 container mx-auto px-4 max-w-5xl">
        <Link to="/cambridge-lectures">
          <Button variant="ghost" size="sm" className="mb-3 gap-1 text-slate-700">
            <ArrowLeft className="w-4 h-4" />{t("Quay lại Cambridge", "Back to Cambridge")}
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2" style={{ background: "linear-gradient(135deg, #FF6B9D 0%, #FF9F1C 40%, #4D96FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t("Cambridge Speaking Practice 🎤", "Cambridge Speaking Practice 🎤")}
          </h1>
          <p className="text-slate-700 font-medium text-[17px]">
            {t(
              "Luyện nói theo đúng format đề thi Cambridge từ Starters đến PET - thu âm, nghe lại và được chấm điểm sao kèm nhận xét.",
              "Practise speaking in the real Cambridge exam formats from Starters to PET - record, listen back, and get star scores with feedback."
            )}
          </p>
        </motion.div>

        {/* Level chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CAMBRIDGE_SPEAK_LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => { setLevel(l.key); setTaskIndex(0); reset(); }}
              className="px-4 py-2 rounded-full text-sm font-bold border-2 transition-all bg-white/85"
              style={{
                borderColor: l.color,
                color: level === l.key ? "#fff" : l.color,
                background: level === l.key ? l.color : "rgba(255,255,255,0.85)",
              }}
            >
              {l.emoji} {l.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-600 mb-5 font-medium">{t(levelMeta.blurbVi, levelMeta.blurb)}</p>

        {/* Topic picker - single compact dropdown grouped by exam part */}
        <div className="rounded-2xl border-2 border-white/70 bg-white/70 backdrop-blur-sm p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <p className="text-sm font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              {t("Chọn chủ đề", "Choose a topic")}
              <span className="text-slate-400 font-bold normal-case">
                ({topicGroups.length} {t("chủ đề", "topics")} · {tasks.length} {t("câu", "questions")})
              </span>
            </p>
          </div>
          <Select
            value={currentGroup ? currentGroup.label : undefined}
            onValueChange={(label) => {
              const g = topicGroups.find((x) => x.label === label);
              if (g) { setTaskIndex(g.indices[0]); reset(); }
            }}
          >
            <SelectTrigger className="w-full h-auto py-2.5 bg-white border-2 border-slate-200 text-left text-sm font-bold text-slate-800">
              <SelectValue placeholder={t("Chọn chủ đề...", "Choose a topic...")} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              sideOffset={6}
              avoidCollisions={false}
              className="max-h-[55vh] w-[var(--radix-select-trigger-width)]"
            >
              {sections.map((section) => (
                <SelectGroup key={section.part}>
                  <SelectLabel className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                    {section.part}
                  </SelectLabel>
                  {section.groups.map((g) => (
                    <SelectItem key={g.label} value={g.label} className="text-sm font-semibold">
                      {g.label}
                      <span className="ml-2 text-[10px] font-black text-slate-400">
                        {g.indices.length} {t("câu", "Qs")}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>



        {/* Task card */}
        <div className="rounded-2xl border-2 bg-white/90 p-5 shadow-sm mb-6" style={{ borderColor: levelMeta.color }}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-wider px-2 py-1 rounded" style={{ background: `${levelMeta.color}20`, color: levelMeta.color }}>
              {task.part}
            </span>
            <span className="text-xs font-bold text-slate-500">{task.topic}</span>
            <span className="text-xs font-bold text-slate-500">· {t("Nói tối thiểu", "Speak at least")} {task.minSeconds}s</span>
            {currentGroup && currentGroup.indices.length > 1 && (
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {t("Câu", "Question")} {posInGroup + 1}/{currentGroup.indices.length}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 gap-1 h-8"
                  onClick={() => {
                    const next = currentGroup.indices[(posInGroup + 1) % currentGroup.indices.length];
                    setTaskIndex(next);
                    reset();
                  }}
                >
                  {t("Câu tiếp theo", "Next question")}
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Button>
              </div>
            )}
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white p-4 flex items-start gap-3">
            <p className="text-[17px] font-semibold text-slate-800 leading-relaxed flex-1 whitespace-pre-wrap">{task.prompt}</p>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Listen to the question"
              className="h-8 w-8 flex-shrink-0 text-slate-500"
              onClick={() => { if (!isRecording) playEnglishTts(task.prompt, { accent: "en-GB", playbackRate: 0.85 }).catch(() => undefined); }}
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Odd one out - show the word set as cards, since these tasks have no exam picture */}
          {oddOneOutWords.length >= 3 && (
            <div className="mt-3 rounded-xl bg-amber-50 border-2 border-amber-200 p-3">
              <p className="text-xs font-black uppercase text-amber-700 mb-2">
                {t("Chọn từ khác nhóm", "Which one is different?")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {oddOneOutWords.map((w) => (
                  <button
                    key={w}
                    onClick={() => { if (!isRecording) playEnglishTts(w, { accent: "en-GB", playbackRate: 0.85 }).catch(() => undefined); }}
                    className="rounded-xl bg-white border-2 border-amber-200 px-3 py-3 text-[15px] font-bold text-slate-700 capitalize hover:border-amber-400 transition-colors"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Useful language - split so students see ready-made sentence openers apart from single words */}
          <div className="mt-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 p-3 space-y-3">
            {usefulSplit.frames.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase text-emerald-700 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("Mẫu câu nói được ngay", "Sentence frames you can say now")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {usefulSplit.frames.map((u) => (
                    <button
                      key={u}
                      onClick={() => playEnglishTts(u, { accent: "en-GB", playbackRate: 0.85 }).catch(() => undefined)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-300 text-[13px] font-semibold text-slate-700 hover:border-emerald-500 transition-colors"
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {usefulSplit.words.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase text-emerald-700 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("Từ nên dùng", "Useful words")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {usefulSplit.words.map((u) => (
                    <button
                      key={u}
                      onClick={() => playEnglishTts(u, { accent: "en-GB", playbackRate: 0.85 }).catch(() => undefined)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-[13px] font-semibold text-slate-700 hover:border-emerald-400 transition-colors"
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Word bank - extra vocabulary so children always have material to speak with */}
          {wordBank.length > 0 && (
            <div className="mt-3 rounded-xl bg-sky-50 border-2 border-sky-200 p-3">
              <p className="text-xs font-black uppercase text-sky-700 mb-2 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {t("Ngân hàng từ vựng cho câu này", "Word bank for this question")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {wordBank.map((word) => (
                  <button
                    key={word.en}
                    onClick={() => playEnglishTts(word.en, { accent: "en-GB", playbackRate: 0.8 }).catch(() => undefined)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-sky-200 text-left hover:border-sky-400 transition-colors"
                  >
                    <span className="block text-[13px] font-bold text-slate-800">{word.en}</span>
                    <span className="block text-[11px] text-slate-500">{word.vi}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-sky-700 font-semibold">
                {t("Bấm vào từ để nghe cách đọc, rồi dùng ít nhất 3 từ trong câu trả lời.", "Tap a word to hear it, then use at least 3 of them in your answer.")}
              </p>
            </div>
          )}




          {taskImage && (
            <figure className="mt-4">
              <img
                src={taskImage}
                alt={`${task.topic} - ${task.part} exam picture`}
                loading="lazy"
                width={1024}
                height={640}
                className="w-full max-h-[420px] object-contain rounded-xl border-2 border-slate-200 bg-white"
              />

              <figcaption className="mt-2 text-xs font-semibold text-slate-600 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                {t(pictureHint(task.part).vi, pictureHint(task.part).en)}
              </figcaption>
            </figure>
          )}


          <div className="flex flex-wrap gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={speakPrompt} disabled={isRecording} className="border-2 gap-1">
              <Volume2 className="w-4 h-4" />{t("Nghe câu hỏi", "Hear the question")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowSample((s) => !s)} className="border-2 gap-1">
              <Lightbulb className="w-4 h-4" />{showSample ? t("Ẩn gợi ý", "Hide help") : t("Gợi ý & câu mẫu", "Help & model answer")}
            </Button>
          </div>

          <AnimatePresence>
            {showSample && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-sky-50 border border-sky-200 p-3">
                    <p className="text-xs font-black uppercase text-sky-700 mb-1">{t("Câu hỏi giám thị có thể hỏi", "Examiner may also ask")}</p>
                    <div className="space-y-1.5">
                      {task.examiner.map((q) => (
                        <div key={q} className="rounded-lg bg-white border border-sky-200 px-2.5 py-2 text-sm font-semibold text-slate-700">
                          {q}
                        </div>
                      ))}
                    </div>

                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                    <p className="text-xs font-black uppercase text-amber-700 mb-1">{t("Câu trả lời mẫu", "Model answer")}</p>
                    <p className="text-sm text-slate-700">{task.sampleAnswer}</p>
                    <Button size="sm" variant="ghost" className="mt-1 gap-1 text-amber-700" onClick={() => playEnglishTts(task.sampleAnswer, { accent: "en-GB", playbackRate: 0.85 }).catch(() => undefined)}>
                      <Volume2 className="w-4 h-4" />{t("Nghe câu mẫu", "Listen")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recorder */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white/90 p-5 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {!isRecording ? (
              <Button onClick={startRecording} className="gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold">
                <Mic className="w-4 h-4" />{t("Bắt đầu thu âm", "Start recording")}
              </Button>
            ) : (
              <Button onClick={stopRecording} className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold">
                <Square className="w-4 h-4" />{t("Dừng", "Stop")}
              </Button>
            )}
            <span className={`text-sm font-black tabular-nums ${isRecording ? "text-rose-600 animate-pulse" : "text-slate-600"}`}>{mmss}</span>
            {isRecording && (
              <span className="flex items-center gap-2" aria-label="microphone level">
                <span className="h-2.5 w-28 rounded-full bg-slate-200 overflow-hidden">
                  <span
                    className="block h-full rounded-full transition-all duration-100"
                    style={{ width: `${Math.round(micLevel * 100)}%`, background: micLevel > 0.12 ? "#10B981" : "#F59E0B" }}
                  />
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {micLevel > 0.12 ? t("Nghe tốt", "Sounds good") : t("Nói to hơn nhé", "Speak louder")}
                </span>
              </span>
            )}

            {(hasRecording || liveTranscript) && !isRecording && (
              <>
                <Button onClick={handleGrade} disabled={loading} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {t("Chấm điểm bài nói", "Grade my speaking")}
                </Button>
                <Button variant="outline" onClick={reset} className="gap-1 border-2">
                  <RotateCcw className="w-4 h-4" />{t("Làm lại", "Try again")}
                </Button>
              </>
            )}
          </div>

          {error && (
            <div className="mt-3 rounded-xl border-2 border-rose-200 bg-rose-50 p-3">
              <p className="text-sm font-semibold text-rose-700">{error}</p>
              {blockedInFrame && (
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white"
                >
                  {t("Mở ở tab mới để thu âm", "Open in a new tab to record")}
                </a>
              )}
            </div>
          )}

          {audioUrl && !isRecording && (
            <audio src={audioUrl} controls className="w-full mt-4" />
          )}

          {(fullTranscript || isRecording) && (
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-xs font-black uppercase text-slate-500 mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />{t("Máy nghe được", "What we heard")}
              </p>
              <p className="text-sm text-slate-800 leading-relaxed">
                {liveTranscript}
                {interim && <span className="text-slate-400"> {interim}</span>}
                {!fullTranscript && <span className="text-slate-400">{t("Hãy nói to và rõ...", "Speak loudly and clearly...")}</span>}
              </p>
            </div>
          )}

          
        </div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border-2 border-amber-300 bg-white/95 p-5 shadow-md">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xl font-black text-slate-800">{t("Kết quả của em", "Your result")}</span>
                <StarRow value={result.stars} size={28} />
                <span className="text-lg font-black text-amber-600">{result.stars}/5</span>
                {result.fastScore && (
                  <span className="text-xs font-bold text-slate-500">{t("(điểm nhanh)", "(quick score)")}</span>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {result.criteria.map((c) => (
                  <div key={c.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-800">{c.label}</span>
                      <StarRow value={c.stars} size={16} />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.feedback}</p>
                  </div>
                ))}
              </div>

              {result.tips?.length > 0 && (
                <div className="mt-4 rounded-xl bg-sky-50 border border-sky-200 p-3">
                  <p className="text-xs font-black uppercase text-sky-700 mb-1">{t("Việc cần làm tiếp", "Next steps")}</p>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-0.5">
                    {result.tips.map((tip) => <li key={tip}>{tip}</li>)}
                  </ul>
                </div>
              )}

              {result.modelAnswer && (
                <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-black uppercase text-emerald-700 mb-1">{t("Câu trả lời nâng cấp", "Upgraded answer")}</p>
                  <p className="text-sm text-slate-700">{result.modelAnswer}</p>
                  <Button size="sm" variant="ghost" className="mt-1 gap-1 text-emerald-700" onClick={() => playEnglishTts(result.modelAnswer!, { accent: "en-GB", playbackRate: 0.85 }).catch(() => undefined)}>
                    <Volume2 className="w-4 h-4" />{t("Nghe", "Listen")}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeSpeakingPractice;
