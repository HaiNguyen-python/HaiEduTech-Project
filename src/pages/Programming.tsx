import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, Award, Cpu, BrainCircuit, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Programming = () => {
  const { t } = useLanguage();

  const courses = [
    {
      icon: Cpu,
      title: t("Lập trình cơ bản – nâng cao cho trẻ", "Basic to Advanced Programming for Kids"),
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

  const itCerts = [
    { name: "AWS Cloud Foundations", file: "/certs/aws-cloud-foundations.pdf" },
    { name: "AWS Data Engineering", file: "/certs/aws-data-engineering.pdf" },
    { name: "AWS ML for NLP", file: "/certs/aws-ml-nlp.pdf" },
    { name: "ETL/ELT in Python", file: "/certs/etl-elt-python.pdf" },
    { name: "MLOps", file: "/certs/mlops.pdf" },
    { name: "SQL Certification", file: "/certs/sql-cert.pdf" },
    { name: "Intro to Deep Learning", file: "/certs/intro-deep-learning.pdf" },
    { name: "Reinforcement Learning", file: "/certs/reinforcement-learning.pdf" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
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

            <div className="space-y-8">
              {courses.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-xl p-6"
                >
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

            {/* IT Certifications */}
            <div className="glass-card rounded-xl p-6 mt-12">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> {t("Chứng chỉ CNTT", "IT Certifications")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {itCerts.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group aspect-[4/3] rounded-lg bg-secondary border border-border flex flex-col items-center justify-center gap-2 p-3 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <Award className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{cert.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programming;
