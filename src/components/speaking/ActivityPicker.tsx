/**
 * @file ActivityPicker.tsx
 * @description Grid of the five Speaking Coach practice activities plus a
 * compact chip bar to switch quickly while practising.
 */
import { motion } from "framer-motion";
import { ArrowRight, Brain, Layers, MessageCircle, Mic, Repeat, UserRound, Waves } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export type SpeakingActivity = "sentences" | "pattern" | "shadow" | "drill" | "freetalk" | "mrhai" | "review";

export const ACTIVITY_META = [
  {
    key: "sentences" as const,
    icon: Mic,
    vi: "Câu mẫu",
    en: "Sentences",
    descVi: "Đọc theo câu mẫu theo chủ đề và được chấm từng từ.",
    descEn: "Read themed model sentences and get word-by-word scoring.",
    minutes: 5,
  },
  {
    key: "pattern" as const,
    icon: Layers,
    vi: "Luyện khung câu",
    en: "Pattern Drilling",
    descVi: "Thay từ vào khung câu phổ biến theo cấp độ, luyện phản xạ nói cho người mất gốc.",
    descEn: "Swap words into common frames by level to build speaking reflexes.",
    minutes: 6,
  },
  {
    key: "shadow" as const,
    icon: Repeat,
    vi: "Nói theo",
    en: "Shadowing",
    descVi: "Nghe rồi nói theo đúng nhịp điệu và tốc độ người bản xứ.",
    descEn: "Listen then echo the model, matching native rhythm and pace.",
    minutes: 5,
  },
  {
    key: "drill" as const,
    icon: Waves,
    vi: "Luyện âm",
    en: "Sound drill",
    descVi: "Phân biệt các cặp âm dễ lẫn, luyện chậm từng âm.",
    descEn: "Tell confusable minimal pairs apart, one sound at a time.",
    minutes: 5,
  },
  {
    key: "freetalk" as const,
    icon: MessageCircle,
    vi: "Nói tự do",
    en: "Free Talk",
    descVi: "Nói 30-90 giây theo chủ đề và nhận nhận xét chi tiết.",
    descEn: "Speak 30-90 seconds on a topic and get detailed feedback.",
    minutes: 4,
  },
  {
    key: "mrhai" as const,
    icon: UserRound,
    vi: "Nói với thầy Hải",
    en: "Speak with Mr. Hai",
    descVi: "Hội thoại giọng nói hai chiều trong các tình huống tự do.",
    descEn: "Two-way voice conversation across open-ended situations.",
    minutes: 8,
  },
  {
    key: "review" as const,
    icon: Brain,
    vi: "Ôn từ yếu",
    en: "Weak words",
    descVi: "Ôn lại đúng những từ bạn hay phát âm sai, theo lịch giãn cách.",
    descEn: "Spaced review of the exact words you keep mispronouncing.",
    minutes: 5,
  },
];

const PATTERN_LANGS = ["english", "chinese"];
const visibleActivities = (language?: string) =>
  ACTIVITY_META.filter((a) => a.key !== "pattern" || PATTERN_LANGS.includes(language || ""));

interface GridProps {
  language?: string;
  weakCount?: number;
  onPick: (activity: SpeakingActivity) => void;
}

export const ActivityGrid = ({ language, weakCount = 0, onPick }: GridProps) => {
  const { t } = useLanguage();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {visibleActivities(language).map((a, i) => {
        const Icon = a.icon;
        return (
          <motion.div
            key={a.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex flex-col h-full gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold">{t(a.vi, a.en)}</p>
                  {a.key === "review" && weakCount > 0 && (
                    <Badge variant="secondary" className="ml-auto">{weakCount}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex-1">{t(a.descVi, a.descEn)}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">~{a.minutes} {t("phút", "min")}</span>
                  <Button size="sm" className="gap-1" onClick={() => onPick(a.key)}>
                    {t("Bắt đầu", "Start")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

interface ChipProps {
  language?: string;
  active: SpeakingActivity;
  weakCount?: number;
  onPick: (activity: SpeakingActivity) => void;
}

export const ActivityChips = ({ language, active, weakCount = 0, onPick }: ChipProps) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap gap-2">
      {visibleActivities(language).map((a) => {
        const Icon = a.icon;
        return (
          <Button
            key={a.key}
            size="sm"
            variant={active === a.key ? "default" : "outline"}
            className="gap-1"
            onClick={() => onPick(a.key)}
          >
            <Icon className="w-4 h-4" />
            {t(a.vi, a.en)}
            {a.key === "review" && weakCount > 0 && (
              <Badge variant="secondary" className="ml-1">{weakCount}</Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default ActivityGrid;
