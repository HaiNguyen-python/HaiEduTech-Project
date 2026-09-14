// Shared Web Speech API recognizer for the Speaking Coach practice modes.
// Keeps mic pre-flight, iOS single-shot handling, restart logic and cleanup in
// one place so every mode behaves the same.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface UseSpeechRecognizerOptions {
  speechLang: string;
  maxSeconds?: number;
  onFinal?: (transcript: string, elapsedMs: number) => void;
  /**
   * When true the turn ends only on an explicit stop() (or the maxSeconds
   * ceiling): the recognizer keeps restarting through natural pauses so long
   * sentences are captured whole. Used by "Speak with Mr. Hai".
   */
  manualStopOnly?: boolean;
}

export const isAppleWebkitBrowser = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator as any).maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
  return isIOS || isSafari;
};

export function useSpeechRecognizer({ speechLang, maxSeconds = 90, onFinal, manualStopOnly = false }: UseSpeechRecognizerOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const recognitionRef = useRef<any>(null);
  const accumulatedRef = useRef("");
  const interimRef = useRef("");
  const manualOnlyRef = useRef(manualStopOnly);
  manualOnlyRef.current = manualStopOnly;
  const manualStopRef = useRef(false);
  const startedAtRef = useRef(0);
  const finalRef = useRef(onFinal);
  const mountedRef = useRef(true);
  finalRef.current = onFinal;

  const supported = useMemo(
    () => typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window),
    []
  );

  const teardown = useCallback(() => {
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    if (rec) {
      try {
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.abort();
      } catch { /* already closed */ }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      manualStopRef.current = true;
      teardown();
    };
  }, [teardown]);

  const stopRef = useRef<() => void>(() => {});

  // Visible listening timer + hard ceiling.
  useEffect(() => {
    if (!isRecording) return;
    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);
      setSeconds(elapsed);
      if (elapsed >= maxSeconds) stopRef.current();
    }, 250);
    return () => window.clearInterval(id);
  }, [isRecording, maxSeconds]);


  const finish = useCallback(() => {
    // Keep the not-yet-final tail so the last words of a sentence are never lost.
    const text = `${accumulatedRef.current} ${interimRef.current}`.replace(/\s+/g, " ").trim();
    interimRef.current = "";
    const elapsed = Date.now() - startedAtRef.current;
    setIsRecording(false);
    if (text && finalRef.current) finalRef.current(text, elapsed);
  }, []);

  const stop = useCallback(() => {
    manualStopRef.current = true;
    const rec = recognitionRef.current;
    if (rec) {
      try { rec.stop(); } catch { /* noop */ }
    }
    finish();
  }, [finish]);
  stopRef.current = stop;


  const start = useCallback(async () => {
    if (!supported) {
      setError("unsupported");
      return false;
    }
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setError("insecure");
      return false;
    }
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (err: any) {
        const name = err?.name || "";
        setError(name === "NotFoundError" || name === "DevicesNotFoundError" ? "nodevice" : "denied");
        return false;
      }
    }

    teardown();
    setError(null);
    setTranscript("");
    setSeconds(0);
    accumulatedRef.current = "";
    interimRef.current = "";
    manualStopRef.current = false;
    startedAtRef.current = Date.now();

    const Ctor: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new Ctor();
    rec.lang = speechLang;
    rec.interimResults = true;
    rec.continuous = !isAppleWebkitBrowser();
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0]?.transcript ?? "";
        if (event.results[i].isFinal) accumulatedRef.current = `${accumulatedRef.current} ${chunk}`.trim();
        else interim += chunk;
      }
      interimRef.current = interim.trim();
      if (mountedRef.current) setTranscript(`${accumulatedRef.current} ${interim}`.replace(/\s+/g, " ").trim());
    };

    rec.onerror = (event: any) => {
      if (event?.error === "no-speech" || event?.error === "aborted") return;
      if (!mountedRef.current) return;
      setError(event?.error === "not-allowed" ? "denied" : "recognition");
    };

    rec.onend = () => {
      if (!mountedRef.current) return;
      if (manualStopRef.current || recognitionRef.current !== rec) return;
      // Continuous sessions end on their own; restart while the learner is still
      // speaking so a pause in the middle of a sentence does not end the turn.
      const withinCeiling = Date.now() - startedAtRef.current < maxSeconds * 1000;
      if ((rec.continuous || manualOnlyRef.current) && withinCeiling) {
        if (interimRef.current) {
          accumulatedRef.current = `${accumulatedRef.current} ${interimRef.current}`.replace(/\s+/g, " ").trim();
          interimRef.current = "";
        }
        try { rec.start(); return; } catch { /* fall through to finish */ }
      }
      finish();
    };

    recognitionRef.current = rec;
    try {
      rec.start();
      setIsRecording(true);
      return true;
    } catch {
      setError("recognition");
      teardown();
      return false;
    }
  }, [finish, maxSeconds, speechLang, supported, teardown]);

  const reset = useCallback(() => {
    manualStopRef.current = true;
    teardown();
    setIsRecording(false);
    setTranscript("");
    setSeconds(0);
    setError(null);
    accumulatedRef.current = "";
    interimRef.current = "";
  }, [teardown]);

  return { supported, isRecording, transcript, error, seconds, start, stop, reset };
}
