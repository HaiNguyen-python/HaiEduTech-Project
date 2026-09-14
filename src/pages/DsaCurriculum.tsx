import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Network,
  ListOrdered,
  Layers,
  GitBranch,
  Share2,
  Search,
  ArrowDownAZ,
  Repeat,
  Sparkles,
  Code2,
  Filter,
  BookOpen,
  Gauge,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Hash,
  Sigma,
  Binary,
  Calculator,
  Dice5,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dsaLessons, type DsaSectionId, type DsaQuiz } from "@/data/dsaLessons";
import { dsaExtraQuizzes } from "@/data/dsaExtraQuizzes";
import DsaTheoryText from "@/components/programming/DsaTheoryText";
import CodeBlock from "@/components/CodeBlock";

type Tier = "easy" | "medium" | "hard";

interface DsaTopic {
  icon: typeof Network;
  
  titleEn: string;
  
  descEn: string;
}

interface DsaSection {
  id: string;
  
  titleEn: string;
  accent: string; // gradient classes
  topics: DsaTopic[];
}

interface DsaExercise {
  tier: Tier;
  
  titleEn: string;
  
  hintEn: string;
}

const sections: DsaSection[] = [
  {
    id: "linear",
    titleEn: "Part 1: Linear Data Structures",
    accent: "from-blue-500 to-cyan-500",
    topics: [
      {
        icon: ListOrdered,
        titleEn: "Arrays & Linked Lists",
        descEn:
          "Sequential storage, indexed access, insertion/deletion patterns and performance trade-offs between arrays and linked lists.",
      },
      {
        icon: Layers,
        titleEn: "Stack & Queue",
        descEn:
          "LIFO/FIFO principles with applications in expression parsing, undo systems, and process simulations.",
      },
    ],
  },
  {
    id: "nonlinear",
    titleEn: "Part 2: Non-Linear Data Structures",
    accent: "from-emerald-500 to-teal-500",
    topics: [
      {
        icon: GitBranch,
        titleEn: "Trees & Binary Search Trees",
        descEn:
          "Tree concepts, traversal strategies (in-order, pre-order, post-order) and BST search properties.",
      },
      {
        icon: Share2,
        titleEn: "Graph Concepts",
        descEn:
          "Adjacency matrix/list representations, BFS/DFS traversal and real-world use cases.",
      },
    ],
  },
  {
    id: "algos",
    titleEn: "Part 3: Essential Algorithms",
    accent: "from-violet-500 to-fuchsia-500",
    topics: [
      {
        icon: Search,
        titleEn: "Searching Algorithms",
        descEn: "Linear Search and Binary Search techniques.",
      },
      {
        icon: ArrowDownAZ,
        titleEn: "Sorting Algorithms",
        descEn: "Bubble Sort, Selection Sort, Merge Sort and Quick Sort.",
      },
      {
        icon: Repeat,
        titleEn: "Recursion & Big O Notation",
        descEn:
          "Decomposing problems with recursion and reasoning about algorithmic complexity via Big O.",
      },
    ],
  },
  {
    id: "applied-math",
    titleEn: "Part 4: Applied Math for IT",
    accent: "from-amber-500 to-orange-500",
    topics: [
      {
        icon: Hash,
        titleEn: "Hashing & Hash Functions",
        descEn:
          "Hash functions, collisions, hash tables, MD5/SHA for passwords — the foundation of HashMaps, caches and blockchains.",
      },
      {
        icon: Sigma,
        titleEn: "Modular Arithmetic & GCD/LCM",
        descEn:
          "Modulo, modular inverse, Euclid's algorithm, used in RSA cryptography and divisibility checks.",
      },
      {
        icon: Binary,
        titleEn: "Bit Manipulation",
        descEn:
          "AND, OR, XOR, shifts, bitmasks — memory tricks, parity checks, swap without temp variables.",
      },
      {
        icon: Dice5,
        titleEn: "Probability & Combinatorics",
        descEn:
          "Permutations, combinations, expectation, used in A/B testing, probabilistic hashing (Bloom filter) and randomized algorithm analysis.",
      },
      {
        icon: Calculator,
        titleEn: "Linear Algebra for ML/AI",
        descEn:
          "Vectors, matrices, matrix multiplication, vector spaces — the foundation of ML, computer graphics and semantic search.",
      },
      {
        icon: Network,
        titleEn: "Advanced Graph Theory",
        descEn:
          "PageRank, network flow, Union-Find — used in web ranking, social networks and community detection.",
      },
    ],
  },
];

const exercises: DsaExercise[] = [
  // Easy
  {
    tier: "easy",
    titleEn: "Reverse a string using Stack",
    hintEn: "Push each character onto a stack then pop them out to rebuild the reversed string.",
  },
  {
    tier: "easy",
    titleEn: "Find the second largest element",
    hintEn: "Single pass through the array, keeping max1 and max2 trackers.",
  },
  {
    tier: "easy",
    titleEn: "Valid Parentheses checking",
    hintEn: "Use a stack to match opening and closing bracket pairs.",
  },
  // Medium
  {
    tier: "medium",
    titleEn: "Binary Search implementation",
    hintEn: "Halve the search space by comparing against the middle element.",
  },
  {
    tier: "medium",
    titleEn: "Linked List Cycle Detection",
    hintEn: "Apply Floyd's tortoise-and-hare two pointer technique.",
  },
  {
    tier: "medium",
    titleEn: "Shortest path on a graph (basic BFS)",
    hintEn: "Use a queue and a visited set to traverse layer by layer.",
  },
  // Hard
  {
    tier: "hard",
    titleEn: "Optimal sort with Quick Sort / Merge Sort",
    hintEn: "Apply divide-and-conquer and manage recursion carefully.",
  },
  {
    tier: "hard",
    titleEn: "Binary tree traversal and maximum depth",
    hintEn: "Recursive DFS or an explicit stack-based traversal.",
  },
  {
    tier: "hard",
    titleEn: "Two Pointers or Sliding Window applications",
    hintEn: "Optimise array/string problems from O(n²) down to O(n).",
  },
  // Extended easy
  {
    tier: "easy",
    titleEn: "Character frequency with Hash Map",
    hintEn: "Iterate through the string, increment a dict counter per character.",
  },
  {
    tier: "easy",
    titleEn: "Palindrome check with two pointers",
    hintEn: "Compare first and last characters, move both pointers toward the middle.",
  },
  {
    tier: "easy",
    titleEn: "Classic FizzBuzz",
    hintEn: "Check divisibility by 15 first, then by 3 and 5 individually.",
  },
  // Extended medium
  {
    tier: "medium",
    titleEn: "Top K largest elements with a Heap",
    hintEn: "Maintain a size-K min-heap while iterating.",
  },
  {
    tier: "medium",
    titleEn: "Climbing Stairs",
    hintEn: "Basic DP recurrence: dp[i] = dp[i-1] + dp[i-2].",
  },
  {
    tier: "medium",
    titleEn: "Activity Selection (Greedy)",
    hintEn: "Sort by end time, then pick greedily from the earliest.",
  },
  // Extended hard
  {
    tier: "hard",
    titleEn: "Longest Increasing Subsequence — O(n log n)",
    hintEn: "Patience sorting with Binary Search over the tails array.",
  },
  {
    tier: "hard",
    titleEn: "0/1 Knapsack problem",
    hintEn: "2D DP dp[i][w] or 1D optimisation traversing weights in reverse.",
  },
  {
    tier: "hard",
    titleEn: "Dijkstra shortest path",
    hintEn: "Min-heap + weighted adjacency list. Relax edges.",
  },
  // Applied math
  {
    tier: "easy",
    titleEn: "Compute GCD via Euclid's algorithm",
    hintEn: "gcd(a,b) = gcd(b, a mod b), stop when b = 0.",
  },
  {
    tier: "easy",
    titleEn: "Check odd/even using bitwise AND",
    hintEn: "n & 1 → 0 if even, 1 if odd.",
  },
  {
    tier: "medium",
    titleEn: "Count set bits (Hamming weight)",
    hintEn: "Trick: n & (n-1) clears the lowest set bit each iteration.",
  },
  {
    tier: "medium",
    titleEn: "Rolling hash for string matching (Rabin-Karp)",
    hintEn: "Sliding-window hash with prime modulus, O(n+m) matching.",
  },
  {
    tier: "medium",
    titleEn: "Modular inverse via Fermat's little theorem",
    hintEn: "When p is prime: a^(-1) ≡ a^(p-2) (mod p), via fast exponentiation.",
  },
  {
    tier: "hard",
    titleEn: "Simple PageRank on a small web graph",
    hintEn: "Iterate matrix-vector multiplication until the score vector converges.",
  },
  {
    tier: "hard",
    titleEn: "Union-Find (DSU) with path compression",
    hintEn: "find() compresses paths, union-by-rank — near O(1) amortised.",
  },
];

const tierMeta: Record<Tier, {  labelEn: string; badge: string; border: string }> = {
  easy: {
    labelEn: "Easy",
    badge: "bg-green-500/15 text-green-600 border-green-500/30 dark:text-green-400",
    border: "border-green-500/30 hover:border-green-500/60",
  },
  medium: {
    labelEn: "Medium",
    badge: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30 dark:text-yellow-400",
    border: "border-yellow-500/30 hover:border-yellow-500/60",
  },
  hard: {
    labelEn: "Hard",
    badge: "bg-red-500/15 text-red-600 border-red-500/30 dark:text-red-400",
    border: "border-red-500/30 hover:border-red-500/60",
  },
};

const sectionLabel: Record<DsaSectionId, { en: string }> = {
  linear: { vi: "Linear", en: "Linear" },
  nonlinear: { vi: "Non-linear", en: "Non-linear" },
  algos: { vi: "Algorithms", en: "Algorithms" },
};

const DsaCurriculum = () => {
  
  const [tier, setTier] = useState<Tier | "all">("all");
  const [lessonFilter, setLessonFilter] = useState<DsaSectionId | "all">("all");
  const [openLesson, setOpenLesson] = useState<string | null>(dsaLessons[0]?.id ?? null);
  const [quizPick, setQuizPick] = useState<Record<string, number>>({});

  const visibleLessons = useMemo(
    () => (lessonFilter === "all" ? dsaLessons : dsaLessons.filter((l) => l.sectionId === lessonFilter)),
    [lessonFilter],
  );

  const filteredExercises = useMemo(
    () => (tier === "all" ? exercises : exercises.filter((e) => e.tier === tier)),
    [tier],
  );

  const tierTabs: Array<{ id: Tier | "all";  labelEn: string }> = [
    { id: "all", labelVi: "All", labelEn: "All" },
    { id: "easy", labelVi: "Easy", labelEn: "Easy" },
    { id: "medium", labelVi: "Medium", labelEn: "Medium" },
    { id: "hard", labelVi: "Hard", labelEn: "Hard" },
  ];

  const lessonTabs: Array<{ id: DsaSectionId | "all"; en: string }> = [
    { id: "all", vi: "All", en: "All" },
    { id: "linear", vi: "Linear", en: "Linear" },
    { id: "nonlinear", vi: "Non-linear", en: "Non-linear" },
    { id: "algos", vi: "Algorithms", en: "Algorithms" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link
            to="/programming"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {"Back to Programming"}
          </Link>

          {/* Hero */}
          <section className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Network className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {"Data Structures & Algorithms"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {\"A foundation roadmap to build solid algorithmic thinking — from linear structures to graphs, trees and classic algorithms.\"}
            </p>

            {/* Quick navigation */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <a
                href="#curriculum"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                📚 {"Curriculum"}
              </a>
              <a
                href="#lessons"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                📖 {"Lessons"}
              </a>
              <a
                href="#practice"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-emerald-500 text-white shadow hover:opacity-90 transition-opacity"
              >
                💪 {"Practice Bank"}
              </a>
            </div>
          </section>

          {/* Curriculum sections */}
          <section id="curriculum" className="space-y-10 mb-16 scroll-mt-24">

            {sections.map((sec, idx) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`inline-block w-1.5 h-8 rounded-full bg-gradient-to-b ${sec.accent}`}
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {sec.titleEn}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sec.topics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={topic.titleEn}
                        className="glass-card rounded-2xl p-5 border border-border/60 hover:border-primary/50 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sec.accent} flex items-center justify-center shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground mb-1">
                              {topic.titleEn}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {topic.descEn}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Lessons */}
          <section id="lessons" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                {"Detailed Lessons"}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {\"Fifteen lessons with theory, Python examples, complexity analysis and reinforcement quizzes.\"}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {lessonTabs.map((tab) => {
                const active = lessonFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLessonFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.en}
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {visibleLessons.map((lesson, i) => {
                const open = openLesson === lesson.id;
                const extras = dsaExtraQuizzes[lesson.id] ?? [];
                const allQuizzes: DsaQuiz[] = [lesson.quiz, ...extras];
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="glass-card rounded-2xl border border-border/60 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenLesson(open ? null : lesson.id)}
                      className="w-full text-left p-5 flex items-start gap-4 hover:bg-muted/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {lang === "vi"
                              ? sectionLabel[lesson.sectionId].vi
                              : sectionLabel[lesson.sectionId].en}
                          </Badge>
                          <h3 className="font-semibold text-foreground">
                            {lesson.titleEn}
                          </h3>
                          <Badge variant="secondary" className="text-[10px]">
                            {allQuizzes.length} {"quizzes"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {lesson.summaryEn}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {open ? "▲" : "▼"}
                      </span>
                    </button>

                    {open && (
                      <div className="px-5 pb-5 space-y-4 border-t border-border/60 pt-4">
                        <DsaTheoryText
                          text={lesson.theoryEn}
                          lang={lang}
                        />

                        <CodeBlock
                          code={lesson.code}
                          language={lesson.codeLanguage || "python"}
                        />

                        <div className="flex items-start gap-2 text-sm bg-primary/5 border border-primary/20 rounded-lg p-3">
                          <Gauge className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground">
                            {lesson.complexityEn}
                          </span>
                        </div>

                        <div className="rounded-xl border border-border/60 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-semibold text-foreground">
                              {`Reinforcement Quiz (${allQuizzes.length} questions)`}
                            </span>
                          </div>
                          <div className="space-y-5">
                            {allQuizzes.map((q, qi) => {
                              const qKey = `${lesson.id}:${qi}`;
                              const picked = quizPick[qKey];
                              const correct = picked === q.answer;
                              return (
                                <div key={qKey} className="pb-4 border-b border-border/40 last:border-0 last:pb-0">
                                  <p className="text-sm text-foreground mb-3">
                                    <span className="font-semibold text-primary mr-1">{qi + 1}.</span>
                                    {q.questionEn}
                                  </p>
                                  <div className="grid sm:grid-cols-2 gap-2">
                                    {q.options.map((opt, idx) => {
                                      const isPicked = picked === idx;
                                      const isAnswer = q.answer === idx;
                                      const show = picked !== undefined;
                                      const cls = !show
                                        ? "border-border/60 hover:border-primary/50"
                                        : isAnswer
                                        ? "border-green-500 bg-green-500/10"
                                        : isPicked
                                        ? "border-red-500 bg-red-500/10"
                                        : "border-border/40 opacity-60";
                                      return (
                                        <button
                                          key={idx}
                                          onClick={() =>
                                            setQuizPick((prev) => ({ ...prev, [qKey]: idx }))
                                          }
                                          className={`text-left text-sm px-3 py-2 rounded-lg border transition-all ${cls}`}
                                        >
                                          {String.fromCharCode(65 + idx)}. {opt}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {picked !== undefined && (
                                    <div
                                      className={`mt-3 flex items-start gap-2 text-sm ${
                                        correct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                      }`}
                                    >
                                      {correct ? (
                                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                                      ) : (
                                        <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                      )}
                                      <span>
                                        {q.explanationEn}
                                      </span>
                                    </div>
                                  )}
                                  {picked !== undefined && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="mt-2"
                                      onClick={() =>
                                        setQuizPick((prev) => {
                                          const next = { ...prev };
                                          delete next[qKey];
                                          return next;
                                        })
                                      }
                                    >
                                      {"Try again"}
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>


          {/* Exercise bank */}
          <section id="practice" className="scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                {"Practice Exercise Bank"}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {\"Pick the right difficulty tier and sharpen your algorithmic thinking.\"}
            </p>

            <div className="glass-card rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {"Filter by difficulty"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tierTabs.map((tab) => {
                  const active = tier === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setTier(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((ex, i) => {
                const meta = tierMeta[ex.tier];
                return (
                  <motion.div
                    key={ex.titleEn}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className={`rounded-2xl p-5 border bg-card transition-all hover:shadow-md ${meta.border}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-primary" />
                      </div>
                      <Badge variant="outline" className={`text-[10px] font-bold uppercase ${meta.badge}`}>
                        {meta.labelEn}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">
                      {ex.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {ex.hintEn}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DsaCurriculum;
