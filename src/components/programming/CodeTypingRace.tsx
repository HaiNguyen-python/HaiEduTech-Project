/**
 * CodeTypingRace - a fun mini-game replacing the redundant "1-Minute Challenge"
 * quiz. Players retype a short snippet from the lesson as fast & accurately as
 * possible. Tracks WPM and accuracy in real time.
 *
 * The snippet pool now combines slices from the lesson's own source code with a
 * curated bank of bonus exercises per language. A "Next snippet" button lets
 * the learner shuffle through many different drills for variety.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Timer, Target, Zap, RotateCcw, Trophy, Shuffle, BookOpen, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { resolveTopicSnippets } from "@/data/programming/typingSnippetBank";

interface Props {
  /** Source code or text the player must retype. */
  source: string;
  /** Optional language label (e.g. "python", "sql"). */
  language?: string;
  /** Lesson title - used to surface topic-specific drills (e.g. Random Forest). */
  lessonTitle?: string;
  /** Module title - secondary signal for topic detection. */
  moduleTitle?: string;
}

/**
 * Curated bonus snippets per language, ordered from simplest to most advanced
 * so learners progress naturally: basic syntax -> control flow -> data
 * structures -> functions -> libraries. Each entry stays under ~160 chars.
 */
const BONUS_SNIPPETS: Record<string, string[]> = {
  python: [
    // Step 1 - print & variables
    "print('Hello, HaiEduTech!')",
    "name = 'Hai'\nage = 30\nprint(name, age)",
    // Step 2 - conditionals & loops
    "for i in range(1, 6):\n    print(i, i * i)",
    "score = 85\nif score >= 80:\n    print('Great job!')\nelse:\n    print('Keep going!')",
    // Step 3 - lists & dicts
    "nums = [1, 2, 3, 4, 5]\nsquares = [n * n for n in nums]\nprint(squares)",
    "data = {'apple': 3, 'banana': 5}\nfor k, v in data.items():\n    print(k, '->', v)",
    // Step 4 - functions
    "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('HaiEduTech'))",
    "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
    // Step 5 - error handling & strings
    "try:\n    x = int('42')\nexcept ValueError:\n    x = 0\nprint(x)",
    "names = ['ann', 'bob', 'cat']\nprint(', '.join(n.title() for n in names))",
    // Step 6 - standard library
    "import math\nprint(round(math.pi, 4))\nprint(math.factorial(6))",
    "from collections import Counter\nwords = 'to be or not to be'.split()\nprint(Counter(words))",
  ],
  sql: [
    "SELECT * FROM users LIMIT 5;",
    "SELECT name, email FROM users WHERE active = TRUE;",
    "SELECT * FROM students\nWHERE score >= 80\nORDER BY score DESC\nLIMIT 10;",
    "SELECT name, COUNT(*) AS total\nFROM orders\nGROUP BY name\nORDER BY total DESC;",
    "SELECT u.name, p.title\nFROM users u\nJOIN posts p ON p.user_id = u.id;",
    "INSERT INTO logs (event, created_at)\nVALUES ('login', NOW());",
    "UPDATE users\nSET active = TRUE\nWHERE last_login > NOW() - INTERVAL '30 days';",
    "WITH top AS (\n  SELECT id FROM products ORDER BY sales DESC LIMIT 5\n)\nSELECT * FROM top;",
  ],
  javascript: [
    "const greeting = 'Hello';\nconsole.log(greeting);",
    "const sum = (a, b) => a + b;\nconsole.log(sum(2, 3));",
    "const nums = [1, 2, 3, 4];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);",
    "const user = { name: 'Hai', age: 30 };\nconst { name } = user;\nconsole.log(name);",
    "async function load() {\n  const r = await fetch('/api');\n  return r.json();\n}",
  ],
  typescript: [
    "type User = { id: number; name: string };\nconst u: User = { id: 1, name: 'Hai' };\nconsole.log(u);",
    "function add<T extends number>(a: T, b: T): T {\n  return (a + b) as T;\n}",
  ],
  bash: [
    "echo 'Hello from bash'",
    "for f in *.txt; do\n  echo \"Processing $f\"\ndone",
    "grep -rn 'TODO' src/ | wc -l",
  ],
};

/** Estimate snippet difficulty from length & line count. */
function difficultyOf(snippet: string): "Easy" | "Medium" | "Hard" {
  const lines = snippet.split("\n").length;
  const len = snippet.length;
  if (lines <= 2 && len <= 60) return "Easy";
  if (lines <= 4 && len <= 140) return "Medium";
  return "Hard";
}

/**
 * Strip emojis and other non-ASCII pictographs from snippets so learners only
 * have to type plain code characters. Keeps standard punctuation and letters.
 */
function stripEmojis(text: string): string {
  if (!text) return text;
  // Remove emoji/pictograph/symbol ranges + variation selectors + ZWJ.
  const emojiRe = /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;
  return text.replace(emojiRe, "").replace(/[ \t]+\n/g, "\n");
}

/** Pick a short, fun-to-type slice from a longer source. */
function pickSnippet(raw: string): string {
  raw = stripEmojis(raw);
  if (!raw) return "print('Hello, HaiEduTech!')";
  return raw;
}

/**
 * Normalize the lesson source: strip emojis, convert tabs to 2 spaces, trim
 * trailing whitespace per line, drop leading/trailing blank lines. The learner
 * retypes the WHOLE lesson code block as a single drill so they internalize
 * the full example (not arbitrary 140-char slices).
 */
function normalizeFullSource(raw: string): string {
  raw = stripEmojis(raw || "");
  if (!raw.trim()) return "";
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/\t/g, "  ").trimEnd());
  // Trim leading/trailing empty lines but preserve blank lines in the middle.
  let start = 0;
  let end = lines.length;
  while (start < end && !lines[start].trim()) start++;
  while (end > start && !lines[end - 1].trim()) end--;
  return lines.slice(start, end).join("\n");
}

/** Deduplicate while preserving order. */
function uniq(arr: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of arr) {
    const key = s.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      out.push(s);
    }
  }
  return out;
}

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

const CodeTypingRace = ({ source, language, lessonTitle, moduleTitle }: Props) => {
  // Topic-aware drills: if the lesson title matches a known topic (e.g. "Random
  // Forest", "k-means", "SQL JOINs", "FastAPI"), prefer that ladder so every
  // typing race reinforces the actual lesson content.
  const topic = useMemo(
    () => resolveTopicSnippets(lessonTitle, moduleTitle),
    [lessonTitle, moduleTitle],
  );
  const effectiveLang = (topic?.language || language || "").toLowerCase();
  const langKey = effectiveLang;
  const bonus = BONUS_SNIPPETS[langKey] || BONUS_SNIPPETS.python;

  // The typing race now drills the ENTIRE lesson code block in one go (no
  // small 140-char slices), so the learner sees the full example end-to-end.
  // Topic ladders and generic bonus snippets are only used as a fallback when
  // the lesson has no embedded code block.
  const pool = useMemo(() => {
    const full = normalizeFullSource(source);
    if (full) return [full];
    const topicSnips = (topic?.snippets || []).map(stripEmojis);
    if (topicSnips.length > 0) return uniq(topicSnips);
    return uniq(bonus.map(stripEmojis));
  }, [source, bonus, topic]);


  const [poolIdx, setPoolIdx] = useState(0);
  const snippet = pool[poolIdx] || pickSnippet(source);

  const [typed, setTyped] = useState("");
  const [startAt, setStartAt] = useState<number | null>(null);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [explainLoading, setExplainLoading] = useState(false);
  const [explainError, setExplainError] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset whenever the snippet changes (lesson switch or shuffle).
  useEffect(() => {
    setTyped("");
    setStartAt(null);
    setEndAt(null);
    setExplanation("");
    setQuiz([]);
    setQuizAnswers({});
    setExplainError("");
  }, [snippet]);

  // When the lesson (and therefore the pool) changes, start back at the easiest
  // drill of the new ladder.
  useEffect(() => {
    setPoolIdx(0);
  }, [pool]);

  const done = endAt !== null;
  const elapsedMs = startAt ? (endAt ?? Date.now()) - startAt : 0;

  // Live elapsed updater (only while playing).
  const [, force] = useState(0);
  useEffect(() => {
    if (!startAt || done) return;
    const id = setInterval(() => force((n) => n + 1), 200);
    return () => clearInterval(id);
  }, [startAt, done]);

  const correctChars = useMemo(() => {
    let n = 0;
    for (let i = 0; i < typed.length && i < snippet.length; i++) {
      if (typed[i] === snippet[i]) n++;
    }
    return n;
  }, [typed, snippet]);

  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
  const minutes = elapsedMs / 60000;
  const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    if (done) return;
    if (!startAt && v.length > 0) setStartAt(Date.now());
    setTyped(v);
    if (v === snippet) {
      const finishAt = Date.now();
      setEndAt(finishAt);
      const secs = ((finishAt - (startAt ?? finishAt)) / 1000).toFixed(1);
      toast.success(`🏁 Finished in ${secs}s!`, {
        description: `Accuracy 100% · ${Math.round(snippet.length / 5 / ((finishAt - (startAt ?? finishAt)) / 60000))} WPM`,
      });
    }
  };

  // Allow Tab to indent naturally. Auto-match the snippet's expected
  // whitespace at the cursor (so the learner can press Tab to "jump" to the
  // next indent level just like in a real editor). Shift+Tab dedents.
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab" || done) return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = el.selectionStart ?? typed.length;
    const end = el.selectionEnd ?? start;

    if (e.shiftKey) {
      // Dedent: remove up to 4 spaces (or one tab) before the cursor on this line.
      const lineStart = typed.lastIndexOf("\n", start - 1) + 1;
      const before = typed.slice(lineStart, start);
      const m = before.match(/( {1,4}|\t)$/);
      if (!m) return;
      const cut = m[0].length;
      const next = typed.slice(0, start - cut) + typed.slice(end);
      if (!startAt && next.length > 0) setStartAt(Date.now());
      setTyped(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start - cut;
      });
      return;
    }

    // Indent: match snippet whitespace at cursor if any, else 2 spaces.
    let insert = "  ";
    const rest = snippet.slice(start);
    const ws = rest.match(/^[ \t]+/);
    if (ws) insert = ws[0];
    const next = typed.slice(0, start) + insert + typed.slice(end);
    if (!startAt && next.length > 0) setStartAt(Date.now());
    setTyped(next);
    if (next === snippet) {
      const finishAt = Date.now();
      setEndAt(finishAt);
    }
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + insert.length;
    });
  };

  const reset = () => {
    setTyped("");
    setStartAt(null);
    setEndAt(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const nextSnippet = () => {
    if (pool.length <= 1) {
      reset();
      return;
    }
    // Move sequentially through the ladder so difficulty rises predictably.
    setPoolIdx((i) => (i + 1) % pool.length);
  };

  const prevSnippet = () => {
    if (pool.length <= 1) return;
    setPoolIdx((i) => (i - 1 + pool.length) % pool.length);
  };

  const diff = difficultyOf(snippet);
  const diffClass =
    diff === "Easy"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
      : diff === "Medium"
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
      : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30";

  const fetchExplanation = async () => {
    if (explainLoading || explanation) return;
    setExplainLoading(true);
    setExplainError("");
    try {
      const { data, error } = await supabase.functions.invoke("explain-code", {
        body: { code: snippet, language: langKey || "python", lessonContext: lessonTitle || "" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setExplanation(data?.explanation || "");
      setQuiz(Array.isArray(data?.quiz) ? data.quiz : []);
      setQuizAnswers({});
    } catch (e) {
      setExplainError(e instanceof Error ? e.message : "Không thể tải giải thích. Thử lại nhé!");
    } finally {
      setExplainLoading(false);
    }
  };

  // Auto-fetch explanation once the user finishes the snippet.
  useEffect(() => {
    if (done && !explanation && !explainLoading) {
      fetchExplanation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // Render snippet with per-char highlight.
  const rendered = snippet.split("").map((ch, i) => {
    let cls = "text-muted-foreground";
    if (i < typed.length) {
      cls = typed[i] === ch ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 underline decoration-wavy";
    } else if (i === typed.length) {
      cls = "text-foreground bg-yellow-200/60 dark:bg-yellow-500/30 rounded-sm";
    }
    if (ch === "\n") return <br key={i} />;
    return (
      <span key={i} className={cls}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    );
  });

  return (
    <div className="glass-card rounded-xl p-6 border-t-4 border-yellow-500">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-yellow-500" />
          Code Typing Race
          {language && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 uppercase">
              {language}
            </span>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            Step {poolIdx + 1} / {pool.length}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${diffClass}`}>
            {diff}
          </span>
        </h2>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-amber-600">
            <Timer className="w-3.5 h-3.5" /> {(elapsedMs / 1000).toFixed(1)}s
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <Zap className="w-3.5 h-3.5" /> {wpm} WPM
          </span>
          <span className="flex items-center gap-1 text-sky-600">
            <Target className="w-3.5 h-3.5" /> {accuracy}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <p className="text-xs text-muted-foreground">
          🎯 {topic ? <>Drills tailored to <strong>{lessonTitle || "this lesson"}</strong> · Easy → Hard.</> : <>Retype the snippet below. Drills go from <strong>Easy → Hard</strong> in order.</>}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSnippet}
            disabled={pool.length <= 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary text-foreground border border-border hover:bg-secondary/70 active:scale-95 disabled:opacity-50"
          >
            ← Prev
          </button>
          <button
            onClick={nextSnippet}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" /> Next →
          </button>
        </div>
      </div>

      <div
        className="font-mono text-sm leading-relaxed whitespace-pre-wrap bg-slate-950 text-slate-200 rounded-lg p-4 mb-3 select-none cursor-text overflow-x-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {rendered}
      </div>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={done}
        spellCheck={false}
        rows={3}
        placeholder="Start typing here… (Tab to indent, Shift+Tab to dedent)"
        className="w-full font-mono text-sm bg-secondary border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none disabled:opacity-60"
      />

      {done && (
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            {wpm >= 40 ? "Blazing fast! 🔥" : wpm >= 20 ? "Nice run! ⚡" : "Completed! 🎉"} ·{" "}
            {(elapsedMs / 1000).toFixed(1)}s · {wpm} WPM
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary text-foreground hover:bg-secondary/70 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry
            </button>
            <button
              onClick={nextSnippet}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95"
            >
              <Shuffle className="w-3.5 h-3.5" /> Next snippet
            </button>
          </div>
        </div>
      )}



      {done && (
        <div className="mt-3 rounded-lg border border-sky-500/30 bg-sky-500/5 p-4">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h3 className="text-sm font-semibold text-sky-700 dark:text-sky-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Code Explanation
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 uppercase">AI</span>
            </h3>
            {(explanation || explainError) && (
              <button
                onClick={() => { setExplanation(""); setExplainError(""); fetchExplanation(); }}
                disabled={explainLoading}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500/20 disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" /> Re-explain
              </button>
            )}
          </div>
          {explainLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Analyzing code...
            </div>
          )}
          {explainError && !explainLoading && (
            <div className="text-xs text-red-600 dark:text-red-400">
              {explainError}{" "}
              <button onClick={fetchExplanation} className="underline font-semibold">Retry</button>
            </div>
          )}
          {explanation && !explainLoading && (
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeTypingRace;
