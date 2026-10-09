/**
 * @file PyodideRunner.tsx
 * @description Lazy-loads Pyodide once per session and exposes runCode().
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { PY_HARNESS, stdinLines, type HarnessResult } from "@/lib/pythonChallengeHarness";

declare global {
  interface Window {
    __haiPyodide?: PyodideAPI;
    __haiPyodidePromise?: Promise<PyodideAPI>;
  }
}

interface PyodideAPI {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (pkg: string | string[]) => Promise<void>;
  setStdout: (cfg: { batched: (s: string) => void }) => void;
  setStderr: (cfg: { batched: (s: string) => void }) => void;
  globals: { set: (k: string, v: unknown) => void; get: (k: string) => unknown };
}

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_CDNS = [
  `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
  `https://pyodide-cdn2.iodide.io/v${PYODIDE_VERSION}/full/`,
];

function loadScriptWithFallback(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let i = 0;
    const tryNext = () => {
      if (i >= PYODIDE_CDNS.length) {
        reject(new Error("All Pyodide CDNs failed"));
        return;
      }
      const base = PYODIDE_CDNS[i++];
      const s = document.createElement("script");
      s.src = `${base}${filename}`;
      s.async = true;
      s.onload = () => resolve(base);
      s.onerror = () => {
        s.remove();
        tryNext();
      };
      document.head.appendChild(s);
    };
    tryNext();
  });
}

async function ensurePyodide(needsScientific: boolean, onStatus: (s: string) => void): Promise<PyodideAPI> {
  if (window.__haiPyodide) {
    if (needsScientific) {
      try {
        await window.__haiPyodide.loadPackage(["numpy", "pandas"]);
      } catch {
        // ignore
      }
    }
    return window.__haiPyodide;
  }
  if (window.__haiPyodidePromise) return window.__haiPyodidePromise;

  window.__haiPyodidePromise = (async () => {
    onStatus("Downloading Python runtime (~10MB, one-time)…");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    // Always load OUR pinned version's script - reusing a foreign loadPyodide
    // from another version causes "Lock file version doesn't match" errors.
    let baseUsed: string = w.__haiPyodideBase;
    if (!baseUsed) {
      baseUsed = await loadScriptWithFallback("pyodide.js");
      w.__haiPyodideBase = baseUsed;
    }
    onStatus("Starting Python interpreter…");
    const py: PyodideAPI = await w.loadPyodide({ indexURL: baseUsed });

    if (needsScientific) {
      onStatus("Loading numpy + pandas (~6MB extra)…");
      await py.loadPackage(["numpy", "pandas"]);
    }
    window.__haiPyodide = py;
    onStatus("Ready");
    return py;
  })();

  try {
    return await window.__haiPyodidePromise;
  } catch (error) {
    window.__haiPyodidePromise = undefined;
    throw error;
  }
}

/**
 * Shared entry point for every Python surface in the app.
 * Guarantees a single Pyodide version so the lockfile always matches.
 */
export function ensurePyodideRuntime(needsScientific = false): Promise<PyodideAPI> {
  return ensurePyodide(needsScientific, () => {});
}

/**
 * Preload Pyodide in the background as soon as the user lands on a Python lesson.
 * Safe to call multiple times - uses the same singleton promise.
 */
export function preloadPyodide() {
  if (typeof window === "undefined") return;
  if (window.__haiPyodide || window.__haiPyodidePromise) return;
  void ensurePyodide(false, () => {}).catch(() => {});
}


export interface RunResult {
  stdout: string;
  stderr: string;
  ok: boolean;
}

export function usePyodide(needsScientific = false) {
  const [ready, setReady] = useState<boolean>(!!window.__haiPyodide);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>(window.__haiPyodide ? "Ready" : "Idle");
  const pyRef = useRef<PyodideAPI | null>(window.__haiPyodide ?? null);

  const init = useCallback(async () => {
    if (pyRef.current) return pyRef.current;
    setLoading(true);
    try {
      const py = await ensurePyodide(needsScientific, setStatus);
      pyRef.current = py;
      setReady(true);
      return py;
    } finally {
      setLoading(false);
    }
  }, [needsScientific]);

  useEffect(() => {
    void init().catch(() => setStatus("Python could not load. Run to retry."));
  }, [init]);

  const runCode = useCallback(async (code: string, input = ""): Promise<RunResult> => {
    try {
      const py = pyRef.current ?? (await init());
      if (/\bsqlite3\b/.test(code)) await py.loadPackage("sqlite3");
      if (!py.globals.get("_hai_run")) py.runPython(PY_HARNESS);
      const values = JSON.stringify(stdinLines(input));
      const raw = await py.runPythonAsync(`_hai_run(${JSON.stringify(code)}, ${JSON.stringify(values)}, True, "", 7)`);
      const result: HarnessResult = JSON.parse(String(raw));
      return { stdout: result.out.trimEnd(), stderr: result.err, ok: !result.err };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { stdout: "", stderr: msg, ok: false };
    }
  }, [init]);

  return { ready, loading, status, runCode, init };
}
