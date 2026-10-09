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
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface Props {
  initialCode: string;
  needsScientific?: boolean;
  lessonContext?: string;
  storageKey?: string;
}

const CodePlayground = ({ initialCode, needsScientific, lessonContext, storageKey }: Props) => {
  const [code, setCode] = useState<string>(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) return saved;
      } catch { /* Storage may be unavailable. */ }
    }
    return initialCode;
  });
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [input, setInput] = useState("");
  const [editorVersion, setEditorVersion] = useState(0);
  const runLock = useRef(false);
  const [copied, setCopied] = useState(false);
  const [explain, setExplain] = useState<string>("");
  const [explainLoading, setExplainLoading] = useState(false);

  const { ready, loading, status, runCode } = usePyodide(needsScientific);

  useEffect(() => {
    try { if (storageKey) localStorage.setItem(storageKey, code); } catch { /* Keep editing without storage. */ }
  }, [code, storageKey]);

  const handleRun = useCallback(async () => {
    if (runLock.current) return;
    runLock.current = true;
    setRunning(true);
    setOutput(loading || !ready ? "⏳ Waiting for Python runtime to finish loading…" : "⏳ Running…");
    try {
      const res = await runCode(code, input);
      const parts: string[] = [];
      if (res.stdout) parts.push(res.stdout);
      if (res.stderr) parts.push(`\n--- stderr ---\n${res.stderr}`);
      setOutput(parts.join("") || "(no output)");
    } finally {
      setRunning(false);
      runLock.current = false;
    }
  }, [code, input, runCode, loading, ready]);

  const handleReset = () => {
    setCode(initialCode);
    setEditorVersion(version => version + 1);
    setOutput("");
    setExplain("");
    setInput("");
    try { if (storageKey) localStorage.removeItem(storageKey); } catch { /* Optional storage. */ }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { toast({ title: "Could not copy code", variant: "destructive" }); }
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

  return (
    <div className="python-playground rounded-lg border border-border overflow-hidden bg-card text-card-foreground shadow-lg">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 bg-muted border-b border-border">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-primary">playground.py</span>
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

      {/* Editor */}
      <CodeMirror
        key={editorVersion}
        value={code}
        onChange={setCode}
        theme={vscodeDark}
        height="340px"
        extensions={[
          python(),
          EditorView.contentAttributes.of({ "aria-label": "Python code", spellcheck: "false" }),
          Prec.highest(keymap.of([{ key: "Mod-Enter", run: () => { void handleRun(); return true; } }])),
        ]}
        indentWithTab
        basicSetup={{ tabSize: 4, lineNumbers: true, foldGutter: true }}
        className="python-playground-editor min-w-0 text-base"
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
          title="Run Python (Ctrl+Enter / Cmd+Enter)"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold disabled:opacity-60"
        >
          {running || (loading && !ready) ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
          {loading && !ready ? "Loading…" : "Run"}
        </Button>
        <Button size="sm" variant="ghost" onClick={handleReset} disabled={running} className="text-card-foreground hover:bg-accent">
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
        <div role="status" aria-label="Python output" className="text-sm text-card-foreground font-mono whitespace-pre-wrap break-words">
          {output || ""}
        </div>
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
