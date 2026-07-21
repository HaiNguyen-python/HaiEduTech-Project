// Swedish TTS helper - proxies Google Translate via the `swedish-tts` edge
// function and falls back to the native sv-SE SpeechSynthesis voice when the
// proxy is unreachable. Mirrors `finnishTts.ts`.
import { invokeTtsFunction, waitForAudioForeground } from "@/lib/ttsFunctionFetch";

export type SwedishTtsSource = "proxy" | "native";
export type SwedishTtsStatus = "loading" | "playing" | "ended" | "error";

interface SwedishTtsOptions {
  playbackRate?: number;
  speechRate?: number;
  onStatus?: (status: SwedishTtsStatus, info?: { source?: SwedishTtsSource; reason?: string }) => void;
}

interface SwedishTtsProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

let activeAudio: HTMLAudioElement | null = null;
let activeSource: AudioBufferSourceNode | null = null;
let audioContext: AudioContext | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopSwedishTts = () => {
  stopActiveAudio();
  if (activeSource) {
    try { activeSource.stop(); } catch { /* already stopped */ }
    activeSource.disconnect();
    activeSource = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

const playFromUrl = (url: string, playbackRate: number) =>
  new Promise<void>((resolve, reject) => {
    stopActiveAudio();
    const audio = new Audio(url);
    activeAudio = audio;
    audio.preload = "auto";
    audio.playbackRate = playbackRate;
    audio.onended = () => { if (activeAudio === audio) activeAudio = null; resolve(); };
    audio.onerror = () => { if (activeAudio === audio) activeAudio = null; reject(new Error("audio_error")); };
    waitForAudioForeground()
      .then(() => {
        if (activeAudio !== audio) {
          reject(new Error("stale_audio"));
          return;
        }
        audio.play().catch(() => {
          if (activeAudio === audio) activeAudio = null;
          reject(new Error("play_error"));
        });
      })
      .catch(() => reject(new Error("foreground_wait_error")));
  });

const decodeBase64ToBlob = (base64: string, mimeType: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
};

const decodeBase64ToArrayBuffer = (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

const unlockAudioContext = () => {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  audioContext ||= new AudioCtx();
  if (audioContext.state === "suspended") void audioContext.resume().catch(() => undefined);
  return audioContext;
};

const playBuffer = async (arrayBuffer: ArrayBuffer, playbackRate: number) => {
  const ctx = unlockAudioContext();
  if (!ctx) throw new Error("web_audio_unavailable");
  if (ctx.state === "suspended") await ctx.resume();
  stopSwedishTts();
  const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
  await ctx.resume();
  await new Promise<void>((resolve, reject) => {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate;
    source.connect(ctx.destination);
    activeSource = source;
    source.onended = () => {
      if (activeSource === source) activeSource = null;
      source.disconnect();
      resolve();
    };
    try { source.start(0); } catch (error) { reject(error); }
  });
};

const playFromProxy = async (text: string, playbackRate: number) => {
  const payload = await invokeTtsFunction<SwedishTtsProxyResponse | null>("swedish-tts", { text });
  if (!payload?.audioBase64) throw new Error("proxy_no_audio");
  const mimeType = payload.mimeType || "audio/mpeg";

  // 1) Try HTMLAudio with a data URL first - this is the most reliable path
  //    inside the Lovable sandbox preview iframe (no AudioContext gesture issues,
  //    no blob: CSP edge-cases). Data URLs always inherit the page's permissions.
  try {
    await playFromUrl(`data:${mimeType};base64,${payload.audioBase64}`, playbackRate);
    return;
  } catch { /* fall through to Web Audio */ }

  // 2) Web Audio fallback - works when HTMLAudio is blocked by autoplay policy
  //    but a user-gesture-warmed AudioContext is available.
  try {
    await playBuffer(decodeBase64ToArrayBuffer(payload.audioBase64), playbackRate);
    return;
  } catch { /* fall through to blob */ }

  // 3) Last-resort blob URL via HTMLAudio.
  const blob = decodeBase64ToBlob(payload.audioBase64, mimeType);
  const objectUrl = URL.createObjectURL(blob);
  try { await playFromUrl(objectUrl, playbackRate); } finally { URL.revokeObjectURL(objectUrl); }
};

const loadSpeechVoices = () =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { resolve([]); return; }
    const synth = window.speechSynthesis;
    const available = synth.getVoices();
    if (available.length > 0) { resolve(available); return; }
    let finished = false;
    const handler = () => {
      if (finished) return;
      finished = true;
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", handler);
    setTimeout(() => {
      if (finished) return;
      finished = true;
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    }, 700);
  });

const speakWithNativeSwedishVoice = async (text: string, speechRate: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) throw new Error("unavailable");
  window.speechSynthesis.cancel();
  const voices = await loadSpeechVoices();
  const swedishVoice =
    voices.find((v) => v.lang.toLowerCase() === "sv-se") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("sv"));
  if (!swedishVoice) throw new Error("no_swedish_voice");
  await new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const fail = () => {
      if (settled) return;
      settled = true;
      reject(new Error("speech_error"));
    };
    u.lang = "sv-SE";
    u.rate = speechRate;
    u.voice = swedishVoice;
    u.onend = finish;
    u.onerror = fail;
    window.setTimeout(finish, Math.min(30000, Math.max(6000, text.length * 130)));
    try { window.speechSynthesis.resume(); } catch { /* ignore */ }
    window.speechSynthesis.speak(u);
  });
};

export const playSwedishTts = async (text: string, options: SwedishTtsOptions = {}) => {
  if (typeof window === "undefined") return false;
  const normalized = text.trim();
  if (!normalized) return false;
  const playbackRate = options.playbackRate ?? 0.9;
  const speechRate = options.speechRate ?? 0.85;
  const onStatus = options.onStatus;
  unlockAudioContext();

  onStatus?.("loading", { source: "proxy" });
  let proxyReason = "";
  try {
    const payload = await invokeTtsFunction<SwedishTtsProxyResponse | null>("swedish-tts", { text: normalized });
    if (!payload?.audioBase64) throw new Error("proxy_no_audio");
    const mimeType = payload.mimeType || "audio/mpeg";
    onStatus?.("playing", { source: "proxy" });
    try {
      await playFromUrl(`data:${mimeType};base64,${payload.audioBase64}`, playbackRate);
      onStatus?.("ended", { source: "proxy" });
      return true;
    } catch {
      try {
        await playBuffer(decodeBase64ToArrayBuffer(payload.audioBase64), playbackRate);
        onStatus?.("ended", { source: "proxy" });
        return true;
      } catch {
        const blob = decodeBase64ToBlob(payload.audioBase64, mimeType);
        const objectUrl = URL.createObjectURL(blob);
        try {
          await playFromUrl(objectUrl, playbackRate);
          onStatus?.("ended", { source: "proxy" });
          return true;
        } finally { URL.revokeObjectURL(objectUrl); }
      }
    }
  } catch (err: any) {
    proxyReason = String(err?.message || err);
  }

  onStatus?.("loading", { source: "native", reason: proxyReason });
  try {
    await speakWithNativeSwedishVoice(normalized, speechRate);
    onStatus?.("ended", { source: "native" });
    return true;
  } catch (err: any) {
    const reason = `proxy: ${proxyReason || "unavailable"} · native: ${String(err?.message || err)}`;
    onStatus?.("error", { reason });
    return false;
  }
};

// ─────────────────────────────────────────────────────────────────────────
// Full-script playback: splits long scripts into TTS-safe chunks (~180 chars)
// and plays them sequentially so audio never gets truncated mid-sentence.
// If the script contains speaker markers (" — " em-dash between turns),
// each turn is played with a distinct playbackRate to simulate multiple
// voices, so learners can distinguish speakers.
// ─────────────────────────────────────────────────────────────────────────

const MAX_TTS_CHUNK = 180; // Google translate_tts practical limit (~200)

// Voice profiles: alternating playbackRate slightly changes perceived pitch
// so two speakers in a dialogue sound different even though the underlying
// TTS voice is the same sv-SE voice.
const VOICE_PROFILES = [
  { rate: 1.0, detune: 0 },
  { rate: 0.94, detune: -220 },   // slightly slower / lower — "speaker B"
  { rate: 1.06, detune: 180 },    // slightly faster / higher — "speaker C"
  { rate: 0.9, detune: -320 },
];

const splitIntoTurns = (script: string): string[] => {
  // Speaker turns are separated by " — " (em-dash) in our exercise data.
  // Fallback: treat the whole script as a single turn.
  const parts = script.split(/\s+—\s+/g).map((s) => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [script.trim()];
};

const splitIntoChunks = (text: string, max = MAX_TTS_CHUNK): string[] => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return [clean];
  // Split on sentence-ish boundaries first, then re-pack up to max chars.
  const sentences = clean.split(/(?<=[.!?…])\s+/);
  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    if (!s) continue;
    if ((buf + " " + s).trim().length > max) {
      if (buf) chunks.push(buf.trim());
      if (s.length > max) {
        // Very long sentence — fall back to comma / space splits.
        const sub = s.split(/,\s+/);
        let sb = "";
        for (const p of sub) {
          if ((sb + ", " + p).length > max) {
            if (sb) chunks.push(sb.trim().replace(/,$/, ""));
            sb = p;
          } else {
            sb = sb ? `${sb}, ${p}` : p;
          }
        }
        if (sb) chunks.push(sb.trim());
        buf = "";
      } else {
        buf = s;
      }
    } else {
      buf = buf ? `${buf} ${s}` : s;
    }
  }
  if (buf) chunks.push(buf.trim());
  return chunks.filter((c) => c.length > 0);
};

const fetchProxyAudio = async (text: string): Promise<{ audioBase64: string; mimeType: string } | null> => {
  try {
    const payload = await invokeTtsFunction<SwedishTtsProxyResponse | null>("swedish-tts", { text });
    if (!payload?.audioBase64) return null;
    return { audioBase64: payload.audioBase64, mimeType: payload.mimeType || "audio/mpeg" };
  } catch {
    return null;
  }
};

const playBufferWithProfile = async (
  arrayBuffer: ArrayBuffer,
  playbackRate: number,
  detune: number,
): Promise<void> => {
  const ctx = unlockAudioContext();
  if (!ctx) throw new Error("web_audio_unavailable");
  if (ctx.state === "suspended") await ctx.resume();
  const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
  await new Promise<void>((resolve, reject) => {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate;
    try { source.detune.value = detune; } catch { /* detune unsupported in some browsers */ }
    source.connect(ctx.destination);
    activeSource = source;
    source.onended = () => {
      if (activeSource === source) activeSource = null;
      source.disconnect();
      resolve();
    };
    try { source.start(0); } catch (error) { reject(error); }
  });
};

interface SwedishScriptOptions {
  playbackRate?: number;
  multiVoice?: boolean;
  onStatus?: (status: SwedishTtsStatus, info?: { source?: SwedishTtsSource; reason?: string }) => void;
}

// Playback state token — increments on stop so any in-flight sequence knows
// to abort between chunks.
let sequenceToken = 0;
const originalStop = stopSwedishTts;
export const stopSwedishSequence = () => {
  sequenceToken += 1;
  originalStop();
};

export const playSwedishTtsScript = async (
  script: string,
  options: SwedishScriptOptions = {},
): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  const normalized = script.trim();
  if (!normalized) return false;
  const basePlaybackRate = options.playbackRate ?? 0.9;
  const multiVoice = options.multiVoice !== false;
  const onStatus = options.onStatus;

  sequenceToken += 1;
  const myToken = sequenceToken;
  unlockAudioContext();

  const turns = splitIntoTurns(normalized);
  onStatus?.("loading", { source: "proxy" });
  onStatus?.("playing", { source: "proxy" });

  let anySuccess = false;
  for (let turnIdx = 0; turnIdx < turns.length; turnIdx += 1) {
    if (myToken !== sequenceToken) return anySuccess;
    const profile = multiVoice && turns.length > 1
      ? VOICE_PROFILES[turnIdx % VOICE_PROFILES.length]
      : VOICE_PROFILES[0];
    const turn = turns[turnIdx];
    const chunks = splitIntoChunks(turn);

    for (const chunk of chunks) {
      if (myToken !== sequenceToken) return anySuccess;
      const audio = await fetchProxyAudio(chunk);
      if (myToken !== sequenceToken) return anySuccess;

      if (audio) {
        const bytes = decodeBase64ToArrayBuffer(audio.audioBase64);
        try {
          await playBufferWithProfile(bytes, basePlaybackRate * profile.rate, profile.detune);
          anySuccess = true;
          continue;
        } catch { /* fall through to HTMLAudio */ }
        try {
          await playFromUrl(`data:${audio.mimeType};base64,${audio.audioBase64}`, basePlaybackRate * profile.rate);
          anySuccess = true;
          continue;
        } catch { /* fall through to native */ }
      }

      // Proxy failed for this chunk — use native voice
      try {
        await speakWithNativeSwedishVoice(chunk, (options.playbackRate ?? 0.85) * profile.rate);
        anySuccess = true;
      } catch { /* skip chunk */ }
    }

    // Small gap between speakers for readability.
    if (turnIdx < turns.length - 1 && myToken === sequenceToken) {
      await new Promise((r) => setTimeout(r, 280));
    }
  }

  onStatus?.(anySuccess ? "ended" : "error", { source: "proxy" });
  return anySuccess;
};

