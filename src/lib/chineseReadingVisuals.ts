import type { ChineseReadingPassage } from "@/data/chineseReadingPractice";
import { getSpeakingThemeIllustration } from "@/data/speakingCoachThemeIllustrations";

export interface ChineseReadingIllustration {
  src: string;
  altEn: string;
  altVi: string;
}

export const getChineseReadingIllustration = (
  passage: Pick<ChineseReadingPassage, "id" | "title" | "titleVi" | "hanzi">,
): ChineseReadingIllustration => {
  const illustration = getSpeakingThemeIllustration({
    id: passage.id,
    name: `${passage.title} ${passage.hanzi}`,
    nameVi: passage.titleVi,
  });

  return {
    src: illustration.src,
    altEn: `${illustration.altEn} for ${passage.title}`,
    altVi: `${illustration.altVi} cho bài ${passage.titleVi}`,
  };
};