/**
 * @file notebookService.ts
 * @description Shared read/write layer for student_notebooks.
 *
 * ⚠️ CRITICAL — DO NOT REGRESS ⚠️
 * Never overwrite the localStorage snapshot with an EMPTY array. A transient
 * auth race (token refresh, tab wake) makes RLS return 0 rows even though the
 * student still has dozens of notes on the server. If we wipe the cache on
 * that empty result, the user sees "no notes" and panics. Always preserve the
 * previous snapshot when the new fetch is empty, and prefer merging by id.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

export interface NotebookRow {
  id: string;
  title: string;
  content: string;
  subject: string;
  updated_at: string;
  created_at?: string;
  user_id?: string;
  is_public?: boolean;
}

const SNAPSHOT_PREFIX = "notebook-snapshot-";
const MAX_SNAPSHOT_BYTES = 2 * 1024 * 1024; // 2 MB safety cap
// Always SELECT the full superset so every caller (Notebook page, Floating
// widget, future consumers) shares the same shape in the snapshot cache.
const FULL_COLUMNS =
  "id, user_id, title, content, subject, is_public, created_at, updated_at";

export const snapshotKey = (userId: string) => `${SNAPSHOT_PREFIX}${userId}`;

export const readSnapshot = (userId: string): NotebookRow[] | null => {
  try {
    const raw = localStorage.getItem(snapshotKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as NotebookRow[];
  } catch {
    return null;
  }
};

/**
 * Persist the snapshot — but ONLY when we actually have rows. An empty array
 * almost always means a transient RLS/auth race, not real deletion. See file
 * header.
 */
export const writeSnapshot = (userId: string, rows: NotebookRow[]) => {
  if (!Array.isArray(rows) || rows.length === 0) return;
  try {
    const payload = JSON.stringify(rows);
    if (payload.length > MAX_SNAPSHOT_BYTES) {
      // Keep the most recently updated rows that fit in the cap.
      const sorted = [...rows].sort((a, b) =>
        (b.updated_at || "").localeCompare(a.updated_at || ""),
      );
      const trimmed: NotebookRow[] = [];
      let size = 2; // for the surrounding []
      for (const r of sorted) {
        const piece = JSON.stringify(r);
        if (size + piece.length + 1 > MAX_SNAPSHOT_BYTES) break;
        trimmed.push(r);
        size += piece.length + 1;
      }
      localStorage.setItem(snapshotKey(userId), JSON.stringify(trimmed));
      return;
    }
    localStorage.setItem(snapshotKey(userId), payload);
  } catch {
    /* quota / disabled — ignore */
  }
};

/** Remove a single row from the cached snapshot after a confirmed delete. */
export const pruneSnapshot = (userId: string, deletedId: string) => {
  const snap = readSnapshot(userId);
  if (!snap) return;
  const next = snap.filter((r) => r.id !== deletedId);
  try {
    localStorage.setItem(snapshotKey(userId), JSON.stringify(next));
  } catch {
    /* ignore */
  }
};

/**
 * Union snapshot + server rows by id, keeping whichever copy has the newer
 * updated_at. Protects against the server momentarily returning a subset.
 */
const mergeRows = (
  existing: NotebookRow[] | null,
  incoming: NotebookRow[],
): NotebookRow[] => {
  if (!existing || existing.length === 0) return incoming;
  const map = new Map<string, NotebookRow>();
  for (const r of existing) map.set(r.id, r);
  for (const r of incoming) {
    const prev = map.get(r.id);
    if (!prev) {
      map.set(r.id, r);
    } else {
      const a = prev.updated_at || "";
      const b = r.updated_at || "";
      map.set(r.id, b >= a ? r : prev);
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    (b.updated_at || "").localeCompare(a.updated_at || ""),
  );
};

export interface FetchNotebooksResult {
  rows: NotebookRow[];
  fromSnapshot: boolean;
  error: string | null;
}

/**
 * Always returns rows when possible. If the network/RLS call fails, or the
 * server returns an empty list while we still have a non-empty snapshot, we
 * fall back to the snapshot and flag fromSnapshot=true so the UI can warn the
 * user instead of pretending the notebook is empty.
 *
 * The `_columns` parameter is kept for backwards compatibility but ignored —
 * every caller now receives the full column set so cached snapshots stay
 * consistent across pages.
 */
export const fetchUserNotebooks = async (
  userId: string,
  _columns?: string,
): Promise<FetchNotebooksResult> => {
  const snap = readSnapshot(userId);

  // Guard against the auth race: if there is no session yet, never write an
  // empty snapshot. Fall back to whatever we already cached.
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    return {
      rows: snap ?? [],
      fromSnapshot: !!snap,
      error: snap ? "no_session_cache" : "no_session",
    };
  }

  const { data, error } = await supabase
    .from("student_notebooks")
    .select(FULL_COLUMNS)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    return {
      rows: snap ?? [],
      fromSnapshot: !!snap,
      error: error.message || "fetch_failed",
    };
  }

  const incoming = ((data || []) as unknown) as NotebookRow[];

  // Server says zero but cache has data → almost certainly an auth/RLS race.
  // Preserve the cache and surface a soft warning instead of wiping the UI.
  if (incoming.length === 0 && snap && snap.length > 0) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[notebookService] server returned 0 rows but snapshot has",
        snap.length,
        "— preserving cache to avoid losing notes.",
      );
    }
    return {
      rows: snap,
      fromSnapshot: true,
      error: "empty_result_preserved_cache",
    };
  }

  const merged = mergeRows(snap, incoming);
  writeSnapshot(userId, merged);
  return { rows: merged, fromSnapshot: false, error: null };
};
