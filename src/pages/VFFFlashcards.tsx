/**
 * @file VFFFlashcards.tsx
 * @description Spaced-repetition-lite flashcard deck pulling from A1/A2/B1 vocab.
 */
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, RotateCw, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vffLevelA1, vffLevelB1 } from "@/data/vietnamese/vffLevels";
import { vffLevelA2 } from "@/data/vietnamese/vffLevelA2";
import { playVietnameseTts } from "@/lib/vietnameseTts";

interface Card { word: string; ipa: string; meaning: string; example: string; exampleEn: string; level: "A1" | "A2" | "B1"; }

const buildDeck = (): Card[] => {
  const out: Card[] = [];
  vffLevelA1.lessons.forEach(l => l.vocab.forEach(v => out.push({ ...v, level: "A1" })));
  vffLevelA2.lessons.forEach(l => l.vocab.forEach(v => out.push({ ...v, level: "A2" })));
  vffLevelB1.lessons.forEach(l => l.vocab.forEach(v => out.push({ ...v, level: "B1" })));
  return out;
};

const STORE = "vff_srs_v1";

interface SrsState { known: Record<string, number>; }

const load = (): SrsState => { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return { known: {} }; } };
const save = (s: SrsState) => { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch { /* ignore */ } };

const VFFFlashcards = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<"all" | "A1" | "A2" | "B1">("all");
  const [srs, setSrs] = useState<SrsState>({ known: {} });
  useEffect(() => { setSrs(load()); }, []);

  const deck = useMemo(() => buildDeck().filter(c => level === "all" || c.level === level), [level]);
  // sort by fewest reviews first
  const queue = useMemo(() => [...deck].sort((a, b) => (srs.known[a.word] || 0) - (srs.known[b.word] || 0)), [deck, srs]);

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setIdx(0); setFlipped(false); }, [level]);

  const c = queue[idx % queue.length];
  if (!c) return null;

  const speak = () => playVietnameseTts(c.word, { playbackRate: 0.9 }).catch(() => {});
  const mark = (know: boolean) => {
    const next = { known: { ...srs.known, [c.word]: (srs.known[c.word] || 0) + (know ? 2 : -1) } };
    setSrs(next); save(next);
    setFlipped(false); setIdx(i => i + 1);
  };

  const mastered = Object.entries(srs.known).filter(([, v]) => v >= 4).length;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Flashcards SRS | HaiEduTech" description="Spaced repetition flashcards for Vietnamese vocabulary A1-B1." path="/learn-vietnamese/for-foreigners/lab/flashcards" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-10 h-10 text-violet-500 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Thẻ ghi nhớ (SRS)", "Flashcards (SRS)")}</h1>
            <p className="text-muted-foreground">{t("Ôn từ vựng theo phương pháp lặp lại ngắt quãng.", "Review vocab with spaced repetition.")}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <Badge variant="secondary">{deck.length} {t("thẻ", "cards")}</Badge>
              <Badge className="bg-emerald-500 text-white">{mastered} {t("đã thuộc", "mastered")}</Badge>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {(["all", "A1", "A2", "B1"] as const).map(l => (
              <Button key={l} size="sm" variant={level === l ? "default" : "outline"} onClick={() => setLevel(l)}>
                {l === "all" ? t("Tất cả", "All") : l}
              </Button>
            ))}
          </div>

          <Card className="border-2 border-primary/20 min-h-64 cursor-pointer" onClick={() => setFlipped(f => !f)}>
            <CardContent className="pt-6 text-center">
              <Badge className="mb-2">{c.level}</Badge>
              {!flipped ? (
                <>
                  <div className="text-4xl font-bold text-primary mb-2">{c.word}</div>
                  <div className="text-sm text-muted-foreground font-mono">{c.ipa}</div>
                  <Button size="sm" variant="outline" className="mt-4" onClick={e => { e.stopPropagation(); speak(); }}>
                    <Volume2 className="w-3.5 h-3.5 mr-2" />{t("Phát âm", "Play")}
                  </Button>
                  <div className="text-xs text-muted-foreground mt-4">{t("Nhấn thẻ để lật", "Tap card to flip")}</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold mb-2">{c.meaning}</div>
                  <div className="text-sm italic text-muted-foreground">"{c.example}"</div>
                  <div className="text-xs text-muted-foreground">{c.exampleEn}</div>
                </>
              )}
            </CardContent>
          </Card>

          {flipped && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button variant="outline" onClick={() => mark(false)} className="border-red-500 text-red-500">
                <ThumbsDown className="w-4 h-4 mr-2" />{t("Chưa thuộc", "Still learning")}
              </Button>
              <Button onClick={() => mark(true)} className="bg-emerald-500 text-white">
                <ThumbsUp className="w-4 h-4 mr-2" />{t("Đã biết", "I know it")}
              </Button>
            </div>
          )}
          {!flipped && (
            <Button variant="ghost" onClick={() => setIdx(i => i + 1)} className="w-full mt-4">
              <RotateCw className="w-4 h-4 mr-2" />{t("Bỏ qua", "Skip")}
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFFlashcards;
