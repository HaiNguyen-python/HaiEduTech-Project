import Navbar from "@/components/Navbar";
import AssessmentTool from "@/components/AssessmentTool";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowRight, Search, MessageCircle, Star, GraduationCap, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import WordOfTheDay from "@/components/WordOfTheDay";
import DailyFunFactWidget from "@/components/english/DailyFunFactWidget";
import { englishResources } from "@/data/lessonData";
import { allEnglishModules } from "@/data/languageCurriculum";
import SongsBanner from "@/components/songs/SongsBanner";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const English = () => {
  const { t } = useLanguage();
  const [dictWord, setDictWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictLoading, setDictLoading] = useState(false);

  const programs = [
    {
      title: "Cambridge Starters–PET",
      level: t("Mới bắt đầu → Trung cấp", "Beginner → Intermediate"),
      desc: t(
        "Chương trình tiếng Anh chuẩn quốc tế dành cho trẻ em từ 6–14 tuổi. Được thiết kế theo khung Cambridge Assessment, giúp trẻ xây dựng nền tảng ngôn ngữ vững chắc qua các hoạt động học tập sinh động và phù hợp lứa tuổi.",
        "International-standard English program for children aged 6–14. Designed around the Cambridge Assessment framework, building strong language foundations through engaging, age-appropriate learning activities."
      ),
      features: [
        t("Starters → Movers → Flyers → KET → PET: lộ trình rõ ràng theo cấp độ", "Starters → Movers → Flyers → KET → PET: clear progression pathway"),
        t("4 kỹ năng: Nghe, Nói, Đọc, Viết qua trò chơi và dự án", "4 skills: Listening, Speaking, Reading, Writing through games & projects"),
        t("Đánh giá định kỳ & phản hồi chi tiết cho phụ huynh", "Regular assessments & detailed parent feedback reports"),
        t("Lớp học nhỏ (≤8 học sinh) để tối đa tương tác", "Small classes (≤8 students) for maximum interaction"),
      ],
    },
    {
      title: t("Luyện thi IELTS", "IELTS Preparation"),
      level: t("Trung cấp → Nâng cao", "Intermediate → Advanced"),
      desc: t(
        "Khóa luyện thi IELTS toàn diện với mục tiêu band 6.5–8.0+. Kết hợp phương pháp giảng dạy truyền thống với công nghệ AI chấm điểm Writing & Speaking, giúp học viên nhận phản hồi chi tiết và cải thiện nhanh chóng.",
        "Comprehensive IELTS preparation targeting band 6.5–8.0+. Combines traditional teaching methods with AI-powered Writing & Speaking grading for detailed feedback and rapid improvement."
      ),
      features: [
        t("Chiến lược làm bài từng phần: Listening, Reading, Writing, Speaking", "Section-specific strategies: Listening, Reading, Writing, Speaking"),
        t("AI chấm & phân tích bài Writing Task 1 & Task 2 theo tiêu chí IELTS", "AI grading & analysis of Writing Task 1 & 2 following IELTS criteria"),
        t("AI đánh giá & chấm điểm Speaking theo 4 tiêu chí chính thức", "AI evaluation & scoring of Speaking across 4 official criteria"),
        t("Thi thử mô phỏng thực tế hàng tuần với phân tích điểm mạnh/yếu", "Weekly mock tests with strength/weakness analysis"),
        t("Kho tài liệu 1000+ bài mẫu Writing & Speaking topics", "Library of 1000+ Writing samples & Speaking topics"),
      ],
    },
    {
      title: t("Chương trình TOEIC", "TOEIC Program"),
      level: t("Trung cấp", "Intermediate"),
      desc: t(
        "Chương trình TOEIC chuyên sâu cho người đi làm và sinh viên muốn nâng cao năng lực tiếng Anh thương mại. Tập trung vào kỹ năng Nghe & Đọc với bối cảnh doanh nghiệp thực tế.",
        "Intensive TOEIC program for professionals and students seeking to enhance business English proficiency. Focused on Listening & Reading skills in real corporate contexts."
      ),
      features: [
        t("Phân tích 7 dạng bài Part 1–7 với chiến thuật làm bài hiệu quả", "Analysis of 7 question types (Part 1–7) with effective strategies"),
        t("Từ vựng & ngữ pháp thương mại: email, hợp đồng, báo cáo", "Business vocabulary & grammar: emails, contracts, reports"),
        t("Luyện nghe với accent Mỹ, Anh, Úc, Canada", "Listening practice with American, British, Australian, Canadian accents"),
        t("Thi thử tính giờ mỗi tuần + phân tích lỗi sai chi tiết", "Weekly timed mock tests + detailed error analysis"),
      ],
    },
    {
      title: t("Tiếng Anh Giao tiếp", "Conversational English"),
      level: t("Tất cả trình độ", "All Levels"),
      desc: t(
        "Khóa học giao tiếp thực tế giúp bạn tự tin nói tiếng Anh trong mọi tình huống: từ giao tiếp hàng ngày, du lịch, đến môi trường công việc quốc tế. Phương pháp học qua thực hành, roleplay và thảo luận nhóm.",
        "Practical communication course helping you speak English confidently in any situation: daily life, travel, and international work environments. Learning through practice, roleplay, and group discussions."
      ),
      features: [
        t("20+ chủ đề giao tiếp thực tế: mua sắm, du lịch, phỏng vấn, thuyết trình", "20+ real-world topics: shopping, travel, interviews, presentations"),
        t("Luyện phát âm chuẩn IPA với phản hồi bằng AI", "IPA-based pronunciation training with AI feedback"),
        t("Roleplay theo tình huống thực tế & thảo luận nhóm hàng tuần", "Situational roleplay & weekly group discussions"),
        t("Học cách dùng idioms, phrasal verbs tự nhiên như người bản xứ", "Natural usage of idioms & phrasal verbs like a native speaker"),
      ],
    },
    {
      title: t("Luyện thi THPT Quốc gia", "National High School Exam"),
      level: t("Lớp 10–12", "Grade 10–12"),
      desc: t(
        "Chương trình ôn thi có hệ thống, bám sát cấu trúc đề thi THPT Quốc gia. Giúp học sinh nắm chắc kiến thức ngữ pháp, từ vựng và kỹ năng đọc hiểu để đạt điểm cao trong kỳ thi.",
        "Systematic exam preparation program aligned with the National High School Exam structure. Helping students master grammar, vocabulary, and reading comprehension for top scores."
      ),
      features: [
        t("Hệ thống hóa 24 chuyên đề ngữ pháp trọng tâm", "Systematized 24 core grammar topics"),
        t("3000+ từ vựng theo chương trình SGK lớp 10–12", "3000+ vocabulary from Grade 10–12 textbooks"),
        t("Luyện đề theo cấu trúc thi thực tế (50 câu / 60 phút)", "Practice tests matching real exam format (50 questions / 60 minutes)"),
        t("Phân tích đề thi các năm & dự đoán xu hướng ra đề", "Past exam analysis & question trend predictions"),
        t("Chiến lược phân bổ thời gian & kỹ thuật loại trừ đáp án", "Time management strategies & answer elimination techniques"),
      ],
    },
    {
      title: t("Luyện thi SAT", "SAT Preparation"),
      level: t("Trung cấp → Nâng cao", "Intermediate → Advanced"),
      desc: t(
        "Chương trình luyện thi SAT toàn diện với trọng tâm Reading & Writing, từ vựng nâng cao và chiến lược làm bài hiệu quả. Phù hợp cho học sinh chuẩn bị du học Mỹ.",
        "Comprehensive SAT preparation focusing on Reading & Writing, advanced vocabulary, and effective test strategies. Ideal for students preparing to study in the US."
      ),
      features: [
        t("Evidence-Based Reading: chiến lược đọc hiểu dựa trên bằng chứng", "Evidence-Based Reading: evidence-based comprehension strategies"),
        t("Words in Context: từ đa nghĩa và sắc thái ngữ nghĩa", "Words in Context: polysemy and semantic nuance"),
        t("Standard English Conventions: ngữ pháp, dấu câu, cấu trúc câu", "Standard English Conventions: grammar, punctuation, sentence structure"),
        t("Rhetorical Synthesis: dạng bài mới trong Digital SAT", "Rhetorical Synthesis: new question type on the Digital SAT"),
        t("Từ vựng SAT nâng cao với gốc từ Latin/Greek", "Advanced SAT vocabulary with Latin/Greek roots"),
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

  const COURSE_LD = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Tiếng Anh Toàn Diện",
    "description": "Lộ trình học tiếng Anh toàn diện: IELTS, TOEIC, SAT, Cambridge, Grammar và Giao tiếp. Bài giảng AI cá nhân hóa, luyện đề, chấm Writing và Speaking miễn phí.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "HaiEduTech",
      "url": "https://haiedutech.com"
    },
    "inLanguage": "vi",
    "url": "https://haiedutech.com/english"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Học Tiếng Anh Online: IELTS, TOEIC, SAT, Cambridge | HaiEduTech" description="Lộ trình học tiếng Anh toàn diện: IELTS, TOEIC, SAT, Cambridge, Grammar và Giao tiếp. Bài giảng AI cá nhân hóa, luyện đề, chấm Writing và Speaking miễn phí." path="/english" jsonLd={COURSE_LD} />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-600 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" /> {t("Chương trình Tiếng Anh", "English Program")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Chương trình ", "English ")}
              <span className="text-gradient">{t("Tiếng Anh", "Programs")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              {t(
                "Từ Cambridge cho trẻ nhỏ đến IELTS 8.0+, TOEIC, Giao tiếp và THPT Quốc gia - chương trình bài bản với AI hỗ trợ chấm điểm và phản hồi cá nhân hóa.",
                "From Cambridge Young Learners to IELTS 8.0+, TOEIC, Conversational and National Exam - structured programs with expert scoring and personalized feedback."
              )}
            </p>

            {/* IELTS Writing Practice Banner */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {t("Luyện viết IELTS Task 1 & Task 2 với hệ thống chấm điểm chuyên nghiệp", "IELTS Writing Practice with Expert Scoring System")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("Tạo đề tự động, hướng dẫn viết, ngân hàng từ vựng và chấm điểm theo 4 tiêu chí IELTS chính thức.", "Auto-generated prompts, writing guides, vocabulary banks, and scoring across 4 official IELTS criteria.")}
                </p>
              </div>
              <Link to="/ielts-writing-practice" className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
                {t("Luyện viết ngay", "Start Practice")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

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
                  <div className="flex gap-3">
                    <Link to={`/english/${["cambridge", "ielts", "toeic", "conversational", "national-exam", "sat"][i]}`} className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                      {t("Xem chi tiết", "View details")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6 border-2 border-primary/25 bg-primary/5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-display font-bold text-foreground">🎵 {t("Học qua bài hát", "Learn through Songs")}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold whitespace-nowrap">Songs</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("Mục bài hát riêng cho tiếng Anh với lyrics song ngữ, karaoke highlight, từ vựng trọng tâm và bài tập điền từ.", "Dedicated song section for English with bilingual lyrics, karaoke highlight, key vocabulary, and fill-in-the-blank practice.")}
                </p>
                <ul className="space-y-2 mb-5 text-sm text-secondary-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Lemon Tree · Perfect · You Are My Sunshine</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Twinkle Twinkle · Old MacDonald · Row Your Boat</li>
                </ul>
                <div className="flex gap-3">
                  <Link to="/songs/english" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                    {t("Mở mục bài hát", "Open Songs")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* English Fun Fact of the Day */}
            <DailyFunFactWidget />

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

            {/* Interactive Curriculum Modules - grouped by category */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                {t("Hệ thống bài học tương tác", "Interactive Learning Modules")}
              </h2>
              <p className="text-muted-foreground mb-6">{t("Bài học được phân nhóm theo chuyên đề - chọn nhóm bạn cần để xem.", "Lessons grouped by topic - pick a category to expand.")}</p>

              {(() => {
                const CATEGORY_META: Record<string, { vi: string; en: string; icon: string; accent: string }> = {
                  ielts:           { vi: "IELTS",                en: "IELTS",                icon: "🎯", accent: "from-blue-500/10 to-cyan-500/10 border-blue-500/30" },
                  toeic:           { vi: "TOEIC",                en: "TOEIC",                icon: "💼", accent: "from-amber-500/10 to-orange-500/10 border-amber-500/30" },
                  cambridge:       { vi: "Cambridge (Trẻ em)",   en: "Cambridge (Kids)",     icon: "🎓", accent: "from-pink-500/10 to-rose-500/10 border-pink-500/30" },
                  "national-exam": { vi: "Thi THPT Quốc gia",    en: "National Exam",        icon: "📋", accent: "from-red-500/10 to-orange-500/10 border-red-500/30" },
                  grammar:         { vi: "Ngữ pháp",             en: "Grammar",              icon: "📝", accent: "from-violet-500/10 to-purple-500/10 border-violet-500/30" },
                  sat:             { vi: "SAT",                  en: "SAT",                  icon: "🎖️", accent: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30" },
                };
                const ORDER = ["ielts", "toeic", "cambridge", "national-exam", "grammar", "sat"];
                const grouped = ORDER
                  .map((cat) => ({ cat, items: allEnglishModules.filter((m) => m.category === cat) }))
                  .filter((g) => g.items.length > 0);

                return (
                  <Accordion type="multiple" defaultValue={["ielts"]} className="space-y-3">
                    {grouped.map(({ cat, items }) => {
                      const meta = CATEGORY_META[cat] ?? { vi: cat, en: cat, icon: "📚", accent: "from-secondary to-secondary border-border" };
                      return (
                        <AccordionItem
                          key={cat}
                          value={cat}
                          className={cn("rounded-xl border bg-gradient-to-br px-4 overflow-hidden", meta.accent)}
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-3 text-left">
                              <span className="text-2xl">{meta.icon}</span>
                              <div>
                                <div className="font-semibold text-foreground">{t(meta.vi, meta.en)}</div>
                                <div className="text-xs text-muted-foreground font-normal">
                                  {items.length} {t("chuyên đề", "modules")} · {items.reduce((s, m) => s + m.lessons.length, 0)} {t("bài học", "lessons")}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {items.map((mod) => (
                                <Link
                                  key={mod.id}
                                  to={`/english/learn/${mod.id}`}
                                  className={cn("rounded-xl p-5 bg-gradient-to-br transition-all cursor-pointer group hover:shadow-lg hover:scale-[1.02]", mod.color)}
                                >
                                  <span className="text-3xl mb-3 block">{mod.icon}</span>
                                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{t(mod.title, mod.titleEn)}</h4>
                                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t(mod.description, mod.descriptionEn)}</p>
                                  <div className="flex items-center justify-end">
                                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                                      {mod.lessons.length} {t("bài", "lessons")} <ArrowRight className="w-3 h-3" />
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                );
              })()}
            </motion.div>

            {/* AI Speaking Coach */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
              <Link to="/speaking-coach/english" className="glass-card rounded-2xl p-8 mb-10 flex items-center gap-6 group hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer block">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    🎙️ AI Speaking Coach
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "Luyện phát âm tiếng Anh với AI - phản hồi màu sắc theo thời gian thực, IPA chi tiết và hệ thống thử lại thông minh",
                      "Practice English pronunciation with AI - real-time color-coded feedback, detailed IPA, and smart retry system"
                    )}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </Link>
            </motion.div>

            {/* Learning resources */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">📚 {t("Tài liệu học tập", "Learning Resources")}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {englishResources.map((r) => (
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

            {/* Skill Assessment */}
            <div className="mb-10">
              <AssessmentTool preSelectedSubject="english" inline />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default English;
