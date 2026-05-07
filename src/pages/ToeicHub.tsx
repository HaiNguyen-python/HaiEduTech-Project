// TOEIC Hub - Combined entry for Lectures + Vocabulary
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Library, ArrowRight, Headphones, FileText, Briefcase, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const ToeicHub = () => {
  const { t } = useLanguage();

  const sections = [
    {
      to: "/toeic-lectures",
      icon: BookOpen,
      title: t("Bài giảng TOEIC", "TOEIC Lectures"),
      desc: t(
        "Hệ thống bài giảng Parts 1-7, mẹo tốc độ, ngữ pháp & chiến lược điểm cao.",
        "Comprehensive lectures for Parts 1-7, speed hacks, grammar & high-score strategies."
      ),
      badges: [
        { icon: Headphones, label: t("Listening P1-4", "Listening P1-4") },
        { icon: FileText, label: t("Reading P5-7", "Reading P5-7") },
        { icon: Sparkles, label: t("Mẹo & Chiến lược", "Tips & Strategy") },
      ],
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      to: "/toeic-vocabulary",
      icon: Library,
      title: t("Từ vựng TOEIC", "TOEIC Vocabulary"),
      desc: t(
        "Ngân hàng từ vựng Business Blue, flashcard tự mở rộng, luyện theo chủ đề công sở.",
        "Business Blue vocabulary bank, auto-expanding flashcards, themed by workplace topics."
      ),
      badges: [
        { icon: Briefcase, label: t("Business Topics", "Business Topics") },
        { icon: Library, label: t("Flashcards", "Flashcards") },
        { icon: Sparkles, label: t("Theo Part", "By Part") },
      ],
      gradient: "from-indigo-600 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO
        title="TOEIC Hub - HaiEduTech"
        description="Bài giảng & Từ vựng TOEIC trong cùng một nơi - học thông minh, dẫn đầu kỷ nguyên số."
      />
      <Navbar />

      <main className="container mx-auto px-4 py-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 lg:mb-14"
        >
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-4">
            {t("Trung tâm TOEIC", "TOEIC Center")}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
            TOEIC
          </h1>
          <p className="mt-4 text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto">
            {t(
              "Tất cả bài giảng và từ vựng TOEIC gói gọn trong một trang truy cập nhanh.",
              "All TOEIC lectures and vocabulary in one quick-access hub."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={s.to} className="block group h-full">
                <div className={`relative h-full rounded-2xl p-6 lg:p-8 bg-gradient-to-br ${s.gradient} shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 overflow-hidden`}>
                  <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-5">
                      <s.icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">{s.title}</h2>
                    <p className="text-white/90 text-base leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.badges.map((b) => (
                        <Badge key={b.label} className="bg-white/20 text-white border-white/30 backdrop-blur">
                          <b.icon className="w-3 h-3 mr-1" />
                          {b.label}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90 font-semibold">
                      {t("Vào học ngay", "Enter now")}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToeicHub;
