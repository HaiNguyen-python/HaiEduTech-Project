/**
 * @file useStudentProfile.ts
 * @description Hook to load/save the current user's academic profile from Supabase.
 *   Falls back to empty state for guests; never crashes the page.
 */
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { StudentProfileLite } from "@/lib/scholarshipMatcher";

export interface StudentProfileFull extends StudentProfileLite {
  id?: string;
  user_id?: string;
}

export function useStudentProfile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<StudentProfileFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!active) return;
      const uid = auth.user?.id || null;
      setUserId(uid);
      if (!uid) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();
      if (!active) return;
      setProfile((data as StudentProfileFull) || null);
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  const saveProfile = useCallback(
    async (patch: StudentProfileLite) => {
      if (!userId) return { error: "not_authenticated" as const };
      setSaving(true);
      const payload = { user_id: userId, ...patch, updated_at: new Date().toISOString() };
      const { data, error } = await supabase
        .from("student_profiles")
        .upsert(payload, { onConflict: "user_id" })
        .select()
        .maybeSingle();
      setSaving(false);
      if (error) return { error: error.message };
      setProfile(data as StudentProfileFull);
      return { data };
    },
    [userId]
  );

  return { userId, profile, loading, saving, saveProfile };
}
