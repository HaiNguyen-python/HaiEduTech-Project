/**
 * @file PteHub.tsx
 * @description PTE Academic landing page with 4 skill cards + Peak gamification.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, PenTool, BookOpen, Headphones, Trophy, Sparkles, Flame, TrendingUp, ChevronRight } from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import PtePeak from "@/components/pte/PtePeak";
import PteSkillRings from "@/components/pte/PteSkillRings";
import { usePteProgress } from "@/hooks/usePteProgress";
import { usePteSkillStats } from "@/hooks/usePteSkillStats";
import { Activity, BookMarked, Clock as ClockIcon } from "lucide-react";
import {
  READ_ALOUD_ALL, REPEAT_SENTENCE_ALL, ESSAY_ALL, DICTATION_ALL,
  MOCK_TESTS, REPEATED_2026_IDS, PTE_TOTAL_TASKS,
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
  const skillStats = usePteSkillStats();
  const totalTasks = PTE_TOTAL_TASKS;

  return (
    <PteShell
      title="PTE Academic Prep"
      subtitle="Climb to Band 90 across all four skills with AI-powered feedback."
      backTo="/english"
      backLabel="Learn English"
    >
      <PtePeak completed={progress.completedIds.length} total={totalTasks} />

      {/* Per-skill progress overview - synced with Dashboard */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#003580]">Your Skill Progress</h2>
            <p className="text-xs text-slate-500">
              Live tracking across Speaking · Writing · Reading · Listening.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#003580]/10 text-[#003580] font-bold">
              <Activity size={12} /> {skillStats.totalAttempts} attempts
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">
              <BookMarked size={12} /> {skillStats.vocabMastered} vocab
            </span>
            {skillStats.totalTimeMinutes > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-bold">
                <ClockIcon size={12} /> {skillStats.totalTimeMinutes}m
              </span>
            )}
          </div>
        </div>
        <PteSkillRings
          skills={skillStats.skills}
          variant="detailed"
          loading={skillStats.loading}
        />
      </section>

      {/* Predicted Questions 2026 - high-frequency repeated tasks */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 rounded-2xl p-5 sm:p-6 border-2 border-orange-300/60 shadow-sm mb-6 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 text-7xl opacity-10 select-none pointer-events-none">🔥</div>
        <div className="flex items-center gap-2 mb-1 relative">
          <Flame className="text-orange-600" size={22} />
          <h2 className="text-lg sm:text-xl font-bold text-orange-900">Predicted Questions 2026</h2>
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-orange-600 text-white font-bold shadow-sm">
            <TrendingUp size={11} /> HIGH FREQ
          </span>
        </div>
        <p className="text-xs sm:text-sm text-orange-800/80 mb-4 relative">
          🔥 High-frequency repeated questions based on 2026 PTE Academic trends. Master these for an exam edge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
          {/* Read Aloud */}
          <div className="bg-white rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Mic size={16} className="text-[#003580]" />
              <h3 className="font-bold text-[#003580] text-sm">Read Aloud</h3>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-semibold">🔥 {REPEATED_2026_IDS.readAloud.length}</span>
            </div>
            <ul className="space-y-1.5">
              {REPEATED_2026_IDS.readAloud.map(id => {
                const item = READ_ALOUD_ALL.find(x => x.id === id);
                if (!item) return null;
                return (
                  <li key={id} className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                    <span className="text-orange-600 font-semibold mr-1">🔥</span>
                    {item.text.slice(0, 110)}...
                  </li>
                );
              })}
            </ul>
            <Link to="/pte/speaking" className="mt-3 inline-block text-xs font-semibold text-[#003580] hover:underline">Practice Speaking →</Link>
          </div>

          {/* Repeat Sentence */}
          <div className="bg-white rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Mic size={16} className="text-[#003580]" />
              <h3 className="font-bold text-[#003580] text-sm">Repeat Sentence</h3>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-semibold">🔥 {REPEATED_2026_IDS.repeatSentence.length}</span>
            </div>
            <ul className="space-y-1.5">
              {REPEATED_2026_IDS.repeatSentence.map(id => {
                const item = REPEAT_SENTENCE_ALL.find(x => x.id === id);
                if (!item) return null;
                return (
                  <li key={id} className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                    <span className="text-orange-600 font-semibold mr-1">🔥</span>
                    {item.text}
                  </li>
                );
              })}
            </ul>
            <Link to="/pte/speaking" className="mt-3 inline-block text-xs font-semibold text-[#003580] hover:underline">Practice Speaking →</Link>
          </div>

          {/* Essay */}
          <div className="bg-white rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <PenTool size={16} className="text-[#003580]" />
              <h3 className="font-bold text-[#003580] text-sm">Essay Prompts</h3>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-semibold">🔥 {REPEATED_2026_IDS.essay.length}</span>
            </div>
            <ul className="space-y-1.5">
              {REPEATED_2026_IDS.essay.map(id => {
                const item = ESSAY_ALL.find(x => x.id === id);
                if (!item) return null;
                return (
                  <li key={id} className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                    <span className="text-orange-600 font-semibold mr-1">🔥</span>
                    {item.prompt.slice(0, 120)}...
                  </li>
                );
              })}
            </ul>
            <Link to="/pte/writing" className="mt-3 inline-block text-xs font-semibold text-[#003580] hover:underline">Practice Writing →</Link>
          </div>

          {/* Dictation */}
          <div className="bg-white rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Headphones size={16} className="text-[#003580]" />
              <h3 className="font-bold text-[#003580] text-sm">Write from Dictation</h3>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-semibold">🔥 {REPEATED_2026_IDS.dictation.length}</span>
            </div>
            <ul className="space-y-1.5">
              {REPEATED_2026_IDS.dictation.map(id => {
                const item = DICTATION_ALL.find(x => x.id === id);
                if (!item) return null;
                return (
                  <li key={id} className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                    <span className="text-orange-600 font-semibold mr-1">🔥</span>
                    {item.audioText}
                  </li>
                );
              })}
            </ul>
            <Link to="/pte/listening" className="mt-3 inline-block text-xs font-semibold text-[#003580] hover:underline">Practice Listening →</Link>
          </div>
        </div>
      </div>

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

      {/* PTE Vocabulary CTA */}
      <Link
        to="/pte/vocabulary"
        className="mt-6 block bg-gradient-to-r from-[#003580] to-[#0052cc] text-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/15 grid place-items-center shrink-0">
            <BookOpen size={26} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold">PTE Academic Vocabulary</h3>
            <p className="text-white/85 text-sm">150 high-frequency words · Flashcards · Quick Quiz · Mastery tracking</p>
          </div>
          <ChevronRight size={24} className="shrink-0" />
        </div>
      </Link>
    </PteShell>
  );
};

export default PteHub;
