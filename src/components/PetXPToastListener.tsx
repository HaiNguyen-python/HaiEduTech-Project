/**
 * Listens for `pet:xp` events anywhere in the app and shows a small toast
 * "+N XP 🐾 — {source}". Debounces bursts (≤ 800ms apart) into a single toast
 * that sums the amounts, so rapid mastery toggles don't spam the user.
 */
import { useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { PET_XP_EVENT } from "@/hooks/usePetXP";

const LABELS: Record<string, string> = {
  vocab: "Học từ vựng",
  lecture: "Hoàn thành bài giảng",
  quiz: "Vượt quiz",
  exam: "Thi mock",
  speaking: "Luyện nói",
  writing: "Luyện viết",
  "ai-academy": "AI Academy",
  programming: "Lập trình",
  "daily-quest": "Nhiệm vụ hôm nay",
};

const labelFor = (src: string) => {
  if (LABELS[src]) return LABELS[src];
  // vocab:ielts, vocab:hsk, … -> "Học từ vựng (ielts)"
  const [base, sub] = src.split(":");
  if (LABELS[base]) return sub ? `${LABELS[base]} (${sub.toUpperCase()})` : LABELS[base];
  return src;
};

const PetXPToastListener = () => {
  const bufferRef = useRef<{ total: number; lastSrc: string; timer: number | null }>({
    total: 0,
    lastSrc: "",
    timer: null,
  });

  useEffect(() => {
    const flush = () => {
      const buf = bufferRef.current;
      if (buf.total > 0) {
        toast({
          title: `🐾 +${buf.total} XP cho Pet`,
          description: labelFor(buf.lastSrc),
        });
      }
      buf.total = 0;
      buf.lastSrc = "";
      buf.timer = null;
    };

    const onXP = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const amt = Number(detail.amount) || 0;
      const src = String(detail.source || "");
      if (amt <= 0) return;
      const buf = bufferRef.current;
      buf.total += amt;
      buf.lastSrc = src;
      if (buf.timer != null) window.clearTimeout(buf.timer);
      buf.timer = window.setTimeout(flush, 800);
    };

    window.addEventListener(PET_XP_EVENT, onXP);
    return () => {
      window.removeEventListener(PET_XP_EVENT, onXP);
      const buf = bufferRef.current;
      if (buf.timer != null) window.clearTimeout(buf.timer);
    };
  }, []);

  return null;
};

export default PetXPToastListener;
