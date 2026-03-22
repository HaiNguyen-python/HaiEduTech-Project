import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Languages, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";

const About = () => {
  const { t } = useLanguage();

  const timeline = [
    { year: "2014–2018", title: t("Cử nhân Sư phạm Tiếng Anh (TESOL)", "B.A. Teaching English (TESOL)"), place: t("ĐH Sư phạm TP.HCM, Việt Nam", "HCMUE, Vietnam"), icon: GraduationCap },
    { year: "2019–2020", title: t("Thạc sĩ Ngôn ngữ & Văn hóa Anh", "M.A. English Language & Culture"), place: t("ĐH Đông Phần Lan", "Univ. of Eastern Finland"), icon: GraduationCap },
    { year: "2022–2024", title: t("Giáo viên & Quản lý Trung tâm Ngoại ngữ", "Teacher & Language Center Manager"), place: t("Tiếng Anh Thầy Hải, TP.HCM", "Tieng Anh Thay Hai, HCMC"), icon: Languages },
    { year: "2024–Nay", title: t("Cử nhân CNTT (chuyên ngành Kỹ thuật Dữ liệu)", "B.Sc. ICT (Data Engineering focus)"), place: t("ĐH KHƯD Turku, Phần Lan", "Turku UAS, Finland"), icon: Code2 },
    { year: "2025", title: t("ICT Business Analyst", "ICT Business Analyst"), place: t("Flyer Technology, Melbourne", "Flyer Technology, Melbourne"), icon: Briefcase },
  ];

  const achievements = [
    { icon: GraduationCap, value: "M.A.", label: t("Ngôn ngữ & Văn hóa Anh", "English Language & Culture") },
    { icon: Code2, value: "Engineer", label: t("Ngành Dữ liệu & Trí tuệ Nhân tạo", "Data & Artificial Intelligence") },
    { icon: Users, value: "Founder", label: t("Sáng lập HaiEdu", "Founded HaiEdu") },
  ];

  const skills = [
    "Python", "SQL", "Apache Spark", "Kafka", "Airflow", "PostgreSQL",
    "MongoDB", "Snowflake", "BigQuery", "Docker", "Kubernetes", "AWS/Azure/GCP",
    "TensorFlow", "PyTorch", "Pandas", "Scikit-learn",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t("Phần Lan · Việt Nam · Từ xa", "Finland · Vietnam · Remote")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Hai <span className="text-gradient">Nguyen</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {t("Kỹ sư · Nhà giáo dục · Gia sư đa ngôn ngữ", "Engineer · Educator · Multilingual Tutor")}
            </p>
            <div className="text-secondary-foreground mb-8 space-y-4 text-[15px] leading-relaxed">
              <p>
                {t(
                  "Chào bạn, thầy là Hai Nguyen – Founder của HaiEdu.",
                  "Hi, I'm Hai Nguyen – Founder of HaiEdu."
                )}
              </p>
              <p>
                {t(
                  "Với hơn 14 năm kinh nghiệm giảng dạy Ngôn ngữ và nền tảng học vấn vững chắc – Thạc sĩ Ngôn ngữ Anh & Văn hóa, Cử nhân Sư phạm Tiếng Anh (TESOL) – thầy luôn khao khát tìm kiếm giải pháp tối ưu cho việc học. Khát vọng đó đã dẫn lối thầy đến với con đường Kỹ thuật Công nghệ tại Phần Lan, quốc gia dẫn đầu về giáo dục và đổi mới.",
                  "With over 14 years of language teaching experience and a solid academic foundation – M.A. in English Language & Culture, B.A. in TESOL – I have always been passionate about finding optimal learning solutions. That drive led me to pursue Technology Engineering in Finland, a country at the forefront of education and innovation."
                )}
              </p>
              <p>
                {t(
                  "HaiEdu ra đời từ chính sự giao thoa độc đáo đó. Với tư cách là một Kỹ sư CNTT chuyên ngành Kỹ thuật Dữ liệu, kết hợp với các chứng chỉ chuyên sâu về Điện toán Đám mây và Máy học (AWS Cloud Foundations, Data Engineering, ML for NLP), thầy không chỉ dạy ngôn ngữ mà còn trực tiếp tích hợp các công nghệ AI tiên tiến vào quy trình học tập. Tại HaiEdu, bạn sẽ không chỉ được dẫn dắt bởi một nhà giáo tận tâm mà còn được trải nghiệm hệ thống học thông minh được tối ưu hóa bằng dữ liệu, giúp bạn học tập hiệu quả hơn bao giờ hết. Thầy không chỉ dạy học, thầy kiến tạo cách bạn học.",
                  "HaiEdu was born from that unique intersection. As an ICT Engineer specializing in Data Engineering, with certifications in Cloud Computing and Machine Learning (AWS Cloud Foundations, Data Engineering, ML for NLP), I don't just teach languages – I directly integrate cutting-edge AI technologies into the learning process. At HaiEdu, you'll not only be guided by a dedicated educator but also experience a smart learning system optimized by data, helping you learn more effectively than ever. We don't just teach – we reshape how you learn."
                )}
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <a.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xl font-display font-bold text-foreground">{a.value}</div>
                  <div className="text-xs text-muted-foreground">{a.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Certificate Carousel */}
            <div className="mb-12">
              <CertCarousel />
            </div>

            {/* Timeline */}
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">{t("Hành trình", "Journey")}</h3>
            <div className="space-y-4 mb-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary font-mono">{item.year}</div>
                    <div className="text-sm font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.place}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech skills */}
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">{t("Công nghệ sử dụng", "Tech Stack")}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
