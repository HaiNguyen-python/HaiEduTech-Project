import { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Play, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    loadPyodide?: (config?: any) => Promise<any>;
    _pyodide?: any;
  }
}

interface Props {
  initialCode?: string;
  className?: string;
}

const PythonIDEPanel = ({ initialCode = '# Write your Python code here\nprint("Hello, World!")', className = "" }: Props) => {
  const { t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingPyodide, setLoadingPyodide] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [aiHelp, setAiHelp] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput("");
    setHasError(false);
    setAiHelp("");
  }, [initialCode]);

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
        setOutput("Failed to load Python runtime.");
      }
      setLoadingPyodide(false);
    };
    script.onerror = () => {
      setLoadingPyodide(false);
      setOutput("Failed to load Python runtime.");
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
      }
    } catch (err: any) {
      const lines = (err.message || String(err)).split("\n");
      const pyErr = lines.filter((l: string) => !l.includes("at ") && !l.includes("wasm")).join("\n");
      setOutput(`❌ Error:\n${pyErr}`);
      setHasError(true);
    }
    setRunning(false);
  }, [code]);

  const askAiDebug = async () => {
    setAiLoading(true);
    setAiHelp("");
    try {
      const { data, error } = await supabase.functions.invoke("debug-python", {
        body: { code, error: output, challenge: "Programming Lesson" },
      });
      if (error) throw error;
      setAiHelp(data?.explanation || t("Không thể phân tích lỗi.", "Cannot analyze error."));
    } catch {
      setAiHelp(t("Không thể kết nối đến AI.", "Cannot connect to AI."));
    }
    setAiLoading(false);
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 ${className}`}>
      {/* Toolbar */}
      <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-xs font-mono text-green-400 ml-1">Python IDE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setCode(initialCode); setOutput(""); setHasError(false); setAiHelp(""); }}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={runCode}
            disabled={running || !pyodideReady}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-600 text-white text-xs font-medium hover:bg-green-500 transition-colors disabled:opacity-50 active:scale-[0.97]"
          >
            {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {running ? t("Đang chạy...", "Running...") : t("▶ Chạy", "▶ Run")}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0 overflow-auto">
        <CodeMirror
          value={code}
          onChange={setCode}
          theme={vscodeDark}
          extensions={[python()]}
          height="100%"
          basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true }}
          className="text-sm h-full"
        />
      </div>

      {/* Console */}
      <div className="shrink-0 border-t border-slate-800">
        <div className="px-3 py-1.5 bg-slate-900 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">
            {loadingPyodide ? "⏳ Loading Python..." : "💻 Console"}
          </span>
          {hasError && (
            <button
              onClick={askAiDebug}
              disabled={aiLoading}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-50"
            >
              {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              {t("Hỏi AI", "Ask AI")}
            </button>
          )}
        </div>
        <pre className="px-3 py-2 text-xs font-mono min-h-[80px] max-h-[160px] overflow-auto whitespace-pre-wrap text-green-400">
          {loadingPyodide
            ? t("Đang tải Python runtime...", "Loading Python runtime...")
            : output || t("Bấm '▶ Chạy' để thực thi code...", "Press '▶ Run' to execute code...")}
        </pre>
        {aiHelp && (
          <div className="px-3 py-2 border-t border-slate-800 text-xs text-slate-300 whitespace-pre-wrap">
            <span className="text-primary font-medium">🤖 AI:</span> {aiHelp}
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonIDEPanel;
