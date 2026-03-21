import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, BookOpen, Languages, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import haiProfile from "@/assets/hai-profile.png";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Profile image - larger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="shrink-0"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
              <img src={haiProfile} alt="Teacher Hai" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                {t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                {t("Học ", "Learn ")}
                <span className="text-gradient">{t("hiệu quả hơn", "Effectively")}</span>
                <br />
                {t("cùng ", "with ")}
                <span className="text-gradient">{t("Thầy Hải", "Teacher Hai")}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10">
                {t(
                  "Chinh phục Tiếng Anh, Tiếng Trung & Lập trình cùng thầy Hải – Thạc sỹ Ngôn ngữ & Văn hóa Anh – Kỹ sư Dữ Liệu & Trí tuệ nhân tạo tại Phần Lan.",
                  "Master English, Chinese & Programming with Teacher Hai – M.A. in English Language & Culture – Data Engineer & AI specialist in Finland."
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
            >
              <Link
                to="/english"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
              >
                <BookOpen className="w-5 h-5" />
                {t("Các khóa Tiếng Anh", "English Courses")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/chinese"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-destructive/90 text-destructive-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-destructive/20"
              >
                <Languages className="w-5 h-5" />
                {t("Các khóa Tiếng Trung", "Chinese Courses")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/programming"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-secondary transition-all shadow-sm"
              >
                <Code2 className="w-5 h-5" />
                {t("Các khóa Lập trình", "Programming Courses")}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0"
            >
              {[
                { icon: GraduationCap, value: t("Thạc sỹ", "M.A."), label: t("Ngôn ngữ & Văn hóa Anh", "English Language & Culture") },
                { icon: BookOpen, value: "15+", label: t("Năm kinh nghiệm giảng dạy các cấp", "Years Teaching Experience") },
                { icon: Code2, value: t("Kỹ sư", "Engineer"), label: t("Dữ Liệu & Trí Tuệ Nhân Tạo", "Data & Artificial Intelligence") },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xl md:text-2xl font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;