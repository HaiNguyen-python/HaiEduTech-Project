import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Languages, CheckCircle, ArrowRight, Search, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import WordOfTheDay from "@/components/WordOfTheDay";
import { chineseResources } from "@/data/lessonData";
import { allChineseModules } from "@/data/languageCurriculum";
import { cn } from "@/lib/utils";

const Chinese = () => {
  const { t } = useLanguage();
  const [dictWord, setDictWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictLoading, setDictLoading] = useState(false);

  const modules = [
    {
      title: t("Tiếng Trung Nền tảng", "Foundation Chinese"),
      level: t("Mới bắt đầu", "Beginner"),
      desc: t(
        "Khóa học dành cho người hoàn toàn mới bắt đầu, xây dựng nền tảng vững chắc từ phiên âm Pinyin, thanh điệu, đến chữ Hán cơ bản. Học viên sẽ có khả năng giao tiếp đơn giản trong các tình huống hàng ngày sau khóa học.",
        "Designed for complete beginners, building a solid foundation from Pinyin pronunciation, tones, to basic Chinese characters. Students will be able to communicate in simple daily situations upon completion."
      ),
      features: [
        t("Hệ thống Pinyin & 4 thanh điệu chuẩn xác với luyện tập audio", "Pinyin system & 4 tones with audio practice drills"),
        t("300+ chữ Hán thiết yếu với phương pháp ghi nhớ bộ thủ", "300+ essential characters with radical-based memorization method"),
        t("50+ mẫu hội thoại: chào hỏi, mua sắm, ăn uống, hỏi đường", "50+ dialogue patterns: greetings, shopping, dining, asking directions"),
        t("Bài tập viết chữ Hán theo nét & thứ tự nét chuẩn", "Character writing exercises with correct stroke order"),
        t("Văn hóa Trung Quốc cơ bản: phong tục, lễ hội, ứng xử", "Basic Chinese culture: customs, festivals, etiquette"),
      ],
    },
    {
      title: t("Luyện thi HSK", "HSK Preparation"),
      level: "HSK 1–6",
      desc: t(
        "Chương trình ôn luyện bài bản cho kỳ thi năng lực Hán ngữ quốc tế HSK. Mỗi cấp độ được thiết kế với lộ trình rõ ràng, kho đề thi phong phú và phương pháp học từ vựng khoa học.",
        "Systematic preparation for the international Chinese proficiency HSK exam. Each level features a clear roadmap, extensive test banks, and scientific vocabulary learning methods."
      ),
      features: [
        t("Từ vựng & ngữ pháp phân loại theo HSK 1–6 (150 → 5000+ từ)", "Vocabulary & grammar classified by HSK 1–6 (150 → 5000+ words)"),
        t("Luyện đọc hiểu với bài đọc theo chủ đề & cấp độ", "Reading comprehension with topic & level-graded passages"),
        t("Luyện nghe với tốc độ nói tự nhiên của người bản xứ", "Listening practice at native speaker natural speed"),
        t("Thi thử mô phỏng đề HSK thực tế + chấm điểm & phân tích", "Mock tests simulating real HSK format + scoring & analysis"),
        t("Mẹo ghi nhớ chữ Hán: flashcard, spaced repetition, liên tưởng", "Character memorization tips: flashcards, spaced repetition, mnemonics"),
      ],
    },
    {
      title: t("Tiếng Trung Giao tiếp", "Conversational Chinese"),
      level: t("Tất cả trình độ", "All Levels"),
      desc: t(
        "Khóa học tập trung vào kỹ năng nói và nghe trong các tình huống thực tế. Phù hợp cho người học muốn giao tiếp tiếng Trung tự tin trong du lịch, kinh doanh và cuộc sống hàng ngày tại Trung Quốc hoặc Đài Loan.",
        "Course focused on speaking and listening skills in real-world situations. Ideal for learners who want to communicate confidently in Chinese for travel, business, and daily life in China or Taiwan."
      ),
      features: [
        t("30+ chủ đề giao tiếp: du lịch, nhà hàng, công việc, y tế, ngân hàng", "30+ conversation topics: travel, restaurants, work, healthcare, banking"),
        t("Luyện phát âm chuẩn với so sánh native speaker recordings", "Pronunciation training with native speaker recording comparisons"),
        t("Roleplay tình huống thực tế & thảo luận nhóm hàng tuần", "Real-world roleplay & weekly group discussions"),
        t("Phân biệt tiếng Trung giản thể vs phồn thể (Đại lục vs Đài Loan)", "Simplified vs Traditional Chinese differences (Mainland vs Taiwan)"),
        t("Slang, thành ngữ & cách nói tự nhiên trong đời sống", "Slang, idioms & natural expressions in daily life"),
      ],
    },
  ];

  const lookupWord = async () => {
    if (!dictWord.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    try {
      const word = dictWord.trim();
      const commonWords: Record<string, { pinyin: string; meaning: string; examples: string[] }> = {
        "你好": { pinyin: "nǐ hǎo", meaning: t("Xin chào", "Hello"), examples: ["你好，我是小明。", "你好吗？"] },
        "谢谢": { pinyin: "xiè xie", meaning: t("Cảm ơn", "Thank you"), examples: ["谢谢你的帮助。", "非常谢谢！"] },
        "再见": { pinyin: "zài jiàn", meaning: t("Tạm biệt", "Goodbye"), examples: ["明天见，再见！"] },
        "学习": { pinyin: "xué xí", meaning: t("Học tập", "Study/Learn"), examples: ["我喜欢学习中文。", "学习很重要。"] },
        "老师": { pinyin: "lǎo shī", meaning: t("Giáo viên, Thầy/Cô", "Teacher"), examples: ["老师好！", "我的老师很好。"] },
        "学生": { pinyin: "xué shēng", meaning: t("Học sinh", "Student"), examples: ["我是学生。", "学生们都很努力。"] },
        "中国": { pinyin: "zhōng guó", meaning: t("Trung Quốc", "China"), examples: ["中国很大。", "我去过中国。"] },
        "朋友": { pinyin: "péng yǒu", meaning: t("Bạn bè", "Friend"), examples: ["他是我的好朋友。"] },
        "吃饭": { pinyin: "chī fàn", meaning: t("Ăn cơm", "Eat/Have a meal"), examples: ["我们去吃饭吧！"] },
        "工作": { pinyin: "gōng zuò", meaning: t("Công việc, Làm việc", "Work"), examples: ["你的工作是什么？"] },
        "家": { pinyin: "jiā", meaning: t("Nhà, Gia đình", "Home/Family"), examples: ["我要回家。", "我家有五个人。"] },
        "爱": { pinyin: "ài", meaning: t("Yêu", "Love"), examples: ["我爱你。", "我爱学习。"] },
        "大": { pinyin: "dà", meaning: t("Lớn, To", "Big/Large"), examples: ["这个很大。"] },
        "小": { pinyin: "xiǎo", meaning: t("Nhỏ, Bé", "Small/Little"), examples: ["这个太小了。"] },
        "好": { pinyin: "hǎo", meaning: t("Tốt, Được", "Good"), examples: ["很好！", "你好吗？"] },
        "水": { pinyin: "shuǐ", meaning: t("Nước", "Water"), examples: ["请给我一杯水。"] },
        "书": { pinyin: "shū", meaning: t("Sách", "Book"), examples: ["这本书很好看。"] },
        "人": { pinyin: "rén", meaning: t("Người", "Person/People"), examples: ["中国人很友好。"] },
        "天": { pinyin: "tiān", meaning: t("Trời, Ngày", "Sky/Day"), examples: ["今天天气很好。"] },
        "年": { pinyin: "nián", meaning: t("Năm", "Year"), examples: ["新年快乐！"] },
      };
      if (commonWords[word]) {
        setDictResult(commonWords[word]);
      } else {
        setDictResult({ error: true });
      }
    } catch {
      setDictResult({ error: true });
    }
    setDictLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-500 text-sm font-medium mb-4">
              <Languages className="w-4 h-4" /> {t("Chương trình Tiếng Trung", "Chinese Program")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Khóa học ", "Chinese ")}
              <span className="text-gradient">{t("Tiếng Trung", "Modules")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              {t(
                "Từ con số 0 đến giao tiếp tự tin — chương trình bài bản từ Nền tảng, HSK đến Giao tiếp thực tế, kết hợp văn hóa và công nghệ.",
                "From zero to confident communication — structured modules from Foundation to HSK to real-world Conversation, blending culture and technology."
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {modules.map((m, i) => (
                <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-display font-bold text-foreground">{m.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-500 font-semibold">{m.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Link to={`/chinese/${["foundation", "hsk", "conversational"][i]}`} className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                      {t("Xem chi tiết", "View details")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Word of the Day */}
            <WordOfTheDay type="chinese" />

            {/* Chinese Dictionary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">📖 {t("Từ điển Trung-Việt", "Chinese Dictionary")}</h2>
              <p className="text-muted-foreground mb-6">{t("Tra cứu nghĩa, pinyin, và ví dụ của từ tiếng Trung.", "Look up definitions, pinyin, and examples of Chinese words.")}</p>
              <div className="flex gap-3 mb-4">
                <input value={dictWord} onChange={(e) => setDictWord(e.target.value)} onKeyDown={(e) => e.key === "Enter" && lookupWord()}
                  placeholder={t("Nhập chữ Hán (ví dụ: 你好)...", "Enter Chinese characters (e.g. 你好)...")}
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-base" />
                <button onClick={lookupWord} disabled={dictLoading}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all flex items-center gap-2">
                  <Search className="w-5 h-5" /> {t("Tra cứu", "Search")}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{t("Thử: 你好, 谢谢, 学习, 老师, 朋友, 中国, 爱, 书, 水, 天...", "Try: 你好, 谢谢, 学习, 老师, 朋友, 中国, 爱, 书, 水, 天...")}</p>
              {dictLoading && <p className="text-muted-foreground text-sm">{t("Đang tìm kiếm...", "Searching...")}</p>}
              {dictResult && !dictResult.error && (
                <div className="bg-secondary rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-bold text-foreground">{dictWord}</h3>
                    <span className="text-lg text-primary font-medium">{dictResult.pinyin}</span>
                  </div>
                  <p className="text-base text-secondary-foreground font-medium">{dictResult.meaning}</p>
                  {dictResult.examples?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">{t("Ví dụ:", "Examples:")}</p>
                      {dictResult.examples.map((ex: string, i: number) => (
                        <p key={i} className="text-sm text-secondary-foreground">• {ex}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {dictResult?.error && <p className="text-destructive text-sm">{t("Không tìm thấy từ này trong từ điển.", "Word not found in dictionary.")}</p>}
            </motion.div>

            {/* Learning resources */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">📚 {t("Tài liệu học tập", "Learning Resources")}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {chineseResources.map((r) => (
                  <Link key={r.id} to={`/lesson/${r.id}`} className="bg-secondary rounded-xl p-5 hover:bg-primary/5 transition-colors cursor-pointer group">
                    <span className="text-2xl mb-2 block">{r.icon}</span>
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{t(r.title, r.titleEn)}</h4>
                    <p className="text-sm text-muted-foreground">{t(r.description, r.descriptionEn)}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2">
                      {r.lessons.length} {t("bài học", "lessons")} <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chinese;
