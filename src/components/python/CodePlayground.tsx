/**
 * @file CodePlayground.tsx
 * @description Split editor + Pyodide output panel with Run / Reset / Copy / Explain AI.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { usePyodide } from "./PyodideRunner";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Props {
  initialCode: string;
  needsScientific?: boolean;
  lessonContext?: string;
  storageKey?: string;
}

const CodePlayground = ({ initialCode, needsScientific, lessonContext, storageKey }: Props) => {
  const [code, setCode] = useState<string>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
    }
    return initialCode;
  });
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [explain, setExplain] = useState<string>("");
  const [explainLoading, setExplainLoading] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const { ready, loading, status, runCode } = usePyodide(needsScientific);

  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, code);
  }, [code, storageKey]);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutput(loading || !ready ? "⏳ Waiting for Python runtime to finish loading…" : "⏳ Running…");
    const res = await runCode(code);
    const parts: string[] = [];
    if (res.stdout) parts.push(res.stdout);
    if (res.stderr) parts.push(`\n--- stderr ---\n${res.stderr}`);
    setOutput(parts.join("") || "(no output)");
    setRunning(false);
  }, [code, runCode, loading, ready]);

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setExplain("");
    if (storageKey) localStorage.removeItem(storageKey);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleExplain = async () => {
    setExplainLoading(true);
    setExplain("");
    try {
      const { data, error } = await supabase.functions.invoke("explain-code", {
        body: { code, language: "python", lessonContext },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      setExplain((data as { explanation: string }).explanation);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to explain";
      toast({ title: "AI Explain failed", description: msg, variant: "destructive" });
    } finally {
      setExplainLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4;
      });
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void handleRun();
    }
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-[#282a36] text-[#f8f8f2] shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1e1f29] border-b border-[#44475a]">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded-full bg-[#ff5555]" />
          <span className="w-3 h-3 rounded-full bg-[#f1fa8c]" />
          <span className="w-3 h-3 rounded-full bg-[#50fa7b]" />
          <span className="ml-2 font-mono text-[#bd93f9]">🐍 playground.py</span>
        </div>
        <div className="text-[10px] text-[#6272a4] font-mono">
          {loading ? `⏳ ${status}` : ready ? "● ready" : "○ idle"}
        </div>
      </div>

      {/* Editor */}
      <textarea
        ref={editorRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="w-full min-h-[280px] max-h-[480px] p-4 bg-[#282a36] text-[#f8f8f2] font-mono text-sm leading-relaxed resize-y outline-none caret-[#ff79c6]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-[#1e1f29] border-t border-[#44475a]">
        <Button
          size="sm"
          onClick={handleRun}
          disabled={running || loading}
          className="bg-[#50fa7b] text-[#282a36] hover:bg-[#69ff94] font-bold"
        >
          {running ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
          Run
        </Button>
        <Button size="sm" variant="ghost" onClick={handleReset} className="text-[#f8f8f2] hover:bg-[#44475a]">
          <RotateCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
        <Button size="sm" variant="ghost" onClick={handleCopy} className="text-[#f8f8f2] hover:bg-[#44475a]">
          {copied ? <Check className="w-4 h-4 mr-1 text-[#50fa7b]" /> : <Copy className="w-4 h-4 mr-1" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleExplain}
          disabled={explainLoading}
          className="text-[#bd93f9] hover:bg-[#44475a] ml-auto"
        >
          {explainLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
          Explain with AI
        </Button>
      </div>

      {/* Output */}
      <div className="px-4 py-3 bg-[#21222c] border-t border-[#44475a] min-h-[100px] max-h-[260px] overflow-auto">
        <div className="text-[10px] text-[#6272a4] font-mono mb-1">stdout</div>
        <pre className="text-xs text-[#f8f8f2] font-mono whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {output || "Run the code to see output…"}
        </pre>
      </div>

      {/* AI Explanation */}
      {explain && (
        <div className="px-4 py-3 bg-[#1e1f29] border-t border-[#44475a]">
          <div className="text-[10px] text-[#bd93f9] font-mono mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI Explanation
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-[#f8f8f2]">
            <ReactMarkdown>{explain}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
