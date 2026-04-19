/**
 * @file StudyAbroadHub.tsx
 * @description Landing page for the Study Abroad Portal — entry point to all guides + vault.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderLock, FileText, GraduationCap, Compass, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

const StudyAbroadHub = () => {
  const { t } = useLanguage();

  const sections = [
    {
      to: "/study-abroad/documents",
      icon: FolderLock,
      gradient: "from-emerald-500 to-teal-600",
      title: t("Hồ sơ của tôi", "My Documents"),
      desc: t("Khu vực lưu trữ riêng tư cho hồ sơ apply: bảng điểm, CMND, IELTS, draft.", "Private vault for transcripts, IDs, language certificates, application drafts."),
    },
    {
      to: "/study-abroad/motivation-letter",
      icon: FileText,
      gradient: "from-sky-500 to-indigo-600",
      title: t("Motivation Letter Master", "Mastering the Motivation Letter"),
      desc: t("Công thức 5 đoạn vàng + AI viết bản nháp đầu tiên + template Word.", "The 5-paragraph golden formula + AI first draft + Word template."),
    },
    {
      to: "/study-abroad/sat",
      icon: Compass,
      gradient: "from-amber-500 to-orange-600",
      title: t("Lộ trình SAT", "SAT Success Path"),
      desc: t("3 giai đoạn: Foundation → Strategy → Mastery. Có timeline & resources.", "3 phases: Foundation → Strategy → Mastery. Timeline & resources included."),
    },
    {
      to: "/study-abroad/phd",
      icon: GraduationCap,
      gradient: "from-violet-500 to-fuchsia-600",
      title: t("PhD Global Pathway", "PhD Global Pathway"),
      desc: t("Hướng dẫn theo quốc gia + Research Proposal + AI Cold Email.", "Country-specific guides + Research Proposal + AI Cold Email generator."),
    },
    {
      to: "/global-scholarship",
      icon: Briefcase,
      gradient: "from-pink-500 to-rose-600",
      title: t("AI Scholarship Advisor", "AI Scholarship Advisor"),
      desc: t("Tư vấn học bổng cá nhân hoá realtime với Perplexity AI.", "Personalized real-time scholarship search with Perplexity AI."),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t("Cổng du học toàn diện", "End-to-End Study Abroad Portal")}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              {t("Cổng du học HaiEduTech", "HaiEduTech Study Abroad Portal")}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Một nơi duy nhất cho hồ sơ, hướng dẫn viết letter, lộ trình SAT, chiến lược PhD và tư vấn học bổng AI.",
                "One place for your documents, letter guides, SAT roadmap, PhD strategy, and AI scholarship consulting."
              )}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s, i) => (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={s.to} className="block group h-full">
                  <Card className="h-full overflow-hidden border-border/60 hover:border-primary/40 transition-all hover:shadow-xl">
                    <div className={`h-2 bg-gradient-to-r ${s.gradient}`} />
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                        <s.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                      <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        {t("Khám phá", "Explore")} <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyAbroadHub;
