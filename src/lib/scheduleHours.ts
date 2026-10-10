/** Total teaching minutes for a list of sessions (cancelled excluded upstream). */
export const totalTeachingMinutes = (sessions: { start_time: string; end_time: string }[]) =>
  sessions.reduce((sum, s) => sum + Math.max(0, Math.round((Date.parse(s.end_time) - Date.parse(s.start_time)) / 60000)), 0);

export const formatTeachingHours = (minutes: number) => {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m ? `${h} giờ ${m} phút` : `${h} giờ`;
};
