/**
 * @file VFFSpeakingRoleplay.tsx
 * @description Offline roleplay scenarios with multi-choice responses + feedback.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Volume2, RefreshCw, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vffRoleplayScenarios, RoleplayScenario } from "@/data/vietnamese/vffRoleplayScenarios";
import { playVietnameseTts } from "@/lib/vietnameseTts";

const speak = (t: string) => playVietnameseTts(t, { playbackRate: 0.95 }).catch(() => {});

const ScenarioPlay = ({ s }: { s: RoleplayScenario }) => {
  const { t } = useLanguage();
  const [turn, setTurn] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(s.turns.map(() => null));
  const done = turn >= s.turns.length;

  const pick = (i: number) => {
    const next = [...picks]; next[turn] = i; setPicks(next);
    setTimeout(() => setTurn(t => t + 1), 1500);
  };

  const reset = () => { setTurn(0); setPicks(s.turns.map(() => null)); };

  const goodCount = picks.filter((p, i) => p !== null && s.turns[i].options[p].good).length;
  const scorePct = Math.round((goodCount / s.turns.length) * 100);

  return (
    <Card className="border-2 border-primary/25">
      <CardContent className="pt-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">{s.emoji}</div>
          <div className="flex-1">
            <h3 className="font-bold">{t(s.title, s.titleEn)}</h3>
            <p className="text-xs text-muted-foreground">{t(s.context, s.contextEn)}</p>
          </div>
        </div>

        {s.turns.slice(0, turn + 1).map((tn, ti) => {
          const chosen = picks[ti];
          return (
            <div key={ti} className="mb-4">
              <div className="flex items-start gap-2 mb-2">
                <Badge variant="secondary" className="mt-0.5">{s.npc}</Badge>
                <div className="flex-1">
                  <div className="p-2 rounded-lg bg-muted text-sm font-medium inline-flex items-center gap-2">
                    {tn.npc}
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => speak(tn.npc)}><Volume2 className="w-3 h-3" /></Button>
                  </div>
                  <div className="text-xs text-muted-foreground italic mt-0.5">{tn.npcEn}</div>
                </div>
              </div>

              {ti === turn && chosen === null && !done && (
                <div className="ml-8 space-y-2">
                  {tn.options.map((opt, oi) => (
                    <button key={oi} onClick={() => pick(oi)}
                      className="w-full text-left p-2.5 rounded-lg border-2 border-muted hover:border-primary transition text-sm">
                      <div className="font-medium">{opt.vi}</div>
                      <div className="text-xs text-muted-foreground italic">{opt.en}</div>
                    </button>
                  ))}
                </div>
              )}
              {chosen !== null && (
                <div className="ml-8">
                  <div className={`p-2.5 rounded-lg border-2 text-sm ${tn.options[chosen].good ? "border-emerald-500 bg-emerald-500/10" : "border-amber-500 bg-amber-500/10"}`}>
                    <div className="font-medium">{tn.options[chosen].vi}</div>
                    <div className="text-xs mt-1 flex items-start gap-1">
                      <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>{tn.options[chosen].feedback}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {done && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 text-center">
            <div className="text-3xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">{scorePct}%</div>
            <div className="text-sm text-muted-foreground">{goodCount}/{s.turns.length} {t("lượt tự nhiên", "natural turns")}</div>
            <Button size="sm" variant="outline" onClick={reset} className="mt-3"><RefreshCw className="w-3.5 h-3.5 mr-2" />{t("Chơi lại", "Play again")}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VFFSpeakingRoleplay = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Speaking Roleplay | HaiEduTech" description="Practice real-life Vietnamese conversations - cafe, Grab, market, clinic - with instant feedback." path="/learn-vietnamese/for-foreigners/lab/roleplay" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/20 mb-6">
            <MessageCircle className="w-10 h-10 text-rose-500 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Phòng luyện nói - Đóng vai", "Speaking Roleplay")}</h1>
            <p className="text-muted-foreground">{t("Chọn câu trả lời tự nhiên nhất - nhận phản hồi tức thì.", "Pick the most natural reply - get instant feedback.")}</p>
          </div>
          <div className="space-y-5">
            {vffRoleplayScenarios.map(s => <ScenarioPlay key={s.id} s={s} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFSpeakingRoleplay;
