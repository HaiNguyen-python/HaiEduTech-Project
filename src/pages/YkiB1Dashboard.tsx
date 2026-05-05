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
import { getSpeakingSample } from "@/data/ykiB1SpeakingSamples";
import { B1_VOCAB_MODULES } from "@/data/ykiB1Vocabulary";
import { B1_VOCAB_EXPANSION_MODULES } from "@/data/ykiB1VocabularyExpansion";
import { B1_VOCAB_EXPANSION_MODULES_2 } from "@/data/ykiB1VocabularyExpansion2";
import { B1_GRAMMAR_MODULES } from "@/data/ykiB1Grammar";
import { B1_GRAMMAR_EXPANSION_MODULES } from "@/data/ykiB1GrammarExpansion";

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
            <TabsTrigger value="vocabulary">📚 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
            <TabsTrigger value="grammar">📐 {t("Ngữ pháp", "Grammar")}</TabsTrigger>
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
                  <div className="flex flex-wrap gap-2">
                    {playingId !== c.id || pausedId === c.id ? (
                      <Button
                        onClick={async () => {
                          if (pausedId === c.id) {
                            resumeFinnishTts();
                            setPausedId(null);
                            return;
                          }
                          stopFinnishTts();
                          setPlayingId(c.id);
                          setPausedId(null);
                          await playFinnishTts(c.scriptFi, { playbackRate: 0.85, speechRate: 0.85 });
                          setPlayingId(prev => (prev === c.id ? null : prev));
                          setPausedId(prev => (prev === c.id ? null : prev));
                        }}
                        variant="outline"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {pausedId === c.id ? t("Tiếp tục", "Resume") : t("Phát audio", "Play audio")}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => { pauseFinnishTts(); setPausedId(c.id); }}
                        variant="outline"
                      >
                        <Pause className="w-4 h-4 mr-1" />{t("Tạm dừng", "Pause")}
                      </Button>
                    )}
                    <Button
                      onClick={() => { stopFinnishTts(); setPlayingId(null); setPausedId(null); }}
                      variant="ghost"
                      size="sm"
                    >
                      ⏹ {t("Dừng", "Stop")}
                    </Button>
                    <Button
                      onClick={() => setShowScript(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                      variant="secondary"
                      size="sm"
                    >
                      {showScript[c.id] ? t("Ẩn script", "Hide script") : t("Hiện script", "Show script")}
                    </Button>
                  </div>
                </div>
                {showScript[c.id] && (
                  <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border text-sm whitespace-pre-wrap leading-relaxed">
                    {c.scriptFi}
                  </div>
                )}
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
            {(() => {
              const categorize = (title: string): { key: string; label: string; emoji: string; color: string } => {
                const t = title.toLowerCase();
                if (t.startsWith("mielipide") || t.includes("mielipidekirjoitus")) return { key: "opinion", label: t === "mielipidekirjoitus - opinion text" ? "Mielipide / Opinion" : "Mielipide / Opinion", emoji: "💭", color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30" };
                if (t.startsWith("valitus")) return { key: "complaint", label: "Valitus / Complaint", emoji: "⚠️", color: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30" };
                if (t.includes("virallinen sähköposti") || t.includes("muodollinen sähköposti") || t.includes("virallinen kirje")) return { key: "formal", label: "Virallinen / Formal letter", emoji: "📜", color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30" };
                if (t.includes("sähköposti") || t.includes("viesti")) return { key: "email", label: "Sähköposti / Email", emoji: "📧", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30" };
                if (t.includes("blogi")) return { key: "blog", label: "Blogi / Blog", emoji: "📝", color: "bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/30" };
                if (t.includes("kertomus") || t.includes("kertominen")) return { key: "story", label: "Kertomus / Story", emoji: "📖", color: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30" };
                if (t.includes("suositus")) return { key: "recommend", label: "Suositus / Recommendation", emoji: "👍", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" };
                if (t.includes("uutinen")) return { key: "news", label: "Uutinen / News report", emoji: "📰", color: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30" };
                if (t.includes("henkilökuvaus") || t.includes("henkilo")) return { key: "person", label: "Henkilökuvaus / Describing a person", emoji: "👤", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30" };
                if (t.includes("vertailu")) return { key: "compare", label: "Vertailu / Comparing", emoji: "⚖️", color: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30" };
                return { key: "other", label: "Muu / Other", emoji: "✏️", color: "bg-muted text-muted-foreground border-border" };
              };

              const groups = new Map<string, { meta: ReturnType<typeof categorize>; items: typeof B1_WRITING }>();
              B1_WRITING.forEach(w => {
                const meta = categorize(w.title);
                if (!groups.has(meta.key)) groups.set(meta.key, { meta, items: [] });
                groups.get(meta.key)!.items.push(w);
              });
              const ordered = ["opinion", "complaint", "email", "formal", "blog", "story", "recommend", "news", "person", "compare", "other"]
                .filter(k => groups.has(k))
                .map(k => groups.get(k)!);

              const activeMeta = categorize(activeWriting.title);

              return (
                <div className="space-y-3">
                  {ordered.map(g => (
                    <div key={g.meta.key}>
                      <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border mb-2 ${g.meta.color}`}>
                        <span>{g.meta.emoji}</span>
                        <span>{g.meta.label}</span>
                        <span className="opacity-60">· {g.items.length}</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap pl-1">
                        {g.items.map(w => {
                          const active = activeWriting.id === w.id;
                          // strip leading category prefix for cleaner label
                          const shortTitle = w.title
                            .replace(/^(Mielipidekirjoitus|Mielipide|Valituskirje|Valitus|Muodollinen sähköposti|Virallinen sähköposti(?: viranomaiselle)?|Virallinen kirje|Sähköposti|Blogiteksti|Blogi|Kertomus|Suosituskirje|Suositus|Lyhyt uutinen|Uutinen|Henkilökuvaus|Vertailu)\s*[-:–]\s*/i, "")
                            .trim() || w.title;
                          return (
                            <button
                              key={w.id}
                              onClick={() => { setActiveWriting(w); setEssay(""); setFeedback(null); }}
                              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                                active
                                  ? "bg-[#003580] text-white border-[#003580] shadow-sm"
                                  : `${g.meta.color} hover:opacity-80`
                              }`}
                              title={w.title}
                            >
                              {shortTitle}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-muted-foreground pt-1">
                    {t("Đang chọn:", "Selected:")} <span className="font-semibold text-foreground">{activeMeta.emoji} {activeWriting.title}</span>
                  </div>
                </div>
              );
            })()}
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
            {/* === B1 Speaking Beginner Guide === */}
            <Card className="p-5 border-2 border-[#003580]/30 bg-gradient-to-br from-[#003580]/5 to-emerald-500/5">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#003580]" />
                {t("Hướng dẫn cho người mới luyện B1 Speaking", "Beginner's guide to YKI B1 Speaking")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t(
                  "Phần Nói YKI B1 gồm các tình huống ngắn (2–4 phút). Giám khảo chấm: trôi chảy, từ vựng, ngữ pháp & phát âm. Hãy luyện theo cấu trúc 3 bước dưới đây.",
                  "YKI B1 Speaking has short scenarios (2–4 min). Examiners grade fluency, vocabulary, grammar and pronunciation. Practice using the 3-step structure below."
                )}
              </p>

              {/* 3-step structure */}
              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg p-3 bg-background border">
                  <p className="text-xs font-bold text-[#003580] mb-1">1️⃣ {t("MỞ ĐẦU", "OPENING")} (10–15s)</p>
                  <p className="text-xs text-muted-foreground">{t("Chào hỏi + giới thiệu mục đích", "Greet + state purpose")}</p>
                </div>
                <div className="rounded-lg p-3 bg-background border">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">2️⃣ {t("NỘI DUNG", "MAIN")} (60–120s)</p>
                  <p className="text-xs text-muted-foreground">{t("Trả lời nhiệm vụ, dùng ví dụ cụ thể, kết nối ý bằng từ nối", "Answer task, give examples, use connectors")}</p>
                </div>
                <div className="rounded-lg p-3 bg-background border">
                  <p className="text-xs font-bold text-orange-600 mb-1">3️⃣ {t("KẾT THÚC", "CLOSING")} (10–15s)</p>
                  <p className="text-xs text-muted-foreground">{t("Tóm tắt + cảm ơn / hỏi lại", "Summarize + thank / ask back")}</p>
                </div>
              </div>

              {/* Universal phrase bank */}
              <div className="space-y-3">
                {[
                  {
                    label: t("👋 Chào hỏi & mở đầu", "👋 Greet & open"),
                    phrases: ["Hei, mukava tavata.", "Anteeksi, voinko kysyä?", "Haluaisin kertoa…", "Soitan, koska…"],
                  },
                  {
                    label: t("🔗 Từ nối ý (rất quan trọng ở B1)", "🔗 Connectors (key for B1)"),
                    phrases: ["ensinnäkin (đầu tiên)", "toiseksi (thứ hai)", "lisäksi (hơn nữa)", "esimerkiksi (ví dụ)", "koska (vì)", "mutta (nhưng)", "siksi (vì vậy)", "lopuksi (cuối cùng)"],
                  },
                  {
                    label: t("💭 Bày tỏ ý kiến", "💭 Give opinion"),
                    phrases: ["Mielestäni…", "Olen sitä mieltä, että…", "Uskon, että…", "Minusta on tärkeää, että…"],
                  },
                  {
                    label: t("⏸️ Câu giữ thời gian khi suy nghĩ", "⏸️ Filler / thinking phrases"),
                    phrases: ["Hmm, anna kun mietin…", "Se on hyvä kysymys.", "No, sanoisin että…", "Miten sen sanoisi…"],
                  },
                  {
                    label: t("❓ Hỏi lại / xin nhắc lại", "❓ Ask for clarification"),
                    phrases: ["Anteeksi, voitko toistaa?", "En ihan ymmärtänyt.", "Tarkoitatko, että…?", "Voitko puhua hitaammin?"],
                  },
                  {
                    label: t("🙏 Kết thúc", "🙏 Closing"),
                    phrases: ["Kiitos paljon avusta.", "Oli mukava jutella.", "Nähdään pian!", "Hyvää päivänjatkoa."],
                  },
                ].map((group, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold mb-1.5">{group.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.phrases.map((p, j) => (
                        <button
                          key={j}
                          onClick={() => speakFi(p.split(" (")[0])}
                          className="text-xs px-2 py-1 rounded bg-background hover:bg-[#003580]/10 border inline-flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />{p}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-xs font-bold mb-1">💡 {t("Mẹo của Thầy Hải", "Teacher Hai's tips")}</p>
                <ul className="text-xs space-y-1 list-disc list-inside text-foreground/90">
                  <li>{t("Đừng im lặng – dùng câu giữ thời gian (Hmm, anna kun mietin…) thay vì 'ehm'.", "Don't go silent — use filler phrases (Hmm, anna kun mietin…) instead of 'ehm'.")}</li>
                  <li>{t("Nói CHẬM và RÕ tốt hơn nói nhanh mà sai. Mục tiêu B1: trôi chảy ở mức cơ bản.", "Slow & clear beats fast & wrong. B1 goal: basic fluency.")}</li>
                  <li>{t("Luôn cho 1 ví dụ cụ thể (Esimerkiksi…) – tăng điểm Vocabulary.", "Always give one concrete example (Esimerkiksi…) — boosts Vocabulary score.")}</li>
                  <li>{t("Dùng cả thì quá khứ (olin, menin) để chứng minh trình độ B1.", "Use past tense (olin, menin) to prove B1 level.")}</li>
                  <li>{t("Ghi âm chính mình → nghe lại → sửa. Lặp lại mỗi tình huống ít nhất 3 lần.", "Record yourself → listen back → fix. Repeat each scenario 3+ times.")}</li>
                </ul>
              </div>
            </Card>

            {/* === Per-scenario cards === */}
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

                {/* Step-by-step structure for THIS scenario */}
                <div className="grid sm:grid-cols-3 gap-2 mb-3">
                  <div className="rounded-md p-2 bg-[#003580]/5 border border-[#003580]/20">
                    <p className="text-[10px] font-bold text-[#003580] mb-1">1️⃣ {t("MỞ ĐẦU", "OPEN")}</p>
                    <p className="text-xs">{t("Chào hỏi, giới thiệu lý do bạn ở đây.", "Greet, state why you're here.")}</p>
                  </div>
                  <div className="rounded-md p-2 bg-emerald-500/5 border border-emerald-500/20">
                    <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">2️⃣ {t("NỘI DUNG", "MAIN")}</p>
                    <p className="text-xs">{t("Hoàn thành nhiệm vụ ở trên, dùng các cụm gợi ý bên dưới.", "Do the task above, use suggested phrases below.")}</p>
                  </div>
                  <div className="rounded-md p-2 bg-orange-500/5 border border-orange-500/20">
                    <p className="text-[10px] font-bold text-orange-600 mb-1">3️⃣ {t("KẾT THÚC", "CLOSE")}</p>
                    <p className="text-xs">{t("Cảm ơn / chào tạm biệt lịch sự.", "Thank / say goodbye politely.")}</p>
                  </div>
                </div>

                <p className="text-xs font-semibold mb-1.5">🗣️ {t("Cụm từ gợi ý cho tình huống này (bấm để nghe)", "Suggested phrases for this scenario (click to hear)")}:</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.hintsFi.map((h, i) => (
                    <button key={i} onClick={() => speakFi(h)}
                      className="text-xs px-2 py-1 rounded bg-[#003580]/10 hover:bg-[#003580]/20 border border-[#003580]/20 inline-flex items-center gap-1">
                      <Volume2 className="w-3 h-3" />{h}
                    </button>
                  ))}
                </div>

                {/* === AI-generated sample monologue === */}
                {(() => {
                  const sample = getSpeakingSample(s.id);
                  if (!sample?.sampleFi) return null;
                  return (
                    <div className="mb-3 rounded-lg border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-[#003580]/5 p-3">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <p className="text-sm font-bold flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          {t("Bài nói mẫu (B1)", "Sample answer (B1)")}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => speakFi(sample.sampleFi, 0.85)}
                          className="h-7 text-xs"
                        >
                          <Volume2 className="w-3 h-3 mr-1" /> {t("Nghe toàn bộ", "Play all")}
                        </Button>
                      </div>
                      <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        <ClickableFinnishText text={sample.sampleFi} />
                      </p>
                      <details className="mt-2">
                        <summary className="text-xs font-semibold text-[#003580] cursor-pointer hover:underline">
                          🇻🇳 {t("Xem bản dịch tiếng Việt", "Show Vietnamese translation")}
                        </summary>
                        <p className="text-xs text-muted-foreground italic mt-1.5 whitespace-pre-wrap leading-relaxed">
                          {sample.sampleVi}
                        </p>
                      </details>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs mt-2"
                        onClick={() => saveToNotebook(`B1 Speaking Sample · ${s.title}`, `${sample.sampleFi}\n\n---\n${sample.sampleVi}`)}
                      >
                        <NotebookPen className="w-3 h-3 mr-1" /> {t("Lưu vào Sổ tay", "Save to Notebook")}
                      </Button>
                    </div>
                  );
                })()}

                <Link to={s.speakingCoachLink}>
                  <Button className="bg-[#003580] hover:bg-[#003580]/90">
                    <Mic className="w-4 h-4 mr-1" /> {t("Mở AI Speaking Coach", "Open AI Speaking Coach")}
                  </Button>
                </Link>
              </Card>
            ))}
          </TabsContent>

          {/* VOCABULARY */}
          <TabsContent value="vocabulary" className="mt-6 space-y-5">
            <Card className="p-5 bg-gradient-to-br from-[#003580]/5 to-emerald-500/5 border-[#003580]/30">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-[#003580]" />
                {t("Ngân hàng từ vựng B1 theo chủ đề", "B1 Thematic Vocabulary Bank")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Mỗi chủ đề có ~25 từ B1 thường gặp trong YKI Reading/Writing/Speaking. Bấm vào loa để nghe phát âm, lưu vào Sổ tay để ôn lại.",
                  "Each theme has ~25 B1 words common in YKI Reading/Writing/Speaking. Click the speaker to hear pronunciation, save to Notebook to review."
                )}
              </p>
            </Card>
            {[...B1_VOCAB_MODULES, ...B1_VOCAB_EXPANSION_MODULES, ...B1_VOCAB_EXPANSION_MODULES_2].map(mod => (
              <Card key={mod.id} className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span>{mod.emoji}</span>
                    {lang === "vi" ? mod.titleVi : mod.titleFi}
                    <span className="text-xs font-normal text-muted-foreground">· {mod.titleEn}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {lang === "vi" ? mod.descriptionVi : mod.description}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {mod.words.map((w, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-border bg-secondary/20">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => speakFi(w.fi)}
                          className="font-bold text-[#003580] inline-flex items-center gap-1 hover:underline"
                        >
                          <Volume2 className="w-3 h-3" />{w.fi}
                        </button>
                        <Badge variant="outline" className="text-[10px]">{w.partOfSpeech}</Badge>
                      </div>
                      <p className="text-xs text-foreground/90 mt-1">
                        {w.meaningEn} {lang === "vi" && <span className="text-muted-foreground">· {w.meaningVi}</span>}
                      </p>
                      <p className="text-xs italic text-muted-foreground mt-1">"{w.exampleFi}"</p>
                      <p className="text-[11px] text-foreground/70 mt-0.5">🇬🇧 {w.exampleEn}</p>
                      <p className="text-[11px] text-foreground/70 mt-0.5">🇻🇳 {w.exampleVi}</p>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => saveToNotebook(
                    `B1 Vocab · ${mod.titleEn}`,
                    mod.words.map(w => `${w.fi} (${w.partOfSpeech}) — ${w.meaningEn} / ${w.meaningVi}\n  ${w.exampleFi}`).join("\n\n")
                  )}
                >
                  <NotebookPen className="w-4 h-4 mr-1" /> {t("Lưu cả chủ đề vào Sổ tay", "Save whole theme to Notebook")}
                </Button>
              </Card>
            ))}
          </TabsContent>

          {/* GRAMMAR */}
          <TabsContent value="grammar" className="mt-6 space-y-5">
            <Card className="p-5 bg-gradient-to-br from-[#003580]/5 to-emerald-500/5 border-[#003580]/30">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-[#003580]" />
                {t("Ngữ pháp cốt lõi B1", "B1 Core Grammar")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "21 điểm ngữ pháp cốt lõi B1 trong 5 nhóm: cách, thì/thức, cấu trúc câu, động từ chuyên sâu và cấu trúc nâng cao. Mỗi điểm có công thức, ví dụ song ngữ và mẹo của Thầy Hải.",
                  "21 core B1 grammar points across 5 groups: cases, tenses/moods, sentence structure, verbs in depth and advanced structures. Each has a formula, bilingual examples and Teacher Hai's tip."
                )}
              </p>
            </Card>
            {[...B1_GRAMMAR_MODULES, ...B1_GRAMMAR_EXPANSION_MODULES].map(mod => (
              <Card key={mod.id} className="p-5">
                <div className="mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span>{mod.emoji}</span>
                    {lang === "vi" ? mod.titleVi : mod.titleFi}
                    <span className="text-xs font-normal text-muted-foreground">· {mod.titleEn}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {lang === "vi" ? mod.descriptionVi : mod.description}
                  </p>
                </div>
                <div className="space-y-4">
                  {mod.points.map(p => (
                    <div key={p.id} className="p-4 rounded-lg border-2 border-[#003580]/15 bg-secondary/20">
                      <h4 className="font-bold text-base flex items-center gap-2 mb-1">
                        <span>{p.emoji}</span>
                        {lang === "vi" ? p.titleVi : p.titleFi}
                        <span className="text-xs font-normal text-muted-foreground">· {p.titleEn}</span>
                      </h4>
                      <p className="text-sm text-foreground/90 mb-2">
                        {lang === "vi" ? p.explanationVi : p.explanationFi}
                      </p>
                      {p.formula && (
                        <div className="text-xs font-mono px-2 py-1.5 rounded bg-[#003580]/10 border border-[#003580]/20 inline-block mb-3">
                          📐 {p.formula}
                        </div>
                      )}
                      <div className="space-y-1.5 mb-3">
                        {p.examples.map((ex, i) => (
                          <div key={i} className="text-sm">
                            <button
                              onClick={() => speakFi(ex.fi)}
                              className="font-medium text-[#003580] inline-flex items-center gap-1 hover:underline"
                            >
                              <Volume2 className="w-3 h-3" />{ex.fi}
                            </button>
                            <span className="text-muted-foreground"> — {ex.en}</span>
                            {lang === "vi" && (
                              <span className="text-xs text-muted-foreground italic"> · {ex.vi}</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 rounded bg-yellow-500/10 border border-yellow-500/30">
                        <p className="text-xs">
                          <span className="font-bold">🎓 Teacher Hai:</span>{" "}
                          {lang === "vi" ? p.teacherTipVi : p.teacherTipEn}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs mt-2"
                        onClick={() => saveToNotebook(
                          `B1 Grammar · ${p.titleEn}`,
                          `${p.titleFi} (${p.titleVi})\n\n${p.explanationFi}\n${p.formula ? "Formula: " + p.formula + "\n" : ""}\n` +
                          p.examples.map(e => `• ${e.fi}\n  ${e.en}\n  ${e.vi}`).join("\n\n") +
                          `\n\nTip: ${p.teacherTipEn} / ${p.teacherTipVi}`
                        )}
                      >
                        <NotebookPen className="w-3 h-3 mr-1" /> {t("Lưu vào Sổ tay", "Save to Notebook")}
                      </Button>
                    </div>
                  ))}
                </div>
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
