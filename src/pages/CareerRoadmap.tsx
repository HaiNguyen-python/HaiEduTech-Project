/**
 * @file CareerRoadmap.tsx
 * @description AI-powered personalized IT career roadmap (Data Eng & AI focused).
 * @copyright 2026 HaiEduTech, ILC.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
import { safeStorage } from "@/lib/safeStorage";
import {
  CAREER_ROADMAP_STORAGE_KEY,
  careerRoadmapInputSchema,
  clampInteger,
  parseCareerRoadmap,
  parseStoredCareerRoadmap,
  projectProgressId,
  safeExternalUrl,
  type CareerRoadmapData,
  type CareerRoadmapInput,
} from "@/lib/careerRoadmap";

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

const createFallbackRoadmap = (input: CareerRoadmapInput): CareerRoadmapData => {
  const { role, currentLevel, hoursPerWeek, targetMonths, language } = input;
  const vi = language === "vi";
  const phaseWeeks = Math.max(4, Math.ceil((targetMonths * 4) / 3));

  return {
    roleSummary: vi
      ? `${role} xây dựng năng lực kỹ thuật để giải quyết bài toán thực tế bằng dữ liệu, phần mềm và tự động hóa. Với trình độ ${currentLevel}, lộ trình nên tập trung vào nền tảng chắc, dự án nhỏ có thể demo, rồi nâng dần sang công cụ chuyên môn trong ${targetMonths} tháng.`
      : `${role} requires practical technical depth across data, software, and automation. At ${currentLevel}, the safest path is to build strong fundamentals first, ship small demo-ready projects, then move into role-specific tools across ${targetMonths} months.`,
    coreSkills: [
      { skill: "Programming fundamentals", importance: "must-have", why: vi ? "Nền tảng để học mọi công cụ kỹ thuật tiếp theo." : "The base for every technical tool that follows." },
      { skill: "SQL & data modeling", importance: "must-have", why: vi ? "Cần cho phân tích, backend và hệ thống dữ liệu." : "Essential for analytics, backend work, and data systems." },
      { skill: "Git/GitHub", importance: "must-have", why: vi ? "Giúp quản lý mã nguồn và xây portfolio." : "Required for source control and portfolio proof." },
      { skill: "Cloud basics", importance: "must-have", why: vi ? "Hầu hết sản phẩm hiện đại đều chạy trên cloud." : "Most modern products run on cloud infrastructure." },
      { skill: "System thinking", importance: "nice-to-have", why: vi ? "Giúp hiểu cách các thành phần kết nối với nhau." : "Helps connect tools into reliable workflows." },
      { skill: "AI-assisted productivity", importance: "nice-to-have", why: vi ? "Tăng tốc học, debug và viết tài liệu." : "Speeds up learning, debugging, and documentation." },
    ],
    phases: [
      {
        phase: vi ? "Giai đoạn 1: Nền tảng" : "Phase 1: Foundation",
        durationWeeks: phaseWeeks,
        goals: vi
          ? ["Ôn cú pháp lập trình căn bản", "Thành thạo Git/GitHub", "Viết script nhỏ xử lý dữ liệu", "Nắm SQL SELECT, JOIN, GROUP BY"]
          : ["Review programming syntax", "Use Git/GitHub confidently", "Write small data-processing scripts", "Master SQL SELECT, JOIN, GROUP BY"],
        topics: ["Python", "SQL", "Git", "CLI", "Debugging"],
        resources: [
          { name: "Python for Everybody", type: "course", url: "https://www.py4e.com/", free: true },
          { name: "SQLBolt", type: "course", url: "https://sqlbolt.com/", free: true },
        ],
        practiceProjects: [
          {
            title: vi ? "Bộ phân tích CSV cá nhân" : "Personal CSV Analyzer",
            description: vi ? "Đọc file CSV, làm sạch dữ liệu và xuất báo cáo ngắn." : "Read a CSV file, clean it, and export a short report.",
            difficulty: "easy",
            skillsApplied: ["Python", "SQL", "Git"],
          },
        ],
        milestone: vi ? "Có thể tự viết script nhỏ và đưa dự án lên GitHub." : "You can write small scripts and publish a project to GitHub.",
      },
      {
        phase: vi ? "Giai đoạn 2: Công cụ nghề nghiệp" : "Phase 2: Professional Tools",
        durationWeeks: phaseWeeks,
        goals: vi
          ? ["Xây workflow dữ liệu/API hoàn chỉnh", "Học Docker hoặc cloud cơ bản", "Viết README chuyên nghiệp", "Tạo dashboard hoặc demo có thể trình bày"]
          : ["Build a complete data/API workflow", "Learn Docker or cloud basics", "Write a professional README", "Create a presentable dashboard or demo"],
        topics: ["APIs", "Docker", "Cloud", "Testing", "Documentation"],
        resources: [
          { name: "Docker Getting Started", type: "docs", url: "https://docs.docker.com/get-started/", free: true },
          { name: "GitHub Skills", type: "course", url: "https://skills.github.com/", free: true },
        ],
        practiceProjects: [
          {
            title: vi ? "Pipeline dữ liệu mini" : "Mini Data Pipeline",
            description: vi ? "Lấy dữ liệu từ API, lưu vào database và trực quan hóa kết quả." : "Pull data from an API, store it in a database, and visualize the output.",
            difficulty: "medium",
            skillsApplied: ["API", "Database", "Cloud"],
          },
        ],
        milestone: vi ? "Có một dự án end-to-end đủ tốt để đưa vào CV." : "You have one end-to-end project strong enough for your CV.",
      },
      {
        phase: vi ? "Giai đoạn 3: Portfolio & phỏng vấn" : "Phase 3: Portfolio & Interviews",
        durationWeeks: phaseWeeks,
        goals: vi
          ? ["Hoàn thiện 2-3 dự án portfolio", "Luyện câu hỏi kỹ thuật cốt lõi", "Viết CV theo kết quả đo được", "Ứng tuyển có chiến lược mỗi tuần"]
          : ["Polish 2-3 portfolio projects", "Practice core technical questions", "Write a metrics-driven CV", "Apply strategically every week"],
        topics: ["Portfolio", "Interview prep", "CV", "LinkedIn", "System design basics"],
        resources: [
          { name: "Google Technical Writing", type: "course", url: "https://developers.google.com/tech-writing", free: true },
          { name: "roadmap.sh", type: "docs", url: "https://roadmap.sh/", free: true },
        ],
        practiceProjects: [
          {
            title: vi ? "Dự án capstone theo vai trò" : "Role-specific Capstone",
            description: vi ? `Xây một sản phẩm mô phỏng công việc thật của ${role}, có dữ liệu mẫu, tài liệu và demo.` : `Build a realistic ${role} capstone with sample data, documentation, and a demo.`,
            difficulty: "hard",
            skillsApplied: ["Architecture", "Documentation", "Interview storytelling"],
          },
        ],
        milestone: vi ? "Sẵn sàng ứng tuyển junior/intern hoặc nâng cấp sang chuyên môn sâu hơn." : "You are ready to apply for junior/intern roles or specialize further.",
      },
    ],
    certifications: [
      { name: "Google Data Analytics Professional Certificate", provider: "Google/Coursera", priority: "medium", costUsd: 49, whenToTake: vi ? "sau giai đoạn 1" : "after Phase 1" },
      { name: "AWS Cloud Practitioner", provider: "AWS", priority: "low", costUsd: 100, whenToTake: vi ? "sau giai đoạn 2" : "after Phase 2" },
    ],
    portfolioProjects: [
      {
        title: vi ? "Portfolio 3 dự án" : "Three-project Portfolio",
        description: vi ? "Một dự án nền tảng, một dự án end-to-end và một capstone theo vai trò mục tiêu." : "One foundation project, one end-to-end project, and one role-specific capstone.",
        techStack: ["Python", "SQL", "GitHub", "Cloud"],
        showcaseTip: vi ? "Nêu rõ vấn đề, dữ liệu đầu vào, quyết định kỹ thuật và kết quả đo được." : "Highlight the problem, input data, technical decisions, and measurable result.",
      },
    ],
    interviewPrep: {
      topicsToReview: ["Python", "SQL", "Git", "APIs", "Project explanation"],
      commonQuestions: vi
        ? ["Bạn xử lý lỗi trong pipeline như thế nào?", "JOIN khác UNION như thế nào?", "Giải thích dự án portfolio tốt nhất của bạn."]
        : ["How do you handle failures in a pipeline?", "How is JOIN different from UNION?", "Explain your strongest portfolio project."],
      behavioralTips: vi ? "Trả lời bằng tình huống thật: vấn đề, hành động, kết quả." : "Answer with real situations: problem, action, result.",
    },
    jobSearchStrategy: {
      targetCompanies: vi ? ["EdTech", "Fintech", "E-commerce", "Startup AI", "Công ty outsourcing"] : ["EdTech", "Fintech", "E-commerce", "AI startups", "Software consultancies"],
      platformsToUse: ["LinkedIn", "TopCV", "GitHub", "Wellfound"],
      cvHighlights: vi ? ["Dự án có link demo", "SQL/Python cụ thể", `Tần suất học ${hoursPerWeek} giờ/tuần`] : ["Projects with demo links", "Specific SQL/Python skills", `${hoursPerWeek} hrs/week learning consistency`],
    },
    weeklySchedule: {
      weekdays: vi ? `Học ${Math.max(1, Math.floor(hoursPerWeek / 5))} giờ/ngày: 60% thực hành, 40% lý thuyết.` : `Study ${Math.max(1, Math.floor(hoursPerWeek / 5))} hour(s)/day: 60% practice, 40% theory.`,
      weekends: vi ? "Dành 1 buổi để hoàn thiện dự án và 1 buổi để ôn lỗi sai." : "Use one block for project work and one block for reviewing mistakes.",
      dailyHabits: vi ? ["Commit GitHub", "Ghi lại lỗi đã sửa", "Ôn 5 câu SQL/Python"] : ["Commit to GitHub", "Document fixed bugs", "Review 5 SQL/Python questions"],
    },
    warningTraps: vi
      ? ["Học quá nhiều khóa nhưng không làm dự án", "Chỉ copy code mà không hiểu", "CV ghi công cụ nhưng không có bằng chứng", "Bỏ qua SQL và Git"]
      : ["Taking too many courses without projects", "Copying code without understanding it", "Listing tools without proof", "Skipping SQL and Git"],
    haiEduRecommendation: vi
      ? "Bắt đầu với Python Pathway và SQL, sau đó chuyển sang Data Eng/Cloud hoặc AI Foundation tùy vai trò. Mỗi tuần nên có một sản phẩm nhỏ có thể lưu vào portfolio."
      : "Start with Python Pathway and SQL, then move into Data Eng/Cloud or AI Foundation depending on the role. Each week should produce a small portfolio artifact.",
  };
};

const CareerRoadmap = () => {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const outputRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);
  const storedRef = useRef(parseStoredCareerRoadmap(safeStorage.get(CAREER_ROADMAP_STORAGE_KEY)));
  const [role, setRole] = useState(storedRef.current?.form.role || "data-engineer");
  const [customRole, setCustomRole] = useState(storedRef.current?.form.customRole || "");
  const [currentLevel, setCurrentLevel] = useState(storedRef.current?.form.currentLevel || "complete-beginner");
  const [background, setBackground] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(storedRef.current?.form.hoursPerWeek || 10);
  const [targetMonths, setTargetMonths] = useState(storedRef.current?.form.targetMonths || 6);
  const [loading, setLoading] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<"idle" | "thinking" | "slow" | "fallback">("idle");
  const [roadmap, setRoadmap] = useState<CareerRoadmapData | null>(storedRef.current?.roadmap || null);
  const [citations, setCitations] = useState<string[]>(storedRef.current?.citations || []);
  const [completedProjects, setCompletedProjects] = useState<Record<string, boolean>>(storedRef.current?.completedProjects || {});

  useEffect(() => {
    safeStorage.set(CAREER_ROADMAP_STORAGE_KEY, {
      version: 1,
      form: { role, customRole, currentLevel, hoursPerWeek, targetMonths },
      roadmap,
      citations,
      completedProjects,
    });
  }, [role, customRole, currentLevel, hoursPerWeek, targetMonths, roadmap, citations, completedProjects]);

  useEffect(() => () => {
    requestIdRef.current += 1;
  }, []);

  const generate = async () => {
    if (loading) return;
    const finalRole = role === "other" ? customRole.trim() : (PRESET_ROLES.find(r => r.id === role)?.labelEn || role);
    const requestBodyResult = careerRoadmapInputSchema.safeParse({
      role: finalRole,
      currentLevel: LEVELS.find(l => l.id === currentLevel)?.en || currentLevel,
      background: background.trim(),
      hoursPerWeek,
      targetMonths,
      language: lang,
    });
    if (!requestBodyResult.success) {
      toast.error(t("Vui lòng kiểm tra vai trò, giờ học và thời gian mục tiêu.", "Please check the role, study hours, and target timeline."));
      return;
    }
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setGenerationStatus("thinking");
    setRoadmap(null);
    setCitations([]);
    setCompletedProjects({});
    const requestBody: CareerRoadmapInput = requestBodyResult.data as CareerRoadmapInput;
    let showedFallback = false;
    const showDraftRoadmap = () => {
      if (requestIdRef.current !== requestId) return;
      showedFallback = true;
      setRoadmap(createFallbackRoadmap(requestBody));
      setCitations([]);
      setGenerationStatus("fallback");
      window.setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    };
    const draftTimer = window.setTimeout(showDraftRoadmap, 4500);
    const slowTimer = window.setTimeout(() => setGenerationStatus("slow"), 9000);
    let requestTimeout: number | undefined;
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        requestTimeout = window.setTimeout(() => reject(new Error("ROADMAP_TIMEOUT")), 38000);
      });
      const { data, error } = await Promise.race([
        supabase.functions.invoke("career-roadmap-ai", { body: requestBody }),
        timeoutPromise,
      ]);
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed");
      const parsedRoadmap = parseCareerRoadmap(data.roadmap);
      if (!parsedRoadmap) throw new Error("INVALID_ROADMAP_SHAPE");
      if (requestIdRef.current !== requestId) return;
      setRoadmap(parsedRoadmap);
      setCitations(Array.isArray(data.citations)
        ? data.citations.map(safeExternalUrl).filter((url): url is string => Boolean(url)).slice(0, 8)
        : []);
      setGenerationStatus("idle");
      toast.success(showedFallback ? t("Đã cập nhật lộ trình chi tiết!", "Detailed roadmap updated!") : t("Đã tạo lộ trình!", "Roadmap generated!"));
    } catch (e: unknown) {
      if (!showedFallback) showDraftRoadmap();
      const errorMessage = e instanceof Error ? e.message : "";
      toast.warning(
        errorMessage === "ROADMAP_TIMEOUT"
          ? t("Dịch vụ phản hồi chậm, đã tạo lộ trình nhanh để bạn tiếp tục.", "The service is slow, so a quick roadmap is ready for you.")
          : t("Dịch vụ tạm thời gián đoạn, đã tạo lộ trình dự phòng.", "The service is temporarily unavailable, so a fallback roadmap is ready.")
      );
    } finally {
      window.clearTimeout(draftTimer);
      window.clearTimeout(slowTimer);
      if (requestTimeout) window.clearTimeout(requestTimeout);
      if (requestIdRef.current === requestId) {
        setLoading(false);
        window.setTimeout(() => outputRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 120);
      }
    }
  };

  const toggleProject = (id: string) => {
    setCompletedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("Career Roadmap - Lộ trình nghề IT | HaiEduTech", "Career Roadmap - Personalized IT Career Path | HaiEduTech")}
        description={t(
          "Lộ trình học và luyện tập chi tiết cho Data Engineer, AI Engineer và các vị trí IT khác, cá nhân hóa theo trình độ và thời gian.",
          "Detailed learning and practice roadmaps for Data Engineer, AI Engineer, and other IT roles, personalized by level and timeline."
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
            <Sparkles className="w-3 h-3" /> {t("Lộ trình cá nhân hóa", "Personalized learning path")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 leading-tight">
            {t("Career", "Career")}{" "}
            <span className="text-gradient">Roadmap</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            {t(
              "Lộ trình học và luyện tập chi tiết cho các vị trí IT, chuyên sâu Data Engineer và AI, dựa trên dữ liệu thị trường mới nhất.",
              "Detailed learning and practice roadmaps for IT roles, with deep Data Engineer and AI coverage informed by current market data."
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3" role="radiogroup" aria-label={t("Vai trò nghề nghiệp", "Career role")}>
            {PRESET_ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                aria-pressed={role === r.id}
                disabled={loading}
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
              aria-pressed={role === "other"}
              disabled={loading}
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
              maxLength={80}
              disabled={loading}
              className="mb-2"
            />
          )}

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div>
              <Label className="text-sm font-semibold mb-2 block">{t("Trình độ hiện tại", "Current level")}</Label>
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={t("Trình độ hiện tại", "Current level")}>
                {LEVELS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setCurrentLevel(l.id)}
                    aria-pressed={currentLevel === l.id}
                    disabled={loading}
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
                <Input type="number" min={1} max={80} value={hoursPerWeek} disabled={loading} onChange={e => setHoursPerWeek(Number(e.target.value))} onBlur={() => setHoursPerWeek(value => clampInteger(value, 1, 80, 10))} />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">{t("Mục tiêu (tháng)", "Target (months)")}</Label>
                <Input type="number" min={1} max={36} value={targetMonths} disabled={loading} onChange={e => setTargetMonths(Number(e.target.value))} onBlur={() => setTargetMonths(value => clampInteger(value, 1, 36, 6))} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-sm font-semibold mb-2 block">{t("Bối cảnh / kinh nghiệm (tùy chọn)", "Background / experience (optional)")}</Label>
            <Textarea
              placeholder={t("Ví dụ: Học CNTT năm 3, biết Python cơ bản, muốn làm việc ở Singapore", "e.g. CS junior, basic Python, want to work in Singapore")}
              value={background}
              onChange={e => setBackground(e.target.value)}
              maxLength={800}
              disabled={loading}
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
              <><Sparkles className="w-4 h-4 mr-2" />{t("Tạo Career Roadmap", "Generate Career Roadmap")}</>
            )}
          </Button>
          {(loading || generationStatus === "fallback") && (
            <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm font-medium text-primary" role="status" aria-live="polite">
              {generationStatus === "fallback"
                ? loading
                  ? t("Đã hiển thị lộ trình nhanh. Bản chi tiết vẫn đang được hoàn thiện...", "A quick roadmap is ready while the detailed version is being completed...")
                  : t("Đang dùng lộ trình dự phòng. Bạn có thể thử tạo lại sau.", "Using a fallback roadmap. You can try generating again later.")
                : generationStatus === "slow"
                ? t("Đang phân tích sâu hơn, vui lòng đợi thêm một chút...", "A deeper analysis is underway. Please wait a little longer...")
                : t("Đang xây dựng lộ trình cá nhân hóa...", "Building your personalized roadmap...")}
            </div>
          )}
        </div>

        {/* Roadmap output */}
        <div ref={outputRef}>
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
                    {roadmap.coreSkills.map((s, i) => (
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
              {Array.isArray(roadmap.phases) && roadmap.phases.map((ph, i) => (
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
                        {ph.resources.map((r, j) => (
                          (() => {
                            const resourceUrl = safeExternalUrl(r.url);
                            const content = (
                              <>
                                <span className="text-base">{r.type === "course" ? "🎓" : r.type === "book" ? "📚" : r.type === "youtube" ? "▶️" : "📄"}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold truncate">{r.name}</div>
                                  <div className="text-[10px] text-muted-foreground">{r.free ? t("Miễn phí", "Free") : t("Trả phí", "Paid")}</div>
                                </div>
                                {resourceUrl && <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />}
                              </>
                            );
                            return resourceUrl ? (
                              <a key={j} href={resourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors text-sm">
                                {content}
                              </a>
                            ) : (
                              <div key={j} className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border text-sm">
                                {content}
                              </div>
                            );
                          })()
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(ph.practiceProjects) && ph.practiceProjects.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-bold uppercase text-muted-foreground mb-1 flex items-center gap-1"><Code2 className="w-3 h-3" /> {t("Dự án luyện tập", "Practice projects")}</div>
                      <div className="space-y-2">
                        {ph.practiceProjects.map((p, j) => {
                            const pid = projectProgressId(ph.phase, p.title);
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
                    {roadmap.certifications.map((c, i) => (
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
                    {roadmap.portfolioProjects.map((p, i) => (
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
      </div>

      <Footer />
    </div>
  );
};

export default CareerRoadmap;
