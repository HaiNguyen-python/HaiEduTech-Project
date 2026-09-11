/**
 * Shared student-list helpers for the admin screens.
 *
 * Duplicate profiles (the same person who signed up twice) are merged with the
 * exact same rule the `get_admin_dashboard_snapshot` RPC uses server-side:
 * trim + lowercase + collapse whitespace on the display name, and keep the
 * OLDEST profile (created_at ASC, then id ASC) as the primary account.
 * Keeping one rule everywhere means Classes, Assignments and Placement all
 * point at the same account for a given student.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/adminData";

export interface AdminProfile {
  id: string;
  full_name: string | null;
  created_at?: string | null;
}

/** Normalized key used to detect duplicate student names. */
export function normalizeStudentName(name?: string | null): string {
  return (name ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

export interface DedupeResult<T extends AdminProfile> {
  /** Primary profiles only, sorted by display name. */
  students: T[];
  /** How many duplicate profiles were folded into a primary. */
  mergedCount: number;
  /** duplicateProfileId -> primaryProfileId */
  aliasOf: Map<string, string>;
  /** Normalized names that had more than one profile. */
  duplicateNames: string[];
}

export function dedupeStudentProfiles<T extends AdminProfile>(rows: T[]): DedupeResult<T> {
  const byId = new Map<string, T>();
  rows.forEach((r) => { if (r?.id && !byId.has(r.id)) byId.set(r.id, r); });

  // Oldest first so the primary account is stable and matches the RPC.
  const sorted = Array.from(byId.values()).sort((a, b) => {
    const ta = a.created_at ? Date.parse(a.created_at) : 0;
    const tb = b.created_at ? Date.parse(b.created_at) : 0;
    if (ta !== tb) return ta - tb;
    return a.id.localeCompare(b.id);
  });

  const primaryByName = new Map<string, T>();
  const students: T[] = [];
  const aliasOf = new Map<string, string>();
  const duplicateNames = new Set<string>();

  for (const profile of sorted) {
    const key = normalizeStudentName(profile.full_name);
    if (!key) { students.push(profile); continue; } // unnamed profiles stay separate
    const primary = primaryByName.get(key);
    if (primary) {
      aliasOf.set(profile.id, primary.id);
      duplicateNames.add(key);
      continue;
    }
    primaryByName.set(key, profile);
    students.push(profile);
  }

  students.sort((a, b) => (a.full_name ?? "").localeCompare(b.full_name ?? ""));
  return { students, mergedCount: aliasOf.size, aliasOf, duplicateNames: Array.from(duplicateNames) };
}

/** Every profile, paged past the 1000-row API ceiling. */
export function fetchAllProfiles() {
  return fetchAllRows<AdminProfile>((from, to) =>
    supabase
      .from("profiles")
      .select("id, full_name, created_at")
      .order("created_at", { ascending: true })
      .range(from, to),
  );
}

/** Map any profile id (primary or duplicate) to its primary id. */
export function resolvePrimaryId(aliasOf: Map<string, string>, id: string): string {
  return aliasOf.get(id) ?? id;
}
