/**
 * @file ChineseRouteParticles.tsx
 * @description Global route-aware floating Chinese-themed particles.
 * Renders a full-page decorative layer on every Chinese-section route
 * (Chinese hub, HSK, HSKK, Tone Drill, Reading/Listening, Culture,
 * Conversational, Arcade, Speaking Coach Chinese, Songs Chinese...).
 * @copyright 2026 HaiEduTech.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FloatingChineseParticles = lazy(() => import("./FloatingChineseParticles"));

const CHINESE_PREFIXES = [
  "/chinese",
  "/hsk",
  "/songs/chinese",
  "/speaking-coach/chinese",
];

function isChineseRoute(pathname: string): boolean {
  return CHINESE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "-"));
}

const ChineseRouteParticles = () => {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    } else {
      const t = window.setTimeout(() => setReady(true), 800);
      return () => window.clearTimeout(t);
    }
  }, []);

  if (!ready) return null;
  if (!isChineseRoute(pathname)) return null;

  return (
    <Suspense fallback={null}>
      <FloatingChineseParticles fullPage count={48} />
    </Suspense>
  );
};

export default ChineseRouteParticles;
