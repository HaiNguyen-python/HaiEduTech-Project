import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Languages, MapPin, Users, Camera, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import ClassroomGallery from "@/components/ClassroomGallery";

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
    {
      icon: GraduationCap,
      value: t("Cử nhân", "B.A."),
      label: t("TEFL – Giảng dạy Tiếng Anh", "TEFL – Teaching English"),
      place: t("ĐH Sư phạm TP.HCM", "HCMC University of Education"),
      year: "2018",
    },
    {
      icon: GraduationCap,
      value: t("Thạc sĩ", "M.A."),
      label: t("Ngôn ngữ & Văn hóa Anh", "English Language & Culture"),
      place: t("ĐH Đông Phần Lan", "University of Eastern Finland"),
      year: "2020",
    },
    {
      icon: GraduationCap,
      value: t("Thạc sĩ", "M.A."),
      label: t("Công nghệ Ngôn ngữ", "Language Technology"),
      place: t("ĐH Helsinki", "University of Helsinki"),
      year: t("Đang học", "Current"),
    },
    {
      icon: Code2,
      value: t("Kỹ sư", "Engineer"),
      label: t("Dữ Liệu & Trí Tuệ Nhân Tạo", "Data & Artificial Intelligence"),
      place: t("ĐH Khoa học Ứng dụng Turku", "Turku University of Applied Sciences"),
      year: "2026",
    },
    {
      icon: BookOpen,
      value: "15+",
      label: t("Năm kinh nghiệm giảng dạy", "Years Teaching Experience"),
      place: t("Việt Nam – Phần Lan", "Vietnam – Finland"),
      year: t("Từ 2011", "Since 2011"),
    },
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
              <span className="text-sm text-muted-foreground">{t("Phần Lan · Việt Nam", "Finland · Vietnam")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Hai <span className="text-gradient">Nguyen</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Data & AI Engineer - Language Educator - HaiEduTech Founder
            </p>
            <div className="text-secondary-foreground mb-8 space-y-4 text-[15px] leading-relaxed">
              <p>{t("Chào bạn, thầy là Hai Nguyen – Founder của HaiEduTech.", "Hi, I'm Hai Nguyen – Founder of HaiEduTech.")}</p>
              <p>
                {t(
                  "Với hơn 15 năm kinh nghiệm giảng dạy Ngôn ngữ và nền tảng học vấn vững chắc – Thạc sĩ Ngôn ngữ Anh & Văn hóa, Cử nhân Sư phạm Tiếng Anh (TESOL) – thầy luôn khao khát tìm kiếm giải pháp tối ưu cho việc học. Khát vọng đó đã dẫn lối thầy đến với con đường Kỹ thuật Công nghệ tại Phần Lan, quốc gia dẫn đầu về giáo dục và đổi mới.",
                  "With over 15 years of language teaching experience and a solid academic foundation – M.A. in English Language & Culture, B.A. in TESOL – I have always been passionate about finding optimal learning solutions. That drive led me to pursue Technology Engineering in Finland, a country at the forefront of education and innovation."
                )}
              </p>
              <p>
                {t(
                  "HaiEduTech ra đời từ chính sự giao thoa độc đáo đó. Với tư cách là một Kỹ sư CNTT chuyên ngành Kỹ thuật Dữ liệu, kết hợp với các chứng chỉ chuyên sâu về Điện toán Đám mây và Máy học (AWS Cloud Foundations, Data Engineering, ML for NLP), thầy không chỉ dạy ngôn ngữ mà còn trực tiếp tích hợp các công nghệ AI tiên tiến vào quy trình học tập. Tại HaiEduTech, bạn sẽ không chỉ được dẫn dắt bởi một nhà giáo tận tâm mà còn được trải nghiệm hệ thống học thông minh được tối ưu hóa bằng dữ liệu, giúp bạn học tập hiệu quả hơn bao giờ hết. Thầy không chỉ dạy học, thầy kiến tạo cách bạn học.",
                  "HaiEduTech was born from that unique intersection. As an ICT Engineer specializing in Data Engineering, with certifications in Cloud Computing and Machine Learning (AWS Cloud Foundations, Data Engineering, ML for NLP), I don't just teach languages – I directly integrate cutting-edge AI technologies into the learning process. At HaiEduTech, you'll not only be guided by a dedicated educator but also experience a smart learning system optimized by data, helping you learn more effectively than ever. We don't just teach – we reshape how you learn."
                )}
              </p>
            </div>

            {/* Achievements - synced with HeroSection */}
            <div className="glass-card grid grid-cols-1 gap-4 rounded-2xl px-5 py-5 sm:grid-cols-2 sm:gap-6 sm:px-8 sm:py-6 lg:grid-cols-5 mb-12">
              {achievements.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex h-full flex-col text-center"
                >
                  <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <div className="font-display text-lg font-bold text-foreground sm:text-xl">{s.value}</div>
                  <div className="mt-1 text-xs font-medium leading-5 text-foreground/90">{s.label}</div>
                  <div className="mt-0.5 text-[11px] leading-4 text-muted-foreground">{s.place}</div>
                  <div className="mt-auto pt-2 text-[11px] font-semibold leading-4 text-primary">{s.year}</div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Certificate Carousel - full width */}
          <div className="mb-12 -mx-6 md:mx-0">
            <CertCarousel />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          </motion.div>

          {/* Classroom Gallery - full width for marquee effect */}
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-display font-semibold text-foreground">
                {t("Không gian lớp học", "Our Classroom")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t(
                "Hành trình giảng dạy Ngôn ngữ & Công nghệ trong 15 năm qua.",
                "15 years of teaching Language & Technology."
              )}
            </p>
          </div>
          <div className="mb-12 -mx-6 md:-mx-0">
            <ClassroomGallery />
          </div>

          <div className="max-w-3xl mx-auto">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
