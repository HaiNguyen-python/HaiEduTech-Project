/**
 * GraduationSandbox - pick a presentation topic, then generate a holographic
 * graduation certificate modal with the signed-in user's name (printable).
 */
import { useEffect, useState } from "react";
import { GraduationCap, Printer, X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfileName } from "@/hooks/useDisplayName";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

const GR_TF = [
  { q: "Finishing a capstone project helps you pull together everything you learned.", a: true },
  { q: "You don't need to practice before presenting a project.", a: false, why: "Practicing first builds confidence and sharpens your message." },
  { q: "A good project topic should solve a real-world problem.", a: true },
  { q: "You can print your AI Academy certificate to show your parents.", a: true },
  { q: "Once you finish learning AI, there's nothing left to learn.", a: false, why: "AI changes every month - it takes lifelong learning to keep up." },
];
const GR_PAIRS = [
  { a: "Capstone", b: "A final project that wraps up the whole course" },
  { a: "Pitch", b: "A short presentation of your idea" },
  { a: "Portfolio", b: "A collection of projects to show off" },
  { a: "Lifelong learning", b: "The mindset of learning forever" },
];

const TOPICS = [
  { id: "vision", label: "Computer Vision for FaceID", emoji: "👁️" },
  { id: "nlp", label: "A smart chatbot", emoji: "💬" },
  { id: "genai", label: "A creative content assistant", emoji: "✨" },
  { id: "agent", label: "An AI agent that automates studying", emoji: "🤖" },
  { id: "smart", label: "Smart City traffic solutions", emoji: "🏙️" },
];

const GraduationSandbox = () => {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("HaiEduTech Student");

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const meta = data.user.user_metadata as { full_name?: string } | undefined;
      // Saved profile name wins over OAuth metadata.
      const saved = await fetchProfileName(data.user.id);
      const fn = saved || meta?.full_name || data.user.email?.split("@")[0];
      if (fn) setName(fn);
    });
  }, []);

  const print = () => window.print();

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        🎓 Pick a project topic, then generate your <b>AI Academy Diploma</b> with your name on it.
      </p>

      <div className="grid grid-cols-1 gap-1.5">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTopic(t)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border-2 transition text-left ${
              topic.id === t.id
                ? "border-fuchsia-500 bg-fuchsia-500/10"
                : "border-border hover:border-fuchsia-300"
            }`}
          >
            <span className="text-lg">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 via-fuchsia-500 to-purple-600 shadow-lg active:scale-95"
      >
        <Sparkles className="w-4 h-4 inline mr-1" />
        Generate diploma
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur p-4 print:bg-white print:p-0"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-10 text-center shadow-2xl bg-gradient-to-br from-amber-50 via-fuchsia-50 to-cyan-50 border-4 border-double border-amber-400 print:border-amber-600"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white print:hidden"
            >
              <X className="w-4 h-4" />
            </button>

            <GraduationCap className="w-12 h-12 mx-auto text-fuchsia-600" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-700 mt-2">
              HaiEduTech · AI Academy
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl bg-gradient-to-r from-amber-600 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent mt-2">
              AI Diploma
            </h2>
            <p className="text-sm text-slate-700 mt-4">Awarded to</p>
            <p className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
              {name}
            </p>
            <p className="text-sm text-slate-700 mt-4 max-w-md mx-auto">
              For excellently completing every stage of AI Academy and successfully defending the project:
            </p>
            <p className="font-bold text-base sm:text-lg text-fuchsia-700 mt-1">
              {topic.emoji} {topic.label}
            </p>

            <div className="mt-6 flex items-end justify-between gap-3 text-[11px] text-slate-600">
              <div className="text-left">
                <div className="border-t border-slate-400 pt-1 w-32">Date issued</div>
                <div>{new Date().toLocaleDateString("en-US")}</div>
              </div>
              <div className="text-4xl">🏆</div>
              <div className="text-right">
                <div className="border-t border-slate-400 pt-1 w-32">Mr. Nguyen Hai</div>
                <div>Founder · HaiEduTech</div>
              </div>
            </div>

            <button
              onClick={print}
              className="mt-6 px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-fuchsia-600 shadow active:scale-95 print:hidden"
            >
              <Printer className="w-4 h-4 inline mr-1" /> Print diploma
            </button>
          </div>
        </div>
      )}

      <ChipFilter
        title="🎤 The 5-minute pitch deck structure"
        hint="A killer pitch has a few core slides. Turn on each one to raise your pitch score."
        baseline={10}
        positive
        goal={80}
        goodLabel="Your pitch is convincing enough now ✅"
        badLabel="Still missing key slides - turn on a few more"
        metricLabel="Pitch Score"
        accent="from-amber-500 to-fuchsia-600"
        border="border-amber-400/40"
        options={[
          { id: "1", label: "🎯 The real problem", weight: 18 },
          { id: "2", label: "💡 The AI solution", weight: 18 },
          { id: "3", label: "🎬 Live demo", weight: 18 },
          { id: "4", label: "📊 Results and data", weight: 14 },
          { id: "5", label: "👥 Team and thanks", weight: 12 },
          { id: "6", label: "📞 Call to action / contact", weight: 10 },
        ]}
      />

      <BestMatchPick
        title="🧠 Full-course review - do you remember?"
        hint="Which AI Academy stage does each description belong to?"
        accent="from-amber-500 to-fuchsia-600"
        border="border-amber-400/40"
        options={[
          { id: "vision", label: "Computer Vision" },
          { id: "nlp", label: "NLP" },
          { id: "nn", label: "Neural Net" },
          { id: "genai", label: "Generative AI" },
          { id: "rl", label: "Reinforcement" },
          { id: "ethics", label: "Ethics" },
          { id: "deepfake", label: "Deepfake" },
          { id: "agent", label: "AI Agent" },
        ]}
        items={[
          { prompt: "AI recognizes faces for iPhone FaceID", correctId: "vision" },
          { prompt: "A chatbot understands slang like 'idk' meaning 'I don't know'", correctId: "nlp" },
          { prompt: "A multi-layer network of neurons adjusts its weights when it's wrong", correctId: "nn" },
          { prompt: "ChatGPT writes text, Midjourney draws images from a prompt", correctId: "genai" },
          { prompt: "A self-driving car learns through Reward and Punishment", correctId: "rl" },
          { prompt: "Amazon scrapped a hiring AI because it was biased against women", correctId: "ethics" },
          { prompt: "Swapping someone's face onto a video - needs forensic checks", correctId: "deepfake" },
          { prompt: "Planning multiple steps on its own and calling a tool to book a flight", correctId: "agent" },
        ]}
      />

      <BonusGames tfItems={GR_TF} matchPairs={GR_PAIRS} accent="from-amber-500 to-fuchsia-600" border="border-amber-400/40" />
    </div>
  );
};

export default GraduationSandbox;
