// Shared metadata for Your Corner: subjects, moods, hashtag parsing

export type SubjectKey =
  | "IELTS"
  | "TOEIC"
  | "Cambridge"
  | "Chinese"
  | "Finnish"
  | "Vietnamese"
  | "Programming"
  | "General";

export const SUBJECTS: { key: SubjectKey; label: string; emoji: string; color: string; border: string; bg: string }[] = [
  { key: "IELTS", label: "IELTS", emoji: "📘", color: "text-rose-600 dark:text-rose-300", border: "border-l-rose-500", bg: "bg-rose-500/10" },
  { key: "TOEIC", label: "TOEIC", emoji: "💼", color: "text-blue-600 dark:text-blue-300", border: "border-l-blue-600", bg: "bg-blue-500/10" },
  { key: "Cambridge", label: "Cambridge", emoji: "🎓", color: "text-purple-600 dark:text-purple-300", border: "border-l-purple-500", bg: "bg-purple-500/10" },
  { key: "Chinese", label: "Chinese / HSK", emoji: "🐉", color: "text-red-600 dark:text-red-300", border: "border-l-red-500", bg: "bg-red-500/10" },
  { key: "Finnish", label: "Finnish / YKI", emoji: "❄️", color: "text-cyan-600 dark:text-cyan-300", border: "border-l-cyan-500", bg: "bg-cyan-500/10" },
  { key: "Vietnamese", label: "Vietnamese", emoji: "🇻🇳", color: "text-amber-600 dark:text-amber-300", border: "border-l-amber-500", bg: "bg-amber-500/10" },
  { key: "Programming", label: "Programming", emoji: "💻", color: "text-emerald-600 dark:text-emerald-300", border: "border-l-emerald-500", bg: "bg-emerald-500/10" },
  { key: "General", label: "Chia sẻ chung", emoji: "✨", color: "text-slate-600 dark:text-slate-300", border: "border-l-slate-400", bg: "bg-slate-500/10" },
];

export const subjectMap = new Map(SUBJECTS.map((s) => [s.key, s]));

export const MOODS = ["🔥", "💪", "💡", "🎯", "🎉", "😊", "🤔", "😅", "💙", "🚀"];

export type Visibility = "public" | "teacher_only" | "private";

export const VISIBILITY_OPTIONS: {
  key: Visibility;
  label: string;
  hint: string;
  icon: "globe" | "graduation" | "lock";
}[] = [
  { key: "public",       label: "Công khai",        hint: "Tất cả học viên đều thấy",       icon: "globe" },
  { key: "teacher_only", label: "Chỉ giáo viên",    hint: "Bạn và giáo viên/admin thấy",    icon: "graduation" },
  { key: "private",      label: "Chỉ mình tôi",     hint: "Lưu riêng, chỉ bạn thấy",        icon: "lock" },
];

export const visibilityMap = new Map(VISIBILITY_OPTIONS.map((v) => [v.key, v]));

// Extract hashtags (#word, alphanum + Vietnamese)
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\p{L}0-9_]+/gu) || [];
  return Array.from(new Set(matches.map((m) => m.toLowerCase())));
}

// Inline hashtag highlighting: wrap hashtags in span class
export function linkifyHashtags(html: string): string {
  return html.replace(/(#[\p{L}0-9_]+)/gu, '<span class="text-primary font-semibold">$1</span>');
}
