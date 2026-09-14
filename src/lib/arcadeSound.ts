/**
 * @file arcadeSound.ts
 * @description Tiny Web Audio cues for the Tech & Code Game Hub. No media files,
 * no libraries: every sound is generated on the fly and can be muted by the learner.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

type Cue = "correct" | "wrong" | "timeout" | "levelup" | "badge";

let ctx: AudioContext | null = null;
let enabled = true;

/** Follow the learner's saved sound preference. */
export const setArcadeSoundEnabled = (value: boolean) => {
  enabled = value;
};

const getContext = () => {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

const tone = (audio: AudioContext, freq: number, start: number, duration: number, gain: number) => {
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  vol.gain.setValueAtTime(0, audio.currentTime + start);
  vol.gain.linearRampToValueAtTime(gain, audio.currentTime + start + 0.015);
  vol.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(vol).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
};

const CUES: Record<Cue, [number, number, number][]> = {
  // [frequency, start offset, duration]
  correct: [[660, 0, 0.1], [880, 0.08, 0.14]],
  wrong: [[220, 0, 0.16], [165, 0.1, 0.18]],
  timeout: [[330, 0, 0.12], [247, 0.12, 0.16]],
  levelup: [[523, 0, 0.1], [659, 0.09, 0.1], [784, 0.18, 0.18]],
  badge: [[784, 0, 0.09], [988, 0.08, 0.09], [1319, 0.17, 0.22]],
};

/** Play one short cue; silently ignored when muted or unsupported. */
export function playArcadeCue(cue: Cue) {
  if (!enabled) return;
  try {
    const audio = getContext();
    if (!audio) return;
    CUES[cue].forEach(([freq, start, duration]) => tone(audio, freq, start, duration, 0.05));
  } catch {
    /* audio is a bonus, never a blocker */
  }
}
