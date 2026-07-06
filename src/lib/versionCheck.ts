/**
 * versionCheck - forces returning users onto the freshly-shipped build.
 *
 * Strategy:
 *   1. At build time Vite injects `__APP_VERSION__` (a timestamp) which we
 *      also write into <meta name="app-version"> inside index.html.
 *   2. On mount and every 5 min (and on tab focus) we fetch a fresh copy of
 *      "/index.html" with cache: 'no-store' and read its app-version meta.
 *   3. If the deployed version differs from the one this tab loaded, we
 *      show a toast asking the user to reload.
 *   4. If a dynamic-import chunk fails (very common when the CDN has new
 *      chunk names but the tab is on old JS), we auto-reload once.
 *   5. On first load with a new version we wipe any residual CacheStorage.
 */
import { toast } from "sonner";

declare const __APP_VERSION__: string;

const CURRENT = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";
const LAST_SEEN_KEY = "haiedu_app_version";
const RELOAD_GUARD_KEY = "haiedu_chunk_reload_at";
const POLL_MS = 5 * 60 * 1000;

let notified = false;

async function fetchDeployedVersion(): Promise<string | null> {
  try {
    const res = await fetch(`/index.html?ts=${Date.now()}`, {
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(/<meta\s+name=["']app-version["']\s+content=["']([^"']+)["']/i);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

function promptReload() {
  if (notified) return;
  notified = true;
  toast("New version available", {
    description: "Reload to get the latest updates.",
    duration: Infinity,
    action: {
      label: "Reload",
      onClick: () => window.location.reload(),
    },
  });
}

async function checkVersion() {
  const deployed = await fetchDeployedVersion();
  if (!deployed || deployed === CURRENT) return;
  promptReload();
}

function installChunkErrorHandler() {
  const reload = () => {
    const last = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || "0");
    if (Date.now() - last < 30_000) return; // avoid reload loop
    sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
    window.location.reload();
  };
  const matches = (msg: string) =>
    /Loading chunk [\w-]+ failed/i.test(msg) ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg);
  window.addEventListener("error", (e) => {
    if (matches(String(e?.message || ""))) reload();
  });
  window.addEventListener("unhandledrejection", (e) => {
    const reason = e?.reason;
    const msg = typeof reason === "string" ? reason : reason?.message || "";
    if (matches(String(msg))) reload();
  });
}

async function wipeStaleCachesOnVersionBump() {
  try {
    const last = localStorage.getItem(LAST_SEEN_KEY);
    if (last === CURRENT) return;
    localStorage.setItem(LAST_SEEN_KEY, CURRENT);
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {
    // storage / caches disabled - ignore
  }
}

let installed = false;
export function initVersionCheck() {
  if (installed) return;
  installed = true;

  installChunkErrorHandler();
  void wipeStaleCachesOnVersionBump();

  // First check after 30s so we don't compete with initial paint.
  const first = window.setTimeout(checkVersion, 30_000);
  const interval = window.setInterval(checkVersion, POLL_MS);
  const onFocus = () => void checkVersion();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") onFocus();
  });
  window.addEventListener("focus", onFocus);

  // Return cleanup for tests; not used in prod
  return () => {
    clearTimeout(first);
    clearInterval(interval);
  };
}
