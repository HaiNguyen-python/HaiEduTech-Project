// Shared FX helpers for Vocab Arena Mini Games
// - Web Audio sound effects (no asset files)
// - Local high-score storage per game
// - Daily Challenge seed
// - Combo multiplier helper

let audioCtx: AudioContext | null = null;
const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
          .AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) audioCtx = new Ctor();
    }
    return audioCtx;
  } catch {
    return null;
  }
};

const beep = (freq: number, duration = 0.12, type: OscillatorType = "sine", gain = 0.06) => {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export type SfxType = "correct" | "wrong" | "combo" | "win" | "tick" | "flip" | "powerup";

export const sfx = (type: SfxType) => {
  switch (type) {
    case "correct":
      beep(660, 0.08, "triangle", 0.07);
      setTimeout(() => beep(990, 0.12, "triangle", 0.07), 70);
      break;
    case "wrong":
      beep(200, 0.18, "sawtooth", 0.05);
      break;
    case "combo":
      beep(880, 0.06, "square", 0.05);
      setTimeout(() => beep(1175, 0.06, "square", 0.05), 60);
      setTimeout(() => beep(1568, 0.12, "square", 0.06), 120);
      break;
    case "win":
      [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.18, "triangle", 0.08), i * 110));
      break;
    case "tick":
      beep(440, 0.04, "square", 0.03);
      break;
    case "flip":
      beep(520, 0.05, "sine", 0.04);
      break;
    case "powerup":
      beep(400, 0.08, "sine", 0.05);
      setTimeout(() => beep(700, 0.08, "sine", 0.05), 60);
      setTimeout(() => beep(1100, 0.12, "sine", 0.06), 120);
      break;
  }
};

// Combo multiplier: 1x → 1.5x (3) → 2x (5) → 3x (8)
export const comboMultiplier = (combo: number): number => {
  if (combo >= 8) return 3;
  if (combo >= 5) return 2;
  if (combo >= 3) return 1.5;
  return 1;
};

export const comboLabel = (combo: number): string | null => {
  if (combo >= 8) return "🔥 ON FIRE x3";
  if (combo >= 5) return "⚡ STREAK x2";
  if (combo >= 3) return "✨ COMBO x1.5";
  return null;
};

// ------ High Scores (per game, top 5) ------
export type GameKey =
  | "memory"
  | "hunt"
  | "sprint"
  | "synonym"
  | "scramble"
  | "collocation"
  | "oddone"
  | "cloze"
  | "listen";
export interface HighScore {
  name: string;
  score: number;
  date: number;
}

const HS_KEY = (g: GameKey) => `vocabArena:hs:${g}`;
const NAME_KEY = "vocabArena:playerName";

export const getPlayerName = (): string => {
  if (typeof window === "undefined") return "Player";
  return localStorage.getItem(NAME_KEY) || "Player";
};
export const setPlayerName = (name: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(NAME_KEY, name.slice(0, 20));
};

export const getHighScores = (game: GameKey): HighScore[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HS_KEY(game));
    if (!raw) return [];
    const arr = JSON.parse(raw) as HighScore[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

export const saveHighScore = (game: GameKey, score: number, name?: string): { rank: number | null; isNew: boolean } => {
  if (typeof window === "undefined" || score <= 0) return { rank: null, isNew: false };
  const list = getHighScores(game);
  const entry: HighScore = { name: (name || getPlayerName()).slice(0, 20), score, date: Date.now() };
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  const top = list.slice(0, 10);
  localStorage.setItem(HS_KEY(game), JSON.stringify(top));
  const rank = top.findIndex((e) => e === entry);
  return { rank: rank >= 0 && rank < 10 ? rank + 1 : null, isNew: rank === 0 };
};

// ------ Daily Challenge seed ------
export const dailySeed = (): number => {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};
export const dailyLabel = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// ------ Word picking ------
// Mini games used to draw from all 800 words at random, so practice never
// touched the words the learner actually starred or is about to forget.
// This helper front-loads starred words, then fills the rest at random.
export const starredWords = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem("ielts_mastered");
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
};

/**
 * Picks `count` words, biased towards starred ones (up to ~60% of the round)
 * while keeping enough variety for distractors.
 */
export const pickWords = <T extends { word: string }>(pool: T[], count: number, filter?: (w: T) => boolean): T[] => {
  const usable = filter ? pool.filter(filter) : pool;
  const base = usable.length >= Math.max(4, count) ? usable : pool;
  const stars = starredWords();
  const starred = base.filter((w) => stars.has(w.word));
  const rest = base.filter((w) => !stars.has(w.word));
  const shuffleArr = <X,>(a: X[]) => {
    const arr = [...a];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const wantStars = Math.min(starred.length, Math.ceil(count * 0.6));
  const picked = [...shuffleArr(starred).slice(0, wantStars), ...shuffleArr(rest).slice(0, count - wantStars)];
  return shuffleArr(picked).slice(0, count);
};
