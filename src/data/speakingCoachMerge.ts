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

/** Key used to decide which themes belong together: name plus level. */
const mergeKey = (theme: MergeableTheme): string =>
  `${normalizeName(theme.name)}|${normalizeName(theme.nameVi)}|${theme.level ?? "-"}`;

/** Key used to detect a name spread over several levels. */
const nameKey = (theme: MergeableTheme): string =>
  `${normalizeName(theme.name)}|${normalizeName(theme.nameVi)}`;

export function mergeSpeakingThemes<T extends MergeableTheme>(themes: T[]): T[] {
  const order: string[] = [];
  const groups = new Map<string, T>();

  for (const theme of themes) {
    const key = mergeKey(theme);
    const existing = groups.get(key);
    if (!existing) {
      order.push(key);
      groups.set(key, { ...theme, sentences: [...theme.sentences] });
      continue;
    }
    const seen = new Set(existing.sentences.map((s) => normalizeText(s.text)));
    for (const sentence of theme.sentences) {
      const text = normalizeText(sentence.text);
      if (!text || seen.has(text)) continue;
      seen.add(text);
      existing.sentences.push(sentence);
    }
  }

  const merged = order.map((key) => groups.get(key) as T);

  // Disambiguate names that survive at more than one level.
  const levelsByName = new Map<string, Set<string>>();
  for (const theme of merged) {
    const key = nameKey(theme);
    const set = levelsByName.get(key) ?? new Set<string>();
    set.add(theme.level ?? "-");
    levelsByName.set(key, set);
  }

  return merged.map((theme) => {
    const levels = levelsByName.get(nameKey(theme));
    if (!levels || levels.size < 2 || !theme.level) return theme;
    const suffix = ` (${theme.level})`;
    return {
      ...theme,
      name: theme.name.endsWith(suffix) ? theme.name : `${theme.name}${suffix}`,
      nameVi: theme.nameVi.endsWith(suffix) ? theme.nameVi : `${theme.nameVi}${suffix}`,
    };
  });
}
