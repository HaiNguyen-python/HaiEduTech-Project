import { useState, memo } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  showHeader?: boolean;
  className?: string;
}

/**
 * Professional code block with syntax highlighting, copy button,
 * dark theme background and ligature-friendly monospace font.
 */
const CodeBlock = ({ code, language = "text", showHeader = true, className = "" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  };

  // Normalize language aliases for syntax highlighter
  const lang = (language || "text").toLowerCase();
  const normalizedLang =
    lang === "py" ? "python" :
    lang === "ts" ? "typescript" :
    lang === "js" ? "javascript" :
    lang === "sh" ? "bash" :
    lang;

  /**
   * Detect ASCII-art / diagram blocks. These look like code but rely on
   * exact column alignment (box-drawing chars, arrows, pipes). Wrapping
   * them or applying `whitespace-pre-wrap` breaks the layout — show them
   * as monospace with horizontal scroll instead.
   */
  const hasBoxDrawing = /[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║]/.test(code);
  const hasArrows = /[▲▼◄►▶◀↑↓→←]/.test(code);
  const hasAsciiArrows = /(?:-{1,2}>|<{1,2}-|=>|<=)/.test(code);
  const hasDiagramConnectors = /(?:\+[-=]{3,}\+|[-=]{3,}|\|\s{2,}|\s{2,}\|)/.test(code);
  // Count lines that look like ASCII box rows: start AND end with pipe/plus
  const asciiBoxLines = (code.match(/^\s*[|+][^\n]*[|+]\s*$/gm) || []).length;
  const genericLang = ["text", "ascii", "diagram", "ascii-art", "plain", "txt", ""].includes(lang);
  const isDiagram =
    ["ascii", "diagram", "ascii-art"].includes(lang) ||
    (genericLang && (
      hasBoxDrawing ||
      hasArrows ||
      hasAsciiArrows ||
      hasDiagramConnectors ||
      asciiBoxLines >= 3
    ));
  const preserveLayout = isDiagram;
  const codeText = code.replace(/\n$/, "");
  const stripOuterDiagramFrame = (value: string) => {
    const lines = value.split("\n");
    if (lines.length < 3) return value;

    const isHorizontalFrame = (line: string) =>
      /^\s*[|+┌└╔╚]\s*[-_=─═]{4,}\s*[|+┐┘╗╝]\s*$/.test(line) ||
      /^\s*[-_=─═]{6,}\s*$/.test(line);

    let framedLines = lines;
    const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);
    const lastContentIndex = lines.length - 1 - [...lines].reverse().findIndex((line) => line.trim().length > 0);

    if (
      firstContentIndex >= 0 &&
      lastContentIndex > firstContentIndex &&
      isHorizontalFrame(lines[firstContentIndex]) &&
      isHorizontalFrame(lines[lastContentIndex])
    ) {
      framedLines = [
        ...lines.slice(0, firstContentIndex),
        ...lines.slice(firstContentIndex + 1, lastContentIndex),
        ...lines.slice(lastContentIndex + 1),
      ];
    }

    return framedLines
      .map((line) => {
        const withoutLeft = line.replace(/^\s*[|│║]\s?/, "");
        return withoutLeft.replace(/\s?[|│║]\s*$/, "");
      })
      .join("\n")
      .trimEnd();
  };
  const displayText = preserveLayout ? stripOuterDiagramFrame(codeText) : codeText;
  const blockShellClass = preserveLayout
    ? `my-4 rounded-xl overflow-hidden bg-[#0f172a] shadow-md ${className}`
    : `my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0f172a] shadow-md ${className}`;
  const scrollAreaClass = preserveLayout
    ? "overflow-x-auto px-6 sm:px-10 lg:px-14"
    : "overflow-x-auto";

  return (
    <div className={blockShellClass}>
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wide text-emerald-400/90">
            {preserveLayout ? "diagram" : normalizedLang}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors active:scale-[0.97]"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className={scrollAreaClass}>
        {preserveLayout ? (
          <pre
            className="mx-auto my-0 block w-max max-w-none py-5 text-sm leading-7 text-slate-100"
            style={{
              background: "#0f172a",
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontFeatureSettings: "normal",
              fontVariantLigatures: "none",
              tabSize: 2,
              whiteSpace: "pre",
              wordBreak: "normal",
              overflowWrap: "normal",
            }}
          >
            <code className="block whitespace-pre">{displayText}</code>
          </pre>
        ) : (
          <SyntaxHighlighter
            language={normalizedLang}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              background: "#0f172a",
              fontSize: "0.875rem",
              lineHeight: 1.7,
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontFeatureSettings: '"liga" 1, "calt" 1',
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontFeatureSettings: '"liga" 1, "calt" 1',
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              },
            }}
            showLineNumbers={false}
            wrapLongLines
          >
            {displayText}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default memo(CodeBlock);
