import { supabase } from "@/integrations/supabase/client";

export interface UpgradeOutcome {
  upgraded: string;
  error?: string;
}

/**
 * Request the Band 8.0+ rewrite of an essay.
 * Retries once on transient failures (network / 5xx / empty body) so the
 * report never ends up with an empty "Band 8.0+ Version" section.
 */
export async function fetchUpgradedEssay(essay: string, taskType: number): Promise<UpgradeOutcome> {
  let lastError = "";

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { data, error } = await supabase.functions.invoke("upgrade-writing", {
        body: { essay, taskType },
      });
      if (error) {
        lastError = error.message || "Upgrade request failed.";
      } else {
        const payload = data as { upgraded?: string; error?: string } | null;
        const upgraded = (payload?.upgraded || "").trim();
        if (upgraded) return { upgraded };
        lastError = payload?.error || "AI returned an empty upgrade.";
      }
    } catch (e) {
      lastError = e instanceof Error ? e.message : "Upgrade request failed.";
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 1200));
  }

  return { upgraded: "", error: lastError };
}
