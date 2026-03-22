import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, CheckCircle, ArrowLeft, Phone, MessageCircle, ArrowRight } from "lucide-react";

const courseData: Record<string, {
  title: string; titleEn: string; level: string; levelEn: string;
  heroDesc: string; heroDescEn: string;
  features: { vi: string; en: string }[];
  curriculum: { vi: string; en: string }[];
  audience: { vi: string; en: string }[];
  duration: string; durationEn: string;
  color: string;
}> = {
  cambridge: {
    title: "Cambridge Starters–PET", titleEn: "Cambridge Starters–PET",
    level: "Mới bắt đầu → Trung cấp", levelEn: "Beginner → Intermediate",
    heroDesc: "Chương trình tiếng Anh chuẩn quốc tế dành cho trẻ em từ 6–14 tuổi. Được thiết kế theo khung Cambridge Assessment, giúp trẻ xây dựng nền tảng ngôn ngữ vững chắc qua các hoạt động học tập sinh động.",
    heroDescEn: "International-standard English program for children aged 6–14. Designed around the Cambridge Assessment framework, building strong language foundations through engaging, age-appropriate activities.",
    features: [
      { vi: "Lộ trình Starters → Movers → Flyers → KET → PET rõ ràng", en: "Clear Starters → Movers → Flyers → KET → PET pathway" },
      { vi: "4 kỹ năng qua trò chơi và dự án", en: "4 skills through games & projects" },
      { vi: "Đánh giá định kỳ & phản hồi cho phụ huynh", en: "Regular assessments & parent feedback" },
      { vi: "Lớp học nhỏ (≤8 học sinh)", en: "Small classes (≤8 students)" },
    ],
    curriculum: [
      { vi: "Giai đoạn 1: Starters – Làm quen nghe nói cơ bản (3 tháng)", en: "Phase 1: Starters – Basic listening & speaking (3 months)" },
      { vi: "Giai đoạn 2: Movers – Đọc hiểu & viết câu đơn (3 tháng)", en: "Phase 2: Movers – Reading & simple writing (3 months)" },
      { vi: "Giai đoạn 3: Flyers – Giao tiếp tự tin & viết đoạn văn (4 tháng)", en: "Phase 3: Flyers – Confident communication & paragraphs (4 months)" },
      { vi: "Giai đoạn 4: KET – Ngữ pháp nền tảng & kỹ năng thi (4 tháng)", en: "Phase 4: KET – Foundation grammar & exam skills (4 months)" },
      { vi: "Giai đoạn 5: PET – Trung cấp & luyện thi chứng chỉ (4 tháng)", en: "Phase 5: PET – Intermediate & exam preparation (4 months)" },
    ],
    audience: [
      { vi: "Trẻ em từ 6–14 tuổi", en: "Children aged 6–14" },
      { vi: "Phụ huynh muốn con có chứng chỉ quốc tế", en: "Parents wanting international certificates for their children" },
      { vi: "Học sinh chuẩn bị du học hoặc học trường quốc tế", en: "Students preparing for study abroad or international schools" },
    ],
    duration: "18 tháng (lộ trình đầy đủ)", durationEn: "18 months (full pathway)",
    color: "sky",
  },
  ielts: {
    title: "Luyện thi IELTS", titleEn: "IELTS Preparation",
    level: "Trung cấp → Nâng cao", levelEn: "Intermediate → Advanced",
    heroDesc: "Khóa luyện thi IELTS toàn diện với mục tiêu band 6.5–8.0+. Kết hợp phương pháp giảng dạy truyền thống với công nghệ AI chấm điểm Writing & Speaking.",
    heroDescEn: "Comprehensive IELTS preparation targeting band 6.5–8.0+. Combines traditional teaching with AI-powered Writing & Speaking grading.",
    features: [
      { vi: "Chiến lược làm bài từng phần: Listening, Reading, Writing, Speaking", en: "Section-specific strategies for all 4 skills" },
      { vi: "AI chấm & phân tích bài Writing Task 1 & Task 2", en: "AI grading for Writing Task 1 & 2" },
      { vi: "AI đánh giá Speaking theo 4 tiêu chí chính thức", en: "AI Speaking evaluation across 4 official criteria" },
      { vi: "Thi thử mô phỏng thực tế hàng tuần", en: "Weekly realistic mock tests" },
      { vi: "Kho 1000+ bài mẫu Writing & Speaking topics", en: "1000+ Writing samples & Speaking topics" },
    ],
    curriculum: [
      { vi: "Tuần 1–4: Đánh giá trình độ & xây dựng nền tảng", en: "Weeks 1–4: Level assessment & foundation building" },
      { vi: "Tuần 5–8: Listening & Reading – Chiến lược & luyện đề", en: "Weeks 5–8: Listening & Reading strategies & practice" },
      { vi: "Tuần 9–12: Writing Task 1 & 2 – Cấu trúc & AI Feedback", en: "Weeks 9–12: Writing Task 1 & 2 with AI Feedback" },
      { vi: "Tuần 13–16: Speaking – Phát âm, trả lời & phản xạ", en: "Weeks 13–16: Speaking – Pronunciation & fluency" },
      { vi: "Tuần 17–20: Thi thử tổng hợp & chỉnh sửa điểm yếu", en: "Weeks 17–20: Full mock tests & weakness correction" },
    ],
    audience: [
      { vi: "Sinh viên chuẩn bị du học", en: "Students preparing to study abroad" },
      { vi: "Người đi làm cần chứng chỉ IELTS", en: "Professionals needing IELTS certification" },
      { vi: "Người muốn định cư tại các nước nói tiếng Anh", en: "Immigration applicants" },
    ],
    duration: "5 tháng (20 tuần)", durationEn: "5 months (20 weeks)",
    color: "emerald",
  },
  toeic: {
    title: "Chương trình TOEIC", titleEn: "TOEIC Program",
    level: "Trung cấp", levelEn: "Intermediate",
    heroDesc: "Chương trình TOEIC chuyên sâu cho người đi làm và sinh viên muốn nâng cao năng lực tiếng Anh thương mại.",
    heroDescEn: "Intensive TOEIC program for professionals seeking to enhance business English proficiency.",
    features: [
      { vi: "Phân tích 7 dạng bài Part 1–7", en: "7 question types analysis (Part 1–7)" },
      { vi: "Từ vựng & ngữ pháp thương mại", en: "Business vocabulary & grammar" },
      { vi: "Luyện nghe đa accent", en: "Multi-accent listening practice" },
      { vi: "Thi thử tính giờ mỗi tuần", en: "Weekly timed mock tests" },
    ],
    curriculum: [
      { vi: "Tuần 1–3: Listening Part 1–4 chiến lược & luyện tập", en: "Weeks 1–3: Listening Part 1–4 strategies" },
      { vi: "Tuần 4–6: Reading Part 5–7 kỹ thuật đọc nhanh", en: "Weeks 4–6: Reading Part 5–7 speed reading" },
      { vi: "Tuần 7–9: Từ vựng thương mại theo chủ đề", en: "Weeks 7–9: Business vocabulary by topic" },
      { vi: "Tuần 10–12: Thi thử tổng hợp & phân tích lỗi", en: "Weeks 10–12: Full mock tests & error analysis" },
    ],
    audience: [
      { vi: "Nhân viên văn phòng cần nâng điểm TOEIC", en: "Office workers needing higher TOEIC scores" },
      { vi: "Sinh viên chuẩn bị xin việc tại công ty đa quốc gia", en: "Students preparing for multinational companies" },
    ],
    duration: "3 tháng (12 tuần)", durationEn: "3 months (12 weeks)",
    color: "blue",
  },
  conversational: {
    title: "Tiếng Anh Giao tiếp", titleEn: "Conversational English",
    level: "Tất cả trình độ", levelEn: "All Levels",
    heroDesc: "Khóa học giao tiếp thực tế giúp bạn tự tin nói tiếng Anh trong mọi tình huống: du lịch, công việc quốc tế.",
    heroDescEn: "Practical course helping you speak English confidently in any situation: travel, international work.",
    features: [
      { vi: "20+ chủ đề giao tiếp thực tế", en: "20+ real-world conversation topics" },
      { vi: "Luyện phát âm IPA với AI", en: "IPA pronunciation with AI feedback" },
      { vi: "Roleplay & thảo luận nhóm hàng tuần", en: "Weekly roleplay & group discussions" },
      { vi: "Idioms, phrasal verbs tự nhiên", en: "Natural idioms & phrasal verbs" },
    ],
    curriculum: [
      { vi: "Tháng 1: Giao tiếp hàng ngày – chào hỏi, mua sắm, nhà hàng", en: "Month 1: Daily life – greetings, shopping, dining" },
      { vi: "Tháng 2: Du lịch & Khách sạn – đặt phòng, hỏi đường, sân bay", en: "Month 2: Travel & Hotels – booking, directions, airports" },
      { vi: "Tháng 3: Công việc – phỏng vấn, email, thuyết trình", en: "Month 3: Work – interviews, emails, presentations" },
      { vi: "Tháng 4: Chủ đề nâng cao – tranh luận, tin tức, văn hóa", en: "Month 4: Advanced – debates, news, culture" },
    ],
    audience: [
      { vi: "Người muốn giao tiếp tiếng Anh tự tin", en: "Anyone wanting confident English communication" },
      { vi: "Người chuẩn bị đi du lịch hoặc làm việc nước ngoài", en: "People preparing for travel or working abroad" },
    ],
    duration: "4 tháng", durationEn: "4 months",
    color: "violet",
  },
  "national-exam": {
    title: "Luyện thi THPT Quốc gia", titleEn: "National High School Exam",
    level: "Lớp 10–12", levelEn: "Grade 10–12",
    heroDesc: "Chương trình ôn thi có hệ thống, bám sát cấu trúc đề thi THPT Quốc gia.",
    heroDescEn: "Systematic exam preparation aligned with the National High School Exam structure.",
    features: [
      { vi: "24 chuyên đề ngữ pháp trọng tâm", en: "24 core grammar topics" },
      { vi: "3000+ từ vựng SGK lớp 10–12", en: "3000+ textbook vocabulary" },
      { vi: "Luyện đề 50 câu / 60 phút", en: "Practice: 50 questions / 60 minutes" },
      { vi: "Phân tích đề thi các năm", en: "Past exam analysis" },
      { vi: "Chiến lược phân bổ thời gian", en: "Time management strategies" },
    ],
    curriculum: [
      { vi: "Tháng 1–2: Hệ thống hóa ngữ pháp 12 chuyên đề cốt lõi", en: "Months 1–2: Systematize 12 core grammar topics" },
      { vi: "Tháng 3–4: 12 chuyên đề nâng cao & từ vựng theo chủ đề", en: "Months 3–4: 12 advanced topics & thematic vocabulary" },
      { vi: "Tháng 5: Đọc hiểu chiến lược & luyện đề tổng hợp", en: "Month 5: Reading strategies & comprehensive practice" },
      { vi: "Tháng 6: Thi thử hàng tuần & chỉnh sửa điểm yếu", en: "Month 6: Weekly mocks & weakness correction" },
    ],
    audience: [
      { vi: "Học sinh lớp 10–12 chuẩn bị thi THPT", en: "Grade 10–12 students preparing for the national exam" },
      { vi: "Phụ huynh muốn con đạt điểm cao môn Tiếng Anh", en: "Parents wanting high English scores for their children" },
    ],
    duration: "6 tháng", durationEn: "6 months",
    color: "amber",
  },
};

const EnglishCourse = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const course = courseData[courseId || ""];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 container mx-auto px-6 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy chương trình.", "Course not found.")}</p>
          <Link to="/english" className="text-primary hover:underline mt-4 inline-block">{t("Quay lại", "Go back")}</Link>
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
            {/* Breadcrumb */}
            <Link to="/english" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> {t("Chương trình Tiếng Anh", "English Programs")}
            </Link>

            {/* Hero */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">{t(course.level, course.levelEn)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{t(course.title, course.titleEn)}</h1>
              <p className="text-muted-foreground leading-relaxed">{t(course.heroDesc, course.heroDescEn)}</p>
              <div className="mt-4 text-sm text-muted-foreground">
                ⏱️ {t("Thời lượng", "Duration")}: <span className="font-semibold text-foreground">{t(course.duration, course.durationEn)}</span>
              </div>
            </div>

            {/* Features */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">✨ {t("Điểm nổi bật", "Highlights")}</h2>
              <ul className="space-y-3">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{t(f.vi, f.en)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">📋 {t("Giáo án & Lộ trình", "Curriculum & Roadmap")}</h2>
              <div className="space-y-4">
                {course.curriculum.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-secondary-foreground pt-1">{t(c.vi, c.en)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">🎯 {t("Đối tượng phù hợp", "Who is this for?")}</h2>
              <ul className="space-y-2">
                {course.audience.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary-foreground">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    {t(a.vi, a.en)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / Register */}
            <div className="glass-card rounded-2xl p-8 border-2 border-primary/20">
              <h2 className="text-xl font-display font-bold text-foreground mb-2">📞 {t("Đăng ký học ngay", "Register Now")}</h2>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Liên hệ thầy Hải để được tư vấn chi tiết và đăng ký khóa học phù hợp nhất.",
                  "Contact Teacher Hai for detailed consultation and register for the best-fit course."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="tel:0962823800" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                  <Phone className="w-5 h-5" /> 0962.823.800
                </a>
                <a href="https://zalo.me/0962823800" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                  <MessageCircle className="w-5 h-5" /> Zalo: 0962.823.800
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Hoặc để lại thông tin trong mục ",
                  "Or leave your information in the "
                )}
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

export default EnglishCourse;
