/**
 * @file VFFCultureHub.tsx
 * @description Bilingual culture deep-dives with Do & Don't lists and key phrases.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, Compass, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { vffCultureNotes } from "@/data/vietnamese/vffCultureNotes";
import { playVietnameseTts } from "@/lib/vietnameseTts";

const VFFCultureHub = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(vffCultureNotes[0]?.id ?? null);
  const speak = (x: string) => playVietnameseTts(x, { playbackRate: 0.95 }).catch(() => {});

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Culture Guide | HaiEduTech" description="Practical cultural deep-dives for foreigners in Vietnam: Tet, coffee, markets, family pronouns, meals, motorbike traffic." path="/learn-vietnamese/for-foreigners/lab/culture" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20 mb-6">
            <Compass className="w-10 h-10 text-amber-600 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Cẩm nang văn hóa", "Culture Guide")}</h1>
            <p className="text-muted-foreground">{t("6 chủ đề thực tế + Do & Don't để hòa nhập nhanh.", "6 practical topics + Do & Don't to blend in quickly.")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {vffCultureNotes.map(n => (
              <button key={n.id} onClick={() => setOpenId(n.id)}
                className={`p-3 rounded-lg border-2 text-left transition ${openId === n.id ? "border-primary bg-primary/5" : "border-muted hover:border-primary/40"}`}>
                <div className="text-2xl">{n.emoji}</div>
                <div className="font-bold text-sm">{t(n.title, n.titleEn)}</div>
              </button>
            ))}
          </div>

          {vffCultureNotes.filter(n => n.id === openId).map(n => (
            <Card key={n.id} className="border-2 border-primary/20">
              <CardContent className="pt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{n.emoji}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{t(n.title, n.titleEn)}</h2>
                    <p className="text-sm text-muted-foreground">{t(n.summary, n.summaryEn)}</p>
                  </div>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/15 p-4">
                  <p className="text-sm leading-relaxed">{t(n.body, n.bodyEn)}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2"><Check className="w-4 h-4" />{t("Nên làm", "Do")}</div>
                    <ul className="text-sm space-y-1">
                      {n.dos.map((d, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">•</span><span>{d}</span></li>)}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
                    <div className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2"><X className="w-4 h-4" />{t("Tránh", "Don't")}</div>
                    <ul className="text-sm space-y-1">
                      {n.donts.map((d, i) => <li key={i} className="flex gap-2"><span className="text-red-500">•</span><span>{d}</span></li>)}
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="font-bold text-amber-700 dark:text-amber-400 mb-2 text-sm">{t("Câu chốt cần thuộc", "Key phrases to memorize")}</div>
                  <div className="space-y-1.5">
                    {n.keyPhrases.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => speak(p.vi)}><Volume2 className="w-3 h-3" /></Button>
                        <span className="font-semibold text-primary">{p.vi}</span>
                        <span className="text-muted-foreground text-xs italic">- {p.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFCultureHub;
