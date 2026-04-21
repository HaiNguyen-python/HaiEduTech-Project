// Finnish landing hub — 4 distinct programs as separate cards
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Sprout, Snowflake, Target, Mic, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SongsBanner from "@/components/songs/SongsBanner";
import finnishBg from "@/assets/finnish-nordic-bg.jpg";

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

const Finnish = () => {
  const { t } = useLanguage();

  const programs: ProgramCard[] = [
    {
      emoji: "🌱",
      Icon: Sprout,
      titleVi: "Người mới bắt đầu",
      titleEn: "Beginner",
      descVi: "Nền tảng phát âm, ngữ pháp và từ vựng cho người mới học tiếng Phần Lan từ con số 0.",
      descEn: "Pronunciation, grammar, and vocabulary foundations for absolute beginners.",
      bulletsVi: ["Bảng chữ cái & phát âm", "6 loại động từ Phần Lan", "Biến đổi KPT (astevaihtelu)", "Lỗi sai thường gặp của người Việt"],
      bulletsEn: ["Alphabet & pronunciation", "6 Finnish verb types", "Consonant gradation (KPT)", "Common Vietnamese learner pitfalls"],
      badgeVi: "Trình độ A1 – A2",
      badgeEn: "Level A1 – A2",
      to: "/finnish/beginner",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      emoji: "❄️",
      Icon: Snowflake,
      titleVi: "Luyện thi YKI A2",
      titleEn: "YKI A2 Prep",
      descVi: "Lộ trình luyện thi YKI cấp Perustaso toàn diện với từ vựng, bài học và đề thi thử 4 kỹ năng.",
      descEn: "Comprehensive YKI Perustaso prep with vocabulary, lessons, and 4-skill mock exams.",
      bulletsVi: ["5 chủ đề từ vựng A1-A2", "Sijat, KPT, thì quá khứ", "Đề thi thử 4 kỹ năng", "Phản hồi viết chuyên sâu"],
      bulletsEn: ["5 thematic vocabulary sets", "Local cases, KPT, past tenses", "Full 4-skill mock exams", "In-depth writing feedback"],
      badgeVi: "Trình độ A2 (Perustaso)",
      badgeEn: "Level A2 (Perustaso)",
      to: "/finnish/yki-dashboard",
      accent: "from-sky-500 to-blue-600",
    },
    {
      emoji: "🎯",
      Icon: Target,
      titleVi: "Luyện thi YKI B1",
      titleEn: "YKI B1 Dashboard",
      descVi: "Cấp độ trung cấp Keskitaso với bài đọc tin tức, viết email trang trọng và tình huống nói thực tế.",
      descEn: "Intermediate Keskitaso level with news reading, formal emails, and real-life speaking scenarios.",
      bulletsVi: ["Đọc hiểu tin tức & thông báo", "Nghe ngân hàng, nhà trẻ", "Email trang trọng & blog post", "YKI Word of the Day"],
      bulletsEn: ["News & notice reading", "Bank & daycare listening", "Formal emails & blog posts", "YKI Word of the Day"],
      badgeVi: "Trình độ B1 (Keskitaso)",
      badgeEn: "Level B1 (Keskitaso)",
      to: "/finnish/yki-b1",
      accent: "from-violet-500 to-purple-600",
    },
    {
      emoji: "🇫🇮",
      Icon: Snowflake,
      titleVi: "Cuộc sống ở Phần Lan",
      titleEn: "Life in Finland",
      descVi: "Hướng dẫn song ngữ cho người mới đến: thủ tục hành chính, thuế, y tế và đời sống hàng ngày.",
      descEn: "Bilingual newcomer guide: admin procedures, taxes, healthcare, and daily life.",
      bulletsVi: ["DVV, Kela, BankID", "Verokortti & văn hóa làm việc", "Terveysasema & cấp cứu 112", "Checklist 30 ngày đầu + PDF"],
      bulletsEn: ["DVV, Kela, BankID", "Tax card & work culture", "Health centers & 112 emergency", "First 30 days checklist + PDF"],
      badgeVi: "Hướng dẫn hội nhập",
      badgeEn: "Integration Guide",
      to: "/finnish/life-in-finland",
      accent: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={finnishBg} alt="Finnish landscape" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-background" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">🇫🇮</span>
                <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1 backdrop-blur-sm">
                  {t("4 Chương trình", "4 Programs")}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {t("Học Tiếng Phần Lan — 4 Chương trình", "Learn Finnish — 4 Programs")}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {t(
                  "Chọn lộ trình phù hợp: từ Beginner A1-A2, luyện thi YKI A2/B1, đến hướng dẫn hội nhập cuộc sống tại Phần Lan.",
                  "Pick your path: Beginner A1-A2, YKI A2/B1 prep, or a complete integration guide for life in Finland."
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4 Program Cards */}
        <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <motion.div
                key={p.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
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

          {/* Songs Library banner */}
          <div className="mt-8">
            <SongsBanner language="finnish" delay={0.5} />
          </div>

          {/* Bonus: AI Speaking Coach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6"
          >
            <Link to="/speaking-coach/finnish" className="block group">
              <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-card/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/40 hover:bg-card transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-md shrink-0">
                  🎙️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    {t("AI Speaking Coach — Tiếng Phần Lan", "AI Speaking Coach — Finnish")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(
                      "Luyện phát âm với 150+ câu mẫu, IPA, nhận diện giọng nói liên tục.",
                      "Practice pronunciation with 150+ sentences, IPA, and continuous speech recognition."
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

export default Finnish;
