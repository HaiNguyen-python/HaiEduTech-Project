/**
 * RecsysSandbox - "Smart feed builder"
 * A list of user personas with interest vectors and a content library with
 * topic vectors. A similarity-threshold slider gates which items are
 * recommended (cosine similarity). Live hit-rate updates teach how feed
 * algorithms work.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

const REC_TF = [
  { q: "TikTok & YouTube use recommender systems to choose videos for you.", a: true },
  { q: "Recommender systems measure similarity using cosine similarity.", a: true },
  { q: "A threshold that's too high creates a 'filter bubble'.", a: true, why: "You only see content matching your existing interests - low diversity." },
  { q: "An interest vector only has a single number.", a: false, why: "A vector has many dimensions (sports, music, science...)." },
  { q: "Spotify's music recommendations use the same underlying principle.", a: true },
];
const REC_PAIRS = [
  { a: "Cosine similarity", b: "Measures how alike two vectors are" },
  { a: "User vector", b: "A user's interests represented as numbers" },
  { a: "Filter bubble", b: "Being stuck seeing only familiar content" },
  { a: "Hit rate", b: "% of content recommended" },
];

const TOPICS = ["⚽ Sports", "🎮 Gaming", "🎵 Music", "🔬 Science", "🎨 Art"];

type Vec5 = [number, number, number, number, number];

const PERSONAS: { id: string; emoji: string; name: string; v: Vec5 }[] = [
  { id: "p1", emoji: "👦", name: "Jake (gamer)",         v: [0.2, 1.0, 0.4, 0.1, 0.1] },
  { id: "p2", emoji: "👧", name: "Mia (music lover)",    v: [0.1, 0.2, 1.0, 0.1, 0.6] },
  { id: "p3", emoji: "🧑", name: "Kai (science nerd)",   v: [0.1, 0.3, 0.2, 1.0, 0.3] },
  { id: "p4", emoji: "👩", name: "Lina (painter)",       v: [0.0, 0.1, 0.4, 0.3, 1.0] },
];

const CONTENT: { id: string; emoji: string; title: string; v: Vec5 }[] = [
  { id: "c1", emoji: "⚽", title: "World Cup highlights",    v: [1.0, 0.1, 0.2, 0.0, 0.1] },
  { id: "c2", emoji: "🎮", title: "Minecraft build tips",    v: [0.1, 1.0, 0.1, 0.2, 0.2] },
  { id: "c3", emoji: "🎼", title: "Acoustic guitar cover",   v: [0.0, 0.0, 1.0, 0.0, 0.5] },
  { id: "c4", emoji: "🚀", title: "NASA rocket launch",      v: [0.1, 0.2, 0.0, 1.0, 0.1] },
  { id: "c5", emoji: "🖼️", title: "Van Gogh exhibit tour",  v: [0.0, 0.0, 0.3, 0.2, 1.0] },
  { id: "c6", emoji: "🏀", title: "NBA skills highlights",   v: [0.9, 0.1, 0.2, 0.0, 0.1] },
  { id: "c7", emoji: "🎧", title: "Lo-fi study beats",       v: [0.0, 0.1, 0.8, 0.1, 0.3] },
  { id: "c8", emoji: "🤖", title: "Self-driving car AI",     v: [0.0, 0.4, 0.0, 0.9, 0.2] },
];

const cosine = (a: Vec5, b: Vec5) => {
  const dot = a.reduce((s, x, i) => s + x * b[i], 0);
  const ma = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
  const mb = Math.sqrt(b.reduce((s, x) => s + x * x, 0));
  return ma && mb ? dot / (ma * mb) : 0;
};

const RecsysSandbox = () => {
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const [threshold, setThreshold] = useState(50);

  const active = PERSONAS.find((p) => p.id === activeId)!;

  const scored = useMemo(
    () => CONTENT.map((c) => ({ ...c, score: cosine(active.v, c.v) })).sort((a, b) => b.score - a.score),
    [active],
  );
  const recs = scored.filter((s) => s.score * 100 >= threshold);
  const hitRate = Math.round((recs.length / CONTENT.length) * 100);

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      {/* Persona picker */}
      <div className="rounded-2xl border-2 border-amber-400/40 bg-amber-500/5 p-3">
        <div className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1">
          <Users className="w-3 h-3" /> ① Pick a user
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`p-2 rounded-xl border-2 text-left transition active:scale-95 ${
                activeId === p.id
                  ? "border-amber-500 bg-amber-500/15"
                  : "border-border bg-card hover:border-amber-400/50"
              }`}
            >
              <div className="text-2xl">{p.emoji}</div>
              <div className="text-xs font-bold leading-tight">{p.name}</div>
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {TOPICS.map((t, i) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-background border">
              {t}: <b>{(active.v[i] * 100).toFixed(0)}%</b>
            </span>
          ))}
        </div>
      </div>

      {/* Threshold */}
      <div className="rounded-2xl border-2 border-orange-400/40 bg-orange-500/5 p-3">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-bold text-orange-700 dark:text-orange-300">② Similarity threshold</span>
          <span className="font-black text-lg text-orange-600">{threshold}%</span>
        </div>
        <Slider value={[threshold]} min={20} max={95} step={5} onValueChange={(v) => setThreshold(v[0])} />
        <div className="mt-2 text-xs text-muted-foreground">
          Higher threshold → AI only recommends content that's <b>extremely</b> close to interests. Too high = low diversity (filter bubble).
        </div>
      </div>

      {/* Live feed */}
      <div className="rounded-2xl border-2 border-rose-400/40 bg-gradient-to-br from-rose-500/5 to-amber-500/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> ③ Recommended feed
          </div>
          <div className="text-xs">
            Hit-rate: <b className="text-rose-600">{hitRate}%</b> ({recs.length}/{CONTENT.length})
          </div>
        </div>
        <div className="space-y-1.5 max-h-56 overflow-y-auto">
          {scored.map((c) => {
            const shown = c.score * 100 >= threshold;
            return (
              <motion.div
                key={c.id}
                animate={{ opacity: shown ? 1 : 0.3, scale: shown ? 1 : 0.96 }}
                className={`flex items-center gap-2 p-2 rounded-lg border ${
                  shown ? "bg-card border-emerald-400/40" : "bg-muted/40 border-border"
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-sm font-semibold flex-1">{c.title}</span>
                <span className={`text-xs font-mono ${shown ? "text-emerald-600" : "text-muted-foreground"}`}>
                  {(c.score * 100).toFixed(0)}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 YouTube & TikTok compute cosine similarity between your <b>interest vector</b> and billions of videos - only videos above the threshold show up in your feed.
      </p>

      <ChipFilter
        title="🎬 Build your own interest vector"
        hint="Pick the topics you often watch on TikTok. More clear signals → AI recommends more accurately (higher similarity)."
        baseline={20}
        positive
        goal={70}
        goodLabel="Your interest vector is clear - AI can recommend accurately!"
        badLabel="AI doesn't know you yet - turn on a few topics you truly like."
        metricLabel="Recommendation accuracy"
        accent="from-orange-500 to-rose-500"
        border="border-orange-400/40"
        options={[
          { id: "sport", label: "⚽ Sports", weight: 14 },
          { id: "game", label: "🎮 Gaming", weight: 14 },
          { id: "music", label: "🎵 Pop music", weight: 12 },
          { id: "food", label: "🍜 Food reviews", weight: 12 },
          { id: "study", label: "📚 Learning English", weight: 16 },
          { id: "tech", label: "💻 Technology", weight: 12 },
        ]}
      />

      <BestMatchPick
        title="🎯 Which recommender algorithm fits best?"
        hint="Which type of recommender does each platform below mainly use?"
        accent="from-orange-500 to-rose-500"
        border="border-orange-400/40"
        options={[
          { id: "content", label: "📄 Content-based" },
          { id: "collab", label: "👥 Collaborative Filtering" },
          { id: "hybrid", label: "🔀 Hybrid" },
          { id: "pop", label: "🔥 Popularity-based" },
        ]}
        items={[
          { prompt: "TikTok For You - learns from videos you watch & like", correctId: "collab" },
          { prompt: "Spotify 'You might also like' based on the genre you're playing", correctId: "content" },
          { prompt: "Today's Top Trending on YouTube", correctId: "pop" },
          { prompt: "Netflix - combines your taste + tastes of similar users", correctId: "hybrid" },
          { prompt: "Shopee 'Similar products' based on description/image", correctId: "content" },
        ]}
      />

      <BonusGames tfItems={REC_TF} matchPairs={REC_PAIRS} accent="from-orange-500 to-rose-500" border="border-orange-400/40" />
    </div>
  );
};

export default RecsysSandbox;
