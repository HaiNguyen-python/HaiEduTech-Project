import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, Cpu, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import PythonReview from "@/components/PythonReview";

const Programming = () => {
  const { t } = useLanguage();

  const courses = [
    {
      icon: Cpu,
      title: t("Nền tảng Công nghệ cho trẻ", "Tech Foundations for Kids"),
      desc: t(
        "Khóa học lập trình từ cơ bản đến nâng cao, giúp trẻ phát triển tư duy logic và giải quyết vấn đề thông qua các dự án thực tế.",
        "Programming from basics to advanced, helping kids develop logical thinking and problem-solving through real projects."
      ),
      features: [
        t("Scratch & lập trình kéo thả cho trẻ nhỏ", "Scratch & block-based coding for young learners"),
        t("Python cơ bản: biến, vòng lặp, hàm", "Python basics: variables, loops, functions"),
        t("Cấu trúc dữ liệu & thuật toán cơ bản", "Basic data structures & algorithms"),
        t("Dự án thực tế: game, web, ứng dụng nhỏ", "Real projects: games, web, mini apps"),
      ],
    },
    {
      icon: BrainCircuit,
      title: t("Giới thiệu chuyên ngành Data Engineering & AI Technologies", "Introduction to Data Engineering & AI Technologies"),
      desc: t(
        "Khám phá thế giới Kỹ thuật Dữ liệu và Trí tuệ Nhân tạo — nền tảng cho sự nghiệp công nghệ tương lai.",
        "Explore the world of Data Engineering and AI — the foundation for a future tech career."
      ),
      features: [
        t("SQL & quản trị cơ sở dữ liệu", "SQL & database management"),
        t("Xây dựng data pipeline (ETL/ELT)", "Building data pipelines (ETL/ELT)"),
        t("Machine Learning cơ bản với Python", "Basic Machine Learning with Python"),
        t("Giới thiệu Cloud & Big Data", "Introduction to Cloud & Big Data"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Code2 className="w-3 h-3" /> {t("Phòng Lab Lập trình", "Programming Lab")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Khóa học ", "Programming ")}
              <span className="text-gradient">{t("Lập trình", "Courses")}</span>
            </h1>
            <p className="text-muted-foreground mb-12">
              {t(
                "Hai khóa học chính giúp bạn từ người mới bắt đầu đến nắm vững nền tảng công nghệ hiện đại.",
                "Two main courses to take you from beginner to mastering modern technology foundations."
              )}
            </p>

            <div className="space-y-8 mb-12">
              {courses.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground">{c.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
                  <ul className="space-y-2">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-secondary-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
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
