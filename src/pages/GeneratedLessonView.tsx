import { useState, useEffect } from "react";
import { boldAndSanitize } from "@/lib/utils";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronRight, CheckCircle, XCircle, Loader2, BookOpen,
  Code2, Play, ExternalLink, Eye, EyeOff, ArrowRight, Sparkles
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const CATEGORY_LABELS: Record<string, { vi: string; en: string; icon: string }> = {
  grammar: { vi: "Ngữ pháp", en: "Grammar", icon: "📝" },
  vocabulary: { vi: "Từ vựng", en: "Vocabulary", icon: "📚" },
  reading: { vi: "Đọc hiểu", en: "Reading", icon: "📖" },
  "fill-blank": { vi: "Điền vào chỗ trống", en: "Fill in the Blank", icon: "✏️" },
  reorder: { vi: "Sắp xếp câu", en: "Reorder Sentences", icon: "🔀" },
  dialogue: { vi: "Hội thoại", en: "Dialogue", icon: "💬" },
  concept: { vi: "Kiến thức", en: "Concepts", icon: "💡" },
  "fix-bug": { vi: "Tìm lỗi", en: "Fix Bug", icon: "🐛" },
  "mini-project": { vi: "Dự án nhỏ", en: "Mini Project", icon: "🚀" },
};

const GeneratedLessonView = () => {
  const { lessonId } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [relatedLessons, setRelatedLessons] = useState<any[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  // Fill-blank answers
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillChecked, setFillChecked] = useState(false);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    setLoading(true);
    setAnswers({});
    setShowResults(false);
    setFillAnswers({});
    setFillChecked(false);
    setShowSolution(false);

    const { data, error } = await supabase
      .from("generated_lessons")
      .select("*")
      .eq("id", lessonId)
      .single();

    if (error || !data) {
      console.error(error);
      setLoading(false);
      return;
    }

    setLesson(data);

    // Fetch related lessons
    const { data: related } = await supabase
      .from("generated_lessons")
      .select("id, title, title_en, category, level, subject")
      .eq("subject", data.subject)
      .neq("id", data.id)
      .limit(6);

    setRelatedLessons(related || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy bài học", "Lesson not found")}</p>
          <Link to="/lesson-library" className="text-primary hover:underline mt-2 inline-block">{t("Quay lại kho bài học", "Back to library")}</Link>
        </div>
      </div>
    );
  }

  const content = lesson.content as any;
  const catInfo = CATEGORY_LABELS[lesson.category] || { vi: lesson.category, en: lesson.category, icon: "📄" };
  const quiz = content.quiz || [];
  const score = showResults ? quiz.reduce((acc: number, q: any, i: number) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;

  const openInTrinket = (code: string) => {
    window.open(`https://trinket.io/python?outputOnly=true&runOption=run&code=${encodeURIComponent(code)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link to="/lesson-library" className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> {t("Kho bài học", "Lesson Library")}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{lesson.title}</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xl">{catInfo.icon}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{lesson.level}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs">{t(catInfo.vi, catInfo.en)}</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground">{lesson.title}</h1>
                {lesson.title_en && lesson.title_en !== lesson.title && (
                  <p className="text-sm text-muted-foreground mt-1">{lesson.title_en}</p>
                )}
              </div>

              {/* Passage / Theory */}
              {content.passage && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-3">📖 {t("Bài đọc", "Reading Passage")}</h2>
                  <div className="prose prose-sm max-w-none text-secondary-foreground whitespace-pre-line leading-relaxed">{content.passage}</div>
                </div>
              )}

              {content.theory && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" /> {t("Lý thuyết", "Theory")}
                  </h2>
                  <div className="prose prose-sm max-w-none text-secondary-foreground whitespace-pre-line">{content.theory}</div>
                </div>
              )}

              {content.scenario && (
                <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
                  <h2 className="font-semibold text-foreground mb-2">🎭 {t("Tình huống", "Scenario")}</h2>
                  <p className="text-sm text-secondary-foreground">{content.scenario}</p>
                </div>
              )}

              {/* Grammar points */}
              {content.points && content.points.length > 0 && (
                <div className="space-y-3">
                  {content.points.map((p: any, i: number) => (
                    <div key={i} className="glass-card rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                        {p.rule}
                      </h3>
                      <div className="space-y-1 ml-8">
                        {p.examples?.map((ex: string, j: number) => (
                          <p key={j} className="text-sm text-secondary-foreground" dangerouslySetInnerHTML={boldAndSanitize(ex)} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Vocabulary */}
              {content.vocabulary && content.vocabulary.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-4">📚 {t("Từ vựng", "Vocabulary")}</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {content.vocabulary.map((v: any, i: number) => (
                      <div key={i} className="bg-secondary rounded-lg p-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className={`font-bold text-foreground ${lesson.subject === "chinese" ? "text-2xl" : "text-lg"}`}>{v.word}</span>
                          {v.pinyin && <span className="text-primary text-sm">{v.pinyin}</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{v.meaning}</p>
                        {v.example && <p className="text-xs text-secondary-foreground" dangerouslySetInnerHTML={boldAndSanitize(v.example)} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dialogue */}
              {content.dialogue && content.dialogue.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-4">💬 {t("Hội thoại", "Dialogue")}</h2>
                  <div className="space-y-3">
                    {content.dialogue.map((d: any, i: number) => (
                      <div key={i} className={`flex ${d.speaker === "A" ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-[80%] rounded-xl p-3 ${d.speaker === "A" ? "bg-primary/10" : "bg-secondary"}`}>
                          <p className="text-xs font-bold text-primary mb-1">{d.speaker}</p>
                          <p className="text-sm text-foreground font-medium">{d.line}</p>
                          {d.pinyin && <p className="text-xs text-primary mt-0.5">{d.pinyin}</p>}
                          {d.translation && <p className="text-xs text-muted-foreground mt-1">{d.translation}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fill in the blank */}
              {content.sentences && lesson.category === "fill-blank" && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-4">✏️ {t("Điền vào chỗ trống", "Fill in the Blank")}</h2>
                  {content.instructions && <p className="text-sm text-muted-foreground mb-4">{content.instructions}</p>}
                  <div className="space-y-4">
                    {content.sentences.map((s: any, i: number) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm text-foreground">{i + 1}. {s.text}</p>
                        {s.hint && <p className="text-xs text-muted-foreground ml-4">💡 {s.hint}</p>}
                        <input
                          value={fillAnswers[i] || ""}
                          onChange={e => setFillAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                          disabled={fillChecked}
                          placeholder={t("Nhập đáp án...", "Enter answer...")}
                          className="ml-4 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground w-48 focus:border-primary/50 focus:outline-none"
                        />
                        {fillChecked && (
                          <p className={`text-xs ml-4 ${fillAnswers[i]?.toLowerCase().trim() === s.answer?.toLowerCase().trim() ? "text-green-600" : "text-destructive"}`}>
                            {fillAnswers[i]?.toLowerCase().trim() === s.answer?.toLowerCase().trim() ? "✅ Đúng!" : `❌ Đáp án: ${s.answer}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {!fillChecked && Object.keys(fillAnswers).length > 0 && (
                    <button onClick={() => setFillChecked(true)} className="mt-4 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.97]">
                      {t("Kiểm tra", "Check")}
                    </button>
                  )}
                </div>
              )}

              {/* Reorder sentences */}
              {content.sentences && lesson.category === "reorder" && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-4">🔀 {t("Sắp xếp câu", "Reorder Sentences")}</h2>
                  <div className="space-y-5">
                    {content.sentences.map((s: any, i: number) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm font-medium text-foreground">{i + 1}. {t("Sắp xếp:", "Reorder:")}</p>
                        <div className="flex flex-wrap gap-2 ml-4">
                          {s.scrambled?.map((word: string, j: number) => (
                            <span key={j} className="px-3 py-1 rounded-lg bg-secondary text-sm text-foreground border border-border">{word}</span>
                          ))}
                        </div>
                        <input
                          value={fillAnswers[i] || ""}
                          onChange={e => setFillAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                          disabled={fillChecked}
                          placeholder={t("Viết câu đúng...", "Write correct sentence...")}
                          className="ml-4 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground w-full max-w-md focus:border-primary/50 focus:outline-none"
                        />
                        {fillChecked && (
                          <div className="ml-4">
                            <p className="text-xs text-green-600">✅ {s.correct}</p>
                            {s.translation && <p className="text-xs text-muted-foreground">{s.translation}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {!fillChecked && Object.keys(fillAnswers).length > 0 && (
                    <button onClick={() => setFillChecked(true)} className="mt-4 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.97]">
                      {t("Kiểm tra", "Check")}
                    </button>
                  )}
                </div>
              )}

              {/* Fix Bug */}
              {content.buggy_code && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">🐛 {t("Tìm lỗi trong Code", "Find the Bugs")}</h2>
                  {content.description && <p className="text-sm text-secondary-foreground mb-4">{content.description}</p>}
                  <div className="rounded-lg overflow-hidden mb-4">
                    <div className="px-3 py-2 bg-slate-900 flex items-center justify-between">
                      <span className="text-xs font-mono text-red-400">⚠️ Buggy Code</span>
                    </div>
                    <pre className="p-4 bg-slate-950 overflow-x-auto"><code className="text-sm font-mono text-slate-300">{content.buggy_code}</code></pre>
                  </div>
                  {content.bugs && (
                    <div className="mb-4">
                      <button onClick={() => setShowSolution(!showSolution)} className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                        {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showSolution ? t("Ẩn lời giải", "Hide solution") : t("Xem lời giải", "Show solution")}
                      </button>
                      <AnimatePresence>
                        {showSolution && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-3 space-y-3">
                            {content.bugs.map((b: any, i: number) => (
                              <div key={i} className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                                <p className="text-xs font-medium text-green-600 mb-1">Dòng {b.line}: {b.description}</p>
                                <code className="text-xs font-mono text-green-700">{b.fix}</code>
                              </div>
                            ))}
                            {content.fixed_code && (
                              <div className="rounded-lg overflow-hidden">
                                <div className="px-3 py-2 bg-slate-900 flex items-center justify-between">
                                  <span className="text-xs font-mono text-green-400">✅ Fixed Code</span>
                                  <button onClick={() => openInTrinket(content.fixed_code)} className="flex items-center gap-1 px-2 py-1 rounded bg-green-600 text-white text-xs">
                                    <Play className="w-3 h-3" /> Run
                                  </button>
                                </div>
                                <pre className="p-3 bg-slate-950 overflow-x-auto"><code className="text-xs font-mono text-slate-300">{content.fixed_code}</code></pre>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              {/* Mini Project Steps */}
              {content.steps && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">🚀 {t("Hướng dẫn từng bước", "Step-by-Step Guide")}</h2>
                  <div className="space-y-4">
                    {content.steps.map((s: any, i: number) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-4">
                        <h4 className="text-sm font-semibold text-foreground mb-1">Bước {s.step || i + 1}: {s.title}</h4>
                        <p className="text-xs text-secondary-foreground mb-2">{s.description}</p>
                        {s.code && (
                          <pre className="p-3 bg-slate-950 rounded-lg overflow-x-auto"><code className="text-xs font-mono text-slate-300">{s.code}</code></pre>
                        )}
                      </div>
                    ))}
                  </div>
                  {content.full_code && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <div className="px-3 py-2 bg-slate-900 flex items-center justify-between">
                        <span className="text-xs font-mono text-green-400">📄 Full Code</span>
                        <button onClick={() => openInTrinket(content.full_code)} className="flex items-center gap-1 px-2 py-1 rounded bg-green-600 text-white text-xs">
                          <Play className="w-3 h-3" /> Run
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-950 overflow-x-auto"><code className="text-xs font-mono text-slate-300">{content.full_code}</code></pre>
                    </div>
                  )}
                  {content.extensions && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <p className="text-xs font-semibold text-primary mb-2">🌟 {t("Mở rộng:", "Extensions:")}</p>
                      <ul className="space-y-1">
                        {content.extensions.map((ext: string, i: number) => (
                          <li key={i} className="text-xs text-secondary-foreground flex items-start gap-2">
                            <span className="text-primary">•</span> {ext}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Code example */}
              {content.code && !content.buggy_code && (
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-mono text-green-400">python</span>
                    </div>
                    <button onClick={() => openInTrinket(content.code)} className="flex items-center gap-1 px-3 py-1 rounded-md bg-green-600 text-white text-xs font-medium hover:bg-green-500">
                      <Play className="w-3 h-3" /> {t("Chạy thử", "Run")}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950 overflow-x-auto"><code className="text-sm font-mono text-slate-300 whitespace-pre">{content.code}</code></pre>
                </div>
              )}

              {/* Tips */}
              {content.tips && content.tips.length > 0 && (
                <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
                  <h2 className="font-semibold text-foreground mb-3">💡 {t("Mẹo ghi nhớ", "Tips")}</h2>
                  <ul className="space-y-2">
                    {content.tips.map((tip: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                        <span className="text-primary mt-0.5">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exercise */}
              {content.exercise && (
                <div className="glass-card rounded-xl p-6 border-l-4 border-amber-500">
                  <h2 className="font-semibold text-foreground mb-3">📝 {t("Bài tập", "Exercise")}</h2>
                  <p className="text-sm text-secondary-foreground">{content.exercise}</p>
                </div>
              )}

              {/* Quiz */}
              {quiz.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-foreground">✏️ {t("Trắc nghiệm", "Quiz")}</h2>
                    {showResults && (
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold ${score === quiz.length ? "text-green-500" : score >= quiz.length / 2 ? "text-yellow-500" : "text-destructive"}`}>
                          {score}/{quiz.length}
                        </span>
                        <button onClick={() => { setAnswers({}); setShowResults(false); }} className="text-sm text-primary hover:underline">{t("Làm lại", "Retry")}</button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-5">
                    {quiz.map((q: any, qi: number) => (
                      <div key={qi} className="space-y-2">
                        <p className="text-sm font-medium text-foreground">{qi + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options?.map((opt: string, oi: number) => {
                            const selected = answers[qi] === oi;
                            const isCorrect = q.answer === oi;
                            let cls = "px-3 py-2 rounded-lg text-sm text-left transition-all border ";
                            if (showResults) {
                              if (isCorrect) cls += "border-green-500 bg-green-500/10 text-green-700";
                              else if (selected) cls += "border-destructive bg-destructive/10 text-destructive";
                              else cls += "border-border text-muted-foreground";
                            } else {
                              cls += selected ? "border-primary bg-primary/10 text-primary" : "border-border text-secondary-foreground hover:border-primary/50 hover:bg-primary/5";
                            }
                            return (
                              <button key={oi} onClick={() => !showResults && setAnswers(prev => ({ ...prev, [qi]: oi }))} className={cls}>
                                {showResults && isCorrect && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                {showResults && selected && !isCorrect && <XCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {showResults && q.explanation && <p className="text-xs text-muted-foreground ml-1 mt-1">💬 {q.explanation}</p>}
                      </div>
                    ))}
                  </div>
                  {!showResults && Object.keys(answers).length > 0 && (
                    <button onClick={() => setShowResults(true)} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-[0.97]">
                      {t("Nộp bài", "Submit")}
                    </button>
                  )}
                </div>
              )}

              {/* Related lessons */}
              {relatedLessons.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {t("Bài học liên quan", "Related Lessons")}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {relatedLessons.map(rl => {
                      const rlCat = CATEGORY_LABELS[rl.category] || { vi: rl.category, en: rl.category, icon: "📄" };
                      return (
                        <Link key={rl.id} to={`/lesson-library/${rl.id}`}
                          className="bg-secondary rounded-xl p-4 hover:bg-primary/5 transition-colors group">
                          <span className="text-lg mb-1 block">{rlCat.icon}</span>
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{rl.title}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">{rl.level}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{t(rlCat.vi, rlCat.en)}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2">
                            {t("Làm bài", "Start")} <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GeneratedLessonView;
