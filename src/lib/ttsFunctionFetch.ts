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
