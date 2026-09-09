/**
 * @file JapaneseFlashcards.tsx
 * @description Flashcard deck for Japanese vocabulary and kanji with a simple
 *  spaced-repetition queue kept in localStorage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Volume2, RotateCcw, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface FlashCard {
  key: string;
  front: string;
  reading: string;
  vi: string;
  en: string;
  extra?: string;
}

interface Props {
  vocab: FlashCard[];
  kanji: FlashCard[];
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

const STORE = "japanese_flashcards_v1";
const SIZES = [10, 20, 30, 50];

type Box = Record<string, number>;

const loadBoxes = (): Box => {
  try {
    return JSON.parse(localStorage.getItem(STORE) || "{}") as Box;
  } catch {
    return {};
  }
};

export default function JapaneseFlashcards({ vocab, kanji, t, lang, speak }: Props) {
  const [deck, setDeck] = useState<"vocab" | "kanji">("vocab");
  const [size, setSize] = useState(20);
  const [boxes, setBoxes] = useState<Box>(() => loadBoxes());
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(boxes));
    } catch {}
  }, [boxes]);

  const source = deck === "vocab" ? vocab : kanji;

  /** Weakest cards first (box 0 = never seen or forgotten). */
  const cards = useMemo(() => {
    const sorted = [...source].sort((a, b) => (boxes[a.key] ?? 0) - (boxes[b.key] ?? 0));
    return sorted.slice(0, Math.min(size, sorted.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, size, round]);

  const card = cards[pos];
  const mastered = source.filter((c) => (boxes[c.key] ?? 0) >= 2).length;

  const mark = (good: boolean) => {
    if (!card) return;
    setBoxes((prev) => ({ ...prev, [card.key]: good ? Math.min(3, (prev[card.key] ?? 0) + 1) : 0 }));
    setFlipped(false);
    if (pos + 1 >= cards.length) {
      setPos(0);
      setRound((r) => r + 1);
    } else {
      setPos((p) => p + 1);
    }
  };

  const restart = () => {
    setPos(0);
    setFlipped(false);
    setRound((r) => r + 1);
  };

  return (
    <div className="space-y-4">
      <Card className="border-pink-200 bg-white/85 p-4">
        <p className="text-base leading-relaxed text-slate-700">
          {t(
            "Thẻ nào bạn bấm 'Chưa nhớ' sẽ quay lại sớm hơn. Nhớ đúng 2 lần là thẻ được tính đã thuộc.",
            "Cards you mark 'Not yet' come back sooner. Two correct recalls count a card as learned.",
          )}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(["vocab", "kanji"] as const).map((d) => (
            <Button
              key={d}
              size="sm"
              variant="outline"
              onClick={() => {
                setDeck(d);
                setPos(0);
                setFlipped(false);
              }}
              className={
                deck === d
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : "border-pink-200 bg-white text-rose-700 hover:bg-pink-50"
              }
            >
              {d === "vocab" ? `📖 ${t("Từ vựng", "Vocabulary")}` : `🈴 Kanji`}
            </Button>
          ))}
          <span className="mx-1 text-sm text-slate-500">|</span>
          {SIZES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant="outline"
              onClick={() => {
                setSize(s);
                setPos(0);
                setFlipped(false);
                setRound((r) => r + 1);
              }}
              className={
                size === s
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : "border-pink-200 bg-white text-rose-700 hover:bg-pink-50"
              }
            >
              {s} {t("thẻ", "cards")}
            </Button>
          ))}
          <span className="ml-auto text-sm font-semibold text-rose-700">
            {t("Đã thuộc", "Learned")} {mastered}/{source.length}
          </span>
        </div>
      </Card>

      {card ? (
        <Card className="border-pink-200 p-6 text-center">
          <div className="text-sm font-semibold text-rose-600">
            {pos + 1}/{cards.length}
          </div>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="mt-3 w-full rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 px-4 py-10 transition hover:from-pink-100"
          >
            <div className={deck === "kanji" ? "text-6xl font-bold text-rose-700" : "text-3xl font-bold text-slate-800"}>
              {card.front}
            </div>
            {flipped ? (
              <div className="mt-4 space-y-1">
                <div className="text-base italic text-pink-700">{card.reading}</div>
                <div className="text-xl font-semibold text-slate-800">{lang === "vi" ? card.vi : card.en}</div>
                {card.extra && <div className="text-sm text-slate-600">{card.extra}</div>}
              </div>
            ) : (
              <div className="mt-4 text-sm text-slate-500">{t("Bấm để xem nghĩa", "Tap to reveal")}</div>
            )}
          </button>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button variant="outline" onClick={() => speak(card.front, 0.8)} className="border-pink-200 text-rose-700">
              <Volume2 className="mr-1 h-4 w-4" /> {t("Nghe", "Listen")}
            </Button>
            <Button onClick={() => mark(false)} variant="outline" className="border-rose-300 text-rose-700">
              <X className="mr-1 h-4 w-4" /> {t("Chưa nhớ", "Not yet")}
            </Button>
            <Button onClick={() => mark(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Check className="mr-1 h-4 w-4" /> {t("Đã nhớ", "Got it")}
            </Button>
            <Button variant="outline" onClick={restart} className="border-pink-200 text-rose-700">
              <RotateCcw className="mr-1 h-4 w-4" /> {t("Xếp lại bộ thẻ", "Reshuffle deck")}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border-pink-200 p-6 text-base text-slate-600">
          {t("Chưa có thẻ nào.", "No cards yet.")}
        </Card>
      )}
    </div>
  );
}
