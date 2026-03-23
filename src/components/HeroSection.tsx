import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, BookOpen, Languages, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import haiProfile from "@/assets/hai-profile.png";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-6 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}
            </div>
          </motion.div>

          {/* Main content: image + text side by side */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="shrink-0"
            >
              <div className="w-64 h-64 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px] rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/15 ring-1 ring-primary/10">
                <img src={haiProfile} alt="Teacher Hai" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left flex-1"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-5">
                {t("Học ", "Learn ")}
                <span className="text-gradient">{t("hiệu quả hơn", "Effectively")}</span>
                <br />
                {t("cùng ", "with ")}
                <span className="text-gradient">{t("Thầy Hải", "Teacher Hai")}</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed px-2 sm:px-0">
                {t(
                  "Chinh phục Tiếng Anh, Tiếng Trung & Lập trình cùng thầy Hải – Thạc sỹ Ngôn ngữ & Văn hóa Anh – Kỹ sư Dữ Liệu & Trí tuệ nhân tạo tại Phần Lan.",
                  "Master English, Chinese & Programming with Teacher Hai – M.A. in English Language & Culture – Data Engineer & AI specialist in Finland."
                )}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 px-2 sm:px-0">
                <Link
                  to="/english"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-sm"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  {t("Các khóa Tiếng Anh", "English Courses")}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
                <Link
                  to="/chinese"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-destructive/90 text-destructive-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-destructive/20 text-sm"
                >
                  <Languages className="w-4 h-4 shrink-0" />
                  {t("Các khóa Tiếng Trung", "Chinese Courses")}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
                <Link
                  to="/programming"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/20 text-sm"
                >
                  <Code2 className="w-4 h-4 shrink-0" />
                  {t("Các khóa Lập trình", "Programming Courses")}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats row - centered below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-3 gap-8 glass-card rounded-2xl px-8 py-6">
              {[
                { icon: GraduationCap, value: t("Thạc sỹ", "M.A."), label: t("Ngôn ngữ & Văn hóa Anh", "English Language & Culture") },
                { icon: BookOpen, value: "15+", label: t("Năm kinh nghiệm giảng dạy các cấp", "Years Teaching Experience") },
                { icon: Code2, value: t("Kỹ sư", "Engineer"), label: t("Dữ Liệu & Trí Tuệ Nhân Tạo", "Data & Artificial Intelligence") },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xl md:text-2xl font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
