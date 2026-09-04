/**
 * Audio helpers for the "Useful Language & Ideas" panel.
 * Lets students listen to every phrase, structure or idea at normal or slow
 * speed. Only one clip plays at a time and playback stops on demand.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, Square, Rabbit, Turtle, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";

const NORMAL_RATE = 0.98;
const SLOW_RATE = 0.72;

export interface UsefulLanguageAudioApi {
  playingKey: string | null;
  playingAll: boolean;
  play: (key: string, text: string, slow?: boolean) => void;
  playAll: (items: Array<{ key: string; text: string }>) => void;
  stop: () => void;
}

/** Shared playback state for the three Useful Language tabs. */
export const useUsefulLanguageAudio = (): UsefulLanguageAudioApi => {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      runIdRef.current += 1;
      stopEnglishTts();
    };
  }, []);

  const stop = useCallback(() => {
    runIdRef.current += 1;
    stopEnglishTts();
    if (!mountedRef.current) return;
    setPlayingKey(null);
    setPlayingAll(false);
  }, []);

  const play = useCallback((key: string, text: string, slow = false) => {
    const wasPlaying = playingKey === key;
    runIdRef.current += 1;
    const runId = runIdRef.current;
    stopEnglishTts();
    setPlayingAll(false);
    if (wasPlaying) {
      setPlayingKey(null);
      return;
    }
    setPlayingKey(key);
    void playEnglishTts(text, {
      playbackRate: slow ? SLOW_RATE : NORMAL_RATE,
      speechRate: slow ? 0.65 : 0.85,
    }).finally(() => {
      if (mountedRef.current && runIdRef.current === runId) setPlayingKey(null);
    });
  }, [playingKey]);

  const playAll = useCallback((items: Array<{ key: string; text: string }>) => {
    runIdRef.current += 1;
    const runId = runIdRef.current;
    stopEnglishTts();
    if (playingAll || items.length === 0) {
      setPlayingAll(false);
      setPlayingKey(null);
      return;
    }
    setPlayingAll(true);
    void (async () => {
      for (const item of items) {
        if (!mountedRef.current || runIdRef.current !== runId) return;
        setPlayingKey(item.key);
        await playEnglishTts(item.text, { playbackRate: NORMAL_RATE, speechRate: 0.85 });
        await new Promise((r) => setTimeout(r, 260));
      }
      if (mountedRef.current && runIdRef.current === runId) {
        setPlayingKey(null);
        setPlayingAll(false);
      }
    })();
  }, [playingAll]);

  return { playingKey, playingAll, play, playAll, stop };
};

interface PhraseAudioProps {
  api: UsefulLanguageAudioApi;
  itemKey: string;
  text: string;
  /** Label for screen readers. */
  label: string;
  slowLabel: string;
}

/** Normal-speed + slow-speed listen buttons for one item. */
export const PhraseAudio = ({ api, itemKey, text, label, slowLabel }: PhraseAudioProps) => {
  const active = api.playingKey === itemKey;
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={label}
        title={label}
        className={`h-7 w-7 rounded-full ${active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
        onClick={(e) => { e.stopPropagation(); api.play(itemKey, text); }}
      >
        {active ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={slowLabel}
        title={slowLabel}
        className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
        onClick={(e) => { e.stopPropagation(); api.play(`${itemKey}::slow`, text, true); }}
      >
        <Turtle className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};

interface PlayAllProps {
  api: UsefulLanguageAudioApi;
  items: Array<{ key: string; text: string }>;
  playLabel: string;
  stopLabel: string;
}

/** "Listen to all" control shown at the top of each tab. */
export const PlayAllBar = ({ api, items, playLabel, stopLabel }: PlayAllProps) => (
  <div className="flex justify-end mb-2">
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-7 gap-1.5 text-xs"
      onClick={() => (api.playingAll ? api.stop() : api.playAll(items))}
    >
      {api.playingAll ? <Square className="w-3 h-3" /> : <ListMusic className="w-3 h-3" />}
      {api.playingAll ? stopLabel : playLabel}
    </Button>
  </div>
);

export const SPEAKING_AUDIO_RATES = { NORMAL_RATE, SLOW_RATE, Rabbit };
