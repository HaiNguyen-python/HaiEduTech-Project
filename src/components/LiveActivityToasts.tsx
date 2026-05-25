import { useEffect } from "react";
import { toast } from "sonner";

const ACTIVITIES = [
  { emoji: "🎉", vi: "Minh vừa đạt IELTS 7.5", en: "Minh just achieved IELTS 7.5" },
  { emoji: "🔥", vi: "Lan hoàn thành HSK 3", en: "Lan completed HSK 3" },
  { emoji: "✨", vi: "Khoa nhận chứng chỉ YKI A2", en: "Khoa earned YKI A2 certificate" },
  { emoji: "🚀", vi: "An vừa hoàn thành 30 ngày streak", en: "An hit a 30-day streak" },
  { emoji: "🏆", vi: "Trang dẫn đầu Vocab Arena tuần này", en: "Trang tops Vocab Arena this week" },
  { emoji: "🧠", vi: "Bảo hoàn thành AI Academy Module 4", en: "Bao finished AI Academy Module 4" },
  { emoji: "💬", vi: "Hà giành 92% Speaking Coach", en: "Ha scored 92% on Speaking Coach" },
  { emoji: "📚", vi: "Nam học 50 từ TOEIC hôm nay", en: "Nam learned 50 TOEIC words today" },
];

/** Rotating social-proof toasts. Mounts once. Pauses when tab is hidden. */
const LiveActivityToasts = () => {
  useEffect(() => {
    let timer: number;
    let stopped = false;

    const schedule = () => {
      const delay = 22000 + Math.random() * 18000; // 22–40s
      timer = window.setTimeout(() => {
        if (stopped) return;
        if (!document.hidden) {
          const a = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
          const lang =
            (typeof window !== "undefined" && localStorage.getItem("app-lang")) || "en";
          toast(`${a.emoji} ${lang === "vi" ? a.vi : a.en}`, {
            duration: 4200,
            position: "bottom-left",
          });
        }
        schedule();
      }, delay);
    };

    // First toast a bit later so it doesn't feel intrusive
    timer = window.setTimeout(() => {
      if (!document.hidden && !stopped) {
        const a = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
        const lang =
          (typeof window !== "undefined" && localStorage.getItem("app-lang")) || "en";
        toast(`${a.emoji} ${lang === "vi" ? a.vi : a.en}`, {
          duration: 4200,
          position: "bottom-left",
        });
      }
      schedule();
    }, 12000);

    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default LiveActivityToasts;
