/**
 * Multi-voice dialog playback for listening transcripts.
 * Splits transcript by speaker label (e.g. "HR:", "Candidate:", "A:", "李明:")
 * and plays each line with a different voice / pitch so characters sound distinct.
 */

export type DialogLang = "en" | "zh";

interface DialogLine {
  speaker: string | null;
  text: string;
}

const SPEAKER_RE = /^\s*([\p{L}][\p{L}\p{N} _.''\-]{0,30}?)\s*[:：]\s*/u;

export function parseDialog(transcript: string): DialogLine[] {
  // Split first on hard line breaks; if there are none, split on speaker pattern inline.
  const rawLines = transcript.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const out: DialogLine[] = [];

  const pushSplit = (chunk: string) => {
    // Inline split: find every "Speaker:" occurrence
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
      // One speaker per line, no inline switches
      out.push({ speaker: single[1].trim(), text: line.slice(single[0].length).trim() });
    } else {
      pushSplit(line);
    }
  }
  return out;
}

function pickVoices(lang: DialogLang): SpeechSynthesisVoice[] {
  const all = window.speechSynthesis.getVoices();
  const prefix = lang === "zh" ? "zh" : "en";
  const filtered = all.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  return filtered.length ? filtered : all;
}

/** Map a speaker name to a stable index. */
function speakerIndex(speaker: string, roster: string[]): number {
  const idx = roster.indexOf(speaker);
  if (idx >= 0) return idx;
  roster.push(speaker);
  return roster.length - 1;
}

interface PlayOptions {
  rate?: number;
  onEnd?: () => void;
  onStart?: () => void;
}

export function playMultiVoiceDialog(
  transcript: string,
  lang: DialogLang,
  options: PlayOptions = {},
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();

  const lines = parseDialog(transcript);
  if (!lines.length) return;

  const start = () => {
    const voices = pickVoices(lang);
    const roster: string[] = [];
    // Pitch palette for variety when few voices available
    const pitches = [1.05, 0.85, 1.2, 0.95, 1.1, 0.8];
    const rates = [1, 0.97, 1.03, 0.95];

    options.onStart?.();

    lines.forEach((line, i) => {
      const utt = new SpeechSynthesisUtterance(line.text);
      utt.lang = lang === "zh" ? "zh-CN" : "en-US";
      utt.rate = (options.rate ?? 0.9);

      if (line.speaker) {
        const idx = speakerIndex(line.speaker, roster);
        if (voices.length > 1) {
          utt.voice = voices[idx % voices.length];
        }
        utt.pitch = pitches[idx % pitches.length];
        utt.rate *= rates[idx % rates.length];
      }

      if (i === lines.length - 1 && options.onEnd) {
        utt.onend = () => options.onEnd?.();
      }
      synth.speak(utt);
    });
  };

  // Voices load async on some browsers
  if (window.speechSynthesis.getVoices().length === 0) {
    const handler = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      start();
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    // Fallback in case the event never fires
    setTimeout(start, 250);
  } else {
    start();
  }
}

export function stopMultiVoiceDialog(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
