/**
 * @file ttsFunctionFetch.ts
 * @description Lightweight TTS function caller that avoids auth storage locks.
 *
 * The full backend client refreshes auth state before function calls. After a
 * tab/app switch, several parts of the app can race for the same browser auth
 * lock, which makes lesson audio fall back to native speech or fail silently.
 * TTS functions only need the public function token, so this direct fetch path
 * keeps audio independent from auth recovery.
 */

export const invokeTtsFunction = async <T>(functionName: string, body: unknown): Promise<T> => {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const publicKey = (
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ) as string | undefined;

  if (!baseUrl || !publicKey) {
    throw new Error("tts_config_missing");
  }

  const response = await fetch(`${baseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publicKey,
      Authorization: `Bearer ${publicKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`tts_function_${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const waitForAudioForeground = (timeoutMs = 180000): Promise<void> => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve();
  }

  const hasFocus = () => {
    try { return typeof document.hasFocus !== "function" || document.hasFocus(); } catch { return true; }
  };
  const isReady = () => document.visibilityState === "visible" && hasFocus();

  if (isReady()) return Promise.resolve();

  return new Promise((resolve) => {
    let done = false;
    let timer: number | null = null;

    const cleanup = () => {
      window.removeEventListener("focus", check);
      window.removeEventListener("pageshow", check);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("pointerdown", check);
      window.removeEventListener("keydown", check);
      if (timer !== null) window.clearTimeout(timer);
    };

    const finish = () => {
      if (done) return;
      done = true;
      cleanup();
      resolve();
    };

    function check() {
      if (isReady()) finish();
    }

    window.addEventListener("focus", check);
    window.addEventListener("pageshow", check);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("pointerdown", check, { passive: true });
    window.addEventListener("keydown", check);
    timer = window.setTimeout(finish, timeoutMs);
  });
};
