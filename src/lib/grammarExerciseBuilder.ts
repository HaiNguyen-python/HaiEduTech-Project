/**
 * @file grammarExerciseBuilder.ts
 * @description Guarantees that every English Grammar lesson offers a rich, varied
 *              practice set (fill-in-blank, reorder, error correction, sentence
 *              transformation, multiple choice, matching, dictation).
 *
 *              Design rules:
 *              1. Every generated item is derived deterministically from the
 *                 lesson's own theory, vocabulary and quiz - nothing is invented.
 *              2. A per-lesson registry guarantees a sentence is used by ONE
 *                 exercise only, so the same sentence can never reappear as a
 *                 fill-in-blank, then a reorder, then a dictation.
 *              3. Rule-description bullets ("Be going to expresses intention.")
 *                 are metalanguage, not practice material, and are filtered out.
 */
import type {
  DictationExercise,
  ErrorCorrectionExercise,
  FillInBlankExercise,
  InteractiveExercise,
  LanguageLesson,
  LanguageModule,
  MatchingExercise,
  MultipleChoiceExercise,
  SentenceReorderExercise,
  TransformationExercise,
} from "@/data/languageCurriculum/types";

const MIN_EXERCISES = 8;

const VIETNAMESE_CHAR_RE =
  /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;

const isEnglishOnly = (value: string) => !VIETNAMESE_CHAR_RE.test(value);

const clean = (value: string) =>
  value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();

const wordCount = (value: string) => value.split(/\s+/).filter(Boolean).length;

/** Every blank in the bank renders as exactly "___" so variants cannot diverge. */
const normalizeBlanks = (value: string) => value.replace(/_{2,}/g, "___");

/* ------------------------------------------------------- duplication control */

/**
 * Normalised identity of a practice sentence. Word-type cues in brackets and the
 * exact blank width are ignored, so "___" and "______" variants of one sentence -
 * or the annotated and plain versions - collapse to a single identity.
 */
const keyOf = (value: string) =>
  value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/_+/g, "_")
    .replace(/[.,!?;:"'`()[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();


/**
 * Tracks which source sentences a lesson has already spent. Each generator must
 * claim a sentence before using it, so no sentence powers two exercises.
 */
class SentenceRegistry {
  private used = new Set<string>();

  has(value: string) {
    return this.used.has(keyOf(value));
  }

  /** Reserve a sentence. Returns false when it was already spent. */
  claim(value: string) {
    const key = keyOf(value);
    if (!key || this.used.has(key)) return false;
    this.used.add(key);
    return true;
  }

  /** Mark a sentence as spent without asking (used for pre-existing content). */
  add(value: string) {
    const key = keyOf(value);
    if (key) this.used.add(key);
  }

  /** True when any variant of a gap sentence (blanked or filled) is spent. */
  hasAny(values: string[]) {
    return values.some((value) => this.has(value));
  }

  /** Claim every variant at once, or nothing at all. */
  claimAll(values: string[]) {
    if (this.hasAny(values)) return false;
    values.forEach((value) => this.add(value));
    return true;
  }

  get size() {
    return this.used.size;
  }
}

/** Blanked and filled variants of a gap sentence share one identity. */
const gapVariants = (text: string, answer: string) => {
  const blanked = normalizeBlanks(text);
  const filled = blanked.replace("___", answer.trim());
  return blanked === filled ? [blanked] : [blanked, filled];
};


/* -------------------------------------------------- metalanguage recognition */

/** Grammar-jargon head nouns: a sentence *about* grammar, not a practice item. */
const META_SUBJECT_RE =
  /\b(clauses?|pronouns?|verbs?|subjects?|objects?|tenses?|articles?|prepositions?|modals?|gerunds?|infinitives?|semicolons?|colons?|commas?|markers?|adverbs?|adjectives?|conjunctions?|structures?|forms?|patterns?|sentences?|questions?|agents?|inversions?|conditionals?|determiners?|quantifiers?)\b/i;

/** Verbs used only when describing a rule. */
const META_VERB_RE =
  /\b(follows?|guides?|avoids?|omits?|links?|forms?|takes?|gives?|provides?|adds?|precedes?|introduces?|stays? the same|sounds? (?:more|softer)|is (?:essential|optional|unique|common|a common)|are (?:essential|optional|common))\b/i;

/** Verbs that are pure metalanguage wherever they appear. */
const HARD_META_VERB_RE =
  /\b(express(?:es)?|indicat(?:e|es)|signal(?:s)?|denote(?:s)?|refers? to|is used|are used|emphasis(?:e|es|is)|describes the)\b/i;

const GERUND_START_RE = /^[A-Z][a-z]+ing\b/;
const FINITE_VERB_RE = /\b(is|are|was|were|will|can|could|should|must|do|does|did|has|have|had)\b/i;
/** Quoted grammar words or notation such as 'the', -ing, V-ing, to V. */
const NOTATION_RE = /(^|\s)['"][^'"]{1,20}['"]|(^|\s)-ing\b|\bV-?ing\b|\bto V\b|\bV[123]\b/;

/**
 * True when the line explains a rule instead of being usable practice English.
 * These bullets live in the theory next to real model sentences, so they leak
 * into reorder and dictation drills unless filtered.
 */
const isMetaSentence = (value: string) => {
  const text = value.trim();
  if (GERUND_START_RE.test(text) && !FINITE_VERB_RE.test(text)) return true;
  if (HARD_META_VERB_RE.test(text)) return true;
  if (NOTATION_RE.test(text)) return true;
  if (/\bsuch as\b/i.test(text) && META_SUBJECT_RE.test(text)) return true;
  if (/\b(?:no|not)\s+(?:do|does|did)\b/i.test(text)) return true;
  if (META_SUBJECT_RE.test(text) && META_VERB_RE.test(text)) return true;
  return false;
};

/* ------------------------------------------------------------------ parsing */

interface BoldSentence {
  sentence: string;
  bold: string;
}

/** Model sentences (bulleted, bolded target form) from a markdown theory block. */
const extractBoldSentences = (theory: string): BoldSentence[] => {
  const result: BoldSentence[] = [];

  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("-") && !line.startsWith("*")) continue;
    if (line.includes("|")) continue;
    const body = line.replace(/^[-*]\s+/, "");
    const bolds = [...body.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1].trim());
    if (bolds.length === 0) continue;
    const sentence = clean(body.replace(/\s*\([^)]*\)/g, ""));
    if (!/^[A-Z]/.test(sentence)) continue;
    if (!/[.!?]$/.test(sentence)) continue;
    if (sentence.includes("→") || sentence.includes(":")) continue;
    const count = wordCount(sentence);
    if (count < 5 || count > 16) continue;
    if (!isEnglishOnly(sentence)) continue;
    if (isMetaSentence(sentence)) continue;
    const bold = bolds[0];
    if (!sentence.includes(bold)) continue;
    result.push({ sentence, bold });
  }

  const seen = new Set<string>();
  return result.filter((item) => {
    const key = keyOf(item.sentence);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const extractPlainSentences = (theory: string): string[] => {
  const sentences: string[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("-") && !line.startsWith("*")) continue;
    if (line.includes("|")) continue;
    const sentence = clean(line.replace(/^[-*]\s+/, "").replace(/\s*\([^)]*\)/g, ""));
    if (!/^[A-Z]/.test(sentence) || !/[.!?]$/.test(sentence)) continue;
    if (sentence.includes("→") || sentence.includes(":")) continue;
    const count = wordCount(sentence);
    if (count < 5 || count > 14) continue;
    if (!isEnglishOnly(sentence)) continue;
    if (isMetaSentence(sentence)) continue;
    sentences.push(sentence);
  }
  const seen = new Set<string>();
  return sentences.filter((sentence) => {
    const key = keyOf(sentence);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

interface ContrastRow {
  sentence: string;
  bold: string;
  note: string;
}

/** Rows of the contrast box tables: | sentence | meaning/focus | */
const extractContrastRows = (theory: string): ContrastRow[] => {
  const rows: ContrastRow[] = [];

  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cells = line
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
    if (cells.length < 2) continue;
    if (cells.some((cell) => /^[-: ]+$/.test(cell))) continue;
    const rawSentence = cells[0];
    const note = clean(cells[1]);
    if (!note || !isEnglishOnly(note)) continue;
    const bolds = [...rawSentence.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1].trim());
    const sentence = clean(rawSentence);
    if (!/^[A-Z]/.test(sentence) || !/[.!?]$/.test(sentence)) continue;
    if (!isEnglishOnly(sentence)) continue;
    if (isMetaSentence(sentence)) continue;
    const count = wordCount(sentence);
    if (count < 4 || count > 18) continue;
    if (/^(sentence|form|structure|example)$/i.test(sentence.replace(/[.!?]$/, ""))) continue;
    rows.push({ sentence, bold: bolds[0] || "", note });
  }

  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = keyOf(row.sentence);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/* ------------------------------------------- extra topic-specific sources */

/** A wrong/right sentence pair harvested straight from the lesson content. */
interface ErrorPairSource {
  wrong: string;
  correct: string;
}



const stripEmphasis = (value: string) =>
  clean(value.replace(/\*\*/g, "\u0001").replace(/\*/g, "").replace(/\u0001/g, "**"));

const unquote = (value: string) => value.replace(/^["'“”]+/, "").replace(/["'“”]+$/, "").trim();

/** A sentence written as an example line, with its bolded target form. */
const parseExampleBody = (body: string): BoldSentence | null => {
  const emphasised = stripEmphasis(body);
  if (emphasised.includes("→")) return null;
  const bold = [...emphasised.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1].trim())[0] || "";
  const sentence = unquote(clean(emphasised.replace(/\*\*/g, "")));
  if (!/^[A-Z]/.test(sentence) || !/[.!?]$/.test(sentence)) return null;
  if (!isEnglishOnly(sentence) || isMetaSentence(sentence)) return null;
  if (/[|❌✅]/.test(sentence)) return null;
  const count = wordCount(sentence);
  if (count < 4 || count > 18) return null;
  if (bold && !sentence.includes(bold)) return { sentence, bold: "" };
  return { sentence, bold };
};

/** "E.g.: *She **goes** to school every day.*" lines across the theory. */
const extractEgExamples = (theory: string): BoldSentence[] => {
  const out: BoldSentence[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    const match = line.match(/^[-*]?\s*(?:e\.?\s*g\.?|example|ex)\s*:\s*(.+)$/i);
    if (!match) continue;
    const parsed = parseExampleBody(match[1]);
    if (parsed) out.push(parsed);
  }
  const seen = new Set<string>();
  return out.filter((item) => {
    const key = keyOf(item.sentence);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/** "- **SVO**: *They study English.*" - a labelled pattern plus its example. */
const extractLabelledExamples = (theory: string) => {
  const out: { label: string; sentence: string; bold: string }[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    const match = line.match(/^[-*]\s+\*\*([^*]+)\*\*\s*:\s*(.+)$/);
    if (!match) continue;
    const label = clean(match[1]);
    if (!label || !isEnglishOnly(label) || wordCount(label) > 6) continue;
    if (/^(structure|usage|form|note|tip)$/i.test(label)) continue;
    const parsed = parseExampleBody(match[2]);
    if (!parsed) continue;
    out.push({ label, sentence: parsed.sentence, bold: parsed.bold });
  }
  const seen = new Set<string>();
  return out.filter((item) => {
    const key = keyOf(item.sentence);
    if (seen.has(key) || keyOf(item.label) === key) return false;
    seen.add(key);
    return true;
  });
};

/** "❌ wrong / ✅ right" pairs in the Common errors block. */
const extractWrongRightPairs = (theory: string): ErrorPairSource[] => {
  const out: ErrorPairSource[] = [];
  let pendingWrong = "";

  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    const isWrong = /[❌✗]|(^|\s)(wrong|incorrect)\s*:/i.test(line);
    const isRight = /[✅✔]|(^|\s)(right|correct)\s*:/i.test(line);
    if (!isWrong && !isRight) continue;
    const body = stripEmphasis(
      line
        .replace(/^[-*]\s*/, "")
        .replace(/[❌✗✅✔]/g, " ")
        .replace(/^\s*(wrong|incorrect|right|correct)\s*:\s*/i, "")
    );
    const sentence = unquote(clean(body.replace(/\*\*/g, "")));
    if (!/^[A-Z]/.test(sentence) || !/[.!?]$/.test(sentence)) continue;
    if (!isEnglishOnly(sentence)) continue;
    const count = wordCount(sentence);
    if (count < 3 || count > 20) continue;

    if (isWrong) {
      pendingWrong = sentence;
    } else if (pendingWrong && keyOf(pendingWrong) !== keyOf(sentence)) {
      out.push({ wrong: pendingWrong, correct: sentence });
      pendingWrong = "";
    }
  }
  return out;
};

/** '"I am tired." → He said he was tired.' - a ready-made transformation. */
const extractArrowPairs = (theory: string) => {
  const out: { prompt: string; target: string }[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.includes("→") || line.startsWith("|")) continue;
    const body = stripEmphasis(line.replace(/^[-*]\s*/, "").replace(/^(?:e\.?\s*g\.?)\s*:\s*/i, ""));
    const [rawLeft, rawRight, ...rest] = body.split("→");
    if (!rawRight || rest.length) continue;
    const prompt = unquote(clean(rawLeft.replace(/\*\*/g, "")));
    const target = unquote(clean(rawRight.replace(/\*\*/g, "").replace(/\s*\([^)]*\)\s*/g, " ")));
    if (!/^[A-Z]/.test(prompt) || !/^[A-Z]/.test(target)) continue;
    if (!/[.!?]$/.test(prompt) || !/[.!?]$/.test(target)) continue;
    if (!isEnglishOnly(prompt) || !isEnglishOnly(target)) continue;
    if (keyOf(prompt) === keyOf(target)) continue;
    if (wordCount(prompt) < 3 || wordCount(target) < 3 || wordCount(target) > 20) continue;
    out.push({ prompt, target });
  }
  const seen = new Set<string>();
  return out.filter((item) => {
    const key = keyOf(item.target);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/** Two-column reference tables (Direct/Reported, Tense/Keywords) become matching. */
const extractTablePairs = (theory: string) => {
  const out: { left: string; right: string }[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cells = line.slice(1, -1).split("|").map((cell) => clean(cell.replace(/\*\*/g, "").replace(/→/g, " ")));
    if (cells.length !== 2) continue;
    if (cells.some((cell) => !cell || /^[-: ]+$/.test(cell))) continue;
    const [left, right] = cells;
    if (!isEnglishOnly(left) || !isEnglishOnly(right)) continue;
    if (/^(direct|reported|tense|keywords?|form|structure|meaning|sentence|example|usage|note)$/i.test(left)) continue;
    if (wordCount(left) > 6 || wordCount(right) > 10) continue;
    if (/[.!?]$/.test(left) || /[.!?]$/.test(right)) continue;
    if (keyOf(left) === keyOf(right)) continue;
    out.push({ left, right });
  }
  const seenLeft = new Set<string>();
  const seenRight = new Set<string>();
  return out.filter((pair) => {
    const l = keyOf(pair.left);
    const r = keyOf(pair.right);
    if (seenLeft.has(l) || seenRight.has(r)) return false;
    seenLeft.add(l);
    seenRight.add(r);
    return true;
  });
};


/* --------------------------------------------------------------- generators */

const vocabSentences = (lesson: LanguageLesson) =>
  (lesson.vocabulary ?? [])
    .map((entry) => ({
      sentence: clean(entry.exampleEn || entry.example || ""),
      word: entry.word.trim(),
      meaning: clean(entry.meaningEn || entry.meaning || ""),
    }))
    .filter((item) => {
      if (!item.sentence || !item.word || !isEnglishOnly(item.sentence)) return false;
      if (isMetaSentence(item.sentence)) return false;
      const count = wordCount(item.sentence);
      return count >= 4 && count <= 16;
    });

/** Short English label for this lesson's grammar focus, used in MCQ stems. */
const topicLabel = (lesson: LanguageLesson) => {
  const raw = (lesson.titleEn || lesson.title || "").trim();
  if (!raw || !isEnglishOnly(raw)) return "this structure";
  return raw
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const escapeRe = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildFillInBlanks = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): FillInBlankExercise[] => {
  const exercises: FillInBlankExercise[] = [];

  // 1) Blank the bolded target form inside the lesson's own model sentences.
  const bold = extractBoldSentences(lesson.theoryEn || "").filter((item) => !registry.has(item.sentence));
  const chosen = bold
    .slice(0, 4)
    .filter((item) => registry.claimAll([item.sentence, item.sentence.replace(item.bold, "___")]));


  if (chosen.length >= 3) {
    exercises.push({
      type: "fill-in-blank",
      instruction: "Điền dạng đúng vào chỗ trống (theo câu mẫu của bài).",
      instructionEn: "Complete each model sentence with the correct grammar form.",
      sentences: chosen.map((item) => ({
        text: normalizeBlanks(item.sentence.replace(item.bold, "___")),
        textEn: normalizeBlanks(item.sentence.replace(item.bold, "___")),
        answer: item.bold,
        hint: `${wordCount(item.bold)} word(s) - focus on the target structure of this lesson.`,
      })),
    });
  }

  // 2) Blank the key word inside vocabulary examples.
  const vocabItems = vocabSentences(lesson)
    .filter((item) => !registry.has(item.sentence))
    .map((item) => {
      const pattern = new RegExp(escapeRe(item.word), "i");
      if (!pattern.test(item.sentence)) return null;
      if (!registry.claimAll([item.sentence, item.sentence.replace(pattern, "___")])) return null;

      return {
        text: normalizeBlanks(item.sentence.replace(pattern, "___")),
        textEn: normalizeBlanks(item.sentence.replace(pattern, "___")),
        answer: item.word,
        hint: item.meaning || "Recall the key phrase from this lesson.",
      };
    })
    .filter(Boolean) as FillInBlankExercise["sentences"];

  if (vocabItems.length >= 3) {
    exercises.push({
      type: "fill-in-blank",
      instruction: "Điền cụm từ đúng vào chỗ trống.",
      instructionEn: "Complete each sentence with the correct word or phrase.",
      sentences: vocabItems.slice(0, 4),
    });
  }

  return exercises;
};

/** Deterministic scramble so the practice stays stable between renders. */
const scramble = (words: string[], seed: number) => {
  const output = [...words];
  let state = seed || 1;
  for (let i = output.length - 1; i > 0; i -= 1) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output.join(" ") === words.join(" ") && output.length > 1
    ? [...output.slice(1), output[0]]
    : output;
};

const collectSentences = (lesson: LanguageLesson): string[] => {
  const theory = lesson.theoryEn || "";
  const fromTheory = extractPlainSentences(theory);
  const fromExamples = extractEgExamples(theory).map((item) => item.sentence);
  const fromLabelled = extractLabelledExamples(theory).map((item) => item.sentence);
  const fromArrows = extractArrowPairs(theory).map((item) => item.target);
  const fromVocab = vocabSentences(lesson).map((item) => item.sentence);
  const seen = new Set<string>();
  return [...fromTheory, ...fromExamples, ...fromLabelled, ...fromArrows, ...fromVocab].filter((sentence) => {
    const key = keyOf(sentence);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};


const seedOf = (lesson: LanguageLesson) =>
  lesson.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

const buildReorders = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): SentenceReorderExercise[] => {
  const available = collectSentences(lesson).filter((sentence) => !registry.has(sentence));
  if (available.length < 3) return [];
  const seedBase = seedOf(lesson);
  const chunks: SentenceReorderExercise[] = [];

  for (let index = 0; index < available.length && chunks.length < 2; ) {
    const batch: string[] = [];
    while (index < available.length && batch.length < 4) {
      const sentence = available[index];
      index += 1;
      if (registry.claim(sentence)) batch.push(sentence);
    }
    if (batch.length < 3) break;
    chunks.push({
      type: "sentence-reorder",
      instruction: "Sắp xếp các từ thành câu đúng.",
      instructionEn: "Put the words in the correct order.",
      items: batch.map((sentence, i) => ({
        scrambled: scramble(sentence.replace(/[.?!]$/, "").split(/\s+/), seedBase + (chunks.length * 4 + i) * 17),
        correct: sentence,
        correctEn: sentence,
      })),
    });
  }
  return chunks;
};

const buildDictations = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): DictationExercise[] => {
  const available = collectSentences(lesson).filter((sentence) => !registry.has(sentence));
  const batch: string[] = [];
  for (const sentence of available) {
    if (batch.length >= 4) break;
    if (registry.claim(sentence)) batch.push(sentence);
  }
  if (batch.length < 3) return [];
  return [
    {
      type: "dictation",
      instruction: "Nghe và viết lại câu mẫu.",
      instructionEn: "Listen and type the model sentence.",
      sentences: batch.map((sentence) => ({ text: sentence })),
    },
  ];
};

const BAD_STEM_RE =
  /(complete the sentence|fill in the blank|choose the correct|which (sentence|verb|option)|__|→|\*|\|)/i;

/** A usable practice sentence: real sentence, no scaffolding text, no markers. */
const isCleanSentence = (value: string) => {
  const text = value.trim();
  if (!text) return false;
  if (!/^[A-Z"']/.test(text)) return false;
  if (!/[.!?]["']?$/.test(text)) return false;
  if (BAD_STEM_RE.test(text)) return false;
  if (!isEnglishOnly(text)) return false;
  if (isMetaSentence(text)) return false;
  const count = wordCount(text);
  return count >= 4 && count <= 22;
};

/** Strip quiz scaffolding around a gap-fill stem: quotes and trailing prompts. */
const sanitizeStem = (raw: string) => {
  let stem = raw.trim().replace(/\*/g, "").replace(/_{2,}/g, "___");
  stem = stem.replace(/\s*-\s*(choose|select|pick)[^.]*:?\s*$/i, "");
  stem = stem.replace(
    /^(complete the sentence correctly|fill in the blank|complete the sentence|choose the correct form)\s*:?\s*/i,
    ""
  );
  stem = stem.replace(/^["'“”']+/, "").replace(/["'“”']+$/, "");
  stem = stem.replace(/\s*\([^)]*\)/g, "");
  return clean(stem);
};

/** Quiz options carry italic markers; practice sentences must not. */
const sanitizeOption = (raw: string) => clean(raw.replace(/\*/g, "").trim());


const isInlineForm = (option: string) => {
  const text = option.trim();
  if (!text) return false;
  if (/[→*|]/.test(text)) return false;
  if (/[.!?]/.test(text)) return false;
  if (!isEnglishOnly(text)) return false;
  return wordCount(text) <= 6;
};

const differsIgnoringCase = (a: string, b: string) =>
  a.replace(/\s+/g, " ").trim().toLowerCase() !== b.replace(/\s+/g, " ").trim().toLowerCase();

interface ErrorPair {
  wrong: string;
  correct: string;
  explanation?: string;
}

/**
 * Error pairs harvested from the lesson quiz:
 * - "choose the correct sentence" items give a wrong sentence + the right one;
 * - clean gap-fill items are rebuilt with a wrong option to create a faulty sentence.
 */
const collectErrorPairs = (lesson: LanguageLesson, registry: SentenceRegistry, limit: number) => {
  const items: ErrorPair[] = [];

  for (const question of lesson.quiz) {
    if (items.length >= limit) break;
    const correctOption = sanitizeOption(question.options[question.answer] ?? "");
    if (!correctOption) continue;
    const wrongOption = question.options
      .map((option, idx) => (idx === question.answer ? "" : sanitizeOption(option)))
      .find((option) => option.length > 0);
    if (!wrongOption) continue;

    const stem = question.question.trim();
    const explanation =
      question.explanation && isEnglishOnly(question.explanation) && !BAD_STEM_RE.test(question.explanation)
        ? clean(question.explanation.replace(/\*/g, ""))
        : undefined;

    const push = (wrong: string, correct: string) => {
      if (!isCleanSentence(wrong) || !isCleanSentence(correct)) return;
      if (!differsIgnoringCase(wrong, correct)) return;
      if (!registry.claimAll([correct, wrong])) return;
      items.push({ wrong: clean(wrong), correct: clean(correct), explanation });
    };

    // Case A: options are complete sentences.
    if (isCleanSentence(correctOption) && isCleanSentence(wrongOption)) {
      push(wrongOption, correctOption);
      continue;
    }

    // Case B: a clean gap-fill stem plus short inline forms.
    if (!/_{2,}/.test(stem)) continue;
    const base = sanitizeStem(stem);
    if (!base.includes("___")) continue;
    if (BAD_STEM_RE.test(base.replace("___", "x"))) continue;
    if (!isInlineForm(correctOption) || !isInlineForm(wrongOption)) continue;
    push(base.replace("___", wrongOption), base.replace("___", correctOption));
  }


  return items;
};

const buildErrorCorrection = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): ErrorCorrectionExercise | null => {
  const items = collectErrorPairs(lesson, registry, 4);
  if (items.length < 2) return null;

  return {
    type: "error-correction",
    instruction: "Tìm lỗi ngữ pháp và viết lại câu đúng.",
    instructionEn: "Each sentence has one grammar mistake. Rewrite it correctly.",
    items: items.slice(0, 4),
  };
};

/** Transformations come from the contrast box: same base sentence, different form. */
const buildTransformation = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): TransformationExercise | null => {
  const rows = extractContrastRows(lesson.theoryEn || "").filter((row) => !registry.has(row.sentence));
  if (rows.length < 2) return null;

  const base = rows[0];
  const items = rows
    .slice(1)
    .filter((row) => keyOf(row.sentence) !== keyOf(base.sentence))
    .slice(0, 3)
    .filter((row) => registry.claim(row.sentence))
    .map((row) => ({
      prompt: base.sentence,
      target: row.sentence,
      cue: row.bold || undefined,
      goal: row.note,
    }));

  if (items.length === 0) return null;
  registry.claim(base.sentence);

  return {
    type: "transformation",
    instruction: "Viết lại câu để diễn đạt đúng ý được yêu cầu.",
    instructionEn: "Rewrite the sentence so that it expresses the meaning shown.",
    items,
  };
};

/** MCQ built from the lesson's model sentences: pick the correct target form. */
const buildMultipleChoice = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MultipleChoiceExercise | null => {
  const allBold = extractBoldSentences(lesson.theoryEn || "");
  const forms = Array.from(new Set(allBold.map((item) => item.bold))).filter((form) => wordCount(form) <= 5);
  const bold = allBold.filter((item) => !registry.has(item.sentence));
  if (bold.length < 3 || forms.length < 3) return null;

  const questions = bold
    .slice(0, 4)
    .map((item, index) => {
      const distractors = forms.filter((form) => form.toLowerCase() !== item.bold.toLowerCase()).slice(0, 3);
      if (distractors.length < 2) return null;
      const options = Array.from(
        new Map([...distractors.slice(0, 3), item.bold].map((option) => [option.toLowerCase(), option])).values()
      );
      if (options.length < 3 || !options.includes(item.bold)) return null;
      if (!registry.claimAll([item.sentence, item.sentence.replace(item.bold, "___")])) return null;

      const shift = index % options.length;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      return {
        question: normalizeBlanks(item.sentence.replace(item.bold, "___")),
        options: rotated,
        answer: rotated.findIndex((option) => option === item.bold),
        explanation: `"${item.bold}" is the form this lesson uses in that context.`,
      };
    })
    .filter(Boolean) as MultipleChoiceExercise["questions"];

  if (questions.length < 3) return null;

  return {
    type: "multiple-choice",
    instruction: "Chọn dạng đúng cho mỗi câu.",
    instructionEn: "Choose the correct form for each sentence.",
    questions,
  };
};

/** Matching pairs come from vocabulary (word - meaning) or the contrast box. */
const buildMatching = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MatchingExercise | null => {
  const vocabPairs = (lesson.vocabulary ?? [])
    .map((entry) => ({
      left: entry.word.trim(),
      right: clean(entry.meaningEn || ""),
    }))
    .filter((pair) => pair.left && pair.right && isEnglishOnly(pair.right));

  const seenRight = new Set<string>();
  const uniqueVocabPairs = vocabPairs.filter((pair) => {
    const key = keyOf(pair.right);
    if (seenRight.has(key) || keyOf(pair.left) === key) return false;
    seenRight.add(key);
    return true;
  });

  if (uniqueVocabPairs.length >= 4) {
    return {
      type: "matching",
      instruction: "Nối từ/cụm từ với nghĩa đúng.",
      instructionEn: "Match each word or phrase with its meaning.",
      pairs: uniqueVocabPairs.slice(0, 5),
    };
  }

  const rows = extractContrastRows(lesson.theoryEn || "").filter((row) => {
    if (registry.has(row.sentence)) return false;
    const key = keyOf(row.note);
    if (seenRight.has(key)) return false;
    seenRight.add(key);
    return true;
  });
  if (rows.length >= 3) {
    const chosen = rows.slice(0, 4).filter((row) => registry.claim(row.sentence));
    if (chosen.length >= 3) {
      return {
        type: "matching",
        instruction: "Nối câu với cách hiểu đúng.",
        instructionEn: "Match each sentence with the meaning it expresses.",
        pairs: chosen.map((row) => ({ left: row.sentence, right: row.note })),
      };
    }
  }

  return null;
};

/** Fill-in-blank drill rebuilt from clean gap-fill quiz stems. */
const buildQuizFillInBlank = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): FillInBlankExercise | null => {
  const sentences = lesson.quiz
    .map((question) => {
      const answer = sanitizeOption(question.options[question.answer] ?? "");
      if (!/_{2,}/.test(question.question) || !answer) return null;
      const text = sanitizeStem(question.question);
      if (!text.includes("___")) return null;
      if (BAD_STEM_RE.test(text.replace("___", "x"))) return null;
      if (!isInlineForm(answer)) return null;
      if (!isEnglishOnly(text)) return null;
      if (!registry.claimAll(gapVariants(text, answer))) return null;

      return {
        text,
        textEn: text,
        answer,
        hint:
          question.explanation && isEnglishOnly(question.explanation) && !BAD_STEM_RE.test(question.explanation)
            ? clean(question.explanation.replace(/\*/g, ""))
            : "Choose the form this lesson focuses on.",
      };
    })

    .filter(Boolean) as FillInBlankExercise["sentences"];

  if (sentences.length < 3) return null;

  return {
    type: "fill-in-blank",
    instruction: "Điền dạng đúng vào chỗ trống (ôn tập).",
    instructionEn: "Review drill: complete each sentence with the correct form.",
    sentences: sentences.slice(0, 4),
  };
};

/** The word that makes the correct version correct, used to build a clear stem. */
const diffToken = (correct: string, wrong: string) => {
  const wrongWords = new Set(wrong.toLowerCase().replace(/[.,!?;:"']/g, "").split(/\s+/));
  const token = correct
    .replace(/[.,!?;:"']/g, "")
    .split(/\s+/)
    .find((word) => word.length > 1 && !wrongWords.has(word.toLowerCase()));
  return token || "";
};

/** "Which sentence is correct?" drill, with a topic-specific stem per item. */
const buildCorrectSentenceMcq = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MultipleChoiceExercise | null => {
  const pairs = collectErrorPairs(lesson, registry, 4);
  if (pairs.length < 3) return null;

  const topic = topicLabel(lesson);
  const usedStems = new Set<string>();

  const questions = pairs.slice(0, 4).map((item, index) => {
    const wrongs = pairs
      .filter((other) => keyOf(other.correct) !== keyOf(item.correct))
      .map((other) => other.wrong)
      .slice(0, 2);
    const options = Array.from(
      new Map([item.correct, item.wrong, ...wrongs].map((option) => [option.toLowerCase(), option])).values()
    );
    const shift = index % options.length;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];

    const token = diffToken(item.correct, item.wrong);
    const opening = item.correct.split(/\s+/).slice(0, 3).join(" ");
    const candidates = [
      token ? `Which sentence uses "${token}" correctly in ${topic}?` : "",
      `Which version of "${opening} ..." is correct?`,
      `Which sentence follows the ${topic} rule correctly? (${index + 1})`,
    ].filter(Boolean);
    const stem = candidates.find((candidate) => !usedStems.has(candidate)) || candidates[candidates.length - 1];
    usedStems.add(stem);

    return {
      question: stem,
      options: rotated,
      answer: rotated.indexOf(item.correct),
      explanation: item.explanation || `Correct version: ${item.correct}`,
    };
  });

  if (questions.some((question) => question.options.length < 3 || question.answer < 0)) return null;

  return {
    type: "multiple-choice",
    instruction: "Chọn câu đúng ngữ pháp.",
    instructionEn: "Choose the grammatically correct sentence.",
    questions,
  };
};

/** Matching drill: key phrase paired with the sentence it belongs to. */
const buildSentenceMatching = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MatchingExercise | null => {
  const seenRight = new Set<string>();
  const pairs = vocabSentences(lesson)
    .filter((item) => !registry.has(item.sentence))
    .map((item) => {
      const pattern = new RegExp(escapeRe(item.word), "i");
      if (!pattern.test(item.sentence)) return null;
      const right = normalizeBlanks(item.sentence.replace(pattern, "___"));
      const key = keyOf(right);
      if (seenRight.has(key)) return null;
      if (!registry.claimAll([item.sentence, right])) return null;

      seenRight.add(key);
      return { left: item.word, right };
    })
    .filter(Boolean) as MatchingExercise["pairs"];

  if (pairs.length < 3) return null;

  return {
    type: "matching",
    instruction: "Nối từ khoá với câu chứa từ đó.",
    instructionEn: "Match each key phrase with the sentence it completes.",
    pairs: pairs.slice(0, 5),
  };
};

/** Bold noun phrases (no sentence punctuation) used by phrase-level drills. */
const extractBoldPhrases = (theory: string) => {
  const items: { line: string; bold: string }[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!/^[-*]\s+/.test(line)) continue;
    const match = line.match(/\*\*(.+?)\*\*/);
    if (!match) continue;
    const text = clean(line.replace(/^[-*]\s+/, ""));
    const bold = clean(match[1]);
    if (!isEnglishOnly(text) || /[|→]/.test(text)) continue;
    if (isMetaSentence(text)) continue;
    if (wordCount(text) < 3 || wordCount(text) > 18) continue;
    if (wordCount(bold) < 2) continue;
    if (!text.includes(bold)) continue;
    items.push({ line: text, bold });
  }
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyOf(item.line);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/** Phrase-level practice for lessons whose models are noun phrases, not sentences. */
const buildPhraseDrills = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): InteractiveExercise[] => {
  const phrases = extractBoldPhrases(lesson.theoryEn || "").filter((item) => !registry.has(item.line));
  if (phrases.length < 3) return [];
  const seedBase = seedOf(lesson);
  const drills: InteractiveExercise[] = [];

  const forBlank = phrases.slice(0, 4).filter((item) => registry.claim(item.line));
  if (forBlank.length >= 3) {
    drills.push({
      type: "fill-in-blank",
      instruction: "Điền cụm từ đúng vào chỗ trống.",
      instructionEn: "Complete each phrase with the correct words in the correct order.",
      sentences: forBlank.map((item) => ({
        text: normalizeBlanks(item.line.replace(item.bold, "___")),
        textEn: normalizeBlanks(item.line.replace(item.bold, "___")),
        answer: item.bold,
        hint: `${wordCount(item.bold)} word(s) in the order this lesson teaches.`,
      })),
    });
  }

  const forReorder = phrases
    .filter((item) => !registry.has(item.line))
    .slice(0, 4)
    .filter((item) => registry.claim(item.line));
  if (forReorder.length >= 3) {
    drills.push({
      type: "sentence-reorder",
      instruction: "Sắp xếp các từ theo đúng trật tự.",
      instructionEn: "Put the words in the correct order.",
      items: forReorder.map((item, index) => ({
        scrambled: scramble(item.line.split(/\s+/), seedBase + index * 23),
        correct: item.line,
        correctEn: item.line,
      })),
    });
  }

  const seen = new Set<string>();
  const pairs = phrases
    .filter((item) => !registry.has(item.line))
    .map((item) => ({ left: item.bold, right: normalizeBlanks(item.line.replace(item.bold, "___")), src: item.line }))
    .filter((pair) => {
      const key = keyOf(pair.right);
      if (seen.has(key) || keyOf(pair.left) === key) return false;
      if (!registry.claim(pair.src)) return false;
      seen.add(key);
      return true;
    });
  if (pairs.length >= 3) {
    drills.push({
      type: "matching",
      instruction: "Nối cụm từ với vị trí đúng của nó.",
      instructionEn: "Match each phrase with the slot it belongs to.",
      pairs: pairs.slice(0, 5).map(({ left, right }) => ({ left, right })),
    });
  }

  return drills;
};

/** MCQ built from the lesson vocabulary: pick the phrase that fits the gap. */
const buildVocabMcq = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MultipleChoiceExercise | null => {
  const all = vocabSentences(lesson).filter((item) => new RegExp(escapeRe(item.word), "i").test(item.sentence));
  const entries = all.filter((item) => !registry.has(item.sentence));
  if (entries.length < 3 || all.length < 3) return null;

  const questions = entries
    .slice(0, 4)
    .map((item, index) => {
      const pattern = new RegExp(escapeRe(item.word), "i");
      const distractors = all
        .filter((other) => other.word.toLowerCase() !== item.word.toLowerCase())
        .map((other) => other.word)
        .slice(0, 3);
      const options = Array.from(
        new Map([item.word, ...distractors].map((option) => [option.toLowerCase(), option])).values()
      );
      if (options.length < 3) return null;
      if (!registry.claimAll([item.sentence, item.sentence.replace(pattern, "___")])) return null;
      const shift = index % options.length;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      return {
        question: `Choose the phrase that completes: ${normalizeBlanks(item.sentence.replace(pattern, "___"))}`,
        options: rotated,
        answer: rotated.indexOf(item.word),
        explanation: `"${item.word}" fits the meaning of this sentence.`,
      };
    })
    .filter(Boolean) as MultipleChoiceExercise["questions"];

  if (questions.length < 3) return null;
  if (questions.some((question) => question.options.length < 3 || question.answer < 0)) return null;

  return {
    type: "multiple-choice",
    instruction: "Chọn cụm từ đúng để hoàn thành câu.",
    instructionEn: "Choose the phrase that correctly completes each sentence.",
    questions,
  };
};

/* -------------------------------------- drills from the extra source blocks */

/** Gap-fill on the lesson's "E.g." model sentences (bolded form removed). */
const buildExampleFillInBlank = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): FillInBlankExercise | null => {
  const items = extractEgExamples(lesson.theoryEn || "")
    .filter((item) => item.bold && item.sentence.includes(item.bold))
    .filter((item) => registry.claimAll([item.sentence, item.sentence.replace(item.bold, "___")]))
    .slice(0, 4)
    .map((item) => ({
      text: normalizeBlanks(item.sentence.replace(item.bold, "___")),
      textEn: normalizeBlanks(item.sentence.replace(item.bold, "___")),
      answer: item.bold,
      hint: `${wordCount(item.bold)} word(s) - the target form taught in this lesson.`,
    }));

  if (items.length < 3) return null;

  return {
    type: "fill-in-blank",
    instruction: "Điền dạng đúng vào các câu ví dụ của bài.",
    instructionEn: "Complete each example sentence with the correct target form.",
    sentences: items,
  };
};

/** Error correction taken from the lesson's own wrong/right error box. */
const buildWrongRightErrorCorrection = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): ErrorCorrectionExercise | null => {
  const items = extractWrongRightPairs(lesson.theoryEn || "")
    .filter((pair) => registry.claimAll([pair.correct, pair.wrong]))
    .slice(0, 4)
    .map((pair) => ({
      wrong: pair.wrong,
      correct: pair.correct,
      explanation: undefined,
    }));

  if (items.length < 2) return null;

  return {
    type: "error-correction",
    instruction: "Sửa lỗi thường gặp của bài này.",
    instructionEn: "These are the typical mistakes for this topic. Rewrite each sentence correctly.",
    items,
  };
};

/** Ready-made transformations written in the theory as "A → B". */
const buildArrowTransformation = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): TransformationExercise | null => {
  const items = extractArrowPairs(lesson.theoryEn || "")
    .filter((pair) => registry.claimAll([pair.target]))
    .slice(0, 4)
    .map((pair) => ({
      prompt: pair.prompt,
      target: pair.target,
      goal: "Rewrite it the way this lesson teaches.",
    }));

  if (items.length === 0) return null;

  return {
    type: "transformation",
    instruction: "Chuyển đổi câu theo mẫu của bài.",
    instructionEn: "Transform each sentence following the pattern of this lesson.",
    items,
  };
};

/** Matching built from the lesson's own reference table. */
const buildTableMatching = (lesson: LanguageLesson): MatchingExercise | null => {
  const pairs = extractTablePairs(lesson.theoryEn || "").slice(0, 5);
  if (pairs.length < 3) return null;

  return {
    type: "matching",
    instruction: "Nối hai cột theo bảng tra của bài.",
    instructionEn: "Match the two columns using the reference table of this lesson.",
    pairs,
  };
};

/** Matching a pattern label (SVO, SVOC ...) with the example that shows it. */
const buildLabelMatching = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MatchingExercise | null => {
  const pairs = extractLabelledExamples(lesson.theoryEn || "")
    .filter((item) => registry.claimAll([item.sentence]))
    .slice(0, 5)
    .map((item) => ({ left: item.label, right: item.sentence }));

  if (pairs.length < 3) return null;

  return {
    type: "matching",
    instruction: "Nối cấu trúc với câu ví dụ đúng.",
    instructionEn: "Match each structure with the example sentence that uses it.",
    pairs,
  };
};

/** MCQ: which label describes this example sentence? */
const buildLabelMcq = (
  lesson: LanguageLesson,
  registry: SentenceRegistry
): MultipleChoiceExercise | null => {
  const all = extractLabelledExamples(lesson.theoryEn || "");
  const labels = Array.from(new Set(all.map((item) => item.label)));
  if (labels.length < 3) return null;

  const questions = all
    .filter((item) => registry.claimAll([item.sentence]))
    .slice(0, 4)
    .map((item, index) => {
      const distractors = labels.filter((label) => label !== item.label).slice(0, 3);
      const options = [item.label, ...distractors];
      const shift = index % options.length;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      return {
        question: `Which structure does this sentence use? "${item.sentence}"`,
        options: rotated,
        answer: rotated.indexOf(item.label),
        explanation: `"${item.sentence}" follows the ${item.label} pattern.`,
      };
    });

  if (questions.length < 3) return null;

  return {
    type: "multiple-choice",
    instruction: "Chọn cấu trúc đúng của mỗi câu.",
    instructionEn: "Choose the structure each sentence follows.",
    questions,
  };
};


/* ------------------------------------------------------------------- merging */

const signature = (exercise: InteractiveExercise) => JSON.stringify(exercise).slice(0, 400);

const tokenKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/[.,!?;:"'`]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .sort()
    .join(" ");

/** Legacy reorder items sometimes list words that do not match the answer. */
const repairReorder = (lesson: LanguageLesson): LanguageLesson => {
  const seedBase = seedOf(lesson);
  let changed = false;

  const exercises = lesson.exercises.map((exercise, exerciseIndex) => {
    if (exercise.type !== "sentence-reorder") return exercise;
    const items = exercise.items.map((item, index) => {
      const answer = item.correctEn || item.correct;
      if (tokenKey(item.scrambled.join(" ")) === tokenKey(answer)) return item;
      changed = true;
      return {
        ...item,
        scrambled: scramble(answer.split(/\s+/), seedBase + exerciseIndex * 31 + index * 7),
      };
    });
    return changed ? { ...exercise, items } : exercise;
  });

  return changed ? { ...lesson, exercises } : lesson;
};

/** Minimum item count an exercise needs to remain useful after de-duplication. */
const MIN_ITEMS: Record<string, number> = {
  "fill-in-blank": 2,
  "sentence-reorder": 2,
  dictation: 2,
  "error-correction": 2,
  "multiple-choice": 2,
  transformation: 1,
  matching: 3,
};

/**
 * Removes repeated items from the lesson's authored exercises and registers what
 * survives, so generated drills never echo hand-written content.
 */
const dedupeExisting = (
  exercises: InteractiveExercise[],
  registry: SentenceRegistry
): InteractiveExercise[] => {
  const stems = new Set<string>();
  const output: InteractiveExercise[] = [];

  const keep = (value: string) => {
    const key = keyOf(value);
    if (!key || registry.has(value)) return false;
    registry.add(value);
    return true;
  };

  for (const exercise of exercises) {
    let next: InteractiveExercise | null = null;

    if (exercise.type === "fill-in-blank") {
      const sentences = exercise.sentences
        .map((sentence) => ({
          ...sentence,
          text: normalizeBlanks(sentence.text),
          textEn: sentence.textEn ? normalizeBlanks(sentence.textEn) : sentence.textEn,
        }))
        .filter((sentence) =>
          registry.claimAll([
            ...gapVariants(sentence.textEn || sentence.text, sentence.answer),
            ...gapVariants(sentence.text, sentence.answer),
          ])
        );
      next = { ...exercise, sentences };
      if (sentences.length < MIN_ITEMS[exercise.type]) next = null;

    } else if (exercise.type === "sentence-reorder") {
      const items = exercise.items.filter((item) => keep(item.correctEn || item.correct));
      next = items.length >= MIN_ITEMS[exercise.type] ? { ...exercise, items } : null;
    } else if (exercise.type === "dictation") {
      const items = exercise.sentences.filter((sentence) => keep(sentence.text));
      next = items.length >= MIN_ITEMS[exercise.type] ? { ...exercise, sentences: items } : null;
    } else if (exercise.type === "error-correction") {
      const items = exercise.items.filter((item) => keep(item.correct));
      next = items.length >= MIN_ITEMS[exercise.type] ? { ...exercise, items } : null;
    } else if (exercise.type === "transformation") {
      const items = exercise.items.filter((item) => keep(item.target));
      next = items.length >= MIN_ITEMS[exercise.type] ? { ...exercise, items } : null;
    } else if (exercise.type === "multiple-choice") {
      const questions = exercise.questions
        .map((question) => ({ ...question, question: normalizeBlanks(question.question) }))
        .filter((question) => {
          const stemKey = keyOf(question.question);
          if (stems.has(stemKey)) return false;
          const answer = question.options[question.answer] ?? "";
          if (!keep(`${question.question} = ${answer}`)) return false;
          stems.add(stemKey);
          return true;
        });
      next = questions.length >= MIN_ITEMS[exercise.type] ? { ...exercise, questions } : null;
    } else if (exercise.type === "matching") {
      const seen = new Set<string>();
      const pairs = exercise.pairs.filter((pair) => {
        const key = `${keyOf(pair.left)} => ${keyOf(pair.right)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      next = pairs.length >= MIN_ITEMS[exercise.type] ? { ...exercise, pairs } : null;
    } else {
      next = exercise;
    }

    if (next) output.push(next);
  }

  return output;
};

/** Distinct practice items a lesson exposes; used by the audit script too. */
export const countDistinctItems = (exercises: InteractiveExercise[]) => {
  const keys = new Set<string>();
  for (const exercise of exercises) {
    if (exercise.type === "fill-in-blank") exercise.sentences.forEach((s) => keys.add(keyOf(s.textEn || s.text)));
    if (exercise.type === "sentence-reorder") exercise.items.forEach((i) => keys.add(keyOf(i.correctEn || i.correct)));
    if (exercise.type === "dictation") exercise.sentences.forEach((s) => keys.add(keyOf(s.text)));
    if (exercise.type === "error-correction") exercise.items.forEach((i) => keys.add(keyOf(i.correct)));
    if (exercise.type === "transformation") exercise.items.forEach((i) => keys.add(keyOf(i.target)));
    if (exercise.type === "multiple-choice") exercise.questions.forEach((q) => keys.add(keyOf(q.question)));
    if (exercise.type === "matching") exercise.pairs.forEach((p) => keys.add(keyOf(`${p.left} ${p.right}`)));
  }
  return keys.size;
};

const enhanceLesson = (rawLesson: LanguageLesson): LanguageLesson => {
  const repaired = repairReorder(rawLesson);
  const registry = new SentenceRegistry();
  const existing = dedupeExisting(repaired.exercises, registry);

  // Generation order = source allocation order, evaluated lazily so a drill we
  // do not need never consumes the lesson's sentences.
  const generators: (() => InteractiveExercise | InteractiveExercise[] | null)[] = [
    () => buildWrongRightErrorCorrection(repaired, registry),
    () => buildExampleFillInBlank(repaired, registry),
    () => buildFillInBlanks(repaired, registry),
    () => buildArrowTransformation(repaired, registry),
    () => buildMultipleChoice(repaired, registry),
    () => buildLabelMatching(repaired, registry),
    () => buildQuizFillInBlank(repaired, registry),
    () => buildErrorCorrection(repaired, registry),
    () => buildTableMatching(repaired),
    () => buildCorrectSentenceMcq(repaired, registry),
    () => buildTransformation(repaired, registry),
    () => buildLabelMcq(repaired, registry),
    () => buildReorders(repaired, registry),
    () => buildSentenceMatching(repaired, registry),
    () => buildVocabMcq(repaired, registry),
    () => buildPhraseDrills(repaired, registry),
    () => buildMatching(repaired, registry),
    () => buildDictations(repaired, registry),
  ];

  const signatures = new Set(existing.map(signature));
  const additions: InteractiveExercise[] = [];

  for (const generate of generators) {
    if (existing.length + additions.length >= MIN_EXERCISES) break;
    const produced = generate();
    if (!produced) continue;
    for (const candidate of Array.isArray(produced) ? produced : [produced]) {
      if (existing.length + additions.length >= MIN_EXERCISES) break;
      const key = signature(candidate);
      if (signatures.has(key)) continue;
      signatures.add(key);
      additions.push(candidate);
    }
  }


  if (additions.length === 0 && existing.length === repaired.exercises.length) return repaired;
  return { ...repaired, exercises: [...existing, ...additions] };
};

export const enhanceGrammarModulesWithExercises = (
  modules: LanguageModule[]
): LanguageModule[] =>
  modules.map((mod) => ({ ...mod, lessons: mod.lessons.map(enhanceLesson) }));
