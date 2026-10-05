import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { pythonChallenges } from "@/data/pythonChallenges";
import { completionIds, type PythonCompletion } from "@/lib/pythonChallengeProgress";

function localCompletions() {
  return pythonChallenges.filter(c => localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1").map(c => c.id);
}

export function usePythonChallengeProgress() {
  const [ids, setIds] = useState(() => completionIds([], localCompletions()));
  const [history, setHistory] = useState<PythonCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    let latestHistory: PythonCompletion[] = [];
    const load = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;
        const rows: PythonCompletion[] = [];
        // Paginate so repeated practice cannot silently hide older completions.
        for (let offset = 0; ; offset += 1000) {
          const { data, error: queryError } = await supabase.from("student_activity_log")
            .select("activity_id, created_at").eq("user_id", session.user.id)
            .eq("activity_type", "python_challenge").gte("score", 10)
            .order("created_at", { ascending: true }).order("id", { ascending: true }).range(offset, offset + 999);
          if (queryError) throw queryError;
          rows.push(...(data ?? []));
          if (!data || data.length < 1000) break;
        }
        if (active) { latestHistory = rows; setHistory(rows); setIds(completionIds(rows, localCompletions())); setError(false); }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    const onStorage = () => { if (active) setIds(completionIds(latestHistory, localCompletions())); };
    window.addEventListener("focus", load);
    window.addEventListener("storage", onStorage);
    window.addEventListener("python-challenge-completed", onStorage);
    return () => { active = false; window.removeEventListener("focus", load); window.removeEventListener("storage", onStorage); window.removeEventListener("python-challenge-completed", onStorage); };
  }, []);
  return { ids, history, loading, error };
}