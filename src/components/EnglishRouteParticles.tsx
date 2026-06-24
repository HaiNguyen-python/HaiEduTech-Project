/**
 * @file EnglishRouteParticles.tsx
 * @description Global route-aware floating English-themed particles.
 * Renders a full-page decorative layer on every English-section route
 * (English hub, Cambridge, IELTS, TOEIC, PTE, SAT, THPT, Speaking Coach EN,
 * English songs, vocab arena...).
 * @copyright 2026 HaiEduTech.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FloatingEnglishParticles = lazy(() => import("./FloatingEnglishParticles"));

/** Route prefixes that belong to the English learning section. */
const ENGLISH_PREFIXES = [
  "/english",
  "/cambridge",          // /cambridge-lectures, /cambridge-yle-*, /cambridge-mock-exam, /cambridge/arcade
  "/ielts",              // /ielts-lectures, /ielts-vocabulary, /ielts-*-practice, /ielts-sample-essays
  "/toeic",              // /toeic, /toeic-lectures, /toeic-vocabulary, /toeic-exams, /toeic-exam/:id
  "/pte",
  "/sat",                // /sat-curriculum, /sat-exams, /sat-vocabulary, /sat-exercises, /sat/*
  "/national-exam",
  "/vocab-arena",
  "/ai-grading",
  "/songs/english",
  "/speaking-coach/english",
];

function isEnglishRoute(pathname: string): boolean {
  return ENGLISH_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "-"));
}

const EnglishRouteParticles = () => {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  // Defer mount so it never blocks first paint of the route.
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
  if (!isEnglishRoute(pathname)) return null;

  return (
    <Suspense fallback={null}>
      <FloatingEnglishParticles fullPage count={26} />
    </Suspense>
  );
};

export default EnglishRouteParticles;
