/**
 * @file lessonIndex.ts
 * @description Lazily-built lesson-level search index (module + lesson titles)
 * for the global Ctrl+K palette. Loaded on demand so the landing page stays light.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface LessonSearchEntry {
  to: string;
  vi: string;
  en: string;
  /** Parent course/module name, shown as a subtitle. */
  parentVi: string;
  parentEn: string;
}

let cache: LessonSearchEntry[] | null = null;
let inflight: Promise<LessonSearchEntry[]> | null = null;

const basePathFor = (category: string): string =>
  category === "hsk" || category === "chinese-conv" ? "/chinese/learn" : "/english/learn";

/** Build (once) and return the flat lesson index. */
export const loadLessonIndex = async (): Promise<LessonSearchEntry[]> => {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = (async () => {
    const mod = await import("@/data/languageCurriculum");
    const moduleGroups = [
      mod.allGrammarModules,
      mod.ieltsModules,
      mod.toeicModules,
      mod.cambridgeModules,
      mod.nationalExamModules,
      mod.hskModules,
      mod.chineseConvModules,
      mod.satModules,
    ].filter(Boolean);

    const entries: LessonSearchEntry[] = [];
    const seen = new Set<string>();

    for (const group of moduleGroups) {
      for (const m of group) {
        const base = basePathFor(m.category);
        for (const lesson of m.lessons || []) {
          const to = `${base}/${m.id}/${lesson.id}`;
          if (seen.has(to)) continue;
          seen.add(to);
          entries.push({
            to,
            vi: lesson.title,
            en: lesson.titleEn || lesson.title,
            parentVi: m.title,
            parentEn: m.titleEn || m.title,
          });
        }
      }
    }

    cache = entries;
    return entries;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
};
