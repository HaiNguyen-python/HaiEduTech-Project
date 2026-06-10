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
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dsaLessons, type DsaSectionId, type DsaQuiz } from "@/data/dsaLessons";
import { dsaExtraQuizzes } from "@/data/dsaExtraQuizzes";
import DsaTheoryText from "@/components/programming/DsaTheoryText";
import CodeBlock from "@/components/CodeBlock";

type Tier = "easy" | "medium" | "hard";

interface DsaTopic {
  icon: typeof Network;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
}

interface DsaSection {
  id: string;
  titleVi: string;
  titleEn: string;
  accent: string; // gradient classes
  topics: DsaTopic[];
}

interface DsaExercise {
  tier: Tier;
  titleVi: string;
  titleEn: string;
  hintVi: string;
  hintEn: string;
}

const sections: DsaSection[] = [
  {
    id: "linear",
    titleVi: "Phần 1: Cấu trúc dữ liệu tuyến tính",
    titleEn: "Part 1: Linear Data Structures",
    accent: "from-blue-500 to-cyan-500",
    topics: [
      {
        icon: ListOrdered,
        titleVi: "Mảng (Arrays) & Danh sách liên kết (Linked Lists)",
        titleEn: "Arrays & Linked Lists",
        descVi:
          "Lưu trữ tuần tự, truy cập theo chỉ số, thao tác chèn/xóa và so sánh hiệu năng giữa Array và Linked List.",
        descEn:
          "Sequential storage, indexed access, insertion/deletion patterns and performance trade-offs between arrays and linked lists.",
      },
      {
        icon: Layers,
        titleVi: "Ngăn xếp (Stack) & Hàng đợi (Queue)",
        titleEn: "Stack & Queue",
        descVi:
          "Nguyên lý LIFO/FIFO, ứng dụng trong duyệt biểu thức, hoàn tác (undo), và mô phỏng tiến trình.",
        descEn:
          "LIFO/FIFO principles with applications in expression parsing, undo systems, and process simulations.",
      },
    ],
  },
  {
    id: "nonlinear",
    titleVi: "Phần 2: Cấu trúc dữ liệu phi tuyến tính",
    titleEn: "Part 2: Non-Linear Data Structures",
    accent: "from-emerald-500 to-teal-500",
    topics: [
      {
        icon: GitBranch,
        titleVi: "Cây bộ ba & Cây tìm kiếm nhị phân (BST)",
        titleEn: "Trees & Binary Search Trees",
        descVi:
          "Khái niệm cây, duyệt cây (in-order, pre-order, post-order) và tính chất tìm kiếm trên BST.",
        descEn:
          "Tree concepts, traversal strategies (in-order, pre-order, post-order) and BST search properties.",
      },
      {
        icon: Share2,
        titleVi: "Đồ thị cơ bản (Graphs)",
        titleEn: "Graph Concepts",
        descVi:
          "Biểu diễn đồ thị bằng ma trận/danh sách kề, duyệt BFS/DFS và các ứng dụng thực tế.",
        descEn:
          "Adjacency matrix/list representations, BFS/DFS traversal and real-world use cases.",
      },
    ],
  },
  {
    id: "algos",
    titleVi: "Phần 3: Các giải thuật nền tảng",
    titleEn: "Part 3: Essential Algorithms",
    accent: "from-violet-500 to-fuchsia-500",
    topics: [
      {
        icon: Search,
        titleVi: "Giải thuật Tìm kiếm",
        titleEn: "Searching Algorithms",
        descVi: "Tìm kiếm Tuyến tính (Linear Search) và Tìm kiếm Nhị phân (Binary Search).",
        descEn: "Linear Search and Binary Search techniques.",
      },
      {
        icon: ArrowDownAZ,
        titleVi: "Giải thuật Sắp xếp",
        titleEn: "Sorting Algorithms",
        descVi: "Bubble Sort, Selection Sort, Merge Sort và Quick Sort.",
        descEn: "Bubble Sort, Selection Sort, Merge Sort and Quick Sort.",
      },
      {
        icon: Repeat,
        titleVi: "Tư duy Đệ quy & Big O Notation",
        titleEn: "Recursion & Big O Notation",
        descVi:
          "Phân rã bài toán bằng đệ quy và đánh giá độ phức tạp thuật toán theo Big O.",
        descEn:
          "Decomposing problems with recursion and reasoning about algorithmic complexity via Big O.",
      },
    ],
  },
];

const exercises: DsaExercise[] = [
  // Easy
  {
    tier: "easy",
    titleVi: "Đảo ngược chuỗi sử dụng Stack",
    titleEn: "Reverse a string using Stack",
    hintVi: "Đẩy từng ký tự vào stack rồi pop ra để dựng chuỗi ngược.",
    hintEn: "Push each character onto a stack then pop them out to rebuild the reversed string.",
  },
  {
    tier: "easy",
    titleVi: "Tìm số lớn thứ hai trong mảng",
    titleEn: "Find the second largest element",
    hintVi: "Duyệt mảng một lần, giữ hai biến max1 và max2.",
    hintEn: "Single pass through the array, keeping max1 and max2 trackers.",
  },
  {
    tier: "easy",
    titleVi: "Kiểm tra chuỗi ngoặc hợp lệ",
    titleEn: "Valid Parentheses checking",
    hintVi: "Dùng stack để khớp các cặp ngoặc mở-đóng.",
    hintEn: "Use a stack to match opening and closing bracket pairs.",
  },
  // Medium
  {
    tier: "medium",
    titleVi: "Tìm kiếm nhị phân trên mảng đã sắp xếp",
    titleEn: "Binary Search implementation",
    hintVi: "Chia đôi không gian tìm kiếm dựa trên so sánh với phần tử giữa.",
    hintEn: "Halve the search space by comparing against the middle element.",
  },
  {
    tier: "medium",
    titleVi: "Phát hiện vòng lặp trong Danh sách liên kết",
    titleEn: "Linked List Cycle Detection",
    hintVi: "Áp dụng kỹ thuật hai con trỏ Floyd (rùa & thỏ).",
    hintEn: "Apply Floyd's tortoise-and-hare two pointer technique.",
  },
  {
    tier: "medium",
    titleVi: "Tìm đường đi ngắn nhất trên đồ thị (BFS cơ bản)",
    titleEn: "Shortest path on a graph (basic BFS)",
    hintVi: "Dùng hàng đợi và mảng visited để duyệt từng tầng.",
    hintEn: "Use a queue and a visited set to traverse layer by layer.",
  },
  // Hard
  {
    tier: "hard",
    titleVi: "Sắp xếp mảng tối ưu bằng Quick Sort / Merge Sort",
    titleEn: "Optimal sort with Quick Sort / Merge Sort",
    hintVi: "Phân tích chia để trị và quản lý đệ quy cẩn thận.",
    hintEn: "Apply divide-and-conquer and manage recursion carefully.",
  },
  {
    tier: "hard",
    titleVi: "Duyệt cây nhị phân và tìm chiều cao lớn nhất",
    titleEn: "Binary tree traversal and maximum depth",
    hintVi: "Đệ quy DFS hoặc dùng stack thủ công.",
    hintEn: "Recursive DFS or an explicit stack-based traversal.",
  },
  {
    tier: "hard",
    titleVi: "Ứng dụng Hai con trỏ (Two Pointers) hoặc Cửa sổ trượt (Sliding Window)",
    titleEn: "Two Pointers or Sliding Window applications",
    hintVi: "Tối ưu chuỗi bài toán mảng/chuỗi từ O(n²) xuống O(n).",
    hintEn: "Optimise array/string problems from O(n²) down to O(n).",
  },
  // Extended easy
  {
    tier: "easy",
    titleVi: "Đếm tần suất ký tự bằng Hash Map",
    titleEn: "Character frequency with Hash Map",
    hintVi: "Duyệt chuỗi, tăng đếm cho mỗi ký tự trong dict.",
    hintEn: "Iterate through the string, increment a dict counter per character.",
  },
  {
    tier: "easy",
    titleVi: "Kiểm tra Palindrome bằng hai con trỏ",
    titleEn: "Palindrome check with two pointers",
    hintVi: "So sánh ký tự đầu và cuối, di chuyển hai con trỏ vào giữa.",
    hintEn: "Compare first and last characters, move both pointers toward the middle.",
  },
  {
    tier: "easy",
    titleVi: "FizzBuzz cổ điển",
    titleEn: "Classic FizzBuzz",
    hintVi: "Kiểm tra chia hết cho 3 và 5 theo thứ tự kết hợp trước.",
    hintEn: "Check divisibility by 15 first, then by 3 and 5 individually.",
  },
  // Extended medium
  {
    tier: "medium",
    titleVi: "Top K phần tử lớn nhất bằng Heap",
    titleEn: "Top K largest elements with a Heap",
    hintVi: "Duy trì min-heap kích thước K trong khi duyệt.",
    hintEn: "Maintain a size-K min-heap while iterating.",
  },
  {
    tier: "medium",
    titleVi: "Leo cầu thang (Climbing Stairs)",
    titleEn: "Climbing Stairs",
    hintVi: "DP cơ bản: dp[i] = dp[i-1] + dp[i-2].",
    hintEn: "Basic DP recurrence: dp[i] = dp[i-1] + dp[i-2].",
  },
  {
    tier: "medium",
    titleVi: "Activity Selection (Tham lam)",
    titleEn: "Activity Selection (Greedy)",
    hintVi: "Sắp xếp theo thời gian kết thúc, chọn từ sớm nhất.",
    hintEn: "Sort by end time, then pick greedily from the earliest.",
  },
  // Extended hard
  {
    tier: "hard",
    titleVi: "Dãy con tăng dài nhất (LIS) O(n log n)",
    titleEn: "Longest Increasing Subsequence — O(n log n)",
    hintVi: "Patience sorting kết hợp Binary Search trên mảng tails.",
    hintEn: "Patience sorting with Binary Search over the tails array.",
  },
  {
    tier: "hard",
    titleVi: "Bài toán cái túi 0/1 (Knapsack)",
    titleEn: "0/1 Knapsack problem",
    hintVi: "DP 2D dp[i][w] hoặc tối ưu 1D duyệt ngược trọng số.",
    hintEn: "2D DP dp[i][w] or 1D optimisation traversing weights in reverse.",
  },
  {
    tier: "hard",
    titleVi: "Tìm đường ngắn nhất Dijkstra",
    titleEn: "Dijkstra shortest path",
    hintVi: "Min-heap + danh sách kề có trọng số. Thư giãn cạnh.",
    hintEn: "Min-heap + weighted adjacency list. Relax edges.",
  },
];

const tierMeta: Record<Tier, { labelVi: string; labelEn: string; badge: string; border: string }> = {
  easy: {
    labelVi: "Cơ bản",
    labelEn: "Easy",
    badge: "bg-green-500/15 text-green-600 border-green-500/30 dark:text-green-400",
    border: "border-green-500/30 hover:border-green-500/60",
  },
  medium: {
    labelVi: "Trung cấp",
    labelEn: "Medium",
    badge: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30 dark:text-yellow-400",
    border: "border-yellow-500/30 hover:border-yellow-500/60",
  },
  hard: {
    labelVi: "Nâng cao",
    labelEn: "Hard",
    badge: "bg-red-500/15 text-red-600 border-red-500/30 dark:text-red-400",
    border: "border-red-500/30 hover:border-red-500/60",
  },
};

const sectionLabel: Record<DsaSectionId, { vi: string; en: string }> = {
  linear: { vi: "Tuyến tính", en: "Linear" },
  nonlinear: { vi: "Phi tuyến tính", en: "Non-linear" },
  algos: { vi: "Giải thuật", en: "Algorithms" },
};

const DsaCurriculum = () => {
  const { t, lang } = useLanguage();
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

  const tierTabs: Array<{ id: Tier | "all"; labelVi: string; labelEn: string }> = [
    { id: "all", labelVi: "Tất cả", labelEn: "All" },
    { id: "easy", labelVi: "Cơ bản", labelEn: "Easy" },
    { id: "medium", labelVi: "Trung cấp", labelEn: "Medium" },
    { id: "hard", labelVi: "Nâng cao", labelEn: "Hard" },
  ];

  const lessonTabs: Array<{ id: DsaSectionId | "all"; vi: string; en: string }> = [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "linear", vi: "Tuyến tính", en: "Linear" },
    { id: "nonlinear", vi: "Phi tuyến tính", en: "Non-linear" },
    { id: "algos", vi: "Giải thuật", en: "Algorithms" },
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
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại Lập trình", "Back to Programming")}
          </Link>

          {/* Hero */}
          <section className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Network className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t("Cấu trúc dữ liệu & Giải thuật", "Data Structures & Algorithms")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t(
                "Lộ trình nền tảng giúp bạn xây dựng tư duy thuật toán vững chắc, từ cấu trúc dữ liệu tuyến tính tới đồ thị, cây và các giải thuật kinh điển.",
                "A foundation roadmap to build solid algorithmic thinking — from linear structures to graphs, trees and classic algorithms.",
              )}
            </p>
          </section>

          {/* Curriculum sections */}
          <section className="space-y-10 mb-16">
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
                    {lang === "vi" ? sec.titleVi : sec.titleEn}
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
                              {lang === "vi" ? topic.titleVi : topic.titleEn}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {lang === "vi" ? topic.descVi : topic.descEn}
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
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("Bài học chi tiết", "Detailed Lessons")}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {t(
                "15 bài học có lý thuyết, ví dụ Python, phân tích độ phức tạp và quiz củng cố.",
                "Fifteen lessons with theory, Python examples, complexity analysis and reinforcement quizzes.",
              )}
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
                    {lang === "vi" ? tab.vi : tab.en}
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {visibleLessons.map((lesson, i) => {
                const open = openLesson === lesson.id;
                const picked = quizPick[lesson.id];
                const correct = picked === lesson.quiz.answer;
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
                            {lang === "vi" ? lesson.titleVi : lesson.titleEn}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {lang === "vi" ? lesson.summaryVi : lesson.summaryEn}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {open ? "▲" : "▼"}
                      </span>
                    </button>

                    {open && (
                      <div className="px-5 pb-5 space-y-4 border-t border-border/60 pt-4">
                        <DsaTheoryText
                          text={lang === "vi" ? lesson.theoryVi : lesson.theoryEn}
                          lang={lang}
                        />


                        <div className="rounded-xl bg-zinc-950 text-zinc-100 p-4 overflow-x-auto text-xs">
                          <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>{lesson.codeLanguage}</span>
                          </div>
                          <div className="font-mono whitespace-pre">{lesson.code}</div>
                        </div>

                        <div className="flex items-start gap-2 text-sm bg-primary/5 border border-primary/20 rounded-lg p-3">
                          <Gauge className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground">
                            {lang === "vi" ? lesson.complexityVi : lesson.complexityEn}
                          </span>
                        </div>

                        <div className="rounded-xl border border-border/60 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-semibold text-foreground">
                              {t("Quiz nhanh", "Quick Quiz")}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-3">
                            {lang === "vi" ? lesson.quiz.questionVi : lesson.quiz.questionEn}
                          </p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {lesson.quiz.options.map((opt, idx) => {
                              const isPicked = picked === idx;
                              const isAnswer = lesson.quiz.answer === idx;
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
                                    setQuizPick((prev) => ({ ...prev, [lesson.id]: idx }))
                                  }
                                  className={`text-left text-sm px-3 py-2 rounded-lg border transition-all ${cls}`}
                                >
                                  {opt}
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
                                {lang === "vi"
                                  ? lesson.quiz.explanationVi
                                  : lesson.quiz.explanationEn}
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
                                  delete next[lesson.id];
                                  return next;
                                })
                              }
                            >
                              {t("Thử lại", "Try again")}
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Exercise bank */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("Kho Bài Luyện Tập", "Practice Exercise Bank")}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {t(
                "Chọn cấp độ phù hợp và rèn luyện tư duy giải thuật của bạn.",
                "Pick the right difficulty tier and sharpen your algorithmic thinking.",
              )}
            </p>

            <div className="glass-card rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {t("Phân loại theo cấp độ", "Filter by difficulty")}
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
                      {lang === "vi" ? tab.labelVi : tab.labelEn}
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
                        {lang === "vi" ? meta.labelVi : meta.labelEn}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">
                      {lang === "vi" ? ex.titleVi : ex.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "vi" ? ex.hintVi : ex.hintEn}
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
