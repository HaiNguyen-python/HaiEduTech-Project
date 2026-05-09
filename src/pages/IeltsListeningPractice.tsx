// IELTS Listening Practice page - multi-question-type listening drills with TTS audio.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsListeningPracticeSets } from "@/data/ieltsListeningPractice";
import ListeningPracticeSetCard from "@/components/ielts/ListeningPracticeSetCard";

const IeltsListeningPractice = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<"all" | 1 | 2 | 3 | 4>("all");

  // Trigger voices loading early
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      const handler = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = handler;
      return () => { window.speechSynthesis.onvoiceschanged = null; };
    }
  }, []);

  const filtered = activeSection === "all"
    ? ieltsListeningPracticeSets
    : ieltsListeningPracticeSets.filter(s => s.section === activeSection);

  const sectionTabs: Array<{ key: "all" | 1 | 2 | 3 | 4; label: string }> = [
    { key: "all", label: t("Tất cả", "All") },
    { key: 1, label: t("Phần 1", "Section 1") },
    { key: 2, label: t("Phần 2", "Section 2") },
    { key: 3, label: t("Phần 3", "Section 3") },
    { key: 4, label: t("Phần 4", "Section 4") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-4 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 pt-2 pb-6">
          <Link
            to="/english/learn/ielts-listening"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại bài giảng Listening", "Back to Listening lessons")}
          </Link>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
              <Headphones className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-[260px]">
              <Badge variant="outline" className="mb-2 text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                {t("Mô phỏng đề thi thật", "Real exam simulation")}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {t("Luyện Nghe IELTS — Theo dạng câu hỏi", "IELTS Listening Practice — By Question Type")}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl">
                {t(
                  "Bộ bài tập listening 4 sections, đầy đủ các dạng câu hỏi: Form Completion, Multiple Choice, Map Labelling, Matching, Sentence Completion, Note Completion. Mỗi bài có audio (đọc bằng giọng máy), transcript và đáp án.",
                  "Listening practice across all 4 sections covering every question type: Form Completion, Multiple Choice, Map Labelling, Matching, Sentence Completion, Note Completion. Each set includes TTS audio, transcript, and instant scoring."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section tabs */}
        <section className="container mx-auto px-4 sm:px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {sectionTabs.map(tab => {
              const count = tab.key === "all"
                ? ieltsListeningPracticeSets.length
                : ieltsListeningPracticeSets.filter(s => s.section === tab.key).length;
              return (
                <Button
                  key={String(tab.key)}
                  variant={activeSection === tab.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(tab.key)}
                  className="gap-2"
                >
                  {tab.label}
                  <Badge variant="secondary" className="text-[10px] px-1.5">{count}</Badge>
                </Button>
              );
            })}
          </div>
        </section>

        {/* Practice sets */}
        <section className="container mx-auto px-4 sm:px-6 space-y-5">
          {filtered.map(s => (
            <ListeningPracticeSetCard key={s.id} set={s} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsListeningPractice;
