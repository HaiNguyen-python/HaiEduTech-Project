/**
 * @file useListeningAiAudio.ts
 * @description Fetches high quality AI voice files for an IELTS Listening
 * recording, one file per speaker turn. All turns are loaded before playback so
 * the voice never changes half way through a recording. Files are cached server
 * side, so a set is generated only once.
 * @copyright 2026 HaiEduTech
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { instructionsForSection, speedForSection, voiceForSpeaker } from "@/lib/ieltsListeningVoices";

export interface AudioLine {
  /** Turn index inside the recording. */
  i: number;
  /** Speaker label, null for a single-speaker recording. */
  speaker: string | null;
  /** Spoken text without the speaker label. */
  text: string;
}

/** Lines per request; the edge function accepts at most 14. */
const PAGE = 12;

export const useListeningAiAudio = (setId: string, section: number, lines: AudioLine[]) => {
  const [urls, setUrls] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef(false);
  const startedRef = useRef<string | null>(null);
  const linesRef = useRef(lines);
  linesRef.current = lines;
  // Mirror of `urls` so playback callbacks always read the newest signed URLs.
  const urlsRef = useRef<Record<number, string>>({});

  useEffect(() => {
    // A new recording resets the cache of signed URLs.
    setUrls({});
    urlsRef.current = {};
    setFailed(false);
    setProgress(0);
    startedRef.current = null;
  }, [setId]);

  useEffect(() => () => { abortRef.current = true; }, []);

  const fetchPage = useCallback(
    async (page: number) => {
      const all = linesRef.current;
      const slice = all.slice(page * PAGE, page * PAGE + PAGE);
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
        urlsRef.current = next;
        return next;
      });
      return true;
    },
    [section, setId]
  );

  /** Load every turn of the recording; resolves true when all files are ready. */
  const load = useCallback(async () => {
    const total = linesRef.current.length;
    if (!total) return false;
    setLoading(true);
    setFailed(false);
    setProgress(0);
    const pages = Math.ceil(total / PAGE);
    for (let p = 0; p < pages; p++) {
      if (abortRef.current) { setLoading(false); return false; }
      const ok = await fetchPage(p);
      if (!ok) { setLoading(false); setFailed(true); return false; }
      setProgress(Math.min(1, ((p + 1) * PAGE) / total));
    }
    setLoading(false);
    setProgress(1);
    return true;
  }, [fetchPage]);

  /** Load once per set; repeated calls while ready are no-ops. */
  const prepare = useCallback(async () => {
    if (startedRef.current === setId && Object.keys(urls).length >= linesRef.current.length) return true;
    startedRef.current = setId;
    return load();
  }, [load, setId, urls]);

  /** Ask for fresh signed URLs (the previous batch expired). */
  const refresh = useCallback(async () => {
    startedRef.current = setId;
    setUrls({});
    urlsRef.current = {};
    return load();
  }, [load, setId]);

  const ready = lines.length > 0 && Object.keys(urls).length >= lines.length;

  /** Latest signed URL for a turn, safe to call from playback callbacks. */
  const getUrl = useCallback((index: number) => urlsRef.current[index], []);

  return { urls, loading, failed, progress, prepare, refresh, ready, getUrl };
};
