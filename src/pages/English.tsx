import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const English = () => {
  const { t } = useLanguage();

  const programs = [
    {
      title: "Cambridge Starters–PET",
      level: t("Mới bắt đầu → Trung cấp", "Beginner → Intermediate"),
      desc: t("Tiếng Anh nền tảng cho trẻ nhỏ theo chuẩn Cambridge Assessment.", "Foundation English for young learners through Cambridge Assessment."),
      features: [
        t("Chương trình phù hợp lứa tuổi", "Age-appropriate curriculum"),
        t("Hoạt động tương tác", "Interactive activities"),
        t("Kiểm tra tiến độ", "Progress testing"),
      ],
    },
    {
      title: t("Luyện thi IELTS", "IELTS Preparation"),
      level: t("Trung cấp → Nâng cao", "Intermediate → Advanced"),
      desc: t("Luyện thi IELTS toàn diện với chấm điểm và phản hồi bằng AI.", "Comprehensive IELTS preparation with AI-powered grading and feedback."),
      features: [
        t("Luyện đủ 4 kỹ năng", "4-skill training"),
        t("AI chấm Writing & Speaking", "AI Writing & Speaking grader"),
        t("Thi thử & chấm điểm", "Mock tests & scoring"),
      ],
    },
    {
      title: t("Chương trình TOEIC", "TOEIC Program"),
      level: t("Trung cấp", "Intermediate"),
      desc: t("Tiếng Anh thương mại cho phát triển sự nghiệp.", "Business English proficiency for career advancement."),
      features: [
        t("Tập trung Nghe & Đọc", "Listening & Reading focus"),
        t("Từ vựng kinh doanh", "Business vocabulary"),
        t("Thi thử tính giờ", "Timed practice tests"),
      ],
    },
    {
      title: t("Luyện thi THPT Quốc gia", "National High School Exam"),
      level: t("Lớp 10–12", "Grade 10–12"),
      desc: t("Ôn thi tập trung cho kỳ thi tiếng Anh THPT Quốc gia.", "Targeted preparation for Vietnam's national English exam."),
      features: [
        t("Bám sát chương trình học", "Curriculum-aligned"),
        t("Luyện ngữ pháp & từ vựng chuyên sâu", "Grammar & vocabulary drills"),
        t("Chiến lược làm bài thi", "Exam strategies"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-600 text-xs font-medium mb-4">
              <BookOpen className="w-3 h-3" /> {t("Trung tâm Tiếng Anh", "English Hub")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Chương trình ", "English ")}
              <span className="text-gradient">{t("Tiếng Anh", "Programs")}</span>
            </h1>
            <p className="text-muted-foreground mb-12">
              {t(
                "Từ Cambridge cho trẻ nhỏ đến IELTS 8.0+ — chương trình có hệ thống với phản hồi bằng AI.",
                "From Cambridge young learners to IELTS band 8.0+ — structured programs with AI-enhanced feedback."
              )}
            </p>

            <div className="space-y-6">
              {programs.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-display font-semibold text-foreground">{p.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{p.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                  >
                    {t("Đăng ký ngay", "Register now")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default English;
