import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Languages, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Chinese = () => {
  const { t } = useLanguage();

  const modules = [
    {
      title: t("Tiếng Trung Sơ cấp", "Elementary Chinese"),
      level: t("Mới bắt đầu", "Beginner"),
      desc: t("Xây dựng nền tảng với pinyin, thanh điệu, chữ Hán cơ bản và cụm từ giao tiếp hàng ngày.", "Build your foundation with pinyin, tones, basic characters and everyday phrases."),
      features: [
        t("Pinyin & thanh điệu chuẩn", "Pinyin & tone mastery"),
        t("200+ chữ Hán thiết yếu", "200+ essential characters"),
        t("Luyện hội thoại hàng ngày", "Daily conversation drills"),
      ],
    },
    {
      title: t("Luyện thi HSK", "HSK Preparation"),
      level: "HSK 1–6",
      desc: t("Ôn luyện có hệ thống cho tất cả cấp độ HSK.", "Structured preparation for all levels of the HSK proficiency test."),
      features: [
        t("Từ vựng theo cấp độ HSK", "Vocabulary by HSK level"),
        t("Luyện đọc & nghe", "Reading & listening practice"),
        t("Thi thử & chấm điểm", "Mock exams & scoring"),
      ],
    },
    {
      title: t("Tiếng Trung Giao tiếp", "Conversational Chinese"),
      level: t("Tất cả trình độ", "All Levels"),
      desc: t("Kỹ năng nói thực tế cho du lịch, kinh doanh và cuộc sống hàng ngày.", "Practical speaking skills for travel, business and daily life."),
      features: [
        t("Hội thoại thực tế", "Real-world dialogues"),
        t("Bối cảnh văn hóa", "Cultural context"),
        t("Luyện phát âm", "Pronunciation coaching"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-500 text-xs font-medium mb-4">
              <Languages className="w-3 h-3" /> {t("Góc Tiếng Trung", "Chinese Corner")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Khóa học ", "Chinese ")}
              <span className="text-gradient">{t("Tiếng Trung", "Modules")}</span>
            </h1>
            <p className="text-muted-foreground mb-12">
              {t(
                "Từ con số 0 đến thành thạo — các module có cấu trúc từ Sơ cấp, HSK, đến Giao tiếp.",
                "From zero to fluency — structured modules covering Elementary, HSK, and Conversational Chinese."
              )}
            </p>

            <div className="space-y-6">
              {modules.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-display font-semibold text-foreground">{m.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{m.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {m.features.map((f) => (
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

export default Chinese;
