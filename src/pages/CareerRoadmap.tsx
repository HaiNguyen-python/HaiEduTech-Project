/**
 * @file CareerRoadmap.tsx
 * @description AI-powered personalized IT career roadmap (Data Eng & AI focused).
 * @copyright 2026 HaiEduTech, ILC.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase, Sparkles, Loader2, Target, BookOpen, Award, Code2,
  Calendar, AlertTriangle, Lightbulb, Database, Brain, ArrowLeft, ExternalLink, CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PRESET_ROLES = [
  { id: "data-engineer", emoji: "🔄", labelVi: "Data Engineer", labelEn: "Data Engineer", featured: true },
  { id: "ai-engineer", emoji: "🤖", labelVi: "AI / ML Engineer", labelEn: "AI / ML Engineer", featured: true },
  { id: "data-scientist", emoji: "📊", labelVi: "Data Scientist", labelEn: "Data Scientist" },
  { id: "data-analyst", emoji: "📈", labelVi: "Data Analyst", labelEn: "Data Analyst" },
  { id: "ml-ops", emoji: "⚙️", labelVi: "MLOps Engineer", labelEn: "MLOps Engineer" },
  { id: "backend", emoji: "🛠️", labelVi: "Backend Developer", labelEn: "Backend Developer" },
  { id: "fullstack", emoji: "💻", labelVi: "Full-Stack Developer", labelEn: "Full-Stack Developer" },
  { id: "cloud-engineer", emoji: "☁️", labelVi: "Cloud Engineer", labelEn: "Cloud Engineer" },
  { id: "devops", emoji: "🔧", labelVi: "DevOps Engineer", labelEn: "DevOps Engineer" },
  { id: "nlp-engineer", emoji: "🗣️", labelVi: "NLP Engineer", labelEn: "NLP Engineer" },
];

const LEVELS = [
  { id: "complete-beginner", vi: "Hoàn toàn mới", en: "Complete beginner" },
  { id: "some-coding", vi: "Đã biết code cơ bản", en: "Some coding experience" },
  { id: "junior", vi: "Junior (0-2 năm)", en: "Junior (0-2 yrs)" },
  { id: "mid", vi: "Mid-level (2-5 năm)", en: "Mid-level (2-5 yrs)" },
];

const CareerRoadmap = () => {
  const { t, lang } = useLanguage();
  const [role, setRole] = useState("data-engineer");
  const [customRole, setCustomRole] = useState("");
  const [currentLevel, setCurrentLevel] = useState("complete-beginner");
  const [background, setBackground] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [targetMonths, setTargetMonths] = useState(6);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [citations, setCitations] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<Record<string, boolean>>({});

  const generate = async () => {
    const finalRole = role === "other" ? customRole.trim() : (PRESET_ROLES.find(r => r.id === role)?.labelEn || role);
    if (!finalRole) {
      toast.error(t("Vui lòng chọn hoặc nhập vai trò", "Please select or enter a role"));
      return;
    }
    setLoading(true);
    setRoadmap(null);
    try {
      const { data, error } = await supabase.functions.invoke("career-roadmap-ai", {
        body: {
          role: finalRole,
          currentLevel: LEVELS.find(l => l.id === currentLevel)?.en || currentLevel,
          background,
          hoursPerWeek,
          targetMonths,
          language: lang,
        },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed");
      setRoadmap(data.roadmap);
      setCitations(data.citations || []);
      toast.success(t("Đã tạo lộ trình!", "Roadmap generated!"));
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || t("Có lỗi xảy ra", "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const toggleProject = (id: string) => {
    setCompletedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("Career Roadmap AI - Lộ trình nghề IT cá nhân hóa | HaiEduTech", "Career Roadmap AI - Personalized IT Career Path | HaiEduTech")}
        description={t(
          "AI tạo lộ trình học & luyện tập chi tiết cho Data Engineer, AI Engineer và các vị trí IT khác. Cá nhân hóa theo trình độ và thời gian.",
          "AI-generated detailed learning & practice roadmaps for Data Engineer, AI Engineer and other IT roles. Personalized by level and timeline."
        )}
        path="/programming/career-roadmap"
      />
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 pt-6 pb-16 max-w-5xl">
        <Link to="/programming?pillar=data-eng" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại Programming", "Back to Programming")}
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-3">
            <Sparkles className="w-3 h-3" /> {t("AI-Powered · Cá nhân hóa", "AI-Powered · Personalized")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 leading-tight">
            {t("Career", "Career")}{" "}
            <span className="text-gradient">Roadmap AI</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            {t(
              "Lộ trình học & luyện tập chi tiết cho các vị trí IT - chuyên sâu Data Engineer & AI. Powered by Perplexity AI với dữ liệu thị trường mới nhất.",
              "Detailed learning & practice roadmaps for IT roles - deep focus on Data Engineer & AI. Powered by Perplexity AI with the latest market data."
            )}
          </p>
        </motion.div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-6 mb-8 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {t("1. Bạn muốn trở thành?", "1. What role do you want?")}
          </h2>

          {/* Role grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
            {PRESET_ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`relative rounded-xl p-3 text-left text-xs border transition-all active:scale-[0.97] ${
                  role === r.id
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                {r.featured && (
                  <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                    HOT
                  </span>
                )}
                <div className="text-xl mb-1">{r.emoji}</div>
                <div className="font-semibold text-foreground leading-tight">{lang === "vi" ? r.labelVi : r.labelEn}</div>
              </button>
            ))}
            <button
              onClick={() => setRole("other")}
              className={`rounded-xl p-3 text-left text-xs border transition-all active:scale-[0.97] ${
                role === "other" ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/30"
              }`}
            >
              <div className="text-xl mb-1">✨</div>
              <div className="font-semibold">{t("Khác", "Other")}</div>
            </button>
          </div>
          {role === "other" && (
            <Input
              placeholder={t("Ví dụ: Computer Vision Engineer", "e.g. Computer Vision Engineer")}
              value={customRole}
              onChange={e => setCustomRole(e.target.value)}
              className="mb-2"
            />
          )}

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div>
              <Label className="text-sm font-semibold mb-2 block">{t("Trình độ hiện tại", "Current level")}</Label>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setCurrentLevel(l.id)}
                    className={`rounded-lg p-2 text-xs border transition-all ${
                      currentLevel === l.id ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    {lang === "vi" ? l.vi : l.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-semibold mb-2 block">{t("Giờ/tuần", "Hrs/week")}</Label>
                <Input type="number" min={1} max={80} value={hoursPerWeek} onChange={e => setHoursPerWeek(+e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">{t("Mục tiêu (tháng)", "Target (months)")}</Label>
                <Input type="number" min={1} max={36} value={targetMonths} onChange={e => setTargetMonths(+e.target.value)} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-sm font-semibold mb-2 block">{t("Bối cảnh / kinh nghiệm (tùy chọn)", "Background / experience (optional)")}</Label>
            <Textarea
              placeholder={t("Ví dụ: Học CNTT năm 3, biết Python cơ bản, muốn làm việc ở Singapore", "e.g. CS junior, basic Python, want to work in Singapore")}
              value={background}
              onChange={e => setBackground(e.target.value)}
              rows={2}
              className="text-sm"
            />
          </div>

          <Button
            onClick={generate}
            disabled={loading}
            className="w-full mt-5 bg-gradient-to-r from-primary to-emerald-600 hover:opacity-90 text-white font-bold h-12"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" />{t("Đang tạo lộ trình...", "Generating roadmap...")}</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" />{t("Tạo Lộ trình AI", "Generate AI Roadmap")}</>
            )}
          </Button>
        </div>

        {/* Roadmap output */}
        <AnimatePresence>
          {roadmap && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Role summary */}
              {roadmap.roleSummary && (
                <div className="rounded-2xl p-5 border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-lg">{t("Tổng quan vai trò", "Role Overview")}</h3>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{roadmap.roleSummary}</p>
                </div>
              )}

              {/* HaiEdu rec */}
              {roadmap.haiEduRecommendation && (
                <div className="rounded-2xl p-5 border-2 border-emerald-500/30 bg-emerald-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-display font-bold text-base text-emerald-700 dark:text-emerald-400">
                      {t("Gợi ý từ HaiEduTech", "HaiEduTech Recommendation")}
                    </h3>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{roadmap.haiEduRecommendation}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link to="/programming?pillar=python-pathway" className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-medium">💻 Python Pathway</Link>
                    <Link to="/programming?pillar=sql" className="text-xs bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full font-medium">🗄️ SQL</Link>
                    <Link to="/programming?pillar=data-eng" className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full font-medium">🔄 Data Eng</Link>
                    <Link to="/programming?pillar=ml" className="text-xs bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full font-medium">🤖 ML</Link>
                  </div>
                </div>
              )}

              {/* Core skills */}
              {Array.isArray(roadmap.coreSkills) && roadmap.coreSkills.length > 0 && (
                <div className="rounded-2xl p-5 border border-border bg-card">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-rose-500" />
                    {t("Kỹ năng cốt lõi", "Core Skills")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {roadmap.coreSkills.map((s: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-background border border-border">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          s.importance === "must-have" ? "bg-rose-500/10 text-rose-700 dark:text-rose-400" : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        }`}>
                          {s.importance === "must-have" ? "MUST" : "NICE"}
                        </span>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground">{s.skill}</div>
                          <div className="text-xs text-muted-foreground">{s.why}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phases */}
              {Array.isArray(roadmap.phases) && roadmap.phases.map((ph: any, i: number) => (
                <div key={i} className="rounded-2xl p-5 border border-border bg-card">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <h3 className="font-display font-bold text-lg flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white text-sm flex items-center justify-center">{i + 1}</span>
                      {ph.phase}
                    </h3>
                    {ph.durationWeeks && (
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                        {ph.durationWeeks} {t("tuần", "weeks")}
                      </span>
                    )}
                  </div>

                  {Array.isArray(ph.goals) && (
                    <div className="mb-3">
                      <div className="text-xs font-bold uppercase text-muted-foreground mb-1">{t("Mục tiêu", "Goals")}</div>
                      <ul className="text-sm space-y-1">
                        {ph.goals.map((g: string, j: number) => (
                          <li key={j} className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span><span>{g}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(ph.topics) && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {ph.topics.map((t: string, j: number) => (
                        <span key={j} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{t}</span>
                      ))}
                    </div>
                  )}

                  {Array.isArray(ph.resources) && ph.resources.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-bold uppercase text-muted-foreground mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3" /> {t("Tài nguyên", "Resources")}</div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {ph.resources.map((r: any, j: number) => (
                          <a key={j} href={r.url || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors text-sm">
                            <span className="text-base">{r.type === "course" ? "🎓" : r.type === "book" ? "📚" : r.type === "youtube" ? "▶️" : "📄"}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold truncate">{r.name}</div>
                              <div className="text-[10px] text-muted-foreground">{r.free ? t("Miễn phí", "Free") : t("Trả phí", "Paid")}</div>
                            </div>
                            {r.url && <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(ph.practiceProjects) && ph.practiceProjects.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-bold uppercase text-muted-foreground mb-1 flex items-center gap-1"><Code2 className="w-3 h-3" /> {t("Dự án luyện tập", "Practice projects")}</div>
                      <div className="space-y-2">
                        {ph.practiceProjects.map((p: any, j: number) => {
                          const pid = `${i}-${j}`;
                          const done = completedProjects[pid];
                          return (
                            <button key={j} onClick={() => toggleProject(pid)} className={`w-full text-left p-3 rounded-lg border transition-all ${
                              done ? "bg-emerald-500/5 border-emerald-500/30" : "bg-background border-border hover:border-primary/30"
                            }`}>
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${done ? "text-emerald-600 fill-emerald-600/20" : "text-muted-foreground"}`} />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="font-semibold text-sm">{p.title}</span>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                      p.difficulty === "easy" ? "bg-green-500/15 text-green-700 dark:text-green-400"
                                      : p.difficulty === "hard" ? "bg-red-500/15 text-red-700 dark:text-red-400"
                                      : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                    }`}>{p.difficulty?.toUpperCase()}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground mb-1">{p.description}</div>
                                  {Array.isArray(p.skillsApplied) && (
                                    <div className="flex flex-wrap gap-1">
                                      {p.skillsApplied.map((s: string, k: number) => (
                                        <span key={k} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">{s}</span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {ph.milestone && (
                    <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-sm">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">🏁 {t("Mốc đạt được:", "Milestone:")} </span>
                      {ph.milestone}
                    </div>
                  )}
                </div>
              ))}

              {/* Certifications */}
              {Array.isArray(roadmap.certifications) && roadmap.certifications.length > 0 && (
                <div className="rounded-2xl p-5 border border-border bg-card">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    {t("Chứng chỉ nên có", "Recommended Certifications")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {roadmap.certifications.map((c: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg border border-border bg-background">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{c.name}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            c.priority === "high" ? "bg-rose-500/15 text-rose-600" : c.priority === "medium" ? "bg-amber-500/15 text-amber-600" : "bg-blue-500/15 text-blue-600"
                          }`}>{c.priority?.toUpperCase()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{c.provider} · ${c.costUsd || 0} · {c.whenToTake}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio */}
              {Array.isArray(roadmap.portfolioProjects) && roadmap.portfolioProjects.length > 0 && (
                <div className="rounded-2xl p-5 border border-border bg-card">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-violet-500" />
                    {t("Dự án Portfolio", "Portfolio Projects")}
                  </h3>
                  <div className="space-y-3">
                    {roadmap.portfolioProjects.map((p: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20">
                        <div className="font-semibold text-sm mb-1">📦 {p.title}</div>
                        <p className="text-xs text-muted-foreground mb-2">{p.description}</p>
                        {Array.isArray(p.techStack) && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {p.techStack.map((t: string, j: number) => (
                              <span key={j} className="text-[10px] bg-violet-500/10 text-violet-700 dark:text-violet-400 px-2 py-0.5 rounded">{t}</span>
                            ))}
                          </div>
                        )}
                        {p.showcaseTip && <div className="text-xs italic text-foreground"><span className="font-bold">💡 Tip:</span> {p.showcaseTip}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interview prep */}
              {roadmap.interviewPrep && (
                <div className="rounded-2xl p-5 border border-border bg-card">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    {t("Chuẩn bị phỏng vấn", "Interview Prep")}
                  </h3>
                  {Array.isArray(roadmap.interviewPrep.topicsToReview) && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {roadmap.interviewPrep.topicsToReview.map((tp: string, i: number) => (
                        <span key={i} className="text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded">{tp}</span>
                      ))}
                    </div>
                  )}
                  {Array.isArray(roadmap.interviewPrep.commonQuestions) && (
                    <ul className="text-sm space-y-1 mt-2">
                      {roadmap.interviewPrep.commonQuestions.map((q: string, i: number) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-indigo-500">Q{i + 1}.</span><span>{q}</span></li>
                      ))}
                    </ul>
                  )}
                  {roadmap.interviewPrep.behavioralTips && (
                    <p className="text-xs italic text-muted-foreground mt-2">💬 {roadmap.interviewPrep.behavioralTips}</p>
                  )}
                </div>
              )}

              {/* Weekly schedule */}
              {roadmap.weeklySchedule && (
                <div className="rounded-2xl p-5 border border-border bg-card">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-500" />
                    {t("Lịch học hàng tuần", "Weekly Schedule")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <div className="text-xs font-bold text-cyan-600 mb-1">📅 {t("Ngày thường", "Weekdays")}</div>
                      <div className="text-sm">{roadmap.weeklySchedule.weekdays}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <div className="text-xs font-bold text-cyan-600 mb-1">🌟 {t("Cuối tuần", "Weekends")}</div>
                      <div className="text-sm">{roadmap.weeklySchedule.weekends}</div>
                    </div>
                  </div>
                  {Array.isArray(roadmap.weeklySchedule.dailyHabits) && (
                    <ul className="text-sm space-y-1">
                      {roadmap.weeklySchedule.dailyHabits.map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-cyan-500">✓</span><span>{h}</span></li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Warning traps */}
              {Array.isArray(roadmap.warningTraps) && roadmap.warningTraps.length > 0 && (
                <div className="rounded-2xl p-5 border-2 border-red-500/30 bg-red-500/5">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    {t("Cạm bẫy cần tránh", "Warning Traps")}
                  </h3>
                  <ul className="text-sm space-y-1.5">
                    {roadmap.warningTraps.map((w: string, i: number) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-red-500">⚠️</span><span>{w}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Citations */}
              {citations.length > 0 && (
                <div className="rounded-2xl p-4 border border-border bg-card">
                  <div className="text-xs font-bold uppercase text-muted-foreground mb-2">{t("Nguồn tham khảo", "Sources")}</div>
                  <div className="space-y-1">
                    {citations.slice(0, 8).map((c, i) => (
                      <a key={i} href={c} target="_blank" rel="noreferrer" className="block text-xs text-primary hover:underline truncate">{i + 1}. {c}</a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default CareerRoadmap;
