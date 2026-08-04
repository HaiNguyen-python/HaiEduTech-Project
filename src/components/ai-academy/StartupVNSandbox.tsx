/**
 * StartupVNSandbox - From idea to MVP for Vietnamese teen founders.
 * Students assemble a startup canvas (problem + solution + model + GTM)
 * and try to maximize an investor score.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

const SU_TF = [
  { q: "MVP = Minimum Viable Product - the smallest version that solves the problem.", a: true },
  { q: "VinAI, Got It, Misa, and ELSA Speak are all successful Vietnamese-founded AI startups.", a: true },
  { q: "A startup must have $1 million USD in initial funding.", a: false, why: "Many Vietnamese startups begin with under 100 million VND." },
  { q: "Lean Startup advises: Build → Measure → Learn, continuously.", a: true },
  { q: "A 10-slide pitch deck is the international standard for a seed round.", a: true },
];
const SU_PAIRS = [
  { a: "MVP", b: "Smallest viable version of a product" },
  { a: "PMF", b: "Product-Market Fit" },
  { a: "Pivot", b: "Changing direction when the old model fails" },
  { a: "Burn rate", b: "Speed of spending cash each month" },
  { a: "Runway", b: "Months of survival left with current cash" },
];

type Component = { id: string; label: string; weight: number };
const PROBLEM: Component[] = [
  { id: "p1", label: "A clear, measurable problem", weight: 18 },
  { id: "p2", label: "Over 1 million people in Vietnam face this problem", weight: 14 },
  { id: "p3", label: "Users are WILLING to pay to solve it", weight: 16 },
];
const SOLUTION: Component[] = [
  { id: "s1", label: "Actually uses AI, not just claims to have AI", weight: 14 },
  { id: "s2", label: "MVP buildable in 1 month", weight: 12 },
  { id: "s3", label: "10x better experience than the old way", weight: 16 },
];
const GTM: Component[] = [
  { id: "g1", label: "Distribution channel: TikTok / Zalo OA / schools", weight: 10 },
  { id: "g2", label: "Clear pricing model (Freemium / SaaS)", weight: 12 },
  { id: "g3", label: "100 test users before raising funding", weight: 14 },
];

const StartupVNSandbox = () => {
  const [problem, setProblem] = useState<Set<string>>(new Set());
  const [solution, setSolution] = useState<Set<string>>(new Set());
  const [gtm, setGtm] = useState<Set<string>>(new Set());
  const [team, setTeam] = useState(3);

  const toggle = (set: Set<string>, setter: (n: Set<string>) => void, id: string) => {
    const n = new Set(set);
    n.has(id) ? n.delete(id) : n.add(id);
    setter(n);
  };

  const score = useMemo(() => {
    const sum = (list: Component[], picked: Set<string>) =>
      list.reduce((s, it) => s + (picked.has(it.id) ? it.weight : 0), 0);
    const base = sum(PROBLEM, problem) + sum(SOLUTION, solution) + sum(GTM, gtm) + team * 4;
    return Math.min(100, base);
  }, [problem, solution, gtm, team]);

  const verdict =
    score >= 80 ? { t: "🏆 An investor would fund your seed round!", c: "from-emerald-500 to-teal-600", k: "text-emerald-600" } :
    score >= 55 ? { t: "🤝 Promising - needs more data", c: "from-amber-500 to-orange-500", k: "text-amber-600" } :
                  { t: "⚠️ Not convincing yet - rework your MVP", c: "from-rose-500 to-pink-500", k: "text-rose-600" };

  const Row = ({ title, list, picked, setter }: { title: string; list: Component[]; picked: Set<string>; setter: (n: Set<string>) => void }) => (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-xs font-bold text-foreground mb-2">{title}</div>
      <div className="flex flex-wrap gap-1.5">
        {list.map((c) => {
          const on = picked.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(picked, setter, c.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border-2 transition active:scale-95 ${
                on
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent shadow"
                  : "bg-card text-foreground border-border hover:border-orange-400/60"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-orange-400/40 bg-gradient-to-br from-orange-500/10 to-rose-500/10 p-3">
        <h4 className="text-sm font-bold text-orange-700 dark:text-orange-300 mb-1 flex items-center gap-1">
          <Rocket className="w-4 h-4" /> Mini Lean Canvas - build your own Vietnamese AI startup
        </h4>
        <p className="text-xs text-muted-foreground">Pick the building blocks of your idea. An investor will score the final result.</p>
      </div>

      <Row title="🎯 1. Problem" list={PROBLEM} picked={problem} setter={setProblem} />
      <Row title="💡 2. AI Solution" list={SOLUTION} picked={solution} setter={setSolution} />
      <Row title="📣 3. Go-To-Market" list={GTM} picked={gtm} setter={setGtm} />

      <div className="p-3 rounded-xl border bg-card">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>👥 Team: engineering + business + design</span>
          <span className="font-bold text-orange-600">{team} people</span>
        </div>
        <Slider value={[team]} min={1} max={5} step={1} onValueChange={(v) => setTeam(v[0])} />
      </div>

      <motion.div
        key={score}
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-2xl border-2 p-4 text-center bg-gradient-to-br ${verdict.c} text-white shadow-lg`}
      >
        <div className="text-[11px] uppercase tracking-widest opacity-90">Investor Score</div>
        <div className="text-5xl font-black">{score}<span className="text-xl">/100</span></div>
        <div className="text-sm font-bold mt-1">{verdict.t}</div>
      </motion.div>

      <ChipFilter
        title="🏢 Learn from successful Vietnamese AI startups"
        hint="Toggle on the factors that truly helped Vietnamese AI startups succeed."
        baseline={15}
        positive
        goal={80}
        goodLabel="You've grasped the success formula ✅"
        badLabel="A few key factors are still off"
        metricLabel="Startup knowledge"
        accent="from-orange-500 to-rose-600"
        border="border-orange-400/40"
        options={[
          { id: "1", label: "✅ ELSA Speak: AI English pronunciation coach for Vietnamese learners", weight: 18 },
          { id: "2", label: "✅ Misa AVA: AI for SME accounting - solves a real pain point", weight: 16 },
          { id: "3", label: "✅ VinAI ViT5: an NLP model built specifically for Vietnamese", weight: 16 },
          { id: "4", label: "✅ Got It: AI tutoring platform exported to the US market", weight: 14 },
          { id: "5", label: "❌ Copy ChatGPT exactly and sell it at a higher price", weight: -20 },
          { id: "6", label: "❌ Raise funding before having a single paying user", weight: -15 },
        ]}
      />

      <BestMatchPick
        title="🚀 Which Vietnamese AI product solves which problem?"
        hint="Match each startup to the pain point it solves."
        accent="from-orange-500 to-rose-600"
        border="border-orange-400/40"
        options={[
          { id: "elsa", label: "ELSA Speak" },
          { id: "misa", label: "Misa AVA" },
          { id: "kiki", label: "Zalo Kiki" },
          { id: "got", label: "Got It" },
        ]}
        items={[
          { prompt: "Vietnamese speakers struggle to be understood in English - need pronunciation practice", correctId: "elsa" },
          { prompt: "SME accountants spend 5 hours a day manually entering invoices", correctId: "misa" },
          { prompt: "Vietnamese drivers can't use their hands to tap the phone while driving", correctId: "kiki" },
          { prompt: "US students need an on-demand AI tutor 24/7", correctId: "got" },
        ]}
      />

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" />
        Mr. Hai's secret: every successful Vietnamese AI startup solves a problem that's deeply <b>local</b> (Vietnamese language, culture, SME workflows). Don't try to build "ChatGPT for Vietnam" - find the problem ChatGPT CAN'T solve.
      </p>

      <BonusGames tfItems={SU_TF} matchPairs={SU_PAIRS} accent="from-orange-500 to-rose-600" border="border-orange-400/40" />
    </div>
  );
};

export default StartupVNSandbox;
