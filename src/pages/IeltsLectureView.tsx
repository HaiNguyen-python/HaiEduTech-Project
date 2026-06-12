// IELTS Lecture Detail View - Rich content with strategy steps, vocab highlighter, quiz, cheat sheet
import { useState, useMemo } from "react";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIeltsLectureProgress } from "@/hooks/useIeltsLectureProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft, CheckCircle, XCircle, RotateCcw, Download, Star,
  AlertTriangle, Lightbulb, BookOpen, Clock, ArrowRight
} from "lucide-react";
import { allIeltsLectures, PILLAR_META } from "@/data/ieltsLecturesData";
import type { VocabHighlight } from "@/data/ieltsLecturesData";
import { getLectureQuizWithExtras } from "@/data/ieltsLectureQuizExtras";
import IeltsLectureDiagram from "@/components/ielts/IeltsLectureDiagram";
import IeltsLectureExpansionPanel from "@/components/ielts/IeltsLectureExpansionPanel";
import RichTheoryText from "@/components/ielts/RichTheoryText";
import { lectureExpansions } from "@/data/ieltsLectureExpansion";
import SEO from "@/components/SEO";
import { getSpeakingHeroImage } from "@/data/ieltsSpeakingHeroImages";

// Split long example strings into multiple lines when they contain several
// labeled segments like "Situation: '...' Task: '...' Action: '...' Result: '...'".
// Each segment is rendered on its own line with the label bolded so long
// frameworks (STAR, PEEL, Problem/Solution, etc.) are easy to scan.
const renderExampleText = (text: string) => {
  if (!text) return null;
  // Split BEFORE a capitalized "Label[ N]:" that is preceded by a closing
  // quote or period — this is the natural boundary between sub-points.
  const parts = text
    .split(/(?<=['"”’.])\s+(?=[A-Z][A-Za-z]{2,}(?:\s\d+)?(?:\s[A-Z][a-z]+)?:\s*['"“‘])/g)
    .map(s => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return text;
  return (
    <div className="space-y-1.5">
      {parts.map((p, i) => {
        const m = p.match(/^([A-Z][A-Za-z]{2,}(?:\s\d+)?(?:\s[A-Z][a-z]+)?:)\s*(.*)$/);
        if (m) {
          return (
            <div key={i} className="leading-relaxed">
              <span className="font-semibold text-primary">{m[1]}</span>{" "}
              <span>{m[2]}</span>
            </div>
          );
        }
        return <div key={i} className="leading-relaxed">{p}</div>;
      })}
    </div>
  );
};


// Vocab Highlighter component - inline word with click-to-see definition
const VocabWord = ({ vocab }: { vocab: VocabHighlight }) => {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();
  return (
    <span className="relative inline-block">
      <button
        onClick={() => setShow(!show)}
        className="bg-primary/10 text-primary font-semibold px-1.5 py-0.5 rounded cursor-pointer hover:bg-primary/20 transition-colors text-[inherit] border-b-2 border-primary/30"
      >
        {vocab.word}
      </button>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 left-0 top-full mt-1 w-72 bg-card border border-border rounded-lg shadow-xl p-3 text-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-foreground">{vocab.word}</span>
            <Badge variant="outline" className="text-xs">{vocab.band}</Badge>
          </div>
          <p className="text-foreground mb-1">{t(vocab.definitionVi, vocab.definition)}</p>
          <p className="text-muted-foreground text-xs italic">"{vocab.example}"</p>
          <button onClick={() => setShow(false)} className="text-xs text-primary mt-2 hover:underline">
            {t("Đóng", "Close")}
          </button>
        </motion.div>
      )}
    </span>
  );
};

const IeltsLectureView = () => {
  const { lectureId } = useParams();
  const { t } = useLanguage();
  const { completedIds, markCompleted } = useIeltsLectureProgress();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lecture = useMemo(() => allIeltsLectures.find(l => l.id === lectureId), [lectureId]);
  const isCompleted = lecture ? completedIds.includes(lecture.id) : false;

  if (!lecture) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-4">{t("Không tìm thấy bài giảng", "Lecture not found")}</p>
            <Link to="/ielts-lectures">
              <Button variant="outline"><ChevronLeft className="w-4 h-4 mr-1" /> {t("Quay lại", "Go back")}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const pillarMeta = PILLAR_META[lecture.pillar];
  const lectureQuiz = useMemo(() => getLectureQuizWithExtras(lecture.id, lecture.quiz), [lecture.id, lecture.quiz]);
  const quizScore = lectureQuiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.answer ? 1 : 0), 0);

  const handleComplete = () => {
    if (lecture) {
      markCompleted(lecture.id);
      logStudentActivity({
        activityType: "ielts_lecture",
        activityId: lecture.id,
        score: quizSubmitted ? quizScore : 0,
        maxScore: quizSubmitted ? lectureQuiz.length : 1,
        domain: "english",
      });
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const score = lectureQuiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.answer ? 1 : 0), 0);
    logStudentActivity({
      activityType: "ielts_lecture_quiz",
      activityId: lecture.id,
      score,
      maxScore: lectureQuiz.length,
      domain: "english",
    });
  };
  const handleQuizReset = () => { setQuizAnswers({}); setQuizSubmitted(false); };

  // Find next lecture
  const currentIdx = allIeltsLectures.findIndex(l => l.id === lecture.id);
  const nextLecture = currentIdx >= 0 && currentIdx < allIeltsLectures.length - 1
    ? allIeltsLectures[currentIdx + 1] : null;

  // Generate cheat sheet text for download
  const downloadCheatSheet = () => {
    const lines = [
      `IELTS CHEAT SHEET: ${lecture.title}`,
      `${"=".repeat(50)}`,
      "",
      ...lecture.cheatSheetPoints.map((p, i) => `${i + 1}. ${p}`),
      "",
      `Teacher Hai's Golden Secret:`,
      lecture.goldenSecret,
      "",
      `--- Generated by HaiEduTech ---`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cheatsheet-${lecture.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${lecture.title} - IELTS Lecture`}
        description={(lecture.description || lecture.title).slice(0, 158)}
        path={`/ielts-lectures/${lecture.id}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: lecture.title,
          description: (lecture.description || lecture.title).slice(0, 300),
          inLanguage: ["vi-VN", "en-US"],
          learningResourceType: "Lecture",
          educationalLevel: lecture.level || "IELTS",
          provider: { "@type": "Organization", name: "HaiEduTech", url: "https://haiedutech.com" },
        }}
      />
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/english" className="hover:text-primary">{t("Tiếng Anh", "English")}</Link>
            <span>/</span>
            <Link to="/ielts-lectures" className="hover:text-primary">{t("Bài giảng IELTS", "IELTS Lectures")}</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{t(lecture.titleVi, lecture.title)}</span>
          </div>
        </div>

        {/* Lecture Header */}
        <section className="container mx-auto px-4 sm:px-6 py-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${pillarMeta.color} text-white`}>
                {pillarMeta.icon} {t(pillarMeta.labelVi, pillarMeta.label)}
              </span>
              <Badge variant="outline" className="text-xs capitalize">{lecture.level}</Badge>
              {lecture.skill && <Badge variant="outline" className="text-xs capitalize">{lecture.skill}</Badge>}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" /> {lecture.duration}
              </span>
              {isCompleted && (
                <Badge className="bg-green-500/15 text-green-600 text-xs gap-1">
                  <CheckCircle className="w-3 h-3" /> {t("Đã hoàn thành", "Completed")}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {lecture.icon} {t(lecture.titleVi, lecture.title)}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t(lecture.descriptionVi, lecture.description)}
            </p>
            {(() => {
              const hero = getSpeakingHeroImage(lecture);
              if (!hero) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mt-5 rounded-2xl overflow-hidden border border-border shadow-sm bg-gradient-to-br from-rose-500/5 via-background to-pink-500/5"
                >
                  <img
                    src={hero}
                    alt={`${t(lecture.titleVi, lecture.title)} illustration`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-48 sm:h-64 md:h-72 object-cover"
                  />
                </motion.div>
              );
            })()}
          </motion.div>
        </section>

        {/* Main Content Tabs */}
        <section className="container mx-auto px-4 sm:px-6 pb-16">
          <Tabs defaultValue="strategy" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="strategy">📋 {t("Chiến lược", "Strategy")}</TabsTrigger>
              <TabsTrigger value="examples">📝 {t("Ví dụ", "Examples")}</TabsTrigger>
              <TabsTrigger value="vocab">📖 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
              <TabsTrigger value="quiz">✏️ {t("Mini Quiz", "Mini Quiz")}</TabsTrigger>
            </TabsList>

            {/* === STRATEGY TAB === */}
            <TabsContent value="strategy" className="space-y-6">
              {/* SVG diagram (only renders when one exists for this lecture) */}
              <IeltsLectureDiagram lectureId={lecture.id} />

              {/* Step-by-Step Strategy */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  🎯 {t("Chiến lược từng bước", "Step-by-Step Strategy")}
                </h2>
                {lecture.strategySteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </span>
                          <div className="flex-1">
                            <h3 className="text-[18px] font-bold text-foreground mb-1">
                              {t(step.titleVi, step.title)}
                            </h3>
                            <RichTheoryText text={t(step.descriptionVi, step.description)} />

                            {step.example && (
                              <div className="mt-3 bg-muted/50 rounded-lg p-3 text-sm text-foreground border border-border">
                                <div className="font-semibold text-primary mb-1">💡 Example:</div>
                                {renderExampleText(step.example)}
                              </div>
                            )}

                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Mistakes to Avoid */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  {t("Lỗi cần tránh", "Mistakes to Avoid")}
                </h2>
                {lecture.mistakesToAvoid.map((m, i) => (
                  <Card key={i} className="border-l-4 border-l-destructive/50 bg-destructive/5">
                    <CardContent className="p-4">
                      <p className="font-semibold text-foreground text-[16px] mb-1">
                        ❌ {t(m.mistakeVi, m.mistake)}
                      </p>
                      <RichTheoryText text={t(m.whyVi, m.why)} className="text-sm text-muted-foreground" />

                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Extended theory: Band descriptors, common mistakes, paraphrase bank, sample sentences, golden tips */}
              <IeltsLectureExpansionPanel lectureId={lecture.id} />

              {/* Teacher Hai's Golden Secret */}
              <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-300 dark:border-amber-700">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">
                        🌟 {t("Bí quyết vàng của Thầy Hải", "Teacher Hai's Golden Secret")}
                      </h3>
                      <RichTheoryText
                        text={t(lecture.goldenSecretVi, lecture.goldenSecret)}
                        className="text-[16px] leading-relaxed text-amber-900 dark:text-amber-200"
                      />

                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Cheat Sheet */}
              <Button variant="outline" onClick={downloadCheatSheet} className="gap-2">
                <Download className="w-4 h-4" />
                {t("Tải Cheat Sheet", "Download Cheat Sheet")}
              </Button>
            </TabsContent>

            {/* === EXAMPLES TAB === */}
            <TabsContent value="examples" className="space-y-5">
              <h2 className="text-xl font-bold text-foreground">
                📝 {t("Ví dụ thực tế", "Practical Examples")}
              </h2>
              {lecture.practicalExamples.map((ex, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <p className="text-sm font-semibold text-primary mb-2">
                      {t(ex.contextVi, ex.context)}
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 text-[16px] leading-relaxed text-foreground whitespace-pre-line border border-border">
                      {renderExampleText(ex.example)}
                    </div>

                    {ex.answer && (
                      <div className="mt-3 flex items-center gap-2">
                        <Badge className="bg-green-500/15 text-green-600">{t("Đáp án", "Answer")}: {ex.answer}</Badge>
                      </div>
                    )}
                    {ex.explanation && (
                      <p className="text-sm text-muted-foreground mt-2">
                        💬 {ex.explanation}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* === VOCABULARY TAB === */}
            <TabsContent value="vocab" className="space-y-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {t("Từ vựng Band 7.0+", "Band 7.0+ Vocabulary")}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                {t("Nhấn vào từ để xem nghĩa và ví dụ.", "Click on a word to see its definition and example.")}
              </p>

              {/* Vocab as clickable highlight words */}
              <div className="flex flex-wrap gap-3 mb-6">
                {lecture.vocabHighlights.map((v, i) => (
                  <VocabWord key={i} vocab={v} />
                ))}
              </div>

              {/* Full vocabulary list */}
              <div className="space-y-3">
                {lecture.vocabHighlights.map((v, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[18px] font-bold text-foreground">{v.word}</span>
                        <Badge variant="outline" className="text-xs">{v.band}</Badge>
                      </div>
                      <p className="text-[16px] text-foreground mb-1">{t(v.definitionVi, v.definition)}</p>
                      <p className="text-sm text-muted-foreground italic">"{v.example}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* === QUIZ TAB === */}
            <TabsContent value="quiz" className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  ✏️ Mini Practice ({lectureQuiz.length} {t("câu", "questions")})
                </h2>
                {quizSubmitted && (
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${quizScore === lectureQuiz.length ? "text-green-500" : quizScore >= lectureQuiz.length / 2 ? "text-amber-500" : "text-destructive"}`}>
                      {quizScore}/{lectureQuiz.length} {t("đúng", "correct")}
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleQuizReset} className="gap-1">
                      <RotateCcw className="w-3.5 h-3.5" /> {t("Làm lại", "Retry")}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {lectureQuiz.map((q, qi) => (
                  <motion.div
                    key={qi}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qi * 0.08 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-[16px] font-semibold text-foreground mb-3">
                          {qi + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            const selected = quizAnswers[qi] === oi;
                            const isCorrect = q.answer === oi;
                            return (
                              <button
                                key={oi}
                                onClick={() => { if (!quizSubmitted) setQuizAnswers(prev => ({ ...prev, [qi]: oi })); }}
                                className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all border flex items-center gap-2 ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                                      : selected
                                        ? "border-destructive bg-destructive/10 text-destructive"
                                        : "border-border text-muted-foreground"
                                    : selected
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border text-secondary-foreground hover:border-primary/50 hover:bg-primary/5"
                                }`}
                              >
                                {quizSubmitted && isCorrect && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
                                {quizSubmitted && selected && !isCorrect && <XCircle className="w-3.5 h-3.5 shrink-0" />}
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <p className="text-sm text-muted-foreground mt-2">💬 {q.explanation}</p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                <Button onClick={handleQuizSubmit} className="gap-2">
                  {t("Nộp bài", "Submit")}
                </Button>
              )}
            </TabsContent>
          </Tabs>

          {/* Bottom Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 border-t border-border pt-6">
            {!isCompleted ? (
              <Button onClick={handleComplete} size="lg" className="gap-2">
                <CheckCircle className="w-5 h-5" /> {t("Đánh dấu hoàn thành", "Mark as Complete")}
              </Button>
            ) : (
              <Badge className="bg-green-500/15 text-green-600 text-sm px-4 py-2 gap-1.5">
                <CheckCircle className="w-4 h-4" /> {t("Đã hoàn thành bài giảng này", "Lecture completed")}
              </Badge>
            )}
            {nextLecture && (
              <Link to={`/ielts-lectures/${nextLecture.id}`}>
                <Button variant="outline" size="lg" className="gap-2">
                  {t("Bài tiếp theo", "Next Lecture")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsLectureView;
