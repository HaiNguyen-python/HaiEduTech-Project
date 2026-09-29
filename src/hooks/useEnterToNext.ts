import { useEffect } from "react";

/**
 * Pressing Enter clicks the visible button marked with `data-enter-next`
 * (Next / Continue / Done). Ignored while typing in a field or when a button
 * already has focus (the browser clicks that button itself).
 */
export function useEnterToNext(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.repeat || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.closest("input, textarea, select, button, a, [contenteditable='true']"))) return;
      const targets = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-enter-next]"))
        .filter((b) => !b.disabled && b.offsetParent !== null);
      const btn = targets[targets.length - 1];
      if (!btn) return;
      e.preventDefault();
      btn.click();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);
}
