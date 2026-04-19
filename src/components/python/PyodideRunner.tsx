/**
 * @file PyodideRunner.tsx
 * @description Lazy-loads Pyodide once per session and exposes runCode().
 */
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPyodide?: any;
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
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

async function ensurePyodide(needsScientific: boolean, onStatus: (s: string) => void): Promise<PyodideAPI> {
  if (window.__haiPyodide) return window.__haiPyodide;
  if (window.__haiPyodidePromise) return window.__haiPyodidePromise;

  window.__haiPyodidePromise = (async () => {
    onStatus("Loading Pyodide script…");
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = `${PYODIDE_BASE}pyodide.js`;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load Pyodide CDN"));
        document.head.appendChild(s);
      });
    }
    onStatus("Initialising Python runtime…");
    const py = await window.loadPyodide!({ indexURL: PYODIDE_BASE });
    if (needsScientific) {
      onStatus("Loading numpy + pandas (~6MB)…");
      await py.loadPackage(["numpy", "pandas"]);
    }
    window.__haiPyodide = py;
    onStatus("Ready");
    return py;
  })();

  return window.__haiPyodidePromise;
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
