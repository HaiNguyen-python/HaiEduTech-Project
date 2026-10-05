import { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Play, Loader2, Sparkles, RotateCcw, Eye, EyeOff, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PythonChallenge } from "@/data/pythonChallenges";
import confetti from "canvas-confetti";
import { ensurePyodideRuntime } from "@/components/python/PyodideRunner";
import { PY_HARNESS, passesTest, stdinLines, type HarnessResult } from "@/lib/pythonChallengeHarness";
import DOMPurify from "dompurify";


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

/** Drop the runner harness (result = solve() / if result is not None: print) from the shown answer. */
const stripHarness = (s: string) => {
  const lines = s.replace(/\r\n/g, "\n").split("\n");
  const cut = lines.indexOf("result = solve()");
  return (cut >= 0 ? lines.slice(0, cut) : lines).join("\n").replace(/\n+$/, "");
};

/** Multi-burst confetti + XP toast so a correct answer feels rewarding. */
const celebrate = () => {
  const shoot = (x: number, delay: number) =>
    setTimeout(
      () =>
        confetti({
          particleCount: 90,
          spread: 75,
          startVelocity: 45,
          origin: { x, y: 0.7 },
          colors: ["#3B82F6", "#10B981", "#facc15", "#f97316"],
          disableForReducedMotion: true,
        }),
      delay,
    );
  shoot(0.5, 0);
  shoot(0.2, 180);
  shoot(0.8, 320);
};

const PythonEditor = ({ challenge, onPass }: Props) => {
  const { t } = useLanguage();
  // Learners type everything from scratch - the editor starts completely blank.
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingPyodide, setLoadingPyodide] = useState(true);
  const [passed, setPassed] = useState(false);
  const [showHints, setShowHints] = useState(false);
  // "hidden" -> "confirm" (double-check) -> "shown"; never auto-revealed.
  const [answerState, setAnswerState] = useState<"hidden" | "confirm" | "shown">("hidden");
  const [aiHelp, setAiHelp] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [stdinText, setStdinText] = useState("");
  const usesInput = /\binput\s*\(/.test(code);
  const sampleInput = challenge.testCases.find((tc) => tc.input.trim())?.input ?? "";
  const [svg, setSvg] = useState("");
  const [mismatch, setMismatch] = useState<{ input: string; expected: string; got: string } | null>(null);
  const pyodideRef = useRef<any>(null);

  // Load saved code (the learner's own work only - never a template)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(challenge.id));
    // Drop any previously auto-saved starter template so the editor stays blank.
    const norm = (s: string) =>
      s.replace(/\r/g, "").split("\n").map((l) => l.trimEnd()).filter((l) => l.trim() !== "").join("\n").trim();
    // Comment-only / placeholder content counts as a template, not real student work.
    const isCommentOnly = (s: string) =>
      norm(s).length > 0 && norm(s).split("\n").every((l) => l.trimStart().startsWith("#"));
    const isTemplateOnly =
      !!saved &&
      (norm(saved) === norm(challenge.starterCode) ||
        /#\s*Your code here/i.test(saved) ||
        /#\s*Viết code/i.test(saved) ||
        isCommentOnly(saved) ||
        norm(saved) === "");
    if (saved && !isTemplateOnly) setCode(saved);
    else {
      if (isTemplateOnly) localStorage.removeItem(STORAGE_KEY(challenge.id));
      setCode("");
    }
    setPassed(false);
    setOutput("");
    setAiHelp("");
    setHasError(false);
    setShowHints(false);
    setMismatch(null);
    setAnswerState("hidden");
    setStdinText("");
    setSvg("");
  }, [challenge.id]);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => localStorage.setItem(STORAGE_KEY(challenge.id), code), 500);
    return () => clearTimeout(timer);
  }, [code, challenge.id]);

  // Load Pyodide through the shared singleton runner (single version, no lockfile clash)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const py = await ensurePyodideRuntime();
        if (cancelled) return;
        pyodideRef.current = py;
        setPyodideReady(true);
      } catch (e) {
        if (!cancelled) setOutput("Failed to load Python runtime. Please refresh.");
      } finally {
        if (!cancelled) setLoadingPyodide(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const runCode = useCallback(async () => {
    if (!code.trim()) {
      setOutput(t("Hãy viết code trước khi chạy nhé!", "Write some code first!"));
      return;
    }
    setRunning(true);
    setOutput("");
    setSvg("");
    setHasError(false);
    setAiHelp("");
    setMismatch(null);

    try {
      const py = pyodideRef.current ?? (await ensurePyodideRuntime());
      pyodideRef.current = py;
      if (!py.globals.get("_hai_run")) py.runPython(PY_HARNESS);
      const setup = challenge.setupCode ?? "";
      if (/\bsqlite3\b/.test(code + setup)) await py.loadPackage("sqlite3");
      const harness = py.globals.get("_hai_run");
      const exec = (stdin: string[], echo: boolean, seed: number): HarnessResult =>
        JSON.parse(harness(code, JSON.stringify(stdin), echo, setup, seed));

      // 1) Interactive run: the learner's own values (or the sample input when the box is empty).
      let typed = stdinText;
      let usedSample = false;
      if (usesInput && !typed.trim() && sampleInput) {
        typed = sampleInput;
        usedSample = true;
        setStdinText(sampleInput);
      }
      const shown = exec(stdinLines(typed), true, -1);
      setSvg(shown.svg);
      const note = usedSample ? t("(Đang dùng dữ liệu mẫu)\n", "(Using the sample input)\n") : "";
      if (shown.err) {
        setOutput(`${note}${shown.out}${shown.out ? "\n" : ""}❌ ${shown.err}`);
        setHasError(true);
        setRunning(false);
        return;
      }
      setOutput(note + (shown.out.trimEnd() || (shown.svg ? t("(Đã vẽ hình bên dưới)", "(Drawing shown below)") : "(No output)")));

      // 2) Grading: every sample test, prompts hidden, fixed random seed.
      const failed = challenge.testCases.find((tc) => !passesTest(exec(stdinLines(tc.input), false, challenge.seed ?? 7), tc, challenge.turtle));
      if (!failed) {
        if (!passed) celebrate();
        setPassed(true);
        onPass?.();
      } else {
        const got = exec(stdinLines(failed.input), false, challenge.seed ?? 7);
        setMismatch({
          input: failed.input,
          expected: failed.expected,
          got: got.err ? `❌ ${got.err}` : challenge.turtle ? t("Hình vẽ chưa đủ yêu cầu.", "The drawing does not meet the task yet.") : got.out.trimEnd() || "(No output)",
        });
      }
    } catch (err: any) {
      setOutput(`❌ Error:\n${err?.message || String(err)}`);
      setHasError(true);
    }
    setRunning(false);
  }, [code, challenge, onPass, passed, t, stdinText, usesInput, sampleInput]);


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

  /** Clear the editor back to a blank file. */
  const resetCode = () => {
    setCode("");
    localStorage.removeItem(STORAGE_KEY(challenge.id));
    setOutput("");
    setPassed(false);
    setAiHelp("");
    setHasError(false);
    setMismatch(null);
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCode(challenge.starterCode)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("Chèn khung mẫu", "Insert template")}
            </button>
            <button onClick={resetCode} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <RotateCcw className="w-3 h-3" /> {t("Xóa hết", "Clear")}
            </button>
          </div>
        </div>
        <CodeMirror
          value={code}
          onChange={setCode}
          theme={vscodeDark}
          extensions={[python()]}
          height="280px"
          placeholder={t("# Viết code Python của bạn ở đây...", "# Write your Python code here...")}
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
           {running ? "Running..." : "Run Code"}
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

        {/* Show Answer - two-step reveal so learners don't spoil it by accident */}
        {answerState !== "shown" && (
          <button
            onClick={() => setAnswerState(answerState === "hidden" ? "confirm" : "shown")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 active:scale-[0.97] transition-all"
          >
            <BookOpen className="w-4 h-4" />
            {t("Xem đáp án", "Show Answer")}
          </button>
        )}
        {answerState === "confirm" && (
          <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-secondary-foreground">
            <span className="font-semibold text-yellow-600">
              {t("Bạn chắc chắn muốn xem đáp án? Hãy tự thử trước nhé!", "Are you sure? Try it yourself first!")}
            </span>
            <button
              onClick={() => setAnswerState("shown")}
              className="px-3 py-1 rounded-md bg-yellow-500/20 text-yellow-600 font-semibold hover:bg-yellow-500/30 transition-colors"
            >
              {t("Xem ngay", "Yes, show it")}
            </button>
            <button
              onClick={() => setAnswerState("hidden")}
              className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {t("Để sau", "Not yet")}
            </button>
          </div>
        )}

      {/* Hints */}
      {showHints && (
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-4 space-y-1">
          <p className="text-sm font-semibold text-yellow-600">💡 Hints:</p>
          {challenge.hints.map((h, i) => (
            <p key={i} className="text-sm text-secondary-foreground">• {h}</p>
          ))}
        </div>
      )}

      {/* Model Answer */}
      {answerState === "shown" && (
        <div className="rounded-xl overflow-hidden border border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--card))] border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              📘 {t("Đáp án mẫu", "Model Answer")}
            </p>
            <button
              onClick={() => setAnswerState("hidden")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("Ẩn đáp án", "Hide answer")}
            </button>
          </div>
          <pre className="p-4 bg-[#1e1e1e] text-green-400 text-sm font-mono whitespace-pre-wrap break-words overflow-x-auto">
            {stripHarness(challenge.solution)}
          </pre>
        </div>
      )}

      {usesInput && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">
              ⌨️ {t("Dữ liệu nhập cho input() - mỗi dòng một giá trị", "Values for input() - one value per line")}
            </p>
            {sampleInput && (
              <button
                onClick={() => setStdinText(sampleInput)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {t("Dùng dữ liệu mẫu", "Use sample input")}
              </button>
            )}
          </div>
          <textarea
            value={stdinText}
            onChange={(e) => setStdinText(e.target.value)}
            rows={Math.min(6, Math.max(2, stdinLines(stdinText).length))}
            placeholder={sampleInput || t("Nhập giá trị...", "Type a value...")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <p className="text-xs text-muted-foreground">
            {t(
              "Mỗi lần code gọi input() sẽ lấy dòng tiếp theo. Để trống thì dùng dữ liệu mẫu. Khi chấm, hệ thống thử thêm các bộ dữ liệu mẫu khác.",
              "Each input() call takes the next line. Leave it empty to use the sample input. Grading also tries the other sample inputs.",
            )}
          </p>
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
             ? "Loading Python runtime (first time may take 5-10s)..."
             : output || "Press 'Run Code' to see results..."}
        </pre>
        {svg && (
          <div
            className="border-t border-border bg-background p-3 [&>svg]:mx-auto [&>svg]:max-h-80 [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true } }) }}
          />
        )}
      </div>

      {/* Output mismatch helper - shows expected vs actual side by side */}
      {!passed && mismatch && !hasError && (
        <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/40 p-4 space-y-3">
          <p className="text-sm font-semibold text-yellow-600">
            {t(
              "Chưa khớp kết quả mong đợi - so sánh bên dưới nhé! (Câu chữ có thể khác, nhưng các giá trị chính phải đúng.)",
              "Not matching the expected output yet - compare below! (Wording may differ, but the key values must be right.)",
            )}
          </p>
          {mismatch.input && (
            <p className="text-xs text-muted-foreground">
              {t("Với dữ liệu nhập:", "With the input:")}{" "}
              <span className="font-mono text-foreground">{mismatch.input.split("\n").join(" | ")}</span>
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">{t("Mong đợi", "Expected")}</p>
              <pre className="p-3 rounded-lg bg-[#1e1e1e] text-green-400 text-xs font-mono overflow-auto max-h-40 whitespace-pre-wrap">
                {mismatch.expected}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">{t("Kết quả của bạn", "Your output")}</p>
              <pre className="p-3 rounded-lg bg-[#1e1e1e] text-orange-300 text-xs font-mono overflow-auto max-h-40 whitespace-pre-wrap">
                {mismatch.got}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Pass Banner */}
      {passed && (
        <div className="rounded-xl bg-gradient-to-r from-green-500/15 to-blue-500/15 border border-green-500/40 p-5 text-center space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-2xl">🎉🏆✨</p>
          <p className="text-lg font-bold text-green-600">
            {t(
              `Xuất sắc! Bạn đã hoàn thành thử thách ${challenge.number}!`,
              `Congratulations! You passed Challenge ${challenge.number}!`,
            )}
          </p>
          <p className="text-sm font-semibold text-primary">+10 XP</p>
          <p className="text-sm text-muted-foreground">
            {t("Tiến lên thử thách tiếp theo nhé!", "Keep going to the next challenge!")}
          </p>
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
