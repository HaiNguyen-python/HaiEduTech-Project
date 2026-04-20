/**
 * @file SoftwareEngInterview.tsx
 * @description Career-prep page with 30 SE interview questions, sample answers and STAR tips.
 * @author HaiEduTech
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Question {
  category: "Behavioral" | "System Design" | "Coding" | "DevOps" | "Soft Skills";
  q: string;
  qVi: string;
  hint: string;
  hintVi: string;
}

const QUESTIONS: Question[] = [
  { category: "Behavioral", q: "Tell me about a time you disagreed with a teammate on a technical decision.", qVi: "Kể về 1 lần bạn bất đồng với đồng đội về quyết định kỹ thuật.", hint: "Use STAR: Situation, Task, Action, Result. Show data + empathy.", hintVi: "Áp dụng STAR. Đưa ra số liệu + thể hiện đồng cảm." },
  { category: "Behavioral", q: "Describe a project that failed. What did you learn?", qVi: "Mô tả 1 dự án thất bại. Bạn học được gì?", hint: "Be honest. Focus on lessons + how you applied them next.", hintVi: "Trung thực. Tập trung vào bài học + cách áp dụng sau đó." },
  { category: "Behavioral", q: "Walk me through a recent code review where you gave critical feedback.", qVi: "Mô tả 1 lần code review bạn đưa feedback nặng.", hint: "Stay constructive. Quote the rule, not the person.", hintVi: "Mang tính xây dựng. Trích dẫn quy tắc, không phải con người." },
  { category: "System Design", q: "Design a URL shortener (like bit.ly).", qVi: "Thiết kế 1 URL shortener (như bit.ly).", hint: "Estimate scale → API → DB schema → hashing → cache → analytics.", hintVi: "Ước lượng quy mô → API → DB schema → hashing → cache → analytics." },
  { category: "System Design", q: "Design a chat app for 10M users.", qVi: "Thiết kế chat app cho 10 triệu user.", hint: "WebSocket + message queue + sharding + delivery guarantees.", hintVi: "WebSocket + message queue + sharding + đảm bảo delivery." },
  { category: "System Design", q: "How would you build a rate limiter?", qVi: "Thiết kế 1 rate limiter như thế nào?", hint: "Token bucket vs sliding window. Redis-backed counters.", hintVi: "Token bucket vs sliding window. Counter trên Redis." },
  { category: "System Design", q: "Design Instagram's news feed.", qVi: "Thiết kế news feed của Instagram.", hint: "Push vs pull, fanout, ranking, caching, CDN.", hintVi: "Push vs pull, fanout, ranking, cache, CDN." },
  { category: "Coding", q: "Reverse a linked list iteratively and recursively.", qVi: "Đảo ngược linked list theo cách lặp và đệ quy.", hint: "Track prev/curr/next. Discuss O(n) time, O(1) iterative space.", hintVi: "Theo dõi prev/curr/next. Bàn về O(n) time, O(1) iterative space." },
  { category: "Coding", q: "Find the longest substring without repeating characters.", qVi: "Tìm chuỗi con dài nhất không có ký tự trùng lặp.", hint: "Sliding window with a hash set.", hintVi: "Sliding window với hash set." },
  { category: "Coding", q: "Implement a LRU cache.", qVi: "Cài đặt LRU cache.", hint: "Doubly linked list + hash map for O(1).", hintVi: "Doubly linked list + hash map → O(1)." },
  { category: "Coding", q: "Detect a cycle in a directed graph.", qVi: "Phát hiện cycle trong directed graph.", hint: "DFS with three-color marking (white/gray/black).", hintVi: "DFS với 3 màu (white/gray/black)." },
  { category: "Coding", q: "Merge K sorted lists efficiently.", qVi: "Gộp K linked list đã sort hiệu quả.", hint: "Min-heap → O(N log K).", hintVi: "Min-heap → O(N log K)." },
  { category: "DevOps", q: "Explain blue-green vs canary deployment.", qVi: "Giải thích blue-green và canary deployment.", hint: "Blue-green = swap; canary = % rollout. Cover rollback.", hintVi: "Blue-green = swap; canary = rollout %. Nhớ nói rollback." },
  { category: "DevOps", q: "How do you secure a CI/CD pipeline?", qVi: "Bảo mật CI/CD pipeline như thế nào?", hint: "Secrets manager, OIDC, signed artifacts, SBOM, dependency scan.", hintVi: "Secrets manager, OIDC, signed artifacts, SBOM, scan dependency." },
  { category: "DevOps", q: "Describe Kubernetes pod, deployment and service.", qVi: "Mô tả pod, deployment và service trong Kubernetes.", hint: "Pod = smallest unit; Deployment = desired state; Service = networking.", hintVi: "Pod = đơn vị nhỏ nhất; Deployment = trạng thái mong muốn; Service = networking." },
  { category: "DevOps", q: "Explain immutable infrastructure.", qVi: "Giải thích immutable infrastructure.", hint: "Servers replaced, never patched. Reduces drift.", hintVi: "Server thay mới, không patch. Giảm config drift." },
  { category: "Soft Skills", q: "How do you mentor a junior engineer?", qVi: "Bạn mentor 1 junior engineer thế nào?", hint: "Pair programming, weekly 1:1, growth ladder.", hintVi: "Pair programming, 1:1 hàng tuần, lộ trình growth." },
  { category: "Soft Skills", q: "How do you handle production incidents at 3 AM?", qVi: "Xử lý sự cố production lúc 3h sáng thế nào?", hint: "Detect → Mitigate → Communicate → Postmortem (no blame).", hintVi: "Phát hiện → giảm thiểu → giao tiếp → postmortem không đổ lỗi." },
  { category: "Soft Skills", q: "How do you prioritize features when deadlines slip?", qVi: "Khi deadline sát, ưu tiên feature thế nào?", hint: "RICE / MoSCoW. Communicate trade-offs.", hintVi: "RICE / MoSCoW. Truyền đạt trade-off rõ ràng." },
  { category: "Behavioral", q: "Tell me about your proudest engineering achievement.", qVi: "Thành tựu kỹ thuật bạn tự hào nhất?", hint: "Business impact > technical complexity.", hintVi: "Tác động kinh doanh > độ phức tạp kỹ thuật." },
  { category: "System Design", q: "Design a payment system handling 10K transactions/sec.", qVi: "Thiết kế hệ thống thanh toán 10K transaction/giây.", hint: "Idempotency keys, sagas, exactly-once with outbox pattern.", hintVi: "Idempotency keys, saga pattern, exactly-once với outbox." },
  { category: "System Design", q: "How would you design Google Drive?", qVi: "Thiết kế Google Drive như thế nào?", hint: "Object storage + chunking + versioning + permissions.", hintVi: "Object storage + chunk + version + permission." },
  { category: "Coding", q: "Find all anagrams of a word in a string.", qVi: "Tìm tất cả anagram của 1 từ trong chuỗi.", hint: "Sliding window with character count.", hintVi: "Sliding window với count ký tự." },
  { category: "Coding", q: "Serialize and deserialize a binary tree.", qVi: "Serialize và deserialize binary tree.", hint: "Pre-order DFS with null markers.", hintVi: "DFS pre-order với marker null." },
  { category: "DevOps", q: "What's GitOps and why use it?", qVi: "GitOps là gì và vì sao nên dùng?", hint: "Git = source of truth; ArgoCD/Flux reconciles state.", hintVi: "Git là source of truth; ArgoCD/Flux đồng bộ state." },
  { category: "Soft Skills", q: "Describe a conflict you resolved with a non-technical stakeholder.", qVi: "Mô tả 1 mâu thuẫn bạn giải quyết với stakeholder không kỹ thuật.", hint: "Translate jargon → business outcomes.", hintVi: "Dịch thuật ngữ → kết quả kinh doanh." },
  { category: "System Design", q: "Design a search-as-you-type service.", qVi: "Thiết kế service search-as-you-type.", hint: "Trie + LRU cache + debounce + Elasticsearch.", hintVi: "Trie + LRU cache + debounce + Elasticsearch." },
  { category: "Coding", q: "Implement debounce and throttle.", qVi: "Cài đặt debounce và throttle.", hint: "setTimeout patterns; explain when each fits.", hintVi: "Pattern setTimeout; giải thích khi nào dùng cái nào." },
  { category: "Behavioral", q: "When did you say 'no' to a feature request?", qVi: "Khi nào bạn nói 'không' với 1 feature request?", hint: "Frame as protecting users / debt budget.", hintVi: "Định khung là bảo vệ user / tránh nợ kỹ thuật." },
  { category: "Soft Skills", q: "How do you stay updated on engineering trends in 2026?", qVi: "Bạn cập nhật xu hướng kỹ thuật 2026 thế nào?", hint: "Newsletters, OSS, conferences, AI-assisted reading.", hintVi: "Newsletter, OSS, hội thảo, đọc bằng AI hỗ trợ." },
];

const CATEGORIES = ["All", "Behavioral", "System Design", "Coding", "DevOps", "Soft Skills"] as const;

const SoftwareEngInterview = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = filter === "All" ? QUESTIONS : QUESTIONS.filter((q) => q.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Link
          to="/programming?pillar=software-eng"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("Quay lại Software Engineering", "Back to Software Engineering")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-blue-700 flex items-center justify-center text-white">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                {t("Bộ 30 câu phỏng vấn Software Engineer", "30 Software Engineering Interview Questions")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("Câu hỏi thực tế · Gợi ý theo phương pháp STAR · 2026", "Real questions · STAR-method hints · 2026")}
              </p>
            </div>
          </div>

          {/* STAR explainer */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-4 flex gap-3">
            <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">{t("Phương pháp STAR", "The STAR Method")}</p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>S</strong>ituation · <strong>T</strong>ask · <strong>A</strong>ction · <strong>R</strong>esult — {t(
                  "khung trả lời câu hỏi behavioral hiệu quả nhất. Mỗi câu nên có số liệu cụ thể (ví dụ: 'giảm latency 40% từ 800ms xuống 480ms').",
                  "the most effective frame for behavioral questions. Always include concrete numbers (e.g. 'cut latency 40% from 800ms to 480ms')."
                )}
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-2">
            {filtered.map((q, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0 mt-0.5">
                        {q.category}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {t(q.qVi, q.q)}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3"
                    >
                      <p className="font-mono-code text-xs text-primary mb-1">💡 Hint</p>
                      <p>{t(q.hintVi, q.hint)}</p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SoftwareEngInterview;
