/**
 * @file StudyAbroadHub.tsx
 * @description Landing page for the Study Abroad Portal - entry point to all guides + vault.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderLock, FileText, GraduationCap, Compass, Briefcase, ArrowRight, Sparkles, Users, Plane, BookOpen, MessageSquare, Calculator } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

const StudyAbroadHub = () => {
  const { t } = useLanguage();

  const sections = [
    {
      to: "/study-abroad/journey",
      icon: Compass,
      gradient: "from-cyan-500 to-blue-600",
      title: t("Journey Dashboard", "Journey Dashboard"),
      desc: t("Tổng quan 7 mốc hành trình, deadline gần nhất, shortlist & hồ sơ - cập nhật realtime.", "7 milestones, next deadline, shortlist & docs - real-time overview."),
    },
    {
      to: "/study-abroad/shortlister",
      icon: GraduationCap,
      gradient: "from-indigo-500 to-purple-600",
      title: t("University Shortlister AI", "University Shortlister AI"),
      desc: t("AI Perplexity gợi ý 9 trường (reach/target/safety) khớp hồ sơ - dữ liệu 2026.", "AI suggests 9 universities (reach/target/safety) - Perplexity 2026 data."),
    },
    {
      to: "/study-abroad/interview-prep",
      icon: MessageSquare,
      gradient: "from-fuchsia-500 to-pink-600",
      title: t("Interview Prep AI", "Interview Prep AI"),
      desc: t("10 câu phỏng vấn riêng cho trường/ngành + AI chấm điểm câu trả lời.", "10 program-specific interview questions + AI scoring."),
    },
    {
      to: "/study-abroad/cost-calculator",
      icon: Calculator,
      gradient: "from-amber-500 to-orange-600",
      title: t("Cost Calculator", "Cost Calculator"),
      desc: t("Tính tổng chi phí du học Phần Lan, Mỹ, Anh, Trung - học phí, nhà ở, sinh hoạt, visa.", "Total cost estimator for Finland, USA, UK, China."),
    },
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
      to: "/study-abroad/cv",
      icon: FileText,
      gradient: "from-emerald-500 to-green-600",
      title: t("CV Builder", "CV Builder"),
      desc: t("3 mẫu Europass, Modern (US), Classic (UK). Lưu nháp tự động · xuất PDF.", "3 templates Europass, Modern (US), Classic (UK). Auto-save · export PDF."),
    },
    {
      to: "/study-abroad/sat",
      icon: BookOpen,
      gradient: "from-amber-500 to-orange-600",
      title: t("SAT Roadmap", "SAT Roadmap"),
      desc: t("Lộ trình SAT 1500+: vocab, exercises, 7 mock exams, daily warmup.", "1500+ SAT roadmap: vocab, exercises, 7 mock exams, daily warmup."),
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
      title: t("Tư vấn học bổng cùng Mr. Hai", "Scholarship Consulting with Mr. Hai"),
      desc: t("Tư vấn học bổng cá nhân hoá realtime cùng Mr. Hai.", "Personalized real-time scholarship search with Mr. Hai."),
    },
    {
      to: "/study-abroad/mentor-hub",
      icon: Users,
      gradient: "from-cyan-500 to-blue-600",
      title: t("Mentor Hub", "Mentor Hub"),
      desc: t("Câu chuyện thành công từ cựu học viên + form hỏi Thầy Hải.", "Success stories from alumni + inquiry form to Teacher Hai."),
    },
    {
      to: "/study-abroad/checklist",
      icon: Plane,
      gradient: "from-teal-500 to-emerald-600",
      title: t("Pre-Departure Checklist", "Pre-Departure Checklist"),
      desc: t("Lộ trình từng bước cho Phần Lan, Trung Quốc, Anh, Mỹ.", "Step-by-step roadmap for Finland, China, UK, USA."),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Tư Vấn Du Học Miễn Phí: Hồ Sơ, SOP, Học Bổng | HaiEduTech" description="Cổng du học toàn diện: quản lý hồ sơ, motivation letter, SAT roadmap, PhD pathway, mentor hub, pre-departure checklist. Tư vấn 1-1 với Thầy Hải." path="/study-abroad" />
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
                "Một nơi duy nhất cho hồ sơ, hướng dẫn viết letter, lộ trình SAT, chiến lược PhD và tư vấn học bổng cùng Mr. Hai.",
                "One place for your documents, letter guides, SAT roadmap, PhD strategy, and scholarship consulting with Mr. Hai."
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
