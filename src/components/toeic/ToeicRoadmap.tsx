/**
 * @file ToeicRoadmap.tsx
 * @description Lộ trình TOEIC 4 chặng từ Foundation 450+ → Advanced 900+.
 * Hiển thị các bài học theo thứ tự dễ → khó với số thứ tự, tiến độ, và CTA "Bắt đầu từ đây".
 */
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, PlayCircle, Sparkles, Trophy, Target, Rocket, Crown } from "lucide-react";
import { allToeicLectures, type ToeicLecture } from "@/data/toeicLecturesData";
import { useLanguage } from "@/contexts/LanguageContext";

interface Stage {
  id: string;
  title: string;
  titleVi: string;
  subtitle: string;
  subtitleVi: string;
  icon: typeof Rocket;
  gradient: string;
  ring: string;
  iconColor: string;
  filter: (l: ToeicLecture) => boolean;
}

const STAGES: Stage[] = [
  {
    id: "stage-1",
    title: "Stage 1 · Foundation",
    titleVi: "Chặng 1 · Nền tảng",
    subtitle: "Target 450+ - Start here if you're new to TOEIC",
    subtitleVi: "Mục tiêu 450+ - Bắt đầu nếu bạn mới làm quen TOEIC",
    icon: Rocket,
    gradient: "from-emerald-500/20 to-teal-500/10",
    ring: "ring-emerald-500/30 border-emerald-500/30",
    iconColor: "text-emerald-300 bg-emerald-500/20",
    filter: (l) => l.targetScore === "450+",
  },
  {
    id: "stage-2",
    title: "Stage 2 · Building Skills",
    titleVi: "Chặng 2 · Xây kỹ năng",
    subtitle: "Target 600+ - Master Part 5/6 grammar & Part 3/4 listening",
    subtitleVi: "Mục tiêu 600+ - Làm chủ ngữ pháp Part 5/6 & nghe Part 3/4",
    icon: Target,
    gradient: "from-blue-500/20 to-cyan-500/10",
    ring: "ring-blue-500/30 border-blue-500/30",
    iconColor: "text-blue-300 bg-blue-500/20",
    filter: (l) => l.targetScore === "600+",
  },
  {
    id: "stage-3",
    title: "Stage 3 · Advanced Tactics",
    titleVi: "Chặng 3 · Chiến thuật nâng cao",
    subtitle: "Target 750+ - Tackle inference, indirect answers, and Part 7 double passages",
    subtitleVi: "Mục tiêu 750+ - Suy luận, câu trả lời gián tiếp, Part 7 đa đoạn",
    icon: Trophy,
    gradient: "from-amber-500/20 to-orange-500/10",
    ring: "ring-amber-500/30 border-amber-500/30",
    iconColor: "text-amber-300 bg-amber-500/20",
    filter: (l) => l.targetScore === "750+",
  },
  {
    id: "stage-4",
    title: "Stage 4 · Mastery",
    titleVi: "Chặng 4 · Chinh phục",
    subtitle: "Target 900+ - Perfect score techniques (coming soon)",
    subtitleVi: "Mục tiêu 900+ - Kỹ thuật điểm tuyệt đối (sắp ra mắt)",
    icon: Crown,
    gradient: "from-rose-500/20 to-pink-500/10",
    ring: "ring-rose-500/30 border-rose-500/30",
    iconColor: "text-rose-300 bg-rose-500/20",
    filter: (l) => l.targetScore === "900+",
  },
];

interface ToeicRoadmapProps {
  completedSet: Set<string>;
}

const ToeicRoadmap = ({ completedSet }: ToeicRoadmapProps) => {
  const { t } = useLanguage();

  // Group lessons by stage, preserving original order (already sorted easy → hard in data file).
  const stagesWithLessons = useMemo(() => {
    return STAGES.map((stage) => {
      const lessons = allToeicLectures.filter(stage.filter);
      const completedCount = lessons.filter((l) => completedSet.has(l.id)).length;
      return { ...stage, lessons, completedCount };
    });
  }, [completedSet]);

  // Find the first uncompleted lesson across the whole pathway → "Start here" / "Continue"
  const startHereLesson = useMemo(() => {
    for (const stage of stagesWithLessons) {
      for (const l of stage.lessons) {
        if (!completedSet.has(l.id)) return l;
      }
    }
    return null;
  }, [stagesWithLessons, completedSet]);

  return (
    <section className="container mx-auto px-4 py-8" aria-labelledby="toeic-roadmap-heading">
      {/* Heading + Start Here CTA */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t("Lộ trình học chuẩn", "Recommended Learning Path")}
          </div>
          <h2 id="toeic-roadmap-heading" className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            {t("Bắt đầu từ đâu? Theo lộ trình 4 chặng", "Where to start? Follow the 4-stage roadmap")}
          </h2>
          <p className="text-sm md:text-base text-[#94A3B8] max-w-2xl">
            {t(
              "Các bài học được sắp xếp từ dễ đến khó. Học theo thứ tự sẽ giúp bạn tiến bộ chắc chắn từ 450 lên 900+.",
              "Lessons are arranged from easy to hard. Following the order ensures steady progress from 450 to 900+."
            )}
          </p>
        </div>

        {startHereLesson && (
          <Link
            to={`/toeic-lectures/${startHereLesson.id}`}
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold shadow-lg shadow-[#3B82F6]/30 hover:shadow-[#3B82F6]/50 hover:scale-[1.02] transition-all"
          >
            <PlayCircle className="w-5 h-5" />
            <span className="text-sm">
              {completedSet.size === 0
                ? t("Bắt đầu từ đây", "Start Here")
                : t("Học tiếp", "Continue Learning")}
            </span>
          </Link>
        )}
      </div>

      {/* Stages */}
      <div className="space-y-6">
        {stagesWithLessons.map((stage, stageIdx) => {
          const StageIcon = stage.icon;
          const total = stage.lessons.length;
          const progress = total > 0 ? Math.round((stage.completedCount / total) * 100) : 0;
          const isEmpty = total === 0;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: stageIdx * 0.05 }}
              className={`relative rounded-2xl border bg-gradient-to-br ${stage.gradient} p-5 md:p-6 backdrop-blur-sm ${stage.ring}`}
            >
              {/* Stage header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl ${stage.iconColor} flex items-center justify-center shrink-0`}>
                  <StageIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {t(stage.titleVi, stage.title)}
                  </h3>
                  <p className="text-sm text-[#CBD5E1] mb-2">
                    {t(stage.subtitleVi, stage.subtitle)}
                  </p>
                  {!isEmpty && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#94A3B8] font-medium tabular-nums">
                        {stage.completedCount}/{total} {t("bài", "lessons")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson list - numbered */}
              {isEmpty ? (
                <div className="flex items-center gap-3 px-4 py-6 rounded-xl bg-white/[0.03] border border-dashed border-white/10 text-center justify-center">
                  <Lock className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm text-[#64748B]">
                    {t("Bài học chặng này sẽ sớm được mở.", "Lessons for this stage are coming soon.")}
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stage.lessons.map((lesson, idx) => {
                    const isCompleted = completedSet.has(lesson.id);
                    const isFirst = stageIdx === 0 && idx === 0;
                    return (
                      <Link
                        key={lesson.id}
                        to={`/toeic-lectures/${lesson.id}`}
                        className="group relative flex items-start gap-3 px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20 transition-all"
                      >
                        {/* Number badge */}
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                            isCompleted
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/[0.06] text-[#CBD5E1]"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4.5 h-4.5" />
                          ) : (
                            String(idx + 1).padStart(2, "0")
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            {lesson.parts.slice(0, 2).map((p) => (
                              <span
                                key={p}
                                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20"
                              >
                                {p}
                              </span>
                            ))}
                            {isFirst && !isCompleted && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white animate-pulse">
                                ★ {t("Bắt đầu", "Start")}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-white leading-snug line-clamp-2 group-hover:text-[#93C5FD] transition-colors">
                            {t(lesson.titleVi, lesson.title)}
                          </p>
                          <span className="text-[11px] text-[#64748B] mt-1 block">
                            {lesson.duration}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ToeicRoadmap;
