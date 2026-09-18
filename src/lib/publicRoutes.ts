/**
 * Which routes a guest (not signed in) may use, plus friendly section labels
 * for the sign-in invitation screen.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

/** Exact paths that stay open to everyone. */
export const PUBLIC_PATHS = [
  "/",
  "/home",
  "/welcome",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/unsubscribe",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
] as const;

/** Public path prefixes (marketing + blog, kept crawlable). */
export const PUBLIC_PREFIXES = ["/insights", "/dich-vu-web"] as const;

const normalize = (pathname: string) => {
  if (!pathname) return "/";
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return trimmed === "" ? "/" : trimmed;
};

export const isPublicPath = (pathname: string): boolean => {
  const path = normalize(pathname);
  if ((PUBLIC_PATHS as readonly string[]).includes(path)) return true;
  return (PUBLIC_PREFIXES as readonly string[]).some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
};

/** Bilingual labels for the first path segment, shown on the invite card. */
const SECTION_LABELS: Record<string, { vi: string; en: string }> = {
  english: { vi: "Tiếng Anh", en: "English" },
  ielts: { vi: "IELTS", en: "IELTS" },
  toeic: { vi: "TOEIC", en: "TOEIC" },
  pte: { vi: "PTE", en: "PTE" },
  sat: { vi: "SAT", en: "SAT" },
  cambridge: { vi: "Cambridge YLE", en: "Cambridge YLE" },
  chinese: { vi: "Tiếng Trung", en: "Chinese" },
  hsk: { vi: "HSK", en: "HSK" },
  japanese: { vi: "Tiếng Nhật", en: "Japanese" },
  finnish: { vi: "Tiếng Phần Lan", en: "Finnish" },
  swedish: { vi: "Tiếng Thụy Điển", en: "Swedish" },
  "learn-vietnamese": { vi: "Tiếng Việt", en: "Vietnamese" },
  vietnamese: { vi: "Tiếng Việt", en: "Vietnamese" },
  programming: { vi: "Lập trình", en: "Programming" },
  python: { vi: "Lập trình Python", en: "Python" },
  games: { vi: "Khu trò chơi", en: "Game Center" },
  "game-center": { vi: "Khu trò chơi", en: "Game Center" },
  "your-corner": { vi: "Góc của bạn", en: "Your Corner" },
  dashboard: { vi: "Trang cá nhân", en: "Your dashboard" },
  "lifestyle-academy": { vi: "Lifestyle Academy", en: "Lifestyle Academy" },
  notebook: { vi: "Sổ tay học tập", en: "Study notebook" },
  leaderboard: { vi: "Bảng xếp hạng", en: "Leaderboards" },
  scholarships: { vi: "Học bổng toàn cầu", en: "Global Scholarships" },
  "study-abroad": { vi: "Du học", en: "Study Abroad" },
  counseling: { vi: "Tư vấn hướng nghiệp", en: "Counseling Hub" },
  admin: { vi: "Khu quản trị", en: "Admin area" },
  "admin-dashboard": { vi: "Khu quản trị", en: "Admin area" },
  assistant: { vi: "Khu trợ giảng", en: "Assistant area" },
};

export const sectionLabel = (pathname: string, isVietnamese: boolean): string => {
  const seg = normalize(pathname).split("/").filter(Boolean)[0] ?? "";
  const hit = SECTION_LABELS[seg];
  if (hit) return isVietnamese ? hit.vi : hit.en;
  return isVietnamese ? "Nội dung học" : "Learning content";
};
