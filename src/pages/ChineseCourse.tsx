import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages, CheckCircle, ArrowLeft, Phone, MessageCircle, ArrowRight } from "lucide-react";

const courseData: Record<string, {
  title: string; titleEn: string; level: string; levelEn: string;
  heroDesc: string; heroDescEn: string;
  features: { vi: string; en: string }[];
  curriculum: { vi: string; en: string }[];
  audience: { vi: string; en: string }[];
  duration: string; durationEn: string;
}> = {
  foundation: {
    title: "Tiếng Trung Nền tảng", titleEn: "Foundation Chinese",
    level: "Mới bắt đầu", levelEn: "Beginner",
    heroDesc: "Khóa học dành cho người hoàn toàn mới bắt đầu, xây dựng nền tảng vững chắc từ Pinyin, thanh điệu đến chữ Hán cơ bản.",
    heroDescEn: "For complete beginners, building a solid foundation from Pinyin, tones, to basic Chinese characters.",
    features: [
      { vi: "Hệ thống Pinyin & 4 thanh điệu với audio", en: "Pinyin system & 4 tones with audio drills" },
      { vi: "300+ chữ Hán thiết yếu theo bộ thủ", en: "300+ essential characters with radical method" },
      { vi: "50+ mẫu hội thoại thực tế", en: "50+ real-world dialogue patterns" },
      { vi: "Bài tập viết chữ Hán theo nét chuẩn", en: "Character writing with correct stroke order" },
      { vi: "Văn hóa Trung Quốc cơ bản", en: "Basic Chinese culture" },
    ],
    curriculum: [
      { vi: "Tháng 1: Pinyin, thanh điệu & 50 chữ Hán đầu tiên", en: "Month 1: Pinyin, tones & first 50 characters" },
      { vi: "Tháng 2: Chào hỏi, giới thiệu bản thân, số đếm", en: "Month 2: Greetings, self-introduction, numbers" },
      { vi: "Tháng 3: Mua sắm, ăn uống, hỏi đường", en: "Month 3: Shopping, dining, asking directions" },
      { vi: "Tháng 4: Ngữ pháp cơ bản & viết câu đơn", en: "Month 4: Basic grammar & simple sentences" },
      { vi: "Tháng 5: Ôn tập tổng hợp & chuẩn bị HSK 1", en: "Month 5: Review & HSK 1 preparation" },
    ],
    audience: [
      { vi: "Người chưa biết gì về tiếng Trung", en: "Complete beginners in Chinese" },
      { vi: "Người muốn du lịch hoặc làm việc tại Trung Quốc", en: "People planning to travel or work in China" },
      { vi: "Sinh viên chuẩn bị học tiếng Trung chuyên sâu", en: "Students preparing for advanced Chinese studies" },
    ],
    duration: "5 tháng", durationEn: "5 months",
  },
  hsk: {
    title: "Luyện thi HSK", titleEn: "HSK Preparation",
    level: "HSK 1–6", levelEn: "HSK 1–6",
    heroDesc: "Chương trình ôn luyện bài bản cho kỳ thi năng lực Hán ngữ quốc tế HSK với lộ trình rõ ràng từ HSK 1 đến HSK 6.",
    heroDescEn: "Systematic preparation for international Chinese proficiency HSK exam, from HSK 1 to HSK 6.",
    features: [
      { vi: "Từ vựng phân loại theo HSK 1–6 (150 → 5000+ từ)", en: "Vocabulary classified by HSK 1–6 (150 → 5000+ words)" },
      { vi: "Luyện đọc hiểu theo chủ đề & cấp độ", en: "Reading comprehension by topic & level" },
      { vi: "Luyện nghe tốc độ bản xứ", en: "Listening at native speaker speed" },
      { vi: "Thi thử mô phỏng đề HSK thực tế", en: "Mock tests simulating real HSK format" },
      { vi: "Flashcard, spaced repetition & mẹo ghi nhớ", en: "Flashcards, spaced repetition & mnemonics" },
    ],
    curriculum: [
      { vi: "HSK 1: 150 từ vựng, ngữ pháp cơ bản (2 tháng)", en: "HSK 1: 150 words, basic grammar (2 months)" },
      { vi: "HSK 2: 300 từ vựng, hội thoại mở rộng (2 tháng)", en: "HSK 2: 300 words, extended dialogues (2 months)" },
      { vi: "HSK 3: 600 từ, đọc hiểu & viết đoạn văn (3 tháng)", en: "HSK 3: 600 words, reading & paragraph writing (3 months)" },
      { vi: "HSK 4: 1200 từ, giao tiếp nâng cao (3 tháng)", en: "HSK 4: 1200 words, advanced communication (3 months)" },
      { vi: "HSK 5–6: 2500–5000+ từ, học thuật & chuyên sâu (6 tháng)", en: "HSK 5–6: 2500–5000+ words, academic level (6 months)" },
    ],
    audience: [
      { vi: "Người cần chứng chỉ HSK cho du học hoặc làm việc", en: "Those needing HSK for study/work abroad" },
      { vi: "Sinh viên ngành Ngôn ngữ Trung", en: "Chinese language major students" },
    ],
    duration: "Tùy cấp độ (2–6 tháng/cấp)", durationEn: "Varies by level (2–6 months/level)",
  },
  conversational: {
    title: "Tiếng Trung Giao tiếp", titleEn: "Conversational Chinese",
    level: "Tất cả trình độ", levelEn: "All Levels",
    heroDesc: "Khóa học tập trung vào nói và nghe trong tình huống thực tế: du lịch, kinh doanh, cuộc sống hàng ngày.",
    heroDescEn: "Focused on speaking and listening in real-world situations: travel, business, daily life.",
    features: [
      { vi: "30+ chủ đề giao tiếp thực tế", en: "30+ real conversation topics" },
      { vi: "Luyện phát âm chuẩn với native speaker", en: "Pronunciation with native speaker recordings" },
      { vi: "Roleplay & thảo luận nhóm hàng tuần", en: "Weekly roleplay & group discussions" },
      { vi: "Giản thể vs Phồn thể (Đại lục vs Đài Loan)", en: "Simplified vs Traditional Chinese" },
      { vi: "Slang, thành ngữ & cách nói tự nhiên", en: "Slang, idioms & natural expressions" },
    ],
    curriculum: [
      { vi: "Tháng 1: Giao tiếp cơ bản – chào hỏi, giới thiệu, mua sắm", en: "Month 1: Basic – greetings, introductions, shopping" },
      { vi: "Tháng 2: Du lịch – khách sạn, nhà hàng, phương tiện", en: "Month 2: Travel – hotels, restaurants, transport" },
      { vi: "Tháng 3: Công việc – phỏng vấn, họp, email", en: "Month 3: Work – interviews, meetings, emails" },
      { vi: "Tháng 4: Nâng cao – tranh luận, văn hóa, tin tức", en: "Month 4: Advanced – debates, culture, news" },
    ],
    audience: [
      { vi: "Người muốn giao tiếp tiếng Trung tự tin", en: "Anyone wanting confident Chinese communication" },
      { vi: "Doanh nhân làm việc với đối tác Trung Quốc", en: "Business people working with Chinese partners" },
      { vi: "Người chuẩn bị sống tại Trung Quốc/Đài Loan", en: "People planning to live in China/Taiwan" },
    ],
    duration: "4 tháng", durationEn: "4 months",
  },
};

const ChineseCourse = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const course = courseData[courseId || ""];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 container mx-auto px-6 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy chương trình.", "Course not found.")}</p>
          <Link to="/chinese" className="text-primary hover:underline mt-4 inline-block">{t("Quay lại", "Go back")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <Link to="/chinese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> {t("Chương trình Tiếng Trung", "Chinese Programs")}
            </Link>

            <div className="glass-card rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-5 h-5 text-red-500" />
                <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-500 font-semibold">{t(course.level, course.levelEn)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{t(course.title, course.titleEn)}</h1>
              <p className="text-muted-foreground leading-relaxed">{t(course.heroDesc, course.heroDescEn)}</p>
              <div className="mt-4 text-sm text-muted-foreground">
                ⏱️ {t("Thời lượng", "Duration")}: <span className="font-semibold text-foreground">{t(course.duration, course.durationEn)}</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">✨ {t("Điểm nổi bật", "Highlights")}</h2>
              <ul className="space-y-3">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary-foreground">
                    <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{t(f.vi, f.en)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">📋 {t("Giáo án & Lộ trình", "Curriculum & Roadmap")}</h2>
              <div className="space-y-4">
                {course.curriculum.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-red-500">{i + 1}</span>
                    </div>
                    <p className="text-secondary-foreground pt-1">{t(c.vi, c.en)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">🎯 {t("Đối tượng phù hợp", "Who is this for?")}</h2>
              <ul className="space-y-2">
                {course.audience.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary-foreground">
                    <ArrowRight className="w-4 h-4 text-red-500 shrink-0" />
                    {t(a.vi, a.en)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="glass-card rounded-2xl p-8 border-2 border-red-500/20">
              <h2 className="text-xl font-display font-bold text-foreground mb-2">📞 {t("Đăng ký học ngay", "Register Now")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("Liên hệ thầy Hải để được tư vấn chi tiết và đăng ký khóa học.", "Contact Teacher Hai for consultation and registration.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="tel:0962823800" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                  <Phone className="w-5 h-5" /> 0962.823.800
                </a>
                <a href="https://zalo.me/0962823800" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                  <MessageCircle className="w-5 h-5" /> Zalo: 0962.823.800
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("Hoặc để lại thông tin trong mục ", "Or leave your information in the ")}
                <Link to="/contact" className="text-primary font-semibold hover:underline">{t("Liên hệ", "Contact")}</Link>
                {t(" để thầy hỗ trợ sớm nhất.", " section for the earliest support.")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChineseCourse;
