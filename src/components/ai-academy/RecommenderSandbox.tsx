/**
 * RecommenderSandbox — "Mini Netflix"
 * Student rates a few movies; the toy recommender computes a genre vector
 * from their ratings and recommends unseen movies whose genre vector is
 * closest (cosine-like dot product). Demonstrates collaborative-/content-
 * based filtering in a kid-friendly way.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, ThumbsUp } from "lucide-react";

type Movie = {
  id: string; title: string; emoji: string;
  // genre weights: action, comedy, romance, scifi, anime
  v: [number, number, number, number, number];
};

const SEED: Movie[] = [
  { id: "a", title: "Avengers", emoji: "🦸", v: [1.0, 0.3, 0.1, 0.8, 0.0] },
  { id: "b", title: "Doraemon", emoji: "🐱", v: [0.2, 0.9, 0.2, 0.4, 1.0] },
  { id: "c", title: "Titanic", emoji: "🚢", v: [0.0, 0.1, 1.0, 0.0, 0.0] },
  { id: "d", title: "Interstellar", emoji: "🚀", v: [0.4, 0.0, 0.3, 1.0, 0.0] },
];

const RECS: Movie[] = [
  { id: "r1", title: "Spider-Man", emoji: "🕷️", v: [0.95, 0.4, 0.3, 0.7, 0.2] },
  { id: "r2", title: "Conan thám tử", emoji: "🕵️", v: [0.5, 0.6, 0.1, 0.2, 0.95] },
  { id: "r3", title: "La La Land", emoji: "🎬", v: [0.0, 0.5, 0.9, 0.0, 0.0] },
  { id: "r4", title: "Dune", emoji: "🏜️", v: [0.6, 0.0, 0.2, 1.0, 0.0] },
  { id: "r5", title: "Your Name", emoji: "🌠", v: [0.1, 0.3, 0.8, 0.5, 1.0] },
  { id: "r6", title: "Fast & Furious", emoji: "🏎️", v: [1.0, 0.4, 0.2, 0.1, 0.0] },
];

const GENRES = ["Hành động", "Hài", "Tình cảm", "Sci-Fi", "Anime"];

const RecommenderSandbox = () => {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const profile = useMemo(() => {
    const vec = [0, 0, 0, 0, 0];
    let total = 0;
    SEED.forEach((m) => {
      const r = ratings[m.id] ?? 0;
      if (r > 0) {
        const w = (r - 3) / 2; // -1..+1
        m.v.forEach((g, i) => { vec[i] += g * w; });
        total += Math.abs(w);
      }
    });
    if (total === 0) return null;
    const max = Math.max(...vec.map(Math.abs), 0.001);
    return vec.map((v) => v / max);
  }, [ratings]);

  const recs = useMemo(() => {
    if (!profile) return [];
    return [...RECS]
      .map((m) => {
        const score = m.v.reduce((acc, g, i) => acc + g * profile[i], 0);
        return { ...m, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [profile]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-rose-400/40 bg-gradient-to-br from-rose-500/5 to-orange-500/5 p-3">
        <div className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-300 mb-2">
          ① Chấm điểm 4 phim bạn đã xem
        </div>
        <div className="space-y-2">
          {SEED.map((m) => (
            <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg bg-background border">
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-sm font-semibold flex-1">{m.title}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRatings((r) => ({ ...r, [m.id]: s }))}
                    className="active:scale-90 transition"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        s <= (ratings[m.id] ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {profile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border-2 border-purple-400/40 bg-purple-500/5 p-3">
          <div className="text-[11px] font-bold uppercase text-purple-700 dark:text-purple-300 mb-2">
            ② AI đoán bạn thích thể loại nào
          </div>
          <div className="space-y-1.5">
            {GENRES.map((g, i) => {
              const v = profile[i];
              const pct = Math.round(((v + 1) / 2) * 100);
              return (
                <div key={g} className="flex items-center gap-2">
                  <span className="text-xs w-20 shrink-0">{g}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className={`h-full ${v >= 0 ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-rose-400 to-rose-600"}`}
                    />
                  </div>
                  <span className="text-[10px] w-10 text-right font-mono text-muted-foreground">
                    {v >= 0 ? "+" : ""}{(v * 100).toFixed(0)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {recs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border-2 border-emerald-400/40 bg-emerald-500/5 p-3">
          <div className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> ③ AI gợi ý cho bạn
          </div>
          <div className="grid grid-cols-3 gap-2">
            {recs.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-card border-2 border-emerald-400/40 p-2 text-center"
              >
                <div className="text-3xl mb-1">{r.emoji}</div>
                <div className="text-xs font-bold leading-tight">{r.title}</div>
                <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center justify-center gap-0.5">
                  <ThumbsUp className="w-2.5 h-2.5" /> {Math.round((r.score + 1) * 50)}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <p className="text-xs text-muted-foreground">
        💡 Netflix, YouTube, TikTok dùng <b>vector sở thích</b> kiểu này — nhưng với hàng triệu phim/clip và hàng tỷ người dùng.
      </p>
    </div>
  );
};

export default RecommenderSandbox;
