/** One distinct colour per class (not per subject) so classes are easy to tell apart. */
const PALETTE = [
  "#1D4ED8", // royal blue
  "#DC2626", // red
  "#047857", // emerald
  "#7C3AED", // violet
  "#EA580C", // orange
  "#0E7490", // teal blue
  "#DB2777", // pink
  "#4D7C0F", // olive
  "#A21CAF", // fuchsia
  "#92400E", // brown
  "#334155", // slate
  "#A16207", // gold
];

const hashKey = (key: string) => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
};

/** A class is identified by subject + name, so the same class keeps the same colour everywhere. */
export const classColorKey = (c: { subject: string; class_name: string }) =>
  `${c.subject.trim().toLowerCase()}::${c.class_name.trim().toLowerCase()}`;

/**
 * Assigns a unique colour to every class. Keys are sorted first so the result never
 * depends on the order rows arrive from the database; used indices are skipped so two
 * classes never share a colour while the palette lasts.
 */
export function buildClassColorMap(classes: readonly { subject: string; class_name: string }[]): Record<string, string> {
  const keys = [...new Set(classes.map(classColorKey))].sort();
  const used = new Set<number>();
  const map: Record<string, string> = {};
  for (const key of keys) {
    let index = hashKey(key) % PALETTE.length;
    for (let step = 0; step < PALETTE.length && used.has(index); step++) index = (index + 1) % PALETTE.length;
    used.add(index);
    map[key] = PALETTE[index];
  }
  return map;
}

export const classColor = (map: Record<string, string>, c: { subject: string; class_name: string }) =>
  map[classColorKey(c)] ?? PALETTE[hashKey(classColorKey(c)) % PALETTE.length];

/** Soft background tint derived from a class colour (rgba so image export renders it). */
export const withAlpha = (hex: string, alpha: number) => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
