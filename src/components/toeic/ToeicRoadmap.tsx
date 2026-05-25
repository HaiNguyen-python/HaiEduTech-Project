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
    gradient: "from-emerald-50 to-teal-50",
    ring: "border-emerald-300",
    iconColor: "text-white bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200",
    filter: (l) => l.targetScore === "450+",
  },
  {
    id: "stage-2",
    title: "Stage 2 · Building Skills",
    titleVi: "Chặng 2 · Xây kỹ năng",
    subtitle: "Target 600+ - Master Part 5/6 grammar & Part 3/4 listening",
    subtitleVi: "Mục tiêu 600+ - Làm chủ ngữ pháp Part 5/6 & nghe Part 3/4",
    icon: Target,
    gradient: "from-sky-50 to-cyan-50",
    ring: "border-sky-300",
    iconColor: "text-white bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-200",
    filter: (l) => l.targetScore === "600+",
  },
  {
    id: "stage-3",
    title: "Stage 3 · Advanced Tactics",
    titleVi: "Chặng 3 · Chiến thuật nâng cao",
    subtitle: "Target 750+ - Tackle inference, indirect answers, and Part 7 double passages",
    subtitleVi: "Mục tiêu 750+ - Suy luận, câu trả lời gián tiếp, Part 7 đa đoạn",
    icon: Trophy,
    gradient: "from-amber-50 to-orange-50",
    ring: "border-amber-300",
    iconColor: "text-white bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200",
    filter: (l) => l.targetScore === "750+",
  },
  {
    id: "stage-4",
    title: "Stage 4 · Mastery",
    titleVi: "Chặng 4 · Chinh phục",
    subtitle: "Target 900+ - Perfect score techniques (coming soon)",
    subtitleVi: "Mục tiêu 900+ - Kỹ thuật điểm tuyệt đối (sắp ra mắt)",
    icon: Crown,
    gradient: "from-rose-50 to-pink-50",
    ring: "border-rose-300",
    iconColor: "text-white bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-200",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border-2 border-sky-200 text-sky-700 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {t("Lộ trình học chuẩn", "Recommended Learning Path")}
          </div>
          <h2 id="toeic-roadmap-heading" className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">
            {t("Bắt đầu từ đâu? Theo lộ trình 4 chặng", "Where to start? Follow the 4-stage roadmap")}
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl">
            {t(
              "Các bài học được sắp xếp từ dễ đến khó. Học theo thứ tự sẽ giúp bạn tiến bộ chắc chắn từ 450 lên 900+.",
              "Lessons are arranged from easy to hard. Following the order ensures steady progress from 450 to 900+."
            )}
          </p>
        </div>

        {startHereLesson && (
          <Link
            to={`/toeic-lectures/${startHereLesson.id}`}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-sky-300/50 hover:shadow-2xl hover:shadow-sky-400/60 hover:scale-[1.03] transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            <PlayCircle className="w-5 h-5 relative" />
            <span className="text-sm relative">
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
              className={`relative rounded-2xl border-2 bg-gradient-to-br ${stage.gradient} p-5 md:p-6 ${stage.ring} shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow`}
            >
              {/* Stage header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl ${stage.iconColor} flex items-center justify-center shrink-0`}>
                  <StageIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                    {t(stage.titleVi, stage.title)}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {t(stage.subtitleVi, stage.subtitle)}
                  </p>
                  {!isEmpty && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-xs h-2 rounded-full bg-white/70 overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold tabular-nums">
                        {stage.completedCount}/{total} {t("bài", "lessons")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson list - numbered */}
              {isEmpty ? (
                <div className="flex items-center gap-3 px-4 py-6 rounded-xl bg-white/60 border-2 border-dashed border-slate-300 text-center justify-center">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500">
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
                        className="group relative flex items-start gap-3 px-3.5 py-3 rounded-xl bg-white border-2 border-slate-200 hover:bg-sky-50 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-200/60 hover:-translate-y-0.5 transition-all"
                      >
                        {/* Number badge */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                            isCompleted
                              ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                              : "bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 border border-sky-200"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            String(idx + 1).padStart(2, "0")
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            {lesson.parts.slice(0, 2).map((p) => (
                              <span
                                key={p}
                                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200"
                              >
                                {p}
                              </span>
                            ))}
                            {isFirst && !isCompleted && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-sky-500 to-blue-600 text-white animate-pulse shadow-sm">
                                ★ {t("Bắt đầu", "Start")}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
                            {t(lesson.titleVi, lesson.title)}
                          </p>
                          <span className="text-[11px] text-slate-500 mt-1 block">
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
