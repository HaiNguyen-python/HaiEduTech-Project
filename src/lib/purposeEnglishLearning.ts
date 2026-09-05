import type { PurposeLesson, PurposeTopic } from "@/data/purposeEnglishTypes";

export type PurposeTrack = "business" | "academic";

const TOPIC_SKILLS: Record<string, { en: string[]; vi: string[]; minutes: number }> = {
  "biz-email": { en: ["Tone", "Email structure", "Clear action"], vi: ["Giọng điệu", "Cấu trúc email", "Hành động rõ ràng"], minutes: 56 },
  "biz-meetings": { en: ["Facilitation", "Evidence", "Diplomacy"], vi: ["Điều phối", "Dẫn chứng", "Ngoại giao"], minutes: 60 },
  "biz-presenting": { en: ["Data language", "Signposting", "Q&A"], vi: ["Ngôn ngữ số liệu", "Dẫn dắt", "Hỏi đáp"], minutes: 64 },
  "biz-calls": { en: ["Call control", "Rapport", "Scheduling"], vi: ["Điều phối cuộc gọi", "Tạo thiện cảm", "Xếp lịch"], minutes: 52 },
  "biz-negotiation": { en: ["Persuasion", "Trade-offs", "Complaints"], vi: ["Thuyết phục", "Đánh đổi", "Khiếu nại"], minutes: 64 },
  "biz-career": { en: ["CV language", "STAR answers", "Interviews"], vi: ["Ngôn ngữ CV", "Trả lời STAR", "Phỏng vấn"], minutes: 60 },
  "aca-vocab": { en: ["Research terms", "Data", "Evaluation"], vi: ["Thuật ngữ nghiên cứu", "Dữ liệu", "Đánh giá"], minutes: 64 },
  "aca-style": { en: ["Register", "Hedging", "Precision"], vi: ["Văn phong", "Nói dè dặt", "Độ chính xác"], minutes: 60 },
  "aca-writing": { en: ["Paragraphs", "Cohesion", "Synthesis"], vi: ["Đoạn văn", "Liên kết", "Tổng hợp"], minutes: 68 },
  "aca-reading": { en: ["Skimming", "Arguments", "Sources"], vi: ["Đọc lướt", "Lập luận", "Nguồn tin"], minutes: 60 },
  "aca-listening": { en: ["Lectures", "Note-taking", "Signals"], vi: ["Bài giảng", "Ghi chú", "Tín hiệu"], minutes: 56 },
  "aca-integrity": { en: ["Citation", "Paraphrase", "Seminars"], vi: ["Trích dẫn", "Diễn giải", "Seminar"], minutes: 64 },
};

export const topicLearningMeta = (topic: PurposeTopic) => TOPIC_SKILLS[topic.id] ?? {
  en: topic.lessons.slice(0, 3).map((lesson) => lesson.title),
  vi: topic.lessons.slice(0, 3).map((lesson) => lesson.titleVi),
  minutes: topic.lessons.length * 15,
};

export const lessonMinutes = (lesson: PurposeLesson) => 12 + Math.min(6, Math.ceil(lesson.teaching.length / 260));

export const lessonOutcome = (lesson: PurposeLesson, vietnamese: boolean) => vietnamese
  ? `Mục tiêu trong tình huống thật: ${lesson.gistVi}`
  : `Goal in a real situation: ${lesson.gist}`;


export interface TeachingBlock {
  paragraphs: string[];
}

export const splitTeaching = (text: string): TeachingBlock[] => {
  const normalized = text.replace(/\s+/g, " ").trim();
  const sentenceMatches = normalized.match(/.*?(?:[.!?]+["”']?(?=\s+[A-ZÀ-Ỹ])|$)/gu);
  const sentences = (sentenceMatches ?? [normalized]).map((sentence) => sentence.trim()).filter(Boolean);
  if (sentences.length <= 2) return [{ paragraphs: sentences }];

  const blockCount = Math.min(3, Math.max(1, Math.ceil(sentences.length / 3)));
  const size = Math.ceil(sentences.length / blockCount);
  return Array.from({ length: blockCount }, (_, index) => ({
    paragraphs: sentences.slice(index * size, (index + 1) * size),
  })).filter((block) => block.paragraphs.length > 0);
};

export const modelLineRole = (line: string, index: number, total: number, track: PurposeTrack) => {
  if (index === 0) return track === "business" ? "Context / Opening" : "Claim / Context";
  if (index === total - 1) return track === "business" ? "Close / Next step" : "Conclusion / Limitation";
  return track === "business" ? "Purpose / Supporting detail" : "Evidence / Development";
};

export const getNextCoreLesson = (topics: PurposeTopic[], done: string[]) => {
  const lessons = topics.flatMap((topic) => topic.lessons.map((lesson) => ({ topic, lesson })));
  return lessons.find(({ lesson }) => !done.includes(lesson.id)) ?? lessons[0] ?? null;
};

export const purposeTrackLabel = (track: PurposeTrack, vietnamese: boolean) => track === "business"
  ? (vietnamese ? "Tiếng Anh Thương mại" : "Business English")
  : (vietnamese ? "Tiếng Anh Học thuật" : "Academic English");

/* ---------- Guided practice: activities grounded in the lesson content ---------- */

export interface GuidedActivity {
  id: string;
  kind: "meaning" | "gap" | "function";
  prompt: string;
  promptVi: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationVi: string;
}

const seedFrom = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
};

/** Deterministic shuffle so every learner sees a stable but non-guessable order. */
const seededShuffle = <T,>(items: T[], seed: string) => {
  const result = [...items];
  let state = seedFrom(seed) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const swap = state % (index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
};

const pickDistractors = <T,>(pool: T[], count: number, seed: string) => seededShuffle(pool, seed).slice(0, count);

const blankTerm = (example: string, term: string) => {
  const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  return pattern.test(example) ? example.replace(pattern, "______") : `______ ${example}`;
};

const buildOptions = (correct: string, distractors: string[], seed: string) => {
  const unique = [correct, ...distractors.filter((item) => item.trim().toLowerCase() !== correct.trim().toLowerCase())];
  const options = seededShuffle(unique, seed);
  return { options, answer: options.indexOf(correct) };
};

/**
 * Builds up to three content-grounded guided activities from the lesson itself:
 * meaning matching, gap fill inside a real example, and model-line function matching.
 * Correct answers always come from the lesson data; distractors come from sibling
 * phrases or sibling model lines, and option order is shuffled with a stable seed.
 */
export const buildGuidedActivities = (lesson: PurposeLesson, track: PurposeTrack): GuidedActivity[] => {
  const activities: GuidedActivity[] = [];
  const vocab = lesson.vocab;
  const terms = vocab.map((item) => item.term);

  const meaningIndex = seedFrom(`${lesson.id}-meaning`) % Math.max(vocab.length, 1);
  const meaningItem = vocab[meaningIndex];
  if (meaningItem && terms.length >= 4) {
    const pool = terms.filter((term) => term !== meaningItem.term);
    const { options, answer } = buildOptions(meaningItem.term, pickDistractors(pool, 3, `${lesson.id}-m-pool`), `${lesson.id}-m-opt`);
    activities.push({
      id: `${lesson.id}-guided-meaning`,
      kind: "meaning",
      prompt: `Which phrase from this lesson means "${meaningItem.vi}" (${meaningItem.pos})?`,
      promptVi: `Cụm nào trong bài mang nghĩa "${meaningItem.vi}" (${meaningItem.pos})?`,
      options,
      answer,
      explanation: `"${meaningItem.term}" means "${meaningItem.vi}". Example: ${meaningItem.example}`,
      explanationVi: `"${meaningItem.term}" nghĩa là "${meaningItem.vi}". Ví dụ: ${meaningItem.example}`,
    });
  }

  const gapIndex = (seedFrom(`${lesson.id}-gap`) + 3) % Math.max(vocab.length, 1);
  const gapItem = vocab[gapIndex === meaningIndex ? (gapIndex + 1) % Math.max(vocab.length, 1) : gapIndex];
  if (gapItem && terms.length >= 4) {
    const pool = terms.filter((term) => term !== gapItem.term);
    const { options, answer } = buildOptions(gapItem.term, pickDistractors(pool, 3, `${lesson.id}-g-pool`), `${lesson.id}-g-opt`);
    activities.push({
      id: `${lesson.id}-guided-gap`,
      kind: "gap",
      prompt: `Complete the sentence: "${blankTerm(gapItem.example, gapItem.term)}"`,
      promptVi: `Hoàn thành câu: "${blankTerm(gapItem.example, gapItem.term)}" (nghĩa: ${gapItem.exampleVi})`,
      options,
      answer,
      explanation: `The full sentence is: ${gapItem.example}`,
      explanationVi: `Câu đầy đủ là: ${gapItem.example} (${gapItem.exampleVi})`,
    });
  }

  const lines = lesson.model.lines.filter((line) => line.trim().length > 12);
  if (lines.length >= 4) {
    const targetIndex = lines.length - 1;
    const target = lines[targetIndex];
    const role = track === "business" ? "closes the message and points to the next step" : "states the conclusion or the limitation";
    const roleVi = track === "business" ? "kết lại nội dung và nêu bước tiếp theo" : "nêu kết luận hoặc giới hạn của lập luận";
    const pool = lines.filter((line) => line !== target);
    const { options, answer } = buildOptions(target, pickDistractors(pool, 3, `${lesson.id}-f-pool`), `${lesson.id}-f-opt`);
    activities.push({
      id: `${lesson.id}-guided-function`,
      kind: "function",
      prompt: `In the model text, which line ${role}?`,
      promptVi: `Trong bài mẫu, dòng nào ${roleVi}?`,
      options,
      answer,
      explanation: `This is the final move of the model text, so it carries the closing function.`,
      explanationVi: `Đây là phần cuối của bài mẫu, nên nó đảm nhiệm chức năng kết lại.`,
    });
  }

  return activities;
};
