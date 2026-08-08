/**
 * FunZone - playful practice block for Cambridge lectures.
 * Turns each lesson's own vocabulary into a chant, riddles, a word-scramble
 * game, a tongue twister, off-screen games and a sticker reward so young
 * learners finish the lesson smiling instead of just reading theory.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { playEnglishTts } from "@/lib/englishTts";
import { buildFunZone } from "@/lib/cambridgeFunZone";
import type { CambridgeLecture } from "@/data/cambridgeLecturesData";

interface FunZoneProps {
  lecture: CambridgeLecture;
}

const speak = (text: string) => { void playEnglishTts(text, { accent: "en-GB", playbackRate: 0.9 }); };

const FunZone = ({ lecture }: FunZoneProps) => {
  const { t } = useLanguage();
  const fun = useMemo(() => buildFunZone(lecture), [lecture]);

  const [riddlePicks, setRiddlePicks] = useState<Record<number, number>>({});
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const riddlesRight = fun.riddles.filter((r, i) => riddlePicks[i] === r.answer).length;
  const scrambleRight = fun.scramble.filter(
    (s, i) => checked[i] && typed[i]?.trim().toLowerCase() === s.answer.toLowerCase()
  ).length;
  const allDone =
    fun.riddles.length > 0 &&
    riddlesRight === fun.riddles.length &&
    scrambleRight === fun.scramble.length;

  const reset = () => { setRiddlePicks({}); setTyped({}); setChecked({}); };

  return (
    <div className="space-y-6">
      {/* Chant */}
      <Card className="bg-white/85 border-2 border-pink-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-900 flex items-center gap-2" style={{ fontSize: "18px" }}>
            🎵 {t(fun.chantTitleVi, fun.chantTitle)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {fun.chant.map((line, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 border border-pink-200">
              <span className="text-lg">{["🎈", "🎉", "🥳", "⭐"][i % 4]}</span>
              <p className="flex-1 text-slate-800 font-semibold" style={{ fontSize: "17px", lineHeight: "1.6" }}>{line}</p>
              <Button size="icon" variant="ghost" className="text-pink-600 hover:bg-pink-100" onClick={() => speak(line)} aria-label={t("Nghe câu này", "Listen to this line")}>
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="border-2 border-pink-300 text-pink-700 bg-white" onClick={() => speak(fun.chant.join(" "))}>
            <Volume2 className="w-4 h-4 mr-2" /> {t("Nghe cả bài chant", "Listen to the whole chant")}
          </Button>
        </CardContent>
      </Card>

      {/* Riddles */}
      {fun.riddles.length > 0 && (
        <Card className="bg-white/85 border-2 border-violet-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-900 flex items-center gap-2" style={{ fontSize: "18px" }}>
              🧙 {t("Đoán từ bí ẩn", "Guess the mystery word")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fun.riddles.map((r, i) => {
              const picked = riddlePicks[i];
              return (
                <div key={i} className="p-4 rounded-xl bg-violet-50 border border-violet-200">
                  <p className="text-slate-800 font-semibold mb-3" style={{ fontSize: "17px" }}>
                    {i + 1}. {t(r.clueVi, r.clue)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {r.options.map((opt, oi) => {
                      const isPicked = picked === oi;
                      const isRight = oi === r.answer;
                      const state = picked === undefined ? "idle" : isRight ? "right" : isPicked ? "wrong" : "idle";
                      return (
                        <button
                          key={oi}
                          onClick={() => { setRiddlePicks(p => ({ ...p, [i]: oi })); speak(opt); }}
                          className={`px-4 py-2 rounded-full border-2 font-bold transition-all ${
                            state === "right"
                              ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                              : state === "wrong"
                              ? "bg-red-100 border-red-300 text-red-700"
                              : "bg-white border-violet-200 text-slate-700 hover:border-violet-400"
                          }`}
                          style={{ fontSize: "16px" }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== undefined && (
                    <p className={`mt-3 font-semibold flex items-center gap-2 ${picked === r.answer ? "text-emerald-700" : "text-red-600"}`} style={{ fontSize: "16px" }}>
                      {picked === r.answer ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {picked === r.answer
                        ? t("Chính xác! Đọc to từ này 3 lần nhé.", "Correct! Now say the word out loud 3 times.")
                        : t(`Chưa đúng - đáp án là "${r.options[r.answer]}".`, `Not yet - the answer is "${r.options[r.answer]}".`)}
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Word scramble */}
      {fun.scramble.length > 0 && (
        <Card className="bg-white/85 border-2 border-sky-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-900 flex items-center gap-2" style={{ fontSize: "18px" }}>
              🔤 {t("Xếp lại chữ cái", "Unscramble the letters")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fun.scramble.map((s, i) => {
              const ok = typed[i]?.trim().toLowerCase() === s.answer.toLowerCase();
              return (
                <div key={i} className="p-4 rounded-xl bg-sky-50 border border-sky-200">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {s.scrambled.split("").map((ch, ci) => (
                      <span key={ci} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border-2 border-sky-300 text-sky-800 font-black">
                        {ch}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-2" style={{ fontSize: "15px" }}>
                    💡 {t(s.hintVi, s.hint)}
                  </p>
                  <div className="flex gap-2 items-center flex-wrap">
                    <Input
                      value={typed[i] ?? ""}
                      onChange={(e) => { setTyped(p => ({ ...p, [i]: e.target.value })); setChecked(p => ({ ...p, [i]: false })); }}
                      placeholder={t("Gõ từ đúng...", "Type the word...")}
                      className="max-w-[220px] bg-white border-2 border-sky-200 text-slate-800"
                    />
                    <Button className="bg-sky-600 hover:bg-sky-700 text-white" onClick={() => { setChecked(p => ({ ...p, [i]: true })); if (typed[i]?.trim().toLowerCase() === s.answer.toLowerCase()) speak(s.answer); }}>
                      {t("Kiểm tra", "Check")}
                    </Button>
                    {checked[i] && (
                      <span className={`font-semibold ${ok ? "text-emerald-700" : "text-red-600"}`} style={{ fontSize: "16px" }}>
                        {ok ? t("🎉 Tuyệt vời!", "🎉 Brilliant!") : t(`Thử lại nhé - bắt đầu bằng "${s.answer[0].toUpperCase()}"`, `Try again - it starts with "${s.answer[0].toUpperCase()}"`)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Tongue twister */}
      <Card className="bg-white/85 border-2 border-amber-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-900 flex items-center gap-2" style={{ fontSize: "18px" }}>
            👅 {t("Uốn lưỡi vui", "Tongue twister")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="flex-1 text-slate-800 font-bold" style={{ fontSize: "18px", lineHeight: "1.6" }}>{fun.tongueTwister}</p>
            <Button size="icon" variant="ghost" className="text-amber-700 hover:bg-amber-100" onClick={() => speak(fun.tongueTwister)} aria-label={t("Nghe", "Listen")}>
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <p className="mt-2 text-slate-600" style={{ fontSize: "15px" }}>🎯 {t(fun.tongueTwisterVi, fun.tongueTwisterVi)}</p>
        </CardContent>
      </Card>

      {/* Off-screen games */}
      <div className="grid gap-4 sm:grid-cols-2">
        {fun.games.map((g, i) => (
          <Card key={i} className="bg-white/85 border-2 border-emerald-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-900 flex items-center gap-2" style={{ fontSize: "17px" }}>
                <span className="text-2xl">{g.icon}</span> {t(g.titleVi, g.title)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(t(g.howVi, g.how) as unknown as string[]).map((line, li) => (
                  <li key={li} className="flex gap-2 text-slate-700" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                    <span className="font-black text-emerald-600">{li + 1}.</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fun fact */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-100 to-sky-100 border-2 border-violet-200 flex gap-3 items-start">
        <Sparkles className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-bold text-violet-800 mb-1" style={{ fontSize: "16px" }}>{t("Bạn có biết?", "Did you know?")}</p>
          <p className="text-slate-700" style={{ fontSize: "16px", lineHeight: "1.7" }}>{t(fun.funFactVi, fun.funFact)}</p>
        </div>
      </div>

      {/* Reward */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-amber-100 to-pink-100 border-2 border-amber-300 text-center"
          >
            <p className="text-3xl mb-2">🎊🏆🎊</p>
            <p className="font-black text-amber-800" style={{ fontSize: "18px" }}>{t(fun.rewardVi, fun.reward)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button variant="outline" className="border-2 border-slate-300 text-slate-700 bg-white" onClick={reset}>
        <RotateCcw className="w-4 h-4 mr-2" /> {t("Chơi lại", "Play again")}
      </Button>
    </div>
  );
};

export default FunZone;
