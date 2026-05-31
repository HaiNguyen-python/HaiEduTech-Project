/**
 * Shared juicy-FX toolkit for the AI Academy sandboxes.
 * - playSuccessSound() / playFailureSound(): tiny WebAudio stubs.
 *   Replace the oscillator blocks later with real game audio.
 * - bounceVariant / shakeVariant: Framer Motion presets so every
 *   sandbox reacts identically to correct / incorrect actions.
 */

// Lazily create one shared AudioContext (browsers block on first user gesture).
let audioCtx: AudioContext | null = null;
const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    if (!audioCtx) audioCtx = new Ctor();
    return audioCtx;
  } catch {
    return null;
  }
};

const blip = (freq: number, duration = 0.18, type: OscillatorType = "sine") => {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {
    /* ignore audio errors in unsupported environments */
  }
};

/** Cheerful 2-note rising chime - call on every successful evaluation. */
export const playSuccessSound = () => {
  blip(660, 0.12, "triangle");
  setTimeout(() => blip(990, 0.18, "triangle"), 90);
};

/** Soft "thud" - call on incorrect / failed evaluation. */
export const playFailureSound = () => {
  blip(180, 0.22, "sawtooth");
};

/** Framer Motion: quick scale bounce for correct answers. */
export const bounceVariant = {
  scale: [1, 1.1, 1],
  transition: { duration: 0.35, ease: "easeOut" as const },
};

/** Framer Motion: horizontal shake for wrong answers. */
export const shakeVariant = {
  x: [-10, 10, -10, 10, 0],
  transition: { duration: 0.4, ease: "easeInOut" as const },
};
