/**
 * @file SwedishSkillsLab.tsx
 * @description Unified hub for the 4 Swedish skills labs (Listening · Reading
 *              · Writing · Speaking). Replaces 4 separate navbar entries with
 *              a single Skills Lab entry that links into each lab.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import { ChevronRight, Headphones, BookOpen, PenLine, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Lab {
  to: string;
  Icon: typeof Headphones;
  emoji: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  bulletsVi: string[];
  bulletsEn: string[];
  accent: string;
}

const SwedishSkillsLab = () => {
  const { t, lang } = useLanguage();

  const labs: Lab[] = [
    {
      to: "/swedish/listening",
      Icon: Headphones,
      emoji: "🎧",
      titleVi: "Listening Lab — Hörförståelse",
      titleEn: "Listening Lab — Hörförståelse",
      descVi:
        "Bài nghe sv-SE thực tế: hội thoại quán cà phê, thông báo nhà ga, bản tin SVT, phỏng vấn B1. Có MCQ chấm điểm, phụ đề + bản dịch.",
      descEn:
        "Realistic sv-SE listenings: café dialogues, station announcements, SVT bulletins, B1 interviews. Scored MCQs with transcript + translation.",
      bulletsVi: [
        "Tốc độ phát 0.75x / 0.9x / 1.0x",
        "Giải thích đáp án bằng tiếng Việt",
        "Từ vựng chính kèm bản dịch",
      ],
      bulletsEn: [
        "Playback at 0.75x / 0.9x / 1.0x",
        "Vietnamese answer rationales",
        "Key vocab with translation",
      ],
      accent: "from-purple-500 to-fuchsia-600",
    },
    {
      to: "/swedish/reading",
      Icon: BookOpen,
      emoji: "📚",
      titleVi: "Reading Lab — Läsförståelse",
      titleEn: "Reading Lab — Läsförståelse",
      descVi:
        "Văn bản thực tế: email, rao Blocket, thông báo chung cư, blog, bản tin SVT/DN, truyện ngắn. MCQ + Đúng/Sai + từ vựng trong văn cảnh, có TTS đọc bài.",
      descEn:
        "Real-world texts: emails, Blocket ads, building notices, blogs, SVT/DN news, short stories. MCQ + T/F + vocab-in-context, with TTS reader.",
      bulletsVi: [
        "Bản dịch tiếng Việt song song",
        "Đọc nguyên đoạn bằng sv-SE TTS",
        "Phân theo cấp A1 · A2 · B1",
      ],
      bulletsEn: [
        "Side-by-side Vietnamese gloss",
        "Whole-passage sv-SE TTS",
        "Tabbed by level A1 · A2 · B1",
      ],
      accent: "from-rose-500 to-orange-600",
    },
    {
      to: "/swedish/writing",
      Icon: PenLine,
      emoji: "✍️",
      titleVi: "Writing Lab — Skriva",
      titleEn: "Writing Lab — Skriva",
      descVi:
        "Đề viết YKI Ruotsi thực tế + AI chấm 4 tiêu chí (Task, Vocabulary, Grammar, Coherence) và trích lỗi cụ thể. Có bài mẫu Band 4–5 tham khảo.",
      descEn:
        "Realistic YKI Ruotsi prompts + AI grades 4 criteria (Task, Vocabulary, Grammar, Coherence) with concrete errors. Includes Band 4–5 sample essays.",
      bulletsVi: [
        "Câu mở bài gợi ý (starters)",
        "Mẹo viết theo cấp độ",
        "Sample Band 4–5 song ngữ",
      ],
      bulletsEn: [
        "Suggested opening lines",
        "Level-specific writing tips",
        "Bilingual Band 4–5 samples",
      ],
      accent: "from-blue-500 to-indigo-600",
    },
    {
      to: "/swedish/speaking",
      Icon: Mic,
      emoji: "🎤",
      titleVi: "Speaking Lab — Tala",
      titleEn: "Speaking Lab — Tala",
      descVi:
        "Đề Tala YKI Ruotsi, ghi âm sv-SE liên tục, AI chấm Fluency + Grammar + Vocabulary + Task. Kèm bài mẫu (model answer) Band 4–5 nghe được.",
      descEn:
        "YKI Ruotsi Tala prompts, continuous sv-SE recording, AI grades Fluency + Grammar + Vocabulary + Task. Includes audible Band 4–5 model answers.",
      bulletsVi: [
        "Khung trả lời (skeleton)",
        "Mẹo về cấu trúc câu",
        "Listen to model bằng sv-SE TTS",
      ],
      bulletsEn: [
        "Answer skeleton scaffolding",
        "Sentence-structure tips",
        "sv-SE TTS for model answers",
      ],
      accent: "from-cyan-500 to-teal-600",
    },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background flex flex-col">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title={t(
          "Swedish Skills Lab — Nghe · Đọc · Viết · Nói | HaiEduTech",
          "Swedish Skills Lab — Listening · Reading · Writing · Speaking | HaiEduTech",
        )}
        description={t(
          "Bộ 4 phòng luyện kỹ năng tiếng Thụy Điển A1–B1 ở một nơi: Hörförståelse, Läsförståelse, Skriva, Tala. Có TTS sv-SE và chấm AI.",
          "All four Swedish A1–B1 skill labs in one place: Hörförståelse, Läsförståelse, Skriva, Tala. sv-SE TTS and AI grading.",
        )}
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <SwedishHeroBanner pickKey="SwedishSkillsLab" compact />
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge variant="secondary" className="mb-3">
              {t("🇸🇪 Tiếng Thụy Điển · A1 – B1", "🇸🇪 Swedish · A1 – B1")}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent">
              {t("Skills Lab — Luyện 4 kỹ năng", "Skills Lab — Train all 4 skills")}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">
              {t(
                "Một cửa cho cả Nghe · Đọc · Viết · Nói tiếng Thụy Điển. Nội dung mô phỏng đề YKI Ruotsi thực, có TTS sv-SE chuẩn và AI chấm bài tức thì.",
                "One stop for Swedish Listening · Reading · Writing · Speaking. Content mirrors real YKI Ruotsi tasks, with native sv-SE TTS and instant AI grading.",
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {labs.map((lab, i) => (
              <motion.div
                key={lab.to}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.45 }}
              >
                <Link to={lab.to} className="block group h-full">
                  <div className="h-full rounded-2xl border-2 border-primary/15 bg-card/70 backdrop-blur-sm p-6 hover:border-primary/40 hover:bg-card transition-all flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lab.accent} flex items-center justify-center text-2xl shadow-md shrink-0`}
                      >
                        {lab.emoji}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        <lab.Icon className="w-5 h-5" />
                        {t(lab.titleVi, lab.titleEn)}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(lab.descVi, lab.descEn)}
                    </p>
                    <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc pl-5">
                      {(lang === "vi" ? lab.bulletsVi : lab.bulletsEn).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-2">
                      <Button variant="outline" className="gap-2 w-full sm:w-auto">
                        {t("Mở phòng luyện", "Open lab")}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/swedish">
              <Button variant="ghost" className="gap-2">
                <ChevronRight className="w-4 h-4 rotate-180" />
                {t("Quay lại tổng quan Học tiếng Thụy Điển", "Back to Swedish overview")}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishSkillsLab;
