import { safeStorage } from "@/lib/safeStorage";

export interface PhraseCriterion {
  label: string;
  score: number;
  feedback: string;
}

export interface PhraseSpeakingGrade {
  overall: number;
  phraseUsedCorrectly: boolean;
  criteria: PhraseCriterion[];
  feedback: string;
  correction: string;
  upgradedSentence: string;
}

export interface PhraseSpeakingProgress {
  bestScore: number;
  attempts: number;
  lastPracticed: string;
}

export type PhraseSpeakingProgressStore = Record<string, PhraseSpeakingProgress>;

export interface HighlightPart {
  text: string;
  highlighted: boolean;
}

export const PHRASE_SPEAKING_STORAGE_KEY = "ielts-speaking-phrase-practice:v1";

export const loadPhraseSpeakingResult = (id: string): PhraseSpeakingProgress | null => {
  const store = safeStorage.get<PhraseSpeakingProgressStore>(PHRASE_SPEAKING_STORAGE_KEY, {}) ?? {};
  return store[id] ?? null;
};

const EXAMPLE_OVERRIDES: Record<string, string> = {
  "to pursue a career in": "I hope to pursue a career in educational technology after graduation.",
  "a steep learning curve": "My first month at the company involved a steep learning curve.",
  "to juggle responsibilities": "University students often have to juggle responsibilities at home and at school.",
  "a rewarding experience": "Teaching younger learners has been a rewarding experience for me.",
  "to be snowed under with work": "I was snowed under with work before the final deadline.",
  "to climb the career ladder": "Many graduates move abroad to climb the career ladder more quickly.",
  "a nine-to-five job": "A nine-to-five job gives some people a predictable daily routine.",
  "to work under pressure": "Doctors need to work under pressure without losing concentration.",
  "job satisfaction": "A supportive manager can significantly improve job satisfaction.",
  "to meet deadlines": "I use a weekly planner to meet deadlines without feeling overwhelmed.",
  "a hands-on approach": "Our teacher uses a hands-on approach to make science easier to understand.",
  "to broaden one's horizons": "Travelling abroad can broaden my horizons and challenge my assumptions.",
  "an internship opportunity": "An internship opportunity would help me understand the industry better.",
  "to specialize in": "I would like to specialize in data engineering after university.",
  "a fulfilling career": "Helping children learn can lead to a fulfilling career.",
  "to gain practical experience": "Students should volunteer to gain practical experience before graduating.",
  "work-life balance": "Flexible working hours can create a healthier work-life balance.",
  "to develop transferable skills": "Group projects help students to develop transferable skills such as teamwork.",
  "a competitive job market": "Graduates need relevant experience to succeed in a competitive job market.",
  "to take initiative": "Employees who take initiative often earn greater responsibility.",
  "professional development": "Regular training is essential for professional development.",
  "to multitask effectively": "Working parents often learn to multitask effectively.",
};

const cleanPhrase = (phrase: string) => phrase
  .normalize("NFC")
  .replace(/\.{2,}$/g, "")
  .replace(/\bone's\b/gi, "my")
  .replace(/\bsomeone's\b/gi, "a person's")
  .replace(/\bsomeone\b/gi, "people")
  .trim();

const lowerFirst = (value: string) => value ? `${value[0].toLowerCase()}${value.slice(1)}` : value;

const phraseWithComplement = (phrase: string) => {
  const trimmed = phrase.trim();
  if (/\b(in|on|at|for|from|with|between|about|of|to)$/i.test(trimmed)) return `${trimmed} a meaningful goal`;
  return trimmed;
};

const stableIndex = (value: string, size: number) => {
  let hash = 0;
  for (const character of value) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  return Math.abs(hash) % size;
};

const chooseExample = (options: string[], phrase: string, topic: string, part: number) =>
  options[stableIndex(`${part}|${topic}|${phrase}`, options.length)];

export function getPhraseExample(phrase: string, topic: string, part: 1 | 2 | 3): string {
  const key = phrase.trim().toLowerCase().replace(/\.{2,}$/g, "");
  if (EXAMPLE_OVERRIDES[key]) return EXAMPLE_OVERRIDES[key];

  const cleaned = phraseWithComplement(cleanPhrase(phrase).replace(/\s*\/\s*/g, " or "));
  const topicText = topic.toLowerCase().replace(/\s*&\s*/g, " and ");
  if (/^to\s+/i.test(cleaned)) {
    const infinitive = lowerFirst(cleaned);
    if (/^to be\b/i.test(cleaned)) return chooseExample([
      `When it comes to ${topicText}, I find it easier ${infinitive} when I have enough time to prepare.`,
      `My experience with ${topicText} has shown me what it really means ${infinitive}.`,
      `In situations involving ${topicText}, it takes confidence ${infinitive}.`,
    ], cleaned, topic, part);
    if (part === 1) return chooseExample([
      `When it comes to ${topicText}, I usually try ${infinitive} because it makes the experience more enjoyable.`,
      `I have more time ${infinitive} when I am focusing on ${topicText} at weekends.`,
      `I first learned ${infinitive} through my experience with ${topicText}.`,
      `For ${topicText}, I prefer ${infinitive} rather than take the easier option.`,
      `Over the past few years, I have made a conscious effort ${infinitive} in relation to ${topicText}.`,
    ], cleaned, topic, part);
    if (part === 2) return chooseExample([
      `During that experience with ${topicText}, I had a real opportunity ${infinitive}.`,
      `What stayed with me about ${topicText} was the decision ${infinitive} despite the difficulties.`,
      `That occasion involving ${topicText} encouraged me ${infinitive} with much more confidence.`,
      `Looking back on that experience with ${topicText}, I am glad that I chose ${infinitive}.`,
    ], cleaned, topic, part);
    return chooseExample([
      `One practical way to improve ${topicText} is ${infinitive}.`,
      `In the long term, communities need ${infinitive} more consistently when addressing ${topicText}.`,
      `For ${topicText}, policy makers should create stronger incentives for people ${infinitive}.`,
      `A balanced strategy for ${topicText} would allow society ${infinitive} without creating new problems.`,
    ], cleaned, topic, part);
  }
  if (/^(a|an)\s+/i.test(cleaned)) {
    if (part === 1) return chooseExample([
      `${cleaned} makes a noticeable difference to my experience of ${topicText}.`,
      `${cleaned} is something I genuinely value when it comes to ${topicText}.`,
      `${cleaned} often helps me feel more confident about ${topicText}.`,
    ], cleaned, topic, part);
    if (part === 2) return chooseExample([
      `${cleaned} was one of the details that made my experience of ${topicText} stand out.`,
      `${cleaned} immediately caught my attention during that experience with ${topicText}.`,
      `${cleaned} turned an ordinary moment involving ${topicText} into a lasting memory.`,
    ], cleaned, topic, part);
    return chooseExample([
      `${cleaned} can shape how the public responds to ${topicText}.`,
      `${cleaned} is often a key factor in debates about ${topicText}.`,
      `${cleaned} could bring measurable benefits if it were widely adopted.`,
    ], cleaned, topic, part);
  }
  if (/^(in|on|at|from|by|with|without|despite|although|while)\b/i.test(cleaned)) {
    return `${cleaned}, people can make more thoughtful decisions about ${topicText}.`;
  }
  if (/^(now and then|from time to time|once in a while)$/i.test(cleaned)) {
    return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}, I reflect on my experiences with ${topicText}.`;
  }
  if (/^(looking|thinking|speaking|generally|personally)\b/i.test(cleaned)) {
    return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}, I can see why ${topicText} matters to many people.`;
  }
  if (/^steeped in\b/i.test(cleaned)) {
    return `My local area is ${lowerFirst(cleaned)}, which makes it memorable for visitors.`;
  }
  if (/\b(is|are|has|have|plays?|affects?|creates?|helps?|allows?|means?|requires?)\b/i.test(cleaned)) {
    return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)} in many situations related to ${topicText}.`;
  }
  if (part === 1) return chooseExample([
    `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)} is closely connected with my experience of ${topicText}.`,
    `I often notice ${lowerFirst(cleaned)} in situations involving ${topicText}.`,
    `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)} is one aspect of ${topicText} that matters to me personally.`,
  ], cleaned, topic, part);
  if (part === 2) return chooseExample([
    `I can still remember ${lowerFirst(cleaned)} as a distinctive part of that experience.`,
    `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)} was the detail that stayed in my mind afterwards.`,
    `The experience gave me a new appreciation of ${lowerFirst(cleaned)}.`,
  ], cleaned, topic, part);
  return chooseExample([
    `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)} deserves closer attention in debates about ${topicText}.`,
    `Public discussion of ${topicText} often overlooks the role of ${lowerFirst(cleaned)}.`,
    `A clearer understanding of ${lowerFirst(cleaned)} could improve decisions about ${topicText}.`,
  ], cleaned, topic, part);
}

const structureSlots: Record<1 | 2 | 3, string[]> = {
  1: ["educational technology", "a university student", "rewarding", "it helps me grow", "in the future", "last year"],
  2: ["a trip I took last year", "my closest friend", "truly memorable", "I learned something valuable", "the city centre", "several years ago"],
  3: ["public education", "individual responsibility", "a balanced solution", "it benefits society", "in many countries", "over the next decade"],
};

/** Completes the open slots in an IELTS structure without changing its fixed language. */
export function getStructureExample(structure: string, topic: string, part: 1 | 2 | 3): string {
  const topicText = topic.replace(/\s*&\s*/g, " and ").toLowerCase();
  const slots = [...structureSlots[part]];
  slots[0] = part === 1 ? topicText : part === 2 ? `an experience related to ${topicText}` : topicText;
  let slotIndex = 0;
  let example = structure
    .normalize("NFC")
    .replace(/\.{2,}/g, () => ` ${slots[Math.min(slotIndex++, slots.length - 1)]} `)
    .replace(/\s+([,.;!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (example.length < 25) example = `${example.replace(/[.!?]$/, "")}, especially when discussing ${topicText}`;
  if (!/[.!?]$/.test(example)) example += ".";
  return example.charAt(0).toUpperCase() + example.slice(1);
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Returns safe text segments so callers can emphasize a target without raw HTML. */
export function getHighlightedExampleParts(example: string, target: string): HighlightPart[] {
  const segments = target
    .normalize("NFC")
    .replace(/\bone['’]s\b/gi, "my")
    .replace(/\bsomeone['’]s\b/gi, "a person's")
    .replace(/\bsomeone\b/gi, "people")
    .split(/\.{2,}/)
    .map((part) => part.trim().replace(/^(to|a|an)\s+/i, ""))
    .filter((part) => part.length >= 4)
    .sort((a, b) => b.length - a.length);
  if (!segments.length) return [{ text: example, highlighted: false }];

  const pattern = new RegExp(`(${segments.map(escapeRegExp).join("|")})`, "gi");
  const parts = example.split(pattern).filter(Boolean);
  if (parts.length === 1) return [{ text: example, highlighted: false }];
  const normalizedTargets = new Set(segments.map((segment) => segment.toLowerCase()));
  return parts.map((text) => ({ text, highlighted: normalizedTargets.has(text.toLowerCase()) }));
}

const PHRASE_STOP_WORDS = new Set([
  "a", "an", "and", "at", "be", "by", "for", "from", "in", "is", "it", "my", "of", "on", "one", "or", "the", "to", "with",
]);

const wordStem = (word: string) => {
  if (/ies$/i.test(word) && word.length > 4) return word.replace(/ies$/i, "y");
  if (/ing$/i.test(word) && word.length > 5) return word.replace(/ing$/i, "");
  if (/ed$/i.test(word) && word.length > 5) return word.replace(/ed$/i, "");
  if (/es$/i.test(word) && word.length > 5) return word.replace(/es$/i, "");
  if (/s$/i.test(word) && word.length > 4) return word.replace(/s$/i, "");
  return word;
};

export function phraseAppearsInTranscript(phrase: string, transcript: string): boolean {
  const tokens = (value: string) => value
    .normalize("NFC")
    .toLowerCase()
    .replace(/one['’]s|someone['’]s|someone|people|person/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !PHRASE_STOP_WORDS.has(word))
    .map(wordStem);
  const required = [...new Set(tokens(phrase))];
  if (!required.length) return transcript.trim().split(/\s+/).length >= 3;
  const heard = new Set(tokens(transcript));
  const hits = required.filter((word) => heard.has(word)).length;
  return hits >= Math.max(1, Math.ceil(required.length * 0.6));
}

export const structureAppearsInTranscript = (structure: string, transcript: string): boolean =>
  phraseAppearsInTranscript(structure.replace(/\.{2,}/g, " "), transcript);

export const phrasePracticeId = (part: number, topic: string, phrase: string) =>
  `${part}|${topic.trim().toLowerCase()}|${phrase.trim().toLowerCase()}`;

export const structurePracticeId = (part: number, topic: string, structure: string) =>
  `structure|${part}|${topic.trim().toLowerCase()}|${structure.trim().toLowerCase()}`;

const text = (value: unknown, max = 600) => typeof value === "string" ? value.normalize("NFC").trim().slice(0, max) : "";
const score = (value: unknown) => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

export function normalizePhraseSpeakingGrade(value: unknown): PhraseSpeakingGrade | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const upgradedSentence = text(raw.upgradedSentence);
  if (!upgradedSentence) return null;
  const criteria = Array.isArray(raw.criteria)
    ? raw.criteria.slice(0, 4).map((item) => {
      const criterion = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return { label: text(criterion.label, 80), score: score(criterion.score), feedback: text(criterion.feedback) };
    }).filter((item) => item.label && item.feedback)
    : [];
  if (criteria.length !== 4) return null;
  return {
    overall: score(raw.overall),
    phraseUsedCorrectly: raw.phraseUsedCorrectly === true,
    criteria,
    feedback: text(raw.feedback),
    correction: text(raw.correction),
    upgradedSentence,
  };
}

export function savePhraseSpeakingResult(id: string, overall: number): PhraseSpeakingProgress {
  const store = safeStorage.get<PhraseSpeakingProgressStore>(PHRASE_SPEAKING_STORAGE_KEY, {}) ?? {};
  const previous = store[id];
  const next = {
    bestScore: Math.max(previous?.bestScore ?? 0, score(overall)),
    attempts: (previous?.attempts ?? 0) + 1,
    lastPracticed: new Date().toUTCString(),
  };
  safeStorage.set(PHRASE_SPEAKING_STORAGE_KEY, { ...store, [id]: next });
  return next;
}
