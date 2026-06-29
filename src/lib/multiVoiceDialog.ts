/**
 * Multi-voice dialog playback for listening transcripts.
 * Uses Lovable AI Gateway (openai/gpt-4o-mini-tts) via the `dialog-tts` edge
 * function so each speaker sounds like a distinct, natural human voice instead
 * of the robotic system Web Speech API voices.
 *
 * Falls back to Web Speech API if the network request fails.
 */
import { supabase } from "@/integrations/supabase/client";

export type DialogLang = "en" | "zh";

interface DialogLine {
  speaker: string | null;
  text: string;
}

const SPEAKER_RE = /^\s*([\p{L}][\p{L}\p{N} _.''\-]{0,30}?)\s*[:：]\s*/u;

export function parseDialog(transcript: string): DialogLine[] {
  const rawLines = transcript.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const out: DialogLine[] = [];

  const pushSplit = (chunk: string) => {
    const inlineRe = /([\p{L}][\p{L}\p{N} _.''\-]{0,30}?)\s*[:：]\s*/gu;
    const matches: { index: number; speaker: string; end: number }[] = [];
    let m: RegExpExecArray | null;
    while ((m = inlineRe.exec(chunk))) {
      matches.push({ index: m.index, speaker: m[1].trim(), end: m.index + m[0].length });
    }
    if (matches.length === 0) {
      out.push({ speaker: null, text: chunk });
      return;
    }
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].end;
      const end = i + 1 < matches.length ? matches[i + 1].index : chunk.length;
      const text = chunk.slice(start, end).trim();
      if (text) out.push({ speaker: matches[i].speaker, text });
    }
  };

  for (const line of rawLines) {
    const single = line.match(SPEAKER_RE);
    if (single && !/[:：]/.test(line.slice(single[0].length))) {
      out.push({ speaker: single[1].trim(), text: line.slice(single[0].length).trim() });
    } else {
      pushSplit(line);
    }
  }
  return out;
}

// Diverse, natural OpenAI voices. Order picked for clear contrast between
// adjacent speakers (male/female alternation, different timbres).
const VOICE_PALETTE = ["nova", "onyx", "shimmer", "echo", "fable", "alloy", "sage", "ash"] as const;

function voiceForSpeaker(speaker: string | null, roster: string[]): string {
  const key = (speaker ?? "narrator").toLowerCase();
  let idx = roster.indexOf(key);
  if (idx < 0) {
    roster.push(key);
    idx = roster.length - 1;
  }
  // Bias: common labels get distinct, recognizable voices.
  if (/^(you|me|narrator|narator)$/.test(key)) return "nova";
  if (/^(hr|interviewer|host|teacher|boss|manager|david)$/.test(key)) return "onyx";
  if (/^(candidate|guest|student|customer|client)$/.test(key)) return "shimmer";
  if (/^speaker$/.test(key)) return "echo";
  return VOICE_PALETTE[idx % VOICE_PALETTE.length];
}

interface PlayOptions {
  rate?: number;
  onEnd?: () => void;
  onStart?: () => void;
  onError?: (err: unknown) => void;
}

let currentAudio: HTMLAudioElement | null = null;
let cancelToken = 0;

async function fetchLineAudio(text: string, voice: string, lang: DialogLang, speed: number): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke("dialog-tts", {
      body: { text, voice, lang, speed },
    });
    if (error || !data?.audioBase64) return null;
    return `data:${data.mimeType || "audio/mpeg"};base64,${data.audioBase64}`;
  } catch {
    return null;
  }
}

function playWebSpeechFallback(lines: DialogLine[], lang: DialogLang, options: PlayOptions) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const pitches = [1.05, 0.85, 1.2, 0.95, 1.1, 0.8];
  const roster: string[] = [];
  options.onStart?.();
  lines.forEach((line, i) => {
    const utt = new SpeechSynthesisUtterance(line.text);
    utt.lang = lang === "zh" ? "zh-CN" : "en-US";
    utt.rate = options.rate ?? 0.95;
    if (line.speaker) {
      const key = line.speaker.toLowerCase();
      let idx = roster.indexOf(key);
      if (idx < 0) { roster.push(key); idx = roster.length - 1; }
      utt.pitch = pitches[idx % pitches.length];
    }
    if (i === lines.length - 1) utt.onend = () => options.onEnd?.();
    synth.speak(utt);
  });
}

export async function playMultiVoiceDialog(
  transcript: string,
  lang: DialogLang,
  options: PlayOptions = {},
): Promise<void> {
  stopMultiVoiceDialog();
  const lines = parseDialog(transcript);
  if (!lines.length) return;

  const myToken = ++cancelToken;
  const speed = options.rate ?? 1.0;
  const roster: string[] = [];

  options.onStart?.();

  // Prefetch first line, then start playback while remaining lines fetch in parallel.
  const urls: (string | null)[] = new Array(lines.length).fill(null);
  const fetchPromises = lines.map((line, i) =>
    fetchLineAudio(line.text, voiceForSpeaker(line.speaker, roster), lang, speed).then((u) => {
      urls[i] = u;
    }),
  );

  // Wait for first line to be ready before starting playback
  await fetchPromises[0];
  if (myToken !== cancelToken) return;

  if (!urls[0]) {
    // First line failed — fall back to Web Speech for the whole transcript
    playWebSpeechFallback(lines, lang, { ...options, onStart: undefined });
    return;
  }

  const playSequential = async (idx: number) => {
    if (myToken !== cancelToken) return;
    if (idx >= lines.length) {
      options.onEnd?.();
      return;
    }
    // Wait for this line's audio if still fetching
    if (!urls[idx]) await fetchPromises[idx];
    if (myToken !== cancelToken) return;
    const url = urls[idx];
    if (!url) {
      // Skip with Web Speech for this line only
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utt = new SpeechSynthesisUtterance(lines[idx].text);
        utt.lang = lang === "zh" ? "zh-CN" : "en-US";
        utt.onend = () => playSequential(idx + 1);
        window.speechSynthesis.speak(utt);
      } else {
        playSequential(idx + 1);
      }
      return;
    }
    const audio = new Audio(url);
    audio.playbackRate = speed;
    currentAudio = audio;
    audio.onended = () => playSequential(idx + 1);
    audio.onerror = () => playSequential(idx + 1);
    try {
      await audio.play();
    } catch (err) {
      options.onError?.(err);
      playSequential(idx + 1);
    }
  };

  playSequential(0);
}

export function stopMultiVoiceDialog(): void {
  cancelToken++;
  if (currentAudio) {
    try { currentAudio.pause(); } catch { /* ignore */ }
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
