import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, CheckCircle, ArrowLeft, Phone, MessageCircle, ArrowRight, Star, Users, Clock, Award } from "lucide-react";

import cambridgeImg from "@/assets/course-cambridge.jpg";
import ieltsImg from "@/assets/course-ielts.jpg";
import toeicImg from "@/assets/course-toeic.jpg";
import conversationImg from "@/assets/course-conversation.jpg";
import nationalExamImg from "@/assets/course-national-exam.jpg";

const courseData: Record<string, {
  title: string; titleEn: string; level: string; levelEn: string;
  heroDesc: string; heroDescEn: string;
  image: string;
  stats: { label: string; labelEn: string; value: string }[];
  features: { vi: string; en: string }[];
  curriculum: { vi: string; en: string; detail?: string; detailEn?: string }[];
  audience: { vi: string; en: string }[];
  testimonials: { name: string; text: string; textEn: string }[];
  duration: string; durationEn: string;
  color: string;
}> = {
  cambridge: {
    title: "Cambridge Starters–PET", titleEn: "Cambridge Starters–PET",
    level: "Mới bắt đầu → Trung cấp", levelEn: "Beginner → Intermediate",
    image: cambridgeImg,
    heroDesc: "Chương trình tiếng Anh chuẩn quốc tế dành cho trẻ em từ 6–14 tuổi. Lộ trình 5 cấp độ được thiết kế theo khung Cambridge Assessment — trẻ vừa học vừa chơi, vừa thi lấy chứng chỉ quốc tế được công nhận toàn cầu.",
    heroDescEn: "International-standard English for children aged 6–14. A 5-level pathway built on the Cambridge Assessment framework — children learn through play while earning globally recognized certificates.",
    stats: [
      { label: "Học sinh đã tốt nghiệp", labelEn: "Graduates", value: "200+" },
      { label: "Tỷ lệ đạt chứng chỉ", labelEn: "Pass rate", value: "95%" },
      { label: "Sĩ số lớp tối đa", labelEn: "Max class size", value: "8" },
      { label: "Thời lượng", labelEn: "Duration", value: "Linh hoạt" },
    ],
    features: [
      { vi: "Lộ trình Starters → Movers → Flyers → KET → PET rõ ràng từng bước", en: "Clear Starters → Movers → Flyers → KET → PET progression" },
      { vi: "Học qua trò chơi, bài hát, dự án sáng tạo — trẻ yêu thích việc học", en: "Learning through games, songs, creative projects — children love learning" },
      { vi: "Đánh giá định kỳ mỗi 4 tuần & báo cáo chi tiết cho phụ huynh", en: "Assessments every 4 weeks & detailed parent reports" },
      { vi: "Giáo viên có chứng chỉ quốc tế, nhiệt huyết với trẻ em", en: "Internationally certified teachers, passionate about children" },
      { vi: "Tài liệu Cambridge chính hãng kết hợp công nghệ AI", en: "Authentic Cambridge materials combined with AI technology" },
    ],
    curriculum: [
      { vi: "Giai đoạn 1: Starters – Nghe nói cơ bản qua bài hát & trò chơi", en: "Phase 1: Starters – Basic listening & speaking through songs & games", detail: "3 tháng • Từ vựng: 200 từ • Chủ đề: Gia đình, động vật, màu sắc", detailEn: "3 months • Vocabulary: 200 words • Topics: Family, animals, colors" },
      { vi: "Giai đoạn 2: Movers – Đọc hiểu & viết câu đơn", en: "Phase 2: Movers – Reading comprehension & simple writing", detail: "3 tháng • Từ vựng: 400 từ • Bắt đầu đọc truyện ngắn", detailEn: "3 months • Vocabulary: 400 words • Start reading short stories" },
      { vi: "Giai đoạn 3: Flyers – Giao tiếp tự tin & viết đoạn văn", en: "Phase 3: Flyers – Confident communication & paragraph writing", detail: "4 tháng • Từ vựng: 600 từ • Thuyết trình mini projects", detailEn: "4 months • Vocabulary: 600 words • Mini project presentations" },
      { vi: "Giai đoạn 4: KET – Ngữ pháp nền tảng & kỹ năng thi chuẩn", en: "Phase 4: KET – Foundation grammar & standardized exam skills", detail: "4 tháng • Grammar hệ thống • Mock test hàng tháng", detailEn: "4 months • Systematic grammar • Monthly mock tests" },
      { vi: "Giai đoạn 5: PET – Trung cấp & luyện thi chứng chỉ", en: "Phase 5: PET – Intermediate & certificate preparation", detail: "4 tháng • Thi thử mô phỏng thực tế • Đảm bảo đầu ra", detailEn: "4 months • Realistic mock exams • Guaranteed outcomes" },
    ],
    audience: [
      { vi: "Trẻ em từ 6–14 tuổi muốn xây dựng nền tảng tiếng Anh vững chắc", en: "Children 6–14 wanting a solid English foundation" },
      { vi: "Phụ huynh muốn con sở hữu chứng chỉ quốc tế Cambridge", en: "Parents wanting Cambridge international certificates for their children" },
      { vi: "Học sinh chuẩn bị du học hoặc thi vào trường quốc tế", en: "Students preparing for study abroad or international schools" },
    ],
    testimonials: [
      { name: "Chị Minh Tâm (Phụ huynh)", text: "Con tôi từ sợ tiếng Anh đến yêu thích sau 3 tháng học tại HaiEdu. Giáo viên rất tâm huyết và cách dạy rất sinh động!", textEn: "My child went from fearing English to loving it after 3 months at HaiEdu. The teachers are dedicated and the teaching method is very engaging!" },
      { name: "Anh Khoa (Phụ huynh)", text: "Bé nhà mình đạt Movers 5 shields sau đúng 6 tháng. Lớp nhỏ nên thầy cô chăm sóc từng bé rất kỹ.", textEn: "My child got 5 shields in Movers after exactly 6 months. Small class sizes mean teachers care for each child individually." },
      { name: "Chị Hương Giang (Phụ huynh)", text: "Phương pháp học qua trò chơi khiến con mình háo hức đi học mỗi ngày. Tiến bộ rõ rệt!", textEn: "The game-based method makes my child excited to attend class every day. Clear progress!" },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
    color: "sky",
  },
  ielts: {
    title: "Luyện thi IELTS", titleEn: "IELTS Preparation",
    level: "Trung cấp → Nâng cao", levelEn: "Intermediate → Advanced",
    image: ieltsImg,
    heroDesc: "Khóa luyện thi IELTS toàn diện với mục tiêu band 6.5–8.0+. Kết hợp phương pháp giảng dạy truyền thống với công nghệ AI chấm điểm Writing & Speaking — giúp học viên nhận phản hồi chi tiết theo tiêu chí IELTS chính thức và cải thiện nhanh gấp 3 lần.",
    heroDescEn: "Comprehensive IELTS prep targeting band 6.5–8.0+. Combines traditional teaching with AI-powered Writing & Speaking grading — delivering detailed feedback per official IELTS criteria for 3x faster improvement.",
    stats: [
      { label: "Điểm trung bình đầu ra", labelEn: "Average output score", value: "7.0+" },
      { label: "Học viên đạt target", labelEn: "Students hitting target", value: "92%" },
      { label: "Bài mẫu Writing", labelEn: "Writing samples", value: "1000+" },
      { label: "Thời lượng", labelEn: "Duration", value: "Linh hoạt" },
    ],
    features: [
      { vi: "Chiến lược riêng cho từng phần: Listening, Reading, Writing, Speaking", en: "Dedicated strategies for each skill: Listening, Reading, Writing, Speaking" },
      { vi: "AI chấm & phân tích bài Writing Task 1 & Task 2 theo 4 tiêu chí IELTS", en: "AI grading of Writing Task 1 & 2 across 4 IELTS criteria" },
      { vi: "AI đánh giá Speaking: phát âm, ngữ pháp, từ vựng, lưu loát", en: "AI Speaking evaluation: pronunciation, grammar, vocabulary, fluency" },
      { vi: "Thi thử mô phỏng thực tế hàng tuần — phân tích điểm mạnh/yếu chi tiết", en: "Weekly mock tests — detailed strength/weakness analysis" },
      { vi: "Kho 1000+ bài mẫu Writing band 6.5–8.5 & Speaking topics kèm model answers", en: "1000+ Writing samples (band 6.5–8.5) & Speaking topics with model answers" },
    ],
    curriculum: [
      { vi: "Tuần 1–4: Đánh giá trình độ & xây dựng nền tảng 4 kỹ năng", en: "Weeks 1–4: Level assessment & building foundation in 4 skills", detail: "Diagnostic test • Lập lộ trình cá nhân hóa", detailEn: "Diagnostic test • Personalized roadmap" },
      { vi: "Tuần 5–8: Listening & Reading — Chiến lược & luyện đề chuyên sâu", en: "Weeks 5–8: Listening & Reading — Intensive strategies & practice", detail: "Skimming/Scanning • Signal words • Paraphrasing skills", detailEn: "Skimming/Scanning • Signal words • Paraphrasing skills" },
      { vi: "Tuần 9–12: Writing Task 1 & 2 — Cấu trúc bài, từ vựng & AI Feedback", en: "Weeks 9–12: Writing Task 1 & 2 — Structure, vocabulary & AI Feedback", detail: "Cohesion & Coherence • Task Achievement • Lexical Resource", detailEn: "Cohesion & Coherence • Task Achievement • Lexical Resource" },
      { vi: "Tuần 13–16: Speaking — Phát âm, trả lời Part 1-2-3 & phản xạ tự nhiên", en: "Weeks 13–16: Speaking — Pronunciation, Part 1-2-3 responses & fluency", detail: "Cue card strategies • Topic development • Idea generation", detailEn: "Cue card strategies • Topic development • Idea generation" },
      { vi: "Tuần 17–20: Thi thử tổng hợp & tập trung chỉnh sửa điểm yếu", en: "Weeks 17–20: Full mock tests & targeted weakness correction", detail: "3 bài thi thử hoàn chỉnh • 1-on-1 feedback sessions", detailEn: "3 complete mock tests • 1-on-1 feedback sessions" },
    ],
    audience: [
      { vi: "Sinh viên chuẩn bị du học Úc, Canada, Anh, Mỹ", en: "Students preparing to study in Australia, Canada, UK, USA" },
      { vi: "Người đi làm cần chứng chỉ IELTS cho thăng tiến hoặc di cư", en: "Professionals needing IELTS for career advancement or immigration" },
      { vi: "Người đã thi IELTS nhưng chưa đạt band mục tiêu", en: "Those who've taken IELTS but haven't reached their target band" },
    ],
    testimonials: [
      { name: "Anh Tuấn Anh (Kỹ sư IT)", text: "Từ 5.5 lên 7.5 chỉ sau 4 tháng. AI chấm Writing giúp mình hiểu rõ lỗi sai và cải thiện cực nhanh!", textEn: "From 5.5 to 7.5 in just 4 months. AI Writing grading helped me understand my mistakes and improve incredibly fast!" },
      { name: "Chị Thanh Hà (Giảng viên ĐH)", text: "Lần đầu thi IELTS đạt ngay 7.0 nhờ phương pháp luyện thi rất bài bản. Đặc biệt phần Writing được hướng dẫn cực kỹ.", textEn: "Got 7.0 on my first IELTS attempt thanks to the systematic method. Writing guidance was exceptionally thorough." },
      { name: "Bạn Minh Quân (Sinh viên năm 4)", text: "Mình cần IELTS 6.5 để nộp hồ sơ du học và đã đạt được 7.0 sau 3 tháng học tại đây!", textEn: "I needed IELTS 6.5 for study abroad applications and achieved 7.0 after just 3 months here!" },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
    color: "emerald",
  },
  toeic: {
    title: "Chương trình TOEIC", titleEn: "TOEIC Program",
    level: "Trung cấp", levelEn: "Intermediate",
    image: toeicImg,
    heroDesc: "Chương trình TOEIC chuyên sâu dành cho người đi làm và sinh viên. Tập trung vào kỹ năng Nghe & Đọc trong bối cảnh doanh nghiệp thực tế — giúp bạn đạt 700+ điểm chỉ sau 3 tháng.",
    heroDescEn: "Intensive TOEIC program for professionals and students. Focused on Listening & Reading in real business contexts — reach 700+ in just 3 months.",
    stats: [
      { label: "Mục tiêu điểm", labelEn: "Target score", value: "700+" },
      { label: "Thời lượng", labelEn: "Duration", value: "Linh hoạt" },
      { label: "Đề luyện tập", labelEn: "Practice tests", value: "50+" },
      { label: "Từ vựng thương mại", labelEn: "Business vocab", value: "2000+" },
    ],
    features: [
      { vi: "Phân tích chi tiết 7 dạng bài Part 1–7 với chiến thuật riêng", en: "Detailed 7 question type analysis (Part 1–7) with specific tactics" },
      { vi: "Từ vựng & ngữ pháp thương mại: email, hợp đồng, báo cáo, họp", en: "Business vocabulary & grammar: emails, contracts, reports, meetings" },
      { vi: "Luyện nghe với accent Mỹ, Anh, Úc, Canada — đa dạng giọng nói", en: "Multi-accent listening: American, British, Australian, Canadian" },
      { vi: "Thi thử tính giờ mỗi tuần + phân tích lỗi sai chi tiết từng part", en: "Weekly timed mocks + detailed error analysis per part" },
    ],
    curriculum: [
      { vi: "Tuần 1–3: Listening Part 1–4 — chiến lược & luyện tập chuyên sâu", en: "Weeks 1–3: Listening Part 1–4 — strategies & intensive practice", detail: "Photographs • Q&A • Conversations • Short talks", detailEn: "Photographs • Q&A • Conversations • Short talks" },
      { vi: "Tuần 4–6: Reading Part 5–7 — kỹ thuật đọc nhanh & chính xác", en: "Weeks 4–6: Reading Part 5–7 — speed reading & accuracy techniques", detail: "Incomplete sentences • Text completion • Reading comprehension", detailEn: "Incomplete sentences • Text completion • Reading comprehension" },
      { vi: "Tuần 7–9: Từ vựng thương mại theo 20 chủ đề thực tế", en: "Weeks 7–9: Business vocabulary across 20 real-world topics", detail: "Marketing • Finance • HR • Manufacturing • Technology", detailEn: "Marketing • Finance • HR • Manufacturing • Technology" },
      { vi: "Tuần 10–12: Thi thử tổng hợp & tăng tốc độ làm bài", en: "Weeks 10–12: Full mock tests & speed optimization", detail: "200 câu / 120 phút • Chiến thuật quản lý thời gian", detailEn: "200 questions / 120 minutes • Time management tactics" },
    ],
    audience: [
      { vi: "Nhân viên văn phòng cần nâng điểm TOEIC để thăng tiến", en: "Office workers needing higher TOEIC for promotions" },
      { vi: "Sinh viên chuẩn bị xin việc tại các công ty đa quốc gia", en: "Students preparing for multinational company applications" },
    ],
    testimonials: [
      { name: "Anh Bình (Nhân viên logistics)", text: "Từ 450 lên 780 điểm TOEIC sau 10 tuần. Chiến thuật làm bài Part 5, 7 rất hiệu quả!", textEn: "From 450 to 780 TOEIC in 10 weeks. Part 5 and 7 strategies were super effective!" },
      { name: "Chị Ngọc Ánh (Sales Manager)", text: "Đạt 850 TOEIC để đủ điều kiện thăng chức. Phần Listening nghe quen accent nên thi thật rất tự tin.", textEn: "Got 850 TOEIC to qualify for promotion. The multi-accent listening practice made me confident in the real test." },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
    color: "blue",
  },
  conversational: {
    title: "Tiếng Anh Giao tiếp", titleEn: "Conversational English",
    level: "Tất cả trình độ", levelEn: "All Levels",
    image: conversationImg,
    heroDesc: "Nói tiếng Anh tự tin trong 4 tháng — không cần học ngữ pháp khô khan! Khóa học giao tiếp thực tế giúp bạn tự tin trong mọi tình huống: du lịch, phỏng vấn, công việc quốc tế.",
    heroDescEn: "Speak English confidently in 4 months — no dry grammar drills! Practical communication course for travel, interviews, and international work.",
    stats: [
      { label: "Chủ đề giao tiếp", labelEn: "Conversation topics", value: "20+" },
      { label: "Thời lượng", labelEn: "Duration", value: "Linh hoạt" },
      { label: "Phương pháp", labelEn: "Method", value: "Roleplay" },
      { label: "Trình độ", labelEn: "Level", value: "Mọi cấp" },
    ],
    features: [
      { vi: "20+ chủ đề giao tiếp thực tế: mua sắm, du lịch, phỏng vấn, thuyết trình", en: "20+ topics: shopping, travel, interviews, presentations" },
      { vi: "Luyện phát âm chuẩn IPA với phản hồi chi tiết bằng AI", en: "IPA pronunciation training with detailed AI feedback" },
      { vi: "Roleplay mỗi buổi học — nói nhiều hơn nghe giảng", en: "Roleplay every session — speak more than lecture" },
      { vi: "Idioms, phrasal verbs tự nhiên như người bản xứ", en: "Natural idioms & phrasal verbs like a native speaker" },
    ],
    curriculum: [
      { vi: "Tháng 1: Giao tiếp hàng ngày — chào hỏi, mua sắm, nhà hàng", en: "Month 1: Daily life — greetings, shopping, dining" },
      { vi: "Tháng 2: Du lịch & Khách sạn — đặt phòng, hỏi đường, sân bay", en: "Month 2: Travel — booking, directions, airports" },
      { vi: "Tháng 3: Công việc — phỏng vấn, email, thuyết trình bằng tiếng Anh", en: "Month 3: Work — interviews, emails, presentations" },
      { vi: "Tháng 4: Nâng cao — tranh luận, tin tức, văn hóa & sự kiện", en: "Month 4: Advanced — debates, news, culture & events" },
    ],
    audience: [
      { vi: "Bất kỳ ai muốn nói tiếng Anh tự tin và tự nhiên", en: "Anyone wanting to speak English confidently and naturally" },
      { vi: "Người chuẩn bị đi du lịch hoặc làm việc nước ngoài", en: "People preparing for travel or working abroad" },
    ],
    testimonials: [
      { name: "Chị Hạnh (Nhân viên marketing)", text: "Sau 2 tháng mình đã tự tin present bằng tiếng Anh trước team quốc tế. Cách học roleplay rất thực tế!", textEn: "After 2 months I could confidently present in English to my international team. The roleplay method is very practical!" },
      { name: "Anh Phước (Hướng dẫn viên du lịch)", text: "Từ ngại nói chuyện với khách nước ngoài đến dẫn tour bằng tiếng Anh tự tin. Idioms thực tế giúp mình nói tự nhiên hơn nhiều!", textEn: "From being shy with foreign tourists to confidently leading English tours. Real-world idioms made my speech much more natural!" },
    ],
    duration: "Thời gian học linh hoạt", durationEn: "Flexible schedule",
    color: "violet",
  },
  "national-exam": {
    title: "Luyện thi THPT Quốc gia", titleEn: "National High School Exam",
    level: "Lớp 10–12", levelEn: "Grade 10–12",
    image: nationalExamImg,
    heroDesc: "Ôn thi THPT Quốc gia môn Tiếng Anh có hệ thống, bám sát cấu trúc đề thi thực tế. Cam kết giúp học sinh nắm chắc 24 chuyên đề ngữ pháp, 3000+ từ vựng và đạt 8+ điểm thi.",
    heroDescEn: "Systematic English preparation for the National High School Exam. Master 24 grammar topics, 3000+ vocabulary words, and target 8+ points.",
    stats: [
      { label: "Chuyên đề ngữ pháp", labelEn: "Grammar topics", value: "24" },
      { label: "Từ vựng trọng tâm", labelEn: "Key vocabulary", value: "3000+" },
      { label: "Đề luyện tập", labelEn: "Practice tests", value: "100+" },
      { label: "Thời lượng", labelEn: "Duration", value: "Linh hoạt" },
    ],
    features: [
      { vi: "Hệ thống hóa 24 chuyên đề ngữ pháp trọng tâm — từ dễ đến khó", en: "24 core grammar topics systematized — easy to hard" },
      { vi: "3000+ từ vựng theo chương trình SGK lớp 10–12", en: "3000+ vocabulary from Grade 10–12 textbooks" },
      { vi: "Luyện đề theo cấu trúc thi thực tế (50 câu / 60 phút)", en: "Practice matching real exam format (50 questions / 60 minutes)" },
      { vi: "Phân tích đề thi các năm gần nhất & dự đoán xu hướng ra đề", en: "Recent past exam analysis & question trend predictions" },
      { vi: "Chiến lược phân bổ thời gian & kỹ thuật loại trừ đáp án hiệu quả", en: "Time management & effective answer elimination techniques" },
    ],
    curriculum: [
      { vi: "Tháng 1–2: Hệ thống hóa 12 chuyên đề ngữ pháp cốt lõi", en: "Months 1–2: Systematize 12 core grammar topics", detail: "Thì, câu điều kiện, bị động, câu gián tiếp, mệnh đề quan hệ...", detailEn: "Tenses, conditionals, passive voice, reported speech, relative clauses..." },
      { vi: "Tháng 3–4: 12 chuyên đề nâng cao & từ vựng theo chủ đề", en: "Months 3–4: 12 advanced topics & thematic vocabulary", detail: "Word formation, synonyms/antonyms, collocations", detailEn: "Word formation, synonyms/antonyms, collocations" },
      { vi: "Tháng 5: Đọc hiểu chiến lược & luyện đề tổng hợp hàng ngày", en: "Month 5: Reading strategies & daily comprehensive practice" },
      { vi: "Tháng 6: Thi thử hàng tuần & chỉnh sửa điểm yếu 1-on-1", en: "Month 6: Weekly mocks & 1-on-1 weakness correction" },
    ],
    audience: [
      { vi: "Học sinh lớp 10–12 muốn đạt điểm cao môn Tiếng Anh", en: "Grade 10–12 students targeting high English scores" },
      { vi: "Phụ huynh muốn con ôn thi bài bản và có cam kết đầu ra", en: "Parents wanting structured prep with guaranteed outcomes" },
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
            <Link to="/english" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> {t("Chương trình Tiếng Anh", "English Programs")}
            </Link>

            {/* Hero with image */}
            <div className="glass-card rounded-2xl overflow-hidden mb-8">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img src={course.image} alt={t(course.title, course.titleEn)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-white" />
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
            {course.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {course.stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{t(s.label, s.labelEn)}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> {t("Điểm nổi bật", "Highlights")}
              </h2>
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
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> {t("Giáo án & Lộ trình", "Curriculum & Roadmap")}
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
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
                <Users className="w-5 h-5 text-primary" /> {t("Đối tượng phù hợp", "Who is this for?")}
              </h2>
              <ul className="space-y-2">
                {course.audience.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary-foreground">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    {t(a.vi, a.en)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            {course.testimonial && (
              <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-primary/30">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-display font-bold text-foreground">{t("Học viên nói gì?", "What students say")}</h2>
                </div>
                <p className="text-secondary-foreground italic leading-relaxed mb-3">"{t(course.testimonial.text, course.testimonial.textEn)}"</p>
                <p className="text-sm text-primary font-semibold">— {course.testimonial.name}</p>
              </div>
            )}

            {/* Contact / Register */}
            <div className="glass-card rounded-2xl p-6 md:p-8 border-2 border-primary/20">
              <h2 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" /> {t("Đăng ký học ngay", "Register Now")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Liên hệ thầy Hải để được tư vấn chi tiết và đăng ký khóa học phù hợp nhất với bạn.",
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

export default EnglishCourse;
