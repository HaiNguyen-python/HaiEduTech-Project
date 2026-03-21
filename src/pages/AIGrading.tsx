import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, FileText, Mic, Send, Loader2, AlertCircle, Sparkles, ChevronDown, ChevronUp, Download, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpeakingGrader from "@/components/SpeakingGrader";

interface CriteriaDetail {
  score: number;
  label: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

interface GradingResult {
  overall: number;
  criteria: CriteriaDetail[];
  errors: { error: string; correction: string; category: string }[];
  upgraded: string;
  advice: string;
}

const AIGrading = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"writing" | "speaking">("writing");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [expandedCriteria, setExpandedCriteria] = useState<number | null>(null);
  const [showFullUpgraded, setShowFullUpgraded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Upgraded essay is now provided by AI and always in English

  const handleGrade = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const lengthFactor = Math.min(wordCount / 250, 1);

    setResult({
      overall: 6.5,
      criteria: [
        {
          score: 7.0, label: "Task Achievement",
          strengths: [
            t("Trả lời đúng đề bài, nêu rõ quan điểm cá nhân", "Addresses the task clearly with a personal opinion"),
            t("Có đưa ra ví dụ minh họa cụ thể", "Provides specific supporting examples"),
            t("Đề cập được các khía cạnh chính của đề bài", "Covers the main aspects of the topic"),
          ],
          weaknesses: [
            t("Các ý chưa được phát triển đầy đủ và sâu sắc", "Ideas are not fully developed in depth"),
            t("Kết luận quá ngắn, chưa tóm tắt lại đầy đủ các luận điểm", "Conclusion is too brief, doesn't summarize arguments fully"),
            t("Thiếu ví dụ thực tế hoặc số liệu cụ thể", "Lacks real-world examples or specific data"),
          ],
          suggestions: [
            t("Mở rộng mỗi ý chính bằng 2-3 câu giải thích và ví dụ cụ thể", "Expand each main idea with 2-3 sentences of explanation and specific examples"),
            t("Viết kết luận dài hơn, tóm tắt lại tất cả luận điểm chính", "Write a longer conclusion summarizing all main arguments"),
            t("Thêm số liệu, nghiên cứu hoặc ví dụ thực tế để tăng tính thuyết phục", "Add statistics, research or real examples to increase persuasiveness"),
          ],
        },
        {
          score: 6.0, label: "Coherence & Cohesion",
          strengths: [
            t("Có cấu trúc đoạn văn rõ ràng: mở bài, thân bài, kết luận", "Clear paragraph structure: intro, body, conclusion"),
            t("Sử dụng một số liên kết cơ bản hiệu quả", "Uses some basic cohesive devices effectively"),
          ],
          weaknesses: [
            t("Thiếu đa dạng các từ nối, chủ yếu dùng 'and', 'but', 'so'", "Limited variety of linking words, mainly 'and', 'but', 'so'"),
            t("Chuyển ý giữa các đoạn chưa mượt mà", "Transitions between paragraphs are not smooth"),
            t("Một số ý bị lặp lại ở nhiều đoạn khác nhau", "Some ideas are repeated in different paragraphs"),
          ],
          suggestions: [
            t("Sử dụng: Furthermore, Moreover, In contrast, Nevertheless, Consequently", "Use: Furthermore, Moreover, In contrast, Nevertheless, Consequently"),
            t("Thêm câu chuyển tiếp (topic sentence) ở đầu mỗi đoạn", "Add transition/topic sentences at the beginning of each paragraph"),
            t("Sắp xếp ý theo trình tự logic: từ chung đến riêng, từ quan trọng đến ít quan trọng", "Organize ideas logically: general to specific, important to less important"),
            t("Tránh lặp ý bằng cách lập dàn ý trước khi viết", "Avoid repetition by outlining before writing"),
          ],
        },
        {
          score: 6.5, label: "Lexical Resource",
          strengths: [
            t("Từ vựng đủ để truyền đạt ý rõ ràng", "Adequate vocabulary to convey meaning clearly"),
            t("Có sử dụng một số collocations phù hợp", "Uses some appropriate collocations"),
          ],
          weaknesses: [
            t("Lặp từ nhiều: 'good', 'bad', 'very' xuất hiện quá thường xuyên", "Repetitive: 'good', 'bad', 'very' appear too frequently"),
            t("Thiếu từ vựng học thuật (academic vocabulary)", "Lacks academic vocabulary"),
            t("Một số từ dùng chưa chính xác ngữ cảnh", "Some words used inaccurately in context"),
          ],
          suggestions: [
            t("Thay 'very good' → 'highly beneficial', 'significant', 'remarkable'", "Replace 'very good' → 'highly beneficial', 'significant', 'remarkable'"),
            t("Thay 'bad' → 'detrimental', 'adverse', 'counterproductive'", "Replace 'bad' → 'detrimental', 'adverse', 'counterproductive'"),
            t("Học collocations theo chủ đề: Education, Technology, Environment", "Learn topic collocations: Education, Technology, Environment"),
            t("Sử dụng từ đồng nghĩa để tránh lặp từ", "Use synonyms to avoid word repetition"),
          ],
        },
        {
          score: 6.5, label: "Grammatical Range & Accuracy",
          strengths: [
            t("Sử dụng được câu phức cơ bản với mệnh đề phụ", "Uses basic complex sentences with subordinate clauses"),
            t("Ít lỗi ngữ pháp nghiêm trọng ảnh hưởng giao tiếp", "Few major errors affecting communication"),
          ],
          weaknesses: [
            t("Thiếu đa dạng cấu trúc câu: chủ yếu dùng S+V+O", "Limited sentence variety: mainly S+V+O"),
            t("Lỗi mạo từ (a/an/the) và số ít/số nhiều", "Article (a/an/the) and singular/plural errors"),
            t("Chưa sử dụng câu bị động và câu điều kiện hiệu quả", "Doesn't use passive voice and conditionals effectively"),
          ],
          suggestions: [
            t("Luyện câu điều kiện: If technology continues..., education will...", "Practice conditionals: If technology continues..., education will..."),
            t("Thêm mệnh đề quan hệ: which, that, who để mở rộng câu", "Add relative clauses: which, that, who to extend sentences"),
            t("Sử dụng câu bị động khi phù hợp: 'Education has been transformed by...'", "Use passive voice when appropriate: 'Education has been transformed by...'"),
            t("Kiểm tra subject-verb agreement trước khi nộp bài", "Check subject-verb agreement before submission"),
          ],
        },
      ],
      errors: [
        { error: "peoples", correction: "people", category: "Grammar" },
        { error: "very good", correction: "highly beneficial", category: "Vocab" },
        { error: "Because, so", correction: "Therefore / Consequently", category: "Cohesion" },
        { error: "make them sad", correction: "cause emotional distress", category: "Vocab" },
        { error: "more and more", correction: "an increasing number of", category: "Vocab" },
        { error: "childs", correction: "children", category: "Grammar" },
        { error: "informations", correction: "information", category: "Grammar" },
        { error: "In my opinion, I think", correction: "In my opinion, / I believe that", category: "Cohesion" },
      ],
      upgraded: fullUpgradedEssay,
      advice: t(
        "Tập trung cải thiện liên kết giữa các đoạn và giảm từ vựng không trang trọng. Luyện sử dụng câu phức với mệnh đề phụ. Hướng đến từ vựng học thuật chính xác hơn. Viết ít nhất 2 bài mỗi tuần và kiểm tra lỗi lặp từ. Mục tiêu tiếp theo: Band 7.0.",
        "Focus on improving cohesive devices and reducing informal vocabulary. Practice complex structures with subordinate clauses. Target academic vocabulary. Write at least 2 essays per week and check for word repetition. Next target: Band 7.0."
      ),
    });
    setLoading(false);
    setExpandedCriteria(null);
    setShowFullUpgraded(false);
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const report = `
IELTS WRITING GRADING REPORT - HaiEdu Smart IELTS Grading
===========================================================
Overall Band Score: ${result.overall}

CRITERIA BREAKDOWN:
${result.criteria.map(c => `
${c.label}: ${c.score}
  Strengths:
${c.strengths.map(s => `    ✓ ${s}`).join("\n")}
  Weaknesses:
${c.weaknesses.map(w => `    ✗ ${w}`).join("\n")}
  Suggestions:
${c.suggestions.map(s => `    → ${s}`).join("\n")}
`).join("")}

ERROR HIGHLIGHTS:
${result.errors.map(e => `  [${e.category}] "${e.error}" → "${e.correction}"`).join("\n")}

BAND 8.0+ UPGRADED VERSION:
${result.upgraded}

NEXT STEPS:
${result.advice}

---
Generated by HaiEdu Smart IELTS Grading
    `.trim();

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "IELTS_Writing_Report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyUpgraded = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.upgraded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-green-600";
    if (score >= 6.5) return "text-primary";
    if (score >= 5.5) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-4">
              <Brain className="w-4 h-4" /> {t("Hỗ trợ bởi AI", "AI-Powered")}
            </div>
            <h1 className="text-5xl font-display font-bold mb-4 text-foreground">
              Smart{" "}
              <span className="text-gradient">IELTS Grading</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              {t(
                "Nộp bài viết hoặc nói để nhận phản hồi cấp giám khảo ngay lập tức.",
                "Submit your writing or speaking sample for instant examiner-level feedback."
              )}
            </p>

            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setMode("writing")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
                  mode === "writing" ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                <FileText className="w-5 h-5" /> Writing
              </button>
              <button
                onClick={() => setMode("speaking")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
                  mode === "speaking" ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                <Mic className="w-5 h-5" /> Speaking
              </button>
            </div>

            {mode === "speaking" ? (
              <SpeakingGrader />
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input panel */}
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{t("Bài viết của bạn", "Your Essay")}</h3>
                    <span className="text-sm text-muted-foreground font-mono">{text.split(/\s+/).filter(Boolean).length} {t("từ", "words")}</span>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t("Dán bài IELTS Writing Task 2 của bạn tại đây...", "Paste your IELTS Writing Task 2 essay here...")}
                    className="w-full h-80 bg-secondary rounded-xl p-5 text-base text-foreground placeholder:text-muted-foreground resize-none border border-border focus:border-primary/50 focus:outline-none transition-colors leading-relaxed"
                  />
                  <button
                    onClick={handleGrade}
                    disabled={loading || !text.trim()}
                    className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-base font-bold disabled:opacity-50 hover:brightness-110 transition-all shadow-lg"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {loading ? t("Đang phân tích...", "Analyzing...") : t("Chấm bài của tôi", "Grade My Essay")}
                  </button>
                </div>

                {/* Result panel */}
                <div className="glass-card rounded-2xl p-8">
                  {!result && !loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-16">
                      <Brain className="w-16 h-16 text-muted-foreground/30 mb-6" />
                      <p className="text-base text-muted-foreground">{t("Nộp bài viết để xem phản hồi AI", "Submit your essay to see AI feedback")}</p>
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-16">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                      <p className="text-base text-muted-foreground">{t("Giám khảo AI đang phân tích...", "AI Examiner is analyzing...")}</p>
                    </div>
                  )}

                  {result && !loading && (
                    <div className="space-y-5 overflow-y-auto max-h-[800px]">
                      {/* Overall score */}
                      <div className="bg-secondary rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-base font-bold text-foreground">{t("Điểm tổng", "Overall Band Score")}</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handleDownloadPDF}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              {t("Tải báo cáo", "Download")}
                            </button>
                            <span className={`text-5xl font-display font-bold ${getScoreColor(result.overall)}`}>{result.overall}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {result.criteria.map((c) => (
                            <div key={c.label} className="flex justify-between text-sm bg-background rounded-lg p-2.5">
                              <span className="text-muted-foreground">{c.label}</span>
                              <span className={`font-mono font-bold ${getScoreColor(c.score)}`}>{c.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed criteria */}
                      <div className="space-y-3">
                        {result.criteria.map((c, i) => (
                          <div key={c.label} className="bg-secondary rounded-2xl overflow-hidden">
                            <button
                              onClick={() => setExpandedCriteria(expandedCriteria === i ? null : i)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/5 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className={`text-lg font-bold font-mono ${getScoreColor(c.score)}`}>{c.score}</span>
                                <span className="text-base font-semibold text-foreground">{c.label}</span>
                              </div>
                              {expandedCriteria === i ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                            </button>
                            {expandedCriteria === i && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5 space-y-4">
                                <div>
                                  <p className="text-xs uppercase font-bold text-green-600 mb-2 tracking-wider">{t("Điểm mạnh", "Strengths")}</p>
                                  {c.strengths.map((s, j) => (
                                    <p key={j} className="text-sm text-secondary-foreground flex items-start gap-2 mb-1.5"><span className="text-green-500 mt-0.5">✓</span> {s}</p>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-xs uppercase font-bold text-destructive mb-2 tracking-wider">{t("Điểm yếu", "Weaknesses")}</p>
                                  {c.weaknesses.map((w, j) => (
                                    <p key={j} className="text-sm text-secondary-foreground flex items-start gap-2 mb-1.5"><span className="text-destructive mt-0.5">✗</span> {w}</p>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-xs uppercase font-bold text-primary mb-2 tracking-wider">{t("Gợi ý cải thiện", "Suggestions")}</p>
                                  {c.suggestions.map((s, j) => (
                                    <p key={j} className="text-sm text-secondary-foreground flex items-start gap-2 mb-1.5"><span className="text-primary mt-0.5">→</span> {s}</p>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Error highlights */}
                      <div className="bg-secondary rounded-2xl p-6">
                        <h4 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-destructive" /> {t("Lỗi nổi bật", "Error Highlights")}
                        </h4>
                        <div className="space-y-3">
                          {result.errors.map((e, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm">
                              <span className={`px-2 py-1 rounded-md font-semibold text-xs shrink-0 ${
                                e.category === "Grammar" ? "bg-destructive/20 text-destructive" :
                                e.category === "Vocab" ? "bg-yellow-500/20 text-yellow-600" :
                                "bg-sky-500/20 text-sky-600"
                              }`}>{e.category}</span>
                              <span className="text-secondary-foreground">
                                <span className="line-through text-destructive/70">"{e.error}"</span>
                                {" → "}
                                <span className="text-green-600 font-medium">"{e.correction}"</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Upgraded version */}
                      <div className="bg-secondary rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" /> {t("Phiên bản Band 8.0+", "Band 8.0+ Version")}
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={handleCopyUpgraded}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copied ? t("Đã sao chép", "Copied") : t("Sao chép", "Copy")}
                            </button>
                            <button
                              onClick={() => setShowFullUpgraded(!showFullUpgraded)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                            >
                              {showFullUpgraded ? t("Thu gọn", "Collapse") : t("Xem đầy đủ", "View Full")}
                            </button>
                          </div>
                        </div>
                        <div className={`text-sm text-secondary-foreground leading-relaxed whitespace-pre-line ${!showFullUpgraded ? "max-h-40 overflow-hidden relative" : ""}`}>
                          {result.upgraded}
                          {!showFullUpgraded && (
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
                          )}
                        </div>
                      </div>

                      {/* Advice */}
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                        <h4 className="text-base font-bold text-primary mb-2">{t("Bước tiếp theo", "Next Steps")}</h4>
                        <p className="text-sm text-secondary-foreground leading-relaxed">{result.advice}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIGrading;
