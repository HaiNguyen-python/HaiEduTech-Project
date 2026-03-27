// Vietnamese Language Lesson detail view with theory, vocabulary, and quiz
import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Zap, Package, Sparkles, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SmartVocabCard from "@/components/SmartVocabCard";
import { vietnameseLanguageModules } from "@/data/vietnameseCurriculumData";
import type { VietnameseVocabEntry } from "@/data/vietnamese/types";

// Teacher Hai tips per lesson (keyed by lesson ID)
const teacherTips: Record<string, { vi: string; en: string }> = {
  "vn-vocab-shopping": {
    vi: "Bạn có biết? Ở Việt Nam, 'mặc cả' là một trải nghiệm văn hóa. Hãy bắt đầu bằng cách xin giảm 30%!",
    en: "Did you know? In Vietnam, 'mặc cả' (bargaining) is a cultural experience. Start by asking for 30% off!",
  },
  "vn-vocab-food": {
    vi: "Mẹo: Khi gọi phở, hãy nói 'Cho tôi một tô phở bò tái chín' – đó là combo phổ biến nhất!",
    en: "Tip: When ordering phở, say 'Cho tôi một tô phở bò tái chín' – that's the most popular combo!",
  },
  "vn-vocab-family": {
    vi: "Hệ thống xưng hô Việt Nam rất phức tạp – nhưng người Việt sẽ rất vui nếu bạn thử gọi đúng!",
    en: "Vietnamese pronouns are complex – but locals love it when you try to use them correctly!",
  },
  "vn-vocab-transport": {
    vi: "90% người Việt dùng xe máy. Nếu muốn hòa nhập, hãy học nói: 'Grab ơi, đến đây!'",
    en: "90% of Vietnamese use motorbikes. To blend in, learn to say: 'Grab ơi, đến đây!' (Hey Grab, come here!)",
  },
  "vn-vocab-greetings": {
    vi: "Luôn thêm 'anh/chị/em' sau 'Chào' – nó thể hiện sự tôn trọng và thân thiện.",
    en: "Always add 'anh/chị/em' after 'Chào' – it shows respect and friendliness.",
  },
};

// Group vocabulary by part of speech into semantic categories
interface VocabGroup {
  label: string;
  labelEn: string;
  icon: React.ReactNode;
  items: VietnameseVocabEntry[];
}

const groupVocabulary = (vocabulary: VietnameseVocabEntry[]): VocabGroup[] => {
  const actions: VietnameseVocabEntry[] = [];
  const objects: VietnameseVocabEntry[] = [];
  const descriptors: VietnameseVocabEntry[] = [];

  vocabulary.forEach((v) => {
    const pos = v.partOfSpeech?.toLowerCase() || "";
    if (pos.includes("verb") || pos === "phrase") {
      actions.push(v);
    } else if (pos === "adjective" || pos === "number") {
      descriptors.push(v);
    } else {
      objects.push(v);
    }
  });

  const groups: VocabGroup[] = [];
  if (actions.length > 0) groups.push({ label: "Hành động", labelEn: "Actions", icon: <Zap className="w-4 h-4" />, items: actions });
  if (objects.length > 0) groups.push({ label: "Danh từ", labelEn: "Objects", icon: <Package className="w-4 h-4" />, items: objects });
  if (descriptors.length > 0) groups.push({ label: "Mô tả", labelEn: "Descriptors", icon: <Sparkles className="w-4 h-4" />, items: descriptors });

  // If only one group, return flat
  if (groups.length <= 1) return [{ label: "Tất cả", labelEn: "All Words", icon: <Sparkles className="w-4 h-4" />, items: vocabulary }];
  return groups;
};

const VietnameseLessonView = () => {
  const { moduleId, lessonId } = useParams();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const mod = useMemo(
    () => vietnameseLanguageModules.find((m) => m.id === moduleId),
    [moduleId]
  );

  const lesson = useMemo(() => {
    if (!mod) return null;
    if (lessonId) return mod.lessons.find((l) => l.id === lessonId) || mod.lessons[0];
    return mod.lessons[0];
  }, [mod, lessonId]);

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy bài học.", "Lesson not found.")}</p>
          <Link to="/learn-vietnamese" className="text-primary underline mt-4 inline-block">
            {t("Quay lại", "Go back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const score = submitted
    ? lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    : 0;

  const levelColors = {
    beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const tip = teacherTips[lesson.id];
  const vocabGroups = groupVocabulary(lesson.vocabulary);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/learn-vietnamese" className="hover:text-foreground">{t("Tiếng Việt", "Vietnamese")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{t(mod.title, mod.titleEn)}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{t(lesson.title, lesson.titleEn)}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar: lesson list */}
            <aside className="lg:w-64 shrink-0">
              <h3 className="text-sm font-bold text-foreground mb-3">{t(mod.title, mod.titleEn)}</h3>
              <div className="space-y-1">
                {mod.lessons.map((l) => (
                  <Link
                    key={l.id}
                    to={`/learn-vietnamese/module/${mod.id}/${l.id}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      l.id === lesson.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {t(l.title, l.titleEn)}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={levelColors[lesson.level]}>{lesson.level}</Badge>
                  <h1 className="text-2xl font-bold text-foreground">
                    {t(lesson.title, lesson.titleEn)}
                  </h1>
                </div>

                {/* Teacher Hai's Tip */}
                {tip && (
                  <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground mb-1">
                          🎓 Teacher Hai's Tip
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(tip.vi, tip.en)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Theory */}
                <section className="prose prose-sm dark:prose-invert max-w-none mb-8">
                  <ReactMarkdown>{t(lesson.theory, lesson.theoryEn)}</ReactMarkdown>
                </section>

                {/* Pro Tips */}
                {lesson.proTips && lesson.proTips.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-foreground mb-3">💡 Pro Tips</h2>
                    <ul className="space-y-2">
                      {(t("vi", "en") === "vi" ? lesson.proTips : lesson.proTipsEn || lesson.proTips).map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Smart Vocabulary Cards */}
                {lesson.vocabulary.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-5">📖 {t("Từ vựng", "Vocabulary")}</h2>

                    {vocabGroups.map((group, gi) => (
                      <div key={gi} className="mb-6">
                        {/* Group header */}
                        {vocabGroups.length > 1 && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                              {group.icon}
                            </div>
                            <h3 className="text-base font-semibold text-foreground">
                              {t(group.label, group.labelEn)}
                            </h3>
                            <Badge variant="outline" className="text-xs">{group.items.length}</Badge>
                          </div>
                        )}

                        {/* Cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                          {group.items.map((v, vi) => (
                            <SmartVocabCard key={`${gi}-${vi}`} vocab={v} index={vi} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                {/* Quiz */}
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-foreground mb-4">📝 Quiz</h2>
                  <div className="space-y-5">
                    {lesson.quiz.map((q, qi) => (
                      <div key={qi} className="bg-card border border-border rounded-xl p-5">
                        <p className="font-semibold text-foreground mb-3">
                          {qi + 1}. {t(q.question, q.questionEn)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            const selected = answers[qi] === oi;
                            const isCorrect = submitted && oi === q.answer;
                            const isWrong = submitted && selected && oi !== q.answer;
                            return (
                              <button
                                key={oi}
                                onClick={() => !submitted && setAnswers((p) => ({ ...p, [qi]: oi }))}
                                className={`text-left p-3 rounded-lg border transition-colors text-sm ${
                                  isCorrect
                                    ? "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30"
                                    : isWrong
                                    ? "bg-red-50 border-red-300 dark:bg-red-950/30"
                                    : selected
                                    ? "bg-primary/10 border-primary"
                                    : "bg-muted/50 border-border hover:bg-muted"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {submitted && (
                          <p className="text-xs text-muted-foreground mt-2">
                            💡 {t(q.explanation, q.explanationEn)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {!submitted ? (
                    <Button
                      onClick={() => setSubmitted(true)}
                      disabled={Object.keys(answers).length < lesson.quiz.length}
                      className="mt-4 w-full"
                    >
                      {t("Nộp bài", "Submit")}
                    </Button>
                  ) : (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold">
                        {t("Điểm", "Score")}: {score}/{lesson.quiz.length}
                      </p>
                      <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                        {t("Làm lại", "Retry")}
                      </Button>
                    </div>
                  )}
                </section>

                {/* Back */}
                <Link to="/learn-vietnamese">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("Quay lại", "Back")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseLessonView;
