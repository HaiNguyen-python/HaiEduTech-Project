/**
 * Leaderboard dedup helper.
 *
 * Same student sometimes has multiple accounts that share an identical
 * `full_name` (e.g. "Khôi Nguyễn" registered three times). The DB
 * intentionally keeps those separate, but on the public leaderboard each
 * display name should only appear once. We collapse rows by normalized name
 * (trim + lowercase + diacritics) and keep the entry with the highest score,
 * so each visible row reflects the student's best actual record.
 *
 * Rows missing a meaningful name are deduped by user_id only so anonymous
 * "Student" entries don't all collapse into a single row.
 */
export interface DedupableEntry {
  user_id: string;
  score: number;
  display_name: string;
}

const normalizeName = (name: string): string => {
  return (name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const GENERIC_NAMES = new Set(["student", "học viên", "hoc vien", ""]);

export function dedupeByDisplayName<T extends DedupableEntry>(entries: T[]): T[] {
  const byName = new Map<string, T>();
  const byUser = new Map<string, T>();

  for (const entry of entries) {
    const key = normalizeName(entry.display_name);
    // Generic / empty names → dedupe by user_id only (do not merge unrelated guests)
    if (GENERIC_NAMES.has(key)) {
      const existing = byUser.get(entry.user_id);
      if (!existing || entry.score > existing.score) byUser.set(entry.user_id, entry);
      continue;
    }
    const existing = byName.get(key);
    if (!existing || entry.score > existing.score) byName.set(key, entry);
  }

  return [...byName.values(), ...byUser.values()].sort((a, b) => b.score - a.score);
}
