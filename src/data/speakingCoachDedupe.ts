/**
 * @file speakingCoachDedupe.ts
 * @description Makes Speaking Coach theme and sentence IDs unique at assembly
 * time. Several expansion packs reuse the same IDs (e.g. "en-health" exists in
 * four packs, "en-g1" in two), which made progress/score records overwrite each
 * other and hid whole themes from selection state. Renaming the raw data would
 * break the themeLevels / themeTopUps lookups, so uniqueness is applied AFTER
 * those lookups run.
 */

interface DedupableSentence {
  id: string;
  [key: string]: unknown;
}

interface DedupableTheme {
  id: string;
  sentences: DedupableSentence[];
  [key: string]: unknown;
}

export function dedupeSpeakingThemes<T extends DedupableTheme>(themes: T[]): T[] {
  const themeSeen = new Map<string, number>();
  const sentenceSeen = new Set<string>();

  return themes.map((theme) => {
    const count = (themeSeen.get(theme.id) ?? 0) + 1;
    themeSeen.set(theme.id, count);
    const themeId = count === 1 ? theme.id : `${theme.id}-v${count}`;

    const sentences = theme.sentences.map((sentence) => {
      let id = sentence.id;
      if (sentenceSeen.has(id)) {
        // Namespace the duplicate under its (already unique) theme id.
        id = `${themeId}--${sentence.id}`;
        let n = 2;
        while (sentenceSeen.has(id)) id = `${themeId}--${sentence.id}-${n++}`;
      }
      sentenceSeen.add(id);
      return id === sentence.id ? sentence : { ...sentence, id };
    });

    return { ...theme, id: themeId, sentences } as T;
  });
}
