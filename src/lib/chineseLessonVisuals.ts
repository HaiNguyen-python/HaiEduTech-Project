import type { ChineseConvLesson } from "@/data/chineseConversationalCurriculum";
import { getSpeakingThemeIllustration } from "@/data/speakingCoachThemeIllustrations";

export interface ChineseLessonIllustration {
  src: string;
  altEn: string;
  altVi: string;
}

export const getChineseLessonIllustration = (
  lesson: Pick<ChineseConvLesson, "id" | "title" | "titleVi" | "titleZh" | "description" | "descriptionVi">,
): ChineseLessonIllustration => {
  const illustration = getSpeakingThemeIllustration({
    id: lesson.id,
    name: `${lesson.title} ${lesson.titleZh} ${lesson.description}`,
    nameVi: `${lesson.titleVi} ${lesson.descriptionVi}`,
  });

  return {
    src: illustration.src,
    altEn: `${illustration.altEn} for ${lesson.title}`,
    altVi: `${illustration.altVi} cho bài ${lesson.titleVi}`,
  };
};