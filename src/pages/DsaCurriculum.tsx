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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

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

const DsaCurriculum = () => {
  const { t, language } = useLanguage();
  const [tier, setTier] = useState<Tier | "all">("all");

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
                    {language === "vi" ? sec.titleVi : sec.titleEn}
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
                              {language === "vi" ? topic.titleVi : topic.titleEn}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {language === "vi" ? topic.descVi : topic.descEn}
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
                      {language === "vi" ? tab.labelVi : tab.labelEn}
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
                        {language === "vi" ? meta.labelVi : meta.labelEn}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">
                      {language === "vi" ? ex.titleVi : ex.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {language === "vi" ? ex.hintVi : ex.hintEn}
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
