import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, RotateCcw, Shuffle, ArrowRight, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { typingSentences, TYPING_CATEGORIES, type TypingLevel, type TypingSentence } from "@/data/ieltsTypingBank";

const STORE = "ielts-typing-progress";
type Progress = Record<string, { bestWpm: number; runs: number; accSum: number }>;
const loadProgress = (): Progress => {
  try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; }
};

interface Result { wpm: number; accuracy: number; wrongWords: string[] }

const calc = (target: string, typed: string, ms: number, keystrokes: number, errors: number): Result => {
  const minutes = Math.max(ms, 1000) / 60000;
  const correctChars = [...typed].filter((c, i) => c === target[i]).length;
  const wpm = Math.round(correctChars / 5 / minutes);
  const accuracy = keystrokes ? Math.max(0, Math.round(((keystrokes - errors) / keystrokes) * 100)) : 100;
  const tw = target.split(" "), yw = typed.split(" ");
  return { wpm, accuracy, wrongWords: tw.filter((w, i) => yw[i] !== undefined && yw[i] !== w) };
};

export default function TypingPractice({ taskType }: { taskType: 1 | 2 }) {
  const { t } = useLanguage();
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState<TypingLevel | "all">("all");
  const [mode, setMode] = useState<"single" | "sprint">("single");
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [keystrokes, setKeystrokes] = useState(0);
  const [errors, setErrors] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [sprint, setSprint] = useState<{ done: number; chars: number; results: Result[] } | null>(null);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setCategory("all"); }, [taskType]);

  const pool = useMemo(
    () => typingSentences.filter((s) => s.task === taskType && (category === "all" || s.category === category) && (level === "all" || s.level === level)),
    [taskType, category, level],
  );
  const current: TypingSentence | undefined = pool[idx % Math.max(pool.length, 1)];

  const reset = useCallback((nextIdx?: number) => {
    if (nextIdx !== undefined) setIdx(nextIdx);
    setTyped(""); setStart(null); setKeystrokes(0); setErrors(0); setResult(null);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
  }, []);

  useEffect(() => { reset(0); setSprint(null); }, [taskType, category, level, mode, reset]);

  useEffect(() => {
    if (!start || result) return;
    const id = window.setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [start, result]);

  const elapsed = start ? (result ? 0 : now - start) : 0;
  const sprintLeft = mode === "sprint" && start ? Math.max(0, 60 - Math.floor(elapsed / 1000)) : 60;
  const live = current && start ? calc(current.text, typed, elapsed, keystrokes, errors) : null;

  const saveResult = useCallback((r: Result, id: string) => {
    setProgress((p) => {
      const key = `task${taskType}`;
      const prev = p[key] || { bestWpm: 0, runs: 0, accSum: 0 };
      const next = { ...p, [key]: { bestWpm: Math.max(prev.bestWpm, r.wpm), runs: prev.runs + 1, accSum: prev.accSum + r.accuracy } };
      localStorage.setItem(STORE, JSON.stringify(next));
      return next;
    });
    logStudentActivity({ activityType: "ielts_typing", activityId: id, score: r.accuracy, maxScore: 100, metadata: { wpm: r.wpm, task: taskType, mode } });
  }, [taskType, mode]);

  // Sprint timeout
  useEffect(() => {
    if (mode !== "sprint" || !start || result || sprintLeft > 0 || !current) return;
    const r = calc(current.text, typed, 60000, keystrokes, errors);
    const all = [...(sprint?.results || []), r];
    const chars = (sprint?.chars || 0) + [...typed].filter((c, i) => c === current.text[i]).length;
    const final: Result = {
      wpm: Math.round(chars / 5),
      accuracy: Math.round(all.reduce((a, x) => a + x.accuracy, 0) / all.length),
      wrongWords: all.flatMap((x) => x.wrongWords),
    };
    setResult(final);
    setSprint({ done: sprint?.done || 0, chars, results: all });
    saveResult(final, "sprint");
  }, [sprintLeft, mode, start, result, current, typed, keystrokes, errors, sprint, saveResult]);

  const onChange = (v: string) => {
    if (!current || result) return;
    if (v.length > current.text.length) v = v.slice(0, current.text.length);
    const t0 = start ?? Date.now();
    if (!start) { setStart(t0); setNow(t0); }
    if (v.length > typed.length) {
      const added = v.slice(typed.length);
      setKeystrokes((k) => k + added.length);
      const errs = [...added].filter((c, i) => c !== current.text[typed.length + i]).length;
      setErrors((e) => e + errs);
    }
    setTyped(v);
    if (v === current.text && mode === "sprint") {
      const ms = Date.now() - t0;
      const r = calc(current.text, v, ms, keystrokes + 1, errors);
      setSprint((s) => ({ done: (s?.done || 0) + 1, chars: (s?.chars || 0) + v.length, results: [...(s?.results || []), r] }));
      setIdx((i) => i + 1); setTyped(""); setKeystrokes(0); setErrors(0);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!current) return;
    if (result) { setSprint(null); reset(idx + 1); return; }
    if (mode === "sprint" || !typed.trim() || !start) return;
    const r = calc(current.text, typed, Date.now() - start, keystrokes, errors);
    setResult(r); saveResult(r, current.id);
  };

  const block = (e: React.SyntheticEvent) => e.preventDefault();
  const cats = TYPING_CATEGORIES[taskType];
  const stat = progress[`task${taskType}`];

  const renderTarget = () => {
    if (!current) return null;
    const sIdx = current.text.toLowerCase().indexOf(current.structure.toLowerCase());
    const sEnd = sIdx + current.structure.length;
    return [...current.text].map((ch, i) => {
      const done = i < typed.length;
      const ok = done && typed[i] === ch;
      const inStruct = sIdx >= 0 && i >= sIdx && i < sEnd;
      const cls = done
        ? ok ? "text-primary" : "bg-destructive/20 text-destructive"
        : inStruct ? "text-foreground font-semibold underline decoration-primary/60 decoration-2 underline-offset-4" : "text-muted-foreground";
      return (
        <span key={i} className={`${cls} ${i === typed.length && !result ? "border-l-2 border-primary animate-pulse" : ""}`}>{ch}</span>
      );
    });
  };

  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground hover:text-foreground"}`}>{children}</button>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-muted-foreground w-20">{t("Chủ đề", "Category")}</span>
            <Chip active={category === "all"} onClick={() => setCategory("all")}>{t("Tất cả", "All")}</Chip>
            {cats.map((c) => <Chip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>{t(c.vi, c.en)}</Chip>)}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-muted-foreground w-20">{t("Cấp độ", "Level")}</span>
            {(["all", "B2", "C1", "C2"] as const).map((l) => <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l === "all" ? t("Tất cả", "All") : l}</Chip>)}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-muted-foreground w-20">{t("Chế độ", "Mode")}</span>
            <Chip active={mode === "single"} onClick={() => setMode("single")}>{t("Từng câu", "Single sentence")}</Chip>
            <Chip active={mode === "sprint"} onClick={() => setMode("sprint")}>Sprint 60s</Chip>
            {stat && (
              <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                {t("Tốt nhất", "Best")} {stat.bestWpm} WPM · {t("Độ chính xác TB", "Avg accuracy")} {Math.round(stat.accSum / stat.runs)}% · {stat.runs} {t("lượt", "runs")}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {current ? (
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">{current.level}</span>
              <span className="text-muted-foreground">{t("Cấu trúc", "Structure")}: <b className="text-foreground">{current.structure}</b></span>
              <span className="ml-auto text-muted-foreground">{(idx % pool.length) + 1}/{pool.length}</span>
            </div>
            <div className="text-lg md:text-xl leading-relaxed font-mono select-none" onCopy={block}>{renderTarget()}</div>
            <p className="text-sm italic text-muted-foreground">{current.vi}</p>
            <textarea
              ref={inputRef}
              value={typed}
              onChange={(e) => onChange(e.target.value)}
              onPaste={block} onDrop={block} onCopy={block} onCut={block}
              readOnly={!!result}
              spellCheck={false} autoCorrect="off" autoCapitalize="off" autoComplete="off"
              rows={3}
              placeholder={t("Bắt đầu gõ câu ở trên...", "Start typing the sentence above...")}
              className="w-full rounded-md border bg-background p-3 font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-muted/50 p-2"><div className="text-xs text-muted-foreground">WPM</div><div className="text-xl font-bold">{result?.wpm ?? live?.wpm ?? 0}</div></div>
              <div className="rounded-lg bg-muted/50 p-2"><div className="text-xs text-muted-foreground">{t("Chính xác", "Accuracy")}</div><div className="text-xl font-bold">{result?.accuracy ?? live?.accuracy ?? 100}%</div></div>
              <div className="rounded-lg bg-muted/50 p-2"><div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Timer className="w-3 h-3" />{mode === "sprint" ? t("Còn lại", "Left") : t("Thời gian", "Time")}</div><div className="text-xl font-bold">{mode === "sprint" ? `${sprintLeft}s` : `${Math.floor(elapsed / 1000)}s`}</div></div>
            </div>
            {mode === "sprint" && sprint && !result && <p className="text-xs text-muted-foreground">{t("Đã xong", "Completed")}: {sprint.done} {t("câu", "sentences")}</p>}
            {result && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-2">
                <p className="font-semibold flex items-center gap-2"><Keyboard className="w-4 h-4 text-primary" />
                  {mode === "sprint" ? t(`Sprint xong: ${sprint?.done || 0} câu`, `Sprint finished: ${sprint?.done || 0} sentences`) : t("Hoàn thành!", "Completed!")} {result.wpm} WPM · {result.accuracy}%
                </p>
                {result.wrongWords.length > 0 && (
                  <p className="text-sm text-muted-foreground">{t("Từ gõ sai", "Mistyped words")}: <span className="text-destructive">{[...new Set(result.wrongWords)].slice(0, 10).join(", ")}</span></p>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => { setSprint(null); reset(); }}><RotateCcw className="w-4 h-4 mr-1" />{t("Làm lại", "Retry")}</Button>
              <Button variant="outline" size="sm" onClick={() => { setSprint(null); reset(Math.floor(Math.random() * pool.length)); }}><Shuffle className="w-4 h-4 mr-1" />{t("Ngẫu nhiên", "Random")}</Button>
              <Button size="sm" onClick={() => { setSprint(null); reset(idx + 1); }}>{t("Câu tiếp", "Next")}<ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground">{t("Không có câu phù hợp bộ lọc.", "No sentences match this filter.")}</p>
      )}
    </div>
  );
}
