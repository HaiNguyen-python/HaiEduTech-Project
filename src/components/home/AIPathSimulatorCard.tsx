/**
 * @file AIPathSimulatorCard.tsx
 * @description Glassmorphism card in the Hero that morphs to preview one of four AI learning paths.
 * 3D tilt via useTilt (desktop only), Framer Motion morph transitions.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, GraduationCap, Code2, Plane, Sparkles } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { useLanguage } from "@/contexts/LanguageContext";

type PathId = "ielts" | "yki" | "python" | "abroad";

interface PathDef {
  id: PathId;
  label: string;
  labelVi: string;
  icon: typeof Target;
  metric: string;
  metricVi: string;
  steps: [string, string, string];
  stepsVi: [string, string, string];
  route: string;
  glow: string;
}

const PATHS: PathDef[] = [
  {
    id: "ielts",
    label: "IELTS 7.5",
    labelVi: "IELTS 7.5",
    icon: Target,
    metric: "Band 7.5 in ~14 weeks",
    metricVi: "Đạt 7.5 trong ~14 tuần",
    steps: ["Diagnostic + skill map", "AI Speaking & Writing drills", "Full mock + strategy review"],
    stepsVi: ["Kiểm tra đầu vào + bản đồ kỹ năng", "Luyện Speaking & Writing với AI", "Đề mock + rà soát chiến lược"],
    route: "/ielts",
    glow: "hsl(var(--primary) / 0.35)",
  },
  {
    id: "yki",
    label: "YKI Finnish",
    labelVi: "YKI Tiếng Phần Lan",
    icon: GraduationCap,
    metric: "YKI A2 → B1 ready",
    metricVi: "Sẵn sàng YKI A2 → B1",
    steps: ["A1 grammar + core 550 words", "Listening & reading labs", "YKI mock skills lab"],
    stepsVi: ["Ngữ pháp A1 + 550 từ lõi", "Lab nghe & đọc", "Skills Lab mô phỏng YKI"],
    route: "/finnish/yki-a2",
    glow: "hsl(160 84% 45% / 0.35)",
  },
  {
    id: "python",
    label: "Python AI",
    labelVi: "Python AI",
    icon: Code2,
    metric: "Ship your first ML app",
    metricVi: "Ra mắt ứng dụng ML đầu tiên",
    steps: ["Python fundamentals + Pyodide", "Data pipelines + SQL", "ML mini-project"],
    stepsVi: ["Python cơ bản + Pyodide", "Pipeline dữ liệu + SQL", "Dự án ML nhỏ"],
    route: "/programming",
    glow: "hsl(42 92% 60% / 0.35)",
  },
  {
    id: "abroad",
    label: "Study Abroad",
    labelVi: "Du học",
    icon: Plane,
    metric: "Personalized shortlist",
    metricVi: "Danh sách trường cá nhân hóa",
    steps: ["Profile + budget audit", "University shortlister AI", "Scholarship + SOP coach"],
    stepsVi: ["Rà soát hồ sơ + ngân sách", "AI chọn trường phù hợp", "Học bổng + luyện SOP"],
    route: "/study-abroad",
    glow: "hsl(200 90% 55% / 0.35)",
  },
];

const AIPathSimulatorCard = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<PathId>("ielts");
  const tiltRef = useTilt(8);

  const current = PATHS.find((p) => p.id === active)!;
  const Icon = current.icon;

  return (
    <div className="w-full max-w-md">
      {/* Quick-action pills */}
      <div className="mb-3 flex flex-wrap gap-2">
        {PATHS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              active === p.id
                ? "border-primary bg-primary/15 text-primary shadow-sm"
                : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {t(p.labelVi, p.label)}
          </button>
        ))}
      </div>

      {/* Tilt card */}
      <div
        ref={tiltRef as any}
        className="relative rounded-2xl border border-white/15 bg-background/40 p-5 shadow-2xl backdrop-blur-xl dark:bg-background/30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 0%, ${current.glow}, transparent 60%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              {t("Lộ trình AI", "AI Path Preview")}
            </div>
            <div className="font-display text-lg font-bold leading-tight text-foreground">
              {t(current.labelVi, current.label)}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ol className="mb-4 space-y-2">
              {(t("vi", "en") === "vi" ? current.stepsVi : current.steps).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
              {t(current.metricVi, current.metric)}
            </div>

            <Link
              to={current.route}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110"
            >
              {t("Bắt đầu lộ trình", "Start this path")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIPathSimulatorCard;
