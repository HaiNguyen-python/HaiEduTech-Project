import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Languages, MapPin, Users, Camera, BookOpen, Heart, Lightbulb, Compass, Sparkles, Globe2, Rocket, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import ClassroomGallery from "@/components/ClassroomGallery";
import teacherHaiChibi from "@/assets/teacher-hai-chibi-philosophy.png";

const About = () => {
  const { t } = useLanguage();

  const philosophy = [
    {
      icon: Heart,
      color: "from-rose-400/30 to-pink-300/20",
      iconColor: "text-rose-500",
      quote: t("\"Học để trưởng thành, không chỉ để đi thi.\"", "\"Learn to grow, not just to pass exams.\""),
      desc: t(
        "Mỗi bài học là một cơ hội để các em hiểu mình hơn và trở thành phiên bản tốt hơn của chính mình.",
        "Every lesson is a chance for students to understand themselves and become a better version of who they are."
      ),
    },
    {
      icon: Lightbulb,
      color: "from-amber-400/30 to-yellow-300/20",
      iconColor: "text-amber-500",
      quote: t("\"Đặt câu hỏi đúng – quan trọng hơn nhớ đáp án.\"", "\"Asking the right question matters more than memorizing the answer.\""),
      desc: t(
        "Trong kỷ nguyên AI, thầy rèn cho các em tư duy phản biện và biết dùng công nghệ như người bạn đồng hành.",
        "In the AI era, I train students to think critically and use technology as a companion, not a replacement."
      ),
    },
    {
      icon: Compass,
      color: "from-emerald-400/30 to-teal-300/20",
      iconColor: "text-emerald-500",
      quote: t("\"Đi chậm, đi đúng – sẽ đi rất xa.\"", "\"Go slow, go right — and you'll go far.\""),
      desc: t(
        "Một lộ trình rõ ràng và kiên trì mỗi ngày sẽ thắng mọi \"khoá học cấp tốc\".",
        "A clear roadmap and daily persistence will outlast any \"crash course\"."
      ),
    },
    {
      icon: Globe2,
      color: "from-sky-400/30 to-blue-300/20",
      iconColor: "text-sky-500",
      quote: t("\"Vươn ra thế giới – mà vẫn giữ hồn Việt.\"", "\"Reach the world — keep your Vietnamese soul.\""),
      desc: t(
        "Ngôn ngữ và công nghệ là tấm hộ chiếu để các em tự tin bước ra biển lớn.",
        "Languages and technology are the passport to step confidently onto the global stage."
      ),
    },
    {
      icon: Sparkles,
      color: "from-violet-400/30 to-purple-300/20",
      iconColor: "text-violet-500",
      quote: t("\"Không ai dở học – chỉ là chưa tìm đúng cách.\"", "\"No one is bad at learning — they just haven't found their way yet.\""),
      desc: t(
        "Thầy cam kết lắng nghe, cá nhân hoá lộ trình và tin vào tiềm năng riêng của từng em.",
        "I commit to listening, personalizing each roadmap, and believing in every student's potential."
      ),
    },
    {
      icon: Rocket,
      color: "from-orange-400/30 to-red-300/20",
      iconColor: "text-orange-500",
      quote: t("\"Dám mơ lớn – bắt đầu từ điều nhỏ nhất hôm nay.\"", "\"Dare to dream big — start with the smallest action today.\""),
      desc: t(
        "Tương lai không chờ ai – nhưng luôn mở cửa cho người đủ kiên trì.",
        "The future waits for no one — but it always opens its doors to those who persist."
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

            {/* Chibi Teacher Hai introducing the philosophy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center mb-8"
            >
              <div className="relative">
                <motion.img
                  src={teacherHaiChibi}
                  alt={t("Hình chibi thầy Hải với triết lý giáo dục", "Chibi Mr. Hai with education philosophy")}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-48 md:w-56 h-auto drop-shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -top-2 -right-4 md:-right-8"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400/40" />
                </motion.div>
              </div>
              <p className="mt-3 text-sm font-display italic text-muted-foreground text-center max-w-md">
                {t(
                  "Cùng thầy Hải khám phá 6 giá trị cốt lõi trong hành trình học tập ✨",
                  "Discover with Mr. Hai the 6 core values of a meaningful learning journey ✨"
                )}
              </p>
            </motion.div>

            {/* Philosophy quote cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {philosophy.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`group relative p-5 rounded-2xl border border-border bg-gradient-to-br ${p.color} hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all overflow-hidden`}
                >
                  <Quote className="absolute top-3 right-3 w-5 h-5 text-foreground/10" />
                  <div className="w-11 h-11 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <p.icon className={`w-5 h-5 ${p.iconColor}`} />
                  </div>
                  <p className="text-base font-display font-semibold text-foreground mb-2 leading-snug">
                    {p.quote}
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
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
                  "\"Thầy không chỉ muốn dạy các em một ngôn ngữ hay một dòng code. Thầy muốn cùng các em xây dựng một tư duy học tập suốt đời – để dù mai này các em ở Sài Gòn, Hà Nội hay Helsinki, các em vẫn luôn tự tin học bất cứ điều gì mình muốn.\"",
                  "\"I don't just want to teach you a language or a line of code. I want to build with you a lifelong learning mindset — so that wherever you are — Saigon, Hanoi or Helsinki — you'll always have the confidence to learn anything you set your heart on.\""
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
