/**
 * @file PteHub.tsx
 * @description PTE Academic landing page with 4 skill cards + Peak gamification.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, PenTool, BookOpen, Headphones, Trophy, Sparkles, Flame, TrendingUp, ChevronRight, GraduationCap, ClipboardCheck, ListChecks } from "lucide-react";
import { PTE_LESSONS, PTE_LESSON_QUIZ_TOTAL } from "@/data/pteLessonsData";
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
import { PTE_SCORED_ITEM_TYPES } from "@/data/pteExamBlueprint";

const SKILL_CARDS = [
  {
    to: "/pte/speaking",
    icon: Mic,
    title: "Speaking",
    subtitle: "Read Aloud · Repeat Sentence",
    desc: "Read academic texts and practise spoken responses.",
    color: "from-[#003580] to-[#0052cc]",
  },
  {
    to: "/pte/writing",
    icon: PenTool,
    title: "Writing",
    subtitle: "Essay · Summarize Written Text",
    desc: "Develop arguments and concise one-sentence summaries.",
    color: "from-[#0052cc] to-[#1e40af]",
  },
  {
    to: "/pte/reading",
    icon: BookOpen,
    title: "Reading",
    subtitle: "Fill in the Blanks · Re-order Paragraphs",
    desc: "Choose precise words and restore logical paragraph order.",
    color: "from-[#1e40af] to-[#003580]",
  },
  {
    to: "/pte/listening",
    icon: Headphones,
    title: "Listening",
    subtitle: "Dictation · Summarize Spoken Text",
    desc: "Practise listening, exact spelling and lecture summaries.",
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
      subtitle="Build your four skills with original academic practice and clearly labelled feedback."
      backTo="/english"
      backLabel="Learn English"
    >
      <PtePeak completed={progress.completedIds.length} total={totalTasks} />

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <Link to="/placement-test?subject=pte" className="block rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10"><ClipboardCheck size={26} className="text-primary" /></div>
            <div className="min-w-0 flex-1"><h3 className="text-lg font-bold">Diagnostic Test</h3><p className="text-sm text-muted-foreground">24 questions to establish your starting point</p></div>
            <ChevronRight size={22} className="shrink-0 text-primary" />
          </div>
        </Link>
        <Link to="/pte/exam-guide" className="block rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent/10"><ListChecks size={26} className="text-accent" /></div>
            <div className="min-w-0 flex-1"><h3 className="text-lg font-bold">Exam Guide</h3><p className="text-sm text-muted-foreground">All {PTE_SCORED_ITEM_TYPES.length} scored item types and skill links</p></div>
            <ChevronRight size={22} className="shrink-0 text-primary" />
          </div>
        </Link>
      </div>

      {/* Strategy lessons CTA */}
      <Link
        to="/pte/lessons"
        className="mb-6 block bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#003580]/20 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#003580]/10 grid place-items-center shrink-0">
            <GraduationCap size={26} className="text-[#003580]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-[#003580]">PTE Strategy Lessons</h3>
            <p className="text-slate-600 text-sm">
              {PTE_LESSONS.length} method lessons across all four skills · worked examples · {PTE_LESSON_QUIZ_TOTAL} quiz questions
            </p>
          </div>
          <ChevronRight size={24} className="shrink-0 text-[#003580]" />
        </div>
      </Link>

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

      <p className="mb-6 text-sm text-muted-foreground">Original HaiEduTech practice, not recalled or predicted Pearson questions. Transcript-based feedback cannot measure pronunciation or replicate official scoring.</p>

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
          <h2 className="text-lg font-bold text-[#003580]">Mini Mock Tests</h2>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#003580]/10 text-[#003580] font-semibold">
            {MOCK_TESTS.length} sets
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_TESTS.map(mt => (
            <Link to={`/pte/mock/${mt.id}`} key={mt.id} className="block border border-[#003580]/15 rounded-xl p-4 bg-[#f4f7fb] hover:bg-[#e8eef7] transition-colors">
              <h3 className="font-bold text-[#003580] text-sm">{mt.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mt.description}</p>
              <div className="mt-2 text-[11px] text-slate-500">
                {mt.readAloudIds.length + mt.repeatSentenceIds.length} Speaking ·
                {" "}{mt.essayIds.length + mt.summarizeTextIds.length} Writing ·
                {" "}{mt.fillBlankIds.length + mt.reorderIds.length} Reading ·
                {" "}{mt.dictationIds.length + mt.summarizeSpokenIds.length} Listening
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <Sparkles size={12} /> These guided sets cover a subset of formats and use synthetic audio. They are not full-length scored PTE simulations.
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
