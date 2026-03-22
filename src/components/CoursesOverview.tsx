import { motion } from "framer-motion";
import { BookOpen, Languages, Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CoursesOverview = () => {
  const { t } = useLanguage();

  const courses = [
    {
      icon: BookOpen,
      title: t("Chương trình Tiếng Anh", "English Program"),
      description: t(
        "Luyện thi IELTS, TOEIC, Cambridge (Starters–PET) và THPT Quốc gia với phản hồi bằng AI.",
        "IELTS, TOEIC, Cambridge (Starters–PET), and National High School Exam preparation with AI feedback."
      ),
      tags: ["IELTS", "TOEIC", "Cambridge", t("THPT QG", "High School")],
      to: "/english",
      color: "from-sky-500/20 to-sky-600/5",
    },
    {
      icon: Languages,
      title: t("Chương trình Tiếng Trung", "Chinese Program"),
      description: t(
        "Từ Sơ cấp đến HSK và Giao tiếp — các module có hệ thống cho mọi trình độ.",
        "From Elementary to HSK and Conversational — structured modules for every level."
      ),
      tags: [t("Sơ cấp", "Elementary"), "HSK", t("Giao tiếp", "Conversational")],
      to: "/chinese",
      color: "from-red-500/20 to-red-600/5",
    },
    {
      icon: Code2,
      title: t("Chương trình Lập trình", "Programming Program"),
      description: t(
        "Lập trình cho trẻ từ cơ bản đến nâng cao. Giới thiệu Data Engineering & AI.",
        "Programming for kids from basics to advanced. Introduction to Data Engineering & AI."
      ),
      tags: ["Python", "Data", "AI", t("Cho trẻ", "For Kids")],
      to: "/programming",
      color: "from-primary/20 to-primary/5",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t("Các chương trình ", "Multi-Disciplinary ")}
            <span className="text-gradient">{t("đào tạo", "Learning")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Ba lĩnh vực chuyên biệt với phương pháp giảng dạy dựa trên dữ liệu", "Three specialized tracks designed with data-driven methodology")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                to={c.to}
                className="block glass-card rounded-xl p-6 h-full hover:border-primary/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-4`}>
                  <c.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  {t("Xem chi tiết", "Explore")} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesOverview;
