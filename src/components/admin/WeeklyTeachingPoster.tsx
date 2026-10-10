import { forwardRef, type CSSProperties } from "react";
import { formatInTimeZone } from "date-fns-tz";
import logo from "@/assets/certificate-logo.jpg.asset.json";
import { FINLAND_ZONE, scheduleDate, scheduleTime, shiftScheduleDate, type ClassOccurrence, type ScheduleZone } from "@/lib/classScheduleTime";
import { classColor, withAlpha } from "@/lib/classScheduleColors";
import "./WeeklyTeachingPoster.css";

type Props = { week: string; zone: ScheduleZone; occurrences: ClassOccurrence[]; colors: Record<string, string> };
const DAYS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];
const displayDate = (date: string) => `${date.slice(8, 10)}/${date.slice(5, 7)}`;

const WeeklyTeachingPoster = forwardRef<HTMLDivElement, Props>(({ week, zone, occurrences, colors }, ref) => {
  const finland = zone === FINLAND_ZONE;
  const offset = formatInTimeZone(`${week}T12:00:00Z`, zone, "xxx");
  const endOffset = formatInTimeZone(`${shiftScheduleDate(week, 6)}T12:00:00Z`, zone, "xxx");
  return (
    <div ref={ref} className="teaching-poster" aria-label="Thời khóa biểu HaiEduTech">
      <header className="teaching-poster__header">
        <div className="teaching-poster__brand">
          <img src={logo.url} alt="Logo HaiEduTech" crossOrigin="anonymous" onError={event => { if (!event.currentTarget.src.endsWith("/favicon-192.png")) event.currentTarget.src = "/favicon-192.png"; }} />
          <div><strong>HaiEduTech</strong><p>Language & Technology Learning Center</p></div>
        </div>
        <div className="teaching-poster__teacher"><strong>Mr. Hai Nguyen</strong><p>Language • Technology • Learning</p></div>
      </header>
      <div className="teaching-poster__title">
        <div><h2>THỜI KHÓA BIỂU TUẦN</h2><p>{displayDate(week)} - {displayDate(shiftScheduleDate(week, 6))}/{week.slice(0, 4)} · {occurrences.length} buổi học</p></div>
        <div className="teaching-poster__zone">{finland ? "Giờ Phần Lan" : "Giờ Việt Nam"} · UTC{offset}{offset !== endOffset ? ` / ${endOffset}` : ""}</div>
      </div>
      <div className="teaching-poster__days">
        {DAYS.map((day, index) => {
          const date = shiftScheduleDate(week, index);
          const sessions = occurrences.filter(c => scheduleDate(c.start_time, zone) === date);
          return <section key={date} className="teaching-poster__day">
            <div className="teaching-poster__day-label"><strong>{day}</strong><span>{displayDate(date)}</span></div>
            <div className="teaching-poster__sessions">
              {sessions.map(c => {
                const color = classColor(colors, c);
                return <article key={c.occurrence_id} className="teaching-poster__session" style={{ "--schedule-subject": color, "--schedule-subject-soft": withAlpha(color, 0.08) } as CSSProperties}>
                  <time>{scheduleTime(c.start_time, zone)} - {scheduleTime(c.end_time, zone)}{scheduleDate(c.end_time, zone) !== date ? " (+1 ngày)" : ""}</time>
                  <h3>{c.class_name}</h3>
                </article>;
              })}
              {!sessions.length && <p className="teaching-poster__empty">Không có lớp</p>}
            </div>
          </section>;
        })}
      </div>
      <footer className="teaching-poster__footer">
        <div><strong>Đăng ký học cùng HaiEduTech</strong><p>The Unique Intersection of language and technology</p></div>
        <div className="teaching-poster__website">www.haiedutech.com</div>
      </footer>
    </div>
  );
});
WeeklyTeachingPoster.displayName = "WeeklyTeachingPoster";
export default WeeklyTeachingPoster;
