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

  const fullUpgradedEssay = t(
    `Sự tiến bộ nhanh chóng của công nghệ đã biến đổi sâu sắc phương pháp giáo dục trên toàn thế giới. Mặc dù phương pháp giảng dạy truyền thống trên lớp vẫn giữ vai trò quan trọng, việc tích hợp các công cụ kỹ thuật số đã chứng minh lợi ích to lớn trong việc nâng cao sự tham gia và kết quả học tập của sinh viên.

Trước hết, công nghệ giáo dục đã tạo ra những cơ hội học tập cá nhân hóa chưa từng có. Thông qua các nền tảng học tập thích ứng (adaptive learning), mỗi học sinh có thể tiếp cận nội dung phù hợp với trình độ và tốc độ học tập của riêng mình. Ví dụ, các ứng dụng như Duolingo và Khan Academy sử dụng thuật toán trí tuệ nhân tạo để điều chỉnh bài tập theo năng lực người dùng.

Hơn nữa, các nền tảng học trực tuyến đã mở rộng đáng kể khả năng tiếp cận giáo dục chất lượng cho đối tượng toàn cầu. Sinh viên tại các khu vực xa xôi hoặc thiếu nguồn lực giáo dục giờ đây có thể theo dõi các khóa học từ những trường đại học hàng đầu thế giới thông qua MOOC (Massive Open Online Courses). Điều này góp phần thu hẹp khoảng cách giữa các hệ thống giáo dục đặc quyền và thiếu nguồn lực.

Tuy nhiên, cần thừa nhận rằng công nghệ không thể thay thế hoàn toàn vai trò của giáo viên. Sự tương tác trực tiếp giữa thầy và trò vẫn đóng vai trò then chốt trong việc phát triển tư duy phản biện, kỹ năng giao tiếp và trí tuệ cảm xúc. Do đó, mô hình giáo dục lý tưởng nên là sự kết hợp hài hòa giữa phương pháp truyền thống và ứng dụng công nghệ hiện đại.

Tóm lại, công nghệ đã và đang đóng vai trò ngày càng quan trọng trong giáo dục. Việc tận dụng hiệu quả các công cụ kỹ thuật số, kết hợp với phương pháp sư phạm truyền thống, sẽ tạo nên một hệ sinh thái giáo dục toàn diện và hiệu quả hơn cho thế hệ tương lai.`,
    `The rapid advancement of technology has profoundly transformed educational methodologies worldwide. While traditional classroom-based instruction remains valuable, the integration of digital tools has proven highly beneficial for enhancing student engagement and learning outcomes.

First and foremost, educational technology has created unprecedented opportunities for personalized learning. Through adaptive learning platforms, each student can access content tailored to their individual proficiency level and learning pace. For instance, applications such as Duolingo and Khan Academy employ artificial intelligence algorithms to adjust exercises according to user competency.

Furthermore, online learning platforms have significantly expanded access to quality education for a global audience. Students in remote or under-resourced areas can now follow courses from the world's leading universities through MOOCs (Massive Open Online Courses). This contributes to bridging the gap between privileged and under-resourced educational systems.

However, it must be acknowledged that technology cannot entirely replace the role of teachers. Direct interaction between educators and students still plays a pivotal role in developing critical thinking, communication skills, and emotional intelligence. Therefore, the ideal educational model should be a harmonious blend of traditional methods and modern technological applications.

In conclusion, technology has played and continues to play an increasingly important role in education. The effective utilization of digital tools, combined with traditional pedagogical methods, will create a more comprehensive and efficient educational ecosystem for future generations.`
  );

  const handleGrade = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      overall: 6.5,
      criteria: [
        {
          score: 7.0, label: "Task Achievement",
          strengths: [t("Trả lời đúng đề bài, nêu rõ quan điểm cá nhân", "Addresses the task clearly with a personal opinion"), t("Có đưa ra ví dụ minh họa", "Provides supporting examples")],
          weaknesses: [t("Các ý chưa được phát triển đầy đủ", "Ideas are not fully developed"), t("Kết luận quá ngắn, chưa tóm tắt lại đầy đủ", "Conclusion is too brief and incomplete")],
          suggestions: [t("Mở rộng mỗi ý chính bằng 2-3 câu giải thích và ví dụ cụ thể", "Expand each main idea with 2-3 sentences of explanation and specific examples")],
        },
        {
          score: 6.0, label: "Coherence & Cohesion",
          strengths: [t("Có cấu trúc đoạn văn rõ ràng", "Clear paragraph structure"), t("Sử dụng một số liên kết cơ bản", "Uses some basic cohesive devices")],
          weaknesses: [t("Thiếu đa dạng các từ nối", "Limited variety of linking words"), t("Chuyển ý giữa các đoạn chưa mượt", "Transitions between paragraphs are not smooth")],
          suggestions: [t("Sử dụng thêm: Furthermore, Moreover, In contrast, Nevertheless", "Use more: Furthermore, Moreover, In contrast, Nevertheless"), t("Thêm câu chuyển tiếp ở đầu mỗi đoạn", "Add transition sentences at the beginning of each paragraph")],
        },
        {
          score: 6.5, label: "Lexical Resource",
          strengths: [t("Từ vựng đủ để truyền đạt ý", "Adequate vocabulary to convey meaning"), t("Có sử dụng một số collocations", "Uses some collocations")],
          weaknesses: [t("Lặp từ nhiều, thiếu từ vựng học thuật", "Repetitive words, lacks academic vocabulary"), t("Một số từ dùng chưa chính xác ngữ cảnh", "Some words used inaccurately in context")],
          suggestions: [t("Thay 'very good' bằng 'highly beneficial', 'significant'", "Replace 'very good' with 'highly beneficial', 'significant'"), t("Học thêm collocations theo chủ đề Education, Technology", "Learn more topic-specific collocations: Education, Technology")],
        },
        {
          score: 6.5, label: "Grammatical Range & Accuracy",
          strengths: [t("Sử dụng được câu phức cơ bản", "Uses basic complex sentences"), t("Ít lỗi ngữ pháp nghiêm trọng", "Few major grammatical errors")],
          weaknesses: [t("Thiếu đa dạng cấu trúc câu", "Limited variety of sentence structures"), t("Lỗi về mạo từ và số ít/số nhiều", "Errors with articles and singular/plural")],
          suggestions: [t("Luyện thêm câu điều kiện, mệnh đề quan hệ, bị động", "Practice conditional sentences, relative clauses, passive voice"), t("Kiểm tra kỹ subject-verb agreement", "Check subject-verb agreement carefully")],
        },
      ],
      errors: [
        { error: "peoples", correction: "people", category: "Grammar" },
        { error: "very good", correction: "highly beneficial", category: "Vocab" },
        { error: "Because, so", correction: "Therefore / Consequently", category: "Cohesion" },
        { error: "make them sad", correction: "cause emotional distress", category: "Vocab" },
        { error: "more and more", correction: "an increasing number of", category: "Vocab" },
      ],
      upgraded: fullUpgradedEssay,
      advice: t(
        "Tập trung cải thiện liên kết giữa các đoạn và giảm từ vựng không trang trọng. Luyện sử dụng câu phức với mệnh đề phụ. Hướng đến từ vựng học thuật chính xác hơn. Mục tiêu tiếp theo: Band 7.0.",
        "Focus on improving cohesive devices between paragraphs and reducing informal vocabulary. Practice complex sentence structures with subordinate clauses. Target next: Band 7.0."
      ),
    });
    setLoading(false);
    setExpandedCriteria(null);
    setShowFullUpgraded(false);
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    // Generate a text-based report and download
    const report = `
IELTS WRITING GRADING REPORT
=============================
Overall Band Score: ${result.overall}

CRITERIA BREAKDOWN:
${result.criteria.map(c => `
${c.label}: ${c.score}
  Strengths: ${c.strengths.join("; ")}
  Weaknesses: ${c.weaknesses.join("; ")}
  Suggestions: ${c.suggestions.join("; ")}
`).join("")}

ERROR HIGHLIGHTS:
${result.errors.map(e => `  [${e.category}] "${e.error}" → "${e.correction}"`).join("\n")}

BAND 8.0+ UPGRADED VERSION:
${result.upgraded}

NEXT STEPS:
${result.advice}
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Brain className="w-3 h-3" /> {t("Hỗ trợ bởi AI", "AI-Powered")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Công cụ chấm ", "IELTS ")}
              <span className="text-gradient">{t("IELTS bằng AI", "Grading Engine")}</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              {t(
                "Nộp bài viết hoặc nói để nhận phản hồi cấp giám khảo ngay lập tức.",
                "Submit your writing or speaking sample for instant AI-powered examiner-level feedback."
              )}
            </p>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode("writing")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === "writing" ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <FileText className="w-4 h-4" /> Writing
              </button>
              <button
                onClick={() => setMode("speaking")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === "speaking" ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Mic className="w-4 h-4" /> Speaking
              </button>
            </div>

            {mode === "speaking" ? (
              <SpeakingGrader />
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Input panel */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-foreground">{t("Bài viết của bạn", "Your Essay")}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{text.split(/\s+/).filter(Boolean).length} {t("từ", "words")}</span>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t("Dán bài IELTS Writing Task 2 của bạn tại đây...", "Paste your IELTS Writing Task 2 essay here...")}
                    className="w-full h-64 bg-secondary rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={handleGrade}
                    disabled={loading || !text.trim()}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-50 hover:brightness-110 transition-all"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? t("Đang phân tích...", "Analyzing...") : t("Chấm bài của tôi", "Grade My Essay")}
                  </button>
                </div>

                {/* Result panel */}
                <div className="glass-card rounded-xl p-6">
                  {!result && !loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <Brain className="w-12 h-12 text-muted-foreground/30 mb-4" />
                      <p className="text-sm text-muted-foreground">{t("Nộp bài viết để xem phản hồi AI", "Submit your essay to see AI feedback")}</p>
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                      <p className="text-sm text-muted-foreground">{t("Giám khảo AI đang phân tích...", "AI Examiner is analyzing...")}</p>
                    </div>
                  )}

                  {result && !loading && (
                    <div className="space-y-4 overflow-y-auto max-h-[700px]">
                      {/* Overall score + download */}
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-foreground">{t("Điểm tổng", "Overall Band Score")}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleDownloadPDF}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-medium hover:bg-primary/20 transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              {t("Tải báo cáo", "Download Report")}
                            </button>
                            <span className="text-3xl font-display font-bold text-primary">{result.overall}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {result.criteria.map((c) => (
                            <div key={c.label} className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{c.label}</span>
                              <span className="font-mono font-semibold text-foreground">{c.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed criteria feedback */}
                      <div className="space-y-2">
                        {result.criteria.map((c, i) => (
                          <div key={c.label} className="bg-secondary rounded-lg overflow-hidden">
                            <button
                              onClick={() => setExpandedCriteria(expandedCriteria === i ? null : i)}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-primary/5 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-primary font-mono">{c.score}</span>
                                <span className="text-xs font-medium text-foreground">{c.label}</span>
                              </div>
                              {expandedCriteria === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                            </button>
                            {expandedCriteria === i && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-3 pb-3 space-y-2">
                                <div>
                                  <p className="text-[10px] uppercase font-semibold text-green-600 mb-1">{t("Điểm mạnh", "Strengths")}</p>
                                  {c.strengths.map((s, j) => (
                                    <p key={j} className="text-xs text-secondary-foreground flex items-start gap-1.5"><span className="text-green-500 mt-0.5">✓</span> {s}</p>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase font-semibold text-destructive mb-1">{t("Điểm yếu", "Weaknesses")}</p>
                                  {c.weaknesses.map((w, j) => (
                                    <p key={j} className="text-xs text-secondary-foreground flex items-start gap-1.5"><span className="text-destructive mt-0.5">✗</span> {w}</p>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase font-semibold text-primary mb-1">{t("Gợi ý cải thiện", "Suggestions")}</p>
                                  {c.suggestions.map((s, j) => (
                                    <p key={j} className="text-xs text-secondary-foreground flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span> {s}</p>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Error highlights */}
                      <div className="bg-secondary rounded-lg p-4">
                        <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-destructive" /> {t("Lỗi nổi bật", "Error Highlights")}
                        </h4>
                        <div className="space-y-2">
                          {result.errors.map((e, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                              <span className={`px-1.5 py-0.5 rounded font-medium text-[10px] shrink-0 ${
                                e.category === "Grammar" ? "bg-destructive/20 text-destructive" :
                                e.category === "Vocab" ? "bg-yellow-500/20 text-yellow-600" :
                                "bg-sky-500/20 text-sky-600"
                              }`}>{e.category}</span>
                              <span className="text-muted-foreground">"{e.error}" → "{e.correction}"</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Upgraded version - full display */}
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-medium text-foreground flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-primary" /> {t("Phiên bản Band 8.0+", "Band 8.0+ Version")}
                          </h4>
                          <div className="flex gap-1">
                            <button
                              onClick={handleCopyUpgraded}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-medium hover:bg-primary/20 transition-colors"
                            >
                              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copied ? t("Đã sao chép", "Copied") : t("Sao chép", "Copy")}
                            </button>
                            <button
                              onClick={() => setShowFullUpgraded(!showFullUpgraded)}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-medium hover:bg-primary/20 transition-colors"
                            >
                              {showFullUpgraded ? t("Thu gọn", "Collapse") : t("Xem đầy đủ", "View Full")}
                            </button>
                          </div>
                        </div>
                        <div className={`text-xs text-secondary-foreground leading-relaxed whitespace-pre-line ${!showFullUpgraded ? "max-h-32 overflow-hidden relative" : ""}`}>
                          {result.upgraded}
                          {!showFullUpgraded && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary to-transparent" />
                          )}
                        </div>
                      </div>

                      {/* Advice */}
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <h4 className="text-xs font-medium text-primary mb-1">{t("Bước tiếp theo", "Next Steps")}</h4>
                        <p className="text-xs text-secondary-foreground">{result.advice}</p>
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
