/**
 * @file contentStudio.ts
 * @description Types, validation and storage helpers for the admin Content Studio
 * (articles, structured lessons and downloadable resources).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "content-media";
export const FILES_BUCKET = "content-files";
/** ~10 years, so signed URLs stored inside content stay valid. */
export const SIGNED_URL_TTL = 315_360_000;

export type ContentKind = "article" | "lesson" | "resource";
export type ContentStatus = "draft" | "published";
export type ContentVisibility = "public" | "students";

export type LessonBlockType =
  | "objective"
  | "vocabulary"
  | "dialogue"
  | "explanation"
  | "practice"
  | "quiz";

export interface QuizQuestion {
  question: string;
  question_en?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface VocabEntry {
  term: string;
  meaning: string;
  example?: string;
}

export interface DialogueLine {
  speaker: string;
  line: string;
  translation?: string;
}

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  heading: string;
  heading_en?: string;
  /** Rich text / plain text for objective, explanation, practice blocks. */
  text?: string;
  text_en?: string;
  vocabulary?: VocabEntry[];
  dialogue?: DialogueLine[];
  quiz?: QuizQuestion[];
}

export interface ArticleBody {
  html: string;
  html_en?: string;
}

export interface LessonBody {
  blocks: LessonBlock[];
}

export interface ResourceBody {
  bucket: string;
  path: string;
  file_name: string;
  size_bytes?: number;
  mime_type?: string;
  description?: string;
  description_en?: string;
}

export type ContentBody = ArticleBody | LessonBody | ResourceBody | Record<string, unknown>;

export interface ContentItem {
  id: string;
  created_by: string | null;
  kind: ContentKind;
  title: string;
  title_en: string | null;
  slug: string;
  summary: string | null;
  summary_en: string | null;
  cover_url: string | null;
  body: ContentBody;
  subject: string | null;
  level: string | null;
  tags: string[];
  visibility: ContentVisibility;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ContentDraft = Omit<
  ContentItem,
  "id" | "created_at" | "updated_at" | "created_by" | "published_at"
> & { id?: string };

export const KIND_LABEL: Record<ContentKind, { vi: string; en: string }> = {
  article: { vi: "Bài viết", en: "Article" },
  lesson: { vi: "Bài giảng", en: "Lesson" },
  resource: { vi: "Tài liệu", en: "Resource" },
};

export const SUBJECT_OPTIONS = [
  "English",
  "IELTS",
  "TOEIC",
  "Chinese",
  "Vietnamese",
  "Finnish",
  "Swedish",
  "Japanese",
  "Programming",
  "Study Abroad",
  "Lifestyle",
  "Other",
];

export const LEVEL_OPTIONS = [
  "Beginner",
  "Elementary",
  "Intermediate",
  "Advanced",
  "All levels",
];

/* ---------------------------------------------------------------- slug ---- */

const DIACRITICS: Record<string, string> = {
  à: "a", á: "a", ạ: "a", ả: "a", ã: "a", â: "a", ầ: "a", ấ: "a", ậ: "a", ẩ: "a", ẫ: "a",
  ă: "a", ằ: "a", ắ: "a", ặ: "a", ẳ: "a", ẵ: "a",
  è: "e", é: "e", ẹ: "e", ẻ: "e", ẽ: "e", ê: "e", ề: "e", ế: "e", ệ: "e", ể: "e", ễ: "e",
  ì: "i", í: "i", ị: "i", ỉ: "i", ĩ: "i",
  ò: "o", ó: "o", ọ: "o", ỏ: "o", õ: "o", ô: "o", ồ: "o", ố: "o", ộ: "o", ổ: "o", ỗ: "o",
  ơ: "o", ờ: "o", ớ: "o", ợ: "o", ở: "o", ỡ: "o",
  ù: "u", ú: "u", ụ: "u", ủ: "u", ũ: "u", ư: "u", ừ: "u", ứ: "u", ự: "u", ử: "u", ữ: "u",
  ỳ: "y", ý: "y", ỵ: "y", ỷ: "y", ỹ: "y",
  đ: "d",
};

export const slugify = (input: string): string => {
  const lowered = (input || "").toLowerCase().normalize("NFC");
  let out = "";
  for (const ch of lowered) out += DIACRITICS[ch] ?? ch;
  return out
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

export const uniqueSlug = async (base: string, ignoreId?: string): Promise<string> => {
  const root = slugify(base) || `noi-dung-${Date.now()}`;
  for (let i = 0; i < 25; i++) {
    const candidate = i === 0 ? root : `${root}-${i + 1}`;
    const { data } = await (supabase as any)
      .from("content_items")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data || (ignoreId && data.id === ignoreId)) return candidate;
  }
  return `${root}-${Date.now()}`;
};

/* ---------------------------------------------------------- validation ---- */

export interface ValidationIssue {
  vi: string;
  en: string;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const validateForPublish = (draft: ContentDraft): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  if (!draft.title?.trim()) {
    issues.push({ vi: "Thiếu tiêu đề.", en: "Title is required." });
  }
  if (!slugify(draft.slug || draft.title || "")) {
    issues.push({ vi: "Đường dẫn (slug) không hợp lệ.", en: "Slug is invalid." });
  }

  if (draft.kind === "article") {
    const body = draft.body as ArticleBody;
    if (stripHtml(body?.html || "").length < 80) {
      issues.push({
        vi: "Nội dung bài viết quá ngắn (cần ít nhất 80 ký tự).",
        en: "Article content is too short (at least 80 characters).",
      });
    }
  }

  if (draft.kind === "lesson") {
    const blocks = (draft.body as LessonBody)?.blocks ?? [];
    if (blocks.length === 0) {
      issues.push({ vi: "Bài giảng chưa có khối nội dung nào.", en: "Lesson has no blocks yet." });
    }
    blocks.forEach((b, idx) => {
      const at = `#${idx + 1}`;
      if (!b.heading?.trim()) {
        issues.push({ vi: `Khối ${at} thiếu tiêu đề.`, en: `Block ${at} needs a heading.` });
      }
      if (b.type === "vocabulary" && !(b.vocabulary || []).some((v) => v.term?.trim() && v.meaning?.trim())) {
        issues.push({ vi: `Khối từ vựng ${at} chưa có từ nào.`, en: `Vocabulary block ${at} is empty.` });
      }
      if (b.type === "dialogue" && !(b.dialogue || []).some((d) => d.line?.trim())) {
        issues.push({ vi: `Khối hội thoại ${at} chưa có câu nào.`, en: `Dialogue block ${at} is empty.` });
      }
      if (b.type === "quiz") {
        const qs = b.quiz || [];
        if (qs.length === 0) {
          issues.push({ vi: `Khối quiz ${at} chưa có câu hỏi.`, en: `Quiz block ${at} has no questions.` });
        }
        qs.forEach((q, qi) => {
          const label = `${at}.${qi + 1}`;
          if (!q.question?.trim()) {
            issues.push({ vi: `Quiz ${label} thiếu câu hỏi.`, en: `Quiz ${label} is missing the question.` });
          }
          const filled = (q.options || []).filter((o) => o?.trim());
          if (filled.length !== 4) {
            issues.push({ vi: `Quiz ${label} cần đủ 4 lựa chọn.`, en: `Quiz ${label} needs 4 options.` });
          }
          if (q.correctIndex < 0 || q.correctIndex > 3) {
            issues.push({ vi: `Quiz ${label} chưa chọn đáp án đúng.`, en: `Quiz ${label} has no valid answer.` });
          }
        });
      }
      if ((b.type === "objective" || b.type === "explanation" || b.type === "practice") && !b.text?.trim()) {
        issues.push({ vi: `Khối ${at} chưa có nội dung.`, en: `Block ${at} has no content.` });
      }
    });
  }

  if (draft.kind === "resource") {
    const body = draft.body as ResourceBody;
    if (!body?.path) {
      issues.push({ vi: "Chưa tải tệp tài liệu lên.", en: "No file uploaded yet." });
    }
  }

  return issues;
};

/* ------------------------------------------------------------- storage ---- */

const safeFileName = (name: string) =>
  slugify(name.replace(/\.[^.]+$/, "")) + (name.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? "");

export interface UploadedFile {
  bucket: string;
  path: string;
  url: string;
  file_name: string;
  size_bytes: number;
  mime_type: string;
}

export const uploadContentFile = async (
  file: File,
  bucket: string = MEDIA_BUCKET,
): Promise<UploadedFile> => {
  const { data: auth } = await supabase.auth.getUser();
  const owner = auth?.user?.id ?? "anonymous";
  const path = `${owner}/${Date.now()}-${safeFileName(file.name) || "file"}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const url = await getContentFileUrl(bucket, path);
  return {
    bucket,
    path,
    url,
    file_name: file.name,
    size_bytes: file.size,
    mime_type: file.type || "application/octet-stream",
  };
};

export const getContentFileUrl = async (bucket: string, path: string): Promise<string> => {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, SIGNED_URL_TTL);
  if (error || !data?.signedUrl) throw error ?? new Error("Cannot sign URL");
  return data.signedUrl;
};

/* --------------------------------------------------------------- misc ----- */

export const emptyArticleDraft = (): ContentDraft => ({
  kind: "article",
  title: "",
  title_en: "",
  slug: "",
  summary: "",
  summary_en: "",
  cover_url: null,
  body: { html: "", html_en: "" } as ArticleBody,
  subject: null,
  level: null,
  tags: [],
  visibility: "public",
  status: "draft",
});

export const emptyLessonDraft = (): ContentDraft => ({
  ...emptyArticleDraft(),
  kind: "lesson",
  body: { blocks: [] } as LessonBody,
  subject: "English",
  level: "All levels",
});

export const emptyResourceDraft = (): ContentDraft => ({
  ...emptyArticleDraft(),
  kind: "resource",
  body: { bucket: FILES_BUCKET, path: "", file_name: "" } as ResourceBody,
  visibility: "students",
});

export const newBlock = (type: LessonBlockType): LessonBlock => {
  const base: LessonBlock = {
    id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    heading: "",
    heading_en: "",
  };
  if (type === "vocabulary") base.vocabulary = [{ term: "", meaning: "", example: "" }];
  else if (type === "dialogue") base.dialogue = [{ speaker: "A", line: "", translation: "" }];
  else if (type === "quiz")
    base.quiz = [{ question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }];
  else base.text = "";
  return base;
};

export const BLOCK_LABEL: Record<LessonBlockType, { vi: string; en: string }> = {
  objective: { vi: "Mục tiêu bài học", en: "Learning objectives" },
  vocabulary: { vi: "Từ vựng", en: "Vocabulary" },
  dialogue: { vi: "Hội thoại", en: "Dialogue" },
  explanation: { vi: "Giải thích", en: "Explanation" },
  practice: { vi: "Bài tập", en: "Practice" },
  quiz: { vi: "Quiz", en: "Quiz" },
};
