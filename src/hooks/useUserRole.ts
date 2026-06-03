import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "teacher" | "student" | "assistant";

// Module-level cache so navigating between pages does NOT flicker back to
// "signed out" state while the per-page hook instance re-resolves the session.
// This was the root cause behind users feeling "logged out" when switching tabs.
let cachedUser: any = null;
let cachedRoles: AppRole[] = [];
let cachedHydrated = false;

export const useUserRole = () => {
  const [roles, setRoles] = useState<AppRole[]>(cachedRoles);
  // If we've ever hydrated the session this tab, start optimistic (not loading)
  // so guards relying on `loading` don't briefly redirect to /login.
  const [loading, setLoading] = useState(!cachedHydrated);
  const [user, setUser] = useState<any>(cachedUser);

  useEffect(() => {
    let mounted = true;

    const fetchRoles = async (userId: string) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (!mounted) return;
      const next = (data || []).map((r: any) => r.role as AppRole);
      cachedRoles = next;
      setRoles(next);
      setLoading(false);
    };

    // IMPORTANT: set up listener FIRST, and never await Supabase calls inside
    // the callback (defer them with setTimeout to avoid deadlocks).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      cachedUser = u;
      cachedHydrated = true;
      setUser(u);
      if (u) {
        setTimeout(() => {
          fetchRoles(u.id);
        }, 0);
      } else {
        cachedRoles = [];
        setRoles([]);
        setLoading(false);
      }
    });

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      cachedUser = u;
      cachedHydrated = true;
      setUser(u);
      if (u) {
        fetchRoles(u.id);
      } else {
        cachedRoles = [];
        setRoles([]);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Realtime: refetch role list whenever this user's row in user_roles changes
  // (admin appoints/revokes CTV → UI updates without re-login).
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel(`user_roles_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_roles", filter: `user_id=eq.${user.id}` },
        async () => {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id);
          const next = (data || []).map((r: any) => r.role as AppRole);
          cachedRoles = next;
          setRoles(next);
        },
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id]);

  const isTeacher = roles.includes("teacher") || roles.includes("admin");
  const isAdmin = roles.includes("admin");
  const isStudent = roles.includes("student");
  const isAssistant = roles.includes("assistant");
  const isSuperAdmin = roles.includes("admin") || roles.includes("teacher");
  // Pure assistant = has assistant role but is NOT a super admin
  const isPureAssistant = isAssistant && !isSuperAdmin;

  return { user, roles, isTeacher, isAdmin, isStudent, isAssistant, isSuperAdmin, isPureAssistant, loading };
};
