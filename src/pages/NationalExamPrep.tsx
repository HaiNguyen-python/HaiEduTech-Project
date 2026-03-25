import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { thptExams } from "@/data/thptExamData";
import { Clock, FileText, Award, BookOpen, ChevronRight, GraduationCap, Timer, TimerOff } from "lucide-react";
import { Button } from "@/components/ui/button";

// Retrieve best scores from localStorage
const getBestScore = (examId: string): number | null => {
  try {
    const data = localStorage.getItem(`thpt-result-${examId}`);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.score ?? null;
    }
  } catch {}
  return null;
};

const NationalExamPrep = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              {t("Luyện thi THPT Quốc Gia", "National High School Exam Prep")}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t("Kho Đề Thi Thử ", "Practice Test ")}
              <span className="text-gradient">{t("THPT Quốc Gia", "Collection")}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t(
                "Luyện tập với 10 đề thi thử bám sát cấu trúc đề thi chính thức. Chấm điểm tự động, phân tích lỗi sai chi tiết.",
                "Practice with 10 mock exams following the official format. Instant grading with detailed error analysis."
              )}
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {[
              { icon: FileText, label: t("Đề thi", "Exams"), value: "10" },
              { icon: BookOpen, label: t("Câu hỏi", "Questions"), value: "400+" },
              { icon: Clock, label: t("Thời gian", "Duration"), value: t("50 phút", "50 min") },
              { icon: Award, label: t("Phân tích", "Analysis"), value: t("Chi tiết", "Detailed") },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Exam cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {thptExams.map((exam, idx) => {
              const best = getBestScore(exam.id);
              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="glass-card rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                        {t("Mã đề", "Code")}: {exam.code}
                      </span>
                      {best !== null && (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${best >= 8 ? "bg-green-100 text-green-700" : best >= 6 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {best.toFixed(1)}/10
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {t(exam.title, exam.titleEn)}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.duration} {t("phút", "min")}</span>
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {exam.totalQuestions} {t("câu", "Q")}</span>
                    </div>
                    {/* Timed / Untimed buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 gap-1.5"
                        onClick={() => navigate(`/national-exam/${exam.id}?mode=timed`)}
                      >
                        <Timer className="w-3.5 h-3.5" />
                        {t("Tính giờ", "Timed")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5"
                        onClick={() => navigate(`/national-exam/${exam.id}?mode=untimed`)}
                      >
                        <TimerOff className="w-3.5 h-3.5" />
                        {t("Tự do", "Untimed")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NationalExamPrep;
