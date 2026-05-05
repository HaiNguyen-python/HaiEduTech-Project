/**
 * @file YkiB1Dashboard.tsx
 * @description YKI B1 (Keskitaso) prep dashboard with timer, 4 skills, word of the day.
 * @author Teacher Hai (HaiEduTech)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Volume2, Timer, Mic, Pause, Play, RotateCcw, NotebookPen, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { playFinnishTts, pauseFinnishTts, resumeFinnishTts, stopFinnishTts } from "@/lib/finnishTts";
import ClickableFinnishText from "@/components/ClickableFinnishText";
import {
  B1_READING_ALL as B1_READING,
  B1_LISTENING_ALL as B1_LISTENING,
  B1_WRITING_ALL as B1_WRITING,
  B1_SPEAKING_ALL as B1_SPEAKING,
  getWordOfTheDay,
} from "@/data/ykiB1Data";

// Use Finnish TTS pipeline (proxy → Google translate_tts → native fi-FI voice)
// to guarantee proper Finnish pronunciation, not the system's English fallback voice.
const speakFi = (text: string, rate = 0.9) => {
  void playFinnishTts(text, { playbackRate: rate, speechRate: rate });
};

const saveToNotebook = async (title: string, content: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to save notes.", variant: "destructive" });
      return;
    }
    await supabase.from("student_notebooks").insert({ user_id: user.id, title, content, subject: "finnish-yki-b1" });
    toast({ title: "✅ Saved to Notebook", description: title });
  } catch {
    toast({ title: "Save failed", variant: "destructive" });
  }
};

/* Section timer with pause/resume + auto-resume on tab refocus */
const SectionTimer = ({ minutes }: { minutes: number }) => {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft(s => (s <= 1 ? (setRunning(false), 0) : s - 1));
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  return (
    <div className="flex items-center gap-2">
      <Timer className="w-4 h-4 text-[#003580]" />
      <span className={`font-mono font-bold text-lg ${secondsLeft <= 30 ? "text-red-500 animate-pulse" : "text-foreground"}`}>{mm}:{ss}</span>
      {!running ? (
        <Button size="sm" variant="outline" onClick={() => setRunning(true)}><Play className="w-3 h-3" /></Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setRunning(false)}><Pause className="w-3 h-3" /></Button>
      )}
      <Button size="sm" variant="ghost" onClick={() => { setRunning(false); setSecondsLeft(minutes * 60); }}>
        <RotateCcw className="w-3 h-3" />
      </Button>
    </div>
  );
};

const YkiB1Dashboard = () => {
  const { t, lang } = useLanguage();
  const word = getWordOfTheDay();
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number>>({});
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [showScript, setShowScript] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [pausedId, setPausedId] = useState<string | null>(null);
  const [translateMode, setTranslateMode] = useState(false);
  const [essay, setEssay] = useState("");
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeWriting, setActiveWriting] = useState(B1_WRITING[0]);

  const gradeEssay = async () => {
    if (essay.trim().split(/\s+/).length < 30) {
      toast({ title: t("Bài quá ngắn", "Too short"), description: t("Viết ít nhất 30 từ.", "Write at least 30 words."), variant: "destructive" });
      return;
    }
    setGrading(true); setFeedback(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-writing", {
        body: { essay, prompt: activeWriting.promptFi, taskType: 2, language: "finnish", level: "B1" },
      });
      if (error) throw error;
      setFeedback(typeof data === "string" ? data : JSON.stringify(data?.feedback || data, null, 2));
    } catch (e) {
      setFeedback(t("Không kết nối được AI. Thử lại sau.", "Could not reach AI grader. Try again."));
    } finally {
      setGrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl pt-24">
        <Link to="/finnish" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại Finnish Hub", "Back to Finnish Hub")}
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Badge className="bg-[#003580] text-white mb-3">B1 · Keskitaso</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#003580] to-sky-500 bg-clip-text text-transparent">
            {t("Bảng điều khiển luyện thi YKI B1", "YKI B1 Dashboard")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            {t(
              "Luyện 4 kỹ năng theo chuẩn YKI Keskitaso. Đắm mình trong tiếng Phần Lan - gợi ý tiếng Việt chỉ hiện khi bạn cần.",
              "Train all 4 skills aligned with YKI Keskitaso. Immerse in Finnish - Vietnamese hints only appear if you ask."
            )}
          </p>
        </motion.div>

        {/* Word of the Day */}
        <Card className="p-5 mb-8 bg-gradient-to-r from-[#003580]/10 to-sky-500/10 border-[#003580]/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#003580]" />
            <h2 className="font-bold">{t("Từ vựng B1 mỗi ngày", "YKI Word of the Day")}</h2>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <button onClick={() => speakFi(word.fi)} className="text-3xl font-bold text-[#003580] hover:underline inline-flex items-center gap-2">
              <Volume2 className="w-5 h-5" />{word.fi}
            </button>
            <Badge variant="outline">{word.partOfSpeech}</Badge>
            <span className="text-sm text-muted-foreground">{lang === "vi" ? word.meaningVi : word.meaningEn}</span>
          </div>
          <p className="text-sm mt-2 italic">"{word.exampleFi}" - <span className="text-muted-foreground">{word.exampleEn}</span></p>
          <Button size="sm" variant="outline" className="mt-3" onClick={() => saveToNotebook(`B1 Word: ${word.fi}`, `${word.fi} (${word.partOfSpeech}) - ${word.meaningEn}\nVi: ${word.meaningVi}\nEx: ${word.exampleFi} = ${word.exampleEn}`)}>
            <NotebookPen className="w-3 h-3 mr-1" /> {t("Lưu vào Sổ tay", "Save to Notebook")}
          </Button>
        </Card>

        <Tabs defaultValue="reading" className="w-full">
          <TabsList className="w-full flex-wrap h-auto justify-start">
            <TabsTrigger value="reading">📖 {t("Đọc", "Reading")}</TabsTrigger>
            <TabsTrigger value="listening">🎧 {t("Nghe", "Listening")}</TabsTrigger>
            <TabsTrigger value="writing">✍️ {t("Viết", "Writing")}</TabsTrigger>
            <TabsTrigger value="speaking">🎤 {t("Nói", "Speaking")}</TabsTrigger>
          </TabsList>

          {/* READING */}
          <TabsContent value="reading" className="mt-6 space-y-5">
            {/* Translate-on-click toggle */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-3 rounded-lg bg-[#003580]/5 border border-[#003580]/15">
              <p className="text-sm">
                <span className="font-semibold text-[#003580]">🌍 {t("Chế độ dịch từ", "Word translation mode")}:</span>{" "}
                <span className="text-muted-foreground">
                  {t(
                    "Bật để bấm vào bất kỳ từ tiếng Phần nào trong bài đọc và xem nghĩa tiếng Anh.",
                    "Turn on to click any Finnish word in a passage and see its English meaning."
                  )}
                </span>
              </p>
              <Button
                size="sm"
                variant={translateMode ? "default" : "outline"}
                className={translateMode ? "bg-[#003580] hover:bg-[#003580]/90" : ""}
                onClick={() => setTranslateMode((v) => !v)}
              >
                {translateMode ? t("✓ Đang bật", "✓ ON") : t("Bật dịch EN", "Enable EN translation")}
              </Button>
            </div>

            {B1_READING.map(p => (
              <Card key={p.id} className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div>
                    <Badge variant="secondary" className="mb-1 capitalize">{p.type}</Badge>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                  </div>
                  <SectionTimer minutes={p.timeMinutes} />
                </div>
                {translateMode ? (
                  <div className="text-foreground/90 mb-3 p-3 bg-secondary/30 rounded">
                    <ClickableFinnishText text={p.textFi} />
                  </div>
                ) : (
                  <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed mb-3 p-3 bg-secondary/30 rounded">{p.textFi}</div>
                )}
                {p.hintVi && lang === "vi" && (
                  <details className="text-xs text-muted-foreground mb-3">
                    <summary className="cursor-pointer">💡 Gợi ý tiếng Việt</summary>
                    <p className="mt-1">{p.hintVi}</p>
                  </details>
                )}
                <div className="space-y-3">
                  {p.questions.map((q, qi) => {
                    const key = `${p.id}-${qi}`;
                    const picked = readingAnswers[key];
                    const submitted = showResults[p.id];
                    return (
                      <div key={qi}>
                        <p className="text-sm font-semibold mb-2">{qi + 1}. {q.q}</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            const right = submitted && oi === q.answer;
                            const wrong = submitted && picked === oi && oi !== q.answer;
                            return (
                              <button key={oi}
                                onClick={() => !submitted && setReadingAnswers(prev => ({ ...prev, [key]: oi }))}
                                className={`text-left p-2 rounded border text-sm flex items-center gap-2 ${
                                  right ? "border-emerald-500 bg-emerald-500/10"
                                    : wrong ? "border-red-500 bg-red-500/10"
                                    : picked === oi ? "border-[#003580] bg-[#003580]/10" : "border-border hover:border-[#003580]/40"
                                }`}>
                                {right && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                {wrong && <XCircle className="w-3 h-3 text-red-500" />}
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {submitted && <p className="text-xs text-muted-foreground italic mt-1">💬 {q.explanationFi}</p>}
                      </div>
                    );
                  })}
                </div>
                <Button size="sm" className="mt-3 bg-[#003580] hover:bg-[#003580]/90" onClick={() => setShowResults(prev => ({ ...prev, [p.id]: true }))}>
                  {t("Kiểm tra", "Check answers")}
                </Button>
              </Card>
            ))}
          </TabsContent>

          {/* LISTENING */}
          <TabsContent value="listening" className="mt-6 space-y-5">
            {B1_LISTENING.map(c => (
              <Card key={c.id} className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.scenarioFi}</p>
                  </div>
                  <Button onClick={() => speakFi(c.scriptFi, 0.85)} variant="outline">
                    <Volume2 className="w-4 h-4 mr-1" />{t("Phát audio", "Play audio")}
                  </Button>
                </div>
                <div className="space-y-3">
                  {c.questions.map((q, qi) => {
                    const key = `${c.id}-${qi}`;
                    const picked = listeningAnswers[key];
                    const submitted = showResults[c.id];
                    return (
                      <div key={qi}>
                        <p className="text-sm font-semibold mb-2">{qi + 1}. {q.q}</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            const right = submitted && oi === q.answer;
                            const wrong = submitted && picked === oi && oi !== q.answer;
                            return (
                              <button key={oi}
                                onClick={() => !submitted && setListeningAnswers(prev => ({ ...prev, [key]: oi }))}
                                className={`text-left p-2 rounded border text-sm flex items-center gap-2 ${
                                  right ? "border-emerald-500 bg-emerald-500/10"
                                    : wrong ? "border-red-500 bg-red-500/10"
                                    : picked === oi ? "border-[#003580] bg-[#003580]/10" : "border-border hover:border-[#003580]/40"
                                }`}>
                                {right && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                {wrong && <XCircle className="w-3 h-3 text-red-500" />}
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button size="sm" className="mt-3 bg-[#003580] hover:bg-[#003580]/90" onClick={() => setShowResults(prev => ({ ...prev, [c.id]: true }))}>
                  {t("Kiểm tra", "Check")}
                </Button>
              </Card>
            ))}
          </TabsContent>

          {/* WRITING */}
          <TabsContent value="writing" className="mt-6 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {B1_WRITING.map(w => (
                <Button key={w.id} variant={activeWriting.id === w.id ? "default" : "outline"}
                  className={activeWriting.id === w.id ? "bg-[#003580] hover:bg-[#003580]/90" : ""}
                  onClick={() => { setActiveWriting(w); setEssay(""); setFeedback(null); }}>
                  {w.title}
                </Button>
              ))}
            </div>
            <Card className="p-5">
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1">{activeWriting.title}</h3>
                  <p className="text-sm text-foreground/90">{activeWriting.promptFi}</p>
                  {lang === "vi" && (
                    <details className="text-xs text-muted-foreground mt-1">
                      <summary className="cursor-pointer">💡 Tiếng Việt</summary>
                      <p>{activeWriting.promptVi}</p>
                    </details>
                  )}
                </div>
                <SectionTimer minutes={activeWriting.timeMinutes} />
              </div>

              <h4 className="font-semibold text-sm mb-2">📐 {t("Cấu trúc", "Structure")}</h4>
              <div className="space-y-2 mb-4">
                {activeWriting.structure.map((s, i) => (
                  <div key={i} className="text-sm p-2 bg-secondary/40 rounded">
                    <p className="font-semibold">{s.step} - <span className="text-muted-foreground font-normal">{s.stepFi}</span></p>
                    <p className="text-xs italic text-foreground/80 mt-0.5">{s.example}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-sm mb-2">💬 {t("Cụm từ hữu ích", "Useful phrases")}</h4>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeWriting.phrases.map((ph, i) => (
                  <button key={i} onClick={() => setEssay(e => e + (e ? " " : "") + ph.fi)}
                    className="text-xs px-2 py-1 rounded bg-[#003580]/10 hover:bg-[#003580]/20 border border-[#003580]/20" title={ph.meaning}>
                    {ph.fi}
                  </button>
                ))}
              </div>

              <Card className="p-3 bg-emerald-500/10 border-emerald-500/30 mb-4">
                <p className="text-sm font-semibold mb-1">🎓 Teacher Hai's Tip</p>
                <p className="text-sm">{lang === "vi" ? activeWriting.teacherTipVi : activeWriting.teacherTipFi}</p>
              </Card>

              <Textarea value={essay} onChange={e => setEssay(e.target.value)} rows={10}
                placeholder={t(`Viết bài tại đây (tối thiểu ${activeWriting.minWords} từ)…`, `Write here (min ${activeWriting.minWords} words)…`)}
                className="mb-2" />
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                <span>{essay.trim().split(/\s+/).filter(Boolean).length} / {activeWriting.minWords} {t("từ", "words")}</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button onClick={gradeEssay} disabled={grading} className="bg-[#003580] hover:bg-[#003580]/90">
                  {grading ? t("Đang chấm…", "Grading…") : t("AI Chấm bài", "AI Grade")}
                </Button>
                <Button variant="outline" onClick={() => saveToNotebook(`YKI B1 - ${activeWriting.title}`, essay)}>
                  <NotebookPen className="w-4 h-4 mr-1" /> {t("Lưu vào Sổ tay", "Save to Notebook")}
                </Button>
              </div>

              {feedback && (
                <Card className="mt-4 p-4 bg-secondary/30">
                  <h4 className="font-semibold mb-2">📋 {t("Phản hồi từ AI", "AI Feedback")}</h4>
                  <pre className="text-xs whitespace-pre-wrap font-sans">{feedback}</pre>
                </Card>
              )}
            </Card>
          </TabsContent>

          {/* SPEAKING */}
          <TabsContent value="speaking" className="mt-6 space-y-4">
            {B1_SPEAKING.map(s => (
              <Card key={s.id} className="p-5">
                <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="text-sm text-foreground/90 mt-1">{s.scenarioFi}</p>
                    {lang === "vi" && <p className="text-xs text-muted-foreground italic mt-1">💡 {s.scenarioVi}</p>}
                  </div>
                  <SectionTimer minutes={s.timeMinutes} />
                </div>
                <p className="text-sm font-semibold mb-2">📋 {t("Nhiệm vụ", "Task")}: <span className="font-normal">{s.taskFi}</span></p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.hintsFi.map((h, i) => (
                    <button key={i} onClick={() => speakFi(h)}
                      className="text-xs px-2 py-1 rounded bg-[#003580]/10 hover:bg-[#003580]/20 border border-[#003580]/20 inline-flex items-center gap-1">
                      <Volume2 className="w-3 h-3" />{h}
                    </button>
                  ))}
                </div>
                <Link to={s.speakingCoachLink}>
                  <Button className="bg-[#003580] hover:bg-[#003580]/90">
                    <Mic className="w-4 h-4 mr-1" /> {t("Mở AI Speaking Coach", "Open AI Speaking Coach")}
                  </Button>
                </Link>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default YkiB1Dashboard;
