/**
 * pageContext - turns the current URL into a human-readable description of the
 * page the learner is looking at, so Teacher Hai's chatbot can answer questions
 * like "explain this part" without the student re-typing where they are.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { SEARCH_ENTRIES } from "@/lib/search/searchIndex";

/** Best matching page label (longest route prefix wins). */
export const resolvePageLabel = (pathname: string): string | null => {
  let best: { len: number; label: string } | null = null;
  for (const e of SEARCH_ENTRIES) {
    if (pathname === e.to || pathname.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`)) {
      const len = e.to.length;
      if (!best || len > best.len) best = { len, label: `${e.en} (${e.vi})` };
    }
  }
  return best?.label ?? null;
};

/** Readable title of the lesson/section currently open, from the document title. */
const docTitle = (): string => {
  if (typeof document === "undefined") return "";
  return (document.title || "").replace(/\s*[|·-]\s*HaiEduTech.*$/i, "").trim();
};

/** Extract the trailing slug of a lesson route, e.g. /programming/py/loops -> "loops". */
const slugTitle = (pathname: string): string => {
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "";
  if (!last || last.length < 3) return "";
  return last.replace(/[-_]+/g, " ");
};

/**
 * Build the context block describing the current page. Kept short so it never
 * crowds out the student's own study data.
 */
export const buildPageContext = (pathname: string, search = ""): string => {
  const label = resolvePageLabel(pathname);
  const title = docTitle();
  const slug = slugTitle(pathname);
  const lines = [`Current page URL: ${pathname}${search || ""}`];
  if (label) lines.push(`Current page name: ${label}`);
  if (title && title.toLowerCase() !== (label || "").toLowerCase()) {
    lines.push(`Page / lesson title on screen: ${title}`);
  }
  if (slug && !title) lines.push(`Section slug: ${slug}`);
  lines.push(
    'If the student says "this part", "this lesson", "this exercise" or asks without naming a topic, assume they mean the page above and answer about it.',
  );
  return lines.join("\n");
};
