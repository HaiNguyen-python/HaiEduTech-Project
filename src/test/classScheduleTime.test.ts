import { describe, expect, it } from "vitest";
import { expandScheduleWeek, FINLAND_ZONE, scheduleDate, scheduleTime, vietnamInstant, VIETNAM_ZONE, type ClassSchedule } from "@/lib/classScheduleTime";

const course: ClassSchedule = {
  id: "ngoc-han", class_name: "IELTS", subject: "english", description: null,
  start_time: "2026-10-10T03:30:00Z", end_time: "2026-10-10T05:00:00Z",
  recurring: "weekly", recurring_days: [2, 4], platform_link: null,
  location: null, max_students: 20, status: "upcoming", color: null,
};
describe("Vietnam teaching schedule", () => {
  it("preserves confirmed Ngọc Hân 10:30-12:00 Vietnam input", () => {
    expect(vietnamInstant("2026-10-10", "10:30")).toBe("2026-10-10T03:30:00.000Z");
    expect(scheduleTime(course.start_time)).toBe("10:30");
    expect(scheduleTime(course.end_time)).toBe("12:00");
  });
  it("shows Finland summer time four hours behind Vietnam", () => {
    expect(scheduleTime(course.start_time, FINLAND_ZONE)).toBe("06:30");
    expect(scheduleTime(course.end_time, FINLAND_ZONE)).toBe("08:00");
  });
  it("shows Finland winter time five hours behind Vietnam", () => {
    expect(scheduleTime(vietnamInstant("2026-10-26", "10:30"), FINLAND_ZONE)).toBe("05:30");
  });
  it("expands Monday-first Wednesday/Friday recurrence without inventing Saturday", () => {
    const rows = expandScheduleWeek([course], "2026-10-12", VIETNAM_ZONE);
    expect(rows.map(row => scheduleDate(row.start_time))).toEqual(["2026-10-14", "2026-10-16"]);
    expect(rows.map(row => scheduleTime(row.start_time))).toEqual(["10:30", "10:30"]);
  });
  it("does not generate classes before their starting date", () => {
    expect(expandScheduleWeek([course], "2026-10-05", VIETNAM_ZONE)).toEqual([]);
  });
  it("keeps one-off classes one-off", () => {
    const oneOff = { ...course, recurring: "none" };
    expect(expandScheduleWeek([oneOff], "2026-10-05", VIETNAM_ZONE)).toHaveLength(1);
    expect(expandScheduleWeek([oneOff], "2026-10-12", VIETNAM_ZONE)).toHaveLength(0);
  });
  it("excludes cancelled and completed classes from teaching weeks", () => {
    expect(expandScheduleWeek([{ ...course, status: "cancelled" }, { ...course, status: "completed" }], "2026-10-12", VIETNAM_ZONE)).toHaveLength(0);
  });
  it("moves an early Vietnam class onto the previous Helsinki date", () => {
    const early = { ...course, start_time: vietnamInstant("2026-10-12", "02:00"), end_time: vietnamInstant("2026-10-12", "03:00"), recurring_days: [0] };
    const rows = expandScheduleWeek([early], "2026-10-05", FINLAND_ZONE);
    expect(rows).toHaveLength(1);
    expect(scheduleDate(rows[0].start_time, FINLAND_ZONE)).toBe("2026-10-11");
    expect(scheduleTime(rows[0].start_time, FINLAND_ZONE)).toBe("22:00");
  });
});