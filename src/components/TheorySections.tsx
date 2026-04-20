import { useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  Check, Circle, BookOpenCheck, Lightbulb, Code2, FileCode, AlertTriangle,
  ListChecks, HelpCircle, Zap, GitCompare, Dumbbell, Sparkles, BookOpen,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import CodeBlock from "@/components/CodeBlock";
import { Progress } from "@/components/ui/progress";
import StepBadge from "@/components/lesson-visuals/StepBadge";
import Callout from "@/components/lesson-visuals/Callout";
import LinearRegressionDiagram from "@/components/lesson-visuals/LinearRegressionDiagram";
import JoinVennDiagram from "@/components/lesson-visuals/JoinVennDiagram";
import SubqueryDiagram from "@/components/lesson-visuals/SubqueryDiagram";
import MermaidDiagram from "@/components/lesson-visuals/MermaidDiagram";
import DeepDive from "@/components/lesson-visuals/DeepDive";

interface TheorySectionsProps {
  markdown: string;
  storageKey: string;
  defaultCodeLanguage?: string;
}

interface Section {
  title: string | null;
  rawTitle: string | null; // original (may include "1. ")
  stepNumber: string | null;
  slug: string;
  body: string;
}

// ── Icon mapper based on title keywords ──
function pickIconForTitle(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (/(vấn đề|problem|đời thường|thực tế|why|tại sao)/.test(t)) return Lightbulb;
  if (/(cú pháp|syntax|công thức|formula|định nghĩa)/.test(t)) return Code2;
  if (/(ví dụ|example|minh ho[aạ]|demo)/.test(t)) return FileCode;
  if (/(bẫy|lỗi|sai lầm|mistake|trap|tránh|warning|cảnh báo|nguy hiểm)/.test(t)) return AlertTriangle;
  if (/(tổng kết|summary|checklist|tóm tắt|kết luận|recap)/.test(t)) return ListChecks;
  if (/(khi nào|when|use case|trường hợp)/.test(t)) return HelpCircle;
  if (/(hiệu năng|performance|tối ưu|optim|tốc độ|speed)/.test(t)) return Zap;
  if (/(so sánh|compare| vs | versus|khác nhau|difference)/.test(t)) return GitCompare;
  if (/(thực hành|practice|bài tập|exercise|hands.?on)/.test(t)) return Dumbbell;
  if (/(nâng cao|advanced|pro|chuyên sâu|deep)/.test(t)) return Sparkles;
  if (/(bí mật|tip|mẹo|trick|secret)/.test(t)) return Sparkles;
  return BookOpen;
}

function splitByH2(md: string): Section[] {
  if (!md.trim()) return [];
  const lines = md.split("\n");
  const sections: Section[] = [];
  let current: { title: string | null; rawTitle: string | null; stepNumber: string | null; bodyLines: string[] } = {
    title: null, rawTitle: null, stepNumber: null, bodyLines: [],
  };

  const slugify = (s: string, idx: number) =>
    s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || `section-${idx}`;

  const flush = () => {
    const body = current.bodyLines.join("\n").trim();
    if (current.title === null && !body) return;
    sections.push({
      title: current.title,
      rawTitle: current.rawTitle,
      stepNumber: current.stepNumber,
      slug: slugify(current.title || "intro", sections.length),
      body,
    });
  };

  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      flush();
      const raw = m[1].trim();
      const numMatch = /^(\d+)\.\s+(.+)$/.exec(raw);
      current = {
        title: numMatch ? numMatch[2].trim() : raw,
        rawTitle: raw,
        stepNumber: numMatch ? numMatch[1] : null,
        bodyLines: [],
      };
    } else {
      current.bodyLines.push(line);
    }
  }
  flush();

  // If there's only ONE numbered section (typically a lone "1."), drop the number —
  // showing a solo "1" badge looks awkward. Fall back to icon-only badge.
  const numbered = sections.filter((s) => s.stepNumber !== null);
  if (numbered.length <= 1) {
    for (const s of sections) s.stepNumber = null;
  }

  return sections;
}

// ── Detect & render embedded blocks: legacy diagrams, Mermaid, DeepDive ──
const DIAGRAM_RE = /:::diagram\s+type=["']([\w-]+)["']\s*:::/g;
// Mermaid fenced block: ```mermaid ... ```
const MERMAID_RE = /```mermaid\s*\n([\s\S]*?)```/g;
// Deep Dive block: :::deepdive title="..." ... :::
const DEEPDIVE_RE = /:::deepdive\s+title=["']([^"']+)["']\s*\n([\s\S]*?):::/g;

/**
 * Normalize math notation so KaTeX can render it.
 * AI often outputs `\( ... \)` and `\[ ... \]` (LaTeX delimiters) or raw
 * `( \frac{...}{...} )` fragments — none of which remark-math understands by default.
 * We rewrite all of these to standard `$...$` / `$$...$$` delimiters,
 * but ONLY outside fenced code blocks so we never corrupt code samples.
 */
function normalizeMath(input: string): string {
  if (!input) return input;

  // Split by fenced code so we leave ``` blocks untouched.
  const parts = input.split(/(```[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (part.startsWith("```")) return part;

      let out = part;
      // \[ ... \]  → $$ ... $$
      out = out.replace(/\\\[([\s\S]+?)\\\]/g, (_, body) => `$$${body.trim()}$$`);
      // \( ... \)  → $ ... $
      out = out.replace(/\\\(([\s\S]+?)\\\)/g, (_, body) => `$${body.trim()}$`);
      // ( \frac{..}{..} ... )  /  ( \sum ... )  /  ( \sqrt{..} ... )
      // — promote inline-paren LaTeX fragments to inline math.
      out = out.replace(
        /\(\s*((?:[^()]*\\(?:frac|sum|sqrt|hat|bar|mathbf|partial|leftarrow|rightarrow|cdot|times|leq|geq|neq|alpha|beta|gamma|delta|theta|lambda|mu|sigma|eta|epsilon|infty|in|notin|forall|exists|approx|sim|propto|prod|int|lim|log|ln|sin|cos|tan|text)[^()]*)+)\s*\)/g,
        (_, body) => `$${body.trim()}$`,
      );
      // Standalone references like [1][2] are fine, leave them.
      return out;
    })
    .join("");
}

type Chunk =
  | { kind: "md"; value: string }
  | { kind: "diagram"; value: string }
  | { kind: "mermaid"; value: string }
  | { kind: "deepdive"; title: string; body: string };

function renderDiagram(type: string): ReactNode {
  switch (type) {
    case "linear-regression": return <LinearRegressionDiagram />;
    case "join-venn": return <JoinVennDiagram />;
    case "subquery": return <SubqueryDiagram />;
    default: return null;
  }
}

/**
 * Splits a body into ordered chunks. Order of detection:
 * 1) DeepDive (:::deepdive title="...")
 * 2) Mermaid (```mermaid)
 * 3) Legacy diagram tokens (:::diagram type="...")
 * Remaining text is markdown.
 */
function splitBody(body: string): Chunk[] {
  // Collect all matches with their positions
  type M = { start: number; end: number; chunk: Chunk };
  const matches: M[] = [];

  body.replace(DEEPDIVE_RE, (m, title: string, inner: string, offset: number) => {
    matches.push({ start: offset, end: offset + m.length, chunk: { kind: "deepdive", title, body: inner } });
    return m;
  });
  body.replace(MERMAID_RE, (m, code: string, offset: number) => {
    matches.push({ start: offset, end: offset + m.length, chunk: { kind: "mermaid", value: code } });
    return m;
  });
  body.replace(DIAGRAM_RE, (m, type: string, offset: number) => {
    matches.push({ start: offset, end: offset + m.length, chunk: { kind: "diagram", value: type } });
    return m;
  });

  // Sort by position; drop overlaps (earlier wins)
  matches.sort((a, b) => a.start - b.start);
  const filtered: M[] = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  const out: Chunk[] = [];
  let cursor = 0;
  for (const m of filtered) {
    if (m.start > cursor) {
      const txt = body.slice(cursor, m.start);
      if (txt.trim()) out.push({ kind: "md", value: txt });
    }
    out.push(m.chunk);
    cursor = m.end;
  }
  if (cursor < body.length) {
    const tail = body.slice(cursor);
    if (tail.trim()) out.push({ kind: "md", value: tail });
  }
  if (out.length === 0) out.push({ kind: "md", value: body });
  return out;
}

// ── Markdown components: blockquote → Callout, code → CodeBlock, table → wrapper ──
const markdownComponents = (defaultLang: string) => ({
  table: ({ children }: any) => (
    <div className="theory-table-wrap">
      <table>{children}</table>
    </div>
  ),
  blockquote: ({ children }: any) => {
    const text = (() => {
      try {
        const collect = (n: any): string => {
          if (typeof n === "string") return n;
          if (Array.isArray(n)) return n.map(collect).join("");
          if (n?.props?.children) return collect(n.props.children);
          return "";
        };
        return collect(children).toLowerCase();
      } catch { return ""; }
    })();
    let variant: "tip" | "warning" | "note" | "quote" | "info" | "success" = "quote";
    // Order matters — check the most specific markers first.
    if (/^(\s|✅|🟢)*(optim|tối ưu|best practice|success|hiệu quả)/i.test(text) || /✅|🟢/.test(text)) variant = "success";
    else if (/^(\s|💡)*(mẹo|tip|pro tip|gợi ý)/i.test(text) || text.includes("💡")) variant = "tip";
    else if (/^(\s|⚠️|🚨)*(cảnh báo|warning|danger|nguy hiểm|chú ý|coi chừng|risk)/i.test(text) || /⚠️|🚨/.test(text)) variant = "warning";
    else if (/^(\s|🔵|ℹ️)*(info|definition|định nghĩa)/i.test(text) || /🔵/.test(text)) variant = "info";
    else if (/^(\s|📝|ℹ️)*(lưu ý|note|ghi chú|chú thích)/i.test(text) || /📝|ℹ️/.test(text)) variant = "note";
    return <Callout variant={variant}>{children}</Callout>;
  },
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const codeStr = String(children).replace(/\n$/, "");
    // Mermaid is handled by splitBody before reaching here, but guard just in case.
    if (!inline && match && match[1] === "mermaid") return <MermaidDiagram code={codeStr} />;
    if (!inline && match) return <CodeBlock code={codeStr} language={match[1]} />;
    if (!inline && codeStr.includes("\n")) return <CodeBlock code={codeStr} language={defaultLang} />;
    return <code className={className} {...props}>{children}</code>;
  },
});

const TheorySections = ({ markdown, storageKey, defaultCodeLanguage = "text" }: TheorySectionsProps) => {
  const sections = useMemo(() => splitByH2(normalizeMath(markdown)), [markdown]);
  const components = useMemo(() => markdownComponents(defaultCodeLanguage), [defaultCodeLanguage]);

  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());

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

  const persist = useCallback((next: Set<string>) => {
    try { localStorage.setItem(storageKey, JSON.stringify(Array.from(next))); } catch { /* ignore */ }
  }, [storageKey]);

  const toggleRead = useCallback((slug: string) => {
    setReadSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      persist(next);
      return next;
    });
  }, [persist]);

  const markableSections = sections.filter((s) => s.title !== null);
  const totalMarkable = markableSections.length;
  const readCount = markableSections.filter((s) => readSlugs.has(s.slug)).length;
  const pct = totalMarkable > 0 ? Math.round((readCount / totalMarkable) * 100) : 0;
  const allDone = totalMarkable > 0 && readCount === totalMarkable;

  const renderBody = (body: string) => {
    const chunks = splitBody(body);
    return chunks.map((c, i) => {
      if (c.kind === "diagram") return <div key={`d-${i}`}>{renderDiagram(c.value)}</div>;
      if (c.kind === "mermaid") return <MermaidDiagram key={`mmd-${i}`} code={c.value} />;
      if (c.kind === "deepdive") {
        return (
          <DeepDive key={`dd-${i}`} title={c.title}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={components}
            >
              {c.body}
            </ReactMarkdown>
          </DeepDive>
        );
      }
      return (
        <ReactMarkdown
          key={`m-${i}`}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {c.value}
        </ReactMarkdown>
      );
    });
  };

  return (
    <div className="theory-content">
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

        if (section.title === null) {
          return (
            <div key={`intro-${idx}`} className="theory-section">
              {renderBody(section.body)}
            </div>
          );
        }

        const Icon = pickIconForTitle(section.title);

        return (
          <motion.div
            key={section.slug}
            id={section.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`theory-section relative ${isRead ? "opacity-90" : ""}`}
          >
            {/* Section divider above (skip first) */}
            {idx > 0 && (
              <div
                className="not-prose h-px my-5"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--border)) 30%, hsl(var(--border)) 70%, transparent)",
                }}
                aria-hidden="true"
              />
            )}

            <div className="not-prose flex items-start justify-between gap-3 mt-2 mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {section.stepNumber ? (
                  <StepBadge number={section.stepNumber} />
                ) : (
                  <span
                    className="inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-full text-primary bg-primary/10 ring-1 ring-primary/30"
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <h2
                  className={`text-[1.15rem] font-bold leading-tight tracking-tight flex items-center gap-2 ${
                    isRead ? "text-foreground/70 line-through decoration-primary/40 decoration-1" : "text-primary"
                  }`}
                >
                  {section.stepNumber && <Icon className="w-4 h-4 opacity-70 shrink-0" aria-hidden="true" />}
                  <span>{section.title}</span>
                </h2>
              </div>
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
                  <><Check className="w-3.5 h-3.5" /><span>Read</span></>
                ) : (
                  <><Circle className="w-3.5 h-3.5" /><span>Mark read</span></>
                )}
              </button>
            </div>

            {renderBody(section.body)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TheorySections;
