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
  const isDiagram =
    ["text", "ascii", "diagram", "ascii-art", "plain", "txt"].includes(lang) ||
    /[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║]/.test(code) ||
    (/^\s*[|+\-]/m.test(code) && /[|+\-]\s*$/m.test(code) && /[▲▼◄►▶◀↑↓→←]/.test(code));
  const preserveLayout = isDiagram;

  return (
    <div className={`my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0f172a] shadow-md ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wide text-emerald-400/90">
            {normalizedLang}
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
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={preserveLayout ? "text" : normalizedLang}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "#0f172a",
            fontSize: "0.875rem",
            lineHeight: 1.7,
            fontFamily:
              "'JetBrains Mono', 'Fira Code', 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontFeatureSettings: preserveLayout ? "normal" : '"liga" 1, "calt" 1',
            whiteSpace: preserveLayout ? "pre" : "pre-wrap",
            wordBreak: preserveLayout ? "normal" : "break-word",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontFeatureSettings: preserveLayout ? "normal" : '"liga" 1, "calt" 1',
              whiteSpace: preserveLayout ? "pre" : "pre-wrap",
              wordBreak: preserveLayout ? "normal" : "break-word",
            },
          }}
          showLineNumbers={false}
          wrapLongLines={!preserveLayout}
        >
          {code.replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default memo(CodeBlock);
