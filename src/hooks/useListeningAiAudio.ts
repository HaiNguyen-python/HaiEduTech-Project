/**
 * @file useListeningAiAudio.ts
 * @description Fetches high quality AI voice files for an IELTS Listening
 * recording, one file per spoken line, in small pages so playback can start
 * quickly. Files are cached server side, so a set is generated only once.
 * @copyright 2026 HaiEduTech
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { instructionsForSection, speedForSection, voiceForSpeaker } from "@/lib/ieltsListeningVoices";

export interface AudioLine {
  /** Chunk index inside the recording. */
  i: number;
  /** Speaker label, null for a single-speaker recording. */
  speaker: string | null;
  /** Spoken text without the speaker label. */
  text: string;
}

const PAGE = 12;

export const useListeningAiAudio = (setId: string, section: number, lines: AudioLine[], enabled: boolean) => {
  const [urls, setUrls] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const abortRef = useRef(false);
  const startedRef = useRef<string | null>(null);

  useEffect(() => {
    // A new recording resets the cache of signed URLs.
    setUrls({});
    setFailed(false);
    startedRef.current = null;
  }, [setId]);

  useEffect(() => () => { abortRef.current = true; }, []);

  const fetchPage = useCallback(
    async (page: number) => {
      const slice = lines.slice(page * PAGE, page * PAGE + PAGE);
      if (!slice.length) return true;
      const { data, error } = await supabase.functions.invoke("listening-tts", {
        body: {
          setId,
          lines: slice.map((l) => ({
            i: l.i,
            text: l.text,
            voice: voiceForSpeaker(l.speaker, section),
            instructions: instructionsForSection(section, l.speaker),
            speed: speedForSection(section),
          })),
        },
      });
      if (error || !data?.urls?.length) return false;
      setUrls((prev) => {
        const next = { ...prev };
        for (const item of data.urls as { i: number; url: string }[]) next[item.i] = item.url;
        return next;
      });
      return true;
    },
    [lines, section, setId]
  );

  /** Prepare the first page, then keep loading the rest in the background. */
  const prepare = useCallback(async () => {
    if (!enabled || startedRef.current === setId) return;
    startedRef.current = setId;
    setLoading(true);
    const ok = await fetchPage(0);
    setLoading(false);
    if (!ok) { setFailed(true); return; }
    const pages = Math.ceil(lines.length / PAGE);
    for (let p = 1; p < pages; p++) {
      if (abortRef.current) return;
      const done = await fetchPage(p);
      if (!done) { setFailed(true); return; }
    }
  }, [enabled, fetchPage, lines.length, setId]);

  return { urls, loading, failed, prepare, ready: Object.keys(urls).length > 0 };
};
