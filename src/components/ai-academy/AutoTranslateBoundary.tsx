/**
 * AutoTranslateBoundary — wraps a subtree and, when the app language is EN,
 * walks all descendant text nodes and replaces Vietnamese strings with
 * English translations fetched from the `translate-vi-en` edge function.
 *
 * Why a DOM-walk instead of per-string `t()`:
 *  - AIAcademy + 14 sandbox components contain ~1000+ hardcoded Vietnamese
 *    strings. Refactoring each one to a bilingual object is high-risk.
 *  - Runtime translation with localStorage cache is "set and forget":
 *    first visit takes ~1 batch call per panel, subsequent visits are instant.
 *
 * Heuristic for "is Vietnamese": text node contains at least one diacritic
 * char that doesn't appear in English. Pure-English nodes (e.g. "ChatGPT",
 * "FaceID", numbers, dates) are skipped — saves ~70% of translation tokens.
 *
 * Cache key: SHA-1 of the original VN string. Cache lives in localStorage
 * under `aiacad_tr_v1_<hash>`. Capped at ~5MB by browser default; we don't
 * proactively evict.
 */
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const VN_DIACRITIC = /[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/;
const VN_WORDS = /\b(và|hoặc|của|cho|với|bạn|được|này|kia|là|những|nhất|thì|nào|sao|chưa|rồi|đã|đang|sẽ|không|có|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười)\b/i;

const STORAGE_PREFIX = "aiacad_tr_v1_";

// Tiny sync hash for cache keys. Not cryptographic; FNV-1a 32-bit.
const hash = (s: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
};

const cache = new Map<string, string>();

const cacheGet = (vi: string): string | undefined => {
  if (cache.has(vi)) return cache.get(vi);
  try {
    const en = localStorage.getItem(STORAGE_PREFIX + hash(vi));
    if (en) {
      cache.set(vi, en);
      return en;
    }
  } catch { /* ignore */ }
  return undefined;
};

const cachePut = (vi: string, en: string) => {
  cache.set(vi, en);
  try { localStorage.setItem(STORAGE_PREFIX + hash(vi), en); } catch { /* quota — silently skip */ }
};

const isVietnamese = (s: string) => {
  const t = s.trim();
  if (t.length < 2) return false;
  if (!/[a-zA-Zàáả-ỹđ]/i.test(t)) return false; // skip pure digit/symbol
  return VN_DIACRITIC.test(t) || VN_WORDS.test(t);
};

// Module-level batch queue so multiple boundaries share one call.
const pending = new Set<string>();
let flushTimer: number | null = null;
const listeners = new Set<() => void>();

const requestTranslation = (vi: string) => {
  if (cache.has(vi)) return;
  pending.add(vi);
  if (flushTimer != null) return;
  flushTimer = window.setTimeout(flush, 200);
};

const flush = async () => {
  flushTimer = null;
  if (pending.size === 0) return;
  const batch = Array.from(pending);
  pending.clear();
  // Split into chunks of 60
  for (let i = 0; i < batch.length; i += 60) {
    const slice = batch.slice(i, i + 60);
    try {
      const { data, error } = await supabase.functions.invoke("translate-vi-en", { body: { texts: slice } });
      if (error) { console.error(error); continue; }
      const arr: string[] = data?.translations ?? [];
      slice.forEach((vi, idx) => {
        const en = arr[idx];
        if (typeof en === "string" && en.trim()) cachePut(vi, en);
      });
    } catch (e) { console.error("translate batch failed", e); }
  }
  listeners.forEach((fn) => fn());
};

interface Props {
  children: React.ReactNode;
  enabled?: boolean;
}

const AutoTranslateBoundary: React.FC<Props> = ({ children, enabled = true }) => {
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Map text node → original VN (so we can re-apply when cache fills)
  const originals = useRef(new WeakMap<Text, string>());
  const bumpRef = useRef(0);

  // Walk DOM and translate/restore based on current lang.
  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    const root = rootRef.current;

    const applyNode = (node: Text) => {
      // Capture the original VN value the first time we visit this node.
      let original = originals.current.get(node);
      if (!original) {
        original = node.nodeValue || "";
        if (!isVietnamese(original)) return; // skip non-VN nodes forever
        originals.current.set(node, original);
      }
      if (lang === "vi") {
        if (node.nodeValue !== original) node.nodeValue = original;
        return;
      }
      const en = cacheGet(original);
      if (en) {
        if (node.nodeValue !== en) node.nodeValue = en;
      } else {
        requestTranslation(original);
      }
    };

    const walk = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
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

    // Re-translate when DOM mutates (track switch, dynamic content).
    const mo = new MutationObserver(() => {
      // Debounce slightly to batch React updates.
      window.requestAnimationFrame(walk);
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true });

    // Listen for batch completion → re-walk to apply newly cached translations.
    const onFlush = () => {
      bumpRef.current++;
      walk();
    };
    listeners.add(onFlush);

    return () => {
      mo.disconnect();
      listeners.delete(onFlush);
    };
  }, [lang, enabled]);

  return <div ref={rootRef}>{children}</div>;
};

export default AutoTranslateBoundary;
