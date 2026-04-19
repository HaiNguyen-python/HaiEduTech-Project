import { useState, useEffect, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Circle, BookOpenCheck } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import { Progress } from "@/components/ui/progress";

interface TheorySectionsProps {
  /** Final, pre-processed markdown (leading H1 already stripped) */
  markdown: string;
  /** Storage key — should be unique per lesson, e.g. `theory-read:${moduleId}:${lessonId}` */
  storageKey: string;
  /** Default code language for fenced blocks without an explicit language */
  defaultCodeLanguage?: string;
}

interface Section {
  /** H2 title text, or null for the intro block before the first H2 */
  title: string | null;
  /** Stable slug for the section (used as id within storage) */
  slug: string;
  /** Markdown body of this section (excluding its own H2 line) */
  body: string;
}

/** Split markdown by top-level `## ` headings into ordered sections. */
function splitByH2(md: string): Section[] {
  if (!md.trim()) return [];

  // We split on lines that start with exactly `## ` (not ###, etc.)
  // Use a regex with capturing group so the split keeps the heading line.
  const lines = md.split("\n");
  const sections: Section[] = [];
  let current: { title: string | null; bodyLines: string[] } = {
    title: null,
    bodyLines: [],
  };

  const slugify = (s: string, idx: number) =>
    s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || `section-${idx}`;

  const flush = () => {
    const body = current.bodyLines.join("\n").trim();
    if (current.title === null && !body) return; // skip empty intro
    sections.push({
      title: current.title,
      slug: slugify(current.title || "intro", sections.length),
      body,
    });
  };

  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      flush();
      current = { title: m[1].trim(), bodyLines: [] };
    } else {
      current.bodyLines.push(line);
    }
  }
  flush();

  return sections;
}

const markdownComponents = (defaultLang: string) => ({
  table: ({ children }: any) => (
    <div className="theory-table-wrap">
      <table>{children}</table>
    </div>
  ),
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const codeStr = String(children).replace(/\n$/, "");
    if (!inline && match) return <CodeBlock code={codeStr} language={match[1]} />;
    if (!inline && codeStr.includes("\n")) return <CodeBlock code={codeStr} language={defaultLang} />;
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
});

const TheorySections = ({ markdown, storageKey, defaultCodeLanguage = "text" }: TheorySectionsProps) => {
  const sections = useMemo(() => splitByH2(markdown), [markdown]);
  const components = useMemo(() => markdownComponents(defaultCodeLanguage), [defaultCodeLanguage]);

  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());

  // Load progress whenever the lesson (storageKey) changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        setReadSlugs(new Set(arr));
      } else {
        setReadSlugs(new Set());
      }
    } catch {
      setReadSlugs(new Set());
    }
  }, [storageKey]);

  const persist = useCallback(
    (next: Set<string>) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch {
        /* ignore quota errors */
      }
    },
    [storageKey],
  );

  const toggleRead = useCallback(
    (slug: string) => {
      setReadSlugs((prev) => {
        const next = new Set(prev);
        if (next.has(slug)) next.delete(slug);
        else next.add(slug);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const markableSections = sections.filter((s) => s.title !== null);
  const totalMarkable = markableSections.length;
  const readCount = markableSections.filter((s) => readSlugs.has(s.slug)).length;
  const pct = totalMarkable > 0 ? Math.round((readCount / totalMarkable) * 100) : 0;

  const allDone = totalMarkable > 0 && readCount === totalMarkable;

  return (
    <div className="theory-content">
      {/* Section progress header */}
      {totalMarkable > 0 && (
        <div className="not-prose mb-5 flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-primary/5 border border-primary/15">
          <BookOpenCheck className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-medium text-foreground">
            Section progress: {readCount}/{totalMarkable}
          </span>
          <div className="flex-1 min-w-[80px]">
            <Progress value={pct} className="h-1.5" />
          </div>
          <span className={`text-xs font-semibold ${allDone ? "text-green-600" : "text-primary"}`}>
            {pct}%
          </span>
        </div>
      )}

      {sections.map((section, idx) => {
        const isRead = section.title !== null && readSlugs.has(section.slug);

        // Intro block (no H2) — just render body, no toggle
        if (section.title === null) {
          return (
            <div key={`intro-${idx}`} className="theory-section">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {section.body}
              </ReactMarkdown>
            </div>
          );
        }

        return (
          <div
            key={section.slug}
            className={`theory-section relative transition-all ${
              isRead ? "opacity-90" : ""
            }`}
            id={section.slug}
          >
            {/* Custom H2 with inline toggle */}
            <div className="not-prose flex items-start justify-between gap-3 mt-7 mb-2 pb-2 border-b border-border">
              <h2
                className={`text-[1.15rem] font-bold leading-tight tracking-tight flex-1 ${
                  isRead ? "text-foreground/70 line-through decoration-primary/40 decoration-1" : "text-primary"
                }`}
              >
                {section.title}
              </h2>
              <button
                type="button"
                onClick={() => toggleRead(section.slug)}
                aria-pressed={isRead}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all active:scale-[0.97] ${
                  isRead
                    ? "bg-green-500/10 border-green-500/40 text-green-700 hover:bg-green-500/15"
                    : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {isRead ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" />
                    <span>Mark read</span>
                  </>
                )}
              </button>
            </div>

            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {section.body}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
};

export default TheorySections;
