/**
 * @file useCookieConsent.ts
 * @description GDPR cookie consent state hook. Persists the user's choice to
 * localStorage and exposes it to any component that needs to gate analytical
 * or functional tracking behind consent.
 */
import { useEffect, useState, useCallback } from "react";

export type ConsentChoice = {
  essential: true;
  functional: boolean;
  analytical: boolean;
  ts: number;
};

const STORAGE_KEY = "het:cookie-consent-v1";
const EVENT = "het:cookie-consent-changed";

const readChoice = (): ConsentChoice | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return { ...parsed, essential: true };
    return null;
  } catch {
    return null;
  }
};

export const useCookieConsent = () => {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => readChoice());

  useEffect(() => {
    const onChange = () => setChoice(readChoice());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const save = useCallback((next: Omit<ConsentChoice, "essential" | "ts">) => {
    const payload: ConsentChoice = { essential: true, functional: next.functional, analytical: next.analytical, ts: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new Event(EVENT));
    } catch { /* noop */ }
    setChoice(payload);
  }, []);

  const acceptAll = useCallback(() => save({ functional: true, analytical: true }), [save]);
  const rejectNonEssential = useCallback(() => save({ functional: false, analytical: false }), [save]);

  return {
    choice,
    hasChoice: choice !== null,
    analyticalAllowed: choice?.analytical === true,
    functionalAllowed: choice?.functional === true,
    save,
    acceptAll,
    rejectNonEssential,
  };
};
