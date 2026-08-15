/**
 * @file useDisplayName.ts
 * @description Single source of truth for the signed-in user's display name.
 *              The name a student saves in Dashboard > Personal info lives in
 *              `profiles.full_name`. Auth metadata (from Google OAuth) can be
 *              stale, so it is only used as a fallback. The resolved name is
 *              cached in localStorage so it renders instantly after a reload
 *              and never "flashes" the old OAuth name.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const PROFILE_NAME_EVENT = "haiedutech:profile-name-updated";

const cacheKey = (userId: string) => `haiedutech.display-name.${userId}`;

interface MinimalUser {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}

/** Read the last known saved name for a user (may be null). */
export function getCachedDisplayName(userId?: string | null): string | null {
  if (!userId) return null;
  try {
    return localStorage.getItem(cacheKey(userId));
  } catch {
    return null;
  }
}

/** Persist + broadcast a freshly saved name so every mounted view updates. */
export function broadcastDisplayName(userId: string, name: string) {
  try {
    localStorage.setItem(cacheKey(userId), name);
  } catch {
    /* storage unavailable - ignore */
  }
  window.dispatchEvent(
    new CustomEvent(PROFILE_NAME_EVENT, { detail: { userId, name } }),
  );
}

/** Fetch the saved profile name straight from the database. */
export async function fetchProfileName(userId: string): Promise<string | null> {
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();
  const name = (data?.full_name || "").trim();
  if (name) {
    try {
      localStorage.setItem(cacheKey(userId), name);
    } catch {
      /* ignore */
    }
    return name;
  }
  return null;
}

function metadataName(user: MinimalUser | null | undefined): string {
  const meta = (user?.user_metadata || {}) as Record<string, unknown>;
  return (
    (meta.full_name as string) ||
    (meta.name as string) ||
    user?.email?.split("@")[0] ||
    ""
  );
}

/**
 * Resolve the display name for a user: saved profile name first, then cached
 * value, then auth metadata, then the email prefix.
 */
export function useDisplayName(
  user: MinimalUser | null | undefined,
  fallback = "User",
): string {
  const [name, setName] = useState<string>(
    () => getCachedDisplayName(user?.id) || metadataName(user) || fallback,
  );

  useEffect(() => {
    if (!user?.id) {
      setName(fallback);
      return;
    }
    let active = true;
    setName(getCachedDisplayName(user.id) || metadataName(user) || fallback);
    fetchProfileName(user.id).then((profileName) => {
      if (active && profileName) setName(profileName);
    });

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ userId: string; name: string }>).detail;
      if (detail?.userId === user.id && detail.name) setName(detail.name);
    };
    window.addEventListener(PROFILE_NAME_EVENT, onUpdate);
    return () => {
      active = false;
      window.removeEventListener(PROFILE_NAME_EVENT, onUpdate);
    };
  }, [user?.id, fallback]);

  return name || fallback;
}
