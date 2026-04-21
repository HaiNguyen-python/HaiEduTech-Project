import Navbar from "@/components/Navbar";
import AssessmentTool from "@/components/AssessmentTool";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Languages, CheckCircle, ArrowRight, Search, GraduationCap, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import WordOfTheDay from "@/components/WordOfTheDay";
import { chineseResources } from "@/data/lessonData";
import { allChineseModules } from "@/data/languageCurriculum";
import SongsBanner from "@/components/songs/SongsBanner";
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

                  {/* Interactive Curriculum inside Conversational card */}
                  {i === 2 && (
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        {t("Chương trình tương tác", "Interactive Curriculum")}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {allChineseModules.map((mod) => (
                          <Link key={mod.id} to={`/chinese/learn/${mod.id}`}
                            className={cn("rounded-lg p-3 bg-gradient-to-br transition-all cursor-pointer group hover:shadow-md hover:scale-[1.01] flex items-center gap-3", mod.color)}>
                            <span className="text-xl">{mod.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors truncate">{t(mod.title, mod.titleEn)}</h5>
                              <span className="text-[10px] text-muted-foreground">{mod.lessons.length} {t("bài", "lessons")}</span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Link to={`/chinese/${["foundation", "hsk", "conversational"][i]}`} className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                      {t("Xem chi tiết", "View details")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Speaking Coach */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              <Link to="/speaking-coach/chinese" className="glass-card rounded-2xl p-8 mb-10 flex items-center gap-6 group hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer block">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    🎙️ AI Speaking Coach — 中文
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "Luyện phát âm tiếng Trung với AI — phản hồi màu sắc theo thời gian thực, Pinyin chi tiết và hệ thống thử lại thông minh",
                      "Practice Chinese pronunciation with AI — real-time color-coded feedback, detailed Pinyin, and smart retry system"
                    )}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl p-8 mb-10 border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-2xl">📚</div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">HSK Vocabulary Bank</h2>
                  <p className="text-sm text-muted-foreground">{t("Kho từ vựng HSK 1-6 chuẩn quốc tế", "Official HSK 1-6 Vocabulary Collection")}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Hệ thống 1000+ từ vựng HSK từ cấp 1 đến cấp 6, tích hợp Flashcard 3D, bài tập trắc nghiệm, phát âm TTS chuẩn bản xứ và theo dõi tiến độ học tập.",
                  "1000+ HSK vocabulary words from Level 1 to 6, featuring 3D Flashcards, MCQ exercises, native TTS pronunciation, and learning progress tracking."
                )}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <Link key={level} to={`/chinese/hsk/vocabulary?level=HSK ${level}`}
                    className="rounded-xl p-4 bg-secondary hover:bg-red-500/10 transition-all text-center group cursor-pointer border border-border hover:border-red-500/30">
                    <span className="text-2xl font-bold text-foreground group-hover:text-red-500 transition-colors">HSK {level}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level <= 2 ? t("Cơ bản", "Basic") : level <= 4 ? t("Trung cấp", "Intermediate") : t("Nâng cao", "Advanced")}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/chinese/hsk-guide" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-white font-semibold hover:brightness-110 transition-all shadow-lg">
                  🎓 {t("Cẩm nang HSK Hub", "HSK Exam Guide Hub")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/chinese/hsk/vocabulary" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:brightness-110 transition-all">
                  {t("Vào học ngay", "Start Learning")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/chinese/hsk/vocabulary?mode=flashcard" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-semibold hover:bg-red-500/10 transition-all border border-border">
                  🃏 Flashcard
                </Link>
                <Link to="/chinese/hsk/vocabulary?mode=exercise" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-semibold hover:bg-red-500/10 transition-all border border-border">
                  ✍️ {t("Bài tập", "Exercise")}
                </Link>
              </div>
            </motion.div>

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

            {/* Interactive Curriculum Modules */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                {t("Hệ thống bài học tương tác", "Interactive Learning Modules")}
              </h2>
              <p className="text-muted-foreground mb-6">{t("Bài học chi tiết với lý thuyết, từ vựng, và bài tập tương tác (Fill-in-blank, Reorder, Dictation, Quiz).", "Detailed lessons with theory, vocabulary, and interactive exercises.")}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allChineseModules.map((mod) => (
                  <Link key={mod.id} to={`/chinese/learn/${mod.id}`}
                    className={cn("rounded-xl p-5 bg-gradient-to-br transition-all cursor-pointer group hover:shadow-lg hover:scale-[1.02]", mod.color)}>
                    <span className="text-3xl mb-3 block">{mod.icon}</span>
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{t(mod.title, mod.titleEn)}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t(mod.description, mod.descriptionEn)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background/50 border border-border text-muted-foreground uppercase tracking-wide">{mod.category}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        {mod.lessons.length} {t("bài", "lessons")} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
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

            {/* Songs Library */}
            <SongsBanner language="chinese" delay={0.45} />

            {/* Skill Assessment */}
            <div className="mb-10">
              <AssessmentTool preSelectedSubject="chinese" inline />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chinese;
