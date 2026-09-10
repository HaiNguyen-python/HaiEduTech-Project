/**
 * @file LessonDialog.tsx
 * @description Full-screen-centred reading pop-up for a Lifestyle Academy
 *              lesson. Holds every deep section (why it matters, framework,
 *              deep dive, takeaways, reflection, drill) at a comfortable
 *              reading width, with key terms emphasised.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { Clock, Compass, Target, BookOpen, Headphones } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { emphasize } from "@/lib/lifestyleEmphasis";
import { getLessonImage } from "@/data/lifestyleLessonImages";
import type { LifestyleLesson } from "@/data/lifestyleAcademyLessons";

export interface LessonDialogStyles {
  border: string;
  bannerFrom: string;
  bannerTo: string;
  chipBg: string;
  emojis: string[];
}

interface LessonDialogProps {
  lesson: LifestyleLesson;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  styles: LessonDialogStyles;
  iconBg: string;
  accentText: string;
  pillarTitle: string;
  levelLabel: string;
}

const LessonDialog = ({
  lesson,
  open,
  onOpenChange,
  styles,
  iconBg,
  accentText,
  pillarTitle,
  levelLabel,
}: LessonDialogProps) => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";
  const image = getLessonImage(lesson.id);
  const MediumIcon =
    lesson.medium === "audio" ? Headphones : lesson.medium === "practice" ? Target : BookOpen;

  const deepDive = (vi ? lesson.deepDiveVi : lesson.deepDiveEn) ?? [];
  const whyItMatters = vi ? lesson.whyItMattersVi : lesson.whyItMattersEn;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl gap-0 overflow-hidden p-0 sm:rounded-2xl"
        aria-describedby={undefined}
      >
        {/* Cover */}
        <div className={`relative aspect-[16/7] w-full bg-gradient-to-br ${styles.bannerFrom} ${styles.bannerTo}`}>
          {image ? (
            <img
              src={image}
              alt={vi ? lesson.titleVi : lesson.titleEn}
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={448}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-4 text-4xl" aria-hidden>
              {(lesson.illustrationEmojis ?? styles.emojis).slice(0, 4).map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </div>
          )}
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
          <DialogHeader className="space-y-3 text-left">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
              <span className={`rounded-full px-2 py-0.5 ${styles.chipBg} ${accentText}`}>{pillarTitle}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-slate-600 dark:text-slate-300">{levelLabel}</span>
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {lesson.minutes} {t("phút", "min")}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <MediumIcon className="h-3.5 w-3.5" />
                {lesson.medium === "audio"
                  ? t("Nghe", "Audio")
                  : lesson.medium === "practice"
                    ? t("Thực hành", "Practice")
                    : t("Đọc", "Read")}
              </span>
            </div>

            <DialogTitle className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl dark:text-slate-50">
              {vi ? lesson.titleVi : lesson.titleEn}
            </DialogTitle>

            <DialogDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {vi ? lesson.subtitleVi : lesson.subtitleEn}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {whyItMatters && (
              <section
                className={`rounded-xl border-l-4 ${styles.border} bg-gradient-to-br ${styles.bannerFrom} ${styles.bannerTo} px-4 py-4`}
              >
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-100">
                  {t("Vì sao điều này quan trọng", "Why it matters")}
                </h3>
                <p className="mt-2 text-base font-medium leading-relaxed text-slate-800 dark:text-slate-50">
                  {emphasize(whyItMatters)}
                </p>
              </section>
            )}

            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Compass className="mr-1 inline h-3.5 w-3.5" />
                {t("Khung tư duy", "Framework")}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-100">
                {emphasize(vi ? lesson.frameworkVi : lesson.frameworkEn)}
              </p>
            </section>

            {deepDive.length > 0 && (
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t("Đào sâu", "Deep dive")}
                </h3>
                <div className="mt-3 space-y-4">
                  {deepDive.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-[1.85] text-slate-800 dark:text-slate-100"
                    >
                      {emphasize(para)}
                    </p>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {t("Điểm cốt lõi", "Core takeaways")}
              </h3>
              <ul className="mt-3 space-y-3">
                {lesson.takeaways.map((tk, idx) => (
                  <li key={idx} className="flex gap-3 text-base leading-relaxed text-slate-800 dark:text-slate-100">
                    <span
                      aria-hidden
                      className={`mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${iconBg}`}
                    />
                    <span>{emphasize(vi ? tk.vi : tk.en)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-dashed border-amber-300/70 bg-amber-50/70 px-4 py-4 dark:border-amber-400/30 dark:bg-amber-500/10">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {t("Câu hỏi phản chiếu", "Reflection prompt")}
              </h3>
              <p className="mt-2 text-base italic leading-relaxed text-slate-800 dark:text-slate-100">
                {vi ? lesson.reflectionVi : lesson.reflectionEn}
              </p>
            </section>

            <section className="rounded-xl border border-dashed border-emerald-300/70 bg-emerald-50/70 px-4 py-4 dark:border-emerald-400/30 dark:bg-emerald-500/10">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Target className="mr-1 inline h-3.5 w-3.5" />
                {t("Bài tập thực hành", "Practical drill")}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-100">
                {emphasize(vi ? lesson.drillVi : lesson.drillEn)}
              </p>
            </section>

            {(vi ? lesson.safetyNotesVi : lesson.safetyNotesEn) && (
              <section className="rounded-xl border border-dashed border-rose-300/70 bg-rose-50/70 px-4 py-4 dark:border-rose-400/30 dark:bg-rose-500/10">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  {t("Lưu ý an toàn", "Safety note")}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-100">
                  {emphasize((vi ? lesson.safetyNotesVi : lesson.safetyNotesEn) as string)}
                </p>
              </section>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDialog;
