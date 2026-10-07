import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const KEY = "typing-auto-speak";

/** Shared on/off preference (default on) for auto-playing each new typing sentence. */
export function useAutoSpeakPref() {
  const [on, setOn] = useState(() => (typeof window === "undefined" ? true : localStorage.getItem(KEY) !== "0"));
  const toggle = () => setOn((v) => { localStorage.setItem(KEY, v ? "0" : "1"); return !v; });
  return { on, toggle };
}

/** Speaks `text` whenever `id` changes (a new sentence appears) while enabled. */
export function useAutoSpeak(on: boolean, id: string | undefined, text: string | undefined, play: (t: string) => unknown, stop?: () => void) {
  useEffect(() => {
    if (!on || !id || !text) return;
    const timer = setTimeout(() => { try { void Promise.resolve(play(text)).catch(() => {}); } catch { /* autoplay blocked */ } }, 250);
    return () => { clearTimeout(timer); stop?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, id]);
}

export function AutoSpeakToggle({ on, toggle, onReplay }: { on: boolean; toggle: () => void; onReplay?: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="inline-flex items-center gap-1">
      {onReplay && <Button type="button" size="sm" variant="ghost" onClick={onReplay} aria-label={t("Nghe lại", "Listen again")}><Volume2 className="h-4 w-4" /></Button>}
      <Button type="button" size="sm" variant={on ? "secondary" : "outline"} onClick={toggle} aria-pressed={on}>
        {on ? <Volume2 className="mr-1 h-4 w-4" /> : <VolumeX className="mr-1 h-4 w-4" />}
        {on ? t("Tự phát: Bật", "Auto-play: On") : t("Tự phát: Tắt", "Auto-play: Off")}
      </Button>
    </div>
  );
}
