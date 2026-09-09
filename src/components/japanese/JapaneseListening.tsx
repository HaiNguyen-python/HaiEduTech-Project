/**
 * @file JapaneseListening.tsx
 * @description Listening comprehension drill: the learner hears a Japanese
 *  sentence (normal or slow), answers, then sees the script and explanation.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Volume2, Rabbit, Turtle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_LISTENING, type JaListeningItem } from "@/data/japanese/practice";
import { JA_LISTENING_2 } from "@/data/japanese/practice2";

const ALL_LISTENING: JaListeningItem[] = [...JA_LISTENING, ...JA_LISTENING_2];

type Level = "all" | "N5" | "N4" | "N3";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

export default function JapaneseListening({ t, lang, speak }: Props) {
  const [level, setLevel] = useState<Level>("all");
  const [picks, setPicks] = useState<Record<string, number>>({});

  const items: JaListeningItem[] = useMemo(
    () => (level === "all" ? ALL_LISTENING : ALL_LISTENING.filter((i) => i.level === level)),
    [level],
  );
  const answered = items.filter((i) => picks[i.id] !== undefined).length;
  const correct = items.filter((i) => picks[i.id] === i.answer).length;

  return (
    <div className="space-y-4">
      <Card className="border-pink-200 bg-white/85 p-4">
        <p className="text-base leading-relaxed text-slate-700">
          {t(
            "Bấm nút loa để nghe câu tiếng Nhật (chưa hiện chữ), chọn đáp án rồi mới xem lời thoại và giải thích.",
            "Tap the speaker to hear the Japanese sentence (script hidden), choose an answer, then reveal the script and explanation.",
          )}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(["all", "N5", "N4", "N3"] as Level[]).map((lv) => (
            <Button
              key={lv}
              size="sm"
              variant="outline"
              onClick={() => setLevel(lv)}
              className={
                level === lv
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : "border-pink-200 bg-white text-rose-700 hover:bg-pink-50"
              }
            >
              {lv === "all" ? t("Tất cả", "All") : lv}
            </Button>
          ))}
          <span className="ml-auto text-sm font-semibold text-rose-700">
            {t("Đúng", "Correct")} {correct}/{answered || 0}
          </span>
        </div>
      </Card>

      {items.map((item, idx) => {
        const pick = picks[item.id];
        const done = pick !== undefined;
        return (
          <Card key={item.id} className="border-pink-200 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                {item.level}
              </span>
              <span className="text-base font-semibold text-slate-800">
                {t("Câu", "Item")} {idx + 1}
              </span>
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onClick={() => speak(item.audio, 0.85)}>
                  <Rabbit className="mr-1 h-4 w-4" /> {t("Thường", "Normal")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => speak(item.audio, 0.55)}>
                  <Turtle className="mr-1 h-4 w-4" /> {t("Chậm", "Slow")}
                </Button>
              </div>
            </div>

            <p className="mt-3 text-base font-semibold text-slate-800">
              {lang === "vi" ? item.question_vi : item.question_en}
            </p>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {item.options.map((op, oi) => (
                <button
                  key={oi}
                  onClick={() => setPicks((p) => (p[item.id] !== undefined ? p : { ...p, [item.id]: oi }))}
                  className={`rounded-md border p-2 text-left text-base transition ${
                    done
                      ? oi === item.answer
                        ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                        : oi === pick
                          ? "border-rose-400 bg-rose-50 text-rose-800"
                          : "border-pink-200 bg-white text-slate-600"
                      : "border-pink-200 bg-white hover:bg-pink-50"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            {done && (
              <div className="mt-3 space-y-1 rounded-lg border border-pink-100 bg-pink-50/70 p-3">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => speak(item.audio, 0.7)}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <span className="text-base font-semibold text-slate-800">{item.audio}</span>
                </div>
                <p className="text-sm italic text-pink-700">{item.romaji}</p>
                <p className="text-base text-slate-700">
                  {pick === item.answer ? "✅ " : "❌ "}
                  {lang === "vi" ? item.explain_vi : item.explain_en}
                </p>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
