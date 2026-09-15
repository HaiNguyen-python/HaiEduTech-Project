import type { LanguageModule } from "./types";

/**
 * Some grammar topics were historically split into two modules covering the
 * same ground (for example "Modal Verbs" and "Modal Verbs Deep Dive").
 * This layer folds the duplicate module into a single canonical module while
 * keeping every lesson id untouched, so saved student progress still resolves.
 */
export const MERGED_GRAMMAR_MODULE_IDS: Record<string, string> = {
  "grammar-modals-deep": "grammar-modals",
  "grammar-punctuation": "grammar-punctuation-boundaries",
  "grammar-question-forms": "grammar-questions-tags",
  "grammar-sv-agreement-advanced": "grammar-sv-agreement",
};

/** Optional copy overrides for the canonical module after merging. */
const MERGED_MODULE_COPY: Record<
  string,
  Partial<Pick<LanguageModule, "title" | "titleEn" | "description" | "descriptionEn">>
> = {
  "grammar-modals": {
    title: "Động từ khiếm khuyết (Modal Verbs)",
    titleEn: "Modal Verbs",
    description: "Can, could, may, might, must, should, ought to, had better - từ cơ bản đến suy đoán nâng cao.",
    descriptionEn: "Can, could, may, might, must, should, ought to and had better - from basics to advanced deduction.",
  },
  "grammar-punctuation-boundaries": {
    title: "Dấu câu & Ranh giới câu",
    titleEn: "Punctuation & Sentence Boundaries",
    description: "Dấu phẩy, dấu chấm phẩy, dấu hai chấm, dấu lược và cách tránh câu dính, câu thiếu.",
    descriptionEn: "Commas, semicolons, colons, apostrophes, and how to avoid run-ons and fragments.",
  },
  "grammar-questions-tags": {
    title: "Câu hỏi & Câu hỏi đuôi",
    titleEn: "Question Forms & Tag Questions",
    description: "Câu hỏi Yes/No, Wh-, câu hỏi gián tiếp và câu hỏi đuôi trong hội thoại.",
    descriptionEn: "Yes/No, Wh-, indirect questions and natural tag questions for conversation.",
  },
  "grammar-sv-agreement": {
    title: "Sự hòa hợp chủ ngữ - động từ",
    titleEn: "Subject-Verb Agreement",
    description: "Từ quy tắc cơ bản đến các trường hợp khó: danh từ tập thể, đại lượng, cấu trúc there is/are.",
    descriptionEn: "From core rules to tricky cases: collective nouns, quantities and there is/are structures.",
  },
};

export const resolveGrammarModuleId = (moduleId?: string | null) =>
  (moduleId && MERGED_GRAMMAR_MODULE_IDS[moduleId]) || moduleId || "";

export const mergeDuplicateGrammarModules = (modules: LanguageModule[]): LanguageModule[] => {
  const byId = new Map<string, LanguageModule>();
  const order: string[] = [];

  for (const mod of modules) {
    const targetId = MERGED_GRAMMAR_MODULE_IDS[mod.id] ?? mod.id;
    const existing = byId.get(targetId);

    if (!existing) {
      byId.set(targetId, { ...mod, id: targetId, lessons: [...mod.lessons] });
      order.push(targetId);
      continue;
    }

    const seen = new Set(existing.lessons.map((lesson) => lesson.id));
    byId.set(targetId, {
      ...existing,
      lessons: [...existing.lessons, ...mod.lessons.filter((lesson) => !seen.has(lesson.id))],
    });
  }

  return order.map((id) => {
    const mod = byId.get(id)!;
    const copy = MERGED_MODULE_COPY[id];
    return copy ? { ...mod, ...copy } : mod;
  });
};
