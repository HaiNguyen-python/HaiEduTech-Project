import { useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// KaTeX options:
//  - strict:false + throwOnError:false → unknown commands render in red instead of breaking the page
//  - macros → map common AI-emitted but non-standard commands to valid KaTeX equivalents
const KATEX_OPTIONS = {
  strict: false as const,
  throwOnError: false,
  errorColor: "#dc2626",
  output: "html" as const,
  macros: {
    "\\clip": "\\operatorname{clip}",
    "\\argmin": "\\operatorname{arg\\,min}",
    "\\argmax": "\\operatorname{arg\\,max}",
    "\\softmax": "\\operatorname{softmax}",
    "\\relu": "\\operatorname{ReLU}",
    "\\sigmoid": "\\operatorname{sigmoid}",
    "\\tr": "\\operatorname{tr}",
    "\\diag": "\\operatorname{diag}",
    "\\rank": "\\operatorname{rank}",
    "\\E": "\\mathbb{E}",
    "\\R": "\\mathbb{R}",
    "\\N": "\\mathbb{N}",
    "\\Z": "\\mathbb{Z}",
    "\\Q": "\\mathbb{Q}",
    "\\KL": "\\operatorname{KL}",
    "\\norm": "\\left\\| #1 \\right\\|",
  },
};
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
// Common LaTeX command names we expect to see inline. Used to detect bare LaTeX
// fragments that the AI emitted WITHOUT $...$ delimiters (e.g. "J\theta = \mathbb{E}[R(\tau)]").
const LATEX_CMDS =
  "frac|sum|sqrt|hat|bar|tilde|vec|dot|ddot|overline|underline|mathbb|mathbf|mathcal|mathrm|mathit|mathsf|text|operatorname|" +
  "partial|nabla|infty|emptyset|in|notin|subset|supset|cup|cap|forall|exists|neg|land|lor|" +
  "leftarrow|rightarrow|leftrightarrow|Leftarrow|Rightarrow|Leftrightarrow|to|mapsto|" +
  "cdot|cdots|ldots|times|div|pm|mp|ast|star|circ|bullet|" +
  "leq|geq|neq|equiv|approx|sim|simeq|cong|propto|le|ge|ne|" +
  "alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|theta|vartheta|iota|kappa|lambda|mu|nu|xi|omicron|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|phi|varphi|chi|psi|omega|" +
  "Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega|" +
  "prod|int|oint|iint|iiint|lim|liminf|limsup|sup|inf|min|max|arg|gcd|lcm|" +
  "log|ln|exp|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|sinh|cosh|tanh|" +
  "left|right|big|Big|bigg|Bigg|langle|rangle|lvert|rvert|lVert|rVert|lceil|rceil|lfloor|rfloor|" +
  "begin|end|matrix|pmatrix|bmatrix|vmatrix|Vmatrix|cases|aligned|align|" +
  "clip|min|max|argmin|argmax|displaystyle|scriptstyle|quad|qquad";

const LATEX_CMD_RE = new RegExp(`\\\\(?:${LATEX_CMDS})\\b`);

/**
 * Normalize math notation so KaTeX can render it.
 * AI often outputs `\( ... \)` and `\[ ... \]` (LaTeX delimiters), or raw
 * LaTeX fragments like `J\theta = \mathbb{E}[R(\tau)]` with NO delimiters at all.
 * We rewrite all of these to standard `$...$` / `$$...$$` so remark-math + KaTeX render them,
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

      // Replace double-pipe norm bars `||x||` with KaTeX-friendly `\|x\|`
      // (KaTeX doesn't natively render `||...||`). Apply globally outside code.
      // Run twice: once for pairs separated by content, once for stray `||`.
      out = out.replace(/\|\|/g, "\\|");

      // Repair pass: the AI sometimes wraps a math expression in plain text
      // parentheses without `$...$`, e.g. `(\lambda \|\beta\|^2)` or
      // `((\lambda \|\beta\|^2))`. Detect a paren group containing a `\cmd`
      // and wrap its inside in inline math, keeping the parens textual.
      // Strip any extra outer pair of parens too.
      out = out.replace(
        /\(\s*\(([^()\n$]*\\[A-Za-z]+[^()\n$]*)\)\s*\)/g,
        (_, inner) => `($${inner.trim()}$)`,
      );
      out = out.replace(
        /(^|[^$\\])\(([^()\n$]*\\[A-Za-z]+[^()\n$]*)\)/g,
        (_, pre, inner) => `${pre}($${inner.trim()}$)`,
      );

      // ── Wrap BARE LaTeX fragments (no $ delimiters) in inline math. ──
      out = out
        .split("\n")
        .map((line) => {
          const standaloneWrapped = wrapStandaloneLatexLine(line);
          return standaloneWrapped !== line ? standaloneWrapped : wrapBareLatexInLine(line);
        })
        .join("\n");

      return out;
    })
    .join("");
}

/** Split a line into protected (math/code) and unprotected segments,
 *  then wrap LaTeX-looking runs inside the unprotected ones. */
function wrapBareLatexInLine(line: string): string {
  // Quick-out: nothing that looks like LaTeX.
  if (!/\\[A-Za-z]+|[_^]\{/.test(line)) return line;

  // Tokenize: keep $$...$$, $...$, and `...` as opaque.
  const TOKEN_RE = /(\$\$[^$]+\$\$|\$[^$\n]+\$|`[^`\n]+`)/g;
  const segs = line.split(TOKEN_RE);

  return segs
    .map((seg) => {
      if (!seg) return seg;
      if (/^\$\$[\s\S]+\$\$$/.test(seg)) return seg;
      if (/^\$[^$\n]+\$$/.test(seg)) return seg;
      if (/^`[^`\n]+`$/.test(seg)) return seg;
      return wrapLatexRuns(seg);
    })
    .join("");
}

function wrapStandaloneLatexLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed || trimmed.includes("$") || /^([>#\-]|\d+\.)\s/.test(trimmed)) return line;

  const candidate = trimmed.replace(/^\(+\s*/, "").replace(/\s*\)+$/, "");
  const startsMathy = /^\\[A-Za-z]+/.test(candidate);
  const hasStrongMath = /\\(?:text|frac|sqrt|left|right|sum|prod|int|lambda|beta|alpha|theta|hat|mathbb|operatorname|softmax)\b/.test(candidate);
  const proseShadow = candidate
    .replace(/\\[A-Za-z]+(?:\{[^{}]*\})?/g, " ")
    .replace(/[{}_^=+\-*/(),.[\]]/g, " ");
  const looksLikeSentence = /\b[a-z]{4,}\s+[a-z]{4,}\b/.test(proseShadow);

  if (!startsMathy || !hasStrongMath || looksLikeSentence) return line;
  return line.replace(trimmed, `$${trimmed}$`);
}

/** Inside an unprotected segment, find runs that contain LaTeX commands and
 *  wrap each run with $...$ so KaTeX renders them. A "run" is a contiguous
 *  span of non-space tokens including at least one LaTeX command, optionally
 *  joined by spaces. We also include neighboring identifiers/operators that
 *  belong to the same expression (e.g. "J\theta = \mathbb{E}[R(\tau)]"). */
function wrapLatexRuns(text: string): string {
  // Pattern for a single math-ish token:
  //   - \cmd  (with optional {..} or [..] arg, possibly nested one level)
  //   - \|   (norm bar)
  //   - {...}
  //   - identifier with _{..} or ^{..} (e.g. L^{CLIP}, r_t)
  //   - numbers, single letters, common math operators when adjacent to math
  const MATH_TOKEN =
    String.raw`(?:\\\|` +                                                             // \|  (norm)
    String.raw`|\\[A-Za-z]+(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|\[[^\[\]]*\])*` +       // \cmd{..}{..}
    String.raw`|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}` +                                    // {..}
    String.raw`|[A-Za-z](?:_\{[^{}]+\}|\^\{[^{}]+\}|_[A-Za-z0-9]|\^[A-Za-z0-9])+` +   // x_t, L^{CLIP}
    String.raw`|[=+\-*/<>,.;:!?()\[\]]` +                                             // operators / punctuation glue
    String.raw`|[A-Za-z0-9]+` +                                                       // bare ids/numbers
    String.raw`)`;

  // A run = sequence of MATH_TOKENs optionally separated by spaces (allow glue),
  // containing at least one \cmd or _{ / ^{
  const RUN_RE = new RegExp(
    String.raw`(?:${MATH_TOKEN})(?:[ \t]*(?:${MATH_TOKEN}))*`,
    "g",
  );

  return text.replace(RUN_RE, (run) => {
    // Skip if no real LaTeX command or sub/sup brace inside.
    if (!LATEX_CMD_RE.test(run) && !/[_^]\{/.test(run) && !/\\\|/.test(run)) return run;
    // Skip URLs / paths.
    if (/https?:\/\//.test(run)) return run;
    // Trim trailing punctuation we don't want inside the math.
    const trailMatch = run.match(/^([\s\S]*?)([.,;:!?)\]]+)$/);
    let inner = run;
    let trail = "";
    if (trailMatch) {
      inner = trailMatch[1];
      trail = trailMatch[2];
    }
    // Strip leading punctuation too (rare).
    const leadMatch = inner.match(/^([(\[]+)([\s\S]+)$/);
    let lead = "";
    if (leadMatch) {
      lead = leadMatch[1];
      inner = leadMatch[2];
    }
    const trimmed = inner.trim();
    if (!trimmed) return run;
    return `${lead}$${trimmed}$${trail}`;
  });
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
  // AI-generated lesson illustrations: wrap each <img> in a styled <figure>
  // with a soft border, rounded corners, drop shadow, and italic caption.
  // Reserves a 1:1 aspect ratio so the page layout doesn't shift while loading
  // (preserves the scrollbar-stability behavior).
  img({ src, alt }: any) {
    if (!src) return null;
    const caption = (alt || "").trim();
    return (
      <figure className="my-6 mx-auto max-w-[720px] flex flex-col items-center">
        <div
          className="w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-md"
          style={{ aspectRatio: "1 / 1", contain: "layout paint" }}
        >
          <img
            src={src}
            alt={caption || "Lesson illustration"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-sm italic text-muted-foreground text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },
});

// Strip an outer ```markdown ... ``` wrapper that some AI providers emit around
// the entire response. Without this, the whole lesson would render as a single
// code block (with a "MARKDOWN" header) instead of structured theory.
function stripOuterMarkdownFence(md: string): string {
  const trimmed = (md || "").trim();
  const m = trimmed.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n?```\s*$/i);
  return m ? m[1].trim() : trimmed;
}

/**
 * Break long, dense paragraphs into smaller ones for readability.
 * Splits a paragraph into sub-paragraphs of ~2 sentences each when it's long
 * (>= 280 chars OR >= 3 sentences). Skips lists, headings, blockquotes, code,
 * tables, math display blocks, and lines containing inline math/code so we
 * never corrupt formulas or markdown structure.
 */
function splitLongParagraphs(input: string): string {
  if (!input) return input;
  const parts = input.split(/(```[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (part.startsWith("```")) return part;
      // Process by blank-line-separated blocks (paragraphs)
      const blocks = part.split(/\n{2,}/);
      return blocks
        .map((block) => {
          const trimmed = block.trim();
          if (!trimmed) return block;
          // Skip non-paragraph blocks
          const firstLine = trimmed.split("\n")[0];
          if (/^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s|\||:::|\$\$)/.test(firstLine)) return block;
          // Multi-line block that isn't a plain paragraph (e.g. table, list continuation)
          if (trimmed.includes("\n") && /(^|\n)([-*+]\s|\d+\.\s|\||>\s)/.test(trimmed)) return block;
          // Skip if it contains display math or starts/ends mid-formula
          if (/\$\$[\s\S]+\$\$/.test(trimmed)) return block;

          // Flatten internal single newlines into spaces for sentence splitting,
          // but preserve them if the paragraph is short.
          const flat = trimmed.replace(/\s*\n\s*/g, " ");
          const sentenceCount = (flat.match(/[.!?…]["')\]]?\s+(?=[A-ZÀ-ỹ0-9])/g) || []).length + 1;
          if (flat.length < 280 && sentenceCount < 3) return block;

          // Split into sentences without breaking inside $...$ or `...` or (...)
          const sentences = splitIntoSentences(flat);
          if (sentences.length < 2) return block;

          // Group every 2 sentences into a sub-paragraph
          const groups: string[] = [];
          for (let i = 0; i < sentences.length; i += 2) {
            groups.push(sentences.slice(i, i + 2).join(" ").trim());
          }
          return groups.filter(Boolean).join("\n\n");
        })
        .join("\n\n");
    })
    .join("");
}

/** Split text into sentences while respecting $...$, `...`, and parentheses. */
function splitIntoSentences(text: string): string[] {
  const out: string[] = [];
  let buf = "";
  let inMath = false;
  let inCode = false;
  let parenDepth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    buf += ch;
    if (ch === "`") inCode = !inCode;
    else if (ch === "$" && !inCode) inMath = !inMath;
    else if (!inMath && !inCode) {
      if (ch === "(" || ch === "[") parenDepth++;
      else if (ch === ")" || ch === "]") parenDepth = Math.max(0, parenDepth - 1);
      else if (/[.!?…]/.test(ch) && parenDepth === 0) {
        // Look ahead: must be followed by space + uppercase/digit (next sentence start)
        const next = text.slice(i + 1, i + 3);
        if (/^["')\]]?\s+[A-ZÀ-ỹ0-9]/.test(next)) {
          out.push(buf.trim());
          buf = "";
        }
      }
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

const TheorySections = ({ markdown, storageKey, defaultCodeLanguage = "text" }: TheorySectionsProps) => {
  const sections = useMemo(
    () => splitByH2(splitLongParagraphs(normalizeMath(stripOuterMarkdownFence(markdown)))),
    [markdown],
  );
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
              rehypePlugins={[[rehypeKatex, KATEX_OPTIONS]]}
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
          rehypePlugins={[[rehypeKatex, KATEX_OPTIONS]]}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
