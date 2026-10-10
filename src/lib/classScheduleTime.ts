import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

export const VIETNAM_ZONE = "Asia/Ho_Chi_Minh";
export const FINLAND_ZONE = "Europe/Helsinki";
export type ScheduleZone = typeof VIETNAM_ZONE | typeof FINLAND_ZONE;
export type ClassSchedule = {
  id: string; class_name: string; subject: string; description: string | null;
  start_time: string; end_time: string; recurring: string; recurring_days: number[] | null;
  platform_link: string | null; location: string | null; max_students: number;
  status: string; color: string | null;
};
export type ClassOccurrence = ClassSchedule & { occurrence_id: string };

export const scheduleDate = (instant: string | Date, zone: ScheduleZone = VIETNAM_ZONE) => formatInTimeZone(instant, zone, "yyyy-MM-dd");
export const scheduleTime = (instant: string | Date, zone: ScheduleZone = VIETNAM_ZONE) => formatInTimeZone(instant, zone, "HH:mm");
export const vietnamInstant = (date: string, time: string) => fromZonedTime(`${date}T${time}:00`, VIETNAM_ZONE).toISOString();
export function shiftScheduleDate(date: string, days: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}
export function scheduleWeekStart(instant: Date = new Date(), zone: ScheduleZone = VIETNAM_ZONE) {
  const date = scheduleDate(instant, zone);
  const weekday = (new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7;
  return shiftScheduleDate(date, -weekday);
}

/** Repeat by Vietnam wall-clock time, not UTC offset or the browser's timezone. */
export function expandScheduleWeek(classes: ClassSchedule[], week: string, zone: ScheduleZone): ClassOccurrence[] {
  const start = fromZonedTime(`${week}T00:00:00`, zone).getTime();
  const end = fromZonedTime(`${shiftScheduleDate(week, 7)}T00:00:00`, zone).getTime();
  const output: ClassOccurrence[] = [];
  const append = (c: ClassSchedule, instant: string, duration: number) => {
    const time = Date.parse(instant);
    if (time < start || time >= end) return;
    output.push({ ...c, start_time: instant, end_time: new Date(time + duration).toISOString(), occurrence_id: `${c.id}:${instant}` });
  };
  for (const c of classes) {
    if (c.status === "completed" || c.status === "cancelled") continue;
    const duration = Date.parse(c.end_time) - Date.parse(c.start_time);
    if (!Number.isFinite(duration) || duration <= 0) continue;
    if (c.recurring !== "weekly" && c.recurring !== "daily") {
      append(c, c.start_time, duration);
      continue;
    }
    const anchor = scheduleDate(c.start_time);
    const anchorDay = (new Date(`${anchor}T12:00:00Z`).getUTCDay() + 6) % 7;
    const days = c.recurring_days?.length ? c.recurring_days : [anchorDay];
    // Include adjacent VN dates: Helsinki conversion can move a class across midnight/week boundaries.
    for (let offset = -1; offset <= 8; offset++) {
      const date = shiftScheduleDate(week, offset);
      if (date < anchor) continue;
      const weekday = (new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7;
      if (c.recurring === "weekly" && !days.includes(weekday)) continue;
      append(c, vietnamInstant(date, scheduleTime(c.start_time)), duration);
    }
  }
  return output.sort((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time));
}