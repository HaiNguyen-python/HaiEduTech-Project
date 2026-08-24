// IELTS Listening Practice page - full 40-question tests + drills by question type.
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Headphones, Clock, ListChecks, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsListeningPracticeSets as _BASE_LIST } from "@/data/ieltsListeningPractice";
import { ieltsListeningPracticeSetsExpansion } from "@/data/ieltsListeningPracticeExpansion";
import { ieltsListeningPracticeSetsExpansion2 } from "@/data/ieltsListeningPracticeExpansion2";
import { ieltsListeningPracticeSetsExpansion3 } from "@/data/ieltsListeningPracticeExpansion3";
import { ieltsListeningPracticeSetsExpansion4 } from "@/data/ieltsListeningPracticeExpansion4";
import { ieltsListeningPracticeSetsExpansion5 } from "@/data/ieltsListeningPracticeExpansion5";
import { ieltsListeningPracticeSetsExpansion6 } from "@/data/ieltsListeningPracticeExpansion6";
import { ieltsListeningPracticeSetsExpansion7 } from "@/data/ieltsListeningPracticeExpansion7";
import { IELTS_FULL_LISTENING_TESTS } from "@/data/ieltsFullListeningTests";
import ListeningFullTestEngine from "@/components/ielts/ListeningFullTestEngine";
const ieltsListeningPracticeSets = [..._BASE_LIST, ...ieltsListeningPracticeSetsExpansion, ...ieltsListeningPracticeSetsExpansion2, ...ieltsListeningPracticeSetsExpansion3, ...ieltsListeningPracticeSetsExpansion4, ...ieltsListeningPracticeSetsExpansion5, ...ieltsListeningPracticeSetsExpansion6, ...ieltsListeningPracticeSetsExpansion7];

import ListeningPracticeSetCard from "@/components/ielts/ListeningPracticeSetCard";

const IeltsListeningPractice = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<"all" | 1 | 2 | 3 | 4>("all");
  const [activeTestId, setActiveTestId] = useState<string | null>(null);

  // Trigger voices loading early
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      const handler = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = handler;
      return () => { window.speechSynthesis.onvoiceschanged = null; };
    }
  }, []);

  const setById = useMemo(
    () => new Map(ieltsListeningPracticeSets.map(s => [s.id, s])),
    [],
  );

  const fullTests = useMemo(
    () =>
      IELTS_FULL_LISTENING_TESTS.map(test => {
        const sets = test.setIds.map(id => setById.get(id)).filter(Boolean) as typeof ieltsListeningPracticeSets;
        return { test, sets, total: sets.reduce((a, s) => a + s.questions.length, 0) };
      }).filter(x => x.sets.length === 4),
    [setById],
  );

  const activeTest = fullTests.find(x => x.test.id === activeTestId) ?? null;

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
                {t("Luyện Nghe IELTS - Full Test & Theo dạng câu hỏi", "IELTS Listening Practice - Full Tests & By Question Type")}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl">
                {t(
                  "13 đề nghe đầy đủ 40 câu (Section 1-4, 30 phút) mô phỏng đúng đề thi thật, kèm 52 bài luyện riêng theo từng dạng câu hỏi: Form Completion, Multiple Choice, Map Labelling, Matching, Sentence Completion, Note Completion.",
                  "13 full 40-question listening tests (Sections 1-4, 30 minutes) mirroring the real exam, plus 52 focused drills by question type: Form Completion, Multiple Choice, Map Labelling, Matching, Sentence Completion, Note Completion."
                )}
              </p>
              <div className="mt-3 rounded-xl border border-primary/30 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 px-3 py-2 text-xs sm:text-sm text-foreground/90 max-w-3xl">
                <span className="font-semibold text-primary">✨ {t("Mới nâng cấp:", "Just upgraded:")}</span>{" "}
                {t(
                  "Full Test 40 câu đánh số liên tục Q1-Q40 · Đồng hồ 30 phút · Nộp 1 lần cho cả đề · Band score IELTS · Giọng UK/US/AU đa nhân vật · Tự lưu tiến độ · Mr. Hai giải thích câu sai bằng AI.",
                  "40-question full tests numbered Q1-Q40 · 30-minute timer · Single submission · IELTS band score · Multi-voice UK/US/AU audio · Auto-save · AI explains wrong answers."
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6">
          {activeTest ? (
            <ListeningFullTestEngine
              test={activeTest.test}
              sets={activeTest.sets}
              onExit={() => setActiveTestId(null)}
            />
          ) : (
            <Tabs defaultValue="full" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="full" className="gap-2">
                  <Clock className="w-4 h-4" /> {t("Đề Full Test", "Full Tests")}
                  <Badge variant="secondary" className="text-[10px] px-1.5">{fullTests.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="type" className="gap-2">
                  <ListChecks className="w-4 h-4" /> {t("Theo dạng câu hỏi", "By Question Type")}
                  <Badge variant="secondary" className="text-[10px] px-1.5">{ieltsListeningPracticeSets.length}</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="full" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {fullTests.map(({ test, sets, total }) => (
                    <Card key={test.id} className="border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 sm:p-5 space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-emerald-600 text-white text-[11px]">{t("Đề đầy đủ", "Full test")}</Badge>
                          <Badge variant="outline" className="text-[11px]">{total} {t("câu", "questions")}</Badge>
                          <Badge variant="outline" className="text-[11px] gap-1">
                            <Clock className="w-3 h-3" /> {test.durationMinutes} {t("phút", "min")}
                          </Badge>
                        </div>
                        <h2 className="text-lg font-bold text-foreground">
                          {t(test.titleVi, test.title)}
                        </h2>
                        <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                          {sets.map(s => (
                            <li key={s.id} className="flex gap-2">
                              <span className="font-semibold text-foreground/80 shrink-0">S{s.section}</span>
                              <span className="truncate">{s.title}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full gap-2" onClick={() => setActiveTestId(test.id)}>
                          <Play className="w-4 h-4" /> {t("Bắt đầu làm đề", "Start test")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="type" className="mt-0 space-y-5">
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
                {filtered.map(s => (
                  <ListeningPracticeSetCard key={s.id} set={s} />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default IeltsListeningPractice;
