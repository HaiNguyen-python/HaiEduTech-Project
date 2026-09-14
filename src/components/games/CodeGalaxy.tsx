/**
 * CodeGalaxy - programming-snippet sorting mini-game.
 * Embedded in the Programming Arcade hub. Three tracks: Foundations,
 * Data Engineering, AI / ML.
 */
import { useEffect, useRef, useState } from "react";
import { finishGame } from "@/lib/gameSession";
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
      { snippet: "for row in rows:", category: "Loop" },
      { snippet: "else:", category: "Conditional" },
      { snippet: "def __init__(self, name):", category: "Function" },
      { snippet: "class Order(models.Model):", category: "Class" },
      { snippet: "break", category: "Loop" },
      { snippet: "lambda x: x * 2", category: "Function" },
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
      { snippet: "HAVING COUNT(*) > 5", category: "SQL" },
      { snippet: "df.pivot_table(index='city')", category: "Pandas" },
      { snippet: "spark.sql('SELECT 1')", category: "Spark" },
      { snippet: "df.write.mode('overwrite').parquet(path)", category: "Spark" },
      { snippet: "ORDER BY created_at DESC", category: "SQL" },
      { snippet: "df.drop_duplicates(subset=['id'])", category: "Pandas" },
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
      { snippet: "optimizer.zero_grad()", category: "Training" },
      { snippet: "nltk.word_tokenize(sentence)", category: "NLP" },
      { snippet: "nn.Dropout(0.2)", category: "Model" },
      { snippet: "trainer.train()", category: "Training" },
      { snippet: "pipeline('sentiment-analysis')", category: "NLP" },
      { snippet: "nn.LSTM(256, 128)", category: "Model" },
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
  const savedRef = useRef(false);
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

  const reset = (k?: TrackKey) => { savedRef.current = false; setIdx(0); setScore(0); if (k) setTrack(k); };

  const done = idx >= t.items.length;

  // Save the finished track once so it shows up on the leaderboards
  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      void finishGame({ gameType: `code_galaxy_${track}`, score });
    }
  }, [done, score, track]);

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
        <Badge variant="outline" className="border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] text-base text-[hsl(var(--arcade-text))]"><Trophy className="mr-1 h-4 w-4 text-[hsl(var(--arcade-gold))]" /> {score} XP</Badge>
      </div>

      <div className={`arcade-game-panel relative overflow-hidden p-5 transition-colors sm:p-6 ${
        flash === "ok" ? "ring-2 ring-emerald-400" : flash === "no" ? "ring-2 ring-red-400" : ""
      }`}>
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.4),transparent_40%),radial-gradient(circle_at_80%_60%,hsl(var(--accent)/0.4),transparent_40%)]" />
        <div className="relative">
          {!done ? (
            <>
              <p className="mb-2 text-xs uppercase tracking-widest text-emerald-300">Snippet {idx + 1} / {t.items.length}</p>
              <div className="arcade-terminal p-4 font-mono text-base text-[hsl(var(--arcade-green))] shadow-inner sm:text-lg">
                <span className="text-emerald-500">$ </span>{item.snippet}
              </div>
              <p className="mt-4 text-sm text-[hsl(var(--arcade-text))]">Which category does this snippet belong to?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <Button
                    key={c}
                    onClick={() => choose(c)}
                    variant="outline"
                    className="min-h-11 border-[hsl(var(--arcade-green)/0.45)] bg-[hsl(var(--arcade-green)/0.1)] text-[hsl(var(--arcade-text))] hover:bg-[hsl(var(--arcade-green)/0.22)] hover:text-[hsl(var(--arcade-text))]"
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center text-[hsl(var(--arcade-text))]">
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
