/**
 * CodeTypingRace — a fun mini-game replacing the redundant "1-Minute Challenge"
 * quiz. Players retype a short snippet from the lesson as fast & accurately as
 * possible. Tracks WPM and accuracy in real time.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Timer, Target, Zap, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

interface Props {
  /** Source code or text the player must retype. */
  source: string;
  /** Optional language label (e.g. "python", "sql"). */
  language?: string;
}

/** Pick a short, fun-to-type slice from a longer source. */
function pickSnippet(raw: string): string {
  if (!raw) return "print('Hello, HaiEduTech!')";
  // Prefer non-empty, non-comment lines.
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/\t/g, "  ").trimEnd())
    .filter((l) => l.trim() && !/^\s*(#|\/\/)/.test(l));
  if (!lines.length) return raw.slice(0, 120);
  // Build chunk up to ~120 chars from consecutive lines.
  let out = "";
  for (const l of lines) {
    if ((out + l).length > 140) break;
    out = out ? `${out}\n${l}` : l;
  }
  return (out || lines[0]).slice(0, 160);
}

const CodeTypingRace = ({ source, language }: Props) => {
  const snippet = useMemo(() => pickSnippet(source), [source]);
  const [typed, setTyped] = useState("");
  const [startAt, setStartAt] = useState<number | null>(null);
  const [endAt, setEndAt] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset whenever the snippet changes (lesson switch).
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

  const reset = () => {
    setTyped("");
    setStartAt(null);
    setEndAt(null);
    requestAnimationFrame(() => inputRef.current?.focus());
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

      <p className="text-xs text-muted-foreground mb-3">
        🎯 Retype the snippet below as fast and accurately as you can. No quiz, just pure muscle memory!
      </p>

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
          <button
            onClick={reset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Race again
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeTypingRace;
