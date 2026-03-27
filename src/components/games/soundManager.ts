// Game sound effects using Web Audio API
// Provides arcade-style sounds for all mini-games with mute toggle

let audioCtx: AudioContext | null = null;
let muted = false;

export const toggleMute = (): boolean => {
  muted = !muted;
  return muted;
};

export const isMuted = (): boolean => muted;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

export function playGameSound(
  type: "click" | "correct" | "wrong" | "streak" | "levelup" | "powerup" | "gameover" | "tick"
) {
  if (muted) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    let duration = 0.15;

    switch (type) {
      case "click":
        osc.frequency.value = 600;
        gain.gain.value = 0.08;
        osc.type = "sine";
        break;
      case "correct":
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
        osc.type = "sine";
        duration = 0.2;
        break;
      case "wrong":
        osc.frequency.value = 200;
        gain.gain.value = 0.12;
        osc.type = "sawtooth";
        duration = 0.25;
        break;
      case "streak":
        osc.frequency.value = 1200;
        gain.gain.value = 0.1;
        osc.type = "sine";
        duration = 0.3;
        // Ascending arpeggio effect
        osc.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.15);
        break;
      case "levelup":
        osc.frequency.value = 800;
        gain.gain.value = 0.12;
        osc.type = "triangle";
        duration = 0.4;
        osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.2);
        break;
      case "powerup":
        osc.frequency.value = 1400;
        gain.gain.value = 0.08;
        osc.type = "sine";
        duration = 0.2;
        break;
      case "gameover":
        osc.frequency.value = 400;
        gain.gain.value = 0.15;
        osc.type = "sawtooth";
        duration = 0.5;
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);
        break;
      case "tick":
        osc.frequency.value = 1000;
        gain.gain.value = 0.05;
        osc.type = "sine";
        duration = 0.05;
        break;
    }

    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently fail if audio context is not available
  }
}
