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
import { Keyboard, Timer, Target, Zap, RotateCcw, Trophy, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  /** Source code or text the player must retype. */
  source: string;
  /** Optional language label (e.g. "python", "sql"). */
  language?: string;
}

/**
 * Curated bonus snippets per language. Short, idiomatic, fun to retype.
 * Each entry stays under ~160 characters to keep the race quick.
 */
const BONUS_SNIPPETS: Record<string, string[]> = {
  python: [
    "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('HaiEduTech'))",
    "nums = [1, 2, 3, 4, 5]\nsquares = [n * n for n in nums]\nprint(squares)",
    "from collections import Counter\nwords = 'to be or not to be'.split()\nprint(Counter(words))",
    "for i in range(1, 6):\n    print('★' * i)",
    "data = {'apple': 3, 'banana': 5}\nfor k, v in data.items():\n    print(k, '->', v)",
    "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
    "import math\nprint(round(math.pi, 4))\nprint(math.factorial(6))",
    "try:\n    x = int('42')\nexcept ValueError:\n    x = 0\nprint(x)",
    "names = ['ann', 'bob', 'cat']\nprint(', '.join(n.title() for n in names))",
    "matrix = [[1, 2], [3, 4]]\nfor row in matrix:\n    print(sum(row))",
  ],
  sql: [
    "SELECT name, COUNT(*) AS total\nFROM orders\nGROUP BY name\nORDER BY total DESC;",
    "SELECT * FROM students\nWHERE score >= 80\nORDER BY score DESC\nLIMIT 10;",
    "UPDATE users\nSET active = TRUE\nWHERE last_login > NOW() - INTERVAL '30 days';",
    "SELECT u.name, p.title\nFROM users u\nJOIN posts p ON p.user_id = u.id;",
    "WITH top AS (\n  SELECT id FROM products ORDER BY sales DESC LIMIT 5\n)\nSELECT * FROM top;",
    "INSERT INTO logs (event, created_at)\nVALUES ('login', NOW());",
  ],
  javascript: [
    "const sum = (a, b) => a + b;\nconsole.log(sum(2, 3));",
    "const nums = [1, 2, 3, 4];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);",
    "async function load() {\n  const r = await fetch('/api');\n  return r.json();\n}",
    "const user = { name: 'Hai', age: 30 };\nconst { name } = user;\nconsole.log(name);",
  ],
  typescript: [
    "type User = { id: number; name: string };\nconst u: User = { id: 1, name: 'Hai' };\nconsole.log(u);",
    "function add<T extends number>(a: T, b: T): T {\n  return (a + b) as T;\n}",
  ],
  bash: [
    "for f in *.txt; do\n  echo \"Processing $f\"\ndone",
    "grep -rn 'TODO' src/ | wc -l",
  ],
};

/** Pick a short, fun-to-type slice from a longer source. */
function pickSnippet(raw: string): string {
  if (!raw) return "print('Hello, HaiEduTech!')";
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/\t/g, "  ").trimEnd())
    .filter((l) => l.trim() && !/^\s*(#|\/\/)/.test(l));
  if (!lines.length) return raw.slice(0, 120);
  let out = "";
  for (const l of lines) {
    if ((out + l).length > 140) break;
    out = out ? `${out}\n${l}` : l;
  }
  return (out || lines[0]).slice(0, 160);
}

/**
 * Build several candidate snippets from the lesson's own source by walking
 * through clean (non-comment) lines and grouping them into short blocks.
 */
function buildSourceSnippets(raw: string): string[] {
  if (!raw) return [];
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/\t/g, "  ").trimEnd())
    .filter((l) => l.trim() && !/^\s*(#|\/\/)/.test(l));
  const snippets: string[] = [];
  let buf = "";
  for (const l of lines) {
    if ((buf + "\n" + l).length > 140) {
      if (buf) snippets.push(buf.slice(0, 160));
      buf = l;
    } else {
      buf = buf ? `${buf}\n${l}` : l;
    }
  }
  if (buf) snippets.push(buf.slice(0, 160));
  return snippets;
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

const CodeTypingRace = ({ source, language }: Props) => {
  const langKey = (language || "").toLowerCase();
  const bonus = BONUS_SNIPPETS[langKey] || BONUS_SNIPPETS.python;

  // Pool = primary snippet + extra source chunks + curated bonus drills.
  const pool = useMemo(() => {
    const fromSource = buildSourceSnippets(source);
    const primary = pickSnippet(source);
    return uniq([primary, ...fromSource, ...bonus]);
  }, [source, bonus]);

  const [poolIdx, setPoolIdx] = useState(0);
  const snippet = pool[poolIdx] || pickSnippet(source);

  const [typed, setTyped] = useState("");
  const [startAt, setStartAt] = useState<number | null>(null);
  const [endAt, setEndAt] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset whenever the snippet changes (lesson switch or shuffle).
  useEffect(() => {
    setTyped("");
    setStartAt(null);
    setEndAt(null);
  }, [snippet]);

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
    let next = poolIdx;
    // Pick a different random snippet from the pool.
    while (next === poolIdx) {
      next = Math.floor(Math.random() * pool.length);
    }
    setPoolIdx(next);
  };

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
            {poolIdx + 1}/{pool.length}
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
          🎯 Retype the snippet below. Tap <strong>Next snippet</strong> to try a different drill!
        </p>
        <button
          onClick={nextSnippet}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 active:scale-95"
        >
          <Shuffle className="w-3.5 h-3.5" /> Next snippet
        </button>
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
        disabled={done}
        spellCheck={false}
        rows={3}
        placeholder="Start typing here…"
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
    </div>
  );
};

export default CodeTypingRace;
