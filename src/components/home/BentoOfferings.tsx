/**
 * @file BentoOfferings.tsx
 * @description Asymmetric bento grid with a single cursor-follow radial spotlight.
 * One pointermove listener updates CSS variables on the wrapper; each tile's
 * ::before layer reads those vars to render the spotlight. No per-tile JS.
 */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Sparkles,
  ListChecks,
  Code2,
  BookOpen,
  Flag,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tile {
  title: string;
  titleVi: string;
  desc: string;
  descVi: string;
  route: string;
  Icon: typeof Mic;
  span: string;
  accent: string;
}

const TILES: Tile[] = [
  {
    title: "AI Speaking Coach",
    titleVi: "AI Speaking Coach",
    desc: "Real-time pronunciation feedback across 6 languages with IPA overlay.",
    descVi: "Phản hồi phát âm thời gian thực cho 6 ngôn ngữ, kèm IPA.",
    route: "/speaking-coach",
    Icon: Mic,
    span: "md:col-span-2 md:row-span-2",
    accent: "from-primary/20 to-emerald-500/10",
  },
  {
    title: "Lifestyle Academy",
    titleVi: "Lifestyle Academy",
    desc: "AI-guided lifestyle upgrades: focus, sleep, and study rituals.",
    descVi: "AI hướng dẫn nâng cấp lối sống: tập trung, giấc ngủ, thói quen học.",
    route: "/dashboard",
    Icon: Sparkles,
    span: "md:col-span-2",
    accent: "from-amber-500/20 to-primary/10",
  },
  {
    title: "To-Do Goal Engine",
    titleVi: "Bộ máy Goal & To-do",
    desc: "Turn goals into daily tasks; site activity auto-fuels your progress.",
    descVi: "Biến mục tiêu thành task hằng ngày; hoạt động học tự bơm tiến độ.",
    route: "/dashboard",
    Icon: ListChecks,
    span: "",
    accent: "from-emerald-500/20 to-primary/10",
  },
  {
    title: "Python EdTech",
    titleVi: "Python EdTech",
    desc: "Pyodide-powered playground, ML mini-projects, SQL pipelines.",
    descVi: "Sân chơi Pyodide, mini-project ML, pipeline SQL.",
    route: "/programming",
    Icon: Code2,
    span: "",
    accent: "from-blue-500/20 to-primary/10",
  },
  {
    title: "IELTS · HSK · TOEIC",
    titleVi: "IELTS · HSK · TOEIC",
    desc: "Full mock tests with AI grading and band-level explanations.",
    descVi: "Đề mock đầy đủ, AI chấm điểm và giải thích theo band.",
    route: "/ielts",
    Icon: BookOpen,
    span: "",
    accent: "from-primary/25 to-emerald-500/10",
  },
  {
    title: "YKI Finnish",
    titleVi: "YKI Tiếng Phần Lan",
    desc: "A1 → B1 with Finnish TTS, YKI mock, and cultural context.",
    descVi: "A1 → B1 với TTS Phần Lan, mock YKI, ngữ cảnh văn hóa.",
    route: "/finnish/yki-a2",
    Icon: Flag,
    span: "",
    accent: "from-cyan-500/20 to-primary/10",
  },
];

const BentoOfferings = () => {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Single global pointermove listener drives all tiles via CSS variables.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Hệ sinh thái ", "The ")}
            <span className="text-gradient">{t("HaiEduTech", "HaiEduTech Ecosystem")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
            {t(
              "Sáu module lõi phối hợp để đưa bạn từ nền tảng đến toàn cầu.",
              "Six flagship modules working in concert to take you from foundation to global."
            )}
          </p>
        </div>

        <div
          ref={wrapRef}
          className="bento-spotlight grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[180px]"
        >
          {TILES.map((tile) => {
            const Icon = tile.Icon;
            return (
              <Link
                key={tile.title}
                to={tile.route}
                className={`bento-tile group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur transition-all hover:border-primary/50 hover:-translate-y-0.5 ${tile.span}`}
                style={{ contentVisibility: "auto", containIntrinsicSize: "220px" } as any}
              >
                {/* Base gradient */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tile.accent} opacity-60`}
                />
                {/* Content */}
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t(tile.titleVi, tile.title)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(tile.descVi, tile.desc)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .bento-spotlight { --mx: -9999px; --my: -9999px; }
        .bento-tile::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(320px circle at var(--mx) var(--my), hsl(var(--primary) / 0.20), transparent 60%);
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
          z-index: 5;
        }
        .bento-spotlight:hover .bento-tile::before { opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .bento-tile::before { display: none; }
        }
      `}</style>
    </section>
  );
};

export default BentoOfferings;
