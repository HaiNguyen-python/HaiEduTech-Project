import { motion } from "framer-motion";
import { BookOpen, Languages, Code2, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ShineCard from "@/components/ShineCard";
import FloatingChibi from "@/components/FloatingChibi";
import chibiTeacher from "@/assets/chibi-teacher.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiReading from "@/assets/chibi-reading.png";
import chibiSpeaking from "@/assets/chibi-speaking.png";



const CoursesOverview = () => {
  const { t } = useLanguage();

  const courses = [
    {
      icon: BookOpen,
      title: t("Chương trình Tiếng Anh", "English Program"),
      description: t(
        "Luyện thi IELTS, TOEIC, Cambridge và THPT Quốc gia với lộ trình rõ ràng, dễ theo sát trên điện thoại.",
        "IELTS, TOEIC, Cambridge, and National High School Exam prep with a clear, mobile-friendly learning path."
      ),
      tags: ["IELTS", "TOEIC", "Cambridge", t("THPT QG", "High School")],
      to: "/english",
      color: "from-sky-500/20 to-sky-600/5",
      isNew: false,
    },
    {
      icon: Languages,
      title: t("Chương trình Tiếng Trung", "Chinese Program"),
      description: t(
        "Từ sơ cấp đến HSK và giao tiếp, từng chặng học được chia rõ để học viên dễ chọn đúng chương trình.",
        "From beginner to HSK and conversational Chinese, each learning path is clearly structured for easy selection."
      ),
      tags: [t("Sơ cấp", "Elementary"), "HSK", t("Giao tiếp", "Conversational")],
      to: "/chinese",
      color: "from-red-500/20 to-red-600/5",
      isNew: false,
    },
    {
      icon: Code2,
      title: t("Chương trình Lập trình", "Programming Program"),
      description: t(
        "Học Python, SQL, Data và AI với bài học thực hành ngay trên nền tảng, không cần mở công cụ ngoài.",
        "Learn Python, SQL, Data, and AI with hands-on lessons directly on the platform, no external tools needed."
      ),
      tags: ["Python", "Data", "AI", t("Cho trẻ", "For Kids")],
      to: "/programming",
      color: "from-primary/20 to-primary/5",
      isNew: false,
    },
    {
      icon: Brain,
      title: t("AI Academy", "AI Academy"),
      description: t(
        "Học AI cho cấp 2–3 với 12 chủ đề sandbox tương tác: Machine Learning, Computer Vision, NLP và Capstone.",
        "AI learning for grades 6–12 with 12 interactive sandbox topics: Machine Learning, Computer Vision, NLP and Capstone."
      ),
      tags: ["ML", "Vision", "NLP", "Sandbox"],
      to: "/programming/ai-academy",
      color: "from-violet-500/25 to-fuchsia-500/10",
      isNew: true,
    },
  ];

  return (
    <section className="relative overflow-x-clip py-16 sm:py-20">
      <FloatingChibi src={chibiReading} alt="" className="absolute left-[4%] top-6 z-20 opacity-90" size={88} />
      <FloatingChibi src={chibiTeacher} alt="" className="absolute left-[4%] bottom-16 z-20 opacity-90" size={106} delay={0.6} />
      <FloatingChibi src={chibiSpeaking} alt="" className="absolute right-[4%] top-28 z-20 opacity-90" size={104} delay={1.2} />
      <FloatingChibi src={chibiCoder} alt="" className="absolute right-[4%] bottom-20 z-20 opacity-90" size={92} delay={1.8} flip />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Các chương trình ", "Multi-Disciplinary ")}
            <span className="text-gradient">{t("đào tạo", "Learning")}</span>
          </h2>
          <p className="mx-auto max-w-xl px-2 text-sm leading-7 text-muted-foreground sm:px-0 sm:text-base">
            {t("Bốn trụ cột chuyên biệt với phương pháp giảng dạy dựa trên dữ liệu", "Four specialized tracks designed with data-driven methodology")}
          </p>
        </motion.div>

        <div className="-my-3 grid grid-cols-1 gap-6 py-3 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <ShineCard className="h-full rounded-2xl">
                <Link
                  to={c.to}
                  className="group relative block h-full rounded-2xl border-[3px] border-primary/60 bg-card p-5 shadow-[0_6px_24px_-4px_hsl(var(--primary)/0.28)] ring-2 ring-primary/15 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-2xl hover:shadow-primary/35"
                >
                  {c.isNew && (
                    <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      {t("Mới", "New")}
                    </span>
                  )}
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${c.color}`}>
                    <c.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold leading-tight text-foreground sm:text-xl">{c.title}</h3>
                  <p className="mb-4 text-sm leading-7 text-muted-foreground">{c.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    {t("Xem chi tiết", "Explore")} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </ShineCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesOverview;
