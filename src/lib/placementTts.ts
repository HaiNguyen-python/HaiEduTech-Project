/**
 * @file placementTts.ts
 * @description Natural-voice playback for every placement test prompt.
 *
 *  Primary engine: the `dialog-tts` edge function (Lovable AI
 *  gpt-4o-mini-tts) which produces human-like speech instead of the robotic
 *  browser voice. Dialogue lines written as "Woman: ... Man: ..." are read as
 *  turns with two different voices, and speaker labels are never spoken.
 *
 *  Fallbacks, in order: the language proxy TTS libs, then the browser voice.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { invokeTtsFunction, waitForAudioForeground } from "@/lib/ttsFunctionFetch";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { playFinnishTts, stopFinnishTts } from "@/lib/finnishTts";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";

export type PlacementTtsStatus = "loading" | "playing" | "done" | "error";
export type PlacementTtsSource = "natural" | "proxy" | "native";

export interface PlacementTtsOptions {
  /** BCP-47 tag, e.g. en-US / zh-CN / fi-FI / vi-VN. */
  lang: string;
  /** Slower delivery for the "replay slowly" control. */
  slow?: boolean;
  onStatus?: (status: PlacementTtsStatus, info?: { source?: PlacementTtsSource }) => void;
}

interface DialogTtsResponse {
  audioBase64?: string;
  mimeType?: string;
}

/** Voice pool: index 0 = first speaker, 1 = second speaker, 2 = narrator. */
const VOICE_POOL = ["nova", "onyx", "sage", "shimmer"] as const;

const SPEAKER_LABEL =
  /^(narrator|examiner|teacher|student|woman|man|girl|boy|waiter|customer|assistant|receptionist|announcer|interviewer|speaker\s?\d?|a|b)$/i;

let activeAudio: HTMLAudioElement | null = null;
let playToken = 0;

const shortLang = (lang: string) => lang.toLowerCase().slice(0, 2);

export const stopPlacementTts = () => {
  playToken += 1;
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  stopEnglishTts();
  stopFinnishTts();
  stopVietnameseTts();
  stopChineseTts();
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }
  }
};

export interface PlacementTurn { speaker: string | null; text: string }

/**
 * Split a script into speaker turns. Labels such as "Waiter:" are used only to
 * pick a voice; they are stripped from the spoken text.
 */
export const splitPlacementTurns = (script: string): PlacementTurn[] => {
  const clean = script.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const pattern = /(^|\s)([A-Z][A-Za-z]{1,14}(?:\s\d)?):\s/g;
  const marks: Array<{ index: number; label: string; textStart: number }> = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(clean)) !== null) {
    const label = match[2];
    if (!SPEAKER_LABEL.test(label)) continue;
    marks.push({
      index: match.index + match[1].length,
      label,
      textStart: match.index + match[0].length,
    });
  }
  if (marks.length === 0) return [{ speaker: null, text: clean }];

  const turns: PlacementTurn[] = [];
  const lead = clean.slice(0, marks[0].index).trim();
  if (lead) turns.push({ speaker: null, text: lead });
  marks.forEach((mark, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index : clean.length;
    const text = clean.slice(mark.textStart, end).trim();
    if (text) turns.push({ speaker: mark.label, text });
  });
  return turns;
};

const voiceForTurn = (turns: PlacementTurn[], turn: PlacementTurn) => {
  if (!turn.speaker) return VOICE_POOL[0];
  const label = turn.speaker.toLowerCase();
  if (label === "narrator" || label === "announcer") return VOICE_POOL[2];
  const speakers = [...new Set(
    turns.map(t => t.speaker?.toLowerCase()).filter(Boolean) as string[],
  )].filter(s => s !== "narrator" && s !== "announcer");
  const pos = speakers.indexOf(label);
  return VOICE_POOL[pos <= 0 ? 0 : 1];
};

const playBase64 = (base64: string, mimeType: string, rate: number, token: number) =>
  new Promise<void>((resolve, reject) => {
    const audio = new Audio(`data:${mimeType};base64,${base64}`);
    activeAudio = audio;
    audio.preload = "auto";
    audio.playbackRate = rate;
    audio.onended = () => { if (activeAudio === audio) activeAudio = null; resolve(); };
    audio.onerror = () => { if (activeAudio === audio) activeAudio = null; reject(new Error("audio_error")); };
    waitForAudioForeground()
      .then(() => {
        if (token !== playToken) { reject(new Error("stale")); return; }
        audio.play().catch(() => reject(new Error("play_error")));
      })
      .catch(() => reject(new Error("foreground_error")));
  });

const naturalTurn = async (
  text: string, lang: string, voice: string, speed: number, rate: number, token: number,
) => {
  const payload = await invokeTtsFunction<DialogTtsResponse | null>("dialog-tts", {
    text, voice, lang: shortLang(lang), speed,
  });
  if (!payload?.audioBase64) throw new Error("no_audio");
  await playBase64(payload.audioBase64, payload.mimeType || "audio/mpeg", rate, token);
};

const proxyFallback = async (text: string, lang: string, slow: boolean) => {
  const code = shortLang(lang);
  const playbackRate = slow ? 0.75 : 0.95;
  const speechRate = slow ? 0.65 : 0.85;
  if (code === "fi") return playFinnishTts(text, { playbackRate, speechRate });
  if (code === "vi") return playVietnameseTts(text, { playbackRate, speechRate });
  if (code === "zh") return playChineseTts(text, { playbackRate, speechRate });
  return playEnglishTts(text, { playbackRate, speechRate });
};

/**
 * Speak a placement prompt with the most natural voice available.
 * Returns the engine actually used, or null when nothing could play.
 */
export const playPlacementTts = async (
  script: string,
  options: PlacementTtsOptions,
): Promise<PlacementTtsSource | null> => {
  if (typeof window === "undefined") return null;
  const turns = splitPlacementTurns(script);
  if (turns.length === 0) return null;

  stopPlacementTts();
  playToken += 1;
  const token = playToken;
  const { lang, slow = false, onStatus } = options;
  const speed = slow ? 0.8 : 1.0;
  const rate = slow ? 0.9 : 1.0;

  onStatus?.("loading", { source: "natural" });

  // 1 - natural multi-voice engine.
  let naturalOk = true;
  for (let i = 0; i < turns.length; i += 1) {
    if (token !== playToken) return "natural";
    const turn = turns[i];
    try {
      if (i === 0) onStatus?.("playing", { source: "natural" });
      await naturalTurn(turn.text, lang, voiceForTurn(turns, turn), speed, rate, token);
    } catch {
      if (token !== playToken) return "natural";
      naturalOk = false;
      break;
    }
    if (turns.length > 1 && i < turns.length - 1) {
      await new Promise<void>(r => window.setTimeout(r, 260));
    }
  }
  if (naturalOk) { onStatus?.("done", { source: "natural" }); return "natural"; }

  // 2 - language proxy fallback (spoken text only, labels already stripped).
  if (token !== playToken) return null;
  const plain = turns.map(t => t.text).join(" ");
  onStatus?.("loading", { source: "proxy" });
  try {
    const ok = await proxyFallback(plain, lang, slow);
    if (ok) { onStatus?.("done", { source: "proxy" }); return "proxy"; }
  } catch { /* fall through */ }

  // 3 - browser voice, last resort.
  if (token !== playToken) return null;
  try {
    const u = new SpeechSynthesisUtterance(plain);
    u.lang = lang;
    u.rate = slow ? 0.7 : 0.9;
    onStatus?.("playing", { source: "native" });
    await new Promise<void>((resolve) => {
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
      window.setTimeout(resolve, Math.min(40000, Math.max(6000, plain.length * 90)));
    });
    onStatus?.("done", { source: "native" });
    return "native";
  } catch {
    onStatus?.("error");
    return null;
  }
};
