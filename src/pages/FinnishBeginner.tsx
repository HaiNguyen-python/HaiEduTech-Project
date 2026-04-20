/**
 * @file FinnishBeginner.tsx
 * @description Finnish for Beginners hub (A1-A2): alphabet, KPT, verb types, partitive,
 *   daily phrases, vocab, pitfalls for VN learners, quizzes.
 * @author Teacher Hai (HaiEduTech)
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Volume2, AlertTriangle, NotebookPen, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ALPHABET_SOUNDS, VERB_TYPES, KPT_PAIRS, PARTITIVE_CASES,
  DAILY_PHRASES, BEGINNER_VOCAB, VIETNAMESE_PITFALLS, BEGINNER_QUIZ,
} from "@/data/finnishBeginnerData";

const speakFi = (text: string) => {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fi-FI"; u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {/* noop */}
};

const saveToNotebook = async (title: string, content: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to save notes.", variant: "destructive" });
      return;
    }
    await supabase.from("student_notebooks").insert({ user_id: user.id, title, content, subject: "finnish" });
    toast({ title: "✅ Saved to Notebook", description: title });
  } catch {
    toast({ title: "Save failed", variant: "destructive" });
  }
};

const FinnishBeginner = () => {
  const { t, lang } = useLanguage();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl pt-24">
        <Link to="/finnish" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại Finnish Hub", "Back to Finnish Hub")}
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Badge className="bg-[#003580] text-white mb-3">A1 — A2 · Aloittelijoille</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#003580] to-sky-500 bg-clip-text text-transparent">
            {t("Tiếng Phần Lan cho người mới bắt đầu", "Finnish for Beginners")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            {t(
              "Học từ con số 0: phát âm, ngữ pháp cốt lõi (KPT, động từ 6 loại, partitive), giao tiếp hàng ngày và những lỗi sai phổ biến của người Việt.",
              "Start from zero: pronunciation, core grammar (KPT, 6 verb types, partitive), daily conversations, and common pitfalls Vietnamese learners face."
            )}
          </p>
        </motion.div>

        <Tabs defaultValue="alphabet" className="w-full">
          <TabsList className="w-full flex-wrap h-auto justify-start">
            <TabsTrigger value="alphabet">🔤 {t("Phát âm", "Alphabet")}</TabsTrigger>
            <TabsTrigger value="grammar">📐 {t("Ngữ pháp", "Grammar")}</TabsTrigger>
            <TabsTrigger value="phrases">💬 {t("Hội thoại", "Phrases")}</TabsTrigger>
            <TabsTrigger value="vocab">🖼️ {t("Từ vựng", "Vocab")}</TabsTrigger>
            <TabsTrigger value="pitfalls">⚠️ {t("Lỗi thường gặp", "VN Pitfalls")}</TabsTrigger>
            <TabsTrigger value="quiz">✏️ Quiz</TabsTrigger>
          </TabsList>

          {/* ALPHABET */}
          <TabsContent value="alphabet" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">🔊 {t("Bảng âm Phần Lan", "Finnish Soundboard")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {ALPHABET_SOUNDS.map((s, i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-all border-[#003580]/20">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl font-bold text-[#003580]">{s.letter}</span>
                    <span className="text-xs text-muted-foreground font-mono">{s.ipa}</span>
                  </div>
                  <button onClick={() => speakFi(s.example)} className="flex items-center gap-2 text-sm font-semibold mb-1 hover:text-[#003580]">
                    <Volume2 className="w-3.5 h-3.5" /> {s.example}
                  </button>
                  <p className="text-xs text-muted-foreground">{lang === "vi" ? s.exampleVi : s.exampleEn}</p>
                  <p className="text-xs mt-2 italic text-foreground/70">{lang === "vi" ? s.tipVi : s.tip}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* GRAMMAR */}
          <TabsContent value="grammar" className="mt-6 space-y-8">
            {/* Verb types */}
            <section>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h2 className="text-2xl font-bold">📝 {t("6 loại động từ", "Verb Types 1-6")}</h2>
                <Button variant="outline" size="sm" onClick={() => saveToNotebook(
                  "Finnish Verb Types 1-6",
                  VERB_TYPES.map(v => `Type ${v.type} (${v.ending}): ${v.rule}\n${v.examples.map(e => `  ${e.infinitive} → minä ${e.minä}, sinä ${e.sinä}, hän ${e.hän} (${e.meaning})`).join("\n")}`).join("\n\n")
                )}>
                  <NotebookPen className="w-4 h-4 mr-1" /> {t("Lưu vào Sổ tay", "Save to Notebook")}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {VERB_TYPES.map((v) => (
                  <Card key={v.type} className="p-4 border-l-4 border-l-[#003580]">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge>Type {v.type}</Badge>
                      <span className="font-mono text-xs text-muted-foreground">{v.ending}</span>
                    </div>
                    <p className="text-sm font-semibold">{lang === "vi" ? v.ruleVi : v.rule}</p>
                    <div className="mt-2 space-y-1.5">
                      {v.examples.map((ex, i) => (
                        <div key={i} className="text-xs bg-secondary/40 p-2 rounded">
                          <button onClick={() => speakFi(ex.infinitive)} className="font-semibold hover:text-[#003580] inline-flex items-center gap-1">
                            <Volume2 className="w-3 h-3" />{ex.infinitive}
                          </button>
                          <span className="text-muted-foreground"> → minä {ex.minä}, sinä {ex.sinä}, hän {ex.hän}</span>
                          <p className="text-muted-foreground mt-0.5">{lang === "vi" ? ex.meaningVi : ex.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* KPT */}
            <section>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h2 className="text-2xl font-bold">🔄 KPT — {t("Biến đổi phụ âm", "Consonant Gradation")}</h2>
                <Button variant="outline" size="sm" onClick={() => saveToNotebook(
                  "KPT Consonant Gradation",
                  KPT_PAIRS.map(k => `${k.strong} → ${k.weak}: ${k.example} (${k.meaning})`).join("\n")
                )}>
                  <NotebookPen className="w-4 h-4 mr-1" /> {t("Lưu", "Save")}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: 600 }}>
                  <thead className="bg-secondary">
                    <tr>
                      <th className="p-2 text-left">Strong</th><th className="p-2 text-left">Weak</th>
                      <th className="p-2 text-left">Example</th><th className="p-2 text-left">{t("Nghĩa", "Meaning")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KPT_PAIRS.map((k, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 font-bold text-[#003580]">{k.strong}</td>
                        <td className="p-2 font-bold text-sky-600">{k.weak}</td>
                        <td className="p-2 font-mono">{k.example}</td>
                        <td className="p-2 text-muted-foreground">{lang === "vi" ? k.meaningVi : k.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Partitive */}
            <section>
              <h2 className="text-2xl font-bold mb-3">🎯 Partitive — {t("Cách bộ phận", "Partitive Case")}</h2>
              <div className="grid md:grid-cols-3 gap-3">
                {PARTITIVE_CASES.map((p, i) => (
                  <Card key={i} className="p-4">
                    <Badge variant="secondary" className="mb-2 font-mono">{p.ending}</Badge>
                    <p className="text-sm font-semibold mb-2">{lang === "vi" ? p.triggerVi : p.trigger}</p>
                    <div className="space-y-1.5">
                      {p.examples.map((ex, j) => (
                        <div key={j} className="text-xs">
                          <button onClick={() => speakFi(ex.fi)} className="font-medium hover:text-[#003580] inline-flex items-center gap-1">
                            <Volume2 className="w-3 h-3" />{ex.fi}
                          </button>
                          <p className="text-muted-foreground">{lang === "vi" ? ex.vi : ex.en}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* PHRASES */}
          <TabsContent value="phrases" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">💬 {t("Câu giao tiếp hàng ngày", "Daily Conversation Phrases")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DAILY_PHRASES.map((p, i) => (
                <Card key={i} className="p-4 flex items-center gap-3 hover:border-[#003580]/40 transition-all">
                  <div className="text-3xl">{p.illustration}</div>
                  <div className="flex-1 min-w-0">
                    <button onClick={() => speakFi(p.fi)} className="font-bold hover:text-[#003580] inline-flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />{p.fi}
                    </button>
                    <p className="text-xs text-muted-foreground">{lang === "vi" ? p.vi : p.en}</p>
                    <Badge variant="outline" className="mt-1 text-[10px]">{p.category}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* VOCAB — illustration on the right */}
          <TabsContent value="vocab" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">🖼️ {t("Từ vựng có hình minh họa", "Visual Vocabulary")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {BEGINNER_VOCAB.map((v, i) => (
                <Card key={i} className="p-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <button onClick={() => speakFi(v.fi)} className="font-bold text-lg hover:text-[#003580] inline-flex items-center gap-1">
                      <Volume2 className="w-4 h-4" />{v.fi}
                    </button>
                    <p className="text-sm text-muted-foreground">{lang === "vi" ? v.vi : v.en}</p>
                    <Badge variant="outline" className="mt-1 text-[10px]">{v.category}</Badge>
                  </div>
                  <div className="text-5xl shrink-0">{v.illustration}</div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PITFALLS */}
          <TabsContent value="pitfalls" className="mt-6">
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              {t("Lỗi sai thường gặp của người Việt", "Common Pitfalls for Vietnamese Learners")}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {t("Đúc kết từ 5+ năm kinh nghiệm dạy người Việt học tiếng Phần Lan của Thầy Hải.", "Distilled from Teacher Hai's 5+ years teaching Finnish to Vietnamese students.")}
            </p>
            <div className="space-y-3">
              {VIETNAMESE_PITFALLS.map((p, i) => (
                <Card key={i} className="p-5 border-l-4 border-l-amber-500 bg-amber-500/5">
                  <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">❌ {p.mistake}</h3>
                  <p className="text-sm mb-2"><span className="font-semibold">{t("Vì sao", "Why")}:</span> {p.why}</p>
                  <p className="text-sm mb-2"><span className="font-semibold text-emerald-600">✅ {t("Đúng", "Correct")}:</span> {p.correct}</p>
                  <p className="text-sm bg-emerald-500/10 p-2 rounded"><span className="font-semibold">💡 {t("Mẹo", "Tip")}:</span> {p.tip}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* QUIZ */}
          <TabsContent value="quiz" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">✏️ {t("Bài kiểm tra cơ bản", "Basic Quiz")}</h2>
            <div className="space-y-4">
              {BEGINNER_QUIZ.map((q, qi) => (
                <Card key={qi} className="p-5">
                  <p className="font-semibold mb-3">{qi + 1}. {lang === "vi" ? q.questionVi : q.question}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const picked = quizAnswers[qi] === oi;
                      const right = quizSubmitted && oi === q.answer;
                      const wrong = quizSubmitted && picked && oi !== q.answer;
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))}
                          className={`text-left p-3 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                            right ? "border-emerald-500 bg-emerald-500/10"
                              : wrong ? "border-red-500 bg-red-500/10"
                              : picked ? "border-[#003580] bg-[#003580]/10"
                              : "border-border hover:border-[#003580]/40"
                          }`}
                        >
                          {right && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {wrong && <XCircle className="w-4 h-4 text-red-500" />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-xs text-muted-foreground mt-3 italic">💬 {lang === "vi" ? q.explanationVi : q.explanation}</p>
                  )}
                </Card>
              ))}
              {!quizSubmitted ? (
                <Button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < BEGINNER_QUIZ.length} className="bg-[#003580] hover:bg-[#003580]/90">
                  {t("Nộp bài", "Submit")}
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                  {t("Làm lại", "Retry")}
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default FinnishBeginner;
