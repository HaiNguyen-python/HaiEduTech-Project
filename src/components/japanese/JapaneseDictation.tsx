/**
 * @file JapaneseDictation.tsx
 * @description Kana dictation drill: listen, type back in kana or romaji, get
 *  character-by-character grading.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Rabbit, Turtle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JA_DICTATION, type JaDictationItem } from "@/data/japanese/practice";
import { JA_DICTATION_2 } from "@/data/japanese/practice2";

const ALL_DICTATION: JaDictationItem[] = [...JA_DICTATION, ...JA_DICTATION_2];

type Level = "N5" | "N4" | "N3";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

const clean = (s: string) =>
  s.normalize("NFKC").replace(/[\s。、!?！？'"-]/g, "").toLowerCase();

/** Character-level accuracy so learners see how close they were. */
function accuracy(target: string, typed: string) {
  const a = [...clean(target)];
  const b = [...clean(typed)];
  if (!a.length) return 0;
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return Math.max(0, Math.round(((a.length - dp[a.length][b.length]) / a.length) * 100));
}

export default function JapaneseDictation({ t, lang, speak }: Props) {
  const [level, setLevel] = useState<Level>("N5");
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ done: 0, good: 0 });

  const items = useMemo(() => ALL_DICTATION.filter((i) => i.level === level), [level]);
  const item = items[index % items.length];

  const kanaScore = accuracy(item.kana, typed);
  const romajiScore = accuracy(item.romaji, typed);
  const best = Math.max(kanaScore, romajiScore);
  const passed = best >= 85;

  const check = () => {
    if (checked || !typed.trim()) return;
    setChecked(true);
    setScore((s) => ({ done: s.done + 1, good: s.good + (best >= 85 ? 1 : 0) }));
  };

  const next = () => {
    setIndex((i) => i + 1);
    setTyped("");
    setChecked(false);
  };

  const switchLevel = (lv: Level) => {
    setLevel(lv);
    setIndex(0);
    setTyped("");
    setChecked(false);
  };

  return (
    <div className="space-y-4">
      <Card className="border-pink-200 bg-white/85 p-4">
        <p className="text-base leading-relaxed text-slate-700">
          {t(
            "Nghe rồi gõ lại bằng kana hoặc romaji. Hệ thống chấm theo từng ký tự, đạt 85% là tính đúng.",
            "Listen, then type it back in kana or romaji. Grading is character by character; 85% counts as correct.",
          )}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(["N5", "N4", "N3"] as Level[]).map((lv) => (
            <Button
              key={lv}
              size="sm"
              variant="outline"
              onClick={() => switchLevel(lv)}
              className={
                level === lv
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : "border-pink-200 bg-white text-rose-700 hover:bg-pink-50"
              }
            >
              {lv}
            </Button>
          ))}
          <span className="ml-auto text-sm font-semibold text-rose-700">
            {t("Đúng", "Correct")} {score.good}/{score.done}
          </span>
        </div>
      </Card>

      <Card className="border-pink-200 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-slate-800">
            {t("Câu", "Item")} {(index % items.length) + 1}/{items.length}
          </span>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" onClick={() => speak(item.audio, 0.85)}>
              <Rabbit className="mr-1 h-4 w-4" /> {t("Thường", "Normal")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => speak(item.audio, 0.5)}>
              <Turtle className="mr-1 h-4 w-4" /> {t("Chậm", "Slow")}
            </Button>
          </div>
        </div>

        <Input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") checked ? next() : check();
          }}
          placeholder={t("Gõ kana hoặc romaji...", "Type kana or romaji...")}
          className="mt-4 h-12 border-pink-200 bg-white text-lg"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={check} disabled={checked || !typed.trim()} className="bg-rose-600 hover:bg-rose-700">
            {t("Kiểm tra", "Check")}
          </Button>
          <Button variant="outline" onClick={next} className="border-pink-200 text-rose-700">
            <RefreshCw className="mr-1 h-4 w-4" /> {t("Câu tiếp theo", "Next item")}
          </Button>
        </div>

        {checked && (
          <div
            className={`mt-4 space-y-1 rounded-lg border p-3 ${
              passed ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"
            }`}
          >
            <p className="text-base font-bold text-slate-800">
              {passed ? "✅ " : "❌ "}
              {t("Độ chính xác", "Accuracy")}: {best}%
            </p>
            <p className="text-lg font-semibold text-slate-800">{item.kana}</p>
            <p className="text-sm italic text-pink-700">{item.romaji}</p>
            <p className="text-base text-slate-700">{lang === "vi" ? item.vi : item.en}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
