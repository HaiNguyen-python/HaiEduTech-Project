/**
 * Cloud-sync layer for VFF progress. Hybrid: writes go to localStorage first (via useVFFProgress),
 * and this hook mirrors them to public.vff_progress when a user is signed in.
 */
import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { VFFProgress } from "./useVFFProgress";

export function useVFFCloudSync(progress: VFFProgress, hydrate: (p: Partial<VFFProgress>) => void) {
  const hydratedRef = useRef(false);

  // Pull once on sign-in
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess.session?.user.id;
      if (!uid) return;
      const { data } = await supabase.from("vff_progress").select("data").eq("user_id", uid).maybeSingle();
      if (cancelled) return;
      if (data?.data && !hydratedRef.current) {
        hydratedRef.current = true;
        hydrate(data.data as Partial<VFFProgress>);
      }
    })();
    return () => { cancelled = true; };
  }, [hydrate]);

  // Push on change (debounced)
  useEffect(() => {
    const t = setTimeout(async () => {
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess.session?.user.id;
      if (!uid) return;
      await supabase.from("vff_progress").upsert({ user_id: uid, data: progress as unknown as Record<string, unknown>, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    }, 800);
    return () => clearTimeout(t);
  }, [progress]);
}
