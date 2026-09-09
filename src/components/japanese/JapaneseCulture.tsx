/**
 * @file JapaneseCulture.tsx
 * @description Culture and study-abroad notes for Japanese learners, with
 *  spoken key phrases.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_CULTURE } from "@/data/japanese/culture";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

export default function JapaneseCulture({ t, lang, speak }: Props) {
  return (
    <div className="space-y-4">
      <Card className="border-pink-200 bg-white/85 p-4 text-base leading-relaxed text-slate-700">
        {t(
          "Hiểu văn hoá giúp bạn dùng đúng câu, đúng lúc. Mỗi mục dưới đây là kinh nghiệm thực tế khi học và sống ở Nhật.",
          "Understanding the culture helps you use the right phrase at the right time. Each section below is practical experience from studying and living in Japan.",
        )}
      </Card>

      {JA_CULTURE.map((topic) => (
        <Card key={topic.id} className="border-pink-200 p-5">
          <h3 className="text-lg font-bold text-rose-700">
            {topic.icon} {lang === "vi" ? topic.title_vi : topic.title_en}
          </h3>
          <div className="mt-3 space-y-2">
            {(lang === "vi" ? topic.body_vi : topic.body_en).map((line, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-700">
                • {line}
              </p>
            ))}
          </div>

          {topic.phrases && topic.phrases.length > 0 && (
            <div className="mt-4 space-y-2 rounded-lg border border-pink-100 bg-pink-50/70 p-3">
              <div className="text-sm font-bold text-rose-700">{t("Câu hữu ích", "Useful phrases")}</div>
              {topic.phrases.map((p, i) => (
                <div key={i} className="flex items-start justify-between gap-3 border-b border-pink-100 py-2 last:border-0">
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold text-slate-800">{p.jp}</div>
                    <div className="text-sm italic text-pink-700">{p.romaji}</div>
                    <div className="mt-1 text-sm text-slate-600">{lang === "vi" ? p.vi : p.en}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => speak(p.jp, 0.8)} className="shrink-0">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
