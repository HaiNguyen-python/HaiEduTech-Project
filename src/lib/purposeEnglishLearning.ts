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
  ? `Sau bài này, bạn có thể ${lesson.gistVi.charAt(0).toLocaleLowerCase("vi")}${lesson.gistVi.slice(1).replace(/[.]$/, "")} trong một tình huống thực tế.`
  : `By the end, you can ${lesson.gist.charAt(0).toLowerCase()}${lesson.gist.slice(1).replace(/[.]$/, "")} in a realistic situation.`;

export const splitTeaching = (text: string) => {
  const chunks = text.split(/(?<=[.!?])\s+(?=[A-Z"“])/).filter(Boolean);
  if (chunks.length < 3) return [text];
  const size = Math.ceil(chunks.length / 3);
  return [chunks.slice(0, size).join(" "), chunks.slice(size, size * 2).join(" "), chunks.slice(size * 2).join(" ")].filter(Boolean);
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