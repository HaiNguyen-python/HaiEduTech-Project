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

// OpenAI TTS voices grouped by perceived gender so we can match speaker names.
const MALE_VOICES = ["onyx", "echo", "ash", "fable", "verse"] as const;
const FEMALE_VOICES = ["nova", "shimmer", "coral", "sage"] as const;
const NEUTRAL_VOICES = ["alloy", "ballad"] as const;

// Common first names → gender. Lowercase keys. Covers English + a handful of
// CJK/Vietnamese/European names common in lesson dialogs.
const NAME_GENDER: Record<string, "m" | "f"> = {
  // Male
  david: "m", john: "m", james: "m", michael: "m", robert: "m", william: "m",
  daniel: "m", thomas: "m", richard: "m", mark: "m", paul: "m", peter: "m",
  steven: "m", andrew: "m", brian: "m", kevin: "m", jason: "m", ryan: "m",
  matthew: "m", joshua: "m", tom: "m", tim: "m", jack: "m", henry: "m",
  george: "m", harry: "m", alex: "m", adam: "m", ben: "m", sam: "m",
  chris: "m", mike: "m", jake: "m", liam: "m", noah: "m", ethan: "m",
  oliver: "m", lucas: "m", leo: "m", max: "m", nick: "m", tony: "m",
  edward: "m", frank: "m", carl: "m", eric: "m", jeff: "m", scott: "m",
  hai: "m", minh: "m", tuan: "m", long: "m", nam: "m", hung: "m", dung: "m",
  wei: "m", ming: "m", jun: "m", liming: "m", "li ming": "m", zhang: "m", wang: "m",
  // Female
  sarah: "f", emma: "f", olivia: "f", sophia: "f", ava: "f", isabella: "f",
  mia: "f", amelia: "f", emily: "f", charlotte: "f", grace: "f", lily: "f",
  hannah: "f", anna: "f", maria: "f", linda: "f", patricia: "f", jennifer: "f",
  jessica: "f", ashley: "f", amanda: "f", lisa: "f", nancy: "f", karen: "f",
  laura: "f", helen: "f", rachel: "f", rebecca: "f", michelle: "f", kim: "f",
  rose: "f", ruby: "f", chloe: "f", zoe: "f", ella: "f", hazel: "f",
  alice: "f", betty: "f", clara: "f", diana: "f", eve: "f", fiona: "f",
  julia: "f", kate: "f", katie: "f", lucy: "f", molly: "f", nina: "f",
  hoa: "f", lan: "f", mai: "f", linh: "f", thu: "f", trang: "f", huong: "f",
  thuy: "f", phuong: "f", anh: "f", ngoc: "f", yen: "f",
  mei: "f", lan2: "f", xia: "f", ling: "f", yan: "f", hui: "f",
};

function guessGenderFromName(name: string): "m" | "f" | null {
  const key = name.toLowerCase().trim();
  if (NAME_GENDER[key]) return NAME_GENDER[key];
  // Try first token only (e.g. "Mr. David" → "david")
  const first = key.replace(/^(mr|mrs|ms|miss|dr|prof)\.?\s+/, "").split(/\s+/)[0];
  return NAME_GENDER[first] ?? null;
}

// Scan text for self-introductions and extract a likely gender.
function guessGenderFromText(text: string): "m" | "f" | null {
  const patterns = [
    /\bI['']?m\s+([A-Z][a-z]+)/,
    /\bmy name is\s+([A-Z][a-z]+)/i,
    /\bthis is\s+([A-Z][a-z]+)/i,
    /\bcall me\s+([A-Z][a-z]+)/i,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) {
      const g = guessGenderFromName(m[1]);
      if (g) return g;
    }
  }
  // Pronoun fallback
  if (/\b(he|his|him|mr\.?)\b/i.test(text)) return "m";
  if (/\b(she|her|hers|mrs\.?|ms\.?)\b/i.test(text)) return "f";
  return null;
}

export function assignVoicesForDialog(lines: DialogLine[]): string[] {
  const roster: Array<{ key: string; voice: string }> = [];
  return lines.map((l) => voiceForSpeaker(l.speaker, l.text, roster));
}

function voiceForSpeaker(
  speaker: string | null,
  text: string,
  roster: Array<{ key: string; voice: string }>,
): string {
  const rawKey = (speaker ?? `__line_${text.slice(0, 12)}`).toLowerCase().trim();
  const existing = roster.find((r) => r.key === rawKey);
  if (existing) return existing.voice;

  // Determine gender: from speaker label first, then from text content.
  let gender: "m" | "f" | null = null;
  if (speaker) {
    const lower = speaker.toLowerCase().trim();
    if (/(^|\s)(you|me|narrator|narator|i)$/.test(lower)) {
      gender = guessGenderFromText(text);
    } else if (/^(hr|interviewer|host|teacher|boss|manager|sir|mr\.?)/.test(lower)) {
      gender = "m";
    } else if (/^(mrs\.?|ms\.?|miss|madam|lady)/.test(lower)) {
      gender = "f";
    } else {
      gender = guessGenderFromName(speaker) ?? guessGenderFromText(text);
    }
  } else {
    gender = guessGenderFromText(text);
  }

  // Pick a voice from the matching pool, avoiding voices already used by other
  // speakers in this dialog so people sound distinct.
  const used = new Set(roster.map((r) => r.voice));
  const pool: readonly string[] =
    gender === "m" ? MALE_VOICES
    : gender === "f" ? FEMALE_VOICES
    : NEUTRAL_VOICES;
  let chosen = pool.find((v) => !used.has(v));
  if (!chosen) {
    // All preferred voices used — recycle by roster index within the pool.
    chosen = pool[roster.length % pool.length];
  }
  roster.push({ key: rawKey, voice: chosen });
  return chosen;
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
    utt.rate = options.rate ?? 1.15;
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
  const speed = options.rate ?? 1.15;
  const roster: Array<{ key: string; voice: string }> = [];

  options.onStart?.();

  // Pre-assign voices in order so later lines pick from remaining genders.
  const lineVoices = lines.map((line) => voiceForSpeaker(line.speaker, line.text, roster));

  // Prefetch first line, then start playback while remaining lines fetch in parallel.
  const urls: (string | null)[] = new Array(lines.length).fill(null);
  const fetchPromises = lines.map((line, i) =>
    fetchLineAudio(line.text, lineVoices[i], lang, speed).then((u) => {
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
