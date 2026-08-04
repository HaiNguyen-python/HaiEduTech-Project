/**
 * CareersMapSandbox - Pick 2-3 interests, highlight matching AI careers in Vietnam
 * with salary ranges. Helps students see "AI is for me too".
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const INTERESTS = [
  { id: "math", label: "Math / Logic", emoji: "🔢" },
  { id: "art", label: "Drawing / Design", emoji: "🎨" },
  { id: "lang", label: "Language / Writing", emoji: "📝" },
  { id: "code", label: "Code / Computers", emoji: "💻" },
  { id: "people", label: "Communication / Psychology", emoji: "🤝" },
  { id: "game", label: "Games / Creativity", emoji: "🎮" },
];

type Career = { name: string; salary: string; company: string; needs: string[] };
const CAREERS: Career[] = [
  { name: "AI / ML Engineer", salary: "$1,200-3,200/month", company: "VinAI, FPT.AI, Zalo, VNG", needs: ["math", "code"] },
  { name: "Data Scientist", salary: "$1,000-2,400/month", company: "MoMo, Shopee, Tiki", needs: ["math", "code"] },
  { name: "Prompt Engineer", salary: "$800-2,000/month", company: "Almost any AI startup", needs: ["lang", "code"] },
  { name: "AI Product Manager", salary: "$1,600-4,000/month", company: "Vingroup, FPT", needs: ["people", "code"] },
  { name: "AI UX / Designer", salary: "$800-1,800/month", company: "Canva, Lovable, Figma", needs: ["art", "people"] },
  { name: "Generative AI Artist", salary: "$600-1,600/month", company: "Ad agencies, film studios", needs: ["art", "game"] },
  { name: "Game AI Developer", salary: "$1,000-2,200/month", company: "VNG, Sky Mavis", needs: ["code", "game"] },
  { name: "Conversational AI Linguist", salary: "$800-1,600/month", company: "Zalo, Kiki, Sun*", needs: ["lang", "people"] },
];

const TF = [
  { q: "You need strong coding skills to work in any AI career.", a: false, why: "Roles like Prompt Engineer, AI PM, and AI Linguist don't require heavy coding." },
  { q: "VinAI, FPT.AI, and Zalo AI Lab are leading AI companies in Vietnam.", a: true },
  { q: "Learning AI in high school makes it easier to enter the field later.", a: true },
  { q: "AI engineer salaries in Vietnam are much higher than many other fields.", a: true },
];
const PAIRS = [
  { a: "VinAI Research", b: "Vingroup - Computer Vision" },
  { a: "Zalo AI Lab", b: "Kiki, a Vietnamese-language chatbot" },
  { a: "FPT.AI", b: "Virtual assistants for businesses" },
  { a: "Sky Mavis", b: "Axie Infinity - Game AI" },
];

const CareersMapSandbox = () => {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setPicked((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const matches = CAREERS
    .map((c) => ({ ...c, score: c.needs.filter((n) => picked.has(n)).length }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-violet-400/40 bg-violet-500/5 p-3">
        <h4 className="text-sm font-bold text-violet-700 dark:text-violet-300 mb-2 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> What do you enjoy? (pick 2-3)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INTERESTS.map((it) => (
            <button
              key={it.id}
              onClick={() => toggle(it.id)}
              className={`p-2.5 rounded-xl border-2 text-sm font-medium transition ${
                picked.has(it.id)
                  ? "border-violet-500 bg-violet-500/20 text-violet-700 dark:text-violet-200"
                  : "border-border bg-card hover:border-violet-400/40"
              }`}
            >
              <div className="text-xl">{it.emoji}</div>
              {it.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-emerald-600" /> AI careers that fit you:
        </h4>
        {picked.size === 0 ? (
          <p className="text-sm text-muted-foreground italic">Pick some interests to see career suggestions.</p>
        ) : matches.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No matches yet - try a different combination of interests.</p>
        ) : (
          <ul className="space-y-2">
            {matches.map((c, i) => (
              <motion.li
                key={c.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">{c.name}</span>
                  <span className="text-xs text-amber-600 font-bold">💰 {c.salary}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">VN companies: {c.company}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <BestMatchPick
        title="🛤️ Sort each milestone into the right stage of the journey"
        hint="Which stage of the high-school-to-first-job AI journey does each milestone belong to?"
        accent="from-violet-500 to-fuchsia-600"
        border="border-violet-400/40"
        options={[
          { id: "hs", label: "🎒 High school" },
          { id: "uni", label: "🎓 University" },
          { id: "first", label: "💼 First job" },
        ]}
        items={[
          { prompt: "Learn basic Python, try Teachable Machine, build one small project on Lovable", correctId: "hs" },
          { prompt: "Score IELTS 6.5+, study probability, start a GitHub, join an AI Olympiad", correctId: "hs" },
          { prompt: "Get into an AI program at FPT/BK/UIT, publish projects on GitHub, join an AI hackathon", correctId: "uni" },
          { prompt: "Intern at VinAI / Zalo / MISA, read research papers, write a technical blog", correctId: "uni" },
          { prompt: "Junior AI/ML Engineer or Prompt Engineer earning $1,000-1,600/month", correctId: "first" },
        ]}
      />

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-violet-500 to-fuchsia-600" border="border-violet-400/40" />
    </div>
  );
};

export default CareersMapSandbox;
