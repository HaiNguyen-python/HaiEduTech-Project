/**
 * @file speakingCoachMerge.ts
 * @description Merges Speaking Coach themes that share the same display name so
 * every theme appears exactly once. Themes with the same name and level are
 * combined (first occurrence keeps its id, icon and order, so saved progress and
 * scores survive). When a name still exists at several levels after merging, the
 * level is appended to the display name to keep the list unambiguous.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

interface MergeableSentence {
  id: string;
  text: string;
}

interface MergeableTheme {
  id: string;
  name: string;
  nameVi: string;
  level?: "A1" | "A2" | "B1" | "B2" | "C1";
  sentences: MergeableSentence[];
}

const normalizeName = (value: string): string =>
  String(value ?? "").toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

const normalizeText = (value: string): string =>
  String(value ?? "").toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

/** Lookup keys: a theme joins a group when either display name matches at the same level. */
const lookupKeys = (theme: MergeableTheme): string[] => {
  const level = theme.level ?? "-";
  const en = normalizeName(theme.name);
  const vi = normalizeName(theme.nameVi);
  return [en ? `en:${en}|${level}` : "", vi ? `vi:${vi}|${level}` : ""].filter(Boolean);
};

export function mergeSpeakingThemes<T extends MergeableTheme>(themes: T[]): T[] {
  const merged: T[] = [];
  const groupIndex = new Map<string, number>();

  for (const theme of themes) {
    const keys = lookupKeys(theme);
    const foundKey = keys.find((k) => groupIndex.has(k));
    if (foundKey === undefined) {
      const index = merged.length;
      merged.push({ ...theme, sentences: [...theme.sentences] });
      keys.forEach((k) => groupIndex.set(k, index));
      continue;
    }
    const target = merged[groupIndex.get(foundKey) as number];
    keys.forEach((k) => { if (!groupIndex.has(k)) groupIndex.set(k, groupIndex.get(foundKey) as number); });
    const seen = new Set(target.sentences.map((s) => normalizeText(s.text)));
    for (const sentence of theme.sentences) {
      const text = normalizeText(sentence.text);
      if (!text || seen.has(text)) continue;
      seen.add(text);
      target.sentences.push(sentence);
    }
  }

  // Disambiguate names that survive at more than one level.
  const levelsByName = new Map<string, Set<string>>();
  const track = (key: string, level: string) => {
    if (!key) return;
    const set = levelsByName.get(key) ?? new Set<string>();
    set.add(level);
    levelsByName.set(key, set);
  };
  for (const theme of merged) {
    track(`en:${normalizeName(theme.name)}`, theme.level ?? "-");
    track(`vi:${normalizeName(theme.nameVi)}`, theme.level ?? "-");
  }

  return merged.map((theme) => {
    const spread =
      (levelsByName.get(`en:${normalizeName(theme.name)}`)?.size ?? 0) > 1 ||
      (levelsByName.get(`vi:${normalizeName(theme.nameVi)}`)?.size ?? 0) > 1;
    if (!spread || !theme.level) return theme;
    const suffix = ` (${theme.level})`;
    return {
      ...theme,
      name: theme.name.endsWith(suffix) ? theme.name : `${theme.name}${suffix}`,
      nameVi: theme.nameVi.endsWith(suffix) ? theme.nameVi : `${theme.nameVi}${suffix}`,
    };
  });
}
