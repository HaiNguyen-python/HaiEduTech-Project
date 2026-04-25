import { useState, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Code2,
  HardHat,
  Hotel,
  Briefcase,
  GraduationCap,
  Truck,
  Scale,
  Plane,
  Sparkles,
  Loader2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  MessageCircle,
  Languages,
  Lightbulb,
  Target,
  Save,
  Download,
  ListChecks,
  ChevronRight,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";

type LangKey = "english" | "chinese" | "vietnamese" | "finnish";

interface VocabItem {
  term: string;
  pinyin?: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
}
interface Scenario {
  title: string;
  context: string;
  dialogue: { speaker: string; line: string; translation: string }[];
  keyPhrases: string[];
}
interface GrammarPoint {
  point: string;
  explanation: string;
  examples: string[];
}
interface Lesson {
  title: string;
  subtitle: string;
  overview: string;
  vocabulary: VocabItem[];
  scenarios: Scenario[];
  grammar: GrammarPoint[];
  tutorTips: string[];
  culturalTip: string;
  practiceTask: string;
}

const LANG_OPTIONS: { key: LangKey; label: string; flag: string; gradient: string }[] = [
  { key: "english", label: "English", flag: "🇬🇧", gradient: "from-blue-500 to-indigo-600" },
  { key: "chinese", label: "中文 Chinese", flag: "🇨🇳", gradient: "from-red-500 to-rose-600" },
  { key: "vietnamese", label: "Tiếng Việt", flag: "🇻🇳", gradient: "from-amber-500 to-red-500" },
  { key: "finnish", label: "Suomi Finnish", flag: "🇫🇮", gradient: "from-sky-500 to-blue-700" },
];

const FIELD_PRESETS: { label: string; icon: typeof Stethoscope }[] = [
  { label: "Medical / Healthcare", icon: Stethoscope },
  { label: "Information Technology", icon: Code2 },
  { label: "Construction & Engineering", icon: HardHat },
  { label: "Hospitality & Tourism", icon: Hotel },
  { label: "Business & Finance", icon: Briefcase },
  { label: "Education", icon: GraduationCap },
  { label: "Logistics & Transport", icon: Truck },
  { label: "Legal", icon: Scale },
  { label: "Aviation", icon: Plane },
];

const GOAL_PRESETS = [
  "Job interview preparation",
  "Writing daily reports",
  "Communicating with customers",
  "Understanding technical documentation",
  "Leading team meetings",
  "Networking at conferences",
];

const SpecializedLanguage = () => {
  const [searchParams] = useSearchParams();
  const initialLang = (searchParams.get("lang") as LangKey) || "english";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<LangKey>(initialLang);
  const [field, setField] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [goal, setGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [citations, setCitations] = useState<string[]>([]);
  const lessonRef = useRef<HTMLDivElement>(null);

  const totalSteps = 4;
  const canProceed =
    (step === 1 && !!language) ||
    (step === 2 && field.trim().length >= 2) ||
    (step === 3 && jobRole.trim().length >= 2) ||
    (step === 4 && goal.trim().length >= 3);

  const handleGenerate = async () => {
    if (!canProceed) return;
    setLoading(true);
    setLesson(null);
    setCitations([]);
    try {
      const { data, error } = await supabase.functions.invoke("generate-specialized-lesson", {
        body: { language, field, jobRole, goal, notes },
      });
      if (error) throw error;
      if (!data?.lesson) throw new Error(data?.error || "No lesson returned");
      setLesson(data.lesson as Lesson);
      setCitations(data.citations || []);
      setTimeout(() => {
        lessonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      toast({ title: "Lesson ready!", description: "Your custom curriculum is below." });
    } catch (e: any) {
      const msg = e?.message || "Something went wrong";
      toast({
        title: "Generation failed",
        description: msg.includes("Rate limit")
          ? "Too many requests. Please wait a minute and retry."
          : msg.includes("credits")
            ? "AI credits exhausted. Please top up the workspace."
            : msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotebook = async () => {
    if (!lesson) return;
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast({
        title: "Please sign in",
        description: "You need an account to save lessons to your notebook.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    const content = lessonToMarkdown(lesson, citations);
    const { error } = await supabase.from("student_notebooks").insert({
      user_id: userData.user.id,
      title: `[${LANG_OPTIONS.find((l) => l.key === language)?.label}] ${lesson.title}`,
      subject: `Specialized ${language}`,
      content,
    });
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved to your Smart Notebook" });
    }
  };

  const handleExportPdf = () => {
    if (!lesson) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const addText = (text: string, size = 11, bold = false, color: [number, number, number] = [30, 30, 30]) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((ln: string) => {
        if (y > 800) { doc.addPage(); y = margin; }
        doc.text(ln, margin, y);
        y += size * 1.3;
      });
    };
    const addSpace = (n = 8) => { y += n; };
    const addHeading = (text: string) => {
      addSpace(10);
      addText(text, 14, true, [37, 99, 235]);
      addSpace(4);
    };

    addText(lesson.title, 18, true, [17, 24, 39]);
    addText(lesson.subtitle, 11, false, [100, 100, 100]);
    addSpace(6);
    addText(lesson.overview, 11);

    addHeading("Vocabulary");
    lesson.vocabulary.forEach((v, i) => {
      addText(`${i + 1}. ${v.term}${v.pinyin ? ` (${v.pinyin})` : ""} - ${v.translation} [${v.partOfSpeech}]`, 11, true);
      addText(`   Ex: ${v.example} - ${v.exampleTranslation}`, 10, false, [80, 80, 80]);
    });

    addHeading("Workplace Scenarios");
    lesson.scenarios.forEach((s, i) => {
      addText(`${i + 1}. ${s.title}`, 12, true);
      addText(s.context, 10, false, [80, 80, 80]);
      s.dialogue.forEach((d) => addText(`   ${d.speaker}: ${d.line} (${d.translation})`, 10));
      addText(`   Key phrases: ${s.keyPhrases.join(" | ")}`, 10, false, [37, 99, 235]);
      addSpace(4);
    });

    addHeading("Grammar Focus");
    lesson.grammar.forEach((g) => {
      addText(g.point, 12, true);
      addText(g.explanation, 10);
      g.examples.forEach((ex) => addText(`   - ${ex}`, 10, false, [80, 80, 80]));
    });

    addHeading("AI Tutor Tips");
    lesson.tutorTips.forEach((t, i) => addText(`${i + 1}. ${t}`, 10));

    addHeading("Cultural Tip");
    addText(lesson.culturalTip, 10);

    addHeading("Practice Task");
    addText(lesson.practiceTask, 11, true, [16, 185, 129]);

    if (citations.length) {
      addHeading("Sources");
      citations.slice(0, 8).forEach((c, i) => addText(`[${i + 1}] ${c}`, 8, false, [120, 120, 120]));
    }

    doc.save(`${lesson.title.slice(0, 60).replace(/[^a-z0-9]+/gi, "_")}.pdf`);
    toast({ title: "PDF downloaded" });
  };

  const langMeta = LANG_OPTIONS.find((l) => l.key === language)!;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Specialized Language Hub - AI-Powered Industry Lessons | HaiEduTech"
        description="Generate personalized industry-focused language lessons in English, Chinese, Vietnamese, or Finnish using AI."
      />
      <Navbar />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${langMeta.gradient} text-white pt-28 pb-12 sm:pt-32 sm:pb-16`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Specialized Language Hub <span className="text-2xl sm:text-3xl">{langMeta.flag}</span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl opacity-95">
              Build a custom industry-ready curriculum in minutes. Tell us your field, role, and goal - the AI tutor crafts vocabulary, scenarios, grammar, and cultural tips tailored to your career.
            </p>
            {/* Industry chips */}
            <div className="hidden sm:flex flex-wrap gap-2 mt-6">
              {[
                { icon: "⚕️", label: "Medical" },
                { icon: "⚖️", label: "Legal" },
                { icon: "💻", label: "Tech & IT" },
                { icon: "📈", label: "Finance" },
                { icon: "✈️", label: "Aviation" },
                { icon: "🏗️", label: "Engineering" },
                { icon: "🎓", label: "Academic" },
              ].map((c) => (
                <span key={c.label} className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium">
                  <span className="mr-1.5">{c.icon}</span>{c.label}
                </span>
              ))}
            </div>
          </div>

          {/* Industry illustration collage */}
          <div className="hidden lg:block relative h-72 xl:h-80">
            {[
              { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=420&q=70", alt: "Medical professional", className: "top-0 left-0 w-44 h-52 rotate-[-6deg]", tag: "⚕️ Medical" },
              { src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=420&q=70", alt: "Legal documents", className: "top-4 left-44 w-44 h-44 rotate-[4deg]", tag: "⚖️ Legal" },
              { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=420&q=70", alt: "Software engineering", className: "bottom-0 left-8 w-48 h-44 rotate-[2deg]", tag: "💻 Tech" },
              { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=420&q=70", alt: "Finance charts", className: "bottom-4 right-4 w-44 h-44 rotate-[-4deg]", tag: "📈 Finance" },
              { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=420&q=70", alt: "Aviation cockpit", className: "top-0 right-0 w-40 h-40 rotate-[6deg]", tag: "✈️ Aviation" },
            ].map((img, i) => (
              <figure
                key={i}
                className={`absolute ${img.className} rounded-2xl overflow-hidden ring-2 ring-white/40 shadow-2xl transition-transform hover:rotate-0 hover:scale-105 hover:z-10 bg-white/10`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
                <figcaption className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/85 to-transparent text-white text-[11px] font-semibold">
                  {img.tag}
                </figcaption>
              </figure>
            ))}
            {/* Floating sparkle accent */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-8 left-2 w-20 h-20 rounded-full bg-white/15 blur-2xl" />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Multi-step form */}
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Step {step} / {totalSteps}</Badge>
                <span className="text-sm text-muted-foreground">Needs Assessment</span>
              </div>
              <Progress value={(step / totalSteps) * 100} className="w-32" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 1 && (
                  <div>
                    <Label className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-primary" /> Choose your target language
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {LANG_OPTIONS.map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => setLanguage(opt.key)}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            language === opt.key
                              ? "border-primary bg-primary/5 shadow-md scale-105"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="text-3xl mb-2">{opt.flag}</div>
                          <div className="font-semibold text-sm">{opt.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <Label className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <Briefcase className="w-5 h-5 text-primary" /> What's your specialized field?
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {FIELD_PRESETS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <button
                            key={p.label}
                            onClick={() => setField(p.label)}
                            className={`p-3 rounded-lg border text-left flex items-center gap-2 transition-all text-sm ${
                              field === p.label
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-primary shrink-0" />
                            <span>{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <Input
                      placeholder="Or type your own (e.g., Renewable Energy, Cybersecurity)"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <Label className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-primary" /> Your specific job role
                    </Label>
                    <Input
                      placeholder="e.g., Junior Backend Developer, Registered Nurse, Site Engineer"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      maxLength={200}
                      className="text-base"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      The more specific you are, the better the curriculum.
                    </p>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-primary" /> Your learning goal
                      </Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {GOAL_PRESETS.map((g) => (
                          <button
                            key={g}
                            onClick={() => setGoal(g)}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                              goal === g
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                      <Input
                        placeholder="Or describe in your own words"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        maxLength={500}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Special requirements (optional)
                      </Label>
                      <Textarea
                        placeholder="Notes, scenarios, or documents you want to focus on..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        maxLength={1000}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1 || loading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              {step < totalSteps ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed}>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={!canProceed || loading}
                  className={`bg-gradient-to-r ${langMeta.gradient} text-white hover:opacity-90`}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="w-4 h-4 mr-2" /> Generate Lesson</>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading state */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-8 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 text-center"
          >
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  className="w-3 h-3 rounded-full bg-primary"
                />
              ))}
            </div>
            <p className="font-semibold text-foreground">AI tutor is researching the latest 2026 industry terms...</p>
            <p className="text-sm text-muted-foreground mt-1">Crafting vocabulary, scenarios & cultural insights for {jobRole}.</p>
          </motion.div>
        )}

        {/* Lesson display */}
        {lesson && !loading && (
          <div ref={lessonRef} className="mt-10">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6">
              {/* Anchor sidebar */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">On this page</p>
                  <nav className="space-y-1 text-sm">
                    {[
                      { id: "overview", label: "Overview", icon: BookOpen },
                      { id: "vocabulary", label: "Vocabulary", icon: Languages },
                      { id: "scenarios", label: "Scenarios", icon: MessageCircle },
                      { id: "grammar", label: "Grammar", icon: ListChecks },
                      { id: "tips", label: "AI Tutor Tips", icon: Lightbulb },
                      { id: "practice", label: "Practice Task", icon: Target },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-foreground/80 hover:text-foreground"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                        </a>
                      );
                    })}
                  </nav>
                  <div className="mt-4 space-y-2">
                    <Button onClick={handleSaveToNotebook} variant="outline" size="sm" className="w-full">
                      <Save className="w-3.5 h-3.5 mr-1.5" /> Save to Notebook
                    </Button>
                    <Button onClick={handleExportPdf} size="sm" className="w-full">
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Export PDF
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Content */}
              <article className="space-y-8">
                <section id="overview" className="rounded-xl border-2 bg-card p-6">
                  <Badge className={`bg-gradient-to-r ${langMeta.gradient} text-white border-0 mb-3`}>
                    {langMeta.flag} {langMeta.label} · {field}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">{lesson.title}</h2>
                  <p className="text-muted-foreground italic mb-4">{lesson.subtitle}</p>
                  <p className="text-foreground/90 leading-relaxed">{lesson.overview}</p>
                </section>

                <section id="vocabulary">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" /> Key Vocabulary
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.vocabulary.map((v, i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <div className="font-bold text-lg">{v.term}</div>
                              {v.pinyin && <div className="text-sm text-primary">{v.pinyin}</div>}
                            </div>
                            <Badge variant="secondary" className="text-xs">{v.partOfSpeech}</Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground/80 mb-2">{v.translation}</p>
                          <div className="text-xs bg-muted/50 rounded p-2">
                            <p className="italic">"{v.example}"</p>
                            <p className="text-muted-foreground mt-1">{v.exampleTranslation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section id="scenarios">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" /> Workplace Scenarios
                  </h3>
                  <div className="space-y-4">
                    {lesson.scenarios.map((s, i) => (
                      <Card key={i}>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge>{i + 1}</Badge>
                            <h4 className="font-bold">{s.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{s.context}</p>
                          <div className="space-y-2 mb-3">
                            {s.dialogue.map((d, j) => (
                              <div key={j} className="text-sm bg-muted/30 rounded-lg p-3">
                                <span className="font-semibold text-primary">{d.speaker}:</span>{" "}
                                <span>{d.line}</span>
                                <div className="text-xs text-muted-foreground italic mt-0.5">{d.translation}</div>
                              </div>
                            ))}
                          </div>
                          {s.keyPhrases?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t">
                              <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Key phrases:</span>
                              {s.keyPhrases.map((p, k) => (
                                <Badge key={k} variant="outline" className="text-xs">{p}</Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section id="grammar">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-primary" /> Grammar Focus
                  </h3>
                  <div className="space-y-3">
                    {lesson.grammar.map((g, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-1">{g.point}</h4>
                          <p className="text-sm text-foreground/80 mb-2">{g.explanation}</p>
                          <ul className="text-sm space-y-1">
                            {g.examples.map((ex, j) => (
                              <li key={j} className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{ex}</span></li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section id="tips">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" /> AI Tutor Tips
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.tutorTips.map((t, i) => (
                      <div key={i} className="rounded-lg border bg-gradient-to-br from-primary/5 to-transparent p-4">
                        <div className="flex gap-2">
                          <span className="text-2xl shrink-0">💡</span>
                          <p className="text-sm">{t}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900">
                    <h4 className="font-bold mb-2 flex items-center gap-2">🌍 Cultural Tip</h4>
                    <p className="text-sm leading-relaxed">{lesson.culturalTip}</p>
                  </div>
                </section>

                <section id="practice" className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <Target className="w-5 h-5" /> Today's Practice Task
                  </h3>
                  <p className="text-foreground/90">{lesson.practiceTask}</p>
                </section>

                {citations.length > 0 && (
                  <section className="text-xs text-muted-foreground border-t pt-4">
                    <p className="font-semibold mb-2">Sources (Perplexity):</p>
                    <ol className="space-y-1 list-decimal list-inside">
                      {citations.slice(0, 8).map((c, i) => (
                        <li key={i}>
                          <a href={c} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                            {c}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button onClick={() => { setLesson(null); setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }} variant="outline">
                    Generate Another
                  </Button>
                  <Link to="/dashboard"><Button variant="ghost">Back to Dashboard</Button></Link>
                </div>
              </article>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

function lessonToMarkdown(l: Lesson, citations: string[]): string {
  const lines: string[] = [];
  lines.push(`# ${l.title}`, "", `*${l.subtitle}*`, "", l.overview, "");
  lines.push(`## Vocabulary`);
  l.vocabulary.forEach((v, i) => {
    lines.push(
      `${i + 1}. **${v.term}**${v.pinyin ? ` (${v.pinyin})` : ""} - ${v.translation} _(${v.partOfSpeech})_`,
      `   - Ex: "${v.example}" - ${v.exampleTranslation}`,
    );
  });
  lines.push("", `## Workplace Scenarios`);
  l.scenarios.forEach((s, i) => {
    lines.push(`### ${i + 1}. ${s.title}`, s.context, "");
    s.dialogue.forEach((d) => lines.push(`- **${d.speaker}:** ${d.line} _(${d.translation})_`));
    if (s.keyPhrases?.length) lines.push(`- Key phrases: ${s.keyPhrases.join(" | ")}`);
    lines.push("");
  });
  lines.push(`## Grammar Focus`);
  l.grammar.forEach((g) => {
    lines.push(`### ${g.point}`, g.explanation);
    g.examples.forEach((ex) => lines.push(`- ${ex}`));
  });
  lines.push("", `## AI Tutor Tips`);
  l.tutorTips.forEach((t, i) => lines.push(`${i + 1}. ${t}`));
  lines.push("", `## Cultural Tip`, l.culturalTip, "", `## Practice Task`, `> ${l.practiceTask}`);
  if (citations.length) {
    lines.push("", `## Sources`);
    citations.slice(0, 8).forEach((c, i) => lines.push(`${i + 1}. ${c}`));
  }
  return lines.join("\n");
}

export default SpecializedLanguage;
