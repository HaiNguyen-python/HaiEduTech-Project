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
  /** Lighter version of `color`, used for text so labels stay readable. */
  labelInk: string;
  /** 0.15 - 1, used for point opacity / alpha. */
  alpha: number;
  /** Relative point size multiplier. */
  scale: number;
  vi: string;
  en: string;
}

/**
 * Five clearly separated memory levels: green = solid, blue = still good,
 * amber/orange = fading, red = practically forgotten. The hue itself tells the
 * learner which words need attention, without reading the legend.
 */
const TIERS: Record<DecayTier, Omit<TierInfo, "tier">> = {
  fresh:     { color: "#10b981", labelInk: "#6ee7b7", alpha: 1.0,  scale: 1.4,  vi: "Nhớ chắc",      en: "Solid" },
  recent:    { color: "#3b82f6", labelInk: "#93c5fd", alpha: 0.9,  scale: 1.2,  vi: "Còn tốt",       en: "Still good" },
  fading:    { color: "#f59e0b", labelInk: "#fcd34d", alpha: 0.78, scale: 1.05, vi: "Bắt đầu phai",  en: "Starting to fade" },
  weak:      { color: "#f97316", labelInk: "#fdba74", alpha: 0.66, scale: 0.95, vi: "Cần ôn gấp",    en: "Needs revision" },
  forgotten: { color: "#ef4444", labelInk: "#fca5a5", alpha: 0.55, scale: 0.85, vi: "Đã quên",       en: "Forgotten" },
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
 * ellipsoid hemispheres with gyri/sulci ripples separated by a mid-line
 * fissure, plus a cerebellum lobe and a short brain stem.
 */
export const brainPositionFromRandoms = (
  r1: number,
  r2: number,
  r3: number,
  r4: number,
): { x: number; y: number; z: number } => {
  const cerebellum = r4 > 0.84 && r4 <= 0.96; // ~12% lower-back lobe
  const stem = r4 > 0.96;                     // ~4% brain stem

  // Spherical sampling (uniform on the sphere), then squashed into shape.
  const u = r1 * 2 - 1;                 // cos(phi)
  const theta = r2 * Math.PI * 2;
  const s = Math.sqrt(Math.max(0, 1 - u * u));
  // Keep the cloud close to the cortex surface (thin shell).
  let shell = 0.82 + r3 * 0.18;

  // Gyri / sulci: multi-frequency ripple on the radius so the surface folds.
  const folds =
    Math.sin(theta * 6) * 0.045 +
    Math.sin(u * Math.PI * 5 + theta * 3) * 0.04 +
    Math.sin(theta * 11 + u * 7) * 0.022;

  let x = s * Math.cos(theta);
  let y = u;
  let z = s * Math.sin(theta);

  if (stem) {
    // Narrow stem dropping below the cerebrum, slightly to the back.
    return {
      x: x * 0.13,
      y: -0.62 - r3 * 0.42,
      z: z * 0.13 - 0.24,
    };
  }

  if (cerebellum) {
    // Small ridged lobe behind and below the cerebrum.
    const c = shell + folds * 0.6;
    return {
      x: x * c * 0.44,
      y: y * c * 0.24 - 0.74,
      z: z * c * 0.34 - 0.74,
    };
  }

  shell += folds;
  x *= shell;
  y *= shell;
  z *= shell;

  // Cerebrum: wider than tall, longer front-to-back.
  x *= 0.9;
  y *= 0.74;
  z *= 1.18;

  // Push points away from the mid-sagittal plane to carve a deeper fissure.
  const side = x >= 0 ? 1 : -1;
  x = side * (Math.abs(x) * 0.8 + 0.2);

  // Flatten the very top a touch and lift the whole cerebrum.
  y = y * (1 - 0.12 * Math.abs(x)) + 0.16;

  // Frontal lobe narrower than the occipital area.
  if (z > 0) x *= 0.9;

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


/**
 * Scaffold layer built from the same brain geometry, optionally shrunk towards
 * the centre so several layers together read as a solid volume instead of a
 * hollow sphere.
 */
export const buildScaffoldShell = (count: number, radiusScale = 1): Float32Array => {
  const src = buildScaffold(count);
  if (radiusScale === 1) return src;
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i += 1) out[i] = src[i] * radiusScale;
  return out;
};

export interface LabelCandidate {

  neuron: BrainNeuron;
  /** Projected screen-ish coordinates in the caller's space. */
  sx: number;
  sy: number;
  /** Facing score: 1 = straight at the viewer. */
  facing: number;
}

/**
 * Pick which neurons should show a text label: front-facing first, freshest and
 * most-urgent words prioritised, then thinned out so labels never overlap.
 */
export const pickLabelCandidates = (
  items: LabelCandidate[],
  limit: number,
  minDistance: number,
  forced: string[] = [],
): LabelCandidate[] => {
  const forcedSet = new Set(forced.filter(Boolean).map(w => w.toLowerCase()));
  const priority = (c: LabelCandidate) => {
    if (forcedSet.has(c.neuron.word.toLowerCase())) return 1000;
    // Front-facing matters most, then "needs revision", then freshness.
    const urgency = c.neuron.days > 20 ? 0.5 : c.neuron.days <= 1 ? 0.35 : 0.1;
    return c.facing + urgency;
  };

  const sorted = [...items]
    .filter(c => forcedSet.has(c.neuron.word.toLowerCase()) || c.facing > 0.1)
    .sort((a, b) => priority(b) - priority(a));

  const kept: LabelCandidate[] = [];
  const min2 = minDistance * minDistance;
  for (const c of sorted) {
    if (kept.length >= limit) break;
    const isForced = forcedSet.has(c.neuron.word.toLowerCase());
    if (!isForced && kept.some(k => (k.sx - c.sx) ** 2 + (k.sy - c.sy) ** 2 < min2)) continue;
    kept.push(c);
  }
  return kept;
};
