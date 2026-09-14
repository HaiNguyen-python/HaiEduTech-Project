/**
 * @file ScratchAdventure.tsx
 * @description Scratch Coding Adventure - 12 progressive game-building missions for middle-school
 * students. All missions are fully unlocked. Each card opens a detail modal with learning goals,
 * step-by-step block instructions, an "Open in Scratch" launcher, and a star-earning button.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Star,
  Sparkles,
  ArrowLeft,
  Apple,
  Cat,
  Map,
  BookOpen,
  Zap,
  Trophy,
  Play,
  X,
  ExternalLink,
  CheckCircle2,
  Music,
  Ghost,
  Paintbrush,
  Timer,
  Bug,
  Bot,
  Gamepad2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";

// ---------- Mission data ----------
interface Mission {
  id: number;
  title: string;
  subLabel: string;
  description: string;
  icon: typeof Apple;
  emoji: string;
  gradient: string;       // header gradient
  goals: string[];        // learning goals
  steps: string[];        // step-by-step block instructions
  scratchUrl: string;     // Scratch project or editor URL
}

// Each mission links to a curated Scratch starter project / tutorial
// so learners land on a relevant example instead of an empty editor.

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Catching Falling Apples",
    subLabel: "MY FIRST VARIABLE",
    description: "Get familiar with scoring by catching objects.",
    icon: Apple,
    emoji: "🍎",
    gradient: "from-[#FF8C1A] to-[#FFB347]",
    goals: [
      "Understand variables and how to +1 score",
      "Use sensing blocks for touching",
      "Basic X/Y coordinate concepts",
    ],
    steps: [
      "Create a Bucket at the bottom, move with Left/Right keys.",
      "Create an Apple sprite, use 'go to random position' and 'glide' down.",
      "Create a 'Score' variable. When apple touches bucket → 'change Score by 1'.",
      "When apple touches bottom edge → 'change Score by -1' (lose life).",
      "Decorate the background and add a 'pop' sound when caught.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=catch%20apple%20game",
  },
  {
    id: 2,
    title: "Flappy Cat Adventure",
    subLabel: "COORDINATES & GRAVITY",
    description: "Build your own Flappy Bird style game.",
    icon: Cat,
    emoji: "🐱",
    gradient: "from-[#1E90FF] to-[#38BDF8]",
    goals: [
      "Simulate gravity with a velocity variable",
      "Spawn obstacles that move continuously",
      "Detect collisions with obstacles",
    ],
    steps: [
      "Create a Cat. When Space key is pressed → set 'velocity to 8'.",
      "Repeat forever: 'change y by velocity' and 'change velocity by -1' (gravity).",
      "Create a Green Pipe sprite, clone every 1.5s and glide right to left.",
      "When Cat touches pipe or bottom → 'stop all' and show 'Game Over'.",
      "Add score every time a pipe leaves the screen.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=flappy%20cat",
  },
  {
    id: 3,
    title: "Maze Arena",
    subLabel: "DIRECTIONAL CONTROLS",
    description: "Program arrow keys to navigate your character.",
    icon: Map,
    emoji: "🗺️",
    gradient: "from-[#FFD400] to-[#FFA500]",
    goals: [
      "Control 4 directions using arrow keys",
      "Detect collisions by color (maze walls)",
      "Clear win/loss conditions",
    ],
    steps: [
      "Draw a maze background with black walls.",
      "Create a small player sprite. Arrow keys to change x/y by 4.",
      "If 'touching color black' → 'change x/y' in reverse to stay back.",
      "Place a goal star 🌟. When touched → show 'You Win!'.",
      "Add a 30s countdown timer to increase challenge.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=maze%20game",
  },
  {
    id: 4,
    title: "English Spin-Off",
    subLabel: "VOCABULARY GAME",
    description: "Create a fun interactive English vocabulary quiz game.",
    icon: BookOpen,
    emoji: "🎡",
    gradient: "from-[#10B981] to-[#34D399]",
    goals: [
      "Use lists to store vocabulary",
      "Use 'ask ... and wait' blocks for user input",
      "Count correct and incorrect answers",
    ],
    steps: [
      "Create 2 lists: 'English Words' and 'Vietnamese Meanings'.",
      "Create variable 'i' = random index in the word list.",
      "Ask 'item i of English' and compare with 'item i of Meaning'.",
      "If correct → add score and play applause; if wrong → sad sound.",
      "Loop 10 questions then show the final score summary.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=english%20vocabulary%20quiz",
  },
  {
    id: 5,
    title: "Asteroid Dodger",
    subLabel: "CLONE BULLETS",
    description: "Learn how to clone entities to make a space shooter game.",
    icon: Zap,
    emoji: "☄️",
    gradient: "from-[#A855F7] to-[#EC4899]",
    goals: [
      "Use 'create clone of myself'",
      "Manage multiple entities simultaneously",
      "Game loop with HP and scoring system",
    ],
    steps: [
      "Create a Spaceship, move horizontally with arrow keys.",
      "Press Space → 'create clone of Bullet'. Clone flies upward.",
      "Create Asteroids at the top, clone every 1s and drop down.",
      "When bullet hits asteroid → 'delete this clone' + add score.",
      "When spaceship hits asteroid → lose HP; if HP=0, 'Game Over'.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=space%20shooter%20asteroid",
  },
  {
    id: 6,
    title: "Creative Project",
    subLabel: "FINAL CAPSTONE",
    description: "Students submit links to their own original games.",
    icon: Trophy,
    emoji: "🏆",
    gradient: "from-[#F43F5E] to-[#FB7185]",
    goals: [
      "Come up with your own game idea",
      "Apply skills learned from the previous 5 missions",
      "Present & share your project link",
    ],
    steps: [
      "Pick a genre: arcade, maze, quiz, platformer...",
      "Draw at least 2 sprites and 2 unique backgrounds.",
      "Include a score variable + clear win/loss conditions.",
      "Add sounds and polished visual effects.",
      "Click 'Share' on Scratch and send the link to Teacher Hai.",
    ],
    scratchUrl: "https://scratch.mit.edu/ideas",
  },
  {
    id: 7,
    title: "Scratch Band",
    subLabel: "MUSIC & LOOPS",
    description: "Program an automatic drum set that plays catchy tunes.",
    icon: Music,
    emoji: "🥁",
    gradient: "from-[#06B6D4] to-[#0EA5E9]",
    goals: [
      "Use Scratch's Music extension",
      "'repeat' loops to create rhythms",
      "Coordinating multiple sprites simultaneously",
    ],
    steps: [
      "Enable the 'Music' extension in the bottom left.",
      "Create 3 sprites: Drum, Beat, Piano. Each has its own loop.",
      "Use 'play drum (1) for 0.25 beats' in 4/4 time.",
      "Have the Piano play notes C-D-E-F-G.",
      "Press the green flag → all 3 sprites play music together.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=music%20drum%20band",
  },
  {
    id: 8,
    title: "Ghost Hunter Night",
    subLabel: "SHOW/HIDE & SCORE",
    description: "A mysterious Halloween version of whack-a-mole.",
    icon: Ghost,
    emoji: "👻",
    gradient: "from-[#7C3AED] to-[#A855F7]",
    goals: [
      "Use 'show' / 'hide' and 'go to random position'",
      "Listen for mouse click events",
      "Countdown timer",
    ],
    steps: [
      "Create a Ghost. Loop: show, wait 0.8s, hide, random wait.",
      "Each show, 'go to random position' within the field.",
      "When 'this sprite clicked' → add score + play 'boom'.",
      "Create variable 'Time' = 30, decrease by 1 each second.",
      "When Time = 0 → 'stop all' and show final score.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=whack%20a%20ghost",
  },
  {
    id: 9,
    title: "Free Drawing Studio",
    subLabel: "PEN TOOL",
    description: "Turn your mouse into a paintbrush with a rainbow palette.",
    icon: Paintbrush,
    emoji: "🎨",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    goals: [
      "Use the Pen extension",
      "Track mouse position",
      "Change stroke color and thickness",
    ],
    steps: [
      "Enable 'Pen' extension. Create a small Brush sprite.",
      "Repeat forever: 'go to mouse pointer'.",
      "If 'mouse down?' → 'pen down', otherwise 'pen up'.",
      "Each tick → 'change pen color by 2' for a rainbow effect.",
      "Press C key → 'erase all' to clear the canvas.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=pen%20drawing%20rainbow",
  },
  {
    id: 10,
    title: "Time Trial Racing",
    subLabel: "TIMER & SPEED",
    description: "Program a racing game that tracks the fastest lap time.",
    icon: Timer,
    emoji: "🏎️",
    gradient: "from-[#EF4444] to-[#F97316]",
    goals: [
      "Use 'timer' and 'reset timer'",
      "Update speed based on acceleration",
      "Detect the finish line by color",
    ],
    steps: [
      "Draw an oval track with a white starting line.",
      "Create a Car with 'speed' = 0; Up key → 'change speed by 0.5'.",
      "Loop: 'move (speed) steps' and 'change speed by -0.05' (friction).",
      "Left/Right arrows → 'turn ±5 degrees'.",
      "After leaving the line, on re-touch → show 'timer' then 'reset'.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=racing%20car%20timer",
  },
  {
    id: 11,
    title: "Math Ninja",
    subLabel: "MATH IN GAMING",
    description: "A mental math practice game for all ages.",
    icon: Bug,
    emoji: "🧮",
    gradient: "from-[#22C55E] to-[#16A34A]",
    goals: [
      "Generate random numbers",
      "Compare user-input answers",
      "Manage score and combos",
    ],
    steps: [
      "Variables 'a', 'b' = random 1-20; pick random +, -, *.",
      "Display 'a ? b = ?' and 'ask ... and wait'.",
      "Calculate correct answer and compare with user input.",
      "Correct → +10 score, combo +1; Incorrect → reset combo.",
      "Loop 10 times then show final rank (White → Red Ninja).",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=math%20ninja%20quiz",
  },
  {
    id: 12,
    title: "Smart Cat Chatbot",
    subLabel: "MY FIRST AI",
    description: "Program a chatbot that answers simple questions.",
    icon: Bot,
    emoji: "🤖",
    gradient: "from-[#0EA5E9] to-[#6366F1]",
    goals: [
      "Use 'if/else if' structures",
      "Accept user input",
      "Simple 'pattern matching' concept",
    ],
    steps: [
      "Cat says 'Hello! What do you want to ask?' then 'ask... and wait'.",
      "If 'answer contains name' → reply 'My name is Scratchy'.",
      "If 'contains weather' → 'The weather is beautiful today!'.",
      "If no match → 'Sorry, I don't understand, try again.'",
      "Repeat loop until user types 'bye'.",
    ],
    scratchUrl: "https://scratch.mit.edu/search/projects?q=chatbot%20cat",
  },
];

const STORAGE_KEY = "haiedu_scratch_adventure_stars_v2";
type StarsMap = Record<number, number>;

const ScratchAdventure = () => {
  const [stars, setStars] = useState<StarsMap>({});
  const [openMission, setOpenMission] = useState<Mission | null>(null);

  // Load locally-saved stars
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStars(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (openMission) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openMission]);

  const persist = (next: StarsMap) => {
    setStars(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const totalStars = useMemo(
    () => Object.values(stars).reduce((a, b) => a + Math.min(3, b || 0), 0),
    [stars],
  );
  const completedMissions = useMemo(
    () => Object.values(stars).filter((s) => (s || 0) >= 1).length,
    [stars],
  );
  const progressPct = (completedMissions / MISSIONS.length) * 100;

  const handleEarnStar = (m: Mission) => {
    const current = stars[m.id] || 0;
    if (current >= 3) {
      toast.success("You've reached the 3-star maximum for this mission! 🌟");
      return;
    }
    persist({ ...stars, [m.id]: current + 1 });
    toast.success(`"+1 star for "${m.title}"! 🌟`);
  };

  const handleResetMission = (m: Mission) => {
    const next = { ...stars };
    delete next[m.id];
    persist(next);
    toast.message("Mission progress reset.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7EC] via-background to-background dark:from-[#1a120a]">
      <SEO
        title="Scratch Coding Adventure | HaiEduTech"
        description="12 creative Scratch coding missions for middle-school learners, from catching apples and building mazes to chatbots and original capstone projects."
        path="/programming/scratch-adventure"
      />
      <Navbar />

      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Back link */}
          <Link
            to="/programming"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-[#FF8C1A] transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Programming Hub
          </Link>

          {/* ===== Progress Banner ===== */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border-2 border-[#FF8C1A]/40 bg-gradient-to-r from-[#FF8C1A] via-[#FFB347] to-[#FFD400] text-white p-5 sm:p-7 shadow-xl mb-8"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 w-56 h-56 rounded-full bg-[#1E90FF]/30 blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-5">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-4xl sm:text-5xl shrink-0 ring-4 ring-white/30"
                aria-hidden
              >
                🐱
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/25 backdrop-blur text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2">
                   <Sparkles className="w-3 h-3" /> Scratch Coding Adventure · Middle School
                </div>
                <h1 className="font-display font-black text-2xl sm:text-4xl leading-tight mb-1 drop-shadow">
                  Scratch Coding Adventure{" "}
                  <Rocket className="inline-block w-7 h-7 sm:w-9 sm:h-9 -mt-1" />
                </h1>
                <p className="text-white/95 text-xs sm:text-sm max-w-xl">
                  {MISSIONS.length} real game-building missions - all fully unlocked! Click any card to start.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#FF8C1A] font-extrabold text-xs sm:text-sm shadow-md">
                    <Rocket className="w-4 h-4" />
                    Missions completed: {completedMissions}/{MISSIONS.length}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#1E40AF] font-extrabold text-xs sm:text-sm shadow-md">
                    <Star className="w-4 h-4 fill-[#FFD400] text-[#FFB300]" />
                    Scratch Stars: {totalStars}/{MISSIONS.length * 3}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md">
                    <Gamepad2 className="w-4 h-4" />
                    100% FREE
                  </div>
                </div>

                <div className="mt-3 h-2.5 w-full rounded-full bg-white/30 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-white to-[#FFD400] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== Missions Grid ===== */}
          <section aria-label="Coding missions">
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF8C1A]" />
              {MISSIONS.length} Game building missions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {MISSIONS.map((m, idx) => {
                const earned = Math.min(3, stars[m.id] || 0);
                const Icon = m.icon;

                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(idx, 6) * 0.06,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOpenMission(m)}
                    className="group relative text-left rounded-3xl overflow-hidden border-4 border-emerald-500 dark:border-emerald-400 bg-white dark:bg-card shadow-[0_6px_0_0_rgba(16,185,129,0.85)] hover:shadow-[0_10px_0_0_rgba(16,185,129,0.9)] hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
                  >
                    {/* Color header */}
                    <div className={`relative h-28 bg-gradient-to-br ${m.gradient} p-4 flex items-start justify-between`}>
                      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_20%,white_0%,transparent_45%)]" />
                      <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur flex items-center justify-center text-2xl ring-2 ring-white/50">
                          <span aria-hidden>{m.emoji}</span>
                        </div>
                        <div className="text-white">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-95">
                            Mission {m.id}
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider bg-black/15 inline-block px-1.5 py-0.5 rounded mt-0.5">
                            {m.subLabel}
                          </div>
                        </div>
                      </div>

                      <span className="relative inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white text-[#10B981] text-[10px] font-black uppercase shadow">
                        <Play className="w-3 h-3 fill-current" /> FREE
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start gap-2 mb-2">
                        <Icon className="w-5 h-5 text-[#FF8C1A] shrink-0 mt-0.5" />
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-foreground leading-tight">
                          {m.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
                        {m.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                         <div className="flex gap-1" aria-label={`${earned} of 3 stars earned`}>
                          {[0, 1, 2].map((i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 transition ${
                                i < earned
                                  ? "fill-[#FFD400] text-[#FFB300] drop-shadow"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-[#FF8C1A] group-hover:translate-x-0.5 transition">
                          Start →
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* ===== Mission Detail Modal ===== */}
      <AnimatePresence>
        {openMission && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenMission(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl"
            >
              {/* Header */}
              <div className={`relative rounded-t-3xl bg-gradient-to-r ${openMission.gradient} text-white px-5 sm:px-7 py-5`}>
                <button
                  onClick={() => setOpenMission(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition"
                   aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-3xl ring-2 ring-white/40">
                    {openMission.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-95">
                      Mission {openMission.id} · {openMission.subLabel}
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-2xl leading-tight">
                      {openMission.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 sm:px-7 py-5 space-y-5">
                <p className="text-sm text-foreground leading-relaxed">
                  {openMission.description}
                </p>

                {/* Goals */}
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#FF8C1A] mb-2">
                    🎯 Learning goals
                  </div>
                  <ul className="space-y-1.5">
                    {openMission.goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E90FF] mb-2">
                    🧱 Step-by-step instructions
                  </div>
                  <ol className="space-y-2">
                    {openMission.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C1A] to-[#F43F5E] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed pt-0.5">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Stars row */}
                <div className="rounded-2xl border-2 border-amber-300/50 bg-amber-50 dark:bg-amber-950/20 p-4 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-xs font-bold text-foreground">Your progress</div>
                    <div className="flex gap-1 mt-1">
                      {[0, 1, 2].map((i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.min(3, stars[openMission.id] || 0)
                              ? "fill-[#FFD400] text-[#FFB300]"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(stars[openMission.id] || 0) > 0 && (
                      <button
                        onClick={() => handleResetMission(openMission)}
                        className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-bold text-muted-foreground hover:text-foreground transition"
                      >
                        Reset
                      </button>
                    )}
                    <button
                      onClick={() => handleEarnStar(openMission)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow hover:brightness-110 transition flex items-center gap-1.5"
                    >
                       <Star className="w-4 h-4 fill-white" /> +1 Star
                    </button>
                  </div>
                </div>

                {/* CTA: Open in Scratch */}
                <a
                  href={openMission.scratchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF8C1A] to-[#F43F5E] text-white font-extrabold text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Scratch & start coding
                </a>
                <p className="text-[11px] text-center text-muted-foreground -mt-2">
                  Will open the official Scratch editor in a new tab.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScratchAdventure;
