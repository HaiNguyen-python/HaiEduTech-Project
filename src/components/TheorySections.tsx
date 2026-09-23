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
    "\\round": "\\operatorname{round}",
    "\\sign": "\\operatorname{sign}",
    "\\Var": "\\operatorname{Var}",
    "\\Cov": "\\operatorname{Cov}",
    "\\Bias": "\\operatorname{Bias}",
    "\\Pr": "\\operatorname{Pr}",
    "\\indicator": "\\mathbb{1}",
  },
};
import {
  Check, Circle, BookOpenCheck, Lightbulb, Code2, FileCode, AlertTriangle,
  ListChecks, HelpCircle, Zap, GitCompare, Dumbbell, Sparkles, BookOpen,
  ChevronDown, ChevronsDownUp, ChevronsUpDown,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import CodeBlock from "@/components/CodeBlock";
import { Progress } from "@/components/ui/progress";
import StepBadge from "@/components/lesson-visuals/StepBadge";
import Callout from "@/components/lesson-visuals/Callout";
import LinearRegressionDiagram from "@/components/lesson-visuals/LinearRegressionDiagram";
import EdTechArchDiagram from "@/components/lesson-visuals/EdTechArchDiagram";
import JoinVennDiagram from "@/components/lesson-visuals/JoinVennDiagram";
import SubqueryDiagram from "@/components/lesson-visuals/SubqueryDiagram";
import MermaidDiagram from "@/components/lesson-visuals/MermaidDiagram";

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
  if (!/^##\s+/m.test(md)) {
    return [{ title: null, rawTitle: null, stepNumber: null, slug: "intro", body: md.trim() }];
  }
  const lines = md.split("\n");
  const sections: Section[] = [];
  let current: { title: string | null; rawTitle: string | null; stepNumber: string | null; bodyLines: string[] } = {
    title: null, rawTitle: null, stepNumber: null, bodyLines: [],
  };

  const usedSlugs = new Set<string>();
  const slugify = (s: string, idx: number) => {
    const base =
      s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || `section-${idx}`;
    // Two headings can share a title inside one lesson. Duplicate slugs collide
    // in React keys and in the open/read state maps, which made one section
    // refuse to expand and rendered badges out of order. Always disambiguate.
    if (!usedSlugs.has(base)) {
      usedSlugs.add(base);
      return base;
    }
    let n = 2;
    while (usedSlugs.has(`${base}-${n}`)) n += 1;
    const unique = `${base}-${n}`;
    usedSlugs.add(unique);
    return unique;
  };

  const flush = () => {
    const body = current.bodyLines.join("\n").trim();
    // Drop headings with no content at all (e.g. leftover "8. Deep Dive" stubs)
    // so students never see an empty numbered step badge.
    if (!body) return;
    const isIntro = current.title === null;
    sections.push({
      title: isIntro ? "Lesson Overview" : current.title,
      rawTitle: isIntro ? "Lesson Overview" : current.rawTitle,
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

  // Renumber the surviving numbered sections so removing an empty section never
  // leaves a gap in the badges (e.g. 1,2,3,4,5,6,7 instead of 1,2,3,4,5,6,8).
  const numbered = sections.filter((s) => s.stepNumber !== null);
  if (numbered.length <= 1) {
    // A solo "1" badge looks awkward - fall back to icon-only badges.
    for (const s of sections) s.stepNumber = null;
  } else {
    numbered.forEach((s, i) => {
      s.stepNumber = String(i + 1);
      if (s.rawTitle && s.title) s.rawTitle = `${i + 1}. ${s.title}`;
    });
  }


  return sections;
}

// ── Detect & render embedded diagrams and Mermaid blocks ──
const DIAGRAM_RE = /:::diagram\s+type=["']([\w-]+)["']\s*:::/g;
// Mermaid fenced block: ```mermaid ... ```
const MERMAID_RE = /```mermaid\s*\n([\s\S]*?)```/g;
const removeOptionalDeepDives = (markdown: string): string =>
  markdown
    .replace(/:::deepdive\s+title=["'][^"']+["']\s*\n[\s\S]*?:::/g, "")
    .replace(/```deepdive[\s\S]*$/g, "")
    // Leftover empty "8. Deep Dive" style headings with no body content.
    .replace(/(?:^|\n)#{1,6}[ \t]*\d*\.?[ \t]*Deep[ -]?Dive[^\n]*(?=\s*(?:\n#{1,6}\s|$))/gi, "")
    .replace(/\n{3,}/g, "\n\n")

    .trim();

/**
 * Normalize math notation so KaTeX can render it.
 * AI often outputs `\( ... \)` and `\[ ... \]` (LaTeX delimiters) or raw
 * `( \frac{...}{...} )` fragments - none of which remark-math understands by default.
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
// Exported for regression tests that cover malformed AI-generated notation.
// eslint-disable-next-line react-refresh/only-export-components
export function normalizeMath(input: string): string {
  if (!input) return input;

  // Split by fenced and inline code so operators such as `a || b` are never
  // mistaken for math notation.
  const parts = input.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
  return parts
    .map((part) => {
      if (part.startsWith("`")) return part;

      let out = part;

      // Three or more dollar signs followed by prose punctuation are price-tier
      // notation (for example "Cost: $$$$"), not adjacent math delimiters.
      // Escape them before remark-math can consume the surrounding sentence.
      out = out.replace(/\${3,}(?=[)\],.;:\s]|$)/g, (run) => "\\$".repeat(run.length));

      // AI output sometimes applies Markdown emphasis directly to raw LaTeX,
      // such as **\hat{P}, \hat{R}**. Markdown parses the underscores before
      // KaTeX sees them, producing the garbled italic text reported by learners.
      // Convert only strong spans that contain an unmistakable LaTeX command or
      // braced sub/superscript. Ordinary bold terminology remains untouched.
      out = out.replace(/\*\*([^*\n]+)\*\*/g, (whole, body: string) => {
        const trimmed = body.trim();
        if (trimmed.includes("$") || (!LATEX_CMD_RE.test(trimmed) && !/[_^]\{/.test(trimmed))) {
          return whole;
        }
        return `$${trimmed}$`;
      });

      // \[ ... \]  → $$ ... $$
      out = out.replace(/\\\[([\s\S]+?)\\\]/g, (_, body) => `$$${body.trim()}$$`);
      // \( ... \)  → $ ... $
      out = out.replace(/\\\(([\s\S]+?)\\\)/g, (_, body) => `$${body.trim()}$`);

      // Trim each complete display formula in one pass. Separate opening-only
      // and closing-only regexes can mistake the close of formula A for the
      // open of formula B and produce `$$$$` between adjacent equations.
      out = out.replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => `$$${body.trim()}$$`);
      out = out.replace(/(^|[^$])\$\s+([^$\n]+?)\s+\$(?!\$)/g, (_, pre, body) => `${pre}$${body}$`);
      // Also handle one-sided whitespace.
      out = out.replace(/(^|[^$])\$\s+([^$\n]+?)\$(?!\$)/g, (_, pre, body) => `${pre}$${body}$`);
      out = out.replace(/(^|[^$])\$([^$\n]+?)\s+\$(?!\$)/g, (_, pre, body) => `${pre}$${body}$`);

      // Markdown emphasis has no meaning inside KaTeX delimiters. Remove it
      // without touching emphasis in ordinary lesson prose.
      const removeMathMarkdown = (body: string) => body.replace(/\*\*([^*]+)\*\*/g, "$1");
      out = out.replace(/\$\$([\s\S]+?)\$\$/g, (_, body) => `$$${removeMathMarkdown(body)}$$`);
      out = out.replace(/(^|[^$])\$([^$\n]+?)\$(?!\$)/g, (_, pre, body) => `${pre}$${removeMathMarkdown(body)}$`);

      // Replace double-pipe norm bars `||x||` with KaTeX-friendly `\|x\|`
      // (KaTeX doesn't natively render `||...||`). Apply globally outside code.
      // Run twice: once for pairs separated by content, once for stray `||`.
      out = out.replace(/\|\|/g, "\\|");

      // Inside math spans, replace bare `|` with `\mid` so it renders as the
      // conditional-probability bar AND avoids clashing with GFM table syntax.
      // Done conservatively: only touches `|` characters that sit between $..$ /
      // $$..$$ delimiters, leaving Markdown tables untouched.
      const replacePipes = (mathBody: string) =>
        mathBody.replace(/(?<!\\)\|/g, "\\mid ");
      out = out.replace(/\$\$([\s\S]+?)\$\$/g, (_, body) => `$$${replacePipes(body)}$$`);
      out = out.replace(/(^|[^$])\$([^$\n]+?)\$(?!\$)/g, (_, pre, body) => `${pre}$${replacePipes(body)}$`);

      // Repair pass: the AI sometimes wraps a math expression in plain text
      // parentheses without `$...$`, e.g. `(\lambda \|\beta\|^2)` or
      // `((\lambda \|\beta\|^2))`. Detect a paren group containing a `\cmd`
      // and wrap its inside in inline math, keeping the parens textual.
      // CRITICAL: only touch text OUTSIDE existing $$...$$ / $...$ math spans -
      // otherwise we double-wrap inner parens like `(y - \hat{y})` that already
      // sit inside a math span and produce broken `$...($y-\hat{y}$)...$`.
      const PROTECT_RE = /(\$\$[\s\S]+?\$\$|\$[^$\n]+\$|`[^`\n]+`|```[\s\S]*?```|!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|https?:\/\/\S+)/g;
      out = out
        .split(PROTECT_RE)
        .map((seg, i) => {
          // Odd indices are the protected matches → leave untouched.
          if (i % 2 === 1) return seg;
          let s = seg;
          s = s.replace(
            /\(\s*\(([^()\n$]*\\[A-Za-z]+[^()\n$]*)\)\s*\)/g,
            (_, inner) => `($${inner.trim()}$)`,
          );
          s = s.replace(
            /(^|[^$\\])\(([^()\n$]*\\[A-Za-z]+[^()\n$]*)\)/g,
            (_, pre, inner) => `${pre}($${inner.trim()}$)`,
          );
          return s;
        })
        .join("");

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
  // Never reinterpret a GFM table row as a formula.
  if (/^\s*\|.*\|\s*$/.test(line)) return line;

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
  if (!trimmed || trimmed.includes("$") || /^([>#-]|\d+\.)\s/.test(trimmed)) return line;

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
    const trailMatch = run.match(/^([\s\S]*?)([.,;:!?]+)$/);
    let inner = run;
    let trail = "";
    if (trailMatch) {
      inner = trailMatch[1];
      trail = trailMatch[2];
    }
    const trimmed = inner.trim();
    if (!trimmed) return run;
    return `$${trimmed}$${trail}`;
  });
}

type Chunk =
  | { kind: "md"; value: string }
  | { kind: "diagram"; value: string }
  | { kind: "mermaid"; value: string };

function renderDiagram(type: string): ReactNode {
  switch (type) {
    case "linear-regression": return <LinearRegressionDiagram />;
    case "edtech-architecture": return <EdTechArchDiagram />;
    case "join-venn": return <JoinVennDiagram />;
    case "subquery": return <SubqueryDiagram />;
    default: return null;
  }
}

/**
 * Splits a body into ordered chunks. Order of detection:
 * 1) Mermaid (```mermaid)
 * 2) Legacy diagram tokens (:::diagram type="...")
 * Remaining text is markdown.
 */
function splitBody(body: string): Chunk[] {
  // Collect all matches with their positions
  type M = { start: number; end: number; chunk: Chunk };
  const matches: M[] = [];

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

/**
 * Build a short plain-text teaser for a collapsed section: first real prose
 * paragraph with markdown syntax stripped. Skips headings, lists, code, tables,
 * math blocks, diagrams and images so nothing heavy renders while collapsed.
 */
function buildPreview(body: string, limit = 170): string {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "").replace(/:::diagram[\s\S]*?:::/g, "");
  const blocks = withoutCode.split(/\n\s*\n/);
  for (const block of blocks) {
    const line = block.trim();
    if (!line) continue;
    if (/^(#|>|-|\*|\d+\.|\||\$\$|!\[)/.test(line)) continue;
    const text = line
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\$\$?[^$]*\$\$?/g, "")
      .replace(/[*_`#]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length < 24) continue;
    return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text;
  }
  return "";
}

type GroupableCalloutVariant = "tip" | "warning" | "note" | "info" | "success";

const GROUPED_CALLOUT_CONFIG: Record<GroupableCalloutVariant, { marker: string; label: string }> = {
  tip: { marker: "💡", label: "Tip" },
  warning: { marker: "⚠️", label: "Warning" },
  note: { marker: "📝", label: "Note" },
  info: { marker: "ℹ️", label: "Info" },
  success: { marker: "✅", label: "Optimization" },
};

function detectGroupableCallout(text: string): GroupableCalloutVariant | null {
  const value = text.toLowerCase();
  if (/^(\s|✅|🟢)*(optim|tối ưu|best practice|success|hiệu quả)/i.test(value) || /✅|🟢/.test(value)) return "success";
  if (/^(\s|💡)*(mẹo|tip|pro tip|gợi ý)/i.test(value) || value.includes("💡")) return "tip";
  if (/^(\s|⚠️|🚨)*(cảnh báo|warning|danger|nguy hiểm|chú ý|coi chừng|risk)/i.test(value) || /⚠️|🚨/.test(value)) return "warning";
  if (/^(\s|🔵)*(info|definition|định nghĩa)/i.test(value) || value.includes("🔵")) return "info";
  if (/^(\s|📝|ℹ️)*(lưu ý|note|ghi chú|chú thích)/i.test(value) || /📝|ℹ️/.test(value)) return "note";
  return null;
}

const CALLOUT_PREFIX_PATTERN = /^\s*(?:💡|⚠️|🚨|📝|ℹ️|🔵|✅|🟢)?\s*(?:pro\s+tip|tip|warning|note|info|optimization|best practice|success|mẹo|gợi ý|cảnh báo|chú ý|lưu ý|ghi chú|tối ưu)\s*:\s*/i;

/** Combine repeated callouts of the same kind inside one lesson section. */
function groupRepeatedCallouts(markdown: string): string {
  return markdown
    .split(/(?=^##\s+)/m)
    .map((section) => {
      const blockPattern = /^(?:>[^\n]*(?:\n|$))+/gm;
      const matches = Array.from(section.matchAll(blockPattern));
      const grouped = new Map<GroupableCalloutVariant, Array<{ index: number; content: string }>>();

      matches.forEach((match) => {
        const raw = match[0];
        const plain = raw.replace(/^>\s?/gm, "").trim();
        const variant = detectGroupableCallout(plain);
        if (!variant || match.index === undefined) return;
        const content = plain.replace(CALLOUT_PREFIX_PATTERN, "").replace(/\s*\n\s*/g, " ").trim();
        if (!content) return;
        const entries = grouped.get(variant) ?? [];
        entries.push({ index: match.index, content });
        grouped.set(variant, entries);
      });

      const replacements = new Map<number, string>();
      grouped.forEach((entries, variant) => {
        const { marker, label } = GROUPED_CALLOUT_CONFIG[variant];
        const bulletLines = entries.map((entry) => `> - ${entry.content}`).join("\n");
        replacements.set(entries[0].index, `> ${marker} ${label}:\n>\n${bulletLines}\n`);
        entries.slice(1).forEach((entry) => replacements.set(entry.index, ""));
      });

      if (replacements.size === 0) return section;
      let output = "";
      let cursor = 0;
      matches.forEach((match) => {
        if (match.index === undefined) return;
        output += section.slice(cursor, match.index);
        output += replacements.has(match.index) ? replacements.get(match.index) : match[0];
        cursor = match.index + match[0].length;
      });
      return `${output}${section.slice(cursor)}`.replace(/\n{3,}/g, "\n\n");
    })
    .join("");
}

// ── Markdown components: blockquote → Callout, code → CodeBlock, table → wrapper ──
const markdownComponents = (defaultLang: string) => ({
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="theory-table-wrap">
      <table>{children}</table>
    </div>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => {
    const text = (() => {
      try {
        const collect = (n: unknown): string => {
          if (typeof n === "string") return n;
          if (Array.isArray(n)) return n.map(collect).join("");
          const props = (n as { props?: { children?: unknown } })?.props;
          if (props?.children) return collect(props.children);
          return "";
        };
        return collect(children).toLowerCase();
      } catch { return ""; }
    })();
    let variant: "tip" | "warning" | "note" | "quote" | "info" | "success" = "quote";
    // Order matters - check the most specific markers first.
    if (/^(\s|✅|🟢)*(optim|tối ưu|best practice|success|hiệu quả)/i.test(text) || /✅|🟢/.test(text)) variant = "success";
    else if (/^(\s|💡)*(mẹo|tip|pro tip|gợi ý)/i.test(text) || text.includes("💡")) variant = "tip";
    else if (/^(\s|⚠️|🚨)*(cảnh báo|warning|danger|nguy hiểm|chú ý|coi chừng|risk)/i.test(text) || /⚠️|🚨/.test(text)) variant = "warning";
    else if (/^(\s|🔵|ℹ️)*(info|definition|định nghĩa)/i.test(text) || /🔵/.test(text)) variant = "info";
    else if (/^(\s|📝|ℹ️)*(lưu ý|note|ghi chú|chú thích)/i.test(text) || /📝|ℹ️/.test(text)) variant = "note";
    return <Callout variant={variant}>{children}</Callout>;
  },
  code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode } & Record<string, unknown>) {
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
  img({ src, alt }: { src?: string; alt?: string }) {
    if (!src) return null;
    const caption = (alt || "").trim();
    // Use <span>s (inline) instead of <figure>/<figcaption> because react-markdown
    // wraps images inside <p>, and block elements inside <p> trigger DOM nesting
    // warnings + repeated reconciliation that causes scroll jank.
    return (
      <span className="my-8 mx-auto max-w-[1100px] flex flex-col items-center">
        <span
          className="block w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-lg"
          style={{ aspectRatio: "16 / 10", contain: "layout paint" }}
        >
          <img
            src={src}
            alt={caption || "Lesson illustration"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </span>
        {caption && (
          <span className="mt-3 text-base italic text-muted-foreground text-center px-3">
            {caption}
          </span>
        )}
      </span>
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
 * Repair escaped text artifacts from AI output, OUTSIDE fenced code blocks:
 *  - literal "\n" sequences that should be real line breaks
 *  - math wrapped in backticks (`$x_t$`) which renders as code instead of a formula
 */
function repairEscapedText(md: string): string {
  if (!md) return md;
  return md
    .split(/(```[\s\S]*?```)/g)
    .map((part) => {
      if (part.startsWith("```")) return part;
      return part
        // "\n" written as text (never touch LaTeX commands like \nabla or \newline)
        .replace(/\\n(?![a-zA-Z])/g, "\n")
        // `$ ... $` inside a code span -> real math
        .replace(/`\s*(\$\$?[^`\n]+?\$\$?)\s*`/g, "$1");
    })
    .join("");
}

const KEY_TERM_PATTERNS = [
  "application programming interface", "artificial intelligence", "machine learning", "deep learning",
  "data structure", "algorithmic complexity", "time complexity", "space complexity", "object-oriented programming",
  "functional programming", "version control", "continuous integration", "continuous deployment", "unit testing",
  "integration testing", "database management system", "relational database", "primary key", "foreign key",
  "query optimization", "cloud computing", "container orchestration", "infrastructure as code", "operating system",
  "computer network", "cybersecurity", "authentication", "authorization", "encryption", "hash function",
  "large language model", "natural language processing", "neural network", "gradient descent", "feature engineering",
  "cross-validation", "hyperparameter tuning", "model evaluation", "overfitting", "underfitting", "data pipeline",
  "extract transform load", "software development lifecycle", "design pattern", "runtime", "compiler", "interpreter",
  "recursion", "iteration", "inheritance", "encapsulation", "polymorphism", "abstraction", "scalability",
  "latency", "throughput", "concurrency", "parallelism", "API", "SQL", "NoSQL", "HTTP", "JSON", "Git",
  "Python", "JavaScript", "TypeScript", "Docker", "Kubernetes",
  "list comprehension", "dictionary comprehension", "generator expression", "decorator", "context manager",
  "exception handling", "type annotation", "virtual environment", "package manager", "garbage collection",
  "binary search tree", "linked list", "hash table", "priority queue", "dynamic programming", "greedy algorithm",
  "breadth-first search", "depth-first search", "Big O notation", "normalization", "transaction isolation",
  "atomicity", "consistency", "isolation", "durability", "database index", "query plan", "common table expression",
  "window function", "stored procedure", "responsive design", "semantic HTML", "document object model",
  "event loop", "state management", "single-page application", "server-side rendering", "accessibility",
  "load balancer", "serverless computing", "virtual machine", "availability zone", "fault tolerance",
  "zero trust", "least privilege", "threat model", "attack surface", "SQL injection", "cross-site scripting",
  "multi-factor authentication", "public key infrastructure", "supervised learning", "unsupervised learning",
  "reinforcement learning", "loss function", "activation function", "attention mechanism", "transformer architecture",
  "retrieval-augmented generation", "prompt engineering", "embedding", "tokenization", "fine-tuning",
  "precision", "recall", "F1 score", "confusion matrix", "receiver operating characteristic", "data warehouse",
  "data lake", "stream processing", "batch processing", "change data capture", "data governance",
  "data lineage", "microservice", "dependency injection", "test-driven development", "technical debt",
  "minimum viable product", "product-market fit", "unit economics", "customer acquisition cost",
  "lifetime value", "monthly recurring revenue", "total addressable market", "learning management system",
  "adaptive learning", "learning analytics", "instructional design",
] as const;

/** Add restrained emphasis to prose only. Code, math, links and existing Markdown emphasis stay byte-for-byte intact. */
function emphasizeKeyTerms(markdown: string): string {
  const protectedPattern = /(```[\s\S]*?```|`[^`\n]+`|\$\$[\s\S]*?\$\$|\$[^$\n]+\$|!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|https?:\/\/\S+|\*\*[^*\n]+\*\*|^#{1,6}\s+.+$)/gm;
  const genericHeadings = /^(executive summary|lesson overview|detailed breakdown|key concepts|terminology|comparative table|best practices|anti-patterns|pro tips|pitfalls|summary|example|examples)$/i;

  // Reset term tracking at every H2 so a core concept can be highlighted once
  // in each self-contained, collapsible section rather than only once per lesson.
  return markdown.split(/(?=^##\s+)/m).map((section) => {
    const seen = new Set<string>();
    const headingTerms = Array.from(section.matchAll(/^###\s+(?:\d+\.\s*)?([^\n]{3,60})$/gm))
      .map((match) => match[1].replace(/[*_`]/g, "").trim())
      .filter((term) => !genericHeadings.test(term) && term.split(/\s+/).length <= 6);
    const escapedTerms = [...new Set([...KEY_TERM_PATTERNS, ...headingTerms])]
      .sort((a, b) => b.length - a.length)
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const termPattern = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");

    return section
      .split(protectedPattern)
      .map((part, index) => {
        if (index % 2 === 1) return part;

        let emphasized = part.replace(
          /(^|\n)(\s*(?:[-*+]\s+|\d+\.\s+)?)([A-Z][A-Za-z0-9+/# -]{1,48})(?=:\s)/g,
          (_match, lineStart: string, prefix: string, label: string) =>
            `${lineStart}${prefix}**${label.trim()}**`,
        );

        emphasized = emphasized.replace(termPattern, (match) => {
          const key = match.toLowerCase();
          if (seen.has(key)) return match;
          seen.add(key);
          return `**${match}**`;
        });
        return emphasized;
      })
      .join("");
  }).join("");
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
    () =>
      splitByH2(
        splitLongParagraphs(
          emphasizeKeyTerms(
            groupRepeatedCallouts(
              normalizeMath(repairEscapedText(stripOuterMarkdownFence(removeOptionalDeepDives(markdown)))),
            ),
          ),
        ),
      ),

    [markdown],
  );
  const components = useMemo(() => markdownComponents(defaultCodeLanguage), [defaultCodeLanguage]);

  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const merged = new Set<string>();
      const pushFrom = (key: string) => {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) return;
          const arr: string[] = JSON.parse(raw);
          if (Array.isArray(arr)) arr.forEach((s) => merged.add(s));
        } catch { /* ignore */ }
      };
      // Primary key
      pushFrom(storageKey);
      // Legacy keys from earlier versions that varied by AI/original variant.
      // Merge them in so previously-read sections stay marked after reload.
      pushFrom(`${storageKey}:orig`);
      pushFrom(`${storageKey}:ai`);
      setReadSlugs(merged);
      // Persist the merged set under the unified key so legacy reads survive
      // even after the legacy entries are cleaned up.
      if (merged.size > 0) {
        try { localStorage.setItem(storageKey, JSON.stringify(Array.from(merged))); } catch { /* ignore */ }
      }
    } catch {
      setReadSlugs(new Set());
    }
  }, [storageKey]);

  const persist = useCallback((next: Set<string>) => {
    try { localStorage.setItem(storageKey, JSON.stringify(Array.from(next))); } catch { /* ignore */ }
  }, [storageKey]);

  // ── Collapsed / expanded sections ──
  const openKey = `${storageKey}:open`;
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    let restored: string[] | null = null;
    try {
      const raw = localStorage.getItem(openKey);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) restored = arr.filter((x): x is string => typeof x === "string");
      }
    } catch { /* ignore */ }
    // First visit: every section starts collapsed, including section 1.
    setOpenSlugs(new Set(restored ?? []));
  }, [openKey]);

  const persistOpen = useCallback((next: Set<string>) => {
    try { localStorage.setItem(openKey, JSON.stringify(Array.from(next))); } catch { /* ignore */ }
  }, [openKey]);

  const toggleOpen = useCallback((slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      persistOpen(next);
      return next;
    });
  }, [persistOpen]);

  const toggleRead = useCallback((slug: string) => {
    setReadSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
        // Finishing a section collapses it to keep the page tidy.
        setOpenSlugs((open) => {
          if (!open.has(slug)) return open;
          const nextOpen = new Set(open);
          nextOpen.delete(slug);
          persistOpen(nextOpen);
          return nextOpen;
        });
      }
      persist(next);
      return next;
    });
  }, [persist, persistOpen]);

  const markableSections = sections.filter((s) => s.title !== null);
  const totalMarkable = markableSections.length;
  const readCount = markableSections.filter((s) => readSlugs.has(s.slug)).length;
  const pct = totalMarkable > 0 ? Math.round((readCount / totalMarkable) * 100) : 0;
  const allDone = totalMarkable > 0 && readCount === totalMarkable;
  const allExpanded = totalMarkable > 0 && markableSections.every((s) => openSlugs.has(s.slug));

  const toggleAll = useCallback(() => {
    const next = allExpanded ? new Set<string>() : new Set(markableSections.map((s) => s.slug));
    setOpenSlugs(next);
    persistOpen(next);
  }, [allExpanded, markableSections, persistOpen]);

  const renderBody = (body: string) => {
    const chunks = splitBody(body);
    return chunks.map((c, i) => {
      if (c.kind === "diagram") return <div key={`d-${i}`}>{renderDiagram(c.value)}</div>;
      if (c.kind === "mermaid") return <MermaidDiagram key={`mmd-${i}`} code={c.value} />;
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
        <div className="not-prose mb-5 flex flex-wrap items-center gap-3 px-3.5 py-2.5 rounded-lg bg-primary/5 border border-primary/15">
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
          <button
            type="button"
            onClick={toggleAll}
            aria-expanded={allExpanded}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
          >
            {allExpanded ? (
              <><ChevronsDownUp className="h-3.5 w-3.5" />{t("Thu gọn tất cả", "Collapse all")}</>
            ) : (
              <><ChevronsUpDown className="h-3.5 w-3.5" />{t("Mở tất cả", "Expand all")}</>
            )}
          </button>
        </div>
      )}

      {sections.map((section, idx) => {
        const isRead = section.title !== null && readSlugs.has(section.slug);
        const sectionTitle = section.title ?? "Lesson Overview";
        const Icon = pickIconForTitle(sectionTitle);
        const isOpen = openSlugs.has(section.slug);
        const preview = isOpen ? "" : buildPreview(section.body);
        const bodyId = `${section.slug}-body`;

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
              <button
                type="button"
                onClick={() => toggleOpen(section.slug)}
                aria-expanded={isOpen}
                aria-controls={bodyId}
                className="flex min-h-11 flex-1 items-start gap-3 min-w-0 rounded-lg px-1 py-1 text-left transition-colors hover:bg-primary/5"
              >
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
                <span className="min-w-0 flex-1">
                  <h2
                    className={`text-[1.15rem] font-bold leading-tight tracking-tight flex items-center gap-2 ${
                      isRead ? "text-foreground/70 line-through decoration-primary/40 decoration-1" : "text-primary"
                    }`}
                  >
                    {section.stepNumber && <Icon className="w-4 h-4 opacity-70 shrink-0" aria-hidden="true" />}
                    <span>{sectionTitle}</span>
                  </h2>
                  {!isOpen && preview && (
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {preview}
                    </span>
                  )}
                  {!isOpen && (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("Đọc tiếp", "Read more")}
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleRead(section.slug); }}
                aria-pressed={isRead}
                className={`mt-1.5 shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all active:scale-[0.97] ${
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

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={bodyId}
                  key="body"
                  initial={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? undefined : { height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  {renderBody(section.body)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

    </div>
  );
};

export default TheorySections;
