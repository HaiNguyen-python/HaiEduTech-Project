/**
 * cambridgeKidSpeak - rewrites lecture prose into child-friendly language.
 *
 * Cambridge Young Learners lectures (Starters / Movers / Flyers) are read by
 * children aged 6-11, so exam jargon such as "collocation", "lexical set" or
 * "Listening Parts 1-4" is replaced with plain words. KET / PET keep more of
 * the original wording because those learners are teenagers.
 */

export type KidLevel = "starters" | "movers" | "flyers" | "ket" | "pet" | string;

const YOUNG_LEVELS = new Set(["starters", "movers", "flyers"]);

/** Jargon -> plain English. Applied for every level (light touch). */
const GLOSSARY_EN: [RegExp, string][] = [
  [/\bcollocations?\b/gi, "word friends (words that go together)"],
  [/\blexical sets?\b/gi, "word families"],
  [/\bprepositions?\b/gi, "small place words like in, on, under"],
  [/\bdeterminers?\b/gi, "small words like a, the, my"],
  [/\barticles? \(a\/an\/the\)\b/gi, "the small words a, an, the"],
  [/\bauxiliar(y|ies)\b/gi, "helper verb"],
  [/\bmorpholog(y|ical)\b/gi, "word building"],
  [/\bsyntax\b/gi, "word order"],
  [/\bphonemes?\b/gi, "sounds"],
  [/\bintonation\b/gi, "voice music (going up or down)"],
  [/\bparaphras(e|ing)\b/gi, "say it another way"],
  [/\bdistractors?\b/gi, "tricky wrong answers"],
  [/\bproductive skills?\b/gi, "speaking and writing"],
  [/\breceptive skills?\b/gi, "listening and reading"],
  [/\bacquisition\b/gi, "learning"],
  [/\butteranc(?:e|es)\b/gi, "sentence"],
  [/\bNative speakers store language as chunks, not single words\.?/gi,
    "Good speakers remember whole little phrases, not just one word."],
];

/** Extra simplification only for Starters / Movers / Flyers. */
const GLOSSARY_KIDS: [RegExp, string][] = [
  [/\bmemoris(e|ed|ing)\b/gi, "learn by heart"],
  [/\bmemoriz(e|ed|ing)\b/gi, "learn by heart"],
  [/\bconsists of\b/gi, "has"],
  [/\bthe official wordlist for this level is the source of almost all test items\b/gi,
    "almost every question uses words from the Cambridge word list"],
  [/\bis tested in every paper\b/gi, "comes up in every part of the test"],
  [/\bcandidates?\b/gi, "children"],
  [/\bexaminer\b/gi, "friendly teacher in the test"],
  [/\bassessment\b/gi, "test"],
  [/\bcompetenc(?:y|ies)\b/gi, "skills"],
  [/\bconsolidat(e|ion)\b/gi, "practise again"],
  [/\bvocabulary items?\b/gi, "words"],
  [/\bproduce your own example sentences\b/gi, "make your own sentences"],
  [/\baccurately\b/gi, "correctly"],
  [/\butilis(e|ing)\b/gi, "use"],
  [/\bdemonstrat(e|ing)\b/gi, "show"],
  [/\bidentify\b/gi, "find"],
  [/\bin isolation\b/gi, "on its own"],
  [/\bready-made speaking sentence\b/gi, "a sentence you can say right away"],
];

/** Vietnamese jargon -> simple Vietnamese for young learners. */
const GLOSSARY_KIDS_VI: [RegExp, string][] = [
  [/\bcollocations?\b/gi, "cụm từ đi với nhau"],
  [/\bgiới từ\b/gi, "từ chỉ vị trí (in, on, under)"],
  [/\bngữ điệu\b/gi, "giọng lên xuống"],
  [/\bthí sinh\b/gi, "các bạn nhỏ"],
  [/\bghi nhớ máy móc\b/gi, "học thuộc"],
  [/\bvận dụng\b/gi, "dùng"],
  [/\bnhận diện\b/gi, "nhận ra"],
  [/\btừ vựng đơn lẻ\b/gi, "từ đứng một mình"],
];

const hasVietnamese = (s: string) => /[ăâđêôơưÀ-ỹ]/.test(s);

/** Cut an over-long sentence into two short ones at a natural joint. */
const splitLongSentence = (s: string, limit: number): string[] => {
  if (s.length <= limit) return [s];
  const joints = [
    / and (?=[a-zà-ỹ])/i,
    /, so /i,
    /, but /i,
    /, and /i,
    /; /,
    / because /i,
    / va /i,
  ];
  for (const j of joints) {
    const m = s.match(j);
    if (m && m.index && m.index > limit * 0.35 && m.index < s.length - 20) {
      const head = s.slice(0, m.index).trim().replace(/[,;]$/, "");
      const tail = s.slice(m.index + m[0].length).trim();
      const cap = tail.charAt(0).toUpperCase() + tail.slice(1);
      return [head.endsWith(".") ? head : `${head}.`, cap];
    }
  }
  return [s];
};

/**
 * Rewrite a block of lecture text so a child can read it comfortably.
 */
export const kidSpeak = (raw: string, level: KidLevel = "starters"): string => {
  let text = (raw || "").trim();
  if (!text) return text;

  const vi = hasVietnamese(text);
  const young = YOUNG_LEVELS.has(String(level).toLowerCase());

  if (!vi) {
    for (const [re, rep] of GLOSSARY_EN) text = text.replace(re, rep);
    if (young) for (const [re, rep] of GLOSSARY_KIDS) text = text.replace(re, rep);
  } else if (young) {
    for (const [re, rep] of GLOSSARY_KIDS_VI) text = text.replace(re, rep);
  }

  // Remove double spaces created by replacements.
  text = text.replace(/\s{2,}/g, " ").replace(/\s+([.,!?])/g, "$1");

  // Fix a/an after word swaps (e.g. "an examiner" -> "an friendly teacher").
  text = text
    .replace(/\ban (?=[bcdfgjklmnpqrstvwxyz])/gi, (m) => (m[0] === "A" ? "A " : "a "))
    .replace(/\ba (?=[aeio])/g, "an ")
    .replace(/\bA (?=[AaEeIiOo])/g, "An ");

  if (!young) return text;

  // Break very long sentences so kids never face a 200-character wall,
  // but never cut inside a quoted worked example.
  const QM = "\uE002";
  const masked = text.replace(/["“”]([^"“”]{0,300}?)["“”]/g, (m) =>
    m.replace(/([.!?])/g, QM)
  );
  const limit = 140;
  const sentences = masked
    .split(/(?<=[.!?])\s+/)
    .flatMap((s) => splitLongSentence(s.trim(), limit))
    .filter(Boolean);

  return sentences.join(" ").split(QM).join(".");
};

export default kidSpeak;
