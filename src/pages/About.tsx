import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Languages, MapPin, Users, Camera, BookOpen, Heart, Lightbulb, Compass, Sparkles, Globe2, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import ClassroomGallery from "@/components/ClassroomGallery";

const About = () => {
  const { t } = useLanguage();

  const philosophy = [
    {
      icon: Heart,
      title: t("Học để trưởng thành, không chỉ để đi thi", "Learn to grow, not just to pass exams"),
      desc: t(
        "Thầy tin rằng giáo dục thật sự phải chạm đến trái tim. Mỗi bài học không chỉ là kiến thức, mà còn là cơ hội để các em hiểu mình hơn, mở rộng thế giới quan và trở thành phiên bản tốt hơn của chính mình.",
        "I believe true education must touch the heart. Every lesson isn't just knowledge — it's a chance for students to understand themselves, broaden their worldview, and become a better version of who they are."
      ),
    },
    {
      icon: Lightbulb,
      title: t("Tư duy độc lập trong kỷ nguyên AI", "Independent thinking in the AI era"),
      desc: t(
        "Trong thời đại AI bùng nổ, thầy không dạy các em ghi nhớ máy móc, mà rèn cho các em cách đặt câu hỏi đúng, biết phản biện và biết dùng công nghệ như một người bạn đồng hành – chứ không phải kẻ thay thế.",
        "In the age of AI, I don't teach memorization — I train students to ask the right questions, think critically, and use technology as a companion, not a replacement."
      ),
    },
    {
      icon: Compass,
      title: t("Học tập bền vững – đi xa cùng nhau", "Sustainable learning – going far, together"),
      desc: t(
        "Thầy tin vào hành trình dài hạn: học mỗi ngày một chút, kiên trì và có chiến lược. Một lộ trình rõ ràng, đúng phương pháp và có người đồng hành sẽ giúp các em đi xa hơn bất kỳ \"khoá học cấp tốc\" nào.",
        "I believe in the long game: learn a little every day, with patience and strategy. A clear roadmap, the right method, and a mentor by your side will take you further than any \"crash course\" ever could."
      ),
    },
    {
      icon: Globe2,
      title: t("Công dân toàn cầu mang hồn Việt", "Global citizens with a Vietnamese soul"),
      desc: t(
        "Đi qua Việt Nam, Phần Lan, Úc – thầy thấy rõ: các em hoàn toàn có thể vươn ra thế giới mà vẫn giữ được bản sắc. Học ngôn ngữ và công nghệ chính là tấm hộ chiếu để các em tự tin bước ra biển lớn.",
        "Living across Vietnam, Finland, and Australia, I see clearly: our students can reach the world while keeping their roots. Languages and technology are the passport to step confidently onto the global stage."
      ),
    },
    {
      icon: Sparkles,
      title: t("Mỗi học sinh là một vì sao riêng", "Every student is their own star"),
      desc: t(
        "Không có ai \"dở\" – chỉ có người chưa tìm đúng cách học của mình. Thầy cam kết lắng nghe, cá nhân hoá lộ trình và tin vào tiềm năng của từng em, dù xuất phát điểm có ở đâu.",
        "No one is \"bad at learning\" — they just haven't found their own way yet. I commit to listening, personalizing each roadmap, and believing in every student's potential, no matter where they start."
      ),
    },
    {
      icon: Rocket,
      title: t("Gieo ước mơ – chắp cánh hành động", "Plant dreams – grow wings to act"),
      desc: t(
        "Thông điệp thầy muốn gửi đến các em ở Việt Nam và khắp nơi: hãy dám mơ lớn, rồi bắt tay vào làm từ những điều nhỏ nhất hôm nay. Tương lai không chờ ai – nhưng nó luôn mở cửa cho người đủ kiên trì.",
        "My message to students in Vietnam and around the world: dare to dream big, then start with the smallest action today. The future waits for no one — but it always opens its doors to those who persist."
      ),
    },
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
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-display font-semibold text-foreground">
                {t("Triết lý dạy & học của thầy Hải", "My Teaching & Learning Philosophy")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t(
                "Những giá trị thầy theo đuổi và muốn gửi gắm đến các em học sinh ở Việt Nam và khắp nơi trên thế giới.",
                "The values I live by and want to pass on to students in Vietnam and around the world."
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {philosophy.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-base font-display font-semibold text-foreground mb-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
            >
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
              <p className="text-base md:text-lg font-display italic text-foreground leading-relaxed">
                {t(
                  "\"Thầy không chỉ muốn dạy các em một ngôn ngữ hay một dòng code. Thầy muốn cùng các em xây dựng một tư duy học tập suốt đời – để dù mai này các em ở Sài Gòn, Hà Nội, Helsinki hay Melbourne, các em vẫn luôn tự tin học bất cứ điều gì mình muốn.\"",
                  "\"I don't just want to teach you a language or a line of code. I want to build with you a lifelong learning mindset — so that wherever you are — Saigon, Hanoi, Helsinki or Melbourne — you'll always have the confidence to learn anything you set your heart on.\""
                )}
              </p>
              <p className="mt-3 text-sm font-semibold text-primary">— Mr. Hai Nguyen</p>
            </motion.div>

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
