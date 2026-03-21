import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Languages, CheckCircle, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const Chinese = () => {
  const { t } = useLanguage();
  const [dictWord, setDictWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictLoading, setDictLoading] = useState(false);

  const modules = [
    {
      title: t("Tiếng Trung Sơ cấp", "Elementary Chinese"),
      level: t("Mới bắt đầu", "Beginner"),
      desc: t("Xây dựng nền tảng với pinyin, thanh điệu, chữ Hán cơ bản và cụm từ giao tiếp hàng ngày.", "Build your foundation with pinyin, tones, basic characters and everyday phrases."),
      features: [
        t("Pinyin & thanh điệu chuẩn", "Pinyin & tone mastery"),
        t("200+ chữ Hán thiết yếu", "200+ essential characters"),
        t("Luyện hội thoại hàng ngày", "Daily conversation drills"),
      ],
    },
    {
      title: t("Luyện thi HSK", "HSK Preparation"),
      level: "HSK 1–6",
      desc: t("Ôn luyện có hệ thống cho tất cả cấp độ HSK.", "Structured preparation for all levels of the HSK proficiency test."),
      features: [
        t("Từ vựng theo cấp độ HSK", "Vocabulary by HSK level"),
        t("Luyện đọc & nghe", "Reading & listening practice"),
        t("Thi thử & chấm điểm", "Mock exams & scoring"),
      ],
    },
    {
      title: t("Tiếng Trung Giao tiếp", "Conversational Chinese"),
      level: t("Tất cả trình độ", "All Levels"),
      desc: t("Kỹ năng nói thực tế cho du lịch, kinh doanh và cuộc sống hàng ngày.", "Practical speaking skills for travel, business and daily life."),
      features: [
        t("Hội thoại thực tế", "Real-world dialogues"),
        t("Bối cảnh văn hóa", "Cultural context"),
        t("Luyện phát âm", "Pronunciation coaching"),
      ],
    },
  ];

  const lookupWord = async () => {
    if (!dictWord.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    try {
      // Using a simple approach - search in a local dictionary mapping
      const word = dictWord.trim();
      // We'll use a basic Chinese-Vietnamese dictionary with common words
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
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-500 text-sm font-medium mb-4">
              <Languages className="w-4 h-4" /> {t("Góc Tiếng Trung", "Chinese Corner")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Khóa học ", "Chinese ")}
              <span className="text-gradient">{t("Tiếng Trung", "Modules")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              {t(
                "Từ con số 0 đến thành thạo — các module có cấu trúc từ Sơ cấp, HSK, đến Giao tiếp.",
                "From zero to fluency — structured modules covering Elementary, HSK, and Conversational Chinese."
              )}
            </p>

            {/* Programs - horizontal cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {modules.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
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
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
                  >
                    {t("Đăng ký ngay", "Register now")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Chinese Dictionary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                📖 {t("Từ điển Trung-Việt", "Chinese Dictionary")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("Tra cứu nghĩa, pinyin, và ví dụ của từ tiếng Trung.", "Look up definitions, pinyin, and examples of Chinese words.")}
              </p>

              <div className="flex gap-3 mb-4">
                <input
                  value={dictWord}
                  onChange={(e) => setDictWord(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && lookupWord()}
                  placeholder={t("Nhập chữ Hán (ví dụ: 你好)...", "Enter Chinese characters (e.g. 你好)...")}
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-base"
                />
                <button
                  onClick={lookupWord}
                  disabled={dictLoading}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  {t("Tra cứu", "Search")}
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                {t("Thử: 你好, 谢谢, 学习, 老师, 朋友, 中国, 爱, 书, 水, 天...", "Try: 你好, 谢谢, 学习, 老师, 朋友, 中国, 爱, 书, 水, 天...")}
              </p>

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

              {dictResult?.error && (
                <p className="text-destructive text-sm">{t("Không tìm thấy từ này trong từ điển.", "Word not found in dictionary.")}</p>
              )}
            </motion.div>

            {/* Learning resources */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                📚 {t("Tài liệu học tập", "Learning Resources")}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: t("Bảng Pinyin", "Pinyin Chart"), desc: t("Bảng phiên âm đầy đủ với âm thanh", "Complete pronunciation chart with audio"), icon: "🔤" },
                  { title: t("Chữ Hán cơ bản", "Basic Characters"), desc: t("200 chữ Hán thường dùng nhất", "200 most common characters"), icon: "🈷️" },
                  { title: t("Ngữ pháp HSK", "HSK Grammar"), desc: t("Ngữ pháp từ HSK 1 đến HSK 6", "Grammar from HSK 1 to HSK 6"), icon: "📝" },
                  { title: t("Luyện nghe", "Listening Practice"), desc: t("Hội thoại theo chủ đề và cấp độ", "Topic & level-based dialogues"), icon: "🎧" },
                  { title: t("Thành ngữ Trung Quốc", "Chinese Idioms"), desc: t("Chengyu phổ biến và ứng dụng", "Common chengyu and usage"), icon: "💡" },
                  { title: t("Đề thi HSK", "HSK Practice Tests"), desc: t("Đề thi thử HSK các cấp", "HSK mock tests for all levels"), icon: "📋" },
                ].map((r, i) => (
                  <div key={i} className="bg-secondary rounded-xl p-5 hover:bg-primary/5 transition-colors cursor-pointer">
                    <span className="text-2xl mb-2 block">{r.icon}</span>
                    <h4 className="font-semibold text-foreground mb-1">{r.title}</h4>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
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
