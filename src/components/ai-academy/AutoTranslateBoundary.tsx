/**
 * AutoTranslateBoundary - wraps a subtree and replaces Vietnamese strings
 * with English translations fetched from the `translate-vi-en` edge function.
 *
 * AI Academy is **forced to English** regardless of app language, because
 * historically the auto-translation occasionally returned Chinese tokens.
 * We also reject any cached translation that contains CJK characters and
 * re-request, and bumped the cache prefix to invalidate bad legacy entries.
 */
import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const VN_DIACRITIC = /[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/;
const VN_WORDS = /\b(và|hoặc|của|cho|với|bạn|được|này|kia|là|những|nhất|thì|nào|sao|chưa|rồi|đã|đang|sẽ|không|có|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười)\b/i;
// Reject any string containing CJK (Chinese/Japanese/Korean) ideographs.
const CJK = /[\u3400-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/;
// Reject cached translations that leaked the numbered-prompt prefix (e.g. "1. ", "23. ").
const LEADING_NUM = /^\s*\d{1,3}\.\s+/;

// v5 - added retry (3x), parallel chunks, in-flight dedup, and periodic
// re-walk to catch VN nodes updated via characterData (which we don't observe).
const STORAGE_PREFIX = "aiacad_tr_v5_";

const hash = (s: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
};

const cache = new Map<string, string>();

const isValidEnglish = (s: string) => !!s && !CJK.test(s) && !LEADING_NUM.test(s);

const cacheGet = (vi: string): string | undefined => {
  const cached = cache.get(vi);
  if (cached !== undefined) {
    if (!isValidEnglish(cached)) {
      cache.delete(vi);
      try { localStorage.removeItem(STORAGE_PREFIX + hash(vi)); } catch { /* ignore */ }
      return undefined;
    }
    return cached;
  }
  try {
    const en = localStorage.getItem(STORAGE_PREFIX + hash(vi));
    if (en) {
      if (!isValidEnglish(en)) {
        try { localStorage.removeItem(STORAGE_PREFIX + hash(vi)); } catch { /* ignore */ }
        return undefined;
      }
      cache.set(vi, en);
      return en;
    }
  } catch { /* ignore */ }
  return undefined;
};

const cachePut = (vi: string, en: string) => {
  if (!isValidEnglish(en)) return; // never store Chinese garbage
  cache.set(vi, en);
  try { localStorage.setItem(STORAGE_PREFIX + hash(vi), en); } catch { /* quota - silently skip */ }
};

const isVietnamese = (s: string) => {
  const t = s.trim();
  if (t.length < 2) return false;
  if (!/[a-zA-Zàáả-ỹđ]/i.test(t)) return false;
  return VN_DIACRITIC.test(t) || VN_WORDS.test(t);
};

const pending = new Set<string>();
const inFlight = new Set<string>();
const failCount = new Map<string, number>();
const MAX_RETRIES = 3;
let flushTimer: number | null = null;
const listeners = new Set<() => void>();

const requestTranslation = (vi: string) => {
  if (cache.has(vi) && isValidEnglish(cache.get(vi)!)) return;
  if (inFlight.has(vi)) return;                    // already being translated
  if ((failCount.get(vi) ?? 0) >= MAX_RETRIES) return; // give up after N retries
  pending.add(vi);
  if (flushTimer != null) return;
  flushTimer = window.setTimeout(flush, 80);       // faster first flush
};

const flush = async () => {
  flushTimer = null;
  if (pending.size === 0) return;
  const batch = Array.from(pending);
  pending.clear();
  batch.forEach((v) => inFlight.add(v));

  // Fire batches in parallel (bounded) so 200 strings don't serialize into 8
  // sequential edge-fn calls. Each call has its own 30s upstream timeout.
  const CHUNK = 20;
  const chunks: string[][] = [];
  for (let i = 0; i < batch.length; i += CHUNK) chunks.push(batch.slice(i, i + CHUNK));

  const runChunk = async (slice: string[]) => {
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 25000);
      const { data, error } = await supabase.functions.invoke("translate-vi-en", {
        body: { texts: slice },
      });
      window.clearTimeout(timeoutId);
      if (error) throw error;
      const arr: string[] = data?.translations ?? [];
      slice.forEach((vi, idx) => {
        const en = arr[idx];
        if (typeof en === "string" && en.trim() && isValidEnglish(en) && en.trim() !== vi.trim()) {
          cachePut(vi, en);
          failCount.delete(vi);
        } else {
          failCount.set(vi, (failCount.get(vi) ?? 0) + 1);
        }
      });
    } catch (e) {
      console.error("translate batch failed", e);
      slice.forEach((vi) => failCount.set(vi, (failCount.get(vi) ?? 0) + 1));
    } finally {
      slice.forEach((v) => inFlight.delete(v));
      // Notify listeners after each chunk so translated pieces appear
      // progressively instead of waiting for the whole batch.
      listeners.forEach((fn) => fn());
    }
  };

  // Up to 4 chunks in parallel
  const CONCURRENCY = 4;
  for (let i = 0; i < chunks.length; i += CONCURRENCY) {
    await Promise.all(chunks.slice(i, i + CONCURRENCY).map(runChunk));
  }

  // Auto-retry: any string that failed on this pass but is still under the
  // retry cap gets re-queued so we don't leave Vietnamese on screen.
  const retryable: string[] = [];
  batch.forEach((v) => {
    if (!cache.has(v) && (failCount.get(v) ?? 0) < MAX_RETRIES) retryable.push(v);
  });
  if (retryable.length > 0) {
    retryable.forEach((v) => pending.add(v));
    if (flushTimer == null) flushTimer = window.setTimeout(flush, 800);
  }
};

interface Props {
  children: React.ReactNode;
  enabled?: boolean;
}

interface NodeMeta {
  full: string;
  trimmed: string;
  pre: string;
  post: string;
}

const AutoTranslateBoundary: React.FC<Props> = ({ children, enabled = true }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const metaMap = useRef(new WeakMap<Text, NodeMeta>());

  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    const root = rootRef.current;

    const applyNode = (node: Text) => {
      let meta = metaMap.current.get(node);
      if (!meta) {
        const full = node.nodeValue || "";
        const trimmed = full.trim();
        if (!isVietnamese(trimmed)) return;
        const preMatch = full.match(/^\s*/);
        const postMatch = full.match(/\s*$/);
        meta = {
          full,
          trimmed,
          pre: preMatch ? preMatch[0] : "",
          post: postMatch ? postMatch[0] : "",
        };
        metaMap.current.set(node, meta);
      }
      // AI Academy is forced to English - ignore app lang.
      const en = cacheGet(meta.trimmed);
      if (en) {
        const prevIsElem = node.previousSibling?.nodeType === 1;
        const nextIsElem = node.nextSibling?.nodeType === 1;
        const pre = meta.pre || (prevIsElem ? " " : "");
        const post = meta.post || (nextIsElem ? " " : "");
        const next = pre + en.trim() + post;
        if (node.nodeValue !== next) node.nodeValue = next;
      } else {
        requestTranslation(meta.trimmed);
      }
    };

    const walk = (scope: Node = root) => {
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const text = (n.nodeValue || "").trim();
          if (!text) return NodeFilter.FILTER_REJECT;
          const parent = n.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE") return NodeFilter.FILTER_REJECT;
          if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let n: Node | null;
      // eslint-disable-next-line no-cond-assign
      while ((n = walker.nextNode())) applyNode(n as Text);
    };

    walk();

    // Debounced observer so scrolling / motion-driven DOM churn doesn't
    // trigger a full tree walk on every frame. We only watch childList
    // (new mounts) and never characterData (which our own writes would
    // fire, causing loops). Walk only the subtree of the mutation target.
    let pendingTargets = new Set<Node>();
    let scheduled: number | null = null;
    const scheduleWalk = () => {
      if (scheduled != null) return;
      scheduled = window.setTimeout(() => {
        scheduled = null;
        const targets = pendingTargets;
        pendingTargets = new Set();
        targets.forEach((t) => {
          try { walk(t); } catch { /* node detached */ }
        });
      }, 300);
    };

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "childList") continue;
        if (m.addedNodes.length === 0) continue;
        pendingTargets.add(m.target);
      }
      if (pendingTargets.size > 0) scheduleWalk();
    });
    mo.observe(root, { childList: true, subtree: true });

    const onFlush = () => walk();
    listeners.add(onFlush);

    // Periodic safety re-walk: some sandboxes update text via
    // characterData (which we don't observe to avoid loops) or via
    // portals that mount outside the mutation record. Re-scan every
    // 2s for the first 20s, then every 10s, to catch stragglers.
    const slowIntervalRef: { current: number | null } = { current: null };
    let ticks = 0;
    const interval = window.setInterval(() => {
      ticks += 1;
      try { walk(); } catch { /* detached */ }
      if (ticks === 10) {
        clearInterval(interval);
        slowIntervalRef.current = window.setInterval(() => {
          try { walk(); } catch { /* detached */ }
        }, 10000);
      }
    }, 2000);

    return () => {
      if (scheduled != null) clearTimeout(scheduled);
      clearInterval(interval);
      if (slowIntervalRef.current != null) clearInterval(slowIntervalRef.current);
      mo.disconnect();
      listeners.delete(onFlush);
    };
  }, [enabled]);

  return <div ref={rootRef}>{children}</div>;
};

export default AutoTranslateBoundary;
