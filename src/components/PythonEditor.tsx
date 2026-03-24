import { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Play, Loader2, Sparkles, RotateCcw, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PythonChallenge } from "@/data/pythonChallenges";
import confetti from "canvas-confetti";

interface Props {
  challenge: PythonChallenge;
  onPass?: () => void;
}

declare global {
  interface Window {
    loadPyodide?: (config?: any) => Promise<any>;
    _pyodide?: any;
  }
}

const STORAGE_KEY = (id: string) => `haiedu_challenge_${id}`;

const PythonEditor = ({ challenge, onPass }: Props) => {
  const { t } = useLanguage();
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingPyodide, setLoadingPyodide] = useState(true);
  const [passed, setPassed] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [aiHelp, setAiHelp] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const pyodideRef = useRef<any>(null);

  // Load saved code
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(challenge.id));
    if (saved) setCode(saved);
    else setCode(challenge.starterCode);
    setPassed(false);
    setOutput("");
    setAiHelp("");
    setHasError(false);
    setShowHints(false);
  }, [challenge.id]);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => localStorage.setItem(STORAGE_KEY(challenge.id), code), 500);
    return () => clearTimeout(timer);
  }, [code, challenge.id]);

  // Load Pyodide
  useEffect(() => {
    if (window._pyodide) {
      pyodideRef.current = window._pyodide;
      setPyodideReady(true);
      setLoadingPyodide(false);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
    script.onload = async () => {
      try {
        const pyodide = await window.loadPyodide!({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
        });
        window._pyodide = pyodide;
        pyodideRef.current = pyodide;
        setPyodideReady(true);
      } catch (e) {
        console.error("Pyodide load error:", e);
        setOutput("Failed to load Python runtime. Please refresh.");
      }
      setLoadingPyodide(false);
    };
    script.onerror = () => {
      setLoadingPyodide(false);
      setOutput("Failed to load Python runtime. Check your connection.");
    };
    document.head.appendChild(script);
  }, []);

  const runCode = useCallback(async () => {
    if (!pyodideRef.current) return;
    setRunning(true);
    setOutput("");
    setHasError(false);
    setAiHelp("");

    try {
      pyodideRef.current.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
      pyodideRef.current.runPython(code);
      const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
      const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");

      const result = (stdout || "").trimEnd();
      const errResult = (stderr || "").trimEnd();

      if (errResult) {
        setOutput(result ? `${result}\n\n⚠️ ${errResult}` : `❌ Error:\n${errResult}`);
        setHasError(true);
      } else {
        setOutput(result || "(No output)");

        // Check test cases
        const allPassed = challenge.testCases.every(tc => {
          const expected = tc.expected.trimEnd();
          return result === expected;
        });

        if (allPassed) {
          setPassed(true);
          onPass?.();
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
        }
      }
    } catch (err: any) {
      const errMsg = err.message || String(err);
      // Extract just the Python error from the Pyodide traceback
      const lines = errMsg.split("\n");
      const pyErr = lines.filter((l: string) => !l.includes("at ") && !l.includes("wasm")).join("\n");
      setOutput(`❌ Error:\n${pyErr}`);
      setHasError(true);
    }
    setRunning(false);
  }, [code, challenge, onPass]);

  const askAiDebug = async () => {
    setAiLoading(true);
    setAiHelp("");
    try {
      const { data, error } = await supabase.functions.invoke("debug-python", {
        body: { code, error: output, challenge: challenge.title },
      });
      if (error) throw error;
      setAiHelp(data?.explanation || "Không thể phân tích lỗi.");
    } catch {
      setAiHelp("Không thể kết nối đến AI. Vui lòng thử lại.");
    }
    setAiLoading(false);
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    localStorage.removeItem(STORAGE_KEY(challenge.id));
    setOutput("");
    setPassed(false);
    setAiHelp("");
    setHasError(false);
  };

  return (
    <div className="space-y-4">
      {/* Editor */}
      <div className="rounded-xl overflow-hidden border border-border shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--card))] border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-destructive/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">challenge_{challenge.id}.py</span>
          </div>
          <button onClick={resetCode} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
        <CodeMirror
          value={code}
          onChange={setCode}
          theme={vscodeDark}
          extensions={[python()]}
          height="280px"
          basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true }}
          className="text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={runCode}
          disabled={running || !pyodideReady}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 active:scale-[0.97] transition-all disabled:opacity-50"
        >
          {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
           {running ? "Running..." : "▶ Run Code"}
        </button>

        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 active:scale-[0.97] transition-all"
        >
          {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
           Hints
        </button>

        {hasError && (
          <button
            onClick={askAiDebug}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-50"
          >
            {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Ask AI why error
          </button>
        )}
      </div>

      {/* Hints */}
      {showHints && (
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-4 space-y-1">
          <p className="text-sm font-semibold text-yellow-600">💡 Hints:</p>
          {challenge.hints.map((h, i) => (
            <p key={i} className="text-sm text-secondary-foreground">• {h}</p>
          ))}
        </div>
      )}

      {/* Console Output */}
      <div className="rounded-xl overflow-hidden border border-border">
        <div className="px-4 py-2 bg-[hsl(var(--card))] border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">
            {loadingPyodide ? "⏳ Loading Python..." : "💻 Console"}
          </span>
        </div>
        <pre className="p-4 bg-[#1e1e1e] text-green-400 text-sm font-mono min-h-[100px] max-h-[240px] overflow-auto whitespace-pre-wrap">
           {loadingPyodide
239:             ? "Loading Python runtime (first time may take 5-10s)..."
240:             : output || "Press 'Run Code' to see results..."}
            : output || t("Bấm 'Chạy Code' để xem kết quả...", "Press 'Run Code' to see results...")}
        </pre>
      </div>

      {/* Pass Banner */}
      {passed && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/40 p-5 text-center space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <p className="text-lg font-bold text-green-600">
             🎉 Congratulations! You passed Challenge {challenge.number}!
           </p>
           <p className="text-sm text-muted-foreground">Keep going to the next challenge!</p>
          
        </div>
      )}

      {/* AI Debug Help */}
      {aiHelp && (
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 space-y-2">
          <p className="text-sm font-semibold text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI Debug Helper
          </p>
          <p className="text-sm text-secondary-foreground whitespace-pre-wrap">{aiHelp}</p>
        </div>
      )}
    </div>
  );
};

export default PythonEditor;
