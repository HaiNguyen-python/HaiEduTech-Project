/**
 * @file cambridgeReviewExplanation.ts
 * @description Builds the final explanation shown under each question in the
 *              Cambridge Test Prep review screen. When the evidence panel
 *              already quotes the proving sentence, the redundant
 *              "The passage says '...'" line is removed, and a clear,
 *              step-by-step teaching explanation is guaranteed instead.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

interface Args {
  section: string;
  question: string;
  correct: string;
  explanation?: string;
  explanationVi?: string;
  /** True when the evidence panel above already quotes the source sentence. */
  hasEvidence: boolean;
}

/** Sentences that only repeat the quoted evidence - dropped when evidence shows. */
const REDUNDANT_EN =
  /^(the\s+(passage|text|reading|script|audio|story|dialogue|conversation)|the\s+(speaker|boy|girl|man|woman|teacher|writer)\s+says|it\s+says)\b[^.!?]*[.!?]\s*/i;
const REDUNDANT_VI =
  /^(đoạn\s+văn|bài\s+đọc|bài\s+nghe|lời\s+thoại|bài\s+hội\s+thoại|người\s+nói)\s+(nói|cho\s+biết|ghi)\b[^.!?]*[.!?]\s*/i;

const stripRedundant = (text: string, re: RegExp): string => {
  let out = text.trim();
  // A thin explanation that is only the quote repeat becomes empty - keep it then.
  const stripped = out.replace(re, "").trim();
  if (stripped.length >= 25) out = stripped;
  return out;
};

const HOW_EN: Record<string, string> = {
  Listening:
    "How to get it: listen for the exact word or number the speaker says, and ignore numbers mentioned by the other speaker - they are traps.",
  "Reading & Writing":
    "How to get it: find the words in the text that match the question, then check that the option repeats the same idea in different words.",
  Speaking:
    "How to get it: answer on topic in a full sentence and add one short reason, instead of a single word.",
};

const HOW_VI: Record<string, string> = {
  Listening:
    "Cách làm: nghe đúng từ hoặc con số người nói phát ra, bỏ qua các số do người kia nói vì đó là bẫy.",
  "Reading & Writing":
    "Cách làm: tìm những từ trong bài trùng ý với câu hỏi, rồi kiểm tra lựa chọn có diễn đạt lại đúng ý đó không.",
  Speaking:
    "Cách làm: trả lời đúng chủ đề bằng một câu đầy đủ và thêm một lý do ngắn, không trả lời một từ.",
};

export const buildReviewExplanation = ({
  section,
  correct,
  explanation,
  explanationVi,
  hasEvidence,
}: Args): { en: string; vi: string } => {
  const howEn = HOW_EN[section] ?? HOW_EN["Reading & Writing"];
  const howVi = HOW_VI[section] ?? HOW_VI["Reading & Writing"];

  let en = (explanation ?? "").trim();
  if (hasEvidence) en = stripRedundant(en, REDUNDANT_EN);
  const keyEn = `Answer: "${correct}".`;
  if (!en) en = keyEn;
  else if (!/answer/i.test(en.slice(0, 40))) en = `${keyEn} ${en}`;
  if (en.length < 90) en = `${en} ${howEn}`;

  let vi = (explanationVi ?? "").trim();
  if (hasEvidence) vi = stripRedundant(vi, REDUNDANT_VI);
  const keyVi = `Đáp án: "${correct}".`;
  if (!vi) vi = keyVi;
  else if (!/đáp án/i.test(vi.slice(0, 40))) vi = `${keyVi} ${vi}`;
  if (vi.length < 90) vi = `${vi} ${howVi}`;

  return { en: en.replace(/\s+/g, " ").trim(), vi: vi.replace(/\s+/g, " ").trim() };
};
