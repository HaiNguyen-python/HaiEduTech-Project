/**
 * @file PteHub.tsx
 * @description PTE Academic landing page with 4 skill cards + Peak gamification.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, PenTool, BookOpen, Headphones, Trophy, Sparkles, Flame, TrendingUp } from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import PtePeak from "@/components/pte/PtePeak";
import { usePteProgress } from "@/hooks/usePteProgress";
import {
  READ_ALOUD_BANK, REPEAT_SENTENCE_BANK, ESSAY_BANK, SUMMARIZE_TEXT_BANK,
  FILL_BLANK_BANK, REORDER_BANK, DICTATION_BANK, SUMMARIZE_SPOKEN_BANK,
  MOCK_TESTS, REPEATED_2026_IDS,
} from "@/data/pteData";

const SKILL_CARDS = [
  {
    to: "/pte/speaking",
    icon: Mic,
    title: "Speaking",
    subtitle: "Read Aloud · Repeat Sentence",
    desc: "Pronunciation & Oral Fluency scoring with Web Speech API.",
    color: "from-[#003580] to-[#0052cc]",
  },
  {
    to: "/pte/writing",
    icon: PenTool,
    title: "Writing",
    subtitle: "Essay · Summarize Written Text",
    desc: "Word counter, exam timer, AI scoring & saves to your Notebook.",
    color: "from-[#0052cc] to-[#1e40af]",
  },
  {
    to: "/pte/reading",
    icon: BookOpen,
    title: "Reading",
    subtitle: "Fill in the Blanks · Re-order Paragraphs",
    desc: "Drag-and-drop interface with instant content matching.",
    color: "from-[#1e40af] to-[#003580]",
  },
  {
    to: "/pte/listening",
    icon: Headphones,
    title: "Listening",
    subtitle: "Dictation · Summarize Spoken Text",
    desc: "Audio playback with strict input field & string similarity scoring.",
    color: "from-[#0052cc] to-[#003580]",
  },
];

const PteHub = () => {
  const { progress } = usePteProgress();
  const totalTasks =
    READ_ALOUD_BANK.length + REPEAT_SENTENCE_BANK.length + ESSAY_BANK.length +
    SUMMARIZE_TEXT_BANK.length + FILL_BLANK_BANK.length + REORDER_BANK.length +
    DICTATION_BANK.length + SUMMARIZE_SPOKEN_BANK.length;

  return (
    <PteShell
      title="PTE Academic Prep"
      subtitle="Climb to Band 90 across all four skills with AI-powered feedback."
      backTo="/english"
      backLabel="Learn English"
    >
      <PtePeak completed={progress.completedIds.length} total={totalTasks} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {SKILL_CARDS.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={c.to}
              className={`block bg-gradient-to-br ${c.color} text-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 grid place-items-center shrink-0">
                  <c.icon size={26} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  <p className="text-white/85 text-sm">{c.subtitle}</p>
                  <p className="text-white/75 text-xs mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#003580]/15 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="text-[#003580]" size={20} />
          <h2 className="text-lg font-bold text-[#003580]">Mock Tests</h2>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#003580]/10 text-[#003580] font-semibold">
            {MOCK_TESTS.length} sets
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_TESTS.map(mt => (
            <div key={mt.id} className="border border-[#003580]/15 rounded-xl p-4 bg-[#f4f7fb] hover:bg-[#e8eef7] transition-colors">
              <h3 className="font-bold text-[#003580] text-sm">{mt.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mt.description}</p>
              <div className="mt-2 text-[11px] text-slate-500">
                {mt.readAloudIds.length + mt.repeatSentenceIds.length} Speaking ·
                {" "}{mt.essayIds.length + mt.summarizeTextIds.length} Writing ·
                {" "}{mt.fillBlankIds.length + mt.reorderIds.length} Reading ·
                {" "}{mt.dictationIds.length + mt.summarizeSpokenIds.length} Listening
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <Sparkles size={12} /> Tip: Mock Test 3 includes 2026 high-frequency predictive questions.
        </p>
      </div>
    </PteShell>
  );
};

export default PteHub;
