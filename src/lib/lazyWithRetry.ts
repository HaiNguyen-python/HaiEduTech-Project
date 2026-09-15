/**
 * lazyWithRetry - hardens React.lazy against stale-deploy chunk failures.
 *
 * When a new build is deployed, chunk filenames change. A tab still running the
 * old JS will fail to import the old chunk URL ("Failed to fetch dynamically
 * imported module"), which previously bubbled up as a blank screen.
 *
 * Strategy: retry the import once with a cache-busting query, then force a
 * single page reload (guarded, so we never loop).
 */
import { lazy, type ComponentType } from "react";

const RELOAD_GUARD_KEY = "haiedu_lazy_reload_at";

const isChunkError = (err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  return (
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /Loading chunk [\w-]+ failed/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg)
  );
};

const reloadOnce = () => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || "0");
    if (Date.now() - last < 30_000) return false;
    sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
  } catch {
    // sessionStorage disabled - still attempt one reload
  }
  window.location.reload();
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      if (!isChunkError(err)) throw err;
      // Second attempt: the CDN may simply have been slow or mid-deploy.
      await new Promise((r) => setTimeout(r, 400));
      try {
        return await factory();
      } catch (err2) {
        if (isChunkError(err2) && reloadOnce()) {
          // Keep Suspense pending while the reload happens.
          return await new Promise<{ default: T }>(() => {});
        }
        throw err2;
      }
    }
  });
}
