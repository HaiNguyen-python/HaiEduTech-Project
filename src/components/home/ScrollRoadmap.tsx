/**
 * @file ScrollRoadmap.tsx
 * @description Vertical SVG roadmap whose path draws itself as the user scrolls.
 * Uses one IntersectionObserver + a single rAF loop bound only while visible.
 * Milestones activate via their own IntersectionObserver (no scroll handler).
 */
import { useEffect, useRef } from "react";
import { Rocket, BookOpen, ClipboardCheck, Trophy, Globe2, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MILESTONES = [
  { Icon: Rocket, vi: "Nền tảng", en: "Foundation", descVi: "Bắt đầu với kỹ năng cốt lõi và mục tiêu rõ ràng.", descEn: "Start with core skills and a crisp goal." },
  { Icon: BookOpen, vi: "Xây dựng kỹ năng", en: "Skill Building", descVi: "Luyện tập có hướng dẫn, phản hồi AI theo thời gian thực.", descEn: "Guided practice with real-time AI feedback." },
  { Icon: ClipboardCheck, vi: "Đánh giá", en: "Assessment", descVi: "Đề mock đầy đủ, bản đồ điểm mạnh - yếu.", descEn: "Full mocks and a strength-weakness map." },
  { Icon: Trophy, vi: "Chinh phục", en: "Mastery", descVi: "Đạt band mục tiêu bằng chiến lược đã kiểm chứng.", descEn: "Hit your target band with proven strategy." },
  { Icon: Globe2, vi: "Kỳ thi quốc tế", en: "Global Exams", descVi: "IELTS · HSK · YKI · TOEIC · Cambridge.", descEn: "IELTS · HSK · YKI · TOEIC · Cambridge." },
  { Icon: GraduationCap, vi: "Du học & sự nghiệp", en: "Study Abroad", descVi: "Học bổng, SOP, và định hướng nghề nghiệp toàn cầu.", descEn: "Scholarships, SOP, and global career path." },
];

const ScrollRoadmap = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    let raf = 0;
    let running = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when top of section hits viewport bottom, 1 when bottom hits viewport top.
      const total = rect.height + vh;
      const scrolled = Math.min(Math.max(vh - rect.top, 0), total);
      const p = Math.min(Math.max(scrolled / total, 0), 1);
      path.style.strokeDashoffset = `${length * (1 - p)}`;
      if (running) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(update);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(section);

    // Milestone activation observer
    const dotIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-active");
        });
      },
      { threshold: 0.5 }
    );
    dotsRef.current.forEach((d) => d && dotIo.observe(d));

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      dotIo.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1400px" } as any}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Hành trình ", "Journey to ")}
            <span className="text-gradient">{t("đến thành công", "Global Success")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
            {t(
              "Cuộn xuống - bản đồ tự vẽ và cột mốc bừng sáng theo bạn.",
              "Scroll - the map draws itself and milestones light up as you go."
            )}
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* SVG spine */}
          <svg
            className="pointer-events-none absolute left-1/2 top-0 h-full w-24 -translate-x-1/2"
            viewBox="0 0 100 1200"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="roadmap-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(160 84% 45%)" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M50 0 C 20 200, 80 400, 50 600 S 20 1000, 50 1200"
              fill="none"
              stroke="url(#roadmap-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))",
              }}
            />
          </svg>

          {/* Milestones */}
          <ol className="relative space-y-16">
            {MILESTONES.map((m, i) => {
              const Icon = m.Icon;
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={i}
                  className={`flex items-center gap-4 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="hidden flex-1 md:block" />
                  <div
                    ref={(el) => (dotsRef.current[i] = el)}
                    className="roadmap-dot relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-background text-primary shadow-lg"
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {t(m.vi, m.en)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t(m.descVi, m.descEn)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style>{`
        .roadmap-dot {
          transition: transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms ease, border-color 400ms ease;
        }
        .roadmap-dot.is-active {
          transform: scale(1.15);
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 6px hsl(var(--primary) / 0.15), 0 0 30px hsl(var(--primary) / 0.5);
        }
        @media (prefers-reduced-motion: reduce) {
          .roadmap-dot { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default ScrollRoadmap;
