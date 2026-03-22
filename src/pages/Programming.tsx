import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, Cpu, BrainCircuit, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import PythonReview from "@/components/PythonReview";
import { programmingModules } from "@/data/programmingLessonData";

const Programming = () => {
  const { t } = useLanguage();

  const kidModules = programmingModules.filter(m => m.course === "kids");
  const dataModules = programmingModules.filter(m => m.course === "data-ai");

  const courses = [
    {
      icon: Cpu,
      title: t("Nền tảng Công nghệ cho trẻ", "Tech Foundations for Kids"),
      desc: t(
        "Khóa học lập trình toàn diện dành cho trẻ em và thanh thiếu niên từ 8–16 tuổi. Bắt đầu từ tư duy logic với lập trình kéo thả (Scratch), tiến dần đến Python và xây dựng dự án thực tế.",
        "Comprehensive programming course for children and teens aged 8–16. Starting with logical thinking through block-based coding (Scratch), progressing to Python and real project building."
      ),
      modules: kidModules,
      anchorId: "kids",
    },
    {
      icon: BrainCircuit,
      title: t("Giới thiệu Data Engineering & AI", "Introduction to Data Engineering & AI"),
      desc: t(
        "Khám phá thế giới Kỹ thuật Dữ liệu và Trí tuệ Nhân tạo — hai lĩnh vực đang định hình tương lai công nghệ. Phù hợp cho học sinh THPT và sinh viên muốn khám phá sự nghiệp CNTT.",
        "Explore the world of Data Engineering and Artificial Intelligence — two fields shaping the future of technology. Ideal for high school and university students exploring IT careers."
      ),
      modules: dataModules,
      anchorId: "data-ai",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Code2 className="w-3 h-3" /> {t("Chương trình Lập trình", "Programming Program")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Khóa học ", "Programming ")}
              <span className="text-gradient">{t("Lập trình", "Courses")}</span>
            </h1>
            <p className="text-muted-foreground mb-12">
              {t(
                "Hai chương trình chính giúp bạn từ người mới bắt đầu đến nắm vững tư duy lập trình và công nghệ dữ liệu hiện đại.",
                "Two main programs taking you from beginner to mastering programming thinking and modern data technologies."
              )}
            </p>

            {/* Course sections with modules */}
            <div className="space-y-12 mb-12">
              {courses.map((c, i) => (
                <motion.div key={i} id={c.anchorId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground">{c.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 max-w-2xl">{c.desc}</p>

                  {/* Module roadmap */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {c.modules.map((mod, j) => (
                      <Link key={mod.id} to={`/programming/${mod.id}`}
                        className="group glass-card rounded-xl p-5 hover:border-primary/30 transition-all">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 + j * 0.08 }}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-lg`}>
                              {mod.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                                {t(mod.title, mod.titleEn)}
                              </h3>
                              <span className="text-xs text-muted-foreground">{mod.lessons.length} {t("bài học", "lessons")}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{t(mod.description, mod.descriptionEn)}</p>

                          {/* Mini roadmap dots */}
                          <div className="flex items-center gap-1.5 mt-3">
                            {mod.lessons.map((_, li) => (
                              <div key={li} className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                            ))}
                            <span className="text-[10px] text-muted-foreground ml-1">
                              {t("modules", "modules")}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Python Review */}
            <PythonReview />

            {/* IT Certifications */}
            <div className="mt-12">
              <CertCarousel title={t("Chứng chỉ CNTT", "IT Certifications")} />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programming;
