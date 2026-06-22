/**
 * @file Swedish.tsx
 * @description /swedish landing hub — 4 distinct YKI-Ruotsi programs as separate cards.
 *              Mirrors the Finnish landing layout 1:1 for cross-language consistency.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import { ChevronRight, Sprout, Snowflake, Target, Mic, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import swedishBg from "@/assets/swedish-nordic-bg.jpg";

interface ProgramCard {
  emoji: string;
  Icon: LucideIcon;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  bulletsVi: string[];
  bulletsEn: string[];
  badgeVi: string;
  badgeEn: string;
  to: string;
  accent: string;
}

const Swedish = () => {
  const { t } = useLanguage();

  const programs: ProgramCard[] = [
    {
      emoji: "🌱",
      Icon: Sprout,
      titleVi: "Người mới bắt đầu",
      titleEn: "Beginner",
      descVi: "Nền tảng phát âm Bắc Âu, danh từ En/Ett và từ vựng đời sống cho người mới học tiếng Thụy Điển từ con số 0.",
      descEn: "Nordic pronunciation, En/Ett nouns and everyday vocabulary for absolute beginners.",
      bulletsVi: ["Phát âm sj-/tj- chuẩn", "Bản thân, gia đình, số đếm", "Chào hỏi & lịch sự cơ bản", "Mua sắm, hỏi đường, phương tiện công cộng"],
      bulletsEn: ["Clean sj-/tj- pronunciation", "Self, family, numbers", "Greetings & basic politeness", "Shopping, directions, transport"],
      badgeVi: "Trình độ YKI 1 (A1)",
      badgeEn: "Level YKI 1 (A1)",
      to: "/swedish/beginner",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      emoji: "❄️",
      Icon: Snowflake,
      titleVi: "Luyện thi YKI A2 Ruotsi",
      titleEn: "YKI A2 Ruotsi Prep",
      descVi: "Lộ trình luyện thi YKI Ruotsi cấp Perustaso với ngữ pháp V2, En/Ett, thì quá khứ và đề thi thử 4 kỹ năng.",
      descEn: "Comprehensive YKI Ruotsi Perustaso prep with V2 grammar, En/Ett, past tense and 4-skill mock simulator.",
      bulletsVi: ["Trật tự từ V2 & đảo ngữ", "Email, hộp thư, viết ngắn", "Modal verbs & công sở cơ bản", "Sức khỏe & đi khám bác sĩ"],
      bulletsEn: ["V2 word order & inversion", "Email & short writing", "Modal verbs & basic workplace", "Health & doctor visits"],
      badgeVi: "Trình độ YKI 2 (A2 Perustaso)",
      badgeEn: "Level YKI 2 (A2 Perustaso)",
      to: "/swedish/yki-a2",
      accent: "from-sky-500 to-blue-600",
    },
    {
      emoji: "🎯",
      Icon: Target,
      titleVi: "Luyện thi YKI B1 Ruotsi",
      titleEn: "YKI B1 Ruotsi Dashboard",
      descVi: "Cấp Keskitaso với mệnh đề phụ (BIFF), liên từ logic, đọc Hbl/Yle và viết thư kiến nghị (opinion letter).",
      descEn: "Intermediate Keskitaso with subordinate clauses (BIFF), logical connectors, Hbl/Yle reading and opinion letters.",
      bulletsVi: ["Mệnh đề phụ (BIFF rule)", "Từ vựng môi trường, giáo dục, việc làm", "Đọc báo Hbl & Yle", "Viết thư kiến nghị & phỏng vấn"],
      bulletsEn: ["Subordinate clauses (BIFF)", "Environment, education, work vocab", "Reading Hbl & Yle", "Opinion letters & interview prep"],
      badgeVi: "Trình độ YKI 3 (B1 Keskitaso)",
      badgeEn: "Level YKI 3 (B1 Keskitaso)",
      to: "/swedish/yki-b1",
      accent: "from-violet-500 to-purple-600",
    },
    {
      emoji: "🇸🇪",
      Icon: Snowflake,
      titleVi: "Svenskfinland — Sống bằng tiếng Thụy Điển ở Phần Lan",
      titleEn: "Svenskfinland — Swedish-speaking Finland",
      descVi: "Hướng dẫn hội nhập cho người dùng tiếng Thụy Điển tại Phần Lan: thủ tục, công sở, truyền thông Hbl, cộng đồng.",
      descEn: "Integration guide for Swedish-speakers in Finland: paperwork, workplace, Hbl media, community life.",
      bulletsVi: ["DVV, Kela, FPA bằng tiếng Thụy Điển", "Văn hóa Svenskfinland & Åland", "Báo Hbl, đài Yle Vega", "Cộng đồng tại Helsingfors/Vasa/Åbo"],
      bulletsEn: ["DVV, Kela, FPA in Swedish", "Svenskfinland & Åland culture", "Hbl newspaper, Yle Vega radio", "Communities in Helsingfors/Vasa/Åbo"],
      badgeVi: "Hướng dẫn hội nhập",
      badgeEn: "Integration Guide",
      to: "/swedish/svenskfinland",
      accent: "from-rose-500 to-pink-600",
    },
  ];

  const COURSE_LD = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Tiếng Thụy Điển YKI Ruotsi",
    "description": "Khóa học tiếng Thụy Điển từ Beginner A1 đến YKI B1 Ruotsi: phát âm Bắc Âu, ngữ pháp V2, đọc Hbl/Yle, luyện thi YKI Ruotsi 4 kỹ năng.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "HaiEduTech",
      "url": "https://haiedutech.com",
    },
    "inLanguage": "vi",
    "url": "https://haiedutech.com/swedish",
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Học Tiếng Thụy Điển Online: YKI A1, A2, B1 Ruotsi | HaiEduTech"
        description="Khóa học tiếng Thụy Điển từ Beginner đến YKI B1 Ruotsi: phát âm Bắc Âu, ngữ pháp V2/BIFF, đọc Hbl & Yle, luyện thi YKI 4 kỹ năng. Lộ trình bởi giáo viên đã sống tại Phần Lan."
        path="/swedish"
        jsonLd={COURSE_LD}
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={swedishBg} alt="Swedish Nordic landscape" className="w-full h-full object-cover" width={1920} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-background" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">🇸🇪</span>
                <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1 backdrop-blur-sm">
                  {t("4 Chương trình", "4 Programs")}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {t("Học Tiếng Thụy Điển - 4 Chương trình", "Learn Swedish - 4 Programs")}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {t(
                  "Chọn lộ trình phù hợp: từ Beginner A1, luyện thi YKI Ruotsi A2/B1, đến hướng dẫn sống bằng tiếng Thụy Điển tại Phần Lan.",
                  "Pick your path: Beginner A1, YKI Ruotsi A2/B1 prep, or a complete Svenskfinland integration guide."
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4 Program Cards */}
        <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <motion.div key={p.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={p.to} className="block h-full group">
                  <div className="h-full rounded-2xl border-2 border-primary/15 bg-card p-6 md:p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-3xl shadow-md`}>
                        {p.emoji}
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {t(p.badgeVi, p.badgeEn)}
                      </Badge>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {t(p.titleVi, p.titleEn)}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {t(p.descVi, p.descEn)}
                    </p>

                    <ul className="space-y-2 mb-6 flex-1">
                      {(t(p.bulletsVi.join("|"), p.bulletsEn.join("|")) as string).split("|").map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full gap-2 font-semibold group-hover:gap-3 transition-all">
                      {t("Bắt đầu học", "Start Learning")}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bonus: Swedish Vocabulary Bank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6"
          >
            <Link to="/swedish/vocabulary" className="block group">
              <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-card/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/40 hover:bg-card transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-2xl shadow-md shrink-0">
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {t("Swedish Vocabulary — Ngân hàng từ vựng A1 → B1", "Swedish Vocabulary Bank — A1 → B1")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "180+ từ vựng tiếng Thụy Điển theo cấp YKI, flashcard, danh sách, bài tập trắc nghiệm & audio sv-SE.",
                      "180+ Swedish words by YKI level — flashcards, list view, MCQ exercises and sv-SE audio."
                    )}
                  </p>
                </div>
                <Button variant="outline" className="gap-2 shrink-0">
                  {t("Mở Vocabulary", "Open Vocabulary")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Bonus: Interactive Curriculum */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-6"
          >
            <Link to="/swedish/curriculum" className="block group">
              <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-card/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/40 hover:bg-card transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-2xl shadow-md shrink-0">
                  📖
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {t("Interactive Curriculum — Từ vựng, Cấu trúc câu & Hội thoại", "Interactive Curriculum — Vocab, Structures & Dialogues")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "Bảng từ vựng theo chủ đề, công thức câu V2/BIFF, và hội thoại có audio tiếng Thụy Điển (sv-SE).",
                      "Themed vocabulary tables, V2/BIFF sentence formulas and Swedish-audio dialogues (sv-SE)."
                    )}
                  </p>
                </div>
                <Button variant="outline" className="gap-2 shrink-0">
                  {t("Mở Curriculum", "Open Curriculum")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Bonus: Skills Lab (all 4 labs in one hub) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.5 }}
            className="mt-4"
          >
            <Link to="/swedish/skills" className="block group">
              <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-card/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/40 hover:bg-card transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 flex items-center justify-center text-2xl shadow-md shrink-0">
                  🧪
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {t(
                      "Skills Lab — Luyện 4 kỹ năng (Nghe · Đọc · Viết · Nói A1–B1)",
                      "Skills Lab — All 4 skills (Listening · Reading · Writing · Speaking A1–B1)",
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "Một cửa cho Hörförståelse · Läsförståelse · Skriva · Tala. TTS sv-SE, MCQ chấm điểm, bài mẫu Band 4–5 và AI chấm 4 tiêu chí.",
                      "One stop for Hörförståelse · Läsförståelse · Skriva · Tala. sv-SE TTS, scored MCQs, Band 4–5 samples, and AI grading on 4 criteria.",
                    )}
                  </p>
                </div>
                <Button variant="outline" className="gap-2 shrink-0">
                  {t("Mở Skills Lab", "Open Skills Lab")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          </motion.div>



          {/* Bonus: AI Speaking Coach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4"
          >
            <Link to="/speaking-coach/swedish" className="block group">
              <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-card/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/40 hover:bg-card transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-md shrink-0">
                  🎙️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    {t("AI Speaking Coach - Tiếng Thụy Điển", "AI Speaking Coach - Swedish")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "Luyện phát âm sj-/tj-, ngữ điệu Bắc Âu với câu mẫu và nhận diện giọng nói liên tục.",
                      "Practice sj-/tj- pronunciation and Nordic intonation with sample sentences and continuous speech recognition."
                    )}
                  </p>
                </div>
                <Button variant="outline" className="gap-2 shrink-0">
                  {t("Mở Coach", "Open Coach")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Swedish;
