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
import AICodeReviewer from "./AICodeReviewer";

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
  const [input, setInput] = useState("");
  const runLock = useRef(false);
  const [copied, setCopied] = useState(false);
  const [explain, setExplain] = useState<string>("");
  const [explainLoading, setExplainLoading] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const { ready, loading, status, runCode } = usePyodide(needsScientific);

  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, code);
  }, [code, storageKey]);

  const handleRun = useCallback(async () => {
    if (runLock.current) return;
    runLock.current = true;
    setRunning(true);
    setOutput(loading || !ready ? "⏳ Waiting for Python runtime to finish loading…" : "⏳ Running…");
    const res = await runCode(code, input);
    const parts: string[] = [];
    if (res.stdout) parts.push(res.stdout);
    if (res.stderr) parts.push(`\n--- stderr ---\n${res.stderr}`);
    setOutput(parts.join("") || "(no output)");
    setRunning(false);
    runLock.current = false;
  }, [code, input, runCode, loading, ready]);

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setExplain("");
    setInput("");
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
    <div className="rounded-xl border border-border overflow-hidden bg-card text-card-foreground shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded-full bg-destructive" />
          <span className="w-3 h-3 rounded-full bg-accent" />
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="ml-2 font-mono text-primary">🐍 playground.py</span>
        </div>
        <div className="text-[10px] font-mono flex items-center gap-1">
          {loading ? (
            <span className="text-muted-foreground flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> {status}
            </span>
          ) : ready ? (
            <span className="text-primary">● ready</span>
          ) : (
            <span className="text-muted-foreground">○ idle</span>
          )}
        </div>
      </div>

      {/* Loading banner - only shown on first load so user knows it's working */}
      {loading && !ready && (
        <div className="px-3 py-2 bg-primary/10 border-b border-border text-xs text-primary flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
          <span className="flex-1">{status} - first run downloads ~10MB, then it's instant.</span>
        </div>
      )}

      {/* Editor */}
      <textarea
        aria-label="Python code"
        ref={editorRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        wrap="off"
        className="w-full min-h-[280px] max-h-[480px] p-4 bg-card text-card-foreground font-mono text-sm leading-relaxed resize-y outline-none caret-primary"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      />

      {/\binput\s*\(/.test(code) && <div className="border-t border-border bg-muted p-3 text-foreground">
        <label htmlFor={`${storageKey ?? "python"}-input`} className="mb-2 block text-sm font-medium">Input values</label>
        <textarea id={`${storageKey ?? "python"}-input`} value={input} onChange={event => setInput(event.target.value)}
          aria-label="Input values" placeholder="One value per line" rows={3}
          className="w-full rounded-md border border-input bg-background p-3 font-mono text-base text-foreground" />
      </div>}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-muted border-t border-border">
        <Button
          size="sm"
          onClick={handleRun}
          disabled={running}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold disabled:opacity-60"
        >
          {running || (loading && !ready) ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
          {loading && !ready ? "Loading…" : "Run"}
        </Button>
        <Button size="sm" variant="ghost" onClick={handleReset} className="text-card-foreground hover:bg-accent">
          <RotateCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
        <Button size="sm" variant="ghost" onClick={handleCopy} className="text-card-foreground hover:bg-accent">
          {copied ? <Check className="w-4 h-4 mr-1 text-primary" /> : <Copy className="w-4 h-4 mr-1" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleExplain}
          disabled={explainLoading}
          className="text-primary hover:bg-accent ml-auto"
        >
          {explainLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
          Explain with AI
        </Button>
      </div>

      {/* Output */}
      <div className="px-4 py-3 bg-muted border-t border-border min-h-[100px] max-h-[260px] overflow-auto">
        <div className="text-[10px] text-muted-foreground font-mono mb-1">stdout</div>
        <pre className="text-xs text-card-foreground font-mono whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {output || "Run the code to see output…"}
        </pre>
      </div>

      {/* AI Explanation */}
      {explain && (
        <div className="px-4 py-3 bg-muted border-t border-border">
          <div className="text-[10px] text-primary font-mono mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI Explanation
          </div>
          <div className="prose dark:prose-invert prose-sm max-w-none text-card-foreground">
            <ReactMarkdown>{explain}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* AI Code Reviewer */}
      <div className="p-3 bg-muted border-t border-border">
        <AICodeReviewer code={code} lessonContext={lessonContext} onApplyRefactor={(newCode) => setCode(newCode)} />
      </div>
    </div>
  );
};

export default CodePlayground;
