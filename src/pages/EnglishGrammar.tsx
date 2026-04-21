import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { allGrammarModules } from "@/data/languageCurriculum";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const EnglishGrammar = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            📖 {t("Ngữ pháp tiếng Anh", "English Grammar")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Hệ thống bài học ngữ pháp từ cơ bản đến nâng cao, bao gồm lý thuyết, bài tập tương tác và quiz.",
              "Comprehensive grammar lessons from basic to advanced, including theory, interactive exercises and quizzes."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGrammarModules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/english/learn/${mod.id}`}
                className="block rounded-xl border bg-card hover:shadow-lg transition-shadow p-6 h-full"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center text-2xl mb-4`}>
                  {mod.icon}
                </div>
                <h2 className="font-bold text-lg mb-1">{t(mod.title, mod.titleEn)}</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {t(mod.description, mod.descriptionEn)}
                </p>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{mod.lessons.length} {t("bài học", "lessons")}</span>
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

export default EnglishGrammar;
