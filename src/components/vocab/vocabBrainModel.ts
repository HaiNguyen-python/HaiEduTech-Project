/**
 * @file vocabBrainModel.ts
 * @description Shared, dependency-free maths for the "vocabulary brain" view:
 * deterministic neuron placement on a brain-like shape plus the memory-decay
 * tiers (fresh words glow, unreviewed words fade out).
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface BrainNeuron {
  word: string;
  /** Days since the word was last reviewed (0 = today). */
  days: number;
  /** Deterministic position, right-handed, roughly within [-1.4, 1.4]. */
  x: number;
  y: number;
  z: number;
}

export type DecayTier = "fresh" | "recent" | "fading" | "weak" | "forgotten";

export interface TierInfo {
  tier: DecayTier;
  color: string;
  /** 0.15 - 1, used for point opacity / alpha. */
  alpha: number;
  /** Relative point size multiplier. */
  scale: number;
  vi: string;
  en: string;
}

const TIERS: Record<DecayTier, Omit<TierInfo, "tier">> = {
  fresh:     { color: "#10b981", alpha: 1.0,  scale: 1.35, vi: "Vừa ôn",        en: "Just reviewed" },
  recent:    { color: "#3b82f6", alpha: 0.85, scale: 1.1,  vi: "Còn tươi",      en: "Still fresh" },
  fading:    { color: "#6366f1", alpha: 0.55, scale: 0.9,  vi: "Bắt đầu phai",  en: "Starting to fade" },
  weak:      { color: "#94a3b8", alpha: 0.32, scale: 0.75, vi: "Sắp quên",      en: "Almost forgotten" },
  forgotten: { color: "#64748b", alpha: 0.16, scale: 0.6,  vi: "Đã quên",       en: "Forgotten" },
};

export const TIER_ORDER: DecayTier[] = ["fresh", "recent", "fading", "weak", "forgotten"];

/** Map "days since review" to a visual decay tier. */
export const tierForDays = (days: number): TierInfo => {
  const tier: DecayTier =
    days <= 1 ? "fresh" :
    days <= 6 ? "recent" :
    days <= 20 ? "fading" :
    days <= 45 ? "weak" : "forgotten";
  return { tier, ...TIERS[tier] };
};

export const tierInfo = (tier: DecayTier): TierInfo => ({ tier, ...TIERS[tier] });

/** Stable 32-bit string hash (FNV-1a) so a word always lands in the same spot. */
const hash = (s: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** Deterministic pseudo-random in [0,1) derived from a word + salt. */
const rand = (word: string, salt: number): number => (hash(`${word}#${salt}`) % 100000) / 100000;

/**
 * Place a point on a brain-like surface from four uniform randoms: two
 * ellipsoid hemispheres separated by a mid-line fissure, plus a small
 * cerebellum lobe at the lower back.
 */
export const brainPositionFromRandoms = (
  r1: number,
  r2: number,
  r3: number,
  r4: number,
): { x: number; y: number; z: number } => {


  const cerebellum = r4 > 0.86; // ~14% of words sit in the lower-back lobe

  // Spherical sampling (uniform on the sphere), then squashed into shape.
  const u = r1 * 2 - 1;                 // cos(phi)
  const theta = r2 * Math.PI * 2;
  const s = Math.sqrt(Math.max(0, 1 - u * u));
  // Keep the cloud close to the cortex surface (shell between 0.72 and 1).
  const shell = 0.74 + r3 * 0.26;

  let x = s * Math.cos(theta) * shell;
  let y = u * shell;
  let z = s * Math.sin(theta) * shell;

  if (cerebellum) {
    // Small squashed lobe behind and below the cerebrum.
    return {
      x: x * 0.42,
      y: y * 0.26 - 0.78,
      z: z * 0.32 - 0.72,
    };
  }

  // Cerebrum: wider than tall, longer front-to-back.
  x *= 0.92;
  y *= 0.74;
  z *= 1.16;

  // Push points away from the mid-sagittal plane to carve the fissure.
  const side = x >= 0 ? 1 : -1;
  x = side * (Math.abs(x) * 0.86 + 0.14);

  // Flatten the very top a touch and lift the whole cerebrum.
  y = y * (1 - 0.12 * Math.abs(x)) + 0.16;

  // Frontal lobe slightly narrower than the occipital area.
  if (z > 0) x *= 0.92;

  return { x, y, z };
};

/** Deterministic per-word placement. */
export const brainPosition = (word: string) =>
  brainPositionFromRandoms(rand(word, 1), rand(word, 2), rand(word, 3), rand(word, 4));

/** Build the neuron list from words + days-since-review. */
export const buildNeurons = (items: { word: string; days: number }[]): BrainNeuron[] =>
  items.map(({ word, days }) => ({ word, days, ...brainPosition(word) }));

/** Nearest-neighbour synapse pairs (index pairs) for the connective fibres. */
export const buildSynapses = (neurons: BrainNeuron[], maxLinks = 900): [number, number][] => {
  const pairs: [number, number][] = [];
  const step = Math.max(1, Math.ceil(neurons.length / 260));
  for (let i = 0; i < neurons.length && pairs.length < maxLinks; i += step) {
    let best = -1;
    let bestD = Infinity;
    for (let j = 0; j < neurons.length; j += 1) {
      if (j === i) continue;
      const a = neurons[i];
      const b = neurons[j];
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
      if (d < bestD) { bestD = d; best = j; }
    }
    if (best >= 0 && bestD < 0.09) pairs.push([i, best]);
  }
  return pairs;
};

/**
 * Dim, non-interactive scaffold points so the brain silhouette is always
 * readable even when the learner has only a handful of words.
 */
export const buildScaffold = (count = 1600): Float32Array => {
  const arr = new Float32Array(count * 3);
  // Sequential hashes correlate visibly (they draw spirals), so drive the
  // placement with a linear congruential generator for an even cortex fill.
  let seed = 0x9e3779b9;
  const next = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  for (let i = 0; i < count; i += 1) {
    const { x, y, z } = brainPositionFromRandoms(next(), next(), next(), next());
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }
  return arr;
};

