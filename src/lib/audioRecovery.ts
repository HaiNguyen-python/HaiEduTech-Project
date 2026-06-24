/**
 * @file audioRecovery.ts
 * @description Global audio resilience layer for HaiEduTech.
 *
 * Problem: when the user switches tab/app while audio is playing, browsers
 * (especially Chromium) auto-suspend the WebAudio AudioContext and pause
 * speechSynthesis. When the tab becomes visible again, audio buttons appear
 * to "do nothing" because the context is still suspended or the synth queue
 * is stuck. This module patches `AudioContext` and `Audio` constructors to
 * track every instance the app creates, then on visibility changes:
 *   - hidden  → cancel any in-flight speechSynthesis to avoid the Chrome
 *               zombie state where speak() never fires onend afterwards.
 *   - visible → resume every suspended AudioContext and ping speechSynthesis
 *               (pause+resume) so subsequent .speak() calls play again.
 *
 * Imported once from main.tsx. Safe no-op in SSR / non-browser envs.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

type Win = Window & {
  webkitAudioContext?: typeof AudioContext;
  __haiAudioRecoveryInstalled?: boolean;
};

const installAudioRecovery = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const w = window as Win;
  if (w.__haiAudioRecoveryInstalled) return;
  w.__haiAudioRecoveryInstalled = true;

  const audioContexts = new Set<AudioContext>();

  // Patch AudioContext (and webkit variant) so we know every context created.
  const patchAudioCtx = (key: "AudioContext" | "webkitAudioContext") => {
    const Original = (w as unknown as Record<string, typeof AudioContext | undefined>)[key];
    if (!Original) return;
    const Patched = function (this: AudioContext, ...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ctx = new (Original as any)(...args);
      try { audioContexts.add(ctx); } catch { /* ignore */ }
      return ctx;
    } as unknown as typeof AudioContext;
    Patched.prototype = Original.prototype;
    (w as unknown as Record<string, unknown>)[key] = Patched;
  };
  patchAudioCtx("AudioContext");
  patchAudioCtx("webkitAudioContext");

  const resumeAllContexts = () => {
    audioContexts.forEach((ctx) => {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => undefined);
      }
    });
  };

  // speechSynthesis recovery: cancel on hide, ping on show.
  const handleVisibility = () => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (document.visibilityState === "hidden") {
      if (synth && (synth.speaking || synth.pending)) {
        try { synth.cancel(); } catch { /* ignore */ }
      }
    } else {
      resumeAllContexts();
      if (synth) {
        try {
          // Chrome quirk: pause+resume unsticks the queue even if nothing pending.
          synth.pause();
          synth.resume();
        } catch { /* ignore */ }
      }
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("focus", resumeAllContexts);
  window.addEventListener("pageshow", resumeAllContexts);
};

installAudioRecovery();

export {};
