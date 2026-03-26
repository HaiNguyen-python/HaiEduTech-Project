import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages, CheckCircle, ArrowLeft, Phone, MessageCircle, ArrowRight, Star, Users, Clock, Award, GraduationCap } from "lucide-react";
import { allChineseModules } from "@/data/languageCurriculum";
import { cn } from "@/lib/utils";

import chineseImg from "@/assets/course-chinese.jpg";

const courseData: Record<string, {
  title: string; titleEn: string; level: string; levelEn: string;
  heroDesc: string; heroDescEn: string;
  stats: { label: string; labelEn: string; value: string }[];
  features: { vi: string; en: string }[];
  curriculum: { vi: string; en: string; detail?: string; detailEn?: string }[];
  audience: { vi: string; en: string }[];
  testimonials: { name: string; text: string; textEn: string }[];
  duration: string; durationEn: string;
}> = {
  foundation: {
    title: "Tiếng Trung Nền tảng", titleEn: "Foundation Chinese",
    level: "Mới bắt đầu", levelEn: "Beginner",
    heroDesc: "Từ con số 0 đến giao tiếp cơ bản trong 5 tháng! Khóa học xây dựng nền tảng vững chắc từ Pinyin, thanh điệu đến 300+ chữ Hán thiết yếu — giúp bạn tự tin chào hỏi, mua sắm và hỏi đường bằng tiếng Trung.",
    heroDescEn: "From zero to basic communication in 5 months! Build a solid foundation from Pinyin, tones to 300+ essential characters — confidently greet, shop and ask directions in Chinese.",
    stats: [
      { label: "Chữ Hán cơ bản", labelEn: "Basic characters", value: "300+" },
      { label: "Mẫu hội thoại", labelEn: "Dialogue patterns", value: "50+" },
      { label: "Thời lượng", labelEn: "Duration", value: "Linh hoạt" },
      { label: "Chuẩn bị cho", labelEn: "Prepares for", value: "HSK 1" },
    ],
    features: [
      { vi: "Hệ thống Pinyin & 4 thanh điệu chuẩn xác với luyện tập audio hàng ngày", en: "Pinyin system & 4 tones with daily audio practice drills" },
      { vi: "300+ chữ Hán thiết yếu — ghi nhớ qua phương pháp bộ thủ & liên tưởng", en: "300+ essential characters — memorized through radical & mnemonic methods" },
      { vi: "50+ mẫu hội thoại thực tế: chào hỏi, mua sắm, ăn uống, hỏi đường", en: "50+ real-world dialogues: greetings, shopping, dining, asking directions" },
      { vi: "Bài tập viết chữ Hán theo nét & thứ tự nét chuẩn", en: "Character writing with correct stroke order" },
      { vi: "Văn hóa Trung Quốc: phong tục, lễ hội, ứng xử — hiểu để giao tiếp tốt hơn", en: "Chinese culture: customs, festivals, etiquette — understand to communicate better" },
    ],
    curriculum: [
      { vi: "Tháng 1: Pinyin, thanh điệu & 50 chữ Hán đầu tiên", en: "Month 1: Pinyin, tones & first 50 characters", detail: "Luyện phát âm hàng ngày • Flashcard 每日练习", detailEn: "Daily pronunciation drills • Flashcard 每日练习" },
      { vi: "Tháng 2: Chào hỏi, giới thiệu bản thân, số đếm & thời gian", en: "Month 2: Greetings, self-introduction, numbers & time", detail: "你好、我叫...、几点了？• Roleplay tình huống", detailEn: "你好、我叫...、几点了？• Situational roleplay" },
      { vi: "Tháng 3: Mua sắm, ăn uống, hỏi đường — giao tiếp du lịch", en: "Month 3: Shopping, dining, directions — travel communication", detail: "多少钱？在哪里？• Thực hành tại nhà hàng Trung", detailEn: "多少钱？在哪里？• Practice at Chinese restaurants" },
      { vi: "Tháng 4: Ngữ pháp cơ bản & viết câu đơn hoàn chỉnh", en: "Month 4: Basic grammar & complete simple sentences", detail: "的/了/过 • Cấu trúc câu Chủ-Vị-Tân", detailEn: "的/了/过 • SVO sentence structure" },
      { vi: "Tháng 5: Ôn tập tổng hợp & chuẩn bị thi HSK 1", en: "Month 5: Comprehensive review & HSK 1 preparation", detail: "Mock test HSK 1 • Đánh giá đầu ra", detailEn: "HSK 1 mock test • Output assessment" },
    ],
    audience: [
      { vi: "Người hoàn toàn mới — chưa biết gì về tiếng Trung", en: "Complete beginners — zero Chinese knowledge" },
      { vi: "Người chuẩn bị du lịch hoặc làm việc tại Trung Quốc/Đài Loan", en: "People planning to travel or work in China/Taiwan" },
      { vi: "Sinh viên muốn bắt đầu học tiếng Trung một cách bài bản", en: "Students wanting to start Chinese systematically" },
    ],
    testimonials: [
      { name: "Bạn Phương Linh (Sinh viên)", text: "Mình từ không biết chữ nào đến nói được cả đoạn hội thoại sau 3 tháng. Phương pháp bộ thủ giúp nhớ chữ Hán cực nhanh!", textEn: "From knowing zero characters to speaking full dialogues in 3 months. The radical method makes memorizing characters super fast!" },
      { name: "Chị Thu Hà (Nhân viên văn phòng)", text: "Học tiếng Trung ở đây rất vui, không bị áp lực. Sau 4 tháng mình đã tự tin chào hỏi và mua sắm khi đi Trung Quốc!", textEn: "Learning Chinese here is fun, no pressure. After 4 months I could confidently greet and shop during my China trip!" },
      { name: "Em Minh Đức (Học sinh lớp 10)", text: "Mình thích cách học qua flashcard và liên tưởng bộ thủ. Nhớ chữ Hán nhanh mà không chán!", textEn: "I love learning through flashcards and radical associations. Memorizing characters is fast and not boring!" },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
  },
  hsk: {
    title: "Luyện thi HSK", titleEn: "HSK Preparation",
    level: "HSK 1–6", levelEn: "HSK 1–6",
    heroDesc: "Chinh phục kỳ thi năng lực Hán ngữ quốc tế HSK — từ HSK 1 (150 từ) đến HSK 6 (5000+ từ). Lộ trình rõ ràng, kho đề thi phong phú và phương pháp ghi nhớ từ vựng khoa học giúp bạn đạt chứng chỉ chắc chắn.",
    heroDescEn: "Conquer the international HSK Chinese proficiency exam — from HSK 1 (150 words) to HSK 6 (5000+ words). Clear roadmap, extensive test banks and scientific vocabulary methods for guaranteed certification.",
    stats: [
      { label: "Từ vựng HSK 6", labelEn: "HSK 6 vocabulary", value: "5000+" },
      { label: "Đề thi luyện tập", labelEn: "Practice tests", value: "200+" },
      { label: "Tỷ lệ đạt", labelEn: "Pass rate", value: "90%" },
      { label: "Cấp độ", labelEn: "Levels", value: "HSK 1-6" },
    ],
    features: [
      { vi: "Từ vựng & ngữ pháp phân loại theo HSK 1–6 (150 → 5000+ từ)", en: "Vocabulary & grammar classified by HSK 1–6 (150 → 5000+ words)" },
      { vi: "Luyện đọc hiểu với bài đọc theo chủ đề & cấp độ tăng dần", en: "Reading comprehension with graded topic-based passages" },
      { vi: "Luyện nghe với tốc độ nói tự nhiên của người Trung Quốc bản xứ", en: "Listening practice at native Chinese speaker speed" },
      { vi: "Thi thử mô phỏng đề HSK thực tế + chấm điểm & phân tích chi tiết", en: "Mock tests simulating real HSK + detailed scoring & analysis" },
      { vi: "Flashcard, Spaced Repetition & mẹo liên tưởng để ghi nhớ chữ Hán lâu dài", en: "Flashcards, Spaced Repetition & mnemonics for long-term character retention" },
    ],
    curriculum: [
      { vi: "HSK 1: 150 từ vựng, ngữ pháp cơ bản", en: "HSK 1: 150 words, basic grammar", detail: "2 tháng • 你好、谢谢、再见", detailEn: "2 months • 你好、谢谢、再见" },
      { vi: "HSK 2: 300 từ vựng, hội thoại mở rộng", en: "HSK 2: 300 words, extended dialogues", detail: "2 tháng • Miêu tả, so sánh, thời gian", detailEn: "2 months • Description, comparison, time" },
      { vi: "HSK 3: 600 từ, đọc hiểu & viết đoạn văn", en: "HSK 3: 600 words, reading & paragraphs", detail: "3 tháng • Bài đọc 200-300 chữ • Viết thư/email", detailEn: "3 months • 200-300 character passages • Letters/emails" },
      { vi: "HSK 4: 1200 từ, giao tiếp nâng cao & chủ đề xã hội", en: "HSK 4: 1200 words, advanced communication", detail: "3 tháng • Thảo luận kinh tế, văn hóa, giáo dục", detailEn: "3 months • Discuss economics, culture, education" },
      { vi: "HSK 5–6: 2500–5000+ từ, đọc báo & viết luận học thuật", en: "HSK 5–6: 2500–5000+ words, news reading & academic writing", detail: "6 tháng • Đọc 人民日报 • Viết văn nghị luận", detailEn: "6 months • Read 人民日报 • Argumentative essays" },
    ],
    audience: [
      { vi: "Người cần chứng chỉ HSK cho du học hoặc làm việc tại Trung Quốc", en: "Those needing HSK for study/work in China" },
      { vi: "Sinh viên ngành Ngôn ngữ Trung hoặc Kinh doanh Quốc tế", en: "Chinese language or International Business students" },
    ],
    testimonials: [
      { name: "Anh Quốc Bảo (Kỹ sư phần mềm)", text: "Đạt HSK 4 chỉ sau 8 tháng nhờ phương pháp Spaced Repetition. Đề thi mô phỏng rất sát thực tế!", textEn: "Passed HSK 4 in just 8 months thanks to Spaced Repetition. Mock tests were very close to the real exam!" },
      { name: "Chị Ngọc Trâm (Sinh viên Thương mại)", text: "Mình cần HSK 3 để xin học bổng du học và đã đạt được điểm cao nhờ lộ trình rõ ràng tại đây.", textEn: "I needed HSK 3 for a scholarship application and scored high thanks to the clear roadmap here." },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
  },
  conversational: {
    title: "Tiếng Trung Giao tiếp", titleEn: "Conversational Chinese",
    level: "Tất cả trình độ", levelEn: "All Levels",
    heroDesc: "Nói tiếng Trung tự tin trong 4 tháng! Khóa học tập trung vào nói và nghe trong tình huống thực tế — du lịch, kinh doanh với đối tác Trung Quốc, và cuộc sống hàng ngày.",
    heroDescEn: "Speak Chinese confidently in 4 months! Focused on speaking and listening in real situations — travel, business with Chinese partners, and daily life.",
    stats: [
      { label: "Chủ đề giao tiếp", labelEn: "Conversation topics", value: "30+" },
      { label: "Thời lượng", labelEn: "Duration", value: "4 tháng" },
      { label: "Phương pháp", labelEn: "Method", value: "Immersion" },
      { label: "Trình độ", labelEn: "Level", value: "Mọi cấp" },
    ],
    features: [
      { vi: "30+ chủ đề giao tiếp: du lịch, nhà hàng, công việc, y tế, ngân hàng", en: "30+ topics: travel, restaurants, work, healthcare, banking" },
      { vi: "Luyện phát âm chuẩn với recording của người bản xứ", en: "Pronunciation with native speaker recordings" },
      { vi: "Roleplay tình huống thực tế & thảo luận nhóm hàng tuần", en: "Real-world roleplay & weekly group discussions" },
      { vi: "Phân biệt giản thể vs phồn thể (Đại lục vs Đài Loan)", en: "Simplified vs Traditional Chinese (Mainland vs Taiwan)" },
      { vi: "Slang, thành ngữ & cách nói tự nhiên trong đời sống hàng ngày", en: "Slang, idioms & natural daily expressions" },
    ],
    curriculum: [
      { vi: "Tháng 1: Giao tiếp cơ bản — chào hỏi, giới thiệu, mua sắm", en: "Month 1: Basic — greetings, introductions, shopping", detail: "请问...、我要买...、多少钱？", detailEn: "请问...、我要买...、多少钱？" },
      { vi: "Tháng 2: Du lịch — khách sạn, nhà hàng, phương tiện giao thông", en: "Month 2: Travel — hotels, restaurants, transportation", detail: "我要订房、菜单在哪里？、坐出租车", detailEn: "我要订房、菜单在哪里？、坐出租车" },
      { vi: "Tháng 3: Công việc — phỏng vấn, họp, email bằng tiếng Trung", en: "Month 3: Work — interviews, meetings, emails in Chinese", detail: "Business Chinese • 商务邮件 • 面试技巧", detailEn: "Business Chinese • 商务邮件 • Interview skills" },
      { vi: "Tháng 4: Nâng cao — tranh luận, văn hóa, tin tức & chủ đề xã hội", en: "Month 4: Advanced — debates, culture, news & social topics", detail: "Xem tin tức CCTV • Thảo luận thành ngữ", detailEn: "Watch CCTV news • Discuss idioms" },
    ],
    audience: [
      { vi: "Bất kỳ ai muốn giao tiếp tiếng Trung tự tin và tự nhiên", en: "Anyone wanting confident, natural Chinese communication" },
      { vi: "Doanh nhân làm việc với đối tác Trung Quốc/Đài Loan", en: "Business people working with Chinese/Taiwanese partners" },
      { vi: "Người chuẩn bị sống, làm việc tại Trung Quốc hoặc Đài Loan", en: "People planning to live/work in China or Taiwan" },
    ],
    testimonials: [
      { name: "Anh Đức Minh (Doanh nhân)", text: "Sau 3 tháng mình đã tự tin đàm phán với đối tác Trung Quốc mà không cần phiên dịch. Cách dạy thực tế, không lý thuyết suông!", textEn: "After 3 months I could confidently negotiate with Chinese partners without an interpreter. Practical teaching, not just theory!" },
      { name: "Chị Kim Anh (Quản lý xuất nhập khẩu)", text: "Roleplay tình huống kinh doanh rất hữu ích. Giờ mình gọi điện cho đối tác Đài Loan bằng tiếng Trung luôn!", textEn: "Business roleplay was incredibly useful. Now I call my Taiwanese partners in Chinese!" },
      { name: "Bạn Hải Yến (Du học sinh)", text: "Phần slang và thành ngữ giúp mình hòa nhập nhanh khi qua Trung Quốc. Bạn bè bản xứ khen nói tự nhiên!", textEn: "The slang and idioms section helped me integrate quickly in China. Native friends compliment my natural speech!" },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
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

            {/* Hero with image */}
            <div className="glass-card rounded-2xl overflow-hidden mb-8">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img src={chineseImg} alt={t(course.title, course.titleEn)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="w-5 h-5 text-white" />
                    <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-semibold backdrop-blur-sm">{t(course.level, course.levelEn)}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-white">{t(course.title, course.titleEn)}</h1>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed">{t(course.heroDesc, course.heroDescEn)}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {course.stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-500 mb-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{t(s.label, s.labelEn)}</p>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> {t("Điểm nổi bật", "Highlights")}
              </h2>
              <ul className="space-y-3">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary-foreground">
                    <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{t(f.vi, f.en)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" /> {t("Giáo án & Lộ trình", "Curriculum & Roadmap")}
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-red-500">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-secondary-foreground font-medium">{t(c.vi, c.en)}</p>
                      {c.detail && <p className="text-xs text-muted-foreground mt-1">{t(c.detail, c.detailEn || c.detail)}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" /> {t("Đối tượng phù hợp", "Who is this for?")}
              </h2>
              <ul className="space-y-2">
                {course.audience.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary-foreground">
                    <ArrowRight className="w-4 h-4 text-red-500 shrink-0" />
                    {t(a.vi, a.en)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials */}
            {course.testimonials && course.testimonials.length > 0 && (
              <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <Award className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-display font-bold text-foreground">{t("Học viên nói gì?", "What students say")}</h2>
                </div>
                <div className="space-y-4">
                  {course.testimonials.map((tm, i) => (
                    <div key={i} className="border-l-4 border-red-500/20 pl-4 py-2">
                      <p className="text-secondary-foreground italic leading-relaxed mb-2">"{t(tm.text, tm.textEn)}"</p>
                      <p className="text-sm text-red-500 font-semibold">— {tm.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="glass-card rounded-2xl p-6 md:p-8 border-2 border-red-500/20">
              <h2 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-500" /> {t("Đăng ký học ngay", "Register Now")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("Liên hệ thầy Hải để được tư vấn chi tiết và đăng ký khóa học phù hợp.", "Contact Teacher Hai for consultation and registration.")}
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
