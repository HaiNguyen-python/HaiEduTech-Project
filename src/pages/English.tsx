import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowRight, Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import WordOfTheDay from "@/components/WordOfTheDay";

const English = () => {
  const { t } = useLanguage();
  const [dictWord, setDictWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictLoading, setDictLoading] = useState(false);

  const programs = [
    {
      title: "Cambridge Starters–PET",
      level: t("Mới bắt đầu → Trung cấp", "Beginner → Intermediate"),
      desc: t("Tiếng Anh nền tảng cho trẻ nhỏ theo chuẩn Cambridge Assessment.", "Foundation English for young learners through Cambridge Assessment."),
      features: [
        t("Chương trình phù hợp lứa tuổi", "Age-appropriate curriculum"),
        t("Hoạt động tương tác", "Interactive activities"),
        t("Kiểm tra tiến độ", "Progress testing"),
      ],
    },
    {
      title: t("Luyện thi IELTS", "IELTS Preparation"),
      level: t("Trung cấp → Nâng cao", "Intermediate → Advanced"),
      desc: t("Luyện thi IELTS toàn diện với chấm điểm và phản hồi bằng AI.", "Comprehensive IELTS preparation with AI-powered grading and feedback."),
      features: [
        t("Luyện đủ 4 kỹ năng", "4-skill training"),
        t("AI chấm Writing & Speaking", "AI Writing & Speaking grader"),
        t("Thi thử & chấm điểm", "Mock tests & scoring"),
      ],
    },
    {
      title: t("Chương trình TOEIC", "TOEIC Program"),
      level: t("Trung cấp", "Intermediate"),
      desc: t("Tiếng Anh thương mại cho phát triển sự nghiệp.", "Business English proficiency for career advancement."),
      features: [
        t("Tập trung Nghe & Đọc", "Listening & Reading focus"),
        t("Từ vựng kinh doanh", "Business vocabulary"),
        t("Thi thử tính giờ", "Timed practice tests"),
      ],
    },
    {
      title: t("Tiếng Anh Giao tiếp", "Conversational English"),
      level: t("Tất cả trình độ", "All Levels"),
      desc: t("Kỹ năng giao tiếp thực tế cho cuộc sống hàng ngày, du lịch và công việc.", "Practical communication skills for daily life, travel, and work."),
      features: [
        t("Hội thoại theo chủ đề thực tế", "Real-world topic dialogues"),
        t("Luyện phát âm chuẩn", "Pronunciation training"),
        t("Roleplay & thảo luận nhóm", "Roleplay & group discussions"),
      ],
    },
    {
      title: t("Luyện thi THPT Quốc gia", "National High School Exam"),
      level: t("Lớp 10–12", "Grade 10–12"),
      desc: t("Ôn thi tập trung cho kỳ thi tiếng Anh THPT Quốc gia.", "Targeted preparation for Vietnam's national English exam."),
      features: [
        t("Bám sát chương trình học", "Curriculum-aligned"),
        t("Luyện ngữ pháp & từ vựng chuyên sâu", "Grammar & vocabulary drills"),
        t("Chiến lược làm bài thi", "Exam strategies"),
      ],
    },
  ];

  const lookupWord = async () => {
    if (!dictWord.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dictWord.trim().toLowerCase()}`);
      if (res.ok) {
        const data = await res.json();
        setDictResult(data[0]);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-600 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" /> {t("Trung tâm Tiếng Anh", "English Hub")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Chương trình ", "English ")}
              <span className="text-gradient">{t("Tiếng Anh", "Programs")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              {t(
                "Từ Cambridge cho trẻ nhỏ đến IELTS 8.0+ — chương trình có hệ thống với phản hồi bằng AI.",
                "From Cambridge young learners to IELTS band 8.0+ — structured programs with AI-enhanced feedback."
              )}
            </p>

            {/* Programs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {programs.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-display font-bold text-foreground">{p.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold whitespace-nowrap">{p.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                    {t("Đăng ký ngay", "Register now")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Word of the Day */}
            <WordOfTheDay type="english" />

            {/* English Dictionary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                📖 {t("Từ điển Anh-Anh", "English Dictionary")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("Tra cứu nghĩa, phát âm, và ví dụ của từ tiếng Anh.", "Look up definitions, pronunciation, and examples of English words.")}
              </p>
              <div className="flex gap-3 mb-6">
                <input value={dictWord} onChange={(e) => setDictWord(e.target.value)} onKeyDown={(e) => e.key === "Enter" && lookupWord()}
                  placeholder={t("Nhập từ cần tra...", "Enter a word...")}
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-base" />
                <button onClick={lookupWord} disabled={dictLoading}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all flex items-center gap-2">
                  <Search className="w-5 h-5" /> {t("Tra cứu", "Search")}
                </button>
              </div>
              {dictLoading && <p className="text-muted-foreground text-sm">{t("Đang tìm kiếm...", "Searching...")}</p>}
              {dictResult && !dictResult.error && (
                <div className="bg-secondary rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-foreground">{dictResult.word}</h3>
                    {dictResult.phonetic && <span className="text-muted-foreground text-lg">{dictResult.phonetic}</span>}
                    {dictResult.phonetics?.find((p: any) => p.audio) && (
                      <button onClick={() => new Audio(dictResult.phonetics.find((p: any) => p.audio).audio).play()} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20">🔊</button>
                    )}
                  </div>
                  {dictResult.meanings?.map((m: any, i: number) => (
                    <div key={i}>
                      <span className="text-sm font-bold text-primary italic">{m.partOfSpeech}</span>
                      <ul className="mt-2 space-y-2">
                        {m.definitions.slice(0, 3).map((d: any, j: number) => (
                          <li key={j} className="text-sm text-secondary-foreground">
                            <span className="font-medium">{j + 1}.</span> {d.definition}
                            {d.example && <p className="text-muted-foreground italic mt-1 ml-4">"{d.example}"</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {dictResult?.error && <p className="text-destructive text-sm">{t("Không tìm thấy từ này.", "Word not found.")}</p>}
            </motion.div>

            {/* Learning resources */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">📚 {t("Tài liệu học tập", "Learning Resources")}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: t("Ngữ pháp cơ bản", "Basic Grammar"), desc: t("12 thì tiếng Anh, câu điều kiện, bị động", "12 tenses, conditionals, passive voice"), icon: "📝" },
                  { title: t("Từ vựng IELTS", "IELTS Vocabulary"), desc: t("Từ vựng Academic theo chủ đề", "Topic-based academic vocabulary"), icon: "🎯" },
                  { title: t("Luyện nghe", "Listening Practice"), desc: t("Podcast & bài nghe theo cấp độ", "Podcasts & graded listening exercises"), icon: "🎧" },
                  { title: t("Mẫu bài Writing", "Writing Templates"), desc: t("Bài mẫu Task 1 & Task 2", "Sample essays Task 1 & Task 2"), icon: "✍️" },
                  { title: t("Idioms & Collocations", "Idioms & Collocations"), desc: t("Thành ngữ và cụm từ thông dụng", "Common idioms and collocations"), icon: "💡" },
                  { title: t("Đề thi thử", "Practice Tests"), desc: t("Full test IELTS với đáp án", "Full IELTS tests with answers"), icon: "📋" },
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

export default English;
