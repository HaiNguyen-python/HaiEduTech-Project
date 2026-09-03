/**
 * @file SpeakingOverview.tsx
 * @description Speaking Coach landing tab: the learner's pronunciation charts
 * first, then the personalised next step, then the activity grid.
 */
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SpeakingLang } from "@/lib/speakingModeShared";
import type { PlanMode } from "@/lib/speaking/pronunciationPlan";
import PronunciationStatsPanel from "@/components/speaking/PronunciationStatsPanel";
import PronunciationPlanPanel from "@/components/speaking/PronunciationPlanPanel";
import { ActivityGrid, type SpeakingActivity } from "@/components/speaking/ActivityPicker";

interface Props {
  language: SpeakingLang;
  weakCount?: number;
  hasData: boolean;
  onGoMode: (mode: PlanMode) => void;
  onPickActivity: (activity: SpeakingActivity) => void;
}

const SpeakingOverview = ({ language, weakCount = 0, hasData, onGoMode, onPickActivity }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {hasData ? (
        <>
          <PronunciationStatsPanel language={language} variant="compact" onPractice={() => onGoMode("review")} />
          <PronunciationPlanPanel language={language} variant="hero" onGoMode={onGoMode} />
        </>
      ) : (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="py-8 text-center space-y-2">
            <p className="text-lg font-bold">
              {t("Chào bạn! Hãy luyện nói vài phút", "Welcome! Practise speaking for a few minutes")}
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {t(
                "Sau vài lượt luyện, biểu đồ phát âm và lộ trình cá nhân hóa của bạn sẽ hiện ngay tại đây. Bắt đầu với Câu mẫu là dễ nhất.",
                "After a few attempts, your pronunciation charts and personalised roadmap appear right here. Sentences is the easiest place to start."
              )}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-bold">{t("Chọn hoạt động luyện tập", "Choose a practice activity")}</h2>
        <ActivityGrid weakCount={weakCount} onPick={onPickActivity} />
      </div>
    </div>
  );
};

export default SpeakingOverview;
