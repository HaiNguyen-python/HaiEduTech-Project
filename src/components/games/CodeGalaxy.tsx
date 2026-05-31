/**
 * CodeGalaxy - programming-snippet sorting mini-game.
 * Embedded in the Programming Arcade hub. Three tracks: Foundations,
 * Data Engineering, AI / ML.
 */
import { useState } from "react";
import { Rocket, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CODE_TRACKS = {
  foundations: {
    label: "Foundations",
    items: [
      { snippet: "for i in range(10):", category: "Loop" },
      { snippet: "if x > 0:", category: "Conditional" },
      { snippet: "def greet(name):", category: "Function" },
      { snippet: "class User:", category: "Class" },
      { snippet: "while running:", category: "Loop" },
      { snippet: "return total", category: "Function" },
      { snippet: "elif user.is_admin:", category: "Conditional" },
      { snippet: "class Animal(Base):", category: "Class" },
    ],
    categories: ["Loop", "Conditional", "Function", "Class"],
  },
  data: {
    label: "Data Engineering",
    items: [
      { snippet: "SELECT * FROM orders", category: "SQL" },
      { snippet: "df.groupby('city')", category: "Pandas" },
      { snippet: "spark.read.parquet(...)", category: "Spark" },
      { snippet: "JOIN customers c ON c.id = o.cid", category: "SQL" },
      { snippet: "df.merge(other, on='id')", category: "Pandas" },
      { snippet: "rdd.flatMap(lambda x: ...)", category: "Spark" },
      { snippet: "GROUP BY country", category: "SQL" },
      { snippet: "df['total'].fillna(0)", category: "Pandas" },
    ],
    categories: ["SQL", "Pandas", "Spark"],
  },
  ai: {
    label: "AI / ML",
    items: [
      { snippet: "model.fit(X, y)", category: "Training" },
      { snippet: "loss.backward()", category: "Training" },
      { snippet: "tokenizer.encode(text)", category: "NLP" },
      { snippet: "torch.nn.Linear(128, 64)", category: "Model" },
      { snippet: "softmax(logits)", category: "Model" },
      { snippet: "AutoModel.from_pretrained(...)", category: "NLP" },
      { snippet: "optimizer.step()", category: "Training" },
      { snippet: "nn.Conv2d(3, 16, 3)", category: "Model" },
    ],
    categories: ["Training", "NLP", "Model"],
  },
} as const;

type TrackKey = keyof typeof CODE_TRACKS;

interface Props {
  onExit?: () => void;
  onScore?: (delta: number) => void;
}

export default function CodeGalaxy({ onExit, onScore }: Props) {
  const [track, setTrack] = useState<TrackKey>("foundations");
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const t = CODE_TRACKS[track];
  const item = t.items[idx];

  const choose = (cat: string) => {
    if (!item) return;
    if (cat === item.category) {
      setScore((s) => s + 15);
      onScore?.(15);
      setFlash("ok");
    } else {
      setFlash("no");
    }
    setTimeout(() => {
      setFlash(null);
      setIdx((i) => i + 1);
    }, 350);
  };

  const reset = (k?: TrackKey) => { setIdx(0); setScore(0); if (k) setTrack(k); };

  const done = idx >= t.items.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 items-center">
          {onExit && (
            <Button variant="ghost" size="sm" onClick={onExit}><ArrowLeft className="w-4 h-4 mr-1" />Menu</Button>
          )}
          {(Object.keys(CODE_TRACKS) as TrackKey[]).map((k) => (
            <Button key={k} size="sm" variant={track === k ? "default" : "outline"} onClick={() => reset(k)}>
              {CODE_TRACKS[k].label}
            </Button>
          ))}
        </div>
        <Badge variant="outline" className="text-base"><Trophy className="mr-1 h-4 w-4" /> {score} XP</Badge>
      </div>

      <div className={`relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-emerald-950/60 to-slate-900 p-6 transition-colors ${
        flash === "ok" ? "ring-2 ring-emerald-400" : flash === "no" ? "ring-2 ring-red-400" : ""
      }`}>
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.4),transparent_40%),radial-gradient(circle_at_80%_60%,hsl(var(--accent)/0.4),transparent_40%)]" />
        <div className="relative">
          {!done ? (
            <>
              <p className="mb-2 text-xs uppercase tracking-widest text-emerald-300">Snippet {idx + 1} / {t.items.length}</p>
              <div className="rounded-lg border border-emerald-400/30 bg-black/60 p-4 font-mono text-lg text-emerald-200 shadow-inner">
                <span className="text-emerald-500">$ </span>{item.snippet}
              </div>
              <p className="mt-4 text-sm text-white/80">Which category does this snippet belong to?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => choose(c)}
                    className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:scale-105 hover:bg-emerald-500/30"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center text-white">
              <Rocket className="h-10 w-10 text-emerald-300" />
              <h3 className="text-xl font-bold">Track Complete!</h3>
              <p className="text-sm text-white/80">Final score: <span className="font-bold text-emerald-300">{score} XP</span></p>
              <Button onClick={() => reset()} className="bg-emerald-500 text-white hover:bg-emerald-600">
                Replay
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
