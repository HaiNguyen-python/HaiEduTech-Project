import { useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, BookOpen, ChevronRight, Globe, Volume2, Pause,
  GraduationCap, MessageCircle, Music, Eye, EyeOff, Lightbulb
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { detailedVFFModules, type DetailedModule, type DetailedLesson, type AnnotatedWord } from "@/data/vietnamese/detailedVietnameseData";
import { vietnameseTones } from "@/data/vietnamese/vietnameseForForeignersData";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";

// Tone color mapping for the tone wave visualizer
const toneColors: Record<string, string> = {
  ngang: "text-blue-500",
  huyen: "text-green-600",
  sac: "text-red-500",
  hoi: "text-amber-500",
  nga: "text-purple-500",
  nang: "text-rose-600",
};

const toneSymbols: Record<string, string> = {
  ngang: "—",
  huyen: "↘",
  sac: "↗",
  hoi: "↘↗",
  nga: "↗̃",
  nang: "↓",
};

// Annotated word component with hover tooltip
const AnnotatedWordSpan = ({ word, showEnglish }: { word: AnnotatedWord; showEnglish: boolean }) => {
  const toneClass = word.tone ? toneColors[word.tone] : "";
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`underline decoration-dotted decoration-primary/40 cursor-help ${toneClass} font-medium`}>
          {word.word}
          {word.tone && (
            <span className="text-[10px] ml-0.5 opacity-60">{toneSymbols[word.tone]}</span>
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="text-sm">
          <p className="font-bold">{word.word} <span className="font-normal text-muted-foreground">/{word.pronunciation}/</span></p>
          <p className="text-primary">{word.meaning}</p>
          {word.literal && <p className="text-xs text-muted-foreground italic">Literal: {word.literal}</p>}
          {word.tone && (
            <p className="text-xs mt-1">
              Tone: <span className={toneClass}>{word.tone} {toneSymbols[word.tone]}</span>
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const VietnameseForForeigners = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const { hasAccess, loading } = useCourseAccess("vietnamese-for-foreigners");

  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakVietnamese = useCallback((text: string, slow = false) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "vi-VN";
    u.rate = slow ? 0.5 : 0.8;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    speechSynthesis.speak(u);
  }, []);

  const pauseSpeech = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Find current module and lesson
  const currentModule = moduleId ? detailedVFFModules.find(m => m.id === moduleId) : null;
  const currentLesson = currentModule && lessonId ? currentModule.lessons.find(l => l.id === lessonId) : null;

  // ═══════════════════════════════════════════════
  // LESSON DETAIL VIEW
  // ═══════════════════════════════════════════════
  if (currentLesson && currentModule) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Back & bilingual toggle header */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back to Dashboard")}
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{showEnglish ? "🇬🇧 EN visible" : "🇻🇳 Immersion"}</span>
                <Switch checked={showEnglish} onCheckedChange={setShowEnglish} />
                {showEnglish ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Lesson header */}
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{currentLesson.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{currentLesson.titleEn}</h1>
                  <p className="text-muted-foreground italic text-sm">{currentLesson.title}</p>
                </div>
              </div>
              <Card className="p-3 bg-muted/30 mb-6 mt-3">
                <p className="text-sm text-foreground">
                  📍 <strong>Scenario:</strong> {showEnglish ? currentLesson.scenarioEn : currentLesson.scenario}
                </p>
              </Card>

              {/* 4-Step Tabbed View */}
              <Tabs defaultValue="dialogue" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="dialogue" className="text-xs sm:text-sm gap-1">
                    💬 {t("Hội thoại", "Dialogue")}
                  </TabsTrigger>
                  <TabsTrigger value="grammar" className="text-xs sm:text-sm gap-1">
                    📝 {t("Ngữ pháp", "Grammar")}
                  </TabsTrigger>
                  <TabsTrigger value="culture" className="text-xs sm:text-sm gap-1">
                    🎭 {t("Văn hóa", "Culture")}
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="text-xs sm:text-sm gap-1">
                    ✅ {t("Luyện tập", "Practice")}
                  </TabsTrigger>
                </TabsList>

                {/* STEP 1: Dialogue */}
                <TabsContent value="dialogue">
                  <div className="space-y-1 mb-6">
                    {/* Audio controls */}
                    <div className="flex gap-2 mb-4">
                      <Button size="sm" variant="outline" onClick={() => speakVietnamese(currentLesson.dialogue.map(d => d.vi).join(". "))} className="gap-1">
                        <Volume2 className="w-3 h-3" /> Normal Speed
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => speakVietnamese(currentLesson.dialogue.map(d => d.vi).join(". "), true)} className="gap-1">
                        <Volume2 className="w-3 h-3" /> 🐢 Slow Speed
                      </Button>
                      {isSpeaking && (
                        <Button size="sm" variant="destructive" onClick={pauseSpeech} className="gap-1">
                          <Pause className="w-3 h-3" /> Pause
                        </Button>
                      )}
                    </div>

                    {currentLesson.dialogue.map((line, i) => {
                      const isYou = line.speaker === "You" || line.speaker === "You (phone)";
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: isYou ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className={`flex gap-3 mb-5 ${isYou ? "justify-end" : "justify-start"}`}
                        >
                          {!isYou && (
                            <div className="shrink-0 flex flex-col items-center gap-1">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-primary">
                                {line.speakerLabel.charAt(0)}
                              </div>
                              <span className="text-[10px] text-muted-foreground font-medium max-w-[56px] text-center leading-tight">{line.speakerLabel}</span>
                            </div>
                          )}
                          <div className={`max-w-[75%] rounded-2xl p-4 ${isYou ? "bg-muted/60" : "bg-primary/10"}`}>
                            {/* Vietnamese text with annotated keywords */}
                            <p className="text-foreground font-semibold text-base leading-relaxed">
                              {line.keyWords ? renderAnnotatedText(line.vi, line.keyWords, showEnglish) : line.vi}
                            </p>
                            {/* English translation */}
                            {showEnglish && (
                              <p className="text-muted-foreground text-sm mt-1.5">{line.en}</p>
                            )}
                            {/* Literal translation */}
                            {showEnglish && line.literal && (
                              <p className="text-sm text-muted-foreground/60 italic mt-1">💡 {line.literal}</p>
                            )}
                            <Button variant="ghost" size="sm" className="h-6 text-xs mt-2 px-1.5" onClick={() => speakVietnamese(line.vi)}>
                              <Volume2 className="w-3.5 h-3.5 mr-1" /> Nghe
                            </Button>
                          </div>
                          {isYou && (
                            <div className="shrink-0 flex flex-col items-center gap-1">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-muted-foreground">
                                {line.speakerLabel.charAt(0)}
                              </div>
                              <span className="text-[10px] text-muted-foreground font-medium max-w-[56px] text-center leading-tight">{line.speakerLabel}</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Tone Highlights */}
                  {currentLesson.toneHighlights && currentLesson.toneHighlights.length > 0 && (
                    <Card className="p-4 mt-4">
                      <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                        <Music className="w-4 h-4 text-primary" /> Tone Highlights in This Dialogue
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentLesson.toneHighlights.map((th, i) => (
                          <div
                            key={i}
                            className="bg-muted/50 rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors"
                            onClick={() => speakVietnamese(th.word)}
                          >
                            <span className={`font-bold ${th.tone ? toneColors[th.tone] : ""}`}>
                              {th.word} {th.tone ? toneSymbols[th.tone] : ""}
                            </span>
                            <span className="text-xs text-muted-foreground">= {th.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </TabsContent>

                {/* STEP 2: Grammar */}
                <TabsContent value="grammar">
                  <div className="space-y-6">
                    {currentLesson.grammarPoints.map((gp, i) => (
                      <Card key={i} className="p-5">
                        <h3 className="font-bold text-foreground mb-1">📐 {gp.patternEn}</h3>
                        <p className="text-sm text-primary italic mb-3">{gp.pattern}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {showEnglish ? gp.explanationEn : gp.explanation}
                        </p>
                        <div className="space-y-2">
                          {gp.examples.map((ex, j) => (
                            <div key={j} className="bg-muted/30 rounded-lg p-3 flex items-start gap-3">
                              <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7" onClick={() => speakVietnamese(ex.vi)}>
                                <Volume2 className="w-3 h-3" />
                              </Button>
                              <div>
                                <p className="text-sm font-medium text-foreground">{ex.vi}</p>
                                {showEnglish && <p className="text-xs text-muted-foreground">{ex.en}</p>}
                                {showEnglish && ex.literal && <p className="text-xs text-muted-foreground/60 italic">💡 {ex.literal}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* STEP 3: Culture */}
                <TabsContent value="culture">
                  <div className="space-y-4">
                    {currentLesson.culturalNotes.map((cn, i) => (
                      <Card key={i} className="p-5">
                        <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          {showEnglish ? cn.titleEn : cn.title}
                        </h3>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <p className="text-sm text-foreground leading-relaxed">
                            {showEnglish ? cn.contentEn : cn.content}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* STEP 4: Practice */}
                <TabsContent value="practice">
                  <PracticeSection practice={currentLesson.practice} showEnglish={showEnglish} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ═══════════════════════════════════════════════
  // DASHBOARD VIEW
  // ═══════════════════════════════════════════════
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
              {t("Chương trình song ngữ Việt-Anh — từ con số 0 đến giao tiếp thành thạo", "A bilingual Vietnamese-English course — from zero to confident communication")}
            </p>
          </motion.div>

          {/* Tone Guide */}
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
                    <div className={`w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center`}>
                      <span className="text-xl font-bold text-primary">{tone.mark}</span>
                      <span className={`text-[10px] ${toneColors[tone.id] || "text-primary"}`}>{toneSymbols[tone.id]}</span>
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

          {/* Course modules grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {detailedVFFModules.map((mod, idx) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
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
                          if (!hasAccess && !loading) { setShowAccessDenied(true); return; }
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

// Helper: render Vietnamese text with annotated keywords as hoverable spans
function renderAnnotatedText(text: string, keyWords: AnnotatedWord[], showEnglish: boolean) {
  if (!keyWords || keyWords.length === 0) return text;

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  // Sort keywords by position in text (first occurrence)
  const sorted = [...keyWords].sort((a, b) => text.indexOf(a.word) - text.indexOf(b.word));

  for (const kw of sorted) {
    const idx = remaining.indexOf(kw.word);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push(<span key={`t-${keyIndex}`}>{remaining.slice(0, idx)}</span>);
    }
    parts.push(<AnnotatedWordSpan key={`k-${keyIndex}`} word={kw} showEnglish={showEnglish} />);
    remaining = remaining.slice(idx + kw.word.length);
    keyIndex++;
  }

  if (remaining) {
    parts.push(<span key="rest">{remaining}</span>);
  }

  return <>{parts}</>;
}

// Practice section component
const PracticeSection = ({ practice, showEnglish }: { practice: any; showEnglish: boolean }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div>
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        ✏️ {showEnglish ? practice.instructionEn : practice.instruction}
      </h3>
      <div className="space-y-4">
        {practice.items.map((item: any, i: number) => (
          <Card key={i} className="p-4">
            <p className="text-sm font-medium text-foreground mb-2">
              {i + 1}. {showEnglish && item.questionEn ? item.questionEn : item.question}
            </p>
            {practice.type === "fill-blank" && (
              <input
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder={showEnglish ? "Type your answer..." : "Nhập câu trả lời..."}
                value={answers[i] || ""}
                onChange={(e) => !submitted && setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                disabled={submitted}
              />
            )}
            {practice.type === "reorder" && (
              <input
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder={showEnglish ? "Reorder the words..." : "Sắp xếp lại..."}
                value={answers[i] || ""}
                onChange={(e) => !submitted && setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                disabled={submitted}
              />
            )}
            {practice.type === "match" && (
              <input
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder={showEnglish ? "Type the meaning..." : "Nhập nghĩa..."}
                value={answers[i] || ""}
                onChange={(e) => !submitted && setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                disabled={submitted}
              />
            )}
            {submitted && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                <p className="text-sm">
                  ✅ <strong>Answer:</strong>{" "}
                  <span className="text-primary font-medium">{typeof item.answer === "string" ? item.answer : item.options?.[item.answer]}</span>
                </p>
                {item.explanationEn && showEnglish && (
                  <p className="text-xs text-muted-foreground mt-1">💡 {item.explanationEn}</p>
                )}
                {item.explanation && !showEnglish && (
                  <p className="text-xs text-muted-foreground mt-1">💡 {item.explanation}</p>
                )}
              </motion.div>
            )}
          </Card>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={Object.keys(answers).length === 0}>
            ✅ {showEnglish ? "Check Answers" : "Kiểm tra"}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleReset}>
            🔄 {showEnglish ? "Try Again" : "Thử lại"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VietnameseForForeigners;
