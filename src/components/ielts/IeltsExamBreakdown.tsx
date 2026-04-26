import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Headphones, BookOpen, PenSquare, Mic, Clock, FileText, Target, Sparkles,
  GraduationCap, TrendingUp, Calendar, Globe, AlertTriangle, Lightbulb,
  CheckCircle2, XCircle, RefreshCw, Trophy, Brain, ScrollText,
  Layers, ListChecks, BarChart3, Compass, BookMarked, Timer, Flame, ChevronDown
} from "lucide-react";
import chibiListening from "@/assets/chibi-listening.png";
import chibiReading from "@/assets/chibi-reading.png";
import chibiWriting from "@/assets/chibi-writing.png";
import chibiSpeaking from "@/assets/chibi-speaking.png";
import chibiTeacher from "@/assets/chibi-teacher-ielts.png";
import chibiTrophy from "@/assets/chibi-quiz-trophy.png";

/* ========================================================================
   IELTS Exam Breakdown — English-only deep lecture + Interactive quiz
   Chibi illustrations included for friendlier reading experience
   ======================================================================== */

const overviewFacts = [
  { icon: Calendar, label: "Total Duration", value: "2h 45 min" },
  { icon: FileText, label: "Total Questions", value: "80 (L+R) + 2 essays + speaking" },
  { icon: Target, label: "Band Scale", value: "1.0 → 9.0 (0.5 increments)" },
  { icon: Globe, label: "Two Test Formats", value: "Academic / General Training" },
];

interface SkillSection { title: string; desc: string; meta?: string; }
interface BandRow { band: string; raw: string; }
interface SkillData {
  icon: typeof Headphones;
  chibi: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  title: string;
  duration: string;
  questions: string;
  format: string;
  sections: SkillSection[];
  questionTypes: string[];
  scoringTable: BandRow[];
  scoringNote: string;
  timeStrategy: { phase: string; time: string }[];
  tips: string[];
  traps: string[];
  vocabFocus: string;
}

const skills: SkillData[] = [
  {
    icon: Headphones,
    chibi: chibiListening,
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    badgeColor: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
    title: "Listening — Comprehension",
    duration: "30 min test + 10 min answer transfer",
    questions: "40 questions · 4 sections · audio plays once",
    format: "Same paper for Academic and General Training. Multi-accent: British, American, Australian, New Zealand, Canadian.",
    sections: [
      { title: "Section 1 (10 Qs)", desc: "Two-person everyday conversation (hotel booking, course sign-up, directions, renting). Mostly form-filling: names, dates, prices, phone numbers.", meta: "Easy · ~5 min · Form completion" },
      { title: "Section 2 (10 Qs)", desc: "Everyday monologue — a guide introducing places, events or public services. Map labelling and MCQs start to appear.", meta: "Easy–Med · ~5 min · Map + MCQ" },
      { title: "Section 3 (10 Qs)", desc: "Academic conversation between 2–4 speakers (students + tutor discussing a project, dissertation or group assignment). Fast speaker switches.", meta: "Hard · ~7–8 min · Matching + MCQ" },
      { title: "Section 4 (10 Qs)", desc: "University academic lecture (monologue) on science, history or environment. NO mid-pause — you must listen continuously for 5 minutes.", meta: "Hardest · ~7–8 min · Note completion" },
    ],
    questionTypes: [
      "Form / Note / Table / Flow-chart / Summary completion",
      "Multiple choice (MCQ) — single or multiple answers",
      "Matching — match info or opinions to speakers",
      "Plan / Map / Diagram labelling — label positions",
      "Sentence completion (≤3 words or a number)",
      "Short-answer questions",
    ],
    scoringTable: [
      { band: "9.0", raw: "39–40 correct" },
      { band: "8.5", raw: "37–38 correct" },
      { band: "8.0", raw: "35–36 correct" },
      { band: "7.5", raw: "32–34 correct" },
      { band: "7.0", raw: "30–31 correct" },
      { band: "6.5", raw: "26–29 correct" },
      { band: "6.0", raw: "23–25 correct" },
      { band: "5.5", raw: "18–22 correct" },
    ],
    scoringNote: "Each question = 1 raw mark. No penalty for wrong answers → always guess. Misspellings and missing plurals lose marks.",
    timeStrategy: [
      { phase: "Before each section", time: "30s skim questions & underline keywords" },
      { phase: "While listening", time: "Use abbreviations directly on the question paper" },
      { phase: "End of each section", time: "30s to double-check — never return later" },
      { phase: "10-min transfer window", time: "Copy answers to the answer sheet, spell-check twice" },
    ],
    tips: [
      "Read questions in the first 30 seconds of each section to predict keywords and word forms (noun/verb/number).",
      "Beware of distractors — the first answer is often a trap; the speaker self-corrects later.",
      "Use abbreviations during Section 4 since there are no pauses (e.g. gov't, w/, b/c).",
      "Check plural/singular and spelling when transferring — one wrong letter = 1 mark lost.",
      "Respect 'Write NO MORE THAN TWO WORDS' — exceeding the limit makes the answer wrong.",
      "Shadow BBC 6 Minute English for 10 min/day to get used to different accents.",
    ],
    traps: [
      "Numbers: 'fifteen' (15) vs 'fifty' (50) — listen for stress.",
      "Proper-noun spelling: speakers always spell out (e.g. 'My name is Smith — S-M-I-T-H').",
      "Paraphrasing: 'expensive' → 'pricey/costly'; 'a lot of' → 'numerous/plenty of'.",
      "Mid-sentence correction: 'Actually, on second thought, let's say Tuesday' → answer is Tuesday.",
    ],
    vocabFocus: "Numbers and ordinals, dates, place names, currencies, time expressions, and academic topic vocabulary (Education, Environment, Health, Technology).",
  },
  {
    icon: BookOpen,
    chibi: chibiReading,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    title: "Reading — Comprehension",
    duration: "60 min (NO separate transfer time)",
    questions: "40 questions · 3 passages (~2,750 words) · ~13–14 questions per passage",
    format: "Academic: 3 academic texts from journals or papers. General Training: 5 practical texts (ads, instructions, articles).",
    sections: [
      { title: "Passage 1 (~13 Qs)", desc: "General topic: history, lifestyle, culture. Straightforward questions — info follows paragraph order.", meta: "Easy · ~700 words · 17 min" },
      { title: "Passage 2 (~13 Qs)", desc: "Semi-academic: environment, technology, psychology. Matching headings and summary completion start to appear.", meta: "Medium · ~900 words · 20 min" },
      { title: "Passage 3 (~14 Qs)", desc: "Deep academic: science, sociology, economics. Complex syntax, C1 vocabulary, interwoven arguments.", meta: "Hard · ~1,100 words · 23 min" },
    ],
    questionTypes: [
      "True / False / Not Given (factual)",
      "Yes / No / Not Given (writer's view)",
      "Matching headings to paragraphs",
      "Matching information / features / sentence endings",
      "Sentence / Summary / Note / Table / Diagram completion",
      "Multiple choice (1 or 2 correct answers)",
      "Short-answer questions (≤3 words)",
    ],
    scoringTable: [
      { band: "9.0", raw: "39–40 correct" },
      { band: "8.5", raw: "37–38 correct" },
      { band: "8.0", raw: "35–36 correct" },
      { band: "7.5", raw: "33–34 correct" },
      { band: "7.0", raw: "30–32 correct" },
      { band: "6.5", raw: "27–29 correct" },
      { band: "6.0", raw: "23–26 correct" },
      { band: "5.5", raw: "19–22 correct" },
    ],
    scoringNote: "General Training requires HIGHER raw scores for the same band (e.g. Band 7.0 needs 34/40 instead of 30/40 in Academic).",
    timeStrategy: [
      { phase: "Passage 1", time: "17 min (skim 2' + answer 13' + check 2')" },
      { phase: "Passage 2", time: "20 min (skim 2' + answer 16' + check 2')" },
      { phase: "Passage 3", time: "23 min (skim 3' + answer 18' + check 2')" },
      { phase: "1.5-min rule", time: "No question above 1.5' — mark, skip, return later" },
    ],
    tips: [
      "Skim each passage in the first 2 min to grasp the topic and each paragraph's topic sentence (usually sentence 1).",
      "Tackle Matching Headings FIRST since they need whole-paragraph understanding — avoid re-reading later.",
      "Distinguish 'False' (direct contradiction) vs 'Not Given' (no info at all) — DO NOT infer.",
      "Strict time control: a question above 1.5 min → mark and return later.",
      "Use text structure: headings, italics, bold and numbers — circle them while skimming.",
      "For MCQ: read the question first, underline keywords, locate in the passage → eliminate the 2 clearly wrong options.",
    ],
    traps: [
      "Synonym replacement: 'reduce' in the question → 'curtail/lower/diminish' in the text.",
      "Extreme words: 'always/never/all/none' in T/F/NG questions are usually False.",
      "Out-of-order answers: T/F/NG follow text order, but MCQ and Matching DO NOT.",
      "Texts with data: the author states a fact then refutes it → don't rush to pick the fact-sentence answer.",
    ],
    vocabFocus: "Topic-based synonym banks, logical connectors (however, nevertheless, consequently), academic verbs (claim, argue, suggest, demonstrate).",
  },
  {
    icon: PenSquare,
    chibi: chibiWriting,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    title: "Writing — Essay",
    duration: "60 min total (Task 1: 20 min · Task 2: 40 min)",
    questions: "2 tasks · Task 1 ≥150 words · Task 2 ≥250 words · Task 2 worth 2/3 of the score",
    format: "Academic Task 1: describe charts, maps or processes. General Task 1: letter writing. Task 2 (both): a 250+ word essay.",
    sections: [
      { title: "Task 1 — Academic (20')", desc: "Describe one or more visuals: line chart, bar chart, pie chart, table, process diagram, map (now vs past), or a combo of two.", meta: "≥150 words · 1/3 of score" },
      { title: "Task 1 — General (20')", desc: "Letter writing in 3 styles: formal (to authorities/manager), semi-formal (to a new contact), informal (to a friend). The 3 bullets MUST all be addressed.", meta: "≥150 words · 1/3 of score" },
      { title: "Task 2 (40')", desc: "Essay in 4 formats: Opinion (Agree/Disagree), Discussion (Both views + opinion), Problem–Solution (Causes & Solutions), Two-part question. Standard 4-paragraph structure: Intro → Body 1 → Body 2 → Conclusion.", meta: "≥250 words · 2/3 of score" },
    ],
    questionTypes: [
      "Task Achievement (T1) / Task Response (T2) — 25%",
      "Coherence & Cohesion — sentence/paragraph/connector flow — 25%",
      "Lexical Resource — vocabulary range, collocations, paraphrasing — 25%",
      "Grammatical Range & Accuracy — variety of structures + accuracy — 25%",
    ],
    scoringTable: [
      { band: "9.0", raw: "Fully accomplished — natural flow" },
      { band: "8.0", raw: "Rare errors · Idiomatic · Complex structures" },
      { band: "7.0", raw: "Good with some minor errors" },
      { band: "6.5", raw: "Clear but limited range" },
      { band: "6.0", raw: "Basic task done · Errors don't impede" },
      { band: "5.5", raw: "Simple ideas · Frequent errors" },
    ],
    scoringNote: "Writing band = average of the 4 criteria. Going BELOW the word minimum (150/250) heavily penalises Task Achievement. Writing too long earns no bonus.",
    timeStrategy: [
      { phase: "Task 1 — Analyse", time: "3' read prompt + pick 2–3 standout trends" },
      { phase: "Task 1 — Write", time: "15' (Intro 2' + Overview 3' + Body 1+2 5' each)" },
      { phase: "Task 1 — Check", time: "2' word count + grammar fix" },
      { phase: "Task 2 — Brainstorm", time: "5' outline 4 paragraphs + select 2 main ideas" },
      { phase: "Task 2 — Write", time: "30' (Intro 3' + Body 1 10' + Body 2 10' + Conclusion 4' + spare 3')" },
      { phase: "Task 2 — Check", time: "5' word count + fix tense/article/spelling" },
    ],
    tips: [
      "Task 1: spend 3 min analysing the chart, then write a clear overview — this is MANDATORY.",
      "Task 1 Academic: follow the 1-2-3-3 rule (1 intro · 2-sentence overview · 3-sentence body 1 · 3-sentence body 2).",
      "Task 1 General: use the right register — formal (Dear Sir/Madam, I am writing to...) vs informal (Hi John, How's it going?).",
      "Task 2: spend 5 min brainstorming and outlining before writing — NEVER dive straight in.",
      "Use varied linkers: Furthermore, In contrast, By the same token, Granted that, Notwithstanding.",
      "Each body paragraph: 1 topic sentence + 2 supporting + 1 example + 1 concluding sentence (PEEL).",
      "Save 3–5 min at the end to check grammar (a/an/the, tense, S-V agreement) and word count.",
      "At least 30% complex sentences: use although, while, whereas, despite + noun.",
    ],
    traps: [
      "Task 1: cramming data WITHOUT COMPARISON — examiners need to see 'compared to / higher than / nearly double'.",
      "Task 1: wrong tense — past charts need past simple; predictions need will / be expected to.",
      "Task 2: going off-topic on Two-part questions by answering only one → automatic Task Response penalty.",
      "Task 2: unclear opinion — state your stance from the Intro, don't undermine it mid-essay.",
      "Memorising templates verbatim → examiners spot it and dock Lexical Resource.",
    ],
    vocabFocus: "Trend verbs (surge, plummet, plateau), comparative structures, hedging language (it could be argued, arguably), academic nouns and collocations.",
  },
  {
    icon: Mic,
    chibi: chibiSpeaking,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    badgeColor: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    title: "Speaking — 1-on-1 Interview",
    duration: "11–14 min with examiner (face-to-face or video)",
    questions: "3 parts · Recorded · Can be on the same day or different day from the other 3 skills",
    format: "Same questions for Academic and General Training. Native examiner. Available as computer-delivered or paper-based.",
    sections: [
      { title: "Part 1 (4–5 min)", desc: "Intro & interview: examiner checks ID then asks 3 familiar topics (work/study, hometown, hobbies, family, food, travel...). 3–4 questions per topic.", meta: "Reply 30–45s · Natural" },
      { title: "Part 2 — Long turn (3–4 min)", desc: "Cue card: receive prompt + paper + 1 min prep + speak 1.5–2 min continuously. Then examiner asks 1–2 follow-ups.", meta: "Cue card 4 bullets · Speak 2 min" },
      { title: "Part 3 — Two-way discussion (4–5 min)", desc: "Deep discussion linked to Part 2 — analyse, compare past–present, predict future, evaluate society. Demands well-reasoned answers.", meta: "Analyse · Speculate · Evaluate" },
    ],
    questionTypes: [
      "Fluency & Coherence — smooth flow, no long pauses, coherent ideas — 25%",
      "Lexical Resource — vocabulary range, idioms, paraphrasing — 25%",
      "Grammatical Range & Accuracy — complex sentences + accuracy — 25%",
      "Pronunciation — clear sounds, sentence stress, intonation, connected speech — 25%",
    ],
    scoringTable: [
      { band: "9.0", raw: "Native-like · Fully natural" },
      { band: "8.0", raw: "Fluent, rare errors · Natural idioms" },
      { band: "7.0", raw: "Speaks at length easily · Some hesitation" },
      { band: "6.5", raw: "Willing to speak · Occasional word search" },
      { band: "6.0", raw: "Conveys meaning · Pauses for word/grammar" },
      { band: "5.5", raw: "Keeps going but with repetition / self-correction" },
    ],
    scoringNote: "Speaking band = average of 4 criteria. Silence above 5 sec lowers Fluency. Constant self-correction lowers Fluency. Repetition lowers Lexical.",
    timeStrategy: [
      { phase: "Part 1 — per question", time: "30–45 sec · 2–3 sentences + reason/example" },
      { phase: "Part 2 — prep", time: "60s mind-map following the 4 cue-card bullets" },
      { phase: "Part 2 — speak", time: "90–120 sec continuously · Cover 4 bullets + closing" },
      { phase: "Part 3 — per question", time: "45–60 sec · Argue: claim + reason + example" },
    ],
    tips: [
      "Part 1: answer in 2–3 sentences (not just 'Yes', not as long as Part 3), add a brief reason or example.",
      "Part 2: use the 1 min prep to mind-map the 4 cue-card bullets — DON'T write full sentences.",
      "Part 2: open with 'I'd like to talk about...' and close with 'Overall, this is something I really...'.",
      "Part 3: use discourse markers ('Well, that's a tricky one...' / 'I'd say...' / 'It really depends on...') to buy time naturally.",
      "Pronunciation: focus on sentence stress and intonation rather than 100% perfect sounds — examiners prioritise clarity.",
      "Use natural idioms and collocations (in the long run, by and large, hit the books) — max 3 per test.",
      "NEVER memorise scripted answers — examiners WILL detect this and dock heavily.",
      "Self-correct small slips with 'I mean...' instead of 'sorry sorry' — natural and unpenalised.",
    ],
    traps: [
      "Using overly bookish vocab ('I am exceedingly fond of...' instead of 'I really love').",
      "Going silent above 5 sec in Part 2 or Part 3 — examiners immediately mark down Fluency.",
      "Answering Part 1 with just 'Yes/No' or one short sentence — wasting your language showcase.",
      "Rambling in Part 2 without covering the 4 bullets → lower Coherence.",
      "Using only simple grammar throughout (just present simple) → lower Grammatical Range.",
    ],
    vocabFocus: "Topic-based vocab (work, education, environment, technology), idioms, phrasal verbs, hedging (I suppose, it seems to me), opinion phrases.",
  },
];

interface RoadmapStage {
  band: string;
  level: string;
  duration: string;
  color: string;
  icon: typeof GraduationCap;
  prerequisite: string;
  vocabSize: string;
  grammar: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  weeklyHours: string;
  materials: string[];
  outcome: string;
}

const roadmap: RoadmapStage[] = [
  {
    band: "Band 4.0 — 5.0",
    level: "Foundation Level",
    duration: "8–12 weeks (~2 months)",
    color: "from-rose-500/15 to-rose-500/5",
    icon: GraduationCap,
    prerequisite: "Entry: A1–A2 (KET) or no prior IELTS · Knows alphabet + basic sentence structure.",
    vocabSize: "1,500 A2–B1 words across 20 topics (Family, Food, Travel, Work, Education...).",
    grammar: "12 basic tenses · Conditionals 0/1/2 · Relative clauses (who/which/that) · Comparatives & superlatives · Modal verbs.",
    listening: "Listen to Section 1–2 · Recognise numbers, dates, names · Target 18–22/40 questions.",
    reading: "Read Passage 1 (~700 words) · Skim & scan · Simple True/False/NG · Target 18–22/40.",
    writing: "Write simple sentences (10–15 words) · 50-word paragraphs · Practise Task 1 with one simple chart.",
    speaking: "Answer Part 1 with 1–2 sentences · Self-introduction · Q&A about hobbies, family, hometown.",
    weeklyHours: "8–10 hrs/week (5 sessions · 90 min/session + self-study)",
    materials: ["Cambridge English File Pre-Intermediate", "Mindset for IELTS Foundation", "Oxford Word Skills Basic", "BBC Learning English (6 Minute English level 1)"],
    outcome: "By the end of this level, students confidently understand simple everyday English and can write a 100-word paragraph on familiar topics.",
  },
  {
    band: "Band 5.5 — 6.0",
    level: "Pre-Intermediate Level",
    duration: "10–14 weeks (~3 months)",
    color: "from-amber-500/15 to-amber-500/5",
    icon: BookOpen,
    prerequisite: "Entry: B1 (PET) or completed Foundation level · Comfortable with basic tenses.",
    vocabSize: "2,500 B1–B2 words · Topic-based banks (Environment, Health, Technology, Society).",
    grammar: "Conditionals 3 + Mixed · Passive voice · Reported speech · Gerund vs Infinitive · Linking devices.",
    listening: "Handle all 4 sections at slower pace · Target 23–27/40 · Practise note-taking.",
    reading: "All 3 passages with time pressure · Master True/False/NG · Target 23–27/40.",
    writing: "Task 1: full structure (Intro/Overview/Body) · Task 2: 4-paragraph essay 200 words · Linking devices.",
    speaking: "Part 1 with 2–3 sentences + reason · Part 2: speak 1–1.5 min · Part 3 short answers.",
    weeklyHours: "10–12 hrs/week (5–6 sessions + self-study)",
    materials: ["Cambridge IELTS books 12–14", "Mindset for IELTS Level 1", "Vocabulary for IELTS Intermediate (Cullen)", "TED-Ed videos with transcripts"],
    outcome: "Students achieve a stable Band 5.5–6.0 in mock tests and can sustain conversation on familiar topics for 2 minutes.",
  },
  {
    band: "Band 6.5 — 7.0",
    level: "Intermediate Level (University Entry)",
    duration: "12–16 weeks (~4 months)",
    color: "from-sky-500/15 to-sky-500/5",
    icon: TrendingUp,
    prerequisite: "Entry: B2 (FCE) or completed Pre-Intermediate · Stable Band 5.5+ in mocks.",
    vocabSize: "4,000 B2–C1 words · Academic Word List (AWL) coverage 60% · Topic synonym banks.",
    grammar: "All complex structures · Inversion · Cleft sentences · Subjunctive · Advanced participle clauses.",
    listening: "Master accents & paraphrasing · Section 3–4 deep work · Target 30–32/40.",
    reading: "Strategy mastery for all question types · Time management 17/20/23 · Target 30–32/40.",
    writing: "Task 1: complex comparisons + hedging · Task 2: full PEEL structure 280 words · Cohesion devices.",
    speaking: "Part 2 fluency 2 min + idioms · Part 3 reasoning + speculation · Pronunciation work (stress + intonation).",
    weeklyHours: "12–15 hrs/week (6 sessions + intensive self-study + mock tests)",
    materials: ["Cambridge IELTS books 15–18", "Mindset for IELTS Level 2", "IELTS Trainer 2", "Cambridge Vocabulary for IELTS Advanced", "The Economist / The Guardian articles"],
    outcome: "Students reach a stable Band 6.5–7.0 — eligible for most universities in the UK, Australia, Canada and the US.",
  },
  {
    band: "Band 7.5 — 8.0+",
    level: "Advanced Level (Top Universities)",
    duration: "16–20 weeks (~5 months)",
    color: "from-violet-500/15 to-violet-500/5",
    icon: Trophy,
    prerequisite: "Entry: C1 (CAE) or completed Intermediate · Stable Band 7.0 in mocks.",
    vocabSize: "6,000+ C1–C2 words · Full AWL · Idioms, collocations, less-common lexis.",
    grammar: "Native-like fluency · Subtle differences (modal perfects, hypothetical past) · Stylistic variation.",
    listening: "Near-perfect accuracy across all sections · Target 35–38/40 · Multi-accent fluency.",
    reading: "All passages within time · Inference & evaluation · Target 35–38/40 · Speed reading 250wpm.",
    writing: "Task 1: sophisticated paraphrasing & data analysis · Task 2: nuanced argumentation 300+ words · Native-like idioms.",
    speaking: "Native-like fluency · Complex argument structures · Idiomatic expressions · Advanced pronunciation.",
    weeklyHours: "15–20 hrs/week (intensive sessions + daily mock tests + 1-on-1 feedback)",
    materials: ["Cambridge IELTS books 17–19", "Official Cambridge Guide to IELTS", "Academic English texts (research papers)", "BBC In Depth / The Atlantic Long Reads", "Daily 1-on-1 Speaking with native instructor"],
    outcome: "Students secure Band 7.5–8.0+ — qualifying for top universities (Oxbridge, Ivy League, Group of Eight) and skilled migration programs.",
  },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the total duration of the IELTS test (Listening + Reading + Writing)?",
    options: ["1h 45 min", "2h 30 min", "2h 45 min (without Speaking)", "3h 30 min"],
    correct: 2,
    explanation: "The 3 written skills last 2h 45 min: Listening 30' + 10' transfer · Reading 60' · Writing 60'. Speaking adds another 11–14 min.",
  },
  {
    question: "Which Listening section is considered the hardest?",
    options: [
      "Section 1 (everyday conversation)",
      "Section 2 (everyday monologue)",
      "Section 3 (academic conversation)",
      "Section 4 (academic lecture)",
    ],
    correct: 3,
    explanation: "Section 4 is a long academic lecture with no mid-pause — it requires gist listening and abbreviation skills.",
  },
  {
    question: "How many passages and questions are in Reading?",
    options: ["2 passages · 30 questions", "3 passages · 40 questions", "4 passages · 40 questions", "3 passages · 50 questions"],
    correct: 1,
    explanation: "Reading has 3 passages (~2,750 words total), 40 questions, in 60 min (NO transfer time).",
  },
  {
    question: "When there's no info in the passage to confirm or deny a statement, the Reading answer should be:",
    options: ["True / Yes", "False / No", "Not Given", "Leave blank"],
    correct: 2,
    explanation: "'Not Given' = no info in the passage. 'False' = info is in the passage and contradicts. Don't infer!",
  },
  {
    question: "What's the minimum word count for Writing Task 1 (Academic)?",
    options: ["100 words", "150 words", "200 words", "250 words"],
    correct: 1,
    explanation: "Task 1 ≥150 words in 20 min · Task 2 ≥250 words in 40 min. Going below penalises Task Achievement.",
  },
  {
    question: "Which of these is NOT a Writing scoring criterion?",
    options: ["Task Achievement / Response", "Coherence & Cohesion", "Lexical Resource", "Pronunciation"],
    correct: 3,
    explanation: "Pronunciation is only for Speaking. The 4 Writing criteria are: Task · Coherence · Lexical · Grammar.",
  },
  {
    question: "Speaking Part 2: how much prep time and speaking time?",
    options: [
      "30 sec prep · 1 min speaking",
      "1 min prep · 1.5–2 min speaking",
      "2 min prep · 3 min speaking",
      "No prep · 2 min speaking",
    ],
    correct: 1,
    explanation: "Part 2 (Long turn): receive cue card → 1 min prep (with paper & pen) → speak 1.5–2 min continuously.",
  },
  {
    question: "What is the IELTS band scale range?",
    options: ["0 – 100 points", "1.0 – 9.0 (0.5 increments)", "A1 – C2 (CEFR)", "200 – 800 points"],
    correct: 1,
    explanation: "IELTS uses bands 1.0–9.0 in 0.5 steps. Overall = average of 4 skills, rounded to the nearest .0 or .5.",
  },
];

/* ========================= COMPONENT ========================= */

const IeltsExamBreakdown = () => {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  // Collapsible state for the 4 skills (open the first by default)
  const [openSkills, setOpenSkills] = useState<Record<number, boolean>>({ 0: true });
  const toggleSkill = (idx: number) =>
    setOpenSkills(prev => ({ ...prev, [idx]: !prev[idx] }));
  const expandAll = () =>
    setOpenSkills({ 0: true, 1: true, 2: true, 3: true });
  const collapseAll = () => setOpenSkills({});

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setShowQuizResults(true);
    setTimeout(() => {
      document.getElementById("quiz-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const correctCount = Object.entries(quizAnswers).filter(
    ([qIdx, optIdx]) => quizQuestions[Number(qIdx)].correct === optIdx
  ).length;
  const totalAnswered = Object.keys(quizAnswers).length;
  const allAnswered = totalAnswered === quizQuestions.length;

  return (
    <div className="space-y-10 mb-8">

      {/* ========== Lecture Header ========== */}
      <div className="relative glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <ScrollText className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Lecture 0 · Foundation</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground leading-tight">
              IELTS Test Structure
              <span className="block text-lg md:text-2xl text-muted-foreground font-normal mt-1">A complete overview before you begin</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              Before practising the 4 skills, master the test structure. A clear roadmap saves months of trial-and-error.
            </p>
          </div>
          <img
            src={chibiTeacher}
            alt="Chibi teacher mascot"
            loading="lazy"
            width={512}
            height={512}
            className="hidden md:block w-44 h-44 lg:w-56 lg:h-56 object-contain drop-shadow-xl"
          />
        </div>

        {/* Quick facts grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
          {overviewFacts.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background/60 backdrop-blur-sm p-3.5 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{f.label}</span>
                </div>
                <p className="text-sm font-bold text-foreground leading-snug">{f.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Test order */}
        <div className="relative mt-5 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-[11px] font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Order on Test Day
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
            <span className="px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300">1. Listening (30')</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">2. Reading (60')</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">3. Writing (60')</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300">4. Speaking (11–14')</span>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            Speaking is usually held the same afternoon, or up to 7 days before/after, depending on the centre.
          </p>
        </div>
      </div>

      {/* ========== 4 Skills Deep Dive ========== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Deep Dive: 4 Skills
              </h2>
              <p className="text-sm text-muted-foreground">
                Click a skill to expand structure, scoring, tips and traps.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              Collapse all
            </button>
          </div>
        </div>


        {skills.map((skill, i) => {
          const Icon = skill.icon;
          const isOpen = !!openSkills[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-3xl border-2 ${skill.borderColor} ${skill.bgColor} overflow-hidden shadow-sm hover:shadow-xl transition-shadow`}
            >
              <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${skill.color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

              {/* Clickable Header */}
              <button
                type="button"
                onClick={() => toggleSkill(i)}
                aria-expanded={isOpen}
                aria-controls={`skill-panel-${i}`}
                className="relative w-full text-left p-5 md:p-7 flex items-start gap-4 hover:bg-background/30 transition-colors"
              >
                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${skill.color} text-white shadow-lg shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                    {skill.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border ${skill.badgeColor}`}>
                      <Clock className="w-3 h-3" /> {skill.duration}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border ${skill.badgeColor}`}>
                      <FileText className="w-3 h-3" /> {skill.questions}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border border-border/60 bg-background/70 text-muted-foreground">
                      {isOpen ? "Tap to collapse" : "Tap to expand"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground italic mt-2.5 leading-relaxed">
                    {skill.format}
                  </p>
                </div>
                <img
                  src={skill.chibi}
                  alt={`${skill.title} chibi mascot`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="hidden sm:block w-20 h-20 md:w-28 md:h-28 object-contain shrink-0 drop-shadow-md"
                />
                <div className={`shrink-0 ml-1 mt-1 w-9 h-9 rounded-full flex items-center justify-center bg-background/70 border border-border/60 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4 text-foreground/70" />
                </div>
              </button>

              {/* Collapsible Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`skill-panel-${i}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="relative overflow-hidden"
                  >
                    <div className="px-5 md:px-7 pb-6 md:pb-7 pt-0">
                      {/* Sections */}
                      <div className="mb-5">
                        <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" /> Detailed Structure by Section
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {skill.sections.map((s, idx) => (
                            <div key={idx} className="rounded-xl bg-background/70 p-3.5 border border-border/60 hover:border-primary/30 transition-colors">
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <p className="text-sm font-bold text-foreground">{s.title}</p>
                                {s.meta && (
                                  <span className="shrink-0 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    {s.meta}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Question types list */}
                      <div className="mb-5 rounded-xl bg-background/70 p-4 border border-border/60">
                        <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <ListChecks className="w-3.5 h-3.5" /> Question Types & Scoring Criteria
                        </p>
                        <ul className="grid md:grid-cols-2 gap-x-5 gap-y-2">
                          {skill.questionTypes.map((q, idx) => (
                            <li key={idx} className="text-sm text-foreground/90 flex gap-2">
                              <span className="text-primary mt-1 shrink-0">▸</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Scoring table + Time strategy */}
                      <div className="grid md:grid-cols-2 gap-3 mb-5">
                        <div className="rounded-xl bg-background/70 p-4 border border-border/60">
                          <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5" /> Band Conversion Table
                          </p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border/60 text-foreground/70">
                                  <th className="text-left py-2 font-bold text-xs uppercase">Band</th>
                                  <th className="text-left py-2 font-bold text-xs uppercase">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {skill.scoringTable.map((row, idx) => (
                                  <tr key={idx} className="border-b border-border/30 last:border-0">
                                    <td className="py-2 font-extrabold text-primary text-base">{row.band}</td>
                                    <td className="py-2 text-foreground/85 text-sm">{row.raw}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p className="text-xs text-muted-foreground italic mt-2.5 leading-relaxed">
                            {skill.scoringNote}
                          </p>
                        </div>

                        <div className="rounded-xl bg-background/70 p-4 border border-border/60">
                          <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Timer className="w-3.5 h-3.5" /> Time Allocation Strategy
                          </p>
                          <ul className="space-y-2.5">
                            {skill.timeStrategy.map((s, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2.5">
                                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary font-bold text-[11px] flex items-center justify-center mt-0.5">{idx + 1}</span>
                                <div className="flex-1">
                                  <span className="font-bold text-foreground">{s.phase} — </span>
                                  <span className="text-muted-foreground">{s.time}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Vocab focus */}
                      <div className="mb-3 rounded-xl bg-primary/5 border border-primary/20 p-4">
                        <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookMarked className="w-3.5 h-3.5" /> Vocabulary & Grammar Focus
                        </p>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {skill.vocabFocus}
                        </p>
                      </div>

                      {/* Tips */}
                      <div className="rounded-xl border-2 border-emerald-500/25 bg-emerald-500/5 p-4 mb-3">
                        <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" /> Mr. Hai's Golden Tips
                        </p>
                        <ul className="space-y-2">
                          {skill.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-foreground/90 flex gap-2.5 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common traps */}
                      <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-4">
                        <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Common Traps to Avoid
                        </p>
                        <ul className="space-y-2">
                          {skill.traps.map((trap, idx) => (
                            <li key={idx} className="text-sm text-foreground/90 flex gap-2.5 leading-relaxed">
                              <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <span>{trap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ========== Roadmap by Band ========== */}
      <div className="glass-card rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-white shadow-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Curriculum: Foundation → Advanced
          </h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          A 4-level pathway by target band — students are placed based on a diagnostic test on day one.
        </p>

        <div className="space-y-5">
          {roadmap.map((stage, i) => {
            const Icon = stage.icon;
            const skillGoals = [
              { icon: Headphones, label: "Listening", goal: stage.listening, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10" },
              { icon: BookOpen, label: "Reading", goal: stage.reading, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: PenSquare, label: "Writing", goal: stage.writing, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
              { icon: Mic, label: "Speaking", goal: stage.speaking, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10" },
            ];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 border-border bg-gradient-to-r ${stage.color} p-5 md:p-6`}
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3 md:min-w-[230px]">
                    <div className="p-3.5 rounded-2xl bg-background/80 backdrop-blur-sm shadow-md">
                      <Icon className="w-7 h-7 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-display font-bold text-foreground">
                        {stage.band}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5 uppercase tracking-wide">
                        {stage.level}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-border text-foreground/80 font-semibold">
                      <Clock className="w-3 h-3" /> {stage.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-border text-foreground/80 font-semibold">
                      <Flame className="w-3 h-3 text-orange-500" /> {stage.weeklyHours}
                    </span>
                  </div>
                </div>

                {/* Prerequisite */}
                <div className="mb-4 rounded-xl bg-background/70 border border-border/60 p-3.5">
                  <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Entry Requirements
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{stage.prerequisite}</p>
                </div>

                {/* Vocabulary + Grammar */}
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-background/70 border border-border/60 p-3.5">
                    <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <BookMarked className="w-3.5 h-3.5" /> Vocabulary
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{stage.vocabSize}</p>
                  </div>
                  <div className="rounded-xl bg-background/70 border border-border/60 p-3.5">
                    <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" /> Grammar Focus
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{stage.grammar}</p>
                  </div>
                </div>

                {/* 4 Skill goals */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Detailed Goals Across 4 Skills
                  </p>
                  <div className="grid md:grid-cols-2 gap-2.5">
                    {skillGoals.map((sg, idx) => {
                      const SgIcon = sg.icon;
                      return (
                        <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-background/70 border border-border/60 p-3">
                          <div className={`p-1.5 rounded-lg ${sg.bg} shrink-0`}>
                            <SgIcon className={`w-4 h-4 ${sg.color}`} />
                          </div>
                          <div className="text-xs md:text-sm leading-relaxed flex-1">
                            <span className={`font-bold ${sg.color} block mb-0.5`}>{sg.label}</span>
                            <span className="text-foreground/85">{sg.goal}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-4 rounded-xl bg-background/70 border border-border/60 p-3.5">
                  <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Core Textbooks & Materials
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                    {stage.materials.map((m, idx) => (
                      <li key={idx} className="text-sm text-foreground/90 flex gap-2">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-3.5">
                  <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Expected Outcome
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{stage.outcome}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-xl border-2 border-primary/25 bg-gradient-to-r from-primary/10 to-emerald-500/10">
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            <span className="font-bold text-primary">💡 Output Guarantee — </span>
            Each level ends with a Full Mock Test graded by official IELTS criteria. If you don't reach your target, you can repeat the level free of charge.
          </p>
        </div>
      </div>

      {/* ========== INTERACTIVE QUIZ ========== */}
      <div className="relative glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-violet-500/5 via-background to-primary/5 border-2 border-primary/20 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-[1fr_auto] gap-5 items-center mb-2">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-violet-500 to-primary text-white shadow-lg shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Knowledge Check
              </p>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                Quiz: How well do you remember the test structure?
              </h2>
              <p className="text-sm text-muted-foreground mt-1.5">
                {quizQuestions.length} questions · Answer all then submit to see your score and detailed explanations.
              </p>
            </div>
          </div>
          <img
            src={chibiTrophy}
            alt="Chibi trophy mascot"
            loading="lazy"
            width={512}
            height={512}
            className="hidden md:block w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-xl"
          />
        </div>

        {/* Progress bar */}
        <div className="relative mt-5 mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span className="font-semibold uppercase tracking-wide">Progress</span>
            <span className="font-bold text-foreground">
              {totalAnswered}/{quizQuestions.length}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(totalAnswered / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="relative space-y-5">
          {quizQuestions.map((q, qIdx) => {
            const userAnswer = quizAnswers[qIdx];
            const isCorrect = userAnswer === q.correct;
            return (
              <div key={qIdx} className="rounded-2xl border-2 border-border bg-background/70 p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <span className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-primary text-white font-bold text-sm flex items-center justify-center shadow-md">
                    {qIdx + 1}
                  </span>
                  <p className="text-base font-bold text-foreground leading-relaxed pt-1">
                    {q.question}
                  </p>
                </div>

                <div className="grid gap-2 ml-11">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectOpt = q.correct === optIdx;
                    let optClass = "border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5";
                    if (showQuizResults) {
                      if (isCorrectOpt) optClass = "border-emerald-500/60 bg-emerald-500/10";
                      else if (isSelected && !isCorrectOpt) optClass = "border-rose-500/60 bg-rose-500/10";
                      else optClass = "border-border bg-background/30 opacity-60";
                    } else if (isSelected) {
                      optClass = "border-primary bg-primary/10";
                    }
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(qIdx, optIdx)}
                        disabled={showQuizResults}
                        className={`flex items-start gap-3 p-3 rounded-xl border-2 text-left text-sm transition-all ${optClass} ${!showQuizResults && "cursor-pointer"}`}
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 text-foreground/90 pt-1">{opt}</span>
                        {showQuizResults && isCorrectOpt && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {showQuizResults && isSelected && !isCorrectOpt && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submit */}
                <AnimatePresence>
                  {showQuizResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 ml-11 p-3.5 rounded-xl border-2 ${isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"}`}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        {isCorrect ? (
                          <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> <span className="text-emerald-700 dark:text-emerald-400">Correct!</span></>
                        ) : (
                          <><Lightbulb className="w-3.5 h-3.5 text-amber-600" /> <span className="text-amber-700 dark:text-amber-400">Explanation</span></>
                        )}
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {q.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Submit / Reset */}
        <div className="relative mt-6 flex flex-wrap items-center gap-3">
          {!showQuizResults ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-primary text-white font-bold shadow-lg hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trophy className="w-4 h-4" />
              Submit Answers
              {!allAnswered && (
                <span className="text-xs opacity-80 font-normal">({quizQuestions.length - totalAnswered} left)</span>
              )}
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/40 bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Quiz
            </button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showQuizResults && (
            <motion.div
              id="quiz-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative mt-6 p-5 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-violet-500/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-primary text-white shadow-lg">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    Your Result
                  </p>
                  <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {correctCount}/{quizQuestions.length}
                    <span className="text-base font-normal text-muted-foreground ml-2">
                      ({Math.round((correctCount / quizQuestions.length) * 100)}%)
                    </span>
                  </p>
                  <p className="text-sm text-foreground/85 mt-1.5">
                    {correctCount === quizQuestions.length
                      ? "🏆 Excellent! You've mastered the IELTS test structure."
                      : correctCount >= quizQuestions.length * 0.75
                      ? "👏 Well done! Review the missed questions to fully solidify your knowledge."
                      : correctCount >= quizQuestions.length * 0.5
                      ? "💪 Decent! Scroll up to re-read the lecture and retake the quiz."
                      : "📚 Re-read the lecture above carefully and retake the quiz to reinforce your knowledge."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IeltsExamBreakdown;
