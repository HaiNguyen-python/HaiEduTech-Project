/**
 * @file notebookService.ts
 * @description Shared read/write layer for student_notebooks.
 * Centralizes fetch, snapshot fallback, and append-by-title so every
 * notebook UI sees the same list and old notes never silently disappear.
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

export const writeSnapshot = (userId: string, rows: NotebookRow[]) => {
  try {
    localStorage.setItem(snapshotKey(userId), JSON.stringify(rows));
  } catch {
    /* quota / disabled — ignore */
  }
};

export interface FetchNotebooksResult {
  rows: NotebookRow[];
  fromSnapshot: boolean;
  error: string | null;
}

/**
 * Always returns rows when possible. If the network/RLS call fails we
 * fall back to the last good snapshot and flag fromSnapshot=true so the
 * UI can warn the user instead of pretending the notebook is empty.
 */
export const fetchUserNotebooks = async (
  userId: string,
  columns = "id, title, content, subject, updated_at, created_at"
): Promise<FetchNotebooksResult> => {
  const { data, error } = await supabase
    .from("student_notebooks")
    .select(columns)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    const snap = readSnapshot(userId);
    return {
      rows: snap ?? [],
      fromSnapshot: !!snap,
      error: error.message || "fetch_failed",
    };
  }
  const rows = ((data || []) as unknown) as NotebookRow[];
  writeSnapshot(userId, rows);
  return { rows, fromSnapshot: false, error: null };
};
