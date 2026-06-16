import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "teacher" | "student" | "assistant";

// Module-level cache, keyed by user id. Prevents the Admin link in the Navbar
// from flickering off on TOKEN_REFRESHED / tab-focus events while a re-fetch
// is in flight. We only invalidate when the user actually changes.
let cachedUserId: string | null = null;
let cachedUser: any = null;
let cachedRoles: AppRole[] = [];
let cachedHydrated = false;
let inflight: Promise<void> | null = null;

const fetchRolesOnce = async (userId: string) => {
  if (inflight && cachedUserId === userId) return inflight;
  inflight = (async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    // Only overwrite on success. A transient error (e.g. auth header not yet
    // attached) must NOT wipe a previously-known role set.
    if (!error && data) {
      cachedRoles = data.map((r: any) => r.role as AppRole);
      cachedUserId = userId;
    }
  })();
  try {
    await inflight;
  } finally {
    inflight = null;
  }
};

export const useUserRole = () => {
  const [roles, setRoles] = useState<AppRole[]>(cachedRoles);
  const [loading, setLoading] = useState(!cachedHydrated);
  const [user, setUser] = useState<any>(cachedUser);

  useEffect(() => {
    let mounted = true;

    const refresh = async (u: any) => {
      if (!u) {
        cachedUser = null;
        cachedUserId = null;
        cachedRoles = [];
        if (mounted) {
          setUser(null);
          setRoles([]);
          setLoading(false);
        }
        return;
      }
      // Same user as cached -> reuse roles immediately, refresh in background.
      const sameUser = cachedUserId === u.id && cachedRoles.length >= 0;
      cachedUser = u;
      if (mounted) {
        setUser(u);
        if (sameUser) {
          setRoles(cachedRoles);
          setLoading(false);
        }
      }
      await fetchRolesOnce(u.id);
      if (mounted) {
        setRoles(cachedRoles);
        setLoading(false);
      }
    };

    // Listener first (no awaits inside the callback).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      cachedHydrated = true;
      // Only treat SIGNED_OUT as a real sign-out. TOKEN_REFRESHED / USER_UPDATED
      // with a null session is treated as transient and ignored.
      if (!u && event !== "SIGNED_OUT" && event !== "INITIAL_SESSION") return;
      setTimeout(() => { refresh(u); }, 0);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      cachedHydrated = true;
      refresh(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Realtime: refetch role list whenever this user's row in user_roles changes.
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel(`user_roles_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_roles", filter: `user_id=eq.${user.id}` },
        async () => {
          const { data, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id);
          if (!error && data) {
            cachedRoles = data.map((r: any) => r.role as AppRole);
            cachedUserId = user.id;
            setRoles(cachedRoles);
          }
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
  const isPureAssistant = isAssistant && !isSuperAdmin;

  return { user, roles, isTeacher, isAdmin, isStudent, isAssistant, isSuperAdmin, isPureAssistant, loading };
};
