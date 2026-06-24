/**
 * @file EnglishEssentials.tsx
 * @description Hub gộp 4 mục: Grammar, Pronunciation, Conversational, Idioms.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { BookOpen, Mic2, MessageSquare, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingEnglishParticles from "@/components/FloatingEnglishParticles";
import EnglishHeroBanner from "@/components/EnglishHeroBanner";

const EnglishEssentials = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      to: "/english/grammar",
      icon: BookOpen,
      title: t("Ngữ pháp", "Grammar"),
      desc: t("Hệ thống ngữ pháp từ cơ bản đến nâng cao, dễ hiểu, có bài tập tương tác.", "Grammar mastery from fundamentals to advanced, with interactive exercises."),
      gradient: "from-violet-400/50 to-purple-500/50",
      border: "border-violet-700",
      iconColor: "text-violet-800",
    },
    {
      to: "/english/pronunciation",
      icon: Mic2,
      title: t("Phát âm & Ngữ điệu", "Pronunciation & Intonation"),
      desc: t("Luyện phát âm chuẩn IPA với phản hồi AI theo thời gian thực.", "IPA-based pronunciation training with real-time AI feedback."),
      gradient: "from-rose-400/50 to-pink-500/50",
      border: "border-rose-700",
      iconColor: "text-rose-800",
    },
    {
      to: "/english/conversational/curriculum",
      icon: MessageSquare,
      title: t("Giao tiếp", "Conversational"),
      desc: t("38 bài học hội thoại đời sống, dual-speed TTS, 3 trụ cột mở khoá.", "38 real-life conversation lessons, dual-speed TTS, 3 pillars unlocked."),
      gradient: "from-emerald-400/50 to-teal-500/50",
      border: "border-emerald-700",
      iconColor: "text-emerald-800",
    },
    {
      to: "/english/idioms",
      icon: Quote,
      title: t("Thành ngữ & Danh ngôn", "Idioms & Quotes"),
      desc: t("Học idioms, phrasal verbs và danh ngôn truyền cảm hứng như người bản xứ.", "Learn idioms, phrasal verbs & inspiring quotes like a native."),
      gradient: "from-amber-400/50 to-orange-500/50",
      border: "border-amber-700",
      iconColor: "text-amber-800",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 lg:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative overflow-hidden rounded-3xl py-10 min-h-[240px]"
        >
          <EnglishHeroBanner heightClass="h-full" opacity={30} />
          <FloatingEnglishParticles count={10} />
          <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold mb-4">
            💎 4-in-1
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("Tinh hoa Anh ngữ", "English Essentials")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Bốn trụ cột nền tảng giúp bạn làm chủ tiếng Anh: Ngữ pháp · Phát âm · Giao tiếp · Thành ngữ.",
              "Four core pillars to master English: Grammar · Pronunciation · Conversation · Idioms."
            )}
          </p>
          </div>
        </motion.div>


        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={p.to}
                  className={`group block p-6 lg:p-8 rounded-2xl bg-gradient-to-br ${p.gradient} border-[3px] ${p.border} shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-background/90 backdrop-blur flex items-center justify-center border-2 border-foreground/40 group-hover:border-primary transition-colors">
                      <Icon className={`w-7 h-7 ${p.iconColor}`} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-extrabold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                        {p.desc}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                        {t("Vào học", "Start learning")} →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnglishEssentials;
