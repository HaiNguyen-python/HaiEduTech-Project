/**
 * @file SatCurriculum.tsx
 * @description Dedicated SAT Curriculum page — pulls the 30-week roadmap
 *   (SatExamFormat) and the interactive SAT lessons grid out of /english/sat
 *   into their own route so the main SAT landing stays short and clean.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SatExamFormat from "@/components/SatExamFormat";
import { useLanguage } from "@/contexts/LanguageContext";
import { allEnglishModules } from "@/data/languageCurriculum";

const SatCurriculum = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const satModules = allEnglishModules.filter((m) => m.category === "sat");
  const totalLessons = satModules.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Helmet>
        <title>{t("Chương trình SAT chi tiết — HaiEduTech", "SAT Curriculum — HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Lộ trình SAT 30 tuần (Digital SAT 2026) với bài học tương tác, bài tập và quiz từ thầy Hải.",
            "30-week Digital SAT 2026 roadmap with interactive lessons, exercises and quizzes by Teacher Hai."
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/sat-curriculum" />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={() => navigate("/english/sat")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Quay lại trang SAT", "Back to SAT")}
        </button>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
            {t("📚 Chương trình SAT chi tiết", "📚 SAT Curriculum")}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            {t(
              "Lộ trình 30 tuần cho Digital SAT 2026, kèm bài học tương tác, từ vựng, bài tập và quiz theo từng tuần.",
              "30-week roadmap for Digital SAT 2026 with interactive lessons, vocabulary, exercises and quizzes."
            )}
          </p>
        </header>

        {/* 30-week format & roadmap */}
        <section className="mb-10">
          <SatExamFormat />
        </section>

        {/* Interactive lessons grid */}
        {satModules.length > 0 && (
          <section className="glass-card rounded-2xl p-6 md:p-8 mb-10 scroll-mt-24">
            <h2 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              {t("Bài học SAT tương tác", "Interactive SAT Lessons")}
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              {t(
                `${satModules.length} module · ${totalLessons} bài học tương tác với lý thuyết, từ vựng, bài tập & quiz`,
                `${satModules.length} modules · ${totalLessons} interactive lessons with theory, vocabulary, exercises & quizzes`
              )}
            </p>
            <div className="space-y-6">
              {satModules.map((mod) => (
                <details
                  key={mod.id}
                  className="group/mod rounded-xl border border-border bg-background/40 p-4 md:p-5 [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex items-start gap-3 cursor-pointer list-none select-none">
                    <span className="text-3xl">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-base md:text-lg">
                        {t(mod.title, mod.titleEn)}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        {t(mod.description, mod.descriptionEn)}
                      </p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium whitespace-nowrap shrink-0">
                      {mod.lessons.length} {t("bài", "lessons")}
                    </span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open/mod:rotate-180" />
                  </summary>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                    {mod.lessons.map((lesson, idx) => (
                      <button
                        key={lesson.id}
                        onClick={() => navigate(`/english/learn/${mod.id}/${lesson.id}`)}
                        className="text-left p-3 rounded-lg border border-border bg-card hover:border-primary hover:scale-[1.02] hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <span className="text-xs font-bold text-primary group-hover:text-primary-foreground">
                              {idx + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {t(lesson.title, lesson.titleEn)}
                            </p>
                            {lesson.difficulty && (
                              <span className="inline-block mt-1.5 text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-medium">
                                {lesson.difficulty}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SatCurriculum;
