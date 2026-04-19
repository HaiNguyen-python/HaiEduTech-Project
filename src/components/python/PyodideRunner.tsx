/**
 * @file PyodideRunner.tsx
 * @description Lazy-loads Pyodide once per session and exposes runCode().
 */
import { useCallback, useEffect, useRef, useState } from "react";

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
  globals: { set: (k: string, v: unknown) => void };
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
    let baseUsed = PYODIDE_CDNS[0];
    if (!w.loadPyodide) {
      baseUsed = await loadScriptWithFallback("pyodide.js");
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

  return window.__haiPyodidePromise;
}

/**
 * Preload Pyodide in the background as soon as the user lands on a Python lesson.
 * Safe to call multiple times — uses the same singleton promise.
 */
export function preloadPyodide() {
  if (typeof window === "undefined") return;
  if (window.__haiPyodide || window.__haiPyodidePromise) return;
  void ensurePyodide(false, () => {});
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
    void init();
  }, [init]);

  const runCode = useCallback(async (code: string): Promise<RunResult> => {
    const py = pyRef.current ?? (await init());
    let stdout = "";
    let stderr = "";
    py.setStdout({ batched: (s: string) => (stdout += s + "\n") });
    py.setStderr({ batched: (s: string) => (stderr += s + "\n") });
    try {
      await py.runPythonAsync(code);
      return { stdout: stdout.trimEnd(), stderr: stderr.trimEnd(), ok: !stderr };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { stdout: stdout.trimEnd(), stderr: (stderr + "\n" + msg).trim(), ok: false };
    }
  }, [init]);

  return { ready, loading, status, runCode, init };
}
