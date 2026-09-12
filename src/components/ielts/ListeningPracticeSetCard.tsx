// Reusable listening practice card with TTS audio + collapsible transcript + auto-grading.
// Upgrades: auto-save, multi-accent voice picker, IELTS band score, exam mode, AI explain wrong answers.
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Play, Pause, Square, Headphones, Eye, EyeOff,
  CheckCircle2, XCircle, RotateCcw, Gauge,
  SkipBack, SkipForward, Sparkles, ShieldAlert, Mic2, Save,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ListeningPracticeSet } from "@/data/ieltsListeningPractice";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { ieltsListeningBand, bandColor } from "@/lib/ieltsListeningBand";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { pushListeningAttempt } from "@/lib/ieltsListeningHistory";
import { useListeningAiAudio } from "@/hooks/useListeningAiAudio";

type AccentKey = "en-GB" | "en-US" | "en-AU";
const ACCENT_LABELS: Record<AccentKey, string> = {
  "en-GB": "🇬🇧 UK",
  "en-US": "🇺🇸 US",
  "en-AU": "🇦🇺 AU",
};

interface ExplainResult {
  quote?: string;
  keyword?: string;
  why?: string;
  trap?: string;
  tip?: string;
  error?: string;
}

const formatTime = (sec: number) => {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const sectionColor = (s: number) => {
  switch (s) {
    case 1: return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    case 2: return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";
    case 3: return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
    default: return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
  }
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,!?;:"']/g, "");

/**
 * Controlled mode: used by the Full Test engine so one parent owns the
 * answers of all 4 sections (40 questions), the timer, submission and scoring.
 */
export interface ListeningControlledMode {
  answers: Record<number, string>;
  setAnswers: (updater: (prev: Record<number, string>) => Record<number, string>) => void;
  submitted: boolean;
  /** Number the questions continuously across sections (Q1-Q40). */
  numberOffset: number;
  /** Force exam mode on (single play, no seek/script) and hide the toggle. */
  forceExamMode?: boolean;
}

interface Props {
  set: ListeningPracticeSet;
  hideHeader?: boolean;
  controlled?: ListeningControlledMode;
}

const ListeningPracticeSetCard = ({ set: s, hideHeader, controlled }: Props) => {
  const { t, lang } = useLanguage();
  const [localAnswers, setLocalAnswers] = useState<Record<number, string>>({});
  const [localSubmitted, setLocalSubmitted] = useState(false);
  const answers = controlled ? controlled.answers : localAnswers;
  const setAnswers = controlled ? controlled.setAnswers : setLocalAnswers;
  const submitted = controlled ? controlled.submitted : localSubmitted;
  const setSubmitted = setLocalSubmitted;
  const numberOffset = controlled?.numberOffset ?? 0;
  const [showTranscript, setShowTranscript] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  // Slower, more natural default - matches real exam pacing.
  const [rate, setRate] = useState(s.rate ?? 0.85);
  const chunkTimerRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);
  const generationRef = useRef(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [elapsedInChunk, setElapsedInChunk] = useState(0);
  const chunkStartedAtRef = useRef<number>(0);
  const tickRef = useRef<number | null>(null);
  const pausedAccumRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);

  // --- New: accent picker (UK/US/AU) ---
  const [accent, setAccent] = useState<AccentKey>(() => {
    if (typeof window === "undefined") return "en-GB";
    return (localStorage.getItem("ielts-listening-accent") as AccentKey) || "en-GB";
  });
  useEffect(() => { localStorage.setItem("ielts-listening-accent", accent); }, [accent]);

  // --- New: exam mode (mô phỏng phòng thi: 1 lần phát, ẩn transcript & seek) ---
  const [examMode, setExamMode] = useState(!!controlled?.forceExamMode);

  // --- New: AI explain per wrong question ---
  const [explainOpen, setExplainOpen] = useState<Record<number, boolean>>({});
  const [explainData, setExplainData] = useState<Record<number, ExplainResult>>({});
  const [explainLoading, setExplainLoading] = useState<Record<number, boolean>>({});

  // --- New: auto-save key ---
  const saveKey = `ielts-listening-progress::${s.id}`;
  const [restoredOnce, setRestoredOnce] = useState(false);


  // Split the transcript into speaker turns (one transcript line = one turn) and,
  // inside each turn, into sentences used for on-screen highlighting and for the
  // device voice. AI audio is generated per turn so each voice stays continuous.
  const { chunks, chunkTurn, turnFirstChunk, turns } = useMemo(() => {
    const lines = s.transcript.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const outChunks: string[] = [];
    const outTurnOf: number[] = [];
    const firstChunk: number[] = [];
    lines.forEach((line, turnIdx) => {
      firstChunk[turnIdx] = outChunks.length;
      const parts = line.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) ?? [line];
      let added = 0;
      for (const p of parts) {
        const trimmed = p.trim();
        if (trimmed) { outChunks.push(trimmed); outTurnOf.push(turnIdx); added++; }
      }
      if (!added) { outChunks.push(line); outTurnOf.push(turnIdx); }
    });
    return { chunks: outChunks, chunkTurn: outTurnOf, turnFirstChunk: firstChunk, turns: lines };
  }, [s.transcript]);

  /** Speaker label that owns a chunk (inherited from the last tagged line). */
  const speakerAt = useCallback((idx: number): string | null => {
    for (let i = idx; i >= 0; i--) {
      const m = chunks[i]?.match(/^([A-Z][a-zA-Z]{1,20}):/);
      if (m) return m[1];
    }
    return null;
  }, [chunks]);

  // Turns handed to the AI voice service (speaker label stripped from the text).
  const audioLines = useMemo(
    () => turns.map((line, i) => ({
      i,
      speaker: speakerAt(turnFirstChunk[i] ?? 0),
      text: line.replace(/^([A-Z][a-zA-Z]{1,20}):\s*/, ""),
    })),
    [turns, turnFirstChunk, speakerAt]
  );

  // AI exam voices are always used; the device voice is only a silent fallback.
  const ai = useListeningAiAudio(s.id, s.section, audioLines);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const aiPlayingRef = useRef(false);
  const refreshedRef = useRef(false);
  const [preparing, setPreparing] = useState(false);
  const preparingRef = useRef(false);
  // Real duration of each AI turn file, read from the playing audio element.
  const [turnDur, setTurnDur] = useState<Record<number, number>>({});
  /** AI files are recorded at the default pace; the speed picker is relative. */
  const BASE_RATE = s.rate ?? 0.85;
  const aiRate = Math.max(0.5, Math.min(1.6, rate / BASE_RATE));
  const aiMode = !ai.failed;

  useEffect(() => { setTurnDur({}); }, [s.id]);

  /** Stop and unwire the current audio element so stale events cannot replay it. */
  const detachAudio = useCallback(() => {
    const el = audioElRef.current;
    if (!el) return;
    el.onended = null;
    el.onerror = null;
    el.onloadedmetadata = null;
    try { el.pause(); } catch { /* noop */ }
    audioElRef.current = null;
  }, []);

  // Estimate per-chunk duration (speak time + trailing gap) in seconds.
  // Baseline ~160 wpm at rate=1.0 → ~0.375s/word; account for spelling slowdown + gap.
  const estimateSpoken = useCallback((text: string, unitRate: number) => {
    const words = text.trim().split(/\s+/).length;
    const isSpelling = /(?:\b[A-Z](?:[-\s][A-Z]){2,}\b)|(?:\b\d{4,}\b)/.test(text);
    const effRate = isSpelling ? Math.min(unitRate, 0.55) : unitRate;
    return (words * 0.38) / Math.max(effRate, 0.3);
  }, []);

  const chunkDurations = useMemo(() => {
    return chunks.map((c, i) => {
      const next = chunks[i + 1] ?? "";
      const isDialogueChange = /^[A-Z][a-z]+:/.test(next) && !/^[A-Z][a-z]+:/.test(c);
      const isSpelling = /(?:\b[A-Z](?:[-\s][A-Z]){2,}\b)|(?:\b\d{4,}\b)/.test(c);
      const gapMs = isSpelling ? 900 : isDialogueChange ? 700 : /[?!]$/.test(c) ? 550 : 420;
      return estimateSpoken(c, rate) + gapMs / 1000;
    });
  }, [chunks, rate, estimateSpoken]);

  /** Gap after a turn: a bit longer when the speaker changes. */
  const turnGap = useCallback((turnIdx: number) => {
    const cur = speakerAt(turnFirstChunk[turnIdx] ?? 0);
    const next = turnIdx + 1 < turns.length ? speakerAt(turnFirstChunk[turnIdx + 1] ?? 0) : cur;
    return cur !== next ? 0.65 : 0.4;
  }, [speakerAt, turnFirstChunk, turns.length]);

  const turnDurations = useMemo(
    () => turns.map((line, i) => {
      const measured = turnDur[i];
      const spoken = measured ? measured / aiRate : estimateSpoken(line, rate);
      return spoken + turnGap(i);
    }),
    [turns, turnDur, aiRate, rate, estimateSpoken, turnGap]
  );

  // The timeline follows whichever engine is actually playing.
  const unitDurations = aiMode ? turnDurations : chunkDurations;
  const currentUnit = aiMode ? (chunkTurn[currentIdx] ?? 0) : currentIdx;

  const cumulative = useMemo(() => {
    const arr: number[] = [0];
    for (let i = 0; i < unitDurations.length - 1; i++) arr.push(arr[i] + unitDurations[i]);
    return arr;
  }, [unitDurations]);
  const totalDuration = useMemo(
    () => unitDurations.reduce((a, b) => a + b, 0),
    [unitDurations]
  );
  const currentTime = Math.min(totalDuration, (cumulative[currentUnit] ?? 0) + elapsedInChunk);

  const stopTick = () => {
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
  };
  const startTick = () => {
    stopTick();
    tickRef.current = window.setInterval(() => {
      const el = audioElRef.current;
      if (aiPlayingRef.current && el) {
        if (el.paused) return;
        setElapsedInChunk(el.currentTime / (el.playbackRate || 1));
        return;
      }
      if (pausedAtRef.current != null) return;
      const now = performance.now();
      const e = (now - chunkStartedAtRef.current - pausedAccumRef.current) / 1000;
      setElapsedInChunk(Math.max(0, e));
    }, 200) as unknown as number;
  };

  useEffect(() => {
    return () => {
      try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
      if (chunkTimerRef.current) window.clearTimeout(chunkTimerRef.current);
      stopTick();
    };
  }, []);

  // ---------- Multi-voice engine ----------
  // Build an ordered pool of English voices for the chosen accent, sorted by
  // "natural/neural/premium" preference so dialogues use the most expressive
  // voices the OS provides.
  const voicePool = useMemo(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [] as SpeechSynthesisVoice[];
    const voices = window.speechSynthesis.getVoices();
    const re = new RegExp(accent.replace("-", "[-_]"), "i");
    const enFallback = voices.filter(v => v.lang?.toLowerCase().startsWith("en"));
    const matched = voices.filter(v => re.test(v.lang));
    const pool = (matched.length ? matched : enFallback).slice();
    pool.sort((a, b) => {
      const score = (n: string) => /natural|premium|neural|enhanced|online/i.test(n) ? 0 : 1;
      return score(a.name) - score(b.name);
    });
    return pool;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent, playing]);

  // The Web Speech API does not expose gender, so we infer from common voice-name tokens.
  const FEMALE_HINTS = /(female|woman|samantha|victoria|karen|tessa|moira|fiona|kate|serena|allison|ava|susan|zira|hazel|amelia|sonia|libby|natasha|emma|emily|olivia|aria|jenny|nora|isabella|anna|chloe|sarah|catherine|elizabeth)/i;
  const MALE_HINTS   = /(\bmale\b|\bman\b|daniel|alex|fred|oliver|ralph|tom|george|guy|brian|david|mark|aaron|james|rishi|liam|harry|matthew|noah|ethan|william|christopher|wayne|arthur|simon)/i;

  const pickVoiceFor = (gender: "female" | "male" | "neutral", seed: number): SpeechSynthesisVoice | undefined => {
    if (!voicePool.length) return undefined;
    const matches = voicePool.filter(v =>
      gender === "female" ? FEMALE_HINTS.test(v.name)
      : gender === "male" ? MALE_HINTS.test(v.name) && !FEMALE_HINTS.test(v.name)
      : true
    );
    const list = matches.length ? matches : voicePool;
    return list[seed % list.length];
  };

  // Female / male name hints used in our listening scripts.
  const FEMALE_NAMES = /^(anna|sarah|chloe|emma|lisa|mary|jane|kate|sophie|olivia|amelia|sophia|grace|lily|mia|ava|ella|zoe|julia|maria|hannah|laura|emily|alice|nora|rachel|claire|hannah|woman)$/i;
  const MALE_NAMES = /^(ben|daniel|tom|john|mark|david|james|harry|jack|peter|paul|michael|alex|robert|matthew|noah|oliver|ethan|liam|william|simon|chris|adam|sam|guide|interviewer|professor|lecturer|tutor|man)$/i;

  const speakerProfile = (name: string | null, idxSeed: number) => {
    if (!name) return { gender: "neutral" as const, pitch: 1.0, rateMul: 1.0, seed: 7 };
    const lower = name.trim().toLowerCase();
    let gender: "female" | "male" | "neutral" = "neutral";
    if (FEMALE_NAMES.test(lower)) gender = "female";
    else if (MALE_NAMES.test(lower)) gender = "male";
    else {
      let h = 0;
      for (let i = 0; i < lower.length; i++) h = (h * 31 + lower.charCodeAt(i)) >>> 0;
      gender = h % 2 === 0 ? "female" : "male";
    }
    let nameSeed = 0;
    for (let i = 0; i < lower.length; i++) nameSeed = (nameSeed * 17 + lower.charCodeAt(i)) >>> 0;
    const pitchOffset = ((nameSeed % 5) - 2) * 0.06; // -0.12..+0.12
    const rateOffset = ((nameSeed % 3) - 1) * 0.03;  // -0.03..+0.03
    return {
      gender,
      pitch: 1.0 + pitchOffset + (gender === "female" ? 0.14 : gender === "male" ? -0.1 : 0),
      rateMul: 1.0 + rateOffset,
      seed: nameSeed + idxSeed,
    };
  };

  const finishPlayback = useCallback(() => {
    aiPlayingRef.current = false;
    setPlaying(false);
    setPaused(false);
    setCurrentIdx(0);
    setElapsedInChunk(0);
    stopTick();
  }, []);

  /**
   * Device-voice playback. `stopBefore` + `onDone` let a single speaker turn be
   * spoken by the device when its AI file is unavailable.
   */
  const speakChunks = useCallback((startIdx: number, gen: number, stopBefore?: number, onDone?: () => void) => {
    if (cancelledRef.current || gen !== generationRef.current) return;
    if (startIdx >= (stopBefore ?? chunks.length)) {
      if (onDone) onDone(); else finishPlayback();
      return;
    }
    aiPlayingRef.current = false;
    setCurrentIdx(startIdx);
    setElapsedInChunk(0);
    chunkStartedAtRef.current = performance.now();
    pausedAccumRef.current = 0;
    pausedAtRef.current = null;

    const raw = chunks[startIdx];

    // Extract speaker tag like "Anna:" / "Tutor:" so we can route to a distinct voice.
    const speakerMatch = raw.match(/^([A-Z][a-zA-Z]{1,20}):\s*([\s\S]+)$/);
    let speakerName = speakerMatch ? speakerMatch[1] : null;
    const spokenBody = speakerMatch ? speakerMatch[2] : raw;
    // Inherit the most recent speaker tag so a Section 2 monologue tagged once
    // (e.g. "Guide: ...") keeps the same characterful voice across all lines.
    if (!speakerName) {
      for (let i = startIdx - 1; i >= 0; i--) {
        const m = chunks[i].match(/^([A-Z][a-zA-Z]{1,20}):/);
        if (m) { speakerName = m[1]; break; }
      }
    }

    const isSpelling = /(?:\b[A-Z](?:[-\s][A-Z]){2,}\b)|(?:\b(?:zero|one|two|three|four|five|six|seven|eight|nine|oh|double|triple)(?:[\s,-]+(?:zero|one|two|three|four|five|six|seven|eight|nine|oh|double|triple)){2,}\b)|(?:\b\d{4,}\b)/i.test(spokenBody);
    const text = isSpelling
      ? spokenBody.replace(/-/g, ", ").replace(/\b([A-Z])\b/g, "$1,")
      : spokenBody;

    const prev = chunks[startIdx - 1] ?? "";
    const prevSpeaker = prev.match(/^([A-Z][a-zA-Z]+):/)?.[1] ?? null;
    const isSpeakerSwitch = speakerName && prevSpeaker && speakerName !== prevSpeaker;
    const isDialogueChange = startIdx > 0 && !!speakerName && !prevSpeaker;
    const gapMs = isSpelling ? 900
      : isSpeakerSwitch ? 650
      : isDialogueChange ? 700
      : /[?!]$/.test(prev) ? 550
      : 420;
    const advance = () => {
      if (cancelledRef.current || gen !== generationRef.current) return;
      chunkTimerRef.current = window.setTimeout(() => speakChunks(startIdx + 1, gen, stopBefore, onDone), gapMs);
    };

    if (typeof window === "undefined" || !("speechSynthesis" in window)) { advance(); return; }
    const profile = speakerProfile(speakerName, startIdx);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = accent;
    const baseRate = isSpelling ? Math.min(rate, 0.55) : rate;
    u.rate = Math.max(0.3, Math.min(1.5, baseRate * profile.rateMul));
    const endsWithQ = /\?\s*$/.test(text);
    const endsWithE = /!\s*$/.test(text);
    u.pitch = Math.max(0.5, Math.min(2.0,
      profile.pitch + (endsWithQ ? 0.15 : endsWithE ? 0.1 : 0)
    ));
    const v = pickVoiceFor(profile.gender, profile.seed);
    if (v) u.voice = v;
    u.onend = advance;
    // A failed utterance must not kill the recording - move to the next sentence.
    u.onerror = advance;
    window.speechSynthesis.speak(u);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks, rate, accent, voicePool, finishPlayback]);

  /**
   * AI playback: one cached file per speaker turn, played in order. A turn whose
   * file is missing or broken is spoken by the device voice so the recording
   * always plays to the end.
   */
  const playTurns = useCallback((turnIdx: number, gen: number, offsetSec = 0) => {
    if (cancelledRef.current || gen !== generationRef.current) return;
    if (turnIdx >= turns.length) { finishPlayback(); return; }
    const firstChunk = turnFirstChunk[turnIdx] ?? 0;
    setCurrentIdx(firstChunk);
    setElapsedInChunk(offsetSec);

    // Drop the previous element completely so its old handlers can never fire
    // again and replay a turn that was already heard.
    detachAudio();

    // One outcome per turn: advance OR fall back, never both.
    let settled = false;

    const nextTurn = () => {
      if (settled) return;
      settled = true;
      if (cancelledRef.current || gen !== generationRef.current) return;
      chunkTimerRef.current = window.setTimeout(
        () => playTurns(turnIdx + 1, gen),
        turnGap(turnIdx) * 1000
      );
    };
    const deviceForThisTurn = () => {
      if (settled) return;
      settled = true;
      if (cancelledRef.current || gen !== generationRef.current) return;
      detachAudio();
      const stopBefore = turnFirstChunk[turnIdx + 1] ?? chunks.length;
      speakChunks(firstChunk, gen, stopBefore, () => {
        if (cancelledRef.current || gen !== generationRef.current) return;
        chunkTimerRef.current = window.setTimeout(
          () => playTurns(turnIdx + 1, gen),
          turnGap(turnIdx) * 1000
        );
      });
    };

    const url = ai.getUrl(turnIdx);
    if (!url) { deviceForThisTurn(); return; }

    const el = new Audio();
    el.preload = "auto";
    audioElRef.current = el;
    aiPlayingRef.current = true;
    el.onended = nextTurn;
    el.onloadedmetadata = () => {
      if (Number.isFinite(el.duration)) {
        setTurnDur(prev => (prev[turnIdx] ? prev : { ...prev, [turnIdx]: el.duration }));
      }
      if (offsetSec > 0) {
        el.currentTime = Math.max(0, Math.min(el.duration - 0.2, offsetSec * aiRate));
      }
    };
    el.onerror = async () => {
      if (settled || cancelledRef.current || gen !== generationRef.current) return;
      // Signed URLs expire; ask for a fresh batch once, then fall back.
      if (!refreshedRef.current) {
        refreshedRef.current = true;
        const ok = await ai.refresh();
        if (ok && !cancelledRef.current && gen === generationRef.current) {
          settled = true;
          playTurns(turnIdx, gen, offsetSec);
          return;
        }
      }
      deviceForThisTurn();
    };
    el.src = url;
    el.playbackRate = aiRate;
    el.play().catch((err: unknown) => {
      // A play() rejected because we moved on (or the tab blocked autoplay) is
      // not a broken file - re-reading the turn here is what caused doubles.
      const name = (err as { name?: string } | null)?.name;
      if (name === "AbortError" || name === "NotAllowedError") return;
      deviceForThisTurn();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turns.length, turnFirstChunk, chunks.length, turnGap, aiRate, ai, speakChunks, finishPlayback, detachAudio]);

  /**
   * Start playback from a chunk. In AI mode the whole recording is downloaded
   * first so the voices never change part way through.
   */
  const speak = async (fromIdx = 0, offsetSec = 0) => {
    // Only one playback stream at a time; a second request while the recording
    // is still downloading would read the same lines twice.
    if (preparingRef.current) return;
    if (chunkTimerRef.current) window.clearTimeout(chunkTimerRef.current);
    try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
    detachAudio();
    generationRef.current++;
    cancelledRef.current = true;

    let aiOk = false;
    if (!ai.failed) {
      preparingRef.current = true;
      setPreparing(true);
      aiOk = ai.ready || (await ai.prepare());
      preparingRef.current = false;
      setPreparing(false);
    }

    const gen = ++generationRef.current;
    cancelledRef.current = false;
    refreshedRef.current = false;
    setPlaying(true);
    setPaused(false);
    startTick();
    if (aiOk) {
      playTurns(chunkTurn[fromIdx] ?? 0, gen, offsetSec);
      return;
    }
    // Small delay helps Safari accept speak() right after cancel().
    aiPlayingRef.current = false;
    window.setTimeout(() => speakChunks(fromIdx, gen), 60);
  };

  const togglePause = () => {
    if (typeof window === "undefined") return;
    const el = audioElRef.current;
    if (paused) {
      // Resume where the audio stopped - AI files resume exactly, no restart.
      if (aiPlayingRef.current && el) {
        cancelledRef.current = false;
        setPaused(false);
        setPlaying(true);
        startTick();
        el.play().catch(() => { /* noop */ });
        return;
      }
      const gen = ++generationRef.current;
      cancelledRef.current = false;
      try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
      setPaused(false);
      setPlaying(true);
      startTick();
      window.setTimeout(() => speakChunks(currentIdx, gen), 80);
    } else {
      if (chunkTimerRef.current) {
        window.clearTimeout(chunkTimerRef.current);
        chunkTimerRef.current = null;
      }
      if (aiPlayingRef.current && el) {
        // Keep the generation valid so onended/resume still belong to this run.
        try { el.pause(); } catch { /* noop */ }
        stopTick();
        setPaused(true);
        setPlaying(false);
        return;
      }
      generationRef.current++;
      cancelledRef.current = true;
      try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
      stopTick();
      setPaused(true);
      setPlaying(false);
    }
  };


  const stop = () => {
    cancelledRef.current = true;
    generationRef.current++;
    if (chunkTimerRef.current) window.clearTimeout(chunkTimerRef.current);
    window.speechSynthesis?.cancel();
    aiPlayingRef.current = false;
    detachAudio();
    stopTick();
    setPlaying(false);
    setPaused(false);
    setCurrentIdx(0);
    setElapsedInChunk(0);
  };

  // Seek to a time (seconds); units are speaker turns in AI mode, sentences otherwise.
  const seekToTime = (timeSec: number) => {
    if (!chunks.length) return;
    let unit = 0;
    for (let i = 0; i < cumulative.length; i++) {
      if (cumulative[i] <= timeSec) unit = i; else break;
    }
    const offset = Math.max(0, timeSec - (cumulative[unit] ?? 0));
    const chunkIdx = aiMode ? (turnFirstChunk[unit] ?? 0) : unit;
    if (playing) {
      speak(chunkIdx, aiMode ? offset : 0);
    } else {
      setCurrentIdx(chunkIdx);
      setElapsedInChunk(aiMode ? offset : 0);
    }
  };

  const skipChunks = (delta: number) => {
    if (aiMode) {
      const unit = Math.max(0, Math.min(turns.length - 1, (chunkTurn[currentIdx] ?? 0) + delta));
      const target = turnFirstChunk[unit] ?? 0;
      if (playing) speak(target);
      else { setCurrentIdx(target); setElapsedInChunk(0); }
      return;
    }
    const target = Math.max(0, Math.min(chunks.length - 1, currentIdx + delta));
    if (playing) speak(target);
    else { setCurrentIdx(target); setElapsedInChunk(0); }
  };


  const isCorrect = (qIdx: number): boolean => {
    const q = s.questions[qIdx];
    const userAns = (answers[qIdx] ?? "").toString();
    if (!userAns) return false;
    if (q.type === "mcq") return Number(userAns) === q.answer;
    return normalize(userAns) === normalize(q.answer);
  };

  const score = useMemo(
    () => s.questions.reduce((acc, _q, i) => acc + (isCorrect(i) ? 1 : 0), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, submitted]
  );
  const percent = Math.round((score / s.questions.length) * 100);

  const band = useMemo(() => ieltsListeningBand(score, s.questions.length), [score, s.questions.length]);

  // --- Auto-save (debounced) - only in standalone mode; the Full Test engine
  //     persists the whole 40-question attempt itself. ---
  useEffect(() => {
    if (controlled || !restoredOnce) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(saveKey, JSON.stringify({ answers, submitted, examMode, ts: Date.now() }));
      } catch { /* noop */ }
    }, 400);
    return () => window.clearTimeout(id);
  }, [answers, submitted, examMode, saveKey, restoredOnce, controlled]);

  // --- Restore on mount (standalone only) ---
  useEffect(() => {
    if (controlled) { setRestoredOnce(true); return; }
    try {
      const raw = localStorage.getItem(saveKey);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.answers && typeof data.answers === "object") setLocalAnswers(data.answers);
        if (data?.submitted) setSubmitted(true);
        if (data?.examMode) setExamMode(true);
      }
    } catch { /* noop */ }
    setRestoredOnce(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In controlled mode, submitting the full test stops audio and reveals script.
  useEffect(() => {
    if (!controlled?.submitted) return;
    setShowTranscript(true);
    cancelledRef.current = true;
    generationRef.current++;
    try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
    setPlaying(false);
    setPaused(false);
  }, [controlled?.submitted]);

  const handleReset = () => {
    setAnswers(() => ({}));

    setSubmitted(false);
    setShowTranscript(false);
    setExplainOpen({});
    setExplainData({});
    try { localStorage.removeItem(saveKey); } catch { /* noop */ }
    stop();
  };

  // --- AI explain a wrong question ---
  const requestExplain = async (qIdx: number) => {
    const q = s.questions[qIdx];
    setExplainOpen(o => ({ ...o, [qIdx]: true }));
    if (explainData[qIdx] && !explainData[qIdx].error) return;
    setExplainLoading(l => ({ ...l, [qIdx]: true }));
    try {
      const userAns = answers[qIdx] ?? "";
      const correctAnswer = q.type === "mcq" ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}` : q.answer;
      const userPretty = q.type === "mcq" && userAns !== ""
        ? `${String.fromCharCode(65 + Number(userAns))}. ${q.options[Number(userAns)] ?? ""}`
        : String(userAns);
      const { data, error } = await supabase.functions.invoke("explain-ielts-listening", {
        body: {
          transcript: s.transcript,
          question: q.prompt,
          correctAnswer,
          userAnswer: userPretty,
          questionType: s.questionType,
          language: lang,
        },
      });
      if (error) throw error;
      setExplainData(d => ({ ...d, [qIdx]: data as ExplainResult }));
    } catch (e) {
      console.error("explain-ielts-listening failed", e);
      setExplainData(d => ({ ...d, [qIdx]: { error: e instanceof Error ? e.message : "Failed" } }));
      toast({
        title: t("Không lấy được lời giải", "Could not fetch explanation"),
        description: t("Vui lòng thử lại sau vài giây.", "Please try again in a moment."),
        variant: "destructive",
      });
    } finally {
      setExplainLoading(l => ({ ...l, [qIdx]: false }));
    }
  };

  // Build a set of answer keywords for transcript highlighting after submit.
  const answerKeywords = useMemo(() => {
    if (!submitted) return [] as string[];
    const out: string[] = [];
    for (const q of s.questions) {
      if (q.type === "fill-in" && typeof q.answer === "string") {
        const cleaned = q.answer.replace(/[.,!?;:"']/g, "").trim();
        if (cleaned.length >= 2 && cleaned.length <= 40) out.push(cleaned);
      }
      if (q.type === "mcq") {
        const opt = q.options?.[q.answer];
        if (opt) {
          const w = opt.split(/\s+/).filter(x => x.length >= 4).slice(0, 2);
          out.push(...w);
        }
      }
    }
    return Array.from(new Set(out));
  }, [submitted, s.questions]);

  const highlightedTranscript = useMemo(() => {
    if (!submitted || answerKeywords.length === 0) {
      return s.transcript;
    }
    let html = s.transcript
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    for (const kw of answerKeywords) {
      const safe = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(
        new RegExp(`\\b(${safe})\\b`, "gi"),
        `<mark class="bg-yellow-300/70 dark:bg-yellow-500/40 rounded px-0.5 font-semibold">$1</mark>`
      );
    }
    return html;
  }, [submitted, answerKeywords, s.transcript]);

  return (
    <Card className="border-l-4 border-l-emerald-500 overflow-hidden">
      <CardContent className="p-5 sm:p-6 space-y-5">
        {!hideHeader && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", sectionColor(s.section))}>
                {t(`Phần ${s.section}`, `Section ${s.section}`)}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {lang === "vi" ? s.questionTypeVi : s.questionType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {s.questions.length} {t("câu", "questions")}
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {lang === "vi" ? s.titleVi : s.title}
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {lang === "vi" ? s.contextVi : s.context}
            </p>
          </div>
        )}
        {hideHeader && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={cn("text-xs", sectionColor(s.section))}>
              {t(`Phần ${s.section}`, `Section ${s.section}`)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {lang === "vi" ? s.questionTypeVi : s.questionType}
            </Badge>
            <span className="text-sm font-semibold text-foreground ml-1">
              {lang === "vi" ? s.titleVi : s.title}
            </span>
          </div>
        )}
        {hideHeader && (
          <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed -mt-2">
            {lang === "vi" ? s.contextVi : s.context}
          </p>
        )}

        {/* Audio controls */}
        <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Headphones className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold">{t("Bài nghe", "Audio")}</span>
            {!controlled?.forceExamMode && (
            <Badge
              variant={examMode ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-[10px] gap-1",
                examMode && "bg-rose-600 hover:bg-rose-700 text-white border-rose-600"
              )}
              onClick={() => {
                if (submitted) return;
                setExamMode(v => {
                  const next = !v;
                  if (next) { setShowTranscript(false); stop(); }
                  return next;
                });
              }}
              title={t("Mô phỏng phòng thi: 1 lần phát, ẩn script & thanh tua", "Exam mode: single play, hide script & seek bar")}
            >
              <ShieldAlert className="w-3 h-3" />
              {examMode ? t("Exam Mode • ON", "Exam Mode • ON") : t("Bật Exam Mode", "Enable Exam Mode")}
            </Badge>
            )}


            <span className="text-xs text-muted-foreground ml-auto inline-flex items-center gap-1">
              <Mic2 className="w-3 h-3 text-emerald-600" />
              {ai.loading || preparing
                ? t(
                    `Đang tải bản thu... ${Math.round(ai.progress * 100)}%`,
                    `Loading recording... ${Math.round(ai.progress * 100)}%`
                  )
                : ai.failed
                  ? t("Đang dùng giọng máy dự phòng", "Using device voice fallback")
                  : t("Đa giọng - mỗi nhân vật một voice riêng", "Multi-voice - distinct voice per speaker")}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!playing ? (
              <Button onClick={() => speak(currentIdx)} size="sm" className="gap-2" disabled={preparing || ai.loading}>
                <Play className="w-4 h-4" />
                {preparing || ai.loading
                  ? t("Đang tải...", "Loading...")
                  : currentIdx > 0 ? t("Tiếp tục", "Resume") : t("Phát", "Play")}
              </Button>
            ) : (
              <>
                <Button onClick={togglePause} size="sm" variant="secondary" className="gap-2">
                  {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {paused ? t("Tiếp tục", "Resume") : t("Tạm dừng", "Pause")}
                </Button>
                <Button onClick={stop} size="sm" variant="outline" className="gap-2">
                  <Square className="w-4 h-4" /> {t("Dừng", "Stop")}
                </Button>
              </>
            )}
            {!examMode && (
              <>
                <Button
                  onClick={() => skipChunks(-1)}
                  size="sm"
                  variant="outline"
                  className="gap-1 px-2"
                  title={t("Lùi 1 câu", "Previous sentence")}
                  disabled={currentIdx <= 0 && elapsedInChunk < 0.5}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => skipChunks(1)}
                  size="sm"
                  variant="outline"
                  className="gap-1 px-2"
                  title={t("Tới 1 câu", "Next sentence")}
                  disabled={aiMode
                    ? (chunkTurn[currentIdx] ?? 0) >= turns.length - 1
                    : currentIdx >= chunks.length - 1}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </>
            )}
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <Mic2 className="w-4 h-4 text-muted-foreground" />
              <select
                value={accent}
                onChange={(e) => setAccent(e.target.value as AccentKey)}
                className="text-xs bg-background border border-border rounded px-2 py-1"
                title={t("Giọng đọc", "Accent")}
              >
                {(Object.keys(ACCENT_LABELS) as AccentKey[]).map(a => (
                  <option key={a} value={a}>{ACCENT_LABELS[a]}</option>
                ))}
              </select>
              {!examMode && (
                <>
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="text-xs bg-background border border-border rounded px-2 py-1"
                    title={t("Tốc độ phát", "Playback speed")}
                  >
                    <option value={0.7}>0.7x - {t("rất chậm", "very slow")}</option>
                    <option value={0.85}>0.85x - {t("tự nhiên", "natural")}</option>
                    <option value={0.95}>0.95x - {t("đề thi thật", "exam pace")}</option>
                    <option value={1.1}>1.1x - {t("nhanh", "fast")}</option>
                  </select>

                  <Button onClick={() => setShowTranscript(v => !v)} size="sm" variant="ghost" className="gap-2">
                    {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showTranscript ? t("Ẩn script", "Hide script") : t("Hiện script", "Show script")}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Seekable progress bar - hidden during exam mode to mimic real test */}
          {!examMode && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-mono text-muted-foreground tabular-nums w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[Math.min(currentTime, totalDuration)]}
                min={0}
                max={Math.max(1, totalDuration)}
                step={0.5}
                onValueChange={(v) => {
                  const t0 = v[0] ?? 0;
                  let unit = 0;
                  for (let i = 0; i < cumulative.length; i++) {
                    if (cumulative[i] <= t0) unit = i; else break;
                  }
                  setCurrentIdx(aiMode ? (turnFirstChunk[unit] ?? 0) : unit);
                  setElapsedInChunk(Math.max(0, t0 - (cumulative[unit] ?? 0)));
                }}
                onValueCommit={(v) => seekToTime(v[0] ?? 0)}
                className="flex-1"
                aria-label={t("Thanh tua bài nghe", "Audio seek bar")}
              />
              <span className="text-xs font-mono text-muted-foreground tabular-nums w-10">
                {formatTime(totalDuration)}
              </span>
            </div>
          )}

          {/* In exam mode show only elapsed time */}
          {examMode && playing && (
            <div className="text-xs font-mono text-muted-foreground tabular-nums">
              ⏱ {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>
          )}

          {showTranscript && (
            <div className="mt-2 rounded-lg bg-background border border-border overflow-hidden">
              <div className="px-3 py-1.5 bg-muted/60 text-xs font-semibold text-foreground border-b border-border">
                {submitted
                  ? t("📝 Script - đáp án được tô vàng", "📝 Transcript - answers highlighted")
                  : t("📝 Script bài nghe", "📝 Listening transcript")}
              </div>
              <div
                className="p-3 text-sm whitespace-pre-line leading-relaxed text-foreground/90 max-h-80 overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(highlightedTranscript, {
                    ALLOWED_TAGS: ["mark", "br", "strong", "em"],
                    ALLOWED_ATTR: ["class"],
                  }),
                }}
              />
            </div>
          )}

        </div>

        {s.mapSvg && (
          <div className="rounded-lg bg-white border-2 border-emerald-500/40 p-3 overflow-x-auto">
            <p className="text-xs font-semibold mb-2 text-emerald-700">
              {t("🗺️ Bản đồ / sơ đồ tham khảo", "🗺️ Map / Plan reference")}
            </p>
            <div
              className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(s.mapSvg, {
                  USE_PROFILES: { svg: true, svgFilters: true },
                }),
              }}
            />
          </div>
        )}

        {s.matchingOptions && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
            <p className="text-xs font-semibold mb-2 text-primary">
              {t("Danh sách lựa chọn", "Answer key (letters)")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {s.matchingOptions.map(o => (
                <div key={o.letter} className="flex items-center gap-2">
                  <span className="font-bold text-primary w-6">{o.letter}.</span>
                  <span>{o.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cambridge-style form / notes layout (Section 1) */}
        {s.formLayout && (
          <div className="rounded-lg border-2 border-emerald-600/40 bg-amber-50/40 dark:bg-amber-950/10 overflow-hidden shadow-sm">
            {s.formTitle && (
              <div className="bg-emerald-700/90 text-white px-4 py-2 text-xs sm:text-sm font-bold tracking-wider uppercase">
                {s.formTitle}
              </div>
            )}
            <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-relaxed text-foreground space-y-1.5">
              {s.formLayout.split("\n").map((line, li) => {
                // Split each line by {N} placeholders so we can render an inline input.
                const parts = line.split(/(\{\d+\})/g);
                return (
                  <div key={li} className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                    {parts.map((part, pi) => {
                      const m = part.match(/^\{(\d+)\}$/);
                      if (!m) {
                        // Preserve indentation by rendering &nbsp; for leading spaces.
                        return (
                          <span key={pi} className="whitespace-pre-wrap">
                            {part}
                          </span>
                        );
                      }
                      const qIdx = parseInt(m[1], 10) - 1;
                      const q = s.questions[qIdx];
                      if (!q || q.type !== "fill-in") {
                        return <span key={pi} className="text-rose-600">[{part}]</span>;
                      }
                      const correct = submitted && isCorrect(qIdx);
                      const wrong = submitted && !isCorrect(qIdx);
                      return (
                        <span key={pi} className="inline-flex items-center gap-1">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-5 h-5 inline-flex items-center justify-center">
                            {qIdx + 1 + numberOffset}
                          </span>
                          <Input
                            value={answers[qIdx] ?? ""}
                            onChange={(e) => setAnswers(a => ({ ...a, [qIdx]: e.target.value }))}
                            disabled={submitted}
                            placeholder="..........."
                            className={cn(
                              "h-7 text-sm w-32 sm:w-40 px-2 border-0 border-b-2 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-emerald-600",
                              correct && "border-emerald-500 text-emerald-700",
                              wrong && "border-rose-500 text-rose-700",
                              !submitted && "border-emerald-700/40"
                            )}
                          />
                        </span>
                      );
                    })}
                  </div>
                );
              })}
              {submitted && (
                <div className="mt-3 pt-3 border-t border-emerald-700/30 text-xs space-y-1 font-sans">
                  {s.questions.map((q, i) => {
                    if (q.type !== "fill-in") return null;
                    const ok = isCorrect(i);
                    if (ok) return null;
                    return (
                      <div key={i} className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                        <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>
                          <strong>Q{i + 1 + numberOffset}:</strong> {t("Đáp án đúng", "Correct answer")}:{" "}
                          <strong className="font-mono">{q.answer}</strong>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {(s.formLayout
            ? s.questions.map((q, i) => ({ q, i })).filter(({ q }) => q.type !== "fill-in")
            : s.questions.map((q, i) => ({ q, i }))
          ).map(({ q, i }) => {
            const correct = submitted && isCorrect(i);
            const wrong = submitted && !isCorrect(i);
            return (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-3 sm:p-4 transition-colors",
                  correct && "border-emerald-500/50 bg-emerald-500/5",
                  wrong && "border-rose-500/50 bg-rose-500/5",
                  !submitted && "border-border bg-background"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {i + 1 + numberOffset}
                  </span>
                  <div className="flex-1 space-y-2 min-w-0">
                    <p className="text-sm sm:text-base text-foreground">{q.prompt}</p>
                    {q.type === "mcq" && (
                      <div className="space-y-1.5">
                        {q.options.map((opt, oi) => (
                          <label
                            key={oi}
                            className={cn(
                              "flex items-start gap-2 p-2 rounded cursor-pointer hover:bg-muted/40 transition-colors",
                              answers[i] === String(oi) && "bg-primary/10"
                            )}
                          >
                            <input
                              type="radio"
                              name={`q-${s.id}-${i}`}
                              checked={answers[i] === String(oi)}
                              onChange={() => setAnswers(a => ({ ...a, [i]: String(oi) }))}
                              disabled={submitted}
                              className="mt-1"
                            />
                            <span className="text-sm">
                              <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                    {(q.type === "fill-in" || q.type === "matching") && (
                      <Input
                        value={answers[i] ?? ""}
                        onChange={(e) => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                        disabled={submitted}
                        placeholder={
                          q.type === "matching"
                            ? t("Nhập chữ cái (A, B, C...)", "Enter letter (A, B, C...)")
                            : t("Nhập đáp án", "Type your answer")
                        }
                        className="max-w-md"
                      />
                    )}
                    {submitted && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-start gap-2 text-sm">
                          {correct ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                              <span className="text-emerald-700 dark:text-emerald-300">
                                {t("Đúng!", "Correct!")}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                              <span className="text-rose-700 dark:text-rose-300">
                                {t("Đáp án đúng:", "Correct answer:")}{" "}
                                <strong>
                                  {q.type === "mcq"
                                    ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`
                                    : q.answer}
                                </strong>
                              </span>
                            </>
                          )}
                        </div>

                        {!correct && (
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => requestExplain(i)}
                              disabled={explainLoading[i]}
                              className="gap-2 h-8 text-xs border-primary/40 text-primary hover:bg-primary/5"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              {explainLoading[i]
                                ? t("Đang phân tích...", "Analyzing...")
                                : explainOpen[i]
                                  ? t("Xem lại lời giải AI", "Review AI explanation")
                                  : t("Mr. Hai giải thích vì sao", "Why? Ask Mr. Hai")}
                            </Button>

                            {explainOpen[i] && explainData[i] && !explainData[i].error && (
                              <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2 text-sm">
                                {explainData[i].quote && (
                                  <div>
                                    <div className="text-[10px] font-semibold uppercase text-primary mb-0.5">
                                      {t("Câu chứa đáp án trong script", "Sentence in transcript")}
                                    </div>
                                    <div className="italic text-foreground/90 border-l-2 border-primary/60 pl-2">
                                      "{explainData[i].quote}"
                                      {explainData[i].keyword && (
                                        <span className="ml-2 inline-block rounded bg-yellow-300/70 dark:bg-yellow-500/40 px-1.5 font-semibold not-italic text-xs">
                                          🔑 {explainData[i].keyword}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                {explainData[i].why && (
                                  <div>
                                    <span className="text-[10px] font-semibold uppercase text-primary">{t("Vì sao", "Why")}: </span>
                                    <span className="text-foreground/90">{explainData[i].why}</span>
                                  </div>
                                )}
                                {explainData[i].trap && (
                                  <div>
                                    <span className="text-[10px] font-semibold uppercase text-rose-600">{t("Bẫy", "Trap")}: </span>
                                    <span className="text-foreground/90">{explainData[i].trap}</span>
                                  </div>
                                )}
                                {explainData[i].tip && (
                                  <div>
                                    <span className="text-[10px] font-semibold uppercase text-emerald-600">{t("Mẹo", "Tip")}: </span>
                                    <span className="text-foreground/90">{explainData[i].tip}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!controlled && (
        <div className="flex flex-wrap items-center gap-3 pt-2">

          {!submitted ? (
            <Button onClick={() => {
              setSubmitted(true);
              setShowTranscript(true);
              stop();
              // Log to RL pipeline — score = correct/total, band stored in metadata.
              pushListeningAttempt({ id: s.id, title: s.title, mode: "single", score, total: s.questions.length });
              logStudentActivity({
                activityType: "ielts_listening",
                activityId: s.id,
                score,
                maxScore: s.questions.length,
                metadata: {
                  setId: s.id,
                  section: s.section,
                  percent,
                  band,
                  total_questions: s.questions.length,
                },
              });
            }} className="gap-2">
              <CheckCircle2 className="w-4 h-4" /> {t("Nộp bài", "Submit answers")}
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-3 flex-1 min-w-[200px] flex-wrap">
                <span className="text-sm font-semibold whitespace-nowrap">
                  {t("Điểm", "Score")}: {score}/{s.questions.length}
                </span>
                <Progress value={percent} className="h-2 flex-1 max-w-xs min-w-[120px]" />
                <span className="text-sm font-bold text-primary">{percent}%</span>
                {s.questions.length >= 5 && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border",
                      bandColor(band),
                      "border-current bg-current/5"
                    )}
                    title={t(
                      "Quy đổi theo bảng IELTS chính thức (chuẩn hoá về thang 40 câu)",
                      "Estimated from official IELTS band chart (normalized to 40 questions)"
                    )}
                  >
                    📊 {t("Band ước tính", "Est. Band")}: {band.toFixed(1)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Save className="w-3 h-3" /> {t("Đã tự lưu", "Auto-saved")}
                </span>
              </div>
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try again")}
              </Button>
            </>
          )}
        </div>
        )}

      </CardContent>
    </Card>
  );
};

export default ListeningPracticeSetCard;
