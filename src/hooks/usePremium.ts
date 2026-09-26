import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "./useUserRole";
import { setPremiumCache } from "@/lib/aiQuota";

export const PREMIUM_CHANGED_EVENT = "haiedutech:premium-changed";
export const OPEN_UPGRADE_EVENT = "haiedutech:open-upgrade";
/** Number of lessons per course that every signed-in learner can open for free. */
export const FREE_LESSONS = 0;

export const openUpgradeModal = () => window.dispatchEvent(new Event(OPEN_UPGRADE_EVENT));

export interface PremiumState {
  status: string | null;
  source: string | null;
  expiresAt: string | null;
}

export const usePremium = () => {
  const { user, isTeacher, isAdmin, isAssistant, loading: roleLoading } = useUserRole();
  const [state, setState] = useState<PremiumState>({ status: null, source: null, expiresAt: null });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setState({ status: null, source: null, expiresAt: null });
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("user_subscriptions")
      .select("status, source, expires_at")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();
    setState({ status: data?.status ?? null, source: data?.source ?? null, expiresAt: data?.expires_at ?? null });
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (roleLoading) return;
    load();
    const h = () => load();
    window.addEventListener(PREMIUM_CHANGED_EVENT, h);
    return () => window.removeEventListener(PREMIUM_CHANGED_EVENT, h);
  }, [load, roleLoading]);

  const isStaff = isTeacher || isAdmin || isAssistant;
  const notExpired = !state.expiresAt || new Date(state.expiresAt) > new Date();
  const isPremium = isStaff || (state.status === "active" && notExpired);
  const daysLeft = state.expiresAt ? Math.ceil((new Date(state.expiresAt).getTime() - Date.now()) / 86400000) : null;

  useEffect(() => {
    if (!loading && !roleLoading) setPremiumCache(user?.id ?? null, isPremium);
  }, [user, isPremium, loading, roleLoading]);

  return { user, isStaff, isPremium, loading: loading || roleLoading, ...state, daysLeft, refresh: load };
};
