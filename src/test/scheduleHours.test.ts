import { describe, it, expect } from "vitest";
import { totalTeachingMinutes, formatTeachingHours } from "@/lib/scheduleHours";

describe("weekly teaching hours", () => {
  it("sums session durations", () => {
    const m = totalTeachingMinutes([
      { start_time: "2026-10-12T03:30:00Z", end_time: "2026-10-12T05:00:00Z" },
      { start_time: "2026-10-12T11:00:00Z", end_time: "2026-10-12T13:00:00Z" },
    ]);
    expect(m).toBe(210);
    expect(formatTeachingHours(m)).toBe("3 giờ 30 phút");
  });
});
