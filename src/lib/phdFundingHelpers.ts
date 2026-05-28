/**
 * @file phdFundingHelpers.ts
 * @description Helpers to parse deadline strings into months (1-12) and compute
 *   "next deadline" ordering for the Deadline Radar feature.
 */
import { PHD_FUNDING, type PhdFunding } from "@/data/phdFundingDatabase";

const MONTH_MAP: Record<string, number> = {
  jan: 1, january: 1, "1": 1,
  feb: 2, february: 2, "2": 2,
  mar: 3, march: 3, "3": 3,
  apr: 4, april: 4, "4": 4,
  may: 5, "5": 5,
  jun: 6, june: 6, "6": 6,
  jul: 7, july: 7, "7": 7,
  aug: 8, august: 8, "8": 8,
  sep: 9, sept: 9, september: 9, "9": 9,
  oct: 10, october: 10, "10": 10,
  nov: 11, november: 11, "11": 11,
  dec: 12, december: 12, "12": 12,
};

/**
 * Extract every month referenced in a deadline string.
 * Examples:
 *  - "Annually Oct–Nov"  -> [10, 11]
 *  - "Jan 1 & Jul 1"     -> [1, 7]
 *  - "Embassy: Apr–Jun · Uni: Oct–Dec" -> [4,5,6,10,11,12]
 *  - "Rolling per project" -> [] (treated as year-round)
 */
export const extractDeadlineMonths = (text: string): number[] => {
  if (!text) return [];
  const t = text.toLowerCase();
  const months = new Set<number>();
  // explicit tokens
  const tokenRe = /(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)/g;
  const matches = Array.from(t.matchAll(tokenRe)).map((m) => MONTH_MAP[m[1]]).filter(Boolean);
  matches.forEach((m) => months.add(m));

  // expand ranges "oct–dec", "apr-jun", "oct - nov"
  const rangeRe = /(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s*[–\-]\s*(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)/g;
  for (const r of t.matchAll(rangeRe)) {
    const a = MONTH_MAP[r[1]];
    const b = MONTH_MAP[r[2]];
    if (a && b) {
      let cur = a;
      // wrap if backwards
      while (cur !== b) {
        months.add(cur);
        cur = cur === 12 ? 1 : cur + 1;
      }
      months.add(b);
    }
  }
  return Array.from(months).sort((a, b) => a - b);
};

export interface FundingWithMonths extends PhdFunding {
  months: number[];
  rolling: boolean;
}

export const FUNDING_WITH_MONTHS: FundingWithMonths[] = PHD_FUNDING.map((f) => {
  const months = extractDeadlineMonths(f.deadlineEn);
  const rolling = /rolling|year-round|continuous|liên tục/i.test(f.deadlineEn + " " + f.deadlineVi);
  return { ...f, months, rolling };
});

/** Returns the next upcoming month (1-12) for a given list of months from today. */
export const nextMonthFrom = (months: number[], from = new Date()): number | null => {
  if (!months.length) return null;
  const m0 = from.getMonth() + 1;
  const next = months.find((m) => m >= m0);
  return next ?? months[0];
};

/** Counts how many funding items have a deadline in a given month. */
export const countDeadlinesInMonth = (month: number): number =>
  FUNDING_WITH_MONTHS.filter((f) => f.months.includes(month)).length;
