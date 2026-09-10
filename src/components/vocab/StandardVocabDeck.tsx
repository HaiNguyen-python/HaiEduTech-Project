import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Star, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const DEFAULT_SIZES = [10, 20, 30, 50, 100, 200, 0];

interface StandardVocabDeckProps<T> {
  items: T[];
  itemKey: (item: T) => string;
  renderFront: (item: T) => ReactNode;
  renderBack: (item: T) => ReactNode;
  t: (vi: string, en: string) => string;
  stopAudio?: () => void;
  onReveal?: (item: T) => void;
  sizes?: number[];
  initialSize?: number;
  controls?: (item: T) => ReactNode;
}

/** Shared one-card vocabulary deck used by every main vocabulary bank. */
export default function StandardVocabDeck<T>({
  items,
  itemKey,
  renderFront,
  renderBack,
  t,
  stopAudio,
  onReveal,
  sizes = DEFAULT_SIZES,
  initialSize = 20,
  controls,
}: StandardVocabDeckProps<T>) {
  const [deckSize, setDeckSize] = useState(initialSize);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const itemSignature = useMemo(() => items.map(itemKey).join("\u001f"), [items, itemKey]);

  const deck = useMemo(() => {
    const limit = deckSize === 0 ? items.length : Math.min(deckSize, items.length);
    return items.slice(0, limit);
  }, [deckSize, items]);

  const total = deck.length;
  const item = deck[Math.min(index, Math.max(total - 1, 0))];

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    stopAudio?.();
  }, [deckSize, itemSignature, stopAudio]);

  const go = useCallback((delta: number) => {
    stopAudio?.();
    setFlipped(false);
    setIndex(current => (current + delta + Math.max(total, 1)) % Math.max(total, 1));
  }, [stopAudio, total]);

  const flip = useCallback(() => {
    setFlipped(current => {
      const next = !current;
      if (next && item) onReveal?.(item);
      return next;
    });
  }, [item, onReveal]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === " ") {
        event.preventDefault();
        flip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flip, go]);

  if (!item) {
    return <p className="py-12 text-center text-muted-foreground">{t("Không có từ nào", "No words available")}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-3xl" data-testid="single-vocab-deck">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          {t("Số thẻ muốn học:", "Cards to study:")}
          <select
            value={deckSize}
            onChange={event => setDeckSize(Number(event.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-foreground"
            aria-label={t("Chọn số thẻ", "Choose deck size")}
          >
            {sizes.map(size => (
              <option key={size} value={size} disabled={size !== 0 && size > items.length}>
                {size === 0 ? `${t("Tất cả", "All")} (${items.length})` : size}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm font-semibold text-primary" aria-live="polite">
          {index + 1} / {total}
        </span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <div className="[perspective:1600px]">
        <motion.div
          key={itemKey(item)}
          className="relative min-h-[28rem] w-full cursor-pointer select-none sm:min-h-[30rem]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, duration: 0.6 }}
          onClick={flip}
          role="button"
          tabIndex={0}
          aria-label={t("Lật thẻ từ vựng", "Flip vocabulary card")}
          aria-pressed={flipped}
          onKeyDown={event => {
            if (event.key === "Enter") {
              event.preventDefault();
              flip();
            }
          }}
        >
          <section className="absolute inset-0 overflow-auto rounded-2xl border-2 border-primary/35 bg-card p-6 shadow-xl [backface-visibility:hidden] sm:p-10">
            {renderFront(item)}
          </section>
          <section className="absolute inset-0 overflow-auto rounded-2xl border-2 border-primary/35 bg-card p-6 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-10">
            {renderBack(item)}
          </section>
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3">
        <Button variant="outline" className="gap-1 sm:gap-2" onClick={() => go(-1)}>
          <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">{t("Thẻ trước", "Previous")}</span>
        </Button>
        <Button variant="outline" className="gap-1 sm:gap-2" onClick={flip}>
          <RotateCcw className="h-4 w-4" /> <span className="hidden sm:inline">{t("Lật thẻ", "Flip")}</span>
        </Button>
        <Button variant="outline" className="gap-1 sm:gap-2" onClick={() => go(1)}>
          <span className="hidden sm:inline">{t("Thẻ sau", "Next")}</span> <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {controls && <div className="mt-3">{controls(item)}</div>}
    </div>
  );
}

export interface SimpleVocabCard {
  key: string;
  term: string;
  pronunciation?: string;
  level?: string;
  partOfSpeech?: string;
  category?: string;
  meaningPrimary: string;
  meaningSecondary?: string;
  example?: string;
  exampleTranslation?: string;
  synonyms?: string[];
  collocations?: string[];
  visual?: ReactNode;
  backExtra?: ReactNode;
}

interface SimpleVocabDeckProps {
  cards: SimpleVocabCard[];
  t: (vi: string, en: string) => string;
  speak?: (text: string) => void;
  stopAudio?: () => void;
  mastered?: Set<string>;
  onToggleMastered?: (key: string, event: React.MouseEvent) => void;
  onReveal?: (card: SimpleVocabCard) => void;
}

export function SimpleVocabDeck({
  cards,
  t,
  speak,
  stopAudio,
  mastered,
  onToggleMastered,
  onReveal,
}: SimpleVocabDeckProps) {
  return (
    <StandardVocabDeck
      items={cards}
      itemKey={card => card.key}
      t={t}
      stopAudio={stopAudio}
      onReveal={onReveal}
      renderFront={card => (
        <div className="flex min-h-[23rem] flex-col items-center justify-center gap-4 text-center">
          <div className="absolute right-4 top-4 flex items-center gap-1">
            {speak && (
              <Button type="button" size="icon" variant="ghost" onClick={event => { event.stopPropagation(); speak(card.term); }} aria-label={t("Nghe phát âm", "Play pronunciation")}>
                <Volume2 className="h-5 w-5" />
              </Button>
            )}
            {mastered && onToggleMastered && (
              <Button type="button" size="icon" variant="ghost" onClick={event => { event.stopPropagation(); onToggleMastered(card.key, event); }} aria-label={t("Đánh dấu đã thuộc", "Mark as mastered")}>
                <Star className={mastered.has(card.key) ? "h-5 w-5 fill-amber-400 text-amber-400" : "h-5 w-5 text-muted-foreground"} />
              </Button>
            )}
          </div>
          {card.visual}
          <h3 className="max-w-full break-words text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">{card.term}</h3>
          {card.pronunciation && <p className="font-mono text-lg text-muted-foreground">{card.pronunciation}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {card.level && <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{card.level}</span>}
            {card.partOfSpeech && <span className="rounded-full bg-secondary px-3 py-1 text-sm italic text-secondary-foreground">{card.partOfSpeech}</span>}
            {card.category && <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">{card.category}</span>}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> {t("Chạm vào thẻ để lật (hoặc nhấn Space)", "Tap the card to flip (or press Space)")}
          </p>
        </div>
      )}
      renderBack={card => (
        <div className="flex min-h-[23rem] flex-col items-center justify-center gap-3 text-center">
          {speak && card.example && (
            <Button type="button" size="icon" variant="ghost" className="absolute right-4 top-4" onClick={event => { event.stopPropagation(); speak(card.example ?? card.term); }} aria-label={t("Nghe ví dụ", "Play example")}>
              <Volume2 className="h-5 w-5" />
            </Button>
          )}
          <p className="break-words text-2xl font-bold leading-relaxed text-primary sm:text-3xl">{card.meaningPrimary}</p>
          {card.meaningSecondary && <p className="break-words text-lg font-semibold leading-relaxed text-foreground">{card.meaningSecondary}</p>}
          {card.example && <p className="break-words text-base italic leading-relaxed text-foreground"><strong className="not-italic text-primary">E.g. </strong>{card.example}</p>}
          {card.exampleTranslation && <p className="break-words text-base font-medium leading-relaxed text-emerald-700 dark:text-emerald-300">→ {card.exampleTranslation}</p>}
          {card.synonyms && card.synonyms.length > 0 && <p className="w-full rounded-md bg-emerald-500/10 p-3 text-sm text-foreground"><strong>Syn: </strong>{card.synonyms.join(" • ")}</p>}
          {card.collocations && card.collocations.length > 0 && <p className="w-full rounded-md bg-primary/10 p-3 text-sm text-foreground"><strong>Collocations: </strong>{card.collocations.join(" • ")}</p>}
          {card.backExtra && <div className="w-full">{card.backExtra}</div>}
        </div>
      )}
    />
  );
}