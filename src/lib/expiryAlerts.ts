/**
 * @file expiryAlerts.ts
 * @description Pure helpers for computing document/test-score expiry alert status.
 */

export type ExpiryStatus = "ok" | "soon" | "warning" | "expired";

export interface ExpiryInfo {
  status: ExpiryStatus;
  daysLeft: number;       // negative if expired
  labelVi: string;
  labelEn: string;
  colorClass: string;     // bg + text + border
}

/**
 * Compute expiry status from an ISO date string.
 *  - expired: past date
 *  - warning: ≤ 90 days left
 *  - soon: ≤ 180 days left
 *  - ok: > 180 days left
 */
export function getExpiryInfo(expiryDate: string | null | undefined): ExpiryInfo | null {
  if (!expiryDate) return null;
  const exp = new Date(expiryDate);
  if (isNaN(exp.getTime())) return null;
  const now = new Date();
  const ms = exp.getTime() - now.getTime();
  const daysLeft = Math.ceil(ms / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return {
      status: "expired",
      daysLeft,
      labelVi: `Đã hết hạn ${Math.abs(daysLeft)} ngày`,
      labelEn: `Expired ${Math.abs(daysLeft)} days ago`,
      colorClass: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/40",
    };
  }
  if (daysLeft <= 90) {
    return {
      status: "warning",
      daysLeft,
      labelVi: `Hết hạn trong ${daysLeft} ngày`,
      labelEn: `Expires in ${daysLeft} days`,
      colorClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/40",
    };
  }
  if (daysLeft <= 180) {
    return {
      status: "soon",
      daysLeft,
      labelVi: `Còn ${daysLeft} ngày`,
      labelEn: `${daysLeft} days left`,
      colorClass: "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
    };
  }
  return {
    status: "ok",
    daysLeft,
    labelVi: `Còn ${daysLeft} ngày`,
    labelEn: `${daysLeft} days left`,
    colorClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  };
}

/** Suggested expiry helper for IELTS (2 years from issue) */
export function ieltsExpiryFromIssue(issueDate: string): string {
  const d = new Date(issueDate);
  d.setFullYear(d.getFullYear() + 2);
  return d.toISOString().split("T")[0];
}
