import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Briefcase,
  TrendingUp,
  MapPin,
  DollarSign,
  Sparkles,
  Loader2,
  Globe2,
  Building2,
  CheckCircle2,
  Circle,
  Radar as RadarIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

/* -----------------------------------------------------------
 * Static IT job-market dataset (curated from public 2025 reports:
 * LinkedIn Jobs on the Rise 2025, Stack Overflow Survey 2024,
 * Statista IT Salary Report EU 2025, ITviec Vietnam 2025,
 * Duunitori & TE-palvelut Finland Q3/Q4 2025)
 * --------------------------------------------------------- */

type DemandLevel = "High" | "Very High" | "Medium";

interface RoleData {
  pillarId: string; // matches Programming.tsx pillar ids
  role: string;
  roleVi: string;
  emoji: string;
  demand: DemandLevel;
  remotePct: number;
  salary: { usa: [number, number]; eu: [number, number]; finland: [number, number]; vietnam: [number, number] }; // USD k except VN (USD k)
  mustHave: string[];
  niceToHave: string[];
  topCompanies: string[];
  certNote: string;
  certNoteVi: string;
  whyHot: string;
  whyHotVi: string;
}

const ROLES: RoleData[] = [
  {
    pillarId: "data-eng",
    role: "Data Engineer",
    roleVi: "Kỹ sư Dữ liệu",
    emoji: "🔄",
    demand: "Very High",
    remotePct: 68,
    salary: { usa: [115, 175], eu: [60, 95], finland: [55, 82], vietnam: [18, 38] },
    mustHave: ["SQL", "Python", "Spark/PySpark", "Airflow", "Snowflake/BigQuery"],
    niceToHave: ["dbt", "Kafka", "Terraform", "AWS/GCP"],
    topCompanies: ["Wolt", "Supercell", "Nokia", "Reaktor", "Smartly", "Google", "Spotify"],
    certNote: "Finish SQL & Database + Data Eng modules → eligible for Junior Data Engineer.",
    certNoteVi: "Học xong SQL & Database + Data Engineering → đủ điều kiện ứng tuyển Junior Data Engineer.",
    whyHot: "Every AI product needs clean pipelines first. Demand grew +38% YoY in EU.",
    whyHotVi: "Mọi sản phẩm AI đều cần pipeline dữ liệu sạch. Nhu cầu EU tăng +38% so với năm trước.",
  },
  {
    pillarId: "ai-foundation",
    role: "AI / ML Engineer",
    roleVi: "Kỹ sư AI / Machine Learning",
    emoji: "🧠",
    demand: "Very High",
    remotePct: 64,
    salary: { usa: [140, 230], eu: [70, 115], finland: [62, 95], vietnam: [22, 50] },
    mustHave: ["Python", "PyTorch/TensorFlow", "LLM Ops", "Vector DBs", "Statistics"],
    niceToHave: ["LangChain", "Triton", "CUDA", "MLflow"],
    topCompanies: ["OpenAI", "Anthropic", "Microsoft", "Silo AI", "Aiven", "Hugging Face"],
    certNote: "Finish AI Foundation + ML modules → eligible for Junior AI Engineer.",
    certNoteVi: "Học xong AI Foundation + ML → đủ điều kiện ứng tuyển Junior AI Engineer.",
    whyHot: "Generative AI roles up +74% in 2025 — the #1 LinkedIn 'Jobs on the Rise'.",
    whyHotVi: "Vị trí về Generative AI tăng +74% năm 2025 — đứng #1 trong LinkedIn Jobs on the Rise.",
  },
  {
    pillarId: "ml",
    role: "ML / Reinforcement Learning",
    roleVi: "Machine Learning / RL",
    emoji: "🤖",
    demand: "High",
    remotePct: 58,
    salary: { usa: [150, 240], eu: [75, 120], finland: [65, 100], vietnam: [25, 55] },
    mustHave: ["Python", "PyTorch", "Math (Linear Algebra, Probability)", "RL frameworks"],
    niceToHave: ["JAX", "Ray RLlib", "Robotics", "Simulation"],
    topCompanies: ["DeepMind", "Wayve", "Supercell", "Bolt", "Tesla"],
    certNote: "Finish ML + RL modules → eligible for Junior ML Engineer.",
    certNoteVi: "Học xong ML + RL → đủ điều kiện ứng tuyển Junior ML Engineer.",
    whyHot: "RL niche but elite: powers game AI, robotics, and LLM alignment (RLHF).",
    whyHotVi: "RL là ngách elite: dùng cho game AI, robotics, và RLHF cho LLM.",
  },
  {
    pillarId: "sql",
    role: "Data Analyst / BI",
    roleVi: "Phân tích Dữ liệu / BI",
    emoji: "🗄️",
    demand: "High",
    remotePct: 72,
    salary: { usa: [75, 120], eu: [45, 72], finland: [42, 65], vietnam: [12, 28] },
    mustHave: ["SQL", "Excel/Sheets", "Power BI / Tableau", "Statistics basics"],
    niceToHave: ["Python (pandas)", "dbt", "Looker", "A/B testing"],
    topCompanies: ["Wolt", "Veho", "Nordea", "OP Group", "Tiger Analytics"],
    certNote: "Finish SQL & Database module → eligible for Junior Data Analyst.",
    certNoteVi: "Học xong SQL & Database → đủ điều kiện ứng tuyển Junior Data Analyst.",
    whyHot: "Highest 'remote-friendly' score and lowest entry barrier in data careers.",
    whyHotVi: "Vị trí 'remote-friendly' nhất và rào cản đầu vào thấp nhất trong ngành data.",
  },
  {
    pillarId: "software-eng",
    role: "Full-stack / Software Engineer",
    roleVi: "Lập trình viên Full-stack",
    emoji: "⚙️",
    demand: "High",
    remotePct: 70,
    salary: { usa: [110, 180], eu: [55, 90], finland: [50, 78], vietnam: [15, 42] },
    mustHave: ["TypeScript", "React/Next.js", "Node/Go", "PostgreSQL", "Git"],
    niceToHave: ["Docker", "AWS", "GraphQL", "System Design"],
    topCompanies: ["Wolt", "Reaktor", "Futurice", "Smartly", "Supercell", "Vercel"],
    certNote: "Finish Software Eng + SQL modules → eligible for Junior Full-stack Developer.",
    certNoteVi: "Học xong Software Eng + SQL → đủ điều kiện ứng tuyển Junior Full-stack Developer.",
    whyHot: "Most universal IT role — every startup hires full-stack first.",
    whyHotVi: "Vị trí phổ biến nhất — mọi startup đều tuyển full-stack đầu tiên.",
  },
  {
    pillarId: "python",
    role: "Python Developer",
    roleVi: "Lập trình viên Python",
    emoji: "🐍",
    demand: "High",
    remotePct: 66,
    salary: { usa: [100, 165], eu: [50, 85], finland: [48, 75], vietnam: [14, 38] },
    mustHave: ["Python", "FastAPI/Django", "SQL", "Testing", "Git"],
    niceToHave: ["Async I/O", "Celery", "Docker", "Type hints"],
    topCompanies: ["Spotify", "Netflix", "Wolt", "Smartly", "Reaktor"],
    certNote: "Finish Python Pathway → eligible for Junior Python / Backend Developer.",
    certNoteVi: "Học xong Python Pathway → đủ điều kiện ứng tuyển Junior Python / Backend Developer.",
    whyHot: "Python is the #1 language on Stack Overflow Survey for the 3rd year.",
    whyHotVi: "Python là ngôn ngữ #1 trên Stack Overflow Survey 3 năm liên tiếp.",
  },
];

// Map pillar id → role index. Pathway uses Python role.
const PILLAR_TO_ROLE: Record<string, string> = {
  "python-pathway": "Python Developer",
  python: "Python Developer",
  "software-eng": "Full-stack / Software Engineer",
  "ai-foundation": "AI / ML Engineer",
  sql: "Data Analyst / BI",
  "data-eng": "Data Engineer",
  ml: "ML / Reinforcement Learning",
};

// 3-year trend (jobs index, base 100 = 2022)
const TREND = [
  { year: "2022", AI: 100, Data: 100, Cloud: 100 },
  { year: "2023", AI: 142, Data: 128, Cloud: 118 },
  { year: "2024", AI: 198, Data: 156, Cloud: 134 },
  { year: "2025", AI: 274, Data: 192, Cloud: 158 },
];

const HELSINKI_HIGHLIGHTS = [
  { label: "Cloud Engineer openings (Helsinki, Q4 2025)", value: "+1,200" },
  { label: "Avg Senior Data Eng salary (Helsinki)", value: "€72–95k" },
  { label: "Top hiring: Wolt, Supercell, Nokia, Reaktor", value: "🇫🇮" },
  { label: "EU Blue Card friendly", value: "✓" },
];

interface Props {
  activePillarId?: string;
}

interface LiveData {
  summary?: string;
  openRoles?: number;
  avgSalaryEur?: string;
  topJobs?: { title: string; company: string; city: string }[];
  topSkills?: string[];
  remotePct?: number;
  trend?: "up" | "flat" | "down";
}

const ITJobMarketDashboard = ({ activePillarId }: Props) => {
  const { t } = useLanguage();

  // selected role syncs with activePillarId, but user can override
  const initial = useMemo(() => {
    const name = activePillarId ? PILLAR_TO_ROLE[activePillarId] : "Data Engineer";
    return ROLES.find((r) => r.role === name) ?? ROLES[0];
  }, [activePillarId]);

  const [selectedRole, setSelectedRole] = useState<RoleData>(initial);
  useEffect(() => {
    setSelectedRole(initial);
  }, [initial]);

  const [live, setLive] = useState<LiveData | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  // Match-my-skills filters
  const [targetSalary, setTargetSalary] = useState<"any" | "high">("any");
  const [targetLocation, setTargetLocation] = useState<"any" | "finland" | "remote">("any");

  const recommendation = useMemo(() => {
    let pool = [...ROLES];
    if (targetSalary === "high") {
      pool = pool.sort((a, b) => b.salary.eu[1] - a.salary.eu[1]);
    }
    if (targetLocation === "finland") {
      pool = pool.sort((a, b) => b.salary.finland[1] - a.salary.finland[1]);
    }
    if (targetLocation === "remote") {
      pool = pool.sort((a, b) => b.remotePct - a.remotePct);
    }
    return pool[0];
  }, [targetSalary, targetLocation]);

  const fetchLive = async () => {
    setLiveLoading(true);
    setLiveError(null);
    try {
      const { data, error } = await supabase.functions.invoke("it-job-market", {
        body: { role: selectedRole.role, location: "Finland" },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error ?? "Unknown error");
      setLive(data.data as LiveData);
    } catch (e) {
      setLiveError(e instanceof Error ? e.message : "Failed to fetch live data");
    } finally {
      setLiveLoading(false);
    }
  };

  // Auto-fetch once on mount
  useEffect(() => {
    fetchLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salaryChartData = [
    { region: "USA", min: selectedRole.salary.usa[0], max: selectedRole.salary.usa[1] },
    { region: "EU", min: selectedRole.salary.eu[0], max: selectedRole.salary.eu[1] },
    { region: "Finland", min: selectedRole.salary.finland[0], max: selectedRole.salary.finland[1] },
    { region: "Vietnam", min: selectedRole.salary.vietnam[0], max: selectedRole.salary.vietnam[1] },
  ];

  const demandColor: Record<DemandLevel, string> = {
    "Very High": "bg-rose-500/15 text-rose-600 border-rose-500/30",
    High: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    Medium: "bg-teal-500/15 text-teal-600 border-teal-500/30",
  };

  return (
    <section className="rounded-2xl border border-border bg-gradient-to-br from-violet-500/5 via-teal-500/5 to-amber-500/5 p-5 sm:p-7 my-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-teal-500 flex items-center justify-center text-white">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-foreground">
              {t("Thị trường việc làm IT toàn cầu", "Global IT Job Market")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t(
                "Dữ liệu lương · nhu cầu · kỹ năng — cập nhật 2025/2026",
                "Salary · demand · skills — updated for 2025/2026",
              )}
            </p>
          </div>
        </div>
        <button
          onClick={fetchLive}
          disabled={liveLoading}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-teal-500 text-white text-xs font-semibold shadow hover:opacity-90 disabled:opacity-60"
        >
          {liveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {liveLoading
            ? t("Đang quét thị trường…", "Scanning Global Job Markets…")
            : t("Cập nhật từ Perplexity", "Refresh via Perplexity")}
        </button>
      </div>

      {/* Role selector chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {ROLES.map((r) => {
          const active = r.role === selectedRole.role;
          return (
            <button
              key={r.role}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              <span className="mr-1">{r.emoji}</span>
              {t(r.roleVi, r.role)}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRole.role}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-3 gap-4"
        >
          {/* Demand + salary band */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> {t("Nhu cầu thị trường", "Demand Heatmap")}
            </div>
            <div
              className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-bold mb-3 ${demandColor[selectedRole.demand]}`}
            >
              {selectedRole.demand}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t(selectedRole.whyHotVi, selectedRole.whyHot)}
            </p>
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Globe2 className="w-3.5 h-3.5" />
                {t("Remote / Hybrid", "Remote / Hybrid")}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                    style={{ width: `${selectedRole.remotePct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground tabular-nums">{selectedRole.remotePct}%</span>
              </div>
            </div>
          </div>

          {/* Salary chart */}
          <div className="rounded-xl border border-border bg-card p-4 lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
              <DollarSign className="w-3.5 h-3.5" /> {t("Lương trung bình hàng năm (USD k)", "Avg annual salary (USD k)")}
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="min" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name={t("Tối thiểu", "Min")} />
                  <Bar dataKey="max" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name={t("Tối đa", "Max")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-xl border border-border bg-card p-4 lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-rose-600 mb-2">
                  {t("Kỹ năng BẮT BUỘC", "Must-have skills")}
                </div>
                <ul className="space-y-1.5">
                  {selectedRole.mustHave.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-teal-600 mb-2">
                  {t("Kỹ năng nên có", "Nice-to-have")}
                </div>
                <ul className="space-y-1.5">
                  {selectedRole.niceToHave.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-foreground">
                      <Circle className="w-3.5 h-3.5 text-teal-500 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border rounded-lg bg-amber-500/5 p-3">
              <p className="text-xs text-foreground">
                <span className="font-bold text-amber-600">🎓 {t("Lộ trình:", "Cert path:")}</span>{" "}
                {t(selectedRole.certNoteVi, selectedRole.certNote)}
              </p>
            </div>
          </div>

          {/* Top companies */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3">
              <Building2 className="w-3.5 h-3.5" /> {t("Công ty đang tuyển", "Top hiring companies")}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedRole.topCompanies.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Trend chart */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
          <RadarIcon className="w-3.5 h-3.5" />{" "}
          {t("Tăng trưởng việc làm 2022-2025 (chỉ số, 2022 = 100)", "Job growth 2022-2025 (index, 2022 = 100)")}
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TREND}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="AI" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Data" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Cloud" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Helsinki highlights */}
      <div className="mt-6 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-white/0 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🇫🇮</span>
          <h3 className="font-display font-bold text-foreground">
            {t("Helsinki Tech Scene Highlights", "Helsinki Tech Scene Highlights")}
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HELSINKI_HIGHLIGHTS.map((h) => (
            <div key={h.label} className="rounded-lg bg-card border border-border p-3">
              <div className="text-base font-bold text-foreground">{h.value}</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-1">{h.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Match my skills */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <h3 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> {t("Match My Skills", "Match My Skills")}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-muted-foreground">{t("Mức lương mong muốn", "Target salary")}</label>
            <select
              value={targetSalary}
              onChange={(e) => setTargetSalary(e.target.value as "any" | "high")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs"
            >
              <option value="any">{t("Bất kỳ", "Any")}</option>
              <option value="high">{t("Cao nhất có thể", "Highest possible")}</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">{t("Địa điểm ưu tiên", "Preferred location")}</label>
            <select
              value={targetLocation}
              onChange={(e) => setTargetLocation(e.target.value as "any" | "finland" | "remote")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs"
            >
              <option value="any">{t("Bất kỳ", "Any")}</option>
              <option value="finland">🇫🇮 Finland</option>
              <option value="remote">{t("Remote toàn cầu", "Remote global")}</option>
            </select>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-violet-500/10 to-teal-500/10 border border-primary/20 p-3">
          <p className="text-xs text-foreground">
            <span className="font-bold">{t("Gợi ý lộ trình:", "Suggested path:")}</span>{" "}
            <span className="text-primary font-semibold">
              {recommendation.emoji} {t(recommendation.roleVi, recommendation.role)}
            </span>{" "}
            — {t(recommendation.certNoteVi, recommendation.certNote)}
          </p>
        </div>
      </div>

      {/* Live feed */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <h3 className="font-display font-bold text-sm text-foreground">
            {t("Live Job Feed — Finland", "Live Job Feed — Finland")}
          </h3>
        </div>
        {liveLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
            {t("Đang quét các bảng tuyển dụng…", "Scanning job boards…")}
          </div>
        )}
        {liveError && !liveLoading && (
          <p className="text-xs text-rose-600">{liveError}</p>
        )}
        {!liveLoading && !liveError && live && (
          <div className="space-y-3">
            {live.summary && <p className="text-xs text-muted-foreground italic">{live.summary}</p>}
            <div className="grid sm:grid-cols-3 gap-2 text-xs">
              {typeof live.openRoles === "number" && (
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">{t("Vị trí mở", "Open roles")}</div>
                  <div className="font-bold text-foreground">{live.openRoles.toLocaleString()}</div>
                </div>
              )}
              {live.avgSalaryEur && (
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">{t("Lương EUR", "Salary EUR")}</div>
                  <div className="font-bold text-foreground">{live.avgSalaryEur}</div>
                </div>
              )}
              {typeof live.remotePct === "number" && (
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">{t("Remote %", "Remote %")}</div>
                  <div className="font-bold text-foreground">{live.remotePct}%</div>
                </div>
              )}
            </div>
            {live.topJobs && live.topJobs.length > 0 && (
              <ul className="space-y-1.5">
                {live.topJobs.slice(0, 5).map((j, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <Briefcase className="w-3 h-3 mt-0.5 text-primary shrink-0" />
                    <span>
                      <span className="font-semibold">{j.title}</span>
                      <span className="text-muted-foreground"> — {j.company}, {j.city}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {live.topSkills && live.topSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {live.topSkills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-5 text-[11px] text-muted-foreground text-center">
        {t(
          "Nguồn dữ liệu: LinkedIn Insights 2025, Stack Overflow Survey 2024, Statista EU IT Salary 2025, Duunitori & TE-palvelut Q4/2025, ITviec Vietnam 2025. Live feed: Perplexity Sonar.",
          "Data sources: LinkedIn Insights 2025, Stack Overflow Survey 2024, Statista EU IT Salary 2025, Duunitori & TE-palvelut Q4/2025, ITviec Vietnam 2025. Live feed: Perplexity Sonar.",
        )}
      </p>
    </section>
  );
};

export default ITJobMarketDashboard;
