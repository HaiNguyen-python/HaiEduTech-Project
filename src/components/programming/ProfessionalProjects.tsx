import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Clock,
  ChevronDown,
  CheckCircle2,
  Wrench,
  Target,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  professionalProjects,
  type ProjectDifficulty,
  type ProjectPillar,
} from "@/data/professionalProjects";

const PILLAR_META: Record<ProjectPillar, { label: string; labelEn: string; emoji: string; color: string }> = {
  python: { label: "Python", labelEn: "Python", emoji: "🐍", color: "from-emerald-500 to-green-600" },
  "software-eng": { label: "SE & Web", labelEn: "SE & Web", emoji: "⚙️", color: "from-slate-600 to-blue-700" },
  "ai-foundation": { label: "AI Foundation", labelEn: "AI Foundation", emoji: "🧠", color: "from-rose-500 to-pink-600" },
  sql: { label: "SQL", labelEn: "SQL", emoji: "🗄️", color: "from-violet-500 to-purple-600" },
  "data-eng": { label: "Data Eng", labelEn: "Data Eng", emoji: "🔄", color: "from-amber-500 to-orange-600" },
  ml: { label: "Machine Learning", labelEn: "Machine Learning", emoji: "🤖", color: "from-teal-500 to-cyan-600" },
  cloud: { label: "Cloud", labelEn: "Cloud", emoji: "☁️", color: "from-sky-500 to-blue-600" },
  "deep-learning": { label: "Deep Learning", labelEn: "Deep Learning", emoji: "🧠", color: "from-indigo-500 to-purple-600" },
  nlp: { label: "NLP", labelEn: "NLP", emoji: "🗣️", color: "from-cyan-500 to-blue-600" },
  "reinforcement-learning": { label: "RL", labelEn: "RL", emoji: "🎮", color: "from-orange-500 to-red-600" },
  cybersecurity: { label: "Cybersecurity", labelEn: "Cybersecurity", emoji: "🛡️", color: "from-red-500 to-orange-600" },
  edtech: { label: "EdTech", labelEn: "EdTech", emoji: "🎓", color: "from-pink-500 to-rose-600" },
};

const DIFFICULTY_META: Record<ProjectDifficulty, { label: string; labelEn: string; className: string }> = {
  beginner: {
    label: "Cơ bản",
    labelEn: "Beginner",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
  intermediate: {
    label: "Trung cấp",
    labelEn: "Intermediate",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
  advanced: {
    label: "Nâng cao",
    labelEn: "Advanced",
    className: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  },
};

const ProfessionalProjects = () => {
  const { t, lang } = useLanguage();
  const [activePillar, setActivePillar] = useState<ProjectPillar | "all">("all");
  const [activeDifficulty, setActiveDifficulty] = useState<ProjectDifficulty | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return professionalProjects.filter(
      (p) =>
        (activePillar === "all" || p.pillar === activePillar) &&
        (activeDifficulty === "all" || p.difficulty === activeDifficulty),
    );
  }, [activePillar, activeDifficulty]);

  const pillarCounts = useMemo(() => {
    const counts: Record<string, number> = { all: professionalProjects.length };
    for (const p of professionalProjects) counts[p.pillar] = (counts[p.pillar] || 0) + 1;
    return counts;
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-1">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 p-6 sm:p-8 mb-6">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="relative flex items-start gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shrink-0">
            <Briefcase className="w-7 h-7" />
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold mb-2">
              <Sparkles className="w-3 h-3" /> {t("DỰ ÁN THỰC CHIẾN", "REAL-WORLD PROJECTS")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight">
              {t("Professional Projects 🚀", "Professional Projects 🚀")}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              {t(
                "Bộ sưu tập dự án IT cho từng pillar đã học. Mỗi dự án có mục tiêu, tech stack, tính năng và deliverable rõ ràng - đưa thẳng vào CV của bạn.",
                "A curated catalog of IT projects for every pillar you've studied. Each project has clear goals, a tech stack, features and deliverables - ready for your CV.",
              )}
            </p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {professionalProjects.length} {t("dự án", "projects")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-rose-600" />
                {Object.keys(PILLAR_META).length} {t("lĩnh vực", "domains")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {t("6-40h mỗi dự án", "6-40h per project")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={activePillar === "all"}
            onClick={() => setActivePillar("all")}
            label={`${t("Tất cả", "All")} (${pillarCounts.all})`}
          />
          {(Object.keys(PILLAR_META) as ProjectPillar[]).map((id) => {
            const meta = PILLAR_META[id];
            const count = pillarCounts[id] || 0;
            if (!count) return null;
            return (
              <FilterChip
                key={id}
                active={activePillar === id}
                onClick={() => setActivePillar(id)}
                label={`${meta.emoji} ${t(meta.label, meta.labelEn)} (${count})`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={activeDifficulty === "all"}
            onClick={() => setActiveDifficulty("all")}
            label={t("Mọi độ khó", "Any difficulty")}
            tone="muted"
          />
          {(Object.keys(DIFFICULTY_META) as ProjectDifficulty[]).map((d) => (
            <FilterChip
              key={d}
              active={activeDifficulty === d}
              onClick={() => setActiveDifficulty(d)}
              label={t(DIFFICULTY_META[d].label, DIFFICULTY_META[d].labelEn)}
              tone="muted"
            />
          ))}
        </div>
      </div>

      {/* Project list */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((p, i) => {
          const meta = PILLAR_META[p.pillar];
          const diff = DIFFICULTY_META[p.difficulty];
          const isOpen = expandedId === p.id;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-xl p-5 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-xl shrink-0`}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base leading-snug">
                    {t(p.title, p.titleEn)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${diff.className}`}>
                      {t(diff.label, diff.labelEn)}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {p.hours}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {meta.emoji} {t(meta.label, meta.labelEn)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {t(p.tagline, p.taglineEn)}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setExpandedId(isOpen ? null : p.id)}
                className="mt-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-1.5"
              >
                {isOpen ? t("Thu gọn", "Collapse") : t("Xem chi tiết", "View details")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-border/60 space-y-3 text-sm">
                      <DetailBlock
                        icon={<Wrench className="w-3.5 h-3.5 text-amber-600" />}
                        title={t("Tính năng chính", "Key features")}
                        items={lang === "vi" ? p.features : p.featuresEn}
                      />
                      <DetailBlock
                        icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        title={t("Sản phẩm bàn giao", "Deliverables")}
                        items={lang === "vi" ? p.deliverables : p.deliverablesEn}
                      />
                      {p.basedOn.length > 0 && (
                        <div className="text-[11px] text-muted-foreground">
                          <span className="font-semibold">{t("Dựa trên bài học: ", "Based on lessons: ")}</span>
                          {p.basedOn.join(", ")}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-muted-foreground">
          {t("Chưa có dự án phù hợp với bộ lọc.", "No projects match the current filter.")}
        </div>
      )}
    </section>
  );
};

const FilterChip = ({
  active,
  onClick,
  label,
  tone = "primary",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  tone?: "primary" | "muted";
}) => {
  const activeCls =
    tone === "primary"
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-foreground text-background border-foreground";
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
        active
          ? `${activeCls} shadow-sm`
          : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
};

const DetailBlock = ({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) => (
  <div>
    <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1.5">
      {icon}
      {title}
    </div>
    <ul className="space-y-1 pl-1">
      {items.map((it, i) => (
        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-1.5">
          <span className="text-primary/60 shrink-0">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProfessionalProjects;
