// Standalone AI Speaking Coach page for English and Chinese
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AISpeakingCoach from "@/components/AISpeakingCoach";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic } from "lucide-react";
import { motion } from "framer-motion";

const SpeakingCoachPage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const lang = (language === "chinese" ? "chinese" : language === "finnish" ? "finnish" : "english") as "english" | "finnish" | "chinese";

  const titles: Record<string, { title: string; subtitle: string; back: string }> = {
    english: {
      title: "AI Speaking Coach — English",
      subtitle: t("Luyện phát âm tiếng Anh với trí tuệ nhân tạo", "Practice English pronunciation with AI"),
      back: "/english",
    },
    chinese: {
      title: "AI Speaking Coach — 中文",
      subtitle: t("Luyện phát âm tiếng Trung với trí tuệ nhân tạo", "Practice Chinese pronunciation with AI"),
      back: "/chinese",
    },
    finnish: {
      title: "AI Speaking Coach — Suomi",
      subtitle: t("Luyện phát âm tiếng Phần Lan với trí tuệ nhân tạo", "Practice Finnish pronunciation with AI"),
      back: "/finnish/yki-dashboard",
    },
  };

  const config = titles[lang] || titles.english;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(config.back)}
          className="mb-4 gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Quay lại", "Go back")}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            {config.title}
          </h1>
          <p className="text-muted-foreground mt-2">{config.subtitle}</p>
        </motion.div>

        <AISpeakingCoach language={lang} />
      </main>
      <Footer />
    </div>
  );
};

export default SpeakingCoachPage;
