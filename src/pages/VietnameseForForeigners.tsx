import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, BookOpen, ChevronRight, Globe, Volume2,
  GraduationCap, MessageCircle, Music, Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vffModules, vietnameseTones, type VFFModule, type VFFLesson } from "@/data/vietnamese/vietnameseForForeignersData";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";

const VietnameseForForeigners = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const { hasAccess, loading } = useCourseAccess("vietnamese-for-foreigners");

  const speakVietnamese = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "vi-VN";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  };

  // Lesson detail view
  const currentModule = moduleId ? vffModules.find(m => m.id === moduleId) : null;
  const currentLesson = currentModule && lessonId ? currentModule.lessons.find(l => l.id === lessonId) : null;

  if (currentLesson && currentModule) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link to={`/learn-vietnamese/for-foreigners`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back to Dashboard")}
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentLesson.icon}</span>
                <h1 className="text-2xl font-bold text-foreground">{currentLesson.titleEn}</h1>
              </div>
              <p className="text-muted-foreground italic mb-6">{currentLesson.title}</p>

              {/* Objectives */}
              <Card className="p-5 mb-6">
                <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  {t("Mục tiêu bài học", "Learning Objectives")}
                </h2>
                <ul className="space-y-1">
                  {(lang === "vi" ? currentLesson.objectives : currentLesson.objectivesEn).map((obj, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span> {obj}
                    </li>
                  ))}
                </ul>
              </Card>

              <Tabs defaultValue="vocabulary" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="vocabulary" className="text-xs sm:text-sm">📝 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
                  <TabsTrigger value="dialogue" className="text-xs sm:text-sm">💬 {t("Hội thoại", "Dialogue")}</TabsTrigger>
                  <TabsTrigger value="culture" className="text-xs sm:text-sm">🎭 {t("Văn hóa", "Culture")}</TabsTrigger>
                  <TabsTrigger value="quiz" className="text-xs sm:text-sm">✅ {t("Bài tập", "Quiz")}</TabsTrigger>
                </TabsList>

                {/* Vocabulary */}
                <TabsContent value="vocabulary">
                  <div className="space-y-3">
                    {currentLesson.vocabulary.map((v, i) => (
                      <Card key={i} className="p-4 flex items-start gap-4">
                        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => speakVietnamese(v.word)}>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-foreground text-lg">{v.word}</span>
                            <span className="text-xs text-muted-foreground">/{v.pronunciation}/</span>
                          </div>
                          <p className="text-sm text-primary font-medium">{v.meaning}</p>
                          <div className="mt-1 text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-1">
                            <span>🇻🇳 {v.example}</span>
                            <span>🇬🇧 {v.exampleEn}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Dialogue */}
                <TabsContent value="dialogue">
                  <Card className="p-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      {t("Hội thoại mẫu", "Sample Dialogue")}
                    </h3>
                    <div className="space-y-4">
                      {currentLesson.dialogues.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: line.speaker === "A" || line.speaker === "Student" || line.speaker === "Tourist" || line.speaker === "Customer" ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className={`flex gap-3 ${["B", "Teacher", "Local", "Vendor", "Waiter"].includes(line.speaker) ? "flex-row-reverse text-right" : ""}`}
                        >
                          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${["B", "Teacher", "Local", "Vendor", "Waiter"].includes(line.speaker) ? "bg-primary" : "bg-muted-foreground"}`}>
                            {line.speaker[0]}
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                            <p className="text-foreground font-medium">{line.vi}</p>
                            <p className="text-sm text-muted-foreground mt-1">{line.en}</p>
                            <Button variant="ghost" size="sm" className="mt-1 h-6 text-xs" onClick={() => speakVietnamese(line.vi)}>
                              <Volume2 className="w-3 h-3 mr-1" /> {t("Nghe", "Listen")}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Culture note */}
                <TabsContent value="culture">
                  <Card className="p-6">
                    <h3 className="font-bold text-foreground mb-3">🎭 {t("Ghi chú văn hóa", "Cultural Note")}</h3>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-foreground">{t(currentLesson.culturalNote, currentLesson.culturalNoteEn)}</p>
                    </div>
                  </Card>
                </TabsContent>

                {/* Quiz */}
                <TabsContent value="quiz">
                  <QuizSection questions={currentLesson.quiz} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Globe className="w-8 h-8 text-blue-500" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t("Tiếng Việt cho Người Nước Ngoài", "Vietnamese for Foreigners")}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("Chương trình học tiếng Việt dành cho người nước ngoài — từ con số 0", "A complete Vietnamese course for international learners — starting from zero")}
            </p>
          </motion.div>

          {/* Tone Guide Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                {t("6 Thanh điệu Tiếng Việt", "The 6 Vietnamese Tones")} 🎵
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {t("Thanh điệu rất quan trọng! Cùng một từ 'ma' có 6 nghĩa khác nhau.", "Tones are crucial! The same syllable 'ma' has 6 different meanings.")}
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {vietnameseTones.map(tone => (
                  <div
                    key={tone.id}
                    className="bg-muted/50 rounded-lg p-3 flex items-center gap-3 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => speakVietnamese(tone.example.split(" ")[0])}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl font-bold text-primary">
                      {tone.mark}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{tone.nameEn}</p>
                      <p className="text-xs text-muted-foreground">{tone.example}</p>
                      <p className="text-xs text-muted-foreground">{t(tone.description, tone.descriptionEn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Course modules */}
          <div className="grid md:grid-cols-2 gap-6">
            {vffModules.map((mod, idx) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`bg-gradient-to-r ${mod.color} p-4`}>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-2xl">{mod.icon}</span>
                      <div>
                        <h3 className="font-bold">{mod.titleEn}</h3>
                        <p className="text-xs opacity-80">{mod.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">{t(mod.description, mod.descriptionEn)}</p>
                    {mod.lessons.map(lesson => (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          if (!hasAccess && !loading) {
                            setShowAccessDenied(true);
                            return;
                          }
                          navigate(`/learn-vietnamese/for-foreigners/${mod.id}/${lesson.id}`);
                        }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors mb-2 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>{lesson.icon}</span>
                          <div>
                            <span className="text-sm font-medium text-foreground block">{lesson.titleEn}</span>
                            <span className="text-xs text-muted-foreground">{lesson.title}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <AccessDeniedModal open={showAccessDenied} onOpenChange={setShowAccessDenied} />
    </div>
  );
};

// Simple quiz component
const QuizSection = ({ questions }: { questions: { question: string; questionEn: string; options: string[]; answer: number }[] }) => {
  const { lang } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted ? questions.filter((q, i) => answers[i] === q.answer).length : 0;

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <Card key={qi} className="p-4">
          <p className="font-medium text-foreground mb-3">{qi + 1}. {lang === "vi" ? q.question : q.questionEn}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, oi) => (
              <Button
                key={oi}
                variant={answers[qi] === oi ? (submitted ? (oi === q.answer ? "default" : "destructive") : "default") : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => !submitted && setAnswers(prev => ({ ...prev, [qi]: oi }))}
              >
                {opt}
              </Button>
            ))}
          </div>
        </Card>
      ))}
      {!submitted ? (
        <Button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}>
          ✅ Submit
        </Button>
      ) : (
        <Card className="p-4 text-center">
          <p className="font-bold text-foreground">Score: {score}/{questions.length}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => { setAnswers({}); setSubmitted(false); }}>
            🔄 Try again
          </Button>
        </Card>
      )}
    </div>
  );
};

export default VietnameseForForeigners;
