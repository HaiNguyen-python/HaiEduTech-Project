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
        "Khóa học lập trình toàn diện dành cho trẻ em và thanh thiếu niên từ 8–16 tuổi. Bắt đầu từ tư duy logic với lập trình kéo thả (Scratch), tiến dần đến Python và xây dựng dự án thực tế. Giúp trẻ phát triển khả năng giải quyết vấn đề, sáng tạo và tự tin trong thời đại số.",
        "Comprehensive programming course for children and teens aged 8–16. Starting with logical thinking through block-based coding (Scratch), progressing to Python and real project building. Developing problem-solving skills, creativity, and digital confidence."
      ),
      features: [
        t("Scratch & lập trình kéo thả: tư duy thuật toán qua trò chơi sáng tạo", "Scratch & block-based coding: algorithmic thinking through creative games"),
        t("Python cơ bản → nâng cao: biến, vòng lặp, hàm, OOP, file I/O", "Python basics → advanced: variables, loops, functions, OOP, file I/O"),
        t("Cấu trúc dữ liệu & thuật toán: array, list, dictionary, sorting, searching", "Data structures & algorithms: array, list, dictionary, sorting, searching"),
        t("Dự án thực tế: game (Pygame), web cá nhân (HTML/CSS), chatbot đơn giản", "Real projects: games (Pygame), personal website (HTML/CSS), simple chatbot"),
        t("Tư duy Computational Thinking: phân tích, trừu tượng hóa, pattern recognition", "Computational Thinking: analysis, abstraction, pattern recognition"),
        t("Hackathon & showcase: trình bày dự án cuối khóa trước phụ huynh & bạn bè", "Hackathon & showcase: end-of-course project presentation to parents & peers"),
      ],
    },
    {
      icon: BrainCircuit,
      title: t("Giới thiệu Data Engineering & AI", "Introduction to Data Engineering & AI"),
      desc: t(
        "Khám phá thế giới Kỹ thuật Dữ liệu và Trí tuệ Nhân tạo — hai lĩnh vực đang định hình tương lai công nghệ. Khóa học cung cấp kiến thức nền tảng từ quản trị cơ sở dữ liệu, xây dựng data pipeline, đến Machine Learning cơ bản. Phù hợp cho học sinh THPT và sinh viên muốn khám phá sự nghiệp CNTT.",
        "Explore the world of Data Engineering and Artificial Intelligence — two fields shaping the future of technology. This course provides foundational knowledge from database management, building data pipelines, to basic Machine Learning. Ideal for high school and university students exploring IT careers."
      ),
      features: [
        t("SQL & cơ sở dữ liệu: thiết kế bảng, truy vấn, join, indexing với PostgreSQL", "SQL & databases: table design, queries, joins, indexing with PostgreSQL"),
        t("Data Pipeline (ETL/ELT): thu thập, xử lý, lưu trữ dữ liệu tự động", "Data Pipeline (ETL/ELT): automated data collection, processing, storage"),
        t("Python cho Data: pandas, numpy, matplotlib — phân tích & trực quan hóa dữ liệu", "Python for Data: pandas, numpy, matplotlib — data analysis & visualization"),
        t("Machine Learning cơ bản: regression, classification, clustering với scikit-learn", "Basic Machine Learning: regression, classification, clustering with scikit-learn"),
        t("Giới thiệu Cloud Computing: AWS/GCP cơ bản, triển khai ứng dụng đám mây", "Introduction to Cloud Computing: AWS/GCP basics, cloud app deployment"),
        t("Capstone project: xây dựng data pipeline hoặc mô hình ML end-to-end", "Capstone project: build an end-to-end data pipeline or ML model"),
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
