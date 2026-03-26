import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Languages, MapPin, Users, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import { useState } from "react";

import classroom1 from "@/assets/classroom-1.jpg";
import classroom2 from "@/assets/classroom-2.jpg";
import classroom3 from "@/assets/classroom-3.jpg";
import classroom4 from "@/assets/classroom-4.jpg";
import classroom5 from "@/assets/classroom-5.jpg";
import classroom6 from "@/assets/classroom-6.jpg";
import classroom7 from "@/assets/classroom-7.jpg";
import classroom8 from "@/assets/classroom-8.jpg";
import classroom9 from "@/assets/classroom-9.jpg";
import classroom10 from "@/assets/classroom-10.jpg";

const classroomImages = [
  { src: classroom1, caption: "English Mr.Hai – Since 2013" },
  { src: classroom2, caption: "IELTS & General English classes" },
  { src: classroom3, caption: "Students having fun after class" },
  { src: classroom4, caption: "Group study sessions" },
  { src: classroom5, caption: "Our amazing students" },
  { src: classroom6, caption: "Full house learning" },
  { src: classroom7, caption: "IELTS preparation class" },
  { src: classroom8, caption: "Focused learning environment" },
  { src: classroom9, caption: "Interactive teaching moments" },
  { src: classroom10, caption: "Young learners & teens" },
];

const ClassroomGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {classroomImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3]"
            onClick={() => setSelected(i)}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-white text-xs font-medium">{img.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={classroomImages[selected].src}
              alt={classroomImages[selected].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-3 text-sm">{classroomImages[selected].caption}</p>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold hover:bg-primary/80"
            >
              ×
            </button>
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 flex flex-col gap-2">
              <button
                onClick={() => setSelected((selected - 1 + classroomImages.length) % classroomImages.length)}
                className="w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg"
              >
                ‹
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 flex flex-col gap-2">
              <button
                onClick={() => setSelected((selected + 1) % classroomImages.length)}
                className="w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg"
              >
                ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

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
    { icon: Users, value: "Founder", label: t("Sáng lập HaiEduTech", "Founded HaiEduTech") },
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
              {t("Kỹ sư · Nhà giáo dục · Gia sư đa ngôn ngữ", "Engineer · Educator · Multilingual Tutor")}
            </p>
            <div className="text-secondary-foreground mb-8 space-y-4 text-[15px] leading-relaxed">
              <p>
                {t(
                  "Chào bạn, thầy là Hai Nguyen – Founder của HaiEduTech.",
                  "Hi, I'm Hai Nguyen – Founder of HaiEduTech."
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
                  "HaiEduTech ra đời từ chính sự giao thoa độc đáo đó. Với tư cách là một Kỹ sư CNTT chuyên ngành Kỹ thuật Dữ liệu, kết hợp với các chứng chỉ chuyên sâu về Điện toán Đám mây và Máy học (AWS Cloud Foundations, Data Engineering, ML for NLP), thầy không chỉ dạy ngôn ngữ mà còn trực tiếp tích hợp các công nghệ AI tiên tiến vào quy trình học tập. Tại HaiEduTech, bạn sẽ không chỉ được dẫn dắt bởi một nhà giáo tận tâm mà còn được trải nghiệm hệ thống học thông minh được tối ưu hóa bằng dữ liệu, giúp bạn học tập hiệu quả hơn bao giờ hết. Thầy không chỉ dạy học, thầy kiến tạo cách bạn học.",
                  "HaiEduTech was born from that unique intersection. As an ICT Engineer specializing in Data Engineering, with certifications in Cloud Computing and Machine Learning (AWS Cloud Foundations, Data Engineering, ML for NLP), I don't just teach languages – I directly integrate cutting-edge AI technologies into the learning process. At HaiEduTech, you'll not only be guided by a dedicated educator but also experience a smart learning system optimized by data, helping you learn more effectively than ever. We don't just teach – we reshape how you learn."
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

            {/* Classroom Gallery */}
            <div className="mb-12">
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
              <ClassroomGallery />
            </div>


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
