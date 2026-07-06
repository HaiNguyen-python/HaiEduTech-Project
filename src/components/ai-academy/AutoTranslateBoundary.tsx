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

// v3 - bumped from v2 to invalidate cached entries with stray "N." numbering.
const STORAGE_PREFIX = "aiacad_tr_v3_";

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
let flushTimer: number | null = null;
const listeners = new Set<() => void>();

const requestTranslation = (vi: string) => {
  if (cache.has(vi) && isValidEnglish(cache.get(vi)!)) return;
  pending.add(vi);
  if (flushTimer != null) return;
  flushTimer = window.setTimeout(flush, 200);
};

const flush = async () => {
  flushTimer = null;
  if (pending.size === 0) return;
  const batch = Array.from(pending);
  pending.clear();
  for (let i = 0; i < batch.length; i += 60) {
    const slice = batch.slice(i, i + 60);
    try {
      const { data, error } = await supabase.functions.invoke("translate-vi-en", { body: { texts: slice } });
      if (error) { console.error(error); continue; }
      const arr: string[] = data?.translations ?? [];
      slice.forEach((vi, idx) => {
        const en = arr[idx];
        if (typeof en === "string" && en.trim() && isValidEnglish(en)) cachePut(vi, en);
      });
    } catch (e) { console.error("translate batch failed", e); }
  }
  listeners.forEach((fn) => fn());
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

    return () => {
      if (scheduled != null) clearTimeout(scheduled);
      mo.disconnect();
      listeners.delete(onFlush);
    };
  }, [enabled]);

  return <div ref={rootRef}>{children}</div>;
};

export default AutoTranslateBoundary;
