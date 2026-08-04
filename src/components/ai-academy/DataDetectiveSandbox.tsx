/**
 * DataDetectiveSandbox
 * Kids click "dirty" cells (outliers, empty, impossible values) to clean them.
 * A live bar chart and a "Data Cleanliness" gauge react in real-time.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trash2, CheckCircle2, Search } from "lucide-react";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const DD_TF = [
  { q: "Dirty data can make AI produce biased or wrong predictions.", a: true },
  { q: "Outliers (unusual values) should always be deleted from a dataset.", a: false, why: "Sometimes an outlier is an important finding, like fraud or a sensor fault." },
  { q: "A missing value can be filled in using the column's average.", a: true },
  { q: "A clean dataset is a requirement for training a good AI model.", a: true },
  { q: "A height of 999 cm is a valid entry for a middle-school student.", a: false, why: "No real person is 999cm tall - that's an outlier caused by a data-entry error." },
];
const DD_PAIRS = [
  { a: "Missing", b: "An empty cell - no value recorded" },
  { a: "Outlier", b: "A value far outside the normal range" },
  { a: "Duplicate", b: "A record that's been entered more than once" },
  { a: "Imputation", b: "Filling a missing value with an estimate" },
];

type Row = {
  id: number;
  name: string;
  age: number;
  height: number; // cm
  score: number; // 0..10
  dirty: { name?: boolean; age?: boolean; height?: boolean; score?: boolean };
};

const INITIAL: Row[] = [
  { id: 1, name: "Mai", age: 14, height: 152, score: 8.5, dirty: {} },
  { id: 2, name: "", age: 15, height: 160, score: 7, dirty: { name: true } },
  { id: 3, name: "Lan", age: -5, height: 155, score: 9, dirty: { age: true } },
  { id: 4, name: "Hung", age: 14, height: 999, score: 6.5, dirty: { height: true } },
  { id: 5, name: "An", age: 15, height: 158, score: 8, dirty: {} },
  { id: 6, name: "Binh", age: 200, height: 161, score: 7.5, dirty: { age: true } },
  { id: 7, name: "Linh", age: 14, height: 154, score: 99, dirty: { score: true } },
  { id: 8, name: "Tu", age: 15, height: 165, score: 9.2, dirty: {} },
];

const totalDirty = INITIAL.reduce(
  (n, r) => n + Object.values(r.dirty).filter(Boolean).length,
  0,
);

const DataDetectiveSandbox = () => {
  const [rows, setRows] = useState<Row[]>(INITIAL);

  const dirtyLeft = useMemo(
    () => rows.reduce((n, r) => n + Object.values(r.dirty).filter(Boolean).length, 0),
    [rows],
  );
  const cleanliness = Math.round(((totalDirty - dirtyLeft) / totalDirty) * 100);

  const cleanCell = (id: number, key: keyof Row["dirty"]) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id || !r.dirty[key]) return r;
        const fix: Partial<Row> = {};
        if (key === "name") fix.name = `Student${id}`;
        if (key === "age") fix.age = 14;
        if (key === "height") fix.height = 158;
        if (key === "score") fix.score = 7.5;
        const newDirty = { ...r.dirty };
        delete newDirty[key];
        return { ...r, ...fix, dirty: newDirty };
      }),
    );
  };

  // Average score for the bar chart, only counting "clean enough" rows
  const avgScore = useMemo(() => {
    const valid = rows.filter((r) => r.score >= 0 && r.score <= 10);
    return valid.reduce((s, r) => s + r.score, 0) / Math.max(1, valid.length);
  }, [rows]);

  const avgHeight = useMemo(() => {
    const valid = rows.filter((r) => r.height > 80 && r.height < 220);
    return valid.reduce((s, r) => s + r.height, 0) / Math.max(1, valid.length);
  }, [rows]);

  const Cell = ({
    rowId,
    field,
    value,
  }: {
    rowId: number;
    field: keyof Row["dirty"];
    value: string | number;
  }) => {
    const row = rows.find((r) => r.id === rowId)!;
    const isDirty = !!row.dirty[field];
    return (
      <button
        onClick={() => cleanCell(rowId, field)}
        disabled={!isDirty}
        className={`px-2 py-1 rounded text-sm transition-all ${
          isDirty
            ? "bg-destructive/20 text-destructive font-bold animate-pulse hover:bg-destructive/30 cursor-pointer ring-1 ring-destructive/40"
            : "text-foreground/80"
        }`}
        title={isDirty ? "Click to clean" : ""}
      >
        {value === "" ? "-" : value}
        {isDirty && <Trash2 className="inline w-3 h-3 ml-1" />}
      </button>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/15 to-emerald-500/15 border border-primary/30 text-[11px] font-bold uppercase tracking-wide text-primary mb-2">
          🧹 Activity 1 · Clean the data
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <Search className="w-4 h-4 text-primary" />
          <span>
            Click the <span className="text-destructive font-bold">blinking red</span> cells to
            "clean" the data. The chart and cleanliness score update automatically.
          </span>
        </div>
      </div>

      {/* Cleanliness gauge */}
      <div className="rounded-xl bg-card/60 border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Data cleanliness</span>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            {cleanliness}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-emerald-500"
            initial={false}
            animate={{ width: `${cleanliness}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <AnimatePresence>
          {cleanliness === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-2 text-emerald-500 font-semibold text-sm"
            >
              <CheckCircle2 className="w-4 h-4" /> Great job! The data is clean - AI is ready to learn.
              <Sparkles className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Table */}
        <div className="rounded-xl bg-card/60 border border-border p-3 overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="text-left text-xs text-foreground/60 border-b border-border">
                <th className="py-2 pr-2">Name</th>
                <th className="py-2 px-2">Age</th>
                <th className="py-2 px-2">Height (cm)</th>
                <th className="py-2 pl-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/40 last:border-0">
                  <td><Cell rowId={r.id} field="name" value={r.name} /></td>
                  <td><Cell rowId={r.id} field="age" value={r.age} /></td>
                  <td><Cell rowId={r.id} field="height" value={r.height} /></td>
                  <td><Cell rowId={r.id} field="score" value={r.score} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar chart */}
        <div className="rounded-xl bg-card/60 border border-border p-4">
          <div className="text-sm font-semibold mb-3">📊 What does the AI see in this data?</div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Average score</span>
                <motion.span
                  key={avgScore.toFixed(1)}
                  initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                  animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                  className="font-bold"
                >
                  {avgScore.toFixed(1)} / 10
                </motion.span>
              </div>
              <div className="h-4 rounded-md bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 to-blue-600"
                  initial={false}
                  animate={{ width: `${Math.min(100, (avgScore / 10) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Average height</span>
                <motion.span
                  key={avgHeight.toFixed(0)}
                  initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                  animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                  className="font-bold"
                >
                  {avgHeight.toFixed(0)} cm
                </motion.span>
              </div>
              <div className="h-4 rounded-md bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-600"
                  initial={false}
                  animate={{ width: `${Math.min(100, ((avgHeight - 130) / 50) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-foreground/60 leading-relaxed">
            💡 While the data is still dirty, these numbers are <b>skewed</b> (a 999cm height drags the average sky-high).
            That's why AI needs a "data detective" before it can learn!
          </p>
        </div>
      </div>

      <BestMatchPick
        title="🩺 Activity 2 · Diagnose the data error type"
        hint="What's wrong with each cell below? Pick the right category so the data doctor prescribes the right fix."
        accent="from-primary to-emerald-600"
        border="border-primary/40"
        options={[
          { id: "missing", label: "⬜ Missing" },
          { id: "outlier", label: "🚨 Outlier" },
          { id: "duplicate", label: "🔁 Duplicate" },
          { id: "invalid", label: "❌ Invalid" },
        ]}
        items={[
          { prompt: "The 'Name' column is completely blank", correctId: "missing" },
          { prompt: "A student's height = 999 cm", correctId: "outlier" },
          { prompt: "Age = -5 (a negative number)", correctId: "invalid" },
          { prompt: "The same student appears 3 times", correctId: "duplicate" },
          { prompt: "Score = 99 on a 0-10 scale", correctId: "outlier" },
          { prompt: "An email with no @ symbol (not a valid format)", correctId: "invalid" },
        ]}
      />

      <BonusGames
        tfItems={DD_TF}
        matchPairs={DD_PAIRS}
        accent="from-primary to-emerald-600"
        border="border-primary/40"
      />
    </div>
  );
};

export default DataDetectiveSandbox;
