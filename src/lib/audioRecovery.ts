/**
 * @file audioRecovery.ts
 * @description Global audio resilience layer for HaiEduTech.
 *
 * Problem: when the user switches tab/app while audio is playing, browsers
 * (especially Chromium on desktop) auto-suspend the WebAudio AudioContext,
 * pause HTMLAudioElements, and freeze speechSynthesis. When the tab regains
 * focus the audio button "looks like it played" but no sound comes out,
 * because nothing in the page knows to resume the underlying engines.
 *
 * Strategy:
 *  1. Track every `AudioContext` the app creates by patching the constructor.
 *  2. Track every `HTMLAudioElement` instance the app creates by patching
 *     `Audio` and `HTMLMediaElement.prototype.play`, remembering whether the
 *     element was "intended to be playing" (so we can tell a user-pause from
 *     a system-pause caused by background throttling).
 *  3. On `visibilitychange` → hidden: do NOTHING destructive. Crucially we
 *     no longer call `speechSynthesis.cancel()` — that previous behaviour
 *     killed every utterance and left buttons silent on return.
 *  4. On `visibilitychange` → visible / `focus` / `pageshow` / first user
 *     gesture: resume all suspended AudioContexts, resume any audio elements
 *     that were paused by the system, and pump `speechSynthesis.resume()`
 *     so Chrome's queue wakes up.
 *  5. Keep speechSynthesis alive while it is speaking by pinging
 *     pause+resume every ~10s — works around the well-known Chrome bug
 *     where speech goes silent after ~15s in background.
 *
 * Imported once from main.tsx. Safe no-op in SSR / non-browser envs.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

type Win = Window & {
  webkitAudioContext?: typeof AudioContext;
  __haiAudioRecoveryInstalled?: boolean;
};

const INTENT_KEY = "__haiPlayIntent";
const USER_PAUSED_KEY = "__haiUserPaused";

type TrackedAudio = HTMLAudioElement & {
  [INTENT_KEY]?: boolean;
  [USER_PAUSED_KEY]?: boolean;
};

const installAudioRecovery = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const w = window as Win;
  if (w.__haiAudioRecoveryInstalled) return;
  w.__haiAudioRecoveryInstalled = true;

  // ---------- AudioContext tracking ----------
  const audioContexts = new Set<AudioContext>();
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

  // ---------- HTMLAudioElement tracking ----------
  const audioElements = new Set<TrackedAudio>();

  const trackAudio = (el: TrackedAudio) => {
    if (audioElements.has(el)) return;
    audioElements.add(el);

    // Distinguish user-initiated pause from a background-throttle pause.
    // We mark `userPaused = true` only when pause() is called while the
    // document is visible — system pauses happen while hidden.
    el.addEventListener("pause", () => {
      try {
        if (document.visibilityState === "visible") {
          el[USER_PAUSED_KEY] = true;
          el[INTENT_KEY] = false;
        }
      } catch { /* ignore */ }
    });
    el.addEventListener("ended", () => {
      el[INTENT_KEY] = false;
      el[USER_PAUSED_KEY] = false;
    });
    el.addEventListener("emptied", () => {
      audioElements.delete(el);
    });
  };

  // Patch the Audio() constructor so every `new Audio(src)` is tracked.
  const OriginalAudio = w.Audio;
  if (OriginalAudio) {
    const PatchedAudio = function (this: HTMLAudioElement, ...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const el = new (OriginalAudio as any)(...args) as TrackedAudio;
      trackAudio(el);
      return el;
    } as unknown as typeof Audio;
    PatchedAudio.prototype = OriginalAudio.prototype;
    (w as unknown as Record<string, unknown>).Audio = PatchedAudio;
  }

  // Patch HTMLMediaElement.play so audio created via <audio> tags or
  // .createElement("audio") is also tracked and intent is recorded.
  if (typeof HTMLMediaElement !== "undefined") {
    const proto = HTMLMediaElement.prototype as HTMLMediaElement & {
      __haiPatched?: boolean;
    };
    if (!proto.__haiPatched) {
      proto.__haiPatched = true;
      const originalPlay = proto.play;
      proto.play = function (this: TrackedAudio) {
        try {
          this[INTENT_KEY] = true;
          this[USER_PAUSED_KEY] = false;
          trackAudio(this);
        } catch { /* ignore */ }
        return originalPlay.apply(this);
      };
    }
  }

  const resumeAllAudioElements = () => {
    audioElements.forEach((el) => {
      try {
        // Only resume if we believe the page wanted it playing and it was
        // paused by the system (not by the user clicking stop).
        if (el[INTENT_KEY] && el.paused && !el.ended && !el[USER_PAUSED_KEY]) {
          el.play().catch(() => undefined);
        }
      } catch { /* ignore */ }
    });
  };

  // ---------- speechSynthesis keep-alive ----------
  // Chrome silently stops the speech engine after ~15s, including when the
  // tab is in the background. Pinging pause+resume keeps it alive without
  // restarting the current utterance.
  let keepAliveTimer: number | null = null;
  const startSpeechKeepAlive = () => {
    if (keepAliveTimer !== null) return;
    const synth = w.speechSynthesis;
    if (!synth) return;
    keepAliveTimer = window.setInterval(() => {
      try {
        if (synth.speaking) {
          synth.pause();
          synth.resume();
        } else if (!synth.pending) {
          // Nothing to keep alive — stop the timer until next speak.
          if (keepAliveTimer !== null) {
            clearInterval(keepAliveTimer);
            keepAliveTimer = null;
          }
        }
      } catch { /* ignore */ }
    }, 10000);
  };

  // Patch speak() so we always (a) record the utterance, (b) kick off the
  // keep-alive loop, (c) make sure the engine is resumed before speaking.
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const synth = w.speechSynthesis;
    const speakProto = SpeechSynthesis.prototype as SpeechSynthesis & { __haiPatched?: boolean };
    if (!speakProto.__haiPatched) {
      speakProto.__haiPatched = true;
      const originalSpeak = speakProto.speak;
      speakProto.speak = function (this: SpeechSynthesis, utterance: SpeechSynthesisUtterance) {
        try {
          if (this.paused) this.resume();
        } catch { /* ignore */ }
        const result = originalSpeak.call(this, utterance);
        startSpeechKeepAlive();
        return result;
      };
    }
    // Pre-warm voices list so the first speak() doesn't no-op silently.
    try { synth.getVoices(); } catch { /* ignore */ }
  }

  // ---------- Visibility + focus handlers ----------
  const wakeEverything = () => {
    resumeAllContexts();
    resumeAllAudioElements();
    const synth = w.speechSynthesis;
    if (synth) {
      try {
        // Pump the queue: if Chrome froze it while hidden, this unsticks it
        // without aborting the current utterance.
        synth.resume();
        if (synth.speaking) {
          synth.pause();
          synth.resume();
          startSpeechKeepAlive();
        }
      } catch { /* ignore */ }
    }
  };

  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      wakeEverything();
    }
    // When hidden: deliberately do nothing. Cancelling speech here was the
    // root cause of "audio dies when I switch tab" — the engine was being
    // shut down by our own recovery layer.
  };

  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("focus", wakeEverything);
  window.addEventListener("pageshow", wakeEverything);
  // First user gesture in a tab is a reliable place to re-warm everything.
  const onGesture = () => wakeEverything();
  window.addEventListener("pointerdown", onGesture, { passive: true });
  window.addEventListener("keydown", onGesture);
};

installAudioRecovery();

export {};
